// tests/alerts-frames-tabs.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Handling Alerts, Frames & Tabs (DemoQA)', () => {
  
  // 🔹 Alerts
  test('Handle Alerts', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    // Handle simple alert
    page.once('dialog', async dialog => {
      console.log('Alert message:', dialog.message());
      await dialog.accept(); // click OK
    });
    await page.click('#alertButton');

    // Handle confirm alert
    page.once('dialog', async dialog => {
      console.log('Confirm message:', dialog.message());
      await dialog.dismiss(); // click Cancel
    });
    await page.click('#confirmButton');
    await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');

    // Handle prompt alert
    page.once('dialog', async dialog => {
      console.log('Prompt message:', dialog.message());
      await dialog.accept('Playwright Rocks!'); // enter text
    });
    await page.click('#promtButton');
    await expect(page.locator('#promptResult')).toContainText('Playwright Rocks!');
  });

  // 🔹 Frames
  test('Handle Frames', async ({ page }) => {
    await page.goto('https://demoqa.com/frames');

    const frame1 = page.frame({ url: /sample/ }); // pick frame by URL match
    await expect(frame1.locator('#sampleHeading')).toHaveText('This is a sample page');
  });

  // 🔹 Tabs (new window)
  test('Handle Tabs', async ({ page, context }) => {
    await page.goto('https://demoqa.com/browser-windows');

    // Wait for a new tab (page) to open
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('#tabButton') // clicking opens new tab
    ]);

    await newPage.waitForLoadState();
    await expect(newPage.locator('body')).toContainText('This is a sample page');
    await newPage.close();
  });

});
