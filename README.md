# Playwright_Automation

In this repo we will cover all the topics related to Playwright.

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VikasChaturvedi20/Playwright_Automation-.git
   cd Playwright_Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🚀 Running Tests

- **Run all tests:**
  ```bash
  npx playwright test
  ```

- **Run a specific test file:**
  ```bash
  npx playwright test tests/hooks.spec.js
  ```

- **View HTML report:**
  ```bash
  npx playwright show-report
  ```

## 🧪 Test Cases Covered

- **Valid Login:**  
  Checks login with correct credentials and verifies successful navigation to the inventory page.

- **Invalid Login:**  
  Checks login with incorrect credentials and verifies that an error message is displayed.

## 🛠️ Project Structure

```
Playwright_Automation/
├── tests/
│   └── hooks.spec.js
├── README.md
├── package.json
└── ...
```

## 📚 Topics Covered

- Playwright test hooks (`beforeAll`, `afterAll`, `beforeEach`, `afterEach`)
- Page navigation and interaction
- Assertions for URL, text, and visibility
- Screenshot capture and attachment to reports

---

Feel free to
