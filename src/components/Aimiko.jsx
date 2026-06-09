import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aimikoLogo from '../assets/aimiko_logo.jpg';

const texts = [
  "AIMIKO aims to make AI accessible to every individual by creating intelligent systems that seamlessly integrate into daily life and help people learn, create, and solve problems through AI.",
  "Driven by the belief that AI should empower, not replace. We focus on building autonomous systems and intuitive interfaces that augment human capabilities and creativity.",
  "From predictive operating systems to self-healing cloud infrastructure, AIMIKO represents the next generation of intelligent, context-aware software design."
];

const Aimiko = () => {
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="aimiko" className="relative py-32 px-6 md:px-12 bg-black w-full overflow-hidden flex items-center justify-center">
      {/* Background visual effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600 rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[120px] opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* Centered Title */}
        <h2 
          data-aos="fade-down" 
          className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white tracking-tighter mb-16 text-center"
        >
          AIMIKO
        </h2>

        {/* 65 / 30 Layout */}
        <div className="flex flex-col md:flex-row items-stretch justify-between w-full gap-8 md:gap-0">
          
          {/* Left Side: Text (65%) */}
          <div className="w-full md:w-[65%]">
            <div data-aos="fade-right" data-aos-delay="200" className="h-full flex flex-col justify-between bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-2xl relative">
              <div className="absolute -top-6 left-8 md:left-12 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-lg">
                The Vision
              </div>
              
              <div className="flex-grow flex items-center min-h-[160px] md:min-h-[180px] mt-4">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl md:text-3xl text-white font-medium leading-relaxed"
                  >
                    {texts[currentText]}
                  </motion.p>
                </AnimatePresence>
              </div>
              
              {/* Slider Dots */}
              <div className="mt-8 md:mt-12 flex justify-between items-end gap-3 md:gap-4 w-full">
                <div className="flex gap-3 md:gap-4">
                  {texts.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentText(idx)}
                      className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                        currentText === idx ? "w-12 md:w-16 bg-red-500" : "w-3 md:w-4 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <a href="https://www.instagram.com/aimiko07/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs md:text-sm font-bold transition-all duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.834a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Logo Image (30%) */}
          <div className="w-full md:w-[30%]">
            <div data-aos="fade-left" data-aos-delay="400" className="h-full relative rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(255,0,0,0.2)] min-h-[300px]">
              <img src={aimikoLogo} alt="AIMIKO Logo" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Aimiko;
