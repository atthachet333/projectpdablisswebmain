import { Users, ShieldCheck, Gem, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { siteImages } from '../../config/images';

export default function AboutSection() {
  const { t } = useTranslation();

  const highlights = [
    { icon: Users, title: t('about.highlights.0.title', 'ความเชี่ยวชาญระดับองค์กร'), description: t('about.highlights.0.desc', 'ทีมที่ปรึกษามากประสบการณ์ พร้อมยกระดับมาตรฐานธุรกิจคุณ') },
    { icon: ShieldCheck, title: t('about.highlights.1.title', 'ความน่าเชื่อถือสูงสุด'), description: t('about.highlights.1.desc', 'ทำงานบนหลักความโปร่งใสและถูกต้องตามกฎหมายทุกขั้นตอน') },
    { icon: Gem, title: t('about.highlights.2.title', 'คุณค่าเหนือระดับ'), description: t('about.highlights.2.desc', 'มุ่งเน้นการส่งมอบผลลัพธ์ที่สร้างการเติบโตอย่างยั่งยืน') },
    { icon: Target, title: t('about.highlights.3.title', 'เป้าหมายที่วัดผลได้'), description: t('about.highlights.3.desc', 'ทุกกลยุทธ์ถูกออกแบบมาเพื่อผลตอบแทนที่ชัดเจนและจับต้องได้') },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#FAFCFB] relative overflow-hidden" aria-labelledby="about-heading">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[#19B965]/20 to-transparent" />
      <div className="absolute top-0 left-0 w-[1px] h-[50%] bg-gradient-to-b from-transparent via-[#19B965]/20 to-transparent" />
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center lg:items-stretch">
          
          {/* Left: Full-Bleed Overlapping Images */}
          <div className="w-full lg:w-1/2 relative group">

            <motion.div
              className="relative z-10 w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Decorative shapes BEHIND the poster — extend past its edges */}
              <div
                className="absolute -inset-10 pointer-events-none -z-10 opacity-60"
                style={{ background: 'radial-gradient(ellipse 70% 60% at 40% 55%, rgba(25,185,101,0.22) 0%, transparent 70%)', filter: 'blur(40px)' }}
                aria-hidden="true"
              />
              <div className="absolute -left-8 -top-10 w-32 h-32 rounded-full border border-dashed border-[#19B965]/25 pointer-events-none -z-10" aria-hidden="true" />

              {/*
                ── Main poster: floating, natural ratio, no panel/overlay ──
                ⚠️ ไฟล์ about-main.png มีพื้นหลังติดมาในตัวไฟล์ — เปลี่ยนเป็น PNG โปร่งใสได้ที่ siteImages.home.aboutMain
              */}
              <div
                className="img-drift-a relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-0"
                style={{ transform: 'rotate(-1.5deg)' }}
              >
                <img
                  src={siteImages.home.aboutMain.src}
                  alt="สำนักงาน PDA BLISS"
                  loading="lazy"
                  decoding="async"
                  className="img-radius-lg w-full h-auto object-contain select-none"
                  style={{ filter: 'var(--shadow-image)' }}
                />
              </div>

              {/* ── Overlapping secondary image: rounded card floating over main ── */}
              <motion.div
                className="absolute -bottom-8 -right-8 lg:-bottom-10 lg:-right-10 w-[60%] max-w-[320px] z-20 group/sec"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Ambient glow blob behind secondary */}
                <div
                  className="absolute -inset-6 opacity-30 group-hover/sec:opacity-65 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 55% 65%, rgba(25,185,101,0.60) 0%, transparent 65%)',
                    filter: 'blur(28px)',
                  }}
                  aria-hidden="true"
                />

                {/* Secondary poster — floating, opposite tilt, no panel */}
                <div
                  className="img-drift-b relative transition-all duration-700 group-hover/sec:-translate-y-2 group-hover/sec:rotate-0"
                  style={{ transform: 'rotate(2deg)' }}
                >
                  <img
                    src={siteImages.home.aboutSecondary.src}
                    alt="ทีมงานมืออาชีพ PDA BLISS"
                    loading="lazy"
                    decoding="async"
                    className="img-radius-md w-full h-auto object-contain select-none"
                    style={{ filter: 'drop-shadow(0 18px 40px rgba(11,15,13,0.26)) drop-shadow(0 4px 12px rgba(11,15,13,0.13))' }}
                  />
                </div>

                {/* Experience Badge */}
                <div className="absolute -bottom-5 -left-8 bg-[#0B0F0D] text-white p-4 lg:p-5 rounded-2xl shadow-[0_12px_32px_rgba(11,15,13,0.4)] flex items-center gap-3 z-30">
                  <div className="flex flex-col">
                    <span className="text-2xl lg:text-3xl font-num font-extrabold text-[#19B965] leading-none">10+</span>
                  </div>
                  <p className="text-white text-[10px] lg:text-xs font-semibold tracking-wider uppercase leading-snug">Years of<br/>Excellence</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Refined Content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#064E2B] uppercase tracking-[0.25em] mb-6">
                <span className="w-6 h-[1px] bg-[#064E2B]" />
                {t('about.badge', 'เกี่ยวกับ PDA BLISS')}
              </span>
              <h2 id="about-heading" className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#0B0F0D] leading-[1.15] tracking-tight mb-6">
                พันธมิตรที่คุณไว้วางใจได้<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#064E2B] to-[#19B965]">
                  สำหรับการเติบโตของธุรกิจ
                </span>
              </h2>
              <p className="text-[#3F4742] text-[15px] lg:text-base leading-[1.8] max-w-xl text-justify">
                {t('about.description', 'PDA BLISS COMPANY LIMITED มุ่งมั่นในการมอบบริการที่มีคุณภาพระดับพรีเมียมครบวงจร ด้วยวิสัยทัศน์ที่ก้าวล้ำและทีมผู้เชี่ยวชาญระดับองค์กร เราพร้อมเป็นเบื้องหลังความสำเร็จของคุณ เพื่อให้ธุรกิจดำเนินงานได้อย่างไร้รอยต่อ ลดความเสี่ยง และขยายขีดความสามารถสู่เป้าหมายสูงสุด')}
              </p>
            </div>

            {/* Premium Bento-style Grid for Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="group relative p-4 -m-1 rounded-xl transition-colors duration-400 hover:bg-[#EAF8EF]/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <Icon className="w-5 h-5 text-[#0E8F4D] stroke-[1.5] transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-3 flex-shrink-0" aria-hidden="true" />
                      <h4 className="font-bold text-[#0B0F0D] text-sm group-hover:text-[#064E2B] transition-colors duration-300">{item.title}</h4>
                    </div>
                    <p className="text-[#57615B] text-xs leading-relaxed pl-8 group-hover:text-[#3F4742] transition-colors duration-300">{item.description}</p>
                    <span className="absolute bottom-1.5 left-4 h-[1.5px] w-0 bg-[#19B965]/60 transition-all duration-500 group-hover:w-10" aria-hidden="true" />
                  </motion.div>
                );
              })}
            </div>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 font-bold text-sm tracking-widest uppercase text-[#0B0F0D] group/link hover:text-[#064E2B] transition-colors"
              >
                {t('about.readMore', 'ทำความรู้จักเราเพิ่มเติม')}
                <span className="w-8 h-[1px] bg-[#0B0F0D] transition-all duration-400 group-hover/link:w-12 group-hover/link:bg-[#064E2B]" />
                <ArrowRight className="w-4 h-4 transition-transform duration-400 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
