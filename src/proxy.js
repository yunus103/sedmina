import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - ... `/studio` paths (Sanity Studio)
    '/((?!api|_next|_vercel|studio|iletisim-kanallari|.*\\..*).*)',
    // However, match all root paths
    '/',
    '/(tr|en)/:path*'
  ]
};
