import { expect, test } from '@playwright/test';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

test('Get text() display:none', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-element-1');

  const text1 = await parent.textContent();
  console.log('text1', text1);

  const text2 = await parent.innerText();
  console.log('text2', text2);

  const text3 = await parent.innerHTML();
  console.log('text3', text3);

  await page.pause();
});

test('Get text()  visibility: hidden', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-element-2');

  const text1 = await parent.textContent();
  console.log('text1', text1);

  const text2 = await parent.innerText();
  console.log('text2', text2);

  const text3 = await parent.innerHTML();
  console.log('text3', text3);

  await page.pause();
});

test('allTextContents()', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-dropdown');

  const allText = await parent.allTextContents();
  console.log('allText', allText);
  const allTextInner = await parent.allInnerTexts();
  console.log('allTextInner', allTextInner);

  const innerThongThuong = await parent.innerText();
  console.log(innerThongThuong);

  const listItems = page.locator('.demo-list-item');
  const allTexts = await listItems.allTextContents();
  console.log(allTexts);

  await page.pause();
});

test('inputValue(), getAttribute()', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-input-text');

  const inputValue = await parent.inputValue();

  const attributes = page.locator('#demo-attributes');

  const dataStatusAttr = await attributes.getAttribute('data-status');

  console.log(inputValue);
  console.log(dataStatusAttr);

  await page.pause();
});

//expect ko co wait
//toBeValue
// so sanh nghiem ngat giong voi thang === o trong JS va TS => no kiem tra ca kieu du lieu -> gia tri
// phep so sanh cai nay co chinh xac bang cai kia ko? (cunng 1 va tthe)
test('toBe(value)', () => {
  const name: string = 'Playwright';
  const version: number = 1.56;
  const isActive: boolean = true;

  //PASSS
  expect(name).toBe('Playwright');
  expect(version).toBe(1.56);
  expect(isActive).toBe(true);

  //FAIL
  expect(version).toBe('1.56');
});

//toEqual
//so sanh gia tri noi dung cua cac object hoac array. kiem tra 2 obbject hoac array phai giong het nhau
//so sanh 2 cai hop co chua nhung thu giong het nhau ben trong hay khong
test('toEqual', () => {
  const user1 = { id: 1, name: 'A' };
  const user2 = { id: 1, name: 'A' };

  expect(user1).toEqual(user2);
});

//toContain
//Kien tra co chua
//toContainEqual
test('toContain', () => {
  const permissions: string[] = ['read', 'write', 'delete'];
  const users: { id: number; name: string }[] = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ];

  //   PASS; //
  expect(permissions).toContain('write');
  //fail
  //   expect(permissions).toContain('update');

  //   expect(users).toContain({ id: 1, name: 'A' });

  expect(users).toContainEqual({ id: 1, name: 'A' });
});

//toBEtruthy va toBeFalsy
//so sanh no co la falsy hay truthy hay ko
test('toBeTruthy', () => {
  expect('hello').toBeTruthy();
  expect({}).toBeTruthy();
  expect([]).toBeTruthy();

  expect('').toBeFalsy();
  expect(0).toBeFalsy();
  expect(null).toBeFalsy();
});
// .toBeGreaterThan / .toBeLessThan
test('toBeGreaterThan', () => {
  const itemCount = 5;
  const totalPrice = 100.5;

  expect(itemCount).toBeGreaterThan(0);
  expect(totalPrice).toBeLessThan(120);
});

//đề bài
// so sánh tên của user là Playwright Learner
test('Bài tập ecommerce', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
  await page.getByRole('tab', { name: 'Expect Assertions' }).click();

  //1. so sánh tên của user
  const userName = page.locator('#profile-name');
  const userNameText = await userName.innerText();

  expect(userNameText).toBe('Playwright Learner');

  //   //2. so sánh Profile JSON có giá trị là
  //   {
  //   "id": 101,
  //   "role": "student",
  //   "active": true,
  //   "premium": false
  // }
  //   JSON.parse() -> chuyển json về object của TS
  const jsonText = await page.locator('#profile-json').innerText();
  const profile = JSON.parse(jsonText);
  expect(profile).toEqual({
    id: 101,
    role: 'student',
    active: true,
    premium: false,
  });

  //3. Check category chứa audio và category có độ dài là 3 phần tử
  //   array.length=> trả ra độ dài mảng
  const categories = await page.locator('#categories li').allInnerTexts();
  const categorieWebFirst = page.locator('#categories');
  console.log(categories);
  expect(categories.length).toBe(3);
  expect(categories).toContain('🎧 Audio');

  await expect(categorieWebFirst).toContainText('Audio');

  //4 check trạng thái còn hàng
  //   <div id="in-stock-flag" data-value="true" style="font-size: 12px; color: rgb(82, 196, 26);">✓ Available</div>
  //   qua data-value="true"
  //   => muốn convert sang boolean => Boolean(value)

  //   const inStock = await page.locator('#in-stock-flag').
  const status = await page.locator('#in-stock-flag').getAttribute('data-value');
  const st = Boolean(status);
  expect(st).toBeTruthy();
});
