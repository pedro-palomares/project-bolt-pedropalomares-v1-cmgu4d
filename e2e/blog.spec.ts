import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('displays blog posts and allows navigation', async ({ page }) => {
    await page.goto('/blog');
    
    // Check if blog posts are displayed
    await expect(page.locator('article')).toHaveCount(3);
    
    // Click on first blog post
    await page.click('article:first-child a');
    
    // Should navigate to blog post page
    await expect(page).toHaveURL(/.*\/blog\/.*/);
    
    // Check if blog post content is displayed
    await expect(page.locator('article h1')).toBeVisible();
    await expect(page.locator('.prose')).toBeVisible();
  });
});