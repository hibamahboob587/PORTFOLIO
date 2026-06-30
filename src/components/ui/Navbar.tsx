import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import { NAV_ITEMS, PROFILE } from '../../utils/constants';
import './Navbar.css';

export default function Navbar() {
  const activeSection = useStore((s) => s.activeSection);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide on scroll-down, reveal on scroll-up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 200 && !menuOpen);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="navbar__inner">
        <button className="navbar__logo font-display" onClick={() => go('hero')}>
          {PROFILE.firstName}
          <span className="navbar__logo-accent">_{PROFILE.lastName}</span>
          <span className="navbar__cursor">▮</span>
        </button>

        <nav className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`navbar__link ${
                activeSection === item.id ? 'navbar__link--active' : ''
              }`}
              onClick={() => go(item.id)}
            >
              {item.label}
              <span className="navbar__underline" />
            </button>
          ))}
        </nav>

        <button
          className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="navbar__mobile glass"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`navbar__mobile-link font-display ${
                  activeSection === item.id ? 'is-active' : ''
                }`}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
