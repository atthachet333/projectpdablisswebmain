import { useState } from 'react';
import { Phone, Mail, MessageCircle, Calendar, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../../data/company';
import { useScrolled } from '../../hooks/useScroll';
import { useTranslation } from 'react-i18next';

const LineIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || 'w-5 h-5'} fill="currentColor" aria-hidden="true">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.346 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
);

export default function FloatingContact() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(400);

  const contactActions = [
    {
      id: 'phone',
      label: t('floating.phone', 'โทรหาเรา'),
      sublabel: COMPANY_INFO.phone,
      icon: Phone,
      href: `tel:${COMPANY_INFO.phone}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'line',
      label: t('floating.line', 'LINE OA'),
      sublabel: COMPANY_INFO.lineOa,
      iconComponent: LineIcon,
      href: COMPANY_INFO.social.line,
      color: 'bg-[#00B900] hover:bg-[#009900]',
    },
    {
      id: 'email',
      label: t('floating.email', 'ส่งอีเมล'),
      sublabel: COMPANY_INFO.email,
      icon: Mail,
      href: `mailto:${COMPANY_INFO.email}`,
      color: 'bg-amber hover:bg-orange-600',
    },
    {
      id: 'consult',
      label: t('floating.consult', 'ขอรับคำปรึกษา'),
      sublabel: t('floating.consultSub', 'นัดหมายผู้เชี่ยวชาญ'),
      icon: Calendar,
      href: '/contact',
      color: 'bg-gradient-to-r from-primary-900 to-primary-700 hover:from-primary-800 hover:to-primary-600',
      isLink: true,
    },
  ];

  return (
    <>
      {/* Floating Contact Menu */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[80] flex flex-col items-end gap-3">
        {/* Action Items */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex flex-col items-end gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {contactActions.map((action, i) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
                  transition={{ 
                    delay: (contactActions.length - 1 - i) * 0.05,
                    type: 'spring',
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  {action.isLink ? (
                    <a
                      href={action.href}
                      className={`group flex items-center gap-3 px-5 py-3 rounded-full text-white shadow-floating transition-all duration-300 transform hover:scale-105 hover:-translate-x-2 ${action.color}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="hidden sm:block text-right overflow-hidden">
                        <span className="block text-sm font-bold whitespace-nowrap">{action.label}</span>
                        <span className="block text-xs opacity-90 whitespace-nowrap font-medium">{action.sublabel}</span>
                      </span>
                      <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                        {action.icon && <action.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />}
                      </div>
                    </a>
                  ) : (
                    <a
                      href={action.href}
                      target={action.id !== 'phone' && action.id !== 'email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-3 px-5 py-3 rounded-full text-white shadow-floating transition-all duration-300 transform hover:scale-105 hover:-translate-x-2 ${action.color}`}
                    >
                      <span className="hidden sm:block text-right overflow-hidden">
                        <span className="block text-sm font-bold whitespace-nowrap">{action.label}</span>
                        <span className="block text-xs opacity-90 whitespace-nowrap font-medium">{action.sublabel}</span>
                      </span>
                      <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                        {action.iconComponent ? (
                          <action.iconComponent className="w-5 h-5 flex-shrink-0" />
                        ) : action.icon ? (
                          <action.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        ) : null}
                      </div>
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-900 to-primary-700 text-white shadow-floating flex items-center justify-center relative overflow-hidden group"
          onClick={() => setOpen(!open)}
          aria-label={open ? t('floating.close', 'ปิดเมนูติดต่อ') : t('floating.open', 'เปิดเมนูติดต่อ')}
          aria-expanded={open}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Animated rings */}
          {!open && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-primary-400 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 rounded-full border border-white/40 group-hover:scale-110 transition-transform duration-500" />
            </>
          )}
          
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-7 h-7" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle className="w-7 h-7" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            className="fixed bottom-28 right-5 sm:right-7 z-[75] w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 shadow-floating flex items-center justify-center text-navy-900 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ y: -4 }}
            aria-label={t('common.scrollTop', 'เลื่อนขึ้นด้านบน')}
            title={t('common.scrollTop', 'เลื่อนขึ้นด้านบน')}
          >
            <ChevronUp className="w-6 h-6" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
