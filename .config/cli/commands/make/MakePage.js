const MakePage = {
  command: 'make:page',
  description: 'Generate a new page',
  arguments: [
    {
      name: 'name',
      description: 'Page name.',
      required: true,
    },
    {
      name: 'pathname',
      description: 'Page pathname.',
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
      const { pages, routes } = use('paths/helpers');
      // Params
      const RAW_NAME = parser.getArgument(0).value;
      const PATHNAME = parser.getArgument(1).value;
      const FORCE = parser.getOption('force').value;

      // Definition
      const NAME = variationsOf(RAW_NAME);
      const CAPITALIZED = NAME.CAPITALIZED;
      const FILES = [
        // [PATH, TEMPLATE]
        [routes(CAPITALIZED, `${CAPITALIZED}Page.tsx`), template('page.component')],
        [routes(CAPITALIZED, `index.ts`), template('page.index')],
        [routes(CAPITALIZED, `use${CAPITALIZED}Page.ts`), template('page.setup-hook')],
        [routes(CAPITALIZED, `types.ts`), template('page.types')],
        [pages(PATHNAME, `index.ts`), template('page.definition')],
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

module.exports = MakePage;
