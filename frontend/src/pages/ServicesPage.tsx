import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Users, TrendingUp, ArrowRight, ArrowDown } from 'lucide-react';
import CTASection from '../components/common/CTASection';
import StatsSection from '../components/home/StatsSection';
import { COMPANY_INFO } from '../data/company';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('nav.services')} | ${COMPANY_INFO.nameEn}`;
  }, [t]);

  // Map the new translation keys for services
  const serviceKeys = ['foreignLabor', 'membership', 'consulting'];
  const serviceItems = serviceKeys.map(key => ({
    id: key,
    title: t(`services.items.${key}.title`),
    desc: t(`services.items.${key}.desc`),
    results: t(`services.items.${key}.results`, { returnObjects: true }) as string[],
  }));
  
  const serviceIcons = [FileText, Users, TrendingUp];
  const serviceImages = [
    'https://images.unsplash.com/photo-1554774853-719586f82d77?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop'
  ];

  return (
    <div className="pt-[72px] lg:pt-[78px]">
      
      {/* 1. Hero Section - Deep Forest Minimal */}
      <section className="relative bg-[#0B0F0D] py-24 lg:py-32 overflow-hidden" aria-label={t('nav.services')}>
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
              <span className="text-xs font-bold text-[#19B965] uppercase tracking-[0.2em]">
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
              className="inline-flex w-14 h-14 rounded-full border border-white/20 items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-colors shadow-glow-green"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              aria-label="Scroll down"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-navigation */}
      <div className="sticky top-[72px] lg:top-[78px] z-40 bg-white/90 backdrop-blur-md border-b border-[#E7EBE8] shadow-sm hidden md:block">
        <div className="container-custom">
          <ul className="flex items-center justify-center gap-8 py-4">
            {serviceItems.map(service => (
              <li key={`nav-${service.id}`}>
                <a 
                  href={`#${service.id}`} 
                  className="text-sm font-bold text-[#747D77] hover:text-[#0B0F0D] transition-colors tracking-wide uppercase"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="bg-[#FAFCFB] py-16 border-b border-[#E7EBE8]">
        <div className="container-custom max-w-3xl text-center">
           <p className="text-[#3F4742] text-lg leading-relaxed font-medium">
             {t('servicesIntro.desc')}
           </p>
        </div>
      </section>

      {/* 2. Full-width alternating sections */}
      <div id="services-list" className="bg-white scroll-mt-[130px]">
        {serviceItems.map((service, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          const image = serviceImages[i % serviceImages.length];
          const isEven = i % 2 === 0;
          
          return (
            <section 
              key={service.id} 
              id={service.id} 
              className={`py-24 lg:py-32 scroll-mt-[130px] border-b border-[#E7EBE8] ${isEven ? 'bg-white' : 'bg-[#F3F6F4]'}`}
            >
              <div className="container-custom">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Image Side */}
                  <motion.div 
                    className="w-full lg:w-1/2 relative group"
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="aspect-[4/3] rounded-[24px] overflow-hidden shadow-card relative border border-[#E7EBE8] group-hover:shadow-floating transition-shadow duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none mix-blend-multiply" />
                      <img
                        src={image}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[10s]"
                        loading="lazy"
                      />
                    </div>
                    {/* Floating Badge */}
                    <div className={`absolute ${isEven ? '-bottom-6 -right-6' : '-bottom-6 -left-6'} w-24 h-24 bg-[#0B0F0D] rounded-2xl flex items-center justify-center z-20 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500`}>
                      <Icon className="w-10 h-10 text-[#19B965] icon-animate" />
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-num font-extrabold text-[#E7EBE8] select-none">
                        0{i + 1}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B0F0D] leading-tight group-hover:text-[#0E8F4D] transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-[#3F4742] text-lg leading-relaxed mb-10">
                      {service.desc}
                    </p>
                    
                    <div className={`${isEven ? 'bg-[#FAFCFB]' : 'bg-white'} p-8 rounded-[20px] border border-[#E7EBE8] shadow-sm mb-8 hover:border-[#9EE6BC] transition-colors mouse-spotlight`}>
                      <h3 className="text-sm font-bold text-[#0B0F0D] uppercase tracking-wider mb-6 pb-4 border-b border-[#E7EBE8]">
                        Expected Results
                      </h3>
                      <ul className="space-y-4 relative z-10">
                        {service.results && service.results.map((result: string, ri: number) => (
                          <li key={ri} className="flex items-start gap-4">
                            <CheckCircle2 className="w-5 h-5 text-[#0E8F4D] flex-shrink-0 mt-0.5" />
                            <span className="text-[#3F4742] font-medium leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 font-bold text-sm tracking-wide group/link uppercase text-[#0B0F0D]"
                    >
                      {t('common.details', 'Request Service')}
                      <span className="w-8 h-[1px] bg-[#0B0F0D] transition-all duration-300 group-hover/link:w-12" />
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </motion.div>

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
