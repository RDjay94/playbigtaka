// Money Coming.g34y5.js — Money Coming article page
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
      title: 'Money Coming — Slot Machine Game | PlayBigTaka'
    });
  } catch (_) {}

  // ─── Clickable BigTaka links in article text ───────────────────────
  addBigTakaLinks([
    '#text1', '#text2', '#text3', '#text4', '#text5',
    '#richText1', '#richText2'
  ]);

  // ─── Lazy-loading images ───────────────────────────────────────────
  initLazyImages(['#image1', '#image2', '#image3', '#image4']);

  // ─── Fix alt tags ─────────────────────────────────────────────────
  fixImageAlts([
    { selector: '#image1', alt: 'Money Coming slot machine — coin theme' },
    { selector: '#image2', alt: 'Money Coming gameplay and paylines' },
    { selector: '#image3', alt: 'Money Coming winning strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Money Coming on BigTaka — slot games' }
  ]);
});
