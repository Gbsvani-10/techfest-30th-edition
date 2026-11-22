/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { BackToTop } from './components/BackToTop';
import { HeroSection } from './components/HeroSection';
import { MarqueeBand } from './components/MarqueeBand';
import { AboutSection } from './components/AboutSection';
import { EditionThirtySection } from './components/EditionThirtySection';
import { ProgramsSection } from './components/ProgramsSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { GallerySection } from './components/GallerySection';
import { CountdownSection } from './components/CountdownSection';
import { RegistrationCTA } from './components/RegistrationCTA';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hero title & text reveal
      gsap.from('[data-hero-title]', {
        y: 36,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.from('[data-hero-reveal]', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        delay: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      // Hero ScrollTrigger parallax (compositor transform only)
      gsap.to('[data-hero-parallax]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '#top',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Monumental "30" numeral entrance
      const thirtyEl = document.querySelector('[data-thirty-numeral]');
      if (thirtyEl) {
        gsap.from(thirtyEl, {
          scale: 0.9,
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: thirtyEl,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // Editorial group reveals
      const revealGroups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]');
      revealGroups.forEach((group) => {
        const items = group.querySelectorAll('[data-reveal]');
        if (!items.length) return;
        gsap.from(items, {
          y: 22,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true,
          },
        });
      });

      // Staggered card grid reveal
      const staggerGrids = gsap.utils.toArray<HTMLElement>('[data-stagger-grid]');
      staggerGrids.forEach((grid) => {
        const cards = grid.querySelectorAll('[data-stagger-card]');
        if (!cards.length) return;
        gsap.from(cards, {
          y: 24,
          opacity: 0,
          duration: 0.62,
          stagger: 0.09,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: grid,
            start: 'top 86%',
            once: true,
          },
        });
      });

      // Animated counters for About metrics
      const counterGrid = document.querySelector('[data-counter-grid]');
      if (counterGrid) {
        const counters = counterGrid.querySelectorAll<HTMLElement>('[data-counter-target]');
        counters.forEach((el) => {
          const target = Number(el.dataset.counterTarget || '0');
          const useComma = el.dataset.counterComma === 'true';
          const startValue = target > 1900 && target < 2100 ? 1980 : 0;
          const proxy = { val: startValue };

          gsap.to(proxy, {
            val: target,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counterGrid,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              const rounded = Math.round(proxy.val);
              el.textContent = useComma ? rounded.toLocaleString() : String(rounded);
            },
          });
        });
      }
    }, rootRef);

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:px-4 focus:py-2 focus:bg-[#FF5500] focus:text-white focus:text-xs focus:font-semibold focus:rounded-sm"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <MarqueeBand />
        <AboutSection />
        <EditionThirtySection />
        <ProgramsSection />
        <ShowcaseSection />
        <GallerySection />
        <CountdownSection />
        <RegistrationCTA />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
