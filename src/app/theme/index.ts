import { ServiceProvider } from '@micra/service-provider';

export class ThemeServiceProvider extends ServiceProvider {
  register() {
    this.container.value('theme', {});
  }
}
