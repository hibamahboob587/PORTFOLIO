import { create } from 'zustand';

interface AppState {
  /** Controls the loading overlay visibility. */
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;

  /** Currently visible section id, drives nav highlighting. */
  activeSection: string;
  setActiveSection: (id: string) => void;

  /** Coarse device flag used to scale down effects on small screens. */
  isMobile: boolean;
  setIsMobile: (v: boolean) => void;

  /** Normalised scroll progress across the whole page (0 → 1). */
  scrollProgress: number;
  setScrollProgress: (v: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: (v) => set({ isLoaded: v }),

  activeSection: 'hero',
  setActiveSection: (id) => set({ activeSection: id }),

  isMobile: false,
  setIsMobile: (v) => set({ isMobile: v }),

  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),
}));
