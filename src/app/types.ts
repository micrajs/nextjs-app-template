import type { AppConfig as BaseAppConfig } from '@micra/application';

export type AppConfig = BaseAppConfig & {
  name: string;
  url: string;
  description: string;
  type: string;
  coverImage: string;
  robots: string;
};
