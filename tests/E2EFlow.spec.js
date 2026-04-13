const { test, expect } = require('@playwright/test')
const properties = require('../properties')


test('@E2E Flow of Ecommerce', async ({ page }) => {

    const productName = 'ZARA COAT 3'
    const products = page.locator('.card-body')
    const userEmail = page.locator('#userEmail')
    const userPassword = page.locator('#userPassword')
    const login = page.locator('#login')
    const navBar = page.locator('//p[text()="Automation Practice"]');
    const productList = page.locator('.card-body b')

    const cartBtn = page.locator('[routerlink*="cart"]')

    await page.goto(properties.URL1)

    await userEmail.fill(properties.tempMail)
    await userPassword.fill(properties.tempPass)
    await login.click()

    await expect(navBar).toContainText("Automation")

    //dynamic wait
    await productList.first().waitFor()
    const productTitles = await productList.allTextContents()
    console.log('ProductTitles------->' + productTitles)

    const Count = await products.count()
    //Iterating all the prouct and select the right product to cart
    for (let i = 0; i < Count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('button:has-text("Add To Cart")').click()
            break
        }
    }

    //Navigative to Cart Page and add the payment details in the cart
    await cartBtn.click()
    await page.locator('div li').first().waitFor()
    //Parameterize Locater
    const addedItemBool = await page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(addedItemBool).toBeTruthy()

    //Selecting Auto Suggestive Dropdown
    await page.locator('text=Checkout').click()
    await page.locator('[placeholder="Select Country"]').pressSequentially("Ind", { delay: 100 })
    const dropdown = page.locator(".ta-results")
    const hiddentext = page.locator('.user__name label[type="text"]')
    await dropdown.waitFor()
  
    const optionsCount = await dropdown.locator("button").count()

    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent()
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click()
            break
        }
    }

    expect(hiddentext).toHaveText(properties.tempMail)

    await page.locator("//*[contains(text(),'CVV Code')]//..//input").fill(properties.paymentDetails.cvv)

    await page.locator("//*[contains(text(),'Name on Card')]//..//input").fill(properties.paymentDetails.nameOnCard)

    await page.locator("//*[contains(text(),'Apply Coupon ')]//..//input").fill(properties.paymentDetails.couponCode)

    await page.getByRole('button', { name: 'Apply Coupon' }).click()

    await page.locator(".action__submit").click()


    //order done & validating the order
    await expect(page.locator('.hero-primary')).toContainText(' Thankyou for the order. ')

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()

    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor()
    const rows = page.locator("tbody tr")

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();



})
