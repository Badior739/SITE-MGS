import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    expect(page).toHaveURL('/');
    const title = await page.title();
    expect(title).toContain('Mind Graphix');
  });

  test('should have header with navigation', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const navLinks = page.locator('nav a');
    expect(await navLinks.count()).toBeGreaterThan(0);
  });

  test('should have main content area', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have footer with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const footerLinks = footer.locator('a');
    expect(await footerLinks.count()).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.locator('header');
    await expect(header).toBeVisible();

    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have accessible heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });

  test('should have working navigation links', async ({ page }) => {
    const navLinks = page.locator('nav a');
    const firstLink = navLinks.first();

    const href = await firstLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('should have good page performance', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      return {
        navigationTiming: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
        resourceTiming: window.performance.getEntriesByType('navigation')[0],
      };
    });

    // Page should load within reasonable time
    expect(metrics.navigationTiming).toBeLessThan(5000);
  });

  test('should handle dynamic content loading', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const content = page.locator('main');
    await expect(content).toBeVisible();
  });
});
