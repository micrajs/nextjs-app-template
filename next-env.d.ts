/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="gtag.js" />

/**
 * Micra default global definitions
 */
declare namespace Micra {
  interface Services {
    'app': import('@micra/application').Application;
    'config': import('@micra/config').Config;
    'container': import('@micra/tsyringe-service-container').TSyringeServiceContainer;
  }
  interface Config {
    'app': import('app/types').AppConfig;
  }
}

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
type Use = <K extends keyof Micra.Services>(namespace: K) => Micra.Services[K];

/**
 * Config:
 * This is the global helper that gives access to the app's
 * configurations. It's an easy way to resolve the
 * registered config for the services.
 */
declare const config: Config;
type Config = <K extends keyof Micra.Config, R extends Micra.Config[K]>(namespace: K, fallback?: R) => R;

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
    scope: MicraScope;
  }
}
