import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from './lib/prisma';

// Routes that don't require authentication
const publicRoutes = ['/', '/api/auth', '/api/health'];
const authRoutes = ['/api/auth'];

// Routes that require authentication
const protectedRoutes = ['/studio', '/dashboard', '/api/licenses', '/api/videos', '/api/earnings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get session token from cookies or headers
  const sessionToken = 
    request.cookies.get('session_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!sessionToken) {
    // Redirect to login if accessing protected route without session
    if (pathname.startsWith('/studio') || pathname.startsWith('/dashboard')) {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Return 401 for API routes
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    // Verify session with Prisma
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            walletAddress: true,
            name: true,
            avatar: true,
            type: true,
            verified: true,
          },
        },
      },
    });

    // Check if session exists and is valid
    if (!session || session.expiresAt < new Date()) {
      // Clear invalid session cookie
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('session_token');
      
      if (pathname.startsWith('/api')) {
        return NextResponse.json(
          { error: 'Unauthorized', message: 'Session expired' },
          { status: 401 }
        );
      }
      
      return response;
    }

    // Add user info to request headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', session.userId);
    requestHeaders.set('x-user-type', session.user.type);
    requestHeaders.set('x-user-verified', String(session.user.verified));

    // Continue with the request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Middleware error:', error);
    
    // Return 500 for API routes, redirect for pages
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { error: 'Internal Server Error', message: 'Authentication check failed' },
        { status: 500 }
      );
    }

    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

