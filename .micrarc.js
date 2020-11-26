const { join } = require('path');

module.exports = {
  providers: [require('./.config/cli/service-providers/PathsServiceProvider')],
  commands: [
    require('./.config/cli/commands/make/MakeCoreModule'),
    require('./.config/cli/commands/make/MakeDomainAction'),
    require('./.config/cli/commands/make/MakeDomainComponent'),
    require('./.config/cli/commands/make/MakeDomainDataSource'),
    require('./.config/cli/commands/make/MakeDomainFactory'),
    require('./.config/cli/commands/make/MakeDomainFeature'),
    require('./.config/cli/commands/make/MakeDomainInterface'),
    require('./.config/cli/commands/make/MakeDomainReducer'),
    require('./.config/cli/commands/make/MakeDomainRegister'),
    require('./.config/cli/commands/make/MakeDomainService'),
    require('./.config/cli/commands/make/MakeDomainServiceProvider'),
    require('./.config/cli/commands/make/MakeDomainValidation'),
    require('./.config/cli/commands/make/MakeHelper'),
    require('./.config/cli/commands/make/MakePage'),
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
        'registerD': join(__dirname, './.config/cli/templates/domains/data/registerD.mustache'),
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
