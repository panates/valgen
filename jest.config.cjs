module.exports = {
  testEnvironment: 'node',
  verbose: true,
  maxWorkers: 1,
  coveragePathIgnorePatterns: ['/cjs/', '/esm/', '/node_modules/', '_support'],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage/',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+.ts?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/test/tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    '(\\..+)\\.js': '$1',
    valgen: '<rootDir>/src',
  },
  modulePathIgnorePatterns: ['<rootDir>/build'],
};
