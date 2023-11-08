/** @type {import('ts-jest').JestConfigWithTsJest} */
/* eslint-disable no-undef */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true, // display individual test results with the test suite hierarchy
  forceExit: true, // force Jest to exit after all tests have completed running
  clearMocks: true, // clear mock calls and instances between every test
  resetMocks: true, // reset mock state between every test
  restoreMocks: true // restore mock state between every test
};
