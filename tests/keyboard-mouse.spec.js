// tests/keyboard-mouse.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Keyboard & Mouse Actions DemoQA', () => {

  // 🔹 Mouse Hover
  test('Mouse Hover', async ({ page }) => {
    await page.goto('https://demoqa.com/tool-tips');

    const hoverBtn = page.locator('#toolTipButton');
    await hoverBtn.hover();

    const tooltip = page.locator('.tooltip-inner');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('You hovered over the Button');
  });

  // 🔹 Drag & Drop (Simple tab only)
  test('Drag and Drop (Simple Tab)', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');

    // Make sure "Simple" tab is active
    await page.locator('#droppableExample-tab-simple').click();

    const draggable = page.locator('#draggable');
    const droppable = page.locator('#simpleDropContainer #droppable');

    // Drag and drop
    await draggable.dragTo(droppable);

    await expect(droppable).toHaveText('Dropped!');
  });

  // 🔹 Keyboard actions
  test('Keyboard Typing & Shortcuts', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    const inputBox = page.locator('#userName');

    // Ensure input is visible and focus it first
    await inputBox.click();

    // Type text with delay
    await inputBox.type('Playwright Test', { delay: 100 });

    // Keyboard shortcuts
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+X');
    await page.keyboard.press('Control+V');

    // Assert value
    await expect(inputBox).toHaveValue('Playwright Test');
  });

});
