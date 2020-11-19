import { ServiceProvider } from '@micra/service-provider';
import { SentryLogger } from 'app/logger/SentryLogger';
import { ConsoleLogger } from 'app/logger/ConsoleLogger';

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
