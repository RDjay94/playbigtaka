// scheduledJobs.js — Scheduled recurring jobs for PlayBigTaka newsletter
// Configured in jobs.config.

import wixData from 'wix-data';
import { getRecentArticles, getActiveSubscribers, generateDigestHTML, logNewsletterSend } from 'backend/newsletter.js';

/**
 * Runs daily at 9 AM: Generates and logs daily digest.
 * Connect to an email provider (SendGrid, Mailchimp, Wix Triggered Emails)
 * to actually deliver the emails.
 */
export async function sendDailyDigest() {
  try {
    const articles = await getRecentArticles(1);
    if (articles.length === 0) {
      console.log('Daily digest: No new articles today. Skipping.');
      return;
    }

    const subscribers = await getActiveSubscribers();
    const html = generateDigestHTML(articles, 'daily');

    // TODO: Integrate with email service to send actual emails.
    // Example with SendGrid:
    //   import sgMail from '@sendgrid/mail';
    //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //   for (const sub of subscribers) {
    //     await sgMail.send({ to: sub.email, from: 'news@playbigtaka.com', subject, html });
    //   }

    await logNewsletterSend('daily', articles.length, subscribers.length);
    console.log(`Daily digest: ${articles.length} articles prepared for ${subscribers.length} subscribers.`);
  } catch (err) {
    console.error('Daily digest failed:', err.message);
  }
}

/**
 * Runs weekly (Monday 9 AM): Generates weekly digest with top articles.
 */
export async function sendWeeklyDigest() {
  try {
    const articles = await getRecentArticles(7);
    if (articles.length === 0) {
      console.log('Weekly digest: No articles this week. Skipping.');
      return;
    }

    const subscribers = await getActiveSubscribers();
    const html = generateDigestHTML(articles, 'weekly');

    await logNewsletterSend('weekly', articles.length, subscribers.length);
    console.log(`Weekly digest: ${articles.length} articles prepared for ${subscribers.length} subscribers.`);
  } catch (err) {
    console.error('Weekly digest failed:', err.message);
  }
}

/**
 * Runs daily at midnight: Updates site statistics snapshot.
 */
export async function updateSiteStats() {
  try {
    const [subCount, articleCount, msgCount] = await Promise.all([
      wixData.query('Subscribers').eq('active', true).count(),
      wixData.query('Articles').eq('status', 'published').count(),
      wixData.query('ContactMessages').eq('status', 'new').count()
    ]);

    await wixData.insert('SiteStats', {
      type: 'dailySnapshot',
      activeSubscribers: subCount,
      totalArticles: articleCount,
      pendingMessages: msgCount,
      timestamp: new Date()
    });

    console.log(`Daily stats: ${subCount} subs, ${articleCount} articles, ${msgCount} msgs.`);
  } catch (err) {
    console.error('Stats job failed:', err.message);
  }
}

/**
 * Runs weekly (Sunday 3 AM): Cleans up old contact messages and logs.
 */
export async function cleanupOldData() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);

  try {
    const oldMessages = await wixData.query('ContactMessages')
      .lt('submittedAt', cutoff)
      .limit(100)
      .find();

    const oldLogs = await wixData.query('NewsletterLogs')
      .lt('sentAt', cutoff)
      .limit(100)
      .find();

    const deletes = [
      ...oldMessages.items.map(i => wixData.remove('ContactMessages', i._id)),
      ...oldLogs.items.map(i => wixData.remove('NewsletterLogs', i._id))
    ];

    await Promise.all(deletes);
    console.log(`Cleanup: Removed ${oldMessages.items.length} messages, ${oldLogs.items.length} logs.`);
  } catch (err) {
    console.error('Cleanup failed:', err.message);
  }
}
