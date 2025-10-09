
import type {Config} from 'jest';

const config: Config = {
  clearMocks      : true,
  coverageProvider: "v8",
  moduleNameMapper: {
    '^/(.*)$'    : '<rootDir>/$1',
    'vieux-carre': '<rootDir>/config/global.ts'
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  preset           : 'ts-jest',
  setupFiles       : ['<rootDir>/jest.setup.ts'],
};

export default config;
