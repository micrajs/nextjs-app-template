declare namespace Micra {
  interface Services {
    cache: import('@brokerloop/ttlcache').TTLCache;
  }

  export interface Config {
    cache: import('app/cache/types').CacheConfig;
  }
}
