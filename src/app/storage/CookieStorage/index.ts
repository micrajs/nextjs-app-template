/* eslint-disable no-console */
import { cookieEncoder } from 'app/storage/CookieStorage/cookieEncoder';
import { cookieParser } from 'app/storage/CookieStorage/cookieParser';
import type {
  Cookie,
  CookieStorage,
  CookieOptions,
  CookieClient,
} from 'app/storage/CookieStorage/types';
import type { CookieGuardConfig } from 'app/storage/types';

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

export class CookieStorageWrapper implements CookieStorage {
  protected client: CookieClient;

  protected jarIndex: Cookie['name'][] = [];

  protected jar: Record<Cookie['name'], Cookie> = {};

  constructor(client: CookieClient, options?: CookieGuardConfig) {
    this.client = client;
    if (SAFE_OBJECT.whitelist.length === 0 && options) {
      SAFE_OBJECT.whitelist = [...options.whitelist];
      SAFE_OBJECT.optional = [...options.optional];
    }
    this.hydrate();
  }

  protected hydrate() {
    cookieParser(this.client.get()).forEach((cookie) => {
      if (!this.jarIndex.includes(cookie.name)) {
        this.jarIndex.push(cookie.name);
      }

      this.jar[cookie.name] = cookie;
    });
  }

  setClient(client: CookieClient) {
    this.client = client;
    this.flush();
    this.hydrate();
  }

  get(key: string): Cookie | null {
    if (!SAFE_OBJECT.whitelist.includes(key)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `Blocked cookie "${key}" from being accessed. If this was intentional, add it to the whitelist.`,
        );
      }
      return null;
    }

    if (this.has(key)) {
      return this.jar[key];
    }

    return null;
  }

  set(key: string, value: string, options: CookieOptions = {}): Cookie | null {
    if (!SAFE_OBJECT.whitelist.includes(key)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `Blocked cookie "${key}" from being set. If this was intentional, add it to the whitelist.`,
        );
      }
      return null;
    }

    const cookie: Cookie = {
      name: key,
      value,
      ...options,
    };

    this.jar[cookie.name] = cookie;
    this.jarIndex.push(cookie.name);
    this.client.set(cookieEncoder(cookie));

    return cookie;
  }

  remove(key: string): Cookie | null {
    if (this.has(key)) {
      this.set(key, 'EXCLUDED', { expires: new Date('01/01/1970') });
      delete this.jar[key];
      this.jarIndex = this.jarIndex.filter((cookie) => cookie !== key);
    }

    return null;
  }

  has(key: string): boolean {
    if (!SAFE_OBJECT.whitelist.includes(key)) {
      return false;
    }
    return this.jarIndex.includes(key);
  }

  protected flush() {
    this.jar = {};
    this.jarIndex = [];
  }

  clear(): boolean {
    this.jarIndex.forEach((cookie) => {
      this.remove(cookie);
    });

    this.flush();

    return true;
  }

  keys(): string[] {
    return [...this.jarIndex];
  }

  key(index: number): Cookie | null {
    return this.jar[this.jarIndex[index]] ?? null;
  }
}
