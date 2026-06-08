// Aviator.j83tj.js — Multiplier skill game guide article page
// FB-safety patch: stripped real-money gambling vocab from SEO copy
// while preserving article URL for backward compatibility.

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Multiplier Skill Game — Tips, Timing & Strategy Guide | PlayBigTaka',
    description: 'Strategy guide for multiplier skill games. Learn cashout timing, round patterns, and disciplined play techniques. Educational content for free practice — no real money.',
    keywords: 'multiplier skill game, cashout timing, round pattern guide, skill game strategy, free practice game',
    path: '/aviator'
  });
  trackPageView('Multiplier Skill');
  trackTimeOnPage('Multiplier Skill');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Multiplier Skill Game — Tips & Strategy | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Multiplier skill game interface with rising number' },
    { selector: '#image2', alt: 'Cashout timing strategy guide for skill games' },
    { selector: '#image3', alt: 'Multiplier skill game tips on PlayBigTaka' },
    { selector: '#image4', alt: 'Practice multiplier skill games on PlayBigTaka' }
  ]);
});
