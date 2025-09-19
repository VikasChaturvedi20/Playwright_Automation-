// tests/hooks.spec.js
import { test, expect } from '@playwright/test';

let page;

test.beforeAll(async ({ browser }) => {
  console.log('👉 beforeAll: Launching browser...');
  const context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  console.log('👉 afterAll: Closing page...');
  await page.close();
});

test.beforeEach(async () => {
  console.log('👉 beforeEach: Navigating to login page...');
  await page.goto('https://www.saucedemo.com/');
});

test.afterEach(async ({}, testInfo) => {
  console.log('👉 afterEach: Capturing screenshot...');
  // Attach screenshot for each test (pass or fail)
  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
});


test('Valid login', async () => {
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // ✅ wait until redirected
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
});


test('Invalid login', async () => {
  await page.locator('#user-name').fill('invalid_user');
  await page.locator('#password').fill('wrong_pass');
  await page.locator('#login-button').click();

  const errorMessage = page.locator('[data-test="error"]');
  // ✅ wait until error is visible
  await expect(errorMessage).toBeVisible();
  await expect.soft(errorMessage).toContainText('Epic sadface');
});
