// tests/login.spec.js
import { test, expect } from '@playwright/test';

test('Login page assertions - hard vs soft (valid login)', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://www.saucedemo.com/');

  // 🔹 Hard assertion - URL must be correct
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // 🔹 Hard assertion - Title must contain "Swag Labs"
  await expect(page).toHaveTitle(/Swag Labs/);

  // Locators
  const usernameInput = page.locator('#user-name');
  const passwordInput = page.locator('#password');
  const loginButton   = page.locator('#login-button');

  // 🔹 Hard assertion - elements must be visible
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(loginButton).toBeVisible();

  // 🔹 Soft assertion - placeholder checks (not critical)
  await expect.soft(usernameInput).toHaveAttribute('placeholder', 'Username');
  await expect.soft(passwordInput).toHaveAttribute('placeholder', 'Password');

  // Perform login with valid credentials
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  // 🔹 Hard assertion - successful login should land on inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // 🔹 Soft assertion - page heading check
  await expect.soft(page.locator('.title')).toHaveText('Products');
});


test('Login page assertions - negative scenario (invalid login)', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://www.saucedemo.com/');

  // Locators
  const usernameInput = page.locator('#user-name');
  const passwordInput = page.locator('#password');
  const loginButton   = page.locator('#login-button');
  const errorMessage  = page.locator('[data-test="error"]');

  // Perform login with invalid credentials
  await usernameInput.fill('invalid_user');
  await passwordInput.fill('wrong_password');
  await loginButton.click();

  // 🔹 Hard assertion - should stay on login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // 🔹 Hard assertion - error message should be visible
  await expect(errorMessage).toBeVisible();

  // 🔹 Soft assertion - error message text validation
  await expect.soft(errorMessage).toContainText('Epic sadface');
});
