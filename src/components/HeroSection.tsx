import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO_MEDIA, OFFICIAL_PORTAL_URL } from '../data/festivalData';
import { MediaImage } from './MediaImage';

const HERO_STRIPS = [
  { index: '01', title: 'Robotics & Robowars', target: '#programs' },
  { index: '02', title: 'AI & Workshops', target: '#programs' },
  { index: '03', title: 'Exhibitions & Lectures', target: '#showcase' },
  { index: '04', title: 'Technoholix', target: '#showcase' },
];

export function HeroSection() {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="top"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-end pt-24 pb-0 overflow-hidden bg-[#050505] border-b border-white/10"
    >
      {/* Background photography with GSAP ScrollTrigger parallax */}
      <div
        data-hero-parallax
        className="absolute inset-0 w-full h-[116%] -top-[6%] pointer-events-none will-change-transform"
      >
        <MediaImage
          src={HERO_MEDIA.image}
          alt={HERO_MEDIA.alt}
          loading="eager"
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.1]"
          fallbackLabel="Techfest IIT Bombay — 30th Edition Main Stage"
        />
      </div>

      {/* Subtle animated atmospheric stage lighting overlays (compositor-only) */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[60vw] h-[60vw] max-w-[780px] max-h-[780px] rounded-full bg-[radial-gradient(circle,rgba(255,85,0,0.34)_0%,rgba(255,85,0,0.08)_45%,transparent_72%)] blur-3xl pointer-events-none mix-blend-screen animate-ambient-orange will-change-transform"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -right-28 w-[52vw] h-[52vw] max-w-[680px] max-h-[680px] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.3)_0%,rgba(225,29,72,0.06)_48%,transparent_72%)] blur-3xl pointer-events-none mix-blend-screen animate-ambient-crimson will-change-transform"
      />

      {/* Architectural hairline mesh vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]"
      />

      {/* Measured contrast scrims */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/72 to-[#050505]/45 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#050505]/92 via-[#050505]/45 to-transparent pointer-events-none"
      />

      {/* Foreground editorial composition */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-14">
        {/* Clean unboxed editorial metadata */}
        <div
          data-hero-reveal
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono tracking-wide text-neutral-300 mb-5 sm:mb-6"
        >
          <span className="text-[#FF5500] font-semibold">30th Edition</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span>IIT Bombay, Powai</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span className="tabular-nums text-white">December 16–18, 2026</span>
        </div>

        {/* Oversized TECHFEST typography */}
        <div className="overflow-hidden">
          <h1
            data-hero-title
            className="font-display font-extrabold uppercase tracking-[-0.025em] leading-[0.84] text-white text-[clamp(4.6rem,14.5vw,13rem)] select-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          >
            TECHFEST
          </h1>
        </div>

        <div className="mt-7 lg:mt-9 pt-7 border-t border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div data-hero-reveal className="lg:col-span-7">
            <p className="text-xl sm:text-2xl lg:text-[27px] font-medium leading-[1.3] text-neutral-100 text-balance max-w-2xl">
              Asia’s largest science and technology festival returns to IIT Bombay for its landmark{' '}
              <span className="text-[#FF5500]">30th Edition</span>.
            </p>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              Three days of international combat robotics, artificial intelligence challenges, frontier exhibitions, keynote lectures, and open-air nocturnal spectacles.
            </p>
          </div>

          <div
            data-hero-reveal
            className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3"
          >
            <a
              href={OFFICIAL_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.98] rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0 shadow-[0_8px_24px_rgba(255,85,0,0.28)] hover:shadow-[0_10px_28px_rgba(255,85,0,0.4)]"
            >
              <span>Register at techfest.org</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <button
              type="button"
              onClick={() => scrollTo('#programs')}
              className="group inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 text-sm font-medium text-neutral-100 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 active:scale-[0.98] rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore 30th Edition</span>
              <ArrowDown
                className="w-4 h-4 text-[#FF5500] transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width 4-column anchor strip below hero split */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#050505]/88 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {HERO_STRIPS.map((strip) => (
            <button
              key={strip.index}
              type="button"
              onClick={() => scrollTo(strip.target)}
              className="group text-left px-4 py-4 sm:px-5 sm:py-5 hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#FF5500] tabular-nums">
                  {strip.index}
                </span>
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 bg-white/15 group-hover:bg-[#FF5500] transition-colors duration-200"
                />
              </div>
              <span className="mt-1.5 block text-sm sm:text-base font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
                {strip.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
