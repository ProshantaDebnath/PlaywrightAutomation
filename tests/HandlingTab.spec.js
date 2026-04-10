const { test, expect } = require('@playwright/test')
const properties = require('../properties')

test.only('@Handling Tab', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(properties.URL2)

    const blinkinTx = page.locator('a:has-text("Free Access to")')
    const userName = page.locator('#username')
    const password = page.locator('#password')
    const signInBtn = page.locator('input.btn[name="signin"]')


    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            blinkinTx.click()

        ]
    )

    const newPageTx = newPage.locator('.red')

    const contentName = await newPageTx.textContent()
    const arrayText = contentName.split(' ')

    await userName.fill(arrayText[4].trim())
    await password.fill(properties.password)
    await signInBtn.click()

    await page.pause()


})
