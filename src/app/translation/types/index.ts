import { InitOptions, Module, Newable } from 'i18next';

export type Language = 'en' | 'fr';

export interface TranslationConfig {
  defaultLanguage: Language;
  languages: Language[];
  plugins: (Module | Newable<Module>)[];
  options: InitOptions;
}
