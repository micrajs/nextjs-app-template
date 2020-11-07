import type { NextPageContext } from 'next';

export const getCookieClient = (appContext?: NextPageContext) => {
  if (process.browser) {
    return {
      get: () => document.cookie,
      set: (value: string) => {
        document.cookie = value;
      },
    };
  }

  if (appContext) {
    return {
      get: () => appContext?.req.headers.cookie ?? '',
      set: (value: string) => appContext?.res.setHeader('Set-Cookie', value),
    };
  }

  return {
    get: () => '',
    set: (value: string) => value,
  };
};
