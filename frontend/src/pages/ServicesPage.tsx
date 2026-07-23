import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Users, TrendingUp, ArrowRight, ArrowDown, Clock, UserCheck, Lightbulb } from 'lucide-react';
import CTASection from '../components/common/CTASection';
import Accordion from '../components/common/Accordion';
import StatsSection from '../components/home/StatsSection';
import { COMPANY_INFO } from '../data/company';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ServiceImageFrame from '../components/common/ServiceImageFrame';
import { siteImages } from '../config/images';

// Static suitable-for data per service
const SUITABLE_FOR: Record<string, { th: string[]; en: string[] }> = {
  foreignLabor: {
    th: ['โรงงานอุตสาหกรรม', 'ธุรกิจที่ใช้แรงงานต่างด้าว', 'บริษัทที่ต้องการต่ออายุใบอนุญาต', 'ธุรกิจที่มีการสรรหาแรงงานบ่อย'],
    en: ['Industrial factories', 'Businesses employing migrant workers', 'Companies needing permit renewals', 'Businesses with frequent hiring needs'],
  },
  membership: {
    th: ['SME ที่ต้องการผู้ช่วยดูแลงาน', 'ธุรกิจที่ต้องการคำปรึกษาต่อเนื่อง', 'เจ้าของธุรกิจที่ต้องการประหยัดเวลา', 'บริษัทที่ต้องการติดตามงานเป็นระบบ'],
    en: ['SMEs needing a work support partner', 'Businesses seeking continuous consulting', 'Business owners wanting to save time', 'Companies needing systematic tracking'],
  },
  consulting: {
    th: ['ผู้บริหารที่ต้องการข้อมูลเชิงลึก', 'ธุรกิจที่ต้องการวางแผนการเติบโต', 'บริษัทที่ต้องการปรับปรุงระบบงาน', 'สตาร์ทอัพที่ต้องการโครงสร้างที่แข็งแกร่ง'],
    en: ['Executives seeking deeper insights', 'Businesses planning for growth', 'Companies wanting to improve workflows', 'Startups needing a strong operational structure'],
  },
};

const TIMELINES: Record<string, { th: string; en: string }> = {
  foreignLabor: { th: 'ดำเนินการภายใน 7–21 วันทำการ', en: '7–21 business days' },
  membership: { th: 'เริ่มดูแลภายใน 1–3 วันทำการหลังสมัคร', en: 'Care starts within 1–3 business days of signup' },
  consulting: { th: 'นัดหมายเบื้องต้นภายใน 2 วันทำการ', en: 'Initial consultation within 2 business days' },
};

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'en' ? 'en' : 'th';

  useEffect(() => {
    document.title = `${t('nav.services')} | ${COMPANY_INFO.nameEn}`;
  }, [t]);

  const serviceKeys = ['foreignLabor', 'membership', 'consulting'];
  const serviceItems = serviceKeys.map(key => ({
    id: key,
    title: t(`services.items.${key}.title`),
    desc: t(`services.items.${key}.desc`),
    results: t(`services.items.${key}.results`, { returnObjects: true }) as string[],
  }));
  
  const serviceIcons = [FileText, Users, TrendingUp];
  const serviceImages = [
    siteImages.services.documents,
    siteImages.services.membership,
    siteImages.services.consulting
  ];

  return (
    <div className="pt-[68px] lg:pt-[74px]">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#0B0F0D] py-20 lg:py-24 overflow-hidden" aria-label={t('nav.services')}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#064E2B] opacity-20 rounded-full blur-[150px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#0E8F4D] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#E7EBE8 1px, transparent 1px), linear-gradient(90deg, #E7EBE8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#19B965] uppercase tracking-[0.2em] bg-[#19B965]/10 px-4 py-1.5 rounded-full">
                {t('nav.services')}
              </span>
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
            </div>
            
            <h1 className="text-[30px] md:text-[40px] lg:text-[48px] font-bold text-white leading-[1.2] mb-8 drop-shadow-sm">
              {t('servicesIntro.title')}
            </h1>
            
            <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              {t('servicesIntro.subtitle')}
            </p>

            <motion.a 
              href="#services-list"
              className="inline-flex w-14 h-14 rounded-full border border-white/20 items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-colors shadow-[0_0_20px_rgba(25,185,101,0.15)]"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              aria-label="Scroll down"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-navigation */}
      <div className="sticky top-[68px] lg:top-[74px] z-40 bg-white/90 backdrop-blur-md border-b border-[#E7EBE8] shadow-sm hidden md:block">
        <div className="container-custom">
          <ul className="flex items-center justify-center gap-8 py-4">
            {serviceItems.map(service => (
              <li key={`nav-${service.id}`}>
                <a 
                  href={`#${service.id}`} 
                  className="text-sm font-bold text-[#57615B] hover:text-[#0B0F0D] transition-colors tracking-wide uppercase hover:text-[#064E2B]"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Intro banner */}
      <section className="bg-[#FAFCFB] py-14 border-b border-[#E7EBE8]">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-[#3F4742] text-lg leading-relaxed font-medium">
            {t('servicesIntro.desc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { Icon: UserCheck, text: lang === 'en' ? 'Expert-managed at every step' : 'ดูแลโดยผู้เชี่ยวชาญทุกขั้นตอน' },
              { Icon: Clock, text: lang === 'en' ? 'Fast, systematic tracking' : 'ติดตามงานรวดเร็วเป็นระบบ' },
              { Icon: Lightbulb, text: lang === 'en' ? 'Practical consulting, not generic advice' : 'คำปรึกษาปฏิบัติได้จริง' },
            ].map(({ Icon, text }, i) => (
              <motion.div
                key={i}
                className="group flex items-center gap-3 justify-center py-2 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[#E7EBE8]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon className="w-5 h-5 text-[#0E8F4D] flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" aria-hidden="true" />
                <span className="text-sm font-semibold text-[#0B0F0D]">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating service sections */}
      <div id="services-list" className="bg-white scroll-mt-[130px]">
        {serviceItems.map((service, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          const image = serviceImages[i % serviceImages.length];
          const suitableFor = SUITABLE_FOR[service.id]?.[lang] || [];
          const timeline = TIMELINES[service.id]?.[lang] || '';

          /* Editorial variants — each service gets its own composition:
             01 = text-left + vertical accent + giant outline number
             02 = poster-left + soft gradient tint + dotted path
             03 = asymmetric (text 7/12) + decorative word + key statement */
          const sectionBg = [
            'bg-white',
            'bg-gradient-to-br from-[#F5FAF7] via-white to-[#F2F8FB]',
            'bg-white',
          ][i % 3];

          return (
            <section
              key={service.id}
              id={service.id}
              className={`relative py-20 lg:py-28 scroll-mt-[130px] overflow-hidden ${sectionBg}`}
            >
              {i === 0 && (
                <>
                  <span className="absolute top-12 right-[3%] font-num text-[160px] xl:text-[200px] font-bold text-transparent leading-none select-none pointer-events-none hidden lg:block" style={{ WebkitTextStroke: '1.5px rgba(25,185,101,0.16)' }} aria-hidden="true">01</span>
                  <div className="absolute w-[420px] h-[420px] rounded-full opacity-[0.06] blur-[110px] pointer-events-none top-[-15%] right-[-8%] bg-[#19B965]" aria-hidden="true" />
                </>
              )}
              {i === 1 && (
                <>
                  <span className="absolute bottom-10 left-[3%] font-num text-[160px] xl:text-[200px] font-bold text-transparent leading-none select-none pointer-events-none hidden lg:block" style={{ WebkitTextStroke: '1.5px rgba(126,200,227,0.28)' }} aria-hidden="true">02</span>
                  <svg className="absolute inset-x-0 top-8 w-full h-24 pointer-events-none" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
                    <path d="M0 70 C 360 10, 720 110, 1080 45 S 1380 30, 1440 55" stroke="#0E8F4D" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="2 8" />
                  </svg>
                </>
              )}
              {i === 2 && (
                <>
                  <span className="absolute top-1/2 -translate-y-1/2 right-[-2%] font-bold text-[110px] xl:text-[150px] text-[#0B0F0D] opacity-[0.025] leading-none select-none pointer-events-none hidden xl:block tracking-tight" aria-hidden="true">CONSULT</span>
                  <div className="absolute w-[420px] h-[420px] rounded-full opacity-[0.05] blur-[110px] pointer-events-none bottom-[-20%] right-[10%] bg-[#19B965]" aria-hidden="true" />
                </>
              )}
              <div className="container-custom relative z-10">
                <div className={`flex flex-col lg:grid gap-16 items-center group/block ${i === 2 ? 'lg:grid-cols-12' : 'lg:grid-cols-2'}`}>

                  {/* Content Side */}
                  <motion.div
                    className={`relative w-full order-1 ${i === 1 ? 'lg:order-2' : 'lg:order-1'} ${i === 2 ? 'lg:col-span-7' : ''}`}
                    initial={{ opacity: 0, x: i === 1 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {i === 0 && (
                      <span className="hidden lg:block absolute -left-7 top-2 bottom-6 w-[2px] bg-gradient-to-b from-[#19B965] via-[#19B965]/30 to-transparent" aria-hidden="true" />
                    )}
                    <div className="flex items-center gap-5 mb-6">
                      <span
                        className="font-num text-5xl font-bold text-transparent select-none leading-none transition-all duration-500 group-hover/block:scale-105 origin-left"
                        style={{ WebkitTextStroke: '1.5px #9EE6BC' }}
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <h2 className="relative inline-block text-[22px] md:text-[26px] font-bold text-[#0B0F0D] leading-tight transition-colors duration-300 group-hover/block:text-[#064E2B]">
                          {service.title}
                          <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-[#19B965] transition-all duration-500 group-hover/block:w-full" aria-hidden="true" />
                        </h2>
                      </div>
                    </div>
                    
                    <p className="text-[#3F4742] text-base md:text-lg leading-relaxed mb-8">
                      {service.desc}
                    </p>

                    {/* Suitable for — open list with accent border, no box */}
                    {suitableFor.length > 0 && (
                      <div className="mb-8 pl-5 border-l-2 border-[#9EE6BC]">
                        <h3 className="text-xs font-bold text-[#0E8F4D] uppercase tracking-wider mb-3 flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
                          {lang === 'en' ? 'Best suited for' : 'เหมาะสำหรับ'}
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          {suitableFor.map((item, si) => (
                            <li key={si} className="flex items-center gap-2.5 text-sm text-[#3F4742] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0E8F4D] flex-shrink-0" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Results — frameless list under a thin divider */}
                    <div className="mb-9">
                      <h3 className="text-xs font-bold text-[#0B0F0D] uppercase tracking-wider mb-4 flex items-center gap-3">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8F4D]" aria-hidden="true" />
                        {lang === 'en' ? 'Expected Results' : 'ผลลัพธ์ที่คาดหวัง'}
                        <span className="flex-1 h-[1px] bg-gradient-to-r from-[#E7EBE8] to-transparent" aria-hidden="true" />
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {service.results && service.results.map((result: string, ri: number) => (
                          <li key={ri} className="flex items-start gap-2.5 group/res">
                            <CheckCircle2 className="w-4 h-4 text-[#0E8F4D] flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover/res:scale-110" aria-hidden="true" />
                            <span className="text-[#3F4742] text-sm font-medium leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {i === 2 && (
                      <blockquote className="mb-8 pl-5 border-l-2 border-[#19B965] text-[#064E2B] font-semibold text-base md:text-[17px] leading-relaxed max-w-lg">
                        {lang === 'en'
                          ? '“Good decisions start with structured, verifiable data.”'
                          : '“การตัดสินใจที่ดี เริ่มจากข้อมูลที่เป็นระบบและตรวจสอบได้”'}
                      </blockquote>
                    )}
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-[#064E2B] text-white font-bold text-sm rounded-xl hover:bg-[#0B0F0D] transition-all duration-300 shadow-[0_4px_15px_rgba(6,78,43,0.2)] hover:-translate-y-0.5 group/link"
                    >
                      {t('common.contactUs')}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </motion.div>

                  {/* Image Side — floating poster, no card */}
                  <div className={`w-full relative z-10 order-2 ${i === 1 ? 'lg:order-1' : 'lg:order-2'} ${i === 2 ? 'lg:col-span-5 lg:translate-y-8' : ''}`}>
                    <ServiceImageFrame
                      src={image}
                      alt={service.title}
                      badge={timeline}
                      icon={<Icon />}
                      fit="contain"
                      side={i === 1 ? 'left' : 'right'}
                      className="max-w-[520px] lg:max-w-[620px]"
                    />
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-[#FAFCFB] relative overflow-hidden" aria-labelledby="services-faq-heading">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#19B965]/25 to-transparent" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[13px] font-bold text-[#0E8F4D] uppercase tracking-[0.22em]">FAQ</span>
            <h2 id="services-faq-heading" className="text-[26px] md:text-[32px] font-bold tracking-tight mt-3">
              {t('faq.title')}
            </h2>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <Accordion
              items={(t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map((f, i) => ({
                id: i,
                question: f.q,
                answer: f.a,
              }))}
            />
          </div>
        </div>
      </section>

      <StatsSection />
      <CTASection />
    </div>
  );
}
