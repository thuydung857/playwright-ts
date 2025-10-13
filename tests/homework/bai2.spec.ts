import { test, expect } from '@playwright/test';

//Topic
// Su dung trang web https://demoapp-sable-gamma.vercel.app/lesson1
// lam phan bai 1 nang cao 
// check duoc ouput la Chào mừng bạn đã quay trở lại!
// su dung auto wait va webfirst assertion


test('Kiem tra message va su dung auto wait va assertion', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  await page.getByRole('button', { name: 'Nâng cao' }).click();
  await page.getByText('Tôi đồng ý với các điều khoản').click();

  await expect(page.locator('#terms-status')).toContainText('Đang xác thực...');
  await expect(page.locator('#terms-status')).toContainText('Đã xác thực.');
  await expect(page.getByRole('button')).toBeEnabled();

  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await expect(page.locator('#spinner')).toContainText('Đang tải dữ liệu người dùng...');
  await expect(page.locator('#final-step')).toContainText('Chào mừng bạn đã quay trở lại!');
});