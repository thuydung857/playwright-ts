import { test, expect, Page } from '@playwright/test';


const LOGIN_URL = 'https://crm.anhtester.com/admin/'

async function loginAndNavigateToNewCustomer(page: Page) {
    await page.goto(LOGIN_URL)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Login')
    await page.locator('#email').fill('admin@example.com')
    await page.locator('#password').fill('123456')
    await page.locator("//button[@type='submit']").click()

    await expect(page).toHaveURL(/admin/)
    // const customerLabel = page.locator('.menu-item-customers span').innerText()


    expect(page.locator("//span[normalize-space(.) = 'Customers']//parent::a")).toBeVisible()

    // expect(customerLabel).toContain('Customers')

    await page.locator('.menu-item-customers span').click()

    await page.locator('._buttons a').nth(0).click()

    const asterisk = page.locator('.form-group .req.text-danger').nth(0)
    await expect(asterisk).toBeVisible()


}


test.describe('CRM-CustomerPage - Positive case', () => {
    test('TC_01 - Tạo customer (chỉ nhập required fields)', async ({ page }) => {
        //action dang nhap thanh cong
        await loginAndNavigateToNewCustomer(page);
    })
})