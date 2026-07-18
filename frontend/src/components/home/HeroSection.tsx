import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative min-h-[680px] lg:min-h-[760px] flex items-center pt-24 overflow-hidden bg-white"
      aria-label={t('nav.home')}
    >
      {/* --- Background Decorative Elements --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Soft Green Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#EAF8EF] opacity-60 blur-[120px] mix-blend-multiply" />
        
        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#151A17 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        {/* Abstract Curve / Thin Line */}
        <svg className="absolute -left-32 top-20 w-[400px] h-[400px] text-[#0E8F4D] opacity-10" viewBox="0 0 400 400" fill="none">
          <path d="M-50 200 C 100 0, 300 400, 450 200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        </svg>

        {/* Floating Ring */}
        <motion.div 
          className="absolute right-[10%] top-[20%] w-20 h-20 rounded-full border border-[#0E8F4D] opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-custom relative z-10 w-full">
        {/* 46/54 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-12 lg:py-16">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center">
            
            {/* Badge with Pulse */}
            <motion.div
              className="mb-8 inline-flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Pulse Dot */}
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#19B965] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0E8F4D]" />
              </div>
              <span className="text-xs font-bold text-[#0B0F0D] uppercase tracking-[0.2em]">
                {t('hero.badge', 'PDA BLISS SOLUTIONS')}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[34px] sm:text-[40px] md:text-[48px] lg:text-[54px] xl:text-[60px] font-extrabold leading-[1.1] mb-8 text-[#0B0F0D]">
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  {t('hero.title1', 'โซลูชันธุรกิจ')}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  {t('hero.title2', 'ครบวงจร')}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block text-[#0E8F4D]" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                  {t('hero.title3', 'เพื่อการเติบโต')}
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              className="text-[#3F4742] text-[15px] md:text-[17px] leading-[1.7] mb-12 max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                <MessageCircle className="w-4 h-4 text-[#747D77] group-hover:text-[#0E8F4D] transition-colors" aria-hidden="true" />
                {t('hero.ctaSecondary', 'ขอรับคำปรึกษา')}
              </Link>
            </motion.div>
          </div>

          {/* Right Content / Image */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative flex justify-end">
            <motion.div
              className="relative w-full max-w-[700px] group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Animated Light Border Container */}
              <div className="animated-border rounded-[24px]">
                {/* Premium Image Frame */}
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/11] rounded-[24px] bg-white border border-[#E7EBE8]">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop"
                    alt="ทีมงานมืออาชีพ PDA BLISS SOLUTIONS พร้อมให้บริการ"
                    className="w-full h-full object-cover object-center transform transition-transform duration-[10s] group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Sweep Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] animate-[shine_10s_infinite_ease-in-out]" aria-hidden="true" />
                </div>
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -left-6 md:-left-12 bottom-12 card-glass p-5 animate-float"
                aria-hidden="true"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-num font-extrabold text-[#0B0F0D] leading-none mb-1">1,000+</span>
                    <span className="text-xs font-bold text-[#747D77] tracking-wide uppercase">{t('hero.floating1Title', 'ดูแลลูกค้ามากกว่า')}</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-4 md:right-8 -top-8 card-glass p-4 animate-float"
                style={{ animationDelay: '2s' }}
                aria-hidden="true"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#EAF8EF] flex items-center justify-center rounded-lg border border-[#9EE6BC]">
                    <svg className="w-5 h-5 text-[#0E8F4D]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-num font-extrabold text-[#0B0F0D] leading-none mb-1">98%</span>
                    <span className="text-[10px] font-bold text-[#747D77] uppercase tracking-widest">{t('hero.floating2Title', 'ความพึงพอใจ')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[#747D77]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-[#E7EBE8] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0E8F4D]"
            animate={{ y: [0, 48, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
