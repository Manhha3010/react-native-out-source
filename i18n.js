import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

i18n
  .use(RNLanguageDetector) // Add the language detector
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    ns: [],
    debug: true,
    defaultNS: undefined,

    resources: {
      en: {
        translation: require('./public/locales/en/translation.json'),
      },
      vi: {
        translation: require('./public/locales/vi/translation.json'),
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
