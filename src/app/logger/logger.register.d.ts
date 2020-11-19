declare module Micra {
  interface Services {
    'logger': import('app/logger/SentryLogger').SentryLogger;
  }

  export interface Config {
    'logger': import('app/logger/types').LoggerConfig;
  }
}
