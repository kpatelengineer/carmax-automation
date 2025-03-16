import { test as base } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the auth fixture type
export type AuthFixture = {
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  getAuthToken: () => string | null;
};

// Default credentials from environment variables
const DEFAULT_EMAIL = process.env.USER_EMAIL || 'test@example.com';
const DEFAULT_PASSWORD = process.env.USER_PASSWORD || 'password123';

// Create the auth fixture
export const auth = base.extend<{ auth: AuthFixture }>({
  auth: async ({ page }, use) => {
    // Token storage
    let authToken: string | null = null;
    
    // Login function
    const login = async (email = DEFAULT_EMAIL, password = DEFAULT_PASSWORD) => {
      await page.goto('/sign-in');
      await page.fill('input[type="email"]', email);
      await page.fill('input[type="password"]', password);
      await page.click('button[type="submit"]');
      
      // Wait for navigation to complete
      await page.waitForNavigation({ waitUntil: 'networkidle' });
      
      // Store auth token from localStorage if available
      authToken = await page.evaluate(() => localStorage.getItem('authToken'));
    };
    
    // Logout function
    const logout = async () => {
      await page.goto('/');
      // Click on account menu if exists
      const accountMenu = page.locator('.account-menu-button');
      if (await accountMenu.isVisible()) {
        await accountMenu.click();
        await page.click('text=Sign Out');
        await page.waitForNavigation();
      }
      authToken = null;
    };
    
    // Function to get the auth token
    const getAuthToken = () => authToken;
    
    // Provide the fixture
    await use({ login, logout, getAuthToken });
  }
});