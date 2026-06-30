import { motion, useScroll, useSpring } from 'motion/react';

/** Thin neon line pinned to the top of the viewport, tracks page scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 100,
        background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
        boxShadow: '0 0 12px var(--cyan-glow), 0 0 24px var(--magenta-glow)',
      }}
    />
  );
}
