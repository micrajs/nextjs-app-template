import type { Language } from 'app/translation/types';
import commonEn from 'app/translation/data/languages/en/common';
import commonFr from 'app/translation/data/languages/fr/common';

/**
 * Default language
 * This is the default language of the application.
 */
export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Available languages
 * These are the available languages that
 * the application supports.
 */
export const LANGUAGES: Language[] = ['en', 'fr'];

/**
 * Root translations
 * These are the default translations that should
 * be loaded with the application.
 */
export const ROOT_TRANSLATIONS = {
  en: { common: commonEn },
  fr: { common: commonFr },
};
