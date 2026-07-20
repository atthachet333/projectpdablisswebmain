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
      initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient glow behind image */}
      <div
        className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accent}28 0%, transparent 70%)`, filter: 'blur(24px)' }}
        aria-hidden="true"
      />

      {/* Main Frame — full-bleed cover */}
      <div
        className={`relative z-10 w-full shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(25,185,101,0.3)] group-hover:-translate-y-2`}
        style={{ aspectRatio: '4/3' }}
      >
        {/* Image — always cover, always full */}
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full transition-transform duration-700 transform group-hover:scale-110"
          style={{
            objectFit: imgFit,
            objectPosition: imgPos,
          }}
        />

        {/* Bottom gradient overlay — depth & polish */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/40 via-transparent to-transparent pointer-events-none" />
        {/* Side accent gradient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, ${accent}15 0%, transparent 60%)` }}
        />

        {/* Light sweep on hover */}
        {!isReducedMotion && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-[200%] group-hover:animate-[shine_2.5s_ease-in-out_forwards] pointer-events-none z-10" />
        )}

        {/* Decorative corner accents — appear on hover */}
        <div
          className="absolute top-3 left-3 w-10 h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none"
          style={{ borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}`, borderRadius: '6px 0 0 0' }}
        />
        <div
          className="absolute bottom-3 right-3 w-10 h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none"
          style={{ borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}`, borderRadius: '0 0 6px 0' }}
        />
      </div>

      {/* Floating badge */}
      {badge && (
        <motion.div
          className="absolute -top-3 lg:-top-4 left-4 lg:left-8 z-30 bg-white border border-[#DDE4DF] shadow-lg rounded-full px-4 py-1.5 flex items-center gap-2"
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ boxShadow: `0 4px 16px ${accent}25` }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
          <span className="text-xs font-bold text-[#0B0F0D] whitespace-nowrap">{badge}</span>
        </motion.div>
      )}

      {/* Floating icon */}
      {icon && (
        <motion.div
          className="absolute -bottom-4 lg:-bottom-6 right-6 lg:right-10 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-white border border-[#DDE4DF] shadow-xl rounded-2xl flex items-center justify-center"
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={isReducedMotion ? {} : { y: -3, rotate: 4 }}
          style={{ boxShadow: `0 8px 24px ${accent}30` }}
        >
          <div style={{ color: accent }} className="w-6 h-6 lg:w-7 lg:h-7">
            {icon}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
