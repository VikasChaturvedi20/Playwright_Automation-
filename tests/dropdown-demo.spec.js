// tests/dropdown-demo.spec.js
import { test, expect } from '@playwright/test';

test.describe('DemoQA Dropdown Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu', { timeout: 60000 });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await testInfo.attach(`screenshot-${testInfo.title}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });

  // 1) Classic <select>
  test('Classic select dropdown', async ({ page }) => {
    await page.locator('#oldSelectMenu').selectOption({ label: 'Green' });
    await expect(page.locator('#oldSelectMenu option:checked')).toHaveText('Green');
  });

  // 2) Custom single select (Select One)
  test('Custom div dropdown - Select One', async ({ page }) => {
    await page.locator('#selectOne .css-1hwfws3').click();
    await page.locator('div[id*="react-select"] >> text=Mr.').click();
    await expect(page.locator('#selectOne .css-1uccc91-singleValue')).toHaveText('Mr.');
  });

  // 3) Custom single select (Select Value with groups)
  test('Custom div dropdown - Select Value', async ({ page }) => {
    await page.locator('#withOptGroup .css-1hwfws3').click();
    await expect(page.locator('div[id*="react-select"]')).toBeVisible();
    await page.locator('div[id*="react-select"] >> text=Group 1, option 2').click();
    await expect(page.locator('#withOptGroup .css-1uccc91-singleValue'))
      .toHaveText('Group 1, option 2');
  });

  // 4) Custom multi-select (React based)
  test('Custom multi-select dropdown', async ({ page }) => {
    // Focus the input before each selection
    const multiInput = page.locator('#react-select-4-input');

    // Select Green
    await multiInput.fill('Green');
    await page.locator('div[id*="react-select"] >> text=Green').click();

    // Select Blue
    await multiInput.fill('Blue');
    await page.locator('div[id*="react-select"] >> text=Blue').click();

    // Select Black
    await multiInput.fill('Black');
    await page.locator('div[id*="react-select"] >> text=Black').click();

    // The selected tags have class .css-1rhbuit-multiValue (updated selector for multi-value tags)
    const selectedOptions = page.locator('#selectMenuContainer .css-1rhbuit-multiValue');
    await expect(selectedOptions).toContainText(['Green', 'Blue', 'Black']);
  });

  // 5) Standard multi-select (<select multiple>)
  test('Standard HTML multi-select', async ({ page }) => {
    const standardMulti = page.locator('#cars');
    await standardMulti.selectOption(['volvo', 'opel', 'audi']); // use values, not labels

    // Get all selected options and their text
    const selectedTexts = await standardMulti.locator('option:checked').allTextContents();
    expect(selectedTexts.sort()).toEqual(['Audi', 'Opel', 'Volvo'].sort());
  });
});
