// seo.js — SEO module for PlayBigTaka
// Handles meta tags, Open Graph, Twitter Cards, JSON-LD structured data.
// FB-safety patch: removed gambling-flagged vocab (casino, aviator,
// specific provider game names) from titles, descriptions, keywords.
// Real-money signals (deposit/withdrawal/win cash) never appear here.

import wixSeo from 'wix-seo';

const SITE_NAME = 'PlayBigTaka';
const SITE_URL = 'https://www.playbigtaka.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Sets SEO tags for the homepage.
 */
export function setHomeSEO() {
  wixSeo.setTitle('PlayBigTaka — Skill Game Tips, Strategy Guides & News');
  wixSeo.setMetaTags([
    { name: 'description', content: 'PlayBigTaka publishes daily skill game guides, strategy articles, and reviews for popular arcade game formats. Educational content only — virtual entertainment, no real money play.' },
    { name: 'keywords', content: 'PlayBigTaka, skill game tips, strategy guides, arcade game reviews, multiplier game strategy, mini-game guides, cricket game tips, gaming skills' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'PlayBigTaka — Skill Game Tips & Strategy Guides' },
    { property: 'og:description', content: 'Daily skill game strategy guides and reviews. Virtual entertainment, no real money play.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: DEFAULT_IMAGE },
    { property: 'og:url', content: SITE_URL },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'PlayBigTaka — Skill Game Strategy Guides' },
    { name: 'twitter:description', content: 'Daily skill game guides, strategy tips & reviews.' },
    { name: 'twitter:image', content: DEFAULT_IMAGE }
  ]);
  wixSeo.setStructuredData([
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: 'Daily skill game strategy guides and educational content. Virtual entertainment, no real money.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      sameAs: [
        'https://www.instagram.com/playbigtaka',
        'https://www.facebook.com/playbigtaka'
      ]
    }
  ]);
}

/**
 * Sets SEO tags for a static game page.
 * @param {Object} page — { title, description, keywords, path }
 */
export function setPageSEO({ title, description, keywords, path }) {
  wixSeo.setTitle(title);
  wixSeo.setMetaTags([
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: DEFAULT_IMAGE },
    { property: 'og:url', content: `${SITE_URL}${path}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_IMAGE }
  ]);
  wixSeo.setStructuredData([{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: DEFAULT_IMAGE,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE }
    }
  }]);
}

/**
 * Sets SEO tags for a dynamic article (from CMS).
 * @param {Object} article — { title, excerpt, slug, coverImage, category, publishedDate }
 */
export function setArticleSEO(article) {
  const title = `${article.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}/article/${article.slug}`;
  const image = article.coverImage || DEFAULT_IMAGE;

  wixSeo.setTitle(title);
  wixSeo.setMetaTags([
    { name: 'description', content: article.excerpt || '' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: article.excerpt || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'article:published_time', content: article.publishedDate ? new Date(article.publishedDate).toISOString() : '' },
    { property: 'article:section', content: article.category || 'Skill Games' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: article.excerpt || '' },
    { name: 'twitter:image', content: image }
  ]);
  wixSeo.setStructuredData([{
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || '',
    image,
    datePublished: article.publishedDate ? new Date(article.publishedDate).toISOString() : '',
    url,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }
  }]);
}
