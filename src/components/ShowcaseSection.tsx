import { ArrowUpRight } from 'lucide-react';
import { OFFICIAL_PORTAL_URL, SHOWCASE_PILLARS } from '../data/festivalData';
import { MediaImage } from './MediaImage';

export function ShowcaseSection() {
  const [exhibitions, lectures, technoholix] = SHOWCASE_PILLARS;

  return (
    <section
      id="showcase"
      className="py-20 sm:py-24 lg:py-28 bg-[#050505] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal-group className="max-w-3xl mb-12 sm:mb-14">
          <p data-reveal className="text-xs font-mono tracking-wider text-[#E11D48] mb-3">
            03 · Campus Experiences
          </p>
          <h2
            data-reveal
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.94] text-white text-balance"
          >
            Exhibitions, Guest Lectures & Technoholix
          </h2>
          <p data-reveal className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Beyond competitive engineering tracks, Techfest transforms the IIT Bombay campus into an open showcase of global hardware prototypes, keynote discourse, and nocturnal stage production.
          </p>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div data-stagger-grid className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Global Exhibitions (col-span-7) */}
          <article
            data-stagger-card
            className="lg:col-span-7 group border border-white/10 hover:border-white/20 bg-[#0B0B0C] overflow-hidden flex flex-col justify-between transition-colors duration-200"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121215]">
              <MediaImage
                src={exhibitions.image}
                alt={exhibitions.imageAlt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
                fallbackLabel={exhibitions.title}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/35 to-transparent"
              />
              <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2 text-xs font-mono text-neutral-300">
                <span className="text-[#FF5500] font-semibold">{exhibitions.index}</span>
                <span aria-hidden="true">·</span>
                <span>{exhibitions.subtitle}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {exhibitions.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {exhibitions.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-neutral-400">
                {exhibitions.pillars.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true" className="text-neutral-700">/</span>}
                    <span className="text-neutral-200">{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Card 2: Keynote Lectures (col-span-5) */}
          <article
            data-stagger-card
            className="lg:col-span-5 group border border-white/10 hover:border-white/20 bg-[#0B0B0C] overflow-hidden flex flex-col justify-between transition-colors duration-200"
          >
            <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-[#121215]">
              <MediaImage
                src={lectures.image}
                alt={lectures.imageAlt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
                fallbackLabel={lectures.title}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/45 to-transparent"
              />
              <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2 text-xs font-mono text-neutral-300">
                <span className="text-[#FF5500] font-semibold">{lectures.index}</span>
                <span aria-hidden="true">·</span>
                <span>{lectures.subtitle}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {lectures.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {lectures.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-neutral-400">
                {lectures.pillars.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true" className="text-neutral-700">/</span>}
                    <span className="text-neutral-200">{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Card 3: Technoholix Wide Nocturnal Feature (col-span-12) */}
          <article
            data-stagger-card
            className="lg:col-span-12 group border border-white/10 hover:border-white/20 bg-[#0B0B0C] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch transition-colors duration-200"
          >
            <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-[#121215]">
              <MediaImage
                src={technoholix.image}
                alt={technoholix.imageAlt}
                className="w-full h-full lg:h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
                fallbackLabel={technoholix.title}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0C]/85 hidden lg:block"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/85 via-transparent to-transparent lg:hidden"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 mb-3">
                  <span className="text-[#E11D48] font-semibold">{technoholix.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{technoholix.subtitle}</span>
                </div>
                <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                  {technoholix.title}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {technoholix.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-neutral-400">
                  {technoholix.pillars.map((item, idx) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      {idx > 0 && <span aria-hidden="true" className="text-neutral-700">/</span>}
                      <span className="text-neutral-200">{item}</span>
                    </span>
                  ))}
                </div>

                <a
                  href={OFFICIAL_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF5500] hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Schedule on techfest.org</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
