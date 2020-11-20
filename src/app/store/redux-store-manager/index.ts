/* eslint-disable no-param-reassign */
import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  ReducersMapObject,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { StoreConfig } from 'app/store/types';
import { StoreManager } from 'app/store/redux-store-manager/types';

export class ReduxStoreManager implements StoreManager {
  public store!: Store;

  protected combinedReducer: Reducer;

  protected reducers: ReducersMapObject;

  protected keysToRemove: (keyof ReduxStoreManager['reducers'])[] = [];

  constructor() {
    this.reducers = { version: () => 'v0.0.1' };
    this.combinedReducer = combineReducers(this.reducers);
  }

  protected cleanUp(state: Record<string, unknown>) {
    if (this.keysToRemove.length > 0) {
      state = { ...state };
      const keys = Object.keys(state);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        delete state[key];
      }
      this.keysToRemove = [];
    }
  }

  getReducers() {
    return this.reducers;
  }

  reduce(state: Record<string, unknown>, action: Action) {
    this.cleanUp(state);
    return this.combinedReducer(state, action);
  }

  add(key: string, reducer: Reducer) {
    if (!key || this.reducers[key]) {
      return this;
    }

    this.reducers[key] = reducer;

    this.combinedReducer = combineReducers(this.reducers);
    this.store.dispatch({ type: `init/${key}` });

    return this;
  }

  remove(key: string) {
    if (!key || !this.reducers[key]) {
      return this;
    }

    delete this.reducers[key];
    this.keysToRemove.push(key);
    this.combinedReducer = combineReducers(this.reducers);
    return this;
  }

  init({ initialState = {}, middlewares = [], reducers }: StoreConfig) {
    this.store = createStore(
      this.reduce.bind(this),
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares)),
    );

    if (reducers && Object.keys(reducers).length > 0) {
      Object.keys(reducers).forEach((key) => {
        this.reducers[key] = reducers[key];
      });
      this.combinedReducer = combineReducers(this.reducers);
      this.store.dispatch({ type: 'init/store' });
    }

    return this;
  }
}
