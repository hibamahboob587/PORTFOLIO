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
  name: 'EMAN ARSHAD',
  firstName: 'EMAN',
  lastName: 'ARSHAD',
  tagline: 'Full Stack Developer & Creative Technologist',
  location: 'Remote · Worldwide',
  email: 'hello@emanarshad.dev',
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
  { value: 3, suffix: '+', label: 'Years Experience' },
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
  category: string;
  blurb: string;
  description: string;
  tags: string[];
  accent: keyof typeof COLORS;
  video: string;
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'forge-fitness',
    title: 'Forge Fitness',
    category: 'Gym & Fitness',
    blurb: 'High energy gym site with class schedules and quick membership signups.',
    description:
      'A high energy fitness center website complete with class schedules, trainer profiles, and quick membership signups.',
    tags: ['Fitness', 'Scheduling', 'Memberships'],
    accent: 'cyan',
    video: '/projects/forge-fitness.mp4',
    liveUrl: 'https://forge-fitness-theta-five.vercel.app/',
  },
  {
    id: 'clearwater-dental',
    title: 'Clearwater Dental',
    category: 'Dental Clinic',
    blurb: 'Modern dental clinic with online appointment booking and patient testimonials.',
    description:
      'A modern, welcoming dental clinic website featuring easy appointment scheduling, service details, and patient testimonials.',
    tags: ['Healthcare', 'Appointments', 'Testimonials'],
    accent: 'magenta',
    video: '/projects/clearwater-dental.mp4',
    liveUrl: 'https://cleanwater-dental.vercel.app/',
  },
  {
    id: 'brightpath',
    title: 'Brightpath',
    category: 'EdTech',
    blurb: 'Interactive online learning platform for course management and student engagement.',
    description:
      'An interactive educational platform designed for seamless online learning, course management, and student engagement.',
    tags: ['EdTech', 'Online Learning', 'LMS'],
    accent: 'purple',
    video: '/projects/brightpath.mp4',
    liveUrl: 'https://bright-path-edtech.vercel.app/',
  },
  {
    id: 'solene',
    title: 'Solene',
    category: 'Fashion',
    blurb: 'Sleek fashion ecommerce storefront with a premium shopping experience.',
    description:
      'A sleek and stylish ecommerce storefront showcasing the latest fashion trends with an intuitive, premium shopping experience.',
    tags: ['Ecommerce', 'Fashion', 'Storefront'],
    accent: 'green',
    video: '/projects/solene.mp4',
    liveUrl: 'https://solene-fashion.vercel.app/',
  },
  {
    id: 'sterling-home',
    title: 'Sterling Home Co.',
    category: 'Home Services',
    blurb: 'Home services booking platform with customer reviews and instant quoting.',
    description:
      'A reliable booking platform for home maintenance and repair services, featuring customer reviews and instant quoting.',
    tags: ['Home Services', 'Booking', 'Quoting'],
    accent: 'cyan',
    video: '/projects/sterling-home.mp4',
    liveUrl: 'https://sterling-home.vercel.app/',
  },
  {
    id: 'hartwell-cole',
    title: 'Hartwell & Cole',
    category: 'Law Firm',
    blurb: 'Professional law firm site with attorney profiles and consultation booking.',
    description:
      'A professional and trustworthy legal practice website detailing practice areas, attorney profiles, and easy consultation booking.',
    tags: ['Legal', 'Consultation', 'Corporate'],
    accent: 'magenta',
    video: '/projects/hartwell-cole.mp4',
    liveUrl: 'https://hartwell-and-co.vercel.app/',
  },
  {
    id: 'vantage-freight',
    title: 'Vantage Freight',
    category: 'Logistics',
    blurb: 'Logistics and freight site with shipment tracking and global reach.',
    description:
      'A robust logistics and freight forwarding site highlighting shipment tracking, core service offerings, and global reach.',
    tags: ['Logistics', 'Tracking', 'Freight'],
    accent: 'purple',
    video: '/projects/vantage-freight.mp4',
    liveUrl: 'https://vantage-freight-logistics.vercel.app/',
  },
  {
    id: 'wren-hale',
    title: 'Wren Hale',
    category: 'Photography',
    blurb: 'Photography portfolio with high resolution galleries and a contact portal.',
    description:
      'A visually stunning photography portfolio showcasing high resolution galleries, service packages, and a contact portal.',
    tags: ['Photography', 'Portfolio', 'Galleries'],
    accent: 'green',
    video: '/projects/wren-hale.mp4',
    liveUrl: 'https://wren-hale.vercel.app/',
  },
  {
    id: 'meridian-properties',
    title: 'Meridian Properties',
    category: 'Real Estate',
    blurb: 'Real estate portal with property listings and agent directories.',
    description:
      'A comprehensive real estate portal for beautiful property listings, agent directories, and seamless neighborhood exploration.',
    tags: ['Real Estate', 'Listings', 'Search'],
    accent: 'cyan',
    video: '/projects/meridian-properties.mp4',
    liveUrl: 'https://meridian-props.vercel.app/',
  },
  {
    id: 'ember-salt',
    title: 'Ember & Salt',
    category: 'Restaurant',
    blurb: 'Restaurant site with dynamic digital menus and online reservations.',
    description:
      'An appetizing restaurant website featuring dynamic digital menus, integrated online reservations, and vibrant food imagery.',
    tags: ['Restaurant', 'Reservations', 'Menus'],
    accent: 'magenta',
    video: '/projects/ember-salt.mp4',
    liveUrl: 'https://ember-salt-bistro.vercel.app/',
  },
  {
    id: 'pulse',
    title: 'Pulse',
    category: 'SaaS Startup',
    blurb: 'Conversion focused SaaS landing page with key features and pricing tiers.',
    description:
      'A clean, conversion focused landing page for a software as a service product highlighting key features and pricing tiers.',
    tags: ['SaaS', 'Landing Page', 'Pricing'],
    accent: 'purple',
    video: '/projects/pulse.mp4',
    liveUrl: 'https://pulse-saas-startup.vercel.app/',
  },
  {
    id: 'lumen-studio',
    title: 'Lumen Studio',
    category: 'Salon & Spa',
    blurb: 'Elegant spa site with detailed service menus and direct online booking.',
    description:
      'A relaxing and elegant spa website offering detailed service menus, wellness packages, and direct online booking.',
    tags: ['Spa', 'Wellness', 'Booking'],
    accent: 'green',
    video: '/projects/lumen-studio.mp4',
    liveUrl: 'https://lumen-studio-ten.vercel.app/',
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
  { id: 'email', label: 'Email', url: 'mailto:hello@emanarshad.dev' },
];

export const ABOUT_BIO = [
  "I'm a full stack web developer who loves turning ideas into clean, modern websites that feel effortless to use.",
  "Over the past 3+ years I've designed and shipped websites for businesses across many industries, from dental clinics and law firms to fashion stores and SaaS startups.",
  'I care about the details that make a site convert: fast load times, smooth interactions, and a design that earns trust on the very first visit.',
];
