import { test, expect } from '@playwright/test';

test('Run parallel tests across contexts (multi-user simulation)', async ({ browser }) => {
  // Create two independent contexts (like two users in different sessions)
  const user1Context = await browser.newContext();
  const user2Context = await browser.newContext();

  // Open pages for both users
  const user1Page = await user1Context.newPage();
  const user2Page = await user2Context.newPage();

  // User 1: Valid login
  await user1Page.goto('https://www.saucedemo.com/');
  await user1Page.fill('#user-name', 'standard_user');
  await user1Page.fill('#password', 'secret_sauce');
  await user1Page.click('#login-button');
  await expect(user1Page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(user1Page.locator('.title')).toHaveText('Products');

  // User 2: Invalid login
  await user2Page.goto('https://www.saucedemo.com/');
  await user2Page.fill('#user-name', 'invalid_user');
  await user2Page.fill('#password', 'wrong_password');
  await user2Page.click('#login-button');
  const errorMessage = user2Page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect.soft(errorMessage).toContainText('Epic sadface');

  // Close contexts
  await user1Context.close();
  await user2Context.close();
});
