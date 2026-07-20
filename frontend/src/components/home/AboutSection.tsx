import { Users, ShieldCheck, Gem, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SmartImage from '../common/SmartImage';
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
          
          {/* Left: Premium Overlapping Images */}
          <div className="w-full lg:w-1/2 relative group min-h-[500px] flex flex-col justify-center items-center">
            {/* Subtle ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#064E2B]/5 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
              className="relative z-10 w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_60px_rgba(25,185,101,0.35)] transition-shadow duration-700">
                <SmartImage
                  src={siteImages.home.aboutMain}
                  alt="สำนักงาน PDA BLISS"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                
                {/* Overlay Text on Main Image */}
                <div className="absolute top-8 inset-x-0 flex flex-col items-center pointer-events-none z-10 px-6 text-center">
                  <div className="w-12 h-1 bg-[#19B965] mb-4 shadow-[0_0_10px_rgba(25,185,101,0.5)]" />
                  <p className="font-extrabold text-2xl lg:text-3xl leading-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#19B965] to-[#0B0F0D]">
                      {t('about.imageText', 'ยกระดับธุรกิจของคุณสู่มาตรฐานสากล')}
                    </span>
                  </p>
                </div>
              </div>

              {/* Overlapping smaller image */}
              <motion.div 
                className="absolute -bottom-8 -right-8 lg:-bottom-12 lg:-right-12 w-[65%] max-w-[340px] z-20 group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="overflow-hidden shadow-[0_24px_60px_rgba(11,15,13,0.2)] group-hover:shadow-[0_32px_80px_rgba(25,185,101,0.25)] transition-shadow duration-700">
                  <SmartImage
                    src={siteImages.home.aboutSecondary}
                    alt="ทีมงานมืออาชีพ PDA BLISS"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 transform group-hover:scale-110"
                  />
                </div>
                
                {/* Experience Badge */}
                <div className="absolute -bottom-4 -left-8 bg-[#0B0F0D] text-white p-4 lg:p-5 rounded-2xl shadow-xl flex items-center gap-3 z-30">
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
                    className="p-5 rounded-2xl bg-white border border-[#E7EBE8]/60 shadow-[0_4px_20px_rgba(11,15,13,0.02)] hover:border-[#19B965]/30 hover:shadow-[0_8px_30px_rgba(25,185,101,0.06)] transition-all duration-400 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F3F6F4] flex items-center justify-center mb-4 group-hover:bg-[#EAF8EF] transition-colors duration-400">
                      <Icon className="w-5 h-5 text-[#064E2B] group-hover:scale-110 transition-transform duration-400 stroke-[1.5]" />
                    </div>
                    <h4 className="font-bold text-[#0B0F0D] text-sm mb-2">{item.title}</h4>
                    <p className="text-[#747D77] text-xs leading-relaxed">{item.description}</p>
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
