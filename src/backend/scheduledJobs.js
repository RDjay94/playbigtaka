// scheduledJobs.js — Scheduled recurring jobs for PlayBigTaka
// Configured in jobs.config. Docs: https://www.wix.com/velo/reference/wix-data

import wixData from 'wix-data';

/**
 * Runs weekly (Sunday 3 AM): Cleans up contact messages older than 90 days.
 */
export async function cleanupOldMessages() {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90);

  try {
    const results = await wixData.query('ContactMessages')
      .lt('submittedAt', cutoffDate)
      .limit(100)
      .find();

    const deletePromises = results.items.map(item =>
      wixData.remove('ContactMessages', item._id)
    );
    await Promise.all(deletePromises);

    console.log(`Cleanup: Removed ${results.items.length} old contact messages.`);
  } catch (err) {
    console.error('Cleanup job failed:', err.message);
  }
}

/**
 * Runs weekly (Monday 9 AM): Logs subscriber count for weekly digest.
 * Connect to an email provider (SendGrid, Mailchimp, etc.) for actual sending.
 */
export async function sendWeeklyDigest() {
  try {
    const subscribers = await wixData.query('Subscribers')
      .eq('active', true)
      .count();

    // TODO: Integrate with email service to send actual digest
    // Example with Wix Triggered Emails:
    //   import { emailContact } from 'wix-crm-backend';
    //   await emailContact('weeklyDigest', contactId, { variables: { ... } });

    console.log(`Weekly digest: ${subscribers} active subscribers.`);

    // Log the digest run
    await wixData.insert('SiteStats', {
      type: 'weeklyDigest',
      subscriberCount: subscribers,
      timestamp: new Date()
    });
  } catch (err) {
    console.error('Weekly digest job failed:', err.message);
  }
}

/**
 * Runs daily (midnight): Updates aggregate site statistics.
 */
export async function updateSiteStats() {
  try {
    const [subscribers, messages, members] = await Promise.all([
      wixData.query('Subscribers').eq('active', true).count(),
      wixData.query('ContactMessages').eq('status', 'new').count(),
      wixData.query('MemberProfiles').count()
    ]);

    await wixData.insert('SiteStats', {
      type: 'dailySnapshot',
      activeSubscribers: subscribers,
      pendingMessages: messages,
      totalMembers: members,
      timestamp: new Date()
    });

    console.log(`Daily stats: ${subscribers} subs, ${messages} msgs, ${members} members.`);
  } catch (err) {
    console.error('Stats update job failed:', err.message);
  }
}
