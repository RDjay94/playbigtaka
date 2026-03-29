// HOME.tuckg.js — Home page code for PlayBigTaka
// SEO, search, lazy loading, fade-in animations, analytics

import wixData from 'wix-data';
import { initLazyImages, initSearch, fixImageAlts } from 'public/siteUtils.js';
import { setSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  // ─── SEO meta tags & structured data ───────────────────────────────
  setSEO('HOME');

  // ─── Analytics ─────────────────────────────────────────────────────
  trackPageView('HOME');
  trackTimeOnPage('HOME');

  // ─── Search with clear button & data preservation ─────────────────
  try {
    initSearch({
      inputId: '#searchInput',
      clearBtnId: '#clearSearch',
      datasetId: '#dataset1',
      filterField: 'title',
      repeaterId: '#repeater1'
    });
  } catch (_) {
    console.warn('Search elements not found — search disabled.');
  }

  // ─── Lazy-loading images ───────────────────────────────────────────
  initLazyImages([
    '#image1', '#image2', '#image3', '#image4',
    '#image5', '#image6', '#image7', '#image8'
  ]);

  // ─── Fix alt tags on all images ────────────────────────────────────
  fixImageAlts([
    { selector: '#image1', alt: 'PlayBigTaka — Online Gaming Platform' },
    { selector: '#image2', alt: 'Aviator Game — Crash game with multiplier' },
    { selector: '#image3', alt: 'Crazy Time — Live casino game show' },
    { selector: '#image4', alt: 'Funky Time — Dance-themed live game' },
    { selector: '#image5', alt: 'Super Ace — Card slot game' },
    { selector: '#image6', alt: 'Money Coming — Slot machine game' },
    { selector: '#image7', alt: 'BigTaka Gaming Tips and Strategies' },
    { selector: '#image8', alt: 'PlayBigTaka Community' }
  ]);
});
