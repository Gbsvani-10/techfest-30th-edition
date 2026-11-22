import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frameId: number | null = null;

    const updateProgress = () => {
      frameId = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none bg-white/[0.06]"
    >
      <div
        ref={barRef}
        style={{ transform: 'scaleX(0)' }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#FF5500] via-[#FF6E24] to-[#E11D48] will-change-transform"
      />
    </div>
  );
}
