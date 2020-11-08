import { StorageWrapper } from '@micra/storage-wrapper';
import { ServiceProvider } from '@micra/service-provider';
import { InMemoryStorage } from '@micra/in-memory-storage';
import { CookieStorageWrapper } from 'app/storage/CookieStorage';
import { getCookieClient } from 'app/storage/CookieStorage/helpers/getCookieClient';
import { CookieGuard } from './CookieGuard';

export class StorageServiceProvider extends ServiceProvider {
  register() {
    /**
     * In memory storage
     * This type of storage is very ephemeral and gets lost upon
     * page refresh.
     */
    this.container.value('storage/memory', new StorageWrapper(new InMemoryStorage()));

    /**
     * Session storage
     * This type of storage is persisted while the window is not
     * closed. The data is kept in the client's browser if
     * the tab is refreshed.
     */
    this.container.value(
      'storage/session',
      new StorageWrapper(process.browser ? window.sessionStorage : new InMemoryStorage()),
    );

    /**
     * Local storage
     * This type of storage is the most persistent one. This is persisted
     * in the client's browser even after the window is closed.
     */
    this.container.value(
      'storage/local',
      new StorageWrapper(process.browser ? window.localStorage : new InMemoryStorage()),
    );

    /**
     * Cookie storage
     * Cookies are a useful way to traffic information between the client
     * and the server.
     */
    this.container.value('storage/cookie', new CookieStorageWrapper(getCookieClient()));

    /**
     * Cookie guard
     * This class guards the cookies and blocks unwanted/unauthorized cookies
     * from being set. This allows us to explicitly ask users to accept
     * and opt-in cookies.
     */
    this.container.value('storage/cookie-guard', new CookieGuard(config('storage.cookies')));
  }
}
