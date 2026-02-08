# 🚀 Local Development Guide

## Prerequisites

- **Node.js**: 20.11+ ([Download](https://nodejs.org))
- **pnpm**: 8.15+ (`npm install -g pnpm`)
- **Docker Desktop**: 4.27+ ([Download](https://www.docker.com/products/docker-desktop))
- **Git**: 2.43+ ([Download](https://git-scm.com))

## Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/yourusername/mind-graphix-premium.git
cd mind-graphix-premium
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env if needed
```

### 4. Start Docker Services

```bash
pnpm docker:up
```

Wait for all services to be healthy:
- PostgreSQL: `postgres:5432`
- Redis: `redis:6379`
- Elasticsearch: `elasticsearch:9200`
- Grafana: `grafana:3000`

### 5. Initialize Database

```bash
pnpm db:migrate
pnpm db:seed
```

### 6. Start Development Servers

```bash
# Start all servers in parallel
pnpm dev

# Or individually
pnpm dev:frontend  # Terminal 1
pnpm dev:backend   # Terminal 2
```

## Access Points

| Service      | URL                         | Notes                              |
|--------------|-----------------------------|------------------------------------|
| Frontend     | http://localhost:3000       | Next.js dev server                 |
| Backend      | http://localhost:3001       | NestJS API                         |
| API Docs     | http://localhost:3001/api/docs | Swagger UI                      |
| pgAdmin      | http://localhost:5050       | admin@mindgraphix.com / admin     |
| Grafana      | http://localhost:3000       | admin / admin                      |
| Kibana       | http://localhost:5601       | Elasticsearch UI                   |

## Database Management

```bash
# View database in UI
pnpm db:studio

# Create new migration
pnpm db:migrate -- --name add_new_table

# Reset database (⚠️ destructive)
pnpm db:reset
```

## Common Commands

```bash
# Development
pnpm dev                # Start all
pnpm dev:frontend       # Frontend only
pnpm dev:backend        # Backend only

# Building
pnpm build              # Build all
pnpm build:frontend     # Frontend only

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Fix issues
pnpm format             # Format code
pnpm type-check         # TypeScript check

# Testing
pnpm test               # Run tests
pnpm test:watch         # Watch mode

# Docker
pnpm docker:up          # Start services
pnpm docker:down        # Stop services
pnpm docker:logs        # View logs
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port
lsof -i :3000  # Find PID
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check Docker services
docker ps

# Restart services
pnpm docker:down
pnpm docker:up
```

### Dependency Issues
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Testing Authentication Locally

```bash
# Default test credentials
Email: admin@mindgraphixsolution.com
Password: Admin@123456
```

Or register new account via API:

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

## IDE Setup

### VS Code Recommended Extensions
- ESLint
- Prettier - Code formatter
- Thunder Client (REST API)
- Prisma
- Tailwind CSS IntelliSense

### ESLint Configuration
Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
}
```
