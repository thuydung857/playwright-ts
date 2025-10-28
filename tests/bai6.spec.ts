import { expect, test } from '@playwright/test';
import { timeStamp } from 'console';

const DEMO_URL = '';

test('ví dụ về điều kiện có thể click trong PW', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  const normalBtn = page.locator('#force-button');

  await expect(normalBtn).toBeVisible();

  await normalBtn.click({ force: true });
});

test('ví dụ về các loại click trong PW', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.locator('//span[text()="Click Me"]').click();

  await page.locator('//span[text()="Double Click Me"]').dblclick();

  await page.locator('//span[text()="Right Click Me"]').click({ button: 'right' });

  await page.pause();
});

// <div class="ant-tooltip-inner" id="_r_5_" role="tooltip">Đây là tooltip thực tế! Hover vào đây để thấy tooltip hiển thị.</div>
test('hover trong PW', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();

  //   await page.locator('text=')
  //   await page.getByText()
  await page.locator('//div[text()="Hover để xem tooltip"]').nth(0).hover();
  const toolTip = await page.locator('//div[@class="ant-tooltip-inner"]').innerText();
  console.log(toolTip);

  await expect(page.getByRole('tooltip')).toBeVisible();

  await page.pause();
});
