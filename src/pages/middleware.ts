import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;

  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  const protectedPaths = ['/', '/signup-details'];

  if (protectedPaths.includes(pathname) && !isAuth) {
    return NextResponse.redirect(new URL('/landing', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup-details'],
};
