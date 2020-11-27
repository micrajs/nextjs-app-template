import app from '@micra/application';
import { initReactI18next } from 'react-i18next';
import languageDetection from 'i18next-browser-languagedetector';
import { TranslationConfig } from 'app/translation/types';
import { loadTranslations } from 'app/translation/data/plugins/loadTranslations';
import { DEFAULT_LANGUAGE, LANGUAGES, ROOT_TRANSLATIONS } from 'app/translation/data/constants';

app.config.set<TranslationConfig>('translation', {
  defaultLanguage: DEFAULT_LANGUAGE,
  languages: LANGUAGES,
  plugins: [initReactI18next, languageDetection, loadTranslations],
  options: {
    fallbackLng: DEFAULT_LANGUAGE,
    whitelist: LANGUAGES,
    returnObjects: true,
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      bindI18n: 'languageChanged added loaded',
      nsMode: 'default',
    },
    detection: {
      order: ['path'],
    },
    resources: ROOT_TRANSLATIONS,
  },
});
