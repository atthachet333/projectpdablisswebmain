import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ImageConfig } from '../../config/images';

interface ServiceImageFrameProps {
  src: string | ImageConfig;
  alt: string;
  badge?: string;
  icon?: ReactNode;
  fit?: 'contain' | 'cover';
  position?: 'center' | 'top' | 'bottom';
  accent?: string;
  side?: 'left' | 'right';
  className?: string;
}

export default function ServiceImageFrame({
  src,
  alt,
  badge,
  icon,
  fit = 'contain',
  position = 'center',
  accent = '#19B965',
  side = 'left',
  className = '',
}: ServiceImageFrameProps) {
  const isReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Extract config if src is an object
  const imgSrc = typeof src === 'string' ? src : src.src;
  const imgFit = (typeof src === 'object' && src.fit) ? src.fit : fit;
  const imgPos = (typeof src === 'object' && src.position) ? src.position : position;
  const imgScale = (typeof src === 'object' && src.scale) ? src.scale : 1;

  // Set background and padding based on fit mode
  const isContain = imgFit === 'contain';
  const frameBg = 'bg-transparent';
  const imgPadding = 'p-0';

  return (
    <motion.div
      className={`relative group w-full max-w-[520px] lg:max-w-[620px] mx-auto ${className}`}
      initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow Behind */}
      <div 
        className="absolute inset-0 bg-[#EAF8EF] blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none rounded-[24px]" 
        aria-hidden="true" 
      />

      {/* Main Frame */}
      <div 
        className={`relative z-10 w-full aspect-[4/3] rounded-[24px] border border-[#19B965]/20 ${frameBg} shadow-[0_4px_24px_rgba(11,15,13,0.04)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(11,15,13,0.08)] group-hover:-translate-y-1`}
      >
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-[24px] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 z-20 pointer-events-none" style={{ borderColor: accent }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-[24px] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 z-20 pointer-events-none" style={{ borderColor: accent }} />

        {/* Image */}
        <div className={`w-full h-full ${imgPadding} relative`}>
          <img
            src={imgSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full rounded-[16px] transition-transform duration-700 group-hover:scale-[1.025]"
            style={{ 
              objectFit: imgFit, 
              objectPosition: imgPos,
              transform: imgScale !== 1 ? `scale(${imgScale})` : undefined,
              transformOrigin: 'center'
            }}
          />
          {/* Light Sweep */}
          {!isReducedMotion && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[shine_2s_ease-in-out_forwards] pointer-events-none z-10 rounded-[16px]" />
          )}
        </div>
      </div>

      {/* Floating Elements (Badges/Icons) */}
      {badge && (
        <motion.div
          className="absolute -top-3 lg:-top-4 left-4 lg:left-8 z-30 bg-white border border-[#DDE4DF] shadow-lg rounded-full px-4 py-1.5 flex items-center gap-2"
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={isReducedMotion ? {} : { y: -2 }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
          <span className="text-xs font-bold text-[#0B0F0D] whitespace-nowrap">{badge}</span>
        </motion.div>
      )}

      {icon && (
        <motion.div
          className="absolute -bottom-4 lg:-bottom-6 right-6 lg:right-10 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-white border border-[#DDE4DF] shadow-xl rounded-2xl flex items-center justify-center"
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={isReducedMotion ? {} : { y: -2, rotate: 2 }}
        >
          <div style={{ color: accent }} className="w-6 h-6 lg:w-7 lg:h-7">
            {icon}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
