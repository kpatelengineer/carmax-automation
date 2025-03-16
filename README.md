# Carmax.com Automation Framework

This project provides an automated testing framework for Carmax.com using Playwright with TypeScript, Allure reporting, and GitHub Actions integration.

## Features

- Page Object Model design pattern
- TypeScript support
- Test fixtures for data and authentication
- Allure reporting integration
- GitHub Actions CI/CD integration
- Cross-browser testing
- Mobile device testing simulation
- Automatic report cleanup between test runs

## Prerequisites

- Node.js 16+ and npm
- Git

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/carmax-automation.git
   cd carmax-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Create a `.env` file in the project root with the following content:
   ```
   BASE_URL=https://www.carmax.com
   USER_EMAIL=your_test_email@example.com
   USER_PASSWORD=your_test_password
   ```

## Running Tests

### Basic Test Run

Run all tests in headless mode:
```bash
npm test
```

### Run Tests with UI Mode

Run tests with Playwright's UI mode:
```bash
npm run test:ui
```

### Run Tests in Headed Mode

Run tests with browser visible:
```bash
npm run test:headed
```

### Run Tests in Debug Mode

Run tests with step-by-step debugging:
```bash
npm run test:debug
```

### Generate and Open Allure Report

Generate and open the Allure report after test execution:
```bash
npm run report
```

## Project Structure

- `/src/fixtures`: Test fixtures for authentication and data
- `/src/pages`: Page Object models
- `/src/tests`: Test files
- `/src/utils`: Utility functions
- `/allure-results`: Raw Allure test results
- `/allure-report`: Generated Allure HTML report

## Git Integration

This project includes GitHub Actions workflows for continuous integration. Tests will run automatically on:
- Push to main/master branch
- Pull request to main/master branch
- Daily at 6 AM UTC

## Test Data

Test data is stored in the `/test-data` directory. You can modify these files to change test scenarios.

## Adding New Tests

1. Create a new page object in `/src/pages` if needed
2. Create a new test file in `/src/tests`
3. Use the existing fixtures and utilities for consistent implementation

## Fixtures

Fixtures provide reusable test context:

- `auth`: Authentication actions (login, logout)
- `testData`: Test data for different scenarios

## Reporting

Allure reports include:
- Test execution details
- Screenshots of failures
- Test steps and durations
- Environment information
- Test categorization

## Maintenance

### Updating Dependencies

```bash
npm update
```

### Cleaning Reports

```bash
npm run report:clean
```

## Best Practices

- Use the Page Object Model pattern for maintainability
- Keep tests independent of each other
- Use fixtures for test data and authentication
- Add descriptive test names and steps
- Use assertion messages to clarify test failures

## Run Test
- npm run test

## Open Allure Report
- npm run allure:report
