import { type ReactNode, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import './NeonCard.css';

interface NeonCardProps {
  children: ReactNode;
  accent?: string;
  className?: string;
  style?: CSSProperties;
  /** Enables the pointer-tracked 3D tilt (used by project cards). */
  tilt?: boolean;
}

/** Glassmorphism card with a glowing neon border that intensifies on hover. */
export default function NeonCard({
  children,
  accent = 'var(--neon-cyan)',
  className = '',
  style,
  tilt = false,
}: NeonCardProps) {
  return (
    <motion.div
      className={`neon-card ${tilt ? 'neon-card--tilt' : ''} ${className}`}
      style={{ ['--card-accent' as string]: accent, ...style }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      onMouseMove={
        tilt
          ? (e) => {
              const el = e.currentTarget;
              const r = el.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              el.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`);
              el.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`);
            }
          : undefined
      }
      onMouseLeave={
        tilt
          ? (e) => {
              e.currentTarget.style.setProperty('--rx', '0deg');
              e.currentTarget.style.setProperty('--ry', '0deg');
            }
          : undefined
      }
    >
      <div className="neon-card__inner">{children}</div>
    </motion.div>
  );
}
