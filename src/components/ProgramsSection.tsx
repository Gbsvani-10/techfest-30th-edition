import { useState, useEffect, KeyboardEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROGRAMS, ProgramItem } from '../data/festivalData';
import { MediaImage } from './MediaImage';

type FilterType = 'All' | 'Competitions' | 'Workshops';

const FILTERS: { label: FilterType; count: number }[] = [
  { label: 'All', count: PROGRAMS.length },
  {
    label: 'Competitions',
    count: PROGRAMS.filter((p) => p.category === 'Competitions').length,
  },
  {
    label: 'Workshops',
    count: PROGRAMS.filter((p) => p.category === 'Workshops').length,
  },
];

export function ProgramsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedId, setSelectedId] = useState<string>(PROGRAMS[0].id);

  const filteredPrograms =
    activeFilter === 'All'
      ? PROGRAMS
      : PROGRAMS.filter((item) => item.category === activeFilter);

  const activeProgram: ProgramItem =
    filteredPrograms.find((item) => item.id === selectedId) || filteredPrograms[0];

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [activeFilter]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    const nextList =
      filter === 'All'
        ? PROGRAMS
        : PROGRAMS.filter((item) => item.category === filter);
    if (nextList.length > 0 && !nextList.some((p) => p.id === selectedId)) {
      setSelectedId(nextList[0].id);
    }
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % FILTERS.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + FILTERS.length) % FILTERS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = FILTERS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      handleFilterChange(FILTERS[nextIdx].label);
      const tablist = e.currentTarget.parentElement;
      const buttons = tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIdx]?.focus();
    }
  };

  return (
    <section
      id="programs"
      className="py-20 sm:py-24 lg:py-28 bg-[#080809] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Segmented Filter */}
        <div
          data-reveal-group
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10"
        >
          <div data-reveal>
            <p className="text-xs font-mono tracking-wider text-[#FF5500] mb-3">
              02 · Engineering Arena
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.94] text-white text-balance">
              Robotics, AI, Competitions & Workshops
            </h2>
          </div>

          <div
            data-reveal
            role="tablist"
            aria-label="Filter festival programs"
            className="inline-flex items-center gap-1 p-1 bg-[#121214] border border-white/10 rounded-sm self-start md:self-auto overflow-x-auto max-w-full"
          >
            {FILTERS.map(({ label, count }, idx) => {
              const isActive = activeFilter === label;
              return (
                <button
                  key={label}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                  onClick={() => handleFilterChange(label)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`min-h-[40px] px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] ${
                    isActive
                      ? 'bg-[#FF5500] text-white shadow-[0_4px_16px_rgba(255,85,0,0.25)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`ml-1.5 font-mono text-[11px] tabular-nums ${
                      isActive ? 'text-white/90' : 'text-neutral-500'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Split: Program Directory + Visual Spotlight */}
        <div
          data-reveal-group
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          {/* Left: Program Selector List */}
          <div
            data-reveal
            className="lg:col-span-5 flex flex-col divide-y divide-white/10 border border-white/10 bg-[#0D0D0F]"
          >
            {filteredPrograms.map((program) => {
              const isSelected = program.id === activeProgram.id;
              return (
                <button
                  key={program.id}
                  type="button"
                  onClick={() => setSelectedId(program.id)}
                  aria-pressed={isSelected}
                  className={`group text-left p-5 sm:p-6 min-h-[88px] transition-all duration-200 ease-editorial cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#17171B]'
                      : 'hover:bg-white/[0.03] active:bg-white/[0.05]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1.5">
                      <span className={isSelected ? 'text-[#FF5500] font-semibold' : ''}>
                        {program.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{program.category}</span>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-semibold transition-colors duration-200 ${
                        isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                      }`}
                    >
                      {program.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-400 truncate">
                      {program.discipline}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`mt-1.5 w-2 h-2 shrink-0 transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#FF5500] scale-110'
                        : 'bg-white/15 group-hover:bg-white/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Active Program Spotlight */}
          <div
            data-reveal
            key={activeProgram.id}
            aria-live="polite"
            className="lg:col-span-7 border border-white/10 bg-[#0D0D0F] flex flex-col justify-between overflow-hidden animate-panel-in"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#121215]">
              <MediaImage
                src={activeProgram.image}
                alt={activeProgram.imageAlt}
                className="w-full h-full object-cover object-center"
                fallbackLabel={activeProgram.title}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-[#0D0D0F]/35 to-transparent"
              />
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-200">
                <span className="text-[#FF5500] font-semibold">{activeProgram.category}</span>
                <span aria-hidden="true" className="text-neutral-500">/</span>
                <span>{activeProgram.discipline}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {activeProgram.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {activeProgram.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  {activeProgram.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-neutral-300"
                    >
                      <Check
                        className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">
                  Official problem statements & registrations hosted on techfest.org
                </span>
                <a
                  href={activeProgram.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2.5 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.98] rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0"
                >
                  <span>View Track Details</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
