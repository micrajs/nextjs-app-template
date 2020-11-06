import app from '@micra/application';
import { ApiConfig } from 'app/api/types';

app.config.set<ApiConfig>('api', {
  clients: {
    graphql: {
      //
    },
  },
});
