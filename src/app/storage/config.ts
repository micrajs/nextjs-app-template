import app from '@micra/application';
import { StorageConfig } from 'app/storage/types';

app.config.set<StorageConfig>('storage', {
  cookies: {
    /**
     * Whitelisted cookies
     * This is where you can specify which cookies are allowed
     * to be set. Any cookie whose name isn't included
     * will be blocked from being stored.
     */
    whitelist: [],

    /**
     * Optional cookies
     * This is where you can specify which cookies are possible to be
     * accepted. The cookie guard can be used to explicitly
     * include any of these names in the whitelist.
     */
    optional: [],
  },
});
