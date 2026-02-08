# 🚀 PHASE 1 - PLAN DE MIGRATION FRONTEND

**Objectif**: Recréer le frontend Vite/React en Next.js 14 avec intégration NestJS backend  
**Date Démarrage**: 1er Février 2026  
**Durée Estimée**: 2-3 jours  

---

## 📊 ANALYSE SOURCE (Vite/React)

### Stack Actuel
- **Framework**: Vite 6.2.0 + React 19.2.1
- **Routage**: React Router DOM 6.22.3
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: Framer Motion 12.23.25
- **UI Icons**: Lucide React 0.556.0
- **State**: Context API (4 contextes)

### Structure Source
```
components/
├── Pages principales: About, Hero, Portfolio, Services, Team, Contact, Footer, Navbar
├── Pages spéciales: CareerPage, ServicesPage, QuotePage, AdminLogin, AdminPanel, NotFound
├── Dashboard: ClientSpace, ClientWidget
├── Modals: AuthModal
├── Admin: AdminLayout, AdminPanel, AccessControl, etc.
└── UI: ChatBot, SpeedDial, CustomCursor, Preloader, FloatingIdentity, ScrollProgress, PageTransition

context/
├── AdminContext.tsx (auth admin)
├── LanguageContext.tsx (i18n)
├── PreferencesContext.tsx (settings utilisateur)
└── ThemeContext.tsx (light/dark mode)

hooks/
├── usePageTitle.ts (SEO)
└── [À explorer]

utils/
├── mockDatabase.ts (données locales)
└── [À explorer]

types.ts
├── NavItem, Service, PortfolioItem, BlogPost
├── Testimonial, TeamMember, Statistic, QuoteRequest
└── [À explorer]

constants.ts (configurations globales)
translations.ts (i18n strings)
adminConfig.ts (config admin)
```

---

## 🎯 ROUTES IDENTIFIÉES

### Routes Principales (React Router)
```
/                    → HomePage (Hero + Sections)
/about               → About
/services            → Services ou ServicesPage
/portfolio           → Portfolio
/team                → Team
/careers             → CareerPage
/quote               → QuotePage
/contact             → Contact
/admin/login         → AdminLogin
/admin               → AdminPanel (protected)
/client-space        → ClientSpace (authenticated)
/404                 → NotFound
```

### Routes à Ajouter
```
/blog                → Blog listings
/blog/:slug          → Blog post detail
/projects/:id        → Project detail
/testimonials        → Testimonials page
```

---

## 🔄 MIGRATION STRATEGY

### Phase 1.1: Setup & Configuration (30 min)
- [ ] Conserver le dossier `/public` avec assets
- [ ] Copier `constants.ts`, `types.ts`, `translations.ts`
- [ ] Adapter `next.config.js` avec optimisations images
- [ ] Configurer variables CSS personnalisées en CSS global
- [ ] Setup Tailwind (déjà en place)

### Phase 1.2: Contextes & Hooks (45 min)
- [ ] Migrer `AdminContext.tsx` → `/context/AdminContext.tsx`
- [ ] Migrer `LanguageContext.tsx` → `/context/LanguageContext.tsx`
- [ ] Migrer `PreferencesContext.tsx` → `/context/PreferencesContext.tsx`
- [ ] Migrer `ThemeContext.tsx` → `/context/ThemeContext.tsx`
- [ ] Migrer `usePageTitle.ts` → `/hooks/usePageTitle.ts`
- [ ] Créer `useApiCall.ts` hook pour intégration NestJS

### Phase 1.3: Composants Réutilisables UI (1 heure)
**Fichiers à Migrer**:
- ChatBot, SpeedDial, CustomCursor, Preloader, FloatingIdentity
- ScrollProgress, PageTransition
- AuthModal, ClientWidget

**Actions**:
- Copier les fichiers dans `/app/components/`
- Adapter les imports React
- Vérifier les animations Framer Motion
- Tester le rendu

### Phase 1.4: Composants de Layout (1.5 heures)
**Fichiers à Migrer**:
- Navbar → `/app/components/Navbar.tsx`
- Footer → `/app/components/Footer.tsx`
- CommonSections → `/app/components/CommonSections.tsx`

**Actions**:
- Adapter routes de React Router à next/link
- Configurer client components avec `use client`
- Intégrer le contexte de langue
- Vérifier responsive design

### Phase 1.5: Pages Principales (2 heures)
**Fichiers à Créer en `/app/`**:
- `(site)/page.tsx` ← Combine Hero + Sections
- `(site)/about/page.tsx` ← About
- `(site)/services/page.tsx` ← Services ou ServicesPage
- `(site)/portfolio/page.tsx` ← Portfolio
- `(site)/team/page.tsx` ← Team
- `(site)/careers/page.tsx` ← CareerPage
- `(site)/quote/page.tsx` ← QuotePage (intégration API POST)
- `(site)/contact/page.tsx` ← Contact (intégration API POST)
- `not-found.tsx` ← NotFound

**Actions**:
- Adapter `export default` React à Next.js server components
- Convertir `useEffect` en server-side où possible
- Ajouter métadonnées dynamiques avec `generateMetadata()`
- Intégrer appels API NestJS

### Phase 1.6: Admin & Dashboard (2 heures)
**Fichiers à Créer en `/app/admin/`**:
- `login/page.tsx` ← AdminLogin
- `layout.tsx` ← AdminLayout avec protection route
- `page.tsx` ← AdminPanel
- Sous-pages admin (AccessControl, CMS, Dashboard, etc.)

**Actions**:
- Créer middleware d'authentification
- Protéger les routes `/admin`
- Ajouter vérification token JWT
- Intégrer avec API NestJS `/admin` routes

### Phase 1.7: Appels API & Intégration Backend (2 heures)
**Actions**:
- Mapper endpoints source (mock) → endpoints NestJS réels
- Créer client API Axios (déjà en place: `axiosConfig.ts`)
- Remplacer `mockDatabase.ts` par appels API
- Adapter endpoints:
  ```
  GET  /api/services       ← Services
  GET  /api/portfolio      ← Portfolio items
  GET  /api/team           ← Team members
  GET  /api/testimonials   ← Testimonials
  POST /api/quotes         ← Quote requests
  POST /api/contacts       ← Contact messages
  POST /api/auth/login     ← Admin login
  GET  /api/admin/dashboard ← Admin dashboard data
  ```

### Phase 1.8: Optimisations & Performance (1.5 heures)
**Actions**:
- Implémenter `next/image` pour images statiques
- Code splitting avec lazy loading
- SEO: Ajouter `generateMetadata()` pour chaque page
- Vérifier Lighthouse score
- Tester mobile responsiveness
- Ajouter Web Vitals

### Phase 1.9: Tests & QA (1 heure)
**Actions**:
- Tester toutes les routes
- Vérifier animations Framer Motion
- Tester authentication flow
- Vérifier appels API
- Responsive testing (mobile, tablet, desktop)

---

## 📦 FICHIERS À COPIER DIRECTEMENT

```
zip-extracted/
├── constants.ts           → apps/frontend/src/constants.ts
├── types.ts              → apps/frontend/src/types.ts
├── translations.ts       → apps/frontend/src/translations.ts
├── adminConfig.ts        → apps/frontend/src/adminConfig.ts
├── metadata.json         → public/metadata.json
├── logo_sans_font.png    → public/logo_sans_font.png
└── public/               → public/
    └── [tous les assets]
```

---

## 🔧 ADAPTATIONS REQUISES

### 1. Imports React Router → Next.js
```diff
- import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
+ import { useRouter, usePathname } from 'next/navigation';
+ import Link from 'next/link';
```

### 2. Context API → React Context (compatible)
```diff
  // Aucun changement - Context API fonctionne en Next.js
  // Juste ajouter 'use client' en haut des fichiers qui l'utilisent
```

### 3. SEO & Metadata
```diff
+ export async function generateMetadata() {
+   return {
+     title: '...',
+     description: '...',
+     ...
+   }
+ }
```

### 4. API Calls
```diff
- const response = await mockDB.getServices();
+ const response = await apiCall('/services', 'GET');
```

### 5. Images Optimization
```diff
- <img src="/image.png" alt="..." />
+ <Image src="/image.png" alt="..." width={800} height={600} />
```

---

## 🎨 VARIABLES CSS À PRÉSERVER

D'après le code source, il y a des variables CSS personnalisées:
```css
--bg-primary          /* Couleur de fond primaire */
--text-main           /* Couleur texte principale */
--text-secondary      /* Couleur texte secondaire */
--accent-color        /* Couleur accent */
--noise              /* Pattern de bruit */
```

**Action**: Ces variables doivent être définies dans `/app/globals.css`

---

## 🚨 DÉPENDANCES À CONSERVER

```json
{
  "dependencies": {
    "framer-motion": "^12.23.25",      // Animations
    "lucide-react": "^0.556.0",        // Icons
    "react": "^19.2.1",                // React
    "react-dom": "^19.2.1",            // React DOM
    "@prisma/client": "^7.1.0"         // ORM (Si backend l'utilise)
  },
  "devDependencies": {
    "typescript": "~5.8.2",            // TypeScript
    "tailwindcss": "^3.4.x",           // Déjà en Next.js
    "@types/node": "^22.14.0"          // Types Node
  }
}
```

---

## 📝 FICHIERS CLÉS À ANALYSER EN DÉTAIL

Avant de commencer la migration, je dois analyser:
- [ ] `components/admin/*` - Architecture du système admin
- [ ] `components/dashboard/*` - Structure du dashboard client
- [ ] Appels API actuels (endpoints, format réponse)
- [ ] Configuration Tailwind personnalisée
- [ ] Fichiers SVG/images optimisées
- [ ] Patterns d'animations spécifiques

---

## ✅ CHECKLIST MIGRATION

### Setup Initial
- [ ] Copier assets publics
- [ ] Copier types.ts, constants.ts, translations.ts
- [ ] Configurer variables CSS
- [ ] Setup Tailwind

### Contextes & Hooks
- [ ] AdminContext
- [ ] LanguageContext
- [ ] PreferencesContext
- [ ] ThemeContext
- [ ] usePageTitle hook

### Composants Réutilisables
- [ ] ChatBot
- [ ] SpeedDial
- [ ] CustomCursor
- [ ] Preloader
- [ ] FloatingIdentity
- [ ] ScrollProgress
- [ ] PageTransition
- [ ] AuthModal
- [ ] ClientWidget

### Composants Layout
- [ ] Navbar (avec next/link)
- [ ] Footer
- [ ] CommonSections

### Pages
- [ ] Page d'accueil
- [ ] About
- [ ] Services
- [ ] Portfolio
- [ ] Team
- [ ] Careers
- [ ] Quote
- [ ] Contact
- [ ] 404 Not Found

### Admin & Dashboard
- [ ] Login page
- [ ] Admin layout
- [ ] Admin panels
- [ ] Protection routes

### API & Backend
- [ ] Mapper endpoints
- [ ] Créer appels API
- [ ] Tester intégration

### Optimisations
- [ ] Images avec next/image
- [ ] Code splitting
- [ ] Métadonnées SEO
- [ ] Lighthouse audit

### Tests & QA
- [ ] Routes
- [ ] Animations
- [ ] Forms
- [ ] Responsive
- [ ] Performance

---

## 🎬 NEXT STEPS

1. **Lire ce plan** ✅
2. **Analyser les fichiers clés** du ZIP
3. **Démarrer Phase 1.1** (Setup)
4. **Progresser étape par étape**
5. **Tester chaque section**
6. **Déployer en staging**

**Estimation**: 10-12 heures de travail = 2-3 jours

---

**Status**: 🟢 READY TO START  
**Next Command**: Analyser composants spécifiques

