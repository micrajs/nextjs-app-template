import app from '@micra/application';
import { StoreConfig } from 'app/store/types';
import { reduxSaga } from 'app/store/redux-saga';

app.config.set<StoreConfig>('store', {
  initialState: {},

  middlewares: [reduxSaga],

  reducers: {},
});
