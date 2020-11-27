/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-rest-params */
/* eslint-disable consistent-return */
import { CookieGuardConfig } from 'app/storage/types';
import { cookieParser } from 'app/storage/data/CookieStorage/cookieParser';

/**
 * SAFE_OBJECT
 * This object is declared outside the scope of the CookieGuard's
 * instance. This makes sure that the values are not accessible
 * to malicious script trying to change the instance.
 */
const SAFE_OBJECT: CookieGuardConfig = {
  whitelist: [],
  optional: [],
};

export class CookieGuard {
  constructor({ whitelist, optional }: CookieGuardConfig) {
    if (SAFE_OBJECT.whitelist.length === 0) {
      SAFE_OBJECT.whitelist = [...whitelist];
      SAFE_OBJECT.optional = [...optional];
    }

    this.init();
  }

  protected init() {
    const self = this;
    const cookieSetterOrig = (document as any).__lookupSetter__('cookie');
    const cookieGetterOrig = (document as any).__lookupGetter__('cookie');
    Object.defineProperty(document, 'cookie', {
      get() {
        return cookieGetterOrig.apply(document);
      },
      set() {
        if (self.allows(arguments[0])) {
          return cookieSetterOrig.apply(document, arguments);
        }
      },
      configurable: true,
    });
  }

  agreeTo(...names: string[]) {
    names.forEach((name) => {
      if (SAFE_OBJECT.optional.includes(name) && !SAFE_OBJECT.whitelist.includes(name)) {
        SAFE_OBJECT.whitelist.push(name);
      }
    });
  }

  allows(definition: string) {
    const [cookie] = cookieParser(definition);

    if (SAFE_OBJECT.whitelist.includes(cookie.name)) {
      return true;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error(
        `Blocked cookie "${cookie.name}" from being set. If this was intentional, add it to the whitelist.`,
      );
    }

    return false;
  }
}
