/* eslint-disable no-restricted-globals */
import { Cookie } from 'app/storage/CookieStorage/types';
import { SAME_SITE_VALUES } from 'app/storage/CookieStorage/constants';
import { charValidation } from 'app/storage/CookieStorage/helpers/charValidation';

export const cookieEncoder = (cookie: Cookie): string => {
  if (!charValidation.test(cookie.name)) {
    throw new TypeError('Invalid cookie name');
  }

  if (cookie.value && !charValidation.test(cookie.value)) {
    throw new TypeError('Invalid cookie value');
  }

  const encoded = [`${cookie.name}=${encodeURIComponent(cookie.value)}`];

  if (cookie.path) {
    if (!charValidation.test(cookie.path)) {
      throw new TypeError('Invalid cookie path');
    }

    encoded.push(`Path=${cookie.path}`);
  }

  if (cookie.secure) {
    encoded.push('Secure');
  }

  if (cookie.domain) {
    if (!charValidation.test(cookie.domain)) {
      throw new TypeError('Invalid cookie domain');
    }

    encoded.push(`Domain=${cookie.domain}`);
  }

  if (cookie.httpOnly) {
    encoded.push('HttpOnly');
  }

  if (!isNaN(cookie.maxAge) && isFinite(cookie.maxAge) && cookie.maxAge > -1) {
    encoded.push(`Max-Age=${Math.floor(cookie.maxAge)}`);
  }

  if (cookie.expires && typeof cookie.expires.toUTCString === 'function') {
    encoded.push(`Expires=${cookie.expires.toUTCString()}`);
  }

  if (cookie.sameSite && SAME_SITE_VALUES.includes(cookie.sameSite)) {
    encoded.push(`SameSite=${cookie.sameSite.charAt(0).toUpperCase() + cookie.sameSite.slice(1)}`);
  }

  return encoded.join('; ');
};
