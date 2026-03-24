# SauceDemo Playwright Framework

A ready-to-run Playwright JavaScript framework that demonstrates:

- UI automation against [SauceDemo](https://www.saucedemo.com)
- API automation against [Restful-Booker](https://restful-booker.herokuapp.com)
- reusable Page Objects, API client layer, fixtures, and environment config
- GitHub Actions CI pipeline with Playwright HTML report upload

## Why UI and API are split across two demo systems

SauceDemo is a strong target for UI flows such as login, cart, checkout, and logout.
For API coverage in a take-home assignment, this framework uses Restful-Booker because it is a public demo API designed for CRUD/auth automation practice.

This keeps the framework stable and interview-friendly:

- UI suite proves browser automation on a realistic ecommerce demo app
- API suite proves request modeling, auth handling, contract checks, and CI execution

## Tech stack

- Playwright Test
- JavaScript (CommonJS)
- AJV for basic API schema validation
- dotenv for environment configuration
- GitHub Actions for CI

## Project structure

```text
.
├─ .github/
│  └─ workflows/
│     └─ playwright.yml
├─ src/
│  ├─ api/
│  │  └─ clients/
│  │     └─ booking.client.js
│  ├─ config/
│  │  └─ env.js
│  ├─ fixtures/
│  │  └─ api.fixture.js
│  ├─ ui/
│  │  └─ pages/
│  │     ├─ cart.page.js
│  │     ├─ checkout.page.js
│  │     ├─ inventory.page.js
│  │     └─ login.page.js
│  └─ utils/
│     └─ dataFactory.js
├─ tests/
│  ├─ api/
│  │  └─ booking/
│  │     └─ booking.spec.js
│  └─ ui/
│     ├─ auth/
│     │  └─ login.spec.js
│     ├─ cart/
│     │  └─ cart.spec.js
│     └─ checkout/
│        └─ checkout.spec.js
├─ .env.example
├─ .gitignore
├─ eslint.config.js
├─ package.json
├─ playwright.config.js
└─ README.md
```

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd saucedemo-playwright-framework
npm ci
```

### 2. Install Playwright browsers

```bash
npx playwright install --with-deps
```

### 3. Create environment file

```bash
cp .env.example .env
```

## Run tests

Run everything:

```bash
npm test
```

Run only UI suite:

```bash
npm run test:ui
```

Run only API suite:

```bash
npm run test:api
```

Run headed UI tests:

```bash
npm run test:headed
```

Open HTML report:

```bash
npm run report
```
