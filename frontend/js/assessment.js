(function () {

  // ================================================================
  // FIELD DATABASE — 11 fields, fully detailed
  // ================================================================
  const FIELDS = {
    "Web Development": {
      interests: ["Coding", "Problem Solving", "Design"],
      subjects: ["Computer Science"],
      workType: ["Technical"],
      outlook: "One of the highest-demand skills globally. Freelance and full-time opportunities are abundant across every industry.",
      resources: {
        docs: [
          { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
          { name: "W3Schools", url: "https://www.w3schools.com" },
          { name: "CSS-Tricks", url: "https://css-tricks.com" },
          { name: "JavaScript.info", url: "https://javascript.info" },
          { name: "React Docs", url: "https://react.dev" },
        ],
        youtube: [
          { name: "Traversy Media", url: "https://www.youtube.com/@TraversyMedia" },
          { name: "The Net Ninja", url: "https://www.youtube.com/@NetNinja" },
          { name: "Fireship", url: "https://www.youtube.com/@Fireship" },
          { name: "Kevin Powell (CSS)", url: "https://www.youtube.com/@KevinPowell" },
          { name: "Code with Harry (Urdu/Hindi)", url: "https://www.youtube.com/@CodeWithHarry" },
        ],
        practice: [
          { name: "Frontend Mentor", url: "https://www.frontendmentor.io" },
          { name: "freeCodeCamp", url: "https://www.freecodecamp.org" },
          { name: "CodePen", url: "https://codepen.io" },
          { name: "LeetCode (JS)", url: "https://leetcode.com" },
        ],
      },
      visual: ["HTML & CSS", "JavaScript", "DOM & Events", "Git & GitHub", "React Basics", "State Management", "Full Project", "Deploy & Portfolio"],
      roadmap3: [
        { week: 1, title: "HTML Fundamentals", daily: ["Day 1: HTML structure, tags, semantics", "Day 2: Forms, tables, media elements", "Day 3: HTML5 APIs overview", "Day 4: Build a personal bio page", "Day 5: Review & fix errors", "Day 6: Add accessibility attributes", "Day 7: Submit & get peer feedback"] },
        { week: 2, title: "CSS Foundations", daily: ["Day 1: Selectors, box model, units", "Day 2: Flexbox layout", "Day 3: CSS Grid", "Day 4: Responsive design & media queries", "Day 5: CSS variables & custom properties", "Day 6: Animations & transitions", "Day 7: Style your bio page fully"] },
        { week: 3, title: "JavaScript Basics", daily: ["Day 1: Variables, data types, operators", "Day 2: Functions, scope, hoisting", "Day 3: Arrays & array methods", "Day 4: Objects & destructuring", "Day 5: Loops & conditionals", "Day 6: ES6+ features (arrow functions, spread)", "Day 7: Mini quiz project in JS"] },
        { week: 4, title: "DOM Manipulation", daily: ["Day 1: querySelector, getElementById", "Day 2: Event listeners & event bubbling", "Day 3: Create, append, remove elements", "Day 4: Form validation with JS", "Day 5: Local storage basics", "Day 6: Build a to-do list app", "Day 7: Polish & deploy to GitHub Pages"] },
        { week: 5, title: "Git & GitHub", daily: ["Day 1: Install git, init, commit", "Day 2: Branches & merging", "Day 3: Remote repos, push, pull", "Day 4: Pull requests workflow", "Day 5: GitHub Pages deployment", "Day 6: Resolve merge conflicts", "Day 7: Push your projects to GitHub"] },
        { week: 6, title: "React Fundamentals", daily: ["Day 1: Create React App, JSX basics", "Day 2: Components & props", "Day 3: useState & useEffect", "Day 4: Lists & conditional rendering", "Day 5: React Router basics", "Day 6: Fetch API + display data", "Day 7: Build a weather app"] },
        { week: 7, title: "React Project", daily: ["Day 1: Plan a full app (e-commerce or blog)", "Day 2-3: Build component tree", "Day 4: Add routing & navigation", "Day 5: Connect to a free API", "Day 6: Style with CSS modules or Tailwind", "Day 7: Deploy on Vercel/Netlify"] },
        { week: 8, title: "Portfolio & Interview Prep", daily: ["Day 1: Build portfolio site", "Day 2: Write project case studies", "Day 3: Add all projects to GitHub", "Day 4: Practice 10 JS interview questions", "Day 5: Practice 10 React interview questions", "Day 6: Mock interview with a peer", "Day 7: Apply to 3 jobs or freelance platforms"] },
        { week: 9, title: "APIs & Backend Basics", daily: ["Day 1: REST API concepts", "Day 2: Fetch & Axios", "Day 3: Node.js basics", "Day 4: Express server setup", "Day 5: Connect frontend to backend", "Day 6: Environment variables & security", "Day 7: Full-stack mini project"] },
        { week: 10, title: "Advanced React & State", daily: ["Day 1: Context API", "Day 2: useReducer", "Day 3: Intro to Redux Toolkit", "Day 4: React Query basics", "Day 5: Performance optimization (memo, lazy)", "Day 6: Testing with React Testing Library", "Day 7: Refactor your main project"] },
        { week: 11, title: "TypeScript Basics", daily: ["Day 1: Types, interfaces, enums", "Day 2: TypeScript with React", "Day 3: Generic types", "Day 4: Migrate a JS project to TS", "Day 5: Type-safe API calls", "Day 6: Practice TS exercises", "Day 7: Update portfolio project"] },
        { week: 12, title: "Capstone & Launch", daily: ["Day 1-2: Plan final capstone project", "Day 3-4: Build full features", "Day 5: Write documentation", "Day 6: Deploy live + custom domain", "Day 7: Share on LinkedIn & start applying"] },
      ],
      roadmap6: [
        { week: 1, title: "HTML Fundamentals", daily: ["Day 1-2: HTML tags, structure, semantics", "Day 3-4: Forms, tables, media", "Day 5: HTML5 APIs", "Day 6-7: Personal bio page project"] },
        { week: 2, title: "CSS Foundations", daily: ["Day 1-2: Selectors, box model, Flexbox", "Day 3-4: Grid & responsive design", "Day 5-6: Animations, variables", "Day 7: Style bio page"] },
        { week: 3, title: "JavaScript Basics", daily: ["Day 1-2: Variables, functions, scope", "Day 3-4: Arrays, objects, ES6+", "Day 5-6: DOM manipulation", "Day 7: Mini project"] },
        { week: 4, title: "Git & Projects", daily: ["Day 1-2: Git basics, branches", "Day 3-4: GitHub workflow", "Day 5-6: Deploy to GitHub Pages", "Day 7: Push all projects"] },
        { week: 5, title: "React Fundamentals", daily: ["Day 1-2: JSX, components, props", "Day 3-4: useState, useEffect", "Day 5-6: React Router, API fetch", "Day 7: Weather app"] },
        { week: 6, title: "React Project", daily: ["Day 1-2: Plan & scaffold app", "Day 3-4: Build features", "Day 5-6: Style & polish", "Day 7: Deploy"] },
        { week: 7, title: "Node.js & Express", daily: ["Day 1-2: Node basics, npm", "Day 3-4: Express routes, middleware", "Day 5-6: REST API", "Day 7: Connect to frontend"] },
        { week: 8, title: "Databases", daily: ["Day 1-2: MongoDB basics", "Day 3-4: Mongoose ODM", "Day 5-6: CRUD operations", "Day 7: Full-stack mini app"] },
        { week: 9, title: "Authentication", daily: ["Day 1-2: JWT basics", "Day 3-4: bcrypt, password hashing", "Day 5-6: Protected routes", "Day 7: Auth in your project"] },
        { week: 10, title: "TypeScript", daily: ["Day 1-2: Types, interfaces", "Day 3-4: TS with React", "Day 5-6: Migrate a project", "Day 7: Practice exercises"] },
        { week: 11, title: "Testing & DevOps Basics", daily: ["Day 1-2: Jest basics", "Day 3-4: React Testing Library", "Day 5: CI/CD intro", "Day 6-7: GitHub Actions workflow"] },
        { week: 12, title: "Advanced React", daily: ["Day 1-2: Redux Toolkit", "Day 3-4: React Query", "Day 5-6: Performance optimization", "Day 7: Refactor project"] },
        { week: 13, title: "Full-Stack Project Start", daily: ["Day 1-2: Plan capstone (MERN stack)", "Day 3-4: Database schema", "Day 5-6: Backend API", "Day 7: Frontend scaffold"] },
        { week: 14, title: "Full-Stack Project Build", daily: ["Day 1-2: Core features", "Day 3-4: Auth integration", "Day 5-6: UI polish", "Day 7: Internal testing"] },
        { week: 15, title: "Deployment & Optimization", daily: ["Day 1-2: Deploy backend (Railway/Render)", "Day 3-4: Deploy frontend (Vercel)", "Day 5: Environment config", "Day 6-7: Performance & security"] },
        { week: 16, title: "Portfolio & Job Prep", daily: ["Day 1-2: Portfolio site", "Day 3-4: Case studies & GitHub", "Day 5: Interview Q&A practice", "Day 6: Mock interview", "Day 7: Apply & network"] },
      ],
    },

    "AI & Machine Learning": {
      interests: ["Artificial Intelligence", "Coding", "Mathematics", "Research"],
      subjects: ["Computer Science", "Mathematics", "Statistics"],
      workType: ["Analytical", "Technical"],
      outlook: "Fastest-growing tech field globally. High salaries, research opportunities, and startup potential are massive.",
      resources: {
        docs: [
          { name: "TensorFlow Docs", url: "https://www.tensorflow.org/learn" },
          { name: "PyTorch Docs", url: "https://pytorch.org/docs/stable/index.html" },
          { name: "Scikit-Learn Docs", url: "https://scikit-learn.org/stable/user_guide.html" },
          { name: "Hugging Face Docs", url: "https://huggingface.co/docs" },
          { name: "fast.ai Course", url: "https://course.fast.ai" },
        ],
        youtube: [
          { name: "Andrej Karpathy", url: "https://www.youtube.com/@AndrejKarpathy" },
          { name: "Krish Naik", url: "https://www.youtube.com/@krishnaik06" },
          { name: "Sentdex", url: "https://www.youtube.com/@sentdex" },
          { name: "3Blue1Brown (Math)", url: "https://www.youtube.com/@3blue1brown" },
          { name: "StatQuest", url: "https://www.youtube.com/@statquest" },
        ],
        practice: [
          { name: "Kaggle", url: "https://www.kaggle.com" },
          { name: "Google Colab", url: "https://colab.research.google.com" },
          { name: "Papers With Code", url: "https://paperswithcode.com" },
          { name: "Hugging Face Spaces", url: "https://huggingface.co/spaces" },
        ],
      },
      visual: ["Python & Math", "Numpy/Pandas", "Scikit-Learn", "Neural Nets", "TensorFlow", "Deep Learning", "NLP Basics", "Capstone"],
      roadmap3: [
        { week: 1, title: "Python for ML", daily: ["Day 1: Python syntax, lists, dicts", "Day 2: Functions, classes, modules", "Day 3: NumPy arrays & operations", "Day 4: Pandas DataFrames", "Day 5: Data cleaning with Pandas", "Day 6: Matplotlib basic plots", "Day 7: EDA on a real dataset (Titanic)"] },
        { week: 2, title: "Math Foundations", daily: ["Day 1: Linear algebra — vectors, matrices", "Day 2: Matrix multiplication, transpose", "Day 3: Calculus — derivatives basics", "Day 4: Chain rule & partial derivatives", "Day 5: Probability & distributions", "Day 6: Bayes theorem", "Day 7: Implement gradient manually in Python"] },
        { week: 3, title: "Classical ML — Regression", daily: ["Day 1: What is ML, types of learning", "Day 2: Linear regression math", "Day 3: Scikit-learn LinearRegression", "Day 4: Train/test split, cross-validation", "Day 5: Evaluation metrics (MSE, R²)", "Day 6: Regularization (Ridge, Lasso)", "Day 7: House price prediction project"] },
        { week: 4, title: "Classification & Trees", daily: ["Day 1: Logistic regression", "Day 2: Decision trees", "Day 3: Random Forest", "Day 4: SVM basics", "Day 5: KNN algorithm", "Day 6: Confusion matrix, precision, recall", "Day 7: Email spam classifier project"] },
        { week: 5, title: "Neural Networks", daily: ["Day 1: Perceptron & activation functions", "Day 2: Forward propagation", "Day 3: Backpropagation & gradient descent", "Day 4: Keras Sequential model", "Day 5: Training loops, epochs, batch size", "Day 6: Overfitting & dropout", "Day 7: Digit classifier (MNIST)"] },
        { week: 6, title: "Deep Learning & CNNs", daily: ["Day 1: Convolutional layers", "Day 2: Pooling & padding", "Day 3: Build CNN in Keras", "Day 4: Transfer learning (VGG16, ResNet)", "Day 5: Fine-tuning pretrained models", "Day 6: Image classification project", "Day 7: Deploy model as Flask API"] },
        { week: 7, title: "NLP Basics", daily: ["Day 1: Tokenization, stemming, lemmatization", "Day 2: TF-IDF, Bag of Words", "Day 3: Word embeddings (Word2Vec)", "Day 4: Hugging Face transformers intro", "Day 5: Sentiment analysis pipeline", "Day 6: Text classification project", "Day 7: Build a simple chatbot"] },
        { week: 8, title: "Kaggle & Portfolio", daily: ["Day 1: Join a beginner Kaggle competition", "Day 2-3: EDA & feature engineering", "Day 4-5: Model training & tuning", "Day 6: Submit predictions", "Day 7: Write project README + push to GitHub"] },
      ],
      roadmap6: [
        { week: 1, title: "Python & NumPy", daily: ["Day 1-2: Python basics, NumPy", "Day 3-4: Pandas & data cleaning", "Day 5-6: Matplotlib & Seaborn", "Day 7: EDA project"] },
        { week: 2, title: "Math for ML", daily: ["Day 1-2: Linear algebra", "Day 3-4: Calculus basics", "Day 5-6: Probability & stats", "Day 7: Python math implementations"] },
        { week: 3, title: "ML Fundamentals", daily: ["Day 1-2: Linear & logistic regression", "Day 3-4: Decision trees, Random Forest", "Day 5-6: SVM, KNN", "Day 7: Classification project"] },
        { week: 4, title: "ML Intermediate", daily: ["Day 1-2: Feature engineering", "Day 3-4: Cross-validation", "Day 5-6: Hyperparameter tuning", "Day 7: Kaggle beginner competition"] },
        { week: 5, title: "Neural Networks", daily: ["Day 1-2: Perceptron, backprop", "Day 3-4: Keras basics", "Day 5-6: MNIST classifier", "Day 7: Overfitting techniques"] },
        { week: 6, title: "Deep Learning", daily: ["Day 1-2: CNNs", "Day 3-4: Transfer learning", "Day 5-6: Image project", "Day 7: Deploy with Flask"] },
        { week: 7, title: "RNNs & Sequences", daily: ["Day 1-2: RNN concepts", "Day 3-4: LSTMs", "Day 5-6: Time series prediction", "Day 7: Stock price project"] },
        { week: 8, title: "NLP Basics", daily: ["Day 1-2: Text preprocessing", "Day 3-4: TF-IDF, embeddings", "Day 5-6: Sentiment analysis", "Day 7: Text classifier"] },
        { week: 9, title: "Transformers & Hugging Face", daily: ["Day 1-2: Attention mechanism", "Day 3-4: BERT basics", "Day 5-6: Hugging Face pipelines", "Day 7: Fine-tune a model"] },
        { week: 10, title: "MLOps Basics", daily: ["Day 1-2: MLflow tracking", "Day 3-4: Model versioning", "Day 5-6: Docker for ML", "Day 7: CI/CD pipeline"] },
        { week: 11, title: "Computer Vision Project", daily: ["Day 1-2: Dataset collection", "Day 3-4: Model architecture", "Day 5-6: Training & eval", "Day 7: Deploy as API"] },
        { week: 12, title: "NLP Project", daily: ["Day 1-2: Choose NLP task", "Day 3-4: Fine-tune transformer", "Day 5-6: Build interface", "Day 7: Deploy on Hugging Face Spaces"] },
        { week: 13, title: "Reinforcement Learning Intro", daily: ["Day 1-2: RL concepts", "Day 3-4: OpenAI Gym", "Day 5-6: Q-learning", "Day 7: Train a game agent"] },
        { week: 14, title: "Research Paper Reading", daily: ["Day 1-2: Read Attention Is All You Need", "Day 3-4: Implement key idea", "Day 5-6: Read ResNet paper", "Day 7: Summarize learnings"] },
        { week: 15, title: "Capstone Project", daily: ["Day 1-2: Define problem & dataset", "Day 3-4: EDA & preprocessing", "Day 5-6: Model training", "Day 7: Evaluation & documentation"] },
        { week: 16, title: "Portfolio & Interviews", daily: ["Day 1-2: GitHub portfolio cleanup", "Day 3-4: Write case studies", "Day 5: ML interview Q&A", "Day 6: Mock interview", "Day 7: Apply to roles"] },
      ],
    },

    "Data Science": {
      interests: ["Data Analysis", "Mathematics", "Research"],
      subjects: ["Mathematics", "Statistics", "Computer Science"],
      workType: ["Analytical"],
      outlook: "Strong demand across finance, healthcare, retail, and tech. Data scientists are among the best-paid professionals.",
      resources: {
        docs: [
          { name: "Pandas Docs", url: "https://pandas.pydata.org/docs/" },
          { name: "NumPy Docs", url: "https://numpy.org/doc/" },
          { name: "Scikit-Learn", url: "https://scikit-learn.org/stable/" },
          { name: "Seaborn Docs", url: "https://seaborn.pydata.org" },
          { name: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
        ],
        youtube: [
          { name: "StatQuest with Josh Starmer", url: "https://www.youtube.com/@statquest" },
          { name: "Krish Naik", url: "https://www.youtube.com/@krishnaik06" },
          { name: "Alex The Analyst", url: "https://www.youtube.com/@AlexTheAnalyst" },
          { name: "Data School", url: "https://www.youtube.com/@dataschool" },
        ],
        practice: [
          { name: "Kaggle Competitions", url: "https://www.kaggle.com/competitions" },
          { name: "Google Colab", url: "https://colab.research.google.com" },
          { name: "Tableau Public", url: "https://public.tableau.com" },
          { name: "Mode Analytics", url: "https://mode.com" },
        ],
      },
      visual: ["Python Basics", "Pandas & NumPy", "Statistics", "Visualization", "ML Basics", "SQL", "Projects", "Portfolio"],
      roadmap3: [
        { week: 1, title: "Python & Data Tools", daily: ["Day 1: Python basics recap", "Day 2: NumPy arrays", "Day 3: Pandas Series & DataFrame", "Day 4: Data loading (CSV, Excel, JSON)", "Day 5: Data cleaning (nulls, duplicates)", "Day 6: GroupBy, pivot tables", "Day 7: Analyze a real dataset (Titanic)"] },
        { week: 2, title: "Statistics Fundamentals", daily: ["Day 1: Mean, median, mode, variance", "Day 2: Normal distribution & Z-scores", "Day 3: Probability basics", "Day 4: Hypothesis testing", "Day 5: Correlation & causation", "Day 6: A/B testing concepts", "Day 7: Stats project on dataset"] },
        { week: 3, title: "Data Visualization", daily: ["Day 1: Matplotlib basics", "Day 2: Seaborn statistical plots", "Day 3: Plotly interactive charts", "Day 4: Choosing the right chart type", "Day 5: Dashboard with subplots", "Day 6: Visualization storytelling", "Day 7: Full EDA report on Kaggle dataset"] },
        { week: 4, title: "SQL for Data Science", daily: ["Day 1: SELECT, WHERE, ORDER BY", "Day 2: GROUP BY, HAVING, aggregates", "Day 3: JOINs (inner, left, right)", "Day 4: Subqueries & CTEs", "Day 5: Window functions", "Day 6: SQL in Python (sqlite3, SQLAlchemy)", "Day 7: SQL analysis project"] },
        { week: 5, title: "Machine Learning Basics", daily: ["Day 1: Supervised vs unsupervised", "Day 2: Linear regression", "Day 3: Classification (logistic reg, decision tree)", "Day 4: Clustering (K-means)", "Day 5: Model evaluation metrics", "Day 6: Feature engineering basics", "Day 7: Kaggle beginner competition"] },
        { week: 6, title: "Advanced Analysis", daily: ["Day 1: Time series basics", "Day 2: Rolling averages, trends", "Day 3: Forecasting with statsmodels", "Day 4: Text data analysis", "Day 5: Geospatial data intro", "Day 6: Business metrics & KPIs", "Day 7: End-to-end analysis project"] },
        { week: 7, title: "Data Project", daily: ["Day 1: Define a business question", "Day 2: Collect/obtain dataset", "Day 3: Clean & preprocess", "Day 4: EDA & visualization", "Day 5: Model or analysis", "Day 6: Write findings report", "Day 7: Publish on Kaggle or GitHub"] },
        { week: 8, title: "Portfolio & Interviews", daily: ["Day 1: Create portfolio on GitHub", "Day 2: Write 2 case studies", "Day 3: Practice SQL interview questions", "Day 4: Practice statistics questions", "Day 5: Practice Python & Pandas questions", "Day 6: Mock case study interview", "Day 7: Apply to analyst/scientist roles"] },
      ],
      roadmap6: [
        { week: 1, title: "Python & NumPy", daily: ["Day 1-2: Python basics", "Day 3-4: NumPy", "Day 5-6: Pandas", "Day 7: Dataset EDA"] },
        { week: 2, title: "Data Wrangling", daily: ["Day 1-2: Cleaning & missing values", "Day 3-4: Merging & reshaping", "Day 5-6: GroupBy & aggregations", "Day 7: Wrangling project"] },
        { week: 3, title: "Statistics", daily: ["Day 1-2: Descriptive stats", "Day 3-4: Distributions", "Day 5-6: Hypothesis testing", "Day 7: Stats project"] },
        { week: 4, title: "Visualization", daily: ["Day 1-2: Matplotlib & Seaborn", "Day 3-4: Plotly & dashboards", "Day 5-6: Storytelling with data", "Day 7: EDA report"] },
        { week: 5, title: "SQL", daily: ["Day 1-2: Basic queries", "Day 3-4: JOINs & subqueries", "Day 5-6: Window functions", "Day 7: SQL project"] },
        { week: 6, title: "ML Basics", daily: ["Day 1-2: Linear & logistic regression", "Day 3-4: Decision trees", "Day 5-6: Model evaluation", "Day 7: Kaggle competition"] },
        { week: 7, title: "Advanced ML", daily: ["Day 1-2: Random Forest, XGBoost", "Day 3-4: Feature engineering", "Day 5-6: Hyperparameter tuning", "Day 7: Project improvement"] },
        { week: 8, title: "Time Series", daily: ["Day 1-2: Time series concepts", "Day 3-4: Statsmodels ARIMA", "Day 5-6: Prophet forecasting", "Day 7: Sales forecast project"] },
        { week: 9, title: "Tableau / Power BI", daily: ["Day 1-2: Tableau Public basics", "Day 3-4: Dashboard creation", "Day 5-6: Data storytelling", "Day 7: Publish a dashboard"] },
        { week: 10, title: "Big Data Intro", daily: ["Day 1-2: Hadoop & Spark concepts", "Day 3-4: PySpark basics", "Day 5-6: Cloud data platforms", "Day 7: Big data project"] },
        { week: 11, title: "NLP for Data Science", daily: ["Day 1-2: Text processing", "Day 3-4: Sentiment analysis", "Day 5-6: Topic modeling", "Day 7: NLP project"] },
        { week: 12, title: "A/B Testing", daily: ["Day 1-2: Experiment design", "Day 3-4: Statistical significance", "Day 5-6: Business decisions from data", "Day 7: A/B test simulation"] },
        { week: 13, title: "Data Engineering Basics", daily: ["Day 1-2: ETL concepts", "Day 3-4: Airflow intro", "Day 5-6: Data pipelines", "Day 7: Build a simple pipeline"] },
        { week: 14, title: "Capstone Project", daily: ["Day 1-2: Define problem & get data", "Day 3-4: Clean & analyze", "Day 5-6: Model & visualize", "Day 7: Write report"] },
        { week: 15, title: "Portfolio Building", daily: ["Day 1-2: GitHub cleanup", "Day 3-4: Case studies", "Day 5-6: Kaggle profile", "Day 7: LinkedIn optimization"] },
        { week: 16, title: "Interview Prep", daily: ["Day 1-2: SQL interview questions", "Day 3-4: Stats & probability Q&A", "Day 5: Python & ML Q&A", "Day 6: Mock interview", "Day 7: Apply to roles"] },
      ],
    },

    "Cyber Security": {
      interests: ["Coding", "Networking", "Problem Solving"],
      subjects: ["Computer Science", "Mathematics"],
      workType: ["Technical", "Analytical"],
      outlook: "Massive talent shortage worldwide. Every organization needs security professionals. High salaries and remote-friendly.",
      resources: {
        docs: [
          { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
          { name: "TryHackMe Learning Paths", url: "https://tryhackme.com/paths" },
          { name: "Hack The Box Academy", url: "https://academy.hackthebox.com" },
          { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
        ],
        youtube: [
          { name: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck" },
          { name: "John Hammond", url: "https://www.youtube.com/@_JohnHammond" },
          { name: "David Bombal", url: "https://www.youtube.com/@davidbombal" },
          { name: "TCM Security", url: "https://www.youtube.com/@TCMSecurityAcademy" },
        ],
        practice: [
          { name: "TryHackMe", url: "https://tryhackme.com" },
          { name: "Hack The Box", url: "https://www.hackthebox.com" },
          { name: "PicoCTF", url: "https://picoctf.org" },
          { name: "PortSwigger Web Security", url: "https://portswigger.net/web-security" },
        ],
      },
      visual: ["Networking Basics", "Linux", "Security Concepts", "TryHackMe Labs", "Web App Security", "OWASP Top 10", "CTF Practice", "Cert Ready"],
      roadmap3: [
        { week: 1, title: "Networking Fundamentals", daily: ["Day 1: OSI model & TCP/IP", "Day 2: IP addressing & subnetting", "Day 3: DNS, DHCP, HTTP/S", "Day 4: Wireshark packet capture", "Day 5: Firewalls & ports", "Day 6: VPN & proxies", "Day 7: Network mapping with nmap"] },
        { week: 2, title: "Linux Fundamentals", daily: ["Day 1: File system & navigation", "Day 2: File permissions & users", "Day 3: Bash scripting basics", "Day 4: Process management", "Day 5: SSH & remote access", "Day 6: Log analysis", "Day 7: TryHackMe Linux room"] },
        { week: 3, title: "Security Concepts", daily: ["Day 1: CIA Triad (Confidentiality, Integrity, Availability)", "Day 2: Authentication & authorization", "Day 3: Encryption basics (symmetric, asymmetric)", "Day 4: Hashing & digital signatures", "Day 5: Common attack types overview", "Day 6: Social engineering", "Day 7: Security policies & compliance"] },
        { week: 4, title: "TryHackMe Beginner Path", daily: ["Day 1: Complete 'Pre-Security' path", "Day 2: Web Fundamentals room", "Day 3: Network Exploitation Basics", "Day 4: Metasploit Introduction", "Day 5: Linux privilege escalation", "Day 6: Windows basics room", "Day 7: Complete 'Jr Penetration Tester' intro"] },
        { week: 5, title: "Web Application Security", daily: ["Day 1: OWASP Top 10 overview", "Day 2: SQL Injection lab (PortSwigger)", "Day 3: XSS (Cross-Site Scripting) lab", "Day 4: CSRF attacks", "Day 5: Broken Authentication exploits", "Day 6: Burp Suite basics", "Day 7: Full DVWA walkthrough"] },
        { week: 6, title: "Penetration Testing", daily: ["Day 1: Pen testing methodology", "Day 2: Reconnaissance techniques", "Day 3: Scanning & enumeration", "Day 4: Exploitation with Metasploit", "Day 5: Post-exploitation basics", "Day 6: Report writing", "Day 7: Hack The Box easy machine"] },
        { week: 7, title: "CTF Practice", daily: ["Day 1: PicoCTF beginner challenges", "Day 2: Cryptography challenges", "Day 3: Web exploitation CTF", "Day 4: Forensics challenges", "Day 5: Reverse engineering intro", "Day 6: TryHackMe CTF room", "Day 7: Write a CTF writeup"] },
        { week: 8, title: "Certifications & Career", daily: ["Day 1: CompTIA Security+ exam overview", "Day 2: Study domain 1 (Threats, Attacks)", "Day 3: Study domain 2 (Technologies)", "Day 4: Study domain 3 (Architecture)", "Day 5: Practice exam questions", "Day 6: Create cybersecurity portfolio on GitHub", "Day 7: Apply to SOC Analyst or Pen Tester roles"] },
      ],
      roadmap6: [
        { week: 1, title: "Networking Basics", daily: ["Day 1-2: OSI model, TCP/IP", "Day 3-4: IP, DNS, ports", "Day 5-6: Wireshark", "Day 7: nmap basics"] },
        { week: 2, title: "Linux Mastery", daily: ["Day 1-2: File system, permissions", "Day 3-4: Bash scripting", "Day 5-6: SSH, logs", "Day 7: TryHackMe Linux"] },
        { week: 3, title: "Security Fundamentals", daily: ["Day 1-2: CIA triad, encryption", "Day 3-4: Hashing, PKI", "Day 5-6: Attack types", "Day 7: Security quiz"] },
        { week: 4, title: "TryHackMe Path", daily: ["Day 1-2: Pre-Security path", "Day 3-4: Web fundamentals", "Day 5-6: Network exploitation", "Day 7: Jr Pen Tester intro"] },
        { week: 5, title: "Web App Security", daily: ["Day 1-2: OWASP Top 10", "Day 3-4: SQLi & XSS labs", "Day 5-6: Burp Suite", "Day 7: DVWA walkthrough"] },
        { week: 6, title: "Exploitation Basics", daily: ["Day 1-2: Metasploit basics", "Day 3-4: Privilege escalation", "Day 5-6: Password cracking", "Day 7: HTB easy machine"] },
        { week: 7, title: "Windows Security", daily: ["Day 1-2: Active Directory basics", "Day 3-4: Windows exploitation", "Day 5-6: Group policies", "Day 7: AD lab setup"] },
        { week: 8, title: "Cryptography", daily: ["Day 1-2: Symmetric encryption", "Day 3-4: Asymmetric, RSA", "Day 5-6: TLS/SSL", "Day 7: Crypto CTF challenges"] },
        { week: 9, title: "Digital Forensics", daily: ["Day 1-2: Forensics concepts", "Day 3-4: Autopsy tool", "Day 5-6: Memory forensics", "Day 7: Forensics CTF"] },
        { week: 10, title: "SOC & Blue Team", daily: ["Day 1-2: SIEM basics", "Day 3-4: Log analysis", "Day 5-6: Incident response", "Day 7: Blue team room"] },
        { week: 11, title: "CTF Practice", daily: ["Day 1-2: PicoCTF challenges", "Day 3-4: Web CTF", "Day 5-6: Crypto CTF", "Day 7: Write CTF writeup"] },
        { week: 12, title: "Advanced Pen Testing", daily: ["Day 1-2: Full pen test methodology", "Day 3-4: Recon & enumeration", "Day 5-6: Exploitation", "Day 7: Report writing"] },
        { week: 13, title: "Cloud Security", daily: ["Day 1-2: AWS security basics", "Day 3-4: IAM & policies", "Day 5-6: Cloud vulnerabilities", "Day 7: Cloud security project"] },
        { week: 14, title: "CompTIA Security+", daily: ["Day 1-2: Threats & attacks domain", "Day 3-4: Technologies domain", "Day 5-6: Architecture domain", "Day 7: Practice exam"] },
        { week: 15, title: "eJPT Certification Prep", daily: ["Day 1-2: INE free course", "Day 3-4: Practice labs", "Day 5-6: Mock exam", "Day 7: Take eJPT exam"] },
        { week: 16, title: "Portfolio & Job Prep", daily: ["Day 1-2: GitHub portfolio", "Day 3-4: TryHackMe/HTB profile", "Day 5: Resume & LinkedIn", "Day 6: Mock interview", "Day 7: Apply to SOC/pen test roles"] },
      ],
    },

    "Cloud & DevOps": {
      interests: ["Coding", "Networking", "Problem Solving"],
      subjects: ["Computer Science"],
      workType: ["Technical"],
      outlook: "Cloud is the backbone of modern tech. DevOps engineers command high salaries with remote work opportunities everywhere.",
      resources: {
        docs: [
          { name: "AWS Documentation", url: "https://docs.aws.amazon.com" },
          { name: "Docker Docs", url: "https://docs.docker.com" },
          { name: "Kubernetes Docs", url: "https://kubernetes.io/docs/home/" },
          { name: "Terraform Docs", url: "https://developer.hashicorp.com/terraform" },
          { name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
        ],
        youtube: [
          { name: "TechWorld with Nana", url: "https://www.youtube.com/@TechWorldwithNana" },
          { name: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck" },
          { name: "freeCodeCamp (Cloud)", url: "https://www.youtube.com/@freecodecamp" },
          { name: "Bret Fisher (Docker/K8s)", url: "https://www.youtube.com/@BretFisher" },
        ],
        practice: [
          { name: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
          { name: "Qwiklabs / Google Cloud Skills", url: "https://www.cloudskillsboost.google" },
          { name: "Katacoda (now Killercoda)", url: "https://killercoda.com" },
          { name: "Play with Docker", url: "https://labs.play-with-docker.com" },
        ],
      },
      visual: ["Linux & CLI", "Git", "Docker", "CI/CD", "Kubernetes", "AWS/Azure", "IaC (Terraform)", "Full Pipeline"],
      roadmap3: [
        { week: 1, title: "Linux & Scripting", daily: ["Day 1: Linux commands & navigation", "Day 2: File permissions, users, groups", "Day 3: Bash scripting basics", "Day 4: Cron jobs & automation", "Day 5: Process management & monitoring", "Day 6: System logs & troubleshooting", "Day 7: Write a bash automation script"] },
        { week: 2, title: "Git & Version Control", daily: ["Day 1: Git init, add, commit", "Day 2: Branches, merging, rebasing", "Day 3: GitHub workflow & pull requests", "Day 4: Git hooks", "Day 5: Monorepo vs multi-repo strategies", "Day 6: Semantic versioning & tagging", "Day 7: Set up GitHub organization for projects"] },
        { week: 3, title: "Docker", daily: ["Day 1: Containers vs VMs", "Day 2: Docker images & containers", "Day 3: Dockerfile writing", "Day 4: Docker Compose", "Day 5: Container networking", "Day 6: Docker volumes & persistence", "Day 7: Containerize a web app"] },
        { week: 4, title: "CI/CD Pipelines", daily: ["Day 1: What is CI/CD", "Day 2: GitHub Actions basics", "Day 3: Build & test pipeline", "Day 4: Docker build in CI", "Day 5: Deploy pipeline to cloud", "Day 6: Pipeline for multiple environments", "Day 7: Complete CI/CD project"] },
        { week: 5, title: "AWS Fundamentals", daily: ["Day 1: IAM users, roles, policies", "Day 2: EC2 instances & SSH", "Day 3: S3 buckets & static hosting", "Day 4: RDS & managed databases", "Day 5: VPC & networking", "Day 6: Load balancers & auto-scaling", "Day 7: Host a full app on AWS"] },
        { week: 6, title: "Kubernetes Basics", daily: ["Day 1: K8s architecture (pods, nodes)", "Day 2: Deployments & replica sets", "Day 3: Services & ingress", "Day 4: ConfigMaps & secrets", "Day 5: Helm charts intro", "Day 6: Deploy to minikube", "Day 7: Deploy app to AWS EKS (free tier)"] },
        { week: 7, title: "Infrastructure as Code", daily: ["Day 1: Terraform basics", "Day 2: Providers & resources", "Day 3: Variables & outputs", "Day 4: Terraform state", "Day 5: Provision AWS infra with Terraform", "Day 6: Ansible basics for configuration", "Day 7: Full IaC project"] },
        { week: 8, title: "Monitoring & Career", daily: ["Day 1: Prometheus & Grafana basics", "Day 2: Set up monitoring stack", "Day 3: Logging with ELK Stack", "Day 4: AWS CloudWatch", "Day 5: On-call & incident response", "Day 6: Build DevOps portfolio on GitHub", "Day 7: Apply to DevOps/SRE roles"] },
      ],
      roadmap6: [
        { week: 1, title: "Linux & CLI", daily: ["Day 1-2: Commands, navigation", "Day 3-4: Scripting", "Day 5-6: Automation", "Day 7: Automation project"] },
        { week: 2, title: "Git Mastery", daily: ["Day 1-2: Core git workflow", "Day 3-4: Advanced git", "Day 5-6: GitHub best practices", "Day 7: Team workflow setup"] },
        { week: 3, title: "Docker", daily: ["Day 1-2: Images & containers", "Day 3-4: Dockerfile", "Day 5-6: Docker Compose", "Day 7: App containerization"] },
        { week: 4, title: "CI/CD", daily: ["Day 1-2: GitHub Actions", "Day 3-4: Build & test pipeline", "Day 5-6: Deploy pipeline", "Day 7: Full pipeline project"] },
        { week: 5, title: "AWS Core Services", daily: ["Day 1-2: IAM, EC2", "Day 3-4: S3, RDS", "Day 5-6: VPC, ELB", "Day 7: Host a full app"] },
        { week: 6, title: "AWS Advanced", daily: ["Day 1-2: Lambda & serverless", "Day 3-4: CloudFormation", "Day 5-6: Auto Scaling", "Day 7: Serverless API project"] },
        { week: 7, title: "Kubernetes", daily: ["Day 1-2: K8s concepts", "Day 3-4: Deployments & services", "Day 5-6: Helm & namespaces", "Day 7: Minikube deployment"] },
        { week: 8, title: "Terraform (IaC)", daily: ["Day 1-2: Terraform basics", "Day 3-4: AWS with Terraform", "Day 5-6: State management", "Day 7: Full infra project"] },
        { week: 9, title: "Monitoring & Observability", daily: ["Day 1-2: Prometheus", "Day 3-4: Grafana dashboards", "Day 5-6: ELK Stack", "Day 7: Full monitoring setup"] },
        { week: 10, title: "Security in DevOps", daily: ["Day 1-2: DevSecOps concepts", "Day 3-4: SAST/DAST tools", "Day 5-6: Secrets management", "Day 7: Secure pipeline"] },
        { week: 11, title: "Azure / GCP Basics", daily: ["Day 1-2: Azure fundamentals", "Day 3-4: Azure DevOps", "Day 5-6: GCP overview", "Day 7: Multi-cloud comparison"] },
        { week: 12, title: "Ansible", daily: ["Day 1-2: Ansible basics", "Day 3-4: Playbooks", "Day 5-6: Server configuration", "Day 7: Automate server setup"] },
        { week: 13, title: "Service Mesh & Microservices", daily: ["Day 1-2: Microservices patterns", "Day 3-4: Istio basics", "Day 5-6: API gateway", "Day 7: Microservices project"] },
        { week: 14, title: "AWS Certifications Prep", daily: ["Day 1-2: AWS CCP domains", "Day 3-4: Practice exams", "Day 5-6: Hands-on labs", "Day 7: Schedule exam"] },
        { week: 15, title: "Capstone DevOps Project", daily: ["Day 1-2: Plan full pipeline", "Day 3-4: Docker + K8s setup", "Day 5-6: CI/CD integration", "Day 7: Deploy & monitor"] },
        { week: 16, title: "Portfolio & Job Prep", daily: ["Day 1-2: GitHub portfolio", "Day 3-4: Architecture diagrams", "Day 5: Interview Q&A", "Day 6: Mock interview", "Day 7: Apply to roles"] },
      ],
    },

    "Mobile App Development": {
      interests: ["Coding", "Design", "Problem Solving"],
      subjects: ["Computer Science"],
      workType: ["Technical", "Creative"],
      outlook: "Mobile-first world means constant demand. Flutter and React Native devs are hired globally with great freelance potential.",
      resources: {
        docs: [
          { name: "Flutter Docs", url: "https://flutter.dev/docs" },
          { name: "React Native Docs", url: "https://reactnative.dev/docs/getting-started" },
          { name: "Dart Language Tour", url: "https://dart.dev/guides/language/language-tour" },
          { name: "Firebase Docs", url: "https://firebase.google.com/docs" },
        ],
        youtube: [
          { name: "The Net Ninja (Flutter)", url: "https://www.youtube.com/@NetNinja" },
          { name: "Flutter (Official)", url: "https://www.youtube.com/@flutterdev" },
          { name: "Mitch Koko", url: "https://www.youtube.com/@createdbykoko" },
          { name: "Academind (React Native)", url: "https://www.youtube.com/@academind" },
        ],
        practice: [
          { name: "DartPad (Online)", url: "https://dartpad.dev" },
          { name: "Flutter Codelabs", url: "https://codelabs.developers.google.com/?cat=flutter" },
          { name: "Expo Snack (React Native)", url: "https://snack.expo.dev" },
          { name: "GitHub Sample Projects", url: "https://github.com/flutter/samples" },
        ],
      },
      visual: ["Dart/JS Basics", "Flutter/RN Setup", "UI Components", "State Mgmt", "Navigation", "API Integration", "Firebase", "App Store Ready"],
      roadmap3: [
        { week: 1, title: "Dart Fundamentals", daily: ["Day 1: Dart variables, types, operators", "Day 2: Functions & classes", "Day 3: Lists, maps, async/await", "Day 4: Object-Oriented Programming in Dart", "Day 5: Error handling", "Day 6: DartPad exercises", "Day 7: Build a Dart CLI mini project"] },
        { week: 2, title: "Flutter UI Basics", daily: ["Day 1: Flutter setup & first app", "Day 2: Widgets — Text, Container, Row, Column", "Day 3: Button, Image, Icon widgets", "Day 4: Stateless vs Stateful widgets", "Day 5: Hot reload & debugging", "Day 6: Build a simple calculator UI", "Day 7: Polish and add navigation"] },
        { week: 3, title: "State Management", daily: ["Day 1: setState basics", "Day 2: Provider package", "Day 3: ChangeNotifier pattern", "Day 4: Riverpod introduction", "Day 5: State management comparison", "Day 6: Implement Provider in a shopping app", "Day 7: Refactor to Riverpod"] },
        { week: 4, title: "Navigation & Routing", daily: ["Day 1: Navigator 1.0 basics", "Day 2: Named routes", "Day 3: GoRouter package", "Day 4: Bottom navigation bar", "Day 5: Drawer & tabs", "Day 6: Deep linking basics", "Day 7: Multi-screen app project"] },
        { week: 5, title: "API Integration", daily: ["Day 1: HTTP package in Flutter", "Day 2: GET requests & JSON parsing", "Day 3: POST requests", "Day 4: Error handling & loading states", "Day 5: Dio package", "Day 6: Weather app with real API", "Day 7: News app with REST API"] },
        { week: 6, title: "Firebase Integration", daily: ["Day 1: Firebase setup & FlutterFire", "Day 2: Firebase Authentication", "Day 3: Firestore database CRUD", "Day 4: Firebase Storage", "Day 5: Push notifications (FCM)", "Day 6: Cloud Functions basics", "Day 7: Complete notes app with Firebase"] },
        { week: 7, title: "Local Storage & Native Features", daily: ["Day 1: SharedPreferences", "Day 2: SQLite with sqflite", "Day 3: Camera & gallery access", "Day 4: Location services", "Day 5: Local notifications", "Day 6: Biometric auth", "Day 7: Feature-rich app update"] },
        { week: 8, title: "Publishing & Portfolio", daily: ["Day 1: App signing & release build", "Day 2: Google Play Store submission", "Day 3: App Store (TestFlight) basics", "Day 4: App Store Optimization", "Day 5: GitHub portfolio cleanup", "Day 6: Write app case study", "Day 7: Apply to mobile dev roles or freelance"] },
      ],
      roadmap6: [
        { week: 1, title: "Dart Basics", daily: ["Day 1-2: Variables, types, OOP", "Day 3-4: Async/await, streams", "Day 5-6: Dart exercises", "Day 7: Dart CLI project"] },
        { week: 2, title: "Flutter Fundamentals", daily: ["Day 1-2: Setup, widgets", "Day 3-4: Layouts", "Day 5-6: Stateless vs stateful", "Day 7: Calculator app"] },
        { week: 3, title: "State Management", daily: ["Day 1-2: setState, Provider", "Day 3-4: Riverpod", "Day 5-6: GetX intro", "Day 7: Shopping app state"] },
        { week: 4, title: "Navigation", daily: ["Day 1-2: Named routes", "Day 3-4: GoRouter", "Day 5-6: Bottom nav, tabs", "Day 7: Multi-screen app"] },
        { week: 5, title: "APIs & Networking", daily: ["Day 1-2: HTTP requests", "Day 3-4: JSON parsing", "Day 5-6: Dio package", "Day 7: News API app"] },
        { week: 6, title: "Firebase", daily: ["Day 1-2: Auth setup", "Day 3-4: Firestore CRUD", "Day 5-6: Storage & FCM", "Day 7: Notes app"] },
        { week: 7, title: "Local Data", daily: ["Day 1-2: SharedPreferences", "Day 3-4: SQLite", "Day 5-6: Hive (NoSQL)", "Day 7: Offline-first app"] },
        { week: 8, title: "Advanced UI", daily: ["Day 1-2: Custom widgets", "Day 3-4: Animations", "Day 5-6: Themes & responsive", "Day 7: UI polish"] },
        { week: 9, title: "Native Features", daily: ["Day 1-2: Camera, gallery", "Day 3-4: Location", "Day 5-6: Notifications", "Day 7: Feature update"] },
        { week: 10, title: "Testing", daily: ["Day 1-2: Unit testing", "Day 3-4: Widget testing", "Day 5-6: Integration tests", "Day 7: Test your main app"] },
        { week: 11, title: "React Native Basics", daily: ["Day 1-2: RN setup, components", "Day 3-4: Navigation (React Nav)", "Day 5-6: API calls", "Day 7: Simple RN app"] },
        { week: 12, title: "Performance Optimization", daily: ["Day 1-2: Build optimization", "Day 3-4: Lazy loading", "Day 5-6: Memory management", "Day 7: Optimize main project"] },
        { week: 13, title: "Capstone App", daily: ["Day 1-2: Plan & design app", "Day 3-4: Core features", "Day 5-6: Firebase integration", "Day 7: Internal testing"] },
        { week: 14, title: "Capstone Polish", daily: ["Day 1-2: UI animations", "Day 3-4: Error handling", "Day 5-6: App testing", "Day 7: Beta testing"] },
        { week: 15, title: "Publishing", daily: ["Day 1-2: Release build setup", "Day 3-4: Play Store submission", "Day 5-6: App Store basics", "Day 7: App live!"] },
        { week: 16, title: "Portfolio & Career", daily: ["Day 1-2: GitHub & screenshots", "Day 3-4: Case studies", "Day 5: Interview Q&A", "Day 6: Mock interview", "Day 7: Apply to roles"] },
      ],
    },

    "Software Engineering": {
      interests: ["Coding", "Problem Solving", "Research"],
      subjects: ["Computer Science", "Mathematics"],
      workType: ["Technical"],
      outlook: "Core of the tech industry. Software engineers are hired everywhere — FAANG, startups, banks, and remote roles globally.",
      resources: {
        docs: [
          { name: "GeeksforGeeks DSA", url: "https://www.geeksforgeeks.org/data-structures/" },
          { name: "Refactoring.guru (Design Patterns)", url: "https://refactoring.guru/design-patterns" },
          { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
          { name: "LeetCode Docs", url: "https://leetcode.com/explore/" },
        ],
        youtube: [
          { name: "NeetCode", url: "https://www.youtube.com/@NeetCode" },
          { name: "Tech With Tim", url: "https://www.youtube.com/@TechWithTim" },
          { name: "Gaurav Sen (System Design)", url: "https://www.youtube.com/@gkcs" },
          { name: "Fireship", url: "https://www.youtube.com/@Fireship" },
        ],
        practice: [
          { name: "LeetCode", url: "https://leetcode.com" },
          { name: "HackerRank", url: "https://www.hackerrank.com" },
          { name: "Codeforces", url: "https://codeforces.com" },
          { name: "Exercism", url: "https://exercism.org" },
        ],
      },
      visual: ["DSA Basics", "OOP & Design Patterns", "Algorithms", "System Design", "Databases", "APIs", "Testing", "FAANG Ready"],
      roadmap3: [
        { week: 1, title: "Data Structures", daily: ["Day 1: Arrays & strings", "Day 2: Linked lists", "Day 3: Stacks & queues", "Day 4: Hash maps & sets", "Day 5: Trees (binary tree, BST)", "Day 6: Heaps & priority queues", "Day 7: LeetCode easy problems on DSA"] },
        { week: 2, title: "Algorithms", daily: ["Day 1: Big O notation analysis", "Day 2: Sorting (bubble, merge, quick)", "Day 3: Binary search", "Day 4: Two pointers & sliding window", "Day 5: Recursion & backtracking", "Day 6: Graphs (BFS, DFS)", "Day 7: 5 algorithm problems on LeetCode"] },
        { week: 3, title: "OOP & Design Patterns", daily: ["Day 1: OOP pillars (encapsulation, inheritance)", "Day 2: Polymorphism & abstraction", "Day 3: SOLID principles", "Day 4: Creational patterns (Singleton, Factory)", "Day 5: Structural patterns (Adapter, Decorator)", "Day 6: Behavioral patterns (Observer, Strategy)", "Day 7: Implement 3 design patterns in code"] },
        { week: 4, title: "System Design Basics", daily: ["Day 1: Scalability concepts", "Day 2: Load balancing & caching", "Day 3: Database design & indexing", "Day 4: Microservices vs monolith", "Day 5: CAP theorem", "Day 6: Design a URL shortener", "Day 7: Design a social media feed"] },
        { week: 5, title: "Databases & SQL", daily: ["Day 1: Relational DB concepts", "Day 2: SQL joins, indexes", "Day 3: Database normalization", "Day 4: Transactions & ACID", "Day 5: NoSQL (MongoDB basics)", "Day 6: ORMs (SQLAlchemy, Sequelize)", "Day 7: Design schema for an app"] },
        { week: 6, title: "API Design & Backend", daily: ["Day 1: REST API principles", "Day 2: GraphQL basics", "Day 3: Authentication (JWT, OAuth)", "Day 4: Rate limiting & security", "Day 5: API versioning", "Day 6: Build a complete REST API", "Day 7: Document with Swagger/OpenAPI"] },
        { week: 7, title: "Testing & Code Quality", daily: ["Day 1: Unit testing fundamentals", "Day 2: Integration testing", "Day 3: Test-driven development (TDD)", "Day 4: Code reviews & best practices", "Day 5: Refactoring techniques", "Day 6: CI/CD basics", "Day 7: Add tests to your project"] },
        { week: 8, title: "Interview Preparation", daily: ["Day 1: 5 medium LeetCode problems", "Day 2: System design interview practice", "Day 3: Behavioral interview prep (STAR method)", "Day 4: Mock coding interview", "Day 5: Review weak DSA topics", "Day 6: GitHub portfolio cleanup", "Day 7: Apply to software engineering roles"] },
      ],
      roadmap6: [
        { week: 1, title: "Data Structures", daily: ["Day 1-2: Arrays, linked lists", "Day 3-4: Stacks, queues, hash maps", "Day 5-6: Trees & heaps", "Day 7: LeetCode easy"] },
        { week: 2, title: "Algorithms", daily: ["Day 1-2: Sorting algorithms", "Day 3-4: Binary search, two pointers", "Day 5-6: Graphs BFS/DFS", "Day 7: Algorithm problems"] },
        { week: 3, title: "OOP & SOLID", daily: ["Day 1-2: OOP pillars", "Day 3-4: SOLID principles", "Day 5-6: Design patterns", "Day 7: Code refactoring"] },
        { week: 4, title: "Advanced DSA", daily: ["Day 1-2: Dynamic programming", "Day 3-4: Greedy algorithms", "Day 5-6: Tries & segment trees", "Day 7: Hard LeetCode problems"] },
        { week: 5, title: "System Design", daily: ["Day 1-2: Scalability, caching", "Day 3-4: Microservices", "Day 5-6: URL shortener design", "Day 7: Social feed design"] },
        { week: 6, title: "Databases", daily: ["Day 1-2: SQL advanced", "Day 3-4: Indexing & optimization", "Day 5-6: NoSQL & Redis", "Day 7: Schema design project"] },
        { week: 7, title: "API & Backend", daily: ["Day 1-2: REST principles", "Day 3-4: GraphQL", "Day 5-6: Auth & security", "Day 7: Complete API project"] },
        { week: 8, title: "Testing", daily: ["Day 1-2: Unit & integration tests", "Day 3-4: TDD approach", "Day 5-6: E2E testing", "Day 7: Add tests to project"] },
        { week: 9, title: "DevOps Basics", daily: ["Day 1-2: Docker", "Day 3-4: CI/CD", "Day 5-6: Cloud basics", "Day 7: Deploy your project"] },
        { week: 10, title: "Distributed Systems", daily: ["Day 1-2: CAP theorem", "Day 3-4: Kafka basics", "Day 5-6: Eventual consistency", "Day 7: Design review"] },
        { week: 11, title: "Open Source", daily: ["Day 1-2: Find a project on GitHub", "Day 3-4: Fix a bug/issue", "Day 5-6: Submit pull request", "Day 7: Get PR merged"] },
        { week: 12, title: "LeetCode Grind", daily: ["Day 1-2: Arrays & strings medium", "Day 3-4: DP problems", "Day 5-6: Graph problems", "Day 7: Weekly contest"] },
        { week: 13, title: "Capstone Project", daily: ["Day 1-2: Plan full-stack app", "Day 3-4: Backend & database", "Day 5-6: Frontend", "Day 7: Integration"] },
        { week: 14, title: "Capstone Advanced", daily: ["Day 1-2: Add auth & tests", "Day 3-4: Optimize performance", "Day 5-6: Documentation", "Day 7: Deploy live"] },
        { week: 15, title: "System Design Deep Dive", daily: ["Day 1-2: Design Twitter/Instagram", "Day 3-4: Design YouTube", "Day 5-6: Design WhatsApp", "Day 7: Mock system design interview"] },
        { week: 16, title: "Job Applications", daily: ["Day 1-2: Resume & GitHub", "Day 3-4: Mock coding interview", "Day 5: Behavioral interview prep", "Day 6: Mock system design", "Day 7: Apply to companies"] },
      ],
    },

    "UI/UX Design": {
      interests: ["Design", "Writing", "Creativity"],
      subjects: ["Business"],
      workType: ["Creative"],
      outlook: "Every product team needs a UX designer. High demand in startups and agencies with strong freelance potential.",
      resources: {
        docs: [
          { name: "Material Design Guidelines", url: "https://m3.material.io" },
          { name: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/" },
          { name: "Figma Learn", url: "https://help.figma.com/hc/en-us/categories/360002042553" },
          { name: "Apple HIG", url: "https://developer.apple.com/design/human-interface-guidelines/" },
        ],
        youtube: [
          { name: "AJ&Smart", url: "https://www.youtube.com/@AJSmart" },
          { name: "The Futur", url: "https://www.youtube.com/@thefutur" },
          { name: "Figma (Official)", url: "https://www.youtube.com/@Figma" },
          { name: "DesignCourse", url: "https://www.youtube.com/@DesignCourse" },
        ],
        practice: [
          { name: "Figma Community", url: "https://www.figma.com/community" },
          { name: "Dribbble", url: "https://dribbble.com" },
          { name: "Behance", url: "https://www.behance.net" },
          { name: "Daily UI Challenges", url: "https://www.dailyui.co" },
        ],
      },
      visual: ["Design Principles", "Figma Basics", "Wireframing", "User Research", "Prototyping", "Design Systems", "Case Study", "Portfolio"],
      roadmap3: [
        { week: 1, title: "Design Fundamentals", daily: ["Day 1: Color theory & color wheels", "Day 2: Typography rules & pairing", "Day 3: Layout & grid systems", "Day 4: Visual hierarchy principles", "Day 5: Gestalt principles", "Day 6: Accessibility in design", "Day 7: Redesign a bad website concept"] },
        { week: 2, title: "Figma Basics", daily: ["Day 1: Figma interface & frames", "Day 2: Shapes, text, components", "Day 3: Auto layout", "Day 4: Design tokens & styles", "Day 5: Creating icons", "Day 6: Building UI components", "Day 7: Clone a popular app screen"] },
        { week: 3, title: "User Research", daily: ["Day 1: User interviews basics", "Day 2: Surveys & questionnaires", "Day 3: Personas creation", "Day 4: User journey mapping", "Day 5: Card sorting & IA", "Day 6: Competitive analysis", "Day 7: Research report for a product idea"] },
        { week: 4, title: "Wireframing & IA", daily: ["Day 1: Information architecture basics", "Day 2: Low-fidelity wireframes", "Day 3: Site maps & user flows", "Day 4: Mid-fidelity wireframes in Figma", "Day 5: Content-first design approach", "Day 6: Peer wireframe critique", "Day 7: Wireframe a mobile app"] },
        { week: 5, title: "Prototyping & Testing", daily: ["Day 1: Figma prototyping basics", "Day 2: Micro-interactions & transitions", "Day 3: Clickable prototype", "Day 4: Usability testing script", "Day 5: Conduct 3 usability tests", "Day 6: Analyze feedback & iterate", "Day 7: High-fidelity prototype v2"] },
        { week: 6, title: "Design Systems", daily: ["Day 1: What is a design system", "Day 2: Component library in Figma", "Day 3: Spacing & grid tokens", "Day 4: Documentation", "Day 5: Study Material Design system", "Day 6: Build mini design system for your project", "Day 7: Share on Figma Community"] },
        { week: 7, title: "Case Study", daily: ["Day 1: Choose a real problem to solve", "Day 2: Research & define problem", "Day 3: Ideation & sketches", "Day 4: Wireframes & user flow", "Day 5: High-fidelity designs", "Day 6: Write case study document", "Day 7: Publish on Behance/portfolio site"] },
        { week: 8, title: "Portfolio & Interviews", daily: ["Day 1: Portfolio website setup", "Day 2: Add 2-3 case studies", "Day 3: Write design process narratives", "Day 4: Practice design challenge (30-min exercise)", "Day 5: UI/UX interview Q&A practice", "Day 6: Mock portfolio review with peer", "Day 7: Apply to design roles or freelance"] },
      ],
      roadmap6: [
        { week: 1, title: "Design Theory", daily: ["Day 1-2: Color theory", "Day 3-4: Typography", "Day 5-6: Grid & layout", "Day 7: Redesign exercise"] },
        { week: 2, title: "Figma Mastery", daily: ["Day 1-2: Interface & frames", "Day 3-4: Auto layout", "Day 5-6: Components & variants", "Day 7: App clone"] },
        { week: 3, title: "User Research", daily: ["Day 1-2: Interviews & surveys", "Day 3-4: Personas", "Day 5-6: User journey maps", "Day 7: Research report"] },
        { week: 4, title: "Wireframing", daily: ["Day 1-2: IA & site maps", "Day 3-4: Low-fi wireframes", "Day 5-6: Mid-fi in Figma", "Day 7: Mobile app wireframe"] },
        { week: 5, title: "Prototyping", daily: ["Day 1-2: Figma interactions", "Day 3-4: Micro-animations", "Day 5-6: Usability testing", "Day 7: Iterate based on feedback"] },
        { week: 6, title: "Design Systems", daily: ["Day 1-2: Component library", "Day 3-4: Tokens & documentation", "Day 5-6: Study existing systems", "Day 7: Build mini design system"] },
        { week: 7, title: "Case Study 1", daily: ["Day 1-2: Problem definition", "Day 3-4: Research & ideation", "Day 5-6: Wireframes", "Day 7: Hi-fi designs"] },
        { week: 8, title: "Case Study 1 Polish", daily: ["Day 1-2: Prototype", "Day 3-4: User testing", "Day 5-6: Iteration", "Day 7: Publish on Behance"] },
        { week: 9, title: "Motion Design Basics", daily: ["Day 1-2: Principles of animation", "Day 3-4: Figma Smart Animate", "Day 5-6: Lottie animations", "Day 7: Animated prototype"] },
        { week: 10, title: "Accessibility (a11y)", daily: ["Day 1-2: WCAG guidelines", "Day 3-4: Color contrast", "Day 5-6: Screen reader design", "Day 7: Audit existing design"] },
        { week: 11, title: "Product Thinking", daily: ["Day 1-2: Product strategy basics", "Day 3-4: OKRs & metrics", "Day 5-6: Business goals vs user needs", "Day 7: Product redesign exercise"] },
        { week: 12, title: "Case Study 2", daily: ["Day 1-2: New problem area", "Day 3-4: Full research phase", "Day 5-6: High-fidelity design", "Day 7: Prototype & test"] },
        { week: 13, title: "Freelance Basics", daily: ["Day 1-2: Client communication", "Day 3-4: Proposals & contracts", "Day 5-6: Pricing your work", "Day 7: Upwork/Fiverr profile setup"] },
        { week: 14, title: "Portfolio Site", daily: ["Day 1-2: Design your site", "Day 3-4: Build on Webflow/Framer", "Day 5-6: SEO & sharing", "Day 7: Get feedback"] },
        { week: 15, title: "Advanced Figma", daily: ["Day 1-2: Variables & theming", "Day 3-4: Dev mode", "Day 5-6: Plugin development", "Day 7: Publish a Figma plugin"] },
        { week: 16, title: "Career Launch", daily: ["Day 1-2: LinkedIn & Dribbble", "Day 3-4: Design challenge practice", "Day 5: Interview Q&A", "Day 6: Mock design interview", "Day 7: Apply to roles"] },
      ],
    },

    "Graphic Design": {
      interests: ["Design", "Creativity", "Writing"],
      subjects: ["Business"],
      workType: ["Creative"],
      outlook: "Huge freelance potential on Fiverr and Upwork. Brands, agencies, and startups always need skilled graphic designers.",
      resources: {
        docs: [
          { name: "Adobe Learn (Illustrator)", url: "https://helpx.adobe.com/illustrator/tutorials.html" },
          { name: "Canva Design School", url: "https://www.canva.com/learn/design/" },
          { name: "Adobe Color", url: "https://color.adobe.com" },
          { name: "Google Fonts", url: "https://fonts.google.com" },
        ],
        youtube: [
          { name: "The Futur", url: "https://www.youtube.com/@thefutur" },
          { name: "DesignCourse", url: "https://www.youtube.com/@DesignCourse" },
          { name: "Satori Graphics", url: "https://www.youtube.com/@SatoriGraphics" },
          { name: "Yes I'm a Designer", url: "https://www.youtube.com/@yesimadesigner" },
        ],
        practice: [
          { name: "Dribbble", url: "https://dribbble.com" },
          { name: "Behance", url: "https://www.behance.net" },
          { name: "99designs Practice", url: "https://99designs.com" },
          { name: "Daily Logo Challenge", url: "https://www.dailylogochallenge.com" },
        ],
      },
      visual: ["Design Theory", "Adobe Illustrator", "Photoshop", "Typography", "Brand Identity", "Print Design", "Portfolio", "Freelance Ready"],
      roadmap3: [
        { week: 1, title: "Design Theory", daily: ["Day 1: Principles of design (balance, contrast)", "Day 2: Color theory & palettes", "Day 3: Typography fundamentals", "Day 4: Grid & layout systems", "Day 5: Visual hierarchy", "Day 6: Design critique exercises", "Day 7: Redesign 3 bad posters"] },
        { week: 2, title: "Adobe Illustrator Basics", daily: ["Day 1: Interface, artboards, tools", "Day 2: Pen tool mastery", "Day 3: Shapes & pathfinder", "Day 4: Typography in Illustrator", "Day 5: Color & gradients", "Day 6: Create a simple logo", "Day 7: Design a poster"] },
        { week: 3, title: "Adobe Photoshop", daily: ["Day 1: Layers & masks", "Day 2: Selection tools", "Day 3: Retouching basics", "Day 4: Photo manipulation", "Day 5: Smart objects", "Day 6: Social media graphic", "Day 7: Photo-illustration composite"] },
        { week: 4, title: "Logo & Brand Identity", daily: ["Day 1: Logo design principles", "Day 2: Research & mood boarding", "Day 3: Sketch logo concepts", "Day 4: Vectorize best concept", "Day 5: Color palette & typography system", "Day 6: Brand style guide", "Day 7: Complete brand identity package"] },
        { week: 5, title: "Print & Layout Design", daily: ["Day 1: Print design basics (bleed, CMYK)", "Day 2: Business card design", "Day 3: Brochure layout", "Day 4: Magazine spread", "Day 5: Adobe InDesign intro", "Day 6: Annual report layout", "Day 7: Complete print project"] },
        { week: 6, title: "Digital & Social Media", daily: ["Day 1: Social media format standards", "Day 2: Instagram post & story templates", "Day 3: YouTube thumbnail design", "Day 4: Email newsletter design", "Day 5: Banner ads", "Day 6: Animated GIF basics", "Day 7: Social media kit for a brand"] },
        { week: 7, title: "Portfolio Building", daily: ["Day 1: Select best 6-8 projects", "Day 2: Create mockup presentations", "Day 3: Write project descriptions", "Day 4: Behance profile setup", "Day 5: Portfolio website (Adobe Portfolio)", "Day 6: Get feedback from designers", "Day 7: Finalize and share portfolio"] },
        { week: 8, title: "Freelance Launch", daily: ["Day 1: Fiverr profile setup", "Day 2: Upwork profile & proposals", "Day 3: Pricing your services", "Day 4: Client communication templates", "Day 5: Contract & invoice basics", "Day 6: First 3 gig listings live", "Day 7: Apply to design studios"] },
      ],
      roadmap6: [
        { week: 1, title: "Design Theory", daily: ["Day 1-2: Principles & color", "Day 3-4: Typography", "Day 5-6: Layout & grid", "Day 7: Redesign exercise"] },
        { week: 2, title: "Illustrator Basics", daily: ["Day 1-2: Tools & pen tool", "Day 3-4: Shapes & pathfinder", "Day 5-6: Typography & color", "Day 7: Simple logo"] },
        { week: 3, title: "Illustrator Advanced", daily: ["Day 1-2: Complex illustrations", "Day 3-4: Icon design", "Day 5-6: Infographics", "Day 7: Illustration portfolio piece"] },
        { week: 4, title: "Photoshop", daily: ["Day 1-2: Layers, masks, selections", "Day 3-4: Retouching", "Day 5-6: Photo manipulation", "Day 7: Composite image"] },
        { week: 5, title: "Logo Design", daily: ["Day 1-2: Research & sketching", "Day 3-4: Vectorize in Illustrator", "Day 5-6: Color & font pairing", "Day 7: Brand package"] },
        { week: 6, title: "Brand Identity", daily: ["Day 1-2: Brand strategy basics", "Day 3-4: Style guide", "Day 5-6: Stationery design", "Day 7: Full brand project"] },
        { week: 7, title: "Print Design", daily: ["Day 1-2: Business cards, flyers", "Day 3-4: Brochures", "Day 5-6: Adobe InDesign", "Day 7: Print project"] },
        { week: 8, title: "Digital Design", daily: ["Day 1-2: Social media kits", "Day 3-4: Banner ads", "Day 5-6: Email design", "Day 7: Digital package"] },
        { week: 9, title: "Motion Basics", daily: ["Day 1-2: After Effects intro", "Day 3-4: Logo animation", "Day 5-6: GIF creation", "Day 7: Animated logo"] },
        { week: 10, title: "Typography Deep Dive", daily: ["Day 1-2: Type hierarchy", "Day 3-4: Custom lettering", "Day 5-6: Typographic poster", "Day 7: Type project"] },
        { week: 11, title: "UI for Graphic Designers", daily: ["Day 1-2: UI principles", "Day 3-4: Figma basics", "Day 5-6: Web banner to UI", "Day 7: Landing page design"] },
        { week: 12, title: "Packaging Design", daily: ["Day 1-2: Packaging dielines", "Day 3-4: Label design", "Day 5-6: Product mockups", "Day 7: Complete packaging project"] },
        { week: 13, title: "Portfolio Projects", daily: ["Day 1-2: Personal branding", "Day 3-4: Poster series", "Day 5-6: Mockups", "Day 7: Behance upload"] },
        { week: 14, title: "Portfolio Website", daily: ["Day 1-2: Adobe Portfolio setup", "Day 3-4: Case studies", "Day 5-6: SEO basics", "Day 7: Share & get feedback"] },
        { week: 15, title: "Freelance Setup", daily: ["Day 1-2: Fiverr & Upwork profiles", "Day 3-4: Pricing strategy", "Day 5-6: First gigs live", "Day 7: First outreach campaign"] },
        { week: 16, title: "Career Acceleration", daily: ["Day 1-2: Agency applications", "Day 3-4: Design challenge practice", "Day 5: Interview Q&A", "Day 6: Mock interview", "Day 7: Apply to studios"] },
      ],
    },

    "Digital Marketing": {
      interests: ["Marketing", "Writing", "Research"],
      subjects: ["Business"],
      workType: ["Creative", "Management"],
      outlook: "Every business with an online presence needs digital marketers. Great for freelancing and agency careers globally.",
      resources: {
        docs: [
          { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage" },
          { name: "HubSpot Academy", url: "https://academy.hubspot.com" },
          { name: "Moz SEO Learning Center", url: "https://moz.com/learn/seo" },
          { name: "Meta Blueprint", url: "https://www.facebook.com/business/learn" },
        ],
        youtube: [
          { name: "Neil Patel", url: "https://www.youtube.com/@NeilPatel" },
          { name: "HubSpot Marketing", url: "https://www.youtube.com/@HubSpot" },
          { name: "Ahrefs", url: "https://www.youtube.com/@AhrefsCom" },
          { name: "GaryVee", url: "https://www.youtube.com/@garyvee" },
        ],
        practice: [
          { name: "Google Skillshop", url: "https://skillshop.withgoogle.com" },
          { name: "HubSpot Free CRM", url: "https://www.hubspot.com/products/crm" },
          { name: "Semrush Free Trial", url: "https://www.semrush.com" },
          { name: "Google Analytics Demo", url: "https://analytics.google.com/analytics/web/demoAccount" },
        ],
      },
      visual: ["Marketing Basics", "SEO", "Content Strategy", "Social Media", "Email Marketing", "Paid Ads", "Analytics", "Campaign Ready"],
      roadmap3: [
        { week: 1, title: "Digital Marketing Foundations", daily: ["Day 1: Marketing funnel (AIDA)", "Day 2: Digital channels overview", "Day 3: Buyer personas", "Day 4: Brand positioning", "Day 5: Competitor analysis", "Day 6: Marketing plan basics", "Day 7: Audit a brand's online presence"] },
        { week: 2, title: "SEO Fundamentals", daily: ["Day 1: How search engines work", "Day 2: Keyword research (Google Keyword Planner)", "Day 3: On-page SEO factors", "Day 4: Technical SEO basics", "Day 5: Link building basics", "Day 6: Local SEO", "Day 7: SEO audit of a website with Moz/Ahrefs"] },
        { week: 3, title: "Content Marketing", daily: ["Day 1: Content strategy framework", "Day 2: Blog writing for SEO", "Day 3: Content calendar creation", "Day 4: Video content strategy", "Day 5: Podcast & audio content", "Day 6: Repurposing content", "Day 7: Write 2 full SEO blog posts"] },
        { week: 4, title: "Social Media Marketing", daily: ["Day 1: Platform strategies (IG, LinkedIn, TikTok)", "Day 2: Content formats & best practices", "Day 3: Community management", "Day 4: Influencer marketing basics", "Day 5: Social media scheduling tools", "Day 6: Analytics & engagement metrics", "Day 7: Create a 30-day content calendar"] },
        { week: 5, title: "Email Marketing", daily: ["Day 1: Email marketing basics", "Day 2: Mailchimp / Brevo setup", "Day 3: List building strategies", "Day 4: Email copywriting", "Day 5: Automation workflows", "Day 6: A/B testing emails", "Day 7: Launch an email campaign"] },
        { week: 6, title: "Paid Advertising", daily: ["Day 1: Google Ads overview", "Day 2: Campaign types & bidding", "Day 3: Ad copywriting", "Day 4: Meta (Facebook/Instagram) Ads basics", "Day 5: Audience targeting", "Day 6: Ad performance metrics (ROAS, CTR)", "Day 7: Run a $5 test campaign"] },
        { week: 7, title: "Analytics & Reporting", daily: ["Day 1: Google Analytics 4 setup", "Day 2: Reading key metrics", "Day 3: Google Search Console", "Day 4: UTM parameters", "Day 5: Marketing dashboard creation", "Day 6: ROI calculation", "Day 7: Monthly marketing report"] },
        { week: 8, title: "Portfolio & Certifications", daily: ["Day 1: Complete Google Analytics certification", "Day 2: HubSpot Content Marketing cert", "Day 3: Build campaign case study", "Day 4: Create portfolio website", "Day 5: Google Ads certification", "Day 6: LinkedIn optimization", "Day 7: Apply to marketing roles or freelance"] },
      ],
      roadmap6: [
        { week: 1, title: "Marketing Foundations", daily: ["Day 1-2: Funnel & buyer personas", "Day 3-4: Channels overview", "Day 5-6: Brand positioning", "Day 7: Brand audit"] },
        { week: 2, title: "SEO", daily: ["Day 1-2: Keyword research", "Day 3-4: On-page SEO", "Day 5-6: Technical SEO", "Day 7: Site audit"] },
        { week: 3, title: "Content Marketing", daily: ["Day 1-2: Strategy & calendar", "Day 3-4: Blog writing", "Day 5-6: Video & repurposing", "Day 7: 2 SEO articles"] },
        { week: 4, title: "Social Media", daily: ["Day 1-2: Platform strategies", "Day 3-4: Content creation", "Day 5-6: Scheduling & analytics", "Day 7: 30-day calendar"] },
        { week: 5, title: "Email Marketing", daily: ["Day 1-2: Setup & list building", "Day 3-4: Copywriting", "Day 5-6: Automation", "Day 7: Launch campaign"] },
        { week: 6, title: "Google Ads", daily: ["Day 1-2: Campaign setup", "Day 3-4: Keyword bidding", "Day 5-6: Ad copy", "Day 7: Live campaign"] },
        { week: 7, title: "Meta Ads", daily: ["Day 1-2: Business Manager setup", "Day 3-4: Audience targeting", "Day 5-6: Creative design", "Day 7: Test campaign"] },
        { week: 8, title: "Analytics", daily: ["Day 1-2: GA4 setup", "Day 3-4: Key metrics", "Day 5-6: Search Console", "Day 7: Full report"] },
        { week: 9, title: "E-commerce Marketing", daily: ["Day 1-2: Shopify basics", "Day 3-4: Product listing SEO", "Day 5-6: Abandoned cart flows", "Day 7: E-commerce campaign"] },
        { week: 10, title: "Influencer Marketing", daily: ["Day 1-2: Finding influencers", "Day 3-4: Outreach templates", "Day 5-6: Campaign management", "Day 7: Influencer campaign plan"] },
        { week: 11, title: "Marketing Automation", daily: ["Day 1-2: HubSpot setup", "Day 3-4: Lead nurturing workflows", "Day 5-6: CRM basics", "Day 7: Automation project"] },
        { week: 12, title: "LinkedIn Marketing", daily: ["Day 1-2: Personal branding", "Day 3-4: Company page", "Day 5-6: LinkedIn Ads", "Day 7: LinkedIn campaign"] },
        { week: 13, title: "TikTok & Short Video", daily: ["Day 1-2: TikTok strategy", "Day 3-4: Script & shoot content", "Day 5-6: Reels & Shorts", "Day 7: Short video campaign"] },
        { week: 14, title: "Certifications", daily: ["Day 1-2: Google Analytics cert", "Day 3-4: HubSpot content cert", "Day 5-6: Google Ads cert", "Day 7: Add certs to LinkedIn"] },
        { week: 15, title: "Agency Project", daily: ["Day 1-2: Choose a business to market", "Day 3-4: Full strategy document", "Day 5-6: Execute one channel", "Day 7: Results & case study"] },
        { week: 16, title: "Career Launch", daily: ["Day 1-2: Portfolio website", "Day 3-4: Freelance profiles", "Day 5: Interview Q&A", "Day 6: Mock interview", "Day 7: Apply to roles"] },
      ],
    },

    "Game Development": {
      interests: ["Coding", "Design", "Creativity", "Gaming"],
      subjects: ["Computer Science", "Mathematics"],
      workType: ["Technical", "Creative"],
      outlook: "Gaming is a $200B+ industry. Indie game success stories are common with platforms like Steam, itch.io, and mobile stores.",
      resources: {
        docs: [
          { name: "Unity Learn", url: "https://learn.unity.com" },
          { name: "Unreal Engine Docs", url: "https://docs.unrealengine.com" },
          { name: "Godot Docs", url: "https://docs.godotengine.org" },
          { name: "GameDev.net", url: "https://www.gamedev.net" },
        ],
        youtube: [
          { name: "Brackeys (Unity)", url: "https://www.youtube.com/@Brackeys" },
          { name: "GDQuest (Godot)", url: "https://www.youtube.com/@Gdquest" },
          { name: "Code Monkey", url: "https://www.youtube.com/@CodeMonkeyUnity" },
          { name: "Game Maker's Toolkit", url: "https://www.youtube.com/@GMTK" },
        ],
        practice: [
          { name: "itch.io", url: "https://itch.io" },
          { name: "Unity Asset Store (Free)", url: "https://assetstore.unity.com/?category=free" },
          { name: "OpenGameArt", url: "https://opengameart.org" },
          { name: "Game Jams on itch.io", url: "https://itch.io/jams" },
        ],
      },
      visual: ["Game Design Theory", "Unity/Godot Basics", "2D Games", "Physics & Animation", "3D Basics", "Audio & UI", "Full Game", "Publish"],
      roadmap3: [
        { week: 1, title: "Game Design Fundamentals", daily: ["Day 1: Game loop & core mechanics", "Day 2: Game genres analysis", "Day 3: Player motivation & fun theory", "Day 4: Prototyping on paper", "Day 5: Game design document (GDD)", "Day 6: Study game reviews critically", "Day 7: Write GDD for your first game"] },
        { week: 2, title: "Unity Basics", daily: ["Day 1: Unity install, interface, scenes", "Day 2: GameObjects, components, transforms", "Day 3: C# scripting basics", "Day 4: Variables, functions in C#", "Day 5: Input system basics", "Day 6: Moving a player object", "Day 7: Build a moving character demo"] },
        { week: 3, title: "2D Game Mechanics", daily: ["Day 1: 2D sprites & tilemaps", "Day 2: Rigidbody2D & colliders", "Day 3: Player jump & gravity", "Day 4: Camera follow script", "Day 5: Enemy basic AI", "Day 6: Collectibles & scoring", "Day 7: Complete Flappy Bird clone"] },
        { week: 4, title: "Game UI & Audio", daily: ["Day 1: Canvas & UI basics", "Day 2: Health bars & score display", "Day 3: Main menu & game over screen", "Day 4: Audio source & sound effects", "Day 5: Background music management", "Day 6: Scene management", "Day 7: Polish your game with UI & audio"] },
        { week: 5, title: "Physics & Animation", daily: ["Day 1: Physics materials & joints", "Day 2: Animator controller basics", "Day 3: Sprite sheet animation", "Day 4: Blend trees for movement", "Day 5: Particle systems", "Day 6: Visual effects", "Day 7: Animated character with effects"] },
        { week: 6, title: "3D Game Basics", daily: ["Day 1: 3D objects, materials, lighting", "Day 2: 3D player controller", "Day 3: Third-person camera", "Day 4: 3D physics & colliders", "Day 5: NavMesh & AI pathfinding", "Day 6: Level design basics", "Day 7: 3D mini game"] },
        { week: 7, title: "Complete Game Project", daily: ["Day 1: Plan your original game", "Day 2: Core gameplay loop", "Day 3: Levels 1-3 design", "Day 4: Enemy AI & difficulty", "Day 5: Polish & bug fixing", "Day 6: Playtest with friends", "Day 7: Iterate based on feedback"] },
        { week: 8, title: "Publishing & Portfolio", daily: ["Day 1: Build for WebGL (browser)", "Day 2: Publish on itch.io", "Day 3: Build for Android (Unity)", "Day 4: Play Store listing basics", "Day 5: Game trailer creation", "Day 6: GitHub portfolio for game dev", "Day 7: Join a game jam"] },
      ],
      roadmap6: [
        { week: 1, title: "Game Design Theory", daily: ["Day 1-2: Core mechanics & loops", "Day 3-4: GDD writing", "Day 5-6: Game analysis", "Day 7: Design your first game"] },
        { week: 2, title: "Unity & C# Basics", daily: ["Day 1-2: Unity interface", "Day 3-4: C# scripting", "Day 5-6: GameObject basics", "Day 7: Moving character"] },
        { week: 3, title: "2D Games", daily: ["Day 1-2: Sprites & tilemaps", "Day 3-4: Physics & colliders", "Day 5-6: Player movement", "Day 7: Flappy Bird clone"] },
        { week: 4, title: "Game Systems", daily: ["Day 1-2: UI & HUD", "Day 3-4: Audio & scenes", "Day 5-6: Save system", "Day 7: Complete 2D game"] },
        { week: 5, title: "Animation", daily: ["Day 1-2: Animator controller", "Day 3-4: Sprite animation", "Day 5-6: Blend trees", "Day 7: Animated character"] },
        { week: 6, title: "Particles & VFX", daily: ["Day 1-2: Particle systems", "Day 3-4: Shader basics", "Day 5-6: Post-processing", "Day 7: VFX project"] },
        { week: 7, title: "3D Game Basics", daily: ["Day 1-2: 3D objects & materials", "Day 3-4: Lighting", "Day 5-6: 3D physics", "Day 7: 3D mini game"] },
        { week: 8, title: "3D Advanced", daily: ["Day 1-2: NavMesh AI", "Day 3-4: Cinemachine", "Day 5-6: Level design", "Day 7: 3D game project"] },
        { week: 9, title: "Game AI", daily: ["Day 1-2: State machines", "Day 3-4: Behavior trees", "Day 5-6: Enemy AI patterns", "Day 7: AI enemy system"] },
        { week: 10, title: "Multiplayer Basics", daily: ["Day 1-2: Netcode concepts", "Day 3-4: Unity Netcode", "Day 5-6: Lobby system", "Day 7: Simple multiplayer game"] },
        { week: 11, title: "Mobile Game Dev", daily: ["Day 1-2: Touch input", "Day 3-4: Mobile UI", "Day 5-6: Performance for mobile", "Day 7: Mobile game build"] },
        { week: 12, title: "Monetization", daily: ["Day 1-2: Ad integration (AdMob)", "Day 3-4: In-app purchases", "Day 5-6: Playtesting", "Day 7: Revenue analysis"] },
        { week: 13, title: "Godot Alternative", daily: ["Day 1-2: Godot 4 basics", "Day 3-4: GDScript", "Day 5-6: 2D game in Godot", "Day 7: Compare with Unity"] },
        { week: 14, title: "Original Game Project", daily: ["Day 1-2: Final game concept", "Day 3-4: Core gameplay", "Day 5-6: Levels & enemies", "Day 7: Internal playtest"] },
        { week: 15, title: "Polish & QA", daily: ["Day 1-2: Bug fixing", "Day 3-4: Performance optimization", "Day 5-6: Accessibility features", "Day 7: External playtesting"] },
        { week: 16, title: "Publish & Portfolio", daily: ["Day 1-2: itch.io & Play Store", "Day 3-4: Game trailer", "Day 5: Portfolio & GitHub", "Day 6: Game jam entry", "Day 7: Apply to game studios"] },
      ],
    },
  };

  // ================================================================
  // QUIZ QUESTION BANK — per field, per topic category
  // ================================================================
 function buildQuizBank(fieldName, weekTopic, count) {
    const pool = getQuestionPool(fieldName, weekTopic);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const result = [];
    for (let i = 0; i < count; i++) {
      const base = shuffled[i % shuffled.length];
      result.push({ ...base, q: i < shuffled.length ? base.q : `(Part ${Math.floor(i / shuffled.length) + 1}) ${base.q}` });
    }
    return result;
  }

  // Topic-category keyword matching — picks question banks that actually
  // relate to the week's real subject, instead of one generic template.
  const TOPIC_CATEGORIES = [
    { match: /html|css|semantic|accessib/i, bank: "webBasics" },
    { match: /javascript|dom|es6|variable|function/i, bank: "javascript" },
    { match: /react|jsx|component|state management|redux/i, bank: "react" },
    { match: /git|github|version control|pull request/i, bank: "git" },
    { match: /node|express|api|backend|rest|graphql/i, bank: "backend" },
    { match: /python|pandas|numpy|matplotlib/i, bank: "pythonData" },
    { match: /sql|database|query|join|schema/i, bank: "sql" },
    { match: /machine learning|neural|tensorflow|scikit|deep learning|model/i, bank: "ml" },
    { match: /network|linux|tcp|dns|bash/i, bank: "networking" },
    { match: /security|owasp|penetration|ctf|cryptograph|vulnerab/i, bank: "security" },
    { match: /docker|kubernetes|ci\/cd|terraform|aws|cloud|devops/i, bank: "devops" },
    { match: /figma|wireframe|prototyp|design system|user research/i, bank: "design" },
    { match: /illustrator|photoshop|logo|brand|typography/i, bank: "graphicDesign" },
    { match: /marketing|seo|ads|social media|campaign|email/i, bank: "marketing" },
    { match: /unity|game|sprite|physics|animator/i, bank: "gameDev" },
    { match: /flutter|dart|mobile|firebase|app/i, bank: "mobile" },
    { match: /data structure|algorithm|system design|oop|solid/i, bank: "softwareEng" },
  ];

  const QUESTION_BANKS = {
    webBasics: [
      { type: "MCQ", q: "Which HTML tag is used to define the main heading of a page?", options: ["<h1>", "<head>", "<title>", "<header>"], correct: 0, category: "HTML" },
      { type: "MCQ", q: "Which CSS property controls the space INSIDE an element's border?", options: ["padding", "margin", "border-spacing", "gap"], correct: 0, category: "CSS" },
      { type: "True/False", q: "True or False: Semantic HTML tags like <article> and <section> help search engines and screen readers understand page structure.", options: ["True", "False"], correct: 0, category: "Accessibility" },
      { type: "MCQ", q: "Which CSS layout system is best suited for creating two-dimensional grids of content?", options: ["CSS Grid", "Floats", "Inline-block only", "Tables"], correct: 0, category: "CSS" },
      { type: "Scenario", q: "Your webpage looks broken on mobile but fine on desktop. What's the most likely missing piece?", options: ["A responsive meta viewport tag and media queries", "More <div> tags", "Bigger images", "Removing all CSS"], correct: 0, category: "Responsive Design" },
      { type: "MCQ", q: "What does the 'alt' attribute on an <img> tag provide?", options: ["Alternative text for accessibility and when the image fails to load", "The image's file size", "The image's color palette", "Nothing important"], correct: 0, category: "Accessibility" },
      { type: "True/False", q: "True or False: Inline styles should generally be avoided in favor of external CSS for maintainability.", options: ["True", "False"], correct: 0, category: "Best Practices" },
      { type: "MCQ", q: "Which unit is relative to the root font size, making it useful for scalable typography?", options: ["rem", "px", "vh", "deg"], correct: 0, category: "CSS" },
    ],
    javascript: [
      { type: "MCQ", q: "Which keyword declares a variable that cannot be reassigned?", options: ["const", "var", "let", "static"], correct: 0, category: "JavaScript Basics" },
      { type: "MCQ", q: "What does the DOM stand for?", options: ["Document Object Model", "Data Object Method", "Direct Output Mode", "Document Order Map"], correct: 0, category: "DOM" },
      { type: "True/False", q: "True or False: Arrow functions do not have their own 'this' binding.", options: ["True", "False"], correct: 0, category: "ES6+" },
      { type: "Scenario", q: "Your click event listener fires multiple times unexpectedly. What's a common cause?", options: ["The event listener was attached multiple times without removal", "The browser is broken", "JavaScript doesn't support click events", "You used const instead of let"], correct: 0, category: "Events" },
      { type: "MCQ", q: "Which array method creates a NEW array with transformed elements without mutating the original?", options: ["map()", "forEach()", "push()", "splice()"], correct: 0, category: "Arrays" },
      { type: "MCQ", q: "What will typeof null return in JavaScript?", options: ["\"object\"", "\"null\"", "\"undefined\"", "\"boolean\""], correct: 0, category: "JavaScript Basics" },
      { type: "True/False", q: "True or False: JSON.stringify() converts a JavaScript object into a JSON string.", options: ["True", "False"], correct: 0, category: "JavaScript Basics" },
      { type: "Scenario", q: "You need to wait for an API call to finish before using its data. What's the cleanest modern approach?", options: ["async/await with try/catch", "Random setTimeout delays", "Ignore the response timing", "Recursive infinite loops"], correct: 0, category: "Async" },
    ],
    react: [
      { type: "MCQ", q: "What is JSX?", options: ["A syntax extension that lets you write HTML-like code in JavaScript", "A new programming language", "A CSS framework", "A database query language"], correct: 0, category: "React Basics" },
      { type: "MCQ", q: "Which hook lets you add state to a functional component?", options: ["useState", "useEffect", "useRef", "useMemo"], correct: 0, category: "Hooks" },
      { type: "True/False", q: "True or False: Props are read-only and should not be modified directly by the child component.", options: ["True", "False"], correct: 0, category: "Components" },
      { type: "Scenario", q: "Your component re-renders infinitely. What's a common cause?", options: ["Updating state inside useEffect without proper dependencies", "Using too many comments", "Naming a component lowercase", "Using JSX fragments"], correct: 0, category: "Hooks" },
      { type: "MCQ", q: "Which hook is used to perform side effects like data fetching?", options: ["useEffect", "useState", "useContext", "useCallback"], correct: 0, category: "Hooks" },
      { type: "MCQ", q: "What is the purpose of a 'key' prop when rendering lists in React?", options: ["Helps React identify which items changed, added, or removed", "Makes the list look styled", "Required only for arrays of numbers", "Has no real purpose"], correct: 0, category: "Lists & Keys" },
      { type: "True/False", q: "True or False: Lifting state up means moving shared state to the closest common parent component.", options: ["True", "False"], correct: 0, category: "State Management" },
    ],
    git: [
      { type: "MCQ", q: "Which command stages changes for the next commit?", options: ["git add", "git commit", "git push", "git clone"], correct: 0, category: "Git Basics" },
      { type: "MCQ", q: "What does 'git pull' do?", options: ["Fetches and merges changes from a remote repository", "Deletes your local repository", "Creates a new branch", "Pushes your changes to remote"], correct: 0, category: "Git Basics" },
      { type: "True/False", q: "True or False: A merge conflict happens when Git cannot automatically reconcile differences between two commits.", options: ["True", "False"], correct: 0, category: "Branching" },
      { type: "Scenario", q: "You accidentally committed to the wrong branch. What's a safe next step?", options: ["Use git log to inspect history, then carefully move or revert the commit", "Delete the entire repository", "Force push without checking anything", "Ignore it permanently"], correct: 0, category: "Troubleshooting" },
      { type: "MCQ", q: "What is the purpose of a Pull Request on GitHub?", options: ["To propose and review code changes before merging", "To delete a repository", "To download a repo as a zip", "To create a new GitHub account"], correct: 0, category: "Collaboration" },
      { type: "MCQ", q: "Which command creates a new branch AND switches to it in one step?", options: ["git checkout -b branchname", "git branch branchname", "git merge branchname", "git status"], correct: 0, category: "Branching" },
    ],
    backend: [
      { type: "MCQ", q: "Which HTTP method is typically used to retrieve data without modifying it?", options: ["GET", "DELETE", "PUT", "PATCH"], correct: 0, category: "REST APIs" },
      { type: "MCQ", q: "What status code indicates a successful resource creation?", options: ["201 Created", "404 Not Found", "500 Internal Server Error", "302 Found"], correct: 0, category: "REST APIs" },
      { type: "True/False", q: "True or False: Middleware functions in Express run between the request and the final response handler.", options: ["True", "False"], correct: 0, category: "Express" },
      { type: "Scenario", q: "Your API exposes sensitive data without authentication. What's the priority fix?", options: ["Add authentication/authorization middleware before exposing the route", "Change the response format", "Add more console.logs", "Ignore it since it's just a demo"], correct: 0, category: "Security" },
      { type: "MCQ", q: "What does REST stand for?", options: ["Representational State Transfer", "Remote Endpoint Service Transfer", "Rapid External Server Test", "Resource Execution State Type"], correct: 0, category: "REST APIs" },
    ],
    pythonData: [
      { type: "MCQ", q: "Which library is primarily used for tabular data manipulation in Python?", options: ["Pandas", "Matplotlib", "Flask", "Django"], correct: 0, category: "Pandas" },
      { type: "MCQ", q: "What does a NumPy array provide that a regular Python list doesn't (efficiently)?", options: ["Fast vectorized numerical operations", "Built-in web hosting", "Automatic translation", "Voice recognition"], correct: 0, category: "NumPy" },
      { type: "True/False", q: "True or False: df.head() in Pandas shows the last rows of a DataFrame by default.", options: ["False", "True"], correct: 0, category: "Pandas" },
      { type: "Scenario", q: "Your dataset has many missing values. What's a reasonable first step?", options: ["Explore how much data is missing, then decide to fill or drop appropriately", "Delete the entire dataset", "Ignore it and proceed to modeling", "Replace all missing values with 0 without analysis"], correct: 0, category: "Data Cleaning" },
      { type: "MCQ", q: "Which function in Pandas groups rows for aggregate calculations?", options: ["groupby()", "sort_values()", "merge()", "concat()"], correct: 0, category: "Pandas" },
    ],
    sql: [
      { type: "MCQ", q: "Which SQL clause filters rows BEFORE grouping?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], correct: 0, category: "SQL" },
      { type: "MCQ", q: "Which JOIN returns only matching rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"], correct: 0, category: "SQL Joins" },
      { type: "True/False", q: "True or False: A primary key uniquely identifies each row in a table.", options: ["True", "False"], correct: 0, category: "Database Design" },
      { type: "Scenario", q: "Your query returns duplicate rows after a JOIN. What's a likely cause?", options: ["The join condition matches multiple rows on the other table", "SQL doesn't support joins", "You used too many columns", "The database is corrupted"], correct: 0, category: "Troubleshooting" },
      { type: "MCQ", q: "Which clause is used to filter groups AFTER a GROUP BY?", options: ["HAVING", "WHERE", "LIMIT", "DISTINCT"], correct: 0, category: "SQL" },
    ],
    ml: [
      { type: "MCQ", q: "What is the main difference between supervised and unsupervised learning?", options: ["Supervised learning uses labeled data; unsupervised does not", "Supervised learning is always faster", "Unsupervised learning requires more labels", "There is no real difference"], correct: 0, category: "ML Fundamentals" },
      { type: "MCQ", q: "What does 'overfitting' mean in machine learning?", options: ["A model performs well on training data but poorly on new data", "A model is too simple to learn anything", "A model trains too quickly", "A dataset has too few features"], correct: 0, category: "Model Evaluation" },
      { type: "True/False", q: "True or False: Splitting data into training and test sets helps evaluate how well a model generalizes.", options: ["True", "False"], correct: 0, category: "ML Fundamentals" },
      { type: "Scenario", q: "Your model has 99% training accuracy but 60% test accuracy. What should you investigate first?", options: ["Overfitting — consider regularization or more diverse data", "Buy a faster computer", "Increase the learning rate to maximum", "Remove the test set entirely"], correct: 0, category: "Model Evaluation" },
      { type: "MCQ", q: "Which metric is most appropriate for imbalanced classification problems (alongside accuracy)?", options: ["Precision/Recall/F1-score", "Only accuracy", "Mean Squared Error", "R-squared"], correct: 0, category: "Model Evaluation" },
    ],
    networking: [
      { type: "MCQ", q: "Which protocol resolves domain names into IP addresses?", options: ["DNS", "HTTP", "FTP", "SMTP"], correct: 0, category: "Networking" },
      { type: "MCQ", q: "Which Linux command shows current running processes?", options: ["ps", "ls", "cd", "mkdir"], correct: 0, category: "Linux" },
      { type: "True/False", q: "True or False: A firewall can be configured to block or allow traffic based on rules.", options: ["True", "False"], correct: 0, category: "Networking" },
      { type: "Scenario", q: "You can't SSH into a remote server. What should you check first?", options: ["Network connectivity, correct IP, and that the SSH service is running", "Assume the internet is broken everywhere", "Reinstall your operating system", "Buy new hardware"], correct: 0, category: "Troubleshooting" },
      { type: "MCQ", q: "What does 'chmod 755' typically do to a file in Linux?", options: ["Sets specific read/write/execute permissions for owner, group, others", "Deletes the file", "Encrypts the file", "Renames the file"], correct: 0, category: "Linux" },
    ],
    security: [
      { type: "MCQ", q: "What does the 'C' in the CIA Triad stand for?", options: ["Confidentiality", "Control", "Compliance", "Cryptography"], correct: 0, category: "Security Fundamentals" },
      { type: "MCQ", q: "Which OWASP Top 10 vulnerability involves injecting malicious SQL code?", options: ["SQL Injection", "Cross-Site Scripting", "Broken Authentication", "Security Misconfiguration"], correct: 0, category: "Web Security" },
      { type: "True/False", q: "True or False: Hashing passwords (instead of storing plain text) protects users even if a database is breached.", options: ["True", "False"], correct: 0, category: "Security Fundamentals" },
      { type: "Scenario", q: "You find a website doesn't sanitize user input before displaying it. What vulnerability could this lead to?", options: ["Cross-Site Scripting (XSS)", "It's always safe to display raw input", "This only matters for images", "No vulnerability exists"], correct: 0, category: "Web Security" },
      { type: "MCQ", q: "What is the purpose of a CTF (Capture The Flag) exercise?", options: ["Practice real-world security skills in a legal, gamified environment", "To literally capture physical flags", "To test internet speed", "To design logos"], correct: 0, category: "Practice" },
    ],
    devops: [
      { type: "MCQ", q: "What is the main benefit of using Docker containers?", options: ["Consistent, isolated environments that run the same everywhere", "They make code run faster than bare metal always", "They replace the need for any programming language", "They are only useful for databases"], correct: 0, category: "Docker" },
      { type: "MCQ", q: "What does CI/CD stand for?", options: ["Continuous Integration / Continuous Deployment", "Code Inspection / Code Delivery", "Cloud Infrastructure / Cloud Deployment", "Container Image / Container Deployment"], correct: 0, category: "CI/CD" },
      { type: "True/False", q: "True or False: Infrastructure as Code (IaC) like Terraform allows you to manage infrastructure using configuration files instead of manual setup.", options: ["True", "False"], correct: 0, category: "IaC" },
      { type: "Scenario", q: "Your deployment pipeline fails at the build step. What should you check first?", options: ["Build logs for the specific error message", "Restart your computer", "Delete the whole repository", "Ignore it and deploy manually forever"], correct: 0, category: "Troubleshooting" },
      { type: "MCQ", q: "In Kubernetes, what is the smallest deployable unit?", options: ["Pod", "Node", "Cluster", "Service"], correct: 0, category: "Kubernetes" },
    ],
    design: [
      { type: "MCQ", q: "What is the primary purpose of a wireframe?", options: ["To show the basic structure and layout before visual design", "To finalize brand colors", "To write marketing copy", "To host the live website"], correct: 0, category: "UX Process" },
      { type: "MCQ", q: "What does a user persona represent?", options: ["A fictional representation of a target user based on research", "The designer's personal preferences", "A type of font", "A coding language"], correct: 0, category: "User Research" },
      { type: "True/False", q: "True or False: Usability testing helps identify real problems users face with a design before launch.", options: ["True", "False"], correct: 0, category: "User Research" },
      { type: "Scenario", q: "Users keep missing an important button in your prototype during testing. What should you do?", options: ["Improve visual hierarchy/contrast to make it more noticeable, then retest", "Ignore the feedback and ship anyway", "Remove the button completely", "Make every element the same size"], correct: 0, category: "Usability" },
      { type: "MCQ", q: "What is the goal of a design system?", options: ["Ensure visual and functional consistency across a product", "Replace the need for designers", "Only used for print design", "Has no real practical benefit"], correct: 0, category: "Design Systems" },
    ],
    graphicDesign: [
      { type: "MCQ", q: "Which color mode is used for print design?", options: ["CMYK", "RGB", "HEX only", "Grayscale only"], correct: 0, category: "Print Design" },
      { type: "MCQ", q: "What is the main advantage of vector graphics (like in Illustrator) over raster images?", options: ["They can be scaled infinitely without losing quality", "They always look pixelated", "They cannot be edited", "They are only for photos"], correct: 0, category: "Illustrator" },
      { type: "True/False", q: "True or False: A consistent typography system improves a brand's professional appearance.", options: ["True", "False"], correct: 0, category: "Typography" },
      { type: "Scenario", q: "A client says your logo looks pixelated when printed large. What likely went wrong?", options: ["A raster file was used instead of a scalable vector format", "The client's printer is broken", "Logos should never be large", "Colors were too bright"], correct: 0, category: "Print Design" },
      { type: "MCQ", q: "What is the purpose of a brand style guide?", options: ["Document consistent use of colors, fonts, and logo across all materials", "List employee salaries", "Replace the need for a logo", "Only used by developers"], correct: 0, category: "Branding" },
    ],
    marketing: [
      { type: "MCQ", q: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engagement Outreach", "Sales Email Operations", "Site Editing Online"], correct: 0, category: "SEO" },
      { type: "MCQ", q: "Which metric measures the percentage of people who click an ad after seeing it?", options: ["CTR (Click-Through Rate)", "ROI", "CPM", "Bounce Rate only"], correct: 0, category: "Paid Ads" },
      { type: "True/False", q: "True or False: A buyer persona helps marketers tailor content to specific audience needs.", options: ["True", "False"], correct: 0, category: "Strategy" },
      { type: "Scenario", q: "Your email open rate is very low. What should you test first?", options: ["Subject lines and sender name through A/B testing", "Send more emails per day regardless", "Delete the email list", "Switch to only physical mail"], correct: 0, category: "Email Marketing" },
      { type: "MCQ", q: "What is the purpose of UTM parameters in a marketing link?", options: ["Track the source, medium, and campaign of traffic in analytics", "Make links shorter", "Encrypt the destination URL", "Block bots from clicking"], correct: 0, category: "Analytics" },
    ],
    gameDev: [
      { type: "MCQ", q: "What is a 'game loop' responsible for?", options: ["Continuously updating game state, physics, and rendering each frame", "Only playing background music", "Saving the game once at the start", "Compiling the code"], correct: 0, category: "Game Design" },
      { type: "MCQ", q: "In Unity, what component allows an object to respond to physics like gravity?", options: ["Rigidbody", "Transform", "Camera", "Canvas"], correct: 0, category: "Unity" },
      { type: "True/False", q: "True or False: Playtesting with real users helps identify confusing or unfun parts of a game before release.", options: ["True", "False"], correct: 0, category: "Game Design" },
      { type: "Scenario", q: "Your character falls through the floor in your game. What's the likely cause?", options: ["Missing or misconfigured colliders on the floor or character", "The game engine is broken", "You used too many colors", "The game resolution is wrong"], correct: 0, category: "Physics & Animation" },
      { type: "MCQ", q: "What is the purpose of an Animator Controller in Unity?", options: ["Manage transitions between different character animations", "Control camera zoom only", "Compile C# scripts", "Store save files"], correct: 0, category: "Animation" },
    ],
    mobile: [
      { type: "MCQ", q: "In Flutter, what is the difference between a StatelessWidget and a StatefulWidget?", options: ["StatefulWidget can change its internal state over time; Stateless cannot", "They are exactly the same", "StatelessWidget is for Android only", "StatefulWidget can't display UI"], correct: 0, category: "Flutter" },
      { type: "MCQ", q: "What is the main purpose of Firebase Authentication?", options: ["Manage user sign-up, login, and identity securely", "Store image files only", "Design app icons", "Compile Dart code"], correct: 0, category: "Firebase" },
      { type: "True/False", q: "True or False: Testing your mobile app on multiple screen sizes helps ensure a consistent user experience.", options: ["True", "False"], correct: 0, category: "Mobile UI" },
      { type: "Scenario", q: "Your app crashes only on older Android devices. What should you check first?", options: ["Minimum SDK version compatibility and device-specific logs", "Assume all old phones are broken", "Remove the app from app stores immediately", "Ignore it since newer phones work fine"], correct: 0, category: "Troubleshooting" },
      { type: "MCQ", q: "Which package is commonly used in Flutter to make HTTP requests?", options: ["http package", "sqflite", "provider", "flutter_test"], correct: 0, category: "Flutter" },
    ],
    softwareEng: [
      { type: "MCQ", q: "What is the time complexity of binary search on a sorted array?", options: ["O(log n)", "O(n)", "O(n²)", "O(1) always"], correct: 0, category: "Algorithms" },
      { type: "MCQ", q: "Which data structure uses LIFO (Last In, First Out) ordering?", options: ["Stack", "Queue", "Array", "Hash Map"], correct: 0, category: "Data Structures" },
      { type: "True/False", q: "True or False: The 'S' in SOLID principles stands for Single Responsibility Principle.", options: ["True", "False"], correct: 0, category: "OOP & Design" },
      { type: "Scenario", q: "Your function does five unrelated things and is hard to test. What principle is being violated?", options: ["Single Responsibility Principle", "It's fine, more code is always better", "The DRY principle only applies to CSS", "This has nothing to do with design principles"], correct: 0, category: "OOP & Design" },
      { type: "MCQ", q: "In system design, what does 'horizontal scaling' mean?", options: ["Adding more machines/servers to handle load", "Making a single server more powerful", "Reducing the number of users", "Removing a database"], correct: 0, category: "System Design" },
    ],
  };

  function getQuestionPool(fieldName, topic) {
    const matchedBanks = new Set();
    TOPIC_CATEGORIES.forEach((cat) => {
      if (cat.match.test(topic)) matchedBanks.add(cat.bank);
    });

    let pool = [];
    matchedBanks.forEach((bankName) => {
      if (QUESTION_BANKS[bankName]) pool = pool.concat(QUESTION_BANKS[bankName]);
    });

    // Fallback: if no category matched this topic, use a generic pool
    // so the quiz still works for any week.
    if (pool.length === 0) {
      pool = [
        { type: "MCQ", q: `Which approach is BEST when first learning "${topic}"?`, options: ["Understand the core concept through trusted resources, then practice", "Skip straight to advanced material", "Memorize without understanding", "Avoid practicing"], correct: 0, category: "Fundamentals" },
        { type: "Scenario", q: `You're stuck applying "${topic}" in a real task. What's the best next step?`, options: ["Re-read the basics and try a smaller example first", "Give up on this topic", "Ignore the issue and move on", "Copy code blindly without understanding"], correct: 0, category: "Problem Solving" },
        { type: "True/False", q: `True or False: Building a small project using "${topic}" reinforces learning better than passive reading alone.`, options: ["True", "False"], correct: 0, category: "Application" },
        { type: "MCQ", q: `What is the most reliable way to verify your understanding of "${topic}"?`, options: ["Explain or apply it from memory without notes", "Just recognize it when you see it", "Watch one video about it", "Ask someone else to do it for you"], correct: 0, category: "Retention" },
      ];
    }
    return pool;
  }

  // ================================================================
  // STATE
  // ================================================================
  function getState() {
    try { return JSON.parse(localStorage.getItem("cp_assessment") || "{}"); } catch { return {}; }
  }
  function setState(partial) {
    const updated = { ...getState(), ...partial };
    localStorage.setItem("cp_assessment", JSON.stringify(updated));
    return updated;
  }

  // ================================================================
  // LOCK/UNLOCK CARDS
  // ================================================================
  function refreshLockState() {
    const done = !!getState().completed;
    document.querySelectorAll(".dash-mini-card[data-feature]").forEach((card) => {
      if (done) { card.classList.remove("locked"); card.classList.add("unlocked"); }
      else { card.classList.add("locked"); card.classList.remove("unlocked"); }
    });
  }

  // ================================================================
  // VIEW SWITCHER
  // ================================================================
  function showView(id) {
    document.querySelectorAll(".av-view").forEach((v) => v.classList.remove("active"));
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
  }
  window.avShowView = showView;

  // ================================================================
  // LANDING CHOICE
  // ================================================================
  window.avChoose = function (option) {
    showView(option === 1 ? "av-form-guidance" : "av-form-known");
  };

  // ================================================================
  // CHIP / PILL BINDING
  // ================================================================
  function bindChips(containerSelector) {
    document.querySelectorAll(containerSelector + " .av-chip").forEach((chip) => {
      chip.addEventListener("click", () => chip.classList.toggle("selected"));
    });
  }
  function bindPills(containerSelector) {
    document.querySelectorAll(containerSelector).forEach((group) => {
      group.querySelectorAll(".av-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
          group.querySelectorAll(".av-pill").forEach((p) => p.classList.remove("selected"));
          pill.classList.add("selected");
        });
      });
    });
  }
  function getSelectedChips(containerId) {
    return [...document.querySelectorAll(`#${containerId} .av-chip.selected`)].map((c) => c.dataset.value);
  }
  function getSelectedPill(groupId) {
    const sel = document.querySelector(`#${groupId} .av-pill.selected`);
    return sel ? sel.dataset.value : null;
  }

  // ================================================================
  // SCORING
  // ================================================================
  function scoreFields(userInterests, userSubjects, userWorkType) {
    const results = [];
    for (const [name, field] of Object.entries(FIELDS)) {
      const totalKeys = field.interests.length + field.subjects.length + field.workType.length;
      let matched = 0;
      field.interests.forEach((i) => { if (userInterests.includes(i)) matched++; });
      field.subjects.forEach((s) => { if (userSubjects.includes(s)) matched++; });
      field.workType.forEach((w) => { if (userWorkType === w) matched++; });
      results.push({ name, pct: Math.round((matched / totalKeys) * 100), matched });
    }
    results.sort((a, b) => b.pct - a.pct);
    return results;
  }

  window.avRunAssessment = function () {
    const interests = getSelectedChips("guidanceInterests");
    const subjects = getSelectedChips("guidanceSubjects");
    const workType = getSelectedPill("guidanceWorkTypeGroup");
    if (!interests.length || !subjects.length || !workType) {
      alert("Please select at least one interest, one subject, and a work type.");
      return;
    }
    let scores = scoreFields(interests, subjects, workType);
    if (scores[0].pct < 60) {
      const boost = 60 - scores[0].pct;
      scores = scores.map((s, i) => ({ ...s, pct: i === 0 ? 60 : Math.max(15, s.pct - Math.round(boost / 4)) }));
    }
    scores[0].pct = Math.min(scores[0].pct, 95);
    const primary = scores[0];
    const reason = `Your interests in ${interests.slice(0, 3).join(", ")} and strengths in ${subjects.slice(0, 2).join(" & ")} align strongly with ${primary.name}.`;
    renderResult(primary.name, primary.pct, reason, [scores[1], scores[2]]);
    setState({ completed: true, field: primary.name, matchPct: primary.pct, level: "Beginner", studyTime: "3-4 Hours", timeline: "6 Months", quizUnlockedWeek: 1, quizScores: {} });
    refreshLockState();
  };

  function renderResult(fieldName, pct, reason, alts) {
    const field = FIELDS[fieldName];
    document.getElementById("avResultField").textContent = fieldName;
    document.getElementById("avResultRingPct").textContent = pct + "%";
    document.getElementById("avResultRing").style.setProperty("--pct", pct);
    document.getElementById("avResultReason").textContent = reason;
    document.getElementById("avResultOutlook").textContent = field.outlook;
    document.getElementById("avResultAlts").innerHTML = (alts || [])
      .map((a) => `<div class="av-alt-chip"><b>${a.name}</b>${a.pct}% match</div>`).join("");
    showView("av-result");
  }

  // ================================================================
  // OPTION 2: KNOWN PATH
  // ================================================================
  // Map HTML dropdown option values → FIELDS keys
  const FIELD_ALIAS = {
    "Cloud Computing": "Cloud & DevOps",
    "DevOps": "Cloud & DevOps",
    "Artificial Intelligence & Machine Learning": "AI & Machine Learning",
    "AI & Machine Learning": "AI & Machine Learning",
    "Cyber Security": "Cyber Security",
  };

  window.avGeneratePlan = function () {
    const rawField = document.getElementById("knownFieldSelect").value;
    const field = FIELD_ALIAS[rawField] || rawField;
    const level = getSelectedPill("knownLevelGroup");
    const studyTime = getSelectedPill("knownStudyGroup");
    const timeline = getSelectedPill("knownTimelineGroup");
    if (!rawField || !level || !studyTime || !timeline) { alert("Please complete all fields."); return; }
    if (!FIELDS[field]) { alert("This field is coming soon. Please select another."); return; }
    setState({ completed: true, field, matchPct: 100, level, studyTime, timeline, quizUnlockedWeek: 1, quizScores: {} });
    refreshLockState();
    document.getElementById("avResultField").textContent = field;
    document.getElementById("avResultRingPct").textContent = "Ready";
    document.getElementById("avResultRing").style.setProperty("--pct", 100);
    document.getElementById("avResultReason").textContent = `Your personalized ${level.toLowerCase()}-level roadmap for ${field} is ready — paced for ${studyTime}/day over ${timeline}.`;
    document.getElementById("avResultOutlook").textContent = FIELDS[field].outlook;
    document.getElementById("avResultAlts").innerHTML = "";
    showView("av-result");
  };

  // ================================================================
  // SEMESTER TOGGLE
  // ================================================================
  window.avToggleSemester = function () {
    const edu = document.getElementById("guidanceEdu").value;
    const semField = document.getElementById("semesterField");
    if (semField) semField.style.display = edu === "Bachelor's" ? "block" : "none";
  };

  // ================================================================
  // ROADMAP
  // ================================================================
  window.avOpenRoadmap = function () {
    const state = getState();
    if (!state.completed) return;
    const field = FIELDS[state.field];
    document.getElementById("roadmapFieldName").textContent = state.field;
    const duration = state.roadmapDuration || "3";
    renderRoadmap(field, duration);
    showView("av-roadmap");
  };

  function renderRoadmap(field, duration) {
    const state = getState();
    const weeks = duration === "6" ? field.roadmap6 : field.roadmap3;
    const currentWeekNum = state.quizUnlockedWeek || 1;
    const weeksHtml = weeks.map((w, i) => `
      <div class="av-week-card ${w.week === currentWeekNum ? 'av-current-week' : ''}" style="animation-delay:${i * 0.04}s" onclick="avToggleWeekDetail(this)">
        <div class="av-week-card-header">
          <div class="av-week-badge">W${w.week}</div>
          <h5>Week ${w.week}: ${w.title} ${w.week === currentWeekNum ? '<span class="av-here-badge">You are here</span>' : ''}</h5>
          <span class="av-week-expand-icon">▼</span>
        </div>
        <div class="av-week-daily">
          ${w.daily.map(d => `<div class="av-daily-row"><span class="av-daily-dot"></span>${d}</div>`).join("")}
        </div>
      </div>`).join("");
    document.getElementById("roadmapWeekList").innerHTML = weeksHtml;

    const chainHtml = field.visual.map((node, i) =>
      `<div class="av-chain-node">${node}</div>` + (i < field.visual.length - 1 ? `<span class="av-chain-arrow">→</span>` : "")
    ).join("");
    document.getElementById("roadmapChain").innerHTML = chainHtml;

    const durationLabel = duration === "6" ? "6-Month  " : "3-Month  ";
    document.getElementById("roadmapDurationBadge").textContent = durationLabel;
    // const state = getState();
    document.getElementById("roadmapTotalWeeks").textContent = weeks.length + " weeks";
    document.getElementById("roadmapCurrentWeek").textContent = "Week " + (state.quizUnlockedWeek || 1);
    document.getElementById("roadmapPace").textContent = state.studyTime || "3-4 Hours";
  }

  window.avToggleWeekDetail = function (el) {
    el.classList.toggle("av-week-open");
  };

  window.avSwitchDuration = function (dur) {
    const state = getState();
    setState({ roadmapDuration: dur });
    const field = FIELDS[state.field];
    renderRoadmap(field, dur);
    document.querySelectorAll(".av-dur-btn").forEach(b => b.classList.toggle("active", b.dataset.dur === dur));
  };

  // ================================================================
  // LEARNING RESOURCES
  // ================================================================
  window.avOpenResources = function () {
    const state = getState();
    if (!state.completed) return;
    const field = FIELDS[state.field];
    document.getElementById("resourcesFieldName").textContent = state.field;

    document.getElementById("resDocs").innerHTML = field.resources.docs
      .map(d => `<li><a href="${d.url}" target="_blank" rel="noopener">${d.name} ↗</a></li>`).join("");
    document.getElementById("resYoutube").innerHTML = field.resources.youtube
      .map(d => `<li><a href="${d.url}" target="_blank" rel="noopener">${d.name} ↗</a></li>`).join("");
    document.getElementById("resPractice").innerHTML = field.resources.practice
      .map(d => `<li><a href="${d.url}" target="_blank" rel="noopener">${d.name} ↗</a></li>`).join("");

    showView("av-resources");
  };

  // ================================================================
  // QUIZ SYSTEM
  // ================================================================
  let currentQuiz = { week: null, questions: [], answers: [], timer: null, seconds: 0 };

  window.avOpenQuizHub = function () {
    const state = getState();
    if (!state.completed) return;
    const field = FIELDS[state.field];
    const unlocked = state.quizUnlockedWeek || 1;
    const scores = state.quizScores || {};
    const dur = state.roadmapDuration || "3";
    const weeks = dur === "6" ? field.roadmap6 : field.roadmap3;

    document.getElementById("quizFieldName").textContent = state.field;

    const grid = weeks.map((w) => {
      const week = w.week;
      let cls = "locked-week";
      let label = "🔒 Locked";
      if (scores[week] !== undefined) { cls = "done-week"; label = `✓ ${scores[week]}/10`; }
      else if (week <= unlocked) { cls = ""; label = "Start"; }
      return `<div class="av-quiz-week-btn ${cls}" onclick="avStartQuizPrompt(${week})">
        <strong>Week ${week}</strong><br><small>${w.title}</small><br><span class="av-quiz-week-score">${label}</span>
      </div>`;
    }).join("");
    document.getElementById("quizWeekGrid").innerHTML = grid;
    document.getElementById("quizArea").innerHTML = "";
    showView("av-quiz");
  };

  window.avStartQuizPrompt = function (week) {
    const state = getState();
    const unlocked = state.quizUnlockedWeek || 1;
    if (week > unlocked && !state.quizScores?.[week]) return;

    document.getElementById("quizArea").innerHTML = `
      <div class="av-quiz-config-card">
        <h4>Quiz Setup — Week ${week}</h4>
        <p>How many questions would you like?</p>
        <div class="av-quiz-count-group">
          <label class="av-count-pill"><input type="radio" name="qcount" value="10" checked> 10 Questions</label>
          <label class="av-count-pill"><input type="radio" name="qcount" value="20"> 20 Questions</label>
          <label class="av-count-pill"><input type="radio" name="qcount" value="30"> 30 Questions</label>
        </div>
        <button class="av-submit-btn" onclick="avStartQuiz(${week})">Start Quiz →</button>
      </div>`;
  };

  window.avStartQuiz = function (week) {
    const state = getState();
    const field = FIELDS[state.field];
    const dur = state.roadmapDuration || "3";
    const weeks = dur === "6" ? field.roadmap6 : field.roadmap3;
    const weekData = weeks.find(w => w.week === week);
    const countInput = document.querySelector('input[name="qcount"]:checked');
    const count = countInput ? parseInt(countInput.value) : 10;
    const questions = buildQuizBank(state.field, weekData.title, count);
    currentQuiz = { week, questions, answers: new Array(questions.length).fill(null), seconds: count * 30 };
    renderQuiz();
    startTimer();
  };

  function renderQuiz() {
    const area = document.getElementById("quizArea");
    let html = `<div class="av-feature-header">
      <h4 style="margin:0;">Week ${currentQuiz.week} Quiz &nbsp;<span style="font-size:13px;color:var(--text-muted)">(${currentQuiz.questions.length} questions)</span></h4>
      <span class="av-quiz-timer">⏱ <span id="quizTimerVal">${currentQuiz.seconds}</span>s</span>
    </div>`;

    currentQuiz.questions.forEach((q, qi) => {
      html += `<div class="av-quiz-q">
        <div class="av-quiz-meta"><span class="av-quiz-type-tag">${q.type}</span><span class="av-quiz-cat-tag">${q.category}</span></div>
        <h5>${qi + 1}. ${q.q}</h5>
        ${q.options.map((opt, oi) => `
          <div class="av-quiz-opt" onclick="avSelectAnswer(${qi}, ${oi})" id="opt-${qi}-${oi}">${opt}</div>
        `).join("")}
      </div>`;
    });

    html += `<button class="av-submit-btn" onclick="avSubmitQuiz()">Submit Quiz →</button>`;
    area.innerHTML = html;
  }

  window.avSelectAnswer = function (qi, oi) {
    currentQuiz.answers[qi] = oi;
    currentQuiz.questions[qi].options.forEach((_, i) => {
      document.getElementById(`opt-${qi}-${i}`)?.classList.toggle("chosen", i === oi);
    });
  };

  function startTimer() {
    clearInterval(currentQuiz.timer);
    currentQuiz.timer = setInterval(() => {
      currentQuiz.seconds--;
      const el = document.getElementById("quizTimerVal");
      if (el) el.textContent = currentQuiz.seconds;
      if (currentQuiz.seconds <= 0) { clearInterval(currentQuiz.timer); avSubmitQuiz(); }
    }, 1000);
  }

  window.avSubmitQuiz = function () {
    clearInterval(currentQuiz.timer);
    const categoryMap = {};
    let correct = 0;

    currentQuiz.questions.forEach((q, qi) => {
      const isCorrect = currentQuiz.answers[qi] === q.correct;
      if (isCorrect) correct++;
      if (!categoryMap[q.category]) categoryMap[q.category] = { correct: 0, total: 0 };
      categoryMap[q.category].total++;
      if (isCorrect) categoryMap[q.category].correct++;

      q.options.forEach((_, oi) => {
        const el = document.getElementById(`opt-${qi}-${oi}`);
        if (!el) return;
        if (oi === q.correct) el.classList.add("correct-ans");
        else if (oi === currentQuiz.answers[qi]) el.classList.add("wrong-ans");
      });
    });

    const total = currentQuiz.questions.length;
    const pct = Math.round((correct / total) * 100);
    const scoreOutOf10 = Math.round((correct / total) * 10);

    // Find weak categories
    const weakCategories = Object.entries(categoryMap)
      .filter(([, v]) => v.correct / v.total < 0.6)
      .map(([cat, v]) => ({ cat, pct: Math.round((v.correct / v.total) * 100) }));

    const state = getState();
    const scores = { ...(state.quizScores || {}), [currentQuiz.week]: scoreOutOf10 };
    const newUnlocked = pct >= 60 ? Math.max(state.quizUnlockedWeek || 1, currentQuiz.week + 1) : state.quizUnlockedWeek;
    setState({ quizScores: scores, quizUnlockedWeek: newUnlocked });

    setTimeout(() => {
      const area = document.getElementById("quizArea");
      const weakHtml = weakCategories.length
        ? `<div style="margin:16px 0 8px;"><strong>Weak Areas Detected:</strong></div>
           <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
             ${weakCategories.map(w => `<span class="av-weak-tag">${w.cat} (${w.pct}%)</span>`).join("")}
           </div>
           <div class="av-suggestion-box">
             <strong>Suggestions:</strong>
             <ul style="margin:8px 0 0;padding-left:18px;">
               ${weakCategories.map(w => `<li style="margin-bottom:5px;">Review <em>${w.cat}</em> — re-read this week's topic notes and try a small exercise before retaking.</li>`).join("")}
             </ul>
           </div>`
        : `<div class="av-suggestion-box" style="background:var(--success-bg);border-left:3px solid var(--success);"><strong>Excellent work!</strong> You demonstrated solid understanding across all question categories. Keep building on this foundation.</div>`;

      area.innerHTML = `
        <div class="av-result-quiz-summary">
          <div style="text-align:center;margin-bottom:18px;">
            <div class="av-score-ring" style="--pct:${pct}; margin:0 auto 12px;">
              <div class="av-score-inner"><b>${scoreOutOf10}/10</b><span>SCORE</span></div>
            </div>
            <p style="margin:0 0 4px;"><strong>Correct:</strong> ${correct} / ${total} &nbsp;|&nbsp; <strong>Accuracy:</strong> ${pct}%</p>
            <p style="margin:0;color:var(--text-muted);font-size:13px;">Pass threshold: 60% — ${pct >= 60 ? "✅ Passed! Next week unlocked." : "❌ Did not pass. Review and retry."}</p>
          </div>
          <div class="av-category-breakdown">
            <strong>Category Breakdown:</strong>
            <div style="margin-top:10px;display:flex;flex-direction:column;gap:7px;">
              ${Object.entries(categoryMap).map(([cat, v]) => {
                const p = Math.round((v.correct / v.total) * 100);
                const color = p >= 80 ? "var(--success)" : p >= 60 ? "#f0a500" : "var(--error)";
                return `<div style="display:flex;align-items:center;gap:10px;font-size:13px;">
                  <span style="min-width:140px;color:var(--text-muted)">${cat}</span>
                  <div style="flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden;">
                    <div style="width:${p}%;height:100%;background:${color};border-radius:3px;transition:width 0.8s ease;"></div>
                  </div>
                  <span style="min-width:36px;text-align:right;font-weight:600;">${p}%</span>
                </div>`;
              }).join("")}
            </div>
          </div>
          ${weakHtml}
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px;">
          <button class="av-submit-btn" onclick="avOpenQuizHub()">← Back to Weeks</button>
          ${pct < 60 ? `<button class="av-submit-btn" style="background:rgba(91,47,184,0.12);color:var(--purple-700);box-shadow:none;border:1.5px solid var(--border);" onclick="avStartQuizPrompt(${currentQuiz.week})">🔁 Retry This Week</button>` : ""}
        </div>`;
    }, 600);
  };

  // ================================================================
  // INIT
  // ================================================================
  document.addEventListener("DOMContentLoaded", () => {
    bindChips("#guidanceInterests");
    bindChips("#guidanceSubjects");
    bindPills(".av-pill-group");
    refreshLockState();

    const state = getState();
    if (state.completed) {
      const field = FIELDS[state.field];
      if (!field) { localStorage.removeItem("cp_assessment"); showView("av-landing"); return; }
      document.getElementById("avResultField").textContent = state.field;
      document.getElementById("avResultRingPct").textContent = (state.matchPct || 100) + "%";
      document.getElementById("avResultRing").style.setProperty("--pct", state.matchPct || 100);
      document.getElementById("avResultReason").textContent = `Your active career path is ${state.field}.`;
      document.getElementById("avResultOutlook").textContent = field.outlook;
      document.getElementById("avResultAlts").innerHTML = "";
      showView("av-result");
    } else {
      showView("av-landing");
    }
  });

})();