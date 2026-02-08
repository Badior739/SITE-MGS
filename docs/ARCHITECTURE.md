# 🏗️ Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  Next.js 14 (Frontend) ← TypeScript ← React 18              │
├─────────────────────────────────────────────────────────────┤
│                    API LAYER                                 │
│  NestJS + Express ← Swagger/OpenAPI                         │
├─────────────────────────────────────────────────────────────┤
│                    DOMAIN LAYER                              │
│  Services ← Validation ← Business Rules                      │
├─────────────────────────────────────────────────────────────┤
│                    DATA LAYER                                │
│  Prisma ORM ← PostgreSQL ← Redis (Cache)                    │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Query** for server state
- **Framer Motion** for animations

### Backend
- **NestJS 10** for API framework
- **Express** as HTTP provider
- **Prisma** as ORM
- **PostgreSQL 15** as primary database
- **Redis 7** for caching
- **Elasticsearch 8** for search

### Infrastructure
- **Docker** for containerization
- **Docker Compose** for orchestration
- **Prometheus** for metrics
- **Grafana** for dashboards

## Authentication Flow

```
┌─────────┐
│  Login  │
└────┬────┘
     │
     ▼
┌─────────────────────────────────────────┐
│ POST /api/v1/auth/login                 │
│ ├─ Validate email/password              │
│ ├─ Generate JWT + Refresh token         │
│ └─ Return tokens                        │
└────┬────────────────────────────────────┘
     │
     ▼
┌──────────────────────┐
│ Access Token (15m)   │ ← Used for API requests
│ Refresh Token (7d)   │ ← Stored in HTTP-only cookie
└──────────────────────┘
```

## Database Schema Highlights

### Core Entities
- **User** - User accounts with roles (SUPER_ADMIN, ADMIN, EDITOR, VIEWER)
- **Page** - Content pages with versioning
- **Media** - Assets (images, videos, documents)
- **SiteConfig** - Global site settings
- **AuditLog** - Action tracking

### Key Features
- Soft deletes via `deletedAt` field
- Audit trails for compliance
- Version control for pages
- Role-based access control (RBAC)

## API Versioning

All endpoints are versioned using URI-based versioning:

```
/api/v1/auth/login
/api/v1/pages
/api/v1/media
```

## Deployment Architecture

```
┌──────────────┐
│   GitHub     │  (Source)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ GitHub       │  (CI/CD)
│ Actions      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Docker     │  (Build & Push)
│   Registry   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Production   │  (Deploy)
│ Server       │
└──────────────┘
```
