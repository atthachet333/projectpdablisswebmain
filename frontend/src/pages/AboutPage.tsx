import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  FileCheck2,
  RefreshCcwDot,
  Briefcase,
  Ear,
  ClipboardList,
  Activity,
  HeartHandshake,
  Search,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CTASection from '../components/common/CTASection';
import SmartImage from '../components/common/SmartImage';
import { siteImages } from '../config/images';
import { COMPANY_INFO } from '../data/company';

/* ---------------------------------------------------------------
 * UI configuration — icons / images / links per section.
 * ✏️ ข้อความทั้งหมดแก้ที่ locales/{th,en}/common.json → "aboutPage"
 * ✏️ รูปภาพทั้งหมดแก้ที่ src/config/images.ts → siteImages.about
 * --------------------------------------------------------------- */
const expertiseMeta = [
  { icon: FileCheck2, accent: '#0E8F4D', image: siteImages.about.expertiseDocuments, href: '/services' },
  { icon: RefreshCcwDot, accent: '#19B965', image: siteImages.about.expertiseSoftware, href: '/services' },
  { icon: Briefcase, accent: '#064E2B', image: siteImages.about.expertiseConsulting, href: '/services' },
];

const processMeta = [
  { icon: Ear },
  { icon: Search },
  { icon: ClipboardList },
  { icon: Activity },
  { icon: HeartHandshake },
];

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Item = { title: string; desc: string };
type ValueItem = { word: string; desc: string };
type ConfidenceItem = { value: string; label: string; desc: string };

export default function AboutPage() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    document.title = `${t('nav.about')} | ${COMPANY_INFO.nameEn}`;
  }, [t]);

  /* Light parallax in hero */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroArtY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 56]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 26]);

  const introKeywords = t('aboutPage.intro.keywords', { returnObjects: true }) as string[];
  const expertiseItems = t('aboutPage.expertise.items', { returnObjects: true }) as Item[];
  const whyItems = t('aboutPage.why.items', { returnObjects: true }) as Item[];
  const processSteps = t('aboutPage.process.steps', { returnObjects: true }) as Item[];
  const valueItems = t('aboutPage.values.items', { returnObjects: true }) as ValueItem[];
  const confidenceItems = t('aboutPage.confidence.items', { returnObjects: true }) as ConfidenceItem[];

  return (
    <div className="pt-[72px] lg:pt-[78px] bg-white text-[#0B0F0D] overflow-hidden">

      {/* ════════ SECTION 1 — HERO ════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[600px] flex items-center py-20 lg:py-28 overflow-hidden"
        aria-label={t('nav.about')}
        style={{
          background: 'linear-gradient(150deg, #FFFFFF 0%, #F3FBF6 40%, #EAF8EF 66%, #E8F3FA 100%)',
        }}
      >
        {/* Abstract decoration layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-[18%] right-[-8%] w-[520px] h-[520px] rounded-full bg-[#19B965] opacity-[0.08] blur-[110px] orb-breathe" />
          <div className="absolute bottom-[-25%] left-[-10%] w-[480px] h-[480px] rounded-full bg-[#7EC8E3] opacity-[0.13] blur-[110px] orb-breathe-slow" />
          <div
            className="absolute top-14 left-[5%] w-40 h-40 opacity-[0.3]"
            style={{ backgroundImage: 'radial-gradient(#0E8F4D 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }}
          />
          <svg className="absolute inset-x-0 bottom-0 w-full h-[45%] opacity-60" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
            <path d="M0 220 C 320 140, 560 300, 900 210 S 1300 120, 1440 190" stroke="#19B965" strokeOpacity="0.16" strokeWidth="1.5" />
            <path d="M0 260 C 340 190, 620 330, 960 250 S 1320 170, 1440 240" stroke="#7EC8E3" strokeOpacity="0.28" strokeWidth="1.5" />
          </svg>
          <div className="absolute top-[24%] right-[32%] w-14 h-14 rounded-full border border-[#19B965]/20 animate-float" />
          <div className="absolute top-[64%] left-[13%] w-2.5 h-2.5 rounded-full bg-[#19B965]/30 animate-float-delay" />
          <div className="absolute top-[32%] left-[44%] w-2 h-2 rounded-full bg-[#7EC8E3]/50 animate-float-slow" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text */}
            <motion.div className="lg:col-span-7" style={{ y: heroTextY }}>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-[2px] bg-[#19B965]" aria-hidden="true" />
                  <span className="text-[13px] font-bold text-[#0E8F4D] uppercase tracking-[0.28em]">
                    {t('aboutPage.hero.eyebrow')}
                  </span>
                </div>

                <h1 className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold leading-[1.2] tracking-tight mb-6">
                  {t('aboutPage.hero.titleLine1')}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#064E2B] via-[#0E8F4D] to-[#19B965]">
                    {t('aboutPage.hero.titleLine2')}
                  </span>
                </h1>

                <p className="text-[17px] md:text-lg text-[#3F4742] font-medium leading-[1.75] max-w-2xl mb-4">
                  {t('aboutPage.hero.subtitle')}
                </p>
                <p className="text-[15px] md:text-base text-[#5B655F] leading-[1.85] max-w-2xl mb-9">
                  {t('aboutPage.hero.intro')}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link to="/services" className="btn-primary w-full sm:w-auto">
                    {t('aboutPage.hero.ctaPrimary')}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/contact" className="btn-secondary w-full sm:w-auto !bg-white/70 backdrop-blur-sm">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    {t('aboutPage.hero.ctaSecondary')}
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* ✏️ IMAGE SLOT: hero illustration — เปลี่ยนรูปที่ siteImages.about.heroIllustration */}
            <motion.div className="lg:col-span-5 relative hidden md:block" style={{ y: heroArtY }}>
              <motion.div
                className="relative mx-auto max-w-[360px] group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: easeOut }}
              >
                {/* Glow behind image — not a box */}
                <div
                  className="absolute inset-[-15%] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-80"
                  style={{
                    background: 'radial-gradient(circle at 50% 45%, rgba(25,185,101,0.20) 0%, rgba(126,200,227,0.13) 45%, transparent 72%)',
                    filter: 'blur(30px)',
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-[-8%] rounded-full border border-[#19B965]/15 animate-float-slow" aria-hidden="true" />
                <div className="absolute inset-[4%] rounded-full border border-dashed border-[#0E8F4D]/15" aria-hidden="true" />

                {/* Transparent container, contain fit, gentle float + hover lift */}
                <div className="relative animate-float transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.03]">
                  <SmartImage
                    src={siteImages.about.heroIllustration}
                    alt={siteImages.about.heroIllustration.labelEn || 'PDA BLISS'}
                    className="w-full !bg-transparent"
                    priority={true}
                    aspectRatio="1/1"
                    recommendedRatio="1:1"
                  />
                </div>

                <div className="absolute -top-3 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-[#19B965] to-[#0E8F4D] opacity-80 blur-[1px] animate-float-delay" aria-hidden="true" />
                <div className="absolute bottom-5 -left-5 w-4 h-4 rounded-full bg-[#7EC8E3]/70 animate-float" aria-hidden="true" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 2 — COMPANY INTRODUCTION ════════ */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="absolute right-[-5%] top-[8%] text-[150px] lg:text-[200px] font-bold text-[#0B0F0D] opacity-[0.025] leading-none pointer-events-none select-none" aria-hidden="true">
          PDA
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Narrative */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: easeOut }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#0E8F4D]" aria-hidden="true" />
                <span className="text-[13px] font-bold text-[#0E8F4D] uppercase tracking-[0.2em]">
                  {t('aboutPage.intro.eyebrow')}
                </span>
              </div>
              <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.3] tracking-tight mb-7">
                {t('aboutPage.intro.title')}
              </h2>
              <div className="relative pl-6 border-l-2 border-[#EAF8EF] space-y-5">
                <span className="absolute left-[-2px] top-0 h-14 w-[2px] bg-gradient-to-b from-[#19B965] to-transparent" aria-hidden="true" />
                <p className="text-[#3F4742] text-base md:text-[17px] leading-[1.9]">
                  {t('aboutPage.intro.p1')}
                </p>
                <p className="text-[#5B655F] text-base leading-[1.9]">
                  {t('aboutPage.intro.p2')}
                </p>
              </div>
            </motion.div>

            {/* Keyword stack — graphic side, no cards */}
            <div className="lg:col-span-5 relative">
              <div
                className="absolute -inset-6 rounded-full opacity-60 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(234,248,239,0.9) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <ul className="relative space-y-1">
                {introKeywords.map((k, i) => (
                  <motion.li
                    key={i}
                    className="group flex items-center gap-4 py-3.5 border-b border-[#EDF1EE] last:border-b-0 cursor-default"
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: i * 0.09, ease: easeOut }}
                  >
                    <span
                      className="font-num text-2xl lg:text-3xl font-bold text-transparent leading-none transition-transform duration-500 group-hover:scale-110 origin-left flex-shrink-0"
                      style={{ WebkitTextStroke: '1.2px #19B965' }}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <span className="text-[17px] lg:text-lg font-semibold text-[#141A16] transition-all duration-300 group-hover:text-[#064E2B] group-hover:translate-x-1.5">
                      {k}
                    </span>
                    <span className="ml-auto w-5 h-[1.5px] bg-[#19B965]/30 transition-all duration-500 group-hover:w-10 group-hover:bg-[#19B965]" aria-hidden="true" />
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 — OUR EXPERTISE ════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FAFCFB] to-white">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#19B965]/25 to-transparent" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mb-14 lg:mb-20"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className="text-[13px] font-bold text-[#0E8F4D] uppercase tracking-[0.22em]">
              {t('aboutPage.expertise.eyebrow')}
            </span>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold tracking-tight mt-3">
              {t('aboutPage.expertise.title')}
            </h2>
          </motion.div>

          {/* Alternating rows — image free-floating, no card frames */}
          <div className="space-y-20 lg:space-y-24">
            {expertiseItems.map((s, i) => {
              const meta = expertiseMeta[i % expertiseMeta.length];
              const Icon = meta.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.75, ease: easeOut }}
                >
                  {/* ✏️ IMAGE SLOT: เปลี่ยนรูปที่ siteImages.about.expertise* */}
                  <div className={`lg:col-span-5 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 70% 60% at 50% 60%, ${meta.accent}40 0%, transparent 70%)`,
                        filter: 'blur(34px)',
                      }}
                      aria-hidden="true"
                    />
                    <div className={`relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.03] ${i % 2 === 0 ? 'img-drift-a' : 'img-drift-b'}`}>
                      <SmartImage
                        src={meta.image}
                        alt={s.title}
                        className="img-radius-md w-full aspect-[4/3] !bg-transparent overflow-hidden"
                        recommendedRatio="4:3"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4'}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <Icon className="w-7 h-7 stroke-[1.5]" style={{ color: meta.accent }} aria-hidden="true" />
                      <span className="font-num text-sm font-bold text-[#A8B0AA] tracking-[0.3em]" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 h-[1px] bg-[#EDF1EE]" aria-hidden="true" />
                    </div>
                    <h3 className="relative inline-block text-xl md:text-[22px] font-bold mb-4 group-hover:text-[#064E2B] transition-colors duration-300">
                      {s.title}
                      <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-[#19B965] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                    </h3>
                    <p className="text-[#5B655F] text-base leading-[1.9] mb-6 max-w-xl">
                      {s.desc}
                    </p>
                    <Link
                      to={meta.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0E8F4D] hover:text-[#064E2B] transition-colors"
                    >
                      {t('aboutPage.expertise.linkLabel')}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 4 — WHY CHOOSE US ════════ */}
      <section className="relative py-20 lg:py-28 bg-[#0B0F0D] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-[-20%] left-[24%] w-[560px] h-[380px] bg-[#0E8F4D] opacity-[0.10] rounded-full blur-[130px] orb-breathe pointer-events-none" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-2xl mb-14 lg:mb-16"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className="text-[13px] font-bold text-[#19B965] uppercase tracking-[0.22em]">
              {t('aboutPage.why.eyebrow')}
            </span>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold !text-white tracking-tight leading-[1.3] mt-3">
              {t('aboutPage.why.title')}
            </h2>
            <div className="w-14 h-1 rounded-full bg-gradient-to-r from-[#19B965] to-[#064E2B] mt-6" aria-hidden="true" />
          </motion.div>

          {/* Interactive numbered list — 2-col grid, soft hover background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                className="group relative flex gap-5 items-start rounded-xl px-4 py-5 -mx-4 transition-colors duration-500 hover:bg-white/[0.04] cursor-default"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.06, ease: easeOut }}
              >
                <span
                  className="font-num text-3xl lg:text-4xl font-bold text-transparent leading-none pt-0.5 transition-transform duration-500 group-hover:scale-110 origin-top-left flex-shrink-0"
                  style={{ WebkitTextStroke: '1.2px rgba(25,185,101,0.65)' }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <div className="flex-1 transition-transform duration-500 group-hover:-translate-y-0.5">
                  <h3 className="text-[17px] lg:text-lg font-bold !text-white mb-1.5 group-hover:!text-[#19B965] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#A0ACA5] text-[15px] leading-[1.75] group-hover:text-white/85 transition-colors duration-300">
                    {item.desc}
                  </p>
                  <span className="block w-6 h-[1.5px] bg-[#19B965]/25 mt-3.5 transition-all duration-500 group-hover:w-14 group-hover:bg-[#19B965]" aria-hidden="true" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5 — WORKING PROCESS ════════ */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="absolute right-[7%] top-12 w-32 h-32 opacity-[0.3] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7EC8E3 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} aria-hidden="true" />

        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-3xl mb-14 lg:mb-20"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className="text-[13px] font-bold text-[#0E8F4D] uppercase tracking-[0.22em]">
              {t('aboutPage.process.eyebrow')}
            </span>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold tracking-tight mt-3">
              {t('aboutPage.process.title')}
            </h2>
          </motion.div>

          {/* Desktop: horizontal timeline (5 steps) with hover-active state */}
          <div className="hidden lg:block relative">
            <div className="absolute top-[26px] left-[8%] right-[8%] h-[2px] bg-[#EDF1EE]" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-[#19B965] via-[#0E8F4D] to-[#7EC8E3] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.6, delay: 0.3, ease: easeOut }}
              />
            </div>
            <div className="grid grid-cols-5 gap-5">
              {processSteps.map((step, i) => {
                const Icon = processMeta[i % processMeta.length].icon;
                const active = activeStep === i;
                return (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center text-center cursor-default"
                    onMouseEnter={() => setActiveStep(i)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.14, ease: easeOut }}
                  >
                    <div
                      className={`relative z-10 w-[52px] h-[52px] rounded-full border-2 flex items-center justify-center mb-7 transition-all duration-500 ${
                        active
                          ? 'border-[#19B965] bg-[#EAF8EF] shadow-[0_0_0_8px_rgba(25,185,101,0.08)]'
                          : 'border-[#19B965]/30 bg-white'
                      }`}
                    >
                      <Icon className={`w-[22px] h-[22px] stroke-[1.5] transition-all duration-500 ${active ? 'text-[#064E2B] scale-110' : 'text-[#0E8F4D]'}`} aria-hidden="true" />
                    </div>
                    <span
                      className={`font-num text-[2.4rem] font-bold text-transparent leading-none mb-3 transition-transform duration-500 ${active ? '-translate-y-1' : ''}`}
                      style={{ WebkitTextStroke: active ? '1.4px #19B965' : '1.4px #C9D6CE' }}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <h3 className={`font-bold text-base mb-2 transition-colors duration-300 ${active ? 'text-[#064E2B]' : 'text-[#141A16]'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-[1.7] max-w-[200px] transition-opacity duration-500 ${active ? 'text-[#3F4742] opacity-100' : 'text-[#57615B] opacity-75'}`}>
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet: vertical timeline */}
          <div className="lg:hidden relative pl-1">
            <span className="absolute left-[27px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-[#19B965] via-[#19B965]/30 to-transparent" aria-hidden="true" />
            <div className="space-y-10">
              {processSteps.map((step, i) => {
                const Icon = processMeta[i % processMeta.length].icon;
                return (
                  <motion.div
                    key={i}
                    className="relative flex items-start gap-5"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: easeOut }}
                  >
                    <div className="relative z-10 flex-shrink-0 w-[52px] h-[52px] rounded-full bg-white border-2 border-[#19B965]/40 flex items-center justify-center shadow-[0_4px_12px_rgba(25,185,101,0.10)]">
                      <Icon className="w-[22px] h-[22px] text-[#0E8F4D] stroke-[1.5]" aria-hidden="true" />
                    </div>
                    <div className="pt-1">
                      <span className="font-num text-[#19B965] font-bold text-[12px] tracking-[0.25em] block mb-1" aria-hidden="true">
                        STEP 0{i + 1}
                      </span>
                      <h3 className="font-bold text-[17px] mb-1.5">{step.title}</h3>
                      <p className="text-[#57615B] text-[15px] leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 6 — OUR VALUES ════════ */}
      <section className="relative py-20 lg:py-28 bg-[#F3F8F5] overflow-hidden">
        <div className="absolute right-[-8%] bottom-[-25%] w-[420px] h-[420px] rounded-full bg-[#19B965] opacity-[0.05] blur-[100px] pointer-events-none" aria-hidden="true" />
        <div
          className="absolute left-[4%] top-16 w-32 h-32 opacity-[0.25] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#0E8F4D 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}
          aria-hidden="true"
        />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <div className="lg:sticky lg:top-32">
                <span className="text-[13px] font-bold text-[#0E8F4D] uppercase tracking-[0.22em]">
                  {t('aboutPage.values.eyebrow')}
                </span>
                <h2 className="text-[26px] md:text-[32px] font-bold tracking-tight leading-[1.3] mt-3 mb-5">
                  {t('aboutPage.values.title')}
                </h2>
                <p className="text-[#5B655F] text-[15px] leading-[1.85]">
                  {t('aboutPage.values.desc')}
                </p>
              </div>
            </motion.div>

            {/* Typography stack — medium-size words, alternating offset */}
            <div className="lg:col-span-8">
              {valueItems.map((v, i) => (
                <motion.div
                  key={i}
                  className={`group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 lg:py-6 border-b border-[#0B0F0D]/[0.06] last:border-b-0 cursor-default ${
                    i % 2 === 1 ? 'sm:pl-10 lg:pl-16' : ''
                  }`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: i * 0.05, ease: easeOut }}
                >
                  <span className="font-num text-[12px] font-bold text-[#19B965] tracking-[0.3em] sm:w-10 flex-shrink-0" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-bold leading-snug tracking-tight text-[#141A16] transition-all duration-400 group-hover:text-[#0E8F4D] group-hover:translate-x-2 sm:flex-1">
                    {v.word}
                  </h3>
                  <p className="text-[#57615B] text-sm leading-relaxed sm:max-w-[230px] sm:text-right transition-colors duration-400 group-hover:text-[#3F4742]">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 7 — BUSINESS CONFIDENCE ════════ */}
      <section className="relative py-20 lg:py-28 bg-[#0B0F0D] overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#19B965]/25 to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] bg-[#0E8F4D] opacity-[0.08] rounded-[100%] blur-[130px] orb-breathe-alt pointer-events-none" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14 lg:mb-16"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className="text-[13px] font-bold text-[#19B965] uppercase tracking-[0.22em]">
              {t('aboutPage.confidence.eyebrow')}
            </span>
            <h2 className="text-[24px] md:text-[30px] lg:text-[34px] font-bold !text-white tracking-tight leading-[1.35] mt-3">
              {t('aboutPage.confidence.title')}
            </h2>
          </motion.div>

          {/*
            ✏️ ตัวเลข/ข้อความส่วนนี้แก้ที่ locales → aboutPage.confidence.items
            (โครงสร้าง { value, label, desc } — เพิ่มตัวเลขจริงในอนาคตได้ทันที)
          */}
          <div className="flex flex-wrap justify-center max-w-6xl mx-auto">
            {confidenceItems.map((item, i) => (
              <motion.div
                key={i}
                className="group text-center px-8 py-8 w-full sm:w-1/2 lg:w-1/5 lg:min-w-[190px] relative cursor-default"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: easeOut }}
              >
                {i > 0 && (
                  <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-white/[0.08]" aria-hidden="true" />
                )}
                <p className="font-num text-[26px] lg:text-[30px] font-bold text-[#19B965] mb-3 leading-none whitespace-nowrap transition-all duration-500 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_16px_rgba(25,185,101,0.45)]">
                  {item.value}
                </p>
                <p className="text-white font-bold text-[15px] mb-2 leading-snug">
                  {item.label}
                </p>
                <p className="text-[#A0ACA5] text-[13px] leading-[1.7] group-hover:text-white/85 transition-colors duration-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 8 — FINAL CTA ════════ */}
      <CTASection
        title={t('aboutPage.cta.title')}
        description={t('aboutPage.cta.subtitle')}
        primaryLabel={t('aboutPage.cta.primary')}
        primaryHref="/contact"
        secondaryLabel={t('aboutPage.cta.secondary')}
        secondaryHref="/services"
      />
    </div>
  );
}
