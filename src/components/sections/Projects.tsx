import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import NeonButton from '../ui/NeonButton';
import ScrollReveal from '../ui/ScrollReveal';
import { PROJECTS, COLORS, type Project } from '../../utils/constants';
import './Projects.css';

const AUTOPLAY_MS = 5000;
const COUNT = PROJECTS.length;

/**
 * Looping site-preview video. Only the focused card actually plays — the rest
 * stay paused so we're never decoding a dozen videos at once.
 */
function PreviewVideo({ src, play }: { src: string; play: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (play) {
      v.currentTime = 0;
      const p = v.play();
      if (p) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [play]);

  return (
    <video
      ref={ref}
      className="projects__video"
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      // Neighbours are visible but idle; the focused card decodes actively.
      poster=""
    />
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Gate the showcase on visibility so the first card the visitor sees when
  // they scroll here is index 0 (Forge Fitness), not one the autoplay already
  // advanced past while the section was still off-screen.
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: '-20% 0px -20% 0px' });

  const goTo = useCallback((i: number) => setCurrent(((i % COUNT) + COUNT) % COUNT), []);
  const step = useCallback((dir: number) => setCurrent((c) => (c + dir + COUNT) % COUNT), []);

  // Self-running showcase — advances on its own once in view, pauses while the
  // visitor is hovering (inspecting) or has a project modal open.
  useEffect(() => {
    if (paused || active || !inView) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % COUNT), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, active, inView]);

  // Arrow-key navigation for keyboard visitors.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) return;
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, active]);

  return (
    <div
      className="projects"
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section projects__header-container">
        <div className="projects__header">
          <p className="section-eyebrow">03 // Selected Work</p>
          <div className="section-title">
            <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={0}>
              Projects
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="projects__stage">
        {PROJECTS.map((p, i) => {
          // Shortest signed distance from the active index (so the loop wraps both ways).
          let offset = i - current;
          if (offset > COUNT / 2) offset -= COUNT;
          if (offset < -COUNT / 2) offset += COUNT;
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const visible = abs <= 2;
          const accent = COLORS[p.accent];

          return (
            <motion.div
              key={p.id}
              className={`projects__slide ${isActive ? 'is-active' : ''}`}
              initial={false}
              animate={{
                x: `${offset * 62}%`,
                scale: isActive ? 1 : Math.max(0.62, 0.8 - (abs - 1) * 0.08),
                rotateY: offset * -26,
                opacity: visible ? (isActive ? 1 : 0.4) : 0,
                filter: isActive ? 'blur(0px)' : 'blur(3px)',
                zIndex: 20 - abs,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 26, mass: 0.9 }}
              style={{ pointerEvents: visible ? 'auto' : 'none' }}
              onClick={() => (isActive ? setActive(p) : goTo(i))}
            >
              <div
                className={`projects__card-3d ${isActive ? 'cursor-target' : ''}`}
                style={{ ['--card-accent' as string]: accent }}
              >
                <div className="projects__thumb">
                  {visible && <PreviewVideo src={p.video} play={isActive && inView} />}
                  <span className="projects__category font-display" style={{ color: accent }}>
                    {p.category}
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

                {/* Autoplay progress — only on the focused card. */}
                {isActive && !paused && !active && inView && (
                  <motion.span
                    key={current}
                    className="projects__progress"
                    style={{ background: accent }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Self-service controls */}
      <div className="projects__controls">
        <button
          className="projects__arrow cursor-target"
          aria-label="Previous project"
          onClick={() => step(-1)}
        >
          ‹
        </button>

        <div className="projects__dots">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              className={`projects__dot cursor-target ${i === current ? 'is-active' : ''}`}
              aria-label={`Go to ${p.title}`}
              aria-current={i === current}
              onClick={() => goTo(i)}
              style={{ ['--dot-accent' as string]: COLORS[p.accent] }}
            />
          ))}
        </div>

        <button
          className="projects__arrow cursor-target"
          aria-label="Next project"
          onClick={() => step(1)}
        >
          ›
        </button>
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
                className="projects__close cursor-target"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="projects__modal-media">
                <video
                  className="projects__modal-video"
                  src={active.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              <span className="projects__modal-id font-display">{active.category}</span>
              <h3 className="projects__modal-title font-display">{active.title}</h3>
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
                  Visit Live Site ↗
                </NeonButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
