import { useState, useEffect, useCallback, useRef, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_ITEMS, GalleryItem } from '../data/festivalData';
import { MediaImage } from './MediaImage';

type GalleryFilter = 'All' | GalleryItem['category'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'All',
  'Robotics & Arena',
  'Exhibits & Labs',
  'Stage & Night',
];

export function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleItems =
    filter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length
    );
  }, [visibleItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % visibleItems.length
    );
  }, [visibleItems.length]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [filter]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const handleTabKeyDown = (
    e: ReactKeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % GALLERY_FILTERS.length;
    else if (e.key === 'ArrowLeft')
      nextIdx = (idx - 1 + GALLERY_FILTERS.length) % GALLERY_FILTERS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = GALLERY_FILTERS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setFilter(GALLERY_FILTERS[nextIdx]);
      setLightboxIndex(null);
      const tablist = e.currentTarget.parentElement;
      const buttons = tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIdx]?.focus();
    }
  };

  const activeLightboxItem =
    lightboxIndex !== null && visibleItems[lightboxIndex]
      ? visibleItems[lightboxIndex]
      : null;

  return (
    <section
      id="gallery"
      className="py-20 sm:py-24 lg:py-28 bg-[#080809] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-reveal-group
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10"
        >
          <div data-reveal>
            <p className="text-xs font-mono tracking-wider text-[#FF5500] mb-3">
              04 · Visual Archive
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.94] text-white text-balance">
              Inside the Festival Grounds
            </h2>
          </div>

          <div
            data-reveal
            role="tablist"
            aria-label="Filter gallery images"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#121214] border border-white/10 rounded-sm self-start lg:self-auto"
          >
            {GALLERY_FILTERS.map((category, idx) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                  onClick={() => {
                    setFilter(category);
                    setLightboxIndex(null);
                  }}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-sm transition-all duration-200 ease-editorial whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] ${
                    isActive
                      ? 'bg-[#FF5500] text-white shadow-[0_4px_16px_rgba(255,85,0,0.25)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Gallery Grid */}
        <div
          data-stagger-grid
          aria-live="polite"
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {visibleItems.map((item, idx) => (
            <button
              key={`${filter}-${item.id}`}
              data-stagger-card
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setLightboxIndex(idx);
              }}
              className={`group relative overflow-hidden border border-white/10 hover:border-[#FF5500]/50 bg-[#0D0D0F] text-left cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#FF5500] animate-panel-in ${
                filter === 'All' ? item.aspectClass : 'aspect-[4/3]'
              }`}
              aria-label={`Inspect ${item.title} in full view`}
            >
              <MediaImage
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
                fallbackLabel={item.title}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-200"
              />

              <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-[#050505]/80 border border-white/15 text-white opacity-80 group-hover:opacity-100 group-hover:border-[#FF5500] group-hover:text-[#FF5500] transition-all duration-200">
                <Expand className="w-4 h-4" aria-hidden="true" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 mb-1">
                  <span className="text-[#FF5500]">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-300 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Lightbox Modal with focus management, thumbnails, touch swipe & keyboard navigation */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-panel-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#0C0C0E] border border-white/15 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
              const delta = endX - touchStartX.current;
              if (delta > 48) showPrev();
              else if (delta < -48) showNext();
              touchStartX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 truncate pr-4">
                <span className="text-[#FF5500] font-semibold">
                  {activeLightboxItem.category}
                </span>
                <span aria-hidden="true">/</span>
                <span className="truncate">{activeLightboxItem.location}</span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close gallery preview"
                className="inline-flex items-center justify-center w-11 h-11 text-neutral-300 hover:text-white border border-white/10 hover:border-[#FF5500] active:scale-[0.97] transition-all duration-200 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-[#050505] aspect-[16/10] max-h-[54vh] sm:max-h-[60vh] w-full flex items-center justify-center overflow-hidden">
              <MediaImage
                key={activeLightboxItem.id}
                src={activeLightboxItem.image}
                alt={activeLightboxItem.caption}
                className="w-full h-full object-contain animate-panel-in"
                fallbackLabel={activeLightboxItem.title}
              />
            </div>

            <div className="p-4 sm:p-6 border-t border-white/10 flex flex-col gap-4 shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3
                    id="lightbox-title"
                    className="text-base sm:text-xl font-semibold text-white"
                  >
                    {activeLightboxItem.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-300">
                    {activeLightboxItem.caption}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous image"
                    className="inline-flex items-center justify-center w-11 h-11 border border-white/15 text-white hover:border-[#FF5500] hover:text-[#FF5500] active:scale-[0.97] transition-all duration-200 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-3 font-mono text-xs text-neutral-400 tabular-nums">
                    {String(lightboxIndex! + 1).padStart(2, '0')} /{' '}
                    {String(visibleItems.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next image"
                    className="inline-flex items-center justify-center w-11 h-11 border border-white/15 text-white hover:border-[#FF5500] hover:text-[#FF5500] active:scale-[0.97] transition-all duration-200 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail selector strip */}
              {visibleItems.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/10">
                  {visibleItems.map((thumb, idx) => {
                    const active = idx === lightboxIndex;
                    return (
                      <button
                        key={thumb.id}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        aria-label={`View ${thumb.title}`}
                        className={`relative w-16 h-11 shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer ${
                          active
                            ? 'border-[#FF5500] opacity-100'
                            : 'border-white/15 opacity-55 hover:opacity-90'
                        }`}
                      >
                        <MediaImage
                          src={thumb.image}
                          alt={thumb.title}
                          className="w-full h-full object-cover"
                          fallbackLabel={thumb.title}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
