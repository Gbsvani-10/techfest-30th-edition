import { useState } from 'react';
import { Aperture } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function MediaImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'lazy',
}: MediaImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#141416] via-[#0B0B0C] to-[#1A0D08] text-neutral-400 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Aperture className="w-8 h-8 text-[#FF5500] mb-3 opacity-80" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide text-neutral-300 text-center max-w-xs">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      onError={() => setHasError(true)}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-90'} ${className}`}
    />
  );
}
