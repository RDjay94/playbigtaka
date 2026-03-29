// Ken_Link.k8t0k.js — Ken Link page
// Share buttons, BigTaka links, alt tags, lazy-loading images

import wixLocation from 'wix-location';
import { initLazyImages, fixImageAlts, addBigTakaLinks } from 'public/siteUtils.js';

$w.onReady(function () {

  // ─── Share buttons ─────────────────────────────────────────────────
  try {
    const shareEmbed = $w('#shareButtonsEmbed');
    shareEmbed.postMessage({
      type: 'pageInfo',
      url: wixLocation.url,
      title: 'Ken Link — PlayBigTaka'
    });
  } catch (_) {}

  // ─── Clickable BigTaka links ───────────────────────────────────────
  addBigTakaLinks([
    '#text1', '#text2', '#text3', '#text4', '#text5',
    '#richText1', '#richText2'
  ]);

  // ─── Lazy-loading images ───────────────────────────────────────────
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);

  // ─── Fix alt tags ─────────────────────────────────────────────────
  fixImageAlts([
    { selector: '#image1', alt: 'Ken Link game on PlayBigTaka' },
    { selector: '#image2', alt: 'Ken Link gameplay and features' },
    { selector: '#image3', alt: 'Ken Link strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Ken Link on BigTaka' }
  ]);
});
