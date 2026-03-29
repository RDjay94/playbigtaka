// http-functions.js — HTTP API endpoints for PlayBigTaka
// These create REST-like endpoints accessible at:
//   https://www.playbigtaka.com/_functions/<functionName>
//
// Docs: https://www.wix.com/velo/reference/wix-http-functions

import { ok, notFound, serverError } from 'wix-http-functions';
import { generateSitemapXML, generateRobotsTxt, sitePages } from 'backend/sitemap.js';
import wixData from 'wix-data';

/**
 * GET /_functions/sitemap
 * Returns the XML sitemap for search engines.
 */
export function get_sitemap(request) {
  const xml = generateSitemapXML();
  return ok({
    headers: { 'Content-Type': 'application/xml' },
    body: xml
  });
}

/**
 * GET /_functions/robots
 * Returns robots.txt content.
 */
export function get_robots(request) {
  const txt = generateRobotsTxt();
  return ok({
    headers: { 'Content-Type': 'text/plain' },
    body: txt
  });
}

/**
 * GET /_functions/pages
 * Returns a JSON list of all site pages (useful for navigation/apps).
 */
export function get_pages(request) {
  return ok({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pages: sitePages })
  });
}

/**
 * GET /_functions/health
 * Health check endpoint — returns site status.
 */
export function get_health(request) {
  return ok({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'ok',
      site: 'PlayBigTaka',
      timestamp: new Date().toISOString()
    })
  });
}

/**
 * POST /_functions/contact
 * Receives contact form submissions and stores them in a "ContactMessages" collection.
 * Body: { name: string, email: string, message: string }
 */
export function post_contact(request) {
  return request.body.json()
    .then((body) => {
      const { name, email, message } = body;
      if (!name || !email || !message) {
        return ok({
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'All fields are required.' })
        });
      }

      return wixData.insert('ContactMessages', {
        name,
        email,
        message,
        submittedAt: new Date(),
        status: 'new'
      }).then(() => {
        return ok({
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'Message received! We\'ll get back to you soon.' })
        });
      });
    })
    .catch((err) => {
      return serverError({
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Server error. Please try again later.' })
      });
    });
}

/**
 * POST /_functions/subscribe
 * Receives newsletter subscriptions and stores in "Subscribers" collection.
 * Body: { email: string }
 */
export function post_subscribe(request) {
  return request.body.json()
    .then((body) => {
      const { email } = body;
      if (!email) {
        return ok({
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: false, error: 'Email is required.' })
        });
      }

      // Check for duplicate
      return wixData.query('Subscribers')
        .eq('email', email)
        .find()
        .then((results) => {
          if (results.items.length > 0) {
            return ok({
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ success: true, message: 'You\'re already subscribed!' })
            });
          }
          return wixData.insert('Subscribers', {
            email,
            subscribedAt: new Date(),
            active: true
          }).then(() => {
            return ok({
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ success: true, message: 'Subscribed! Welcome to BigTaka.' })
            });
          });
        });
    })
    .catch((err) => {
      return serverError({
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Server error. Please try again.' })
      });
    });
}
