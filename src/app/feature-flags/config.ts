import app from '@micra/application';
import { FeatureFlagsConfig } from 'app/feature-flags/types';

app.config.set<FeatureFlagsConfig>('feature-flags', {
  options: {
    core: {
      authorizationKey: process.env.NEXT_PUBLIC_SPLIT_IO_KEY,
      key: 'anonymous',
    }
  },
});
