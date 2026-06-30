import { create } from 'zustand';

interface AppState {
  /** Controls the loading overlay visibility. */
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;

  /** Currently visible section id, drives nav highlighting. */
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: (v) => set({ isLoaded: v }),

  activeSection: 'hero',
  setActiveSection: (id) => set({ activeSection: id }),
}));
