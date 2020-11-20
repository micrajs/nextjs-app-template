/* eslint-disable no-console */
import { Logger } from '@micra/core';

export interface LoggerExtension {
  addBreadcrumb(breadcrumb: unknown): void;
  init(options?: unknown | undefined): void;
  critical(...args: string[]): void;
  debug(...args: string[]): void;
  fatal(...args: string[]): void;
}

export class ConsoleLogger implements Logger<unknown, LoggerExtension> {
  public namespace: string;

  public config = {};

  constructor(namespace = '') {
    this.namespace = namespace;
  }

  init(): void {
    //
  }

  addBreadcrumb(): void {
    //
  }

  create(namespace: string): Logger<unknown, LoggerExtension> {
    return new ConsoleLogger(namespace);
  }

  error(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.error(new Error(message));
  }

  log(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.log(message);
  }

  info(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.info(message);
  }

  warn(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.warn(message);
  }

  trace(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.trace(message);
  }

  critical(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.error(message);
  }

  debug(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.debug(message);
  }

  fatal(...args: string[]): void {
    const namespace = this.namespace ? `[${this.namespace}] ` : '';
    const message = `${namespace}${args.join(' ')}`;
    console.error(message);
  }
}
