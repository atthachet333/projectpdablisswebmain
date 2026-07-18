import { Users, FileText, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';
import { useTranslation } from 'react-i18next';

export default function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: 1000,
      prefix: '',
      suffix: '+',
      label: t('stats.clients', 'ลูกค้าที่ดูแล'),
      sublabel: t('stats.clientsSub', 'ราย'),
    },
    {
      icon: FileText,
      value: 10000,
      prefix: '',
      suffix: '+',
      label: t('stats.docs', 'เอกสารที่ดำเนินการ'),
      sublabel: t('stats.docsSub', 'รายการ'),
    },
    {
      icon: Star,
      value: 98,
      prefix: '',
      suffix: '%',
      label: t('stats.satisfaction', 'ความพึงพอใจ'),
      sublabel: t('stats.satisfactionSub', 'จากลูกค้าของเรา'),
    },
    {
      icon: Clock,
      value: 24,
      prefix: '',
      suffix: '/7',
      label: t('stats.support', 'ทีมงานพร้อมดูแล'),
      sublabel: t('stats.supportSub', 'ตอบไว ดูแลทุกกรณี'),
      formatNumber: false,
    },
  ];

  return (
    <section
      className="py-24 md:py-32 bg-[#0B0F0D] relative overflow-hidden"
      aria-label="ตัวเลขความสำเร็จ"
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#064E2B] opacity-50 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#0E8F4D] opacity-20 blur-[100px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#E7EBE8 1px, transparent 1px), linear-gradient(90deg, #E7EBE8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#3F4742]">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="text-center text-white px-4 pt-8 sm:pt-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative group" aria-hidden="true">
                  <Icon className="w-8 h-8 text-[#19B965] transition-transform duration-300 group-hover:scale-110" />
                  {/* Small Pulse Dot in Corner */}
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#19B965] animate-pulse-subtle shadow-glow-green" />
                </div>
                <div className="flex items-start justify-center gap-1 mb-3">
                  <p className="text-5xl md:text-6xl font-num font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(25,185,101,0.2)]">
                    {stat.prefix}
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      formatNumber={stat.formatNumber !== false}
                    />
                  </p>
                </div>
                <p className="font-bold text-white text-base md:text-lg tracking-wide">{stat.label}</p>
                <p className="text-[#747D77] text-sm mt-1">{stat.sublabel}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
