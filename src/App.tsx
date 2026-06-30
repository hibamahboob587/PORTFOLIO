import { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/ui/Loader';
import TargetCursor from './components/ui/TargetCursor';
import Navbar from './components/ui/Navbar';
import ScrollProgress from './components/ui/ScrollProgress';
import SectionWrapper from './components/layout/SectionWrapper';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import { PROFILE } from './utils/constants';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// The 3D canvas is heavy — load it lazily so first paint isn't blocked.
const Scene = lazy(() => import('./components/canvas/Scene'));

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

      <main className="app">
        <SectionWrapper id="hero">
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
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
          <Suspense fallback={null}>
            <Scene noObjects={true} />
          </Suspense>
          <span>
            Built with <span className="app__heart">☕</span> and Three.js
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
