import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealOptions {
  /** Selector for children to stagger in, relative to the scope element. */
  childSelector?: string;
  /** Animate the container itself if no childSelector is given. */
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

/**
 * Scroll-triggered "fade + rise" reveal. Pass a scope ref; either the scope
 * animates, or — if `childSelector` is set — its matching children stagger in.
 */
export function useScrollReveal(
  scope: RefObject<HTMLElement | null>,
  {
    childSelector,
    y = 40,
    duration = 0.8,
    stagger = 0.12,
    start = 'top 80%',
  }: RevealOptions = {},
) {
  useGSAP(
    () => {
      const targets = childSelector ? childSelector : scope.current;
      if (!targets) return;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        ease: 'power3.out',
        stagger: childSelector ? stagger : 0,
        scrollTrigger: {
          trigger: scope.current,
          start,
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope },
  );
}

export { gsap, ScrollTrigger };
