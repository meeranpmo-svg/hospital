import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';

// English-only for Jyothi Hospital, Chennai.
// Tamil / Hindi can be added by dropping a JSON file in this folder
// and registering it under `resources` below.
i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

document.documentElement.dir = 'ltr';
document.documentElement.lang = 'en';

export function setLang(lang) {
  // No-op for now (kept for backward compat with any callers)
  i18n.changeLanguage(lang);
}

export default i18n;
