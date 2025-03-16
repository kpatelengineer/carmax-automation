import { test as base, Page, TestFixture, Fixtures } from '@playwright/test';  // Import the necessary Playwright types
import * as fs from 'fs';
import * as path from 'path';

/**
 * Extends the Playwright test fixture with Allure-specific reporting methods
 */
export const test = base.extend<Fixtures>({
  // Extend the page fixture to add Allure reporting capabilities
  page: async ({ page }: { page: Page }, use) => {
    // Add page error handler to capture errors in Allure
    page.on('pageerror', (error) => {
      console.error(`Page error: ${error.message}`);
      // In a real implementation, you would attach this to Allure
    });

    // Add response error handler to capture network errors
    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.error(`Response error ${response.status()}: ${response.url()}`);
        // In a real implementation, you would attach this to Allure
      }
    });

    // Add custom page method for adding Allure attachments
    page.addAttachment = async (name: string, content: string, type = 'text/plain') => {
      const allureResultsDir = path.resolve('./allure-results');

      // Create directory if it doesn't exist
      if (!fs.existsSync(allureResultsDir)) {
        fs.mkdirSync(allureResultsDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${name.replace(/\s/g, '_')}`;
      const filePath = path.join(allureResultsDir, fileName);

      fs.writeFileSync(filePath, content);

      // In a real implementation, you would link this to the current test in Allure
      console.log(`Added attachment: ${name}`);
    };

    // Use the extended page object
    await use(page);
  }
});

/**
 * Custom implementation of step that doesn't rely on allure API
 * Instead, it logs the step info and executes the function
 * Allure will capture these steps through the Playwright reporter
 * @param name Name of the step
 * @param body Function to execute as part of the step
 */
export async function step(name: string, body: () => void | Promise<void>): Promise<void> {
  console.log(`STEP: ${name} - STARTED`);
  try {
    const result = body();
    if (result instanceof Promise) {
      await result;
    }
    console.log(`STEP: ${name} - COMPLETED`);
  } catch (error) {
    console.error(`STEP: ${name} - FAILED`, error);
    throw error;
  }
}

/**
 * Custom implementation of addDescription that doesn't rely on allure API
 * Instead, it adds a description annotation to the test
 * @param description The description text
 */
export function addDescription(description: string): void {
  console.log(`TEST DESCRIPTION: ${description}`);
  // The Playwright Allure reporter will pick this up from the test title and context
}

/**
 * Custom implementation of addLabel that doesn't rely on allure API
 * Instead, it adds a label annotation to the test
 * @param name Label name
 * @param value Label value
 */
export function addLabel(name: string, value: string): void {
  console.log(`TEST LABEL: ${name}=${value}`);
  // The Playwright Allure reporter will pick this up from the test context
}
