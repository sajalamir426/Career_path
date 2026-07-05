// frontend/js/api.js
// Small helper to talk to the backend API and show alerts/validation errors.

const API_BASE = "/api/auth";

async function apiPost(endpoint, data, isForm = false) {
  const res = await fetch(API_BASE + endpoint, {
    method: "POST",
    credentials: "include",
    headers: isForm ? {} : { "Content-Type": "application/json" },
    body: isForm ? data : JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({ success: false, message: "Server error" }));
  return { status: res.status, ...json };
}

async function apiGet(endpoint) {
  const res = await fetch(API_BASE + endpoint, { credentials: "include" });
  const json = await res.json().catch(() => ({ success: false, message: "Server error" }));
  return { status: res.status, ...json };
}

async function apiPut(endpoint, data) {
  const res = await fetch(API_BASE + endpoint, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({ success: false, message: "Server error" }));
  return { status: res.status, ...json };
}

function showAlert(elId, message, type = "error") {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = message;
  el.className = `alert show alert-${type}`;
}

function hideAlert(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.className = "alert";
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Live password strength check (4 bars: length, upper/lower, number, special char)
function checkPasswordStrength(password) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password) && /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  return checks.filter(Boolean).length; // 0-4
}

function renderStrength(barsId, labelId, password) {
  const score = checkPasswordStrength(password);
  const bars = document.querySelectorAll(`#${barsId} .bar`);
  const colors = ["#D6395B", "#D6395B", "#E8A53C", "#1E9E6B"];
  const labels = ["Too weak", "Weak", "Good", "Strong"];
  bars.forEach((bar, i) => {
    bar.style.background = i < score ? colors[Math.max(score - 1, 0)] : "#E4DEF2";
  });
  const labelEl = document.getElementById(labelId);
  if (labelEl) labelEl.textContent = password ? labels[Math.max(score - 1, 0)] : "";
}

