import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import stackImage from '../assets/about/profile.jpg';
import aimikoImg from '../assets/aimiko_img.png';
import researchImg from '../assets/research_img.png';

const images = [stackImage, aimikoImg, researchImg];

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="bg-[#ff2a2a] pt-20 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        {/* Left Side: ID Badge and Skills */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black transform -translate-x-1/2 shadow-inner z-0"></div>
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"></div>
            
            {/* Badge Card */}
            <div className="bg-gray-900 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-900 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/30 rounded-full shadow-inner"></div>
              </div>
              {/* Image Container with Crossfade */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 border-2 border-transparent relative">
                <AnimatePresence>
                  <motion.img 
                    key={currentImage}
                    src={images[currentImage]} 
                    alt="Profile" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Info Content */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">
          
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Professional Summary</h2>
          <p className="text-lg font-bold mb-6 leading-relaxed max-w-3xl text-red-50">
            AI Researcher and Engineer specializing in Generative AI, Agentic Systems, LLM Applications, and Intelligent Automation. Experienced in building AI-powered products, research systems, chatbots, machine learning pipelines, and language models using OpenAI, LangChain, PyTorch, TensorFlow, and Hugging Face. Passionate about researching future AI systems and transforming research ideas into practical solutions.
          </p>
          <p className="text-lg font-bold mb-12 leading-relaxed max-w-3xl text-red-50">
            Currently building AIMIKO while conducting independent AI R&D focused on operating systems, cloud AI, developer tooling, and autonomous AI systems.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-black mb-2">Education</h3>
          <p className="text-lg font-bold mb-12 leading-relaxed max-w-3xl text-red-50">
            <span className="text-black text-xl font-black tracking-wide uppercase block mb-1">Malla Reddy College of Engineering and Technology</span>
            B.Tech – Computer Science and Information Technology<br />
            2022 – 2026 | CGPA: 9.03
          </p>

          {/* Horizontal Skills Row (Transparent & Large) */}
          <div className="flex flex-wrap items-center gap-6 mt-8">
            {[
              'Python',
              'PyTorch',
              'OpenAI',
              'LangChain',
              'Agentic AI',
              'TensorFlow',
              'Hugging Face',
              'LLMs & GenAI',
              'OpenCV',
              'FastAPI',
              'RAG & Fine-Tuning',
              'Adversarial ML'
            ].map((skill, idx) => (
              <div 
                key={skill}
                data-aos="zoom-in" data-aos-delay={300 + idx * 100}
                className="px-6 py-3 bg-black/80 rounded-xl text-white font-black text-lg md:text-xl hover:scale-110 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer drop-shadow-2xl border-2 border-transparent hover:border-black"
              >
                {skill}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Torn paper divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Decorative stars */}
      <div className="absolute top-10 right-10 md:right-20 text-black opacity-30 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-black opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default About;
