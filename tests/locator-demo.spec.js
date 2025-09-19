// tests/locator-demo.spec.js
import { test, expect } from '@playwright/test';

test('Playwright Locator Strategies Demo with Screenshots', async ({ page }, testInfo) => {
  // Helper function to capture screenshot with step name
  async function captureStep(name) {
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(name, { body: screenshot, contentType: 'image/png' });
  }

  // 1. Navigate to page
  await page.goto('https://www.saucedemo.com/');
  await captureStep('1-Login page loaded');

  // 2. CSS Selectors
  await page.locator('#user-name').fill('standard_user');
  await page.locator('input[name="password"]').fill('secret_sauce');
  await captureStep('2-Entered username and password');
  await page.locator('.submit-button').click();
  await expect(page).toHaveURL(/inventory/);
  await captureStep('3-Logged in successfully');

  // 3. Text-based Locators
  await page.locator('text=Add to cart').first().click();
  await captureStep('4-Added first product to cart');
  await page.locator('button:has-text("Remove")').click();
  await captureStep('5-Removed product from cart');

  // 4. Role-based Locators
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await captureStep('6-Opened hamburger menu');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await captureStep('7-Logged out');

  // 5. Placeholder Locators
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await captureStep('8-Verified placeholders visible');

  // 6. Filtering / Chaining Example
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await captureStep('9-Entered credentials again');
  await page.locator('#login-button').click();

  const backpackCard = page.locator('.inventory_item').filter({ hasText: 'Backpack' });
  await expect(backpackCard.locator('button')).toHaveText('Add to cart');
  await captureStep('10-Located Backpack product');
});
