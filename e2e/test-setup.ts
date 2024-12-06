import { expect, type Page } from '@playwright/test';

export async function setupTest(page: Page) {
  // Extend timeout for slow operations
  page.setDefaultTimeout(30000);

  // Add custom assertions
  expect.extend({
    async toBeLoggedIn(page: Page) {
      const isLoggedIn = await page.evaluate(() => {
        return !!localStorage.getItem('auth-storage');
      });
      return {
        message: () => `expected user to ${isLoggedIn ? 'not ' : ''}be logged in`,
        pass: isLoggedIn,
      };
    },
  });

  // Clear storage state before each test
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}