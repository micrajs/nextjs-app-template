declare module Micra {
  interface Services {
    'storage/session': import('@micra/storage-wrapper').StorageWrapper;
    'storage/memory': import('@micra/storage-wrapper').StorageWrapper;
    'storage/local': import('@micra/storage-wrapper').StorageWrapper;
    'storage/cookie': import('app/storage/CookieStorage/types').CookieStorage;
  }

  export interface Config {
    'storage': import('app/storage/types').StorageConfig;
  }
}
