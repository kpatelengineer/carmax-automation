import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://www.carmax.com';
  }

  /**
   * Navigate to a specific path with improved error handling
   */
  async navigate(path: string = ''): Promise<void> {
    const fullUrl = `${this.baseUrl}${path}`;
    console.log(`Navigating to: ${fullUrl}`);
    try {
      await this.page.goto(fullUrl, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      console.log(`Successfully navigated to: ${fullUrl}`);
    } catch (error: any) {  // Use any type or Error type
      console.error(`Navigation failed to ${fullUrl}: ${error.message}`);
      await this.page.screenshot({ path: `navigation-error-${Date.now()}.png` });
      throw error;
    }
  }

  
}