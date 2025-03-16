import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read environment variables from .env file
dotenv.config();

// Define base URL based on environment
const baseURL = process.env.BASE_URL || 'https://www.carmax.com';

export default defineConfig({
  testDir: './src/tests',
  outputDir: './test-results',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['line'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL,
    // Increase navigation timeout to 30 seconds
    navigationTimeout: 30000,
    // Don't automatically close the browser between tests
    browserName: 'chromium',
    headless: false,
    // Browser trace, screenshot and video settings
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Collect browser logs
    contextOptions: {
      logger: {
        isEnabled: (name, severity) => severity === 'error',
        log: (name, severity, message) => console.log(`Browser ${name}: ${message}`)
      }
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] }
    }
  ]
});