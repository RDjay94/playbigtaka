// splashScreen.js — Loading/splash screen animation embed for PlayBigTaka
// Add to masterPage as an HTML embed with ID #splashEmbed.
// Receives { type: 'hideSplash' } to dismiss after page loads.

export const splashScreenHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{overflow:hidden}
  .splash{
    position:fixed;top:0;left:0;width:100vw;height:100vh;
    background:#0d0d1a;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    z-index:999999;
    transition:opacity .6s ease-out;
  }
  .splash.hidden{opacity:0;pointer-events:none}
  .logo-text{
    font-family:Arial,Helvetica,sans-serif;
    font-size:42px;font-weight:900;
    background:linear-gradient(135deg,#ff6b00,#ff9500,#ffb347);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    animation:pulse 1.5s ease-in-out infinite;
  }
  .tagline{
    font-family:Arial,sans-serif;font-size:14px;color:#b0b0c0;
    margin-top:8px;letter-spacing:2px;text-transform:uppercase;
  }
  .loader{
    margin-top:32px;width:48px;height:48px;
    border:4px solid #1a1a2e;border-top:4px solid #ff6b00;
    border-radius:50%;animation:spin 1s linear infinite;
  }
  @keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}
</style>
<div class="splash" id="splash">
  <div class="logo-text">PlayBigTaka</div>
  <div class="tagline">Play Big. Win Bigger.</div>
  <div class="loader"></div>
</div>
<script>
window.onmessage=function(e){
  if(e.data&&e.data.type==='hideSplash'){
    var s=document.getElementById('splash');
    s.classList.add('hidden');
    setTimeout(function(){s.style.display='none'},700);
  }
};
// Auto-hide after 3 seconds as fallback
setTimeout(function(){
  var s=document.getElementById('splash');
  if(s&&!s.classList.contains('hidden')){
    s.classList.add('hidden');
    setTimeout(function(){s.style.display='none'},700);
  }
},3000);
</script>`;
