import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/hakkimizda': {
      tr: '/hakkimizda',
      en: '/about'
    },
    '/hizmetler': {
      tr: '/hizmetler',
      en: '/services'
    },
    '/hizmetler/[slug]': {
      tr: '/hizmetler/[slug]',
      en: '/services/[slug]'
    },
    '/hizmetler/[slug]/[subSlug]': {
      tr: '/hizmetler/[slug]/[subSlug]',
      en: '/services/[slug]/[subSlug]'
    },
    '/calismalar': {
      tr: '/calismalar',
      en: '/projects'
    },
    '/calismalar/[slug]': {
      tr: '/calismalar/[slug]',
      en: '/projects/[slug]'
    },
    '/blog': {
      tr: '/blog',
      en: '/blog'
    },
    '/blog/[slug]': {
      tr: '/blog/[slug]',
      en: '/blog/[slug]'
    },
    '/iletisim': {
      tr: '/iletisim',
      en: '/contact'
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
