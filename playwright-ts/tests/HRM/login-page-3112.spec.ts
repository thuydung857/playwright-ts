import { expect, Locator, test, Page } from '@playwright/test';

const URL = 'https://hrm.anhtester.com/'

test.describe('HRM Login Page - Positive cases', () => {
    test('TC01-Login Success By Clicking Login Button', async ({ page }) => {
        await page.goto(URL)
        const userNameText = 'admin_example'
        const passwordText = '123456'

        await page.locator('#iusername').fill(userNameText)
        await page.locator('#ipassword').fill(passwordText)
        await page.locator('button[type="submit"]').click()

        await expect(page.getByRole('dialog', { name: "Logged In Successfully." })).toBeVisible()
        await expect(page.locator('.b-brand')).toBeVisible()
        await expect(page.url()).toContain('/erp/desk')

        await page.pause()
    })

    test('TC02-Login Success By Clicking Login Enter', async ({ page }) => {
        await page.goto(URL)
        const userNameText = 'admin_example'
        const passwordText = '123456'

        await page.locator('#iusername').pressSequentially(userNameText)
        await page.locator('#ipassword').pressSequentially(passwordText)
        await page.keyboard.press('Enter')

        await expect(page.getByRole('dialog', { name: "Logged In Successfully." })).toBeVisible()
        await expect(page.locator('.b-brand')).toBeVisible()
        await expect(page.url()).toContain('/erp/desk')
        await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk')

        await page.pause()
    })
})
test.describe('HRM Login Page - Negative cases', () => {
    test('TC03-Input invalid password', async ({ page }) => {
        await page.goto(URL)
        const userNameText = 'admin_example'
        const passwordText = '1234567'
        await page.locator('#iusername').pressSequentially(userNameText)
        await page.locator('#ipassword').pressSequentially(passwordText)
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.toast-message')).toBeVisible()
        await expect(page.locator('.toast-message')).toHaveText('Invalid Login Credentials.')
    })

    test('TC04-Input invalid username', async ({ page }) => {
        await page.goto(URL)
        const userNameText = 'admin_example1'
        const passwordText = '123456'
        await page.locator('#iusername').pressSequentially(userNameText)
        await page.locator('#ipassword').pressSequentially(passwordText)
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.toast-message')).toBeVisible()
        await expect(page.locator('.toast-message')).toHaveText('Invalid Login Credentials.')
    })

    test('TC05-Input empty username password', async ({ page }) => {
        await page.goto(URL)
        const userNameText = ''
        const passwordText = ''
        await page.locator('#iusername').pressSequentially(userNameText)
        await page.locator('#ipassword').pressSequentially(passwordText)
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.toast-message')).toBeVisible()
        await expect(page.locator('.toast-message')).toHaveText('The username field is required.')
    })

    test('TC06-Input empty password', async ({ page }) => {
        await page.goto(URL)
        const userNameText = 'admin_example'
        const passwordText = ''
        await page.locator('#iusername').pressSequentially(userNameText)
        await page.locator('#ipassword').pressSequentially(passwordText)
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.toast-message')).toBeVisible()
        await expect(page.locator('.toast-message')).toHaveText('The password field is required.')
    })

    test('TC07-Input empty username', async ({ page }) => {
        await page.goto(URL)
        const userNameText = ''
        const passwordText = '123456'
        await page.locator('#iusername').pressSequentially(userNameText)
        await page.locator('#ipassword').pressSequentially(passwordText)
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.toast-message')).toBeVisible()
        await expect(page.locator('.toast-message')).toHaveText('The username field is required.')
    })

    test('TC08-Input password < 8chars', async ({ page }) => {
        await page.goto(URL)
        const userNameText = 'admin_example'
        const passwordText = '12345'
        await page.locator('#iusername').pressSequentially(userNameText)
        await page.locator('#ipassword').pressSequentially(passwordText)
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.toast-message')).toBeVisible()
        await expect(page.locator('.toast-message')).toHaveText('Your password is too short, minimum 6 characters required.')
    })
})


test.describe('HRM Login Page - UI', () => {
    test('TC09-Input password < 8chars', async ({ page }) => {
        await page.goto(URL)
        const userNamext = '12345'
        await expect(page.locator('#ipassword')).toHaveAttribute('type', 'password')
    })

    test('TC10-Forgot password', async ({ page }) => {
        await page.goto(URL)
        await page.locator('a.text-primary').click()
        await expect(page.locator('h4.mb-3.f-w-400')).toBeVisible()
        await expect(page).toHaveURL(/\/erp\/forgot-password$/)
    })

    test('TC11-Verify placeholder of userand and password', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator('#iusername')).toHaveAttribute('placeholder', 'Your Username')
        await expect(page.locator('#ipassword')).toHaveAttribute('placeholder', 'Enter Password')

    })

})