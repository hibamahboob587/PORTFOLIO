import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import NeonCard from '../ui/NeonCard';
import NeonButton from '../ui/NeonButton';
import ScrollReveal from '../ui/ScrollReveal';
import { PROJECTS, COLORS, type Project } from '../../utils/constants';
import './Projects.css';

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const tick = (currentTime: number) => {
      if (isPaused) {
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      if (currentTime - lastTime >= 3500) {
        if (!wrapper) return;
        
        // Card width (320px) + Gap (3rem = 48px) = 368px
        const itemWidth = 368; 
        
        // Check if we are at or near the end
        const isAtEnd = wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 10;
        
        if (isAtEnd) {
          wrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          wrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Pause on hover or touch
    const pause = () => { isPaused = true; };
    const resume = () => { isPaused = false; };

    wrapper.addEventListener('mouseenter', pause);
    wrapper.addEventListener('mouseleave', resume);
    wrapper.addEventListener('touchstart', pause, { passive: true });
    wrapper.addEventListener('touchend', resume, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      wrapper.removeEventListener('mouseenter', pause);
      wrapper.removeEventListener('mouseleave', resume);
      wrapper.removeEventListener('touchstart', pause);
      wrapper.removeEventListener('touchend', resume);
    };
  }, []);

  return (
    <div className="projects">
      <div className="section projects__header-container">
        <div className="projects__header">
          <p className="section-eyebrow">03 // Selected Work</p>
          <div className="section-title">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={0}
              blurStrength={8}
            >
              Projects
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="projects__carousel-wrapper" ref={wrapperRef}>
        <div className="projects__carousel">
          {PROJECTS.map((p) => {
            const accent = COLORS[p.accent];
            return (
              <div
                className="projects__item"
                key={p.id}
                onClick={() => setActive(p)}
              >
                <NeonCard accent={accent} tilt className="projects__card">
                  <div
                    className="projects__thumb"
                    style={{
                      background: `linear-gradient(135deg, ${accent}22, transparent 60%), repeating-linear-gradient(45deg, ${accent}11 0 10px, transparent 10px 20px)`,
                    }}
                  >
                    <span className="projects__year font-display">{p.year}</span>
                    <span
                      className="projects__id font-display"
                      style={{ color: accent }}
                    >
                      {p.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="projects__body">
                    <h3 className="projects__title font-display">{p.title}</h3>
                    <p className="projects__blurb">{p.blurb}</p>
                    <div className="projects__tags">
                      {p.tags.map((t) => (
                        <span
                          className="projects__tag"
                          key={t}
                          style={{ borderColor: `${accent}55`, color: accent }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="projects__more font-display" style={{ color: accent }}>
                      View details →
                    </span>
                  </div>
                </NeonCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Expanded modal ---- */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="projects__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="projects__modal glass"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                ['--card-accent' as string]: COLORS[active.accent],
              }}
            >
              <button
                className="projects__close"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <span className="projects__modal-id font-display">
                {active.id.toUpperCase()} // {active.year}
              </span>
              <h3 className="projects__modal-title font-display">
                {active.title}
              </h3>
              <p className="projects__modal-desc">{active.description}</p>
              <div className="projects__tags">
                {active.tags.map((t) => (
                  <span
                    className="projects__tag"
                    key={t}
                    style={{
                      borderColor: `${COLORS[active.accent]}55`,
                      color: COLORS[active.accent],
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="projects__modal-cta">
                <NeonButton href={active.liveUrl} variant="primary">
                  Live Demo
                </NeonButton>
                <NeonButton href={active.repoUrl} variant="secondary">
                  Source
                </NeonButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
