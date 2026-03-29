// Super Ace.viibv.js — Super Ace article page for PlayBigTaka newsletter

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Super Ace — Card Slot Game Guide & Tips | PlayBigTaka',
    description: 'Master Super Ace card slot with our complete guide. Free spin strategies, bonus features, and winning tips.',
    keywords: 'Super Ace, card slot, Super Ace tips, free spins, slot strategy',
    path: '/super-ace'
  });
  trackPageView('Super Ace');
  trackTimeOnPage('Super Ace');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Super Ace — Card Slot Game | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Super Ace card slot game ace of spades theme' },
    { selector: '#image2', alt: 'Super Ace bonus features and free spins' },
    { selector: '#image3', alt: 'Super Ace tips and strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Super Ace on PlayBigTaka' }
  ]);
});
