// Crazy Time.jmlh3.js — Live studio game show guide article page

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Crazy Time — Live Studio Game Show Strategy Guide | PlayBigTaka',
    description: 'Complete strategy guide for the Crazy Time live studio game show. Learn bonus round mechanics, wheel patterns, and disciplined play. Free practice content only.',
    keywords: 'Crazy Time, live studio show, game show strategy, bonus rounds, Coin Flip, Pachinko, wheel game guide',
    path: '/crazy-time'
  });
  trackPageView('Crazy Time');
  trackTimeOnPage('Crazy Time');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Crazy Time — Live Studio Game Show | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Crazy Time live studio show spinning wheel' },
    { selector: '#image2', alt: 'Crazy Time bonus rounds — Coin Flip, Pachinko, Cash Hunt' },
    { selector: '#image3', alt: 'Crazy Time strategy guide on PlayBigTaka' },
    { selector: '#image4', alt: 'Practice Crazy Time strategy on PlayBigTaka' }
  ]);
});
