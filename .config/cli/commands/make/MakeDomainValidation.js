const { existsSync } = require('fs');

const MakeDomainValidation = {
  command: 'make:domain-validation',
  description: 'Generate a new domain validation',
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
      name: 'factory',
      alias: 'fac',
      description: 'Should create a factory',
      default: false,
    },
  ],
  async handler({ createFile, parser, template, variationsOf, defaultVariables, exit }) {
    try {
      const { domains } = use('paths/helpers');
      // Params
      const RAW_DOMAIN = parser.getArgument(0).value;
      const RAW_NAME = parser.getArgument(1).value;
      const FORCE = parser.getOption('force').value;
      const FACTORY = parser.getOption('factory').value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const NAME = variationsOf(RAW_NAME);
      const PATH_TO_INTERFACE = domains(DOMAIN.SINGULAR.KEBAB, `types/common/${NAME.PASCAL}.ts`);
      const PATH_TO_FACTORY = domains(DOMAIN.SINGULAR.KEBAB, `testing/factories/${NAME.PASCAL}Factory.ts`);
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(DOMAIN.SINGULAR.KEBAB, `data/validations/validate${NAME.PASCAL}.ts`),
          template('domains.data.validation'),
        ],
      ];

      if (!existsSync(PATH_TO_INTERFACE)) {
        FILES.push([PATH_TO_INTERFACE, template('domains.types.interface')]);
      }

      if (FACTORY && !existsSync(PATH_TO_FACTORY)) {
        FILES.push([PATH_TO_FACTORY, template('domains.testing.factory')]);
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

module.exports = MakeDomainValidation;
