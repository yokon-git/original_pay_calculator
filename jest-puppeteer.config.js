/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const port = process.env.PORT ?? 4445;
module.exports = {
  server: {
    command: `PORT=${port} ts-node --transpile-only src/app.ts`,
    port: port,
    launchTimeout: 30000,
  },
  browserContext: "incognito",
};
