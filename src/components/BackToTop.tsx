import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 inline-flex items-center justify-center w-11 h-11 bg-[#0E0E10]/90 backdrop-blur-md border border-white/15 hover:border-[#FF5500] text-white hover:text-[#FF5500] rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-all duration-200 ease-editorial cursor-pointer active:scale-[0.96] ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
