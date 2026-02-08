#!/usr/bin/env pwsh
# Quick Start Script for Mind Graphix Premium
# Usage: .\start.ps1

Write-Host "🚀 Mind Graphix Premium - Quick Start" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "✓ Checking prerequisites..." -ForegroundColor Yellow

$checks = @(
    @{ Name = "Node.js"; Cmd = "node --version" },
    @{ Name = "pnpm"; Cmd = "pnpm --version" },
    @{ Name = "Docker"; Cmd = "docker --version" },
    @{ Name = "Git"; Cmd = "git --version" }
)

foreach ($check in $checks) {
    try {
        $version = Invoke-Expression $check.Cmd 2>&1
        Write-Host "  ✅ $($check.Name): $version" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ $($check.Name): NOT INSTALLED" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
pnpm install

Write-Host ""
Write-Host "🐳 Starting Docker services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host ""
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "🗄️  Running database migrations..." -ForegroundColor Yellow
pnpm db:migrate

Write-Host ""
Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
pnpm db:seed

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Start development servers: pnpm dev"
Write-Host "  2. Frontend: http://localhost:3000"
Write-Host "  3. Backend: http://localhost:3001"
Write-Host "  4. API Docs: http://localhost:3001/api/docs"
Write-Host ""
