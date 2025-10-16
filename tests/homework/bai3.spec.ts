import { test, expect } from '@playwright/test';
import { log } from 'node:console';


//1) Complex role-based selections + filters
// Chọn nút Bold đang bật (aria-pressed=true).
// Mở menu "More options" và chọn mục "Duplicate".
// Xác nhận mục "Download" ở menu đang disabled.
// Mở combobox "Font family" và chọn option "Roboto" (aria-selected).
// Điền textbox "Tiêu đề" bằng giá trị: Bài viết mới.
// Khẳng định nút "Publish" đang disabled.


test('Bai tap 1 - getByRole', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/')
  await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
  await page.getByRole('button', { name: 'Playwright getByRole' }).click()
  await page.getByRole('button', { name: 'Bài tập' }).click()
  await page.getByRole('button', { name: 'Bold', pressed: true }).click()
  const moreOptionButton = page.getByRole('button', { name: 'More options', expanded: false })
  moreOptionButton.click()
  const duplicateItem = page.getByRole('menuitem', { name: 'Duplicate' })
  await expect(duplicateItem).toBeVisible()
  const download = page.getByRole('menuitem', { name: 'Download (disabled)', disabled: true })
  await expect(download).toBeDisabled()
  await page.getByRole('combobox', { name: 'Font family' }).click()
  await page.getByRole('option', { name: 'Roboto' }).click()
  await page.getByRole('textbox', { name: 'Tiêu đề' }).fill('Bài viết mới.')
  const publish = page.getByRole('button', { name: 'Publish', disabled: true })
  await expect(publish).toBeDisabled()
  await page.pause()
})




// UI theo từng câu hỏi (Bài 2)
// Bài tập (Yêu cầu)
// Tìm landmark navigation có tên "Primary" và xác nhận link "Home" là trang hiện tại.
// Điền ô tìm kiếm bằng accessible name "Search docs".
// Tương tác với ô nhập được gắn label qua aria-labelledby là "Mã nội bộ".
// Click "Tải dữ liệu" và chờ live region thông báo "Đã tải 3 kết quả".

test('Bai tap 2 - getByRole', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/')
  await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
  await page.getByRole('button', { name: 'Playwright getByRole' }).click()
  await page.getByRole('button', { name: 'Bài tập' }).click()

  //Tìm landmark navigation có tên "Primary" và xác nhận link "Home" là trang hiện tại.
  const primaryNav = page.getByRole('navigation', { name: 'Primary' });

  const homeLink = primaryNav.getByRole('link', { name: 'Home' });
  const docsLink = primaryNav.getByRole('link', { name: 'Docs' });
  await expect(homeLink).toHaveAttribute('aria-current', 'page');
  await expect(docsLink).not.toHaveAttribute('aria-current', 'page');

  //Điền ô tìm kiếm bằng accessible name "Search docs".
  await page.getByRole('textbox', { name: 'Search docs' }).fill('Search something...')


  //Tương tác với ô nhập được gắn label qua aria-labelledby là "Mã nội bộ".
  await page.getByRole('textbox', { name: 'Mã nội bộ' }).fill('Search something...')
  await page.getByLabel('Mã nội bộ').fill('Search something...')

  //Click "Tải dữ liệu" và chờ live region thông báo "Đã tải 3 kết quả".
  await page.getByRole('button', { name: 'Tải dữ liệu' }).click()
  const liveRegion = page.getByRole('status');
  await expect(liveRegion).toHaveText('Đã tải 3 kết quả', { timeout: 5000 });
  await page.pause()

})



