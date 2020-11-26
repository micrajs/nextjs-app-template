const MakeDomainFeature = {
  command: 'make:domain-feature',
  description: 'Generate a new domain feature',
  arguments: [
    {
      name: 'domain',
      description: 'Domain name.',
      required: true,
    },
    {
      name: 'feature',
      description: 'Feature name.',
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
      const RAW_COMPONENT = parser.getArgument(1).value;
      const FORCE = parser.getOption('force').value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const COMPONENT = variationsOf(RAW_COMPONENT);
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(
            DOMAIN.SINGULAR.LOWERCASE,
            `experience/components/${COMPONENT.PASCAL}/${COMPONENT.PASCAL}.tsx`,
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
        [
          domains(
            DOMAIN.SINGULAR.LOWERCASE,
            `experience/components/${COMPONENT.PASCAL}/use${COMPONENT.PASCAL}.ts`,
          ),
          template('domains.experience.setup-hook'),
        ],
        [
          domains(
            DOMAIN.SINGULAR.LOWERCASE,
            `experience/components/${COMPONENT.PASCAL}/index.ts`,
          ),
          template('domains.experience.feature'),
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

module.exports = MakeDomainFeature;
