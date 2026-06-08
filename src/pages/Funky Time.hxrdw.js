// Funky Time.hxrdw.js — Funky Time live studio show guide page

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Funky Time — Dance-Themed Live Studio Show Guide | PlayBigTaka',
    description: 'Strategy guide for Funky Time, the dance-themed live studio show. Bonus mechanics, multipliers, and disciplined play techniques. Educational content only.',
    keywords: 'Funky Time, live studio show, disco theme, Funky Time strategy, bonus mechanics, multiplier game',
    path: '/funky-time'
  });
  trackPageView('Funky Time');
  trackTimeOnPage('Funky Time');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Funky Time — Dance-Themed Live Studio Show | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Funky Time live studio show disco theme' },
    { selector: '#image2', alt: 'Funky Time bonus mechanics and multipliers' },
    { selector: '#image3', alt: 'Funky Time strategy guide on PlayBigTaka' },
    { selector: '#image4', alt: 'Practice Funky Time strategy on PlayBigTaka' }
  ]);
});
