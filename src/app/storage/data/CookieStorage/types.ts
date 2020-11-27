export interface CookieAttributeHandler {
  check(key: string): boolean;
  setValue(cookie: Cookie, value: string): Cookie;
}

export type CookieSameSite = 'none' | 'lax' | 'strict';

export interface Cookie {
  domain?: string;
  expires?: Date;
  maxAge?: number;
  httpOnly?: boolean;
  name: string;
  path?: string;
  secure?: boolean;
  sameSite?: CookieSameSite;
  value: string;
}

export interface CookieOptions {
  domain?: string;
  expires?: Date;
  maxAge?: number;
  httpOnly?: boolean;
  path?: string;
  secure?: boolean;
  sameSite?: CookieSameSite;
}

export interface CookieClient {
  get(): string;
  set(value: string): void;
}

export interface CookieStorage {
  get(key: string): Cookie | null;
  set(key: string, value: string, options?: CookieOptions): Cookie;
  remove(key: string): Cookie | null;
  has(key: string): boolean;
  clear(): boolean;
  keys(): Cookie['name'][];
  key(index: number): Cookie | null;
  setClient(client: CookieClient): void;
}
