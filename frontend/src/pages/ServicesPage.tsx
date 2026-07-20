import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Users, TrendingUp, ArrowRight, ArrowDown, Clock, UserCheck, Lightbulb } from 'lucide-react';
import CTASection from '../components/common/CTASection';
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
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8 drop-shadow-sm">
              {t('servicesIntro.title')}
            </h1>
            
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
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
                  className="text-sm font-bold text-[#747D77] hover:text-[#0B0F0D] transition-colors tracking-wide uppercase hover:text-[#064E2B]"
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
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#E7EBE8] justify-center">
                <Icon className="w-5 h-5 text-[#0E8F4D] flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold text-[#0B0F0D]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating service sections */}
      <div id="services-list" className="bg-white scroll-mt-[130px]">
        {serviceItems.map((service, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          const image = serviceImages[i % serviceImages.length];
          const isEven = i % 2 === 0;
          const suitableFor = SUITABLE_FOR[service.id]?.[lang] || [];
          const timeline = TIMELINES[service.id]?.[lang] || '';
          
          return (
            <section 
              key={service.id} 
              id={service.id} 
              className={`py-20 lg:py-24 scroll-mt-[130px] border-b border-[#E7EBE8] ${isEven ? 'bg-white' : 'bg-[#F3F6F4]'}`}
            >
              <div className="container-custom">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Content Side */}
                  <motion.div 
                    className={`w-full order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-extrabold text-[#E7EBE8] select-none">0{i + 1}</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B0F0D] leading-tight">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-[#3F4742] text-base md:text-lg leading-relaxed mb-8">
                      {service.desc}
                    </p>

                    {/* Suitable for */}
                    {suitableFor.length > 0 && (
                      <div className="mb-6 bg-[#EAF8EF] rounded-xl p-5 border border-[#9EE6BC]/40">
                        <h3 className="text-xs font-bold text-[#0E8F4D] uppercase tracking-wider mb-3 flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
                          {lang === 'en' ? 'Best suited for' : 'เหมาะสำหรับ'}
                        </h3>
                        <ul className="grid grid-cols-2 gap-2">
                          {suitableFor.map((item, si) => (
                            <li key={si} className="flex items-center gap-2 text-sm text-[#064E2B] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0E8F4D] flex-shrink-0" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Results */}
                    <div className={`${isEven ? 'bg-[#FAFCFB]' : 'bg-white'} p-6 rounded-[20px] border border-[#E7EBE8] shadow-sm mb-8 hover:border-[#9EE6BC] transition-colors`}>
                      <h3 className="text-xs font-bold text-[#0B0F0D] uppercase tracking-wider mb-4 pb-3 border-b border-[#E7EBE8] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8F4D]" aria-hidden="true" />
                        {lang === 'en' ? 'Expected Results' : 'ผลลัพธ์ที่คาดหวัง'}
                      </h3>
                      <ul className="space-y-3">
                        {service.results && service.results.map((result: string, ri: number) => (
                          <li key={ri} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#0E8F4D] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-[#3F4742] text-sm font-medium leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-[#064E2B] text-white font-bold text-sm rounded-xl hover:bg-[#0B0F0D] transition-all duration-300 shadow-[0_4px_15px_rgba(6,78,43,0.2)] hover:-translate-y-0.5 group/link"
                    >
                      {t('common.contactUs')}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </motion.div>

                  {/* Image Side */}
                  <div className={`w-full relative z-10 order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <ServiceImageFrame
                      src={image}
                      alt={service.title}
                      badge={timeline}
                      icon={<Icon />}
                      fit="contain"
                      side={isEven ? 'right' : 'left'}
                      className="max-w-[520px] lg:max-w-[620px]"
                    />
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      <StatsSection />
      <CTASection />
    </div>
  );
}
