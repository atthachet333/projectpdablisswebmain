import { Layers, Users, Eye, LifeBuoy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/*
 * Trust highlights (qualitative — no fabricated client counts).
 * ✏️ ข้อความแก้ที่ locales/{th,en}/common.json → aboutPage.confidence.items
 *    โครงสร้าง { value, label, desc } — ใส่ตัวเลขจริงในอนาคตได้ทันที
 */
const icons = [Layers, Users, Eye, LifeBuoy];

type ConfidenceItem = { value: string; label: string; desc: string };

export default function StatsSection() {
  const { t } = useTranslation();
  const items = (t('aboutPage.confidence.items', { returnObjects: true }) as ConfidenceItem[]).slice(0, 4);

  return (
    <section
      className="py-20 md:py-28 bg-[#0B0F0D] relative overflow-hidden shimmer-sweep"
      aria-label={t('aboutPage.confidence.eyebrow', 'ความมั่นใจทางธุรกิจ')}
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#064E2B] opacity-40 blur-[120px] orb-breathe" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#0E8F4D] opacity-15 blur-[100px] orb-breathe-slow" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#E7EBE8 1px, transparent 1px), linear-gradient(90deg, #E7EBE8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#3F4742]">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                className="text-center text-white px-4 pt-8 sm:pt-0 group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 transition-colors duration-500 group-hover:border-[#19B965]/40" aria-hidden="true">
                  <Icon className="w-7 h-7 text-[#19B965] stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute top-[-4px] right-[calc(50%-34px)] w-2.5 h-2.5 rounded-full bg-[#19B965] animate-pulse-subtle shadow-glow-green" />
                </div>
                <p className="font-num text-[28px] md:text-[32px] font-bold tracking-tight text-white mb-2 leading-none whitespace-nowrap transition-all duration-500 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_16px_rgba(25,185,101,0.4)] stat-number-glow">
                  {item.value}
                </p>
                <p className="font-bold text-white text-base md:text-[17px] tracking-wide leading-snug">{item.label}</p>
                <p className="text-[#A0ACA5] text-sm mt-1.5 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
