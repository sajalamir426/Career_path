// backend/middleware/auth.js
// Protects routes by checking the JWT access token stored in an httpOnly cookie.

const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authenticated. Please log in." });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
  }
}

module.exports = requireAuth;