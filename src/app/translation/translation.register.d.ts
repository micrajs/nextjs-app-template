declare namespace Micra {
  interface Services {
    translation: import('i18next').i18n;
  }

  export interface Config {
    translation: import('app/translation/types').TranslationConfig;
  }
}
