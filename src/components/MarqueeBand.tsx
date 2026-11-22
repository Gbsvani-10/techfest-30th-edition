import { MARQUEE_KEYWORDS } from '../data/festivalData';

export function MarqueeBand() {
  return (
    <div
      aria-label="Festival technology disciplines"
      className="marquee-wrapper relative w-full overflow-hidden bg-[#080809] border-b border-white/10 py-4 sm:py-5 select-none"
    >
      {/* Subtle horizontal edge fade masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#080809] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#080809] to-transparent"
      />

      <div className="flex w-max animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:w-full motion-reduce:px-4">
        {[0, 1].map((pass) => (
          <div
            key={pass}
            aria-hidden={pass === 1}
            className={`flex items-center shrink-0 ${
              pass === 1 ? 'motion-reduce:hidden' : 'motion-reduce:flex-wrap motion-reduce:justify-center'
            }`}
          >
            {MARQUEE_KEYWORDS.map((word, idx) => (
              <div key={`${pass}-${word}`} className="flex items-center shrink-0">
                <span className="font-display text-xl sm:text-2xl lg:text-[28px] font-bold uppercase tracking-[0.06em] text-neutral-200 px-5 sm:px-7 whitespace-nowrap">
                  {word}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-sm font-mono ${
                    idx % 2 === 0 ? 'text-[#FF5500]' : 'text-[#E11D48]'
                  }`}
                >
                  /
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
