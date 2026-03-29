// analytics.js — Analytics tracking utilities for PlayBigTaka
// Tracks page views, button clicks, and custom events via Wix APIs.

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import { local as storage } from 'wix-storage';

const SESSION_KEY = 'bt_session';
const VIEWS_KEY = 'bt_pageviews';

/**
 * Generates a simple session ID for tracking.
 */
function getSessionId() {
  let sessionId = storage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    storage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Tracks a page view. Call this in each page's onReady.
 * @param {string} pageName — The name of the page (e.g. 'HOME', 'Aviator')
 */
export function trackPageView(pageName) {
  const sessionId = getSessionId();
  const viewData = {
    page: pageName,
    url: wixLocation.url,
    timestamp: new Date().toISOString(),
    sessionId,
    referrer: wixWindow.referrer || 'direct',
    viewportWidth: 0,
    viewportHeight: 0
  };

  // Get viewport info
  wixWindow.getBoundingRect().then((rect) => {
    viewData.viewportWidth = rect.window.width;
    viewData.viewportHeight = rect.window.height;
  }).catch(() => {});

  // Track locally for session analytics
  const views = JSON.parse(storage.getItem(VIEWS_KEY) || '[]');
  views.push(viewData);
  // Keep only last 50 views in storage
  if (views.length > 50) views.shift();
  storage.setItem(VIEWS_KEY, JSON.stringify(views));

  // Log for debugging (visible in Wix site monitoring)
  console.log(`[Analytics] Page view: ${pageName}`, viewData);
}

/**
 * Tracks a custom event (button click, form submit, etc.)
 * @param {string} eventName — e.g. 'share_click', 'newsletter_signup'
 * @param {Object} data — Additional event data
 */
export function trackEvent(eventName, data = {}) {
  const event = {
    event: eventName,
    page: wixLocation.path.join('/') || 'home',
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    ...data
  };

  console.log(`[Analytics] Event: ${eventName}`, event);
}

/**
 * Tracks time spent on page. Call in onReady, returns a cleanup function.
 * @param {string} pageName
 * @returns {Function} — Call this to log the time spent (e.g. on page leave)
 */
export function trackTimeOnPage(pageName) {
  const startTime = Date.now();

  return function logTimeSpent() {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_page', { page: pageName, seconds });
  };
}

/**
 * Gets session analytics summary.
 * @returns {Object} — { totalViews, pagesVisited, sessionStart }
 */
export function getSessionSummary() {
  const views = JSON.parse(storage.getItem(VIEWS_KEY) || '[]');
  const uniquePages = [...new Set(views.map(v => v.page))];
  return {
    totalViews: views.length,
    pagesVisited: uniquePages,
    sessionStart: views.length > 0 ? views[0].timestamp : null
  };
}
