/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="gtag.js" />

/**
 * Env variables:
 * This defines the available environmental variables
 * accessible through process.env.
 */
interface EnvVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  APP_ENV: 'test' | 'alpha' | 'dev' | 'staging' | 'prod';
  APPLICATION_NAME: string;
  APPLICATION_URL: string;
  APP_DESCRIPTION: string;
  APP_TYPE: string;
  APP_COVER: string;
  APP_ROBOTS: string;
  NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID: string;
  NEXT_PUBLIC_SENTRY_DSN: string;
  SENTRY_ORG: string;
  SENTRY_PROJECT: string;
  SENTRY_AUTH_TOKEN: string;
  NEXT_PUBLIC_SPLIT_IO_KEY: string;
};

/**
 * Google Analytics Data Layer:
 * This is the global data layer used by
 * google analytics.
 */
declare const dataLayer: GADataLayer;
type GADataLayer = any[];

/**
 * Use:
 * This is the global helper that gives access to
 * the service container. It's an easy way to
 * resolve registered services.
 */
declare const use: Use;
type Use = {
  (namespace: 'api/graphql-client'): (endpoint: string) => import('graphql-request').GraphQLClient;
  (namespace: 'logger'): import('app/logger/SentryLogger').SentryLogger;
  (namespace: 'store/manager'): import('app/store/redux-store-manager').ReduxStoreManager;
  (namespace: 'store/saga-registry'): import('app/store/redux-saga').SagaRegistry;
  (namespace: 'store/saga'): import('redux-saga').SagaMiddleware;
  (namespace: 'theme'): import('app/theme/types').Theme;
  (namespace: 'translation'): import('i18next').i18n;
  (namespace: 'tracking/fingerprint'): string;
  (namespace: 'feature-flags'): import('app/feature-flags/types').FeatureFlags;
  <T = any>(namespace: any): T;
};

/**
 * Config:
 * This is the global helper that gives access to the app's
 * configurations. It's an easy way to resolve the
 * registered config for the services.
 */
declare const config: Config;
type Config = {
  (namespace: 'app'): import('app/types').AppConfig;
  (namespace: 'api'): import('app/api/types').ApiConfig;
  (namespace: 'logger'): import('app/logger/types').LoggerConfig;
  (namespace: 'store'): import('app/store/types').StoreConfig;
  (namespace: 'translation'): import('app/translation/types').TranslationConfig;
  (namespace: 'feature-flags'): import('app/feature-flags/types').FeatureFlagsConfig;
  <T = any>(variable: string): T | undefined;
  <T = any>(variable: string, fallback: T): T;
};

/**
 * Window:
 * Extension of the global Window object.
 * This will be available in the
 * browser.
 */
interface Window {
  config: Config;
  use: Use;
  dataLayer: GADataLayer;
  gtag: Gtag.Gtag;
}

/**
 * Global:
 * Extension of the global Global object.
 * This will be available in the
 * server.
 */
declare namespace NodeJS {
  interface ProcessEnv extends EnvVariables {};
  interface Global {
    config: Config;
    use: Use;
  }
}
