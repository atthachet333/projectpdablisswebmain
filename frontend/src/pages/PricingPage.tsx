import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';
import Accordion from '../components/common/Accordion';
import CTASection from '../components/common/CTASection';
import { apiService } from '../services/api';
import { COMPANY_INFO } from '../data/company';
import type { Package, Faq } from '../types';
import { useTranslation } from 'react-i18next';

export default function PricingPage() {
  const { t, i18n } = useTranslation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    document.title = `${t('nav.pricing', 'แพ็กเกจ')} | ${COMPANY_INFO.nameEn}`;
    
    apiService.getPackages().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setPackages(res.data);
      } else {
        setPackages(FALLBACK_PACKAGES);
      }
    }).catch(() => {
      setPackages(FALLBACK_PACKAGES);
    });
  }, [t]);

  const FALLBACK_PACKAGES: Package[] = [
    {
      id: 'starter',
      name: t('pricing.packages.starter.name', 'Starter'),
      price: 990,
      currency: t('pricing.currency', 'THB'),
      period: t('pricing.period', 'Month'),
      description: t('pricing.starterDesc'),
      badge: null,
      highlighted: false,
      features: [
        { text: t('pricing.features.basicQA', 'Basic Q&A'), included: true },
        { text: t('pricing.features.basicDoc', 'Basic Document Tracking'), included: true },
        { text: t('pricing.features.updateInfo', 'Important Updates'), included: true },
        { text: t('pricing.features.smallBiz', 'Suitable for small business'), included: true },
        { text: t('pricing.features.advDoc', 'Advanced Tracking'), included: false },
        { text: t('pricing.features.advConsult', 'Extra Consulting'), included: false },
        { text: t('pricing.features.custom', 'Custom Services'), included: false },
        { text: t('pricing.features.manager', 'Dedicated Manager'), included: false },
        { text: t('pricing.features.report', 'Monthly Report'), included: false },
        { text: t('pricing.features.multiDept', 'Multi-department Support'), included: false },
      ],
      cta: t('pricing.cta', 'Choose Plan'),
    },
    {
      id: 'professional',
      name: t('pricing.packages.pro.name', 'Professional'),
      price: 2990,
      currency: t('pricing.currency', 'THB'),
      period: t('pricing.period', 'Month'),
      description: t('pricing.proDesc'),
      badge: t('pricing.badgePopular', 'Popular'),
      highlighted: true,
      features: [
        { text: t('pricing.features.basicQA', 'Basic Q&A'), included: true },
        { text: t('pricing.features.basicDoc', 'Basic Document Tracking'), included: true },
        { text: t('pricing.features.updateInfo', 'Important Updates'), included: true },
        { text: t('pricing.features.allStarter', 'All Starter Features'), included: true },
        { text: t('pricing.features.advDoc', 'Advanced Tracking'), included: true },
        { text: t('pricing.features.advConsult', 'Extra Consulting'), included: true },
        { text: t('pricing.features.custom', 'Custom Services'), included: false },
        { text: t('pricing.features.manager', 'Dedicated Manager'), included: false },
        { text: t('pricing.features.report', 'Monthly Report'), included: false },
        { text: t('pricing.features.multiDept', 'Multi-department Support'), included: false },
      ],
      cta: t('pricing.cta', 'Choose Plan'),
    },
    {
      id: 'enterprise',
      name: t('pricing.packages.enterprise.name', 'Enterprise'),
      price: 6990,
      currency: t('pricing.currency', 'THB'),
      period: t('pricing.period', 'Month'),
      description: t('pricing.enterpriseDesc'),
      badge: null,
      highlighted: false,
      features: [
        { text: t('pricing.features.basicQA', 'Basic Q&A'), included: true },
        { text: t('pricing.features.basicDoc', 'Basic Document Tracking'), included: true },
        { text: t('pricing.features.updateInfo', 'Important Updates'), included: true },
        { text: t('pricing.features.allPro', 'All Professional Features'), included: true },
        { text: t('pricing.features.advDoc', 'Advanced Tracking'), included: true },
        { text: t('pricing.features.advConsult', 'Extra Consulting'), included: true },
        { text: t('pricing.features.custom', 'Custom Services'), included: true },
        { text: t('pricing.features.manager', 'Dedicated Manager'), included: true },
        { text: t('pricing.features.report', 'Monthly Report'), included: true },
        { text: t('pricing.features.multiDept', 'Multi-department Support'), included: true },
      ],
      cta: t('pricing.cta', 'Choose Plan'),
    },
  ];

  // Dynamic FAQs from translation
  const translatedFaqs = t('pricing.faqs', { returnObjects: true }) as Array<{ q: string; a: string }>;
  const mappedFaqs: Faq[] = translatedFaqs.map((faq, index) => ({
    id: index + 1,
    category: 'general',
    question: faq.q,
    answer: faq.a
  }));

  const calculatePrice = (basePrice: number) => {
    if (isYearly) {
      return Math.floor(basePrice * 12 * 0.85);
    }
    return basePrice;
  };

  const packageThemes = [
    { 
      bg: 'card-white mouse-spotlight', 
      btn: 'bg-[#F3F6F4] text-[#0B0F0D] hover:bg-[#0B0F0D] hover:text-white', 
      textAccent: 'text-[#0E8F4D]', 
      border: 'border-[#E7EBE8]',
      isDark: false,
      nameColor: 'text-[#0B0F0D]',
      descColor: 'text-[#3F4742]'
    },
    { 
      bg: 'bg-[#064E2B] text-white border border-[#19B965]/50 mouse-spotlight shadow-card-hover animated-border', 
      btn: 'btn-primary', 
      textAccent: 'text-[#9EE6BC]', 
      border: 'border-[#0E8F4D]',
      isDark: true,
      nameColor: 'text-white',
      descColor: 'text-[#EAF8EF]'
    },
    { 
      bg: 'card-dark mouse-spotlight', 
      btn: 'bg-white text-[#0B0F0D] hover:bg-[#19B965] hover:text-white', 
      textAccent: 'text-[#9EE6BC]', 
      border: 'border-[#3F4742]',
      isDark: true,
      nameColor: 'text-white',
      descColor: 'text-white/70'
    },
  ];

  return (
    <div className="pt-[72px] lg:pt-[78px] bg-[#FAFCFB]">
      
      {/* Hero */}
      <section className="relative bg-[#FAFCFB] py-20 lg:py-32 overflow-hidden" aria-label="Pricing">
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em]">
                MEMBERSHIP PLANS
              </span>
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0B0F0D] leading-[1.1] mb-6">
              {t('pricing.heroLine1', 'สมัครง่าย')} <span className="text-[#0E8F4D]">{t('pricing.heroLine2', 'ดูแลครบ')}</span>
            </h1>
            <p className="text-[#3F4742] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              {t('pricing.heroDesc', 'รับการดูแลแบบรายเดือนจากทีมผู้เชี่ยวชาญของ PDA BLISS รวดเร็ว ทันเหตุการณ์ และช่วยให้ธุรกิจของคุณเดินหน้าได้อย่างมั่นคง')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Toggle & Cards */}
      <section className="py-12 lg:py-20 bg-[#FAFCFB] relative" aria-labelledby="pricing-heading">
        <div className="container-custom">
          
          <div className="text-center mb-6">
             <h2 className="text-2xl font-bold text-[#0B0F0D] mb-8">{t('pricing.whichPackage')}</h2>
            {/* Segmented Control Toggle */}
            <div className="inline-flex items-center p-1.5 bg-[#F3F6F4] rounded-[16px] mx-auto relative border border-[#E7EBE8]">
              <div
                className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-[10px] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#E7EBE8]"
                style={{ left: isYearly ? 'calc(50% + 3px)' : '3px' }}
              />
              
              <button
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-[10px] transition-colors duration-300 w-32 ${!isYearly ? 'text-[#0B0F0D]' : 'text-[#747D77]'}`}
                onClick={() => setIsYearly(false)}
              >
                {t('pricing.monthly', 'รายเดือน')}
              </button>
              <button
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-[10px] transition-colors duration-300 w-32 flex items-center justify-center gap-2 ${isYearly ? 'text-[#0B0F0D]' : 'text-[#747D77]'}`}
                onClick={() => setIsYearly(true)}
              >
                {t('pricing.yearly', 'รายปี')}
                <span className="absolute -top-3 -right-2 bg-[#19B965] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-glow-green animate-pulse-subtle">
                  -15%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-7xl mx-auto mt-16">
            <AnimatePresence mode="wait">
              {packages.map((pkg, i) => {
                const theme = packageThemes[i % packageThemes.length];
                
                return (
                  <motion.div
                    key={pkg.id}
                    className={`relative rounded-[24px] p-8 lg:p-10 flex flex-col transition-all duration-500 ${theme.bg} ${
                      pkg.highlighted ? 'scale-105 z-10' : ''
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {pkg.badge && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className="bg-[#19B965] text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-glow-green flex items-center gap-1.5 whitespace-nowrap uppercase tracking-widest border border-[#9EE6BC]">
                          <Sparkles className="w-3.5 h-3.5" />
                          {pkg.badge}
                        </div>
                      </div>
                    )}

                    <h3 className={`text-2xl font-extrabold mb-3 ${theme.nameColor}`}>{pkg.name}</h3>
                    
                    {/* The new Which package is right for you description is bound to pkg.description */}
                    <p className={`text-sm mb-8 leading-relaxed h-20 ${theme.descColor}`}>
                      {pkg.description}
                    </p>

                    {/* Price */}
                    <div className={`mb-10 pb-8 border-b ${theme.border}`}>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl lg:text-5xl font-num font-extrabold tracking-tight ${theme.textAccent}`}>
                          <motion.span
                            key={isYearly ? 'yearly' : 'monthly'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block"
                          >
                            {calculatePrice(pkg.price).toLocaleString(i18n.language === 'en' ? 'en-US' : 'th-TH')}
                          </motion.span>
                        </span>
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold ${theme.isDark ? 'text-white' : 'text-[#0B0F0D]'}`}>
                            {pkg.currency}
                          </span>
                          <span className={`text-xs ${theme.isDark ? 'text-white/60' : 'text-[#747D77]'}`}>
                            / {isYearly ? t('pricing.perYear', 'ปี') : pkg.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-10 flex-1">
                      {pkg.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-4">
                          {feat.included ? (
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.highlighted ? 'bg-[#9EE6BC]/20' : theme.isDark ? 'bg-white/10' : 'bg-[#EAF8EF]'}`}>
                              <Check className={`w-3.5 h-3.5 ${pkg.highlighted ? 'text-[#9EE6BC]' : theme.isDark ? 'text-white' : 'text-[#19B965]'}`} aria-hidden="true" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <X className={`w-4 h-4 ${theme.isDark ? 'text-white/30' : 'text-[#E7EBE8]'}`} aria-hidden="true" />
                            </div>
                          )}
                          <span className={`text-sm leading-relaxed ${feat.included ? (theme.isDark ? 'text-white font-medium' : 'text-[#0B0F0D] font-medium') : (theme.isDark ? 'text-white/50' : 'text-[#747D77] line-through opacity-70')}`}>
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="/contact"
                      className={`w-full text-center py-4 rounded-xl font-bold transition-all duration-300 tracking-wide ${theme.btn}`}
                    >
                      {pkg.cta}
                    </a>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white" aria-labelledby="pricing-faq-heading">
        <div className="container-custom max-w-3xl">
          <SectionDivider title={t('pricing.faqTitle')} subtitle="FAQ" variant="B" />
          <div className="mt-12">
            <Accordion items={mappedFaqs} columns={1} />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
