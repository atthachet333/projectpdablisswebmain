import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Search, FileSignature, CheckCircle } from 'lucide-react';

export default function ProcessSection() {
  const { t } = useTranslation();

  const steps = [
    {
      id: '01',
      title: t('process.step1.title', 'รับฟังและวิเคราะห์'),
      desc: t('process.step1.desc', 'ประเมินความต้องการและปัญหาของธุรกิจ เพื่อวางแผนให้ตรงจุด'),
      icon: Search,
    },
    {
      id: '02',
      title: t('process.step2.title', 'เสนอโซลูชัน'),
      desc: t('process.step2.desc', 'นำเสนอแนวทางที่เหมาะสม พร้อมรายละเอียดและกรอบเวลาที่ชัดเจน'),
      icon: ClipboardList,
    },
    {
      id: '03',
      title: t('process.step3.title', 'ดำเนินการและติดตาม'),
      desc: t('process.step3.desc', 'ทีมผู้เชี่ยวชาญลงมือทำงาน พร้อมอัปเดตสถานะให้ทราบอย่างต่อเนื่อง'),
      icon: FileSignature,
    },
    {
      id: '04',
      title: t('process.step4.title', 'ส่งมอบและดูแลต่อ'),
      desc: t('process.step4.desc', 'ส่งมอบงานที่สมบูรณ์ พร้อมให้คำปรึกษาและดูแลในระยะยาว'),
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-24 bg-warm-white relative overflow-hidden" aria-labelledby="process-heading">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 id="process-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-navy mb-6">
            {t('process.title', 'ขั้นตอนการทำงานของเรา')}
          </h2>
          <p className="text-slate-gray text-base md:text-lg">
            {t('process.subtitle', 'กระบวนการทำงานที่เป็นระบบ โปร่งใส และมุ่งเน้นผลลัพธ์ที่ดีที่สุดสำหรับคุณ')}
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-light-border/60 z-0" aria-hidden="true" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="relative z-10 flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Number Badge */}
                  <div className="absolute -top-6 -right-2 text-[60px] font-num font-extrabold text-warm-gold opacity-10 group-hover:opacity-20 transition-opacity duration-300 select-none">
                    {step.id}
                  </div>

                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-white border border-light-border shadow-sm flex items-center justify-center mb-6 group-hover:border-warm-gold group-hover:shadow-card transition-all duration-300 relative">
                    <Icon className="w-8 h-8 text-dark-navy group-hover:text-premium-green transition-colors duration-300" />
                    {/* Active Pulse on Hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-warm-gold opacity-0 group-hover:animate-pulse-gold pointer-events-none" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-dark-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-gray text-sm leading-relaxed max-w-[240px]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
