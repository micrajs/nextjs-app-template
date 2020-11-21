const { join } = require('path');

module.exports = {
  providers: [require('./.config/cli/service-providers/PathsServiceProvider')],
  commands: [
    require('./.config/cli/commands/make/module'),
    require('./.config/cli/commands/make/helper'),
    require('./.config/cli/commands/make/page'),
    require('./.config/cli/commands/make/component'),
    require('./.config/cli/commands/make/feature'),
    require('./.config/cli/commands/make/data-source'),
    require('./.config/cli/commands/make/service'),
    require('./.config/cli/commands/make/factory'),
    require('./.config/cli/commands/make/validation'),
    require('./.config/cli/commands/make/action'),
    require('./.config/cli/commands/make/interface'),
    require('./.config/cli/commands/make/reducer'),
    require('./.config/cli/commands/make/service-provider'),
  ],
  template: {
    domains: {
      experience: {
        component: join(__dirname, './.config/cli/templates/domains/experience/component.mustache'),
        styles: join(__dirname, './.config/cli/templates/domains/experience/styles.mustache'),
        types: join(__dirname, './.config/cli/templates/domains/experience/types.mustache'),
        'setup-hook': join(
          __dirname,
          './.config/cli/templates/domains/experience/setup-hook.mustache',
        ),
        feature: join(__dirname, './.config/cli/templates/domains/experience/feature.mustache'),
      },
      data: {
        'data-source': join(__dirname, './.config/cli/templates/domains/data/data-source.mustache'),
        'service-provider': join(
          __dirname,
          './.config/cli/templates/domains/data/service-provider.mustache',
        ),
        service: join(__dirname, './.config/cli/templates/domains/data/service.mustache'),
        validation: join(__dirname, './.config/cli/templates/domains/data/validation.mustache'),
        action: join(__dirname, './.config/cli/templates/domains/data/action.mustache'),
        reducer: join(__dirname, './.config/cli/templates/domains/data/reducer.mustache'),
        'main-reducer': join(
          __dirname,
          './.config/cli/templates/domains/data/main-reducer.mustache',
        ),
      },
      testing: {
        factory: join(__dirname, './.config/cli/templates/domains/testing/factory.mustache'),
      },
      types: {
        interface: join(__dirname, './.config/cli/templates/domains/types/interface.mustache'),
        service: join(__dirname, './.config/cli/templates/domains/types/service.mustache'),
        action: join(__dirname, './.config/cli/templates/domains/types/action.mustache'),
        actions: join(__dirname, './.config/cli/templates/domains/types/actions.mustache'),
        store: join(__dirname, './.config/cli/templates/domains/types/store.mustache'),
        'data-source': join(
          __dirname,
          './.config/cli/templates/domains/types/data-source.mustache',
        ),
      },
    },
    module: {
      config: join(__dirname, './.config/cli/templates/module/config.mustache'),
      index: join(__dirname, './.config/cli/templates/module/index.mustache'),
      types: join(__dirname, './.config/cli/templates/module/types.mustache'),
      register: join(__dirname, './.config/cli/templates/module/register.mustache'),
    },
    helper: {
      index: join(__dirname, './.config/cli/templates/helper/index.mustache'),
    },
    page: {
      component: join(__dirname, './.config/cli/templates/page/component.mustache'),
      definition: join(__dirname, './.config/cli/templates/page/definition.mustache'),
      index: join(__dirname, './.config/cli/templates/page/index.mustache'),
      'setup-hook': join(__dirname, './.config/cli/templates/page/setup-hook.mustache'),
      types: join(__dirname, './.config/cli/templates/page/types.mustache'),
    },
  },
  paths: {
    root: join(process.cwd(), 'src'),
    pages: join(process.cwd(), 'pages'),
    app: join(process.cwd(), 'src/app'),
    domains: join(process.cwd(), 'src/domains'),
    helpers: join(process.cwd(), 'src/helpers'),
    routes: join(process.cwd(), 'src/routes'),
  },
};
