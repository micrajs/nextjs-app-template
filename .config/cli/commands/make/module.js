const MakeHelper = {
  command: 'make:module',
  description: 'Generate a new core module',
  arguments: [
    {
      name: 'name',
      description: 'Module name.',
      required: true,
    },
  ],
  options: [
    {
      name: 'force',
      alias: 'f',
      description: 'Should overwrite file if it exists',
      default: false,
    },
  ],
  async handler({ createFile, parser, template, variationsOf, defaultVariables }) {
    try {
      const { app } = use('paths/helpers');
      // Params
      const RAW_NAME = parser.getArgument(0)?.value;
      const FORCE = parser.getOption('force')?.value;

      // Definition
      const NAME = variationsOf(RAW_NAME);
      const FILES = [
        // [PATH, TEMPLATE]
        [app(NAME.KEBAB, `config.ts`), template('module.config')],
        [app(NAME.KEBAB, `index.ts`), template('module.index')],
        [app(NAME.KEBAB, `types.ts`), template('module.types')],
        [app(NAME.KEBAB, `${NAME.KEBAB}.register.d.ts`), template('module.register')],
      ];

      // Generate files
      FILES.forEach(([path, template]) => {
        createFile(
          path,
          use('TemplateEngine').render(
            template,
            defaultVariables({ NAME }),
          ),
          FORCE,
        );
      });
    } catch (e) {
      if (e.message.endsWith('already exists.')) {
        throw new Error(
          `${e.message} Please choose a different name, path or use the --force flag to overwrite the existing file.`,
        );
      }

      throw e;
    }
  },
};

module.exports = MakeHelper;
