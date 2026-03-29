// Crazy Time.jmlh3.js — Crazy Time article page
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
      title: 'Crazy Time — Live Casino Game Show | PlayBigTaka'
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
    { selector: '#image1', alt: 'Crazy Time live game show — spinning wheel' },
    { selector: '#image2', alt: 'Crazy Time bonus rounds — Coin Flip, Pachinko, Cash Hunt' },
    { selector: '#image3', alt: 'Crazy Time winning strategies on PlayBigTaka' },
    { selector: '#image4', alt: 'Play Crazy Time on BigTaka — live casino' }
  ]);
});
