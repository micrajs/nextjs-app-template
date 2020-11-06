import createSagaMiddleware from 'redux-saga';
import type { Saga } from 'redux-saga';

export const reduxSaga = createSagaMiddleware();

export class SagaRegistry {
  protected sagas: Record<string, Saga> = {};

  protected onEmit: null | ((saga: Saga) => void) = null;

  getSagas() {
    return { ...this.sagas };
  }

  register(name: string, saga: Saga) {
    if (this.sagas[name]) {
      return;
    }
    this.sagas = { ...this.sagas, [name]: saga };
    if (this.onEmit) {
      this.onEmit(saga);
    }
  }

  setChangeListener(listener: SagaRegistry['onEmit']) {
    this.onEmit = listener;
  }
}
