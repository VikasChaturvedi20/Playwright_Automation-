// tests/file-upload-download.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test('File Upload demo', async ({ page }) => {
  await page.goto('https://demoqa.com/upload-download');

  // File upload
  const fileInput = page.locator('#uploadFile');
  const filePath = path.join(__dirname, 'resources', 'sampleFile.txt');

  await fileInput.setInputFiles(filePath);
  await expect(page.locator('#uploadedFilePath')).toContainText('sampleFile.txt');
});

test('File Download demo', async ({ page }) => {
  await page.goto('https://demoqa.com/upload-download');

  // Wait for the download event
  const [download] = await Promise.all([
    page.waitForEvent('download'), // wait for download to trigger
    page.click('#downloadButton')  // click the button
  ]);

  // Save downloaded file to a custom path
  const downloadPath = path.join(__dirname, 'downloads', await download.suggestedFilename());
  await download.saveAs(downloadPath);

  // Assert file exists
  expect(fs.existsSync(downloadPath)).toBeTruthy();
  console.log(`✅ File downloaded successfully: ${downloadPath}`);
});
