import { useState } from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export default function BrandLogo({ size = 52, className = '' }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  
  if (imgError) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full overflow-hidden border-2 border-[#19B965]/50 bg-white flex-shrink-0 flex items-center justify-center shadow-sm ${className}`}
      >
        <span className="text-[#064E2B] font-extrabold tracking-tight" style={{ fontSize: size * 0.28 }}>PDA</span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full overflow-hidden border-2 border-[#19B965]/50 bg-white flex-shrink-0 shadow-sm ${className}`}
    >
      <img
        src="/logo.png"
        alt="PDA BLISS COMPANY LIMITED"
        width={size}
        height={size}
        loading="eager"
        decoding="sync"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          objectPosition: 'center', 
          display: 'block', 
          transform: 'scale(1.08)' // Slight scale to remove transparent edges if any
        }}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
