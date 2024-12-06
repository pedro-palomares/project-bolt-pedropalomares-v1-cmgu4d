import { test, expect } from '@playwright/test';
import { login, clearStorageState } from './test-helpers';
import { TEST_USERS, ROUTES } from './environment';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorageState(page);
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await login(page, TEST_USERS.user.email, TEST_USERS.user.password);
    await expect(page).toHaveURL(ROUTES.dashboard);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('protected routes redirect to login when not authenticated', async ({ page }) => {
    await page.goto(ROUTES.dashboard);
    await expect(page).toHaveURL(new RegExp(ROUTES.login));
  });

  test('logout redirects to home', async ({ page }) => {
    await login(page, TEST_USERS.user.email, TEST_USERS.user.password);
    await page.click('text=Cerrar Sesión');
    await expect(page).toHaveURL(ROUTES.home);
  });

  test('admin login redirects to admin dashboard', async ({ page }) => {
    await login(page, TEST_USERS.admin.email, TEST_USERS.admin.password);
    await expect(page).toHaveURL('/admin');
    await expect(page.locator('h1')).toContainText('Panel de Administración');
  });
});