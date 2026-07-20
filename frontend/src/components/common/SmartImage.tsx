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
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDevLabel, setShowDevLabel] = useState(true);

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

  // Production fallback: subtle gray box
  // Dev fallback: shows exact path and recommended size
  const isDev = import.meta.env.DEV;

  if (hasError) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-[#F3F6F4] border-2 border-dashed border-[#DDE4DF] rounded-xl overflow-hidden ${className}`}
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
          transformOrigin: 'center'
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
