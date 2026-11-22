import { FESTIVAL_METRICS } from '../data/festivalData';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 sm:py-24 lg:py-28 bg-[#050505] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal-group className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Editorial Headline */}
          <div className="lg:col-span-5" data-reveal>
            <p className="text-xs font-mono tracking-wider text-[#FF5500] mb-3">
              01 · Heritage & Scale
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.94] text-white text-balance">
              Three Decades of Student-Led Innovation
            </h2>
          </div>

          {/* Right Column: Factual Narrative */}
          <div className="lg:col-span-7 space-y-5 text-neutral-300 text-base sm:text-lg leading-relaxed" data-reveal>
            <p>
              Established in 1998 by the student community of the Indian Institute of Technology Bombay, Techfest has grown into Asia’s largest annual science and technology festival—convening researchers, builders, and thinkers across disciplines every December on the Powai campus.
            </p>
            <p className="text-neutral-400 text-base">
              In December 2026, the milestone <span className="text-white font-medium">30th Edition</span> honors nearly three decades of technical rigor and cultural energy—uniting international robotics arenas, applied AI competitions, practitioner-led workshops, global exhibitions, and keynote dialogues under one roof.
            </p>
          </div>
        </div>

        {/* Adjacent Quantitative Proof Grid */}
        <div
          data-counter-grid
          className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#0B0B0C] divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {FESTIVAL_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:bg-white/[0.02]"
            >
              <div>
                <div className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white tabular-nums">
                  <span
                    data-counter-target={metric.target}
                    data-counter-comma={metric.formatComma ? 'true' : 'false'}
                  >
                    {metric.formatComma ? metric.target.toLocaleString() : metric.target}
                  </span>
                  {metric.suffix && (
                    <span className="text-[#FF5500]">{metric.suffix}</span>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-neutral-100">
                  {metric.label}
                </h3>
              </div>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
