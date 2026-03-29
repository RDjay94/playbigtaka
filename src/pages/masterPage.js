// masterPage.js — Site-wide code for PlayBigTaka
// Runs on every page: progress bar, back-to-top, scroll animations,
// newsletter CTA, social links, preconnect hints, and html lang.

import wixWindow from 'wix-window';
import { initFadeInAnimations } from 'public/siteUtils.js';

$w.onReady(function () {

  // ─── 1. Preconnect hints & dynamic html lang ───────────────────────
  // Wix manages <html lang> via the Multilingual dashboard.
  // Preconnect hints are added via Wix Dashboard > Settings > Custom Code,
  // or by adding this snippet in the <head> section:
  //   <link rel="preconnect" href="https://www.playbigtaka.com" />
  //   <link rel="preconnect" href="https://static.wixstatic.com" crossorigin />
  //   <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
  // (Wix Velo cannot inject <head> tags directly — use the Dashboard.)

  // ─── 2. Reading progress bar ───────────────────────────────────────
  // Requires an HTML embed component with ID #progressBarEmbed on the
  // master page (header/footer section). Paste progressBarHTML into it.
  let progressTimer;
  try {
    const progressEmbed = $w('#progressBarEmbed');
    progressTimer = setInterval(async () => {
      try {
        const rect = await wixWindow.getBoundingRect();
        const scrollY = rect.scroll.y;
        const docH = rect.document.height;
        const winH = rect.window.height;
        const percent = docH > winH
          ? Math.min(100, Math.round((scrollY / (docH - winH)) * 100))
          : 0;
        progressEmbed.postMessage({ type: 'scroll', percent });
      } catch (_) {}
    }, 120);
  } catch (_) {
    // progressBarEmbed not present on this page — skip
  }

  // ─── 3. Back-to-top button ─────────────────────────────────────────
  // Requires an HTML embed component with ID #backToTopEmbed.
  // Paste backToTopHTML into it.
  try {
    const backToTopEmbed = $w('#backToTopEmbed');
    // Send scroll position so embed can show/hide the button
    setInterval(async () => {
      try {
        const rect = await wixWindow.getBoundingRect();
        backToTopEmbed.postMessage({ type: 'scrollY', y: rect.scroll.y });
      } catch (_) {}
    }, 200);

    // Listen for click from embed
    backToTopEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'backToTop') {
        wixWindow.scrollTo(0, 0, { scrollAnimation: true });
      }
    });
  } catch (_) {
    // backToTopEmbed not present — skip
  }

  // ─── 4. Scroll fade-in animations ─────────────────────────────────
  // Add element IDs here that should fade in on scroll.
  // Set these elements' initial opacity to 0 in the Wix Editor.
  initFadeInAnimations([
    '#section1',
    '#section2',
    '#section3',
    '#section4',
    '#section5',
    '#featuredGames',
    '#aboutSection',
    '#ctaSection'
  ]);

  // ─── 5. Newsletter signup CTA ─────────────────────────────────────
  // Requires an HTML embed component with ID #newsletterEmbed.
  // Paste newsletterHTML into it.
  try {
    const newsletterEmbed = $w('#newsletterEmbed');
    newsletterEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'subscribe') {
        const email = event.data.email;
        // TODO: Connect to your email service (Wix CRM, Mailchimp, etc.)
        // For now, log and confirm to the embed
        console.log('Newsletter signup:', email);
        newsletterEmbed.postMessage({
          type: 'subscribeResult',
          success: true,
          message: 'You\'re subscribed! Welcome to BigTaka.'
        });
      }
    });
  } catch (_) {
    // newsletterEmbed not present — skip
  }

  // ─── 6. Social links ──────────────────────────────────────────────
  // Requires an HTML embed component with ID #socialLinksEmbed.
  // Paste socialLinksHTML into it. Update URLs in the HTML as needed:
  //   Website:   https://www.playbigtaka.com
  //   Instagram: https://www.instagram.com/playbigtaka
  //   Facebook:  https://www.facebook.com/playbigtaka

  // ─── Cleanup on page unload ────────────────────────────────────────
  // Clear intervals when navigating away to prevent memory leaks
  if (progressTimer) {
    // Wix doesn't expose a page-unload hook, but intervals are
    // automatically cleared when the page context is destroyed.
  }
});
