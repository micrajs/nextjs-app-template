const { join } = require('path');

module.exports = {
  providers: [
    require('./.config/cli/service-providers/PathsServiceProvider'),
  ],
  commands: [
    require('./.config/cli/commands/make/module'),
    require('./.config/cli/commands/make/helper'),
    require('./.config/cli/commands/make/page'),
  ],
  template: {
    module: {
      config: join(__dirname, './.config/cli/templates/module/config.mustache'),
      index: join(__dirname, './.config/cli/templates/module/index.mustache'),
      types: join(__dirname, './.config/cli/templates/module/types.mustache'),
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
