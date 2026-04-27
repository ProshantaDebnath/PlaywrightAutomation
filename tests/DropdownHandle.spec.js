const { test, expect } = require('@playwright/test')
const properties = require('../properties')

// Attach failure screenshots automatically for all tests in this file
test.afterEach(async ({ page }, testInfo) => {
  await attachFailureScreenshot(page, testInfo);
});

test('@UI Control', async ({ page }) => {

    const userName = page.locator('#username')
    const password = page.locator('#password')
    const dropdown = page.locator('select.form-control')
    const signInBtn = page.locator('input.btn[name="signin"]')
    const radionBtn = page.locator('input[id="usertype"]')
    const popup = page.locator('#okayBtn')
    const terms = page.locator('#terms')
    const blinkinTx = page.locator('a:has-text("Free Access to")')

    await page.goto(properties.URL2)

    //Asseration like text is present blinking or not
    await expect(blinkinTx).toHaveAttribute('class', 'blinkingTextt')

    await userName.fill(properties.username)
    await password.fill(properties.password)
    await dropdown.selectOption('consult')
    await radionBtn.nth(1).click()
    console.log(await radionBtn.last().isChecked())
    await popup.click()
    //Asseration like checked or unchecked
    await expect(radionBtn.last()).toBeChecked()
    await terms.uncheck()
    expect(await terms.isChecked()).toBeFalsy()
    await signInBtn.click()

})