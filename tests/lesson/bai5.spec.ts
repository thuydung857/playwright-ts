import { test, expect } from '@playwright/test';
import { log } from 'console';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

test('Expect Assertions', async ({ page }) => {
    await page.goto(DEMO_URL);

    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab', { name: 'Expect Assertions' }).click();

    // const actualText = page.locator('profile-name')
    // const final = await actualText.innerText();
    // expect(final).toBe('Playwright Learner')

    // await page.pause()

    //2/ só sanh profile json có giá trị là
    // {
    //   "id": 101,
    //   "role": "student", 
    //   "active": true,
    //   "premium": false
    // }


    // const jsonText = await page.locator('#profile-json').innerText();
    // const profile = JSON.parse(jsonText);
    // expect(profile).toEqual({
    //     id: 101,
    //     role: 'student',
    //     active: true,
    //     premium: false,
    // });

    //

    // const categories = await page.locator('#categories').allInnerTexts();
    // console.log(categories);
    // const splitItems = categories[0].split('\n').map(t => t.trim());
    // console.log(splitItems);
    // expect(splitItems).toContain('📱 Phone')

    //toContain : là chính xác từ luôn, expect ko có wait
    // expect(splitItems).toContain('📱 Phone')
    //toContainText : là 1 phần từ là được, expect có wait
    // await expect(splitItems).toContainText('Phone')


    const isInStock = await page.locator('#in-stock-flag').getAttribute('data-value')
    console.log(isInStock);
    expect(Boolean(isInStock)).toBeTruthy()
});
