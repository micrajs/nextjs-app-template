declare namespace Micra {
  interface Services {
    logger: import('app/logger/data/SentryLogger').SentryLogger;
  }

  export interface Config {
    logger: import('app/logger/types').LoggerConfig;
  }
}
