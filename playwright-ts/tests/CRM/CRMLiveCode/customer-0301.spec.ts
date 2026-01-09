import { expect, Locator, test, Page } from '@playwright/test';

async function loginAndGotoCustomerPage(page: Page, pageName: string) {
    const URL = 'https://crm.anhtester.com/admin/authentication'
    const userName = 'admin@example.com'
    const password = '123456'

    await page.goto(URL);
    await expect(page.locator('.company-logo.text-center')).toBeVisible()
    await page.locator('#email').fill(userName)
    await page.locator('#password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()

    const el = page.locator(`//span[contains(text(),'${pageName}')]/parent::a`)
    await expect(el).toBeVisible()
    await el.click()

    await expect(page.getByRole('heading', { name: 'Customers Summary' })).toBeVisible()
    await page.getByRole('link', { name: '+ New Customer' }).click()
    await expect(page).toHaveURL(/\/clients\/client/);
}

async function inputField(page: Page, locator: string, value: string) {
    await page.locator(locator).fill(value)
}

async function selectDropdown(page: Page, dropdown: Locator, value: string) {
    await dropdown.click()
    await dropdown.locator("xpath=/following-sibling::div//div[@class='inner open']//li").filter({ hasText: value }).first().click()
}

async function createNewGroup(page: Page, value: string) {
    await page.locator('.input-group-btn').nth(1).click()
    await expect(page.locator('#myModalLabel')).toBeVisible()
    await page.locator('#name').fill(value)
    await page.locator("//button[@group='submit']").click()
    await expect(page.locator('.alert-title')).toContainText('Customer Group added successfully.')
}

async function verifyCustomerDataAfterCreated(page: Page, data: typeof customerData) {
    await expect(page.locator('#company')).toHaveValue(customerData.companyName)
    await expect(page.locator('#vat')).toHaveValue(customerData.vatNum)
    await expect(page.locator('#phonenumber')).toHaveValue(customerData.phone)
    await expect(page.locator('.filter-option-inner-inner').nth(0)).toHaveText(customerData.group)
    await expect(page.locator('.filter-option-inner-inner').nth(1)).toHaveText(customerData.currency)
    await expect(page.locator('.filter-option-inner-inner').nth(2)).toHaveText(customerData.language)
    await expect(page.locator('#address')).toHaveValue(customerData.address)
    await expect(page.locator('#city')).toHaveValue(customerData.city)
    await expect(page.locator('#state')).toHaveValue(customerData.state)
    await expect(page.locator('#zip')).toHaveValue(customerData.zipCode)
    await expect(page.locator('.filter-option-inner-inner').nth(3)).toHaveText(customerData.country)
}

async function verifyBillingAndShippingAfterInputted(page: Page, data: typeof customerData) {
    await expect(page.locator('#billing_street')).toHaveValue(customerData.address)
    await expect(page.locator('#billing_city')).toHaveValue(customerData.city)
    await expect(page.locator('#billing_state')).toHaveValue(customerData.state)
    await expect(page.locator('#billing_zip')).toHaveValue(customerData.zipCode)
    await expect(page.locator('.filter-option-inner-inner').nth(4)).toHaveText(customerData.country)
}

async function verifyBillingAndShippingAfterCopied(page: Page, data: typeof customerData) {
    await expect(page.locator('#shipping_street')).toHaveValue(customerData.address)
    await expect(page.locator('#shipping_city')).toHaveValue(customerData.city)
    await expect(page.locator('#shipping_state')).toHaveValue(customerData.state)
    await expect(page.locator('#shipping_zip')).toHaveValue(customerData.zipCode)
    await expect(page.locator('.filter-option-inner-inner').nth(5)).toHaveText(customerData.country)
}

const customerData = {
    companyName: `TestCompany_${Math.floor(Math.random() * 10000)}`,
    vatNum: '123',
    phone: '0909981234',
    website: 'TestCompany',
    group: 'SueGroup',
    currency: 'USD',
    language: 'German',
    address: 'Address for practicing',
    city: 'Olso',
    state: 'Mala',
    zipCode: '654000',
    country: 'Uruguay',
};


test.describe('CRM-CustomerPage - Positive case', () => {
    test('TC01-Tao customer thanh cong', async ({ page }) => {
        const companyName = 'TestCompany'
        loginAndGotoCustomerPage(page, 'Customers')
        await page.locator('#company').fill(companyName)
        await page.getByRole('button', { name: 'Save', exact: true }).click()

        await expect(page.locator('.alert-title')).toContainText('Customer added successfully.')
        await page.locator("//input[@id='company']").getAttribute('value').then(value => {
            expect(value).toBe(companyName)
        })

        // const customerIDOnPage = (await page.locator('.tw-truncate').textContent())?.trim()?.split('#')[1].split(' ')[0];
        // const customerIDOnURL = await page.url().split('t/')[1]
        // expect(customerIDOnPage).toEqual(customerIDOnURL)

        const customerIDOnPage1 =
            (await page.locator('.tw-truncate').innerText()).match(/#(\d+)/)?.[1];
        const customerIDOnURL1 =
            new URL(page.url()).pathname.split('/').pop();
        expect(customerIDOnPage1).toBe(customerIDOnURL1);
    })

    test('TC02-Tao customer thanh cong fill fields', async ({ page }) => {
        loginAndGotoCustomerPage(page, 'Customers')
        await inputField(page, '#company', customerData.companyName)
        await inputField(page, '#vat', customerData.vatNum)
        await inputField(page, '#phonenumber', customerData.phone)
        await inputField(page, '#website', customerData.website)
        await createNewGroup(page, customerData.group)
        await selectDropdown(page, page.locator("xpath=//button[@aria-owns='bs-select-1']"), customerData.group)
        await selectDropdown(page, page.locator("xpath=//button[@aria-owns='bs-select-2']"), customerData.currency)
        await selectDropdown(page, page.locator("xpath=//button[@aria-owns='bs-select-3']"), customerData.language)
        await inputField(page, '#address', customerData.address)
        await inputField(page, '#city', customerData.city)
        await inputField(page, '#state', customerData.state)
        await inputField(page, '#zip', customerData.zipCode)
        await selectDropdown(page, page.locator("xpath=//button[@aria-owns='bs-select-4']"), customerData.country)

        await page.getByRole('button', { name: 'Save', exact: true }).click()
        await expect(page.locator('.alert-title')).toContainText('Customer added successfully.')

        await verifyCustomerDataAfterCreated(page, customerData)
    })

    test('TC03-Verify Billing & Shipping must be same as Customer Details', async ({ page }) => {
        loginAndGotoCustomerPage(page, 'Customers')
        await page.locator('#company').fill(customerData.companyName)
        await inputField(page, '#address', customerData.address)
        await inputField(page, '#city', customerData.city)
        await inputField(page, '#state', customerData.state)
        await inputField(page, '#zip', customerData.zipCode)
        await selectDropdown(page, page.locator("//button[@aria-owns='bs-select-4']"), customerData.country)

        await page.getByRole('tab', { name: 'Billing & Shipping' }).click()
        await page.locator("xpath=//a[contains(text(),'Same as Customer Info')]").click()

        await verifyBillingAndShippingAfterInputted(page, customerData)
    })

    test('TC04-Verify Billing & Shipping must be same after copying', async ({ page }) => {
        loginAndGotoCustomerPage(page, 'Customers')
        await page.locator('#company').fill(customerData.companyName)
        await inputField(page, '#address', customerData.address)
        await inputField(page, '#city', customerData.city)
        await inputField(page, '#state', customerData.state)
        await inputField(page, '#zip', customerData.zipCode)
        await selectDropdown(page, page.locator("//button[@aria-owns='bs-select-4']"), customerData.country)

        await page.getByRole('tab', { name: 'Billing & Shipping' }).click()
        await page.locator("xpath=//a[contains(text(),'Same as Customer Info')]").click()
        await page.locator("xpath=//a[contains(text(),'Copy Billing Address')]").click()

        await verifyBillingAndShippingAfterCopied(page, customerData)
    })
})





