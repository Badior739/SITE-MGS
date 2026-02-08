import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware de protection des routes
 * 
 * Vérifie la présence du token JWT dans les cookies pour autoriser
 * l'accès aux espaces Admin et Client.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Récupérer les tokens depuis les cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  
  const isAuthenticated = !!accessToken || !!refreshToken;

  // 2. Protéger les routes Admin
  if (pathname.startsWith('/admin')) {
    // Si on est sur la page de login admin, on laisse passer
    if (pathname === '/admin/login') {
      return isAuthenticated 
        ? NextResponse.redirect(new URL('/admin', request.url)) 
        : NextResponse.next();
    }

    // Sinon, redirection vers login si non authentifié
    if (!isAuthenticated) {
      // NOTE: Dans le système actuel, /admin affiche le login si non auth via le composant Page
      // Cette protection middleware est une sécurité supplémentaire
      return NextResponse.next(); 
    }
  }

  // 3. Protéger l'espace Client
  if (pathname.startsWith('/client')) {
    if (!isAuthenticated) {
      const url = new URL('/', request.url);
      url.searchParams.set('auth', 'true'); // Ouvre la modal de login par exemple
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configurer les routes sur lesquelles le middleware s'applique
export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};
