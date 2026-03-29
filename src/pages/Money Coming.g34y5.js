// Money Coming.g34y5.js — Money Coming article page for PlayBigTaka newsletter

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Money Coming — Slot Machine Tips & Strategies | PlayBigTaka',
    description: 'Unlock the secrets of Money Coming slot machine. Payline strategies, bonus triggers, and expert tips to maximize your wins.',
    keywords: 'Money Coming, slot machine, slot tips, Money Coming strategy, slot game',
    path: '/money-coming'
  });
  trackPageView('Money Coming');
  trackTimeOnPage('Money Coming');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Money Coming — Slot Machine Game | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Money Coming slot machine coin theme' },
    { selector: '#image2', alt: 'Money Coming gameplay and paylines' },
    { selector: '#image3', alt: 'Money Coming winning strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Money Coming on PlayBigTaka' }
  ]);
});
