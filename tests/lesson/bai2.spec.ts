import { test, expect } from '@playwright/test';
import { log } from 'console';

//Nên nhóm vào 1 scenario để quản lý test case có cùng mục đích, xài test.describe()
// test.describe('Trang chu playwright.dev', () => {
//     test('TC01.Check trang chu co ten Playwright', async ({ page }) => {
//         await page.goto('https://playwright.dev/');
//         await expect(page).toHaveTitle(/Playwright/);
//     });

//     test('TC02.Check url của trang Playwright', async ({ page }) => {
//         await page.goto('https://playwright.dev/');
//         await page.getByRole('link', { name: 'Get started' }).click();
//         await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//     });
// })

// test.describe('Trang nhan su anh tester', () => {
//     test('TC01. Kich ban dang nhap va kiem tra widget', async ({ page }) => {
//         await test.step('Buoc 1 : Dieu huong va dang nhap', async () => {
//             await page.goto('https://hrm.anhtester.com/erp/login')
//             await page.getByRole('textbox', { name: 'Your Username' }).click();
//             await page.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
//             await page.getByRole('textbox', { name: 'Enter Password' }).click();
//             await page.getByRole('textbox', { name: 'Enter Password' }).fill('123456');
//             await page.getByRole('button', { name: ' Login' }).click();
//         });
//         await test.step('Buoc 2 : Kiem tra dang nhap thanh cong', async () => {
//             await expect(page.getByRole('navigation')).toContainText('Your Apps')
//             const url = await page.url()
//             console.log(url);
//             await expect(page.url()).toBe('https://hrm.anhtester.com/erp/login')
//         })
//         //test.only : chi chay test case nay
//         //test.skip : test case nay se bi skip

//     })
// })


test('Vo trang Auto-waiting va kiem tra message', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
    await page.getByRole('button', { name: 'Click Me!' }).click();
    await expect(page.locator('#status')).toContainText('Button Clicked Successfully!');

});

