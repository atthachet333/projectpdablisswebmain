import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage === 'en' ? 'en' : 'th';
  
  return (
    <div 
      className={`relative inline-flex items-center bg-ivory rounded-[8px] p-1 border border-light-border/50 ${className}`} 
      role="group" 
      aria-label={t('language.label')}
    >
      <motion.div 
        className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-dark-navy rounded-[6px] shadow-sm z-0"
        initial={false}
        animate={{ x: current === 'en' ? '100%' : '0%' }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        aria-hidden="true" 
      />
      
      {(['th','en'] as const).map(language => (
        <button 
          key={language} 
          type="button" 
          onClick={() => i18n.changeLanguage(language)} 
          className={`relative z-10 w-12 text-[11px] tracking-wider font-bold py-1.5 text-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-premium-green rounded-md ${
            current === language ? 'text-white' : 'text-slate-gray hover:text-dark-navy'
          }`} 
          aria-pressed={current === language} 
          aria-label={language === 'th' ? t('language.thai') : t('language.english')}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
