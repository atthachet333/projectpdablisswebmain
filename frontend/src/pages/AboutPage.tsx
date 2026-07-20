import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, TrendingUp, Heart, Target, Sprout, Linkedin, Eye, Crosshair } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';
import CTASection from '../components/common/CTASection';
import { useTranslation } from 'react-i18next';
import { COMPANY_INFO } from '../data/company';
import SmartImage from '../components/common/SmartImage';
import { siteImages } from '../config/images';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  integrity: Shield, professionalism: Award, continuousImprovement: TrendingUp, clientCare: Heart, accuracy: Target, mutualGrowth: Sprout,
};

const teamPortraits = [
  siteImages.about.teamMember1,
  siteImages.about.teamMember2,
  siteImages.about.teamMember3,
];

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('nav.about')} | ${COMPANY_INFO.nameEn}`;
  }, [t]);

  const valueKeys = ['integrity', 'professionalism', 'accuracy', 'clientCare', 'continuousImprovement', 'mutualGrowth'];
  
  const valueCardClasses = [
    'card-white mouse-spotlight',
    'card-green mouse-spotlight',
    'bg-[#F3F6F4] border border-[#E7EBE8] hover:border-[#0E8F4D] mouse-spotlight card-base shadow-card',
    'card-dark mouse-spotlight',
    'card-outline mouse-spotlight',
    'bg-[#064E2B] text-white border border-[#08743C] hover:border-[#19B965] mouse-spotlight card-base shadow-card'
  ];
  
  const valueIconClasses = [
    'bg-[#F3F6F4] text-[#0E8F4D]',
    'bg-white text-[#064E2B]',
    'bg-white text-[#0B0F0D]',
    'bg-white/10 text-[#19B965]',
    'bg-[#FAFCFB] text-[#0E8F4D]',
    'bg-[#042218] text-[#9EE6BC]'
  ];
  
  const valueTextClasses = [
    'text-[#0B0F0D]',
    'text-[#064E2B]',
    'text-[#0B0F0D]',
    'text-white',
    'text-[#0B0F0D]',
    'text-white'
  ];
  
  const valueDescClasses = [
    'text-[#3F4742]',
    'text-[#08743C]',
    'text-[#3F4742]',
    'text-white/70',
    'text-[#747D77]',
    'text-[#EAF8EF]'
  ];
  
  const teamMembers = t('about.team.members', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    desc: string;
  }>;
  
  const timelineItems = t('about.timeline.items', { returnObjects: true }) as Array<{
    year: string;
    title: string;
    desc: string;
  }>;

  const missionItems = t('about.mission', { returnObjects: true }) as string[];

  return (
    <div className="pt-[72px] lg:pt-[78px]">
      
      {/* 1. Hero / Story Section */}
      <section className="relative bg-[#FAFCFB] py-20 lg:py-24 overflow-hidden" aria-label={t('nav.about')}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F3F6F4] transform -skew-x-12 translate-x-32" />
          <div className="absolute top-10 right-20 w-32 h-32 bg-[#EAF8EF] rounded-full blur-[40px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
                <span className="text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em]">
                  {t('nav.about')}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B0F0D] leading-[1.2] mb-8">
                {t('about.story.title')}
              </h1>
              
              <div className="space-y-4 text-[#3F4742] text-base md:text-lg leading-relaxed max-w-xl">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p className="font-semibold text-[#064E2B]">{t('about.story.p3')}</p>
              </div>
            </motion.div>
            
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-floating group animated-border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/3] md:aspect-[16/10] relative overflow-hidden bg-transparent rounded-2xl">
                <SmartImage
                  src={siteImages.about.hero}
                  alt="Team"
                  className="w-full h-full object-cover transform transition-transform duration-[10s] group-hover:scale-105"
                  priority={true}
                  recommendedRatio="16:10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply" />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#0E8F4D] rounded-tl-[100px] flex items-center justify-center p-8 group-hover:bg-[#19B965] transition-colors">
                <div className="text-white font-bold text-center">
                  <span className="block text-3xl font-num">10+</span>
                  <span className="block text-[10px] uppercase tracking-wider">Years Exp</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Layout for Vision / Mission */}
      <section className="py-20 lg:py-24 bg-[#F9FAFB] relative">
        <div className="container-custom">
          <SectionDivider title="Vision & Mission" subtitle="OUR PURPOSE" variant="C" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mt-16">
            {/* Vision */}
            <motion.div 
              className="card-white p-10 mouse-spotlight group transition-transform duration-500 hover:-translate-y-1 hover:shadow-floating relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-[#F0FDF4] z-0" />
              <div className="absolute top-4 right-8 text-[120px] leading-none font-serif text-black opacity-5 pointer-events-none z-0">"</div>
              <div className="absolute inset-0 z-0 opacity-[0.04] grayscale mix-blend-multiply pointer-events-none bg-cover bg-right-bottom" style={{ backgroundImage: "url('/images/about/vision-bg.jpg')" }} />
              
              <div className="relative z-10">
                <Eye className="w-10 h-10 text-[#0E8F4D] mb-6 icon-animate" />
                <h2 className="text-3xl font-extrabold text-[#0B0F0D] mb-4">Vision</h2>
                <p className="text-[#3F4742] text-lg leading-relaxed font-medium">
                  "{t('about.vision')}"
                </p>
              </div>
              
              {import.meta.env.DEV && (
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 z-10">
                  Optional background: /images/about/vision-bg.jpg
                </div>
              )}
            </motion.div>

            {/* Mission */}
            <motion.div 
              className="card-dark p-10 mouse-spotlight group transition-transform duration-500 hover:-translate-y-1 hover:shadow-floating relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#19B965_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none z-0" />
              <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-cover bg-right-bottom" style={{ backgroundImage: "url('/images/about/mission-bg.jpg')" }} />
              <div className="absolute -bottom-4 right-4 text-[120px] font-num font-extrabold text-white opacity-5 pointer-events-none z-0">05</div>
              
              <div className="relative z-10">
                <Crosshair className="w-10 h-10 text-[#19B965] mb-6 icon-animate" />
                <h2 className="text-3xl font-extrabold mb-4 text-white">Mission</h2>
                <ul className="space-y-4">
                  {missionItems.map((item, i) => (
                    <li key={i} className="flex gap-3 text-white/80 text-base leading-relaxed">
                      <span className="text-[#19B965] font-bold">0{i+1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {import.meta.env.DEV && (
                <div className="absolute bottom-2 right-2 text-[10px] text-white/30 z-10">
                  Optional background: /background.png
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Company Values */}
      <section className="py-20 lg:py-24 bg-[#FCFDFD] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#19B965] blur-[120px] opacity-[0.04] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500 blur-[120px] opacity-[0.04] pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[150px] font-extrabold text-black opacity-[0.02] pointer-events-none rotate-90 origin-right lg:rotate-0 lg:origin-center select-none" aria-hidden="true">
          VALUES
        </div>
        
        <div className="container-custom relative z-10">
          <SectionDivider title="Our Values" subtitle="The core principles we stand by" variant="D" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
            {valueKeys.map((key, i) => {
              const Icon = iconMap[key];
              return (
                <motion.div
                  key={key}
                  className={`group relative overflow-hidden p-8 md:p-10 ${valueCardClasses[i]} transition-transform duration-500 hover:-translate-y-1 hover:shadow-floating`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute top-4 right-4 text-6xl font-num font-extrabold opacity-5 pointer-events-none z-0">
                    0{i+1}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-0" />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 icon-animate transition-colors duration-500 ${valueIconClasses[i]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-extrabold mb-4 ${valueTextClasses[i]}`}>{t(`about.values.items.${key}.title`)}</h3>
                    <p className={`text-sm leading-relaxed ${valueDescClasses[i]}`}>{t(`about.values.items.${key}.desc`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="py-20 lg:py-24 bg-[#F3F6F4] relative overflow-hidden">
        <div className="container-custom">
          <SectionDivider title={t('about.team.title')} subtitle={t('about.team.subtitle')} variant="B" number="TEAM" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => {
              const portrait = teamPortraits[i % teamPortraits.length];
              
              return (
                <motion.div
                  key={i}
                  className="group rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-floating bg-white border border-[#E7EBE8] hover:border-[#19B965] overflow-hidden hover:rotate-[0.5deg]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative overflow-hidden aspect-square bg-transparent group-hover:shadow-[inset_0_0_30px_rgba(25,185,101,0.2)] transition-shadow duration-500">
                    <SmartImage 
                      src={portrait} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-[1.02]"
                      recommendedRatio="1:1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-4 right-4 bg-[#0E8F4D] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
                      10+ ปี
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <a href="#" className="w-10 h-10 rounded-full bg-[#19B965] flex items-center justify-center text-[#0B0F0D] hover:bg-white transition-colors shadow-glow-green">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="font-extrabold text-xl mb-1 text-[#0B0F0D]">{member.name}</h3>
                    <p className="text-[#0E8F4D] text-sm font-bold tracking-wide uppercase mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm leading-relaxed text-[#747D77]">{member.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Premium Timeline */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <SectionDivider title={t('about.timeline.title')} subtitle="OUR JOURNEY" variant="A" />
          
          <div className="hidden lg:block relative mt-20 max-w-6xl mx-auto">
            <div className="absolute top-[3.5rem] left-[5%] right-[5%] h-[2px] bg-[#E7EBE8]" aria-hidden="true">
              <div className="absolute top-0 left-0 bottom-0 bg-[#0E8F4D] animate-[shine_4s_infinite_ease-in-out] w-1/4 rounded-full" />
            </div>
            
            <div className="grid grid-cols-6 relative gap-4">
              {timelineItems.map((event, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center px-2 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-[#9EE6BC] rounded-full group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-[#E7EBE8] shadow-sm flex items-center justify-center text-[#3F4742] font-num font-extrabold text-xl group-hover:border-[#0E8F4D] group-hover:text-[#0E8F4D] transition-colors duration-300 z-10">
                      {event.year}
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#19B965] opacity-0 group-hover:opacity-100 animate-pulse-subtle" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-[#0B0F0D] text-base mb-2">{event.title}</h3>
                  <p className="text-[#747D77] text-xs leading-relaxed max-w-[160px] mx-auto">{event.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden mt-12 space-y-12 relative max-w-xl mx-auto before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#0E8F4D] before:via-[#E7EBE8] before:to-transparent">
            {timelineItems.map((event, i) => (
              <motion.div
                key={i}
                className="relative flex items-start gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="relative z-10 w-10 h-10 flex-shrink-0 bg-white border border-[#0E8F4D] rounded-full flex items-center justify-center group-hover:bg-[#EAF8EF] transition-colors">
                  <span className="w-3 h-3 rounded-full bg-[#19B965] animate-pulse-subtle" />
                </div>
                <div className="pt-1">
                  <span className="text-[#0E8F4D] font-num font-extrabold text-lg block mb-1 group-hover:translate-x-1 transition-transform">{event.year}</span>
                  <h3 className="font-extrabold text-[#0B0F0D] text-lg mb-2">{event.title}</h3>
                  <p className="text-[#747D77] text-sm leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Trust Proof Section */}
      <section className="py-20 lg:py-24 bg-[#0B0F0D]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {([
              { icon: '10+', label: t('about.trust.badges.experience', 'ประสบการณ์กว่า 10 ปี') },
              { icon: '1,000+', label: t('about.trust.badges.clients', 'ลูกค้ากว่า 1,000 ราย') },
              { icon: '100%', label: t('about.trust.badges.secure', 'ข้อมูลปลอดภัย 100%') },
              { icon: '24h', label: t('about.trust.badges.fast', 'ตอบกลับรวดเร็ว') },
            ] as const).map((item, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#19B965]/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl font-extrabold text-[#19B965] mb-2 group-hover:text-[#9EE6BC] transition-colors">{item.icon}</p>
                <p className="text-white/80 text-sm font-semibold leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
              {t('about.previewText')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {(t('about.bullets', { returnObjects: true }) as string[]).map((bullet: string, bi: number) => (
                <span key={bi} className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19B965] flex-shrink-0" aria-hidden="true" />
                  {bullet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
