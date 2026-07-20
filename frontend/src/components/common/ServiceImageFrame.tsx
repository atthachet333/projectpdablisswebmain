import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ImageConfig } from '../../config/images';

interface ServiceImageFrameProps {
  src: string | ImageConfig;
  alt: string;
  badge?: string;
  icon?: ReactNode;
  fit?: 'contain' | 'cover';
  position?: 'center' | 'top' | 'bottom' | string;
  accent?: string;
  side?: 'left' | 'right';
  className?: string;
}

export default function ServiceImageFrame({
  src,
  alt,
  badge,
  icon,
  fit = 'cover',
  position = 'center',
  accent = '#19B965',
  side = 'left',
  className = '',
}: ServiceImageFrameProps) {
  const isReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const imgSrc = typeof src === 'string' ? src : src.src;
  const imgFit = (typeof src === 'object' && src.fit) ? src.fit : fit;
  const imgPos = (typeof src === 'object' && src.position) ? src.position : position;

  return (
    <motion.div
      className={`relative group w-full ${className}`}
      initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, x: side === 'left' ? -40 : 40 }}
      whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient color bloom behind image — visible at rest */}
      <div
        className="absolute -inset-8 opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse 75% 65% at ${side === 'left' ? '35% 65%' : '65% 65%'}, ${accent}60 0%, transparent 70%)`,
          filter: 'blur(36px)',
        }}
        aria-hidden="true"
      />

      {/* Main image container — full bleed, rounded, depth via directional drop-shadow */}
      <div
        className="relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2"
        style={{
          aspectRatio: '4/3',
          borderRadius: '14px',
          /* drop-shadow = single light source, not a box frame */
          filter: [
            'drop-shadow(0 4px 12px rgba(11,15,13,0.18))',
            'drop-shadow(0 18px 40px rgba(11,15,13,0.22))',
          ].join(' '),
        }}
      >
        {/* Image */}
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-[1.07]"
          style={{
            objectFit: imgFit,
            objectPosition: imgPos,
          }}
        />

        {/* Rich internal overlays — all depth lives inside the image */}
        {/* Bottom dark-to-transparent gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(11,15,13,0.60) 0%, rgba(11,15,13,0.10) 40%, transparent 68%)',
          }}
        />

        {/* Side directional light from accent color */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-700"
          style={{
            background: `linear-gradient(${side === 'left' ? '110deg' : '250deg'}, ${accent}28 0%, transparent 50%)`,
          }}
        />

        {/* Top-corner atmospheric glow */}
        <div
          className="absolute pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-700"
          style={{
            top: 0,
            [side === 'left' ? 'left' : 'right']: 0,
            width: '50%',
            height: '50%',
            background: `radial-gradient(circle at ${side === 'left' ? '0% 0%' : '100% 0%'}, ${accent}30 0%, transparent 65%)`,
          }}
        />

        {/* Light sweep shimmer on hover */}
        {!isReducedMotion && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-[200%] group-hover:animate-[shine_2.5s_ease-in-out_forwards] pointer-events-none z-10" />
        )}

        {/* Bottom accent glowline on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"
          style={{ background: `linear-gradient(90deg, transparent 5%, ${accent} 35%, ${accent} 65%, transparent 95%)` }}
        />
      </div>

      {/* Floating badge — frosted pill */}
      {badge && (
        <motion.div
          className="absolute -top-4 left-5 lg:left-6 z-30 flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0B0F0D] whitespace-nowrap"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: '100px',
            boxShadow: `0 4px 20px rgba(11,15,13,0.14), 0 0 0 1px rgba(255,255,255,0.6)`,
          }}
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
          />
          {badge}
        </motion.div>
      )}

      {/* Floating icon pill */}
      {icon && (
        <motion.div
          className="absolute -bottom-5 right-5 lg:right-6 z-30 flex items-center justify-center w-13 h-13"
          style={{
            width: '52px',
            height: '52px',
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: '14px',
            boxShadow: `0 8px 28px rgba(11,15,13,0.16), 0 0 0 1px rgba(255,255,255,0.7)`,
          }}
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.75 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 280, damping: 18 }}
          whileHover={isReducedMotion ? {} : { y: -4, rotate: 6, scale: 1.08 }}
        >
          <div style={{ color: accent }} className="w-6 h-6">
            {icon}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
