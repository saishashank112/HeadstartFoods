import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/register', '/about', '/contact', '/compliance'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is a public route or an asset
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isAsset = pathname.match(/\.(.*)$/) || pathname.startsWith('/_next') || pathname.startsWith('/api/auth');

  if (isPublicRoute || isAsset) {
    return NextResponse.next();
  }

  // Get auth token from cookies
  const token = request.cookies.get('headstart-token')?.value;

  if (!token) {
    // Redirect to login if no token is found
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
