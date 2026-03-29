// HOME.tuckg.js — Home page code for PlayBigTaka
// Search with clear button, lazy-loading images, fade-in animations

import wixData from 'wix-data';
import { initLazyImages, initSearch, fixImageAlts } from 'public/siteUtils.js';

$w.onReady(function () {

  // ─── Search with clear button & original data preservation ─────────
  // Requires: #searchInput (TextInput), #clearSearch (Button/Icon),
  //           #dataset1 (Dataset), #repeater1 (Repeater)
  // The search filters the dataset; clearing restores the full list.
  try {
    initSearch({
      inputId: '#searchInput',
      clearBtnId: '#clearSearch',
      datasetId: '#dataset1',
      filterField: 'title',
      repeaterId: '#repeater1'
    });
  } catch (_) {
    console.warn('Search elements not found — search disabled.');
  }

  // ─── Lazy-loading images ───────────────────────────────────────────
  // List image element IDs on the HOME page.
  // Images start hidden and fade in when they enter the viewport.
  initLazyImages([
    '#image1',
    '#image2',
    '#image3',
    '#image4',
    '#image5',
    '#image6',
    '#image7',
    '#image8'
  ]);

  // ─── Fix alt tags on all images ────────────────────────────────────
  fixImageAlts([
    { selector: '#image1', alt: 'PlayBigTaka — Online Gaming Platform' },
    { selector: '#image2', alt: 'Aviator Game — Crash game with multiplier' },
    { selector: '#image3', alt: 'Crazy Time — Live casino game show' },
    { selector: '#image4', alt: 'Funky Time — Dance-themed live game' },
    { selector: '#image5', alt: 'Super Ace — Card slot game' },
    { selector: '#image6', alt: 'Money Coming — Slot machine game' },
    { selector: '#image7', alt: 'BigTaka Gaming Tips & Strategies' },
    { selector: '#image8', alt: 'PlayBigTaka Community' }
  ]);
});
