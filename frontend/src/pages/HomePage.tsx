import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/home/HeroSection';
import TrustBarSection from '../components/home/TrustBarSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import StatsSection from '../components/home/StatsSection';
import WhyUsSection from '../components/home/WhyUsSection';
// import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ClientLogosSection from '../components/home/ClientLogosSection';
import CTASection from '../components/common/CTASection';
import { COMPANY_INFO } from '../data/company';

export default function HomePage() {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = `${COMPANY_INFO.nameEn} - โซลูชันธุรกิจครบวงจร`;
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": COMPANY_INFO.nameFull,
          "description": t('hero.description', 'PDA BLISS ให้บริการด้านเอกสารแรงงานต่างด้าว...'),
          "telephone": COMPANY_INFO.phone,
          "email": COMPANY_INFO.email,
          "url": `https://${COMPANY_INFO.website}`,
          "address": { "@type": "PostalAddress", "streetAddress": COMPANY_INFO.address },
          "openingHours": "Mo-Fr 09:00-18:00",
        })
      }} />

      <HeroSection />
      <TrustBarSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <WhyUsSection />
      {/* <ProcessSection /> */}
      <TestimonialsSection />
      <ClientLogosSection />
      {/* <MembershipPreview /> */}
      {/* <FAQPreview /> */}
      <CTASection />
    </>
  );
}
