import { cookieEncoder } from 'app/storage/CookieStorage/cookieEncoder';
import { cookieParser } from 'app/storage/CookieStorage/cookieParser';
import {
  Cookie,
  CookieStorage,
  CookieOptions,
  CookieClient,
} from 'app/storage/CookieStorage/types';

export class CookieStorageWrapper implements CookieStorage {
  protected client: CookieClient;

  protected jarIndex: Cookie['name'][] = [];

  protected jar: Record<Cookie['name'], Cookie> = {};

  constructor(client: CookieClient) {
    this.client = client;
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
    if (this.has(key)) {
      return this.jar[key];
    }

    return null;
  }

  set(key: string, value: string, options: CookieOptions = {}): Cookie {
    const cookie: Cookie = {
      name: key,
      value,
      secure: false,
      httpOnly: false,
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
    return this.jarIndex.includes(key);
  }

  protected flush() {
    this.jar = {};
    this.jarIndex = [];
  }

  clear(): boolean {
    this.flush();
    this.client.set('');

    return true;
  }

  keys(): string[] {
    return [...this.jarIndex];
  }

  key(index: number): Cookie | null {
    return this.jar[this.jarIndex[index]] ?? null;
  }
}
