import { test, expect } from '@playwright/test';

const URL = 'https://demoapp-sable-gamma.vercel.app/';

test('vao trang playwright.dev', async ({ page }) => {
  const buttonTitle = 'Bắt đầu Test';
  const button6s = 'Nút 1 (xuất hiện sau 6s)';
  const button12s = 'Nút 2 (xuất hiện sau 12s)';

  await page.goto(URL);
  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  const button = page.locator(`//span[contains(text(),'${buttonTitle}')]`);
  await button.scrollIntoViewIfNeeded();
  await button.click();

  await expect(page.locator(`//span[contains(text(),'${button6s}')]`)).toBeVisible({
    timeout: 15000,
  });
  await expect(page.locator(`//span[contains(text(),'${button12s}')]`)).toBeVisible({
    timeout: 15000,
  });

  await expect(page.locator(`//span[contains(text(),'${button6s}')]`)).toBeVisible({
    timeout: 15000,
  });
  await expect(page.locator(`//span[contains(text(),'${button12s}')]`)).toBeVisible({
    timeout: 15000,
  });
});

test('lam bai tap auto-waiting demo', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  await page.locator('#start-btn').click();
  await expect(page.locator('#status')).toContainText('Đang xử lý bước 1...');

  await page.locator('#continue-btn').click();
  await expect(page.locator('#status')).toContainText('Đang xử lý bước 2...');
  await expect(page.locator('#final-btn')).toBeVisible();
});

test('webfirst assertion', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  await page.locator("//span[contains(text(),'Web-First Assertions')]").click();
  await page.locator("//span[text()='Bắt đầu chờ']").click();
  await expect(page.locator('#status-message')).toHaveText('Tải dữ liệu thành công!', {
    timeout: 8000,
  });
});
