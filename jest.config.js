module.exports = {
    roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
    moduleNameMapper: {
      'subscribers/(.*)': '<rootDir>/src/subscribers/$1',
      'assets/(.*)': '<rootDir>/src/assets/$1',
      '@api/(.*)': '<rootDir>/src/api/$1',
      'models/(.*)': '<rootDir>/src/models/$1',
      '~types/(.*)': '<rootDir>/src/types/$1',
      'endpoints/(.*)': '<rootDir>/src/endpoints/$1',
      'services/(.*)': '<rootDir>/src/services/$1',
      '~utils/(.*)': '<rootDir>/src/utils/$1'

    },
  }