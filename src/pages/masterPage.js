// masterPage.js — Site-wide code for PlayBigTaka
// Runs on every page: splash screen, progress bar, back-to-top, theme toggle,
// scroll animations, newsletter CTA, contact form, social links, mobile, analytics.

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import { initFadeInAnimations } from 'public/siteUtils.js';
import { getTheme, toggleTheme } from 'public/theme.js';
import { trackEvent } from 'public/analytics.js';

$w.onReady(function () {

  // ─── 1. Splash screen ─────────────────────────────────────────────
  // Requires HTML embed #splashEmbed. Paste splashScreenHTML into it.
  try {
    const splashEmbed = $w('#splashEmbed');
    // Dismiss splash after page is ready (small delay for content to load)
    setTimeout(() => {
      splashEmbed.postMessage({ type: 'hideSplash' });
    }, 1500);
  } catch (_) {}

  // ─── 2. Reading progress bar ───────────────────────────────────────
  // Requires HTML embed #progressBarEmbed. Paste progressBarHTML into it.
  try {
    const progressEmbed = $w('#progressBarEmbed');
    setInterval(async () => {
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
  } catch (_) {}

  // ─── 3. Back-to-top button ─────────────────────────────────────────
  // Requires HTML embed #backToTopEmbed. Paste backToTopHTML into it.
  try {
    const backToTopEmbed = $w('#backToTopEmbed');
    setInterval(async () => {
      try {
        const rect = await wixWindow.getBoundingRect();
        backToTopEmbed.postMessage({ type: 'scrollY', y: rect.scroll.y });
      } catch (_) {}
    }, 200);

    backToTopEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'backToTop') {
        wixWindow.scrollTo(0, 0, { scrollAnimation: true });
        trackEvent('back_to_top');
      }
    });
  } catch (_) {}

  // ─── 4. Dark/Light mode toggle ─────────────────────────────────────
  // Requires HTML embed #themeToggleEmbed. Paste themeToggleHTML into it.
  try {
    const themeEmbed = $w('#themeToggleEmbed');
    // Send current theme on load
    themeEmbed.postMessage({ type: 'theme', mode: getTheme() });

    themeEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'toggleTheme') {
        const newMode = toggleTheme();
        themeEmbed.postMessage({ type: 'theme', mode: newMode });
        trackEvent('theme_toggle', { mode: newMode });
      }
    });
  } catch (_) {}

  // ─── 5. Scroll fade-in animations ─────────────────────────────────
  initFadeInAnimations([
    '#section1', '#section2', '#section3', '#section4', '#section5',
    '#featuredGames', '#aboutSection', '#ctaSection',
    '#heroSection', '#gamesGrid', '#testimonialsSection'
  ]);

  // ─── 6. Newsletter signup CTA ─────────────────────────────────────
  // Requires HTML embed #newsletterEmbed. Paste newsletterHTML into it.
  try {
    const newsletterEmbed = $w('#newsletterEmbed');
    newsletterEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'subscribe') {
        const email = event.data.email;
        trackEvent('newsletter_signup', { email });
        console.log('Newsletter signup:', email);
        newsletterEmbed.postMessage({
          type: 'subscribeResult',
          success: true,
          message: "You're subscribed! Welcome to BigTaka."
        });
      }
    });
  } catch (_) {}

  // ─── 7. Contact form ──────────────────────────────────────────────
  // Requires HTML embed #contactFormEmbed. Paste contactFormHTML into it.
  try {
    const contactEmbed = $w('#contactFormEmbed');
    contactEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'contactSubmit') {
        trackEvent('contact_submit', { name: event.data.name });
        console.log('Contact form:', event.data);
        contactEmbed.postMessage({
          type: 'contactResult',
          success: true,
          message: "Message received! We'll get back to you soon."
        });
      }
    });
  } catch (_) {}

  // ─── 8. Mobile viewport reporting ─────────────────────────────────
  // Requires HTML embed #mobileEnhanceEmbed. Paste mobileCSS into it.
  try {
    const mobileEmbed = $w('#mobileEnhanceEmbed');
    mobileEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'viewport') {
        // Can use this to show/hide elements based on mobile detection
        if (event.data.isMobile) {
          // Mobile-specific adjustments
          try { $w('#desktopOnlySection').hide(); } catch (_) {}
        }
      }
    });
  } catch (_) {}

  // ─── 9. 404 page navigation handler ───────────────────────────────
  // Requires HTML embed #notFoundEmbed. Paste notFoundHTML into it.
  try {
    const notFoundEmbed = $w('#notFoundEmbed');
    notFoundEmbed.onMessage((event) => {
      if (event.data && event.data.type === 'navigate') {
        wixLocation.to(event.data.page);
      }
    });
  } catch (_) {}

  // ─── Preconnect hints & html lang ─────────────────────────────────
  // Add in Wix Dashboard > Settings > Custom Code (in <head>):
  //   <link rel="preconnect" href="https://www.playbigtaka.com" />
  //   <link rel="preconnect" href="https://static.wixstatic.com" crossorigin />
  //   <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
  //   <meta http-equiv="Content-Language" content="en" />
});
