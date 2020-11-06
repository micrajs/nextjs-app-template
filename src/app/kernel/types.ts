import type { Router } from 'next/router';
import type { ErrorProps } from 'next/error';
import type { AppProps as BaseAppProps } from 'next/app';

export interface MetaProps {
  title?: string;
  description?: string;
  robots?: string;
  cover?: string;
  type?: string;
}

export interface ProvidersProps {
  children: React.ReactNode;
}

export interface ErrorComponentProps extends ErrorProps {
  err?: Error;
  hasGetInitialPropsRun?: boolean;
}

export type PageComponentProps<T extends Record<string, any> = {}> = T & {
  err?: Error;
  router: Router;
  meta?: MetaProps;
}

export interface AppProps extends BaseAppProps<PageComponentProps> {
  err?: Error;
}
