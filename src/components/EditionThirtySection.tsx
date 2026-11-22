import { useState, KeyboardEvent } from 'react';
import {
  EDITION_MILESTONES,
  GLOBAL_CORRIDORS,
  MUMBAI_HUB,
} from '../data/festivalData';

// Simplified 2D stylized continent silhouettes on an 800x360 canvas (no 3D/WebGL)
const CONTINENT_PATHS = [
  // North America
  'M72 72 L154 52 L228 60 L256 96 L220 132 L182 146 L158 176 L132 162 L106 130 Z',
  // South America
  'M184 192 L236 184 L268 224 L244 294 L214 334 L194 316 L186 246 Z',
  // Europe
  'M364 62 L448 52 L476 76 L458 108 L404 114 L366 96 Z',
  // Africa
  'M368 134 L452 128 L494 166 L478 238 L442 294 L410 288 L394 218 L358 176 Z',
  // Asia
  'M476 58 L646 46 L724 88 L698 156 L646 182 L582 194 L540 162 L488 136 L470 96 Z',
  // Australia / Oceania
  'M644 242 L724 236 L746 276 L710 306 L650 294 Z',
];

function buildQuadraticArc(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const distance = Math.hypot(x2 - x1, y2 - y1);
  const lift = Math.min(82, distance * 0.24);
  return `M ${x1} ${y1} Q ${mx} ${my - lift} ${x2} ${y2}`;
}

export function EditionThirtySection() {
  const [activeCorridorId, setActiveCorridorId] = useState<string>(
    GLOBAL_CORRIDORS[0].id
  );

  const activeCorridor =
    GLOBAL_CORRIDORS.find((c) => c.id === activeCorridorId) ||
    GLOBAL_CORRIDORS[0];

  const handleCorridorKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
      nextIdx = (idx + 1) % GLOBAL_CORRIDORS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      nextIdx = (idx - 1 + GLOBAL_CORRIDORS.length) % GLOBAL_CORRIDORS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = GLOBAL_CORRIDORS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveCorridorId(GLOBAL_CORRIDORS[nextIdx].id);
      const tablist = e.currentTarget.parentElement;
      const buttons = tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIdx]?.focus();
    }
  };

  return (
    <section
      aria-label="30th Edition Milestone and Global Participation"
      className="py-20 sm:py-24 lg:py-28 bg-[#050505] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Part A: Monumental Oversized "30" Visual Feature */}
        <div
          data-reveal-group
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-16 sm:pb-20 border-b border-white/10"
        >
          {/* Monumental "30" Numeral */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p
              data-reveal
              className="text-xs font-mono tracking-wider text-[#FF5500] mb-4"
            >
              Milestone · 1998 — 2026
            </p>
            <div className="relative inline-flex items-baseline gap-4 select-none">
              <span
                data-thirty-numeral
                className="font-display font-extrabold text-[clamp(9.5rem,26vw,21rem)] leading-[0.78] tracking-[-0.04em] bg-gradient-to-b from-white via-neutral-200 to-[#FF5500] bg-clip-text text-transparent tabular-nums"
              >
                30
              </span>
              <span
                data-reveal
                className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#E11D48]"
              >
                th
              </span>
            </div>
            <p
              data-reveal
              className="mt-5 font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white text-balance"
            >
              Edition of Asia’s Largest Science & Technology Festival
            </p>
          </div>

          {/* 4-Part Milestone Chronology */}
          <div
            data-stagger-grid
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 border border-white/10 bg-[#0A0A0B] divide-y sm:divide-y-0 sm:divide-x divide-white/10"
          >
            {EDITION_MILESTONES.map((item, idx) => (
              <div
                key={item.year}
                data-stagger-card
                className={`p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 hover:bg-white/[0.025] ${
                  idx >= 2 ? 'sm:border-t sm:border-white/10' : ''
                }`}
              >
                <span className="font-mono text-xs text-[#FF5500] tabular-nums">
                  {item.year}
                </span>
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part B: 2D SVG Global Participation Visualization */}
        <div
          data-reveal-group
          className="pt-16 sm:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
        >
          {/* Left: Context & Corridor Selector */}
          <div className="lg:col-span-5" data-reveal>
            <p className="text-xs font-mono tracking-wider text-[#E11D48] mb-3">
              Global Footprint · 20+ Countries
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[0.95] text-white text-balance">
              International Corridors to IIT Bombay
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Students, researchers, and robotics contingents from over 20 countries and 500+ institutions connect in Mumbai each December. Select a corridor to inspect regional participation.
            </p>

            {/* Interactive Corridor Tabs */}
            <div
              role="tablist"
              aria-label="Global participation corridors"
              className="mt-6 grid grid-cols-2 gap-2"
            >
              {GLOBAL_CORRIDORS.map((corridor, idx) => {
                const isActive = corridor.id === activeCorridor.id;
                return (
                  <button
                    key={corridor.id}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                    onClick={() => setActiveCorridorId(corridor.id)}
                    onKeyDown={(e) => handleCorridorKeyDown(e, idx)}
                    className={`min-h-[44px] px-3.5 py-2.5 text-left text-xs font-semibold border rounded-sm transition-all duration-200 ease-editorial cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5500] text-white border-[#FF5500]'
                        : 'bg-[#0D0D0F] text-neutral-300 border-white/10 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {corridor.name}
                  </button>
                );
              })}
            </div>

            {/* Active Corridor Detail */}
            <div
              key={activeCorridor.id}
              aria-live="polite"
              className="mt-5 p-4 sm:p-5 border border-white/10 bg-[#0B0B0C] animate-panel-in"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#FF5500]">
                <span>{activeCorridor.hubLabel}</span>
                <span className="text-neutral-400">Host: Mumbai</span>
              </div>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {activeCorridor.description}
              </p>
            </div>
          </div>

          {/* Right: Crisp 2D Vector SVG World Projection */}
          <div
            data-reveal
            className="lg:col-span-7 border border-white/10 bg-[#08080A] p-4 sm:p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pb-3 border-b border-white/10 mb-4">
              <span>2D Equirectangular Network Projection</span>
              <span className="text-[#FF5500] tabular-nums">
                19.13° N · 72.91° E (Powai)
              </span>
            </div>

            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto block"
              role="img"
              aria-label="2D world map illustrating global participation corridors converging at IIT Bombay in Mumbai"
            >
              <defs>
                <linearGradient id="arcGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#FF5500" />
                </linearGradient>
                <radialGradient id="mumbaiGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF5500" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Latitude & Longitude 2D Graticule */}
              <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                {[60, 120, 180, 240, 300].map((y) => (
                  <line key={`lat-${y}`} x1="20" y1={y} x2="780" y2={y} />
                ))}
                {[100, 200, 300, 400, 500, 600, 700].map((x) => (
                  <line key={`lon-${x}`} x1={x} y1="20" x2={x} y2="340" />
                ))}
              </g>

              {/* Stylized 2D Continent Silhouettes */}
              <g
                fill="#141418"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              >
                {CONTINENT_PATHS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>

              {/* Connecting Great-Circle 2D Arcs */}
              {GLOBAL_CORRIDORS.map((corridor) => {
                const isActive = corridor.id === activeCorridor.id;
                const d = buildQuadraticArc(
                  corridor.x,
                  corridor.y,
                  MUMBAI_HUB.x,
                  MUMBAI_HUB.y
                );
                return (
                  <g key={corridor.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke={
                        isActive ? 'url(#arcGradActive)' : 'rgba(255,255,255,0.16)'
                      }
                      strokeWidth={isActive ? 2.4 : 1.2}
                      strokeDasharray={isActive ? '8 4' : '4 4'}
                      className={isActive ? 'animate-arc-flow' : ''}
                    />
                  </g>
                );
              })}

              {/* Regional Corridor Nodes */}
              {GLOBAL_CORRIDORS.map((corridor) => {
                const isActive = corridor.id === activeCorridor.id;
                return (
                  <g
                    key={`node-${corridor.id}`}
                    className="cursor-pointer"
                    onClick={() => setActiveCorridorId(corridor.id)}
                  >
                    <circle
                      cx={corridor.x}
                      cy={corridor.y}
                      r={isActive ? 14 : 10}
                      fill="transparent"
                    />
                    <circle
                      cx={corridor.x}
                      cy={corridor.y}
                      r={isActive ? 6 : 4}
                      fill={isActive ? '#E11D48' : '#737373'}
                      stroke="#050505"
                      strokeWidth="1.5"
                    />
                    <text
                      x={corridor.x}
                      y={corridor.y - 12}
                      textAnchor="middle"
                      fill={isActive ? '#FFFFFF' : '#A3A3A3'}
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {corridor.name}
                    </text>
                  </g>
                );
              })}

              {/* Primary IIT Bombay Mumbai Hub */}
              <circle
                cx={MUMBAI_HUB.x}
                cy={MUMBAI_HUB.y}
                r="28"
                fill="url(#mumbaiGlow)"
              />
              <circle
                cx={MUMBAI_HUB.x}
                cy={MUMBAI_HUB.y}
                r="6.5"
                fill="#FF5500"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={MUMBAI_HUB.x}
                y={MUMBAI_HUB.y + 22}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="600"
                fontFamily="JetBrains Mono, monospace"
              >
                {MUMBAI_HUB.label}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
