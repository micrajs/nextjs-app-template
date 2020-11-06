import { ServiceProvider } from '@micra/service-provider';
import { SentryLogger } from 'app/logger/SentryLogger';

export class LoggerServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('logger', SentryLogger);
  }

  boot() {
    const logger = use('logger');

    logger.init();
  }
}
