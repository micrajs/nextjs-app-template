const MakePage = {
  command: 'make:component',
  description: 'Generate a new domain component',
  arguments: [
    {
      name: 'domain',
      description: 'Domain name.',
      required: true,
    },
    {
      name: 'component',
      description: 'Component name.',
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
  async handler({ createFile, parser, template, variationsOf, defaultVariables, exit }) {
    try {
      const { domains } = use('paths/helpers');
      // Params
      const RAW_DOMAIN = parser.getArgument(0)?.value;
      const RAW_COMPONENT = parser.getArgument(1)?.value;
      const FORCE = parser.getOption('force')?.value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const COMPONENT = variationsOf(RAW_COMPONENT);
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(
            DOMAIN.SINGULAR.LOWERCASE,
            `experience/components/${COMPONENT.PASCAL}/index.tsx`,
          ),
          template('domains.experience.component'),
        ],
        [
          domains(
            DOMAIN.SINGULAR.LOWERCASE,
            `experience/components/${COMPONENT.PASCAL}/styles.ts`,
          ),
          template('domains.experience.styles'),
        ],
        [
          domains(
            DOMAIN.SINGULAR.LOWERCASE,
            `experience/components/${COMPONENT.PASCAL}/types.ts`,
          ),
          template('domains.experience.types'),
        ],
      ];

      // Generate files
      FILES.forEach(([path, template]) => {
        createFile(
          path,
          use('TemplateEngine').render(
            template,
            defaultVariables({
              COMPONENT,
              DOMAIN: DOMAIN.SINGULAR.LOWERCASE,
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

module.exports = MakePage;
