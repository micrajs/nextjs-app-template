import { ServiceProvider } from '@micra/service-provider';
import { SplitIoFeatureFlags } from 'app/feature-flags/SplitIoFeatureFlags';
import { onFingerprintGenerated } from 'helpers/onFingerprintGenerated';

export class FeatureFlagsServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('feature-flags', SplitIoFeatureFlags);
  }

  boot() {
    onFingerprintGenerated((fingerprint) => {
      use('feature-flags').restart({
        core: {
          key: fingerprint,
        },
      });
    });
  }
}
