import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm', // preset khusus untuk ES Modules + TS
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json', useESM: true }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
  'components/**/*.{js,jsx,ts,tsx}',
  'app/**/*.{js,jsx,ts,tsx}',
  'lib/**/*.{js,jsx,ts,tsx}',    // tambahkan ini jika punya folder lib
  '!**/node_modules/**',
  '!**/.next/**',
],
  coverageDirectory: 'coverage',
};

export default config;