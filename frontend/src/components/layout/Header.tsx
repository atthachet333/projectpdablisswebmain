import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, COMPANY_INFO } from '../../data/company';
import { useScrolled } from '../../hooks/useScroll';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const PDALogo = () => (
  <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-premium-green focus:ring-offset-2 rounded-lg" aria-label="PDA BLISS SOLUTIONS">
    <div className="relative">
      <svg width="48" height="48" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="25" stroke="#062E22" strokeWidth="2"/>
        <circle cx="26" cy="26" r="22" fill="white"/>
        {/* PDA letters */}
        <text x="26" y="22" textAnchor="middle" fill="#062E22" fontSize="10" fontWeight="800" fontFamily="serif">PDA</text>
        <line x1="12" y1="26" x2="40" y2="26" stroke="#062E22" strokeWidth="1"/>
        <text x="26" y="34" textAnchor="middle" fill="#062E22" fontSize="5.5" fontWeight="600" fontFamily="sans-serif">BLISS</text>
        <text x="26" y="40" textAnchor="middle" fill="#667085" fontSize="3.5" fontWeight="400" fontFamily="sans-serif">COMPANY LIMITED</text>
      </svg>
    </div>
  </Link>
);

export default function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const scrolled = useScrolled(20);
  const navLabel = (path: string) => t(`nav.${path === '/' ? 'home' : path.slice(1)}`);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-warm-white/90 backdrop-blur-xl shadow-nav border-b border-light-border/60 py-1.5'
          : 'bg-transparent py-4'
      }`}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-[72px] lg:h-[78px]">
          {/* Logo */}
          <PDALogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label={t('mobile.label')}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.href}
                className={`relative px-4 py-2 text-[14px] lg:text-[15px] font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-premium-green focus:ring-offset-1 group ${
                  isActive(item.path)
                    ? 'text-dark-navy'
                    : 'text-slate-gray hover:text-dark-navy'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px] inline-block">{navLabel(item.path)}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-warm-gold rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive(item.path) && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-premium-green rounded-full opacity-0 transform scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-left" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-deep-forest text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(6,46,34,0.2)] hover:bg-dark-navy hover:shadow-[0_6px_25px_rgba(16,28,44,0.3)] hover:-translate-y-0.5 group text-sm"
              id="header-contact-btn"
            >
              <Phone className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
              {t('common.contactUs')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-dark-navy hover:bg-ivory transition-colors focus:outline-none focus:ring-2 focus:ring-premium-green"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 top-[78px] bg-midnight/40 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="absolute top-full left-0 right-0 bg-warm-white border-t border-light-border shadow-floating z-50 lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="navigation"
              aria-label={t('mobile.label')}
            >
              <div className="container-custom py-6 flex flex-col gap-2">
                <p className="px-4 pb-4 text-[10px] font-bold tracking-[0.25em] uppercase text-slate-gray">{t('mobile.eyebrow')}</p>
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive(item.path)
                          ? 'bg-ivory text-dark-navy border border-light-border/50'
                          : 'text-dark-text hover:bg-ivory hover:text-dark-navy'
                      }`}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                    >
                      <span className="mr-4 text-xs font-num font-bold text-slate-gray/50">0{index + 1}</span>
                      {navLabel(item.path)}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="pt-6 pb-2 border-t border-light-border mt-4 flex flex-col gap-5 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-gray uppercase tracking-wider">{t('language.label')}</span>
                    <LanguageSwitcher />
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-deep-forest text-white font-semibold rounded-xl shadow-btn mt-2"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    {t('mobile.contact')}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
