# Cyberpunk 3D Portfolio

An immersive, scroll-driven 3D portfolio with a cyberpunk aesthetic — neon accents,
glitch effects, bloom lighting, a Tron-style grid floor, and floating procedural geometry.

Built with **Vite + React + TypeScript**, **Three.js / @react-three/fiber / drei /
postprocessing**, **Motion (Framer Motion)**, **GSAP ScrollTrigger**, and **Zustand**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
```

## Where to put your content

All copy and data live in **`src/utils/constants.ts`** — edit this one file to make the
site yours:

| Constant | What it controls |
|---|---|
| `PROFILE` | Name, tagline, email, location, résumé link (also used in `index.html` `<title>`/meta) |
| `ABOUT_BIO` | The paragraphs in the About section |
| `STATS` | The animated counters in the About card |
| `SKILLS` | Skill categories + proficiency bars |
| `PROJECTS` | Project cards (title, blurb, full description, tags, links, year) |
| `SOCIALS` | Social links in the Contact section |
| `NAV_ITEMS` | Navbar entries (must match section ids) |

> The hero name also appears in `index.html` meta tags — update those for SEO/social cards.

## Notes & design decisions

- **Single WebGL context.** The plan referenced a user-supplied `<GridScan>` component
  running its own renderer. Since that component wasn't provided, the neon grid is built as
  a procedural shader (`NeonGrid.tsx`) **inside the one R3F canvas** — this avoids the
  performance cost and complexity of two simultaneous WebGL contexts.
- **No backend.** The contact form is fully styled and interactive but simulates a
  "transmission" on submit (see `Contact.tsx`). Wire it to a real endpoint / form service
  (Formspree, Resend, etc.) when ready.
- **Performance guards.** `AdaptiveDpr`, `AdaptiveEvents`, a lazy-loaded canvas, reduced
  particle counts on mobile, and a trimmed post-processing chain on small screens.
- **Accessibility.** Honors `prefers-reduced-motion` (animations and glitch effects are
  disabled).

## Structure

```
src/
├── components/
│   ├── canvas/    # R3F scene: NeonGrid, ParticleField, FloatingGeometry, Effects
│   ├── sections/  # Hero, About, Skills, Projects, Contact
│   ├── ui/        # Navbar, ScrollProgress, GlitchText, NeonButton, NeonCard, Loader
│   └── layout/    # SectionWrapper (scroll-spy)
├── hooks/         # useMediaQuery, useScrollAnimation (GSAP)
├── store/         # Zustand store
└── utils/         # constants.ts  ← your content
```
