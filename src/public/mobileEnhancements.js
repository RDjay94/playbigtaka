// mobileEnhancements.js — Mobile responsiveness embed for PlayBigTaka
// Paste into an HTML embed with ID #mobileEnhanceEmbed on the master page.
// This adds responsive utilities and mobile-specific UI tweaks.

export const mobileCSS = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:transparent}

  /* Mobile-first responsive grid helper */
  .bt-grid{display:grid;gap:16px;width:100%}
  .bt-grid-2{grid-template-columns:1fr 1fr}
  .bt-grid-3{grid-template-columns:1fr 1fr 1fr}

  /* Stack on mobile */
  @media(max-width:768px){
    .bt-grid-2,.bt-grid-3{grid-template-columns:1fr}
  }

  /* Mobile-friendly tap targets (min 44x44px) */
  .bt-tap{min-width:44px;min-height:44px;display:inline-flex;align-items:center;justify-content:center}

  /* Responsive text scaling */
  .bt-h1{font-size:clamp(24px,5vw,42px);line-height:1.2}
  .bt-h2{font-size:clamp(20px,4vw,32px);line-height:1.3}
  .bt-body{font-size:clamp(14px,2.5vw,16px);line-height:1.6}

  /* Mobile-friendly spacing */
  .bt-section{padding:clamp(20px,5vw,60px) clamp(16px,4vw,40px)}

  /* Smooth scroll for the whole page */
  html{scroll-behavior:smooth}

  /* Hide horizontal overflow on mobile */
  .bt-no-overflow{overflow-x:hidden}

  /* Mobile-friendly images */
  .bt-img-responsive{width:100%;height:auto;display:block;border-radius:12px}

  /* Mobile hamburger menu helper */
  .bt-mobile-nav{
    position:fixed;top:0;left:-100%;width:80%;max-width:300px;height:100vh;
    background:#0d0d1a;z-index:99990;
    transition:left .3s ease;
    padding:80px 24px 24px;
  }
  .bt-mobile-nav.open{left:0}
  .bt-mobile-overlay{
    position:fixed;top:0;left:0;width:100vw;height:100vh;
    background:rgba(0,0,0,.5);z-index:99989;
    display:none;
  }
  .bt-mobile-overlay.show{display:block}

  /* Bottom safe area for notched phones */
  .bt-safe-bottom{padding-bottom:env(safe-area-inset-bottom,0)}

  /* Touch-friendly card */
  .bt-card{
    background:#16213e;border-radius:12px;padding:20px;
    transition:transform .2s;
  }
  .bt-card:active{transform:scale(0.98)}

  /* Loading skeleton */
  .bt-skeleton{
    background:linear-gradient(90deg,#1a1a2e 25%,#2a2a4a 50%,#1a1a2e 75%);
    background-size:200% 100%;
    animation:shimmer 1.5s infinite;
    border-radius:8px;
  }
  @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
</style>
<script>
// Report viewport size to Velo so it can adapt elements
function reportViewport(){
  window.parent.postMessage({
    type:'viewport',
    width:window.innerWidth,
    height:window.innerHeight,
    isMobile:window.innerWidth<768
  },'*');
}
reportViewport();
window.addEventListener('resize',reportViewport);
</script>`;
