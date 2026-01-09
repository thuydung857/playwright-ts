import { expect, test } from '@playwright/test';

test('ví dụ về checkbox và radio', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();

  // Checkbox 1: check() / uncheck()
  await page.locator('#demo-checkbox-1').check();
  await expect(page.locator('#demo-checkbox-1')).toBeChecked();

  await page.locator('#demo-checkbox-1').uncheck();
  await expect(page.locator('#demo-checkbox-1')).not.toBeChecked();

  // Checkbox 2: setChecked(true/false) : đảm bảo cho radio or checkbox sẽ luôn check , dù cho whatever trạng thái là gì
  await page.locator('#demo-checkbox-2').setChecked(true);
  await expect(page.locator('#demo-checkbox-2')).toBeChecked();

  await page.locator('#demo-checkbox-2').setChecked(false);
  await expect(page.locator('#demo-checkbox-2')).not.toBeChecked();

  // Checkbox 3: Idempotent - Gọi lại nhiều lần an toàn
  await page.locator('#demo-checkbox-3').setChecked(true);
  await page.locator('#demo-checkbox-3').setChecked(true); // ✅ Vẫn OK, không có side effect
  await expect(page.locator('#demo-checkbox-3')).toBeChecked();

  await page.pause();
});
// ví dụ là thằng checkbox đang ko check()
//locator.check() -> checkbox sẽ đc check ()
//locator.check() -> check box này vẫn là check()
//locator.check()=> đảm bảo ô đc check. (nếu đã check -> ko làm gì cả)
//locator.uncheck()=> đảo bảo ô bị uncheck( nếu đã bỏ check => ko làm gì cả)
//locator.setChecked(boolean) ->

//const shouldBeChecked = true;
// await page.locator().check()
// expect(pageXOffset.locator).toBecheked()
// locator.setChecked(shouldBeChecked) -> luôn đảm bảo cho radio hoặc checkbox đc check ->

test('Bai tap Checkbox check và uncheck', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click();
  await page.getByRole('heading', { name: '☑️ Basic Checkboxes' }).scrollIntoViewIfNeeded();

  await page.locator("//input[@data-testid='basic-checkbox-1']").check();
  await page.locator("//input[@data-testid='basic-checkbox-2']").check();
  await page.locator("//input[@data-testid='basic-checkbox-3']").check();
  await page.locator("//input[@data-testid='basic-checkbox-4']").setChecked(true);

  await expect(page.locator("//input[@data-testid='basic-checkbox-1']")).toBeChecked();
  await expect(page.locator("//input[@data-testid='basic-checkbox-2']")).toBeChecked();
  await expect(page.locator("//input[@data-testid='basic-checkbox-3']")).toBeChecked();
  await expect(page.locator("//input[@data-testid='basic-checkbox-4']")).toBeChecked();

  await page.pause;
});

test('Bai tap radio check và uncheck', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click();
  await page.getByRole('heading', { name: '🔘 Basic Radio Buttons' }).scrollIntoViewIfNeeded();

  await page.getByRole('radio', { name: 'Small' }).check();
  await expect(page.getByRole('radio', { name: 'Small' })).toBeChecked;

  await page.getByRole('radio', { name: 'Medium' }).setChecked(false);
  await expect(page.getByRole('radio', { name: 'Medium' })).not.toBeChecked();

  await page.getByRole('radio', { name: 'Large', exact: true }).check();
  await expect(page.getByRole('radio', { name: 'Large', exact: true })).toBeChecked();

  await page.getByRole('radio', { name: 'Extra Large', exact: true }).check();
  await expect(page.getByRole('radio', { name: 'Extra Large', exact: true })).toBeChecked();

  await page.pause;
});

test('Bai tap SelectAll check và uncheck', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click();

  // Scope tab
  const panel = page.getByRole('tabpanel', { name: '☑️ Checkboxes & Radio' });

  // 1. Click Select All - Check tất cả features
  await panel.getByRole('checkbox', { name: 'Select All' }).check();
  await expect(panel.getByRole('checkbox', { name: 'Select All' })).toBeChecked();
  await expect(panel.getByTestId('status-all')).toBeVisible(); // ✅ All selected

  // Verify tất cả features đã được check
  await expect(panel.getByRole('checkbox', { name: 'Feature 1' })).toBeChecked();
  await expect(panel.getByRole('checkbox', { name: 'Feature 2' })).toBeChecked();
  await expect(panel.getByRole('checkbox', { name: 'Feature 3' })).toBeChecked();
  await expect(panel.getByRole('checkbox', { name: 'Feature 4' })).toBeChecked();

  // 2. Uncheck Select All - Uncheck tất cả
  await panel.getByRole('checkbox', { name: 'Select All' }).uncheck();
  await expect(panel.getByTestId('status-none')).toBeVisible(); // ❌ None selected

  // 3. Check từng feature riêng lẻ - Select All sẽ thành indeterminate
  await panel.getByRole('checkbox', { name: 'Feature 1' }).check();
  await panel.getByRole('checkbox', { name: 'Feature 2' }).check();
  await expect(panel.getByTestId('status-partial')).toBeVisible(); // ⚠️ Partially selected

  // 4. Check tất cả features bằng loop
  const features = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'];
  for (const name of features) {
    await panel.getByRole('checkbox', { name }).check();
  }
  await expect(panel.getByTestId('status-all')).toBeVisible();

  // 5. Uncheck bằng cách click Select All khi đã checked
  await panel.getByRole('checkbox', { name: 'Select All' }).uncheck();
  await expect(panel.getByTestId('status-none')).toBeVisible();

  await page.pause();
});

test('ví dụ về dropdown', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();

  const panel = page.getByRole('tabpanel', { name: '☑️ Checkboxes & Radio' });

  // 1) Mở dropdown lớn theo trigger
  await panel
    .locator(
      "xpath=//div[contains(@class,'custom-dropdown') and contains(@class,'large')]//div[contains(@class,'cd-trigger')]"
    )
    .click();

  // 2) CÁCH 1: Dùng scrollIntoViewIfNeeded() - Đơn giản nhất
  const targets = ['Vietnam', 'Japan', 'United States', 'Germany', 'Brazil'];
  for (const name of targets) {
    const item = panel.locator(
      "xpath=//div[contains(@class,'custom-dropdown') and contains(@class,'large')]//ul[contains(@class,'cd-menu')]//li[.//span[normalize-space()='" +
        name +
        "']]"
    );

    // Scroll item vào view và click
    await item.scrollIntoViewIfNeeded();
    await item.click();
  }
  //   await page.click('body', { position: { x: 100, y: 100 } });
  await panel
    .locator(
      "xpath=//div[contains(@class,'custom-dropdown') and contains(@class,'large')]//div[contains(@class,'cd-trigger')]"
    )
    .click();
  await page.pause();

  //   await page.locator('#lib-strict-control').click();
  //   await page
  //     .locator(
  //       "xpath=//div[@id='lib-strict-control']//input[@role='combobox' and @aria-label='Strict fruits combobox']"
  //     )
  //     .click();
  //   await page
  //     .locator(
  //       "//div[contains(text(), 'Custom Dropdown (Không dùng <select>)')]/ancestor::div[@class='ant-card-head']/following-sibling::div//div[@class='cd-trigger']"
  //     )
  //     .click();

  //   // Chọn mục theo text chính xác
  //   await page.locator("//ul[contains(@class,'cd-menu')]//li[normalize-space()='Banana']").click();
});
// playwright tự động xử lý và accept tất cả các dialog bởi default

test('ví dụ về  alert', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Alerts & Modals' }).click();

  // ALERT → Accept và assert UI
  page.once('dialog', async (dialog) => {
    console.log(dialog.type());
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Hello from alert');
    await dialog.accept();
  });
  await page.locator('#btn-alert').click();
  await expect(page.locator('#alert-result')).toHaveText('Alert acknowledged');

  // CONFIRM → Accept (YES) và assert UI
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Are you sure');
    // await dialog.dismiss()
    await dialog.accept();
  });
  await page.locator('#btn-confirm').click();
  await expect(page.locator('#confirm-result')).toHaveText('Confirmed: YES');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toContain('Your name');
    //truyen text vao input
    await dialog.accept('Tester');
  });
  await page.locator('#btn-prompt').click();
  await expect(page.locator('#prompt-result')).toHaveText('Hello, Tester');

  // PROMPT → Dismiss (Cancel) và assert UI
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt');
    await dialog.dismiss();
  });
  await page.locator('#btn-prompt').click();
  await expect(page.locator('#prompt-result')).toHaveText('Prompt canceled');

  await page.pause();
});
//locator chain -> mình có thể nối nhiều locator lại với nhau

test('ví dụ về modal', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Alerts & Modals' }).click();

  // Mở modal, điền tên, xác nhận và assert kết quả
  await page.locator('#open-basic-modal').click();
  //assert là thằng modal sẽ hiện ra để thao tác
  const dialog = page.getByRole('dialog', { name: 'Thông báo' });
  await expect(dialog).toBeVisible();
  //thao tác với modal
  await dialog.locator('#basic-modal-input').fill('Alice');
  await dialog.getByRole('button', { name: 'Đồng ý' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('#basic-modal-result')).toHaveText('Submitted: Alice');

  await page.pause();
});
