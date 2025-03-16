import { expect, test } from '@playwright/test';

test.describe('Carmax Vehicle Search Tests', () => {

  test('Navigate to CarMax homepage', async ({ page }) => {
    try {
      // Navigate to the homepage and wait for it to load completely
      await page.goto('https://www.carmax.com', { waitUntil: 'load' });

      // Optional: Check the page title to verify the navigation was successful
      const pageTitle = await page.title();
      console.log('Page Title:', pageTitle);  // Optionally print the title

      // Verify the URL after navigation (optional)
      const currentUrl = await page.url();
      console.log('Current URL:', currentUrl);
      expect(pageTitle).toEqual('CarMax - Shop for used cars, then buy online or at a store');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;  // Re-throw error after logging
    }
  });

});
