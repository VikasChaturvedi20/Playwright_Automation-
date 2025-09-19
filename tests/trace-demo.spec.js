import { test, expect } from '@playwright/test';

//  Test 1: Valid login (expected to PASS)
test('Valid login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Hard assertion: user should land on inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
});

// 🔹 Test 2: Invalid login (expected to FAIL → generates trace)
test('Invalid login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('invalid_user');
  await page.locator('#password').fill('wrong_password');
  await page.locator('#login-button').click();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();

  // ❌ Intentional failure (wrong expectation to trigger trace recording)
  await expect(errorMessage).toHaveText('This will not match');
});
