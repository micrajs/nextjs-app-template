import { Logger } from '@micra/core';
import * as Sentry from '@sentry/node';

export interface LoggerExtension {
  addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void;
  init(options?: Sentry.NodeOptions | undefined): void;
  critical(...args: string[]): void;
  debug(...args: string[]): void;
  fatal(...args: string[]): void;
}

type NodeOptions = Sentry.NodeOptions;

export class SentryLogger implements Logger<NodeOptions, LoggerExtension> {
  public namespace: string;

  public sentry: typeof Sentry;

  public config = config('logger').options;

  constructor(namespace = '', sentry: typeof Sentry = Sentry) {
    this.sentry = sentry;
    this.namespace = namespace;
  }

  init(): void {
    return this.sentry.init(this.config);
  }

  addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
    return this.sentry.addBreadcrumb(breadcrumb);
  }

  create(namespace: string): Logger<NodeOptions, LoggerExtension> {
    return new SentryLogger(namespace, this.sentry);
  }

  error(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    this.sentry.captureException(new Error(message));
  }

  log(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    this.sentry.captureMessage(message, this.sentry.Severity.Log);
  }

  info(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    this.sentry.captureMessage(message, this.sentry.Severity.Info);
  }

  warn(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    this.sentry.captureMessage(message, this.sentry.Severity.Warning);
  }

  trace(): void {
    //
  }

  critical(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    this.sentry.captureMessage(message, this.sentry.Severity.Critical);
  }

  debug(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    this.sentry.captureMessage(message, this.sentry.Severity.Debug);
  }

  fatal(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    this.sentry.captureMessage(message, this.sentry.Severity.Fatal);
  }
}
