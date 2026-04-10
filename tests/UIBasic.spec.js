const assert = require('assert')
const { test, expect } = require('@playwright/test')
const properties = require('../properties')


test('@Web Client App login', async ({ page }) => {

    await page.goto(properties.URL2);

    const userName = page.locator("#username")
    const password = page.locator("#password")
    const signInbutton = page.locator("[name='signin']")
    const navBar = page.locator('text="ProtoCommerce Home"');
    const cardsName = page.locator('.card-body .card-title a')

    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInbutton.click();
    await expect(navBar).toContainText("ProtoCommerce")

    const expectedProducts = [
        'iphone X',
        'Samsung Note 8',
        'Nokia Edge',
        'Blackberry'
    ]

    const actualProducts = await cardsName.allTextContents()
    console.log(await cardsName.nth(0).textContent())
    const message = `Expected products: ${JSON.stringify(expectedProducts)}, Actual products: ${JSON.stringify(actualProducts)}`
    console.log(message)
    assert.deepStrictEqual(actualProducts, expectedProducts, message)



})