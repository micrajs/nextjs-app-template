import i18n from 'i18next';
import { ServiceProvider } from '@micra/service-provider';

export class TranslationServiceProvider extends ServiceProvider {
  register() {
    this.container.value('translation', i18n);
  }

  boot() {
    const translation = use('translation');
    const translationConfig = config('translation');

    // Initialize plugins
    translationConfig.plugins.forEach((plugin) => translation.use(plugin));

    // Initialize service
    translation.init(translationConfig.options);
  }
}
