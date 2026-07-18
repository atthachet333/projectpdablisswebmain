import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionDivider from '../common/SectionDivider';

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      id: 'foreign-labor',
      key: 'foreignLabor',
      href: '/services#foreignLabor',
      icon: FileText,
      cardClass: 'card-white mouse-spotlight',
      textClass: 'text-[#0B0F0D]',
      descClass: 'text-[#3F4742]',
      accentClass: 'text-[#0E8F4D]',
      badgeBg: 'bg-[#EAF8EF] border border-[#9EE6BC]',
      badgeIcon: 'text-[#0E8F4D]',
      checkIcon: 'text-[#0E8F4D]',
      img: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=1000&q=80&auto=format&fit=crop',
    },
    {
      id: 'membership',
      key: 'membership',
      href: '/services#membership',
      icon: Users,
      cardClass: 'bg-[#F3F6F4] border border-[#E7EBE8] hover:border-[#3F4742] mouse-spotlight card-base shadow-card',
      textClass: 'text-[#0B0F0D]',
      descClass: 'text-[#3F4742]',
      accentClass: 'text-[#0B0F0D]',
      badgeBg: 'bg-white border border-[#E7EBE8]',
      badgeIcon: 'text-[#0B0F0D]',
      checkIcon: 'text-[#3F4742]',
      img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=80&auto=format&fit=crop',
    },
    {
      id: 'consulting',
      key: 'consulting',
      href: '/services#consulting',
      icon: TrendingUp,
      cardClass: 'card-green mouse-spotlight',
      textClass: 'text-[#064E2B]',
      descClass: 'text-[#08743C]',
      accentClass: 'text-[#064E2B]',
      badgeBg: 'bg-white border border-[#9EE6BC]',
      badgeIcon: 'text-[#064E2B]',
      checkIcon: 'text-[#08743C]',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=80&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-24 bg-[#F3F6F4] relative overflow-hidden" aria-labelledby="services-heading">
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <SectionDivider 
          title={t('servicesIntro.title', 'บริการหลักของเรา')}
          subtitle={t('servicesIntro.subtitle', 'โซลูชันที่ออกแบบมาเพื่อลดความซับซ้อน และสนับสนุนการเติบโตของธุรกิจคุณ')}
          variant="D"
          eyebrow="OUR SERVICES"
        />

        {/* 3 Large Panels */}
        <div className="space-y-8 mt-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const features = t(`services.items.${service.key}.results`, { returnObjects: true }) as string[];
            
            return (
              <motion.div
                key={service.id}
                className={`group flex flex-col lg:flex-row ${service.cardClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Content Side */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`text-sm font-num font-bold tracking-widest ${service.textClass} opacity-50`}>
                      0{index + 1}
                    </span>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center icon-animate transition-transform duration-300 ${service.badgeBg}`}>
                      <Icon className={`w-6 h-6 ${service.badgeIcon}`} />
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl md:text-3xl font-extrabold mb-4 ${service.textClass}`}>
                    {t(`services.items.${service.key}.title`)}
                  </h3>
                  
                  <p className={`text-base md:text-lg leading-relaxed mb-8 ${service.descClass}`}>
                    {t(`services.items.${service.key}.desc`)}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {features && features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 ${service.checkIcon} icon-animate transition-transform`} />
                        <span className={`text-sm md:text-base font-medium ${service.textClass}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      to={service.href}
                      className={`inline-flex items-center gap-3 font-bold text-sm tracking-wide uppercase group/link ${service.accentClass}`}
                      aria-label={`ดูรายละเอียด ${t(`services.items.${service.key}.title`)}`}
                    >
                      {t('common.details', 'Explore Service')}
                      <span className={`w-8 h-[1px] ${service.accentClass} bg-current transition-all duration-300 group-hover/link:w-12`} />
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 arrow-animate" />
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-5/12 xl:w-1/2 min-h-[300px] lg:min-h-full relative overflow-hidden bg-[#E7EBE8]">
                  {/* Overlay Gradient for color depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 mix-blend-multiply" />
                  <img 
                    src={service.img} 
                    alt={t(`services.items.${service.key}.title`)}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[10s] group-hover:scale-105 image-animate"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-black/5 z-20 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
