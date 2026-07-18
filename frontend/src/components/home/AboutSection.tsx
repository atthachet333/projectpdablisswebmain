import { Users, Shield, Heart, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionDivider from '../common/SectionDivider';

export default function AboutSection() {
  const { t } = useTranslation();

  const highlights = [
    { icon: Users, title: t('about.highlights.0.title', 'ทีมงานมืออาชีพ'), description: t('about.highlights.0.desc', 'ผู้เชี่ยวชาญพร้อมดูแลทุกด้านของธุรกิจคุณ') },
    { icon: Shield, title: t('about.highlights.1.title', 'บริการน่าเชื่อถือ'), description: t('about.highlights.1.desc', 'มาตรฐานสูง โปร่งใส และตรงไปตรงมาในทุกขั้นตอน') },
    { icon: Heart, title: t('about.highlights.2.title', 'เข้าใจลูกค้า'), description: t('about.highlights.2.desc', 'ใส่ใจความต้องการและให้คำแนะนำที่ตรงประเด็น') },
    { icon: Target, title: t('about.highlights.3.title', 'มุ่งสู่ผลลัพธ์'), description: t('about.highlights.3.desc', 'วัดผลได้จริง ส่งมอบงานตามเป้าหมายที่กำหนด') },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="about-heading">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Image (Editorial overlapping style) */}
          <motion.div
            className="w-full lg:w-1/2 relative group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 w-[90%] md:w-[80%] rounded-[24px] overflow-hidden shadow-card transition-all duration-500 group-hover:shadow-card-hover">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop"
                alt="สำนักงาน PDA BLISS"
                className="w-full aspect-[4/5] object-cover transition-transform duration-[10s] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply pointer-events-none" />
            </div>
            
            {/* Overlapping smaller image */}
            <motion.div 
              className="absolute bottom-10 right-0 w-[55%] md:w-[45%] rounded-[24px] overflow-hidden shadow-floating border-4 border-white z-20 group-hover:-translate-y-2 transition-transform duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80&auto=format&fit=crop"
                alt="ทีมงานมืออาชีพ PDA BLISS"
                className="w-full aspect-square object-cover transition-transform duration-[10s] group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#EAF8EF] rounded-full z-0 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
            <div className="absolute -bottom-10 left-10 w-40 h-40 bg-[#19B965]/10 rounded-full blur-[40px] z-0 group-hover:bg-[#19B965]/20 transition-colors duration-500" aria-hidden="true" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionDivider 
              title={
                <span>
                  {t('about.title1', 'พันธมิตรที่คุณไว้วางใจได้')}
                  <br />
                  <span className="text-[#0E8F4D]">{t('about.title2', 'สำหรับการเติบโตของธุรกิจ')}</span>
                </span> as any
              }
              variant="A"
              eyebrow={t('about.badge', 'เกี่ยวกับ PDA BLISS')}
              center={false}
            />

            <p className="text-[#3F4742] text-base md:text-lg leading-relaxed mb-10 pl-6">
              {t('about.description', 'PDA BLISS COMPANY LIMITED มุ่งมั่นในการมอบบริการที่มีคุณภาพครบวงจร ด้วยทีมงานมืออาชีพที่มีประสบการณ์ บริการสมาชิก และที่ปรึกษาธุรกิจ เพื่อสนับสนุนให้ธุรกิจของคุณดำเนินงานได้อย่างราบรื่น ลดความเสี่ยง และเติบโตได้อย่างมั่นคงในทุกมิติทางธุรกิจ')}
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 pl-6">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 group/highlight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FAFCFB] border border-[#E7EBE8] flex items-center justify-center flex-shrink-0 mt-1 group-hover/highlight:border-[#19B965] group-hover/highlight:bg-[#EAF8EF] transition-colors duration-300 shadow-sm" aria-hidden="true">
                      <Icon className="w-5 h-5 text-[#0E8F4D] group-hover/highlight:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B0F0D] text-sm mb-1 group-hover/highlight:text-[#0E8F4D] transition-colors">{item.title}</h4>
                      <p className="text-[#747D77] text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
