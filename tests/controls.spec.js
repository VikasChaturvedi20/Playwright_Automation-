// tests/controls.spec.js
import { test, expect } from '@playwright/test';

test.describe('DemoQA Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
  });

  test('Select option from classic dropdown', async ({ page }, testInfo) => {

    const select1 = page.locator('#oldSelectMenu');
    await expect(select1).toBeVisible();

    await select.selectOption({ label: 'Green' });
    await expect(page.locator('#oldSelectMenu option:checked')).toHaveText('Green');  
      
    const select = page.locator('#oldSelectMenu');
    await expect(select).toBeVisible();

    await select.selectOption({ label: 'Green' });
    await expect(page.locator('#oldSelectMenu option:checked')).toHaveText('Green');

    await testInfo.attach('dropdown-final', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test.describe('DemoQA Checkboxes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
  });

  test('Interact with checkboxes (expand and check items)', async ({ page }, testInfo) => {
    // Expand all checkbox tree items
    const expandAll = page.locator('button[title="Expand all"]');
    if (await expandAll.isVisible()) {
      await expandAll.click();
    }

    // Use the correct locator for checkboxes (they are not native <input type="checkbox">)
    const desktopCheckbox = page.locator('label[for="tree-node-desktop"] span.rct-checkbox');
    const downloadsCheckbox = page.locator('label[for="tree-node-downloads"] span.rct-checkbox');

    // Check Desktop
    await desktopCheckbox.click();
    await expect(page.locator('span.rct-title', { hasText: 'Desktop' }).locator('xpath=ancestor::li')).toHaveClass(/rct-node-leaf rct-node-parent rct-node-expanded/);

    // Check Downloads
    await downloadsCheckbox.click();
    await expect(page.locator('span.rct-title', { hasText: 'Downloads' }).locator('xpath=ancestor::li')).toHaveClass(/rct-node-leaf rct-node-parent rct-node-expanded/);

    // Uncheck Desktop
    await desktopCheckbox.click();

    await testInfo.attach('checkbox-state', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test.describe('DemoQA Radio Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
  });

  test('Select radio buttons and verify states', async ({ page }, testInfo) => {
    // Use the correct locator for radio buttons (they are not native <input type="radio">)
    const yesRadio = page.locator('label[for="yesRadio"]');
    const impressiveRadio = page.locator('label[for="impressiveRadio"]');
    const noRadio = page.locator('label[for="noRadio"]');

    // Select Yes radio
    await yesRadio.click();
    await expect(page.locator('.text-success')).toHaveText('Yes');

    // Select Impressive radio
    await impressiveRadio.click();
    await expect(page.locator('.text-success')).toHaveText('Impressive');

    // No radio should be disabled
    await expect(noRadio).toHaveClass(/disabled/);

    await testInfo.attach('radio-state', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});
