// backend/routes/mentor-routes.js
// Secure proxy — Gemini API key stays on server only.

const express = require("express");
const requireAuth = require("../middleware/auth");
const router = express.Router();

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

router.post("/chat", requireAuth, async (req, res) => {
  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, message: "messages array required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, message: "Mentor service not configured" });
  }

  // Convert {role, content} messages -> Gemini "contents" format.
  // Gemini uses roles "user" and "model" (not "assistant").
  const contents = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemPrompt || "You are a helpful career mentor." }],
        },
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", response.status, err);
      return res.status(502).json({ success: false, message: "AI service error. Try again." });
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Sorry, I could not generate a response.";

    return res.json({ success: true, reply: text });

  } catch (err) {
    console.error("Mentor route error:", err);
    return res.status(500).json({ success: false, message: "Server error. Try again." });
  }
});

module.exports = router;