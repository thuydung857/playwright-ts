import { test, expect } from '@playwright/test';
import { log } from 'node:console';


//web accessibility (kha nang tiep cam) - nen tang cua getByRole

test('Vai tro ngam dinh', async ({ page }) => {
    //   page.getByRole('link', { name: 'Trang chủ' }
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
    await page.getByRole('button', { name: 'Playwright getByRole' }).click()
    // const linkLocator = page.getByRole('link', { name: 'Trang chủ' })
    // console.log(`phan tu co la : `, await linkLocator.count());
    // await linkLocator.nth(0).hover()
    // // await linkLocator.click()
    // // await linkLocator.hover()
    // await linkLocator.nth(0).highlight()

    // await page.getByRole('button', { name: 'Lưu' }).highlight()

    // // await page.getByRole('textbox', { name: 'Tên: ' }).fill('Dung') //fill la điền nguyên ô
    // await page.getByRole('textbox', { name: 'Tên: ' }).pressSequentially('Dung') //điền từng chữ
    // await page.pause()

    // await page.getByRole('checkbox', { name: ' Đồng ý điều khoản' }).check()
    // await page.getByRole('radio', { name: ' Nam' }).check()
    // await page.getByRole('textbox', { name: 'Email: ' }).fill('abc123@gmail.com')
    // await page.getByRole('textbox', { name: 'Mật khẩu: ' }).fill('123')
    // await page.getByRole('textbox', { name: 'Ghi chú: ' }).fill('Note')

    // const checkbox = page.getByRole('checkbox', { name: 'Tôi đồng ý', checked: true })
    // console.log(checkbox.count());
    // await expect(checkbox).toBeVisible()
    // await page.pause()

    // await page.getByRole('button', { name: 'Bài tập' }).click()
    // await page.getByRole('button', { name: 'Bold', pressed: true }).click()
    // const moreOptionButton = page.getByRole('button', { name: 'More options', expanded: false })
    // moreOptionButton.click()
    // const duplicateItem = page.getByRole('menuitem', { name: 'Duplicate' })
    // await expect(duplicateItem).toBeVisible()
    // const download = page.getByRole('menuitem', { name: 'Download (disabled)', disabled: true })
    // await expect(download).toBeDisabled()
    // await page.getByRole('combobox', { name: 'Font family' }).click()
    // await page.getByRole('option', { name: 'Roboto' }).click()
    // await page.getByRole('textbox', { name: 'Tiêu đề' }).fill('Bài viết mới.')
    // const publish = page.getByRole('button', { name: 'Publish', disabled: true })
    // await expect(publish).toBeDisabled()
    // await page.pause()


    await page.getByRole('button', { name: 'CSS Selector' }).click()
    await page.getByRole('button', { name: 'Chỉnh sửa' }).click()
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => { });
    });
    await page.pause()





});