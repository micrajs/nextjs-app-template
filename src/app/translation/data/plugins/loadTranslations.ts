import type { Language } from 'app/translation/types';
import type { ReadCallback } from 'i18next';

export const loadTranslations: any = {
  type: 'backend',
  read: (lng: Language, ns: string, callback: ReadCallback) => {
    import(`app/translation/data/languages/${lng}/${ns}`)
      .then((Module) => callback(null, Module.default))
      .catch((e) => callback(e, false));
  },
};
