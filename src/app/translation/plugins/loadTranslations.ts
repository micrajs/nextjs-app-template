import type { Language } from 'app/translation/types';

export const loadTranslations: any = {
  type: 'backend',
  read: (lng: Language, ns: string, callback: any) => {
    import(`app/translation/languages/${lng}/${ns}`)
      .then((Module) => callback(null, Module.default))
      .catch((e) => callback(e));
  },
};
