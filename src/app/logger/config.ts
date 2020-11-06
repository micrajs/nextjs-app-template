import app from '@micra/application';
import { LoggerConfig } from 'app/logger/types';

app.config.set<LoggerConfig>('logger', {
  options: {
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? 'MISSING SENTRY DSN',
  },
});
