/* eslint-disable no-restricted-globals */
import { SAME_SITE_VALUES } from 'app/storage/CookieStorage/constants';
import type { Cookie, CookieAttributeHandler } from 'app/storage/CookieStorage/types';

export const attributeHandlers: CookieAttributeHandler[] = [
  {
    check(key: string) {
      return key.toLowerCase() === 'path';
    },
    setValue(cookie: Cookie, value: string) {
      return {
        ...cookie,
        path: value,
      };
    },
  },
  {
    check(key: string) {
      return key.toLowerCase() === 'secure';
    },
    setValue(cookie: Cookie) {
      return {
        ...cookie,
        secure: true,
      };
    },
  },
  {
    check(key: string) {
      return key.toLowerCase() === 'domain';
    },
    setValue(cookie: Cookie, value: string) {
      return {
        ...cookie,
        domain: value,
      };
    },
  },
  {
    check(key: string) {
      return key.toLowerCase() === 'httponly';
    },
    setValue(cookie: Cookie) {
      return {
        ...cookie,
        httpOnly: true,
      };
    },
  },
  {
    check(key: string) {
      return key.toLowerCase() === 'max-age';
    },
    setValue(cookie: Cookie, value: string) {
      if (isNaN(Number(value)) || !isFinite(Number(value))) {
        throw TypeError('Invalid max age cookie attribute');
      }

      return {
        ...cookie,
        maxAge: Number(value),
      };
    },
  },
  {
    check(key: string) {
      return key.toLowerCase() === 'expires';
    },
    setValue(cookie: Cookie, value: string) {
      return {
        ...cookie,
        expires: new Date(value),
      };
    },
  },
  {
    check(key: string) {
      return key.toLowerCase() === 'samesite';
    },
    setValue(cookie: Cookie, value: string) {
      if (!SAME_SITE_VALUES.includes(value.toLowerCase())) {
        return cookie;
      }

      return {
        ...cookie,
        sameSite: value.toLowerCase() as Cookie['sameSite'],
      };
    },
  },
];
