import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  const isAuth = Boolean(token);

  const { pathname } = req.nextUrl;
  const protectedPaths = ['/', '/signup-details'];

  if (protectedPaths.includes(pathname) && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = '/landing';
    return NextResponse.redirect(url);
  }

  if (pathname === '/landing' && isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup-details', '/landing'],
};
