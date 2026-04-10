// @ts-check
const { devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000
  },
  reporter: [
    ['allure-playwright'],
    ['html']
  ],
  use: {
    browserName: 'chromium',
    headless: false,
  },

});

module.exports = config;
