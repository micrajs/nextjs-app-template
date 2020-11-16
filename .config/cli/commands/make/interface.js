const { existsSync } = require('fs');

const MakeInterface = {
  command: 'make:interface',
  description: 'Generate a new domain interface',
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
    {
      name: 'directory',
      alias: 'd',
      description: 'Directory in which the interface should be created',
      default: 'common',
    },
  ],
  async handler({ createFile, parser, template, variationsOf, defaultVariables }) {
    try {
      const { domains } = use('paths/helpers');
      // Params
      const RAW_DOMAIN = parser.getArgument(0)?.value;
      const RAW_NAME = parser.getArgument(1)?.value;
      const FORCE = parser.getOption('force')?.value;
      const RAW_DIR = parser.getOption('directory')?.value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const NAME = variationsOf(RAW_NAME);
      const DIR = typeof RAW_DIR === 'string' ? variationsOf(RAW_DIR) : undefined;
      const DIRNAME = [DIR?.KEBAB, NAME.PASCAL].filter(Boolean).join('/');
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(DOMAIN.SINGULAR.KEBAB, `types/${DIRNAME}.ts`),
          template('domains.types.interface'),
        ],
      ];

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

module.exports = MakeInterface;
