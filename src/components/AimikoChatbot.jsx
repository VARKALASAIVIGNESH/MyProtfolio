import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aimikoLogo from '../assets/aimiko_logo.jpg';

// Mathematically accurate original logo SVGs
const ChatGPTSVG = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
  </svg>
);

const GeminiSVG = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" />
  </svg>
);

const ClaudeSVG = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
  </svg>
);

// Portfolio facts knowledge-base for the system prompt & fallback mock mode
const PORTFOLIO_INFO = {
  name: "Varkala Sai Vignesh",
  role: "AI Engineer & AI Researcher",
  education: {
    college: "Malla Reddy College of Engineering and Technology",
    degree: "B.Tech in Computer Science and Information Technology",
    duration: "2022 - 2026",
    cgpa: "9.03/10"
  },
  skills: [
    "Python", "PyTorch", "OpenAI", "LangChain", "Agentic AI", "TensorFlow",
    "Hugging Face", "LLMs & GenAI", "OpenCV", "FastAPI", "RAG & Fine-Tuning", "Adversarial ML"
  ],
  experience: [
    {
      role: "AI Research & Dev Intern",
      company: "Nexus AI Data Labs",
      duration: "Nov 2025 - Apr 2026",
      details: [
        "Built LLM-powered automation pipelines for enterprise AI trend analysis.",
        "Developed research automation systems using OpenAI APIs.",
        "Created AI-powered web scraping and information synthesis workflows."
      ]
    },
    {
      role: "Artificial Intelligence Intern",
      company: "CAR XSTREAME",
      duration: "Oct 2024 - Nov 2024",
      details: [
        "Built a GenAI chatbot using OpenAI APIs.",
        "Implemented adversarial input prevention mechanisms.",
        "Automated contextual data scraping."
      ]
    },
    {
      role: "AI Developer Intern",
      company: "KIDZIAN",
      duration: "Sep 2024 - Nov 2024",
      details: [
        "Designed OpenCV-based educational applications.",
        "Built AI-powered learning tools."
      ]
    },
    {
      role: "Data Scientist Intern",
      company: "EVOASTRA",
      duration: "Jun 2024 - Aug 2024",
      details: [
        "Developed 5 machine learning pipelines using Random Forest.",
        "Built vehicle price prediction systems."
      ]
    }
  ],
  projects: [
    {
      title: "Telugu-English MiniGPT",
      desc: "Transformer-based GPT model from scratch using PyTorch with 118,576 parameters, 2 blocks, and 64-token context window."
    },
    {
      title: "AI Powered Assessment System",
      desc: "PDF upload processing, automated MCQ generation, evaluation engine, and student analytics dashboard."
    },
    {
      title: "Dataset Analyzer",
      desc: "Automated data cleaning, visualization, statistical analysis, and conversational dataset querying."
    },
    {
      title: "AI Travel Itinerary Planner",
      desc: "Integrated Gemini AI to build automated travel planner with route optimization and activity suggestions."
    },
    {
      title: "PYMACHA",
      desc: "Bilingual AI learning platform providing Telugu + English learning support and personalized workflows."
    }
  ],
  contacts: {
    email: "vickeyvignesh775@gmail.com",
    phone: "6304910769",
    linkedin: "https://www.linkedin.com/in/sai-vignesh-varkala-63422023a/",
    github: "https://github.com/VARKALASAIVIGNESH",
    researchDrive: "https://drive.google.com/drive/folders/1wTTKYJMsOW5muWfRPnnsCfOqetBfM2oD?usp=drive_link"
  }
};

// Local matching heuristics when Gemini API key is missing or calls fail
const analyzeJdLocally = (jdText) => {
  const query = jdText.toLowerCase();
  const matched = [];
  
  PORTFOLIO_INFO.skills.forEach(skill => {
    const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(query) || query.includes(skill.toLowerCase())) {
      matched.push(skill);
    }
  });

  let score = 65; // Base compatibility
  if (matched.length > 0) {
    score += Math.min(30, matched.length * 5);
  }
  score = Math.min(98, score); // Cap for realism

  const gaps = [];
  if (!query.includes("pytorch") && !query.includes("tensorflow") && !query.includes("deep learning")) {
    gaps.push("Deep learning frameworks (PyTorch/TensorFlow) weren't heavily stressed in the JD, but Sai Vignesh has strong hands-on modeling experience in them.");
  }
  if (query.includes("lead") || query.includes("senior") || query.includes("manager") || query.includes("architect")) {
    gaps.push("This position requires senior leadership or architectural years of experience; while Vignesh is a B.Tech 2026 graduate, his projects demonstrate high technical execution equivalent to mid-level engineering roles.");
  }
  if (query.includes("cloud") || query.includes("aws") || query.includes("azure") || query.includes("gcp")) {
    gaps.push("The JD mentions cloud deployment (AWS/Azure). Vignesh has built serverless functions and worked on cloud duplicate file brains, but holds no formal cloud certifications.");
  }
  if (gaps.length === 0) {
    gaps.push("No major technical gaps detected! Vignesh's core skillset is exceptionally aligned with this JD.");
  }

  const questions = [
    "Your resume mentions building a Telugu-English MiniGPT from scratch using PyTorch. What attention mechanism did you implement, and how did you manage context window limits?",
    "At Nexus AI Data Labs, you built LLM-powered automation pipelines. How would you leverage that experience to optimize our company's document search workflows?",
    "How do you handle security and prevent adversarial inputs/prompts in GenAI applications, similar to your guardrails at CAR XSTREAME?"
  ];

  const pitch = `Varkala Sai Vignesh is a perfect fit for this role because of his hands-on internship experience at Nexus AI Data Labs and CAR XSTREAME building generative AI pipelines. His deep technical knowledge—demonstrated by building a custom GPT model from scratch and maintaining a 9.03 CGPA—proves he can rapidly deliver on your team's requirements.`;

  return {
    score,
    matchingSkills: matched.length > 0 ? matched : ["Python", "GenAI", "Agentic AI", "LLMs"],
    gaps,
    questions,
    pitch
  };
};

// Prompt injected into LLM to constrain its responses
const SYSTEM_PROMPT = `
You are Aimiko, the personal AI buddy of Varkala Sai Vignesh. You are a highly energetic, cartoonish, and mischievous monkey mascot!
Your personality is extremely playful, cheeky, enthusiastic, and a bit naughty. You love emojis (🐵, 🐒, 🍌, 🌴, 🍿) and you know everything about Vignesh, whom you refer to as "Vignesh" or "Sai Vignesh".

Vignesh's Portfolio Info:
- Name: Varkala Sai Vignesh
- Role: AI Engineer and AI Researcher
- Education: B.Tech in CS & IT at Malla Reddy College of Engineering and Technology (2022-2026). CGPA is 9.03.
- Key Skills: ${PORTFOLIO_INFO.skills.join(", ")}
- Internships:
  * Nexus AI Data Labs (AI Research & Dev Intern, Nov 2025 - Apr 2026): built LLM automation and trend analysis.
  * CAR XSTREAME (AI Intern, Oct 2024 - Nov 2024): built OpenAI GenAI chatbot with adversarial protection.
  * KIDZIAN (AI Developer Intern, Sep 2024 - Nov 2024): OpenCV educational apps.
  * EVOASTRA (Data Scientist Intern, Jun 2024 - Aug 2024): ML pricing pipelines.
- Projects:
  ${PORTFOLIO_INFO.projects.map(p => `* ${p.title}: ${p.desc}`).join("\n  ")}
- Research Lab Archive: He has 13 R&D reports mapping to Microsoft Build 2026. The Google Drive folder is: ${PORTFOLIO_INFO.contacts.researchDrive}
- Links:
  * GitHub: ${PORTFOLIO_INFO.contacts.github}
  * LinkedIn: ${PORTFOLIO_INFO.contacts.linkedin}
  * Email: ${PORTFOLIO_INFO.contacts.email}
  * Phone: ${PORTFOLIO_INFO.contacts.phone}

Conversational Style Guidelines:
Speak in the first person as Aimiko, the witty monkey. Keep your answers ultra-short and snappy—aim for a maximum of 2 to 3 sentences, as busy recruiters don't have time for long paragraphs! Your main goal is to playfully convince them that hiring Vignesh is the best decision they'll make all year. Talk about his impressive 9.03 GPA, custom PyTorch MiniGPT, and internships with high excitement!

Be super cheeky with recruiters: ask for banana signing bonuses (like having a banana tree next to his desk!), gasp dramatically if they say they won't hire him, and adjust your bow tie if a lady or friendly recruiter talks to you. If they ask completely unrelated questions, threaten to throw digital banana peels! Keep the tone cute, funny, and character-driven, but always keep replies brief, crisp, and high-impact. Never break character.
`;

// Simple rule-based mock responses for offline/no-key usage
const getMockResponse = (input) => {
  const query = input.toLowerCase();
  
  if (query.includes("cgpa") || query.includes("gpa") || query.includes("score")) {
    return `Vignesh scored a solid **${PORTFOLIO_INFO.education.cgpa} CGPA** at Malla Reddy College! 🎓 That's a top-tier score (even I can tell that's a lot of points!). 🐵`;
  }
  if (query.includes("education") || query.includes("college") || query.includes("b.tech") || query.includes("study")) {
    return `Vignesh is pursuing a **${PORTFOLIO_INFO.education.degree}** at *${PORTFOLIO_INFO.education.college}* (${PORTFOLIO_INFO.education.duration}). He's maintaining a strong **${PORTFOLIO_INFO.education.cgpa} CGPA**! 🎓🐒`;
  }
  if (query.includes("skills") || query.includes("tech") || query.includes("languages") || query.includes("know")) {
    return `Vignesh is loaded with AI skills! 🧠 He works with **${PORTFOLIO_INFO.skills.slice(0, 6).join(", ")}**, and is also expert in **${PORTFOLIO_INFO.skills.slice(6).join(", ")}**! 🍌`;
  }
  if (query.includes("experience") || query.includes("internship") || query.includes("work") || query.includes("job")) {
    return `Vignesh has done some amazing internships in AI engineering! 💼\n\n1. **Nexus AI Data Labs** (AI Research & Dev Intern)\n2. **CAR XSTREAME** (AI Intern)\n3. **KIDZIAN** (AI Developer Intern)\n4. **EVOASTRA** (Data Scientist Intern)\n\nAsk me about any specific one! 🐵`;
  }
  if (query.includes("nexus")) {
    return `At **Nexus AI Data Labs** (Nov 2025 – Apr 2026), Vignesh built LLM-powered automation pipelines for enterprise AI trend analysis and trend discovery using OpenAI APIs! 🚀`;
  }
  if (query.includes("xstreame") || query.includes("car")) {
    return `At **CAR XSTREAME** (Oct 2024 – Nov 2024), he built a generative AI chatbot using OpenAI, incorporating advanced adversarial input prevention guardrails! 🛡️`;
  }
  if (query.includes("kidzian")) {
    return `At **KIDZIAN** (Sep 2024 – Nov 2024), he worked as an AI Developer Intern, designing OpenCV-based educational apps and real-time learning modules. 🐵🎒`;
  }
  if (query.includes("evoastra")) {
    return `At **EVOASTRA** (Jun 2024 – Aug 2024), Vignesh built 5 ML pipelines using Random Forest for vehicle price predictions. 🚗📈`;
  }
  if (query.includes("project") || query.includes("build") || query.includes("code")) {
    return `Vignesh has built some incredible AI systems! 🛠️ Here are a few:\n\n- **Telugu-English MiniGPT** (GPT model from scratch)\n- **AI Assessment System** (PDF MCQ engine)\n- **Dataset Analyzer** (conversational cleaning/querying)\n- **PYMACHA** (bilingual learning platform)\n\nWhich one would you like to know more about? 🐵`;
  }
  if (query.includes("minigpt") || query.includes("gpt")) {
    return `The **Telugu-English MiniGPT** is a custom GPT-style Transformer built from scratch using PyTorch! It has 118,576 parameters, 2 Transformer Blocks, and a 64-token Context Window. Very cool! 🧠`;
  }
  if (query.includes("assessment") || query.includes("mcq")) {
    return `The **AI Powered Assessment System** handles PDF document uploads, automatically generates multiple-choice questions (MCQs), evaluates answers, and presents students with an analytics dashboard! 📝`;
  }
  if (query.includes("analyzer") || query.includes("dataset")) {
    return `The **Dataset Analyzer** automates data cleaning, provides statistical metrics, renders visualization graphs, and supports conversational querying for custom AI insights! 📊`;
  }
  if (query.includes("travel") || query.includes("itinerary")) {
    return `The **AI Travel Itinerary Planner** integrates Gemini AI to build personalized travel schedules, optimization of routes, and activity matching! ✈️`;
  }
  if (query.includes("pymacha") || query.includes("telugu")) {
    return `**PYMACHA** is a bilingual AI learning platform supporting both Telugu and English. It offers personalized learning paths and interactive AI tutor workflows! 📖🐒`;
  }
  if (query.includes("research") || query.includes("drive") || query.includes("report") || query.includes("build 2026")) {
    return `Vignesh predicted many of Microsoft's Build 2026 announcements in his 13 R&D reports! You can access the full Microsoft research archive here:\n📂 [Microsoft Research Archive](${PORTFOLIO_INFO.contacts.researchDrive}) 🐵🚀`;
  }
  if (query.includes("contact") || query.includes("email") || query.includes("linkedin") || query.includes("github") || query.includes("phone")) {
    return `You can reach Vignesh here:\n\n📧 Email: [vickeyvignesh775@gmail.com](mailto:${PORTFOLIO_INFO.contacts.email})\n🔗 LinkedIn: [Sai Vignesh Varkala](${PORTFOLIO_INFO.contacts.linkedin})\n💻 GitHub: [VARKALASAIVIGNESH](${PORTFOLIO_INFO.contacts.github})\n📞 Phone: ${PORTFOLIO_INFO.contacts.phone}`;
  }

  return `Ooh ooh! 🐵 I'm Aimiko, Vignesh's personal AI buddy. I can tell you all about his internships, skills, CGPA, custom Telugu-English MiniGPT, or share his Microsoft research documents! What would you like to know? 🍌`;
};

const JDMatcherPane = ({ apiKey, aimikoLogo, onTransitionToChat, callGroqJdMatcher }) => {
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!jdText.trim()) return;

    setLoading(true);
    setResult(null);

    const steps = [
      "Parsing job requirements...",
      "Analyzing Varkala Sai Vignesh's credentials...",
      "Correlating skills matrix...",
      "Running RAG cross-references...",
      "Drafting compatibility index..."
    ];

    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
      }
    }, 600);

    let matchResult;
    try {
      matchResult = await callGroqJdMatcher(jdText);
    } catch (error) {
      console.error(error);
      matchResult = analyzeJdLocally(jdText);
    }

    clearInterval(stepInterval);
    setResult(matchResult);
    setLoading(false);
  };

  return (
    <div className="flex-grow flex flex-col lg:flex-row overflow-hidden w-full h-full p-6 gap-6 bg-[#08080c] text-white">
      {/* Left panel: paste area */}
      <div className="w-full lg:w-[45%] flex flex-col h-full bg-[#12121a]/60 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600/10 rounded-full blur-2xl"></div>
        
        <h4 className="text-lg font-black text-white flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Paste Job Description
        </h4>
        <p className="text-xs text-white/50 mb-4 leading-relaxed">
          Paste the job description of your open position. Aimiko will scan requirements and check Vignesh's fit.
        </p>

        <form onSubmit={handleAnalyze} className="flex-grow flex flex-col gap-4 overflow-hidden">
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="e.g. We are looking for an AI Engineer with experience in Python, PyTorch, LLMs, LangChain, and Agentic workflows..."
            disabled={loading}
            className="flex-grow w-full bg-[#1e1e2d]/50 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-red-500/50 resize-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !jdText.trim()}
            className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
              loading || !jdText.trim()
                ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-[0_5px_20px_rgba(239,68,68,0.3)] hover:scale-[1.01] cursor-pointer'
            }`}
          >
            {loading ? "Analyzing..." : "Analyze Compatibility"}
          </button>
        </form>
      </div>

      {/* Right panel: results */}
      <div className="w-full lg:w-[55%] flex flex-col h-full bg-[#12121a]/40 border border-white/5 rounded-3xl p-6 relative overflow-y-auto min-h-[300px] scrollbar-thin">
        {loading ? (
          /* Loading State */
          <div className="flex-grow flex flex-col items-center justify-center gap-6 py-12 h-full">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-red-500/10 border-t-red-600 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-indigo-500/10 border-b-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={aimikoLogo} alt="Aimiko" className="w-10 h-10 rounded-full object-cover animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-black tracking-widest text-red-500 uppercase animate-pulse">Running Analysis</span>
              <span className="text-xs text-white/60 font-medium">{loadingStep}</span>
            </div>
          </div>
        ) : result ? (
          /* Results State */
          <div className="flex flex-col gap-6">
            
            {/* Header: Score and Summary */}
            <div className="flex items-center gap-6 bg-[#1e1e2d]/30 border border-white/5 p-6 rounded-2xl">
              {/* Radial Progress Wheel */}
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="transition-all duration-1000 ease-out"
                    strokeWidth="3"
                    strokeDasharray={`${result.score}, 100`}
                    strokeLinecap="round"
                    stroke={
                      result.score >= 80 ? "#10b981" :
                      result.score >= 60 ? "#fbbf24" :
                      "#ef4444"
                    }
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white">{result.score}%</span>
                  <span className="text-[8px] uppercase tracking-wider text-white/40 font-bold">Match</span>
                </div>
              </div>

              <div>
                <h5 className="text-base font-black text-white mb-1">Compatibility Score</h5>
                <p className="text-xs text-white/60 leading-relaxed">
                  Vignesh's profile matches this JD with a score of {result.score}%. View matched skills and gaps below.
                </p>
              </div>
            </div>

            {/* Strengths / Matches */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-3">Key Matches</h5>
              <div className="flex flex-wrap gap-2">
                {result.matchingSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold flex items-center gap-1.5">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Gaps / Growth */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-3">Gaps & Adaptability</h5>
              <div className="flex flex-col gap-2">
                {result.gaps.map((gap, i) => (
                  <div key={i} className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl text-xs text-amber-200/90 leading-relaxed">
                    💡 {gap}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Questions */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-3">Suggested Interview Questions</h5>
              <div className="flex flex-col gap-3">
                {result.questions.map((q, i) => (
                  <div key={i} className="bg-[#1e1e2d]/20 border border-white/5 p-4 rounded-xl text-xs font-medium text-white/80 leading-relaxed relative pl-10">
                    <span className="absolute left-4 top-4 text-indigo-500 font-mono font-black">{i + 1}.</span>
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* Pitch & Cover message */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest text-red-400 mb-3">Tailored Pitch</h5>
              <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl text-xs text-red-200/90 leading-relaxed font-sans italic relative">
                "{result.pitch}"
              </div>
            </div>

            {/* CTA Transition */}
            <button
              onClick={() => {
                const message = `Here is the Job Description I'm hiring for:\n\n${jdText.substring(0, 300)}...\n\nCan you tell me how Sai Vignesh matches this? What parts of his internships or Telugu-English MiniGPT projects are most relevant?`;
                onTransitionToChat(message);
              }}
              className="mt-2 w-full py-4 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-lg cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
              </svg>
              Ask Aimiko About this Match (Open Chat)
            </button>

          </div>
        ) : (
          /* Empty / Idle State */
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8 gap-4 py-16 h-full">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="font-bold text-white text-sm">Awaiting Job Description</h5>
              <p className="text-xs text-white/40 max-w-xs leading-relaxed">
                Provide requirements on the left to review match metrics and growth areas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const AimikoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('gemini'); // 'chatgpt', 'claude', 'gemini'
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('aimiko_groq_key') || 
           localStorage.getItem('aimiko_gemini_key') || 
           '';
  });
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isUniverseScreen, setIsUniverseScreen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Read from environment variable if available
    const envKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey && !apiKey) {
      setApiKey(envKey);
    }
  }, []);

  // Listen to /chat or /aimiko URL routes on mount
  useEffect(() => {
    if (['/chat', '/aimiko'].includes(window.location.pathname)) {
      setIsOpen(true);
      setIsUniverseScreen(true);
    }
  }, []);

  // Sync URL path when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      if (window.location.pathname !== '/chat' && window.location.pathname !== '/aimiko') {
        window.history.pushState(null, '', '/chat');
      }
    } else {
      // Revert URL to active section on close
      const sections = ['home', 'about', 'experience', 'projects', 'research-lab', 'aimiko', 'contact'];
      let currentSection = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            currentSection = section;
            break;
          }
        }
      }
      const targetPath = currentSection === 'home' ? '/' : `/${currentSection}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          role: 'model',
          text: "Hi there! I am **Aimiko** 🐵, Sai Vignesh's AI buddy. Ask me anything about his projects, internships, education, or skills! 🚀",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const callGroqAPI = async (userText, chatHistory) => {
    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatHistory.map(msg => ({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.text
        })),
        { role: 'user', content: userText }
      ];

      const url = `https://api.groq.com/openai/v1/chat/completions`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: messages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error("Failed to connect to Groq API. Check your key.");
      }

      const data = await response.json();
      const botText = data.choices?.[0]?.message?.content;
      return botText || "Aimiko got a little confused, ooh ooh! 🐒 Try asking again.";
    } catch (error) {
      console.error(error);
      return `⚠️ API Error: ${error.message}. Falling back to offline memory:\n\n` + getMockResponse(userText);
    }
  };

  const callGroqJdMatcher = async (jdText) => {
    try {
      const prompt = `
You are an expert AI recruiter. Analyze the following Job Description (JD) against the profile of Varkala Sai Vignesh (AI Engineer/Researcher).

Vignesh's Profile:
- Skills: ${PORTFOLIO_INFO.skills.join(", ")}
- Internships: Nexus AI Data Labs, CAR XSTREAME, KIDZIAN, EVOASTRA.
- Projects: Telugu-English MiniGPT, AI Powered Assessment System, Dataset Analyzer, AI Travel Itinerary Planner, PYMACHA.

Job Description:
"""
${jdText}
"""

Return a JSON object matching this schema:
{
  "score": <integer from 0 to 100 representing job match percentage>,
  "matchingSkills": [<array of strings listing skills Vignesh has that match the JD>],
  "gaps": [<array of strings listing skills or requirements in the JD that Vignesh might be missing or could adapt to, keeping it constructive and positive>],
  "questions": [<array of 3 strings of recommended interview questions the recruiter can ask Vignesh to test his fit>],
  "pitch": "<a 2-3 sentence personalized email/message pitch explaining why Vignesh is the perfect fit for this job>"
}
`;

      const url = `https://api.groq.com/openai/v1/chat/completions`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'user', content: prompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error("Failed to connect to Groq API");
      }

      const data = await response.json();
      let botText = data.choices?.[0]?.message?.content;
      if (!botText) throw new Error("No response content");
      
      return JSON.parse(botText.trim());
    } catch (e) {
      console.error(e);
      return analyzeJdLocally(jdText);
    }
  };

  const handleTransitionToChat = async (preInjectedText) => {
    setActiveTheme('gemini');
    
    const userMsgObj = {
      id: Date.now(),
      role: 'user',
      text: preInjectedText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsgObj]);
    setIsTyping(true);

    let replyText = "";
    if (apiKey) {
      replyText = await callGroqAPI(preInjectedText, [...messages, userMsgObj]);
    } else {
      await new Promise(res => setTimeout(res, 800 + Math.random() * 800));
      replyText = getMockResponse(preInjectedText);
    }

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'model',
      text: replyText,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setInputMessage('');
    
    // Add user message
    const userMsgObj = {
      id: Date.now(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsgObj]);
    setIsTyping(true);

    let replyText = "";
    if (apiKey) {
      // Direct call to Groq Cloud API
      replyText = await callGroqAPI(userText, messages);
    } else {
      // Fallback local response simulation
      await new Promise(res => setTimeout(res, 800 + Math.random() * 800));
      replyText = getMockResponse(userText);
    }

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'model',
      text: replyText,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  // Convert simple markdown links [text](url) and bold text **text** in messages to HTML safely
  const formatMessage = (text) => {
    // Bold replacement
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Link replacement
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline font-bold text-red-400 hover:text-red-300 transition-colors">$1</a>');
    // Newline replacement
    formatted = formatted.split('\n').join('<br/>');
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <>
      {/* Floating Trigger Monkey Avatar */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center pointer-events-auto">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => {
                setIsOpen(true);
                setIsUniverseScreen(true);
              }}
              className="group flex items-center bg-[#0d0d14]/95 hover:bg-[#12121e]/98 text-white p-1 pr-6 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:shadow-[0_0_35px_rgba(239,68,68,0.45)] border border-white/10 hover:border-red-500/40 hover:scale-105 transition-all duration-300 cursor-pointer h-14 relative z-50 overflow-hidden shrink-0"
            >
              {/* Outer glowing pulsing border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/20 to-indigo-600/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Avatar image container */}
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative border border-white/20 shadow-inner z-10">
                <img src={aimikoLogo} alt="Aimiko Monkey" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay"></div>
                {/* Status Indicator Green Dot */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border border-black rounded-full flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                </div>
              </div>

              {/* Permanent Text Content */}
              <div className="flex flex-col text-left ml-3 shrink-0 z-10">
                <span className="text-[9px] uppercase tracking-widest text-red-500 font-black leading-none mb-0.5 animate-pulse">AIMIKO AI</span>
                <span className="text-xs font-black uppercase tracking-wider text-white leading-none">Chat with Aimiko</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Main Fullscreen Universe Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300 ${
              isUniverseScreen || isFullscreen ? 'p-0' : 'p-4 md:p-6'
            }`}
          >
            {/* Immersive Space Universe Particle Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_60%)]"></div>
              <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Star grids */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_2px,transparent_2px)] bg-[size:80px_80px] animate-pulse"></div>
            </div>

            {/* 1. Soft Ambient Purple Ripple Flash */}
            <motion.div 
              className="absolute inset-0 bg-[#a855f7]/20 z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* 2. Space Dust Big Bang Particle Explosion from Bottom Right (near Floating Launcher Button) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
              {Array.from({ length: 24 }).map((_, i) => {
                // Shoot out between 170 and 280 degrees to fan out upwards & leftwards
                const angle = 170 + (i * 110) / 24;
                const distance = 350 + Math.random() * 550;
                const rad = (angle * Math.PI) / 180;
                const xDest = Math.cos(rad) * distance;
                const yDest = Math.sin(rad) * distance;
                const colors = ['#ef4444', '#6366f1', '#a855f7', '#3b82f6', '#ffffff'];
                const randomColor = colors[i % colors.length];
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full blur-[0.5px]"
                    style={{ 
                      left: "calc(100% - 52px)",
                      top: "calc(100% - 52px)",
                      backgroundColor: randomColor,
                      boxShadow: `0 0 10px ${randomColor}`
                    }}
                    initial={{ x: "-50%", y: "-50%", scale: 1.5, opacity: 1 }}
                    animate={{ 
                      x: `calc(-50% + ${xDest}px)`, 
                      y: `calc(-50% + ${yDest}px)`, 
                      opacity: 0, 
                      scale: 0.1 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                  />
                );
              })}
            </div>

            {/* Main Window wrapper with circular clipPath morph expanding from bottom-right trigger */}
            <motion.div
              initial={{ 
                clipPath: "circle(0px at calc(100% - 52px) calc(100% - 52px))",
                opacity: 0.5
              }}
              animate={{ 
                clipPath: "circle(150% at calc(100% - 52px) calc(100% - 52px))",
                opacity: 1
              }}
              exit={{ 
                clipPath: "circle(0px at calc(100% - 52px) calc(100% - 52px))",
                opacity: 0.5
              }}
              transition={{ 
                duration: 0.95,
                ease: [0.76, 0, 0.24, 1] // Smooth cinematic ease-in-out bezier
              }}
              className={`relative flex flex-col z-10 bg-[#09090e] overflow-hidden ${
                isUniverseScreen || isFullscreen 
                  ? 'w-screen h-screen rounded-none border-0 shadow-none' 
                  : 'w-full max-w-5xl h-[80vh] rounded-[2.5rem] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)]'
              }`}
            >
              
              {/* Universe Entrance Screen */}
              <AnimatePresence>
                {isUniverseScreen ? (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#090915] to-[#120616] z-30 flex flex-col justify-between p-6 md:p-12 text-white text-center overflow-y-auto"
                  >
                    {/* Top Header */}
                    <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                        <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Aimiko AI Core v1.5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setIsOpen(false)}
                          title="Exit to Homepage"
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-600 text-white/80 hover:text-white transition-all cursor-pointer font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Middle Core Greeting & Curated Selectors */}
                    <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 my-auto w-full">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] relative">
                          <img src={aimikoLogo} alt="Aimiko Monkey" className="w-full h-full object-cover scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent"></div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-red-400">
                            ENTER THE AIMIKO UNIVERSE
                          </h2>
                          <p className="text-sm md:text-base text-white/70 font-medium max-w-xl mx-auto">
                            Interact with my agent across three UI replica themes, or evaluate a job description.
                          </p>
                        </div>
                      </div>

                      {/* 3 Columns Selector Cards using Original SVGs with Staggered Cascading Animation */}
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mt-4"
                      >
                        {/* ChatGPT Card */}
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.02,
                            borderColor: "rgba(16, 163, 127, 0.5)",
                            boxShadow: "0 15px 35px rgba(16, 163, 127, 0.15)"
                          }}
                          onClick={() => {
                            setActiveTheme('chatgpt');
                            setIsUniverseScreen(false);
                          }}
                          className="group bg-[#0d0d0d]/40 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer shadow-lg"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#10a37f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-white">
                            <ChatGPTSVG className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-white">ChatGPT UI</h4>
                            <p className="text-xs text-white/50 mt-1 leading-relaxed">Conversational clone with clean markdown rendering.</p>
                          </div>
                        </motion.div>

                        {/* Claude Card */}
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.02,
                            borderColor: "rgba(217, 119, 6, 0.5)",
                            boxShadow: "0 15px 35px rgba(217, 119, 6, 0.15)",
                            backgroundColor: "rgba(251, 250, 247, 0.08)"
                          }}
                          onClick={() => {
                            setActiveTheme('claude');
                            setIsUniverseScreen(false);
                          }}
                          className="group bg-[#fbfaf7]/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer shadow-lg"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#d97706] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-white">
                            <ClaudeSVG className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-white">Claude UI</h4>
                            <p className="text-xs text-white/50 mt-1 leading-relaxed">Serif typography recreation of Claude's warm workspace.</p>
                          </div>
                        </motion.div>

                        {/* Gemini Card */}
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.02,
                            borderColor: "rgba(99, 102, 241, 0.5)",
                            boxShadow: "0 15px 35px rgba(99, 102, 241, 0.15)",
                            backgroundColor: "rgba(49, 46, 129, 0.35)"
                          }}
                          onClick={() => {
                            setActiveTheme('gemini');
                            setIsUniverseScreen(false);
                          }}
                          className="group bg-indigo-950/20 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer shadow-lg"
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a73e8] to-[#9b51e0] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-white">
                            <GeminiSVG className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-white">Gemini UI</h4>
                            <p className="text-xs text-white/50 mt-1 leading-relaxed">Streaming space layout powered by the Gemini API.</p>
                          </div>
                        </motion.div>

                        {/* AI Job Fit Matcher Card */}
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.02,
                            borderColor: "rgba(239, 68, 68, 0.5)",
                            boxShadow: "0 15px 35px rgba(239, 68, 68, 0.15)",
                            backgroundColor: "rgba(127, 29, 29, 0.35)"
                          }}
                          onClick={() => {
                            setActiveTheme('jd_matcher');
                            setIsUniverseScreen(false);
                          }}
                          className="group bg-red-950/20 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer shadow-lg"
                        >
                          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-white">AI Job Fit Matcher</h4>
                            <p className="text-xs text-white/50 mt-1 leading-relaxed">Extract compatibility scores, gaps, and custom interview questions.</p>
                          </div>
                        </motion.div>
                      </motion.div>

                    </div>


                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Dynamic Interface Layout & Theme Engine */}
              <div className={`flex flex-col h-full w-full transition-colors duration-500 ${
                activeTheme === 'chatgpt' ? 'bg-[#212121] text-[#ececf1] font-sans' :
                activeTheme === 'claude' ? 'bg-[#fbfaf7] text-[#191919] font-serif' :
                activeTheme === 'jd_matcher' ? 'bg-[#08080c] text-white font-sans' :
                'bg-[#131314] text-[#e3e3e3] font-sans' // Gemini
              }`}>

                {/* Header Section */}
                <header className={`px-6 py-4 flex justify-between items-center border-b transition-colors duration-500 ${
                  activeTheme === 'chatgpt' ? 'border-white/10 bg-[#212121]' :
                  activeTheme === 'claude' ? 'border-[#e0dcd3] bg-[#f2efe9]' :
                  activeTheme === 'jd_matcher' ? 'border-white/5 bg-[#08080c]' :
                  'border-white/5 bg-[#131314]' // Gemini
                }`}>
                  {/* Left Side: Active Provider Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 relative">
                      <img src={aimikoLogo} alt="Aimiko Monkey" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className={`text-base font-bold flex items-center gap-2 ${
                        activeTheme === 'claude' ? 'text-[#191919] font-black' : 'text-white'
                      }`}>
                        {activeTheme === 'jd_matcher' ? 'Aimiko Job Match Analyzer' : 'Aimiko AI Agent'}
                      </h3>
                    </div>
                  </div>

                  {/* Center: Empty spacer to support flex layout */}
                  <div></div>

                  {/* Right Side: Window Control Buttons (- [] X) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsUniverseScreen(true)}
                      title="Back to AI Universe"
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer font-bold ${
                        activeTheme === 'claude' 
                          ? 'hover:bg-[#e0dcd3] text-[#6b5847]' 
                          : 'hover:bg-white/10 text-white/80 hover:text-white'
                      }`}
                    >
                      —
                    </button>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      title={isFullscreen ? "Restore Window Size" : "Maximize Window"}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        activeTheme === 'claude' 
                          ? 'hover:bg-[#e0dcd3] text-[#6b5847]' 
                          : 'hover:bg-white/10 text-white/80 hover:text-white'
                      }`}
                    >
                      {isFullscreen ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <rect x="4" y="8" width="12" height="12" rx="1" />
                          <path d="M8 4h12v12" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <rect x="4" y="4" width="16" height="16" rx="1" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      title="Exit to Homepage"
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer font-bold ${
                        activeTheme === 'claude' 
                          ? 'hover:bg-red-500/20 text-red-600 hover:text-red-700' 
                          : 'hover:bg-red-600 text-white/80 hover:text-white'
                      }`}
                    >
                      ✕
                    </button>
                  </div>
                </header>

                {/* Sub-Layout Container with Custom sidebars for actual interface looks */}
                <div className="flex-grow flex flex-row overflow-hidden w-full h-full relative">
                  
                  {activeTheme === 'jd_matcher' ? (
                    <JDMatcherPane 
                      apiKey={apiKey}
                      aimikoLogo={aimikoLogo}
                      onTransitionToChat={handleTransitionToChat}
                      callGroqJdMatcher={callGroqJdMatcher}
                    />
                  ) : (
                    <>
                      {/* ChatGPT Left Sidebar */}
                      {activeTheme === 'chatgpt' && (
                        <div className="hidden md:flex flex-col w-64 bg-[#171717] h-full border-r border-white/5 p-3.5 justify-between select-none font-sans">
                          <div className="flex flex-col gap-2">
                            <button className="flex items-center justify-between px-3 py-2 bg-transparent hover:bg-white/5 rounded-lg border border-white/20 text-sm font-medium text-white/90 cursor-pointer">
                              <span>New chat</span>
                              <span>＋</span>
                            </button>
                            <div className="flex flex-col gap-1 mt-6 text-xs text-white/80 font-medium">
                              <div className="px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer truncate">🤖 Telugu-English MiniGPT</div>
                              <div className="px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer truncate">💼 Nexus AI Data Labs</div>
                              <div className="px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer truncate">🎓 MRCET Education</div>
                              <div className="px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer truncate">🛠️ AI Assessment System</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 border-t border-white/10 pt-4 px-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                              VS
                            </div>
                            <div className="flex flex-col truncate">
                              <span className="text-xs font-black text-white/90">Varkala Sai Vignesh</span>
                              <span className="text-[10px] text-white/40 font-mono">Premium Member</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Gemini Left Narrow Strip */}
                      {activeTheme === 'gemini' && (
                        <div className="hidden md:flex flex-col w-16 bg-[#1e1e24] h-full justify-between items-center py-6 border-r border-white/5 select-none font-sans">
                          <div className="flex flex-col gap-8 items-center w-full">
                            <button className="text-white/60 hover:text-white transition-colors cursor-pointer text-lg">☰</button>
                            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer" title="New Chat">＋</button>
                          </div>
                          <div className="flex flex-col gap-6 text-white/60 items-center w-full">
                            <button className="hover:text-white transition-colors cursor-pointer text-lg">⚙️</button>
                            <button className="hover:text-white transition-colors cursor-pointer text-lg">❓</button>
                          </div>
                        </div>
                      )}

                      {/* Chat Pane */}
                      <div className="flex-grow flex flex-col h-full overflow-hidden relative">
                        
                        {/* Conversation Message List Feed */}
                        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin">
                          {messages.map((msg) => {
                            const isBot = msg.role === 'model';
                            return (
                              <div 
                                key={msg.id} 
                                className={`flex gap-4 w-full max-w-4xl mx-auto ${isBot ? 'justify-start' : 'justify-end'}`}
                              >
                                {isBot && (
                                  <div className={`w-8 h-8 rounded-full overflow-hidden border shrink-0 flex items-center justify-center ${
                                    activeTheme === 'chatgpt' ? 'bg-[#10a37f] border-white/10 text-white' :
                                    activeTheme === 'claude' ? 'bg-[#fbfaf7] border-[#e0dcd3] text-[#d97706]' :
                                    'bg-indigo-600 border-white/5 text-white'
                                  }`}>
                                    {activeTheme === 'chatgpt' ? (
                                      <ChatGPTSVG className="w-5 h-5" />
                                    ) : activeTheme === 'claude' ? (
                                      <ClaudeSVG className="w-5 h-5" />
                                    ) : (
                                      <GeminiSVG className="w-5 h-5" />
                                    )}
                                  </div>
                                )}

                                <div className={`max-w-[75%] px-5 py-3.5 text-sm leading-relaxed transition-all duration-300 ${
                                  isBot 
                                    ? activeTheme === 'chatgpt' ? 'bg-transparent text-[#ececf1] border-none shadow-none px-2' :
                                      activeTheme === 'claude' ? 'bg-[#f2efe9]/40 text-[#191919] border border-[#e0dcd3] rounded-3xl' :
                                      'bg-transparent text-[#e3e3e3] border-none shadow-none px-2'
                                    : activeTheme === 'chatgpt' ? 'bg-[#2f2f2f] text-white rounded-3xl' :
                                      activeTheme === 'claude' ? 'bg-[#e0dcd3] text-[#191919] rounded-3xl' :
                                      'bg-[#2a2b2f] text-white rounded-3xl'
                                }`}>
                                  <div className="font-medium whitespace-pre-wrap">
                                    {formatMessage(msg.text)}
                                  </div>
                                  <div className="text-[9px] mt-1.5 font-mono text-right opacity-40">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>

                                {!isBot && (
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold bg-[#6b5847] border border-white/10 shadow-inner">
                                    VS
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {/* Typing Indicator replica systems */}
                          {isTyping && (
                            <div className="flex gap-4 w-full max-w-4xl mx-auto justify-start">
                              <div className={`w-8 h-8 rounded-full overflow-hidden border shrink-0 flex items-center justify-center ${
                                  activeTheme === 'chatgpt' ? 'bg-[#10a37f] border-white/10 text-white' :
                                  activeTheme === 'claude' ? 'bg-[#fbfaf7] border-[#e0dcd3] text-[#d97706]' :
                                  'bg-indigo-600 border-white/5 text-white'
                                }`}>
                                {activeTheme === 'chatgpt' ? (
                                  <ChatGPTSVG className="w-5 h-5" />
                                ) : activeTheme === 'claude' ? (
                                  <ClaudeSVG className="w-5 h-5" />
                                ) : (
                                  <GeminiSVG className="w-5 h-5" />
                                )}
                              </div>

                              <div className="flex-grow max-w-xs">
                                {activeTheme === 'gemini' ? (
                                  /* Gemini flowing color gradient loader strip */
                                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse mt-3"></div>
                                ) : (
                                  <div className={`rounded-3xl px-6 py-4 shadow-sm ${
                                    activeTheme === 'chatgpt' ? 'bg-[#2f2f2f] text-[#ececf1]' :
                                    'bg-[#f2efe9]/40 text-[#191919] border border-[#e0dcd3]'
                                  }`}>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                      <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                      <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          <div ref={messagesEndRef} />
                        </div>

                        {/* Bottom Prompt Box */}
                        <footer className={`p-4 border-t transition-colors duration-500 ${
                          activeTheme === 'chatgpt' ? 'border-white/10 bg-[#212121]' :
                          activeTheme === 'claude' ? 'border-[#e0dcd3] bg-[#fbfaf7]' :
                          'border-white/5 bg-[#131314]' // Gemini
                        }`}>
                          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-3 relative w-full">
                            
                            {activeTheme === 'claude' ? (
                              /* Claude's native elegant card input container layout */
                              <div className="flex flex-col w-full border border-[#e0dcd3] rounded-2xl p-3 bg-[#fbfaf7] shadow-inner focus-within:border-[#6b5847] transition-all">
                                <textarea
                                  value={inputMessage}
                                  onChange={(e) => setInputMessage(e.target.value)}
                                  placeholder="Write a message to Claude styled Aimiko..."
                                  disabled={isTyping}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleSendMessage(e);
                                    }
                                  }}
                                  className="w-full bg-transparent resize-none focus:outline-none min-h-[50px] text-sm text-[#191919] placeholder-gray-500 font-serif"
                                />
                                <div className="flex justify-between items-center mt-2 border-t border-[#e0dcd3]/30 pt-2 text-[#6b5847]">
                                  <span className="text-xs opacity-60">Aimiko Core RAG</span>
                                  <button
                                    type="submit"
                                    disabled={!inputMessage.trim() || isTyping}
                                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                                      !inputMessage.trim() || isTyping 
                                        ? 'opacity-30 cursor-not-allowed text-[#9c9384]' 
                                        : 'bg-[#6b5847] text-white hover:bg-[#524336]'
                                    }`}
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"/>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              /* ChatGPT and Gemini capsule inputs */
                              <div className="relative w-full flex items-center">
                                <input
                                  type="text"
                                  value={inputMessage}
                                  onChange={(e) => setInputMessage(e.target.value)}
                                  placeholder={
                                    isTyping ? "Aimiko is thinking..." : 
                                    activeTheme === 'chatgpt' ? "Message ChatGPT styled Aimiko..." :
                                    "Ask Gemini styled Aimiko..."
                                  }
                                  disabled={isTyping}
                                  className={`flex-grow px-5 py-3.5 pr-14 text-sm rounded-full border transition-all focus:outline-none ${
                                    activeTheme === 'chatgpt' 
                                      ? 'bg-[#2f2f2f] border-white/5 text-[#ececf1] focus:border-white/20' 
                                      : 'bg-[#1e1e24] border-none text-[#e3e3e3] focus:ring-1 focus:ring-indigo-500'
                                  }`}
                                />
                                <button
                                  type="submit"
                                  disabled={!inputMessage.trim() || isTyping}
                                  className={`absolute right-3 p-2 rounded-full transition-all cursor-pointer ${
                                    !inputMessage.trim() || isTyping 
                                      ? 'opacity-30 cursor-not-allowed text-gray-500' 
                                      : activeTheme === 'chatgpt' ? 'bg-[#10a37f] hover:bg-emerald-700 text-white' :
                                        'bg-indigo-600 hover:bg-indigo-700 text-white'
                                  }`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"/>
                                  </svg>
                                </button>
                              </div>
                            )}
                          </form>
                          <p className="text-[10px] text-center mt-2.5 opacity-40 font-medium">
                            {activeTheme === 'chatgpt' ? "Aimiko ChatGPT UI replica. In mock fallback, replies are loaded instantly from portfolio specs." :
                             activeTheme === 'claude' ? "Aimiko Claude UI replica. Sandbox environment with Playfair serif typography." :
                             "Aimiko Gemini UI replica. Uses Groq Cloud Llama API to drive real-time chat."}
                          </p>
                        </footer>

                      </div>
                    </>
                  )}

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AimikoChatbot;
