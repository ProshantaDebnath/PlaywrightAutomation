const { allure } = require('allure-playwright');
const fs = require('fs');
const path = require('path');

/**
 * Attaches failure screenshot to Allure report
 * Should be called in test.afterEach hook when test fails
 * 
 * @param {Page} page - Playwright page object
 * @param {TestInfo} testInfo - Playwright test info object
 * @param {string} screenshotName - Optional custom screenshot name
 */
async function attachFailureScreenshot(page, testInfo, screenshotName = 'failure-screenshot') {
  try {
    // Only attach screenshot if test failed
    if (testInfo.status !== 'passed') {
      // Take screenshot
      const screenshot = await page.screenshot({ fullPage: true });
      
      // Attach to Allure report
      await allure.attachment(
        screenshotName,
        screenshot,
        'image/png'
      );

      console.log(`✓ Failure screenshot attached to Allure report: ${screenshotName}`);
    }
  } catch (error) {
    console.error(`✗ Failed to attach screenshot: ${error.message}`);
  }
}

/**
 * Attaches multiple debugging artifacts to Allure report on failure
 * Includes: screenshot, HTML source, and browser console logs
 * 
 * @param {Page} page - Playwright page object
 * @param {TestInfo} testInfo - Playwright test info object
 */
async function attachFailureContext(page, testInfo) {
  try {
    if (testInfo.status !== 'passed') {
      // Attach screenshot
      const screenshot = await page.screenshot({ fullPage: true });
      await allure.attachment(
        'failure-screenshot',
        screenshot,
        'image/png'
      );

      // Attach HTML source
      const htmlSource = await page.content();
      await allure.attachment(
        'page-source.html',
        htmlSource,
        'text/html'
      );

      // Attach browser console logs
      const consoleLogs = page.context()._browserContext?._electronApp || '';
      if (consoleLogs) {
        await allure.attachment(
          'console-logs.txt',
          JSON.stringify(consoleLogs, null, 2),
          'text/plain'
        );
      }

      // Attach test failure information
      const testFailureInfo = {
        testName: testInfo.title,
        status: testInfo.status,
        duration: testInfo.duration,
        failureMessage: testInfo.expectedStatus || 'Test failed',
        url: page.url(),
        timestamp: new Date().toISOString()
      };

      await allure.attachment(
        'test-failure-info.json',
        JSON.stringify(testFailureInfo, null, 2),
        'application/json'
      );

      console.log(`✓ Failure context attached to Allure report for test: ${testInfo.title}`);
    }
  } catch (error) {
    console.error(`✗ Failed to attach failure context: ${error.message}`);
  }
}

/**
 * Attaches screenshot at any point in the test
 * Useful for manual screenshot capture during test execution
 * 
 * @param {Page} page - Playwright page object
 * @param {string} screenshotName - Custom name for the screenshot
 */
async function attachScreenshot(page, screenshotName = 'screenshot') {
  try {
    const screenshot = await page.screenshot({ fullPage: true });
    await allure.attachment(
      screenshotName,
      screenshot,
      'image/png'
    );
    console.log(`✓ Screenshot attached: ${screenshotName}`);
  } catch (error) {
    console.error(`✗ Failed to attach screenshot: ${error.message}`);
  }
}

/**
 * Setup test hooks for automatic failure screenshot attachment
 * Call this in your test file's beforeEach/afterEach
 * 
 * @param {Test} test - Playwright test object
 * @param {Page} page - Playwright page object  
 */
function setupFailureScreenshotHook(test, page) {
  test.afterEach(async (testInfo) => {
    await attachFailureScreenshot(page, testInfo);
  });
}

module.exports = {
  attachFailureScreenshot,
  attachFailureContext,
  attachScreenshot,
  setupFailureScreenshotHook
};
