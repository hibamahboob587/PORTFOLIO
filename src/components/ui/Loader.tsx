import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import GlitchText from './GlitchText';
import './Loader.css';

/**
 * Full-screen boot overlay. Shows an animated progress bar, then fades out.
 * Now fires immediately since there's no heavy 3D canvas to wait for.
 */
export default function Loader() {
  const isLoaded = useStore((s) => s.isLoaded);
  const setLoaded = useStore((s) => s.setLoaded);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Mark as loaded quickly — no heavy 3D scene to wait for.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, [setLoaded]);

  // Simulated boot progress that snaps to 100% once "loaded".
  useEffect(() => {
    let frame: number;
    const tick = () => {
      setProgress((p) => {
        const ceiling = isLoaded ? 100 : 92;
        const next = p + (ceiling - p) * 0.06 + 0.4;
        return Math.min(next, ceiling);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isLoaded]);

  // Once fully loaded and the bar is full, dismiss after a short beat.
  useEffect(() => {
    if (isLoaded && progress >= 99.5) {
      const t = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(t);
    }
  }, [isLoaded, progress]);

  // Hide scrollbar while loader is active
  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hidden]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <div className="loader__inner">
            <GlitchText
              text="INITIALIZING"
              as="h2"
              className="font-display loader__title"
            />
            <div className="loader__bar">
              <div
                className="loader__fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="loader__meta">
              <span>BOOT.SEQ</span>
              <span>{Math.floor(progress).toString().padStart(3, '0')}%</span>
            </div>
          </div>
          <div className="scanlines" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
