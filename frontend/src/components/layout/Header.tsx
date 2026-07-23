import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, COMPANY_INFO } from '../../data/company';
import { useScrolled } from '../../hooks/useScroll';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

import BrandLogo from '../common/BrandLogo';

const PDALogo = () => (
  <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#19B965] focus:ring-offset-2 rounded-lg min-w-0" aria-label="PDA BLISS SOLUTIONS">
    <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(25,185,101,0.4)]">
      <BrandLogo size={52} />
    </div>
    <div className="hidden sm:flex flex-col min-w-0">
      <span className="text-[13px] lg:text-[14px] font-extrabold text-[#0B0F0D] leading-tight tracking-wide whitespace-nowrap">PDA BLISS COMPANY LIMITED</span>
      <span className="text-[11px] lg:text-[12px] font-bold text-[#3F4742] leading-tight mt-0.5 whitespace-nowrap">บริษัท พีดีเอ บลิส จำกัด</span>
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-[16px] shadow-[0_4px_24px_rgba(11,15,13,0.10)] border-b border-[#19B965]/20 py-1'
          : 'bg-white border-b border-[#DDE4DF] shadow-[0_1px_6px_rgba(11,15,13,0.04)] py-2'
      }`}
      role="banner"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0E8F4D] to-transparent opacity-60" aria-hidden="true" />

      <div className="container-custom">
        <div className="flex items-center justify-between h-[68px] lg:h-[76px] gap-4">
          {/* Logo + Company Name */}
          <PDALogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" aria-label={t('mobile.label')}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.href}
                className={`relative px-3.5 py-2 text-[13px] xl:text-[14px] font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#19B965] focus:ring-offset-1 group whitespace-nowrap ${
                  isActive(item.path)
                    ? 'text-[#064E2B] bg-[#EAF8EF]/60'
                    : 'text-[#3F4742] hover:text-[#064E2B] hover:bg-[#EAF8EF]/40'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px] inline-block">{navLabel(item.path)}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#0E8F4D] rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive(item.path) && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#19B965] rounded-full opacity-0 transform scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-left" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#064E2B] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(6,78,43,0.25)] hover:bg-[#0B0F0D] hover:shadow-[0_6px_25px_rgba(11,15,13,0.3)] hover:-translate-y-0.5 group text-sm whitespace-nowrap"
              id="header-contact-btn"
            >
              <Phone className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
              {t('common.contactUs')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl text-[#0B0F0D] hover:bg-[#EAF8EF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#19B965] flex-shrink-0"
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
              className="fixed inset-0 top-[76px] bg-[#0B0F0D]/40 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="absolute top-full left-0 right-0 bg-white border-t border-[#DDE4DF] shadow-[0_8px_30px_rgba(11,15,13,0.12)] z-50 lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="navigation"
              aria-label={t('mobile.label')}
            >
              <div className="container-custom py-6 flex flex-col gap-2">
                <p className="px-4 pb-4 text-[10px] font-bold tracking-[0.25em] uppercase text-[#57615B]">{t('mobile.eyebrow')}</p>
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                        isActive(item.path)
                          ? 'bg-[#EAF8EF] text-[#064E2B] border border-[#9EE6BC]/50'
                          : 'text-[#0B0F0D] hover:bg-[#F3F6F4] hover:text-[#064E2B]'
                      }`}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                    >
                      <span className="mr-4 text-xs font-bold text-[#57615B]/50">0{index + 1}</span>
                      {navLabel(item.path)}
                      {isActive(item.path) && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0E8F4D]" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-6 pb-2 border-t border-[#E7EBE8] mt-4 flex flex-col gap-5 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#57615B] uppercase tracking-wider">{t('language.label')}</span>
                    <LanguageSwitcher />
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#064E2B] text-white font-semibold rounded-xl shadow-[0_4px_15px_rgba(6,78,43,0.25)] mt-2 min-h-[44px] hover:bg-[#0B0F0D] transition-all duration-300"
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
