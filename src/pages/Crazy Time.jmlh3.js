// Crazy Time.jmlh3.js — Crazy Time article page for PlayBigTaka newsletter

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Crazy Time — Live Casino Game Show Guide | PlayBigTaka',
    description: 'Complete guide to Crazy Time live game show. Learn bonus round strategies for Coin Flip, Pachinko, Cash Hunt and the Crazy Time wheel.',
    keywords: 'Crazy Time, live casino, game show, Crazy Time strategy, bonus rounds, Coin Flip, Pachinko',
    path: '/crazy-time'
  });
  trackPageView('Crazy Time');
  trackTimeOnPage('Crazy Time');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Crazy Time — Live Casino Game Show | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Crazy Time live game show spinning wheel' },
    { selector: '#image2', alt: 'Crazy Time bonus rounds — Coin Flip, Pachinko, Cash Hunt' },
    { selector: '#image3', alt: 'Crazy Time winning strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Crazy Time on PlayBigTaka' }
  ]);
});
