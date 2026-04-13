const { test, expect } = require('@playwright/test')
const { allure } = require('allure-playwright');
const properties = require('../properties')
const { attachFailureScreenshot, attachScreenshot } = require('./helpers/allureHelper');

// Attach failure screenshots automatically for all tests in this file
test.afterEach(async ({ page }, testInfo) => {
  await attachFailureScreenshot(page, testInfo);
});

test('@Register and Login', async ({ page }) => {
    await allure.description('Test user login with valid email and password');
    const Email = "playwright45@gmail.com"
    const Password = "testing242512@!F"
    const registerBtn = page.locator('a[href*="register"]')
    const firstName = page.locator("#firstName")
    const lastName = page.locator("#lastName")
    const userEmail = page.locator("#userEmail")
    const userMobile = page.locator("#userMobile")
    const occupation = page.locator('[formcontrolname="occupation"]')
    const MaleBtn = page.locator('[value="Male"]')
    const userPassword = page.locator("#userPassword")
    const confirmPassword = page.locator("#confirmPassword")
    const requireCheckbox = page.locator('[formcontrolname="required"]')
    const login = page.locator("#login")
    const loginBtn = page.locator(".btn-primary")
    const navBar = page.locator('text="Automation Practice"');
    const cardsName = page.locator('.card-body b')

    await page.goto(properties.URL1);

    //User Registration Form
    await registerBtn.click()
    await firstName.fill("Playwritght")
    await lastName.fill("Testing")
    await userEmail.fill(Email)
    await userMobile.fill('1234567890')
    await occupation.selectOption('Engineer')
    await MaleBtn.click()
    await userPassword.fill(Password)
    await confirmPassword.fill(Password)
    await requireCheckbox.click()
    await login.click()

    //Login the application
    await loginBtn.click()
    await userEmail.fill(Email)
    await userPassword.fill(Password)
    await login.click()
    await expect(navBar).toContainText("Automation")
    
    // Attach screenshot after successful login
    await attachScreenshot(page, 'successful-login');

    const expectedProducts = [
        'ADIDAS ORIGINAL',
        'ZARA COAT 3',
        'iphone 13 pro'
    ]

    await page.waitForLoadState("networkidle")
    const actualProducts = await cardsName.allTextContents()
    console.log(await cardsName.nth(0).textContent())
    const message = `Expected products: ${JSON.stringify(expectedProducts)}, Actual products: ${JSON.stringify(actualProducts)}`
    console.log(message)
    assert.deepStrictEqual(actualProducts, expectedProducts, message)


})