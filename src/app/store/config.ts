import app from '@micra/application';
import { StoreConfig } from 'app/store/types';
import ReduxThunk from 'redux-thunk';

app.config.set<StoreConfig>('store', {
  initialState: {},

  middlewares: [ReduxThunk],

  reducers: {},
});
