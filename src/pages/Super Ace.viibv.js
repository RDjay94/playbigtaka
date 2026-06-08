// Super Ace.viibv.js — Super Ace card spin game guide article page

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Super Ace — Card Spin Game Strategy Guide | PlayBigTaka',
    description: 'Strategy guide for Super Ace, the card-themed spin game. Free spin features, bonus triggers, and disciplined play tips. Educational content for free practice.',
    keywords: 'Super Ace, card spin game, Super Ace strategy, free spins, spin game guide, bonus features',
    path: '/super-ace'
  });
  trackPageView('Super Ace');
  trackTimeOnPage('Super Ace');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Super Ace — Card Spin Game Guide | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Super Ace card spin game ace theme' },
    { selector: '#image2', alt: 'Super Ace bonus features and free spins' },
    { selector: '#image3', alt: 'Super Ace strategy guide on PlayBigTaka' },
    { selector: '#image4', alt: 'Practice Super Ace strategy on PlayBigTaka' }
  ]);
});
