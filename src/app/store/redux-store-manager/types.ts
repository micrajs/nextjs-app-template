import { Action, Reducer, ReducersMapObject, Store } from 'redux';
import { StoreConfig } from 'app/store/types';

export interface StoreManager<S = any> {
  store: Store;
  getReducers(): ReducersMapObject;
  add(key: keyof S, reducer: Reducer): this;
  remove(key: keyof S): this;
  reduce(state: S | undefined, action: Action): Reducer;
  init(config: StoreConfig): this;
}
