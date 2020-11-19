const { existsSync } = require('fs');

const MakeReducer = {
  command: 'make:reducer',
  description: 'Generate a new domain reducer',
  arguments: [
    {
      name: 'domain',
      description: 'Domain name.',
      required: true,
    },
    {
      name: 'reducer',
      description: 'Reducer name.',
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
      const RAW_NAME = parser.getArgument(1)?.value;
      const FORCE = parser.getOption('force')?.value;

      // Definition
      const DOMAIN = variationsOf(RAW_DOMAIN);
      const NAME = variationsOf(RAW_NAME);
      const PATH_TO_MAIN_REDUCER = domains(
        DOMAIN.SINGULAR.KEBAB,
        `data/reducers/index.ts`,
      );
      const FILES = [
        // [PATH, TEMPLATE]
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `data/reducers/${NAME.CAMEL}Reducer.ts`,
          ),
          template('domains.data.reducer'),
        ],
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `types/stores/${NAME.PASCAL}Store.ts`,
          ),
          template('domains.types.store'),
        ],
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `types/actions/${NAME.PASCAL}Actions.ts`,
          ),
          template('domains.types.actions'),
        ],
      ];

      if (!existsSync(PATH_TO_MAIN_REDUCER)) {
        FILES.push([
          PATH_TO_MAIN_REDUCER,
          template('domains.data.main-reducer'),
        ]);
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

      const RESET_ACTION_NAME = variationsOf(`${DOMAIN.KEBAB}/reset`);
      [
        // [PATH, TEMPLATE]
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `data/actions/${RESET_ACTION_NAME.CAMEL}.ts`,
          ),
          template('domains.data.action'),
        ],
        [
          domains(
            DOMAIN.SINGULAR.KEBAB,
            `types/actions/${RESET_ACTION_NAME.PASCAL}Action.ts`,
          ),
          template('domains.types.action'),
        ],
      ].forEach(([path, template]) => {
        createFile(
          path,
          use('TemplateEngine').render(
            template,
            defaultVariables({
              DOMAIN,
              NAME: RESET_ACTION_NAME,
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

module.exports = MakeReducer;
