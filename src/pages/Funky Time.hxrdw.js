// Funky Time.hxrdw.js — Funky Time article page for PlayBigTaka newsletter

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Funky Time — Dance-Themed Live Game Guide | PlayBigTaka',
    description: 'Groove your way to wins with our Funky Time guide. Strategies, bonus features, and tips for this disco-themed live casino game.',
    keywords: 'Funky Time, live game, disco theme, Funky Time strategy, bonus features',
    path: '/funky-time'
  });
  trackPageView('Funky Time');
  trackTimeOnPage('Funky Time');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Funky Time — Dance-Themed Live Game | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Funky Time live game disco dance theme' },
    { selector: '#image2', alt: 'Funky Time bonus features and multipliers' },
    { selector: '#image3', alt: 'Funky Time tips and strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Funky Time on PlayBigTaka' }
  ]);
});
