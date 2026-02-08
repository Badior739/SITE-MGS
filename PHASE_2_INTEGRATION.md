# 📖 DOCUMENTATION PHASE 2 - Intégration Frontend/Backend

## 📋 État d'avancement

✅ **Phase 1 Complétée**
- Architecture NestJS modulaire
- Schéma Prisma complet
- Authentification JWT
- 25+ endpoints API
- Seedage de la base de données

🔄 **Phase 2 En Cours** 
- Configuration API côté Frontend
- Services API réutilisables
- Préparation pour l'intégration

---

## 🎯 Objectif Phase 2

**Connecter le Frontend Next.js au Backend NestJS sans modifier aucun composant existant.**

Tous les styles, animations, couleurs, polices et composants React restent **EXACTEMENT identiques** à la version précédente.

---

## 📁 Fichiers Créés en Phase 2

### Configuration API
```
apps/frontend/
├── lib/api/
│   ├── config.ts              # Configuration centralisée des endpoints
│   ├── client.ts              # Client HTTP générique
│   └── services/
│       ├── auth.ts            # Service d'authentification
│       ├── pages.ts           # Service des pages/CMS
│       ├── media.ts           # Service des médias
│       └── settings.ts        # Service des paramètres
```

### Variables d'Environnement
```
.env.example                    # Modèle de configuration pour le frontend
```

---

## 🔧 Configuration Requise

### 1. Copier le fichier .env

```bash
# Frontend
cp apps/frontend/.env.example apps/frontend/.env.local

# Modifier les valeurs si nécessaire
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Démarrer les services

```bash
# Terminal 1: Démarrer le backend
cd apps/backend
pnpm dev:backend

# Terminal 2: Démarrer le frontend (pas de modification)
cd apps/frontend
pnpm dev
```

---

## 💻 Utilisation des Services API

### Service d'Authentification

```typescript
import { authService } from '@/lib/api/services/auth';

// Enregistrement
const user = await authService.register({
  email: 'user@example.com',
  password: 'Password123!',
  firstName: 'John',
  lastName: 'Doe'
});

// Connexion
const user = await authService.login({
  email: 'user@example.com',
  password: 'Password123!'
});

// Déconnexion
await authService.logout();

// Vérifier l'authentification
const isAuth = authService.isAuthenticated();
```

### Service des Pages

```typescript
import { pageService } from '@/lib/api/services/pages';

// Créer une page
const page = await pageService.create({
  title: 'Ma Page',
  slug: 'ma-page',
  content: '<h1>Contenu</h1>',
  status: 'DRAFT'
});

// Récupérer par slug
const page = await pageService.getBySlug('ma-page');

// Lister les pages
const pages = await pageService.list({ status: 'PUBLISHED' });

// Publier
await pageService.publish(pageId);
```

### Service des Médias

```typescript
import { mediaService } from '@/lib/api/services/media';

// Charger un fichier
const media = await mediaService.upload(file, {
  type: 'IMAGE',
  description: 'Mon image'
});

// Rechercher
const results = await mediaService.search('paysage');

// Lister les images
const images = await mediaService.list({ type: 'IMAGE' });
```

### Service des Paramètres

```typescript
import { settingsService } from '@/lib/api/services/settings';

// Récupérer la configuration du site
const config = await settingsService.getSiteConfig();

// Mettre à jour (admin uniquement)
await settingsService.updateSiteConfig({
  siteName: 'Nouveau Nom',
  enableNewsletter: true
});
```

---

## 🔐 Gestion des Tokens JWT

Les tokens sont gérés **automatiquement** par le client API:

```typescript
// Stockage dans localStorage
localStorage.getItem('accessToken');    // Token d'accès (15 min)
localStorage.getItem('refreshToken');   // Token de rafraîchissement (7 jours)

// Inclusion automatique dans les en-têtes
Authorization: Bearer {accessToken}

// Rafraîchissement automatique
// Effectué lors d'une réponse 401 (non authentifié)
```

---

## ⚠️ IMPORTANT - Frontend Intact

**AUCUN composant du frontend n'a été modifié:**

✅ Tous les composants React restent identiques  
✅ Tous les styles Tailwind restent identiques  
✅ Toutes les animations Framer Motion restent identiques  
✅ Toutes les couleurs restent identiques  
✅ Toutes les polices restent identiques  
✅ Toute la structure de page reste identique  

**La seule addition**: Fichiers de configuration API dans `lib/api/`

---

## 📊 Prochaines Étapes (Phase 3)

### 3.1 Intégration d'Authentification
- [ ] Page de connexion avec service authService
- [ ] Page d'enregistrement avec validation
- [ ] Middleware Next.js pour les routes protégées
- [ ] Rafraîchissement automatique du token

### 3.2 Intégration CMS
- [ ] Affichage des pages depuis l'API
- [ ] Admin panel pour créer/modifier les pages
- [ ] Page builder basique

### 3.3 Intégration Médias
- [ ] Galerie de médias
- [ ] Upload de fichiers
- [ ] Optimisation des images

### 3.4 Intégrations Tierces
- [ ] Configuration Stripe
- [ ] Configuration HubSpot
- [ ] Configuration Mailchimp

---

## 🧪 Testing de l'API

### Avec cURL

```bash
# Connexion
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mindgraphix.com",
    "password": "Admin@12345"
  }'

# Créer une page (avec token)
curl -X POST http://localhost:3001/api/v1/pages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "slug": "test",
    "content": "<h1>Test</h1>"
  }'
```

### Avec Postman

1. Importer la collection Swagger: `http://localhost:3001/api/docs`
2. Créer une variable `access_token`
3. Utiliser `{{access_token}}` dans Authorization

---

## 🐛 Dépannage

### "Erreur de connexion au serveur"

```bash
# Vérifier que le backend fonctionne
curl http://localhost:3001/health

# Vérifier l'URL de l'API
echo $NEXT_PUBLIC_API_URL
```

### "Non authentifié (401)"

```bash
# Vérifier le token
localStorage.getItem('accessToken')

# Effacer les tokens
localStorage.clear()

# Se reconnecter
```

### "CORS Error"

Le backend a CORS configuré, vérifier:
- `CORS_ORIGINS` dans `apps/backend/.env`
- `NEXT_PUBLIC_API_URL` matches l'URL du backend

---

## 📚 Documentation Complète

- [Backend API Guide](../backend/BACKEND_API_GUIDE.md)
- [Prisma Schema](../backend/prisma/schema.prisma)
- [Plan Complet](../../PLAN_COMPLET_CHIRURGICAL.md)

---

**Version**: 1.0.0  
**Dernière mise à jour**: 24 Janvier 2026  
**Statut**: ✅ Phase 2 - Configuration Terminée  
**Prochaine Phase**: Phase 3 - Intégration Complète
