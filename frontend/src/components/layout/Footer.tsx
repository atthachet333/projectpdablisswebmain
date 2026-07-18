import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, MapPin, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, NAV_ITEMS } from '../../data/company';
import { useTranslation } from 'react-i18next';

const LineIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.346 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLabel = (path: string) => t(`nav.${path === '/' ? 'home' : path.slice(1)}`);

  return (
    <footer className="bg-[#090D0B] text-white relative overflow-hidden" role="contentinfo">
      
      {/* Background Details */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232A26_1px,transparent_1px),linear-gradient(to_bottom,#232A26_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0E8F4D] rounded-full blur-[120px] opacity-20" />
      </div>

      {/* Top CTA Strip */}
      <div className="relative z-10 bg-gradient-to-r from-[#0B0F0D] to-[#064E2B] border-b border-[#263029] overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#19B965] to-transparent animate-light-border opacity-50" />
        <div className="container-custom py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
              {t('footer.ctaTitle', 'พร้อมยกระดับการจัดการธุรกิจของคุณหรือยัง')}
            </h2>
            <p className="text-[#B7E8C9] max-w-2xl text-sm md:text-base leading-relaxed">
              {t('footer.ctaDesc', 'พูดคุยกับทีมงานของเราเพื่อประเมินความต้องการ วางแผนขั้นตอน และค้นหารูปแบบบริการที่เหมาะกับธุรกิจของคุณ')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#19B965] text-[#0B0F0D] font-bold rounded-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-glow-green group/btn overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">{t('footer.ctaBtn1', 'ขอรับคำปรึกษา')}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Logo & About (spans 4) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <svg width="48" height="48" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(25,185,101,0.2)]">
                <circle cx="26" cy="26" r="25" stroke="#19B965" strokeWidth="2"/>
                <circle cx="26" cy="26" r="22" fill="#19B965" fillOpacity="0.05"/>
                <text x="26" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="serif">PDA</text>
                <line x1="12" y1="26" x2="40" y2="26" stroke="#19B965" strokeWidth="1"/>
                <text x="26" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="600" fontFamily="sans-serif">BLISS</text>
              </svg>
              <div>
                <p className="font-bold text-white text-base tracking-wide">PDA BLISS COMPANY LIMITED</p>
              </div>
            </div>
            
            <p className="text-[#A8B0AA] text-sm leading-relaxed max-w-sm">
              {t('footer.companyDesc', 'ผู้ให้บริการด้านการจัดการเอกสารแรงงานต่างด้าว บริการสมาชิกสำหรับธุรกิจ และคำปรึกษาด้านการบริหาร บัญชี อุตสาหกรรม และการเงิน')}
            </p>

            <div className="space-y-2">
              <p className="text-[#19B965] text-xs font-bold uppercase tracking-wider">{t('footer.registration', 'เลขทะเบียนบริษัท: XXXXXXXXXXXXX')}</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111713] border border-[#263029] hover:border-[#19B965] hover:bg-[#064E2B] flex items-center justify-center text-white hover:text-white hover:-translate-y-1 hover:shadow-glow-green transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={COMPANY_INFO.social.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111713] border border-[#263029] hover:border-[#19B965] hover:bg-[#064E2B] flex items-center justify-center text-white hover:text-white hover:-translate-y-1 hover:shadow-glow-green transition-all duration-300"
                aria-label="LINE OA"
              >
                <LineIcon />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111713] border border-[#263029] hover:border-[#19B965] hover:bg-[#064E2B] flex items-center justify-center text-white hover:text-white hover:-translate-y-1 hover:shadow-glow-green transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (spans 2) */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider pb-3 border-b border-[#263029] inline-block">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.href}
                    className="text-[#A8B0AA] hover:text-[#19B965] text-sm transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {navLabel(item.path)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (spans 3) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider pb-3 border-b border-[#263029] inline-block">{t('footer.services')}</h3>
            <ul className="space-y-4">
              {[
                t('services.items.foreignLabor.title'),
                t('services.items.membership.title'),
                t('services.items.consulting.title'),
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-[#A8B0AA] hover:text-[#19B965] text-sm transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact (spans 3) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider pb-3 border-b border-[#263029] inline-block">{t('footer.contact')}</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-[#A8B0AA] text-sm group">
                <div className="w-10 h-10 rounded-lg bg-[#111713] border border-[#263029] flex items-center justify-center flex-shrink-0 group-hover:bg-[#064E2B] group-hover:border-[#19B965] transition-colors">
                  <Phone className="w-4 h-4 text-white group-hover:text-[#19B965] transition-colors" aria-hidden="true" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-[#747D77] mb-1">Telephone</span>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#19B965] transition-colors font-bold text-white">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-[#A8B0AA] text-sm group">
                <div className="w-10 h-10 rounded-lg bg-[#111713] border border-[#263029] flex items-center justify-center flex-shrink-0 group-hover:bg-[#064E2B] group-hover:border-[#19B965] transition-colors">
                  <Mail className="w-4 h-4 text-white group-hover:text-[#19B965] transition-colors" aria-hidden="true" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-[#747D77] mb-1">Email</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#19B965] transition-colors font-bold text-white break-all">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-[#A8B0AA] text-sm group">
                <div className="w-10 h-10 rounded-lg bg-[#111713] border border-[#263029] flex items-center justify-center flex-shrink-0 group-hover:bg-[#064E2B] group-hover:border-[#19B965] transition-colors">
                  <MapPin className="w-4 h-4 text-white group-hover:text-[#19B965] transition-colors" aria-hidden="true" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-[#747D77] mb-1">Office</span>
                  <span className="leading-relaxed">{COMPANY_INFO.address}</span>
                  <span className="text-[#19B965] text-xs mt-2 block">{t('footer.officeHours', 'จันทร์–ศุกร์ 09:00–18:00 น.')}</span>
                  <span className="text-[#747D77] text-xs mt-0.5 block">{t('footer.responseTime', 'ตอบกลับภายใน 1 วันทำการ')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#263029] py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#747D77] text-sm text-center md:text-left font-medium">
            © {currentYear} PDA BLISS COMPANY LIMITED. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-[#747D77] hover:text-[#19B965] text-sm transition-colors font-medium">
              {t('footer.privacy', 'Privacy Policy')}
            </Link>
            <Link to="/terms" className="text-[#747D77] hover:text-[#19B965] text-sm transition-colors font-medium">
              {t('footer.terms', 'Terms of Service')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
