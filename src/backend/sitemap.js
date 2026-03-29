// sitemap.js — Programmatic sitemap entries for PlayBigTaka
// Wix auto-generates a sitemap, but you can extend it via routers.
// This module exports page data for use in routers.js or SEO tools.

const SITE_URL = 'https://www.playbigtaka.com';

export const sitePages = [
  { path: '/',                title: 'Home',          priority: '1.0', changefreq: 'daily'   },
  { path: '/aviator',         title: 'Aviator',       priority: '0.8', changefreq: 'weekly'  },
  { path: '/crazy-time',      title: 'Crazy Time',    priority: '0.8', changefreq: 'weekly'  },
  { path: '/funky-time',      title: 'Funky Time',    priority: '0.8', changefreq: 'weekly'  },
  { path: '/money-coming',    title: 'Money Coming',  priority: '0.8', changefreq: 'weekly'  },
  { path: '/super-ace',       title: 'Super Ace',     priority: '0.8', changefreq: 'weekly'  },
  { path: '/ken-link',        title: 'Ken Link',      priority: '0.7', changefreq: 'weekly'  },
];

/**
 * Generates XML sitemap string for all pages.
 * Can be served via HTTP functions or used for reference.
 */
export function generateSitemapXML() {
  const urls = sitePages.map(page => `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Generates robots.txt content.
 */
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml

# Block admin/system paths
Disallow: /_api/
Disallow: /_partials/
`;
}
