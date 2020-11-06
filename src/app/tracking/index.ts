import { ServiceProvider } from '@micra/service-provider';
import { getFingerprint } from './helpers/getFingerprint';

export class TrackingServiceProvider extends ServiceProvider {
  register() {
    getFingerprint(this.container.value('tracking/fingerprint', ''));
  }
}
