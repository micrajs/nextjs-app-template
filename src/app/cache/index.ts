import { TTLCache } from '@brokerloop/ttlcache';
import { ServiceProvider } from '@micra/service-provider';

export class CacheServiceProvider extends ServiceProvider {
  register() {
    const cacheConfig = config('cache');
    this.container.value('cache', new TTLCache(cacheConfig.options));
  }
}
