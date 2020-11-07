import { StorageWrapper } from '@micra/storage-wrapper';
import { ServiceProvider } from '@micra/service-provider';
import { InMemoryStorage } from '@micra/in-memory-storage';
import { CookieStorageWrapper } from 'app/storage/CookieStorage';
import { getCookieClient } from 'app/storage/CookieStorage/helpers/getCookieClient';

export class StorageServiceProvider extends ServiceProvider {
  register() {
    this.container.value('storage/memory', new StorageWrapper(new InMemoryStorage()));
    this.container.value(
      'storage/local',
      new StorageWrapper(process.browser ? window.localStorage : new InMemoryStorage()),
    );
    this.container.value(
      'storage/session',
      new StorageWrapper(process.browser ? window.sessionStorage : new InMemoryStorage()),
    );
    this.container.value('storage/cookie', new CookieStorageWrapper(getCookieClient()));
  }
}
