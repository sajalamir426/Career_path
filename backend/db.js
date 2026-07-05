const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(process.env.DB_PATH || path.join(dataDir, "database.sqlite"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    goal TEXT DEFAULT '',
    interests TEXT DEFAULT '',
    profile_picture TEXT,
    is_verified INTEGER DEFAULT 0,
    verification_token TEXT,
    verification_token_expires INTEGER,
    reset_token TEXT,
    reset_token_expires INTEGER,
    failed_login_attempts INTEGER DEFAULT 0,
    lock_until INTEGER,
    privacy_public INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  )
`);

function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}
function getUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}
function getUserByVerificationToken(token) {
  return db.prepare("SELECT * FROM users WHERE verification_token = ?").get(token);
}
function getUserByResetToken(token) {
  return db.prepare("SELECT * FROM users WHERE reset_token = ?").get(token);
}
function insertUser(user) {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, goal, verification_token, verification_token_expires)
    VALUES (@name, @email, @password_hash, @goal, @verification_token, @verification_token_expires)
  `);
  const result = stmt.run(user);
  return getUserById(result.lastInsertRowid);
}
function updateUser(id, fields) {
  fields.updated_at = new Date().toISOString();
  const keys = Object.keys(fields).map(k => `${k} = @${k}`).join(", ");
  db.prepare(`UPDATE users SET ${keys} WHERE id = @id`).run({ ...fields, id });
  return getUserById(id);
}
function deleteUser(id) {
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
}
function getAllUsers() {
  return db.prepare("SELECT * FROM users").all();
}

module.exports = {
  getUserByEmail, getUserById, getUserByVerificationToken,
  getUserByResetToken, insertUser, updateUser, deleteUser, getAllUsers
};