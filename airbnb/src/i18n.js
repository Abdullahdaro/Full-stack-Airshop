import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n.use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
        loadPath: 'http://localhost:4000/locales/{{lng}}/{{ns}}.json',
    },

    fallbackLng: 'en',
    ns: ['translations', 'main', 'profile'],
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      wait: true,
    },
  });

export default i18n;