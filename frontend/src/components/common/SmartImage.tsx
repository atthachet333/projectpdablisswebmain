import { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

import { ImageConfig } from '../../config/images';

interface SmartImageProps {
  src: string | ImageConfig;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  objectPosition?: string;
  fit?: 'contain' | 'cover';
  scale?: number;
  recommendedSize?: string;
  recommendedRatio?: string;
  /** เปิด depth shadow + hover animation สำหรับรูปภาพแบบ standalone */
  withDepth?: boolean;
}

export default function SmartImage({
  src,
  alt,
  className = '',
  priority = false,
  aspectRatio,
  objectPosition,
  fit,
  scale,
  recommendedSize,
  recommendedRatio,
  withDepth = false,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract config if src is an object
  const imgSrc = typeof src === 'string' ? src : src.src;
  const imgFit = fit || (typeof src === 'object' && src.fit) || 'cover';
  const imgPos = objectPosition || (typeof src === 'object' && src.position) || 'center';
  const imgScale = scale || (typeof src === 'object' && src.scale) || 1;
  const imgAspectRatio = aspectRatio || (typeof src === 'object' && src.aspectRatio) || undefined;

  // Reset states if src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [imgSrc]);

  const isDev = import.meta.env.DEV;

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F3F6F4] overflow-hidden ${className}`}
        style={{ aspectRatio: imgAspectRatio }}
        role="img"
        aria-label={`Placeholder for ${alt}`}
      >
        <ImageIcon className="w-8 h-8 text-[#A8B0AA] mb-2" />
        {isDev ? (
          <div className="text-center px-4">
            <p className="text-xs font-bold text-[#0B0F0D] mb-1 truncate max-w-[200px] lg:max-w-[300px]" title={imgSrc}>{imgSrc}</p>
            {(recommendedSize || recommendedRatio) && (
              <p className="text-[10px] text-[#747D77]">
                {recommendedSize && `Size: ${recommendedSize}`}
                {recommendedSize && recommendedRatio && ' | '}
                {recommendedRatio && `Ratio: ${recommendedRatio}`}
              </p>
            )}
          </div>
        ) : (
          <span className="sr-only">Image missing: {alt}</span>
        )}
      </div>
    );
  }

  if (withDepth) {
    return (
      <div
        className={`relative group overflow-hidden ${className}`}
        style={{ aspectRatio: imgAspectRatio }}
      >
        {/* Ambient glow layer */}
        <div
          className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(25,185,101,0.22) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          aria-hidden="true"
        />
        {/* Image — no border, full bleed */}
        <img
          src={imgSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className={`relative z-10 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            objectFit: imgFit,
            objectPosition: imgPos,
            transform: imgScale !== 1 && !isLoaded ? `scale(${imgScale})` : undefined,
            transformOrigin: 'center',
            boxShadow: '0 20px 60px rgba(11,15,13,0.18), 0 4px 16px rgba(11,15,13,0.10)',
            filter: 'drop-shadow(0 8px 24px rgba(11,15,13,0.15))',
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
        {/* Bottom depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/30 via-transparent to-transparent opacity-60 pointer-events-none z-20" />
        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:animate-[shine_2.5s_ease-in-out_forwards] pointer-events-none z-30" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F3F6F4] ${className}`} style={{ aspectRatio: imgAspectRatio }}>
      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          objectFit: imgFit,
          objectPosition: imgPos,
          transform: imgScale !== 1 ? `scale(${imgScale})` : undefined,
          transformOrigin: 'center',
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
