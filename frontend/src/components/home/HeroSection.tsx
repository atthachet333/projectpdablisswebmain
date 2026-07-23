import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SmartImage from '../common/SmartImage';
import { siteImages } from '../../config/images';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative min-h-[680px] lg:min-h-[760px] flex items-center pt-24 overflow-hidden bg-white"
      aria-label={t('nav.home')}
    >
      {/* ── Animated Background Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* Large primary orb */}
        <div
          className="absolute orb-breathe rounded-full"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(25,185,101,0.16) 0%, transparent 70%)',
            top: -200, right: -150,
            filter: 'blur(60px)',
          }}
        />
        {/* Secondary orb */}
        <div
          className="absolute orb-breathe-slow rounded-full"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(158,230,188,0.14) 0%, transparent 70%)',
            bottom: -100, left: -80,
            filter: 'blur(50px)',
          }}
        />
        {/* Accent orb */}
        <div
          className="absolute orb-breathe-alt rounded-full"
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(14,143,77,0.10) 0%, transparent 70%)',
            top: '45%', left: '35%',
            filter: 'blur(40px)',
          }}
        />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(#064E2B 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Thin decorative diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <line x1="-100" y1="700" x2="700" y2="-100" stroke="#0E8F4D" strokeWidth="1" strokeDasharray="5 14"/>
          <line x1="300" y1="900" x2="1200" y2="-100" stroke="#0E8F4D" strokeWidth="1" strokeDasharray="4 18"/>
        </svg>

        {/* Floating ring */}
        <motion.div
          className="absolute right-[12%] top-[22%] w-20 h-20 rounded-full border border-[#0E8F4D]/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute left-[8%] bottom-[25%] w-12 h-12 rounded-full border border-[#19B965]/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-custom relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-12 lg:py-16">

          {/* ── Left Content ── */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center relative z-20">

            {/* Live pulse badge */}
            <motion.div
              className="mb-8 inline-flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#19B965] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0E8F4D]" />
              </div>
              <span className="text-xs font-bold text-[#0B0F0D] uppercase tracking-[0.2em]">
                {t('hero.badge', 'PDA BLISS SOLUTIONS')}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[46px] xl:text-[50px] font-bold leading-[1.12] mb-8 text-[#0B0F0D]">
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                  {t('hero.title1', 'โซลูชันธุรกิจ')}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
                  {t('hero.title2', 'ครบวงจร')}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[#0E8F4D]"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t('hero.title3', 'เพื่อการเติบโต')}
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              className="text-[#3F4742] text-[15px] md:text-[17px] leading-[1.75] mb-12 max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.desc')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services" className="btn-primary">
                {t('hero.ctaPrimary', 'ดูบริการของเรา')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn-secondary group">
                <MessageCircle className="w-4 h-4 text-[#57615B] group-hover:text-[#0E8F4D] transition-colors" aria-hidden="true" />
                {t('hero.ctaSecondary', 'ขอรับคำปรึกษา')}
              </Link>
            </motion.div>
          </div>

          {/* ── Right Content / Full-Bleed Image ── */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative flex justify-end z-10">
            <motion.div
              className="relative w-full max-w-[760px] group overflow-visible"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Decorative layer BEHIND the photo — separate shapes, not a frame */}
              <div
                className="absolute -inset-12 pointer-events-none -z-10"
                style={{ background: 'radial-gradient(ellipse 65% 55% at 60% 45%, rgba(25,185,101,0.18) 0%, rgba(126,200,227,0.08) 50%, transparent 75%)', filter: 'blur(44px)' }}
                aria-hidden="true"
              />
              <div className="absolute -right-6 -top-8 w-40 h-40 rounded-full border border-dashed border-[#19B965]/25 pointer-events-none -z-10 animate-float-slow" aria-hidden="true" />
              <div
                className="absolute -left-4 -bottom-6 w-24 h-24 pointer-events-none -z-10 opacity-40"
                style={{ backgroundImage: 'radial-gradient(#0E8F4D55 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }}
                aria-hidden="true"
              />

              {/*
                Photo with feathered edges (CSS mask) — blends into the page,
                no panel, no border-radius box, no overflow clipping.
                ✏️ เปลี่ยนรูปได้ที่ siteImages.home.hero (แนะนำภาพ PNG/WebP โปร่งใสถ้ามี)
              */}
              <motion.div
                className="img-drift-c relative z-10 w-full group transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={siteImages.home.hero.src}
                  alt={siteImages.home.hero.labelTh || 'ทีมงาน PDA BLISS SOLUTIONS'}
                  className="w-full h-auto max-h-[560px] object-contain object-center transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                  loading="eager"
                  style={{
                    maskImage: 'radial-gradient(118% 105% at 55% 42%, black 58%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(118% 105% at 55% 42%, black 58%, transparent 90%)',
                  }}
                />
              </motion.div>

              {/* Floating Glass Card — Clients */}
              <motion.div
                className="absolute -left-5 md:-left-10 bottom-10 z-30 animate-float"
                aria-hidden="true"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
              >
                <div className="card-glass px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E8F4D] to-[#064E2B] flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#0B0F0D] leading-tight">{t('hero.trustText1', 'ดูแลโดยผู้เชี่ยวชาญเฉพาะด้าน')}</span>
                      <span className="text-[10px] font-bold text-[#57615B] uppercase tracking-wider mt-0.5">PDA BLISS</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Glass Card — Satisfaction */}
              <motion.div
                className="absolute -right-5 md:-right-10 -top-6 z-30 animate-float-delay"
                aria-hidden="true"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.05 }}
              >
                <div className="card-glass px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.10)]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4.5 h-4.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#0B0F0D] leading-tight">{t('hero.trustText2', 'ติดตามสถานะเป็นระบบ')}</span>
                      <span className="text-[10px] font-bold text-[#57615B] uppercase tracking-wider mt-0.5">Trackable</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[#57615B] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-[#E7EBE8] relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#19B965] to-transparent rounded-full"
            animate={{ y: [0, 48, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
