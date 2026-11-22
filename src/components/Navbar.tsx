import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { OFFICIAL_PORTAL_URL } from '../data/festivalData';

const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'programs', label: 'Programs', href: '#programs' },
  { id: 'showcase', label: 'Showcase', href: '#showcase' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'countdown', label: 'Countdown', href: '#countdown' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 220) {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        });

        if (window.scrollY < 220) {
          setActiveSection('');
          return;
        }

        if (visibleRatios.size > 0) {
          let bestId = '';
          let bestRatio = -1;
          visibleRatios.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          });
          if (bestId) setActiveSection(bestId);
        }
      },
      {
        rootMargin: '-22% 0px -45% 0px',
        threshold: [0.05, 0.2, 0.4, 0.6],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: string, href: string) => {
    setMobileOpen(false);
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-editorial ${
        scrolled || mobileOpen
          ? 'bg-[#050505]/92 backdrop-blur-md border-b border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
          : 'bg-gradient-to-b from-[#050505]/85 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('');
            setMobileOpen(false);
          }}
          className="font-display text-2xl sm:text-[26px] font-bold tracking-[0.04em] text-white whitespace-nowrap shrink-0 hover:text-[#FF5500] transition-colors duration-200"
        >
          TECHFEST
        </a>

        {/* Zone 2: 5 concise single-line text links with active section indicator */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.href);
                }}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#FF5500] after:transition-all after:duration-200 ${
                  isActive
                    ? 'text-white after:w-full'
                    : 'text-neutral-300 hover:text-white after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action CTA + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={OFFICIAL_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.98] rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0"
          >
            <span>Official Portal</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-white border border-white/15 rounded-sm hover:border-[#FF5500] active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#080809]/98 backdrop-blur-lg border-t border-white/10 px-4 py-5 animate-panel-in">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id, item.href);
                  }}
                  className={`flex items-center justify-between min-h-[46px] px-3 text-base font-medium border-b border-white/5 transition-colors ${
                    isActive
                      ? 'text-[#FF5500] bg-white/[0.03]'
                      : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5500]">
                      Active
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
          <div className="mt-5">
            <a
              href={OFFICIAL_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full min-h-[46px] px-4 py-2.5 text-sm font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.99] rounded-sm transition-all duration-200"
            >
              <span>Visit Official Portal (techfest.org)</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
