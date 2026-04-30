import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

const saved = localStorage.getItem('hospital_lang') || 'en';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = saved;

export function setLang(lang) {
  localStorage.setItem('hospital_lang', lang);
  i18n.changeLanguage(lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

export default i18n;
