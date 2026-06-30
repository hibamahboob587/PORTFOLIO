/* =========================================================================
   Central content + config. Swap the placeholder copy here for real data.
   ========================================================================= */

export const COLORS = {
  cyan: '#00f0ff',
  magenta: '#ff00aa',
  purple: '#b400ff',
  green: '#39ff14',
  bgDark: '#0a0a0f',
  bgCard: '#12121a',
  textPrimary: '#e0e0ff',
  textMuted: '#6a6a8a',
} as const;

export const PROFILE = {
  name: 'JOHN DOE',
  firstName: 'JOHN',
  lastName: 'DOE',
  tagline: 'Full-Stack Developer & Creative Technologist',
  location: 'Remote · Earth',
  email: 'hello@johndoe.dev',
  resumeUrl: '#',
} as const;

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 48, suffix: '+', label: 'Projects Shipped' },
  { value: 22, suffix: 'k', label: 'GitHub Commits' },
  { value: 100, suffix: '%', label: 'Caffeine Powered' },
];

export interface SkillCategory {
  title: string;
  accent: keyof typeof COLORS;
  skills: { name: string; level: number }[];
}

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    accent: 'cyan',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Three.js / WebGL', level: 85 },
      { name: 'CSS / Tailwind', level: 90 },
    ],
  },
  {
    title: 'Backend',
    accent: 'magenta',
    skills: [
      { name: 'Node.js / Bun', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'GraphQL / REST', level: 86 },
      { name: 'Python', level: 78 },
    ],
  },
  {
    title: 'Tools & DevOps',
    accent: 'purple',
    skills: [
      { name: 'Docker / K8s', level: 80 },
      { name: 'AWS / Vercel', level: 84 },
      { name: 'CI/CD', level: 81 },
      { name: 'Git', level: 94 },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  blurb: string;
  description: string;
  tags: string[];
  accent: keyof typeof COLORS;
  liveUrl: string;
  repoUrl: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'neon-grid',
    title: 'Neon Grid OS',
    blurb: 'A browser-based synthwave operating system.',
    description:
      'A fully themeable, window-managed desktop environment running in the browser. Features a draggable window system, a fake terminal with a real command parser, and a WebGL boot sequence.',
    tags: ['React', 'WebGL', 'Zustand', 'Vite'],
    accent: 'cyan',
    liveUrl: '#',
    repoUrl: '#',
    year: '2025',
  },
  {
    id: 'pulse-analytics',
    title: 'Pulse Analytics',
    blurb: 'Real-time data viz dashboard for IoT fleets.',
    description:
      'Streams millions of sensor events per minute into an interactive 3D globe and time-series charts. Built for sub-100ms render budgets with virtualized rendering and WebSockets.',
    tags: ['Next.js', 'D3', 'WebSocket', 'Redis'],
    accent: 'magenta',
    liveUrl: '#',
    repoUrl: '#',
    year: '2024',
  },
  {
    id: 'synthwave-cms',
    title: 'Synthwave CMS',
    blurb: 'Headless CMS with a retro-futurist editor.',
    description:
      'A type-safe headless content platform with a block-based editor, live preview, and a plugin API. Powers a network of indie publications with edge-rendered delivery.',
    tags: ['TypeScript', 'GraphQL', 'PostgreSQL', 'Docker'],
    accent: 'purple',
    liveUrl: '#',
    repoUrl: '#',
    year: '2024',
  },
  {
    id: 'aurora-engine',
    title: 'Aurora Engine',
    blurb: 'A tiny procedural shader playground.',
    description:
      'An in-browser GLSL playground with hot-reload, an audio-reactive uniform bus, and a gallery of community shaders. Designed to make learning shader art approachable.',
    tags: ['Three.js', 'GLSL', 'Web Audio', 'React'],
    accent: 'green',
    liveUrl: '#',
    repoUrl: '#',
    year: '2023',
  },
];

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export const SOCIALS: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
  { id: 'twitter', label: 'Twitter', url: 'https://twitter.com' },
  { id: 'email', label: 'Email', url: 'mailto:hello@johndoe.dev' },
];

export const ABOUT_BIO = [
  "I'm a full-stack engineer who lives at the intersection of clean architecture and pixel-pushing.",
  'For the last six years I have shipped products that blend solid backends with experiences people actually remember — from real-time dashboards to WebGL toys.',
  'When I am not refactoring something, I am probably writing shaders, breaking synthesizers, or arguing about monospace fonts.',
];
