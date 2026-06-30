import { type ReactNode, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a page section, registers it with an IntersectionObserver so the
 * store's `activeSection` (and the navbar highlight) stays in sync with scroll.
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const setActiveSection = useStore((s) => s.setActiveSection);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, setActiveSection]);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
