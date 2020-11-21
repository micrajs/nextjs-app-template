import app from '@micra/application';
import { Kernel } from '@micra/kernel';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';
import { ApiServiceProvider } from 'app/api';
import { CacheServiceProvider } from 'app/cache';
import { FeatureFlagsServiceProvider } from 'app/feature-flags';
import { LoggerServiceProvider } from 'app/logger';
import { StorageServiceProvider } from 'app/storage';
import { StoreServiceProvider } from 'app/store';
import { ThemeServiceProvider } from 'app/theme';
import { TrackingServiceProvider } from 'app/tracking';
import { TranslationServiceProvider } from 'app/translation';
import type { AppConfig } from 'app/types';

app.config.set<AppConfig>('app', {
  /**
   * Application's name
   * This is used as the base for the application's
   * title and name meta tags.
   */
  name: process.env.APPLICATION_NAME ?? 'Application Name',

  /**
   * Application's URL
   * This variable is used as the canonical URL
   * for the meta tags.
   */
  url: process.env.APPLICATION_URL ?? 'http://localhost:3000',

  /**
   * Application's description
   * This variable is used as the default
   * description the meta tags.
   */
  description: process.env.APP_DESCRIPTION ?? 'Application default description',

  /**
   * Application's type
   * This variable is used as the default
   * og:type meta tags. (https://ogp.me/#types)
   */
  type: process.env.APP_TYPE ?? 'website',

  /**
   * Application's cover image
   * This variable is used as the default
   * cover meta tags.
   */
  coverImage: process.env.APP_COVER ?? '/images/cover.png',

  /**
   * Application's robots
   * This variable is used as the default
   * robots meta tags.
   */
  robots: process.env.APP_ROBOTS ?? 'index, follow',

  /**
   * Application kernel
   */
  kernel: Kernel,

  /**
   * Service container class to be used.
   */
  container: TSyringeServiceContainer,

  /**
   * Service providers
   */
  services: [
    FeatureFlagsServiceProvider,
    TrackingServiceProvider,
    LoggerServiceProvider,
    StoreServiceProvider,
    ThemeServiceProvider,
    TranslationServiceProvider,
    ApiServiceProvider,
    StorageServiceProvider,
    CacheServiceProvider,
  ],
});
