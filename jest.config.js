module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/EmptyModule.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: '<rootDir>/.babelrc.js',
      tsconfig: 'tsconfig.test.json',
    },
  },
  testEnvironment: 'node',
  testRegex: 'src(/tests/|/.*/tests/).*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/.config/testing/setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
};
