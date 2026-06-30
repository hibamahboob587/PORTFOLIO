import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/ui/Loader';
import TargetCursor from './components/ui/TargetCursor';
import Navbar from './components/ui/Navbar';
import ScrollProgress from './components/ui/ScrollProgress';
import SectionWrapper from './components/layout/SectionWrapper';
import ParticleCanvas from './components/canvas/ParticleCanvas';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import { PROFILE } from './utils/constants';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColor="#00f0ff"
        cursorColorOnTarget="#ff00aa"
      />
      <Loader />

      <ScrollProgress />
      <Navbar />

      {/* Lightweight 2D particle background — replaces the heavy WebGL scene */}
      <ParticleCanvas />

      <main className="app">
        <SectionWrapper id="hero">
          <Hero />
        </SectionWrapper>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="skills">
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="projects">
          <Projects />
        </SectionWrapper>

        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>

        <footer className="app__footer">
          <span>
            Built with <span className="app__heart">☕</span> and passion
          </span>
          <span className="app__footer-meta font-display">
            © {new Date().getFullYear()} {PROFILE.name} // ALL SYSTEMS NOMINAL
          </span>
        </footer>
      </main>

      {/* Global CRT overlays */}
      <div className="scanlines" />
      <div className="vignette" />
    </>
  );
}
