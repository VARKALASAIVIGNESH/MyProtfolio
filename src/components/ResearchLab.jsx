import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

const ScrollRow = ({ reports, direction }) => {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);

  const displayReports = [...reports, ...reports];

  useLayoutEffect(() => {
    if (direction === -1 && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
    }
  }, [direction]);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  
  const handleMouseLeave = () => {
    setIsDown(false);
    setIsHoveringTrack(false);
  };
  
  const handleMouseUp = () => setIsDown(false);
  
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    let animationFrameId;
    
    const autoScroll = () => {
      if (scrollRef.current && !isDown && !isHoveringTrack) {
        scrollRef.current.scrollLeft += direction * 1;
        
        if (direction === 1 && scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
        else if (direction === -1 && scrollRef.current.scrollLeft <= 0) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDown, isHoveringTrack, direction]);

  return (
    <div 
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringTrack(true)}
      className={`flex overflow-x-auto gap-6 px-6 md:px-12 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDown ? 'cursor-grabbing' : 'cursor-grab'} relative z-10`}
    >
      <div className="shrink-0 w-0 lg:w-[10vw]"></div>

      {displayReports.map((report, idx) => {
        const colors = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'];
        const glowColor = colors[(report.id - 1) % 4];
        const uniqueKey = `${report.id}-${idx}`;

        return (
          <div 
            key={uniqueKey} 
            className="group relative bg-white rounded-3xl p-8 shrink-0 w-[300px] md:w-[400px] h-[160px] hover:h-[400px] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] border border-gray-200 hover:border-gray-300 hover:shadow-2xl shadow-md overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 opacity-100 transition-all duration-500" style={{ backgroundColor: glowColor }}></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-[600ms]" style={{ background: `radial-gradient(circle at bottom right, ${glowColor}, transparent 80%)`}}></div>

            <div className="relative z-10">
              <div className="text-[11px] font-black text-gray-400 mb-3 tracking-[0.2em] group-hover:text-gray-600 transition-colors">REPORT {report.id}</div>
              <h4 className="font-black text-gray-900 text-2xl leading-tight">{report.title}</h4>
            </div>
            
            <div className="absolute top-[160px] left-8 right-8 opacity-0 group-hover:opacity-100 group-hover:top-[160px] transition-all duration-[600ms] delay-75">
              <div className="h-px w-12 mb-6" style={{ backgroundColor: glowColor }}></div>
              <p className="text-gray-600 font-medium text-[15px] leading-relaxed">
                {report.summary}
              </p>
            </div>
          </div>
        );
      })}
      
      <div className="shrink-0 w-[10vw]"></div>
    </div>
  );
};


const ResearchLab = () => {
  const reports13 = [
    { id: 1, title: "Windows Performance Guardian", summary: "This report proposes a next-generation AI system that shifts Windows from a reactive OS to an intelligent, self-healing platform by predicting system crashes, CPU/RAM spikes, driver failures, and battery degradation 15-20 minutes before they occur. Using on-device machine learning and Azure cloud AI, it could reduce enterprise IT maintenance costs by 25-30% and proactively prevent user downtime." },
    { id: 2, title: "AI-Driven Task Manager for Windows 12", summary: "This outlines transforming the Windows Task Manager into a predictive resource optimization tool. Instead of merely displaying current stats, it would use Long Short-Term Memory (LSTM) networks to predict CPU and GPU utilization 60-90 seconds ahead, and hybrid autoencoders to detect behavioral anomalies of zero-day malware and rogue processes before they cause harm." },
    { id: 3, title: "OneDrive Smart Duplicate-Brain™", summary: "This details an AI system designed to solve cloud storage redundancy by identifying exact duplicates, visually similar near-duplicates, and low-quality files across OneDrive. Using perceptual hashing and cross-format semantic similarity, the system aims to eliminate massive data waste, potentially saving Microsoft up to $8.2 billion annually in Azure storage and replication costs." },
    { id: 4, title: "Edge Smart Context Browser", summary: "This R&D initiative envisions an intent-aware browser that understands what a user is trying to accomplish (e.g., researching, shopping, coding) in real time. By modeling tab sequencing and visible page context, it proactively surfaces relevant Copilot actions and tools without manual invocation, closing the gap in enterprise AI productivity." },
    { id: 5, title: "Outlook Phishing Shield 2.0", summary: "This report introduces an AI-driven behavioral email security paradigm to stop sophisticated Business Email Compromise (BEC) and conversation hijacking attacks that evade traditional signature-based filters. It works by building stylometric fingerprints (writing style) and analyzing behavioral metrics." },
    { id: 6, title: "PowerPoint Auto-Storyboard Generator", summary: "Uses LLMs and diffusion models to generate complete, multi-slide storyboards with narrative flow and choreographed animations optimized for cognitive load." },
    { id: 7, title: "Microsoft Teams Emotion Mapping AI", summary: "Real-time mood, engagement, and cognitive state intelligence platform using visual micro-expressions and vocal paralinguistics to measure meeting effectiveness." },
    { id: 8, title: "Azure Auto-Cost Optimizer AI", summary: "Cloud cost-reduction engine using time-series forecasting and reinforcement learning to autonomously recommend optimal VM sizing and workload autoscaling." },
    { id: 9, title: "Azure Model Drift Detector", summary: "Self-healing MLOps system that detects data drift in real-time, forecasts accuracy decay, and autonomously orchestrates retraining workflows across Kubernetes clusters." },
    { id: 10, title: "Azure Data Pipeline Repair Bot", summary: "Automates detection, diagnosis, and repair of ETL pipeline failures in Azure Data Factory via schema drift analysis and semantic mapping." },
    { id: 11, title: "Semantic-Copilot for VS Code", summary: "Builds a live knowledge graph of the entire enterprise codebase to understand microservice boundaries, enabling safe, multi-file refactoring without breaking dependencies." },
    { id: 12, title: "AI Security Inspector for Azure Apps", summary: "Correlates source code vulnerabilities, 3rd party dependencies, infrastructure misconfigurations, and runtime behaviors into a unified mesh to prioritize active exploitation risks." },
    { id: 13, title: "Windows Local Model Accelerator", summary: "OS-level orchestration layer specifically engineered for running 4-8B parameter LLMs locally. It dynamically schedules workloads across CPUs, GPUs, and NPUs while managing thermal thresholds." }
  ];

  const validations = [
    {
      reportId: 4,
      title: "Edge Smart Context Browser",
      score: "95%",
      buildMatch: "Microsoft Scout & Work IQ Engine",
      color: "red",
      hex: "#F25022",
      points: [
        { 
          you: "transform Microsoft Edge from a document viewer into an intelligent intent-detection platform where every tab understands user goals in real time.", 
          build: "Satya Nadella declared that computing is leaving the traditional 'app-centric' layout. The web browser and OS have been re-architected to serve as a smart surface that reads context asynchronously across multiple tabs to execute background tasks automatically, without needing individual apps launched manually." 
        }
      ]
    },
    {
      reportId: 13,
      title: "Windows Local Model Accelerator",
      score: "90%",
      buildMatch: "Agent-Native Runtime & MXC",
      color: "green",
      hex: "#7FBA00",
      points: [
        { you: "OS-level orchestration layer for on-device LLMs. It must handle heterogeneous execution across CPUs, GPUs, and Neural Processing Units seamlessly.", build: "Microsoft launched a native runtime layer engineered to run local agentic loops straight on NPUs and GPUs." }
      ]
    },
    {
      reportId: 11,
      title: "Semantic-Copilot for VS Code",
      score: "95%",
      buildMatch: "GitHub Workspace Graph & MDASH",
      color: "blue",
      hex: "#00A4EF",
      points: [
        { you: "Construct a live knowledge graph understanding structural boundaries across the entire codebase, not just the active file.", build: "Microsoft unveiled Work IQ, a live semantic control plane mapping dependency topologies across the enterprise." }
      ]
    },
    {
      reportId: 12,
      title: "AI Security Inspector",
      score: "88%",
      buildMatch: "Azure Security Agent Engine",
      color: "yellow",
      hex: "#FFB900",
      points: [
        { you: "Continuous inspection correlating code vulnerabilities and cloud infrastructure misconfigurations into a single risk profile.", build: "Agent 365 leverages AI agents to continuously map exploit chains across all organizational silos." }
      ]
    },
    {
      reportId: 9,
      title: "Azure Model Drift Detector",
      score: "90%",
      buildMatch: "Autonomous MLOps Guardrails",
      color: "blue",
      hex: "#0078D4", 
      points: [
        { you: "Autonomously detect, predict, and remediate model drift across Azure's ML infrastructure using statistical confidence bounds.", build: "Azure integrated real-time vector tracking tools natively into production endpoints for self-healing loops." }
      ]
    }
  ];

  return (
    <section id="research-lab" className="py-32 px-6 md:px-12 w-full font-sans bg-[#f3f2f1] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-24 text-center">
          
          {/* Authentic Microsoft Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 21 21" className="mx-auto mb-6">
            <path fill="#f25022" d="M0 0h10v10H0z"/>
            <path fill="#7fba00" d="M11 0h10v10H11z"/>
            <path fill="#00a4ef" d="M0 11h10v10H0z"/>
            <path fill="#ffb900" d="M11 11h10v10H11z"/>
          </svg>

          {/* Pill Badge Without Colors */}
          <div className="inline-flex items-center px-6 py-2 bg-white border border-gray-200 rounded-full mb-8 shadow-sm">
             <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-600">Microsoft Ecosystem Validation</span>
          </div>

          <h2 data-aos="fade-up" className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900 drop-shadow-sm">
            Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A4EF] to-[#FFB900]">Agentic Era</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-xl md:text-3xl text-gray-600 font-medium max-w-4xl mx-auto leading-relaxed">
            13 independent R&D reports predicting the exact architectural shifts announced at Microsoft Build 2026.
          </p>
        </div>

        {/* --- VALIDATION MATRIX : THE IMPACT TIMELINE --- */}
        <div className="mb-40">
          <h3 
            className="text-3xl font-black tracking-widest uppercase text-center mb-24 text-transparent bg-clip-text drop-shadow-sm"
            style={{ backgroundImage: 'linear-gradient(to right, #F25022, #7FBA00, #00A4EF, #FFB900)' }}
          >
            The Build 2026 Proof of Concept
          </h3>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline vertical beam */}
            <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200"></div>

            {validations.map((val, idx) => (
              <div key={idx} data-aos="fade-up" className="relative mb-24 lg:mb-32 last:mb-0">
                
                <div 
                  className="absolute left-8 lg:left-1/2 -translate-x-1/2 top-0 lg:top-8 w-20 h-20 rounded-full border-4 border-white z-10 flex flex-col items-center justify-center transition-transform hover:scale-110 shadow-lg"
                  style={{ backgroundColor: val.hex }}
                >
                  <span className="text-[11px] font-black tracking-widest uppercase mb-1" style={{ color: 'white' }}>MATCH</span>
                  <span className="text-2xl font-black leading-none" style={{ color: 'white' }}>{val.score}</span>
                </div>

                <div className="flex flex-col lg:flex-row w-full items-start">
                  
                  <div className="w-full lg:w-1/2 pl-24 lg:pl-0 lg:pr-24 text-left lg:text-right pt-2 lg:pt-0">
                    <span className="text-sm font-black tracking-widest block mb-2" style={{ color: val.hex }}>REPORT {val.reportId}</span>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">{val.title}</h3>
                    
                    <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-100 hover:border-gray-300 transition-colors text-left relative overflow-hidden group shadow-sm">
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full transition-transform group-hover:scale-150" style={{ backgroundColor: val.hex }}></div>
                      <span className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] block mb-4 relative z-10">What I Proposed in 2025</span>
                      <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed relative z-10">"{val.points[0].you}"</p>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 pl-24 lg:pl-24 pt-12 lg:pt-0">
                    <span className="text-sm font-black tracking-widest text-gray-400 block mb-2">BUILD 2026 REALITY</span>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">{val.buildMatch}</h3>
                    
                    <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-100 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform">
                      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: val.hex }}></div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] block mb-4" style={{ color: val.hex }}>The Engineering Validation</span>
                      <p className="text-gray-900 text-lg md:text-xl font-black leading-relaxed">"{val.points[0].build}"</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 13 REPORTS : DUAL OPPOSING CAROUSELS --- */}
        <div className="relative z-10 w-screen relative left-1/2 right-1/2 -mx-[50vw] pb-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-6 flex-1">
                <h3 className="text-4xl font-black text-gray-900 tracking-tight">The 13-Report Arsenal</h3>
                <div className="h-px bg-gray-200 flex-1 hidden md:block"></div>
              </div>
              <a href="https://drive.google.com/drive/folders/1wTTKYJMsOW5muWfRPnnsCfOqetBfM2oD?usp=drive_link" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#0078D4] text-white font-bold hover:bg-[#005a9e] transition-colors flex items-center gap-2 shadow-lg shadow-[#0078D4]/20 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Access Full Research Drive
              </a>
            </div>
            <div className="flex justify-end mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                 <div className="flex space-x-1 mr-2">
                    <div className="w-1 h-1 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                 </div>
                 Auto-Scrolling • Drag or Hover to Pause
              </div>
            </div>
          </div>
          
          <ScrollRow reports={reports13.slice(0, 7)} direction={1} />
          <ScrollRow reports={reports13.slice(7, 13)} direction={-1} />

        </div>

      </div>
    </section>
  );
};

export default ResearchLab;
