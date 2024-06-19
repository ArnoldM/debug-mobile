import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('home');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Ionic App/);
});

test('has welcome message', async ({ page }) => {
  await page.goto('home');
  await page.getByLabel('Email').fill('coucou@test.com');
  await expect(page.locator('#container')).toContainText('Ready to create an app?');
});
