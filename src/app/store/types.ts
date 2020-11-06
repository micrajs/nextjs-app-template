import { ReducersMapObject, Middleware } from 'redux';

export interface StoreConfig<S = Record<string, any>> {
  middlewares: Middleware[];
  reducers: ReducersMapObject;
  initialState: S;
}

export type ID = number;
