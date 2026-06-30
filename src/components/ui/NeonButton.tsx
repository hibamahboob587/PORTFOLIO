import { type ReactNode, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import './NeonButton.css';

interface NeonButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  style?: CSSProperties;
}

/** Neon-bordered button with a sweeping glow on hover and a flash on tap. */
export default function NeonButton({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
  style,
}: NeonButtonProps) {
  const cls = `neon-btn neon-btn--${variant} cursor-target ${className}`;

  const inner = <span className="neon-btn__label">{children}</span>;

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        style={style}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cls}
      style={style}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      {inner}
    </motion.button>
  );
}
