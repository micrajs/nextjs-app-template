declare module Micra {
  interface Services {
    'feature-flags': import('app/feature-flags/types').FeatureFlags;
  }

  export interface Config {
    'feature-flags': import('app/feature-flags/types').FeatureFlagsConfig;
  }
}
