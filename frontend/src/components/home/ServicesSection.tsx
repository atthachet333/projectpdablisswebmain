import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionDivider from '../common/SectionDivider';
import ServiceImageFrame from '../common/ServiceImageFrame';
import { siteImages } from '../../config/images';

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
      img: siteImages.home.serviceDocuments,
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
      img: siteImages.home.serviceMembership,
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
      img: siteImages.home.serviceConsulting,
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
                className={`group flex flex-col lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 lg:gap-16 items-center rounded-2xl overflow-hidden p-6 lg:p-12 ${service.cardClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Content Side */}
                <div className={`flex flex-col justify-center relative z-10 order-1 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
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

                  <ul className="space-y-4 mb-10">
                    {features && features.map((feature, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm md:text-base ${service.descClass}`}>
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${service.checkIcon}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <Link
                      to={service.href}
                      className={`inline-flex items-center gap-3 font-bold text-sm tracking-widest uppercase transition-colors group/link ${service.textClass} hover:${service.accentClass}`}
                    >
                      {t('servicesIntro.explore', 'ดูรายละเอียดบริการ')}
                      <span className={`w-8 h-[1px] transition-all duration-400 group-hover/link:w-12 bg-current`} />
                      <ArrowRight className="w-4 h-4 transition-transform duration-400 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className={`relative order-2 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} w-full`}>
                  <ServiceImageFrame 
                    src={service.img}
                    alt={t(`services.items.${service.key}.title`)}
                    accent={index === 0 ? '#19B965' : index === 1 ? '#0B0F0D' : '#19B965'}
                    side={index % 2 !== 0 ? 'left' : 'right'}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
