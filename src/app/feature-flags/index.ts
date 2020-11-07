import { ServiceProvider } from '@micra/service-provider';
import { SplitIoFeatureFlags } from 'app/feature-flags/SplitIoFeatureFlags';
import { restartWithFingerprint } from 'app/feature-flags/helpers/restartWithFingerprint';

export class FeatureFlagsServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('feature-flags', SplitIoFeatureFlags);
  }

  boot() {
    restartWithFingerprint();
  }
}
