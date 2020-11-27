declare namespace Micra {
  interface Services {
    'store/manager': import('app/store/data/helpers/redux-store-manager').ReduxStoreManager;
    'store/saga-registry': import('app/store/redux-saga').SagaRegistry;
    'store/saga': import('redux-saga').SagaMiddleware;
  }

  export interface Config {
    store: import('app/store/types').StoreConfig;
  }
}
