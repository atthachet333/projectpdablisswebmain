import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Users, FileCheck, Clock } from 'lucide-react';

export default function TrustBarSection() {
  const { t } = useTranslation();

  const metrics = [
    {
      icon: Clock,
      value: '10+',
      label: t('trustBar.experience', 'ปีแห่งประสบการณ์'),
    },
    {
      icon: Users,
      value: '1,000+',
      label: t('trustBar.clients', 'ลูกค้าที่ดูแล'),
    },
    {
      icon: FileCheck,
      value: '10,000+',
      label: t('trustBar.documents', 'เอกสารต่อปี'),
    },
    {
      icon: Shield,
      value: '100%',
      label: t('trustBar.security', 'ดูแลข้อมูลปลอดภัย'),
    },
  ];

  return (
    <section className="bg-[#0B0F0D] border-y border-[#3F4742] py-8 lg:py-12" aria-label="ความน่าเชื่อถือ">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x divide-[#3F4742]">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center text-center px-4 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-12 h-12 rounded-full bg-[#151A17] flex items-center justify-center mb-3 border border-[#3F4742] group-hover:border-[#19B965] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#19B965] opacity-90 stroke-[1.5]" aria-hidden="true" />
                </div>
                <span className="text-2xl md:text-3xl font-num font-extrabold text-white tracking-tight mb-1 group-hover:text-[#9EE6BC] transition-colors">{metric.value}</span>
                <span className="text-xs md:text-sm font-bold text-[#747D77]">{metric.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
