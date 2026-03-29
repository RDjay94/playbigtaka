// seo.js — SEO meta tags and structured data for all PlayBigTaka pages
// Import and call setSEO() in each page's onReady to set meta tags.

import wixSeo from 'wix-seo';

const SITE_NAME = 'PlayBigTaka';
const SITE_URL = 'https://www.playbigtaka.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Page-specific SEO configurations
 */
const PAGE_SEO = {
  HOME: {
    title: 'PlayBigTaka — Online Gaming Tips, Strategies & Reviews',
    description: 'Your go-to source for online gaming tips, strategies, and honest reviews. Explore Aviator, Crazy Time, Super Ace, Funky Time, Money Coming and more on PlayBigTaka.',
    keywords: 'PlayBigTaka, online gaming, game strategies, casino tips, game reviews, Aviator, Crazy Time, Super Ace',
    type: 'website'
  },
  Aviator: {
    title: 'Aviator Game — Tips, Strategies & How to Win | PlayBigTaka',
    description: 'Master the Aviator crash game with proven strategies, cashout timing tips, and gameplay insights. Learn when to fly and when to cash out on PlayBigTaka.',
    keywords: 'Aviator game, Aviator strategy, Aviator tips, crash game, how to win Aviator, PlayBigTaka',
    type: 'article'
  },
  'Crazy Time': {
    title: 'Crazy Time — Live Casino Game Show Guide | PlayBigTaka',
    description: 'Complete guide to Crazy Time live game show. Learn bonus round strategies for Coin Flip, Pachinko, Cash Hunt and the Crazy Time wheel on PlayBigTaka.',
    keywords: 'Crazy Time, live casino, game show, Crazy Time strategy, bonus rounds, Coin Flip, Pachinko, PlayBigTaka',
    type: 'article'
  },
  'Funky Time': {
    title: 'Funky Time — Dance-Themed Live Game Guide | PlayBigTaka',
    description: 'Groove your way to wins with our Funky Time guide. Strategies, bonus features, and tips for this disco-themed live casino game on PlayBigTaka.',
    keywords: 'Funky Time, live game, disco theme, Funky Time strategy, bonus features, PlayBigTaka',
    type: 'article'
  },
  'Money Coming': {
    title: 'Money Coming — Slot Machine Tips & Strategies | PlayBigTaka',
    description: 'Unlock the secrets of Money Coming slot machine. Payline strategies, bonus triggers, and expert tips to maximize your wins on PlayBigTaka.',
    keywords: 'Money Coming, slot machine, slot tips, Money Coming strategy, slot game, PlayBigTaka',
    type: 'article'
  },
  'Super Ace': {
    title: 'Super Ace — Card Slot Game Guide & Tips | PlayBigTaka',
    description: 'Master Super Ace card slot with our complete guide. Free spin strategies, bonus features, and winning tips on PlayBigTaka.',
    keywords: 'Super Ace, card slot, Super Ace tips, free spins, slot strategy, PlayBigTaka',
    type: 'article'
  },
  'Ken Link': {
    title: 'Ken Link — Game Guide & Strategies | PlayBigTaka',
    description: 'Explore Ken Link game strategies and tips. Your complete guide to winning on PlayBigTaka.',
    keywords: 'Ken Link, Ken Link game, Ken Link strategy, PlayBigTaka',
    type: 'article'
  }
};

/**
 * Sets SEO meta tags and structured data for the current page.
 * @param {string} pageName — Key from PAGE_SEO (e.g. 'HOME', 'Aviator')
 */
export function setSEO(pageName) {
  const seo = PAGE_SEO[pageName];
  if (!seo) return;

  // Set basic meta tags
  wixSeo.setTitle(seo.title);
  wixSeo.setMetaTags([
    { name: 'description', content: seo.description },
    { name: 'keywords', content: seo.keywords },
    { name: 'robots', content: 'index, follow' },
    // Open Graph
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:type', content: seo.type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: DEFAULT_IMAGE },
    { property: 'og:url', content: SITE_URL },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: DEFAULT_IMAGE }
  ]);

  // Set structured data (JSON-LD)
  if (seo.type === 'website') {
    wixSeo.setStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': SITE_NAME,
        'url': SITE_URL,
        'description': seo.description,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL,
        'logo': DEFAULT_IMAGE,
        'sameAs': [
          'https://www.instagram.com/playbigtaka',
          'https://www.facebook.com/playbigtaka'
        ]
      }
    ]);
  } else if (seo.type === 'article') {
    wixSeo.setStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': seo.title,
        'description': seo.description,
        'image': DEFAULT_IMAGE,
        'author': {
          '@type': 'Organization',
          'name': SITE_NAME,
          'url': SITE_URL
        },
        'publisher': {
          '@type': 'Organization',
          'name': SITE_NAME,
          'url': SITE_URL,
          'logo': { '@type': 'ImageObject', 'url': DEFAULT_IMAGE }
        },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': SITE_URL }
      }
    ]);
  }
}
