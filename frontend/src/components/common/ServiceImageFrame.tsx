import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ImageConfig } from '../../config/images';

/*
 * FLOATING POSTER PRESENTATION — no card, no clipping box.
 *
 * โครงสร้างใหม่: รูปแสดงตามสัดส่วนจริง (object-fit: contain, ไม่มี aspect-ratio box,
 * ไม่มี overflow-hidden, ไม่มี border-radius/box-shadow ของ wrapper)
 * เงาใช้ filter: drop-shadow ที่ "ตัวรูป" เท่านั้น และ shape ตกแต่งแยกอยู่ด้านหลัง
 *
 * ⚠️ หมายเหตุ: ไฟล์โปสเตอร์ปัจจุบัน (service-*.png ฯลฯ) มีพื้นหลัง/กรอบทองติดมา
 * "ในตัวไฟล์เอง" — ควรเปลี่ยนเป็น PNG/WebP พื้นหลังโปร่งใส เพื่อให้ภาพไร้กรอบจริง
 * (เปลี่ยน path ได้ที่ src/config/images.ts)
 */

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
  accent = '#19B965',
  side = 'left',
  className = '',
}: ServiceImageFrameProps) {
  const isReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const imgSrc = typeof src === 'string' ? src : src.src;
  const tilt = isReducedMotion ? 0 : side === 'left' ? -1.5 : 1.5;

  return (
    <motion.div
      className={`relative group w-full ${className}`}
      initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Decorative layer BEHIND the poster (separate from image, extends past it) ── */}
      <div
        className="absolute -inset-10 opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse 70% 60% at ${side === 'left' ? '38% 62%' : '62% 62%'}, ${accent}38 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      {/* Dashed orbit ring, offset so it never hugs the poster edge */}
      <div
        className={`absolute w-[55%] aspect-square rounded-full border border-dashed pointer-events-none -z-10 ${side === 'left' ? '-left-8 -bottom-10' : '-right-8 -bottom-10'}`}
        style={{ borderColor: `${accent}35` }}
        aria-hidden="true"
      />
      {/* Dot grid corner */}
      <div
        className={`absolute w-24 h-24 pointer-events-none -z-10 opacity-40 ${side === 'left' ? '-right-4 -top-8' : '-left-4 -top-8'}`}
        style={{ backgroundImage: `radial-gradient(${accent}55 1.5px, transparent 1.5px)`, backgroundSize: '14px 14px' }}
        aria-hidden="true"
      />

      {/* ── Poster itself: natural ratio, rounded corners (token), idle drift, floats up on hover ── */}
      <div
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:rotate-0 group-hover:scale-[1.02] ${isReducedMotion ? '' : side === 'left' ? 'img-drift-b' : 'img-drift-a'}`}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="img-radius-lg w-full h-auto object-contain select-none transition-[filter] duration-700"
          style={{
            /* เงาที่ตัววัตถุเท่านั้น (ตามขอบมนของรูป) — ไม่ใช่กรอบ box-shadow */
            filter: 'var(--shadow-image)',
          }}
        />
      </div>

      {/* Floating badge — frosted pill, detached from the poster */}
      {badge && (
        <motion.div
          className={`absolute -top-4 z-20 flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0B0F0D] whitespace-nowrap ${side === 'left' ? 'left-2' : 'right-2'}`}
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: '100px',
            boxShadow: '0 4px 20px rgba(11,15,13,0.14)',
          }}
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
            aria-hidden="true"
          />
          {badge}
        </motion.div>
      )}

      {/* Floating icon pill */}
      {icon && (
        <motion.div
          className={`absolute -bottom-4 z-20 flex items-center justify-center ${side === 'left' ? 'right-3' : 'left-3'}`}
          style={{
            width: '50px',
            height: '50px',
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: '14px',
            boxShadow: '0 8px 28px rgba(11,15,13,0.16)',
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
