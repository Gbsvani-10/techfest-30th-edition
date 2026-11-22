import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!finePointer || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHoveringInteractive = false;
    let isVisible = false;
    let frameId: number | null = null;

    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      const el = ringRef.current;
      if (el) {
        const scale = isHoveringInteractive ? 1.55 : 1;
        el.style.opacity = isVisible ? '1' : '0';
        el.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0) scale(${scale})`;
        el.style.borderColor = isHoveringInteractive
          ? 'rgba(255, 85, 0, 0.95)'
          : 'rgba(255, 85, 0, 0.55)';
        el.style.backgroundColor = isHoveringInteractive
          ? 'rgba(255, 85, 0, 0.12)'
          : 'transparent';
      }

      if (
        Math.abs(targetX - currentX) > 0.2 ||
        Math.abs(targetY - currentY) > 0.2
      ) {
        frameId = window.requestAnimationFrame(updateCursor);
      } else {
        frameId = null;
      }
    };

    const scheduleFrame = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateCursor);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;

      const target = e.target as HTMLElement | null;
      isHoveringInteractive = Boolean(
        target?.closest('a, button, [role="tab"], [data-cursor="interactive"]')
      );
      scheduleFrame();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      scheduleFrame();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{ opacity: 0, transform: 'translate3d(-100px, -100px, 0)' }}
      className="fixed top-0 left-0 w-7 h-7 rounded-full border border-[#FF5500]/55 pointer-events-none z-[70] transition-[border-color,background-color] duration-150 will-change-transform hidden lg:block"
    />
  );
}
