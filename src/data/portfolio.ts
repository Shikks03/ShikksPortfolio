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
    epithet: 'Full-Stack Web Developer',
    subtitle: 'Designer · Engineer · Apprentice of the Loop',
  },

  projects: [
    {
      id: 'riku',
      name: 'RIKU',
      epithet: 'Forge of the Small Folk',
      type: "Founder's Forge",
      rarity: 'Legendary',
      hue: 168,
      tint: '#2f6f62',
      shape: 'kite',
      stats: { ATK: 52, FAITH: 60, ARC: 57, SPD: 45 },
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'GSAP · Lenis', 'Static · Vercel'],
      desc: 'My own studio, a freelance practice building websites and back-office systems for Philippine small businesses whose operations still live in a notebook. Eight service tiers with published starting prices, six client builds written up as case studies. The site itself is the argument: the hero\'s cursor trail runs a Jos Stam stable fluids simulation in GLSL. Nothing is computed at request time.',
      github: 'https://github.com/Shikks03',
      url: 'https://riku.works',
      xp: 66, yp: 5,
    },
    {
      id: 'empathora',
      name: 'Empathora',
      epithet: 'Standard of the Common Weal',
      type: 'Covenant Banner',
      rarity: 'Rare',
      hue: 264,
      tint: '#5a4a86',
      shape: 'kite',
      stats: { ATK: 34, FAITH: 58, ARC: 33, SPD: 41 },
      tags: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind · Motion', 'Static Site'],
      desc: 'A four page site for a Philippine training and development organization and its six programs, one each for children, older adults, women, men, climate resilience, and community fellowship. It carries no API routes, no server actions, and no database; every page is prerendered at build time. The inner pages check for reduced motion before animating anything.',
      github: 'https://github.com/Shikks03',
      url: 'https://empathora-international.vercel.app',
      xp: 11, yp: 17,
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
      tags: ['Next.js 16', 'React 19', 'Supabase', 'Tailwind 4', 'Upstash Redis'],
      desc: 'The night FEU Tech\'s CS community traded terminals for a masquerade ball, and the site that ran it. The programme opens act by act, and behind two locked doors sits a 256 seat map that officers filled by hand, one name at a time. I hosted and led the event, and it took Best Non-Academic Activity for the year.',
      github: 'https://github.com/Shikks03',
      url: 'https://csnight.fit',
      xp: 34, yp: 9,
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
      tags: ['HTML · CSS · JS', 'No Framework', 'Vercel', 'Freelance'],
      desc: 'A one page shop window for a mochi maker working across Cavite and Manila: three cats, three flavors, hand folded in small batches. There is no framework here and no build step. Just over three hundred lines of vanilla JavaScript do all of it. On desktop the hero mochi squishes as you scroll, and orders leave through a Google form.',
      github: 'https://github.com/Shikks03',
      url: 'https://meowchi.vercel.app',
      xp: 50, yp: 28,
    },
    {
      id: 'ihalalan',
      name: 'iHalalan',
      epithet: 'Warden of the Single Voice',
      type: 'Civic Talisman',
      rarity: 'Rare',
      hue: 140,
      tint: '#4a6650',
      shape: 'diamond',
      stats: { ATK: 28, FAITH: 64, ARC: 42, SPD: 30 },
      tags: ['Next.js 16', 'React 19', 'MongoDB', 'Tailwind 4', 'Civic Tech'],
      desc: 'A voting system for Filipino club and community elections, named for halalan, Tagalog for election. Each voter gets one nine digit token, and a MongoDB transaction spends it in the same breath the ballot lands, so a double vote loses a race rather than slipping through. Results flow to the tally board over a change stream.',
      github: 'https://github.com/Shikks03',
      xp: 80, yp: 26,
    },
    {
      id: 'quizgive',
      name: 'QuizGive',
      epithet: 'Whetstone of Recall',
      type: 'Pedagogy Relic',
      rarity: 'Uncommon',
      hue: 48,
      tint: '#b9912f',
      shape: 'shard',
      stats: { ATK: 36, FAITH: 39, ARC: 55, SPD: 41 },
      tags: ['React 18', 'Vite 5', 'Supabase', 'Tailwind', 'EdTech'],
      desc: 'Feed it a quizfetch export, or just paste your notes, and QuizGive turns them into a graded quiz. Five parsers race over the pasted text (term and definition pairs, question and answer blocks, markdown tables, numbered lists, raw JSON) and whichever reads it most confidently wins. Miss a few and you can retake only what you got wrong.',
      url: 'https://quiz-give.vercel.app',
      github: 'https://github.com/Shikks03',
      xp: 12, yp: 70,
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
      tags: ['React 18', 'Vite 6', 'TypeScript', 'GSAP · Lenis', 'Thesis · FEU Tech'],
      desc: 'The public face of a thesis project at FEU Tech: an Android app that catches inappropriate language on a child\'s phone, Filipino and English alike, including the deliberately misspelled kind, by scoring it with Levenshtein distance. A stripped-down version of that scorer runs live in the page. On desktop, one phone mockup travels and morphs across four sections on scroll-driven GSAP timelines.',
      github: 'https://github.com/Shikks03',
      url: 'https://overseethesis.vercel.app',
      xp: 50, yp: 88,
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
      tags: ['Next.js 16', 'React 19', 'MongoDB', 'JWT Auth', 'three.js', 'Freelance'],
      desc: 'Not a brochure. Built for a repair shop in Imus: customers book appointments, track repairs, and reserve accessories out front, while staff work the same records from a protected admin panel behind. The WebGL backdrop waits for requestIdleCallback so it never costs the first paint, then falls back to a 47KB still.',
      github: 'https://github.com/Shikks03',
      url: 'https://azerotech.vercel.app',
      xp: 78, yp: 81,
    },
    {
      id: 'salu',
      name: 'Salu',
      epithet: 'Steward of the Revels',
      type: 'Court Ledger',
      rarity: 'Legendary',
      hue: 330,
      tint: '#7a3a4a',
      shape: 'obelisk',
      stats: { ATK: 44, FAITH: 55, ARC: 61, SPD: 34 },
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma · Neon', 'Auth.js · RBAC', 'shadcn/ui'],
      desc: 'Staff-only back-office for a hybrid party rentals and event planning business, with four staff roles and a quote to payment spine. Its one real trick is the money: receipts from GCash, Maya, a bank transfer, or a paper OR get photographed, read by Claude vision, and posted to the ledger with a confidence score.',
      github: 'https://github.com/Shikks03',
      xp: 63, yp: 55,
    },
    {
      id: 'shikkstracker',
      name: 'ShikksTracker',
      epithet: 'Sieve of the Winnowing',
      type: 'Winnowing Glass',
      rarity: 'Rare',
      hue: 28,
      tint: '#b5613a',
      shape: 'shard',
      stats: { ATK: 30, FAITH: 36, ARC: 48, SPD: 46 },
      tags: ['Next.js 16', 'MongoDB · Mongoose', 'Claude API', 'Gmail API', 'Vitest'],
      desc: 'The outreach desk behind my freelance practice. It holds the contact list, has Claude draft a three touch sequence for each lead, sends through my own Gmail, and scores opens, clicks, and replies until someone crosses into hot. A reply stops the sequence dead and emails me an alert, because past that point a person should be writing.',
      github: 'https://github.com/Shikks03',
      xp: 26, yp: 44,
    },
    {
      id: 'tokentracker',
      name: 'TokenTracker',
      epithet: 'Hourglass of the Loop',
      type: "Craftsman's Astrolabe",
      rarity: 'Rare',
      hue: 96,
      tint: '#5c6b34',
      shape: 'hex',
      stats: { ATK: 39, FAITH: 21, ARC: 62, SPD: 44 },
      tags: ['Electron', 'React 18 · Vite', 'TypeScript', 'SQLite · better-sqlite3', 'Recharts', 'Desktop App'],
      desc: 'The only work here that is not a website. A desktop app in the tray, keeping a private ledger of my hours at the loop: tokens, models, projects, and streaks, in local SQLite that never leaves the machine. Claude Code posts each session to a small server on port 27420, which answers 200 even when the payload is malformed, because a tracker should never be why your editor stalls.',
      github: 'https://github.com/Shikks03',
      xp: 90, yp: 50,
    },
    {
      id: 'wheel',
      name: 'The Wheel',
      epithet: 'Turning of Small Fates',
      type: 'Fate Engine',
      rarity: 'Rare',
      hue: 6,
      tint: '#7a2f3a',
      shape: 'oval',
      stats: { ATK: 41, FAITH: 47, ARC: 66, SPD: 33 },
      tags: ['React 18', 'Vite · TypeScript', 'Event-Sourced Store', 'JSON Rulesets', 'Vitest · 35 suites', 'In Progress'],
      desc: 'Dungeons and Dragons character creation, run on one wheel instead of dice. Spin an archetype, five stats, an element, and a weakness into a character, then spin again to duel, train, or retire. Fights settle on a triangle where speed beats strength, strength beats defense, and defense beats speed. The ruleset lives in validated JSON, so the game retunes without a rebuild.',
      github: 'https://github.com/Shikks03',
      xp: 42, yp: 58,
    },
  ],

  constellationEdges: [
    ['riku', 'ihalalan'],
    ['riku', 'meowchi'],
    ['empathora', 'csnight'],
    ['csnight', 'meowchi'],
    ['meowchi', 'ihalalan'],
    ['oversee', 'azerotech'],
    ['quizgive', 'empathora'],
    ['quizgive', 'oversee'],
    ['salu', 'ihalalan'],
    ['salu', 'azerotech'],
    ['salu', 'oversee'],
    ['shikkstracker', 'empathora'],
    ['shikkstracker', 'csnight'],
    ['shikkstracker', 'quizgive'],
    ['tokentracker', 'ihalalan'],
    ['tokentracker', 'salu'],
    ['wheel', 'csnight'],
    ['wheel', 'quizgive'],
  ],

  achievements: {
    title: 'CHRONICLE OF DEEDS',
    level: 6,
    runes: 12480,
    class: 'Full-Stack Developer',
    intro:
      'Shikkari is a full-stack developer and designer who builds small, useful things for real people ' +
      'and ships them end to end, from the interface down to the system underneath. The same hands that ' +
      'write the code also shape how it looks and feels, and somewhere along the road they came to lead ' +
      'an order: first publicity, then outreach and marketing, then the whole chapter. This page is the ' +
      'record of it.',
    skills: [
      { school: 'Frontcraft',   note: 'Front-end work, the part people see and touch.',
        arts: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
      { school: 'Design Arts',  note: 'Design and brand, from wireframe to finished feel.',
        arts: ['UI / UX', 'Brand & Identity', 'Motion', 'Figma'] },
      { school: 'Systemcraft',  note: 'Under the hood: data, delivery, and realtime.',
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
        body: 'Keeper of the chapter\'s voice. Each banner, post, and sigil passed beneath this hand.' },
      { year: '2026',      title: 'President',                    org: 'FEU Tech · ACM',
        body: 'The seat at the head of the round table. Stewardship of the order.' },
    ],
  },

  contact: {
    intro: 'Three sealed stones bear the ways to reach me. Strike one, and the way opens.',
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
