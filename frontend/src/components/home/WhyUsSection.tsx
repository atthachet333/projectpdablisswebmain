import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_US } from '../../data/company';
import SectionDivider from '../common/SectionDivider';

export default function WhyUsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#EAF8EF]" aria-labelledby="whyus-heading">
      <div className="container-custom">
        {/* Header */}
        <SectionDivider 
          title={t('whyUs.title', 'ทำไมต้องเลือกเรา')}
          subtitle={t('whyUs.subtitle', 'เหตุผลที่ลูกค้าไว้วางใจ PDA BLISS')}
          variant="E"
          eyebrow={t('whyUs.badge', 'WHY CHOOSE US')}
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 mt-12">
          
          {/* Large Item 1 (Span 2 columns) - White Card */}
          <motion.div
            className="md:col-span-2 card-white p-8 md:p-10 flex flex-col justify-between group overflow-hidden mouse-spotlight border border-[#E7EBE8]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAF8EF]/50 rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#064E2B] flex items-center justify-center mb-6 icon-animate shadow-btn">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0B0F0D] mb-4 group-hover:text-[#0E8F4D] transition-colors duration-300">
                {t('whyUs.items.expert.title')}
              </h3>
              <p className="text-[#3F4742] text-base md:text-lg leading-relaxed max-w-lg">
                {t('whyUs.items.expert.desc')}
              </p>
            </div>
            
            <div className="mt-10 flex items-center justify-between border-t border-[#E7EBE8] pt-6 relative z-10">
              <span className="text-sm font-bold text-[#0B0F0D] uppercase tracking-wider">{t('whyUs.trusted', 'ความน่าเชื่อถือ')}</span>
              <div className="w-10 h-10 rounded-full bg-[#F3F6F4] flex items-center justify-center group-hover:bg-[#19B965] transition-colors duration-300">
                <ArrowRight className="w-4 h-4 text-[#0B0F0D] group-hover:text-white transition-colors arrow-animate" />
              </div>
            </div>
          </motion.div>

          {/* Small Item 2 - Dark Card */}
          <motion.div
            className="card-dark p-8 flex flex-col justify-center group relative overflow-hidden mouse-spotlight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-[#0E8F4D]/10 rounded-full blur-2xl group-hover:bg-[#19B965]/20 transition-colors duration-700" />
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300 border border-white/10 icon-animate">
              <Clock className="w-6 h-6 text-[#19B965]" />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-white">{t('whyUs.items.fast.title')}</h3>
            <p className="text-white/85 text-sm leading-relaxed">{t('whyUs.items.fast.desc')}</p>
          </motion.div>

          {/* Small Item 3 - Glass / Soft Gray Card */}
          <motion.div
            className="card-glass p-8 flex flex-col justify-center group mouse-spotlight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#F3F6F4] flex items-center justify-center mb-6 group-hover:bg-[#0E8F4D] transition-colors duration-300 icon-animate">
              <Users className="w-6 h-6 text-[#0E8F4D] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B0F0D] mb-3">{t('whyUs.items.allInOne.title')}</h3>
            <p className="text-[#57615B] text-sm leading-relaxed">{t('whyUs.items.allInOne.desc')}</p>
          </motion.div>

          {/* Large Item 4 (Span 2 columns) - Gradient/Greenish Card */}
          <motion.div
            className="md:col-span-2 card-gradient p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 group overflow-hidden relative mouse-spotlight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 group-hover:bg-[#19B965] transition-colors duration-300 icon-animate shadow-sm border border-[#9EE6BC]">
                <TrendingUp className="w-6 h-6 text-[#0E8F4D] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0B0F0D] mb-3">{t('whyUs.items.accurate.title')}</h3>
              <p className="text-[#3F4742] text-base leading-relaxed">{t('whyUs.items.accurate.desc')}</p>
            </div>
            
            {/* Visual Element */}
            <div className="hidden md:flex flex-1 justify-end relative z-10">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 border-[3px] border-dashed border-[#9EE6BC] rounded-full animate-spin-slow" />
                <div className="absolute inset-4 bg-[#EAF8EF] rounded-full opacity-50 group-hover:bg-[#9EE6BC]/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-num font-extrabold text-[#064E2B]">100<span className="text-[#0E8F4D]">%</span></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
