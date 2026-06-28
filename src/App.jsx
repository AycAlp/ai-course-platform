import { useState } from "react";

const T = {
  navy:    "#003366",   // Bilkent navy
  navyMid: "#004080",
  navyLt:  "#0052A3",
  teal:    "#003366",
  tealDim: "#002244",
  red:     "#CC0000",   // Bilkent red
  redLt:   "#FFE5E5",
  amber:   "#E8A000",
  cream:   "#F5F7FA",
  creamDk: "#E8EDF3",
  ink:     "#1A1A2E",
  muted:   "#5A6A7E",
  white:   "#FFFFFF",
  danger:  "#CC0000",
  success: "#1A7A3C",
  blue:    "#003366",
  blueLt:  "#E8EDF3",
};

// ── FULL COURSE DATA ─────────────────────────────────────────────────────────
const INITIAL_MODULES = [
  {
    id:1, week:1, phase:"Phase 1 · Demystification",
    title:"The AI Moment",
    subtitle:"Why this moment is different from previous technology shifts",
    duration:"1h 45m",
    thumbnail:"🌐",
    color:"#1A3A5C",
    outcomes:[
      "Identify and challenge your own assumptions about what AI can and cannot do",
      "Distinguish between AI as a research field and AI as a commercial product",
      "Explain why this specific moment in AI development is significant",
    ],
    skills:["AI Literacy","Critical Thinking","Technology Awareness","Media Literacy"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Welcome and Course Overview",         dur:"12 min" },
      { type:"reading", label:"Reading",   title:"Why UT Austin Launched an AI Literacy Course", dur:"15 min", url:"https://cns.utexas.edu/news/announcements/new-essentials-ai-course-launches-fall" },
      { type:"reading", label:"Course ref",title:"CS304I: Essentials of AI — UT Austin", dur:"10 min", url:"https://amrl.cs.utexas.edu/CS304I-F2025/" },
      { type:"activity",label:"Activity",  title:"Assumption Audit: What do you think AI is?", dur:"20 min" },
      { type:"reflect", label:"Reflection",title:"Week 1 Reflection Submission",         dur:"30 min" },
    ],
    status:"done",
  },
  {
    id:2, week:2, phase:"Phase 1 · Demystification",
    title:"A Brief History of AI",
    subtitle:"From the 1956 Dartmouth workshop to large language models",
    duration:"1h 50m",
    thumbnail:"📜",
    color:"#1A3A5C",
    outcomes:[
      "Trace the major milestones in AI history from 1956 to the present",
      "Explain what AI winters were and why the field stalled repeatedly",
      "Describe the shift from rule-based AI to machine learning",
    ],
    skills:["AI History","Technology Studies","Research Literacy"],
    sections:[
      { type:"video",   label:"Lecture",   title:"The Dartmouth Conference and Early AI",  dur:"18 min" },
      { type:"reading", label:"Reading",   title:"Appendix I: A Short History of AI — Stanford AI100", dur:"25 min", url:"https://ai100.stanford.edu/2016-report/appendix-i-short-history-ai" },
      { type:"activity",label:"Activity",  title:"Timeline construction exercise",          dur:"20 min" },
      { type:"reflect", label:"Reflection",title:"Week 2 Reflection Submission",            dur:"30 min" },
    ],
    status:"done",
  },
  {
    id:3, week:3, phase:"Phase 1 · Demystification",
    title:"What AI Is Not",
    subtitle:"Separating fact from science fiction — the most important week",
    duration:"2h 00m",
    thumbnail:"🔍",
    color:"#1A3A5C",
    outcomes:[
      "Distinguish between narrow AI and general AI accurately",
      "Explain why pattern matching is not the same as understanding",
      "Identify three common misconceptions about AI in media coverage",
    ],
    skills:["Critical Thinking","AI Literacy","Epistemics","Media Literacy"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Narrow vs General AI: Why the Difference Matters", dur:"20 min" },
      { type:"video",   label:"Lecture",   title:"The UT Austin CS109 Lecture Series — Sessions 1–2",  dur:"40 min", url:"https://www.cs.utexas.edu/~pstone/Courses/109fall23/" },
      { type:"activity",label:"Activity",  title:"Misconception stress-test: find three AI claims online", dur:"25 min" },
      { type:"reflect", label:"Reflection",title:"Week 3 Reflection Submission",            dur:"30 min" },
    ],
    status:"done",
  },
  {
    id:4, week:4, phase:"Phase 2 · How AI Works",
    title:"How Machines Learn",
    subtitle:"Supervised, unsupervised, reinforcement — without the mathematics",
    duration:"2h 10m",
    thumbnail:"🧠",
    color:"#0D3B2E",
    outcomes:[
      "Explain supervised, unsupervised, and reinforcement learning in plain language",
      "Train a simple image classifier using Google Teachable Machine",
      "Describe what training data is and why its quality matters",
    ],
    skills:["Machine Learning","Data Literacy","AI Fundamentals","Computational Thinking"],
    sections:[
      { type:"video",   label:"Lecture",   title:"How Machines Learn from Examples",      dur:"22 min" },
      { type:"tool",    label:"Tool",      title:"Hands-on: Google Teachable Machine",    dur:"30 min", url:"https://teachablemachine.withgoogle.com/" },
      { type:"activity",label:"Activity",  title:"Train your classifier — document what it gets wrong", dur:"25 min" },
      { type:"reflect", label:"Reflection",title:"Week 4 Reflection Submission",          dur:"30 min" },
    ],
    status:"current",
  },
  {
    id:5, week:5, phase:"Phase 2 · How AI Works",
    title:"Language Models and Generative AI",
    subtitle:"Tokens, prediction, hallucination — why LLMs fail confidently",
    duration:"2h 15m",
    thumbnail:"💬",
    color:"#0D3B2E",
    outcomes:[
      "Explain what a token is and how next-word prediction works",
      "Describe why large language models hallucinate and produce false information",
      "Calibrate your trust in AI-generated text based on how these models work",
    ],
    skills:["Large Language Models","Generative AI","Prompt Engineering","AI Literacy"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Inside a Language Model",               dur:"25 min" },
      { type:"reading", label:"Reading",   title:"LLMs Explained with a Minimum of Math and Jargon", dur:"30 min", url:"https://www.understandingai.org/p/large-language-models-explained-with" },
      { type:"activity",label:"Activity",  title:"Stress-test an LLM: find three confident errors", dur:"20 min" },
      { type:"reflect", label:"Reflection",title:"Week 5 Reflection Submission",          dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:6, week:6, phase:"Phase 2 · How AI Works",
    title:"Images, Audio, and Multimodal AI",
    subtitle:"How image generation works. What deepfakes actually are technically.",
    duration:"1h 55m",
    thumbnail:"🎨",
    color:"#0D3B2E",
    outcomes:[
      "Explain at a conceptual level how diffusion models generate images",
      "Identify visual and contextual artefacts in AI-generated images",
      "Describe the technical basis of deepfake audio and video",
    ],
    skills:["Generative AI","Computer Vision","Media Literacy","Deepfake Awareness"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Image Generation: How Diffusion Models Work", dur:"20 min" },
      { type:"video",   label:"Lecture",   title:"Deepfakes: The Technical Reality",        dur:"15 min" },
      { type:"activity",label:"Activity",  title:"Generate and analyse: spot the artefacts", dur:"25 min" },
      { type:"reflect", label:"Reflection",title:"Week 6 Reflection Submission",            dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:7, week:7, phase:"Phase 2 · How AI Works",
    title:"Midterm Exam",
    subtitle:"Written assessment covering Weeks 1–6. Conceptual and applied analysis.",
    duration:"2h 00m",
    thumbnail:"📝",
    color:"#3B1A0D",
    outcomes:[
      "Demonstrate conceptual understanding of AI fundamentals from Weeks 1–6",
      "Apply critical thinking to short analysis questions about AI scenarios",
      "Reflect on what has surprised you and what you still do not understand",
    ],
    skills:["AI Literacy","Critical Analysis","Conceptual Reasoning"],
    sections:[
      { type:"exam",    label:"Exam",      title:"Midterm: Weeks 1–6 Written Assessment", dur:"90 min" },
      { type:"activity",label:"Discussion",title:"Course correction: what do you want to understand better?", dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:8, week:8, phase:"Phase 3 · AI in the World",
    title:"AI and Labor",
    subtitle:"What work is being automated, what is not, and why predictions keep failing",
    duration:"2h 05m",
    thumbnail:"⚙️",
    color:"#2B1A3B",
    outcomes:[
      "Evaluate competing claims about AI and job displacement with evidence",
      "Identify which categories of work are most and least exposed to automation",
      "Argue both sides of a contested empirical question about AI and employment",
    ],
    skills:["Future of Work","Economics","Policy Literacy","Critical Thinking"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Automation: What the Evidence Actually Shows", dur:"20 min" },
      { type:"reading", label:"Reading",   title:"Generative AI, the American Worker, and the Future of Work — Brookings", dur:"25 min", url:"https://www.brookings.edu/articles/generative-ai-the-american-worker-and-the-future-of-work/" },
      { type:"activity",label:"Activity",  title:"Structured debate: argue both sides in pairs", dur:"25 min" },
      { type:"reflect", label:"Reflection",title:"Week 8 Reflection Submission",           dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:9, week:9, phase:"Phase 3 · AI in the World",
    title:"Bias, Fairness, and Who AI Serves",
    subtitle:"Training data reflects the past. Amazon hiring, COMPAS, facial recognition.",
    duration:"2h 10m",
    thumbnail:"⚖️",
    color:"#2B1A3B",
    outcomes:[
      "Explain how training data produces biased outputs with concrete examples",
      "Identify the technical source of bias in a real documented case",
      "Describe the real-world consequences of a specific algorithmic failure",
    ],
    skills:["AI Ethics","Algorithmic Fairness","Data Bias","Responsible AI"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Where Bias Comes From",                  dur:"18 min" },
      { type:"reading", label:"Reading",   title:"AI and Fairness: Beyond Blind Spots? — Ethics Unwrapped", dur:"20 min", url:"https://ethicsunwrapped.utexas.edu/case-study/a-i-fairness-beyond-blind-spot-bias" },
      { type:"activity",label:"Activity",  title:"Case analysis: identify source, mechanism, consequence", dur:"25 min" },
      { type:"reflect", label:"Reflection",title:"Week 9 Reflection Submission",           dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:10, week:10, phase:"Phase 3 · AI in the World",
    title:"Misinformation, Deepfakes, and Epistemic Risk",
    subtitle:"How AI is changing what we can trust — and practical verification tools",
    duration:"2h 00m",
    thumbnail:"🔎",
    color:"#2B1A3B",
    outcomes:[
      "Describe how generative AI changes the landscape of misinformation",
      "Apply at least two open verification tools to assess AI-generated content",
      "Explain what prebunking is and why it works as a mitigation strategy",
    ],
    skills:["Misinformation","Digital Literacy","Fact-checking","Epistemics","Data Ethics"],
    sections:[
      { type:"video",   label:"Lecture",   title:"The Epistemic Challenge of Generative AI", dur:"18 min" },
      { type:"reading", label:"Reading",   title:"Deepfakes, Generative AI, and Election Misinformation — Cornell ULSR", dur:"20 min", url:"https://www.culsr.org/articles/deepfakes-generative-ai-and-election-misinformation" },
      { type:"activity",label:"Activity",  title:"Fact-check an AI-generated paragraph using open tools", dur:"25 min" },
      { type:"reflect", label:"Reflection",title:"Week 10 Reflection Submission",          dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:11, week:11, phase:"Phase 3 · AI in the World",
    title:"AI, Power, and Policy",
    subtitle:"Who owns the models. EU AI Act. US vs China vs EU governance approaches.",
    duration:"2h 10m",
    thumbnail:"🏛",
    color:"#2B1A3B",
    outcomes:[
      "Summarise the EU AI Act's risk-based classification framework",
      "Compare regulatory approaches to AI across the EU, US, and China",
      "Evaluate one argument for and one argument against AI regulation",
    ],
    skills:["Law, Regulation, and Compliance","AI Policy","Responsible AI","Social Studies"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Who Regulates AI and How",               dur:"20 min" },
      { type:"reading", label:"Reading",   title:"High-Level Summary of the EU AI Act — Future of Life Institute", dur:"25 min", url:"https://artificialintelligenceact.eu/high-level-summary/" },
      { type:"activity",label:"Seminar",   title:"Policy debate: for and against the EU approach", dur:"25 min" },
      { type:"reflect", label:"Reflection",title:"Week 11 Reflection Submission",          dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:12, week:12, phase:"Phase 4 · Students as Agents",
    title:"AI in Your Field",
    subtitle:"Faculty groups research how AI is changing their own discipline",
    duration:"2h 00m",
    thumbnail:"🔬",
    color:"#1A3B0D",
    outcomes:[
      "Identify two current applications of AI in your intended field of study",
      "Articulate one concern or open question about AI in that field",
      "Present findings to peers in a structured five-minute format",
    ],
    skills:["Interdisciplinary Thinking","Research Skills","Presentation","AI Applications"],
    sections:[
      { type:"activity",label:"Group work", title:"Faculty group research session",         dur:"40 min" },
      { type:"activity",label:"Presentations","title":"Five-minute group presentations",    dur:"50 min" },
      { type:"reflect", label:"Reflection",title:"Week 12 Reflection Submission",          dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:13, week:13, phase:"Phase 4 · Students as Agents",
    title:"Using AI Responsibly as a University Student",
    subtitle:"Academic integrity, prompting as skill, citation, personal AI policy",
    duration:"2h 05m",
    thumbnail:"✅",
    color:"#1A3B0D",
    outcomes:[
      "Define what constitutes appropriate and inappropriate AI use in academic work",
      "Write a personal AI use policy for your own studies",
      "Explain how to cite AI-generated content in academic writing",
    ],
    skills:["Academic Integrity","AI Literacy","Responsible AI","ChatGPT","Prompt Engineering"],
    sections:[
      { type:"video",   label:"Lecture",   title:"Academic Integrity in the Age of Generative AI", dur:"20 min" },
      { type:"reading", label:"Reading",   title:"AI and Academic Integrity: Student Perceptions — MDPI Open Access", dur:"20 min", url:"https://www.mdpi.com/3042-8130/1/1/2" },
      { type:"activity",label:"Activity",  title:"Draft your personal AI use policy — one page", dur:"30 min" },
      { type:"reflect", label:"Reflection",title:"Week 13 Reflection Submission",          dur:"30 min" },
    ],
    status:"locked",
  },
  {
    id:14, week:14, phase:"Phase 4 · Students as Agents",
    title:"Final Presentations and Course Synthesis",
    subtitle:"Present your final project. Return to Week 1. What has changed?",
    duration:"2h 00m",
    thumbnail:"🎓",
    color:"#1A3B0D",
    outcomes:[
      "Present your final project in one of three formats: experiment, policy brief, or case study",
      "Articulate what you thought AI was in Week 1 versus what you think now",
      "Identify what you still do not know and where to go next",
    ],
    skills:["Communication","Critical Thinking","AI Literacy","Synthesis"],
    sections:[
      { type:"activity",label:"Presentations","title":"Final project presentations",        dur:"60 min" },
      { type:"activity",label:"Synthesis",  title:"Return to Week 1: what has changed?",   dur:"30 min" },
      { type:"reflect", label:"Reflection", title:"Final course reflection",                dur:"30 min" },
    ],
    status:"locked",
  },
];

const SECTION_ICONS = {
  video:    { icon:"▶", bg:"#0056D2", label:"Video" },
  reading:  { icon:"📄", bg:"#00A389", label:"Reading" },
  activity: { icon:"✎", bg:"#F5A623", label:"Activity" },
  reflect:  { icon:"◉", bg:"#6B3FA0", label:"Reflection" },
  exam:     { icon:"📝", bg:"#E05252", label:"Exam" },
  tool:     { icon:"🛠", bg:"#1A8C5B", label:"Tool" },
};

const PHASE_COLORS = {
  "Phase 1 · Demystification":  { bg:"#E8EDF3", text:"#003366", dot:"#003366" },
  "Phase 2 · How AI Works":     { bg:"#FFE8E8", text:"#CC0000", dot:"#CC0000" },
  "Phase 3 · AI in the World":  { bg:"#E8EDF3", text:"#003366", dot:"#003366" },
  "Phase 4 · Students as Agents":{ bg:"#FFE8E8", text:"#CC0000", dot:"#CC0000" },
};

// Only the admin exists at startup. All other users are created through the admin panel.
const INITIAL_USERS = [
  { id:1, name:"Admin", email:"admin@bilkent.edu.tr", password:"admin123", role:"admin", cohort:"all", progress:null },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
  html, body, #root { height:100%; width:100%; margin:0; padding:0; }
  body { font-family:'Inter',sans-serif; background:#F5F7FA; color:#1A1A2E; min-height:100vh; overflow-x:hidden; }

  /* AUTH */
  .auth-wrap { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; }
  .auth-left { background:#003366; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:56px 48px; text-align:center; position:relative; overflow:hidden; }
  .auth-left::before { content:''; position:absolute; top:-100px; right:-100px; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle,#CC000022 0%,transparent 70%); pointer-events:none; }
  .auth-logo { font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:.18em; color:#FFFFFF; text-transform:uppercase; margin-bottom:16px; }
  .auth-h1 { font-size:40px; font-weight:700; line-height:1.15; color:#fff; margin-bottom:18px; max-width:380px; }
  .auth-sub { font-size:15px; color:#6B7E91; line-height:1.7; max-width:360px; margin-bottom:48px; }
  .auth-stats { display:flex; gap:40px; }
  .auth-stat-n { font-family:'IBM Plex Mono',monospace; font-size:30px; font-weight:500; color:#00C9A7; }
  .auth-stat-l { font-size:12px; color:#6B7E91; margin-top:3px; }
  .auth-right { display:flex; flex-direction:column; justify-content:center; align-items:center; padding:40px 48px; background:#FFFFFF; }
  .auth-form-title { font-size:26px; font-weight:700; margin-bottom:6px; color:#0D1B2A; }
  .auth-form-sub { font-size:14px; color:#6B7E91; margin-bottom:36px; }
  .role-tabs { display:flex; margin-bottom:28px; border:1.5px solid #EDE9E1; border-radius:8px; overflow:hidden; }
  .role-tab { flex:1; padding:10px; text-align:center; font-size:13px; font-weight:500; cursor:pointer; background:#fff; color:#6B7E91; border:none; transition:all .15s; font-family:'Inter',sans-serif; }
  .role-tab.active { background:#003366; color:#fff; }
  .form-group { margin-bottom:18px; }
  .form-label { display:block; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#6B7E91; margin-bottom:7px; }
  .form-input { width:100%; padding:12px 14px; border:1.5px solid #EDE9E1; border-radius:8px; font-size:14px; font-family:'Inter',sans-serif; background:#fff; color:#0D1B2A; outline:none; transition:border-color .15s; }
  .form-input:focus { border-color:#003366; }
  .btn-primary { width:100%; padding:14px; background:#003366; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif; }
  .btn-primary:hover { background:#CC0000; }

  /* SHELL — full viewport, no max-width anywhere */
  .shell { display:grid; grid-template-columns:220px 1fr; min-height:100vh; width:100%; }

  /* SIDEBAR */
  .sidebar { background:#003366; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto; flex-shrink:0; }
  .sidebar-logo { padding:22px 18px 16px; border-bottom:1px solid #004080; }
  .sidebar-logo-mark { font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.2em; color:#FFFFFF; opacity:.7; text-transform:uppercase; display:block; margin-bottom:3px; }
  .sidebar-logo-name { font-size:17px; font-weight:700; color:#fff; }
  .sidebar-section-label { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.5); padding:16px 18px 6px; }
  .sidebar-nav { flex:1; padding:4px 0; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:12px 18px; font-size:16px; font-weight:500; color:rgba(255,255,255,.65); cursor:pointer; transition:all .12s; border-left:3px solid transparent; user-select:none; }
  .nav-item:hover { color:#fff; background:#004080; }
  .nav-item.active { color:#fff; background:#CC0000; border-left-color:#FF4444; }
  .nav-icon { font-size:15px; width:18px; text-align:center; }
  .sidebar-user { padding:14px 18px; border-top:1px solid #004080; display:flex; align-items:center; gap:10px; }
  .user-avatar { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.15); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#FFFFFF; flex-shrink:0; }
  .user-name { font-size:15px; font-weight:700; color:#fff; }
  .user-role { font-size:12px; color:rgba(255,255,255,.55); font-family:'IBM Plex Mono',monospace; text-transform:uppercase; letter-spacing:.05em; }
  .logout-btn { margin-left:auto; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); color:rgba(255,255,255,.8); cursor:pointer; font-size:13px; font-weight:600; padding:6px 12px; border-radius:6px; transition:all .12s; font-family:'Inter',sans-serif; }
  .logout-btn:hover { background:#CC0000; color:#fff; border-color:#CC0000; }

  /* PAGE CHROME — full width, zero wasted space */
  .main { background:#F3F4F6; overflow-y:auto; width:100%; min-width:0; display:flex; flex-direction:column; }
  .page-header { padding:20px 32px 16px; border-bottom:1px solid #E5E7EB; background:#fff; flex-shrink:0; }
  .page-eyebrow { font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:.15em; text-transform:uppercase; color:#CC0000; margin-bottom:4px; }
  .page-title { font-size:26px; font-weight:700; color:#0D1B2A; margin-bottom:3px; }
  .page-desc { font-size:15px; color:#6B7E91; }
  .page-body { padding:20px 32px; flex:1; }

  /* STATS */
  .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; width:100%; }
  .stat-card { background:#fff; border:1px solid #E5E7EB; border-radius:10px; padding:18px 20px; }
  .stat-num { font-family:'IBM Plex Mono',monospace; font-size:36px; font-weight:500; color:#0D1B2A; line-height:1; margin-bottom:5px; }
  .stat-num.teal { color:#003366; }
  .stat-num.amber { color:#F5A623; }
  .stat-label { font-size:14px; color:#6B7E91; font-weight:500; }

  /* ── COURSERA-STYLE MODULE CARD ────────────────────────────────────────── */
  .module-grid { display:flex; flex-direction:column; gap:12px; }

  .module-card {
    background:#fff;
    border:1px solid #E5E7EB;
    border-radius:12px;
    overflow:hidden;
    transition:box-shadow .15s, border-color .15s;
    cursor:pointer;
  }
  .module-card:hover { box-shadow:0 4px 18px rgba(0,0,0,.10); border-color:#D1D5DB; }
  .module-card.locked { opacity:.6; cursor:default; }
  .module-card.locked:hover { box-shadow:none; border-color:#E5E7EB; }

  .module-card-inner { display:grid; grid-template-columns:140px 1fr; min-height:120px; }

  /* thumbnail */
  .module-thumb {
    display:flex; align-items:center; justify-content:center;
    font-size:36px;
    background:var(--thumb-bg,#1A3A5C);
    position:relative;
    min-height:130px;
  }
  .module-thumb-week {
    position:absolute; top:8px; left:8px;
    font-family:'IBM Plex Mono',monospace;
    font-size:10px; font-weight:500;
    color:rgba(255,255,255,.7);
    letter-spacing:.08em;
    text-transform:uppercase;
  }
  .module-thumb-status {
    position:absolute; bottom:8px; right:8px;
    width:22px; height:22px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    font-size:11px;
  }
  .thumb-done { background:#003366; color:#fff; font-weight:700; }
  .thumb-active { background:#F5A623; color:#0D1B2A; font-size:9px; font-weight:700; }

  /* card body */
  .module-card-body { padding:16px 20px; display:flex; flex-direction:column; }
  .module-card-phase-row { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
  .phase-pill {
    display:inline-flex; align-items:center; gap:5px;
    padding:2px 10px; border-radius:20px;
    font-size:13px; font-weight:600;
    background:var(--phase-bg); color:var(--phase-text);
  }
  .phase-dot { width:6px; height:6px; border-radius:50%; background:var(--phase-dot); }
  .module-card-title { font-size:18px; font-weight:700; color:#0D1B2A; margin-bottom:3px; line-height:1.3; }
  .module-card-subtitle { font-size:15px; color:#6B7E91; line-height:1.5; margin-bottom:10px; flex:1; }
  .module-card-meta { display:flex; align-items:center; gap:16px; }
  .meta-dur { font-size:14px; color:#6B7E91; display:flex; align-items:center; gap:5px; }
  .meta-sections { font-size:14px; color:#6B7E91; }
  .card-open-btn {
    margin-left:auto;
    padding:6px 16px;
    background:#0056D2;
    color:#fff;
    border:none;
    border-radius:6px;
    font-size:14px;
    font-weight:600;
    cursor:pointer;
    font-family:'Inter',sans-serif;
    white-space:nowrap;
    transition:background .15s;
  }
  .card-open-btn:hover { background:#004AB5; }
  .card-open-btn.locked-btn { background:#E5E7EB; color:#9CA3AF; cursor:default; }

  /* ── COURSERA-STYLE MODULE DETAIL ───────────────────────────────────────── */
  .detail-wrap { background:#F3F4F6; }
  .detail-hero {
    background:var(--hero-bg,#0D1B2A);
    padding:24px 32px;
    color:#fff;
  }
  .detail-back { display:inline-flex; align-items:center; gap:6px; font-size:15px; color:rgba(255,255,255,.6); cursor:pointer; border:none; background:none; font-family:'Inter',sans-serif; margin-bottom:20px; transition:color .12s; }
  .detail-back:hover { color:#fff; }
  .detail-week-badge { font-family:'IBM Plex Mono',monospace; font-size:13px; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.75); margin-bottom:8px; }
  .detail-title { font-size:32px; font-weight:700; margin-bottom:6px; line-height:1.2; }
  .detail-subtitle { font-size:17px; color:rgba(255,255,255,.7); margin-bottom:16px; max-width:620px; }
  .detail-meta-row { display:flex; align-items:center; gap:20px; }
  .detail-meta-item { font-size:15px; color:rgba(255,255,255,.6); display:flex; align-items:center; gap:5px; }

  .detail-body { display:grid; grid-template-columns:1fr 340px; gap:24px; padding:20px 32px; align-items:start; text-align:left; }

  /* outcomes + sections */
  .outcomes-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; padding:24px; margin-bottom:20px; text-align:left; }
  .outcomes-title { font-size:17px; font-weight:700; color:#0D1B2A; margin-bottom:14px; text-align:left; }
  .outcome-row { display:flex; align-items:flex-start; gap:10px; margin-bottom:10px; }
  .outcome-check { color:#003366; font-size:17px; flex-shrink:0; margin-top:1px; }
  .outcome-text { font-size:16px; color:#374151; line-height:1.55; }

  .skills-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; padding:24px; margin-bottom:20px; }
  .skills-title { font-size:17px; font-weight:700; color:#0D1B2A; margin-bottom:12px; }
  .skills-wrap { display:flex; flex-wrap:wrap; gap:8px; }
  .skill-tag {
    padding:5px 12px;
    border:1.5px solid #E5E7EB;
    border-radius:20px;
    font-size:14px;
    font-weight:500;
    color:#374151;
    background:#F9FAFB;
    cursor:default;
    transition:all .12s;
  }
  .skill-tag:hover { border-color:#0056D2; color:#0056D2; background:#EEF3FB; }

  .sections-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; margin-bottom:20px; }
  .sections-header { padding:18px 22px; border-bottom:1px solid #E5E7EB; font-size:17px; font-weight:700; color:#0D1B2A; }
  .section-row { display:flex; align-items:center; gap:14px; padding:14px 20px; border-bottom:1px solid #F3F4F6; cursor:pointer; transition:background .1s; }
  .section-row:last-child { border-bottom:none; }
  .section-row:hover { background:#F9FAFB; }
  .section-icon-wrap { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; }
  .section-label-pill { font-size:12px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#6B7E91; min-width:60px; }
  .section-title { font-size:16px; font-weight:500; color:#0D1B2A; flex:1; }
  .section-dur { font-size:14px; color:#9CA3AF; white-space:nowrap; }
  .section-link { font-size:14px; color:#0056D2; font-weight:600; white-space:nowrap; text-decoration:none; }

  /* SIDEBAR CARD (Coursera style right panel) */
  .sticky-card { position:sticky; top:20px; }
  .enroll-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; }
  .enroll-thumb { height:140px; display:flex; align-items:center; justify-content:center; font-size:56px; }
  .enroll-body { padding:20px; }
  .enroll-progress-label { font-size:14px; color:#6B7E91; margin-bottom:8px; font-weight:500; }
  .enroll-bar-wrap { height:8px; background:#E5E7EB; border-radius:4px; overflow:hidden; margin-bottom:16px; }
  .enroll-bar-fill { height:100%; background:#00C9A7; border-radius:4px; }
  .enroll-status-row { display:flex; justify-content:space-between; font-size:15px; margin-bottom:16px; }
  .enroll-mark-btn { width:100%; padding:13px; background:#003366; color:#fff; border:none; border-radius:8px; font-size:16px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; margin-bottom:10px; transition:background .15s; }
  .enroll-mark-btn:hover { background:#CC0000; }
  .enroll-mark-btn.done-btn { background:#E8EDF3; color:#003366; }

  /* REFLECTION */
  .reflection-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; padding:24px; margin-bottom:20px; }
  .reflection-title { font-size:17px; font-weight:700; color:#0D1B2A; margin-bottom:6px; }
  .reflection-prompt { font-size:15px; color:#6B7E91; line-height:1.6; margin-bottom:14px; }
  .reflection-area { width:100%; min-height:120px; padding:14px 16px; border:1.5px solid #E5E7EB; border-radius:8px; font-size:16px; font-family:'Inter',sans-serif; color:#0D1B2A; resize:vertical; outline:none; background:#F9FAFB; line-height:1.6; transition:border-color .15s; }
  .reflection-area:focus { border-color:#003366; background:#fff; }
  .reflection-footer { display:flex; justify-content:space-between; align-items:center; margin-top:10px; }
  .word-count { font-size:14px; color:#9CA3AF; }
  .submit-btn { padding:11px 22px; background:#003366; color:#fff; border:none; border-radius:7px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; transition:background .15s; }
  .submit-btn:hover { background:#CC0000; }
  .submit-ok { background:#E8EDF3; border:1px solid #003366; border-radius:8px; padding:12px 16px; font-size:15px; color:#003366; font-weight:600; margin-top:10px; display:flex; align-items:center; gap:7px; }

  /* INSTRUCTOR EDITOR */
  .editor-grid { display:grid; grid-template-columns:280px 1fr; gap:24px; width:100%; }
  .picker-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; }
  .picker-head { padding:16px 18px; border-bottom:1px solid #E5E7EB; font-size:15px; font-weight:700; color:#0D1B2A; }
  .picker-list { padding:6px; }
  .picker-item { display:flex; align-items:center; gap:10px; padding:9px 10px; border-radius:8px; cursor:pointer; transition:all .12s; }
  .picker-item:hover { background:#F3F4F6; }
  .picker-item.active { background:#0D1B2A; }
  .picker-week { font-family:'IBM Plex Mono',monospace; font-size:12px; color:#6B7E91; min-width:28px; }
  .picker-item.active .picker-week { color:#00C9A7; }
  .picker-name { font-size:14px; font-weight:500; color:#0D1B2A; }
  .picker-item.active .picker-name { color:#fff; }
  .editor-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; }
  .editor-head { padding:16px 20px; border-bottom:1px solid #E5E7EB; display:flex; justify-content:space-between; align-items:center; }
  .editor-head-title { font-size:17px; font-weight:700; color:#0D1B2A; }
  .editor-body { padding:20px; }
  .editor-label { display:block; font-size:13px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:#6B7E91; margin-bottom:7px; }
  .editor-input { width:100%; padding:12px 14px; border:1.5px solid #E5E7EB; border-radius:8px; font-size:16px; font-family:'Inter',sans-serif; color:#0D1B2A; background:#fff; outline:none; transition:border-color .15s; margin-bottom:16px; }
  .editor-input:focus { border-color:#003366; }
  .editor-textarea { width:100%; min-height:100px; padding:12px 14px; border:1.5px solid #E5E7EB; border-radius:8px; font-size:16px; font-family:'Inter',sans-serif; color:#0D1B2A; background:#fff; outline:none; resize:vertical; line-height:1.6; transition:border-color .15s; margin-bottom:16px; }
  .editor-textarea:focus { border-color:#003366; }
  .url-add-row { display:flex; gap:8px; margin-bottom:8px; }
  .url-input { flex:1; padding:11px 13px; border:1.5px solid #E5E7EB; border-radius:8px; font-size:15px; font-family:'Inter',sans-serif; color:#0D1B2A; outline:none; }
  .url-input:focus { border-color:#003366; }
  .add-btn { padding:11px 16px; background:#F3F4F6; border:1.5px solid #E5E7EB; border-radius:8px; font-size:14px; font-weight:700; color:#0D1B2A; cursor:pointer; font-family:'Inter',sans-serif; white-space:nowrap; }
  .save-btn { padding:11px 22px; background:#CC0000; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; }
  .save-ok { background:#E8F8F4; border:1px solid #A7F3D0; border-radius:8px; padding:12px 16px; font-size:15px; color:#00735A; font-weight:600; margin-top:12px; }

  /* ADMIN TABLE */
  .card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; }
  .card-head { padding:16px 20px; border-bottom:1px solid #E5E7EB; display:flex; justify-content:space-between; align-items:center; }
  .card-head-title { font-size:17px; font-weight:700; color:#0D1B2A; }
  .btn-ghost { padding:9px 18px; background:transparent; color:#6B7E91; border:1.5px solid #E5E7EB; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif; transition:all .12s; }
  .btn-ghost:hover { border-color:#0D1B2A; color:#0D1B2A; }
  .btn-teal { padding:9px 18px; background:#CC0000; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; }
  .btn-danger { padding:7px 14px; background:#FEE2E2; color:#DC2626; border:none; border-radius:6px; font-size:13px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; }
  .user-table { width:100%; border-collapse:collapse; }
  .user-table th { text-align:left; padding:11px 18px; font-size:13px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:#6B7E91; border-bottom:1px solid #E5E7EB; background:#F9FAFB; }
  .user-table td { padding:15px 18px; font-size:15px; color:#0D1B2A; border-bottom:1px solid #F3F4F6; vertical-align:middle; }
  .user-table tr:last-child td { border-bottom:none; }
  .role-badge { display:inline-block; padding:4px 11px; border-radius:20px; font-size:13px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; }
  .badge-learner { background:#E8EDF3; color:#003366; }
  .badge-instructor { background:#E8F8F4; color:#00735A; }
  .badge-admin { background:#FFF5E8; color:#A0600D; }
  .bar-wrap { width:100px; height:6px; background:#E5E7EB; border-radius:3px; overflow:hidden; display:inline-block; }
  .bar-fill { height:100%; background:#003366; border-radius:3px; }
  .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; width:100%; }
  .add-user-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px; padding:20px; margin-bottom:20px; }
  .add-user-row { display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end; }
  .add-field { flex:1 1 160px; }
  select.editor-input { width:auto; }
  /* ── MOBILE RESPONSIVE ───────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .shell { grid-template-columns:1fr; }
    .sidebar { display:none; }
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .grid-2 { grid-template-columns:1fr; }
    .module-card-inner { grid-template-columns:80px 1fr; }
    .detail-body { grid-template-columns:1fr; }
    .sticky-card { position:static; }
    .editor-grid { grid-template-columns:1fr; }
    .page-header { padding:16px 20px 14px; }
    .page-body { padding:16px 20px; }
    .auth-wrap { grid-template-columns:1fr; }
    .auth-left { display:none; }
    .detail-hero { padding:20px; }
    .user-table th:nth-child(2),
    .user-table td:nth-child(2) { display:none; }
  }
  @media (max-width: 480px) {
    .stats-grid { grid-template-columns:1fr 1fr; gap:8px; }
    .module-thumb { min-height:80px; }
    .module-card-title { font-size:14px; }
    .page-title { font-size:18px; }
  }

`;

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function AuthScreen({ onLogin, users }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");

  const login = () => {
    const found = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
        && u.password === password
    );
    if (found) {
      setError("");
      onLogin(found);
    } else {
      setError("Email or password is incorrect.");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-left" style={{alignItems:"center",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:36}}>
          <img
            src="/bilkent-logo.png"
            alt="Bilkent University"
            style={{height:80,width:"auto",objectFit:"contain",flexShrink:0}}
            onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
          />
          <div style={{display:"none",width:64,height:64,borderRadius:"50%",border:"3px solid #CC0000",background:"#fff",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#003366",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:24,fontWeight:900,color:"#fff",fontFamily:"Georgia,serif"}}>B</span>
            </div>
          </div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:24,fontWeight:800,color:"#fff",letterSpacing:".01em",lineHeight:1.2}}>Bilkent University</div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"}}>
          <h1 style={{fontSize:56,fontWeight:900,color:"#fff",lineHeight:1.05,marginBottom:24,letterSpacing:"-.02em",textAlign:"center"}}>
            AI Literacy<br/><span style={{color:"#faf5f5ea"}}>101</span>
          </h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,.75)",lineHeight:1.7,maxWidth:340,textAlign:"center"}}>
            A 14-week credit-bearing course on artificial intelligence for students across all faculties. No technical background required.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div style={{maxWidth:420,width:"100%",margin:"0 auto"}}>
          <div style={{marginBottom:32}}>
            <h2 style={{fontSize:30,fontWeight:800,color:"#003366",marginBottom:8}}>Sign in</h2>
            <p style={{fontSize:16,color:"#5A6A7E"}}>Use the credentials created by your administrator</p>
          </div>

          <div style={{marginBottom:18}}>
            <label style={{display:"block",fontSize:13,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#5A6A7E",marginBottom:8}}>Email address</label>
            <input className="form-input" style={{fontSize:16,padding:"14px 16px",borderRadius:10}} type="email" value={email}
              onChange={e=>{setEmail(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&login()} />
          </div>
          <div style={{marginBottom:28}}>
            <label style={{display:"block",fontSize:13,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#5A6A7E",marginBottom:8}}>Password</label>
            <input className="form-input" style={{fontSize:16,padding:"14px 16px",borderRadius:10}} type="password" value={password}
              onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&login()} />
          </div>

          {error && (
            <div style={{background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 16px",fontSize:14,color:"#DC2626",fontWeight:600,marginBottom:18}}>
              {error}
            </div>
          )}

          <button className="btn-primary" style={{fontSize:17,padding:"15px",borderRadius:10,letterSpacing:".01em"}} onClick={login}>
            Sign in to AI Literacy 101
          </button>
          <p style={{fontSize:13,color:"#9CA3AF",marginTop:16,textAlign:"center"}}>
            First time? Log in as admin (admin@bilkent.edu.tr / admin123) and create accounts from User Management.
          </p>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ user, view, setView, onLogout }) {
  const navs = {
    learner:    [["dashboard","◈","Dashboard"],["modules","⊞","Course Modules"],["progress","◉","My Progress"]],
    instructor: [["dashboard","◈","Dashboard"],["editor","✎","Module Editor"],["students","◎","Student Progress"],["submissions","⊟","Submissions"]],
    admin:      [["dashboard","◈","Platform Overview"],["users","◎","User Management"],["analytics","◉","Analytics"]],
  };
  const items = navs[user.role] || navs.learner;
  const initials = user.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{display:"flex",alignItems:"center",gap:12,padding:"18px 16px 16px"}}>
        <img
          src="/bilkent-logo.png"
          alt="Bilkent University"
          style={{
            height:52,
            width:"auto",
            objectFit:"contain",
            flexShrink:0,
            borderRadius:4,
          }}
          onError={e=>{
            e.target.style.display="none";
            e.target.nextSibling.style.display="flex";
          }}
        />
        {/* Fallback — only shows if image fails */}
        <div style={{display:"none",width:48,height:48,borderRadius:6,background:"#CC0000",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:22,fontWeight:900,color:"#fff",fontFamily:"Georgia,serif"}}>B</span>
        </div>
        <div style={{minWidth:0}}>
          <span className="sidebar-logo-mark" style={{fontSize:11,letterSpacing:".14em",color:"rgba(255,255,255,.6)"}}>Bilkent University</span>
          <span className="sidebar-logo-name" style={{fontSize:16,fontWeight:700,color:"#fff",display:"block",lineHeight:1.2,marginTop:2}}>AI Literacy 101</span>
        </div>
      </div>
      <div className="sidebar-section-label">{user.role==="admin"?"Administration":user.role==="instructor"?"Teaching":"Learning"}</div>
      <nav className="sidebar-nav">
        {items.map(([id,icon,label])=>(
          <div key={id} className={`nav-item ${view===id?"active":""}`} onClick={()=>setView(id)}>
            <span className="nav-icon">{icon}</span>{label}
          </div>
        ))}
      </nav>
      <div className="sidebar-user" style={{flexDirection:"column",alignItems:"stretch",gap:10,padding:"16px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div className="user-avatar">{initials}</div>
          <div style={{flex:1,minWidth:0}}>
            <div className="user-name" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout} style={{width:"100%",textAlign:"center"}}>
          Sign out
        </button>
      </div>
    </div>
  );
}

// ── COURSERA-STYLE MODULE CARD ────────────────────────────────────────────────
function ModuleCard({ mod, onClick }) {
  const ph = PHASE_COLORS[mod.phase] || PHASE_COLORS["Phase 1 · Demystification"];
  const isLocked = mod.status === "locked";
  const isDone   = mod.status === "done";
  const isActive = mod.status === "current";

  return (
    <div className={`module-card ${isLocked?"locked":""}`} onClick={!isLocked ? onClick : undefined}>
      <div className="module-card-inner">
        <div className="module-thumb" style={{"--thumb-bg": mod.color}}>
          <span className="module-thumb-week">W{mod.week}</span>
          <span style={{fontSize:38}}>{mod.thumbnail}</span>
          {isDone  && <span className="module-thumb-status thumb-done">✓</span>}
          {isActive && <span className="module-thumb-status thumb-active">NOW</span>}
        </div>
        <div className="module-card-body">
          <div className="module-card-phase-row">
            <span className="phase-pill" style={{"--phase-bg":ph.bg,"--phase-text":ph.text,"--phase-dot":ph.dot}}>
              <span className="phase-dot"/>
              Module {mod.week}
            </span>
          </div>
          <div className="module-card-title">{mod.title}</div>
          <div className="module-card-subtitle">{mod.subtitle}</div>
          <div className="module-card-meta">
            <span className="meta-dur">🕐 {mod.duration}</span>
            <span className="meta-sections">{mod.sections.length} items</span>
            <button className={`card-open-btn ${isLocked?"locked-btn":""}`}>
              {isDone ? "Review" : isActive ? "Continue →" : isLocked ? "Locked" : "Start →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LEARNER DASHBOARD ─────────────────────────────────────────────────────────
function LearnerDashboard({ modules, user, setView, setMod }) {
  const done    = modules.filter(m=>m.status==="done").length;
  const current = modules.find(m=>m.status==="current");
  const pct     = Math.round((done/14)*100);
  return (
    <div className="main">
      <div className="page-header">
        <div className="page-eyebrow">Learner Dashboard</div>
        <div className="page-title">Welcome back, {user.name.split(" ")[0]}</div>
        <div className="page-desc">Week 4 of 14 · 2026 Fall cohort</div>
      </div>
      <div className="page-body">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num teal">{done}</div><div className="stat-label">Modules completed</div></div>
          <div className="stat-card"><div className="stat-num">{14-done}</div><div className="stat-label">Remaining</div></div>
          <div className="stat-card"><div className="stat-num amber">{pct}%</div><div className="stat-label">Course progress</div></div>
          <div className="stat-card"><div className="stat-num">3</div><div className="stat-label">Reflections submitted</div></div>
        </div>

        {current && (
          <div className="card" style={{marginBottom:20}}>
            <div className="card-head">
              <span className="card-head-title">Continue where you left off</span>
              <span style={{fontSize:12,color:"#F5A623",fontWeight:700}}>● Active</span>
            </div>
            <div style={{padding:"16px 20px"}}>
              <ModuleCard mod={current} onClick={()=>{setMod(current);setView("moduleDetail");}} />
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-head">
            <span className="card-head-title">All modules</span>
            <button className="btn-ghost" onClick={()=>setView("modules")}>View full course →</button>
          </div>
          <div style={{padding:"14px 20px"}}>
            <div className="module-grid">
              {modules.slice(0,4).map(m=>(
                <ModuleCard key={m.id} mod={m} onClick={()=>{setMod(m);setView("moduleDetail");}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FULL MODULE LIST ──────────────────────────────────────────────────────────
function ModuleList({ modules, setView, setMod }) {
  const phases = [...new Set(modules.map(m=>m.phase))];
  return (
    <div className="main">
      <div className="page-header">
        <div className="page-eyebrow">Course Content</div>
        <div className="page-title">AI Literarcy 101</div>
        <div className="page-desc">X modules</div>
      </div>
      <div className="page-body">
        {phases.map(ph=>{
          const ph_c = PHASE_COLORS[ph];
          const mods = modules.filter(m=>m.phase===ph);
          return (
            <div key={ph} style={{marginBottom:32}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <span className="phase-pill" style={{"--phase-bg":ph_c.bg,"--phase-text":ph_c.text,"--phase-dot":ph_c.dot,fontSize:13,padding:"4px 14px"}}>
                  <span className="phase-dot"/>{ph.replace("Phase 1 · ","").replace("Phase 2 · ","").replace("Phase 3 · ","").replace("Phase 4 · ","")}
                </span>
                <span style={{fontSize:12,color:"#6B7E91"}}>{mods.length} modules</span>
              </div>
              <div className="module-grid">
                {mods.map(m=>(
                  <ModuleCard key={m.id} mod={m} onClick={()=>{setMod(m);setView("moduleDetail");}} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MODULE DETAIL (Coursera layout) ──────────────────────────────────────────
function ModuleDetail({ mod, setView, user, addSubmission }) {
  const [taskAnswers, setTaskAnswers]   = useState({});
  const [taskSubmitted, setTaskSubmitted] = useState({});
  const [text, setText] = useState(mod.status==="done" ? "I used to think AI was just a smarter autocomplete. After this module, I understand the difference between pattern recognition and genuine comprehension." : "");
  const [saved, setSaved] = useState(mod.status==="done");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const ph = PHASE_COLORS[mod.phase] || PHASE_COLORS["Phase 1 · Demystification"];

  return (
    <div className="detail-wrap main">
      <div className="detail-hero" style={{"--hero-bg": mod.color}}>
        <button className="detail-back" onClick={()=>setView("modules")}>← Back to modules</button>
        <div className="detail-week-badge">Module {mod.week} of 14 · Week {mod.week}</div>
        <div className="detail-title">{mod.title}</div>
        <div className="detail-subtitle">{mod.subtitle}</div>
        <div className="detail-meta-row">
          <span className="detail-meta-item">🕐 {mod.duration}</span>
          <span className="detail-meta-item">📄 {mod.sections.length} items</span>
          <span className="detail-meta-item">✎ Reflection required</span>
        </div>
      </div>

      <div className="detail-body">
        <div>
          {/* Module body — instructor-written intro text */}
          {mod.moduleBody && mod.moduleBody.trim() && (
            <div className="outcomes-card" style={{marginBottom:20}}>
              <div className="outcomes-title" style={{marginBottom:12}}>About this module</div>
              <div style={{fontSize:15,color:"#374151",lineHeight:1.75,whiteSpace:"pre-wrap",textAlign:"left"}}>
                {mod.moduleBody}
              </div>
            </div>
          )}

          {/* What you'll learn */}
          <div className="outcomes-card">
            <div className="outcomes-title">What you'll learn</div>
            {mod.outcomes.map((o,i)=>(
              <div className="outcome-row" key={i}>
                <span className="outcome-check">✓</span>
                <span className="outcome-text">{o}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="skills-card">
            <div className="skills-title">Skills you'll gain</div>
            <div className="skills-wrap">
              {mod.skills.map(s=><span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>

          {/* Sections */}
          <div className="sections-card">
            <div className="sections-header">Module content</div>
            {(mod.materials&&mod.materials.length>0 ? mod.materials : mod.sections.map(s=>({...s,title:s.title,url:s.url,dur:s.dur,task:null}))).map((mat,i)=>{
              const cfg = SECTION_ICONS[mat.type||"reading"] || SECTION_ICONS.activity;
              const taskKey = mod.id + "_" + i;
              const isSubmitted = taskSubmitted[taskKey];
              return (
                <div key={i}>
                  {/* Material row */}
                  <div className="section-row"
                    style={{cursor: mat.url ? "pointer" : "default"}}
                    onClick={()=>{ if(mat.url) window.open(mat.url,"_blank","noreferrer"); }}>
                    <div className="section-icon-wrap" style={{background:(cfg.bg||"#003366")+"22"}}>
                      <span style={{fontSize:16}}>{cfg.icon||"📄"}</span>
                    </div>
                    <span className="section-label-pill">{mat.label||mat.itemType||"Material"}</span>
                    <span className="section-title" style={{flex:1}}>{mat.title||"Untitled"}</span>
                    <span className="section-dur">{mat.dur||""}</span>
                    {mat.url && (
                      <a href={mat.url} target="_blank" rel="noreferrer"
                        onClick={e=>e.stopPropagation()}
                        style={{
                          display:"inline-flex", alignItems:"center", gap:5,
                          padding:"7px 16px", background:"#003366", color:"#fff",
                          borderRadius:7, fontSize:14, fontWeight:700,
                          textDecoration:"none", whiteSpace:"nowrap", flexShrink:0,
                        }}>
                        Open →
                      </a>
                    )}
                  </div>

                  {/* Task block — shown immediately after material if task is attached */}
                  {mat.task && mat.task.title && (
                    <div style={{
                      margin:"0 0 8px 20px",
                      border:"1.5px solid",
                      borderColor: isSubmitted?"#A7F3D0":"#FCD34D",
                      borderRadius:"0 0 10px 10px",
                      background: isSubmitted?"#F0FDF4":"#FFFBEB",
                      padding:"16px 20px",
                      borderTop:"none",
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                        <span style={{fontSize:13,fontWeight:700,padding:"3px 10px",borderRadius:20,background:isSubmitted?"#E8F8F4":"#FFF5E8",color:isSubmitted?"#00735A":"#92400E"}}>
                          📋 {mat.task.type}
                        </span>
                        {mat.task.graded && <span style={{fontSize:11,color:"#6B7E91",fontWeight:600}}>Graded · Max {mat.task.maxScore||100} pts</span>}
                        {isSubmitted && <span style={{fontSize:12,fontWeight:700,color:"#00735A"}}>✓ Submitted</span>}
                      </div>
                      <div style={{fontSize:15,fontWeight:700,color:"#0D1B2A",marginBottom:6}}>{mat.task.title}</div>
                      {mat.task.instructions && <div style={{fontSize:14,color:"#374151",lineHeight:1.6,marginBottom:12}}>{mat.task.instructions}</div>}

                      {/* Rubric display — matches instructor view with performance levels */}
                      {mat.task.rubric && mat.task.rubric.length>0 && (
                        <div style={{background:"#fff",borderRadius:10,padding:"16px 18px",marginBottom:14,border:"1px solid #E5E7EB"}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                            <div style={{fontSize:14,fontWeight:700,color:"#0D1B2A"}}>Rubric</div>
                            <div style={{fontSize:13,color:"#6B7E91"}}>Total: {mat.task.rubric.reduce((s,r)=>s+Number(r.weight),0)} / {mat.task.maxScore||100} pts</div>
                          </div>
                          {mat.task.rubric.map((rc,ri)=>{
                            const defLv=[
                              {name:"Excellent",    pts:"90–100",bg:"#E8EDF3",color:"#003366",desc:""},
                              {name:"Good",         pts:"70–89", bg:"#FFE8E8",color:"#CC0000",desc:""},
                              {name:"Satisfactory", pts:"50–69", bg:"#FFF8E8",color:"#A06000",desc:""},
                              {name:"Needs work",   pts:"0–49",  bg:"#FEE2E2",color:"#DC2626",desc:""},
                            ];
                            return (
                              <div key={ri} style={{border:"1.5px solid #E5E7EB",borderRadius:10,padding:"14px 14px",marginBottom:10,background:"#FAFAFA"}}>
                                {/* Criterion header */}
                                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                                  <div>
                                    <div style={{fontSize:15,fontWeight:700,color:"#0D1B2A"}}>{rc.label}</div>
                                    {rc.desc && <div style={{fontSize:13,color:"#6B7E91",marginTop:2}}>{rc.desc}</div>}
                                  </div>
                                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:15,fontWeight:700,color:"#003366"}}>{rc.weight} pts</span>
                                </div>
                                {/* Performance levels — read-only for students */}
                                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                                  {(rc.levels||defLv).map((lv,li)=>(
                                    <div key={li} style={{background:lv.bg,borderRadius:9,padding:"11px 12px"}}>
                                      <div style={{fontSize:14,fontWeight:700,color:lv.color,marginBottom:4}}>{lv.name}</div>
                                      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:"#5A6A7E",marginBottom:6}}>{lv.pts} pts</div>
                                      {lv.desc && <div style={{fontSize:12,color:"#374151",lineHeight:1.45}}>{lv.desc}</div>}
                                      {!lv.desc && <div style={{fontSize:12,color:"#9CA3AF",fontStyle:"italic",lineHeight:1.45}}>—</div>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {!isSubmitted ? (
                        <>
                          <textarea
                            value={taskAnswers[taskKey]||""}
                            onChange={e=>setTaskAnswers({...taskAnswers,[taskKey]:e.target.value})}
                            placeholder="Write your answer here..."
                            style={{
                              width:"100%",minHeight:100,padding:"12px 14px",
                              border:"1.5px solid #E5E7EB",borderRadius:8,
                              fontSize:14,fontFamily:"'Inter',sans-serif",
                              color:"#0D1B2A",resize:"vertical",outline:"none",
                              lineHeight:1.6,background:"#fff",marginBottom:10,
                            }}
                            onFocus={e=>e.target.style.borderColor="#003366"}
                            onBlur={e=>e.target.style.borderColor="#E5E7EB"}
                          />
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <span style={{fontSize:13,color:"#9CA3AF"}}>{(taskAnswers[taskKey]||"").split(/\s+/).filter(Boolean).length} words</span>
                            <button onClick={()=>{
                              const ans = taskAnswers[taskKey]||"";
                              if(!ans.trim()) return;
                              addSubmission({
                                id: Date.now(),
                                studentId: user?.id,
                                studentName: user?.name||"Student",
                                studentInitials: (user?.name||"S").split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase(),
                                moduleId: mod.id,
                                moduleName: mod.title,
                                moduleWeek: mod.week,
                                matIndex: i,
                                matTitle: mat.title,
                                taskType: mat.task.type,
                                taskTitle: mat.task.title,
                                graded: mat.task.graded,
                                maxScore: mat.task.maxScore||100,
                                rubric: mat.task.rubric||[],
                                answer: ans,
                                wordCount: ans.split(/\s+/).filter(Boolean).length,
                                submittedAt: new Date().toISOString(),
                                status:"pending",
                                grade:null,
                                feedback:"",
                              });
                              setTaskSubmitted({...taskSubmitted,[taskKey]:true});
                            }} style={{
                              padding:"9px 22px",background:"#CC0000",color:"#fff",
                              border:"none",borderRadius:8,fontSize:14,fontWeight:700,
                              cursor:"pointer",fontFamily:"'Inter',sans-serif",
                            }}>Submit</button>
                          </div>
                        </>
                      ) : (
                        <div style={{fontSize:14,color:"#00735A",fontWeight:600,padding:"10px 0"}}>
                          Your submission has been received. The instructor will review and grade it.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reflection */}
          <div className="reflection-card">
            <div className="reflection-title">Weekly reflection</div>
            <div className="reflection-prompt">{mod.reflectionPrompt || "Write one paragraph. What did you think before the reading? What has changed in your understanding? Minimum 80 words. This is not a summary — it is a record of your thinking."}</div>
            <textarea className="reflection-area" value={text} onChange={e=>{setText(e.target.value);setSaved(false);}} placeholder="Write your reflection here..." />
            <div className="reflection-footer">
              <span className="word-count">{wordCount} / 80 words minimum</span>
              <button className="submit-btn" onClick={()=>setSaved(true)}>Submit reflection</button>
            </div>
            {saved && <div className="submit-ok">✓ Reflection submitted</div>}
          </div>
        </div>

        {/* RIGHT RAIL */}
        <div className="sticky-card">
          <div className="enroll-card">
            <div className="enroll-thumb" style={{background:mod.color}}>
              <span style={{fontSize:52}}>{mod.thumbnail}</span>
            </div>
            <div className="enroll-body">
              <div className="enroll-progress-label">Your progress on this module</div>
              <div className="enroll-bar-wrap">
                <div className="enroll-bar-fill" style={{width: mod.status==="done"?"100%":mod.status==="current"?"35%":"0%"}}/>
              </div>
              <div className="enroll-status-row">
                <span style={{color:"#6B7E91",fontSize:12}}>{mod.status==="done"?"Complete":mod.status==="current"?"In progress":"Not started"}</span>
                <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:"#00C9A7"}}>{mod.status==="done"?"100%":mod.status==="current"?"35%":"0%"}</span>
              </div>
              <button className={`enroll-mark-btn ${mod.status==="done"?"done-btn":""}`}>
                {mod.status==="done" ? "✓ Completed" : mod.status==="current" ? "Mark as complete" : "Start module"}
              </button>
              <div style={{fontSize:12,color:"#6B7E91",lineHeight:1.6}}>
                <div style={{marginBottom:6,display:"flex",gap:8}}><span>🕐</span><span>{mod.duration} to complete</span></div>
                <div style={{marginBottom:6,display:"flex",gap:8}}><span>📄</span><span>{mod.sections.length} items</span></div>
                <div style={{display:"flex",gap:8}}><span>✎</span><span>Reflection required</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearnerProgress({ modules }) {
  const done = modules.filter(m=>m.status==="done").length;
  const pct  = Math.round((done/14)*100);
  return (
    <div className="main">
      <div className="page-header">
        <div className="page-eyebrow">My Progress</div>
        <div className="page-title">Course Progress Tracker</div>
        <div className="page-desc">Your completion status across all 14 weeks</div>
      </div>
      <div className="page-body">
        <div className="card" style={{marginBottom:20}}>
          <div style={{padding:"24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:28}}>
              <div>
                <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:52,fontWeight:500,color:"#00C9A7",lineHeight:1}}>{pct}%</div>
                <div style={{fontSize:13,color:"#6B7E91",marginTop:6}}>Overall completion</div>
              </div>
              <div style={{flex:1}}>
                <div style={{height:12,background:"#E5E7EB",borderRadius:6,overflow:"hidden",marginBottom:10}}>
                  <div style={{height:"100%",width:`${pct}%`,background:"#00C9A7",borderRadius:6}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#6B7E91"}}>
                  <span>{done} modules complete</span><span>{14-done} remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-head-title">Module breakdown</span></div>
          <div style={{padding:"8px 16px"}}>
            {modules.map(m=>{
              const ph = PHASE_COLORS[m.phase];
              return (
                <div key={m.id} style={{display:"flex",alignItems:"center",gap:16,padding:"10px 0",borderBottom:"1px solid #F3F4F6"}}>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#9CA3AF",minWidth:28}}>W{m.week}</span>
                  <span className="phase-pill" style={{"--phase-bg":ph.bg,"--phase-text":ph.text,"--phase-dot":ph.dot,fontSize:10,padding:"2px 8px"}}>
                    <span className="phase-dot"/>Module {m.week}
                  </span>
                  <span style={{fontSize:13,fontWeight:500,color:"#0D1B2A",flex:1}}>{m.title}</span>
                  <span style={{
                    fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                    background:m.status==="done"?"#E8F8F4":m.status==="current"?"#FFF5E8":"#F3F4F6",
                    color:m.status==="done"?"#00735A":m.status==="current"?"#A0600D":"#9CA3AF"
                  }}>
                    {m.status==="done"?"Complete":m.status==="current"?"Active":"Locked"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── INSTRUCTOR VIEWS ──────────────────────────────────────────────────────────

// Shared top bar shown on every instructor page with the learner preview toggle
function InstructorTopBar({ onPreview }) {
  return (
    <div style={{
      background:"#fff", borderBottom:"1px solid #E5E7EB",
      padding:"10px 32px", display:"flex", alignItems:"center",
      justifyContent:"space-between",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:12,color:"#6B7E91"}}>You are viewing the</span>
        <span style={{fontSize:12,fontWeight:700,color:"#0D1B2A",background:"#F3F4F6",padding:"3px 10px",borderRadius:20}}>Instructor panel</span>
      </div>
      <button onClick={onPreview} style={{
        display:"flex", alignItems:"center", gap:8,
        padding:"9px 18px", background:"#0056D2", color:"#fff",
        border:"none", borderRadius:8, fontSize:13, fontWeight:700,
        cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"background .15s",
      }}>
        <span>👁</span> Preview as student
      </button>
    </div>
  );
}

function InstructorDashboard({ user, users, onPreview }) {
  // Pending reflections come from real submitted data — empty until students submit
  const pending = [];
  const learners = users.filter(u=>u.role==="learner");

  return (
    <div className="main">
      <InstructorTopBar onPreview={onPreview}/>
      <div className="page-header">
        <div className="page-eyebrow">Instructor Dashboard</div>
        <div className="page-title"> Instructor, {user.name.split(" ")[0]}</div>
        <div className="page-desc">202X Fall cohort · Week 4 of 14</div>
      </div>
      <div className="page-body">

        {/* Stats */}
        <div className="stats-grid" style={{marginBottom:28}}>
          {[
            {n:"5",   label:"Students enrolled",   color:"#0D1B2A"},
            {n:"3",   label:"Reflections to review",color:"#F5A623"},
            {n:"4",   label:"Current week",         color:"#0056D2"},
            {n:"63%", label:"Average completion",   color:"#00C9A7"},
          ].map(s=>(
            <div key={s.label} className="stat-card">
              <div className="stat-num" style={{color:s.color}}>{s.n}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24,width:"100%"}}>

          {/* Pending reflections */}
          <div className="card">
            <div className="card-head">
              <span className="card-head-title">Reflections awaiting review</span>
              <span style={{fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20,background:"#FFF5E8",color:"#A0600D"}}>{pending.length} pending</span>
            </div>
            <div>
              {pending.map((p,i)=>(
                <div key={i} style={{
                  display:"grid", gridTemplateColumns:"36px 1fr auto",
                  alignItems:"center", gap:14,
                  padding:"14px 20px", borderBottom:i<pending.length-1?"1px solid #F3F4F6":"none",
                }}>
                  <div style={{
                    width:36, height:36, borderRadius:"50%",
                    background:"#EEF3FB", display:"flex", alignItems:"center",
                    justifyContent:"center", fontWeight:700, fontSize:13, color:"#0056D2",
                    flexShrink:0,
                  }}>
                    {p.student.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:"#0D1B2A",marginBottom:2}}>{p.student}</div>
                    <div style={{fontSize:12,color:"#6B7E91"}}>Week {p.week} · {p.module}</div>
                    <div style={{fontSize:11,color:"#9CA3AF",marginTop:2}}>{p.time}</div>
                  </div>
                  <button className="btn-ghost" style={{fontSize:12,padding:"6px 14px",whiteSpace:"nowrap"}}>Review</button>
                </div>
              ))}
            </div>
          </div>

          {/* Student completion */}
          <div className="card">
            <div className="card-head">
              <span className="card-head-title">Student completion</span>
              <button className="btn-ghost" style={{fontSize:12}}>View all</button>
            </div>
            <div style={{padding:"8px 20px 16px"}}>
              {learners.map(u=>{
                const done = Math.round((u.progress/100)*14);
                const color = u.progress >= 20 ? "#00C9A7" : u.progress > 0 ? "#F5A623" : "#E5E7EB";
                return (
                  <div key={u.id} style={{marginTop:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{
                          width:30, height:30, borderRadius:"50%",
                          background:"#F3F4F6", display:"flex", alignItems:"center",
                          justifyContent:"center", fontSize:11, fontWeight:700, color:"#6B7E91",
                        }}>
                          {u.name.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <div>
                          <div style={{fontSize:13,fontWeight:600,color:"#0D1B2A"}}>{u.name}</div>
                          <div style={{fontSize:11,color:"#9CA3AF"}}>{done} of 14 modules</div>
                        </div>
                      </div>
                      <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:13,fontWeight:500,color:color}}>{u.progress}%</span>
                    </div>
                    <div style={{height:6,background:"#F3F4F6",borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${u.progress}%`,background:color,borderRadius:3,transition:"width .4s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="card">
          <div className="card-head"><span className="card-head-title">Quick actions</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0}}>
            {[
              { icon:"✎", label:"Edit a module",        desc:"Update content, readings, or outcomes", color:"#EEF3FB", text:"#0056D2" },
              { icon:"◉", label:"Review submissions",   desc:"Read and respond to student reflections", color:"#E8F8F4", text:"#00735A" },
              { icon:"👁", label:"Preview as student",  desc:"See exactly what your students see", color:"#FFF5E8", text:"#A0600D" },
            ].map((a,i)=>(
              <div key={i} onClick={a.label==="Preview as student"?onPreview:undefined} style={{
                padding:"20px 24px", borderRight:i<2?"1px solid #F3F4F6":"none",
                cursor:"pointer", transition:"background .12s",
              }}
              onMouseEnter={e=>e.currentTarget.style.background="#F9FAFB"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{
                  width:40, height:40, borderRadius:10, background:a.color,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18, marginBottom:12,
                }}>{a.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:"#0D1B2A",marginBottom:4}}>{a.label}</div>
                <div style={{fontSize:12,color:"#6B7E91",lineHeight:1.5}}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function ModuleEditor({ modules, updateModule, deleteModule, reorderModules, onPreview }) {
  const [sel, setSel]       = useState(modules[0]);
  const [title, setTitle]   = useState(modules[0].title);
  const [sub, setSub]       = useState(modules[0].subtitle);
  const [dur, setDur]       = useState(modules[0].duration);
  const [reflectionPrompt, setReflectionPrompt] = useState(
    modules[0].reflectionPrompt || "Write one paragraph. What did you think before the reading? What has changed in your understanding? Minimum 80 words."
  );
  const [overviewText, setOverviewText] = useState(
    modules[0].overviewText || "This module is structured around one core reading and one in-class activity. Complete the reading before your session. The reflection is due before the following week's class."
  );
  const [outcomes, setOutcomes] = useState(modules[0].outcomes.slice());
  const [skills, setSkills] = useState(modules[0].skills.slice());
  const [newSkill, setNewSkill] = useState("");
  const [newUrl, setNew]    = useState("");
  const [newUrlLabel, setNewLabel] = useState("");
  const [saved, setSaved]   = useState(false);
  const [activeTab, setTab] = useState("content");

  const [criteria, setCriteria] = useState([
    { id:1, label:"Understanding",   desc:"Demonstrates accurate understanding of the concept", weight:25 },
    { id:2, label:"Critical Thinking", desc:"Applies analysis and questions assumptions",        weight:25 },
    { id:3, label:"Evidence",        desc:"Uses specific examples or readings to support ideas", weight:25 },
    { id:4, label:"Reflection",      desc:"Shows genuine shift in thinking, not just summary",   weight:25 },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id:1, name:"Week1_Lecture_Slides.pdf",  type:"pdf",   size:"2.4 MB", date:"12 Jun 2025" },
    { id:2, name:"AI_Overview_Video.mp4",     type:"video", size:"145 MB", date:"10 Jun 2025" },
  ]);
  const [newCrit, setNewCrit] = useState({ label:"", desc:"", weight:10 });
  const [totalTarget, setTotalTarget] = useState(100);
  const [urls, setUrls]     = useState(modules[0].sections.filter(s=>s.url).map(s=>({url:s.url,label:s.title})));

  // Course materials — replaces the old separate "readings" and "files" tabs
  const ITEM_TYPES = ["Video Lecture","Guest Lecture","Reading","Case Study","Discussion Activity","In-Class Exercise","Quiz","Assignment","Useful Links","Other Task"];
  const ITEM_MODES = ["Video","Recorded Lecture","Podcast / Audio","PDF","Word Document","Excel Spreadsheet","PowerPoint Slides","Image / Infographic","External Link","Written Text","H5P / Interactive"];
  const MODE_ICONS = {Video:"🎬","Recorded Lecture":"🎥","Podcast / Audio":"🎙",PDF:"📄","Word Document":"📝","Excel Spreadsheet":"📊","PowerPoint Slides":"📑","Image / Infographic":"🖼","External Link":"🔗","Written Text":"✏","H5P / Interactive":"🎮"};
  const [materials, setMaterials] = useState(
    (modules[0].materials || modules[0].sections.map((s,i)=>({
      id:i+1, itemType: s.label==="Lecture"?"Video Lecture":s.label||"Other Task", mode: s.type==="video"?"Video":s.type==="reading"?"External Link":"Written Text",
      title:s.title, url:s.url||"", content:"", dur:s.dur||"", visible:true,
    })))
  );
  const BLANK_MAT = { itemType:"Video Lecture", mode:"Video", title:"", url:"", content:"", dur:"", visible:true, fileName:"", fileData:"" };
  const [newMat, setNewMat] = useState({...BLANK_MAT});
  const [addingMat, setAddingMat] = useState(false);
  const [matError, setMatError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [moduleBody, setModuleBody] = useState(modules[0].moduleBody || "");

  const EXT_TO_MODE = {
    mp4:"Video", mov:"Video", webm:"Video", avi:"Video", mkv:"Video",
    mp3:"Podcast / Audio", wav:"Podcast / Audio", ogg:"Podcast / Audio", m4a:"Podcast / Audio",
    jpg:"Image / Infographic", jpeg:"Image / Infographic", png:"Image / Infographic", gif:"Image / Infographic", webp:"Image / Infographic", svg:"Image / Infographic",
    pdf:"PDF",
    doc:"Word Document", docx:"Word Document",
    xls:"Excel Spreadsheet", xlsx:"Excel Spreadsheet", xlsm:"Excel Spreadsheet",
    ppt:"PowerPoint Slides", pptx:"PowerPoint Slides",
  };
  const INLINE_MODES = new Set(["Image / Infographic","Podcast / Audio"]);

  const processFile = (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const mode = EXT_TO_MODE[ext] || "PDF";
    const title = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g," ");
    if (INLINE_MODES.has(mode)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewMat(prev=>({...prev, title, mode, fileName:file.name, fileData:ev.target.result, url:""}));
        setAddingMat(true);
      };
      reader.readAsDataURL(file);
    } else {
      // For video, PDF, Word, Excel, PowerPoint — store filename and a blob URL for the session
      const blobUrl = URL.createObjectURL(file);
      setNewMat(prev=>({...prev, title, mode, fileName:file.name, fileData:"", url:blobUrl}));
      setAddingMat(true);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
    e.target.value="";
  };

  const pick = m => {
    const fresh = modules.find(x=>x.id===m.id) || m;
    setSel(fresh);
    setTitle(fresh.title);
    setSub(fresh.subtitle);
    setDur(fresh.duration);
    setReflectionPrompt(fresh.reflectionPrompt || "Write one paragraph. What did you think before the reading? What has changed in your understanding? Minimum 80 words.");
    setOverviewText(fresh.overviewText || "This module is structured around one core reading and one in-class activity. Complete the reading before your session. The reflection is due before the following week's class.");
    setOutcomes(fresh.outcomes.slice());
    setSkills(fresh.skills.slice());
    setNewSkill("");
    setUrls(fresh.sections.filter(s=>s.url).map(s=>({url:s.url,label:s.title})));
    setMaterials(fresh.materials || fresh.sections.map((s,i)=>({
      id:i+1, itemType:s.label==="Lecture"?"Video Lecture":s.label||"Other Task", mode:s.type==="video"?"Video":s.type==="reading"?"External Link":"Written Text",
      title:s.title, url:s.url||"", content:"", dur:s.dur||"", visible:true,
    })));
    setNewMat({...BLANK_MAT}); setAddingMat(false); setMatError("");
    setModuleBody(fresh.moduleBody || "");
    setSaved(false); setTab("content");
  };
  const addUrl = () => {
    if(newUrl.trim()){ setUrls([...urls,{url:newUrl.trim(),label:newUrlLabel.trim()||newUrl.trim()}]); setNew(""); setNewLabel(""); }
  };
  const removeUrl = i => setUrls(urls.filter((_,idx)=>idx!==i));
  const ph = PHASE_COLORS[sel.phase] || PHASE_COLORS["Phase 1 · Demystification"];

  const tabs = ["content","outcomes","materials","settings"];

  return (
    <div className="main">
      <InstructorTopBar onPreview={onPreview}/>
      <div className="page-header">
        <div className="page-eyebrow">Instructor Tools</div>
        <div className="page-title">Module Editor</div>
        <div className="page-desc">Select a module from the list, then edit its content using the tabs on the right.</div>
      </div>
      <div className="page-body">
        <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:20,alignItems:"start"}}>

          {/* Module picker */}
          <div className="card" style={{position:"sticky",top:20}}>
            <div className="card-head">
              <span className="card-head-title">All modules</span>
              <span style={{fontSize:12,color:"#9CA3AF"}}>Drag to reorder</span>
            </div>
            <div style={{padding:"6px"}}
              onDragOver={e=>e.preventDefault()}
            >
              {modules.map((m,idx)=>{
                const mPh = PHASE_COLORS[m.phase];
                const isActive = sel.id===m.id;
                return (
                  <div key={m.id}
                    draggable
                    onDragStart={e=>{
                      e.dataTransfer.effectAllowed="move";
                      e.dataTransfer.setData("text/plain", String(idx));
                      e.currentTarget.style.opacity="0.4";
                    }}
                    onDragEnd={e=>{e.currentTarget.style.opacity="1";}}
                    onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderTop="2px solid #CC0000";}}
                    onDragLeave={e=>{e.currentTarget.style.borderTop="2px solid transparent";}}
                    onDrop={e=>{
                      e.preventDefault();
                      e.currentTarget.style.borderTop="2px solid transparent";
                      const fromIdx = parseInt(e.dataTransfer.getData("text/plain"),10);
                      const toIdx = idx;
                      if(fromIdx===toIdx) return;
                      const next=[...modules];
                      const [moved]=next.splice(fromIdx,1);
                      next.splice(toIdx,0,moved);
                      reorderModules(next);
                      pick(moved);
                    }}
                    style={{
                      display:"flex", alignItems:"center", gap:6,
                      padding:"8px 10px", borderRadius:8,
                      background: isActive?"#0D1B2A":"transparent",
                      border:"2px solid transparent",
                      transition:"background .12s", marginBottom:2,
                      cursor:"grab",
                    }}
                    onMouseEnter={e=>{ if(!isActive) e.currentTarget.style.background="#F3F4F6"; }}
                    onMouseLeave={e=>{ if(!isActive) e.currentTarget.style.background="transparent"; }}>

                    {/* Drag handle */}
                    <span style={{color:isActive?"rgba(255,255,255,.4)":"#D1D5DB",fontSize:14,flexShrink:0,userSelect:"none",lineHeight:1}}>⠿</span>

                    {/* Module number badge */}
                    <div style={{
                      width:24,height:24,borderRadius:5,flexShrink:0,
                      background:isActive?"#CC0000":"#003366",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontFamily:"'IBM Plex Mono',monospace",fontSize:11,fontWeight:700,color:"#fff",
                    }}>{m.week}</div>

                    {/* Click title area to select */}
                    <div onClick={()=>pick(m)} style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0,cursor:"pointer"}}>
                      <div style={{
                        width:26, height:26, borderRadius:6,
                        background: isActive ? "#1A2E42" : mPh.bg,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:12, flexShrink:0,
                      }}>{m.thumbnail}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,fontWeight:600,color:isActive?"#fff":"#0D1B2A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.title}</div>
                        <div style={{fontSize:10,color:isActive?"rgba(255,255,255,.5)":"#9CA3AF",marginTop:1}}>Module {m.week}</div>
                      </div>
                    </div>

                    {/* Edit button */}
                    <button
                      onClick={e=>{e.stopPropagation();pick(m);setTab("content");}}
                      title="Edit"
                      style={{flexShrink:0,background:"transparent",border:"none",color:isActive?"rgba(255,255,255,.6)":"#9CA3AF",cursor:"pointer",fontSize:13,padding:"3px 4px",borderRadius:4}}
                      onMouseEnter={e=>e.currentTarget.style.color="#003366"}
                      onMouseLeave={e=>e.currentTarget.style.color=isActive?"rgba(255,255,255,.6)":"#9CA3AF"}
                    >✎</button>

                    {/* Delete button */}
                    <button
                      onClick={e=>{
                        e.stopPropagation();
                        if(!window.confirm("Delete module " + m.week + ": " + m.title + "? This cannot be undone.")) return;
                        deleteModule(m.id);
                        const remaining=modules.filter(x=>x.id!==m.id);
                        if(remaining.length>0) pick(remaining[0]);
                      }}
                      title="Delete"
                      style={{flexShrink:0,background:"transparent",border:"none",color:isActive?"rgba(255,255,255,.4)":"#D1D5DB",cursor:"pointer",fontSize:13,padding:"3px 4px",borderRadius:4}}
                      onMouseEnter={e=>e.currentTarget.style.color="#CC0000"}
                      onMouseLeave={e=>e.currentTarget.style.color=isActive?"rgba(255,255,255,.4)":"#D1D5DB"}
                    >✕</button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editor panel */}
          <div>
            {/* Module header preview */}
            <div style={{
              background:sel.color, borderRadius:12, padding:"20px 24px",
              marginBottom:16, display:"flex", alignItems:"center", gap:16,
            }}>
              <div style={{fontSize:40}}>{sel.thumbnail}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,letterSpacing:".15em",textTransform:"uppercase",color:"#00C9A7",marginBottom:4}}>Module {sel.week} of 14</div>
                <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:2}}>{title}</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>{sub}</div>
              </div>
              <button onClick={()=>{
                const updatedMod = {
                  ...sel,
                  title,
                  subtitle: sub,
                  duration: dur,
                  reflectionPrompt,
                  overviewText,
                  outcomes: outcomes.slice(),
                  skills: skills.slice(),
                  materials: materials.slice(),
                  moduleBody,
                  sections: materials.map(m=>({
                    type: (m.mode==="Video"||m.mode==="Recorded Lecture")?"video":m.mode==="External Link"?"reading":m.mode==="Written Text"?"activity":"reading",
                    label: m.itemType,
                    title: m.title,
                    dur: m.dur||"",
                    url: m.url||undefined,
                    _instructorAdded: true,
                  })),
                };
                updateModule(updatedMod);
                setSel(updatedMod);
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
              }} style={{
                padding:"10px 22px", background:"#CC0000", color:"#fff",
                border:"none", borderRadius:8, fontSize:14, fontWeight:700,
                cursor:"pointer", fontFamily:"'Inter',sans-serif", whiteSpace:"nowrap",
              }}>Save changes</button>
            </div>

            {saved && (
              <div style={{background:"#E8F8F4",border:"1px solid #A7F3D0",borderRadius:8,padding:"12px 16px",fontSize:13,color:"#00735A",fontWeight:600,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
                ✓ Module saved successfully
              </div>
            )}

            {/* Tabs */}
            <div style={{display:"flex",gap:0,marginBottom:20,background:"#fff",borderRadius:10,border:"1px solid #E5E7EB",overflow:"hidden"}}>
              {tabs.map(t=>(
                <button key={t} onClick={()=>{setTab(t);setSaved(false);}} style={{
                  flex:1, padding:"12px", background: activeTab===t?"#0D1B2A":"transparent",
                  color: activeTab===t?"#fff":"#6B7E91", border:"none",
                  fontSize:13, fontWeight:600, cursor:"pointer",
                  fontFamily:"'Inter',sans-serif", textTransform:"capitalize", transition:"all .12s",
                }}>
                  {t==="content"?"Content":t==="outcomes"?"Learning Outcomes":t==="materials"?"Course Materials":"Settings"}
                </button>
              ))}
            </div>

            {/* Tab: Content */}
            {activeTab==="content" && (
              <div className="card">
                <div className="card-head"><span className="card-head-title">Module content</span></div>
                <div style={{padding:"20px 24px"}}>
                  <label className="editor-label">Module title</label>
                  <input className="editor-input" value={title} onChange={e=>setTitle(e.target.value)}/>

                  <label className="editor-label">Subtitle shown to students</label>
                  <input className="editor-input" value={sub} onChange={e=>setSub(e.target.value)}/>

                  <label className="editor-label">Estimated completion time</label>
                  <input className="editor-input" value={dur} onChange={e=>setDur(e.target.value)} style={{width:180}}/>

                  <label className="editor-label" style={{marginTop:8}}>Weekly reflection prompt</label>
                  <textarea className="editor-textarea" value={reflectionPrompt} onChange={e=>setReflectionPrompt(e.target.value)} rows={3}/>

                  <label className="editor-label">Overview text for students</label>
                  <textarea className="editor-textarea" value={overviewText} onChange={e=>setOverviewText(e.target.value)} rows={3}/>
                </div>
              </div>
            )}

            {/* Tab: Outcomes */}
            {activeTab==="outcomes" && (
              <div className="card">
                <div className="card-head">
                  <span className="card-head-title">Learning outcomes</span>
                  <span style={{fontSize:12,color:"#6B7E91"}}>Shown as the checklist on the module page</span>
                </div>
                <div style={{padding:"20px 24px"}}>
                  {outcomes.map((o,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:12}}>
                      <span style={{color:"#00A389",fontSize:16,marginTop:10,flexShrink:0}}>✓</span>
                      <textarea className="editor-textarea" value={o} onChange={e=>setOutcomes(outcomes.map((x,j)=>j===i?e.target.value:x))} rows={2} style={{marginBottom:0,flex:1}}/>
                      <button onClick={()=>setOutcomes(outcomes.filter((_,j)=>j!==i))} style={{background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:6,padding:"8px 10px",cursor:"pointer",fontSize:14,fontFamily:"'Inter',sans-serif",marginTop:6,flexShrink:0}}>✕</button>
                    </div>
                  ))}
                  <button onClick={()=>setOutcomes([...outcomes,""])} style={{
                    marginTop:8,padding:"9px 16px",background:"#F3F4F6",
                    border:"1.5px dashed #D1D5DB",borderRadius:8,fontSize:13,
                    color:"#6B7E91",cursor:"pointer",fontFamily:"'Inter',sans-serif",width:"100%",
                  }}>+ Add learning outcome</button>

                  <div style={{marginTop:24}}>
                    <label className="editor-label">Skills and tags shown to students</label>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
                      {skills.map(s=>(
                        <span key={s} style={{padding:"5px 12px",background:"#F3F4F6",border:"1.5px solid #E5E7EB",borderRadius:20,fontSize:12,fontWeight:500,color:"#374151",display:"flex",alignItems:"center",gap:6}}>
                          {s} <span onClick={()=>setSkills(skills.filter(x=>x!==s))} style={{color:"#9CA3AF",cursor:"pointer",fontSize:14}}>×</span>
                        </span>
                      ))}
                    </div>
                    <input className="editor-input" value={newSkill} onChange={e=>setNewSkill(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newSkill.trim()){setSkills([...skills,newSkill.trim()]);setNewSkill("");}}} placeholder="Type a skill and press Enter" style={{marginBottom:0}}/>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Course Materials */}
            {activeTab==="materials" && (
              <>
              <div className="card">
                <div className="card-head">
                  <span className="card-head-title">Course Materials</span>
                  <span style={{fontSize:12,color:"#6B7E91"}}>All content students see inside this module</span>
                </div>
                <div style={{padding:"20px 24px"}}>

                  {/* Existing materials list */}
                  {materials.length===0 && (
                    <div style={{textAlign:"center",padding:"24px 0",color:"#9CA3AF",fontSize:14}}>No materials yet. Click Add content below to get started.</div>
                  )}
                  {materials.map((mat,i)=>(
                    <div key={mat.id} style={{marginBottom:12}}>
                      {/* Material card */}
                      <div style={{
                        display:"flex",alignItems:"flex-start",gap:14,
                        padding:"14px 16px",background:"#F9FAFB",
                        border:"1.5px solid #E5E7EB",borderRadius:10,
                      }}>
                        <div style={{
                          width:40,height:40,borderRadius:9,background:"#E8EDF3",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:20,flexShrink:0,
                        }}>{MODE_ICONS[mat.mode]||"📎"}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                            <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,background:"#003366",color:"#fff",textTransform:"uppercase",letterSpacing:".06em"}}>{mat.itemType}</span>
                            <span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20,background:"#E8EDF3",color:"#003366"}}>{mat.mode}</span>
                            {mat.dur && <span style={{fontSize:11,color:"#9CA3AF"}}>{mat.dur}</span>}
                            {mat.task && <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,background:"#FFF5E8",color:"#A0600D"}}>📋 {mat.task.type}</span>}
                          </div>
                          <div style={{fontSize:14,fontWeight:600,color:"#0D1B2A",marginBottom:mat.url||mat.content||mat.fileName?4:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{mat.title||"Untitled"}</div>
                          {mat.fileName && <div style={{fontSize:11,color:"#6B7E91",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📎 {mat.fileName}</div>}
                          {!mat.fileName && mat.url && <div style={{fontSize:11,color:"#0056D2",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{mat.url}</div>}
                          {mat.content && <div style={{fontSize:12,color:"#6B7E91",marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{mat.content.slice(0,80)}{mat.content.length>80?"…":""}</div>}
                          {mat.mode==="Image / Infographic" && mat.fileData && (
                            <img src={mat.fileData} alt={mat.title} style={{marginTop:6,maxHeight:60,maxWidth:160,borderRadius:6,objectFit:"cover"}}/>
                          )}
                        </div>
                        <div style={{display:"flex",gap:6,flexShrink:0,flexDirection:"column",alignItems:"flex-end"}}>
                          <div style={{display:"flex",gap:6}}>
                            <button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,_editMode:!x._editMode}:x))} style={{
                              padding:"5px 10px",background:mat._editMode?"#003366":"#E8EDF3",
                              color:mat._editMode?"#fff":"#003366",border:"none",
                              borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                            }}>{mat._editMode?"✓ Done":"✏ Edit"}</button>
                            <button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,visible:!x.visible}:x))} style={{
                              padding:"5px 10px",background:mat.visible?"#E8F8F4":"#F3F4F6",
                              color:mat.visible?"#00735A":"#9CA3AF",border:"none",
                              borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                            }}>{mat.visible?"Visible":"Hidden"}</button>
                            <button onClick={()=>setMaterials(materials.filter((_,j)=>j!==i))} style={{
                              padding:"5px 10px",background:"#FEE2E2",color:"#DC2626",
                              border:"none",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                            }}>Remove</button>
                          </div>
                          {/* Toggle task below this material */}
                          <button onClick={()=>setMaterials(materials.map((x,j)=>j===i
                            ? {...x, _showTask:!x._showTask, task: x.task||{type:"Assignment",title:"",instructions:"",graded:true,rubric:null}}
                            : x
                          ))} style={{
                            padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",
                            fontFamily:"'Inter',sans-serif",borderRadius:6,
                            background:mat.task?"#FFF5E8":"#F3F4F6",
                            color:mat.task?"#A0600D":"#6B7E91",
                            border:mat.task?"1px solid #FCD34D":"1.5px solid #E5E7EB",
                          }}>{mat.task?"✏ Edit task":"+ Add task"}</button>
                        </div>
                      </div>

                      {/* Inline edit panel — opens when instructor clicks Edit */}
                      {mat._editMode && (
                        <div style={{
                          border:"1.5px solid #003366",borderRadius:"0 0 10px 10px",
                          background:"#F0F4FA",padding:"16px 18px",marginTop:-2,
                          borderTop:"1px solid #D0DCF0",
                        }}>
                          <div style={{fontSize:13,fontWeight:700,color:"#003366",marginBottom:14}}>✏ Edit material</div>

                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                            <div>
                              <label className="editor-label">Item type</label>
                              <select className="editor-input" style={{marginBottom:0}} value={mat.itemType||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,itemType:e.target.value}:x))}>
                                {ITEM_TYPES.map(t=><option key={t}>{t}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="editor-label">Format / mode</label>
                              <select className="editor-input" style={{marginBottom:0}} value={mat.mode||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,mode:e.target.value}:x))}>
                                {ITEM_MODES.map(m=><option key={m}>{m}</option>)}
                              </select>
                            </div>
                          </div>

                          <div style={{marginBottom:12}}>
                            <label className="editor-label">Title</label>
                            <input className="editor-input" style={{marginBottom:0}} value={mat.title||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,title:e.target.value}:x))} placeholder="Title shown to students"/>
                          </div>

                          <div style={{display:"grid",gridTemplateColumns:"1fr 120px",gap:12,marginBottom:12}}>
                            <div>
                              <label className="editor-label">URL</label>
                              <input className="editor-input" style={{marginBottom:0}} value={mat.url||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,url:e.target.value}:x))} placeholder="https://..."/>
                            </div>
                            <div>
                              <label className="editor-label">Duration</label>
                              <input className="editor-input" style={{marginBottom:0}} value={mat.dur||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,dur:e.target.value}:x))} placeholder="e.g. 20 min"/>
                            </div>
                          </div>

                          {(mat.mode==="Written Text" || mat.itemType==="Reflection" || mat.itemType==="Assignment") && (
                            <div style={{marginBottom:12}}>
                              <label className="editor-label">Written content / instructions</label>
                              <textarea className="editor-textarea" rows={3} style={{marginBottom:0}} value={mat.content||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,content:e.target.value}:x))} placeholder="Write content here..."/>
                            </div>
                          )}

                          <button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,_editMode:false}:x))} style={{
                            padding:"8px 20px",background:"#003366",color:"#fff",border:"none",
                            borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                          }}>Done editing</button>
                        </div>
                      )}

                      {/* Per-material task editor — shown when _showTask is true */}
                      {mat._showTask && (
                        <div style={{
                          border:"1.5px solid #FCD34D",borderRadius:"0 0 10px 10px",
                          background:"#FFFBEB",padding:"16px 18px",marginTop:-2,
                          borderTop:"1px solid #FEF3C7",
                        }}>
                          <div style={{fontSize:13,fontWeight:700,color:"#92400E",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <span>📋 Task after this material</span>
                            <button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,task:null,_showTask:false}:x))}
                              style={{background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Remove task</button>
                          </div>

                          {/* Task type */}
                          <label className="editor-label">Task type</label>
                          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                            {["Assignment","Reflection","Quiz","Poll","Discussion","Group Work","Game / Simulation","Case Study","Presentation","Other"].map(t=>(
                              <button key={t} onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,type:t}}:x))} style={{
                                padding:"6px 12px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",
                                fontFamily:"'Inter',sans-serif",transition:"all .1s",
                                background:(mat.task&&mat.task.type===t)?"#003366":"#fff",
                                color:(mat.task&&mat.task.type===t)?"#fff":"#6B7E91",
                                border:(mat.task&&mat.task.type===t)?"none":"1.5px solid #E5E7EB",
                              }}>{t}</button>
                            ))}
                          </div>

                          <label className="editor-label">Task title</label>
                          <input className="editor-input" style={{marginBottom:12}} value={mat.task&&mat.task.title||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,title:e.target.value}}:x))} placeholder="e.g. Reflection after reading"/>

                          <label className="editor-label">Instructions for students</label>
                          <textarea className="editor-textarea" rows={3} style={{marginBottom:12}} value={mat.task&&mat.task.instructions||""} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,instructions:e.target.value}}:x))} placeholder="What should students do? How should they submit?"/>

                          <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:14}}>
                            <div>
                              <label className="editor-label">Graded?</label>
                              <div style={{display:"flex",gap:6}}>
                                {[["Yes",true],["No",false]].map(([lbl,val])=>(
                                  <button key={lbl} onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,graded:val}}:x))} style={{
                                    padding:"7px 14px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                                    background:(mat.task&&mat.task.graded===val)?"#003366":"#fff",
                                    color:(mat.task&&mat.task.graded===val)?"#fff":"#6B7E91",
                                    border:(mat.task&&mat.task.graded===val)?"none":"1.5px solid #E5E7EB",
                                  }}>{lbl}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="editor-label">Max score</label>
                              <input type="number" className="editor-input" style={{width:80,marginBottom:0}} value={mat.task&&mat.task.maxScore||100} onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,maxScore:Number(e.target.value)}}:x))}/>
                            </div>
                          </div>

                          {/* Rubric toggle */}
                          <div style={{borderTop:"1px solid #FEF3C7",paddingTop:14}}>
                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom: mat.task&&mat.task.showRubric ? 16 : 0}}>
                              <div>
                                <div style={{fontSize:14,fontWeight:700,color:"#92400E"}}>Rubric <span style={{fontWeight:400,color:"#9CA3AF",fontSize:13}}>(optional)</span></div>
                                <div style={{fontSize:12,color:"#9CA3AF",marginTop:2}}>Define criteria and performance levels for this task</div>
                              </div>
                              <button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,showRubric:!x.task.showRubric,rubric:x.task.rubric||[
                                {id:1,label:"Content",desc:"Accuracy and depth of understanding",weight:25,levels:[
                                  {name:"Excellent",pts:"90–100",bg:"#E8EDF3",color:"#003366",desc:""},
                                  {name:"Good",pts:"70–89",bg:"#FFE8E8",color:"#CC0000",desc:""},
                                  {name:"Satisfactory",pts:"50–69",bg:"#FFF8E8",color:"#A06000",desc:""},
                                  {name:"Needs work",pts:"0–49",bg:"#FEE2E2",color:"#DC2626",desc:""},
                                ]},
                                {id:2,label:"Clarity",desc:"Clear and direct expression",weight:25,levels:[
                                  {name:"Excellent",pts:"90–100",bg:"#E8EDF3",color:"#003366",desc:""},
                                  {name:"Good",pts:"70–89",bg:"#FFE8E8",color:"#CC0000",desc:""},
                                  {name:"Satisfactory",pts:"50–69",bg:"#FFF8E8",color:"#A06000",desc:""},
                                  {name:"Needs work",pts:"0–49",bg:"#FEE2E2",color:"#DC2626",desc:""},
                                ]},
                              ]}}:x))} style={{
                                padding:"7px 16px",fontSize:13,fontWeight:700,borderRadius:8,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                                background:mat.task&&mat.task.showRubric?"#003366":"#fff",
                                color:mat.task&&mat.task.showRubric?"#fff":"#6B7E91",
                                border:mat.task&&mat.task.showRubric?"none":"1.5px solid #E5E7EB",
                              }}>{mat.task&&mat.task.showRubric?"Hide rubric":"Add rubric"}</button>
                            </div>

                            {mat.task&&mat.task.showRubric&&(
                              <div>
                                {/* Total weight indicator */}
                                {(()=>{
                                  const rubric = mat.task.rubric||[];
                                  const total  = rubric.reduce((s,r)=>s+Number(r.weight),0);
                                  const target = mat.task.maxScore||100;
                                  const over   = total > target;
                                  const exact  = total === target;
                                  const bg     = over?"#FEE2E2":exact?"#E8F8F4":"#EEF3FB";
                                  const bdr    = over?"#FCA5A5":exact?"#A7F3D0":"#BFDBFE";
                                  const col    = over?"#DC2626":exact?"#00735A":"#1D4ED8";
                                  return (
                                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:9,marginBottom:14,background:bg,border:`1px solid ${bdr}`}}>
                                      <span style={{fontSize:15,fontWeight:700,color:col}}>Total: {total} / {target} pts</span>
                                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                                        <span style={{fontSize:12,color:"#6B7E91",fontWeight:600}}>Target:</span>
                                        <input type="number" min="1" max="1000" value={mat.task.maxScore||100}
                                          onChange={e=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,maxScore:Number(e.target.value)}}:x))}
                                          style={{width:68,padding:"4px 8px",border:"1.5px solid #E5E7EB",borderRadius:6,fontSize:14,fontFamily:"'IBM Plex Mono',monospace",textAlign:"center",outline:"none"}}/>
                                        <span style={{fontSize:13,color:"#6B7E91"}}>pts</span>
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* Criteria with full performance levels */}
                                {(mat.task.rubric||[]).map((rc,ri)=>{
                                  const defLv = [
                                    {name:"Excellent",    pts:"90–100",bg:"#E8EDF3",color:"#003366",desc:""},
                                    {name:"Good",         pts:"70–89", bg:"#FFE8E8",color:"#CC0000",desc:""},
                                    {name:"Satisfactory", pts:"50–69", bg:"#FFF8E8",color:"#A06000",desc:""},
                                    {name:"Needs work",   pts:"0–49",  bg:"#FEE2E2",color:"#DC2626",desc:""},
                                  ];
                                  const updRC = (field,val) => setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,rubric:x.task.rubric.map((r,k)=>k===ri?{...r,[field]:val}:r)}}:x));
                                  const updLv = (li,field,val) => setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,rubric:x.task.rubric.map((r,k)=>k===ri?{...r,levels:(r.levels||defLv).map((l,m)=>m===li?{...l,[field]:val}:l)}:r)}}:x));
                                  return (
                                    <div key={rc.id} style={{border:"1.5px solid #E5E7EB",borderRadius:11,padding:"16px 16px",marginBottom:12,background:"#fff"}}>
                                      {/* Criterion header */}
                                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 80px 32px",gap:10,alignItems:"center",marginBottom:14}}>
                                        <div>
                                          <label className="editor-label">Criterion</label>
                                          <input className="editor-input" style={{marginBottom:0,fontSize:14}} value={rc.label} onChange={e=>updRC("label",e.target.value)} placeholder="e.g. Understanding"/>
                                        </div>
                                        <div>
                                          <label className="editor-label">Description for students</label>
                                          <input className="editor-input" style={{marginBottom:0,fontSize:14}} value={rc.desc} onChange={e=>updRC("desc",e.target.value)} placeholder="e.g. Demonstrates accurate understanding"/>
                                        </div>
                                        <div>
                                          <label className="editor-label">Weight</label>
                                          <input type="number" className="editor-input" style={{marginBottom:0,fontSize:14,textAlign:"center"}} value={rc.weight} onChange={e=>updRC("weight",Number(e.target.value))}/>
                                        </div>
                                        <div style={{paddingTop:22}}>
                                          <button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,rubric:x.task.rubric.filter((_,k)=>k!==ri)}}:x))} style={{background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:6,padding:"7px 8px",cursor:"pointer",fontSize:13}}>✕</button>
                                        </div>
                                      </div>
                                      {/* Performance levels */}
                                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                                        {(rc.levels||defLv).map((lv,li)=>(
                                          <div key={li} style={{background:lv.bg,borderRadius:9,padding:"11px 11px",display:"flex",flexDirection:"column",gap:7}}>
                                            <input value={lv.name} onChange={e=>updLv(li,"name",e.target.value)}
                                              style={{border:"1.5px solid rgba(0,0,0,.1)",borderRadius:6,padding:"6px 8px",fontSize:14,fontWeight:700,color:lv.color,background:"rgba(255,255,255,.8)",outline:"none",fontFamily:"'Inter',sans-serif",width:"100%"}}/>
                                            <div style={{display:"flex",alignItems:"center",gap:4}}>
                                              <input value={lv.pts} onChange={e=>updLv(li,"pts",e.target.value)}
                                                style={{width:68,border:"1.5px solid rgba(0,0,0,.1)",borderRadius:6,padding:"5px 7px",fontSize:13,color:"#5A6A7E",background:"rgba(255,255,255,.8)",outline:"none",fontFamily:"'IBM Plex Mono',monospace"}}/>
                                              <span style={{fontSize:13,color:"#5A6A7E",fontWeight:600}}>pts</span>
                                            </div>
                                            <textarea value={lv.desc} onChange={e=>updLv(li,"desc",e.target.value)}
                                              placeholder={"Describe " + lv.name.toLowerCase() + " performance..."}
                                              style={{width:"100%",border:"1.5px solid rgba(0,0,0,.1)",borderRadius:6,padding:"7px 8px",fontSize:13,fontFamily:"'Inter',sans-serif",resize:"none",height:60,outline:"none",background:"rgba(255,255,255,.8)",lineHeight:1.4,color:"#1A1A2E"}}/>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                                <button onClick={()=>setMaterials(materials.map((x,j)=>j===i?{...x,task:{...x.task,rubric:[...(x.task.rubric||[]),{
                                  id:Date.now(),label:"",desc:"",weight:10,
                                  levels:[
                                    {name:"Excellent",pts:"90–100",bg:"#E8EDF3",color:"#003366",desc:""},
                                    {name:"Good",pts:"70–89",bg:"#FFE8E8",color:"#CC0000",desc:""},
                                    {name:"Satisfactory",pts:"50–69",bg:"#FFF8E8",color:"#A06000",desc:""},
                                    {name:"Needs work",pts:"0–49",bg:"#FEE2E2",color:"#DC2626",desc:""},
                                  ],
                                }]}}:x))} style={{width:"100%",padding:"9px",background:"#fff",border:"1.5px dashed #D1D5DB",borderRadius:8,fontSize:14,color:"#6B7E91",cursor:"pointer",fontFamily:"'Inter',sans-serif",marginTop:4}}>
                                  + Add criterion
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add content panel */}
                  {!addingMat ? (
                    <button onClick={()=>setAddingMat(true)} style={{
                      width:"100%",marginTop:8,padding:"12px",
                      background:"transparent",border:"1.5px dashed #D1D5DB",
                      borderRadius:10,fontSize:14,color:"#6B7E91",
                      cursor:"pointer",fontFamily:"'Inter',sans-serif",
                    }}>+ Add content</button>
                  ) : (
                    <div style={{marginTop:16,padding:"20px",background:"#F9FAFB",border:"1.5px dashed #003366",borderRadius:12}}>

                      {/* Drop zone inside the panel */}
                      <div
                        onDragOver={e=>{e.preventDefault();setDragOver(true);}}
                        onDragLeave={()=>setDragOver(false)}
                        onDrop={handleFileDrop}
                        style={{
                          border:`2px dashed ${dragOver?"#CC0000":"#D1D5DB"}`,
                          borderRadius:10, padding:"24px 20px", textAlign:"center",
                          marginBottom:20, background:dragOver?"#FFF5F5":"#fff",
                          transition:"all .15s",
                        }}>
                        <div style={{fontSize:28,marginBottom:6}}>📁</div>
                        <div style={{fontSize:14,fontWeight:700,color:"#0D1B2A",marginBottom:4}}>
                          {dragOver ? "Release to add" : "Drag and drop a file here"}
                        </div>
                        <div style={{fontSize:12,color:"#6B7E91",marginBottom:12}}>
                          Supports: Video, PDF, Word, Excel, PowerPoint, Audio, Image
                        </div>
                        <div style={{display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap",marginBottom:12}}>
                          {[["🎬","Video","mp4 mov webm"],["📄","PDF","pdf"],["📝","Word","docx doc"],
                            ["📊","Excel","xlsx xls"],["📑","PPT","pptx ppt"],
                            ["🎙","Audio","mp3 wav"],["🖼","Image","jpg png gif"]].map(([ic,lb,ex])=>(
                            <div key={lb} style={{padding:"3px 10px",background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:20,fontSize:11,color:"#374151",display:"flex",alignItems:"center",gap:4}}>
                              <span>{ic}</span><span style={{fontWeight:600}}>{lb}</span><span style={{color:"#9CA3AF"}}>.{ex.split(" ").join(" .")}</span>
                            </div>
                          ))}
                        </div>
                        <label style={{
                          display:"inline-flex",alignItems:"center",gap:8,
                          padding:"8px 20px",background:"#003366",color:"#fff",
                          borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                        }}>
                          Browse files
                          <input type="file" style={{display:"none"}}
                            accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.xls,.xlsx,.xlsm,.ppt,.pptx,.h5p"
                            onChange={handleFileInput}/>
                        </label>
                      </div>

                      {/* Divider */}
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                        <div style={{flex:1,height:1,background:"#E5E7EB"}}/>
                        <span style={{fontSize:12,color:"#9CA3AF",fontWeight:600}}>OR ADD MANUALLY</span>
                        <div style={{flex:1,height:1,background:"#E5E7EB"}}/>
                      </div>

                      <div style={{fontSize:14,fontWeight:700,color:"#0D1B2A",marginBottom:16}}>
                        {newMat.fileName ? `Configure: ${newMat.fileName}` : "New material"}
                      </div>

                      {/* File preview thumbnail if image */}
                      {newMat.mode==="Image / Infographic" && newMat.fileData && (
                        <div style={{marginBottom:14}}>
                          <img src={newMat.fileData} alt="preview" style={{maxHeight:120,maxWidth:240,borderRadius:8,objectFit:"cover",border:"1px solid #E5E7EB"}}/>
                        </div>
                      )}

                      {/* Audio preview */}
                      {newMat.mode==="Podcast / Audio" && newMat.fileData && (
                        <div style={{marginBottom:14}}>
                          <audio controls src={newMat.fileData} style={{width:"100%"}}/>
                        </div>
                      )}

                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                        <div>
                          <label className="editor-label">Item type</label>
                          <select className="editor-input" style={{marginBottom:0}} value={newMat.itemType} onChange={e=>setNewMat({...newMat,itemType:e.target.value})}>
                            {ITEM_TYPES.map(t=><option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="editor-label">Format / mode</label>
                          <select className="editor-input" style={{marginBottom:0}} value={newMat.mode} onChange={e=>setNewMat({...newMat,mode:e.target.value})}>
                            {ITEM_MODES.map(m=><option key={m}>{m}</option>)}
                          </select>
                        </div>
                      </div>

                      <div style={{marginBottom:14}}>
                        <label className="editor-label">Title shown to students</label>
                        <input className="editor-input" style={{marginBottom:0}} value={newMat.title} onChange={e=>setNewMat({...newMat,title:e.target.value})} placeholder="e.g. Introduction to Neural Networks"/>
                      </div>

                      {/* URL field — only shown when no file was uploaded */}
                      {!newMat.fileName && (
                        <div style={{display:"grid",gridTemplateColumns:"1fr 120px",gap:14,marginBottom:14}}>
                          <div>
                            <label className="editor-label">
                              {newMat.mode==="Written Text"?"Leave blank — write in the box below":newMat.mode==="External Link"?"URL":"URL (if hosted externally)"}
                            </label>
                            <input className="editor-input" style={{marginBottom:0}} value={newMat.url} onChange={e=>setNewMat({...newMat,url:e.target.value})}
                              placeholder={newMat.mode==="External Link"||newMat.mode==="Video"?"https://...":"Optional"}/>
                          </div>
                          <div>
                            <label className="editor-label">Duration</label>
                            <input className="editor-input" style={{marginBottom:0}} value={newMat.dur} onChange={e=>setNewMat({...newMat,dur:e.target.value})} placeholder="e.g. 20 min"/>
                          </div>
                        </div>
                      )}

                      {newMat.fileName && (
                        <div style={{display:"grid",gridTemplateColumns:"1fr 120px",gap:14,marginBottom:14}}>
                          <div style={{background:"#E8EDF3",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#003366",fontWeight:600}}>
                            📎 {newMat.fileName}
                            <div style={{fontSize:11,color:"#6B7E91",marginTop:3,fontWeight:400}}>File attached. Students will see this when it is hosted.</div>
                          </div>
                          <div>
                            <label className="editor-label">Duration</label>
                            <input className="editor-input" style={{marginBottom:0}} value={newMat.dur} onChange={e=>setNewMat({...newMat,dur:e.target.value})} placeholder="e.g. 20 min"/>
                          </div>
                        </div>
                      )}

                      {(newMat.mode==="Written Text" || newMat.itemType==="Reflection Task" || newMat.itemType==="Assignment") && (
                        <div style={{marginBottom:14}}>
                          <label className="editor-label">Written content shown to students</label>
                          <textarea className="editor-textarea" style={{marginBottom:0,minHeight:120}} value={newMat.content} onChange={e=>setNewMat({...newMat,content:e.target.value})} placeholder="Write the content, instructions, or task description here..."/>
                        </div>
                      )}

                      {matError && (
                        <div style={{background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#DC2626",marginBottom:12}}>{matError}</div>
                      )}

                      <div style={{display:"flex",gap:10}}>
                        <button onClick={()=>{
                          if(!newMat.title.trim()){setMatError("Title is required.");return;}
                          if(!newMat.fileName && (newMat.mode==="External Link"||newMat.mode==="Video")&&!newMat.url.trim()&&!newMat.content.trim()){setMatError("A URL is required for this mode.");return;}
                          setMaterials([...materials,{...newMat,id:Date.now()}]);
                          setNewMat({...BLANK_MAT}); setAddingMat(false); setMatError("");
                        }} style={{padding:"10px 22px",background:"#CC0000",color:"#fff",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
                          Add material
                        </button>
                        <button onClick={()=>{setAddingMat(false);setMatError("");setNewMat({...BLANK_MAT});}} className="btn-ghost" style={{fontSize:13}}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card" style={{marginTop:16}}>
                <div className="card-head">
                  <span className="card-head-title">Module page content</span>
                  <span style={{fontSize:12,color:"#6B7E91"}}>Introductory text, context, or instructions shown at the top of the module page</span>
                </div>
                <div style={{padding:"20px 24px"}}>
                  <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                    {[
                      ["B","font-weight:bold","bold"],
                      ["I","font-style:italic","italic"],
                      ["H2","font-size:1.1em;font-weight:700","heading"],
                      ["— ","","divider"],
                    ].map(([label, , hint])=>(
                      <button key={hint} title={hint} style={{
                        padding:"5px 12px",background:"#F3F4F6",border:"1.5px solid #E5E7EB",
                        borderRadius:6,fontSize:13,fontWeight:label==="B"?700:label==="I"?400:600,
                        fontStyle:label==="I"?"italic":"normal",
                        cursor:"pointer",fontFamily:"'Inter',sans-serif",color:"#374151",
                      }}>{label}</button>
                    ))}
                    <span style={{fontSize:12,color:"#9CA3AF",alignSelf:"center",marginLeft:4}}>Plain text formatting — use markdown-style: **bold**, _italic_, ## heading</span>
                  </div>
                  <textarea
                    value={moduleBody}
                    onChange={e=>setModuleBody(e.target.value)}
                    placeholder={`Write introductory text, context, background reading notes, or instructions for this module.\n\nYou can use plain markdown:\n**bold text**\n_italic text_\n## Section heading\n- Bullet point\n\nThis text appears at the top of the module page before the materials list.`}
                    style={{
                      width:"100%", minHeight:220, padding:"14px 16px",
                      border:"1.5px solid #E5E7EB", borderRadius:10,
                      fontSize:15, fontFamily:"'Inter',sans-serif",
                      color:"#0D1B2A", resize:"vertical", outline:"none",
                      lineHeight:1.7, background:"#fff",
                      transition:"border-color .15s",
                    }}
                    onFocus={e=>e.target.style.borderColor="#003366"}
                    onBlur={e=>e.target.style.borderColor="#E5E7EB"}
                  />
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                    <span style={{fontSize:12,color:"#9CA3AF"}}>{moduleBody.trim().split(/\s+/).filter(Boolean).length} words</span>
                    <span style={{fontSize:12,color:"#9CA3AF"}}>Saved when you click Save changes above</span>
                  </div>
                </div>
              </div>
              </>
            )}


            {/* Tab: Settings */}
            {activeTab==="settings" && (
              <div className="card">
                <div className="card-head"><span className="card-head-title">Module settings</span></div>
                <div style={{padding:"20px 24px"}}>
                  <label className="editor-label">Module visibility</label>
                  <div style={{display:"flex",gap:8,marginBottom:20}}>
                    {["Published","Draft","Locked"].map(s=>(
                      <button key={s} style={{
                        padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",
                        fontFamily:"'Inter',sans-serif",
                        background:s==="Published"?"#0D1B2A":"#F3F4F6",
                        color:s==="Published"?"#fff":"#6B7E91",
                        border:s==="Published"?"none":"1.5px solid #E5E7EB",
                      }}>{s}</button>
                    ))}
                  </div>

                  <label className="editor-label">Unlock condition</label>
                  <select className="editor-input" style={{width:"auto",marginBottom:20}}>
                    <option>Available from course start</option>
                    <option>Unlocks after previous module is complete</option>
                    <option>Unlocks on specific date</option>
                  </select>

                  <label className="editor-label">Minimum reflection word count</label>
                  <input className="editor-input" defaultValue="80" style={{width:100,marginBottom:20}}/>

                  <label className="editor-label">Assign to cohort</label>
                  <select className="editor-input" style={{width:"auto"}}>
                    <option>2026 Fall</option>
                    <option>2027 Spring</option>
                    <option>2027 Summer</option>
                    <option>2027 Fall</option>
                    <option>2028 Spring</option>
                    <option>2028 Summer</option>
                    <option>2028 Fall</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentProgress({ users, onPreview }) {
  const [selected, setSelected] = useState(null);
  const learners = users.filter(u=>u.role==="learner");

  const exportCSV = () => {
    const header = ["Name","Email","Cohort","Progress %","Modules Complete","Reflections"];
    const rows = learners.map(u=>{
      const done = Math.round(((u.progress||0)/100)*14);
      return [u.name, u.email, u.cohort||"", u.progress||0, done, done].join(",");
    });
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="student_progress.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const exportExcel = () => {
    // Build an HTML table that Excel can open natively — no library needed
    const header = ["Name","Email","Cohort","Progress %","Modules Complete","Reflections"];
    const rows = learners.map(u=>{
      const done = Math.round(((u.progress||0)/100)*14);
      return [u.name, u.email, u.cohort||"", u.progress||0, done, done];
    });
    const tableRows = [header, ...rows].map(row=>
      "<tr>" + row.map(cell=>`<td>${String(cell).replace(/&/g,"&amp;").replace(/</g,"&lt;")}</td>`).join("") + "</tr>"
    ).join("");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"/></head><body><table border="1">${tableRows}</table></body></html>`;
    const blob = new Blob([html], {type:"application/vnd.ms-excel;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="student_progress.xls"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="main">
      <InstructorTopBar onPreview={onPreview}/>
      <div className="page-header">
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
          <div>
            <div className="page-eyebrow">Instructor Tools</div>
            <div className="page-title">Student Progress</div>
            <div className="page-desc">{learners.length} students enrolled</div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:4}}>
            <button onClick={exportCSV} style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"10px 18px",background:"#003366",color:"#fff",
              border:"none",borderRadius:8,fontSize:13,fontWeight:700,
              cursor:"pointer",fontFamily:"'Inter',sans-serif",whiteSpace:"nowrap",
            }}>📥 Download CSV</button>
            <button onClick={exportExcel} style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"10px 18px",background:"#1A7A3C",color:"#fff",
              border:"none",borderRadius:8,fontSize:13,fontWeight:700,
              cursor:"pointer",fontFamily:"'Inter',sans-serif",whiteSpace:"nowrap",
            }}>📊 Download Excel</button>
          </div>
        </div>
      </div>
      <div className="page-body">

        {/* Summary row — dynamic counts from real user data */}
        {(() => {
          const onTrack = learners.filter(u=>(u.progress||0)>=20).length;
          const behind  = learners.filter(u=>(u.progress||0)>0&&(u.progress||0)<20).length;
          const notStarted = learners.filter(u=>!(u.progress||0)).length;
          const summaryCards = [
            {label:"On track (20%+ complete)", n:onTrack,    color:"#00C9A7", bg:"#E8F8F4"},
            {label:"Behind (1–19% complete)",  n:behind,     color:"#F5A623", bg:"#FFF5E8"},
            {label:"Not started",              n:notStarted, color:"#9CA3AF", bg:"#F3F4F6"},
          ];
          return (
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
              {summaryCards.map(s=>(
                <div key={s.label} style={{background:s.bg,borderRadius:12,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:36,fontWeight:500,color:s.color,lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:13,color:"#374151",lineHeight:1.4}}>{s.label}</div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Student cards */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {learners.map(u=>{
            const done = Math.round((u.progress/100)*14);
            const isOpen = selected===u.id;
            const color = u.progress>=20?"#00C9A7":u.progress>0?"#F5A623":"#9CA3AF";
            return (
              <div key={u.id} className="card">
                <div onClick={()=>setSelected(isOpen?null:u.id)} style={{
                  display:"grid", gridTemplateColumns:"44px 1fr 160px 120px auto",
                  alignItems:"center", gap:16, padding:"16px 20px", cursor:"pointer",
                }}>
                  <div style={{
                    width:44,height:44,borderRadius:"50%",
                    background:"#EEF3FB",display:"flex",alignItems:"center",
                    justifyContent:"center",fontWeight:700,fontSize:14,color:"#0056D2",
                  }}>{u.name.split(" ").map(n=>n[0]).join("")}</div>

                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:"#0D1B2A",marginBottom:2}}>{u.name}</div>
                    <div style={{fontSize:12,color:"#9CA3AF"}}>{u.email}</div>
                  </div>

                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:12,color:"#6B7E91"}}>{done} of 14 modules</span>
                      <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,fontWeight:600,color}}>{u.progress}%</span>
                    </div>
                    <div style={{height:7,background:"#F3F4F6",borderRadius:4,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${u.progress}%`,background:color,borderRadius:4}}/>
                    </div>
                  </div>

                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:11,color:"#9CA3AF",marginBottom:3}}>Reflections</div>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:16,fontWeight:600,color:"#0D1B2A"}}>{done}</span>
                    <span style={{fontSize:11,color:"#9CA3AF"}}>/14</span>
                  </div>

                  <span style={{color:"#9CA3AF",fontSize:18,userSelect:"none"}}>{isOpen?"▲":"▼"}</span>
                </div>

                {/* Expanded module breakdown */}
                {isOpen && (
                  <div style={{borderTop:"1px solid #F3F4F6",padding:"16px 20px"}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#6B7E91",letterSpacing:".08em",textTransform:"uppercase",marginBottom:12}}>Module breakdown</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
                      {INITIAL_MODULES.map(m=>{
                        const mDone = m.status==="done";
                        const mCur  = m.status==="current";
                        return (
                          <div key={m.id} style={{
                            textAlign:"center",padding:"10px 4px",borderRadius:8,
                            background:mDone?"#E8F8F4":mCur?"#FFF5E8":"#F3F4F6",
                          }}>
                            <div style={{fontSize:11,fontWeight:700,color:mDone?"#00735A":mCur?"#A0600D":"#9CA3AF",marginBottom:2}}>W{m.week}</div>
                            <div style={{fontSize:16}}>{mDone?"✓":mCur?"●":"○"}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Submissions({ submissions, gradeSubmission, onPreview }) {
  const [filter, setFilter] = useState("pending");
  const [open, setOpen]     = useState(null);
  const [grades, setGrades]    = useState({});
  const [feedback, setFeedback] = useState({});

  const filtered = (submissions||[]).filter(s=>filter==="all"||s.status===filter);
  const pendingCount = (submissions||[]).filter(s=>s.status==="pending").length;

  const exportExcel = () => {
    const header = ["Student","Module","Week","Task","Task Type","Words","Answer","Grade","Max Score","Feedback","Submitted At","Status"];
    const rows = (submissions||[]).map(s=>[
      s.studentName, s.moduleName, s.moduleWeek, s.taskTitle, s.taskType,
      s.wordCount, (s.answer||"").replace(/,/g," "), s.grade||"", s.maxScore||100,
      (s.feedback||"").replace(/,/g," "),
      s.submittedAt ? new Date(s.submittedAt).toLocaleString() : "",
      s.status,
    ]);
    const tableRows = [header,...rows].map(r=>"<tr>"+r.map(c=>`<td>${String(c||"").replace(/&/g,"&amp;")}</td>`).join("")+"</tr>").join("");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"/></head><body><table border="1">${tableRows}</table></body></html>`;
    const blob = new Blob([html],{type:"application/vnd.ms-excel;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="task_submissions.xls"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="main">
      <InstructorTopBar onPreview={onPreview}/>
      <div className="page-header">
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
          <div>
            <div className="page-eyebrow">Instructor Tools</div>
            <div className="page-title">Submission Inbox</div>
            <div className="page-desc">Task submissions from students · grades in real time</div>
          </div>
          <button onClick={exportExcel} style={{
            display:"flex",alignItems:"center",gap:8,marginTop:4,
            padding:"10px 18px",background:"#1A7A3C",color:"#fff",
            border:"none",borderRadius:8,fontSize:13,fontWeight:700,
            cursor:"pointer",fontFamily:"'Inter',sans-serif",whiteSpace:"nowrap",
          }}>📊 Export to Excel</button>
        </div>
      </div>
      <div className="page-body">

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
          {[
            {n:(submissions||[]).length,  label:"Total submissions",  color:"#003366"},
            {n:pendingCount,               label:"Pending review",     color:"#A0600D"},
            {n:(submissions||[]).filter(s=>s.status==="graded").length, label:"Graded", color:"#00735A"},
          ].map(s=>(
            <div key={s.label} className="stat-card">
              <div className="stat-num" style={{color:s.color}}>{s.n}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{display:"flex",gap:0,marginBottom:20,background:"#fff",borderRadius:10,border:"1px solid #E5E7EB",overflow:"hidden",width:"fit-content"}}>
          {[["pending","Pending"],["graded","Graded"],["all","All"]].map(([val,label])=>(
            <button key={val} onClick={()=>setFilter(val)} style={{
              padding:"10px 22px", background:filter===val?"#003366":"transparent",
              color:filter===val?"#fff":"#6B7E91", border:"none",
              fontSize:14, fontWeight:600, cursor:"pointer",
              fontFamily:"'Inter',sans-serif", transition:"all .12s",
            }}>
              {label}
              {val==="pending" && pendingCount>0 && <span style={{marginLeft:7,background:"#F5A623",color:"#0D1B2A",borderRadius:20,padding:"1px 7px",fontSize:11,fontWeight:700}}>{pendingCount}</span>}
            </button>
          ))}
        </div>

        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"48px 0",color:"#9CA3AF",fontSize:15}}>
            {(submissions||[]).length===0
              ? "No submissions yet. Students will appear here when they submit a task."
              : "No submissions in this category."}
          </div>
        )}

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(s=>{
            const isOpen = open===s.id;
            const localGrade = grades[s.id]!==undefined ? grades[s.id] : (s.grade||"");
            const localFeedback = feedback[s.id]!==undefined ? feedback[s.id] : (s.feedback||"");
            return (
              <div key={s.id} className="card">
                {/* Summary row */}
                <div onClick={()=>setOpen(isOpen?null:s.id)} style={{
                  display:"grid", gridTemplateColumns:"44px 1fr 1fr 120px 110px auto",
                  alignItems:"center", gap:14, padding:"16px 20px", cursor:"pointer",
                }}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:"#EEF3FB",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:"#003366",flexShrink:0}}>
                    {s.studentInitials}
                  </div>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:"#0D1B2A",marginBottom:2}}>{s.studentName}</div>
                    <div style={{fontSize:12,color:"#9CA3AF"}}>Module {s.moduleWeek} · {s.moduleName}</div>
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:"#374151"}}>{s.taskTitle}</div>
                    <div style={{fontSize:11,color:"#9CA3AF"}}>{s.taskType} · {s.wordCount} words</div>
                  </div>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:13,color:"#003366",fontWeight:600}}>
                    {s.grade!=null ? `${s.grade}/${s.maxScore||100}` : <span style={{color:"#9CA3AF"}}>Not graded</span>}
                  </div>
                  <span style={{
                    fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,textAlign:"center",
                    background:s.status==="graded"?"#E8F8F4":"#FFF5E8",
                    color:s.status==="graded"?"#00735A":"#A0600D",
                  }}>{s.status==="graded"?"Graded":"Pending"}</span>
                  <span style={{color:"#9CA3AF",fontSize:18,userSelect:"none"}}>{isOpen?"▲":"▼"}</span>
                </div>

                {/* Expanded grading view */}
                {isOpen && (
                  <div style={{borderTop:"1px solid #F3F4F6",padding:"20px 24px"}}>
                    {/* Student answer */}
                    <div style={{fontSize:12,fontWeight:700,color:"#6B7E91",letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Student answer</div>
                    <div style={{background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:10,padding:"16px 18px",marginBottom:20,fontSize:14,color:"#374151",lineHeight:1.75,whiteSpace:"pre-wrap"}}>
                      {s.answer}
                    </div>

                    {/* Rubric scoring */}
                    {s.rubric && s.rubric.length>0 && (
                      <div style={{marginBottom:20}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#6B7E91",letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Rubric</div>
                        {s.rubric.map((rc,ri)=>(
                          <div key={ri} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 14px",background:"#F9FAFB",borderRadius:8,marginBottom:6}}>
                            <div style={{flex:1}}>
                              <div style={{fontSize:14,fontWeight:600,color:"#0D1B2A"}}>{rc.label}</div>
                              <div style={{fontSize:12,color:"#6B7E91"}}>{rc.desc}</div>
                            </div>
                            <div style={{fontSize:12,color:"#9CA3AF"}}>/{rc.weight} pts</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Grade input */}
                    <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:20,alignItems:"start"}}>
                      <div>
                        <label style={{display:"block",fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#6B7E91",marginBottom:8}}>Grade (out of {s.maxScore||100})</label>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <input type="number" min="0" max={s.maxScore||100} value={localGrade}
                            onChange={e=>setGrades({...grades,[s.id]:e.target.value})}
                            style={{width:80,padding:"10px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:18,fontFamily:"'IBM Plex Mono',monospace",fontWeight:700,color:"#003366",textAlign:"center",outline:"none"}}
                            onFocus={e=>e.target.style.borderColor="#003366"}
                            onBlur={e=>e.target.style.borderColor="#E5E7EB"}
                          />
                          <span style={{fontSize:16,color:"#9CA3AF",fontWeight:600}}>/ {s.maxScore||100}</span>
                        </div>
                      </div>
                      <div>
                        <label style={{display:"block",fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#6B7E91",marginBottom:8}}>Feedback for student</label>
                        <textarea
                          value={localFeedback}
                          onChange={e=>setFeedback({...feedback,[s.id]:e.target.value})}
                          placeholder="Write feedback..."
                          style={{width:"100%",minHeight:80,padding:"10px 13px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:14,fontFamily:"'Inter',sans-serif",color:"#0D1B2A",resize:"vertical",outline:"none",lineHeight:1.6}}
                          onFocus={e=>e.target.style.borderColor="#003366"}
                          onBlur={e=>e.target.style.borderColor="#E5E7EB"}
                        />
                      </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:14}}>
                      <button onClick={()=>{
                        const g = localGrade!==undefined&&localGrade!==""?Number(localGrade):null;
                        gradeSubmission(s.id, g, localFeedback);
                      }} style={{padding:"10px 24px",background:"#003366",color:"#fff",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
                        Submit grade
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


function AdminDashboard() {
  return (
    <div className="main">
      <div className="page-header">
        <div className="page-eyebrow">Administration</div>
        <div className="page-title">Platform Overview</div>
        <div className="page-desc">Bilkent University · AI for University Students · All cohorts</div>
      </div>
      <div className="page-body">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num teal">0</div><div className="stat-label">Active learners</div></div>
          <div className="stat-card"><div className="stat-num">2</div><div className="stat-label">Instructors</div></div>
          <div className="stat-card"><div className="stat-num amber">0</div><div className="stat-label">Active cohorts</div></div>
          <div className="stat-card"><div className="stat-num">12%</div><div className="stat-label">Avg completion</div></div>
        </div>
        <div className="grid-2">
          <div className="card">
            <div className="card-head"><span className="card-head-title">Active cohorts</span></div>
            <div style={{padding:"16px 20px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:4,color:"#9CA3AF",fontStyle:"italic"}}>No cohorts created yet</div>
                  <div style={{fontSize:12,color:"#9CA3AF"}}>Add users to create a cohort</div>
                </div>
                <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:"#E8F8F4",color:"#00735A"}}>Active</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><span className="card-head-title">System status</span></div>
            <div style={{padding:"14px 20px"}}>
              {[["Database","Supabase PostgreSQL","✓"],["Auth","Supabase Auth","✓"],["Storage","Supabase Storage","✓"],["Hosting","Vercel","✓"]].map(([k,v,s])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #F3F4F6",fontSize:13}}>
                  <span style={{color:"#6B7E91"}}>{k}</span>
                  <span style={{color:"#0D1B2A",fontSize:12}}>{v}</span>
                  <span style={{color:"#00735A",fontWeight:700,fontSize:12}}>{s} Connected</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserManagement({ users, saveUsers }) {
  const [showAdd, setShowAdd] = useState(false);
  const [nName,     setNName]     = useState("");
  const [nEmail,    setNEmail]    = useState("");
  const [nPassword, setNPassword] = useState("");
  const [nRole,     setNRole]     = useState("learner");
  const [nCohort,   setNCohort]   = useState("2026-Fall");
  const [addError,  setAddError]  = useState("");
  const [csvMsg,    setCsvMsg]    = useState("");

  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = ev.target.result.split(/\r?\n/).filter(l=>l.trim());
      // Expected columns: name, email, password, role, cohort (header row optional)
      const isHeader = lines[0].toLowerCase().includes("name") || lines[0].toLowerCase().includes("email");
      const dataLines = isHeader ? lines.slice(1) : lines;
      let added=0, skipped=0;
      const next = [...users];
      dataLines.forEach(line=>{
        const parts = line.split(",").map(p=>p.trim().replace(/^"|"$/g,""));
        const [name,email,password,role,cohort] = parts;
        if (!name||!email||!password) { skipped++; return; }
        if (next.find(u=>u.email.toLowerCase()===email.toLowerCase())) { skipped++; return; }
        next.push({
          id:Date.now()+Math.random(),
          name, email, password,
          role: ["learner","instructor","admin"].includes(role) ? role : "learner",
          cohort: cohort||"2026-Fall",
          progress: (role==="instructor"||role==="admin") ? null : 0,
        });
        added++;
      });
      saveUsers(next);
      setCsvMsg(`Done. ${added} users added, ${skipped} skipped (missing fields or duplicate email).`);
    };
    reader.readAsText(file);
    e.target.value="";
  };

  const addUser = () => {
    if (!nName.trim() || !nEmail.trim() || !nPassword.trim()) {
      setAddError("Name, email, and password are all required.");
      return;
    }
    if (users.find(u => u.email.toLowerCase() === nEmail.trim().toLowerCase())) {
      setAddError("A user with that email already exists.");
      return;
    }
    const next = [...users, {
      id: Date.now(),
      name: nName.trim(),
      email: nEmail.trim(),
      password: nPassword.trim(),
      role: nRole,
      cohort: nCohort,
      progress: nRole === "learner" ? 0 : null,
    }];
    saveUsers(next);
    setNName(""); setNEmail(""); setNPassword(""); setNRole("learner"); setAddError(""); setShowAdd(false);
  };

  const removeUser = (id) => {
    saveUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="main">
      <div className="page-header">
        <div className="page-eyebrow">Administration</div>
        <div className="page-title">User Management</div>
        <div className="page-desc">Create and manage learners, instructors, and admins</div>
      </div>
      <div className="page-body">
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
          {csvMsg && <span style={{fontSize:12,color:"#00735A",background:"#E8F8F4",padding:"6px 12px",borderRadius:7,fontWeight:600}}>{csvMsg}</span>}
          <label style={{
            display:"flex",alignItems:"center",gap:7,
            padding:"9px 18px",background:"#fff",border:"1.5px solid #E5E7EB",
            borderRadius:8,fontSize:14,fontWeight:600,color:"#0D1B2A",cursor:"pointer",
            fontFamily:"'Inter',sans-serif",
          }}>
            📥 Upload CSV
            <input type="file" accept=".csv" style={{display:"none"}} onChange={handleCSV}/>
          </label>
          <button className="btn-teal" onClick={()=>{setShowAdd(!showAdd);setAddError("");}}>+ Add user</button>
        </div>

        <div style={{background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:8,padding:"10px 16px",marginBottom:16,fontSize:12,color:"#6B7E91",lineHeight:1.6}}>
          CSV format: <strong>name, email, password, role, cohort</strong> — one user per row. Header row is optional. Role must be learner, instructor, or admin. Example: <em>Ayşe Kaya, ayse@bilkent.edu.tr, pass123, learner, 2026-Fall</em>
        </div>

        {showAdd && (
          <div className="add-user-card" style={{marginBottom:18}}>
            <div style={{fontSize:15,fontWeight:700,color:"#0D1B2A",marginBottom:16}}>New user</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
              <div>
                <label className="editor-label">Full name</label>
                <input className="editor-input" value={nName} onChange={e=>setNName(e.target.value)} placeholder="Full name"/>
              </div>
              <div>
                <label className="editor-label">Email</label>
                <input className="editor-input" value={nEmail} onChange={e=>setNEmail(e.target.value)} placeholder="name@bilkent.edu.tr"/>
              </div>
              <div>
                <label className="editor-label">Password</label>
                <input className="editor-input" type="text" value={nPassword} onChange={e=>setNPassword(e.target.value)} placeholder="Set a password"/>
              </div>
              <div>
                <label className="editor-label">Role</label>
                <select className="editor-input" value={nRole} onChange={e=>setNRole(e.target.value)}>
                  <option value="learner">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="editor-label">Cohort</label>
                <input className="editor-input" value={nCohort} onChange={e=>setNCohort(e.target.value)} placeholder="e.g. 2026-Fall"/>
              </div>
            </div>
            {addError && (
              <div style={{background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#DC2626",marginBottom:12}}>{addError}</div>
            )}
            <div style={{display:"flex",gap:10}}>
              <button className="save-btn" onClick={addUser}>Create user</button>
              <button className="btn-ghost" onClick={()=>{setShowAdd(false);setAddError("");}}>Cancel</button>
            </div>
          </div>
        )}

        <div className="card">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Cohort</th>
                <th>Progress</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id}>
                  <td style={{fontWeight:600}}>{u.name}</td>
                  <td style={{color:"#6B7E91",fontSize:12}}>{u.email}</td>
                  <td style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:"#9CA3AF"}}>{u.password}</td>
                  <td><span className={`role-badge badge-${u.role}`}>{u.role}</span></td>
                  <td style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6B7E91"}}>{u.cohort}</td>
                  <td>
                    {u.progress !== null
                      ? <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div className="bar-wrap"><div className="bar-fill" style={{width:`${u.progress}%`}}/></div>
                          <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:"#6B7E91"}}>{u.progress}%</span>
                        </div>
                      : <span style={{color:"#9CA3AF",fontSize:12}}>n/a</span>
                    }
                  </td>
                  <td>
                    {u.role !== "admin" || users.filter(x=>x.role==="admin").length > 1
                      ? <button className="btn-danger" onClick={()=>removeUser(u.id)}>Remove</button>
                      : <span style={{fontSize:11,color:"#9CA3AF"}}>protected</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Analytics({ users }) {
  const COHORTS = [
    "2026 Fall","2027 Spring","2027 Summer","2027 Fall",
    "2028 Spring","2028 Summer","2028 Fall",
    "2029 Spring","2029 Summer","2029 Fall",
  ];
  const [selectedCohort, setSelectedCohort] = useState("2026 Fall");

  // Build module completion data dynamically from real users in the selected cohort
  const cohortUsers = users.filter(u=>u.role==="learner" && (u.cohort||"").replace("-"," ")===selectedCohort);
  const enrolled = cohortUsers.length;

  const moduleGroups = [
    {name:"Module 1 — The AI Moment",        weeks:"Week 1",   mod:1},
    {name:"Module 2 — History of AI",        weeks:"Week 2",   mod:2},
    {name:"Module 3 — What AI Is Not",       weeks:"Week 3",   mod:3},
    {name:"Module 4 — How Machines Learn",   weeks:"Week 4",   mod:4},
    {name:"Module 5 — Language Models",      weeks:"Week 5",   mod:5},
    {name:"Module 6 — Images & Audio",       weeks:"Week 6",   mod:6},
    {name:"Module 7 — Midterm",              weeks:"Week 7",   mod:7},
    {name:"Module 8 — AI & Labor",           weeks:"Week 8",   mod:8},
    {name:"Module 9 — Bias & Fairness",      weeks:"Week 9",   mod:9},
    {name:"Module 10 — Misinformation",      weeks:"Week 10",  mod:10},
    {name:"Module 11 — AI & Policy",         weeks:"Week 11",  mod:11},
    {name:"Module 12 — AI in Your Field",    weeks:"Week 12",  mod:12},
    {name:"Module 13 — Responsible Use",     weeks:"Week 13",  mod:13},
    {name:"Module 14 — Final Presentations", weeks:"Week 14",  mod:14},
  ];

  // For each module calculate average completion across cohort users
  const moduleCompletion = moduleGroups.map(g=>{
    if(!enrolled) return {...g, pct:0};
    const completedCount = cohortUsers.filter(u=>{
      const done = Math.round(((u.progress||0)/100)*14);
      return done >= g.mod;
    }).length;
    return {...g, pct: Math.round((completedCount/enrolled)*100)};
  });

  const avgOverall = enrolled
    ? Math.round(cohortUsers.reduce((s,u)=>s+(u.progress||0),0)/enrolled)
    : 0;

  return (
    <div className="main">
      <div className="page-header">
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
          <div>
            <div className="page-eyebrow">Administration</div>
            <div className="page-title">Course Analytics</div>
            <div className="page-desc">Module completion data by cohort</div>
          </div>
          {/* Cohort selector */}
          <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:4}}>
            <label style={{fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"#6B7E91"}}>Cohort</label>
            <select value={selectedCohort} onChange={e=>setSelectedCohort(e.target.value)} style={{
              padding:"10px 14px",borderRadius:8,border:"1.5px solid #E5E7EB",
              fontSize:15,fontFamily:"'Inter',sans-serif",color:"#003366",
              fontWeight:600,cursor:"pointer",background:"#fff",
            }}>
              {COHORTS.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num" style={{color:"#003366"}}>{enrolled}</div><div className="stat-label">Enrolled learners</div></div>
          <div className="stat-card"><div className="stat-num amber">{avgOverall}%</div><div className="stat-label">Avg overall completion</div></div>
          <div className="stat-card"><div className="stat-num">{cohortUsers.filter(u=>(u.progress||0)>=50).length}</div><div className="stat-label">Past 50% complete</div></div>
          <div className="stat-card"><div className="stat-num" style={{color:"#CC0000"}}>{cohortUsers.filter(u=>!(u.progress||0)).length}</div><div className="stat-label">Not started</div></div>
        </div>

        <div className="card">
          <div className="card-head">
            <span className="card-head-title">Module completion — {selectedCohort} cohort</span>
            {!enrolled && <span style={{fontSize:13,color:"#9CA3AF",fontStyle:"italic"}}>No learners in this cohort yet</span>}
          </div>
          <div style={{padding:"20px 24px"}}>
            {moduleCompletion.map(p=>(
              <div key={p.name} style={{marginBottom:18}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:"#0D1B2A"}}>{p.name}</div>
                    <div style={{fontSize:12,color:"#6B7E91"}}>{p.weeks}</div>
                  </div>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:16,color:"#003366",fontWeight:600}}>{p.pct}%</span>
                </div>
                <div style={{height:10,background:"#E5E7EB",borderRadius:5,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${p.pct}%`,background: p.pct>=75?"#003366":p.pct>0?"#CC0000":"#E5E7EB",borderRadius:5,transition:"width .3s"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user,        setUser]        = useState(null);
  const [view,        setView]        = useState("dashboard");
  const [mod,         setMod]         = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Task submissions — persisted in localStorage. Students write, instructors grade.
  const [submissions, setSubmissions] = useState(() => {
    try { const s = localStorage.getItem("ai_course_submissions"); if(s) return JSON.parse(s); } catch(e) {}
    return [];
  });
  const addSubmission = (sub) => {
    setSubmissions(prev => {
      const next = [...prev, sub];
      try { localStorage.setItem("ai_course_submissions", JSON.stringify(next)); } catch(e) {}
      return next;
    });
  };
  const gradeSubmission = (id, grade, feedback) => {
    setSubmissions(prev => {
      const next = prev.map(s => s.id===id ? {...s, grade, feedback, status:"graded"} : s);
      try { localStorage.setItem("ai_course_submissions", JSON.stringify(next)); } catch(e) {}
      return next;
    });
  };

  // Users — persisted in localStorage. Admin is the only seed account.
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("ai_course_users");
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return INITIAL_USERS;
  });

  const saveUsers = (next) => {
    try { localStorage.setItem("ai_course_users", JSON.stringify(next)); } catch(e) {}
    setUsers(next);
  };

  // Modules — persisted in localStorage.
  const [modules, setModules] = useState(() => {
    try {
      const saved = localStorage.getItem("ai_course_modules");
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return INITIAL_MODULES;
  });

  const updateModule = (updatedMod) => {
    setModules(prev => {
      const next = prev.map(m => m.id === updatedMod.id ? updatedMod : m);
      try { localStorage.setItem("ai_course_modules", JSON.stringify(next)); } catch(e) {}
      return next;
    });
    if (mod && mod.id === updatedMod.id) setMod(updatedMod);
  };

  const deleteModule = (id) => {
    setModules(prev => {
      const next = prev.filter(m => m.id !== id).map((m, i) => ({ ...m, week: i + 1 }));
      try { localStorage.setItem("ai_course_modules", JSON.stringify(next)); } catch(e) {}
      return next;
    });
  };

  const reorderModules = (newOrder) => {
    const reindexed = newOrder.map((m, i) => ({ ...m, week: i + 1 }));
    setModules(reindexed);
    try { localStorage.setItem("ai_course_modules", JSON.stringify(reindexed)); } catch(e) {}
  };

  if (!user) return <><style>{css}</style><AuthScreen onLogin={u=>{setUser(u);setView("dashboard");}} users={users}/></>;

  const go = v => { setView(v); };

  const enterPreview = () => { setPreviewMode(true);  setView("dashboard"); setMod(null); };
  const exitPreview  = () => { setPreviewMode(false); setView("dashboard"); setMod(null); };

  const effectiveRole = previewMode ? "learner" : user.role;

  const renderMain = () => {
    if (effectiveRole === "learner") {
      if (view==="moduleDetail" && mod) return <ModuleDetail mod={mod} setView={go} user={user} addSubmission={addSubmission}/>;
      if (view==="modules")  return <ModuleList modules={modules} setView={go} setMod={setMod}/>;
      if (view==="progress") return <LearnerProgress modules={modules}/>;
      return <LearnerDashboard modules={modules} user={user} setView={go} setMod={setMod}/>;
    }
    if (user.role === "instructor") {
      if (view==="editor")      return <ModuleEditor      modules={modules} updateModule={updateModule} deleteModule={deleteModule} reorderModules={reorderModules} onPreview={enterPreview}/>;
      if (view==="students")    return <StudentProgress   users={users} onPreview={enterPreview}/>;
      if (view==="submissions") return <Submissions       submissions={submissions} gradeSubmission={gradeSubmission} onPreview={enterPreview}/>;
      return <InstructorDashboard user={user} users={users} onPreview={enterPreview}/>;
    }
    if (user.role === "admin") {
      if (view==="users")     return <UserManagement users={users} saveUsers={saveUsers}/>;
      if (view==="analytics") return <Analytics users={users}/>;
      return <AdminDashboard/>;
    }
  };

  // Fake learner user object for sidebar when previewing
  const sidebarUser = previewMode
    ? { ...user, role:"learner", name: user.name + " (preview)" }
    : user;

  return (
    <><style>{css}</style>
    <div className="shell">
      <Sidebar
        user={sidebarUser}
        view={view}
        setView={go}
        onLogout={previewMode ? exitPreview : ()=>{setUser(null);setView("dashboard");setMod(null);}}
      />
      <div style={{display:"flex",flexDirection:"column",width:"100%",minWidth:0,overflow:"hidden"}}>
        {/* Preview banner */}
        {previewMode && (
          <div style={{
            background:"#0056D2", color:"#fff",
            padding:"9px 32px", display:"flex",
            alignItems:"center", justifyContent:"space-between",
            fontSize:13, fontWeight:500, zIndex:10,
          }}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:16}}>👁</span>
              <span>You are previewing the course as a student. This is exactly what your students see.</span>
            </div>
            <button onClick={exitPreview} style={{
              padding:"7px 16px", background:"rgba(255,255,255,.2)",
              color:"#fff", border:"1px solid rgba(255,255,255,.4)",
              borderRadius:7, fontSize:12, fontWeight:700,
              cursor:"pointer", fontFamily:"'Inter',sans-serif",
            }}>Exit preview</button>
          </div>
        )}
        {renderMain()}
      </div>
    </div></>
  );
}
