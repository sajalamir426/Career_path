// backend/utils/email.js
// Handles sending verification and password-reset emails.

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(toEmail, name, token) {
  const link = `${process.env.CLIENT_URL}/verify-email.html?token=${token}`;
  await transporter.sendMail({
    from: `"Career Platform" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your email address",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#5B2A9E">Hi ${name},</h2>
        <p>Thanks for signing up. Please verify your email to activate your account.</p>
        <p><a href="${link}" style="background:#5B2A9E;color:#fff;padding:10px 18px;
           border-radius:6px;text-decoration:none;display:inline-block">Verify Email</a></p>
        <p>This link expires in 30 minutes. If you didn't request this, ignore this email.</p>
      </div>`,
  });
}

async function sendResetPasswordEmail(toEmail, name, token) {
  const link = `${process.env.CLIENT_URL}/reset-password.html?token=${token}`;
  await transporter.sendMail({
    from: `"Career Platform" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your password",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#5B2A9E">Hi ${name},</h2>
        <p>We received a request to reset your password. Click below to set a new one.</p>
        <p><a href="${link}" style="background:#5B2A9E;color:#fff;padding:10px 18px;
           border-radius:6px;text-decoration:none;display:inline-block">Reset Password</a></p>
        <p>This link expires in 15 minutes. If you didn't request this, you can ignore this email
           — your password will stay unchanged.</p>
      </div>`,
  });
}

module.exports = { sendVerificationEmail, sendResetPasswordEmail };