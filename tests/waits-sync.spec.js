// tests/waits-sync.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Waits & Synchronization Demo', () => {
  
  // 🔹 Auto-wait demo
  test('Auto-wait for element', async ({ page }) => {
    await page.goto('https://demoqa.com/dynamic-properties');

    // The "Visible After 5 Seconds" button appears after 5 seconds
    const visibleBtn = page.locator('#visibleAfter');

    // Playwright automatically waits for the element to become visible before clicking
    await visibleBtn.click();

    await expect(visibleBtn).toBeVisible();
  });

  // 🔹 Explicit wait using waitForSelector
  test('Explicit wait with waitForSelector', async ({ page }) => {
    await page.goto('https://demoqa.com/dynamic-properties');

    // Wait explicitly for "Color Change" button to be attached in DOM
    await page.waitForSelector('#colorChange', { state: 'attached', timeout: 10000 });

    const colorBtn = page.locator('#colorChange');
    await expect(colorBtn).toBeVisible();
  });

  // 🔹 Synchronization with expect (best practice)
  test('Synchronization with expect', async ({ page }) => {
    await page.goto('https://demoqa.com/dynamic-properties');

    // This button gets enabled after 5s
    const enableBtn = page.locator('#enableAfter');

    // Assert it becomes enabled → Playwright waits automatically
    await expect(enableBtn).toBeEnabled();

    // Now click it safely
    await enableBtn.click();
  });

});
