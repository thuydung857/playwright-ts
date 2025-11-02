
import { expect, test } from '@playwright/test';


test('ví dụ về điều kiện có thể click trong PW', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');

    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
    // Checkbox 1: check() / uncheck()
    await page.locator('#demo-checkbox-1').check();
    await expect(page.locator('#demo-checkbox-1')).toBeChecked();

    await page.locator('#demo-checkbox-1').uncheck();
    await expect(page.locator('#demo-checkbox-1')).not.toBeChecked();

    // Checkbox 2: setChecked(true/false)
    await page.locator('#demo-checkbox-2').setChecked(true);
    await expect(page.locator('#demo-checkbox-2')).toBeChecked();

    await page.locator('#demo-checkbox-2').setChecked(false);
    await expect(page.locator('#demo-checkbox-2')).not.toBeChecked();

    // Checkbox 3: Idempotent - Gọi lại nhiều lần an toàn
    await page.locator('#demo-checkbox-3').setChecked(true);
    await page.locator('#demo-checkbox-3').setChecked(true); // ✅ Vẫn OK, không có side effect
    await expect(page.locator('#demo-checkbox-3')).toBeChecked();

})