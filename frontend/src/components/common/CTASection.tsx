import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showIcon?: boolean;
}

export default function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref = '/pricing',
  secondaryLabel,
  secondaryHref = '/contact',
  showIcon = true,
}: CTASectionProps) {
  const { t } = useTranslation();
  
  const finalTitle = title || t('cta.title', 'พร้อมเริ่มต้นกับเราหรือยัง?');
  const finalDesc = description || t('cta.desc', 'ติดต่อทีมผู้เชี่ยวชาญของเราเพื่อรับคำปรึกษาและข้อเสนอที่เหมาะกับธุรกิจคุณที่สุด');
  const finalPrimary = primaryLabel || t('cta.primary', 'ดูแพ็กเกจบริการ');
  const finalSecondary = secondaryLabel || t('cta.secondary', 'ติดต่อเรา');

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-[#0B0F0D] via-[#151A17] to-[#064E2B]" aria-label="Call to Action">
      {/* Animated Light Border on Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] animated-border" />
      
      {/* Minimal Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0E8F4D] opacity-10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#19B965] opacity-10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[#19B965] animate-pulse-subtle shadow-glow-green" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {showIcon && (
              <div className="w-16 h-16 rounded-2xl bg-[#0E8F4D]/20 border border-[#19B965]/30 flex items-center justify-center mx-auto mb-8 relative group">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#19B965] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {finalTitle}
            </h2>
            
            <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              {finalDesc}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={primaryHref}
              className="w-full sm:w-auto btn-primary !rounded-xl"
            >
              {finalPrimary}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to={secondaryHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5 hover:border-white/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {finalSecondary}
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
