// theme.js — Dark/Light mode toggle for PlayBigTaka
// Uses wix-storage to persist the user's preference across sessions.

import { local as storage } from 'wix-storage';

const THEME_KEY = 'bigtaka_theme';

/**
 * HTML for the dark/light mode toggle embed.
 * Paste this into an HTML embed component with ID #themeToggleEmbed.
 * Receives { type: 'theme', mode: 'dark'|'light' } via postMessage.
 * Sends { type: 'toggleTheme' } on click.
 */
export const themeToggleHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:transparent;overflow:hidden;display:flex;align-items:center;justify-content:center;height:100vh}
  .toggle-wrap{
    display:flex;align-items:center;gap:8px;
    cursor:pointer;user-select:none;
  }
  .toggle-track{
    width:50px;height:26px;border-radius:13px;
    background:#333;position:relative;
    transition:background .3s;
  }
  .toggle-track.light{background:#ff9500}
  .toggle-thumb{
    width:22px;height:22px;border-radius:50%;
    background:#fff;position:absolute;top:2px;left:2px;
    transition:left .3s;
  }
  .toggle-track.light .toggle-thumb{left:26px}
  .icon{font-size:18px}
</style>
<div class="toggle-wrap" id="toggle" title="Toggle dark/light mode">
  <span class="icon" id="moonIcon">&#127769;</span>
  <div class="toggle-track" id="track">
    <div class="toggle-thumb"></div>
  </div>
  <span class="icon" id="sunIcon">&#9728;&#65039;</span>
</div>
<script>
var track=document.getElementById('track');
var isLight=false;
document.getElementById('toggle').onclick=function(){
  window.parent.postMessage({type:'toggleTheme'},'*');
};
window.onmessage=function(e){
  if(e.data&&e.data.type==='theme'){
    isLight=e.data.mode==='light';
    track.className=isLight?'toggle-track light':'toggle-track';
  }
};
</script>`;

/**
 * CSS variables for dark and light themes.
 * Apply these to page elements via Velo code.
 */
export const THEMES = {
  dark: {
    bgPrimary: '#0d0d1a',
    bgSecondary: '#1a1a2e',
    bgCard: '#16213e',
    textPrimary: '#ffffff',
    textSecondary: '#b0b0c0',
    accent: '#ff6b00',
    accentHover: '#ff9500',
    border: '#2a2a4a'
  },
  light: {
    bgPrimary: '#f5f5f7',
    bgSecondary: '#ffffff',
    bgCard: '#ffffff',
    textPrimary: '#1a1a2e',
    textSecondary: '#555555',
    accent: '#ff6b00',
    accentHover: '#e65c00',
    border: '#e0e0e0'
  }
};

/**
 * Gets the current saved theme preference.
 * @returns {'dark'|'light'}
 */
export function getTheme() {
  return storage.getItem(THEME_KEY) || 'dark';
}

/**
 * Saves and returns the toggled theme.
 * @returns {'dark'|'light'}
 */
export function toggleTheme() {
  const current = getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  storage.setItem(THEME_KEY, next);
  return next;
}

/**
 * Applies theme colors to common page elements.
 * @param {'dark'|'light'} mode
 * @param {Object} elementMap — mapping of theme properties to $w selectors
 *   e.g. { bgPrimary: ['#section1','#page1'], textPrimary: ['#text1'] }
 */
export function applyTheme(mode, elementMap) {
  const colors = THEMES[mode];
  Object.entries(elementMap).forEach(([prop, selectors]) => {
    const color = colors[prop];
    if (!color) return;
    selectors.forEach((sel) => {
      try {
        const el = $w(sel);
        if (prop.startsWith('bg')) {
          el.style.backgroundColor = color;
        } else if (prop.startsWith('text')) {
          el.style.color = color;
        }
      } catch (_) {}
    });
  });
}
