import { useState, useRef, type FormEvent } from 'react';
import { motion } from 'motion/react';
import NeonButton from '../ui/NeonButton';
import ScrollReveal from '../ui/ScrollReveal';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import { SOCIALS, PROFILE } from '../../utils/constants';
import './Contact.css';

type Status = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const scope = useRef<HTMLDivElement>(null);
  useScrollReveal(scope, { childSelector: '.contact__reveal', stagger: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  // No backend: simulate a transmission so the UI feels complete.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1600);
  };

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="section contact">
      <div className="contact__head">
        <p className="section-eyebrow">04 // Establish Connection</p>
        <div className="section-title">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={8}
          >
            Let's Build Something
          </ScrollReveal>
        </div>
        <div className="contact__lead">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
          >
            Got a project, a role, or a wild idea? Drop a transmission.
          </ScrollReveal>
        </div>
      </div>

      <div className="contact__grid">
        <motion.form
          className="contact__form glass"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="contact__field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              placeholder="Ada Lovelace"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </div>

          <div className="contact__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@domain.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>

          <div className="contact__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="Tell me about the mission..."
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
            />
          </div>

          <NeonButton type="submit" variant="primary" className="contact__submit">
            {status === 'idle' && 'Transmit ▸'}
            {status === 'sending' && 'Transmitting…'}
            {status === 'sent' && 'Message Sent ✓'}
          </NeonButton>

          {status === 'sent' && (
            <motion.p
              className="contact__success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ◉ Transmission received. I'll be in touch shortly.
            </motion.p>
          )}
        </motion.form>

        <motion.aside
          className="contact__side"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="contact__direct">
            <span className="contact__direct-label font-display">Direct line</span>
            <a href={`mailto:${PROFILE.email}`} className="contact__email">
              {PROFILE.email}
            </a>
          </div>

          <div className="contact__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="contact__social font-display"
              >
                <span className="contact__social-arrow">↗</span>
                {s.label}
              </a>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
