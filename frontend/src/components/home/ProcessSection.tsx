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
    <section className="py-20 lg:py-28 bg-[#FAFCFB] relative overflow-hidden" aria-labelledby="process-heading">
      {/* Subtle decorations */}
      <div
        className="absolute right-[6%] top-12 w-32 h-32 opacity-[0.3] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#9EE6BC 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}
        aria-hidden="true"
      />
      <div className="absolute left-[-10%] bottom-[-30%] w-[420px] h-[420px] rounded-full bg-[#19B965] opacity-[0.04] blur-[110px] pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-[13px] font-bold text-[#0E8F4D] uppercase tracking-[0.22em]">
            {t('process.eyebrow', 'HOW WE WORK')}
          </span>
          <h2 id="process-heading" className="text-[26px] md:text-[32px] lg:text-[36px] font-bold text-[#0B0F0D] mt-3 mb-4">
            {t('process.title', 'ขั้นตอนการทำงานของเรา')}
          </h2>
          <p className="text-[#5B655F] text-base md:text-[17px] leading-relaxed">
            {t('process.subtitle', 'กระบวนการทำงานที่เป็นระบบ โปร่งใส และมุ่งเน้นผลลัพธ์ที่ดีที่สุดสำหรับคุณ')}
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) — animates in on scroll */}
          <div className="hidden md:block absolute top-[26px] left-[10%] right-[10%] h-[2px] bg-[#EDF1EE] z-0" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-[#19B965] via-[#0E8F4D] to-[#9EE6BC] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

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
                  transition={{ duration: 0.6, delay: 0.25 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Icon Circle */}
                  <div className="w-[52px] h-[52px] rounded-full bg-white border-2 border-[#19B965]/30 flex items-center justify-center mb-7 transition-all duration-500 group-hover:border-[#19B965] group-hover:bg-[#EAF8EF] group-hover:shadow-[0_0_0_8px_rgba(25,185,101,0.08)]">
                    <Icon className="w-[22px] h-[22px] text-[#0E8F4D] stroke-[1.5] transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                  </div>

                  {/* Stylish outline number */}
                  <span
                    className="font-num text-[2.4rem] font-bold text-transparent leading-none mb-3 transition-all duration-500 group-hover:-translate-y-1 select-none"
                    style={{ WebkitTextStroke: '1.4px #C9D6CE' }}
                    aria-hidden="true"
                  >
                    {step.id}
                  </span>

                  {/* Content */}
                  <h3 className="text-base md:text-[17px] font-bold text-[#141A16] mb-2 transition-colors duration-300 group-hover:text-[#064E2B]">
                    {step.title}
                  </h3>
                  <p className="text-[#57615B] text-sm leading-[1.7] max-w-[230px] transition-colors duration-300 group-hover:text-[#3F4742]">
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
