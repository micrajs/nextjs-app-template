/**
 * Scope function
 */
declare const scope: MicraScope;
type MicraScope = <Args extends Array<any> = []>(callback: (...args: Args) => any) => (...args: Args) => any;

/**
 * Global:
 * Extension of the global Global object.
 * This will be available in the
 * server.
 */
declare namespace NodeJS {
  interface Global {
    scope: MicraScope;
  }
}
