import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionDivider from '../common/SectionDivider';
import ServiceImageFrame from '../common/ServiceImageFrame';
import { siteImages } from '../../config/images';

/*
 * Editorial rows — no colored card panels.
 * ✏️ รูปโปสเตอร์เปลี่ยนได้ที่ src/config/images.ts → siteImages.home.service*
 *    (แนะนำ PNG/WebP พื้นหลังโปร่งใส เพื่อให้ภาพไร้กรอบจริง)
 */
const services = [
  { id: 'foreign-labor', key: 'foreignLabor', href: '/services#foreignLabor', icon: FileText, accent: '#0E8F4D', img: siteImages.home.serviceDocuments },
  { id: 'membership', key: 'membership', href: '/services#membership', icon: Users, accent: '#19B965', img: siteImages.home.serviceMembership },
  { id: 'consulting', key: 'consulting', href: '/services#consulting', icon: TrendingUp, accent: '#064E2B', img: siteImages.home.serviceConsulting },
];

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" aria-labelledby="services-heading">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#19B965]/25 to-transparent" aria-hidden="true" />
      <div className="absolute left-[-10%] top-[20%] w-[460px] h-[460px] rounded-full bg-[#19B965] opacity-[0.04] blur-[110px] pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <SectionDivider
          title={t('servicesIntro.title', 'บริการหลักของเรา')}
          subtitle={t('servicesIntro.subtitle', 'โซลูชันที่ออกแบบมาเพื่อลดความซับซ้อน และสนับสนุนการเติบโตของธุรกิจคุณ')}
          variant="D"
          eyebrow="OUR SERVICES"
        />

        {/* Open editorial rows separated by thin dividers */}
        <div className="mt-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const features = t(`services.items.${service.key}.results`, { returnObjects: true }) as string[];
            const imageLeft = index % 2 !== 0;

            return (
              <motion.div
                key={service.id}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-14 lg:py-16 [&:not(:last-child)]:border-b border-[#EDF1EE]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Content */}
                <div className={`lg:col-span-6 order-1 ${imageLeft ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4'}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="font-num text-4xl lg:text-5xl font-bold text-transparent leading-none select-none transition-transform duration-500 group-hover:scale-105 origin-left"
                      style={{ WebkitTextStroke: `1.4px ${service.accent}55` }}
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    <Icon className="w-6 h-6 stroke-[1.5]" style={{ color: service.accent }} aria-hidden="true" />
                    <span className="flex-1 h-[1px] bg-[#EDF1EE]" aria-hidden="true" />
                  </div>

                  <h3 className="relative inline-block text-xl md:text-[24px] font-bold text-[#0B0F0D] mb-4 transition-colors duration-300 group-hover:text-[#064E2B]">
                    {t(`services.items.${service.key}.title`)}
                    <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-[#19B965] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                  </h3>

                  <p className="text-[#5B655F] text-base leading-[1.85] mb-6 max-w-xl">
                    {t(`services.items.${service.key}.desc`)}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                    {features && features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#3F4742]">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#0E8F4D]" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-3 font-bold text-sm tracking-widest uppercase transition-colors group/link text-[#0B0F0D] hover:text-[#064E2B]"
                  >
                    {t('servicesIntro.explore', 'ดูรายละเอียดบริการ')}
                    <span className="w-8 h-[1px] transition-all duration-400 group-hover/link:w-12 bg-current" aria-hidden="true" />
                    <ArrowRight className="w-4 h-4 transition-transform duration-400 group-hover/link:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>

                {/* Floating poster */}
                <div className={`lg:col-span-6 order-2 w-full ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ServiceImageFrame
                    src={service.img}
                    alt={t(`services.items.${service.key}.title`)}
                    accent={service.accent}
                    side={imageLeft ? 'left' : 'right'}
                    className="max-w-[440px] lg:max-w-[500px] mx-auto"
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
