import { NextResponse } from 'next/server';

export function proxy(request) {
  const isAuth = request.cookies.get('isAuth')?.value;
  const path = request.nextUrl.pathname;
  if (isAuth && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (
    !isAuth &&
    (path.startsWith('/dashboard') || path.startsWith('/employees'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/employees/:path*', '/login'],
};
