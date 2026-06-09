import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="bg-[#ff2a2a] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between"
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-12 md:mb-20 uppercase opacity-90">
            Reach Out
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full mb-12">
            {/* Left Column: Direct Inquiries */}
            <div className="flex-1 flex flex-col gap-8">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                Direct Inquiries
              </h3>
              <p className="text-sm text-white/80 max-w-sm leading-relaxed">
                Feel free to reach out directly via email or phone for internship opportunities, research collaborations, or full-time roles.
              </p>
              
              <div className="flex flex-col gap-4 mt-4">
                <a 
                  href="mailto:vickeyvignesh775@gmail.com" 
                  className="text-lg md:text-xl font-bold hover:underline flex items-center gap-3 w-fit transition-all duration-200"
                >
                  <svg className="w-6 h-6 shrink-0 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  vickeyvignesh775@gmail.com
                </a>
                <a 
                  href="tel:6304910769" 
                  className="text-lg md:text-xl font-bold hover:underline flex items-center gap-3 w-fit transition-all duration-200"
                >
                  <svg className="w-6 h-6 shrink-0 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 6304910769
                </a>
              </div>
            </div>

            {/* Right Column: Socials & Networks */}
            <div className="flex-1 flex flex-col gap-8">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                Networks
              </h3>
              <p className="text-sm text-white/80 max-w-sm leading-relaxed">
                Connect with me on professional platforms to view my latest software repositories and engineering research updates.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a 
                  href="https://www.linkedin.com/in/sai-vignesh-varkala-63422023a/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 rounded-full border border-white/40 text-white font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-[#ff2a2a] transition-all duration-300 grow text-center uppercase tracking-wider text-xs"
                >
                  LinkedIn
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/VARKALASAIVIGNESH" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 rounded-full border border-white/40 text-white font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-[#ff2a2a] transition-all duration-300 grow text-center uppercase tracking-wider text-xs"
                >
                  GitHub
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Branding / Subtitle */}
          <div className="flex flex-col md:flex-row gap-6 border-t border-white/20 pt-8 mt-4 w-full text-xs text-white/70 justify-between items-center">
            <p className="leading-relaxed max-w-[400px]">
              Available for hybrid/remote opportunities. Let's build something state-of-the-art together.
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase">
              VARKALA SAI VIGNESH • Hyderabad, India
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
