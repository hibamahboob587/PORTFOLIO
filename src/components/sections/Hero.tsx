import { motion } from 'motion/react';
import GlitchText from '../ui/GlitchText';
import NeonButton from '../ui/NeonButton';
import PixelBlast from '../canvas/PixelBlast';
import { PROFILE } from '../../utils/constants';
import './Hero.css';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function Hero() {
  return (
    <div className="hero">
      {/* Interactive pixel-dither background — click to send ripples */}
      <div className="hero__bg" aria-hidden="true">
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
      </div>

      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="hero__eyebrow font-display" variants={item}>
          <span className="hero__status-dot" /> SYSTEM ONLINE // PORTFOLIO v2.0
        </motion.p>

        <motion.h1 className="hero__name font-display" variants={item}>
          <GlitchText text={PROFILE.firstName} />
          <span className="hero__name-accent">
            <GlitchText text={PROFILE.lastName} />
          </span>
        </motion.h1>

        <motion.p className="hero__tagline" variants={item}>
          {PROFILE.tagline}
        </motion.p>

        <motion.div className="hero__cta" variants={item}>
          <NeonButton
            variant="primary"
            onClick={() =>
              document
                .getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            View Work
          </NeonButton>
          <NeonButton
            variant="secondary"
            onClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Get In Touch
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll cursor-target"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() =>
          document
            .getElementById('about')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span className="font-display">SCROLL</span>
        <motion.span
          className="hero__chevron"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          ⌄
        </motion.span>
      </motion.button>
    </div>
  );
}
