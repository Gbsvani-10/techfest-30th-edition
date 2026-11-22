import { ArrowUpRight, MapPin } from 'lucide-react';
import { OFFICIAL_PORTAL_URL } from '../data/festivalData';

export function RegistrationCTA() {
  return (
    <section
      id="register"
      className="py-20 sm:py-24 lg:py-28 bg-[#080809] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-reveal-group
          className="border border-white/15 bg-gradient-to-br from-[#121215] via-[#0B0B0D] to-[#1A0905] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-8" data-reveal>
            <p className="text-xs font-mono tracking-wider text-[#FF5500] mb-3">
              06 · Official Registration & Passes
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.92] text-white text-balance">
              Join the 30th Edition at IIT Bombay
            </h2>
            <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              All official competition registrations, workshop enrollments, campus accommodation bookings, and visitor passes are published exclusively on the official Techfest portal.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
              <MapPin className="w-4 h-4 text-[#FF5500] shrink-0" aria-hidden="true" />
              <span>Indian Institute of Technology Bombay, Powai, Mumbai 400076</span>
            </div>
          </div>

          <div
            data-reveal
            className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-end gap-3"
          >
            <a
              href={OFFICIAL_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3.5 text-sm font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.98] rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0 shadow-[0_8px_24px_rgba(255,85,0,0.28)]"
            >
              <span>Go to techfest.org</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center min-h-[46px] px-6 py-3 text-xs font-medium text-neutral-300 hover:text-white border border-white/15 hover:border-white/30 active:scale-[0.98] rounded-sm transition-all duration-200 whitespace-nowrap shrink-0"
            >
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
