import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { nextUrl, cookies, headers } = req;
  const pathname = nextUrl.pathname;
  const response = NextResponse.next();

  if (!cookies.get('locale')) {
    const acceptLanguage = headers.get('accept-language') || '';
    const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0] || 'en';
    const locale = ['en', 'es', 'fr', 'de'].includes(preferredLang) ? preferredLang : 'en';
    response.cookies.set('locale', locale, { 
      path: '/', 
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  if (!cookies.get('theme')) {
    response.cookies.set('theme', 'dark', {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  if (pathname === '/browse') {
    return NextResponse.redirect(new URL('/browse/movies', req.url));
  }

  response.headers.set('x-pathname', pathname);
  response.headers.set('x-locale', cookies.get('locale')?.value || 'en');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' 
  ],
};
