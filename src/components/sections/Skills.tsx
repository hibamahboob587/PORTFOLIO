import { useRef } from 'react';
import { motion } from 'motion/react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiNodedotjs,
  SiPostgresql,
  SiGraphql,
  SiPython,
  SiDocker,
  SiLinux,
  SiVercel,
} from 'react-icons/si';
import { FaGitAlt } from 'react-icons/fa';
import NeonCard from '../ui/NeonCard';
import LogoLoop from '../ui/LogoLoop';
import ScrollReveal from '../ui/ScrollReveal';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import { SKILLS, COLORS } from '../../utils/constants';
import './Skills.css';

const allLogos = [
  { node: <SiReact color="#61DAFB" />, title: 'React' },
  { node: <SiNextdotjs color="#ffffff" />, title: 'Next.js' },
  { node: <SiTypescript color="#3178C6" />, title: 'TypeScript' },
  { node: <SiThreedotjs color="#ffffff" />, title: 'Three.js' },
  { node: <SiTailwindcss color="#06B6D4" />, title: 'Tailwind CSS' },
  { node: <SiNodedotjs color="#339933" />, title: 'Node.js' },
  { node: <SiPostgresql color="#4169E1" />, title: 'PostgreSQL' },
  { node: <SiGraphql color="#E10098" />, title: 'GraphQL' },
  { node: <SiPython color="#3776AB" />, title: 'Python' },
  { node: <SiDocker color="#2496ED" />, title: 'Docker' },
  { node: <SiLinux color="#FCC624" />, title: 'Linux' },
  { node: <SiVercel color="#ffffff" />, title: 'Vercel' },
  { node: <FaGitAlt color="#F05032" />, title: 'Git' },
];

export default function Skills() {
  const scope = useRef<HTMLDivElement>(null);
  useScrollReveal(scope, { childSelector: '.skills__reveal', stagger: 0.1 });

  return (
    <div className="section skills" ref={scope}>
      <p className="section-eyebrow skills__reveal">02 // Capabilities</p>
      <div className="section-title">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
        >
          Skill Matrix
        </ScrollReveal>
      </div>

      <div className="skills__grid skills__reveal">
        {SKILLS.map((cat, ci) => {
          const accent = COLORS[cat.accent];
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: ci * 0.12, ease: 'easeOut' }}
            >
              <NeonCard accent={accent} className="skills__card">
                <h3 className="skills__cat font-display" style={{ color: accent }}>
                  {cat.title}
                </h3>

                <div className="skills__list">
                  {cat.skills.map((skill, si) => (
                    <div className="skills__item" key={skill.name}>
                      <div className="skills__item-head">
                        <span>{skill.name}</span>
                        <span className="skills__pct" style={{ color: accent }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skills__bar">
                        <motion.div
                          className="skills__fill"
                          style={{
                            background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
                            boxShadow: `0 0 10px ${accent}`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: ci * 0.12 + si * 0.08,
                            ease: 'easeOut',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </NeonCard>
            </motion.div>
          );
        })}
      </div>

      <div className="skills__unified-loop skills__reveal">
        <LogoLoop
          logos={allLogos}
          speed={40}
          direction="left"
          logoHeight={40}
          gap={60}
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
        />
      </div>
    </div>
  );
}
