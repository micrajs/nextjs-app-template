/* eslint-disable no-continue */
import { attributeHandlers } from 'app/storage/CookieStorage/attributeHandlers';
import type { Cookie } from 'app/storage/CookieStorage/types';

export const cookieParser = (definition: string): Cookie[] => {
  const cookies: Cookie[] = [];
  const pairs = definition.replace(/\s+/g, ' ').trim().split(/; */);

  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i];
    const equalsIndex = pair.indexOf('=') > 0 ? pair.indexOf('=') : pair.length;
    const key = pair.substr(0, equalsIndex).trim();
    const value = pair.substr(equalsIndex + 1, pair.length).trim();

    const attribute = attributeHandlers.find((handler) => handler.check(key));
    if (attribute) {
      if (cookies.length > 0) {
        const cookie = cookies.pop();
        cookies.push(attribute.setValue(cookie, value));
      }

      continue;
    }

    if (!value) {
      continue;
    }

    if (!cookies.find((cookie) => cookie.name === key)) {
      try {
        cookies.push({
          name: key,
          value: value[0] === '"' ? value.slice(1, -1) : decodeURIComponent(value),
        });
      } catch (e) {
        cookies.push({
          value,
          name: key,
        });
      }
    }
  }

  return cookies;
};
