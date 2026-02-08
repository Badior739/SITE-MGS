# 🚀 PLAN DE DÉVELOPPEMENT CHIRURGICAL - Mind Graphix Premium

**Auteur** : Expert Full-Stack Architect  
**Date** : 24 Janvier 2026  
**Durée** : 25 jours calendaires (mode sprint intensif)  
**Format** : Phase-by-Phase avec checklist complète

---

## 📋 SECTION 0: PRÉ-REQUIS & CLARIFICATIONS

### 0.1 Questions à Valider AVANT de commencer
- [ ] **Domain primaire** : mind-graphix.com? mind-graphix.fr?
- [ ] **Langues cibles** : FR + EN? Combien de langues totales?
- [ ] **Zones géographiques** : EU only? Worldwide? RGPD? CCPA?
- [ ] **Budget infrastructure** : Limité? Scalable?
- [ ] **Données existantes** : Migration depuis Wordpress? Drupal? Nouveau?
- [ ] **Équipe support post-launch** : Qui? Combien de personnes?
- [ ] **SLA requis** : 99.9%? 99.99%? Maintenance windows acceptées?
- [ ] **Intégrations tierces essentielles** : Stripe? Hubspot? Mailchimp?

### 0.2 Stack Technologique Décidé (FINAL)

```
FRONTEND (Client)
├─ Framework : Next.js 14.2 (App Router)
├─ UI Library : React 18.3 + TypeScript 5.4
├─ Styling : Tailwind CSS 3.4 + CSS Modules
├─ State : Zustand 4.4 + TanStack Query 5
├─ Forms : React Hook Form + Zod
├─ Animations : Framer Motion 10.16
├─ Icons : Heroicons + Custom SVGs
├─ SSG/SSR : Next.js native
└─ PWA : Workbox 7 + Web App Manifest

BACKEND (API/CMS)
├─ Framework : NestJS 10.2 (TypeScript)
├─ HTTP : Express + Fastify plugins
├─ ORM : Prisma 5.7 + PostgreSQL 15
├─ Cache : Redis 7.2 (sessions + app cache)
├─ Task Queue : Bull 4.10 (Redis-backed)
├─ Search : Elasticsearch 8 ou Meilisearch 1
├─ Auth : JWT + OAuth2 (Passport)
├─ File Upload : AWS S3 ou local + Multer
├─ Emails : Nodemailer + Sendgrid
└─ Webhooks : Svix.com integration

INFRASTRUCTURE
├─ Container : Docker + Docker Compose
├─ Orchestration : Docker Swarm (simple) ou K8s (future)
├─ Database : PostgreSQL 15 + pgAdmin
├─ Cache Store : Redis Standalone + Cluster (future)
├─ Message Queue : Bull/Redis (MVP) → Kafka (future)
├─ CDN : Cloudflare + Supabase Storage
├─ Monitoring : Prometheus + Grafana
├─ Logging : ELK Stack (Elasticsearch + Logstash + Kibana)
├─ Tracing : Jaeger ou Datadog
└─ Backup : Automated daily + weekly rotations

DEVOPS
├─ Repository : Git (GitHub/GitLab)
├─ CI/CD : GitHub Actions (ou GitLab CI)
├─ Container Registry : Docker Hub ou GitHub Container Registry
├─ IaC : Docker Compose + Terraform (future)
├─ Secret Management : Vault ou GitHub Secrets
├─ Testing : Jest + Cypress + Playwright
├─ Code Quality : ESLint + Prettier + SonarQube
├─ Security Scan : Snyk + OWASP ZAP
└─ Deployment : Blue-Green + Canary
```

### 0.3 Prérequis Installés Localement

```bash
✓ Node.js 20.11 LTS
✓ npm 10.2 ou pnpm 8.15
✓ Docker Desktop 4.27
✓ PostgreSQL 15 (ou PostgreSQL Container)
✓ Redis 7.2 (or Docker Container)
✓ Git 2.43
✓ Visual Studio Code + Extensions Essentielles
```

---

## 🎯 DÉFINITION DES FEATURES (MVP vs Nice-to-Have)

### TIER 1: MVP ABSOLUT (Semaine 1)
- [ ] Authentification JWT (login/register)
- [ ] Pages statiques (Hero, About, Services)
- [ ] CMS basique (Create, Read, Update, Delete)
- [ ] Blog avec markdown support
- [ ] Responsive design (mobile-first)
- [ ] SEO basics (meta tags, sitemap)
- [ ] Admin login simple

### TIER 2: CORE FEATURES (Semaine 2)
- [ ] Page builder drag-and-drop
- [ ] Multi-langue (i18n)
- [ ] Image optimization + CDN
- [ ] Email automation
- [ ] Analytics basic
- [ ] Contact form + notifications
- [ ] Dark mode toggle

### TIER 3: PREMIUM FEATURES (Semaine 3)
- [ ] AI Content Assistant
- [ ] A/B Testing
- [ ] Real-time Collaboration
- [ ] Advanced Analytics
- [ ] Webhooks + Integrations
- [ ] Video hosting + streaming
- [ ] Blockchain timestamp

### TIER 4: FUTURE (Post-Launch)
- [ ] Mobile app native
- [ ] AR/VR preview
- [ ] Voice commands
- [ ] Predictive caching
- [ ] Microservices split
- [ ] GraphQL API

---

## 📅 PHASE 0: FONDATIONS CRITIQUES (Jour 1-2)

### 0.1 Setup Monorepo Architecture

**Objectif** : Créer une structure scalable avec code sharing

```
mind-graphix-premium/
├── apps/
│   ├── frontend/              # Next.js 14 - CLIENT
│   │   ├── app/               # App Router (pages)
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities
│   │   ├── public/            # Static files
│   │   ├── styles/            # Global styles
│   │   ├── middleware.ts      # Auth middleware
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── .env.example
│   │
│   ├── backend/               # NestJS - API
│   │   ├── src/
│   │   │   ├── modules/       # Feature modules
│   │   │   ├── common/        # Shared (decorators, filters, guards)
│   │   │   ├── config/        # Env config
│   │   │   ├── database/      # Prisma + migrations
│   │   │   ├── events/        # Domain events
│   │   │   ├── utils/         # Helpers
│   │   │   └── main.ts        # Entry point
│   │   ├── test/              # Test files
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── .env.example
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── admin/                 # React Admin (Future)
│
├── packages/                  # Shared code
│   ├── ui/                    # Design system
│   │   ├── components/
│   │   ├── styles/
│   │   ├── icons/
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   ├── types/                 # Shared TypeScript types
│   │   ├── api.ts
│   │   ├── domain.ts
│   │   └── package.json
│   │
│   ├── utils/                 # Utilities (both frontend/backend)
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   ├── constants.ts
│   │   └── package.json
│   │
│   └── eslint-config/         # ESLint shared config
│       └── package.json
│
├── tooling/                   # Configuration
│   ├── prettier.config.js
│   ├── tsconfig.base.json
│   └── jest.config.base.js
│
├── docker/                    # Docker configs
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── .dockerignore
│   └── entrypoint.sh
│
├── docs/                      # Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml            # Test + Lint
│   │   ├── build.yml         # Build images
│   │   └── deploy.yml        # Deploy to production
│   └── ISSUE_TEMPLATE/
│
├── .gitignore
├── .env.example
├── docker-compose.yml         # Local dev
├── package.json               # Root workspace
├── pnpm-workspace.yaml        # pnpm monorepo
├── turbo.json                 # Turborepo
├── tsconfig.json              # Root TS config
├── README.md
└── PLAN_COMPLET_CHIRURGICAL.md  # This file
```

**Tâches à accomplir**:

```bash
# 1. Initialiser Git monorepo
git init
git config core.symlinks true

# 2. Setup pnpm workspaces
npm install -g pnpm
pnpm init

# 3. Créer structure apps/packages
mkdir -p apps/{frontend,backend,admin}
mkdir -p packages/{ui,types,utils,eslint-config}
mkdir -p tooling docker docs .github/workflows

# 4. Initialiser chaque workspace
cd apps/frontend && npm init
cd ../backend && npm init
# etc...

# 5. Configurer monorepo dependencies
# Ajouter "workspaces" dans root package.json

# 6. Install global tooling
pnpm add -Dw turbo prettier eslint typescript
```

**Checklist Phase 0.1**:
- [ ] Monorepo structure créée
- [ ] Git initialized + .gitignore configuré
- [ ] pnpm workspaces fonctionnels
- [ ] Turbo configured
- [ ] ESLint + Prettier setup
- [ ] Root tsconfig.json créé
- [ ] All workspaces linked correctly

---

### 0.2 Design System Foundation

**Objectif** : Token system + Composants réutilisables

**Fichier** : `packages/ui/tailwind.config.js`

```typescript
export default {
  theme: {
    extend: {
      // COLORS - Design tokens
      colors: {
        'primary': {
          '50': '#f0f5ff',
          '100': '#e0ebff',
          '200': '#c1d7ff',
          '300': '#a2c3ff',
          '400': '#82aeff',
          '500': '#6399ff',  // Main brand
          '600': '#4d7fcc',
          '700': '#366599',
          '800': '#204b66',
          '900': '#093033',
        },
        'secondary': {
          '50': '#fffaf0',
          '500': '#f97316',  // Accent
          '900': '#7c2d12',
        },
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
      },
      
      // TYPOGRAPHY
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', '1rem'],      // 12px
        sm: ['0.875rem', '1.25rem'],  // 14px
        base: ['1rem', '1.5rem'],     // 16px
        lg: ['1.125rem', '1.75rem'],  // 18px
        xl: ['1.25rem', '1.75rem'],   // 20px
        '2xl': ['1.5rem', '2rem'],    // 24px
        '3xl': ['1.875rem', '2.25rem'], // 30px
        '4xl': ['2.25rem', '2.5rem'], // 36px
        '5xl': ['3rem', '1.2'],       // 48px
      },
      
      // SPACING
      spacing: {
        '4xs': '0.25rem',  // 4px
        '3xs': '0.5rem',   // 8px
        '2xs': '0.75rem',  // 12px
        'xs': '1rem',      // 16px
        'sm': '1.5rem',    // 24px
        'md': '2rem',      // 32px
        'lg': '3rem',      // 48px
        'xl': '4rem',      // 64px
      },
      
      // ANIMATIONS
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-in-up': 'slide-in-up 0.3s ease-in-out',
      },
      
      // SHADOWS
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      
      // BORDERS
      borderRadius: {
        none: '0',
        sm: '0.375rem',    // 6px
        base: '0.5rem',    // 8px
        md: '0.75rem',     // 12px
        lg: '1rem',        // 16px
        xl: '1.5rem',      // 24px
      },
    },
  },
};
```

**Composants Core** : `packages/ui/components/`

```typescript
// Button.tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    // Implementation
  }
);

// Card.tsx, Input.tsx, Modal.tsx, etc.
```

**Fichier** : `packages/ui/index.ts`

```typescript
// Barrel export
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Input } from './components/Input';
export { Modal } from './components/Modal';
export { Badge } from './components/Badge';
export { Alert } from './components/Alert';
// ... etc

// Hooks
export { useMediaQuery } from './hooks/useMediaQuery';
export { useClickOutside } from './hooks/useClickOutside';

// Utils
export { cn } from './utils/classnames';
```

**Checklist Phase 0.2**:
- [ ] Tailwind configured avec tokens
- [ ] 12+ components de base créés
- [ ] Dark mode support (Tailwind native)
- [ ] Responsive utilities configurées
- [ ] Barrel exports setup
- [ ] Storybook optionnel (future)

---

### 0.3 Development Environment Setup

**Fichier** : `docker-compose.yml` (Local Development)

```yaml
version: '3.9'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: mindgraphix-db
    environment:
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
      POSTGRES_DB: ${DB_NAME:-mindgraphix_dev}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - mindgraphix-network

  # Redis Cache & Sessions
  redis:
    image: redis:7-alpine
    container_name: mindgraphix-cache
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - mindgraphix-network

  # PostgreSQL Admin (pgAdmin)
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: mindgraphix-pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL:-admin@example.com}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD:-admin}
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - mindgraphix-network

  # Elasticsearch (Search Engine)
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: mindgraphix-search
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - mindgraphix-network

  # Kibana (Elasticsearch UI)
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    container_name: mindgraphix-kibana
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
    networks:
      - mindgraphix-network

  # Prometheus (Metrics)
  prometheus:
    image: prom/prometheus:latest
    container_name: mindgraphix-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./docker/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    networks:
      - mindgraphix-network

  # Grafana (Dashboards)
  grafana:
    image: grafana/grafana:latest
    container_name: mindgraphix-grafana
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD:-admin}
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus
    networks:
      - mindgraphix-network

volumes:
  postgres_data:
  redis_data:
  elasticsearch_data:
  prometheus_data:
  grafana_data:

networks:
  mindgraphix-network:
    driver: bridge
```

**Scripts Setup** : `package.json` (root)

```json
{
  "name": "mind-graphix-premium",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "docker-compose up -d && pnpm --recursive run dev",
    "dev:frontend": "pnpm --filter frontend dev",
    "dev:backend": "pnpm --filter backend dev",
    "build": "turbo run build",
    "build:frontend": "pnpm --filter frontend build",
    "build:backend": "pnpm --filter backend build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "db:migrate": "pnpm --filter backend run prisma:migrate",
    "db:seed": "pnpm --filter backend run prisma:seed",
    "db:studio": "pnpm --filter backend run prisma:studio",
    "docker:build": "docker-compose build",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f"
  },
  "devDependencies": {
    "turbo": "^1.12.0",
    "prettier": "^3.1.0",
    "eslint": "^8.55.0"
  }
}
```

**Checklist Phase 0.3**:
- [ ] Docker Compose file créé et testé
- [ ] Toutes les services remontent correctement
- [ ] Health checks en place
- [ ] Volumes persistants configurés
- [ ] .env.example complété
- [ ] NPM scripts workspacés
- [ ] Documentation locale setup

---

### 0.4 Git & Version Control Setup

**Fichier** : `.gitignore`

```
# Dependencies
node_modules/
*.pnp
.pnp.js

# Production
/build
/dist
/.next
/out

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db

# IDE
.vscode/
.idea/
*.sublime-project
*.sublime-workspace
*.swp
*.swo

# Testing
coverage/
.nyc_output/

# Docker
.dockerignore

# Prisma
prisma/dev.db
prisma/*.db-journal
```

**Fichier** : `.husky/pre-commit` (Git hooks)

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
```

**Fichier** : `package.json` (Lint-staged config)

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{md,json}": ["prettier --write"]
  }
}
```

**Checklist Phase 0.4**:
- [ ] .gitignore configuré
- [ ] Husky hooks installés
- [ ] Pre-commit linting actif
- [ ] Commit conventions documentées
- [ ] Initial commit effectué

---

## 📅 PHASE 1: ARCHITECTURE BACKEND FONDAMENTALE (Jour 3-4)

### 1.1 Setup NestJS avec Architecture Modulaire

**Fichier** : `apps/backend/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGINS', 'http://localhost:3000').split(','),
    credentials: true,
  });

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get('PORT', 3001);
  await app.listen(port);
  console.log(`✅ Server running on http://localhost:${port}`);
}

bootstrap();
```

**Fichier** : `apps/backend/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PagesModule } from './modules/pages/pages.module';
import { MediaModule } from './modules/media/media.module';
import { SettingsModule } from './modules/settings/settings.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'mindgraphix_dev',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/{.ts,.js}'],
      migrationsRun: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    
    // Cache
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 minutes
    }),
    
    // Static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    
    // Feature modules
    AuthModule,
    UsersModule,
    PagesModule,
    MediaModule,
    SettingsModule,
    HealthModule,
  ],
})
export class AppModule {}
```

**Fichier** : `apps/backend/src/modules/health/health.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
```

**Checklist Phase 1.1**:
- [ ] NestJS bootstrap fonctionnel
- [ ] ConfigModule global
- [ ] CORS & Helmet configurés
- [ ] Global ValidationPipe
- [ ] Health check endpoint fonctionnel
- [ ] Base de données connectée
- [ ] Cache Redis initialisé

---

### 1.2 Prisma ORM Setup avec Database Schema

**Fichier** : `apps/backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// USER MANAGEMENT
// ============================================================================

enum UserRole {
  SUPER_ADMIN      // Full system access
  ADMIN            // Content + users management
  EDITOR           // Content management only
  VIEWER           // Read-only access
  CLIENT           // Public user (future)
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

model User {
  id                    String   @id @default(cuid())
  email                 String   @unique
  passwordHash          String
  firstName             String
  lastName              String
  role                  UserRole @default(VIEWER)
  status                UserStatus @default(ACTIVE)
  
  // Profile
  avatar                String?
  phone                 String?
  bio                   String?
  
  // Security
  twoFactorEnabled      Boolean  @default(false)
  twoFactorSecret       String?
  lastLoginAt           DateTime?
  lastLoginIp           String?
  
  // Audit
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  deletedAt             DateTime?
  
  // Relations
  pages                 Page[]
  media                 Media[]
  auditLogs             AuditLog[]
  sessions              Session[]
  
  @@index([email])
  @@index([role])
  @@index([status])
}

model Session {
  id                    String   @id @default(cuid())
  token                 String   @unique
  userId                String
  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  userAgent             String?
  ipAddress             String?
  expiresAt             DateTime
  
  createdAt             DateTime @default(now())
  
  @@index([userId])
  @@index([expiresAt])
}

// ============================================================================
// CONTENT MANAGEMENT
// ============================================================================

enum PageStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
  SCHEDULED
}

enum PageVisibility {
  PUBLIC
  PRIVATE
  PASSWORD_PROTECTED
}

model Page {
  id                    String   @id @default(cuid())
  title                 String
  slug                  String   @unique
  description           String?
  content               String   // JSON or HTML
  
  // Publishing
  status                PageStatus @default(DRAFT)
  visibility            PageVisibility @default(PRIVATE)
  publishedAt           DateTime?
  scheduledAt           DateTime?
  
  // SEO
  metaTitle             String?
  metaDescription       String?
  metaKeywords          String?
  ogImage               String?
  canonicalUrl          String?
  
  // Builder
  blocks                Json?    // Serialized PageBlock[]
  templateId            String?
  
  // Audit
  createdBy             String
  creator               User     @relation(fields: [createdBy], references: [id])
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  publishedBy           String?
  viewCount             Int      @default(0)
  
  // Relations
  versions              PageVersion[]
  comments              Comment[]
  
  @@index([slug])
  @@index([status])
  @@index([visibility])
  @@index([createdAt])
}

model PageVersion {
  id                    String   @id @default(cuid())
  pageId                String
  page                  Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  
  title                 String
  content               String
  blocks                Json?
  
  versionNumber         Int
  changesSummary        String?
  
  createdAt             DateTime @default(now())
  createdBy             String
  
  @@unique([pageId, versionNumber])
  @@index([pageId])
}

model Comment {
  id                    String   @id @default(cuid())
  pageId                String
  page                  Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  
  content               String
  author                String
  status                String   @default("pending") // pending, approved, rejected
  
  createdAt             DateTime @default(now())
  
  @@index([pageId])
  @@index([status])
}

// ============================================================================
// MEDIA MANAGEMENT
// ============================================================================

enum MediaType {
  IMAGE
  VIDEO
  DOCUMENT
  AUDIO
}

model Media {
  id                    String   @id @default(cuid())
  name                  String
  type                  MediaType
  mimeType              String
  
  // URLs
  url                   String   @unique
  thumbnailUrl          String?
  
  // Storage
  bucket                String
  key                   String
  size                  Int      // bytes
  
  // Metadata
  width                 Int?
  height                Int?
  duration              Int?     // seconds (for video/audio)
  exif                  Json?
  
  // Indexing
  tags                  String[]
  description           String?
  altText               String?
  
  // Audit
  uploadedBy            String
  uploader              User     @relation(fields: [uploadedBy], references: [id])
  createdAt             DateTime @default(now())
  
  @@index([type])
  @@index([uploadedBy])
  @@index([createdAt])
}

// ============================================================================
// SYSTEM SETTINGS
// ============================================================================

model Setting {
  id                    String   @id @default(cuid())
  key                   String   @unique
  value                 String
  type                  String   @default("string") // string, number, boolean, json
  description           String?
  isPublic              Boolean  @default(false)
  
  updatedAt             DateTime @updatedAt
  
  @@index([key])
}

model SiteConfig {
  id                    String   @id @default(cuid())
  
  // General
  siteName              String   @default("Mind Graphix")
  siteDescription       String?
  favicon               String?
  logo                  String?
  
  // Contact
  supportEmail          String?
  supportPhone          String?
  contactForm           Json?    // Form configuration
  
  // Social
  socialLinks           Json?    // { twitter: url, linkedin: url, ... }
  
  // Internationalization
  supportedLanguages    String[] @default(["en", "fr"])
  defaultLanguage       String   @default("en")
  
  // Features
  enableComments        Boolean  @default(false)
  enableSearch          Boolean  @default(true)
  enableAnalytics       Boolean  @default(true)
  enableNewsletter      Boolean  @default(false)
  
  // SEO
  siteUrl               String
  robotsTxt             String?
  sitemap               String?  // Generated
  
  updatedAt             DateTime @updatedAt
}

// ============================================================================
// AUDIT & LOGGING
// ============================================================================

enum AuditAction {
  CREATE
  READ
  UPDATE
  DELETE
  PUBLISH
  ARCHIVE
  LOGIN
  LOGOUT
  PASSWORD_CHANGE
  PERMISSION_CHANGE
}

model AuditLog {
  id                    String   @id @default(cuid())
  
  action                AuditAction
  resource              String   // 'Page', 'User', 'Media', etc.
  resourceId            String?
  changes               Json?    // What changed (before/after)
  
  userId                String
  user                  User     @relation(fields: [userId], references: [id])
  ipAddress             String?
  userAgent             String?
  
  createdAt             DateTime @default(now())
  
  @@index([action])
  @@index([resource])
  @@index([userId])
  @@index([createdAt])
}

// ============================================================================
// ANALYTICS (Simple events log)
// ============================================================================

model AnalyticsEvent {
  id                    String   @id @default(cuid())
  
  event                 String   // page_view, click, conversion, etc.
  pageId                String?
  
  sessionId             String?
  userId                String?
  
  metadata              Json?
  
  createdAt             DateTime @default(now())
  
  @@index([event])
  @@index([pageId])
  @@index([createdAt])
}

// ============================================================================
// FUTURE FEATURES
// ============================================================================

// For future: Newsletter, Subscriptions, Payments, etc.
```

**Script** : `apps/backend/package.json` - Prisma commands

```json
{
  "scripts": {
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:prod": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:seed": "node prisma/seed.ts",
    "prisma:reset": "prisma migrate reset"
  }
}
```

**Fichier** : `apps/backend/prisma/seed.ts` - Database seeding

```typescript
import { PrismaClient, UserRole, UserStatus, PageStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mindgraphix.com' },
    update: {},
    create: {
      email: 'admin@mindgraphix.com',
      passwordHash: await bcrypt.hash('Admin@12345', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  // Create demo editor
  const editor = await prisma.user.upsert({
    where: { email: 'editor@mindgraphix.com' },
    update: {},
    create: {
      email: 'editor@mindgraphix.com',
      passwordHash: await bcrypt.hash('Editor@12345', 10),
      firstName: 'Editor',
      lastName: 'User',
      role: UserRole.EDITOR,
      status: UserStatus.ACTIVE,
    },
  });

  // Create default site config
  await prisma.siteConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Mind Graphix Premium',
      siteDescription: 'Professional Web Architecture & CMS',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      supportedLanguages: ['en', 'fr'],
      defaultLanguage: 'en',
    },
  });

  console.log('✅ Seeding completed');
  console.log(`📊 Created admin: ${admin.email}`);
  console.log(`📊 Created editor: ${editor.email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Checklist Phase 1.2**:
- [ ] Prisma schema complété
- [ ] Toutes les entités modélisées
- [ ] Relations correctes
- [ ] Indexes optimisés
- [ ] Migrations initialisées
- [ ] Seed data fonctionnel
- [ ] Prisma client générée

---

### 1.3 Authentication Module (JWT + OAuth2)

**Fichier** : `apps/backend/src/modules/auth/auth.service.ts`

```typescript
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    return {
      user,
      tokens: await this.generateTokens(user.id),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tokens: await this.generateTokens(user.id),
    };
  }

  async generateTokens(userId: string) {
    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // Store refresh token in database
    await this.prisma.session.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      
      const session = await this.prisma.session.findUnique({
        where: { token: refreshToken },
      });

      if (!session || session.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(payload.sub);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken: string) {
    await this.prisma.session.delete({
      where: { token: refreshToken },
    });
  }
}
```

**Fichier** : `apps/backend/src/modules/auth/auth.controller.ts`

```typescript
import { Controller, Post, Body, UseGuards, Req, Res, Version } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, RegisterDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Version('1')
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto);
    
    // Set secure HTTP-only cookie
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      user: result.user,
      accessToken: result.tokens.accessToken,
    });
  }

  @Version('1')
  @Post('refresh')
  async refresh(@Req() req: any, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const tokens = await this.authService.refreshTokens(refreshToken);
    
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken: tokens.accessToken });
  }

  @Version('1')
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any, @Res() res: Response) {
    await this.authService.logout(req.user.sub, req.cookies.refreshToken);
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
  }
}
```

**Fichier** : `apps/backend/src/modules/auth/guards/jwt-auth.guard.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**Fichier** : `apps/backend/src/modules/auth/strategies/jwt.strategy.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { sub: payload.sub };
  }
}
```

**Checklist Phase 1.3**:
- [ ] AuthService implémenté
- [ ] JWT Strategy configurée
- [ ] Login/Register endpoints
- [ ] Refresh token logic
- [ ] Secure cookie handling
- [ ] Password hashing (bcrypt)
- [ ] Tests écrits

---

## 📅 PHASE 2: FRONTEND FOUNDATION & CMS CORE (Jour 5-10)

[Continuations dans la suite...]

---

## 📚 DOCUMENTATION DES APIS (À générer automatiquement)

**Format OpenAPI/Swagger** : Généré via `@nestjs/swagger`

```typescript
// Dans app.module.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Mind Graphix API')
  .setDescription('Professional CMS & Site Builder API')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

---

## ✅ VALIDATION & TESTING STRATEGY

### Unit Testing (Jest)
```typescript
// Example: auth.service.spec.ts
describe('AuthService', () => {
  it('should hash password with bcrypt', async () => {
    // Test implementation
  });
});
```

### Integration Testing (E2E)
```typescript
// Example: auth.e2e.spec.ts
describe('Auth E2E', () => {
  it('POST /auth/register should create user', () => {
    // Test implementation
  });
});
```

### Load Testing
- Artillery (load testing)
- k6 (performance testing)

---

## 🚀 NEXT STEPS APRÈS CETTE PHASE

1. **Frontend Setup** (Next.js App Router, Tailwind, State Management)
2. **Page Builder** (Drag-and-drop, Block system)
3. **Media Management** (Upload, Optimization, CDN)
4. **Internationalization** (i18n routing, content translation)
5. **Performance** (Caching, CDN, Image optimization)
6. **Analytics** (Event tracking, Dashboards)
7. **DevOps** (CI/CD, Monitoring, Backup)
8. **Security** (Audit logging, Compliance, Hardening)

---

## 📞 POINTS DE CONTRÔLE CRITIQUES

À chaque phase, valider:
- [ ] Code review complétée
- [ ] Tests unitaires > 80% coverage
- [ ] Pas de dépendances circulaires
- [ ] Types TypeScript strictement validés
- [ ] Documentation mise à jour
- [ ] Performance benchmarks OK
- [ ] Sécurité scan OK (Snyk)

---

**PRÊT À COMMENCER?** 🚀

Confirmez que vous êtes d'accord avec cette architecture et ces phases, et nous commençons immédiatement par la Phase 0 avec une précision chirurgicale!
