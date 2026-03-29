// Funky Time.hxrdw.js — Funky Time article page
// SEO, share buttons, BigTaka links, alt tags, lazy loading, analytics

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setSEO('Funky Time');
  trackPageView('Funky Time');
  trackTimeOnPage('Funky Time');

  // ─── Share buttons ─────────────────────────────────────────────────
  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Funky Time — Dance-Themed Live Game | PlayBigTaka'
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
    { selector: '#image1', alt: 'Funky Time live game — disco dance theme' },
    { selector: '#image2', alt: 'Funky Time bonus features and multipliers' },
    { selector: '#image3', alt: 'Funky Time tips and strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Funky Time on BigTaka — live entertainment' }
  ]);
});
