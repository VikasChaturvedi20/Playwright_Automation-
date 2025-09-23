import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Page Tests with Test-Level Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // 🔹 After each test, capture a screenshot
  test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(`screenshot-${testInfo.title}`, {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  // ✅ Positive Test: Valid login
  test('Login with valid standard_user', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // ✅ Negative Test: Invalid username
  test('Login with invalid username', async ({ page }) => {
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });

  // ✅ Negative Test: Empty username
  test('Login with empty username', async ({ page }) => {
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username is required');
  });

  // ✅ Negative Test: Locked out user
  test('Login with locked_out_user', async ({ page }) => {
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
  });
});
