// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const xss = require("xss");
const multer = require("multer");
const path = require("path");

const db = require("../db");
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/email");
const requireAuth = require("../middleware/auth");

const router = express.Router();
const SALT_ROUNDS = 12;
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;

const ALLOWED_GOALS = [
  "Web Development",
  "AI & Machine Learning",
  "Data Science",
  "Cyber Security",
  "Cloud & DevOps",
  "Mobile App Development",
  "Software Engineering",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
];

function sanitize(str) {
  return xss(String(str || "").trim());
}
function signAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}
function signRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}
function setAuthCookies(res, userId) {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("accessToken", accessToken, { httpOnly: true, secure: isProd, sameSite: "strict", maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: isProd, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
}

// Checks if a plain-text password matches ANY existing user's stored hash.
// Stops two different accounts from sharing the same password.
// async function isPasswordTaken(password, excludeUserId = null) {
//   const users = db.getAllUsers();
//   for (const u of users) {
//     if (excludeUserId && u.id === excludeUserId) continue;
//     const match = await bcrypt.compare(password, u.password_hash);
//     if (match) return true;
//   }
//   return false;
// }


const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../frontend/uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `user_${req.userId}_${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Only JPG, PNG, or WEBP images are allowed"));
    }
    cb(null, true);
  },
});

router.post(
  "/signup",
  [
    body("name").trim().isLength({ min: 2, max: 60 }).withMessage("Name must be 2-60 characters"),
    body("email").trim().isEmail().withMessage("Enter a valid email address"),
    body("goal").optional({ checkFalsy: true }).isIn(ALLOWED_GOALS).withMessage("Please select a valid field from the list"),
    body("password")
      .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/).withMessage("Password must include an uppercase letter")
      .matches(/[a-z]/).withMessage("Password must include a lowercase letter")
      .matches(/[0-9]/).withMessage("Password must include a number")
      .matches(/[^A-Za-z0-9]/).withMessage("Password must include a special character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email).toLowerCase();
    const goal = sanitize(req.body.goal || "");
    const { password } = req.body;

    try {
      const existing = db.getUserByEmail(email);
      if (existing) return res.status(409).json({ success: false, message: "An account with this email already exists" });

      // const passwordAlreadyUsed = await isPasswordTaken(password);
      // if (passwordAlreadyUsed) {
      //   return res.status(409).json({ success: false, message: "This password can't be used. Please choose a different password." });
      // }

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const expires = Date.now() + 30 * 60 * 1000;

      db.insertUser({ name, email, password_hash: passwordHash, goal, verification_token: verificationToken, verification_token_expires: expires });

      try {
        await sendVerificationEmail(email, name, verificationToken);
      } catch (mailErr) {
        console.error("Email send failed:", mailErr.message);
      }

      return res.status(201).json({ success: true, message: "Account created. Please check your email(inbox/ spam) to verify your account." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
  }
);

router.post("/verify-email", async (req, res) => {
  const token = sanitize(req.body.token);
  if (!token) return res.status(400).json({ success: false, message: "Verification token missing" });

  const user = db.getUserByVerificationToken(token);
  if (!user) return res.status(400).json({ success: false, message: "Invalid or already-used verification link" });
  if (user.verification_token_expires < Date.now()) return res.status(400).json({ success: false, message: "Verification link expired. Please request a new one." });

  db.updateUser(user.id, { is_verified: 1, verification_token: null, verification_token_expires: null });
  return res.json({ success: true, message: "Email verified successfully. You can now log in." });
});

router.post("/resend-verification", async (req, res) => {
  const email = sanitize(req.body.email).toLowerCase();
  const user = db.getUserByEmail(email);
  const genericMsg = { success: true, message: "If that account exists, a verification email has been sent." };
  if (!user || user.is_verified) return res.json(genericMsg);

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 30 * 60 * 1000;
  db.updateUser(user.id, { verification_token: token, verification_token_expires: expires });

  try { await sendVerificationEmail(user.email, user.name, token); } catch (e) { console.error("Resend email failed:", e.message); }
  return res.json(genericMsg);
});

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Enter a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const email = sanitize(req.body.email).toLowerCase();
    const { password } = req.body;
    const user = db.getUserByEmail(email);
    const invalidMsg = { success: false, message: "Invalid email or password" };

    if (!user) return res.status(401).json(invalidMsg);

    if (user.lock_until && user.lock_until > Date.now()) {
      const minutesLeft = Math.ceil((user.lock_until - Date.now()) / 60000);
      return res.status(423).json({ success: false, message: `Too many failed attempts. Try again in ${minutesLeft} minute(s).` });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      const attempts = (user.failed_login_attempts || 0) + 1;
      let lockUntil = null;
      if (attempts >= MAX_FAILED_ATTEMPTS) lockUntil = Date.now() + LOCK_TIME_MS;
      db.updateUser(user.id, { failed_login_attempts: attempts, lock_until: lockUntil });
      return res.status(401).json(invalidMsg);
    }

    if (!user.is_verified) return res.status(403).json({ success: false, message: "Please verify your email before logging in." });

    db.updateUser(user.id, { failed_login_attempts: 0, lock_until: null });
    setAuthCookies(res, user.id);

    return res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email, goal: user.goal } });
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({ success: true, message: "Logged out successfully" });
});

router.post("/forgot-password", [body("email").trim().isEmail()], async (req, res) => {
  const email = sanitize(req.body.email).toLowerCase();
  const user = db.getUserByEmail(email);
  const genericMsg = { success: true, message: "If that account exists, a password reset email has been sent." };
  if (!user) return res.json(genericMsg);

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 15 * 60 * 1000;
  db.updateUser(user.id, { reset_token: token, reset_token_expires: expires });

  try { await sendResetPasswordEmail(user.email, user.name, token); } catch (e) { console.error("Reset email failed:", e.message); }
  return res.json(genericMsg);
});

router.post(
  "/reset-password",
  [
    body("token").notEmpty(),
    body("password")
      .isLength({ min: 8 })
      .matches(/[A-Z]/).withMessage("Password must include an uppercase letter")
      .matches(/[a-z]/).withMessage("Password must include a lowercase letter")
      .matches(/[0-9]/).withMessage("Password must include a number")
      .matches(/[^A-Za-z0-9]/).withMessage("Password must include a special character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const token = sanitize(req.body.token);
    const { password } = req.body;
    const user = db.getUserByResetToken(token);
    if (!user || user.reset_token_expires < Date.now()) return res.status(400).json({ success: false, message: "Reset link is invalid or expired" });

    // const passwordAlreadyUsed = await isPasswordTaken(password, user.id);
    // if (passwordAlreadyUsed) {
    //   return res.status(409).json({ success: false, message: "This password is already in use. Please choose a different password." });
    // }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    db.updateUser(user.id, { password_hash: passwordHash, reset_token: null, reset_token_expires: null, failed_login_attempts: 0, lock_until: null });

    return res.json({ success: true, message: "Password reset successful. You can now log in." });
  }
);

router.get("/profile", requireAuth, (req, res) => {
  const user = db.getUserById(req.userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  const { password_hash, verification_token, reset_token, ...safeUser } = user;
  return res.json({ success: true, user: safeUser });
});

router.put(
  "/profile",
  requireAuth,
  [
    body("name").optional().trim().isLength({ min: 2, max: 60 }),
    body("goal").optional({ checkFalsy: true }).isIn(ALLOWED_GOALS).withMessage("Please select a valid field from the list"),
    body("interests").optional().trim().isLength({ max: 300 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const current = db.getUserById(req.userId);
    if (!current) return res.status(404).json({ success: false, message: "User not found" });

    const updates = {};
    if (req.body.name !== undefined) updates.name = sanitize(req.body.name);
    if (req.body.goal !== undefined) updates.goal = sanitize(req.body.goal);
    if (req.body.interests !== undefined) updates.interests = sanitize(req.body.interests);
    if (req.body.privacyPublic !== undefined) updates.privacy_public = req.body.privacyPublic ? 1 : 0;

    db.updateUser(req.userId, updates);
    return res.json({ success: true, message: "Profile updated successfully" });
  }
);

router.post("/profile/picture", requireAuth, upload.single("profilePicture"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  const relativePath = `/uploads/${req.file.filename}`;
  db.updateUser(req.userId, { profile_picture: relativePath });
  return res.json({ success: true, message: "Profile picture updated", path: relativePath });
});

router.post(
  "/change-password",
  requireAuth,
  [
    body("currentPassword").notEmpty(),
    body("newPassword").isLength({ min: 8 }).matches(/[A-Z]/).matches(/[a-z]/).matches(/[0-9]/).matches(/[^A-Za-z0-9]/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: "New password does not meet requirements" });

    const user = db.getUserById(req.userId);
    const match = await bcrypt.compare(req.body.currentPassword, user.password_hash);
    if (!match) return res.status(401).json({ success: false, message: "Current password is incorrect" });

    // const passwordAlreadyUsed = await isPasswordTaken(req.body.newPassword, user.id);
    // if (passwordAlreadyUsed) {
    //   return res.status(409).json({ success: false, message: "This password is already in use. Please choose a different password." });
    // }

    const newHash = await bcrypt.hash(req.body.newPassword, SALT_ROUNDS);
    db.updateUser(req.userId, { password_hash: newHash });
    return res.json({ success: true, message: "Password changed successfully" });
  }
);

router.get("/me", requireAuth, (req, res) => {
  const user = db.getUserById(req.userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});
router.delete("/delete-account", requireAuth, async (req, res) => {
  const user = db.getUserById(req.userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  // password confirm karwao pehle
  const { password } = req.body;
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ success: false, message: "Incorrect password" });

  db.deleteUser(req.userId);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({ success: true, message: "Account deleted successfully" });
});
module.exports = router;