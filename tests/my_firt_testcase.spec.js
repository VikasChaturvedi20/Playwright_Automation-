const { test, expect } = require('@playwright/test');

test('my first testcase', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle(/Google/);

  // Take screenshot and attach to report
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  // Attach inline in report
  await test.info().attach('google-homepage', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});
