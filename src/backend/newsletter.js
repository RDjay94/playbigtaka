// newsletter.js — Newsletter delivery and digest generation for PlayBigTaka
// Called by scheduled jobs to send daily/weekly digests to subscribers.

import wixData from 'wix-data';

const SITE_URL = 'https://www.playbigtaka.com';
const SITE_NAME = 'PlayBigTaka';

/**
 * Generates the HTML email body for a newsletter digest.
 * @param {Object[]} articles — Array of article objects
 * @param {string} digestType — 'daily' or 'weekly'
 * @returns {string} — HTML email content
 */
export function generateDigestHTML(articles, digestType = 'daily') {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const articleCards = articles.map(article => `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #2a2a4a">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:16px;width:120px;vertical-align:top">
              <img src="${article.coverImage || ''}" width="120" height="80"
                style="border-radius:8px;object-fit:cover;display:block" alt="${article.title}"/>
            </td>
            <td style="vertical-align:top">
              <a href="${SITE_URL}/article/${article.slug}"
                style="color:#ff6b00;text-decoration:none;font-size:17px;font-weight:700;line-height:1.3;display:block;margin-bottom:4px">
                ${article.title}
              </a>
              <span style="color:#888;font-size:12px">${article.category || 'News'} &bull; ${formatDate(article.publishedDate)}</span>
              <p style="color:#ccc;font-size:14px;line-height:1.5;margin:8px 0 0">${article.excerpt || ''}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0d0d1a;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d1a;padding:20px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="padding:32px 24px;text-align:center">
          <h1 style="margin:0;font-size:28px">
            <span style="color:#ff6b00">Play</span><span style="color:#fff">Big</span><span style="color:#ff9500">Taka</span>
          </h1>
          <p style="color:#888;font-size:14px;margin:8px 0 0">${digestType === 'daily' ? 'Daily' : 'Weekly'} Digest &bull; ${dateStr}</p>
        </td></tr>

        <!-- Intro -->
        <tr><td style="padding:0 24px 24px">
          <p style="color:#fff;font-size:16px;line-height:1.6;margin:0">
            Here's what's new on ${SITE_NAME} ${digestType === 'daily' ? 'today' : 'this week'}. Stay informed with the latest gaming news, tips, and strategies.
          </p>
        </td></tr>

        <!-- Articles -->
        <tr><td style="padding:0 24px">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${articleCards}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:32px 24px;text-align:center">
          <a href="${SITE_URL}" style="
            display:inline-block;padding:14px 32px;
            background:#ff6b00;color:#fff;text-decoration:none;
            border-radius:8px;font-size:16px;font-weight:700;
          ">Read More on ${SITE_NAME}</a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px;border-top:1px solid #1a1a2e;text-align:center">
          <p style="color:#666;font-size:12px;margin:0;line-height:1.6">
            You're receiving this because you subscribed to ${SITE_NAME}.<br/>
            <a href="${SITE_URL}/unsubscribe" style="color:#ff6b00;text-decoration:underline">Unsubscribe</a>
            &bull;
            <a href="${SITE_URL}" style="color:#ff6b00;text-decoration:underline">Visit Website</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Gets articles published in the last N days.
 * @param {number} days
 * @returns {Promise<Object[]>}
 */
export async function getRecentArticles(days = 1) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const results = await wixData.query('Articles')
    .eq('status', 'published')
    .ge('publishedDate', since)
    .descending('publishedDate')
    .limit(20)
    .find();

  return results.items;
}

/**
 * Gets all active subscriber emails.
 * @returns {Promise<Object[]>}
 */
export async function getActiveSubscribers() {
  const allSubscribers = [];
  let skip = 0;
  let hasMore = true;

  while (hasMore) {
    const results = await wixData.query('Subscribers')
      .eq('active', true)
      .skip(skip)
      .limit(100)
      .find();

    allSubscribers.push(...results.items);
    skip += 100;
    hasMore = results.items.length === 100;
  }

  return allSubscribers;
}

/**
 * Logs a newsletter send event.
 * @param {string} digestType
 * @param {number} articleCount
 * @param {number} subscriberCount
 */
export async function logNewsletterSend(digestType, articleCount, subscriberCount) {
  await wixData.insert('NewsletterLogs', {
    digestType,
    articleCount,
    subscriberCount,
    sentAt: new Date()
  });
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
