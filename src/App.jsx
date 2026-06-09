import React from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import ResearchLab from './components/ResearchLab'
import Aimiko from './components/Aimiko'
import Contact from './components/Contact'
import AimikoChatbot from './components/AimikoChatbot'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ResearchLab />
      <Aimiko />
      <Contact />
      <AimikoChatbot />
      <Footer />
    </>
  )
}

export default App
