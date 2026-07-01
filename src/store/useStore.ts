import { create } from 'zustand';
import type Lenis from 'lenis';

interface AppState {
  /** Controls the loading overlay visibility. */
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;

  /** Currently visible section id, drives nav highlighting. */
  activeSection: string;
  setActiveSection: (id: string) => void;

  /** The Lenis smooth-scroll instance, so overlays can lock scrolling. */
  lenis: Lenis | null;
  setLenis: (l: Lenis | null) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: (v) => set({ isLoaded: v }),

  activeSection: 'hero',
  setActiveSection: (id) => set({ activeSection: id }),

  lenis: null,
  setLenis: (l) => set({ lenis: l }),
}));
