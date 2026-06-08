// Money Coming.g34y5.js — Money Coming spin game guide article page

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Money Coming — Spin Game Tips & Strategy Guide | PlayBigTaka',
    description: 'Strategy guide for the Money Coming spin game. Payline patterns, bonus triggers, and disciplined play techniques. Educational content for free practice — no real money.',
    keywords: 'Money Coming, spin game, payline guide, Money Coming strategy, bonus triggers, free practice game',
    path: '/money-coming'
  });
  trackPageView('Money Coming');
  trackTimeOnPage('Money Coming');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Money Coming — Spin Game Guide | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Money Coming spin game coin theme' },
    { selector: '#image2', alt: 'Money Coming gameplay and paylines' },
    { selector: '#image3', alt: 'Money Coming strategy guide on PlayBigTaka' },
    { selector: '#image4', alt: 'Practice Money Coming strategy on PlayBigTaka' }
  ]);
});
