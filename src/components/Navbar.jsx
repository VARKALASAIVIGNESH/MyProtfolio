import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navStyle, setNavStyle] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is currently active under the navbar
      const sections = ['home', 'about', 'experience', 'projects', 'research-lab', 'aimiko', 'contact'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Navbar is around 80px, so we check what element sits in that space
          if (rect.top <= 80 && rect.bottom > 80) {
            currentSection = section;
            break;
          }
        }
      }

      // If we are over white background sections, use light nav style
      if (['experience', 'projects', 'research-lab'].includes(currentSection)) {
        setNavStyle('light');
      } else {
        setNavStyle('dark');
      }

      // Dynamic URL Path Updates (skip during chatbot views)
      if (window.location.pathname !== '/chat' && window.location.pathname !== '/aimiko') {
        const targetPath = currentSection === 'home' ? '/' : `/${currentSection}`;
        if (window.location.pathname !== targetPath) {
          window.history.pushState(null, '', targetPath);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle direct page loads to sub-paths (e.g. /projects)
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    if (path && !['chat', 'aimiko'].includes(path)) {
      const element = document.getElementById(path);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 800); // Allow preloader and initial DOM paint
      }
    }
  }, []);

  const navLinks = ['Home', 'About', 'Experience', 'Projects', 'Research Lab', 'AIMIKO', 'Contact'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isOpen 
          ? 'bg-[#ff2a2a] py-4'
          : isScrolled 
            ? 'bg-transparent py-4' 
            : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left Side: Logo/Name */}
        <div className="flex items-center">
          <a href="#" className={`text-2xl font-black tracking-tight transition-colors duration-300 ${navStyle === 'light' ? 'text-black' : 'text-white'}`}>
            Vignesh<span className={navStyle === 'light' ? 'text-[#ff2a2a]' : 'text-red-500'}>.</span>
          </a>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={`font-medium relative group transition-colors duration-300 ${
                navStyle === 'light' 
                  ? 'text-black hover:text-[#ff2a2a]' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link}
              {/* Smooth hover underline */}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${navStyle === 'light' ? 'bg-[#ff2a2a]' : 'bg-red-500'}`}></span>
            </a>
          ))}
        </div>

        {/* Right Side: CTA Button */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className={`px-6 py-2.5 rounded-full border font-semibold transition-all duration-300 backdrop-blur-md ${
              navStyle === 'light'
                ? 'bg-[#ff2a2a] text-white border-transparent hover:bg-black hover:text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'
            }`}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none p-2 transition-colors duration-300 ${navStyle === 'light' && !isOpen ? 'text-black' : 'text-white'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 py-4 opacity-100 bg-[#ff2a2a] shadow-2xl' : 'max-h-0 opacity-0 bg-transparent'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black font-bold text-lg border-b border-white/20 pb-2 transition-colors"
            >
              {link}
            </a>
          ))}
          <div className="pt-4 pb-2">
             <a 
               href="#contact" 
               onClick={() => setIsOpen(false)} 
               className="inline-block px-6 py-3 rounded-full bg-white text-[#ff2a2a] font-black hover:bg-black hover:text-white transition-colors w-full text-center shadow-lg"
             >
               Hire Me
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
