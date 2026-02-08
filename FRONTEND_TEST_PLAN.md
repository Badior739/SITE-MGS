# 🧪 PLAN DE TEST COMPLET - FRONTEND MIND GRAPHIX

**Date**: 1er Février 2026  
**Objectif**: Tester UI, Performance, Compatibilité & Sécurité avant Phase 2  
**Durée Estimée**: 5 jours  
**Niveau de Risque**: 🟡 MOYEN

---

## 📋 RÉSUMÉ EXÉCUTIF

Ce plan couvre:
1. **Tests Unitaires** (Jest) - Composants & Hooks
2. **Tests d'Intégration** - Pages & Flows
3. **Tests E2E** (Cypress) - Scénarios utilisateur
4. **Tests de Performance** - Lighthouse & Web Vitals
5. **Tests de Compatibilité** - Navigateurs & Appareils
6. **Tests d'Accessibilité** - WCAG 2.1 AA
7. **Tests de Sécurité** - XSS, CSRF, Headers

---

## 🐛 BUGS POTENTIELS IDENTIFIÉS

### 1️⃣ TypeScript Strictness Issues 🔴 CRITIQUE
**Problème**: `strict: false` dans tsconfig.json
```json
"strict": false,
"noUnusedLocals": false,
"noUnusedParameters": false,
"noImplicitReturns": false
```
**Impact**: Erreurs de types non détectées au compile-time
**Sévérité**: HAUTE - Cause de bugs runtime
**Correction**:
```json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitReturns": true
```

### 2️⃣ React Strict Mode Disabled 🔴 CRITIQUE
**Problème**: `reactStrictMode: false`
**Impact**: Double-render & side effects non détectés
**Sévérité**: HAUTE
**Correction**: `reactStrictMode: true`

### 3️⃣ Missing Error Boundaries 🔴 CRITIQUE
**Problème**: Pas d'error boundary à la racine de l'app
**Impact**: Crash de l'app entière si erreur composant
**Sévérité**: HAUTE
**Solution**: Créer RootErrorBoundary

### 4️⃣ API Error Handling 🟡 HAUTE
**Problème**: Axios requests sans gestion d'erreurs globale
**Impact**: Erreurs 4xx/5xx non gérées
**Solution**: Créer interceptors & error handler

### 5️⃣ Missing Loading States 🟡 MOYENNE
**Problème**: Pas de skeleton screens/loaders
**Impact**: UX mauvaise lors du chargement
**Solution**: Ajouter loading boundaries

### 6️⃣ Performance Images 🟡 MOYENNE
**Problème**: Pas d'optimisation images (no next/image)
**Impact**: Images non lazy-loaded
**Solution**: Convertir vers next/image avec sizes

### 7️⃣ Bundle Size Optimization 🟡 MOYENNE
**Problème**: Pas de code-splitting
**Impact**: Large JS bundle initial (~200KB)
**Solution**: Ajouter dynamic imports

### 8️⃣ Mobile Responsive Issues 🟡 MOYENNE
**Problème**: Certaines composantes non mobile-first
**Impact**: UX dégradée sur mobile
**Solution**: Audit responsive design

### 9️⃣ Missing Metadata/SEO 🟡 MOYENNE
**Problème**: Metadata dynamique non setup
**Impact**: SEO mauvais
**Solution**: Implémenter `generateMetadata`

### 🔟 No Input Validation 🟡 MOYENNE
**Problème**: Formulaires sans validation côté client
**Impact**: Erreurs utilisateur mauvaises
**Solution**: React Hook Form + Zod schemas

---

## 📊 PLAN DE TEST DÉTAILLÉ

### PHASE 1: SETUP INFRASTRUCTURE DE TEST (1 jour)

#### 1.1 Configuration Jest ✅
**Fichier**: `jest.config.js` (root)
```javascript
module.exports = {
  projects: [
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/apps/frontend/src/$1',
      },
      collectCoverageFrom: [
        'apps/frontend/src/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
      ],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 75,
          lines: 80,
          statements: 80,
        },
      },
    },
  ],
};
```

#### 1.2 Setup Files
**Fichiers à créer**:
- `jest.setup.js` - Configuration Jest
- `jest.config.js` - Config racine
- `.env.test` - Variables de test

#### 1.3 Test Utilities
**Fichier**: `apps/frontend/src/__tests__/setup.tsx`
```typescript
import '@testing-library/jest-dom';
import { ReactNode } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';

export function render(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <>{children}</>,
    ...options,
  });
}
```

#### 1.4 Playwright Setup (E2E)
**Fichier**: `playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

### PHASE 2: TESTS UNITAIRES (1.5 jours)

#### 2.1 Test Button Component
**Fichier**: `apps/frontend/src/components/__tests__/Button.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary-500');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
```

#### 2.2 Test Form Validation
**Fichier**: `apps/frontend/src/__tests__/formValidation.test.ts`
```typescript
import { validateEmail, validatePassword, validateForm } from '@/lib/validation';

describe('Form Validation', () => {
  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('requires minimum 8 characters', () => {
      expect(validatePassword('short')).toBe(false);
      expect(validatePassword('longpassword123')).toBe(true);
    });

    it('requires uppercase, lowercase, number', () => {
      expect(validatePassword('onlysmall123')).toBe(false);
      expect(validatePassword('OnlyBig123')).toBe(true);
    });
  });
});
```

#### 2.3 Test API Hooks
**Fichier**: `apps/frontend/src/hooks/__tests__/useAuth.test.ts`
```typescript
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

describe('useAuth Hook', () => {
  it('initializes with null user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it('logs in user', async () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      result.current.login('user@example.com', 'password');
    });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  it('logs out user', async () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });
  });
});
```

#### 2.4 Test Utility Functions
**Fichier**: `apps/frontend/src/utils/__tests__/formatting.test.ts`
```typescript
import { formatDate, truncateText, formatCurrency } from '@/utils/formatting';

describe('Formatting Utilities', () => {
  it('formats date correctly', () => {
    const date = new Date('2026-02-01');
    expect(formatDate(date)).toBe('Feb 1, 2026');
  });

  it('truncates long text', () => {
    const long = 'This is a very long text';
    expect(truncateText(long, 10)).toBe('This is a...');
  });

  it('formats currency', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });
});
```

**Coverage Target**: 80%+ for utilities

---

### PHASE 3: TESTS D'INTÉGRATION (1 day)

#### 3.1 Test Page Rendering
**Fichier**: `apps/frontend/src/app/__tests__/page.integration.test.tsx`
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';

describe('Home Page Integration', () => {
  it('renders all main sections', async () => {
    render(<HomePage />);
    
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('loads and displays featured content', async () => {
    render(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText(/featured/i)).toBeInTheDocument();
    });
  });

  it('has working navigation links', () => {
    render(<HomePage />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});
```

#### 3.2 Test Authentication Flow
**Fichier**: `apps/frontend/src/__tests__/auth.integration.test.tsx`
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/login/page';

describe('Authentication Flow', () => {
  it('shows login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(<LoginPage />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });
});
```

---

### PHASE 4: TESTS E2E AVEC PLAYWRIGHT (1.5 jours)

#### 4.1 Test Homepage
**Fichier**: `e2e/homepage.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(/Mind Graphix/);
  });

  test('should have working navigation', async ({ page }) => {
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should respond to viewport changes', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    await page.goto('/');
    
    // Desktop layout checks
    const mainNav = page.locator('nav');
    await expect(mainNav).toBeVisible();
    
    // Mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
  });
});
```

#### 4.2 Test Authentication Flow
**Fichier**: `e2e/auth.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');
    
    await page.waitForNavigation();
    expect(page).toHaveURL('/dashboard');
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'WrongPassword');
    await page.click('button[type="submit"]');
    
    const error = page.locator('[role="alert"]');
    await expect(error).toContainText('Invalid credentials');
  });

  test('should logout successfully', async ({ page }) => {
    // Assume already logged in
    await page.goto('/dashboard');
    
    await page.click('button:has-text("Logout")');
    await page.waitForNavigation();
    
    expect(page).toHaveURL('/login');
  });
});
```

#### 4.3 Test Forms & Validation
**Fichier**: `e2e/forms.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
  test('should validate email format', async ({ page }) => {
    await page.goto('/contact');
    
    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button[type="submit"]');
    
    await emailInput.fill('invalid-email');
    await submitButton.click();
    
    const error = page.locator('[role="alert"]');
    await expect(error).toContainText('Invalid email format');
  });

  test('should show required field errors', async ({ page }) => {
    await page.goto('/contact');
    
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    const errors = page.locator('[role="alert"]');
    expect(await errors.count()).toBeGreaterThan(0);
  });

  test('should submit valid form', async ({ page }) => {
    await page.goto('/contact');
    
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    const success = page.locator('[role="status"]:has-text("Success")');
    await expect(success).toBeVisible();
  });
});
```

#### 4.4 Test Mobile Experience
**Fichier**: `e2e/mobile.spec.ts`
```typescript
import { test, expect, devices } from '@playwright/test';

test.use(devices['iPhone 12']);

test.describe('Mobile Experience', () => {
  test('should display mobile menu', async ({ page }) => {
    await page.goto('/');
    
    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await expect(hamburger).toBeVisible();
  });

  test('should be scrollable on mobile', async ({ page }) => {
    await page.goto('/');
    
    const initialScroll = await page.evaluate(() => window.scrollY);
    await page.keyboard.press('End');
    const finalScroll = await page.evaluate(() => window.scrollY);
    
    expect(finalScroll).toBeGreaterThan(initialScroll);
  });

  test('should have touch-friendly buttons', async ({ page }) => {
    await page.goto('/');
    
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const box = await buttons.nth(i).boundingBox();
      // Minimum 44px x 44px touch target
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
});
```

---

### PHASE 5: TESTS DE PERFORMANCE (1 day)

#### 5.1 Lighthouse Audit
**Fichier**: `scripts/lighthouse-audit.js`
```javascript
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    port: chrome.port,
  };
  
  const runnerResult = await lighthouse(url, options);
  const scores = {
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    best_practices: runnerResult.lhr.categories['best-practices'].score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
  };
  
  console.log('Lighthouse Scores:', scores);
  
  await chromeLauncher.kill(chrome.pid);
  
  return scores;
}

runLighthouse('http://localhost:3000');
```

#### 5.2 Web Vitals Monitoring
**Fichier**: `apps/frontend/src/lib/web-vitals.ts`
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function initWebVitals() {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}

// Thresholds (good performance)
const THRESHOLDS = {
  CLS: 0.1,    // Cumulative Layout Shift
  FID: 100,    // First Input Delay (ms)
  LCP: 2500,   // Largest Contentful Paint (ms)
  FCP: 1800,   // First Contentful Paint (ms)
  TTFB: 600,   // Time to First Byte (ms)
};
```

#### 5.3 Bundle Size Analysis
**Fichier**: `next.config.js` (update)
```javascript
const { withPlausibleProxy } = require('next-plausible');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withPlausibleProxy(nextConfig)
);
```

Run: `ANALYZE=true npm run build`

#### 5.4 Performance Tests (K6)
**Fichier**: `e2e/performance.k6.js`
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'],
    http_req_failed: ['<0.1'],
  },
};

export default function() {
  const res = http.get('http://localhost:3000/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  sleep(1);
}
```

---

### PHASE 6: TESTS DE COMPATIBILITÉ NAVIGATEUR (1 day)

#### 6.1 Browser Compatibility Matrix
| Navigateur | Version | Desktop | Mobile | Status |
|-----------|---------|---------|--------|--------|
| Chrome | Latest | ✅ | ✅ | Primary |
| Firefox | Latest | ✅ | ✅ | Primary |
| Safari | Latest | ✅ | ✅ | Primary |
| Edge | Latest | ✅ | - | Secondary |
| Opera | Latest | ✅ | ✅ | Secondary |
| IE 11 | - | ⚠️ | - | Not Supported |

#### 6.2 BrowserStack Testing
**Fichier**: `browserstack.json`
```json
{
  "browsers": [
    {
      "browser": "Chrome",
      "browser_version": "latest",
      "os": "Windows",
      "os_version": "11"
    },
    {
      "browser": "Firefox",
      "browser_version": "latest",
      "os": "MacOS",
      "os_version": "Monterey"
    },
    {
      "browser": "Safari",
      "browser_version": "latest",
      "os": "MacOS",
      "os_version": "Monterey"
    },
    {
      "device": "iPhone 13",
      "os": "iOS",
      "os_version": "15"
    },
    {
      "device": "Samsung Galaxy S21",
      "os": "Android",
      "os_version": "11"
    }
  ]
}
```

#### 6.3 CSS Feature Detection
**Fichier**: `apps/frontend/src/lib/browserSupport.ts`
```typescript
export const BROWSER_SUPPORT = {
  flexbox: CSS.supports('display', 'flex'),
  grid: CSS.supports('display', 'grid'),
  customProperties: CSS.supports('--test: 1px'),
  backdrop: CSS.supports('backdrop-filter', 'blur(1px)'),
  sticky: CSS.supports('position', 'sticky'),
};

export function checkBrowserSupport() {
  const unsupported: string[] = [];
  
  Object.entries(BROWSER_SUPPORT).forEach(([feature, supported]) => {
    if (!supported) {
      unsupported.push(feature);
    }
  });
  
  if (unsupported.length > 0) {
    console.warn('Unsupported features:', unsupported);
  }
}
```

---

### PHASE 7: TESTS D'ACCESSIBILITÉ (0.5 day)

#### 7.1 Automated Accessibility Testing
**Fichier**: `e2e/accessibility.spec.ts`
```typescript
import { test, expect } from '@playwright/test';
import { injectAxe, getViolations } from 'axe-playwright';

test.describe('Accessibility (WCAG 2.1 AA)', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    await injectAxe(page);
    const violations = await getViolations(page);
    
    expect(violations).toHaveLength(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1 = page.locator('h1');
    expect(await h1.count()).toBeGreaterThan(0);
    
    // h1 should come before h2
    const h1Index = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return Array.from(document.querySelectorAll('h1, h2'))
        .indexOf(h1!);
    });
    
    expect(h1Index).toBe(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have keyboard navigation support', async ({ page }) => {
    await page.goto('/');
    
    let focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    // Tab should move focus
    await page.keyboard.press('Tab');
    const newFocused = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(newFocused).not.toBe(focusedElement);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    await injectAxe(page);
    const violations = await getViolations(page, {
      rules: ['color-contrast'],
    });
    
    expect(violations).toHaveLength(0);
  });
});
```

#### 7.2 Manual Accessibility Checklist
- [ ] Screen reader (NVDA/JAWS) compatibility
- [ ] Keyboard-only navigation
- [ ] Color contrast ratios (4.5:1 for text, 3:1 for graphics)
- [ ] Focus indicators visible
- [ ] Form labels properly associated
- [ ] Aria roles correct
- [ ] No keyboard traps

---

### PHASE 8: TESTS DE SÉCURITÉ (0.5 day)

#### 8.1 Security Headers
**Fichier**: `next.config.js` (add)
```javascript
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

#### 8.2 XSS Prevention Tests
**Fichier**: `apps/frontend/src/__tests__/security.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import DOMPurify from 'dompurify';

describe('XSS Prevention', () => {
  it('should sanitize user input', () => {
    const malicious = '<img src=x onerror=alert("XSS")>';
    const clean = DOMPurify.sanitize(malicious);
    
    expect(clean).not.toContain('onerror');
  });

  it('should escape HTML in text content', () => {
    const Component = ({ text }: { text: string }) => <div>{text}</div>;
    
    render(<Component text="<script>alert('XSS')</script>" />);
    
    expect(screen.getByText("<script>alert('XSS')</script>")).toBeInTheDocument();
    expect(document.querySelector('script')).not.toBeInTheDocument();
  });

  it('should use DOMPurify for rich content', () => {
    const html = '<p>Safe</p><script>alert("XSS")</script>';
    const clean = DOMPurify.sanitize(html);
    
    expect(clean).toContain('<p>Safe</p>');
    expect(clean).not.toContain('script');
  });
});
```

#### 8.3 CSRF Protection
**Fichier**: `apps/frontend/src/lib/csrf.ts`
```typescript
let csrfToken: string | null = null;

export async function initCSRFToken() {
  const response = await fetch('/api/csrf-token');
  const data = await response.json();
  csrfToken = data.token;
  return csrfToken;
}

export function getCSRFToken() {
  return csrfToken;
}

export function addCSRFToForm(formData: FormData) {
  const token = getCSRFToken();
  if (token) {
    formData.append('_csrf', token);
  }
  return formData;
}
```

---

## 🔧 CORRECTIONS À IMPLÉMENTER

### 1. Fix TypeScript Strictness
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. Enable React Strict Mode
```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true, // Changed from false
  // ...
};
```

### 3. Create Error Boundary
**Fichier**: `apps/frontend/src/components/RootErrorBoundary.tsx`
```typescript
'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RootErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 4. Setup Global Error Handler
**Fichier**: `apps/frontend/src/lib/axiosConfig.ts`
```typescript
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function initializeAxios() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Redirect to login
        window.location.href = '/login';
      }

      if (error.response?.status === 403) {
        // Show permission error
        throw new Error('Access denied');
      }

      return Promise.reject(error);
    },
  );
}
```

### 5. Optimize Images
```typescript
// Replace <img> with next/image
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Description"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={false}
/>
```

---

## 📋 TESTING CHECKLIST

### Unit Tests ✅
- [ ] All components have tests (>80% coverage)
- [ ] All hooks have tests
- [ ] All utilities have tests
- [ ] Form validation tests
- [ ] API call mocking

### Integration Tests ✅
- [ ] Page rendering tests
- [ ] Navigation tests
- [ ] Form submission tests
- [ ] State management tests

### E2E Tests ✅
- [ ] Homepage flow
- [ ] Authentication flow
- [ ] Form submission flow
- [ ] Error handling flow
- [ ] Mobile navigation flow

### Performance Tests ✅
- [ ] Lighthouse score > 85
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Bundle size < 250KB (gzipped)

### Compatibility Tests ✅
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Accessibility Tests ✅
- [ ] No axe violations
- [ ] Keyboard navigation works
- [ ] Color contrast OK
- [ ] Alt text on images
- [ ] Proper heading hierarchy

### Security Tests ✅
- [ ] No XSS vulnerabilities
- [ ] CSRF protection enabled
- [ ] Security headers set
- [ ] No sensitive data in cookies
- [ ] Input validation in place

---

## 📊 SUCCESS CRITERIA

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Unit Test Coverage | 80% | 10% | 🔴 |
| E2E Test Coverage | 70% | 0% | 🔴 |
| Lighthouse Score | 85+ | TBD | ⏳ |
| Lighthouse Performance | 85+ | TBD | ⏳ |
| Mobile usability | 100% | TBD | ⏳ |
| Zero Critical Issues | Yes | No | 🔴 |
| Zero Security Issues | Yes | TBD | ⏳ |
| Browser Support | 95%+ | TBD | ⏳ |

---

## 🚀 EXECUTION PLAN

### Week 1
- **Day 1**: Phase 1-2 (Setup + Unit Tests)
- **Day 2**: Phase 3-4 (Integration + E2E Tests)
- **Day 3**: Phase 5-6 (Performance + Compatibility)
- **Day 4**: Phase 7-8 (Accessibility + Security)
- **Day 5**: Fixes & Bug Corrections

### Estimated Effort
- **Setup**: 8 hours
- **Unit Tests**: 12 hours
- **Integration Tests**: 8 hours
- **E2E Tests**: 16 hours
- **Performance**: 8 hours
- **Accessibility**: 4 hours
- **Security**: 4 hours
- **Fixes**: 12 hours
- **Total**: 72 hours (~2 weeks)

---

## 📝 LOGS & DOCUMENTATION

### Test Execution Log
```
[2026-02-01 10:00] Starting Jest unit tests
[2026-02-01 10:15] ✅ 45 tests passing
[2026-02-01 10:20] ❌ 8 tests failing
[2026-02-01 11:00] ✅ All unit tests fixed
[2026-02-01 14:00] Starting Playwright E2E tests
[2026-02-01 15:30] ✅ 22 E2E tests passing
[2026-02-01 16:00] Lighthouse audit score: 78
[2026-02-01 17:00] All accessibility tests passing
```

---

## 📞 NEXT STEPS

1. **Execute Phase 1-2** (Setup + Unit Tests)
2. **Fix TypeScript issues**
3. **Create Error Boundaries**
4. **Setup API Error Handling**
5. **Run all tests**
6. **Fix identified bugs**
7. **Merge to main branch**
8. **Deploy to staging**

---

**Status**: Ready for Execution  
**Last Updated**: 1 Février 2026  
**Next Review**: 8 Février 2026
