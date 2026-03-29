// http-functions.js — HTTP API endpoints for PlayBigTaka newsletter site
// Accessible at: https://www.playbigtaka.com/_functions/<functionName>

import { ok, notFound, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

const SITE_URL = 'https://www.playbigtaka.com';
const SITE_NAME = 'PlayBigTaka';

/**
 * GET /_functions/rss
 * RSS feed of latest articles for feed readers and syndication.
 */
export function get_rss(request) {
  return wixData.query('Articles')
    .eq('status', 'published')
    .descending('publishedDate')
    .limit(30)
    .find()
    .then((results) => {
      const items = results.items.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/article/${article.slug}</link>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <category>${article.category || 'News'}</category>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/article/${article.slug}</guid>
      ${article.coverImage ? `<enclosure url="${article.coverImage}" type="image/jpeg"/>` : ''}
    </item>`).join('');

      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Your go-to source for online gaming tips, strategies, and daily news from PlayBigTaka.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/_functions/rss" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

      return ok({
        headers: {
          'Content-Type': 'application/rss+xml; charset=UTF-8',
          'Cache-Control': 'public, max-age=3600'
        },
        body: rss
      });
    })
    .catch(() => serverError({
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to generate RSS feed' })
    }));
}

/**
 * GET /_functions/sitemap
 * XML sitemap for search engines.
 */
export function get_sitemap(request) {
  return wixData.query('Articles')
    .eq('status', 'published')
    .descending('publishedDate')
    .limit(1000)
    .find()
    .then((results) => {
      const articleUrls = results.items.map(a => `
  <url>
    <loc>${SITE_URL}/article/${a.slug}</loc>
    <lastmod>${new Date(a.publishedDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/aviator</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/crazy-time</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/funky-time</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/super-ace</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/money-coming</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${articleUrls}
</urlset>`;

      return ok({
        headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' },
        body: xml
      });
    })
    .catch(() => serverError({
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to generate sitemap' })
    }));
}

/**
 * GET /_functions/health
 */
export function get_health(request) {
  return ok({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'ok',
      site: SITE_NAME,
      type: 'newsletter',
      timestamp: new Date().toISOString()
    })
  });
}

/**
 * POST /_functions/subscribe
 * Newsletter subscription endpoint.
 */
export function post_subscribe(request) {
  return request.body.json()
    .then(({ email, name }) => {
      if (!email) {
        return ok({
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'Email is required.' })
        });
      }
      return wixData.query('Subscribers')
        .eq('email', email.toLowerCase().trim())
        .find()
        .then((results) => {
          if (results.items.length > 0) {
            return ok({
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ success: true, message: "You're already subscribed!" })
            });
          }
          return wixData.insert('Subscribers', {
            email: email.toLowerCase().trim(),
            name: (name || '').trim(),
            subscribedAt: new Date(),
            active: true
          }).then(() => ok({
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, message: 'Subscribed! Welcome to PlayBigTaka.' })
          }));
        });
    })
    .catch(() => serverError({
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Server error.' })
    }));
}

/**
 * POST /_functions/contact
 * Contact form submissions.
 */
export function post_contact(request) {
  return request.body.json()
    .then(({ name, email, message }) => {
      if (!name || !email || !message) {
        return ok({
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'All fields required.' })
        });
      }
      return wixData.insert('ContactMessages', {
        name, email, message,
        submittedAt: new Date(),
        status: 'new'
      }).then(() => ok({
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: "Message received! We'll respond soon." })
      }));
    })
    .catch(() => serverError({
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Server error.' })
    }));
}
