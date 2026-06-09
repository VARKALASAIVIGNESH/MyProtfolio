import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Telugu-English MiniGPT",
      description: "Built a Transformer-based GPT-style language model from scratch using PyTorch. Designed with 118,576 parameters, 2 Transformer Blocks, and a 64-token Context Window.",
      details: ["PyTorch", "Self Attention", "Causal Masking", "Autoregressive Gen"]
    },
    {
      title: "AI Powered Assessment System",
      description: "Developed a system featuring PDF Upload Processing, Automated MCQ Generation, an AI Evaluation Engine, and a Student Analytics Dashboard.",
      details: ["PDF Processing", "MCQ Generation", "Analytics"]
    },
    {
      title: "Dataset Analyzer",
      description: "Created a comprehensive tool for Automated Data Cleaning, Dataset Visualization, Statistical Analysis, and Conversational Dataset Querying for AI-Based Insights.",
      details: ["Data Cleaning", "Visualization", "Conversational AI"]
    },
    {
      title: "AI Travel Itinerary Planner",
      description: "Integrated Gemini AI to build an automated travel planner with route optimization, accommodation recommendations, and activity suggestions.",
      details: ["Gemini AI", "Route Optimization", "Planning"]
    },
    {
      title: "PYMACHA",
      description: "A Bilingual AI Learning Platform providing Telugu + English Learning Support, personalized learning experiences, and AI-powered educational workflows.",
      details: ["Bilingual", "Personalized Learning", "Educational AI"]
    },
    {
      title: "Additional AI Projects",
      description: "Built multiple applications including GenAI Tutors, Multimodal RAG Systems, Quiz Analyzers, Image Classifiers, Speech-to-Text Systems, Gesture Controllers, and OpenCV Applications.",
      details: ["RAG Systems", "Computer Vision", "Speech-to-Text"]
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-white w-full relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-end gap-6">
          <div data-aos="fade-right">
            <h2 className="text-5xl md:text-6xl font-black text-black tracking-tight mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl">
              A collection of AI systems, models, and tools I have built, ranging from custom transformers to intelligent web applications.
            </p>
          </div>
        </div>

        {/* Sticky Stacking Deck */}
        <div className="relative w-full flex flex-col items-center pb-32">
          {projects.map((proj, idx) => {
            // Dynamic top offset so they stack visibly (each card sits 40px below the previous one)
            const stickyTop = `calc(15vh + ${idx * 40}px)`;
            
            return (
              <div 
                key={idx}
                className={`sticky w-full max-w-5xl ${
                  idx === projects.length - 1 ? 'mb-[5vh]' : 'mb-[40vh]'
                }`}
                style={{ top: stickyTop }}
              >
                {/* Dark Glassmorphism Card */}
                <div className="bg-[#0a0a0a] text-white p-10 md:p-16 rounded-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] border-t border-white/20 border-l border-r border-b-0 flex flex-col gap-8 w-full backdrop-blur-3xl overflow-hidden relative group cursor-pointer transition-transform duration-700 hover:-translate-y-4">
                  
                  {/* Subtle red glow effect behind card */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

                  {/* Card Header: Title and Tags */}
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white tracking-tight">
                      {proj.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {proj.details.map((detail, dIdx) => (
                        <span key={dIdx} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 border border-white/10 shadow-inner">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Card Body: Description */}
                  <div className="mt-4 relative z-10">
                    <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed max-w-4xl">
                      {proj.description}
                    </p>
                  </div>

                  {/* Interactive Button */}
                  <div className="mt-4 flex justify-start relative z-10">
                     <a href="https://github.com/VARKALASAIVIGNESH" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white font-bold group-hover:text-red-500 transition-colors">
                        <span className="tracking-widest uppercase text-sm">Explore Project on GitHub</span>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                     </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
