const MakeDomainRegister = {
  command: 'make:domain-register',
  description: 'Generate a new domain type registration',
  arguments: [
    {
      name: 'domain',
      description: 'Domain name.',
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
      const RAW_DOMAIN = parser.getArgument(0).value;
      const FORCE = parser.getOption('force').value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `data/${DOMAIN.KEBAB}.register.d.ts`,
          ),
          template('domains.data.registerD'),
        ],
      ];

      // Generate files
      FILES.forEach(([path, template]) => {
        createFile(
          path,
          use('TemplateEngine').render(
            template,
            defaultVariables({
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

module.exports = MakeDomainRegister;
