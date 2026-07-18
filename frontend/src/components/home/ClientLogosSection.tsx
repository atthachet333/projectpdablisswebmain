import { useTranslation } from 'react-i18next';
import { PARTNERS } from '../../data/partners';
import { Fragment } from 'react';
import { Briefcase } from 'lucide-react'; // Fallback icon

function PartnerLogo({ partner }: { partner: typeof PARTNERS[0] }) {
  const { t, i18n } = useTranslation();
  
  // Use translation for industry if available
  const industryKey = partner.industry.charAt(0).toLowerCase() + partner.industry.slice(1).replace(/\s+/g, '');
  const translatedIndustry = t(`clients.industry.${industryKey}`, partner.industry);
  const tooltip = t('clients.tooltip', 'ลูกค้าที่ไว้วางใจ PDA BLISS');

  return (
    <div
      className="group relative flex flex-col items-center justify-center p-6 mx-4 w-48 sm:w-56 h-32 bg-white border border-[#E7EBE8] rounded-2xl grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-card cursor-pointer"
      title={`${partner.name} - ${translatedIndustry}`}
    >
      <div className="flex items-center gap-3">
        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} className="max-h-12 w-auto object-contain" loading="lazy" />
        ) : (
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="w-8 h-8 rounded-full border border-[#747D77] group-hover:border-[#19B965] flex items-center justify-center transition-colors duration-300 bg-[#FAFCFB] flex-shrink-0">
              <Briefcase className="w-4 h-4 text-[#747D77] group-hover:text-[#19B965] transition-colors duration-300" />
            </div>
            <span className="text-[#3F4742] text-sm md:text-base font-bold whitespace-nowrap tracking-wider group-hover:text-[#0B0F0D] truncate max-w-[120px]">
              {partner.name}
            </span>
          </div>
        )}
      </div>

      {/* Tooltip-like element visible on hover */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max z-20">
        <div className="bg-[#0B0F0D] text-white text-xs py-1.5 px-3 rounded-lg font-medium shadow-floating whitespace-nowrap">
          {translatedIndustry} <span className="text-[#747D77] mx-1">|</span> <span className="text-[#19B965]">{tooltip}</span>
        </div>
      </div>
    </div>
  );
}

export default function ClientLogosSection() {
  const { t } = useTranslation();
  
  // We need to double the array to create a seamless infinite loop
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-[#E7EBE8] overflow-hidden relative" aria-label="ลูกค้าที่ไว้วางใจ">
      <div className="container-custom mb-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-[#E7EBE8] flex-1 max-w-[60px]" aria-hidden="true" />
            <p className="text-[#19B965] text-xs md:text-sm font-bold tracking-widest uppercase">
              {t('clients.title', 'TRUSTED BY INNOVATIVE COMPANIES')}
            </p>
            <div className="h-px bg-[#E7EBE8] flex-1 max-w-[60px]" aria-hidden="true" />
          </div>
          <p className="text-[#3F4742] text-sm md:text-base leading-relaxed">
            {t('clients.desc', 'เรามีโอกาสสนับสนุนธุรกิจตั้งแต่ผู้ประกอบการรายย่อย บริษัทที่กำลังเติบโต ไปจนถึงองค์กรที่มีหลายสาขา โดยปรับรูปแบบการดูแลให้เหมาะกับกระบวนการและเป้าหมายของแต่ละธุรกิจ')}
          </p>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full max-w-[100vw] overflow-hidden group/marquee">
        
        {/* Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Track */}
        <div className="flex w-max animate-marquee-infinite group-hover/marquee:pause-animation">
          {duplicatedPartners.map((partner, i) => (
            <Fragment key={`${partner.id}-${i}`}>
              <PartnerLogo partner={partner} />
            </Fragment>
          ))}
        </div>
        
      </div>
    </section>
  );
}
