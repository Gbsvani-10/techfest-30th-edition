export interface FestivalMetric {
  id: string;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  detail: string;
  formatComma?: boolean;
}

export interface ProgramItem {
  id: string;
  index: string;
  title: string;
  category: 'Competitions' | 'Workshops';
  discipline: string;
  summary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  portalUrl: string;
}

export interface ShowcasePillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  pillars: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Robotics & Arena' | 'Exhibits & Labs' | 'Stage & Night';
  location: string;
  caption: string;
  image: string;
  aspectClass: string;
}

export interface DayPhase {
  phase: string;
  title: string;
  detail: string;
}

export interface FestivalDay {
  day: string;
  date: string;
  theme: string;
  summary: string;
  focusAreas: string[];
  phases: DayPhase[];
}

export interface GlobalRegionCorridor {
  id: string;
  name: string;
  hubLabel: string;
  description: string;
  x: number;
  y: number;
}

export const OFFICIAL_PORTAL_URL = 'https://techfest.org/';

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_techfest_arena_1795339870087.jpg',
  alt: 'Monumental dark steel and concrete technology festival main stage at IIT Bombay illuminated with electric orange and crimson volumetric beams',
};

export const MARQUEE_KEYWORDS: string[] = [
  'Robotics',
  'Artificial Intelligence',
  'International Robowars',
  'Drone Soccer',
  'Global Exhibitions',
  'Embedded Systems',
  'Keynote Lectures',
  'Technoholix',
  '30th Edition · IIT Bombay',
];

export const EDITION_MILESTONES = [
  {
    year: '1998',
    title: 'Inaugural Edition',
    detail: 'Founded by IIT Bombay students as an annual engineering platform.',
  },
  {
    year: '20+',
    title: 'International Reach',
    detail: 'Participating delegations from over 20 countries and 500+ universities.',
  },
  {
    year: '180K+',
    title: 'Campus Gathering',
    detail: 'Annual multi-day attendance across Powai grounds and auditoriums.',
  },
  {
    year: '2026',
    title: '30th Milestone Edition',
    detail: 'Three days of competitions, exhibitions, keynotes, and night spectacles.',
  },
];

// 2D SVG coordinates mapped to 800x400 equirectangular projection; Mumbai (72.9E, 19.1N) => x: 562, y: 158
export const MUMBAI_HUB = {
  x: 562,
  y: 158,
  label: 'IIT Bombay, Mumbai',
};

export const GLOBAL_CORRIDORS: GlobalRegionCorridor[] = [
  {
    id: 'asia-pacific',
    name: 'Asia-Pacific',
    hubLabel: 'East & Southeast Asia',
    description:
      'Engineering teams, robotics contenders, and academic delegations converging across Asian technical institutes.',
    x: 668,
    y: 132,
  },
  {
    id: 'europe',
    name: 'Europe & UK',
    hubLabel: 'European Research Hubs',
    description:
      'International exhibition prototypes, keynote speakers, and autonomous robotics entries from European labs.',
    x: 416,
    y: 96,
  },
  {
    id: 'middle-east',
    name: 'Middle East & Africa',
    hubLabel: 'MENA & African Universities',
    description:
      'Cross-border student innovators and international competition qualifiers connecting with Mumbai.',
    x: 472,
    y: 168,
  },
  {
    id: 'americas',
    name: 'North America',
    hubLabel: 'Transatlantic Collaborations',
    description:
      'Global summit speakers, deep-tech exhibitors, and international collegiate robotics participants.',
    x: 186,
    y: 112,
  },
];

export const FESTIVAL_METRICS: FestivalMetric[] = [
  {
    id: 'founded',
    target: 1998,
    suffix: '',
    label: 'Year Founded',
    detail: 'Initiated by the student community of IIT Bombay',
  },
  {
    id: 'edition',
    target: 30,
    suffix: 'th',
    label: 'Annual Edition',
    detail: 'Three decades of science, engineering, and culture',
  },
  {
    id: 'footfall',
    target: 180000,
    suffix: '+',
    label: 'Annual Footfall',
    detail: 'Students, researchers, and innovators across campus',
    formatComma: true,
  },
  {
    id: 'nations',
    target: 20,
    suffix: '+',
    label: 'Countries Represented',
    detail: 'Global participation spanning 500+ institutions',
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'robowars',
    index: '01',
    title: 'International Robowars',
    category: 'Competitions',
    discipline: 'Combat Robotics · 15kg, 30kg & 60kg',
    summary:
      'Techfest’s flagship combat robotics arena pits custom-engineered machines from around the world inside a reinforced polycarbonate enclosure.',
    highlights: [
      'Multiple regulated weight divisions (15kg, 30kg, and 60kg)',
      'Kinetic spinners, pneumatic flippers, and high-torque drivetrains',
      'Live arena elimination rounds at IIT Bombay Powai',
    ],
    image: '/src/assets/images/robowars_combat_arena_1795339869880.jpg',
    imageAlt: 'Armored combat robots clashing with orange sparks inside an enclosed steel arena',
    portalUrl: OFFICIAL_PORTAL_URL,
  },
  {
    id: 'ai-challenges',
    index: '02',
    title: 'AI & Algorithmic Challenges',
    category: 'Competitions',
    discipline: 'Machine Intelligence · Coding & Quant',
    summary:
      'National and international engineering challenges covering applied artificial intelligence, algorithmic trading, and real-time software architecture.',
    highlights: [
      'Applied machine learning and data modeling problem statements',
      'Algorithmic trading and quantitative engineering challenges',
      'Team-based problem solving mentored with industry benchmarks',
    ],
    image: '/src/assets/images/ai_humanoid_exhibition_1795339870511.jpg',
    imageAlt: 'Matte-black humanoid robotics and machine intelligence prototype on a dark exhibition plinth',
    portalUrl: OFFICIAL_PORTAL_URL,
  },
  {
    id: 'robosoccer-drone',
    index: '03',
    title: 'RoboSoccer & Drone Soccer',
    category: 'Competitions',
    discipline: 'Autonomous & Aerial Kinematics',
    summary:
      'Fast-paced ground and aerial robotics competitions testing custom chassis agility, wireless telemetry, and multi-robot coordination.',
    highlights: [
      'Precision ground maneuvering and striker bot engineering',
      'Protected spherical quadcopter aerial arena matches',
      'Real-time pilot and autonomous control evaluations',
    ],
    image: '/src/assets/images/hands_on_workshop_lab_1795339869867.jpg',
    imageAlt: 'Engineers assembling and calibrating a custom autonomous drone chassis under warm task lamps',
    portalUrl: OFFICIAL_PORTAL_URL,
  },
  {
    id: 'robotics-iot-workshops',
    index: '04',
    title: 'Robotics, AI & IoT Workshops',
    category: 'Workshops',
    discipline: 'Hands-On Engineering Training',
    summary:
      'Skill-intensive technical sessions led by industry practitioners and researchers, guiding participants from fundamentals to working prototypes.',
    highlights: [
      'Embedded systems, microcontrollers, and sensor integration',
      'Computer vision, neural architectures, and edge AI deployment',
      'Guided lab exercises hosted across IIT Bombay campus venues',
    ],
    image: '/src/assets/images/hands_on_workshop_lab_1795339869867.jpg',
    imageAlt: 'University students soldering electronics and testing waveforms on an oscilloscope in a dark lab',
    portalUrl: OFFICIAL_PORTAL_URL,
  },
  {
    id: 'tech-summit-tracks',
    index: '05',
    title: 'Applied Systems & Hardware Labs',
    category: 'Workshops',
    discipline: 'Mechatronics & Flight Control',
    summary:
      'Focused build clinics designed to give university students direct exposure to PCB design, autonomous navigation, and rapid hardware testing.',
    highlights: [
      'Flight controller tuning and brushless propulsion mechanics',
      'Real-time diagnostics and hardware-in-the-loop testing',
      'Official participation certification via Techfest IIT Bombay',
    ],
    image: '/src/assets/images/hero_techfest_arena_1795339870087.jpg',
    imageAlt: 'Dark industrial technology stage and hardware demonstration rigs at Techfest',
    portalUrl: OFFICIAL_PORTAL_URL,
  },
];

export const SHOWCASE_PILLARS: ShowcasePillar[] = [
  {
    id: 'exhibitions',
    index: '01',
    title: 'Global Exhibitions',
    subtitle: 'Humanoids, Prototypes & Frontier Hardware',
    description:
      'Curated showcases bringing advanced humanoid robotics, next-generation aerospace rigs, and interactive scientific prototypes from international research labs onto the IIT Bombay campus.',
    pillars: [
      'Humanoid & Bipedal Robotics',
      'International Research Prototypes',
      'Interactive Hardware Pavilions',
    ],
    image: '/src/assets/images/ai_humanoid_exhibition_1795339870511.jpg',
    imageAlt: 'Matte-black and titanium humanoid prototype showcased on a dark plinth',
    featured: true,
  },
  {
    id: 'lectures',
    index: '02',
    title: 'Keynote Lectures',
    subtitle: 'Scientists, Policymakers & Pioneers',
    description:
      'Candid dialogues and keynote addresses connecting students with eminent global scientists, technologists, authors, and industry architects.',
    pillars: [
      'International Summit Sessions',
      'Fireside Panels & Q&A',
      'Cross-Disciplinary Discourse',
    ],
    image: '/src/assets/images/hero_techfest_arena_1795339870087.jpg',
    imageAlt: 'Monumental auditorium stage illuminated in electric orange and crimson for keynote lectures',
  },
  {
    id: 'technoholix',
    index: '03',
    title: 'Technoholix',
    subtitle: 'Nocturnal Sound, Light & Laser Spectacles',
    description:
      'When daytime engineering challenges conclude, campus grounds transform into an open-air sensory arena uniting kinetic light engineering, laser arrays, and live music.',
    pillars: [
      'Synchronized Laser & Light Shows',
      'Open-Air Night Performances',
      'Large-Scale Stage Production',
    ],
    image: '/src/assets/images/technoholix_night_stage_1795339869610.jpg',
    imageAlt: 'Open-air night stage with sharp crimson and orange laser beams slicing through dark haze above an audience',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-arena',
    title: 'Main Stage Volumetric Rig',
    category: 'Stage & Night',
    location: 'IIT Bombay, Powai',
    caption: 'Architectural truss array and live robotics demonstration rig set against brutalist concrete geometry.',
    image: '/src/assets/images/hero_techfest_arena_1795339870087.jpg',
    aspectClass: 'md:col-span-2 aspect-[16/9]',
  },
  {
    id: 'gal-robowars',
    title: 'Heavyweight Robowars Clash',
    category: 'Robotics & Arena',
    location: 'Armored Combat Enclosure',
    caption: 'High-energy steel-on-steel impact sending titanium sparks across the scarred arena floor.',
    image: '/src/assets/images/robowars_combat_arena_1795339869880.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-humanoid',
    title: 'Bipedal Humanoid Showcase',
    category: 'Exhibits & Labs',
    location: 'Global Exhibitions Hall',
    caption: 'Articulated matte-black and machined-aluminum humanoid chassis displayed during campus exhibitions.',
    image: '/src/assets/images/ai_humanoid_exhibition_1795339870511.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-workshop',
    title: 'Autonomous Drone & PCB Bench',
    category: 'Exhibits & Labs',
    location: 'Engineering Workshop Zone',
    caption: 'Participants soldering power distribution boards and calibrating flight telemetry under studio lamps.',
    image: '/src/assets/images/hands_on_workshop_lab_1795339869867.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-technoholix',
    title: 'Technoholix Laser Horizon',
    category: 'Stage & Night',
    location: 'Open-Air Festival Grounds',
    caption: 'Precision crimson and amber laser beams sweeping across thousands of festival attendees after dusk.',
    image: '/src/assets/images/technoholix_night_stage_1795339869610.jpg',
    aspectClass: 'md:col-span-2 aspect-[16/9]',
  },
];

export const FESTIVAL_DAYS: FestivalDay[] = [
  {
    day: 'Day 01',
    date: 'December 16, 2026',
    theme: 'Inauguration, Exhibitions & Qualifiers',
    summary:
      'Opening of campus exhibition pavilions, initial competition qualifiers, first-wave hands-on workshops, and opening keynote addresses.',
    focusAreas: ['Exhibitions Opening', 'Competition Qualifiers', 'Workshops Track I', 'Opening Keynotes'],
    phases: [
      {
        phase: 'Morning',
        title: 'Campus Gates & Exhibition Pavilions Open',
        detail: 'Check-in across IIT Bombay Powai and inaugural walkthroughs of international research prototypes.',
      },
      {
        phase: 'Afternoon',
        title: 'Technical Qualifiers & Hands-On Labs',
        detail: 'Opening rounds across robotics, autonomous drones, AI challenges, and practitioner-led workshops.',
      },
      {
        phase: 'Evening',
        title: 'Inaugural Keynote Lectures',
        detail: 'Main auditorium opening talks and cross-disciplinary conversations with invited global leaders.',
      },
    ],
  },
  {
    day: 'Day 02',
    date: 'December 17, 2026',
    theme: 'Eliminations, International Summit & Night Stage',
    summary:
      'High-stakes Robowars weight-class eliminations, AI & algorithmic sprints, global summit panels, and evening Technoholix performances.',
    focusAreas: ['Robowars Eliminations', 'AI & Coding Sprints', 'International Summit', 'Technoholix Night I'],
    phases: [
      {
        phase: 'Morning',
        title: 'International Summit & Algorithmic Sprints',
        detail: 'Focused summit panels alongside intensive machine intelligence and quantitative coding rounds.',
      },
      {
        phase: 'Afternoon',
        title: 'Robowars Weight-Class Eliminations',
        detail: 'Armored 15kg, 30kg, and 60kg combat bouts inside the reinforced arena enclosure.',
      },
      {
        phase: 'Evening',
        title: 'Technoholix Open-Air Production',
        detail: 'Synchronized laser arrays, kinetic stage visuals, and live nocturnal music on campus grounds.',
      },
    ],
  },
  {
    day: 'Day 03',
    date: 'December 18, 2026',
    theme: 'Grand Finals, Awards & Closing Spectacle',
    summary:
      'Championship finals across robotics and coding tracks, closing keynote dialogues, felicitation ceremonies, and the 30th Edition finale.',
    focusAreas: ['Robowars Finals', 'Drone & RoboSoccer Finals', 'Closing Keynotes', '30th Edition Finale'],
    phases: [
      {
        phase: 'Morning',
        title: 'Championship Semifinals & Final Exhibits',
        detail: 'Decisive arena matchups across Drone Soccer, RoboSoccer, and autonomous navigation tracks.',
      },
      {
        phase: 'Afternoon',
        title: 'Grand Finals & Felicitation',
        detail: 'Headlining Robowars championship bouts followed by closing keynote dialogues and award presentations.',
      },
      {
        phase: 'Evening',
        title: '30th Edition Closing Night',
        detail: 'Closing Technoholix performance celebrating three decades of science and technology at IIT Bombay.',
      },
    ],
  },
];
