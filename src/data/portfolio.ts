export type GemShape = 'kite' | 'hex' | 'oval' | 'shard' | 'teardrop' | 'diamond' | 'obelisk';

export interface Project {
  id: string;
  name: string;
  epithet: string;
  type: string;
  rarity: string;
  hue: number;
  /** aged-enamel tint (hex) for the carved seal — the project's quiet identity */
  tint: string;
  shape: GemShape;
  stats: { ATK: number; FAITH: number; ARC: number; SPD: number };
  tags: string[];
  desc: string;
  github: string;
  url?: string;
  xp: number;
  yp: number;
}

export interface PortfolioData {
  hero: { name: string; epithet: string; subtitle: string };
  projects: Project[];
  constellationEdges: [string, string][];
  achievements: {
    title: string;
    level: number;
    runes: number;
    class: string;
    intro: string;
    skills: Array<{ school: string; note: string; arts: string[] }>;
    stats: Array<{ key: string; val: number; note: string }>;
    timeline: Array<{ year: string; title: string; org: string; body: string }>;
  };
  contact: {
    intro: string;
    handles: Array<{ label: string; value: string; href: string; rune?: string; tint?: string }>;
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  hero: {
    name: 'SHIKKARI',
    epithet: 'Of the Code-Forged',
    subtitle: 'Designer · Engineer · Apprentice of the Loop',
  },

  projects: [
    {
      id: 'blinkbeat',
      name: 'Blink Beat',
      epithet: 'Glaive of the Pulse',
      type: 'Rhythm Vessel',
      rarity: 'Rare',
      hue: 16,
      tint: '#b07a32',
      shape: 'kite',
      stats: { ATK: 47, FAITH: 18, ARC: 31, SPD: 62 },
      tags: ['React', 'Web Audio', 'Game Loop'],
      desc: 'A rhythm-driven micro-game where each blink syncs the next beat. Forged to teach intuition through latency.',
      github: 'https://github.com/Shikks03',
      xp: 14, yp: 28,
    },
    {
      id: 'csnight',
      name: 'CSNight',
      epithet: 'Ledger of the Vigil',
      type: 'Event Tome',
      rarity: 'Common',
      hue: 220,
      tint: '#3a5a72',
      shape: 'hex',
      stats: { ATK: 22, FAITH: 41, ARC: 28, SPD: 35 },
      tags: ['Next.js', 'Tailwind', 'CMS'],
      desc: 'Annual student-org night-of-CS site. Schedules, talks, RSVPs — kept alive through three regimes of organizers.',
      github: 'https://github.com/Shikks03',
      url: 'https://csnight.vercel.app',
      xp: 38, yp: 18,
    },
    {
      id: 'meowchi',
      name: 'Meowchi',
      epithet: 'Whisker of the Hearth',
      type: 'Freelance Sigil',
      rarity: 'Uncommon',
      hue: 340,
      tint: '#7a2e1f',
      shape: 'teardrop',
      stats: { ATK: 33, FAITH: 51, ARC: 22, SPD: 48 },
      tags: ['Freelance', 'E-commerce', 'Brand'],
      desc: 'Storefront for a small bakery. Soft palette, careful motion. Real customers, real receipts.',
      github: 'https://github.com/Shikks03',
      url: 'https://meowchi.vercel.app',
      xp: 56, yp: 28,
    },
    {
      id: 'ihalalan',
      name: 'iHalalan',
      epithet: 'Compass of the Faithful',
      type: 'Civic Talisman',
      rarity: 'Rare',
      hue: 140,
      tint: '#4a6650',
      shape: 'diamond',
      stats: { ATK: 28, FAITH: 64, ARC: 42, SPD: 30 },
      tags: ['Civic Tech', 'Maps', 'PWA'],
      desc: 'Locator and verifier for halal establishments. A small map made with care for the people it serves.',
      github: 'https://github.com/Shikks03',
      xp: 86, yp: 26,
    },
    {
      id: 'quizgive',
      name: 'QuizGive',
      epithet: 'Token of the Open Hand',
      type: 'Pedagogy Relic',
      rarity: 'Uncommon',
      hue: 48,
      tint: '#b9912f',
      shape: 'shard',
      stats: { ATK: 36, FAITH: 39, ARC: 55, SPD: 41 },
      tags: ['EdTech', 'Donations', 'Quiz Engine'],
      desc: 'A quiz platform where right answers fund causes. Learning that gives back, by design.',
      url: 'https://quiz-give.vercel.app',
      github: 'https://github.com/Shikks03',
      xp: 22, yp: 70,
    },
    {
      id: 'oversee',
      name: 'OverSee',
      epithet: 'Eye of the Ledger',
      type: 'Watchstone',
      rarity: 'Rare',
      hue: 280,
      tint: '#5a3a52',
      shape: 'obelisk',
      stats: { ATK: 44, FAITH: 23, ARC: 58, SPD: 39 },
      tags: ['Monitoring', 'Dashboard', 'Realtime'],
      desc: 'An overseer\'s dashboard. Quiet when calm, loud when the floor is shifting.',
      github: 'https://github.com/Shikks03',
      xp: 50, yp: 78,
    },
    {
      id: 'azerotech',
      name: 'Azerotech',
      epithet: 'Sigil of Commerce',
      type: 'Freelance Sigil',
      rarity: 'Uncommon',
      hue: 200,
      tint: '#41617a',
      shape: 'oval',
      stats: { ATK: 31, FAITH: 27, ARC: 36, SPD: 53 },
      tags: ['Freelance', 'Corporate', 'Marketing'],
      desc: 'Corporate site for a tech consultancy. Sober, fast, easy to maintain — exactly the brief.',
      github: 'https://github.com/Shikks03',
      url: 'https://azerotech.vercel.app',
      xp: 78, yp: 76,
    },
  ],

  constellationEdges: [
    ['blinkbeat', 'csnight'],
    ['csnight', 'meowchi'],
    ['meowchi', 'ihalalan'],
    ['ihalalan', 'oversee'],
    ['oversee', 'azerotech'],
    ['quizgive', 'blinkbeat'],
    ['quizgive', 'oversee'],
    ['csnight', 'quizgive'],
  ],

  achievements: {
    title: 'CHRONICLE OF DEEDS',
    level: 6,
    runes: 12480,
    class: 'Full-Stack Developer',
    intro:
      'Born of the Code-Forged and raised beneath flickering monitors, the Tarnished known as Shikkari ' +
      'walks the seam where the drawn line meets the running system. Designer by eye and engineer by hand — ' +
      'a maker who would sooner ship a small thing that serves real people than a grand one that serves none. ' +
      'What began as apprenticeship to the Loop grew into stewardship of an order, and the same hands that ' +
      'inscribe interfaces now raise banners and gather crowds. What follows is the reckoning of that road: ' +
      'the attributes honed, the arts learned, and the deeds set down in ledger.',
    skills: [
      { school: 'Frontcraft',   note: 'Spells cast upon the running interface.',
        arts: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
      { school: 'Design Arts',  note: 'The drawn line and the felt moment.',
        arts: ['UI / UX', 'Brand & Identity', 'Motion', 'Figma'] },
      { school: 'Systemcraft',  note: 'Foundations laid beneath the surface.',
        arts: ['PWA', 'Realtime', 'CMS & APIs', 'Web Audio'] },
    ],
    stats: [
      { key: 'VIGOR',        val: 24, note: 'Endurance through trials' },
      { key: 'MIND',         val: 31, note: 'Recall of the codices' },
      { key: 'INTELLIGENCE', val: 28, note: 'Spell-craft and reasoning' },
      { key: 'FAITH',        val: 42, note: 'Conviction in the cause' },
      { key: 'DEXTERITY',    val: 35, note: 'Swift hands at the keys' },
      { key: 'ARCANE',       val: 38, note: 'Strange knowing of systems' },
    ],
    timeline: [
      { year: '2023–2024', title: 'Junior Officer of Publicity',  org: 'FEU Tech · ACM',
        body: 'Apprenticeship taken. Tasked with raising the banner of the chapter; learned the craft of summoning crowds.' },
      { year: '2024–2025', title: 'Director for Outreach',        org: 'FEU Tech · ACM',
        body: 'Carried the chapter beyond its walls. Forged ties with neighboring guilds and lesser strongholds.' },
      { year: '2025',      title: 'Best Outreach Activity',       org: 'FEU Tech (Award)',
        body: 'A laurel awarded for the year\'s outreach campaign. The hall remembers.' },
      { year: '2025–2026', title: 'Director for Marketing',       org: 'FEU Tech · ACM',
        body: 'Tasked with the chapter\'s voice. Each banner, post, and sigil passed beneath this hand.' },
      { year: '2026',      title: 'President',                    org: 'FEU Tech · ACM',
        body: 'The seat at the head of the round table. Stewardship of the order.' },
    ],
  },

  contact: {
    intro: 'Three sealed stones bear the ways to reach me — strike one, and the way opens.',
    handles: [
      { label: 'GitHub',   value: 'github.com/Shikks03',      href: 'https://github.com/Shikks03',                           rune: 'github',   tint: '#8a93a6' },
      { label: 'LinkedIn', value: 'in/shikkari-ipil',         href: 'https://www.linkedin.com/in/shikkari-ipil-94b5b4368/',  rune: 'linkedin', tint: '#3a6b8a' },
      { label: 'Email',    value: 'shikkariipil@gmail.com',   href: 'mailto:shikkariipil@gmail.com',                         rune: 'email',    tint: '#c47a3e' },
    ],
  },
};

export const MENU_ITEMS = [
  { id: 'projects',     label: 'Works of Old' },
  { id: 'achievements', label: 'Chronicle' },
  { id: 'contact',      label: 'Summon' },
  { id: 'tome',         label: 'Resume · Tome' },
];
