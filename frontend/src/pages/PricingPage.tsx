import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Sparkles, Info, Star, Building2, Users, Zap, ArrowRight, ShieldCheck, ChevronDown, ChevronUp, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';
import Accordion from '../components/common/Accordion';
import CTASection from '../components/common/CTASection';
import { apiService } from '../services/api';
import { COMPANY_INFO } from '../data/company';
import type { Package, Faq } from '../types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Tooltip component
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="pricing-tooltip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={text}
      onClick={() => setOpen(!open)}
    >
      {children}
      {open && (
        <span className="tooltip-content" role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}

// Feature row with optional tooltip
function FeatureItem({ text, included, isDark, isHighlighted, tooltip }: {
  text: string;
  included: boolean;
  isDark: boolean;
  isHighlighted: boolean;
  tooltip?: string;
}) {
  return (
    <li className="flex items-start gap-3">
      {included ? (
        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isHighlighted ? 'bg-[#9EE6BC]/20' : isDark ? 'bg-white/10' : 'bg-[#EAF8EF]'
        }`}>
          <Check className={`w-3 h-3 ${isHighlighted ? 'text-[#9EE6BC]' : isDark ? 'text-white' : 'text-[#19B965]'}`} aria-hidden="true" />
        </div>
      ) : (
        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Minus className={`w-4 h-4 ${isDark ? 'text-white/25' : 'text-[#CBD5C0]'}`} aria-hidden="true" />
        </div>
      )}
      <span className={`text-sm leading-relaxed flex items-center gap-1.5 ${included
        ? (isDark ? 'text-white/90 font-medium' : 'text-[#0B0F0D] font-medium')
        : (isDark ? 'text-white/35' : 'text-[#9BA89D]')}`}
      >
        {text}
        {tooltip && included && (
          <Tooltip text={tooltip}>
            <Info className="w-3.5 h-3.5 opacity-50 hover:opacity-100 cursor-help inline-flex flex-shrink-0" aria-hidden="true" />
          </Tooltip>
        )}
      </span>
    </li>
  );
}

// Collapsible feature group
function FeatureGroup({ label, items, isDark, isHighlighted }: {
  label: string;
  items: Array<{ text: string; included: boolean; tooltip?: string }>;
  isDark: boolean;
  isHighlighted: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4">
      <button
        className={`w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 py-1.5 px-2 rounded-lg transition-colors ${
          isDark ? 'text-white/50 hover:text-white/70 hover:bg-white/5' : 'text-[#747D77] hover:text-[#3F4742] hover:bg-[#F3F6F4]'
        }`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2.5 px-1"
          >
            {items.map((item, i) => (
              <FeatureItem key={i} {...item} isDark={isDark} isHighlighted={isHighlighted} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComparisonStrip({ t }: { t: Function }) {
  const [openMobile, setOpenMobile] = useState(false);

  const rows = t('pricing.comparison.rows', { returnObjects: true }) as Array<{
    label: string;
    starter: string;
    pro: string;
    enterprise: string;
  }>;

  const safeRows = Array.isArray(rows) ? rows : [];

  const checkIcon = <CheckCircle2 className="w-5 h-5 text-[#064E2B] fill-[#EAF8EF] rounded-full inline-block" />;
  const minusIcon = <MinusCircle className="w-5 h-5 text-[#9BA89D] inline-block" />;
  const crossIcon = <XCircle className="w-5 h-5 text-[#9BA89D] fill-[#F3F6F4] rounded-full inline-block" />;

  const getIconForValue = (val: string) => {
    const v = val.toLowerCase();
    if (v === 'included' || v === 'yes' || v.includes('included') && !v.includes('not')) return checkIcon;
    if (v === 'not included' || v === 'no' || v.includes('not included') || v.includes('ไม่รวม')) return crossIcon;
    if (v === '-') return minusIcon;
    return val;
  };

  return (
    <div className="mt-20 mb-4" id="pricing-comparison">
      {/* Quick Differences Strip */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em] mb-3 bg-[#EAF8EF] px-5 py-2 rounded-full">
            {t('pricing.quickDifferences.subtitle', 'At a glance')}
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-[#0B0F0D]">
            {t('pricing.quickDifferences.title', 'Quick Differences')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: t('pricing.quickDifferences.responseTime', 'Response Time'), s: '2 days', p: '1 day', e: '4-8 hrs' },
            { label: t('pricing.quickDifferences.consultations', 'Consultations'), s: '1/mo', p: '3/mo', e: 'Custom' },
            { label: t('pricing.quickDifferences.tracking', 'Tracking'), s: 'Basic', p: 'In-depth', e: 'Multi-dept' },
            { label: t('pricing.quickDifferences.reports', 'Reports'), s: 'None', p: 'Monthly', e: 'Executive' },
            { label: t('pricing.quickDifferences.dedicatedManager', 'Dedicated Manager'), s: 'No', p: 'Shared', e: 'Yes' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E7EBE8] rounded-[16px] p-4 text-center shadow-sm">
              <p className="text-xs font-bold text-[#747D77] uppercase tracking-wider mb-2">{item.label}</p>
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-[#3F4742]">S: {item.s}</span>
                <span className="text-[#0E8F4D] font-bold">P: {item.p}</span>
                <span className="text-[#0B0F0D] font-semibold">E: {item.e}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-10">
        <span className="inline-block text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em] mb-3 bg-[#EAF8EF] px-5 py-2 rounded-full">
          {t('pricing.comparison.title')}
        </span>
        <p className="text-[#747D77] text-sm mt-2">
          {t('pricing.comparison.subtitle', 'Compare features across all packages')}
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-[20px] border border-[#E7EBE8] bg-white shadow-[0_4px_24px_rgba(11,15,13,0.06)] relative">
        <table className="w-full text-sm min-w-[600px] border-collapse" role="table">
          <caption className="sr-only">{t('pricing.comparison.title')}</caption>
          <thead>
            <tr className="border-b-2 border-[#E7EBE8]">
              <th scope="col" className="sticky left-0 z-20 text-left py-5 px-6 font-bold text-[#3F4742] text-xs uppercase tracking-wider bg-[#F3F6F4] border-r border-[#E7EBE8] w-[30%] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                {t('pricing.comparison.featureHeader', 'Feature')}
              </th>
              <th scope="col" className="py-5 px-6 font-bold text-center text-[#3F4742] text-sm bg-[#F3F6F4]">
                {t('pricing.comparison.starterHeader', 'Starter')}
              </th>
              <th scope="col" className="py-5 px-6 font-bold text-center text-white text-sm bg-[#064E2B] relative">
                <span className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  {t('pricing.comparison.proHeader', 'Professional')}
                </span>
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#19B965] text-[#0B0F0D] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                  {t('pricing.badge.pro', 'Popular')}
                </span>
              </th>
              <th scope="col" className="py-5 px-6 font-bold text-center text-[#3F4742] text-sm bg-[#F3F6F4]">
                {t('pricing.comparison.enterpriseHeader', 'Enterprise')}
              </th>
            </tr>
          </thead>
          <tbody>
            {safeRows.map((row, i) => {
               // Determine tooltip if any
               let tooltipText = undefined;
               if (row.label.includes('Response Time') || row.label.includes('เวลาตอบกลับ')) tooltipText = t('pricing.tooltips.responseTime');
               else if (row.label.includes('Dedicated Manager') || row.label.includes('ผู้ดูแลประจำ')) tooltipText = t('pricing.tooltips.manager');
               else if (row.label.includes('Reports') || row.label.includes('รายงาน')) tooltipText = t('pricing.tooltips.reports');
               
               return (
                <tr
                  key={i}
                  className={`border-b border-[#E7EBE8] last:border-0 transition-colors duration-150 ${
                    i % 2 === 0 ? 'bg-white hover:bg-[#F9FCF9]' : 'bg-[#FAFCFB] hover:bg-[#F3FBF5]'
                  }`}
                >
                  <td className={`sticky left-0 z-10 py-4 px-6 font-semibold text-[#0B0F0D] text-sm border-r border-[#E7EBE8] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFB]'}`}>
                    <div className="flex items-center gap-1.5">
                      {row.label}
                      {tooltipText && (
                        <Tooltip text={tooltipText}>
                          <Info className="w-3.5 h-3.5 opacity-50 hover:opacity-100 cursor-help inline-flex flex-shrink-0" aria-hidden="true" />
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center text-[#3F4742] text-sm">{getIconForValue(row.starter)}</td>
                  <td className="py-4 px-6 text-center text-sm bg-[#EAF8EF]/40 font-semibold text-[#064E2B] border-x border-[#19B965]/10">
                    {getIconForValue(row.pro)}
                  </td>
                  <td className="py-4 px-6 text-center text-[#3F4742] text-sm">{getIconForValue(row.enterprise)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
        setPackages(getFallbackPackages());
      }
    }).catch(() => {
      setPackages(getFallbackPackages());
    });
  }, [t]);

  function getFallbackPackages(): Package[] {
    return [
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
          { text: t('pricing.features.basicQA'), included: true },
          { text: t('pricing.features.basicDoc'), included: true },
          { text: t('pricing.features.updateInfo'), included: true },
          { text: t('pricing.features.smallBiz'), included: true },
          { text: t('pricing.features.advDoc'), included: false },
          { text: t('pricing.features.advConsult'), included: false },
          { text: t('pricing.features.custom'), included: false },
          { text: t('pricing.features.manager'), included: false },
          { text: t('pricing.features.report'), included: false },
          { text: t('pricing.features.multiDept'), included: false },
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
          { text: t('pricing.features.basicQA'), included: true },
          { text: t('pricing.features.basicDoc'), included: true },
          { text: t('pricing.features.updateInfo'), included: true },
          { text: t('pricing.features.allStarter'), included: true },
          { text: t('pricing.features.advDoc'), included: true },
          { text: t('pricing.features.advConsult'), included: true },
          { text: t('pricing.features.custom'), included: false },
          { text: t('pricing.features.manager'), included: false },
          { text: t('pricing.features.report'), included: true },
          { text: t('pricing.features.multiDept'), included: false },
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
          { text: t('pricing.features.basicQA'), included: true },
          { text: t('pricing.features.basicDoc'), included: true },
          { text: t('pricing.features.updateInfo'), included: true },
          { text: t('pricing.features.allPro'), included: true },
          { text: t('pricing.features.advDoc'), included: true },
          { text: t('pricing.features.advConsult'), included: true },
          { text: t('pricing.features.custom'), included: true },
          { text: t('pricing.features.manager'), included: true },
          { text: t('pricing.features.report'), included: true },
          { text: t('pricing.features.multiDept'), included: true },
        ],
        cta: t('pricing.cta', 'Choose Plan'),
      },
    ];
  }

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

  // Package IDs in order
  const pkgKeys = ['starter', 'pro', 'enterprise'] as const;

  // Per-package config
  const packageConfig = [
    {
      wrapperClass: 'bg-white border border-[#E7EBE8] hover:border-[#19B965] hover:shadow-[0_8px_30px_rgba(25,185,101,0.12)] hover:-translate-y-2 transition-all duration-300 pricing-card-hover rounded-[24px]',
      isDark: false,
      isHighlighted: false,
      textAccent: 'text-[#0E8F4D]',
      priceColor: 'text-[#0E8F4D]',
      badgeClass: 'bg-[#EAF8EF] text-[#064E2B] border border-[#9EE6BC]',
      highlightBoxBg: 'bg-[#F3F6F4]',
      highlightBoxBorder: 'border-[#E7EBE8]',
      highlightBoxText: 'text-[#3F4742]',
      highlightBoxIcon: 'text-[#0E8F4D]',
      ctaClass: 'w-full text-center py-4 rounded-xl font-bold transition-all duration-300 border-2 border-[#064E2B] text-[#064E2B] hover:bg-[#064E2B] hover:text-white',
      nameColor: 'text-[#0B0F0D]',
      positioningColor: 'text-[#0E8F4D]',
      summaryColor: 'text-[#3F4742]',
      dividerColor: 'border-[#E7EBE8]',
      suitableIconBg: 'bg-[#EAF8EF]',
      suitableIconColor: 'text-[#0E8F4D]',
      suitableText: 'text-[#3F4742]',
      notIncludedText: 'text-[#9BA89D]',
      Icon: Users,
    },
    {
      wrapperClass: 'bg-[#064E2B] border border-[#19B965]/50 rounded-[24px] shadow-[0_8px_40px_rgba(6,78,43,0.35)] scale-[1.025] hover:scale-[1.025] hover:-translate-y-2 transition-all duration-300 z-10 relative animated-border',
      isDark: true,
      isHighlighted: true,
      textAccent: 'text-[#9EE6BC]',
      priceColor: 'text-[#9EE6BC]',
      badgeClass: 'bg-[#19B965] text-white border border-[#9EE6BC]',
      highlightBoxBg: 'bg-[#042218]',
      highlightBoxBorder: 'border-[#19B965]/30',
      highlightBoxText: 'text-[#B7E8C9]',
      highlightBoxIcon: 'text-[#9EE6BC]',
      ctaClass: 'w-full text-center py-4 rounded-xl font-bold transition-all duration-300 bg-white text-[#064E2B] hover:bg-[#9EE6BC] hover:text-[#064E2B]',
      nameColor: 'text-white',
      positioningColor: 'text-[#9EE6BC]',
      summaryColor: 'text-white/70',
      dividerColor: 'border-[#19B965]/30',
      suitableIconBg: 'bg-[#19B965]/20',
      suitableIconColor: 'text-[#9EE6BC]',
      suitableText: 'text-white/80',
      notIncludedText: 'text-white/35',
      Icon: Star,
    },
    {
      wrapperClass: 'bg-[#0B1711] border border-[#3F4742] hover:border-[#747D77] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 pricing-card-hover rounded-[24px]',
      isDark: true,
      isHighlighted: false,
      textAccent: 'text-[#9EE6BC]',
      priceColor: 'text-[#19B965]',
      badgeClass: 'bg-[#19B965]/20 text-[#9EE6BC] border border-[#19B965]/40',
      highlightBoxBg: 'bg-[#0B0F0D]',
      highlightBoxBorder: 'border-[#3F4742]',
      highlightBoxText: 'text-white/70',
      highlightBoxIcon: 'text-[#9EE6BC]',
      ctaClass: 'w-full text-center py-4 rounded-xl font-bold transition-all duration-300 bg-[#19B965] text-[#0B0F0D] hover:bg-white hover:text-[#0B0F0D]',
      nameColor: 'text-white',
      positioningColor: 'text-[#9EE6BC]',
      summaryColor: 'text-white/60',
      dividerColor: 'border-[#3F4742]',
      suitableIconBg: 'bg-[#19B965]/10',
      suitableIconColor: 'text-[#19B965]',
      suitableText: 'text-white/70',
      notIncludedText: 'text-white/25',
      Icon: Building2,
    },
  ];

  // Feature groups per package
  function getFeatureGroups(pkgKey: 'starter' | 'pro' | 'enterprise') {
    const details = t(`pricing.featureDetails.${pkgKey}`, { returnObjects: true }) as Record<string, string[]>;
    const groups = t('pricing.featureGroups', { returnObjects: true }) as Record<string, string>;
    const tooltips = t('pricing.tooltips', { returnObjects: true }) as Record<string, string>;
    
    const groupKeys = ['contact', 'tracking', 'consultation', 'planning', 'reports', 'manager'];
    const notIncluded = ['ไม่รวม', 'Not included', 'Not included'];
    
    return groupKeys.map(gk => ({
      label: groups[gk] || gk,
      items: (details[gk] || []).map(text => ({
        text,
        included: !notIncluded.some(ni => text === ni),
        tooltip: gk === 'contact' ? tooltips['responseTime']
          : gk === 'manager' ? tooltips['manager']
          : gk === 'reports' ? tooltips['reports']
          : gk === 'consultation' ? tooltips['consultation']
          : undefined,
      }))
    }));
  }

  function getSuitableFor(pkgKey: 'starter' | 'pro' | 'enterprise') {
    return t(`pricing.suitableFor.${pkgKey}`, { returnObjects: true }) as string[];
  }
  function getNotIncluded(pkgKey: 'starter' | 'pro' | 'enterprise') {
    return t(`pricing.notIncluded.${pkgKey}`, { returnObjects: true }) as string[];
  }

  return (
    <div className="pt-[76px] lg:pt-[80px] bg-[#FAFCFB]">
      
      {/* Decorative orbs */}
      <div className="fixed pointer-events-none top-0 right-0 w-96 h-96 bg-[#EAF8EF] rounded-full blur-[120px] opacity-30 z-0" aria-hidden="true" />
      <div className="fixed pointer-events-none bottom-0 left-0 w-64 h-64 bg-[#F3F6F4] rounded-full blur-[80px] opacity-40 z-0" aria-hidden="true" />

      {/* Hero */}
      <section className="relative bg-[#FAFCFB] py-20 lg:py-24 overflow-hidden section-top-glow" aria-label="Pricing">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.4]" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em] bg-[#EAF8EF] px-4 py-1.5 rounded-full">
                MEMBERSHIP PLANS
              </span>
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0B0F0D] leading-[1.1] mb-6">
              {t('pricing.heroLine1', 'สมัครง่าย')} <span className="text-[#0E8F4D]">{t('pricing.heroLine2', 'ดูแลครบ')}</span>
            </h1>
            <p className="text-[#3F4742] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
              {t('pricing.heroDesc')}
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              {[t('pricing.ctaSection.trust.0', 'ไม่มีค่าธรรมเนียมประเมิน'), t('pricing.ctaSection.trust.1', 'เปลี่ยนแพ็กเกจได้'), t('pricing.ctaSection.trust.2', 'แจ้งเงื่อนไขชัดเจน')].map((txt, i) => (
                <span key={i} className="flex items-center gap-2 text-sm text-[#3F4742]">
                  <ShieldCheck className="w-4 h-4 text-[#0E8F4D] flex-shrink-0" aria-hidden="true" />
                  {txt}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Toggle & Cards */}
      <section className="py-20 lg:py-24 bg-[#FAFCFB] relative" aria-labelledby="pricing-heading">
        <div className="container-custom">
          
          <div className="text-center mb-8">
            <h2 id="pricing-heading" className="text-2xl font-bold text-[#0B0F0D] mb-8">{t('pricing.whichPackage')}</h2>
            {/* Segmented Control Toggle */}
            <div
              className="inline-flex items-center p-1.5 bg-[#F3F6F4] rounded-[16px] mx-auto relative border border-[#E7EBE8]"
              role="group"
              aria-label="Billing period"
            >
              <div
                className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-[10px] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#E7EBE8]"
                style={{ left: isYearly ? 'calc(50% + 3px)' : '3px' }}
              />
              
              <button
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-[10px] transition-colors duration-300 w-32 ${!isYearly ? 'text-[#0B0F0D]' : 'text-[#747D77]'}`}
                onClick={() => setIsYearly(false)}
                aria-pressed={!isYearly}
              >
                {t('pricing.monthly', 'รายเดือน')}
              </button>
              <button
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-[10px] transition-colors duration-300 w-32 flex items-center justify-center gap-2 ${isYearly ? 'text-[#0B0F0D]' : 'text-[#747D77]'}`}
                onClick={() => setIsYearly(true)}
                aria-pressed={isYearly}
              >
                {t('pricing.yearly', 'รายปี')}
                <span className="absolute -top-3 -right-2 bg-[#19B965] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  -15%
                </span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 items-start max-w-7xl mx-auto mt-12">
            <AnimatePresence mode="wait">
              {packages.map((pkg, i) => {
                const cfg = packageConfig[i % packageConfig.length];
                const pkgKey = pkgKeys[i % pkgKeys.length];
                const featureGroups = getFeatureGroups(pkgKey);
                const suitableFor = getSuitableFor(pkgKey);
                const notIncluded = getNotIncluded(pkgKey);
                
                return (
                  <motion.div
                    key={pkg.id}
                    className={`relative p-7 lg:p-8 flex flex-col ${cfg.wrapperClass}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Badge */}
                    {(pkg.badge || i === 0 || i === 2) && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className={`text-xs font-extrabold px-4 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap uppercase tracking-widest ${cfg.badgeClass}`}>
                          {i === 1 && <Sparkles className="w-3.5 h-3.5" />}
                          {i === 0 ? t('pricing.badge.starter', 'เหมาะสำหรับเริ่มต้น')
                            : i === 1 ? (pkg.badge || t('pricing.badge.pro', 'ยอดนิยม'))
                            : t('pricing.badge.enterprise', 'ครบที่สุด')}
                        </div>
                      </div>
                    )}

                    {/* Package header */}
                    <div className="mb-5">
                      <div className={`inline-flex items-center gap-2 mb-2`}>
                        <cfg.Icon className={`w-5 h-5 ${cfg.textAccent}`} aria-hidden="true" />
                        <h3 className={`text-xl font-extrabold ${cfg.nameColor}`}>{pkg.name}</h3>
                      </div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${cfg.positioningColor}`}>
                        {t(`pricing.positioning.${pkgKey}`, pkg.description)}
                      </p>
                      <p className={`text-sm leading-relaxed ${cfg.summaryColor}`}>
                        {t(`pricing.summary.${pkgKey}`, pkg.description)}
                      </p>
                    </div>

                    {/* Highlight box */}
                    <div className={`rounded-xl p-3 mb-5 border flex items-start gap-2.5 ${cfg.highlightBoxBg} ${cfg.highlightBoxBorder}`}>
                      <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${cfg.highlightBoxIcon}`} aria-hidden="true" />
                      <p className={`text-xs leading-relaxed font-medium ${cfg.highlightBoxText}`}>
                        <span className="font-bold">จุดเด่น: </span>
                        {t(`pricing.highlight.${pkgKey}`, '')}
                      </p>
                    </div>

                    {/* Price */}
                    <div className={`mb-6 pb-6 border-b ${cfg.dividerColor}`}>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl lg:text-5xl font-extrabold tracking-tight ${cfg.priceColor}`}>
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
                          <span className={`text-sm font-bold ${cfg.isDark ? 'text-white' : 'text-[#0B0F0D]'}`}>
                            {pkg.currency}
                          </span>
                          <span className={`text-xs ${cfg.isDark ? 'text-white/50' : 'text-[#747D77]'}`}>
                            / {isYearly ? t('pricing.perYear', 'ปี') : pkg.period}
                          </span>
                        </div>
                      </div>
                      {isYearly && (
                        <p className={`text-xs mt-2 ${cfg.isDark ? 'text-[#9EE6BC]' : 'text-[#0E8F4D]'}`}>
                          ≈ {Math.floor(calculatePrice(pkg.price) / 12).toLocaleString()} {pkg.currency}/{pkg.period}
                        </p>
                      )}
                    </div>

                    {/* Feature groups */}
                    <div className="flex-1 mb-6 space-y-1">
                      {featureGroups.map((group, gi) => (
                        <FeatureGroup
                          key={gi}
                          label={group.label}
                          items={group.items}
                          isDark={cfg.isDark}
                          isHighlighted={cfg.isHighlighted}
                        />
                      ))}
                    </div>



                    {/* CTA */}
                    <a
                      href="/contact"
                      className={`block text-center py-4 rounded-xl font-bold transition-all duration-300 tracking-wide text-sm mt-auto ${cfg.ctaClass}`}
                    >
                      {pkg.cta}
                    </a>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Comparison strip */}
          <ComparisonStrip t={t} />

          {/* Suitable For & Not Included Section */}
          <div className="mt-16 mb-4">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em] mb-3 bg-[#EAF8EF] px-5 py-2 rounded-full">
                {t('pricing.businessTypes.subtitle', 'แพ็กเกจที่เหมาะกับธุรกิจของคุณ')}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0B0F0D] mt-3">
                {t('pricing.businessTypes.title', 'เลือกจากรูปแบบการทำงานของธุรกิจคุณ')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(['starter', 'pro', 'enterprise'] as const).map((key, i) => {
                const btConfig = [
                  { accent: '#0E8F4D', bg: 'bg-white', border: 'border-[#E7EBE8]', headingColor: 'text-[#064E2B]', icon: Users },
                  { accent: '#064E2B', bg: 'bg-[#064E2B]', border: 'border-[#19B965]/40', headingColor: 'text-white', icon: Star },
                  { accent: '#0B0F0D', bg: 'bg-[#0B1711]', border: 'border-[#3F4742]', headingColor: 'text-[#19B965]', icon: Building2 },
                ];
                const cfg = btConfig[i];
                const suitableFor = getSuitableFor(key);
                const notIncluded = getNotIncluded(key);
                return (
                  <div key={key} className={`${cfg.bg} border ${cfg.border} rounded-[20px] p-6 lg:p-7 shadow-sm`}>
                    <h4 className={`font-extrabold text-lg mb-4 ${cfg.headingColor}`}>
                      {i === 0 ? t('pricing.packages.starter.name') : i === 1 ? t('pricing.packages.pro.name') : t('pricing.packages.enterprise.name')}
                    </h4>
                    
                    <div className="mb-6">
                      <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-[#747D77]' : 'text-white/50'}`}>
                        {i === 0 ? 'Suitable For' : 'เหมาะกับ'}
                      </p>
                      <ul className="space-y-2">
                        {suitableFor.map((item, si) => (
                          <li key={si} className={`flex items-start gap-2 text-sm ${i === 0 ? 'text-[#3F4742]' : 'text-white/80'}`}>
                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${i === 0 ? 'text-[#0E8F4D]' : 'text-[#9EE6BC]'}`} aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-[#9BA89D]' : 'text-white/35'}`}>
                        {i === 0 ? 'Not Included' : 'ไม่รวมในแพ็กเกจ'}
                      </p>
                      <ul className="space-y-2">
                        {notIncluded.map((item, ni) => (
                          <li key={ni} className={`flex items-start gap-2 text-sm ${i === 0 ? 'text-[#9BA89D]' : 'text-white/40'}`}>
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-60" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          {/* Enhanced CTA Section below */}
          <div className="mt-10 relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-[#F3FBF5] to-[#EAF8EF] border border-[#D0EDDB] shadow-[0_4px_30px_rgba(25,185,101,0.08)] p-8 lg:p-12">
            {/* Background dots */}
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
            {/* Glow */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#19B965] rounded-full blur-[60px] opacity-10" aria-hidden="true" />

            <div className="relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
                <span className="text-[11px] font-extrabold text-[#0E8F4D] uppercase tracking-[0.2em]">
                  {t('pricing.ctaSection.eyebrow', 'ขอคำแนะนำฟรี')}
                </span>
                <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
              </div>

              {/* Heading */}
              <h3 className="text-xl md:text-3xl font-extrabold text-[#0B0F0D] mb-4 text-center leading-tight">
                {t('pricing.ctaSection.title', 'ยังไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับธุรกิจของคุณ?')}
              </h3>

              {/* Description */}
              <p className="text-[#3F4742] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 text-center">
                {t('pricing.ctaSection.desc', 'ทีมงานสามารถช่วยประเมินจากจำนวนงาน ความถี่ในการติดตาม จำนวนผู้ประสานงาน และระดับความซับซ้อนของธุรกิจ เพื่อแนะนำแพ็กเกจที่เหมาะสมโดยไม่บังคับขาย')}
              </p>

              {/* Trust items */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
                {(t('pricing.ctaSection.trust', { returnObjects: true }) as string[]).map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-[#3F4742] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#0E8F4D] flex-shrink-0" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#064E2B] text-white font-bold rounded-xl hover:bg-[#0B0F0D] transition-all duration-300 shadow-[0_4px_20px_rgba(6,78,43,0.3)] hover:-translate-y-0.5 text-sm overflow-hidden group/cta1"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/cta1:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">{t('pricing.ctaSection.btn1', 'ขอคำแนะนำแพ็กเกจ')}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/cta1:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#064E2B] text-[#064E2B] font-bold rounded-xl hover:bg-[#EAF8EF] transition-all duration-300 text-sm"
                >
                  {t('pricing.ctaSection.btn2', 'ติดต่อทีมงาน')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white section-top-glow" aria-labelledby="pricing-faq-heading">
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
