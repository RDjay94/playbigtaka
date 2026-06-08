// Ken_Link.k8t0k.js — Ken Link game guide article page

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';
import { setPageSEO } from 'public/seo.js';
import { trackPageView, trackTimeOnPage } from 'public/analytics.js';

$w.onReady(function () {

  setPageSEO({
    title: 'Ken Link — Game Strategy Guide | PlayBigTaka',
    description: 'Strategy guide for the Ken Link skill game. Tips, gameplay walkthroughs, and disciplined play techniques. Educational content for free practice only.',
    keywords: 'Ken Link, Ken Link game, Ken Link strategy, skill game guide, free practice game',
    path: '/ken-link'
  });
  trackPageView('Ken Link');
  trackTimeOnPage('Ken Link');

  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Ken Link — Strategy Guide | PlayBigTaka'
    });
  } catch (_) {}

  addBigTakaLinks(['#text1', '#text2', '#text3', '#text4', '#text5', '#richText1', '#richText2']);
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);
  fixImageAlts([
    { selector: '#image1', alt: 'Ken Link skill game on PlayBigTaka' },
    { selector: '#image2', alt: 'Ken Link gameplay and features' },
    { selector: '#image3', alt: 'Ken Link strategy guide on PlayBigTaka' },
    { selector: '#image4', alt: 'Practice Ken Link strategy on PlayBigTaka' }
  ]);
});
