/* eslint-env node */
const port = process.env.PORT ?? 4445;
module.exports = function globalSetup() {
  global.TARGET_PAGE_URL = `http://localhost:${port}`;
};
