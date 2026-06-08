// ageGateEmbed.js — 18+ age gate HTML for FB ad-safety compliance.
//
// HOW TO USE THIS IN THE WIX EDITOR:
//   1. Open the Wix Editor for playbigtaka.com.
//   2. Edit the Master / Header (so the gate shows on every page).
//   3. Add → Embed Code → "Custom Element" or "HTML iframe".
//   4. Paste the contents of AGE_GATE_HTML below into that embed.
//   5. Pin the embed to the page top with z-index 99999 (the HTML
//      already does fixed-positioning, you just need it loaded on
//      every page).
//   6. Publish the site.
//
// The gate uses sessionStorage so a returning visitor in the same
// session sees the homepage immediately. FB ad reviewers visit
// fresh (no cookies), so they always see the gate — which is the
// compliance signal Facebook looks for on social-casino traffic.
//
// To wire it up VIA CODE instead of the Wix Editor (Advanced):
//   In masterPage.js, find your HTML embed element id and call:
//     $w('#ageGateEmbed').postMessage({ type: 'show' });
//   The iframe self-shows on load; no message is actually required.

export const AGE_GATE_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,sans-serif}
html,body{width:100%;height:100%;background:transparent}
#age-gate{position:fixed;inset:0;z-index:99999;background:rgba(8,2,20,0.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;padding:24px}
#age-gate .ag-card{max-width:460px;width:100%;background:linear-gradient(180deg,#1a0c34 0%,#0d0420 100%);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:30px 26px;text-align:center;color:#fff;box-shadow:0 30px 80px rgba(0,0,0,0.5)}
#age-gate .ag-brand{font-size:22px;font-weight:900;letter-spacing:-0.02em;color:#ffb800;margin-bottom:10px}
#age-gate .ag-eyebrow{font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#ffb800;font-weight:700;margin-bottom:8px}
#age-gate h2{font-size:22px;margin:0 0 12px;font-weight:800;line-height:1.25;color:#fff}
#age-gate p{font-size:14px;line-height:1.6;color:rgba(255,255,255,0.78);margin:0 0 18px}
#age-gate .ag-callout{background:rgba(255,184,0,0.08);border:1px solid rgba(255,184,0,0.22);border-radius:10px;padding:12px 14px;font-size:12.5px;color:rgba(255,255,255,0.85);margin-bottom:22px;text-align:left;line-height:1.55}
#age-gate .ag-btns{display:flex;flex-direction:column;gap:10px}
#age-gate button{font:inherit;font-weight:700;font-size:15px;padding:14px 18px;border-radius:10px;border:0;cursor:pointer;transition:filter 0.15s}
#age-gate .ag-yes{background:linear-gradient(135deg,#a4ff2c,#5fc814);color:#0d0420}
#age-gate .ag-no{background:transparent;color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.15)}
#age-gate button:hover{filter:brightness(1.08)}
#age-gate .ag-fine{font-size:11px;color:rgba(255,255,255,0.45);margin-top:14px;line-height:1.5}
</style>
</head><body>
<div id="age-gate" role="dialog" aria-modal="true">
  <div class="ag-card">
    <div class="ag-brand">PlayBigTaka</div>
    <div class="ag-eyebrow">18+ Entertainment Only</div>
    <h2>Welcome to PlayBigTaka</h2>
    <p>A free skill-game guide and strategy hub.</p>
    <div class="ag-callout">
      <strong>This site is for educational content only.</strong><br/>
      No real money, no deposits, no withdrawals. Nothing on this site can be exchanged for cash or any prize of monetary value. Strictly for adults aged 18 or over.
    </div>
    <div class="ag-btns">
      <button class="ag-yes" id="age-gate-yes">I am 18 or older — enter</button>
      <button class="ag-no" id="age-gate-no">I am under 18 — leave site</button>
    </div>
    <div class="ag-fine">By entering, you confirm you understand this is a free content site with no real-money gambling, betting, or prizes of monetary value.</div>
  </div>
</div>
<script>
(function(){
  var KEY='pbt_age_gate_ok_v1';
  var gate=document.getElementById('age-gate');
  // Talk to parent window (top-level Wix page) for sessionStorage.
  function getFlag(){ try { return window.parent && window.parent.sessionStorage.getItem(KEY); } catch(e){ try { return sessionStorage.getItem(KEY); } catch(e2){ return null; } } }
  function setFlag(){ try { window.parent && window.parent.sessionStorage.setItem(KEY,'1'); } catch(e){ try { sessionStorage.setItem(KEY,'1'); } catch(e2){} } }
  function hide(){ gate.style.display='none'; try { window.parent.postMessage({ type:'ageGateClosed' }, '*'); } catch(e){} }
  if (getFlag()==='1') { hide(); return; }
  document.getElementById('age-gate-yes').addEventListener('click', function(){ setFlag(); hide(); });
  document.getElementById('age-gate-no').addEventListener('click', function(){ try { window.parent.location.replace('https://www.google.com/'); } catch(e){ location.replace('https://www.google.com/'); } });
})();
</script>
</body></html>`;

/**
 * Helper for serving the age-gate HTML through an HTTP endpoint if
 * you'd rather host it yourself than paste into the Wix HTML embed.
 *
 * Wire this into src/backend/http-functions.js:
 *
 *   import { ageGateHandler } from 'public/ageGateEmbed.js';
 *   export const get_ageGate = (request) => ageGateHandler();
 *
 * Then in the Wix Editor embed, point the iframe src to:
 *   https://www.playbigtaka.com/_functions/ageGate
 */
export function ageGateHandler() {
  return {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: AGE_GATE_HTML
  };
}
