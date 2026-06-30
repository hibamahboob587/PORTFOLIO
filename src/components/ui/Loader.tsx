import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import GlitchText from './GlitchText';
import './Loader.css';

/**
 * Full-screen boot overlay. Shows an animated progress bar that fills as the
 * 3D scene initialises (`isLoaded` from the store), then fades out.
 */
export default function Loader() {
  const isLoaded = useStore((s) => s.isLoaded);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Simulated boot progress that snaps to 100% once the canvas is ready.
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
          exit={{ opacity: 0, filter: 'blur(8px)' }}
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
