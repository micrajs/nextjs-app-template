import app from '@micra/application';
import { CacheConfig } from 'app/cache/types';

app.config.set<CacheConfig>('cache', {
  options: {
    // ttl:   1000,
    // max:   Infinity,
  },
});
