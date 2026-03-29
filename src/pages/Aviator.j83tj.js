// Aviator.j83tj.js — Aviator article page for PlayBigTaka newsletter
// SEO, share buttons, BigTaka links, lazy loading, analytics

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Aviator Game — Tips, Strategies & How to Win | PlayBigTaka',
    description: 'Master the Aviator crash game with proven strategies, cashout timing tips, and gameplay insights. Learn when to fly and when to cash out.',
    keywords: 'Aviator game, Aviator strategy, Aviator tips, crash game, how to win Aviator',
    path: '/aviator'
  });
  trackPageView('Aviator');
  trackTimeOnPage('Aviator');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Aviator Game — Tips & Strategies | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Aviator crash game interface with rising multiplier' },
    { selector: '#image2', alt: 'Aviator cashout strategy guide' },
    { selector: '#image3', alt: 'Aviator winning tips on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Aviator on PlayBigTaka' }
  ]);
});
