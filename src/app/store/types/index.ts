import { ReducersMapObject, Middleware } from 'redux';

export interface StoreConfig<S = Record<string, unknown>> {
  middlewares: Middleware[];
  reducers: ReducersMapObject;
  initialState: S;
}
