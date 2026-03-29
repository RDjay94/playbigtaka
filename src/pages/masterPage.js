// masterPage.js — Global site code for PlayBigTaka newsletter
// Handles: splash screen, progress bar, back-to-top, theme toggle,
// newsletter subscribe bar, contact form, search, navigation, footer.

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import { subscribe } from 'backend/contentManager.jsw';
import { getTheme, toggleTheme } from 'public/theme.js';
import { trackEvent } from 'public/analytics.js';

$w.onReady(function () {

  // ─── Splash screen ────────────────────────────────────────────────
  try {
    const splash = $w('#splashEmbed');
    setTimeout(() => splash.postMessage({ type: 'hideSplash' }), 1500);
  } catch (_) {}

  // ─── Reading progress bar ─────────────────────────────────────────
  try {
    const progress = $w('#progressBarEmbed');
    setInterval(async () => {
      try {
        const r = await wixWindow.getBoundingRect();
        const pct = r.document.height > r.window.height
          ? Math.min(100, Math.round((r.scroll.y / (r.document.height - r.window.height)) * 100))
          : 0;
        progress.postMessage({ type: 'scroll', percent: pct });
      } catch (_) {}
    }, 120);
  } catch (_) {}

  // ─── Back-to-top button ───────────────────────────────────────────
  try {
    const btt = $w('#backToTopEmbed');
    setInterval(async () => {
      try {
        const r = await wixWindow.getBoundingRect();
        btt.postMessage({ type: 'scrollY', y: r.scroll.y });
      } catch (_) {}
    }, 200);
    btt.onMessage((e) => {
      if (e.data?.type === 'backToTop') {
        wixWindow.scrollTo(0, 0, { scrollAnimation: true });
        trackEvent('back_to_top');
      }
    });
  } catch (_) {}

  // ─── Theme toggle ─────────────────────────────────────────────────
  try {
    const themeEmbed = $w('#themeToggleEmbed');
    themeEmbed.postMessage({ type: 'theme', mode: getTheme() });
    themeEmbed.onMessage((e) => {
      if (e.data?.type === 'toggleTheme') {
        const mode = toggleTheme();
        themeEmbed.postMessage({ type: 'theme', mode });
        trackEvent('theme_toggle', { mode });
      }
    });
  } catch (_) {}

  // ─── Search bar ───────────────────────────────────────────────────
  try {
    const searchEmbed = $w('#searchBarEmbed');
    searchEmbed.onMessage(async (e) => {
      if (e.data?.type === 'search') {
        const { searchArticles } = await import('backend/contentManager.jsw');
        const items = await searchArticles(e.data.query, 8);
        searchEmbed.postMessage({ type: 'searchResults', items });
      }
      if (e.data?.type === 'openArticle') {
        wixLocation.to(`/${e.data.slug}`);
      }
    });
  } catch (_) {}

  // ─── Newsletter subscribe (global instances) ──────────────────────
  // Handles subscribe from any embed on any page that sends { type: 'subscribe', email }
  const subscribeEmbedIds = ['#subscribeBarEmbed', '#newsletterEmbed', '#heroEmbed'];
  subscribeEmbedIds.forEach((id) => {
    try {
      const embed = $w(id);
      embed.onMessage(async (e) => {
        if (e.data?.type === 'subscribe') {
          const result = await subscribe(e.data.email, e.data.name || '');
          embed.postMessage({ type: 'subscribeResult', ...result });
          trackEvent('newsletter_signup', { email: e.data.email });
        }
        if (e.data?.type === 'scrollToSubscribe') {
          try { $w('#subscribeBarEmbed').scrollTo(); } catch (_) {}
        }
        if (e.data?.type === 'openArticle') {
          wixLocation.to(`/${e.data.slug}`);
        }
      });
    } catch (_) {}
  });

  // ─── Contact form ─────────────────────────────────────────────────
  try {
    const contact = $w('#contactFormEmbed');
    contact.onMessage(async (e) => {
      if (e.data?.type === 'contactSubmit') {
        try {
          const wixData = (await import('wix-data')).default;
          await wixData.insert('ContactMessages', {
            name: e.data.name,
            email: e.data.email,
            message: e.data.message,
            submittedAt: new Date(),
            status: 'new'
          });
          contact.postMessage({ type: 'contactResult', success: true, message: "Message received! We'll respond soon." });
        } catch (_) {
          contact.postMessage({ type: 'contactResult', success: false, message: 'Something went wrong. Please try again.' });
        }
        trackEvent('contact_submit');
      }
    });
  } catch (_) {}

  // ─── Footer navigation ────────────────────────────────────────────
  try {
    const footer = $w('#footerEmbed');
    footer.onMessage((e) => {
      if (e.data?.type === 'navigate') wixLocation.to(e.data.path);
    });
  } catch (_) {}

  // ─── 404 page navigation ─────────────────────────────────────────
  try {
    const nf = $w('#notFoundEmbed');
    nf.onMessage((e) => {
      if (e.data?.type === 'navigate') wixLocation.to(e.data.page);
    });
  } catch (_) {}
});
