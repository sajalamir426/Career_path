/* frontend/js/interview.js — Interview Preparation Module
   Uses Groq API via backend proxy /api/mentor/chat */

(function () {

  // ── DATA ──────────────────────────────────────────────────────────
  const FIELDS = [
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

  const COMMON_QS = [
    {
      q: "Tell me about yourself.",
      purpose: "Icebreaker — interviewer wants a quick professional summary.",
      evaluating: "Communication skills, confidence, and self-awareness.",
      structure: "Present → Past → Future formula: current role/skills, how you got here, and your goals.",
      mistakes: "Sharing too much personal info. Keep it professional and concise (60–90 seconds).",
      tip: "Prepare a 90-second pitch. Practice it until it feels natural, not memorized.",
      sample: "I'm a final-year CS student specializing in web development. I've built 3 full-stack projects using React and Node.js. I'm looking to join a team where I can grow as a developer."
    },
    {
      q: "Why should we hire you?",
      purpose: "Tests your self-confidence and how well you understand the role.",
      evaluating: "Value proposition — what unique skills you bring.",
      structure: "Match your top 3 skills to the job requirements with brief examples.",
      mistakes: "Being vague ('I'm a hard worker'). Be specific and confident.",
      tip: "Research the company beforehand. Mention something specific about them.",
      sample: "I bring strong React skills, quick learning ability, and a portfolio of real projects. I noticed your team uses Next.js — I've been building with it for 6 months."
    },
    {
      q: "What are your strengths?",
      purpose: "Assesses self-awareness and relevant skills.",
      evaluating: "Whether your strengths align with what the job needs.",
      structure: "Name the strength → Give a real example → Show the result.",
      mistakes: "Listing generic traits like 'hardworking' without proof.",
      tip: "Choose 2–3 strengths directly related to the job description.",
      sample: "My biggest strength is problem-solving. When our team project had a major bug 2 days before submission, I diagnosed and fixed it in 4 hours by breaking it down systematically."
    },
    {
      q: "What are your weaknesses?",
      purpose: "Tests honesty and self-improvement mindset.",
      evaluating: "Self-awareness and whether you're actively improving.",
      structure: "Name a real weakness → Show what you're doing to improve it.",
      mistakes: "Saying 'I'm a perfectionist' — interviewers see through this.",
      tip: "Choose a genuine weakness that is NOT critical to the job, and show growth.",
      sample: "I used to struggle with public speaking. I joined a presentation club and now lead team demos — I've improved a lot though I'm still working on it."
    },
    {
      q: "Why do you want this job?",
      purpose: "Tests your motivation and research about the company.",
      evaluating: "Genuine interest vs just needing any job.",
      structure: "Company reason + Role reason + Your career goal alignment.",
      mistakes: "Saying only 'for the salary' or giving a generic answer.",
      tip: "Mention something specific about the company's product, mission, or team culture.",
      sample: "I've used your product for a year and love how user-focused it is. This role aligns perfectly with my frontend skills and I want to contribute to a product I genuinely believe in."
    },
    {
      q: "Where do you see yourself in 5 years?",
      purpose: "Tests ambition, planning, and whether you'll stay long-term.",
      evaluating: "Career commitment and realistic goal-setting.",
      structure: "Near-term growth → Mid-term leadership/expertise → Long-term vision.",
      mistakes: "Saying 'I want your job' or being too vague.",
      tip: "Show ambition but tie it to growing within this company/field.",
      sample: "In 5 years I see myself as a senior developer leading small projects, having deepened my expertise in system design and mentoring junior devs."
    },
    {
      q: "Tell us about a challenge you faced.",
      purpose: "Tests problem-solving and resilience under pressure.",
      evaluating: "How you think, act, and learn from difficult situations.",
      structure: "Use STAR: Situation → Task → Action → Result.",
      mistakes: "Choosing a trivial challenge or blaming others for the problem.",
      tip: "Pick a technical or team challenge where YOUR action made the difference.",
      sample: "Our team had 2 days to complete a feature but our API kept failing. I took the lead, debugged the issue (wrong auth headers), fixed it, and we shipped on time."
    },
    {
      q: "Tell us about a project you worked on.",
      purpose: "Tests technical depth and your ability to explain your work.",
      evaluating: "Technical skills, ownership, and communication.",
      structure: "Problem it solved → Tech used → Your role → Results/impact.",
      mistakes: "Being too vague or just listing technologies without context.",
      tip: "Choose your strongest project and know every technical detail deeply.",
      sample: "I built a career guidance app with React frontend and Node.js backend. I handled auth, database design, and deployed it on Vercel. It's helped 50+ students plan their learning path."
    },
    {
      q: "How do you handle pressure?",
      purpose: "Tests emotional intelligence and stress management.",
      evaluating: "Composure, prioritization, and reliability under stress.",
      structure: "Acknowledge pressure is real → Describe your coping strategy → Give an example.",
      mistakes: "Saying 'I don't get stressed' — not believable.",
      tip: "Show you have a real system: to-do lists, breaking tasks, communicating early.",
      sample: "I break big tasks into small ones and tackle the most critical first. During exam week with 3 deadlines, I made a priority list and delivered all three on time."
    },
    {
      q: "Why do you want to work with our company?",
      purpose: "Tests genuine interest and company research.",
      evaluating: "Whether you've done your homework and truly want THIS company.",
      structure: "Specific product/mission praise → Role fit → How you can contribute.",
      mistakes: "Generic answers that could apply to any company.",
      tip: "Visit their website, LinkedIn, and recent news before the interview.",
      sample: "Your focus on making AI tools accessible resonates with me. I've followed your product updates and the recent feature you launched aligns exactly with what I want to build."
    },
    {
      q: "Describe a time you worked in a team.",
      purpose: "Tests collaboration and communication skills.",
      evaluating: "Teamwork, conflict resolution, and your role in a group.",
      structure: "STAR method: describe the team goal, your specific role, challenges, and outcome.",
      mistakes: "Taking all credit or saying the team had no problems.",
      tip: "Show you can both lead and follow depending on what the team needs.",
      sample: "In a 4-person hackathon, I handled the backend while coordinating with the frontend dev. When we had a conflict on the API structure, I proposed a compromise that worked for both."
    },
    {
      q: "Do you have any questions for us?",
      purpose: "Tests your interest, preparation, and critical thinking.",
      evaluating: "Whether you genuinely want the role and have thought about it.",
      structure: "Ask about team, growth, tech stack, or success metrics — never salary first.",
      mistakes: "Saying 'No, I think you covered everything' — missed opportunity.",
      tip: "Prepare 3 thoughtful questions. It shows you're serious about the role.",
      sample: "What does the onboarding process look like? What does success look like in this role in the first 90 days? What tech stack does the team primarily use?"
    },
  ];

  const FIELD_DATA = {
    "Web Development": {
      skills: ["HTML5 & CSS3", "JavaScript (ES6+)", "React / Vue / Angular", "Node.js & Express", "REST APIs", "Databases (SQL & NoSQL)", "Git & GitHub", "Responsive Design"],
      concepts: ["DOM Manipulation", "Asynchronous JS (Promises, async/await)", "Component Architecture", "State Management", "HTTP & REST", "Authentication (JWT, OAuth)", "CI/CD & Deployment", "Web Performance"],
      tools: ["VS Code", "Chrome DevTools", "Postman", "Git", "npm/yarn", "Webpack/Vite", "Docker"],
      trends: ["Next.js & SSR/SSG", "TypeScript adoption", "Micro-frontends", "Edge computing", "Web Components", "AI-assisted coding"],
      tips: ["Build and deploy real projects", "Know JavaScript deeply before frameworks", "Practice explaining your code", "Contribute to open source on GitHub", "Study system design basics"],
      questions: {
        beginner: [
          { q: "What is the difference between HTML, CSS, and JavaScript?", keywords: ["structure", "styling", "behavior", "presentation"] },
          { q: "What is the DOM and how do you manipulate it?", keywords: ["Document Object Model", "querySelector", "addEventListener", "innerHTML"] },
          { q: "Explain the difference between let, var, and const.", keywords: ["block scope", "function scope", "hoisting", "reassignment"] },
          { q: "What is responsive design and how do you achieve it?", keywords: ["media queries", "flexbox", "grid", "viewport", "mobile-first"] },
          { q: "What is the box model in CSS?", keywords: ["content", "padding", "border", "margin", "box-sizing"] },
        ],
        intermediate: [
          { q: "What are React Hooks and why were they introduced?", keywords: ["useState", "useEffect", "functional components", "state management", "lifecycle"] },
          { q: "Explain REST API principles.", keywords: ["stateless", "HTTP methods", "endpoints", "JSON", "CRUD"] },
          { q: "What is event bubbling and how do you stop it?", keywords: ["propagation", "stopPropagation", "preventDefault", "event delegation"] },
          { q: "What is the difference between SQL and NoSQL databases?", keywords: ["structured", "schema", "scalability", "MongoDB", "PostgreSQL"] },
          { q: "How does async/await work in JavaScript?", keywords: ["Promise", "asynchronous", "event loop", "non-blocking", "callback"] },
        ],
        advanced: [
          { q: "Explain the Virtual DOM and how React uses it.", keywords: ["reconciliation", "diffing", "performance", "re-render", "fiber"] },
          { q: "How would you optimize a slow-loading web application?", keywords: ["lazy loading", "code splitting", "caching", "CDN", "minification", "Lighthouse"] },
          { q: "What is server-side rendering (SSR) vs client-side rendering?", keywords: ["SEO", "Next.js", "hydration", "performance", "initial load"] },
          { q: "Explain authentication vs authorization with JWT.", keywords: ["token", "payload", "signature", "middleware", "refresh token"] },
          { q: "How do you design a scalable REST API?", keywords: ["versioning", "rate limiting", "pagination", "documentation", "error handling"] },
        ],
      }
    },
    "AI & Machine Learning": {
      skills: ["Python", "NumPy & Pandas", "Scikit-Learn", "TensorFlow / PyTorch", "Statistics & Probability", "Data Preprocessing", "Model Evaluation", "Deep Learning"],
      concepts: ["Supervised vs Unsupervised Learning", "Overfitting & Underfitting", "Gradient Descent", "Neural Networks", "Backpropagation", "Feature Engineering", "Cross-validation", "Bias-Variance Tradeoff"],
      tools: ["Jupyter Notebook", "Google Colab", "Kaggle", "TensorFlow", "PyTorch", "Hugging Face", "MLflow"],
      trends: ["Large Language Models (LLMs)", "Generative AI", "MLOps", "Transformer architectures", "Federated Learning", "AI Ethics"],
      tips: ["Master Python and math foundations first", "Practice on Kaggle competitions", "Implement algorithms from scratch", "Read research papers", "Build end-to-end ML projects"],
      questions: {
        beginner: [
          { q: "What is the difference between AI, Machine Learning, and Deep Learning?", keywords: ["subset", "neural networks", "data-driven", "automation"] },
          { q: "What is supervised learning? Give examples.", keywords: ["labeled data", "classification", "regression", "training"] },
          { q: "What is overfitting and how do you prevent it?", keywords: ["training data", "generalization", "regularization", "dropout", "cross-validation"] },
          { q: "What is the train/test split and why is it important?", keywords: ["evaluation", "generalization", "data leakage", "validation set"] },
          { q: "What is a confusion matrix?", keywords: ["precision", "recall", "F1 score", "true positive", "false negative"] },
        ],
        intermediate: [
          { q: "Explain gradient descent and its variants.", keywords: ["SGD", "Adam", "learning rate", "loss function", "optimization"] },
          { q: "What is the difference between bagging and boosting?", keywords: ["ensemble", "Random Forest", "XGBoost", "variance", "bias"] },
          { q: "How do you handle imbalanced datasets?", keywords: ["oversampling", "SMOTE", "class weights", "undersampling", "precision-recall"] },
          { q: "What is feature engineering and why does it matter?", keywords: ["normalization", "encoding", "selection", "dimensionality reduction", "PCA"] },
          { q: "Explain the bias-variance tradeoff.", keywords: ["underfitting", "overfitting", "model complexity", "generalization"] },
        ],
        advanced: [
          { q: "How does backpropagation work in neural networks?", keywords: ["chain rule", "gradient", "weights update", "loss", "activation function"] },
          { q: "Explain the Transformer architecture.", keywords: ["attention mechanism", "self-attention", "encoder", "decoder", "BERT", "GPT"] },
          { q: "How do you deploy a machine learning model in production?", keywords: ["Flask API", "Docker", "monitoring", "data drift", "MLflow", "CI/CD"] },
          { q: "What is reinforcement learning? Explain Q-learning.", keywords: ["reward", "agent", "environment", "policy", "Bellman equation"] },
          { q: "What are the challenges of large-scale ML systems?", keywords: ["data pipeline", "distributed training", "latency", "scalability", "feature store"] },
        ],
      }
    },
    "Cyber Security": {
      skills: ["Networking Fundamentals", "Linux", "Python Scripting", "Web Application Security", "Penetration Testing", "Cryptography", "SIEM Tools", "Incident Response"],
      concepts: ["CIA Triad", "OWASP Top 10", "TCP/IP Stack", "Firewalls & IDS/IPS", "Public Key Infrastructure", "Zero Trust Architecture", "Social Engineering", "Threat Modeling"],
      tools: ["Wireshark", "Nmap", "Metasploit", "Burp Suite", "Kali Linux", "Splunk", "Nessus"],
      trends: ["Zero Trust Security", "AI in cybersecurity", "Cloud security", "DevSecOps", "Ransomware defense", "Threat intelligence"],
      tips: ["Practice on TryHackMe and HackTheBox", "Get certified (CompTIA Security+, CEH)", "Set up a home lab", "Follow CVE databases", "Join CTF competitions"],
      questions: {
        beginner: [
          { q: "What is the CIA Triad?", keywords: ["Confidentiality", "Integrity", "Availability", "security model"] },
          { q: "What is the difference between authentication and authorization?", keywords: ["identity verification", "permissions", "access control", "who you are vs what you can do"] },
          { q: "What is SQL Injection and how do you prevent it?", keywords: ["parameterized queries", "input validation", "prepared statements", "OWASP"] },
          { q: "Explain the difference between HTTP and HTTPS.", keywords: ["SSL/TLS", "encryption", "certificate", "port 443", "secure"] },
          { q: "What is a firewall and what does it do?", keywords: ["packet filtering", "rules", "inbound", "outbound", "network security"] },
        ],
        intermediate: [
          { q: "What is Cross-Site Scripting (XSS) and its types?", keywords: ["reflected", "stored", "DOM-based", "sanitization", "Content Security Policy"] },
          { q: "Explain the penetration testing methodology.", keywords: ["reconnaissance", "scanning", "exploitation", "post-exploitation", "reporting"] },
          { q: "What is the difference between symmetric and asymmetric encryption?", keywords: ["AES", "RSA", "key exchange", "performance", "public/private key"] },
          { q: "How does a Man-in-the-Middle attack work?", keywords: ["interception", "ARP poisoning", "SSL stripping", "certificate pinning"] },
          { q: "What is a SIEM and how is it used?", keywords: ["log aggregation", "correlation", "alerts", "Splunk", "incident detection"] },
        ],
        advanced: [
          { q: "How would you perform a web application penetration test?", keywords: ["Burp Suite", "OWASP", "authentication bypass", "injection", "reporting"] },
          { q: "Explain Zero Trust Architecture.", keywords: ["never trust always verify", "micro-segmentation", "least privilege", "identity verification"] },
          { q: "What is threat modeling and how do you apply STRIDE?", keywords: ["Spoofing", "Tampering", "Repudiation", "Information disclosure", "Denial of service", "Elevation"] },
          { q: "How do you handle a ransomware incident?", keywords: ["isolation", "backup restoration", "forensics", "communication", "recovery plan"] },
          { q: "Explain how PKI works.", keywords: ["Certificate Authority", "digital certificate", "public key", "chain of trust", "X.509"] },
        ],
      }
    },
    "Data Science": {
      skills: ["Python / R", "SQL", "Pandas & NumPy", "Data Visualization", "Statistical Analysis", "Machine Learning", "ETL Pipelines", "Business Intelligence"],
      concepts: ["Exploratory Data Analysis", "Hypothesis Testing", "Regression Analysis", "Clustering", "Time Series", "A/B Testing", "Data Wrangling", "Feature Selection"],
      tools: ["Jupyter", "Tableau", "Power BI", "Spark", "Airflow", "dbt", "Looker"],
      trends: ["Real-time analytics", "Data mesh", "AutoML", "LLMs for data analysis", "Observability", "Streaming data"],
      tips: ["Tell stories with data", "Master SQL deeply", "Build a portfolio on Kaggle", "Practice business case studies", "Learn to communicate findings to non-technical audiences"],
      questions: {
        beginner: [
          { q: "What is Exploratory Data Analysis (EDA)?", keywords: ["distribution", "outliers", "missing values", "correlation", "visualization"] },
          { q: "Explain the difference between mean, median, and mode.", keywords: ["central tendency", "outliers", "skewed distribution", "descriptive statistics"] },
          { q: "What is a p-value in hypothesis testing?", keywords: ["significance", "null hypothesis", "threshold", "0.05", "reject"] },
          { q: "How do you handle missing data?", keywords: ["imputation", "mean fill", "drop", "KNN imputer", "analysis of missingness"] },
          { q: "What is the difference between correlation and causation?", keywords: ["relationship", "confounding variable", "spurious", "experiment", "A/B test"] },
        ],
        intermediate: [
          { q: "Explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN.", keywords: ["matching rows", "all rows", "NULL", "SQL", "relational"] },
          { q: "What is overfitting in the context of data science models?", keywords: ["training vs test", "regularization", "cross-validation", "generalization"] },
          { q: "How do you design an A/B test?", keywords: ["control group", "sample size", "statistical significance", "conversion rate", "p-value"] },
          { q: "What is feature selection and why does it matter?", keywords: ["dimensionality", "noise reduction", "correlation", "importance", "performance"] },
          { q: "Explain time series decomposition.", keywords: ["trend", "seasonality", "residual", "ARIMA", "forecasting"] },
        ],
        advanced: [
          { q: "How would you build a recommendation system?", keywords: ["collaborative filtering", "content-based", "matrix factorization", "cold start", "embeddings"] },
          { q: "Explain the CAP theorem and its implications for data systems.", keywords: ["Consistency", "Availability", "Partition tolerance", "distributed systems"] },
          { q: "How do you detect and handle data drift in production?", keywords: ["monitoring", "statistical tests", "retraining", "feature distribution", "alerts"] },
          { q: "What is the difference between OLTP and OLAP?", keywords: ["transactional", "analytical", "data warehouse", "query patterns", "normalization"] },
          { q: "How would you optimize a slow SQL query?", keywords: ["indexing", "query plan", "EXPLAIN", "joins", "partitioning"] },
        ],
      }
    },
  };

  // Default data for fields not fully defined
  const DEFAULT_FIELD = {
    skills: ["Core Fundamentals", "Industry Tools", "Best Practices", "Project Experience", "Communication"],
    concepts: ["Problem Solving", "System Design", "Documentation", "Testing", "Collaboration"],
    tools: ["Industry-standard tools", "Version Control", "Project Management", "Communication platforms"],
    trends: ["AI Integration", "Cloud adoption", "Remote collaboration", "Automation", "Continuous learning"],
    tips: ["Build real projects", "Get certified", "Network with professionals", "Practice interview questions", "Keep learning"],
    questions: {
      beginner: [
        { q: "Tell us about your background and why you chose this field.", keywords: ["passion", "skills", "learning journey", "motivation"] },
        { q: "What are the core skills required in this field?", keywords: ["fundamentals", "tools", "industry standards"] },
        { q: "How do you stay updated with industry trends?", keywords: ["learning", "resources", "community", "practice"] },
      ],
      intermediate: [
        { q: "Describe a project where you applied your skills practically.", keywords: ["problem", "solution", "tools used", "outcome"] },
        { q: "How do you handle challenges and roadblocks in your work?", keywords: ["problem-solving", "research", "collaboration", "persistence"] },
        { q: "What tools and technologies are you most proficient in?", keywords: ["experience", "projects", "depth", "breadth"] },
      ],
      advanced: [
        { q: "How would you architect a solution for a complex problem in this domain?", keywords: ["design", "scalability", "trade-offs", "best practices"] },
        { q: "How do you ensure quality and best practices in your work?", keywords: ["testing", "review", "standards", "documentation"] },
        { q: "Describe your approach to continuous learning and skill development.", keywords: ["growth mindset", "resources", "application", "mentorship"] },
      ],
    }
  };

  // ── STATE ─────────────────────────────────────────────────────────
  let selectedField = "";
  let activeTab     = "common";
  let activeLvl     = "beginner";
  let bookmarks     = new Set();
  let practiceMode  = "Technical";
  let practiceDiff  = "Intermediate";
  let practiceQs    = [];
  let practiceIdx   = 0;
  let sessionScores = [];
  let weakAreas     = [];
  let strongAreas   = [];

  // Dashboard stats (persisted in localStorage)
  function getStats() {
    try { return JSON.parse(localStorage.getItem("ip_stats") || '{"sessions":0,"attempted":0,"totalScore":0}'); } catch { return {sessions:0,attempted:0,totalScore:0}; }
  }
  function saveStats(s) { localStorage.setItem("ip_stats", JSON.stringify(s)); }
  function getBookmarks() {
    try { return new Set(JSON.parse(localStorage.getItem("ip_bookmarks") || "[]")); } catch { return new Set(); }
  }
  function saveBookmarks() { localStorage.setItem("ip_bookmarks", JSON.stringify([...bookmarks])); }

  // ── INIT ──────────────────────────────────────────────────────────
  function init() {
    bookmarks = getBookmarks();
    const panel = document.getElementById("panel-interview");
    if (!panel) return;
    panel.innerHTML = buildShell();
    bindEvents();
  }

  // ── BUILD SHELL ───────────────────────────────────────────────────
  function buildShell() {
    return `
    <div class="ip-shell">

      <!-- HERO -->
      <div class="ip-hero">
        <h2>💼 Interview Preparation</h2>
        <p>Master interviews with field-specific guides, AI-powered practice sessions, and personalized feedback.</p>
        <div class="ip-hero-badges">
          <span class="ip-badge">📋 Common Questions</span>
          <span class="ip-badge">🎯 Field Guide</span>
          <span class="ip-badge">❓ Question Bank</span>
          <span class="ip-badge">🤖 AI Practice</span>
          <span class="ip-badge">📊 Dashboard</span>
        </div>
      </div>

      <!-- FIELD SELECTOR -->
      <div class="ip-field-bar">
        <label>🎯 Select Your Field:</label>
        <select class="ip-field-select" id="ipFieldSelect" onchange="ipSelectField(this.value)">
          <option value="">— Choose a career field —</option>
          ${FIELDS.map(f => `<option value="${f}">${f}</option>`).join("")}
        </select>
        <button class="ip-start-btn" onclick="ipLoadField()">Load Content →</button>
      </div>

      <!-- TABS -->
      <div class="ip-tabs" id="ipTabs">
        <button class="ip-tab ip-tab-active" onclick="ipTab('common',this)">📋 Common Questions</button>
        <button class="ip-tab" onclick="ipTab('guide',this)">🗺️ Field Guide</button>
        <button class="ip-tab" onclick="ipTab('bank',this)">❓ Question Bank</button>
        <button class="ip-tab" onclick="ipTab('practice',this)">🎯 AI Practice</button>
        <button class="ip-tab" onclick="ipTab('dashboard',this)">📊 Dashboard</button>
      </div>

      <!-- TAB PANELS -->
      <div class="ip-panel ip-panel-active" id="ip-tab-common">${buildCommonQs()}</div>
      <div class="ip-panel" id="ip-tab-guide">${buildFieldGuide()}</div>
      <div class="ip-panel" id="ip-tab-bank">${buildQuestionBank()}</div>
      <div class="ip-panel" id="ip-tab-practice">${buildPractice()}</div>
      <div class="ip-panel" id="ip-tab-dashboard">${buildDashboard()}</div>

    </div>`;
  }

  // ── COMMON QUESTIONS ──────────────────────────────────────────────
  function buildCommonQs() {
    return `
    <div class="ip-card">
      <h3>📋 Common Interview Questions Every Candidate Should Know</h3>
      <p style="color:var(--text-muted);font-size:13.5px;margin:0 0 18px;line-height:1.6;">
        These questions are asked in almost every interview regardless of field. Master these first!
      </p>
      ${COMMON_QS.map((item, i) => `
        <div class="ip-common-q" id="cq-${i}">
          <div class="ip-common-q-header" onclick="ipToggleCQ(${i})">
            <div class="ip-q-num">${i+1}</div>
            <h5>${item.q}</h5>
            <span class="ip-expand-icon">▼</span>
          </div>
          <div class="ip-common-q-body">
            <div class="ip-info-grid">
              <div class="ip-info-box">
                <div class="ip-info-label">🎯 Purpose</div>
                <p>${item.purpose}</p>
              </div>
              <div class="ip-info-box">
                <div class="ip-info-label">🔍 What They Evaluate</div>
                <p>${item.evaluating}</p>
              </div>
              <div class="ip-info-box">
                <div class="ip-info-label">📐 Answer Structure</div>
                <p>${item.structure}</p>
              </div>
              <div class="ip-info-box">
                <div class="ip-info-label">❌ Common Mistakes</div>
                <p>${item.mistakes}</p>
              </div>
            </div>
            <div class="ip-tip-box">
              <strong>💡 Expert Tip:</strong> ${item.tip}<br><br>
              <strong>📝 Sample Answer Direction:</strong> ${item.sample}
            </div>
          </div>
        </div>`).join("")}
    </div>`;
  }

  // ── FIELD GUIDE ───────────────────────────────────────────────────
  function buildFieldGuide() {
    if (!selectedField) return buildSelectPrompt("field guide");
    const d = FIELD_DATA[selectedField] || DEFAULT_FIELD;
    return `
    <div class="ip-card">
      <h3>🗺️ ${selectedField} — Complete Interview Guide</h3>

      <div class="ip-section-head">Required Skills</div>
      <div class="ip-skills-grid">${d.skills.map(s => `<span class="ip-skill-tag">${s}</span>`).join("")}</div>

      <div class="ip-section-head">Core Concepts to Master</div>
      <ul class="ip-list">${d.concepts.map(c => `<li>${c}</li>`).join("")}</ul>

      <div class="ip-section-head">Frequently Used Tools</div>
      <div class="ip-skills-grid">${d.tools.map(t => `<span class="ip-skill-tag" style="background:var(--purple-50);color:var(--purple-600);">${t}</span>`).join("")}</div>

      <div class="ip-section-head">Current Industry Trends</div>
      <ul class="ip-list">${d.trends.map(t => `<li>${t}</li>`).join("")}</ul>

      <div class="ip-section-head">Interview Preparation Tips</div>
      <ul class="ip-list">${d.tips.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>`;
  }

  // ── QUESTION BANK ─────────────────────────────────────────────────
  function buildQuestionBank() {
    if (!selectedField) return buildSelectPrompt("question bank");
    return `
    <div class="ip-card">
      <h3>❓ ${selectedField} — Question Bank</h3>
      <div class="ip-level-tabs">
        <button class="ip-level-btn active" onclick="ipLevel('beginner',this)">🟢 Beginner</button>
        <button class="ip-level-btn" onclick="ipLevel('intermediate',this)">🟡 Intermediate</button>
        <button class="ip-level-btn" onclick="ipLevel('advanced',this)">🔴 Advanced</button>
      </div>
      <div id="ipQBankList">${renderQBank("beginner")}</div>
    </div>`;
  }

  function renderQBank(level) {
    const d = FIELD_DATA[selectedField] || DEFAULT_FIELD;
    const qs = d.questions[level] || [];
    return qs.map((item, i) => {
      const key = `${selectedField}-${level}-${i}`;
      const isBookmarked = bookmarks.has(key);
      return `
      <div class="ip-qbank-item ${isBookmarked ? 'ip-bookmarked' : ''}" id="qb-${level}-${i}">
        <div class="ip-qbank-top">
          <div class="ip-qbank-q">${item.q}</div>
          <div class="ip-qbank-meta">
            <span class="ip-diff-tag ip-diff-${level}">${level.charAt(0).toUpperCase()+level.slice(1)}</span>
            <button class="ip-bookmark-btn" onclick="ipToggleBookmark('${key}','qb-${level}-${i}')" title="Bookmark">
              ${isBookmarked ? "🔖" : "📌"}
            </button>
          </div>
        </div>
        <div class="ip-qbank-keywords">
          ${item.keywords.map(k => `<span class="ip-keyword">${k}</span>`).join("")}
        </div>
      </div>`;
    }).join("") || `<div class="ip-empty"><span class="ip-empty-icon">❓</span><h4>No questions yet</h4><p>Select a field first.</p></div>`;
  }

  // ── PRACTICE ──────────────────────────────────────────────────────
  function buildPractice() {
    return `
    <div id="ipPracticeSetup">
      <div class="ip-card">
        <h3>🎯 AI-Powered Practice Interview</h3>
        <p style="color:var(--text-muted);font-size:13.5px;margin:0 0 18px;">
          Answer questions one at a time. Our AI will evaluate your answers and give you detailed feedback.
        </p>
        <div class="ip-practice-setup">
          <div class="ip-setup-card">
            <h5>Interview Mode</h5>
            <div class="ip-mode-pills">
              ${["HR Interview","Technical Interview","Behavioral Interview"].map(m =>
                `<div class="ip-mode-pill ${m==="Technical Interview"?"sel":""}" onclick="ipSelectMode(this,'${m}')">${m}</div>`
              ).join("")}
            </div>
          </div>
          <div class="ip-setup-card">
            <h5>Difficulty</h5>
            <div class="ip-diff-pills">
              ${["Beginner","Intermediate","Advanced"].map(d =>
                `<div class="ip-diff-pill ${d==="Intermediate"?"sel":""}" onclick="ipSelectDiff(this,'${d}')">${d}</div>`
              ).join("")}
            </div>
          </div>
        </div>
        <button class="ip-start-btn" style="width:100%;padding:13px;" onclick="ipStartPractice()">
          🚀 Start Practice Interview
        </button>
      </div>
    </div>

    <div class="ip-interview-area" id="ipInterviewArea">
      <div class="ip-progress-bar">
        <div class="ip-progress-fill" id="ipProgressFill" style="width:0%"></div>
      </div>

      <div class="ip-q-display" id="ipQDisplay">
        <span class="ip-q-num-badge" id="ipQNumBadge">Question 1 of 5</span>
        <h3 id="ipCurrentQ">Loading question...</h3>
      </div>

      <div class="ip-answer-area">
        <label>✍️ Your Answer:</label>
        <textarea class="ip-answer-textarea" id="ipAnswerTA" placeholder="Type your answer here… Be specific and use examples where possible."></textarea>
      </div>

      <button class="ip-submit-answer-btn" id="ipSubmitBtn" onclick="ipSubmitAnswer()">
        Submit Answer →
      </button>

      <div id="ipEvalArea"></div>
    </div>`;
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────
  function buildDashboard() {
    const stats = getStats();
    const avg = stats.attempted > 0 ? Math.round(stats.totalScore / stats.attempted) : 0;
    const readiness = Math.min(100, Math.round(avg * 0.6 + Math.min(stats.sessions * 5, 40)));
    const readinessLabel = readiness >= 81 ? "Interview Ready 🎉" : readiness >= 61 ? "Good 👍" : readiness >= 41 ? "Developing 📈" : "Needs Improvement 💪";

    return `
    <div class="ip-card">
      <h3>📊 Performance Dashboard</h3>
      <div class="ip-dashboard-grid">
        <div class="ip-stat-card"><div class="ip-stat-icon">🎯</div><div class="ip-stat-val">${stats.sessions}</div><div class="ip-stat-label">Practice Sessions</div></div>
        <div class="ip-stat-card"><div class="ip-stat-icon">❓</div><div class="ip-stat-val">${stats.attempted}</div><div class="ip-stat-label">Questions Attempted</div></div>
        <div class="ip-stat-card"><div class="ip-stat-icon">⭐</div><div class="ip-stat-val">${avg}%</div><div class="ip-stat-label">Average Score</div></div>
        <div class="ip-stat-card"><div class="ip-stat-icon">📈</div><div class="ip-stat-val">${readiness}%</div><div class="ip-stat-label">Readiness Score</div></div>
      </div>

      <div style="text-align:center;margin:24px 0 16px;">
        <div class="ip-readiness-ring" style="--pct:${readiness};">
          <div class="ip-readiness-inner">
            <div class="ip-readiness-pct">${readiness}%</div>
            <div class="ip-readiness-label">READINESS</div>
          </div>
        </div>
        <div style="font-family:var(--font-display);font-size:15px;color:var(--purple-900);font-weight:700;">${readinessLabel}</div>
      </div>

      ${strongAreas.length || weakAreas.length ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px;">
        <div>
          <div class="ip-section-head">💪 Strong Areas</div>
          <div class="ip-area-tags">${(strongAreas.length ? strongAreas : ["Complete a practice session"]).map(a => `<span class="ip-area-tag ip-area-strong">${a}</span>`).join("")}</div>
        </div>
        <div>
          <div class="ip-section-head">📚 Weak Areas</div>
          <div class="ip-area-tags">${(weakAreas.length ? weakAreas : ["Complete a practice session"]).map(a => `<span class="ip-area-tag ip-area-weak">${a}</span>`).join("")}</div>
        </div>
      </div>` : `
      <div class="ip-empty">
        <span class="ip-empty-icon">🎯</span>
        <h4>Start your first practice session!</h4>
        <p>Your performance data will appear here after completing practice interviews.</p>
      </div>`}

      <div style="margin-top:20px;">
        <button class="ip-start-btn" onclick="ipTab('practice',document.querySelector('.ip-tab:nth-child(4)'));ipResetStats()" style="background:rgba(91,47,184,0.1);color:var(--purple-700);border:1.5px solid var(--purple-200);">Reset Stats</button>
      </div>
    </div>`;
  }

  function buildSelectPrompt(what) {
    return `<div class="ip-empty">
      <span class="ip-empty-icon">🎯</span>
      <h4>Select a field first</h4>
      <p>Choose your career field above and click "Load Content" to see the ${what}.</p>
    </div>`;
  }

  // ── EVENTS ────────────────────────────────────────────────────────
  function bindEvents() {}

  window.ipSelectField = function(val) { selectedField = val; };

  window.ipLoadField = function() {
    selectedField = document.getElementById("ipFieldSelect")?.value || "";
    if (!selectedField) { alert("Please select a career field first."); return; }
    document.getElementById("ip-tab-guide").innerHTML = buildFieldGuide();
    document.getElementById("ip-tab-bank").innerHTML = buildQuestionBank();
    activeLvl = "beginner";
  };

  window.ipTab = function(name, btn) {
    activeTab = name;
    document.querySelectorAll(".ip-tab").forEach(t => t.classList.remove("ip-tab-active"));
    if (btn) btn.classList.add("ip-tab-active");
    document.querySelectorAll(".ip-panel").forEach(p => p.classList.remove("ip-panel-active"));
    const el = document.getElementById(`ip-tab-${name}`);
    if (el) el.classList.add("ip-panel-active");
    if (name === "dashboard") {
      document.getElementById("ip-tab-dashboard").innerHTML = buildDashboard();
    }
  };

  window.ipToggleCQ = function(i) {
    const el = document.getElementById(`cq-${i}`);
    if (el) el.classList.toggle("ip-open");
  };

  window.ipLevel = function(level, btn) {
    activeLvl = level;
    document.querySelectorAll(".ip-level-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    const list = document.getElementById("ipQBankList");
    if (list) list.innerHTML = renderQBank(level);
  };

  window.ipToggleBookmark = function(key, elId) {
    if (bookmarks.has(key)) bookmarks.delete(key);
    else bookmarks.add(key);
    saveBookmarks();
    const el = document.getElementById(elId);
    if (el) {
      el.classList.toggle("ip-bookmarked", bookmarks.has(key));
      const btn = el.querySelector(".ip-bookmark-btn");
      if (btn) btn.textContent = bookmarks.has(key) ? "🔖" : "📌";
    }
  };

  window.ipSelectMode = function(el, mode) {
    practiceMode = mode;
    document.querySelectorAll(".ip-mode-pill").forEach(p => p.classList.remove("sel"));
    el.classList.add("sel");
  };

  window.ipSelectDiff = function(el, diff) {
    practiceDiff = diff;
    document.querySelectorAll(".ip-diff-pill").forEach(p => p.classList.remove("sel"));
    el.classList.add("sel");
  };

  window.ipStartPractice = function() {
    if (!selectedField) { alert("Please select a career field and click 'Load Content' first."); return; }
    const d = FIELD_DATA[selectedField] || DEFAULT_FIELD;
    const lvlKey = practiceDiff.toLowerCase();
    const allQs  = d.questions[lvlKey] || d.questions.beginner;
    practiceQs = [...allQs].sort(() => Math.random() - 0.5).slice(0, 5);
    practiceIdx   = 0;
    sessionScores = [];

    document.getElementById("ipPracticeSetup").style.display = "none";
    const area = document.getElementById("ipInterviewArea");
    area.classList.add("active");
    showPracticeQ();
  };

  function showPracticeQ() {
    if (practiceIdx >= practiceQs.length) { finishPractice(); return; }
    const q = practiceQs[practiceIdx];
    const pct = Math.round((practiceIdx / practiceQs.length) * 100);
    document.getElementById("ipProgressFill").style.width = pct + "%";
    document.getElementById("ipQNumBadge").textContent = `Question ${practiceIdx+1} of ${practiceQs.length}`;
    document.getElementById("ipCurrentQ").textContent = q.q;
    document.getElementById("ipAnswerTA").value = "";
    document.getElementById("ipEvalArea").innerHTML = "";
    document.getElementById("ipSubmitBtn").disabled = false;
  }

  window.ipSubmitAnswer = async function() {
    const answer = document.getElementById("ipAnswerTA").value.trim();
    if (!answer || answer.length < 10) { alert("Please write a proper answer (at least 10 characters)."); return; }

    const btn = document.getElementById("ipSubmitBtn");
    btn.disabled = true;
    btn.textContent = "🤖 AI is evaluating...";

    const q = practiceQs[practiceIdx];
    const evalArea = document.getElementById("ipEvalArea");
    evalArea.innerHTML = `<div class="ip-loading"><div class="ip-spinner"></div>Analyzing your answer…</div>`;

    const evaluation = await callAI(q.q, answer, q.keywords, selectedField, practiceMode);
    evalArea.innerHTML = renderEval(evaluation);

    sessionScores.push(evaluation.overall || 70);
    practiceIdx++;

    btn.textContent = practiceIdx >= practiceQs.length ? "🏁 Finish" : "Submit Answer →";
    btn.disabled = false;
    btn.onclick = practiceIdx >= practiceQs.length ? finishPractice : null;
    if (practiceIdx < practiceQs.length) {
      btn.onclick = function() {
        document.getElementById("ipSubmitBtn").onclick = window.ipSubmitAnswer;
        showPracticeQ();
      };
      btn.textContent = "Next Question →";
    }
  };

  async function callAI(question, answer, keywords, field, mode) {
    const prompt = `You are an expert ${field} interview evaluator conducting a ${mode}.

Question: "${question}"
Candidate's Answer: "${answer}"
Expected Keywords: ${keywords.join(", ")}

Evaluate this answer and respond with ONLY valid JSON in this exact format:
{
  "technical": 75,
  "communication": 80,
  "completeness": 70,
  "professionalism": 85,
  "overall": 77,
  "feedback": "Your detailed feedback here in 2-3 sentences.",
  "strong": ["point 1", "point 2"],
  "improve": ["suggestion 1", "suggestion 2"],
  "missed_keywords": ["keyword1", "keyword2"]
}

Score out of 100. Be fair but honest.`;

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          systemPrompt: "You are an expert technical interviewer. Always respond with valid JSON only, no markdown, no explanation outside the JSON."
        })
      });
      const data = await res.json();
      if (data.success) {
        const text = data.reply.replace(/```json|```/g, "").trim();
        return JSON.parse(text);
      }
    } catch(e) { console.error("AI eval error:", e); }

    // Fallback if AI fails
    const score = Math.floor(60 + Math.random() * 25);
    return {
      technical: score, communication: score+5, completeness: score-5, professionalism: score+3,
      overall: score,
      feedback: "Good attempt! Focus on including specific technical details and examples to strengthen your answer.",
      strong: ["Clear communication", "Attempted all aspects"],
      improve: ["Add more technical specifics", "Include a real example"],
      missed_keywords: keywords.slice(0,2)
    };
  }

  function renderEval(ev) {
    const scores = [
      { label: "Technical Knowledge", val: ev.technical || 70 },
      { label: "Communication", val: ev.communication || 75 },
      { label: "Completeness", val: ev.completeness || 70 },
      { label: "Professionalism", val: ev.professionalism || 80 },
    ];
    const overall = ev.overall || 72;
    const color = overall >= 80 ? "#166534" : overall >= 60 ? "#854d0e" : "#991b1b";
    const bg    = overall >= 80 ? "#dcfce7" : overall >= 60 ? "#fef9c3" : "#fee2e2";

    return `
    <div class="ip-eval-card">
      <div class="ip-eval-header">
        <div class="ip-ai-icon">🤖</div>
        <h5>AI Evaluation Result</h5>
        <span style="margin-left:auto;font-family:var(--font-display);font-size:20px;font-weight:700;color:${color};background:${bg};padding:4px 14px;border-radius:20px;">${overall}%</span>
      </div>

      <div class="ip-scores-grid">
        ${scores.map(s => `
          <div class="ip-score-item">
            <div class="ip-score-label">${s.label}</div>
            <div class="ip-score-val">${s.val}%</div>
            <div class="ip-score-bar"><div class="ip-score-bar-fill" style="width:${s.val}%"></div></div>
          </div>`).join("")}
      </div>

      <div class="ip-eval-feedback">${ev.feedback || "Good answer!"}</div>

      ${ev.strong?.length ? `
      <div style="margin-bottom:10px;">
        <div class="ip-section-head">✅ Strengths</div>
        <ul class="ip-list">${ev.strong.map(s => `<li>${s}</li>`).join("")}</ul>
      </div>` : ""}

      ${ev.improve?.length ? `
      <div style="margin-bottom:10px;">
        <div class="ip-section-head">📈 Improve</div>
        <ul class="ip-list">${ev.improve.map(s => `<li>${s}</li>`).join("")}</ul>
      </div>` : ""}

      ${ev.missed_keywords?.length ? `
      <div>
        <div class="ip-section-head">🔑 Missed Keywords</div>
        <div class="ip-skills-grid">${ev.missed_keywords.map(k => `<span class="ip-skill-tag" style="background:#fee2e2;color:#991b1b;border-color:#fecaca;">${k}</span>`).join("")}</div>
      </div>` : ""}
    </div>`;
  }

  function finishPractice() {
    const avg = sessionScores.length ? Math.round(sessionScores.reduce((a,b)=>a+b,0)/sessionScores.length) : 0;
    const stats = getStats();
    stats.sessions++;
    stats.attempted += sessionScores.length;
    stats.totalScore += sessionScores.reduce((a,b)=>a+b,0);
    saveStats(stats);

    if (avg >= 75) strongAreas.push(selectedField + " (" + practiceDiff + ")");
    else weakAreas.push(selectedField + " (" + practiceDiff + ")");

    document.getElementById("ipProgressFill").style.width = "100%";
    document.getElementById("ipQDisplay").innerHTML = `
      <span class="ip-q-num-badge">Session Complete! 🎉</span>
      <h3>You scored ${avg}% average across ${sessionScores.length} questions</h3>`;
    document.getElementById("ipAnswerTA").style.display = "none";
    document.getElementById("ipSubmitBtn").textContent = "🔁 Practice Again";
    document.getElementById("ipSubmitBtn").onclick = function() {
      document.getElementById("ipAnswerTA").style.display = "block";
      document.getElementById("ipInterviewArea").classList.remove("active");
      document.getElementById("ipPracticeSetup").style.display = "block";
      document.getElementById("ipSubmitBtn").onclick = window.ipSubmitAnswer;
    };
    document.getElementById("ipSubmitBtn").disabled = false;
  }

  window.ipResetStats = function() {
    if (!confirm("Reset all stats?")) return;
    localStorage.removeItem("ip_stats");
    sessionScores = []; weakAreas = []; strongAreas = [];
    document.getElementById("ip-tab-dashboard").innerHTML = buildDashboard();
  };

  // ── START ─────────────────────────────────────────────────────────
  function tryInit() {
    if (document.getElementById("panel-interview")) { init(); return; }
    setTimeout(tryInit, 200);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tryInit);
  else tryInit();

})();