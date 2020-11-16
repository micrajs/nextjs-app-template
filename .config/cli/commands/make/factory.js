const { existsSync } = require('fs');

const MakeFactory = {
  command: 'make:factory',
  description: 'Generate a new domain factory',
  arguments: [
    {
      name: 'domain',
      description: 'Domain name.',
      required: true,
    },
    {
      name: 'interface',
      description: 'Interface name.',
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
      const { domains } = use('paths/helpers');
      // Params
      const RAW_DOMAIN = parser.getArgument(0)?.value;
      const RAW_NAME = parser.getArgument(1)?.value;
      const FORCE = parser.getOption('force')?.value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const NAME = variationsOf(RAW_NAME);
      const PATH_TO_INTERFACE = domains(DOMAIN.SINGULAR.KEBAB, `types/common/${NAME.PASCAL}.ts`);
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(DOMAIN.SINGULAR.KEBAB, `testing/factories/${NAME.PASCAL}Factory.ts`),
          template('domains.testing.factory'),
        ],
      ];

      if (!existsSync(PATH_TO_INTERFACE)) {
        FILES.push([PATH_TO_INTERFACE, template('domains.types.interface')]);
      }

      // Generate files
      FILES.forEach(([path, template]) => {
        createFile(
          path,
          use('TemplateEngine').render(
            template,
            defaultVariables({
              NAME,
              DOMAIN,
            }),
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

module.exports = MakeFactory;
