// @ts-check
const { devices } = require('@playwright/test');
const { trace } = require('node:console');


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
    viewport: null,
    screenshot: 'on',
    trace: 'on',
    launchOptions: {
      args: ['--start-maximized']
    }
  },

});

module.exports = config;
