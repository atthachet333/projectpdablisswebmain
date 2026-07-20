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
      
      {/* Development Image Label */}
      {isDev && typeof src === 'object' && showDevLabel && (
        <div 
          className="absolute bottom-2 left-2 z-50 bg-black/80 backdrop-blur-sm text-white p-2 rounded-lg text-xs border border-white/10 shadow-lg max-w-[90%] md:max-w-[300px] cursor-pointer group"
          onClick={() => setShowDevLabel(false)}
          title="คลิกเพื่อซ่อน Label นี้"
        >
          <div className="font-bold text-[#19B965] mb-0.5">{src.page?.toUpperCase()} / {src.section?.toUpperCase()}</div>
          <div className="font-mono text-[10px] text-gray-300 break-all mb-1">{src.src}</div>
          
          <div className="hidden group-hover:block mt-2 pt-2 border-t border-white/20 text-[10.5px] space-y-1">
            <p><span className="text-gray-400">ชื่อ:</span> {src.labelTh}</p>
            <p><span className="text-gray-400">ตำแหน่ง:</span> {src.usage}</p>
            <p><span className="text-gray-400">ขนาดแนะนำ:</span> {src.recommendedSize}</p>
            <p><span className="text-gray-400">การแสดงผล:</span> {imgFit} ({imgPos})</p>
          </div>
        </div>
      )}
    </div>
  );
}
