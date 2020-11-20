export type FeatureFlagEvent = 'HYDRATED' | 'READY' | 'UPDATE' | 'TIMEOUT';

export type FlagListener = (client: FeatureFlags) => void;

export type FeatureFlagEventUnsubscribe = () => void;

export interface FeatureFlags {
  get<T extends ReadonlyArray<string> = string[]>(...flags: T): string | Record<T[number], string>;
  on(event: FeatureFlagEvent, listener: FlagListener): FeatureFlagEventUnsubscribe;
  off(event: FeatureFlagEvent, listener: FlagListener): void;
  flush(event: FeatureFlagEvent): void;
  restart<T extends Record<string, unknown> = Record<string, unknown>>(options?: T): void;
  start(): void;
  pause(): void;
}

export interface FeatureFlagsConfig {
  options: SplitIO.IBrowserSettings;
}
