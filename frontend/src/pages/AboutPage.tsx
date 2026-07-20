import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, TrendingUp, Heart, Target, Sprout, Linkedin, Eye, Crosshair } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';
import CTASection from '../components/common/CTASection';
import { useTranslation } from 'react-i18next';
import { COMPANY_INFO } from '../data/company';
import SmartImage from '../components/common/SmartImage';
import { siteImages } from '../config/images';
import AnimatedCounter from '../components/common/AnimatedCounter';

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
    <div className="pt-[72px] lg:pt-[78px] bg-white text-[#0B0F0D] overflow-hidden">
      
      {/* 1. Hero / Story Section (White) */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-white" aria-label={t('nav.about')}>
        {/* Subtle glowing accents */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#19B965] opacity-[0.04] rounded-full blur-[120px] orb-breathe pointer-events-none" aria-hidden="true" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-[#19B965] shadow-[0_0_8px_rgba(25,185,101,0.4)]" aria-hidden="true" />
                <span className="text-sm font-extrabold text-[#0E8F4D] uppercase tracking-[0.3em]">
                  {t('nav.about')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B0F0D] leading-[1.15] mb-8 tracking-tight">
                {t('about.story.title')}
              </h1>
              
              <div className="space-y-6 text-[#3F4742] text-lg leading-[1.8] max-w-xl text-justify font-medium">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p className="font-extrabold text-[#064E2B] text-xl drop-shadow-[0_0_10px_rgba(14,143,77,0.1)]">{t('about.story.p3')}</p>
              </div>
            </motion.div>
            
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(11,15,13,0.12)] border-[8px] border-white bg-white group-hover:shadow-[0_40px_100px_rgba(25,185,101,0.15)] transition-all duration-700">
                <SmartImage
                  src={siteImages.about.hero}
                  alt="Team"
                  className="w-full aspect-[4/3] md:aspect-[16/10] object-cover transform transition-transform duration-[15s] group-hover:scale-[1.05]"
                  priority={true}
                  recommendedRatio="16:10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/40 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:animate-[shine_2.5s_ease-in-out_forwards] pointer-events-none" />
              </div>
              
              {/* Premium Floating Experience Badge (Light Glass) */}
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-6 rounded-[24px] shadow-[0_20px_60px_rgba(11,15,13,0.1)] border border-[#E7EBE8] flex items-center gap-5 z-20 group-hover:-translate-y-3 hover:border-[#19B965]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(25,185,101,0.15)] hover:rotate-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EAF8EF] to-white flex items-center justify-center shadow-[0_0_20px_rgba(25,185,101,0.15)] pulse-ring">
                  <span className="text-3xl font-num font-extrabold text-[#0E8F4D] leading-none mt-1"><AnimatedCounter end={10} suffix="+" /></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#747D77] uppercase tracking-widest mb-1">Experience</span>
                  <span className="text-[#0B0F0D] font-extrabold text-sm leading-tight uppercase">Years of<br/>Excellence</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Layout for Vision / Mission (Dark Block) */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-[#0B0F0D]">
        {/* Subtle grid on dark bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="container-custom relative z-10">
          <SectionDivider title="Vision & Mission" subtitle="OUR PURPOSE" variant="C" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-16">
            {/* Vision (Dark Premium Glass) */}
            <motion.div 
              className="p-12 rounded-[32px] bg-[#121814]/80 backdrop-blur-sm border border-[#19B965]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] group transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_24px_80px_rgba(25,185,101,0.12)] hover:border-[#19B965]/40 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute top-8 right-10 text-[160px] leading-none font-serif text-[#19B965] opacity-[0.03] pointer-events-none z-0 group-hover:opacity-[0.08] transition-colors duration-700">"</div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#0B0F0D] border border-[#19B965]/30 flex items-center justify-center mb-8 group-hover:bg-[#19B965] transition-colors duration-500 shadow-[0_8px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[0_12px_30px_rgba(25,185,101,0.2)]">
                  <Eye className="w-10 h-10 text-[#19B965] group-hover:text-[#0B0F0D] transition-colors duration-500" />
                </div>
                <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight">Vision</h2>
                <p className="text-[#A0ACA5] text-xl leading-[1.8] font-medium text-justify group-hover:text-white transition-colors duration-500">
                  "{t('about.vision')}"
                </p>
              </div>
            </motion.div>

            {/* Mission (Dark Contrast Card with glowing accent) */}
            <motion.div 
              className="p-12 rounded-[32px] bg-gradient-to-br from-[#121814] to-[#042218] border border-[#19B965]/30 shadow-[0_12px_40px_rgba(0,0,0,0.5)] group transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_24px_80px_rgba(25,185,101,0.2)] hover:border-[#19B965]/60 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute -bottom-8 right-4 text-[160px] font-num font-extrabold text-white opacity-[0.02] pointer-events-none z-0 transition-opacity duration-700 group-hover:text-[#19B965] group-hover:opacity-[0.06]">05</div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#19B965]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#0B0F0D] border border-[#19B965]/40 flex items-center justify-center mb-8 group-hover:bg-[#19B965] transition-colors duration-500 shadow-[0_8px_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_12px_30px_rgba(25,185,101,0.3)]">
                  <Crosshair className="w-10 h-10 text-[#19B965] group-hover:text-[#0B0F0D] transition-colors duration-500" />
                </div>
                <h2 className="text-4xl font-extrabold mb-6 text-white tracking-tight">Mission</h2>
                <ul className="space-y-6">
                  {missionItems.map((item, i) => (
                    <li key={i} className="flex gap-4 text-white/80 text-[17px] leading-relaxed items-start group-hover:text-white transition-colors duration-500">
                      <span className="text-[#19B965] font-num font-bold text-lg mt-0.5 drop-shadow-[0_0_8px_rgba(25,185,101,0.5)]">0{i+1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Company Values (Distinct Gray Block) */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-[#F3F6F4]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#19B965] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 text-[200px] font-extrabold text-[#0B0F0D] opacity-[0.03] pointer-events-none -rotate-90 origin-left select-none" aria-hidden="true">
          VALUES
        </div>
        
        <div className="container-custom relative z-10">
          <SectionDivider title="Our Values" subtitle="The core principles we stand by" variant="D" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
            {valueKeys.map((key, i) => {
              const Icon = iconMap[key];
              const cardThemes = [
                // 1: White
                {
                  bg: 'bg-white',
                  border: 'border-[#E7EBE8] hover:border-[#19B965]/40',
                  number: 'text-[#0B0F0D]/[0.02] group-hover:text-[#19B965]/[0.05]',
                  title: 'text-[#0B0F0D] group-hover:text-[#064E2B]',
                  desc: 'text-[#747D77] group-hover:text-[#3F4742]',
                  iconBg: 'bg-[#F9FAFB] group-hover:bg-[#19B965]',
                  iconColor: 'text-[#064E2B] group-hover:text-white',
                  gradient: 'via-[#EAF8EF]/60',
                },
                // 2: Black
                {
                  bg: 'bg-[#0B0F0D]',
                  border: 'border-[#19B965]/20 hover:border-[#19B965]/40',
                  number: 'text-white/[0.02] group-hover:text-[#19B965]/[0.1]',
                  title: 'text-white group-hover:text-[#19B965]',
                  desc: 'text-[#A0ACA5] group-hover:text-white',
                  iconBg: 'bg-[#121814] group-hover:bg-[#19B965]',
                  iconColor: 'text-[#19B965] group-hover:text-[#0B0F0D]',
                  gradient: 'via-[#19B965]/10',
                },
                // 3: Green
                {
                  bg: 'bg-[#19B965]',
                  border: 'border-[#19B965] hover:border-[#064E2B]/40',
                  number: 'text-[#0B0F0D]/[0.05] group-hover:text-[#0B0F0D]/[0.1]',
                  title: 'text-white group-hover:text-[#0B0F0D]',
                  desc: 'text-white/90 group-hover:text-[#0B0F0D]/80',
                  iconBg: 'bg-white/20 group-hover:bg-[#0B0F0D]',
                  iconColor: 'text-white group-hover:text-[#19B965]',
                  gradient: 'via-[#0B0F0D]/10',
                },
                // 4: Gray
                {
                  bg: 'bg-[#E7EBE8]',
                  border: 'border-[#E7EBE8] hover:border-[#0B0F0D]/20',
                  number: 'text-[#0B0F0D]/[0.03] group-hover:text-[#0B0F0D]/[0.08]',
                  title: 'text-[#0B0F0D] group-hover:text-[#064E2B]',
                  desc: 'text-[#747D77] group-hover:text-[#0B0F0D]/80',
                  iconBg: 'bg-white group-hover:bg-[#0B0F0D]',
                  iconColor: 'text-[#064E2B] group-hover:text-[#19B965]',
                  gradient: 'via-white/60',
                },
                // 5: Dark Gray
                {
                  bg: 'bg-[#3F4742]',
                  border: 'border-[#747D77]/30 hover:border-[#19B965]/40',
                  number: 'text-white/[0.03] group-hover:text-[#19B965]/[0.1]',
                  title: 'text-white group-hover:text-[#19B965]',
                  desc: 'text-[#E7EBE8]/80 group-hover:text-white',
                  iconBg: 'bg-[#0B0F0D]/30 group-hover:bg-[#19B965]',
                  iconColor: 'text-white group-hover:text-[#0B0F0D]',
                  gradient: 'via-[#19B965]/10',
                }
              ];
              const theme = cardThemes[i % cardThemes.length];

              return (
                <motion.div
                  key={key}
                  className={`group relative overflow-hidden p-8 md:p-10 rounded-[24px] ${theme.bg} border ${theme.border} shadow-[0_4px_20px_rgba(11,15,13,0.03)] hover:shadow-[0_20px_60px_rgba(25,185,101,0.12)] hover:-translate-y-2 hover:-rotate-1 transition-all duration-500`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`absolute top-4 right-6 text-7xl font-num font-extrabold ${theme.number} pointer-events-none z-0 transition-colors duration-500`}>
                    0{i+1}
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent ${theme.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 group-hover:border-transparent group-hover:shadow-[0_12px_24px_rgba(25,185,101,0.3)] group-hover:-translate-y-2 transition-all duration-500 ${theme.iconBg} ${theme.border}`}>
                      <Icon className={`w-8 h-8 transition-colors duration-500 stroke-[1.5] ${theme.iconColor}`} />
                    </div>
                    <h3 className={`text-xl font-extrabold mb-4 transition-colors duration-500 ${theme.title}`}>{t(`about.values.items.${key}.title`)}</h3>
                    <p className={`text-[15px] leading-relaxed transition-colors duration-500 ${theme.desc}`}>{t(`about.values.items.${key}.desc`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Team Section (White Block) */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <SectionDivider title={t('about.team.title')} subtitle={t('about.team.subtitle')} variant="A" number="TEAM" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16 max-w-6xl mx-auto">
            {teamMembers.map((member, i) => {
              const portrait = teamPortraits[i % teamPortraits.length];
              
              return (
                <motion.div
                  key={i}
                  className="group overflow-hidden bg-white shadow-[0_12px_40px_rgba(11,15,13,0.06)] hover:shadow-[0_24px_60px_rgba(25,185,101,0.12)] transition-shadow duration-500 flex flex-col border border-[#E7EBE8] hover:border-[#19B965]/30"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <SmartImage 
                      src={portrait} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 transform group-hover:scale-110"
                      recommendedRatio="4:5"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <a href="#" className="w-12 h-12 rounded-full bg-white border border-white flex items-center justify-center text-[#0E8F4D] hover:bg-[#19B965] hover:text-white hover:border-[#19B965] transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-8 relative bg-[#FAFCFB] flex-1 flex flex-col items-center text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#E7EBE8] to-transparent group-hover:via-[#19B965] transition-colors duration-500" />
                    
                    <h3 className="font-extrabold text-[18px] lg:text-[20px] xl:text-[22px] mb-2 text-[#0B0F0D] group-hover:text-[#064E2B] transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-[#0E8F4D] text-[10px] lg:text-xs font-extrabold tracking-widest uppercase mb-4 truncate w-full">
                      {member.role}
                    </p>
                    <p className="text-[15px] leading-relaxed text-[#747D77] flex-1">
                      {member.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Premium Glowing Timeline (Light Gray Block) */}
      <section className="py-20 lg:py-32 bg-[#FAFCFB] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[#19B965] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
        
        <div className="container-custom relative z-10">
          <SectionDivider title={t('about.timeline.title')} subtitle="OUR JOURNEY" variant="D" />
          
          <div className="hidden lg:block relative mt-32 max-w-6xl mx-auto">
            {/* Animated Track */}
            <div className="absolute top-[3.5rem] left-[5%] right-[5%] h-[2px] bg-[#E7EBE8]" aria-hidden="true">
              <div className="absolute top-0 left-0 bottom-0 bg-[#0E8F4D] animate-[shine_4s_infinite_ease-in-out] w-1/4 rounded-full shadow-[0_0_10px_rgba(14,143,77,0.3)]" />
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
                    <div className="absolute inset-0 border-2 border-[#19B965]/40 rounded-full group-hover:scale-[1.15] transition-transform duration-500 opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(25,185,101,0.2)]" />
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-[#E7EBE8] shadow-[0_8px_20px_rgba(11,15,13,0.04)] flex items-center justify-center text-[#747D77] font-num font-extrabold text-2xl group-hover:border-[#19B965] group-hover:text-[#064E2B] group-hover:bg-[#EAF8EF] transition-all duration-300 z-10">
                      {event.year}
                      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#19B965] shadow-[0_0_8px_rgba(25,185,101,0.5)] opacity-0 group-hover:opacity-100 animate-pulse-subtle" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-[#0B0F0D] text-lg mb-2 group-hover:text-[#064E2B] transition-colors">{event.title}</h3>
                  <p className="text-[#747D77] text-sm leading-relaxed max-w-[160px] mx-auto group-hover:text-[#3F4742] transition-colors">{event.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden mt-16 space-y-12 relative max-w-xl mx-auto before:absolute before:inset-0 before:ml-[1.1rem] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#19B965] before:via-[#19B965]/30 before:to-transparent">
            {timelineItems.map((event, i) => (
              <motion.div
                key={i}
                className="relative flex items-start gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="relative z-10 w-10 h-10 flex-shrink-0 bg-white border-2 border-[#19B965]/50 rounded-full flex items-center justify-center group-hover:bg-[#EAF8EF] group-hover:border-[#19B965] transition-colors shadow-[0_4px_10px_rgba(25,185,101,0.1)]">
                  <span className="w-3 h-3 rounded-full bg-[#19B965] shadow-[0_0_8px_rgba(25,185,101,0.4)] animate-pulse-subtle" />
                </div>
                <div className="pt-1">
                  <span className="text-[#0E8F4D] font-num font-extrabold text-xl block mb-2 group-hover:translate-x-2 transition-transform">{event.year}</span>
                  <h3 className="font-extrabold text-[#0B0F0D] text-lg mb-2">{event.title}</h3>
                  <p className="text-[#747D77] text-base leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Trust Proof Section (Dark Black Block) */}
      <section className="py-20 lg:py-32 bg-[#0B0F0D] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#19B965]/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#19B965] opacity-[0.05] rounded-[100%] blur-[120px] pointer-events-none" aria-hidden="true" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {([
              { value: 10, suffix: '+', isNum: true, text: '', label: t('about.trust.badges.experience', 'ประสบการณ์กว่า 10 ปี') },
              { value: 1000, suffix: '+', isNum: true, text: '', label: t('about.trust.badges.clients', 'ลูกค้ากว่า 1,000 ราย') },
              { value: 100, suffix: '%', isNum: true, text: '', label: t('about.trust.badges.secure', 'ข้อมูลปลอดภัย 100%') },
              { value: 0, suffix: '', isNum: false, text: '24h', label: t('about.trust.badges.fast', 'ตอบกลับรวดเร็ว') },
            ] as const).map((item, i) => (
              <motion.div
                key={i}
                className="text-center p-8 rounded-[24px] bg-[#121814] border border-[#19B965]/10 hover:border-[#19B965]/50 transition-all duration-500 group hover:-translate-y-3 hover:rotate-1 hover:shadow-[0_15px_40px_rgba(25,185,101,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-extrabold text-[#19B965] mb-4 group-hover:text-white transition-colors drop-shadow-[0_0_15px_rgba(25,185,101,0.3)] stat-number-glow">
                  {item.isNum ? <AnimatedCounter end={item.value as number} suffix={item.suffix} /> : item.text}
                </p>
                <p className="text-white/80 text-sm md:text-base font-bold leading-tight uppercase tracking-wider">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#A0ACA5] text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              {t('about.previewText')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {(t('about.bullets', { returnObjects: true }) as string[]).map((bullet: string, bi: number) => (
                <span key={bi} className="flex items-center gap-3 text-sm font-bold text-white bg-[#19B965]/10 px-5 py-2.5 rounded-full border border-[#19B965]/30 hover:bg-[#19B965]/20 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#19B965] flex-shrink-0 shadow-[0_0_8px_#19B965]" aria-hidden="true" />
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
