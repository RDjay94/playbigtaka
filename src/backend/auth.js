// auth.js — User authentication and member area helpers for PlayBigTaka
// Uses Wix Members API for authentication and member management.
// Docs: https://www.wix.com/velo/reference/wix-members-backend

import { authentication, authorization } from 'wix-members-backend';
import wixData from 'wix-data';

/**
 * Registers a new member with email and password.
 * @param {string} email
 * @param {string} password
 * @param {Object} contactInfo — { firstName, lastName }
 * @returns {Promise<Object>} — { success, member?, error? }
 */
export async function registerMember(email, password, contactInfo = {}) {
  try {
    const registration = await authentication.register(email, password, {
      contactInfo: {
        firstName: contactInfo.firstName || '',
        lastName: contactInfo.lastName || ''
      }
    });

    // Create member profile in custom collection for extra data
    await wixData.insert('MemberProfiles', {
      memberId: registration.member._id,
      email,
      displayName: `${contactInfo.firstName || ''} ${contactInfo.lastName || ''}`.trim(),
      joinedAt: new Date(),
      favoriteGames: [],
      level: 'starter'
    });

    return {
      success: true,
      member: registration.member,
      status: registration.status
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Gets the current member's profile data from the custom collection.
 * @param {string} memberId
 * @returns {Promise<Object|null>}
 */
export async function getMemberProfile(memberId) {
  try {
    const results = await wixData.query('MemberProfiles')
      .eq('memberId', memberId)
      .find();
    return results.items.length > 0 ? results.items[0] : null;
  } catch (err) {
    return null;
  }
}

/**
 * Updates a member's favorite games list.
 * @param {string} memberId
 * @param {string[]} games — Array of game names
 */
export async function updateFavoriteGames(memberId, games) {
  try {
    const profile = await getMemberProfile(memberId);
    if (!profile) return { success: false, error: 'Profile not found' };

    profile.favoriteGames = games;
    await wixData.update('MemberProfiles', profile);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Checks if the current user has a specific role.
 * Useful for gating premium content or admin features.
 * @param {string} memberId
 * @param {string} roleId — The Wix role ID to check
 * @returns {Promise<boolean>}
 */
export async function hasRole(memberId, roleId) {
  try {
    const roles = await authorization.getMemberRoles(memberId);
    return roles.some(role => role._id === roleId);
  } catch (err) {
    return false;
  }
}
