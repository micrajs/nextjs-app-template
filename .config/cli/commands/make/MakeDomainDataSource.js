const MakeDomainDataSource = {
  command: 'make:domain-data-source',
  description: 'Generate a new domain data source',
  arguments: [
    {
      name: 'domain',
      description: 'Domain name.',
      required: true,
    },
    {
      name: 'data-source',
      description: 'Data source name.',
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
      const RAW_NAME = parser.getArgument(1).value;
      const FORCE = parser.getOption('force').value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const NAME = variationsOf(RAW_NAME);
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `data/data-sources/${NAME.PASCAL}GraphQLDataSource.ts`,
          ),
          template('domains.data.data-source'),
        ],
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `types/data-sources/${NAME.PASCAL}DataSource.ts`,
          ),
          template('domains.types.data-source'),
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

module.exports = MakeDomainDataSource;
