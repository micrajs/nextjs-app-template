import { ServiceProvider } from '@micra/service-provider';
import { SentryLogger } from 'app/logger/data/SentryLogger';
import { ConsoleLogger } from 'app/logger/data/ConsoleLogger';

export class LoggerServiceProvider extends ServiceProvider {
  register() {
    if (process.env.NODE_ENV === 'test') {
      this.container.value('logger', new ConsoleLogger());
    } else {
      this.container.singleton('logger', SentryLogger);
    }
  }

  boot() {
    const logger = use('logger');

    logger.init();
  }
}
