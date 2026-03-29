// HOME.tuckg.js — PlayBigTaka newsletter homepage
// Dynamic news feed: hero with featured articles, category filter,
// article grid with load-more pagination, subscribe CTA.

import wixLocation from 'wix-location';
import { getLatestArticles, getFeaturedArticles, getArticlesByCategory, getCategories, getSubscriberCount } from 'backend/contentManager.jsw';
import { setHomeSEO } from 'public/seo.js';
import { trackPageView } from 'public/analytics.js';

let currentCategory = 'all';
let currentSkip = 0;
const PAGE_SIZE = 12;

$w.onReady(async function () {

  // ─── SEO & Analytics ──────────────────────────────────────────────
  setHomeSEO();
  trackPageView('HOME');

  // ─── Hero section with featured articles ──────────────────────────
  try {
    const heroEmbed = $w('#heroEmbed');
    const [featured, subCount] = await Promise.all([
      getFeaturedArticles(5),
      getSubscriberCount().catch(() => 0)
    ]);

    heroEmbed.postMessage({ type: 'featured', articles: featured });
    heroEmbed.postMessage({
      type: 'stats',
      subscribers: subCount > 0 ? subCount.toLocaleString() + '+' : '1,000+',
      articles: '100+'
    });

    heroEmbed.onMessage((e) => {
      if (e.data?.type === 'openArticle') wixLocation.to(`/${e.data.slug}`);
      if (e.data?.type === 'scrollToSubscribe') {
        try { $w('#subscribeBarEmbed').scrollTo(); } catch (_) {}
      }
    });
  } catch (_) {}

  // ─── Category filter bar ──────────────────────────────────────────
  try {
    const catEmbed = $w('#categoryBarEmbed');
    const categories = await getCategories();
    catEmbed.postMessage({ type: 'categories', items: categories, active: 'all' });

    catEmbed.onMessage(async (e) => {
      if (e.data?.type === 'filterCategory') {
        currentCategory = e.data.slug;
        currentSkip = 0;
        await loadArticles(true);
      }
    });
  } catch (_) {}

  // ─── Article grid ─────────────────────────────────────────────────
  try {
    const gridEmbed = $w('#articleGridEmbed');

    gridEmbed.onMessage(async (e) => {
      if (e.data?.type === 'loadMore') {
        currentSkip += PAGE_SIZE;
        await loadArticles(false);
      }
      if (e.data?.type === 'openArticle') {
        wixLocation.to(`/${e.data.slug}`);
      }
    });
  } catch (_) {}

  // ─── Initial load ─────────────────────────────────────────────────
  await loadArticles(true);
});

async function loadArticles(reset) {
  try {
    const gridEmbed = $w('#articleGridEmbed');
    if (reset) {
      currentSkip = 0;
      gridEmbed.postMessage({ type: 'clearArticles' });
    }

    let result;
    if (currentCategory === 'all') {
      result = await getLatestArticles(PAGE_SIZE, currentSkip);
    } else {
      result = await getArticlesByCategory(currentCategory, PAGE_SIZE, currentSkip);
    }

    gridEmbed.postMessage({
      type: 'articles',
      items: result.items,
      hasMore: (currentSkip + PAGE_SIZE) < result.totalCount
    });
  } catch (_) {}
}
