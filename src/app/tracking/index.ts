import { ServiceProvider } from '@micra/service-provider';
import { onFingerprintGenerated } from 'helpers/onFingerprintGenerated';
import { getFingerprint } from './helpers/getFingerprint';

export class TrackingServiceProvider extends ServiceProvider {
  register() {
    getFingerprint(this.container.value('tracking/fingerprint', ''));
  }

  boot() {
    onFingerprintGenerated((fingerprint) => {
      use('storage/cookie').set('session_id', fingerprint);
    });
  }
}
