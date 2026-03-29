// Aviator.j83tj.js — Aviator article page
// SEO, share buttons, BigTaka links, alt tags, lazy loading, analytics

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage, trackEvent } from 'public/analytics.js';

$w.onReady(function () {

  setSEO('Aviator');
  trackPageView('Aviator');
  trackTimeOnPage('Aviator');

  // ─── Share buttons ─────────────────────────────────────────────────
  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Aviator Game — Tips & Strategies | PlayBigTaka'
    });
  } catch (_) {}

  // ─── Clickable BigTaka links ───────────────────────────────────────
  addBigTakaLinks([
    '#text1', '#text2', '#text3', '#text4', '#text5',
    '#richText1', '#richText2'
  ]);

  // ─── Lazy-loading images ───────────────────────────────────────────
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);

  // ─── Fix alt tags ─────────────────────────────────────────────────
  fixImageAlts([
    { selector: '#image1', alt: 'Aviator game interface — crash game with rising multiplier' },
    { selector: '#image2', alt: 'Aviator gameplay strategy — when to cash out' },
    { selector: '#image3', alt: 'Aviator winning tips on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Aviator on BigTaka — online gaming' }
  ]);
});
