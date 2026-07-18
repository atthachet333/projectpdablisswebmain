import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import th from './locales/th/common.json';
import en from './locales/en/common.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { th: { translation: th }, en: { translation: en } },
  fallbackLng: 'th', supportedLngs: ['th', 'en'], interpolation: { escapeValue: false },
  detection: { order: ['localStorage'], caches: ['localStorage'], lookupLocalStorage: 'pda-language' },
});
export default i18n;
