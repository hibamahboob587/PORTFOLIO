import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/ui/Loader';
import TargetCursor from './components/ui/TargetCursor';
import Navbar from './components/ui/Navbar';
import ScrollProgress from './components/ui/ScrollProgress';
import SectionWrapper from './components/layout/SectionWrapper';
import ParticleCanvas from './components/canvas/ParticleCanvas';
import PixelBlast from './components/canvas/PixelBlast';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import { PROFILE } from './utils/constants';
import { useStore } from './store/useStore';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Only mount the footer's WebGL animation when the footer nears the viewport,
  // so we never run two PixelBlast contexts at once (hero + footer).
  const footerRef = useRef<HTMLElement>(null);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: '250px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const setLenis = useStore((s) => s.setLenis);

  useEffect(() => {
    const lenis = new Lenis();
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      setLenis(null);
      gsap.ticker.remove(ticker);
    };
  }, [setLenis]);

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

        <footer className="app__footer" ref={footerRef}>
          {/* Same interactive PixelBlast animation as the hero background */}
          <div className="app__footer-bg" aria-hidden="true">
            {footerInView && (
              <PixelBlast
                className=""
                style={{ width: '100%', height: '100%' }}
                variant="circle"
                pixelSize={4}
                color="#00f0ff"
                patternScale={3}
                patternDensity={1.1}
                pixelSizeJitter={0.4}
                enableRipples
                rippleSpeed={0.4}
                rippleThickness={0.12}
                rippleIntensityScale={1.6}
                speed={0.55}
                edgeFade={0.3}
                transparent
              />
            )}
          </div>

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
