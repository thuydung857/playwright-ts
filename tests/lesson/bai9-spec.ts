import { expect, Locator, test, Page } from '@playwright/test';


test('ví dụ về upload file', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');

    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
    await page.getByRole('tab', { name: 'jQuery Date Picker' }).click();

    const month = await page.locator('.ant-select-selector').click()



});


async function openAntSlectedByCardTitle(page: Page, cardTitle: string, index: number) {
    const card = page.locator(
        `xpath=//div[contains(@class, 'ant-card ')][.//div[contains(@class,'ant-card-head-title') and normalize-space()='${cardTitle}']]`
    );
    const selects = card.locator(
        "xpath=.//div[contains(@class, 'ant-select')]//div[contains(@class, 'ant-select-selector')]"