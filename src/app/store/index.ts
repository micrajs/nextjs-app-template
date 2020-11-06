import { ServiceProvider } from '@micra/service-provider';
import { reduxSaga, SagaRegistry } from 'app/store/redux-saga';
import { ReduxStoreManager } from 'app/store/redux-store-manager';
import type { Saga } from 'redux-saga';

export class StoreServiceProvider extends ServiceProvider {
  register() {
    this.container.value('store/saga', reduxSaga);
    this.container.singleton('store/manager', ReduxStoreManager);
    this.container.singleton('store/saga-registry', SagaRegistry);
  }

  boot() {
    const storeConfig = config('store');
    const storeManager = use('store/manager');
    const sagaRegistry = use('store/saga-registry');

    storeManager.init(storeConfig);
    sagaRegistry.setChangeListener((saga: Saga) => {
      reduxSaga.run(saga);
    });
  }
}
