import { ServiceProvider } from '@micra/service-provider';
import { ReduxStoreManager } from 'app/store/data/helpers/redux-store-manager';
import type { Saga } from 'redux-saga';

export class StoreServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('store/manager', ReduxStoreManager);
  }

  boot() {
    const storeConfig = config('store');
    const storeManager = use('store/manager');

    storeManager.init(storeConfig);
  }
}
