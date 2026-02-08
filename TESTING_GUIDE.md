# 🧪 RUNNING TESTS - GUIDE COMPLET

## Setup Initial

### 1. Installer les dépendances de test

```bash
cd mind-graphix-premium

# Installer Jest et testing libraries
pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @swc/jest

# Installer Playwright pour E2E
pnpm add -D @playwright/test

# Installer Zod pour validation
pnpm add zod

# Installer axe-playwright pour tests d'accessibilité
pnpm add -D axe-playwright
```

### 2. Ajouter les scripts npm au `package.json` root

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ui": "jest --no-coverage --watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:lighthouse": "node scripts/lighthouse-audit.js",
    "test:all": "pnpm test:coverage && pnpm test:e2e",
    "test:ci": "pnpm test:coverage && pnpm test:e2e --reporter=github"
  }
}
```

---

## Exécuter les Tests Unitaires

### 1. Tous les tests (run once)
```bash
pnpm test
```

### 2. Mode watch (re-run on file change)
```bash
pnpm test:watch
```

### 3. Avec couverture de code
```bash
pnpm test:coverage
```

### 4. Tests d'un fichier spécifique
```bash
pnpm test Button.test.tsx
pnpm test validation.test.ts
```

### 5. Tests matchant une pattern
```bash
pnpm test -- --testNamePattern="Button"
pnpm test -- --testNamePattern="validation"
```

---

## Exécuter les Tests E2E

### 1. Run all E2E tests
```bash
pnpm test:e2e
```

### 2. Interface utilisateur (Playwright)
```bash
pnpm test:e2e:ui
```

### 3. Debug mode
```bash
pnpm test:e2e:debug
```

### 4. Tests d'un navigateur spécifique
```bash
# Chrome only
pnpm test:e2e -- --project=chromium

# Firefox only
pnpm test:e2e -- --project=firefox

# Safari only
pnpm test:e2e -- --project=webkit

# Mobile
pnpm test:e2e -- --project="Mobile Chrome"
```

### 5. Specific test file
```bash
pnpm test:e2e e2e/homepage.spec.ts
```

---

## Tests de Performance

### 1. Lighthouse Audit (local)
```bash
pnpm dev

# In another terminal
pnpm test:lighthouse
```

### 2. Bundle Analysis
```bash
ANALYZE=true pnpm build
```

---

## Tests de Compatibilité

### 1. Tests cross-browser (built-in Playwright)
```bash
pnpm test:e2e
# Tests automatically run on Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
```

### 2. Déboguer dans le navigateur
```bash
pnpm test:e2e:debug
# Ouvre Playwright Inspector pour step-by-step debugging
```

---

## Tests d'Accessibilité

Les tests d'accessibilité sont inclus dans les E2E tests (homepage.spec.ts)

```bash
# Exécute automatiquement les vérifications axe
pnpm test:e2e
```

### Vérifié automatiquement:
- ✅ Heading hierarchy (h1 > h2 > h3)
- ✅ Alt text on images
- ✅ Color contrast
- ✅ Keyboard navigation
- ✅ ARIA roles

---

## CI/CD Pipeline Tests

### Pour GitHub Actions:
```bash
pnpm test:ci
```

### Rapports générés:
- `coverage/` - Coverage report
- `test-results/` - Test results
- `playwright-report/` - E2E results

---

## Debugging Tests

### 1. Log variables
```typescript
it('should work', () => {
  const value = getSomething();
  console.log('Value:', value); // Will show in test output
  expect(value).toBe(expected);
});
```

### 2. Debug en VS Code
Ajouter `launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Debug",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### 3. Isolate test
```typescript
it.only('should work', () => {
  // Only this test runs
});
```

### 4. Skip test
```typescript
it.skip('should work', () => {
  // This test is skipped
});
```

---

## Checking Test Coverage

```bash
# Generate coverage report
pnpm test:coverage

# View HTML report
# Open coverage/lcov-report/index.html
```

### Thresholds (from jest.config.js):
- **Branches**: 70%
- **Functions**: 75%
- **Lines**: 80%
- **Statements**: 80%

Components have stricter requirements:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 85%
- **Statements**: 85%

---

## Common Issues & Solutions

### Jest can't find module
```bash
# Clear Jest cache
pnpm test --clearCache
```

### Timeout on async tests
```typescript
// Increase timeout (default 5000ms)
it('slow test', async () => {
  // ...
}, 10000); // 10 seconds
```

### Tests failing after env change
```bash
# Rebuild and clear caches
pnpm install
pnpm test --clearCache
rm -rf .next
```

### Playwright tests not finding elements
```bash
# Increase wait timeout
page.waitForSelector('selector', { timeout: 10000 });
```

---

## Best Practices

### ✅ DO:
- Write tests as you develop
- Test behavior, not implementation
- Keep tests simple and focused
- Use meaningful test names
- Mock external APIs
- Test edge cases
- Run tests before committing

### ❌ DON'T:
- Test implementation details
- Create overly complex tests
- Skip error cases
- Leave .only() or .skip() in code
- Test third-party libraries
- Make tests flaky (dependent on timing)

---

## Test Organization

```
apps/frontend/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── __tests__/
│   │       └── Button.test.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── __tests__/
│   │       └── useAuth.test.ts
│   ├── lib/
│   │   ├── validation.ts
│   │   └── __tests__/
│   │       └── validation.test.ts
│   └── __tests__/
│       └── integration/
│
└── e2e/
    ├── homepage.spec.ts
    ├── auth.spec.ts
    └── forms.spec.ts
```

---

## Continuous Improvement

### Métriques à suivre:
1. **Coverage** - Augmenter à 85%+
2. **Test count** - Ajouter 5-10 tests par semaine
3. **Performance** - Tests < 30 secondes
4. **Failures** - Zero flaky tests
5. **P/R quality** - All tests passing before merge

---

**Last Updated**: 1 Février 2026  
**Status**: Ready for Execution
