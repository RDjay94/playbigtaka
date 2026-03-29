// Super Ace.viibv.js — Super Ace article page
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
      title: 'Super Ace — Card Slot Game | PlayBigTaka'
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
    { selector: '#image1', alt: 'Super Ace card slot game — ace of spades theme' },
    { selector: '#image2', alt: 'Super Ace bonus features and free spins' },
    { selector: '#image3', alt: 'Super Ace tips and strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Super Ace on BigTaka — card slot games' }
  ]);
});
