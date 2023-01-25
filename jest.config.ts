import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    "^core\/(.*)$": "<rootDir>/src/core/$1",
    "^utils\/(.*)$": "<rootDir>/src/utils/$1",
  }
};

export default config;
