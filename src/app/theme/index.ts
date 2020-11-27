import { ServiceProvider } from '@micra/service-provider';
import { theme } from 'app/theme/data/theme';

export class ThemeServiceProvider extends ServiceProvider {
  register() {
    this.container.value('theme', theme);
  }
}
