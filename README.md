"# Playwright E2E Automation Framework

A comprehensive end-to-end testing automation framework built with **Playwright** and **Allure Reporting**. This project automates the testing of web applications with advanced reporting capabilities, screenshot attachments on failure, and detailed test analytics.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scripts](#test-scripts)
- [Viewing Reports](#viewing-reports)
- [Writing Tests](#writing-tests)
- [Allure Integration](#allure-integration)
- [Failure Screenshots](#failure-screenshots)
- [Test Files Overview](#test-files-overview)
- [Troubleshooting](#troubleshooting)

---

## 📌 Project Overview

This project provides an automated testing solution for web applications using Playwright, a modern cross-browser automation framework. It includes:

- ✅ **E2E Test Automation** - Complete user journey testing
- ✅ **Allure Reporting** - Rich, interactive test reports with attachments
- ✅ **Automatic Failure Screenshots** - Visual debugging of failed tests
- ✅ **Test Metadata** - Labels, severity levels, and test categorization
- ✅ **CI/CD Ready** - Designed for integration pipelines

---

## ✨ Features

### 1. **Playwright Testing**
- Cross-browser testing (Chromium)
- Modern E2E testing practices
- Reliable element locators
- Advanced browser interactions

### 2. **Allure Reporting**
- Interactive HTML test reports
- Test execution timeline
- Test steps with screenshots
- Test history and statistics
- Defect tracking and categorization

### 3. **Failure Screenshots**
- Automatic screenshot capture on test failure
- Manual screenshot attachment at any point
- Full-page screenshots
- HTML source and test metadata

### 4. **Test Metadata**
- Feature and story labels
- Severity levels (Blocker, Critical, Normal, Minor, Trivial)
- Custom test descriptions
- External links and documentation

---

## 📁 Project Structure

```
Playwright Automation/
├── tests/
│   ├── Assignment.spec.js          # E2E registration and login tests
│   ├── UIBasic.spec.js             # Web client app login tests
│   └── helpers/
│       └── allureHelper.js         # Allure screenshot utilities
├── playwright.config.js             # Playwright configuration
├── package.json                     # Project dependencies
├── .allurerc.json                  # Allure report configuration
├── .gitignore                      # Git ignore file
├── README.md                       # This file
├── FAILURE_SCREENSHOT_GUIDE.md     # Failure screenshot documentation
│
├── allure-results/                 # Auto-generated Allure results
├── allure-report/                  # Generated Allure HTML report
├── playwright-report/              # Playwright HTML report
└── test-results/                   # Test error/result details
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | ^1.58.2 | Browser automation framework |
| **Node.js** | Latest | Runtime environment |
| **Allure** | ^2.38.1 | Test reporting |
| **allure-playwright** | ^3.7.1 | Allure Playwright integration |

---

## 📦 Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control)
- Modern browser (Chrome/Chromium)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ProshantaDebnath/PlaywrightAutomation.git
cd "Playwright Automation"
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- `@playwright/test` - Playwright testing library
- `allure-playwright` - Allure reporter for Playwright
- `allure-commandline` - Allure CLI tool
- `@types/node` - TypeScript node definitions

### 3. Verify Installation
```bash
npx playwright --version
allure --version
```

---

## ⚙️ Configuration

### Playwright Config (`playwright.config.js`)

```javascript
{
  testDir: './tests',              // Test directory
  timeout: 40 * 1000,             // Test timeout (40 seconds)
  expect: { timeout: 40 * 1000 }, // Assertion timeout
  reporter: [
    ['allure-playwright'],         // Allure reporter
    ['html']                       // HTML reporter
  ],
  use: {
    browserName: 'chromium',       // Browser type
    headless: false                // Run in headed mode
  }
}
```

## 🧪 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in interactive UI mode
npm run test:ui
```

### Run Specific Test

```bash
npx playwright test Assignment.spec.js
npx playwright test UIBasic.spec.js
```

### Run with Filter

```bash
# Run tests matching pattern
npx playwright test --grep "@Register"
npx playwright test --grep "@Web Client"
```

---

## 📜 Test Scripts

The following npm scripts are available:

| Script | Command | Purpose |
|--------|---------|---------|
| `test` | `playwright test` | Run all tests |
| `test:headed` | `playwright test --headed` | Run tests with visible browser |
| `test:ui` | `playwright test --ui` | Interactive test runner UI |
| `allure:report` | `allure generate allure-results --clean -o allure-report` | Generate Allure report |
| `allure:open` | `allure open allure-report` | Open report in browser |
| `test:allure` | Run tests + generate + open report | Complete workflow |

### Usage Examples

```bash
# Run all tests and view Allure report
npm run test:allure

# Run tests in UI mode
npm run test:ui

# Just generate the report from existing results
npm run allure:report

# Open the generated report
npm run allure:open
```

---

## 📊 Viewing Reports

### Allure Report

Generate and view the interactive Allure report:

```bash
npm run test:allure
```

The report includes:
- 📈 Test execution timeline
- ✅ Test results by status
- 📸 Screenshots and attachments
- 📋 Test steps and logs
- 📊 Statistics and charts
- 🔗 External links

### Playwright Report

After running tests, open the Playwright HTML report:

```bash
npx playwright show-report
```

### Test Structure Best Practices

✅ **DO:**
- Use clear test names and descriptions
- Organize tests by feature/story
- Add Allure labels for categorization
- Add steps for complex flows
- Attach screenshots at key points

❌ **DON'T:**
- Use overly generic test names
- Make tests dependent on each other
- Skip error handling
- Use hardcoded waits instead of explicit waits

---

## 🎯 Allure Integration

### Test Labels

```javascript
await allure.label('feature', 'User Authentication');
await allure.label('story', 'User Login');
await allure.label('severity', 'critical');
await allure.label('owner', 'QA Team');
```

### Attachments

```javascript
// Attach screenshot
const screenshot = await page.screenshot();
await allure.attachment('My Screenshot', screenshot, 'image/png');

// Attach text
await allure.attachment('Test Log', 'Test execution log', 'text/plain');

// Attach JSON
await allure.attachment('Test Data', JSON.stringify(data), 'application/json');
```

### External Links

```javascript
await allure.link('https://jira.company.com/PROJ-123', 'JIRA Issue');
await allure.link('https://github.com/repo', 'GitHub');
```

---

## 📸 Failure Screenshots

The project includes automatic failure screenshot attachment. See [FAILURE_SCREENSHOT_GUIDE.md](./FAILURE_SCREENSHOT_GUIDE.md) for detailed documentation.

### Quick Usage

```javascript
// Automatic on failure (requires afterEach hook)
test.afterEach(async ({ page }, testInfo) => {
  await attachFailureScreenshot(page, testInfo);
});

// Manual screenshot anytime
await attachScreenshot(page, 'my-screenshot');

// Full context on failure
await attachFailureContext(page, testInfo);
```

Helper methods available:
- `attachFailureScreenshot()` - Auto-capture on failure
- `attachScreenshot()` - Manual screenshot
- `attachFailureContext()` - Full context (screenshot + HTML + metadata)

---

## 📝 Test Files Overview

### 1. **Assignment.spec.js**
E2E test for complete registration and login workflow
- ✅ Navigate to application
- ✅ Complete user registration form
- ✅ Login with registered credentials
- ✅ Verify dashboard and products

**Test Credentials:**
- Email: `tesstsg12@gmail.com`
- Password: `testing242512@!F`
- URL: `https://rahulshettyacademy.com/client`

**Expected Products:** ADIDAS ORIGINAL, ZARA COAT 3, iphone 13 pro

### 2. **UIBasic.spec.js**
Test for web client app login and product verification
- ✅ Navigate to practice app
- ✅ Enter credentials
- ✅ Verify successful login
- ✅ Validate product list

**Test Credentials:**
- Username: `rahulshettyacademy`
- Password: `Learning@830$3mK2`
- URL: `https://rahulshettyacademy.com/loginpagePractise/`

**Expected Products:** iphone X, Samsung Note 8, Nokia Edge, Blackberry

---

## 🔧 Troubleshooting

### Issue: Tests not running
```bash
# Verify Playwright is installed
npx playwright --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Allure report not generating
```bash
# Check if allure-results folder exists
ls -la allure-results/

# Verify Allure CLI is installed
allure --version

# Regenerate report
npm run allure:report
```

### Issue: Screenshots not appearing in report
- Ensure `test.afterEach` hook is properly configured
- Check that tests are actually failing (failure screenshots only capture on failure)
- Verify `allure-results/` folder contains data

### Issue: Chromium not found
```bash
# Install Chromium browser
npx playwright install chromium
```

### Issue: Port already in use (when opening report)
```bash
# Kill process on port or let Allure choose a different port
npx allure open allure-report --host localhost --port 8080
```

### Enable Debug Mode
```bash
# Run tests with debug information
PWDEBUG=1 npm test

# Run with verbose logging
npm test -- --reporter=list
```
## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-page)
- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Plugin](https://github.com/allure-framework/allure-playwright)

---

## 🤝 Contributing

1. Create a new feature branch
2. Add tests for new functionality
3. Ensure all tests pass
4. Create a pull request

---

## 📄 License

ISC

---

## 👤 Author

QA Automation Team

---

## 📞 Support

For issues or questions, please open a GitHub issue or contact the QA team.

**Last Updated:** April 2026" 
