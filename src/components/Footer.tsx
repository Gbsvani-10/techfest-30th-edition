import { ArrowUpRight } from 'lucide-react';
import { OFFICIAL_PORTAL_URL } from '../data/festivalData';

const FOOTER_SECTIONS = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Countdown', href: '#countdown' },
];

export function Footer() {
  const handleAnchor = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#050505] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-3xl font-bold tracking-[0.04em] text-white hover:text-[#FF5500] transition-colors duration-200"
            >
              TECHFEST
            </a>
            <p className="mt-2 text-xs text-neutral-400">
              30th Edition Concept · IIT Bombay, Powai · December 16–18, 2026
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6">
            {FOOTER_SECTIONS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchor(item.href);
                }}
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <a
              href={OFFICIAL_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-medium text-[#FF5500] hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              <span>techfest.org</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            Techfest, IIT Bombay — Asia’s Largest Science & Technology Festival (Founded 1998).
          </p>
          <p>
            Official updates and registrations at{' '}
            <a
              href={OFFICIAL_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-[#FF5500] underline underline-offset-2 transition-colors duration-200"
            >
              https://techfest.org/
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
