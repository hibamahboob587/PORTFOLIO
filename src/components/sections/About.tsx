import { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'motion/react';
import NeonCard from '../ui/NeonCard';
import GlitchText from '../ui/GlitchText';
import { ABOUT_BIO, STATS, PROFILE, type Stat } from '../../utils/constants';
import './About.css';

// variants for container stagger
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time between each element appearing
      delayChildren: 0.1,
    }
  }
};

// variants for individual items
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Info card slides in from right after the text
const cardVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8 }
  }
};

function StatCounter({ stat, trigger }: { stat: Stat; trigger: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, stat.value]);

  return (
    <div className="about__stat">
      <div className="about__stat-value font-display">
        {value}
        <span className="about__stat-suffix">{stat.suffix}</span>
      </div>
      <div className="about__stat-label">{stat.label}</div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [statsTrigger, setStatsTrigger] = useState(false);

  return (
    <motion.div 
      className="section about" 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="about__grid">
        <div className="about__col">
          <motion.p className="section-eyebrow" variants={itemVariants}>
            01 // About
          </motion.p>
          <motion.h2 className="section-title" variants={itemVariants}>
            <GlitchText text="Who I Am" />
          </motion.h2>

          {ABOUT_BIO.map((para, i) => (
            <motion.p key={i} className="about__bio" variants={itemVariants}>
              {para}
            </motion.p>
          ))}

          <motion.div className="about__signature" variants={itemVariants}>
            <span className="font-display">{PROFILE.name}</span>
            <span className="about__loc">{PROFILE.location}</span>
          </motion.div>
        </div>

        <motion.div
          className="about__col about__visual"
          variants={cardVariants}
          onAnimationComplete={(definition) => {
            if (definition === "visible") {
              setStatsTrigger(true); // Start stats only after card is fully visible
            }
          }}
        >
          <NeonCard accent="var(--neon-magenta)" className="about__card">
            <div className="about__card-head font-display">
              <span>&gt; whoami.exe</span>
              <span className="about__dots">
                <i /> <i /> <i />
              </span>
            </div>
            <ul className="about__facts">
              <li>
                <span>role</span>
                <span>Full-Stack Engineer</span>
              </li>
              <li>
                <span>focus</span>
                <span>Web · WebGL · DX</span>
              </li>
              <li>
                <span>stack</span>
                <span>TS / React / Node</span>
              </li>
              <li>
                <span>status</span>
                <span className="about__open">● open to work</span>
              </li>
            </ul>

            <div className="about__stats">
              {STATS.map((s) => (
                <StatCounter key={s.label} stat={s} trigger={statsTrigger} />
              ))}
            </div>
          </NeonCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
