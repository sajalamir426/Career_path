/* frontend/js/mentor.js — AI Mentor Module
   Calls /api/mentor/chat (backend proxy) — no API key in browser. */

(function () {
  const STORAGE_KEY = "cp_mentor_history";
  const ASSESS_KEY  = "cp_assessment";

  const MODES = [
    { id: "career",      emoji: "🧭", label: "Career Advisor"     },
    { id: "learning",    emoji: "📚", label: "Learning Mentor"    },
    { id: "interview",   emoji: "🎯", label: "Interview Coach"    },
    { id: "resume",      emoji: "📄", label: "Resume Advisor"     },
    { id: "freelancing", emoji: "🚀", label: "Freelancing Mentor" },
    { id: "skillgap",    emoji: "📈", label: "Skill Gap Analyzer" },
  ];

  const QUICK_PROMPTS = [
    "What career path suits me?",
    "Create a study roadmap for me",
    "Give me mock interview questions",
    "How do I start freelancing?",
    "What skills am I missing?",
    "How do I write a good resume?",
  ];

  let history    = [];
  let activeMode = "career";
  let assessData = null;

  // ── BOOT ──────────────────────────────────────────────────────────
  function init() {
    try { assessData = JSON.parse(localStorage.getItem(ASSESS_KEY) || "null"); } catch {}
    try { history    = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");  } catch {}
    buildUI();
    renderHistory();
    if (history.length === 0) setTimeout(showWelcome, 400);
  }

  // ── BUILD UI ──────────────────────────────────────────────────────
  function buildUI() {
    const panel = document.getElementById("panel-mentor");
    if (!panel) return;

    const field = assessData?.field || "Not Set";
    const level = assessData?.level || "Beginner";

    panel.innerHTML = `
      <div class="mn-shell">

        <!-- HEADER -->
        <div class="mn-header">
          <div class="mn-header-left">
            <div class="mn-avatar">🤖</div>
            <div>
              <div class="mn-title">AI Career Mentor</div>
              <div class="mn-status"><span class="mn-dot"></span>Online · ${field} · ${level}</div>
            </div>
          </div>
          <div class="mn-header-actions">
            <button class="mn-icon-btn" title="Export chat" onclick="mnExport()">⬇</button>
            <button class="mn-icon-btn mn-danger" title="Clear chat" onclick="mnClear()">🗑</button>
          </div>
        </div>

        <!-- MODE PILLS -->
        <div class="mn-modes" id="mnModes">
          ${MODES.map(m => `
            <button class="mn-mode-pill ${m.id === activeMode ? "mn-mode-active" : ""}"
                    data-mode="${m.id}" onclick="mnSetMode('${m.id}')">
              ${m.emoji} ${m.label}
            </button>`).join("")}
        </div>

        <!-- MESSAGES -->
        <div class="mn-messages" id="mnMessages"></div>

        <!-- QUICK PROMPTS -->
        <div class="mn-quick-prompts" id="mnQuickPrompts">
          ${QUICK_PROMPTS.map(p => `<button class="mn-quick-btn" onclick="mnQuick(this)">${p}</button>`).join("")}
        </div>

        <!-- INPUT ROW -->
        <div class="mn-input-row">
          <textarea id="mnInput" class="mn-textarea"
            placeholder="Ask me anything about your career…"
            rows="1"
            onkeydown="mnKeydown(event)"
            oninput="mnResize(this)"></textarea>
          <button class="mn-send-btn" id="mnSendBtn" onclick="mnSend()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>

      </div>`;
  }

  // ── MODE ──────────────────────────────────────────────────────────
  window.mnSetMode = function (modeId) {
    activeMode = modeId;
    document.querySelectorAll(".mn-mode-pill").forEach(btn =>
      btn.classList.toggle("mn-mode-active", btn.dataset.mode === modeId)
    );
    const m = MODES.find(x => x.id === modeId);
    addAIBubble(`Switched to **${m.emoji} ${m.label}** mode. ${getModeHint(modeId)}`);
  };

  function getModeHint(id) {
    return {
      career:      "Ask about salaries, career paths, or industry outlook.",
      learning:    "I'll build a custom study plan or recommend resources.",
      interview:   "Type **Start Interview** to begin a mock session.",
      resume:      "Share your resume details for a full review.",
      freelancing: "Tell me your skills — I'll suggest the best gig ideas.",
      skillgap:    "Tell me your target role and I'll find the gaps.",
    }[id] || "";
  }

  // ── QUICK PROMPT ──────────────────────────────────────────────────
  window.mnQuick = function (btn) {
    const input = document.getElementById("mnInput");
    if (input) { input.value = btn.textContent.trim(); input.focus(); mnResize(input); }
  };

  // ── SEND ──────────────────────────────────────────────────────────
  window.mnSend = async function () {
    const input = document.getElementById("mnInput");
    const text  = (input?.value || "").trim();
    if (!text) return;

    input.value = "";
    mnResize(input);
    hideQuickPrompts();

    addUserBubble(text);
    history.push({ role: "user", content: text });

    setBusy(true);
    showTyping();

    const reply = await callBackend(text);

    removeTyping();
    setBusy(false);

    addAIBubble(reply);
    history.push({ role: "assistant", content: reply });
    save();
  };

  window.mnKeydown = function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); mnSend(); }
  };

  window.mnResize = function (el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 130) + "px";
  };

  // ── BACKEND CALL ──────────────────────────────────────────────────
  async function callBackend(userMsg) {
    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.slice(-12),
          systemPrompt: buildSystem(),
        }),
      });
      const data = await res.json();
      if (data.success) return data.reply;
      return "⚠️ " + (data.message || "Something went wrong. Try again.");
    } catch {
      return "⚠️ Could not reach the server. Please check your connection and try again.";
    }
  }

  function buildSystem() {
    const f  = assessData?.field     || "Not specified";
    const lv = assessData?.level     || "Beginner";
    const g  = assessData?.goal      || "Not specified";
    const st = assessData?.studyTime || "Not specified";
    const mn = MODES.find(m => m.id === activeMode)?.label || "Career Advisor";

    return `You are CareerPath AI Mentor — a professional, empathetic career coach for students and fresh graduates.

USER PROFILE:
- Career Field: ${f}
- Level: ${lv}
- Goal: ${g}
- Study Time: ${st}/day
- Current Mode: ${mn}

RULES:
1. Only help with careers, learning, interviews, resumes, freelancing, internships, and skill development.
2. If asked anything unrelated, reply: "I specialize in career guidance and skill development. How can I help you in these areas?"
3. Personalize every response using the user's career field and level above.
4. For interview mode: conduct mock Q&A, score each answer 1–10, give feedback, ask the next question.
5. For skill gap mode: list missing skills in priority order.
6. Use bullet points and clear sections. Keep answers focused and actionable.
7. Always end with a helpful follow-up question or next step.`;
  }

  // ── RENDER ────────────────────────────────────────────────────────
  function renderHistory() {
    history.forEach(m => {
      if (m.role === "user") renderUserBubble(m.content);
      else renderAIBubble(m.content);
    });
    scrollDown();
  }

  function addUserBubble(text) {
    renderUserBubble(text);
    scrollDown();
  }

  function addAIBubble(text) {
    renderAIBubble(text);
    scrollDown();
  }

  function renderUserBubble(text) {
    const wrap = document.getElementById("mnMessages");
    if (!wrap) return;
    const div = document.createElement("div");
    div.className = "mn-msg mn-msg-user";
    div.innerHTML = `<div class="mn-bubble mn-bubble-user">${esc(text)}</div>`;
    wrap.appendChild(div);
  }

  function renderAIBubble(text) {
    const wrap = document.getElementById("mnMessages");
    if (!wrap) return;
    const div = document.createElement("div");
    div.className = "mn-msg mn-msg-ai";
    div.innerHTML = `
      <div class="mn-ai-avatar">🤖</div>
      <div class="mn-bubble mn-bubble-ai">${fmt(text)}</div>`;
    wrap.appendChild(div);
  }

  function showTyping() {
    const wrap = document.getElementById("mnMessages");
    if (!wrap) return;
    const div = document.createElement("div");
    div.className = "mn-msg mn-msg-ai";
    div.id = "mnTyping";
    div.innerHTML = `
      <div class="mn-ai-avatar">🤖</div>
      <div class="mn-bubble mn-bubble-ai mn-typing">
        <span></span><span></span><span></span>
      </div>`;
    wrap.appendChild(div);
    scrollDown();
  }

  function removeTyping() {
    document.getElementById("mnTyping")?.remove();
  }

  function showWelcome() {
    const f = assessData?.field || "your chosen field";
    const welcome = `Hi there! 👋 I'm your **CareerPath AI Mentor**.

I can see you're working on **${f}**. Here's what I can help with:

• 🧭 Career path advice & industry outlook
• 📚 Custom study plans & resource recommendations
• 🎯 Mock interview practice with instant feedback
• 📄 Resume review & improvement tips
• 🚀 Freelancing strategy for Fiverr & Upwork
• 📈 Skill gap analysis for your target role

**Pick a mode above or type your question to get started!**`;

    addAIBubble(welcome);
    history.push({ role: "assistant", content: welcome });
    save();
  }

  // ── UTILITIES ─────────────────────────────────────────────────────
  function hideQuickPrompts() {
    const el = document.getElementById("mnQuickPrompts");
    if (el) el.style.display = "none";
  }

  function setBusy(busy) {
    const btn = document.getElementById("mnSendBtn");
    if (btn) btn.disabled = busy;
  }

  function scrollDown() {
    const el = document.getElementById("mnMessages");
    if (el) el.scrollTop = el.scrollHeight;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-40)));
  }

  function esc(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function fmt(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^•\s(.+)/gm, "<li>$1</li>")
      .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
      .replace(/\n{2,}/g, "<br><br>")
      .replace(/\n/g, "<br>");
  }

  window.mnExport = function () {
    if (!history.length) { alert("No conversation to export."); return; }
    const txt = history.map(m =>
      `[${m.role === "user" ? "You" : "AI Mentor"}]\n${m.content}`
    ).join("\n\n---\n\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
    a.download = `careerpath-chat-${Date.now()}.txt`;
    a.click();
  };

  window.mnClear = function () {
    if (!confirm("Clear the entire conversation?")) return;
    history = [];
    save();
    const wrap = document.getElementById("mnMessages");
    if (wrap) wrap.innerHTML = "";
    document.getElementById("mnQuickPrompts").style.display = "flex";
    setTimeout(showWelcome, 200);
  };

  // ── START ─────────────────────────────────────────────────────────
  function tryInit() {
    if (document.getElementById("panel-mentor")) { init(); return; }
    setTimeout(tryInit, 200);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tryInit);
  else tryInit();
})();