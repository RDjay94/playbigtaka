// siteUtils.js — Shared utility functions for the PlayBigTaka site

/**
 * Sets up scroll-based fade-in animations on elements.
 * Call with an array of $w element selectors that should animate in.
 * Elements must have their initial opacity set to 0 in the editor.
 */
export function initFadeInAnimations(selectors) {
  selectors.forEach((selector) => {
    try {
      const el = $w(selector);
      el.onViewportEnter(() => {
        el.show('fade', { duration: 600 });
      });
    } catch (_) {
      // Element may not exist on every page — skip silently
    }
  });
}

/**
 * Sets up lazy-loading behaviour for Wix image elements.
 * Images are hidden initially and shown with a fade when they enter the viewport.
 * @param {string[]} imageSelectors - Array of $w image selectors e.g. ['#image1','#image2']
 */
export function initLazyImages(imageSelectors) {
  imageSelectors.forEach((selector) => {
    try {
      const img = $w(selector);
      img.hide();
      img.onViewportEnter(() => {
        img.show('fade', { duration: 400 });
      });
    } catch (_) {
      // Image may not exist — skip
    }
  });
}

/**
 * Configures search on a repeater with a text input and clear button.
 * Preserves the original dataset so clearing restores the full list.
 *
 * @param {Object} opts
 * @param {string} opts.inputId       - Selector for the search input, e.g. '#searchInput'
 * @param {string} opts.clearBtnId    - Selector for the clear/X button, e.g. '#clearSearch'
 * @param {string} opts.datasetId     - Selector for the Wix dataset, e.g. '#dataset1'
 * @param {string} opts.filterField   - The collection field to filter on, e.g. 'title'
 * @param {string} opts.repeaterId    - Selector for the repeater, e.g. '#repeater1'
 */
export function initSearch({ inputId, clearBtnId, datasetId, filterField, repeaterId }) {
  const input = $w(inputId);
  const clearBtn = $w(clearBtnId);
  const dataset = $w(datasetId);

  // Initially hide the clear button
  clearBtn.hide();

  input.onInput((event) => {
    const query = event.target.value.trim();
    if (query.length > 0) {
      clearBtn.show('fade', { duration: 200 });
      dataset.setFilter(
        wixData.filter().contains(filterField, query)
      );
    } else {
      clearBtn.hide('fade', { duration: 200 });
      dataset.setFilter(wixData.filter()); // reset — shows all items
    }
  });

  clearBtn.onClick(() => {
    input.value = '';
    clearBtn.hide('fade', { duration: 200 });
    dataset.setFilter(wixData.filter()); // restore original data
  });
}

/**
 * Fixes alt tags on image elements by setting descriptive alt text.
 * @param {Object[]} imageAlts - Array of { selector, alt } objects
 */
export function fixImageAlts(imageAlts) {
  imageAlts.forEach(({ selector, alt }) => {
    try {
      $w(selector).alt = alt;
    } catch (_) {
      // Image may not exist on this page
    }
  });
}

/**
 * Makes text that contains "BigTaka" or "PlayBigTaka" into clickable links.
 * Works with Wix rich-text elements by updating their HTML content.
 * @param {string[]} textSelectors - Array of $w text element selectors
 * @param {string} linkUrl - The URL to link to (default: playbigtaka.com)
 */
export function addBigTakaLinks(textSelectors, linkUrl = 'https://www.playbigtaka.com') {
  const pattern = /(PlayBigTaka|BigTaka|Play Big Taka)/gi;
  textSelectors.forEach((selector) => {
    try {
      const el = $w(selector);
      if (el.html) {
        el.html = el.html.replace(pattern, (match) =>
          `<a href="${linkUrl}" target="_blank" style="color:#ff6b00;text-decoration:underline;font-weight:600">${match}</a>`
        );
      }
    } catch (_) {
      // Element may not exist — skip
    }
  });
}
