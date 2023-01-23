/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {tsconfig: "tsconfig.test.json"}],
  },
  testTimeout: 80000,
  setupFiles: ["<rootDir>/jest-global-setup.js"],
  watchman: false,
};
