import { SplitFactory } from '@splitsoftware/splitio';
import type { FeatureFlagEvent, FeatureFlags, FlagListener } from 'app/feature-flags/types';
import { deepMerge } from '../helpers/deepMerge';

export class SplitIoFeatureFlags implements FeatureFlags {
  protected paused: boolean;
  protected split: SplitIO.ISDK;
  protected client: SplitIO.IClient;
  protected options: SplitIO.IBrowserSettings;
  protected listeners: Record<FeatureFlagEvent, FlagListener[]> = {
    HYDRATED: [],
    READY: [],
    UPDATE: [],
    TIMEOUT: [],
  };

  constructor(options: SplitIO.IBrowserSettings = config('feature-flags.options')) {
    this.options = options;
    this.split = SplitFactory(options);
    this.client = this.split.client();
    this.start();
  }

  start() {
    this.paused = false;
    const {
      SDK_READY_FROM_CACHE,
      SDK_READY,
      SDK_UPDATE,
      SDK_READY_TIMED_OUT,
    } = this.client.Event;

    this.client.on(SDK_READY_FROM_CACHE, () => {
      if (!this.paused) {
        this.listeners.HYDRATED.forEach(listener => listener(this));
      }
    });
    this.client.on(SDK_READY, () => {
      if (!this.paused) {
        this.listeners.READY.forEach(listener => listener(this));
      }
    });
    this.client.on(SDK_UPDATE, () => {
      if (!this.paused) {
        this.listeners.UPDATE.forEach(listener => listener(this));
      }
    });
    this.client.on(SDK_READY_TIMED_OUT, () => {
      if (!this.paused) {
        this.listeners.TIMEOUT.forEach(listener => listener(this));
      }
    });
  }

  off(event: FeatureFlagEvent, listener: FlagListener) {
    this.listeners[event] = this.listeners[event].filter(
      (registered) => registered !== listener,
    );
  }

  on(event: FeatureFlagEvent, listener: FlagListener) {
    this.listeners[event].push(listener);
    return () => this.off(event, listener);
  }

  flush(event: FeatureFlagEvent) {
    this.listeners[event] = [];
  }

  pause() {
    this.paused = true;
    this.client.destroy();
  }

  get<T extends ReadonlyArray<string> = string[]>(...flags: T): string | Record<T[number], string> {
    if (flags.length === 1) {
      return this.client.getTreatment(flags[0]);
    }

    return this.client.getTreatments(flags as unknown as string[]) as Record<T[number], string>;
  }

  restart<T extends Partial<SplitIO.IBrowserSettings> = Partial<SplitIO.IBrowserSettings>>(options: T = {} as T) {
    this.pause();
    this.split = SplitFactory(deepMerge(this.options, options));
    this.client = this.split.client();
    this.start();
  }
}
