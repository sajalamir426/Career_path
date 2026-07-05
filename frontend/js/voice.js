// frvcaReportSummaryntend/js/voice.js
        // Voice Confidence Analyzer: duration selection, question flow,
        // real browser speech-to-text recording, simulated AI analysis,
        // results dashboard, and final report.

        (function () {
        const DURATIONS = [1, 2, 3, 4, 5];
        const ALL_QUESTIONS = [
            "Tell me about yourself.",
            "What are your strengths?",
            "Why should we hire you?",
            "Describe a challenge you faced.",
            "Where do you see yourself in 5 years?",
        ];
        const FILLER_WORDS = ["um", "uh", "umm", "uhh", "hmm", "like", "you know", "basically", "actually", "so yeah"];

        let vcaState = {
            duration: 5,
            questions: [],
            currentIndex: 0,
            perQuestionSeconds: 60,
            timerInterval: null,
            secondsLeft: 60,
            recognition: null,
            isRecording: false,
            transcripts: [], // per question: {text, durationSpoken, wordCount}
            recordStartTime: null,
        };

        // ---------------- SETUP STAGE ----------------
        function renderDurationList() {
            const wrap = document.getElementById("vcaDurationList");
            wrap.innerHTML = DURATIONS.map((d) => `
            <div class="vca-dur-option ${d === vcaState.duration ? "selected" : ""}" onclick="vcaSelectDuration(${d})">
                <span class="vca-dur-label">${d} Minute${d > 1 ? "s" : ""}</span>
                <span class="vca-dur-count">${d} Question${d > 1 ? "s" : ""}</span>
            </div>
            `).join("");
        }

        function renderQuestionPreview() {
            const qs = ALL_QUESTIONS.slice(0, vcaState.duration);
            const wrap = document.getElementById("vcaQuestionPreview");
            wrap.innerHTML = qs.map((q, i) => `
            <div class="vca-q-preview-row">
                <span><span class="vca-qnum">${i + 1}</span>${q}</span>
                <span>1:00</span>
            </div>
            `).join("");
            document.getElementById("vcaTotalTimeLabel").textContent = `Total Time: ${vcaState.duration}:00 Minutes`;
        }

        window.vcaSelectDuration = function (d) {
            vcaState.duration = d;
            renderDurationList();
            renderQuestionPreview();
        };

        // ---------------- START INTERVIEW ----------------
        window.vcaStartInterview = function () {
            vcaState.questions = ALL_QUESTIONS.slice(0, vcaState.duration);
            vcaState.currentIndex = 0;
            vcaState.transcripts = [];
            showStage("vca-question");
            loadQuestion();
        };

        function showStage(id) {
            document.querySelectorAll(".vca-stage").forEach((s) => (s.style.display = "none"));
            document.getElementById(id).style.display = "block";
        }

        function loadQuestion() {
            const i = vcaState.currentIndex;
            const total = vcaState.questions.length;
            document.getElementById("vcaQTag").textContent = `Question ${i + 1} of ${total}`;
            document.getElementById("vcaQText").textContent = vcaState.questions[i];
            vcaState.perQuestionSeconds = 60;
            vcaState.secondsLeft = 60;
            updateTimerDisplay();
            resetMicUI();
        }

        function resetMicUI() {
            document.getElementById("vcaMicIcon").classList.remove("recording");
            document.getElementById("vcaMicStatus").textContent = "Ready";
            document.getElementById("vcaRecordBtn").textContent = "● Start Recording";
            document.getElementById("vcaRecordBtn").classList.remove("vca-btn-stop");
            document.getElementById("vcaTranscript").textContent = "Your speech will appear here as you talk…";
            document.getElementById("vcaWaveform").style.display = "none";
            setRingProgress(0);
        }

        function updateTimerDisplay() {
            const m = Math.floor(vcaState.secondsLeft / 60).toString().padStart(2, "0");
            const s = (vcaState.secondsLeft % 60).toString().padStart(2, "0");
            document.getElementById("vcaQTimer").textContent = `${m}:${s}`;
        }

        function setRingProgress(pct) {
            const circumference = 628; // 2 * PI * 100
            const offset = circumference - (pct / 100) * circumference;
            document.getElementById("vcaRingProgress").style.strokeDashoffset = offset;
        }

        // ---------------- RECORDING ----------------
        window.vcaToggleRecording = function () {
            if (!vcaState.isRecording) startRecording();
            else stopRecording(true);
        };

        function startRecording() {
            vcaState.isRecording = true;
            vcaState.recordStartTime = Date.now();
            document.getElementById("vcaMicIcon").classList.add("recording");
            document.getElementById("vcaMicStatus").textContent = "Recording...";
            document.getElementById("vcaRecordBtn").textContent = "■ Stop Recording";
            document.getElementById("vcaRecordBtn").classList.add("vca-btn-stop");
            renderWaveform();

            // countdown timer
            clearInterval(vcaState.timerInterval);
            vcaState.timerInterval = setInterval(() => {
            vcaState.secondsLeft--;
            updateTimerDisplay();
            setRingProgress(((60 - vcaState.secondsLeft) / 60) * 100);
            if (vcaState.secondsLeft <= 0) {
                stopRecording(false);
            }
            }, 1000);

            // speech recognition (Chrome/Edge support via webkitSpeechRecognition)
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let liveText = "";
            if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event) => {
                let interim = "";
                let final = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) final += event.results[i][0].transcript + " ";
                else interim += event.results[i][0].transcript;
                }
                liveText += final;
                document.getElementById("vcaTranscript").textContent = (liveText + interim).trim() || "Listening…";
            };
            recognition.onerror = () => {
                document.getElementById("vcaMicStatus").textContent = "Mic unavailable — using estimated analysis";
            };
            recognition.start();
            vcaState.recognition = recognition;
            vcaState._liveTextRef = () => liveText;
            } else {
            document.getElementById("vcaTranscript").textContent =
                "Speech recognition isn't supported in this browser — analysis will use estimated values. (Try Chrome or Edge for live transcription.)";
            vcaState.recognition = null;
            vcaState._liveTextRef = () => "";
            }
        }

        function renderWaveform() {
            const wf = document.getElementById("vcaWaveform");
            wf.style.display = "flex";
            wf.innerHTML = Array.from({ length: 40 })
            .map((_, i) => `<div class="vca-wave-bar" style="animation-delay:${(i % 8) * 0.07}s"></div>`)
            .join("");
        }

        function stopRecording(manual) {
            vcaState.isRecording = false;
            clearInterval(vcaState.timerInterval);
            if (vcaState.recognition) {
            try { vcaState.recognition.stop(); } catch (e) {}
            }
            document.getElementById("vcaMicIcon").classList.remove("recording");
            document.getElementById("vcaMicStatus").textContent = "Processing...";
            document.getElementById("vcaWaveform").style.display = "none";

            const durationSpoken = Math.max(1, Math.round((Date.now() - vcaState.recordStartTime) / 1000));
            const text = (vcaState._liveTextRef ? vcaState._liveTextRef() : "").trim();

            vcaState.transcripts.push({
            question: vcaState.questions[vcaState.currentIndex],
            text,
            durationSpoken,
            wordCount: text ? text.split(/\s+/).filter(Boolean).length : 0,
            });

            // move to next question or finish
            setTimeout(() => {
            if (vcaState.currentIndex < vcaState.questions.length - 1) {
                vcaState.currentIndex++;
                loadQuestion();
            } else {
                runAnalysis();
            }
            }, 600);
        }

        // ---------------- ANALYZING ANIMATION ----------------
        const SCAN_MESSAGES = [
            "Analyzing Voice...",
            "Detecting Speech Patterns...",
            "Calculating Confidence...",
            "Checking Speaking Speed...",
            "Evaluating Clarity...",
            "Generating Suggestions...",
        ];

        function runAnalysis() {
            showStage("vca-analyzing");
            let pct = 0;
            let msgIndex = 0;
            document.querySelectorAll(".vca-scan-check-item").forEach((el) => el.classList.remove("done"));

            const interval = setInterval(() => {
            pct += 4;
            document.getElementById("vcaScanPct").textContent = Math.min(pct, 100) + "%";

            if (pct % 20 === 0 && msgIndex < SCAN_MESSAGES.length) {
                document.getElementById("vcaScanStatus").textContent = SCAN_MESSAGES[msgIndex];
                const checkItem = document.querySelector(`.vca-scan-check-item[data-step="${msgIndex}"]`);
                if (checkItem) {
                checkItem.classList.add("done");
                checkItem.querySelector(".vca-check-icon").textContent = "✓";
                }
                msgIndex++;
            }

            if (pct >= 100) {
                clearInterval(interval);
                document.querySelectorAll(".vca-scan-check-item").forEach((el) => {
                el.classList.add("done");
                el.querySelector(".vca-check-icon").textContent = "✓";
                });
                setTimeout(computeResults, 500);
            }
            }, 90);
        }

        // ---------------- METRIC COMPUTATION (heuristic, based on real transcript where available) ----------------
        function computeResults() {
            const transcripts = vcaState.transcripts;
            const totalWords = transcripts.reduce((sum, t) => sum + t.wordCount, 0);
            const totalSeconds = transcripts.reduce((sum, t) => sum + t.durationSpoken, 0) || 1;
            const fullText = transcripts.map((t) => t.text.toLowerCase()).join(" ");

            // Words per minute
            const wpm = Math.round((totalWords / totalSeconds) * 60) || 0;
            const wpmFallback = wpm === 0 ? 110 + Math.round(Math.random() * 30) : wpm;

            // Filler word count
            let fillerCount = 0;
            FILLER_WORDS.forEach((f) => {
            const matches = fullText.match(new RegExp(`\\b${f}\\b`, "g"));
            if (matches) fillerCount += matches.length;
            });
            if (totalWords === 0) fillerCount = 2 + Math.floor(Math.random() * 4); // fallback estimate

            // Clarity: based on average words per question (longer, complete answers = clearer) + inverse filler ratio
            const avgWordsPerQ = totalWords / Math.max(1, transcripts.length);
            let clarity = Math.min(96, Math.max(50, Math.round(60 + avgWordsPerQ * 0.6 - fillerCount * 2)));
            if (totalWords === 0) clarity = 78 + Math.floor(Math.random() * 10);

            // Confidence: derived from speaking pace closeness to ideal (110-150 WPM) + low filler ratio
            const idealPaceScore = wpmFallback >= 100 && wpmFallback <= 160 ? 100 : Math.max(40, 100 - Math.abs(wpmFallback - 130));
            const fillerPenalty = Math.min(30, fillerCount * 4);
            let confidence = Math.round(idealPaceScore * 0.7 + (100 - fillerPenalty) * 0.3);
            confidence = Math.min(96, Math.max(45, confidence));

            // Hesitation level
            let hesitationLevel = fillerCount <= 2 ? "Low" : fillerCount <= 5 ? "Moderate" : "High";

            // Communication score
            const communication = Math.round((confidence + clarity + (100 - fillerPenalty)) / 3);

            // Overall interview readiness
            const readiness = Math.round((confidence * 0.35 + clarity * 0.3 + communication * 0.25 + idealPaceScore * 0.1));

            const results = {
            confidence,
            wpm: wpmFallback,
            clarity,
            hesitationLevel,
            fillerCount,
            communication,
            readiness: Math.min(97, Math.max(40, readiness)),
            };

            renderResults(results);
        }

        function tagFor(value, goodMin, okMin) {
            if (value >= goodMin) return { cls: "good", label: "Good" };
            if (value >= okMin) return { cls: "ok", label: "OK" };
            return { cls: "low", label: "Needs Work" };
        }

        function ringColor(pct) {
            if (pct >= 75) return "#1E9E6B";
            if (pct >= 55) return "#5B2FB8";
            return "#D6395B";
        }

        function renderResults(r) {
            showStage("vca-results");
            document.getElementById("vcaResultsSub").textContent =
            `Based on ${vcaState.questions.length} answered question(s), totaling ~${vcaState.duration} minute(s) of speech.`;

            const metrics = [
            { label: "Confidence", value: r.confidence, suffix: "%", tag: tagFor(r.confidence, 75, 55) },
            { label: "Speaking Speed", value: r.wpm, suffix: " WPM", tag: r.wpm >= 100 && r.wpm <= 160 ? { cls: "good", label: "Ideal" } : { cls: "ok", label: r.wpm < 100 ? "Slow" : "Fast" } },
            { label: "Speech Clarity", value: r.clarity, suffix: "%", tag: tagFor(r.clarity, 80, 60) },
            { label: "Filler Words", value: r.fillerCount, suffix: "", tag: r.fillerCount <= 2 ? { cls: "good", label: "Low" } : r.fillerCount <= 5 ? { cls: "ok", label: "Moderate" } : { cls: "low", label: "High" } },
            { label: "Hesitation", value: r.hesitationLevel, suffix: "", isText: true, tag: r.hesitationLevel === "Low" ? { cls: "good", label: "Low" } : r.hesitationLevel === "Moderate" ? { cls: "ok", label: "Moderate" } : { cls: "low", label: "High" } },
            { label: "Communication", value: r.communication, suffix: "%", tag: tagFor(r.communication, 75, 55) },
            { label: "Interview Readiness", value: r.readiness, suffix: "%", tag: tagFor(r.readiness, 75, 55) },
            ];

            document.getElementById("vcaResultsGrid").innerHTML = metrics.map((m) => {
            const pctForRing = m.isText ? (m.value === "Low" ? 85 : m.value === "Moderate" ? 55 : 30) : Math.min(100, m.value);
            const color = ringColor(pctForRing); // FIX: this was missing/lost, causing "color is not defined"
            return `
                <div class="vca-metric-card">
                <div class="vca-metric-ring" style="background: conic-gradient(${color} calc(${pctForRing} * 1%), var(--border) 0);">
                    <div class="vca-metric-ring-inner"><b>${m.value}${m.suffix}</b></div>
                </div>
                <div class="vca-metric-label">${m.label}</div>
                <span class="vca-metric-tag ${m.tag.cls}">${m.tag.label}</span>
                </div>`;
            }).join("");

            renderSuggestions(r);
            renderFinalReport(r);
        }

        function renderSuggestions(r) {
            const suggestions = [];
            if (r.fillerCount > 2) suggestions.push({ icon: "⚠️", text: `Try to reduce filler words like "um" and "uh" — you used approximately ${r.fillerCount}.` });
            else suggestions.push({ icon: "✅", text: "Great job keeping filler words to a minimum!" });

            if (r.wpm < 100) suggestions.push({ icon: "🐢", text: "Try speaking slightly faster — a pace of 110-150 WPM feels more confident and engaging." });
            else if (r.wpm > 160) suggestions.push({ icon: "⚡", text: "Try slowing down a bit for better clarity — aim for 110-150 words per minute." });
            else suggestions.push({ icon: "✅", text: "Your speaking pace is ideal for interviews." });

            if (r.clarity < 75) suggestions.push({ icon: "🗣️", text: "Work on structuring your answers more clearly — try the STAR method (Situation, Task, Action, Result)." });
            else suggestions.push({ icon: "⭐", text: "Your speech clarity is strong — keep it up!" });

            suggestions.push({ icon: "⏸️", text: "Add short, deliberate pauses between key points to sound more composed." });
            suggestions.push({ icon: "🔊", text: "Maintain a steady, consistent volume throughout your answer." });
            if (r.confidence < 70) suggestions.push({ icon: "💪", text: "Practice answering common behavioral questions out loud daily to build confidence." });

            document.getElementById("vcaSuggestionsList").innerHTML = suggestions
            .map((s) => `<div class="vca-suggestion-row"><span class="vca-sug-icon">${s.icon}</span><span>${s.text}</span></div>`)
            .join("");
        }

        function renderFinalReport(r) {
            const strengths = [];
            const weaknesses = [];

            if (r.confidence >= 70) strengths.push("Confident tone"); else weaknesses.push("Confidence");
            if (r.clarity >= 75) strengths.push("Clear articulation"); else weaknesses.push("Speech clarity");
            if (r.fillerCount <= 2) strengths.push("Minimal filler words"); else weaknesses.push("Filler word usage");
            if (r.wpm >= 100 && r.wpm <= 160) strengths.push("Ideal speaking pace"); else weaknesses.push("Speaking pace");
            if (r.communication >= 75) strengths.push("Strong communication"); else weaknesses.push("Communication structure");

            if (strengths.length === 0) strengths.push("Willingness to practice — that's the first step!");
            if (weaknesses.length === 0) weaknesses.push("No major weaknesses detected — keep practicing to maintain consistency.");

            document.getElementById("vcaReportSummary").textContent =
            `You completed a ${vcaState.duration}-minute mock interview with an overall Interview Readiness score of ${r.readiness}%. ` +
            `Your speaking pace averaged ${r.wpm} words per minute with ${r.hesitationLevel.toLowerCase()} hesitation. ` +
            (r.readiness >= 75
                ? "You're performing at a strong, interview-ready level — keep practicing to stay sharp."
                : "With a bit more practice on the areas below, you'll significantly improve your interview performance.");

            document.getElementById("vcaStrengthsList").innerHTML = strengths.map((s) => `<span class="vca-pill-tag">${s}</span>`).join("");
            document.getElementById("vcaWeaknessesList").innerHTML = weaknesses.map((s) => `<span class="vca-pill-tag weak">${s}</span>`).join("");

            const practiceActivities = [
            "Record yourself answering 1 question daily and review the playback.",
            "Practice the STAR method for behavioral questions.",
            "Read a paragraph aloud slowly to build pace control.",
            "Do a mock interview with a friend or mentor weekly.",
            ];
            document.getElementById("vcaPracticeList").innerHTML = practiceActivities
            .map((p) => `<div class="vca-suggestion-row"><span class="vca-sug-icon">📌</span><span>${p}</span></div>`)
            .join("");
        }

        // ---------------- RESTART ----------------
        window.vcaRestart = function () {
            vcaState = { ...vcaState, currentIndex: 0, transcripts: [], isRecording: false };
            showStage("vca-setup");
        };

        // ---------------- INIT ----------------
        document.addEventListener("DOMContentLoaded", () => {
            if (document.getElementById("vcaDurationList")) {
            renderDurationList();
            renderQuestionPreview();
            }
        });
        })();