import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingContact from './components/layout/FloatingContact';
import ScrollProgress from './components/layout/ScrollProgress';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

function NotFoundPage() {
  const { t } = useTranslation();
  return <section className="min-h-[70vh] grid place-items-center px-6 pt-24 text-center"><div><p className="text-8xl font-extrabold text-gradient">404</p><h1 className="mt-4 text-3xl font-bold">{t('errors.notFound')}</h1><Link to="/" className="btn-primary mt-8">{t('errors.backHome')}</Link></div></section>;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-3 border-primary-200 border-t-primary-700 animate-spin" style={{ borderWidth: '3px' }} />
        <p className="text-gray-500 text-sm">กำลังโหลด...</p>
      </div>
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { i18n, t } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage === 'en' ? 'en' : 'th';
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  }, [i18n.resolvedLanguage, t]);
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">{t('common.skip')}</a>
      <ScrollProgress />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      <FloatingContact />
    </BrowserRouter>
  );
}
