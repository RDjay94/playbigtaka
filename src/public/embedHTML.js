// embedHTML.js — HTML strings for Wix HtmlComponent embeds
// Usage: Import these in page/masterPage code, then paste the HTML into
// the corresponding HTML embed components in the Wix Editor.

/**
 * Reading progress bar — fixed to the top of the viewport.
 * Receives { type: 'scroll', percent: Number } via postMessage.
 */
export const progressBarHTML = `
<div id="bar" style="
  position:fixed;top:0;left:0;height:4px;width:0%;
  background:linear-gradient(90deg,#ff6b00,#ff9500);
  z-index:99999;border-radius:0 2px 2px 0;
  transition:width .15s ease-out;
"></div>
<script>
window.onmessage=function(e){
  if(e.data&&e.data.type==='scroll'){
    document.getElementById('bar').style.width=e.data.percent+'%';
  }
};
</script>`;

/**
 * Back-to-top floating button.
 * Receives { type: 'scrollY', y: Number } — shows when y > 400.
 * Sends { type: 'backToTop' } on click.
 */
export const backToTopHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:transparent;overflow:hidden}
  #btn{
    position:fixed;bottom:30px;right:30px;
    width:48px;height:48px;border-radius:50%;
    background:#ff6b00;color:#fff;border:none;
    font-size:22px;cursor:pointer;
    display:none;align-items:center;justify-content:center;
    box-shadow:0 4px 12px rgba(0,0,0,.25);
    transition:opacity .3s,transform .3s;
    z-index:99998;
  }
  #btn:hover{transform:scale(1.1)}
</style>
<button id="btn" aria-label="Back to top" title="Back to top">&#8679;</button>
<script>
var btn=document.getElementById('btn');
btn.onclick=function(){window.parent.postMessage({type:'backToTop'},'*')};
window.onmessage=function(e){
  if(e.data&&e.data.type==='scrollY'){
    btn.style.display=e.data.y>400?'flex':'none';
  }
};
</script>`;

/**
 * Share buttons for article pages.
 * Receives { type: 'pageInfo', url: String, title: String } via postMessage.
 * Renders WhatsApp, Facebook, Telegram, Copy Link buttons.
 */
export const shareButtonsHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:transparent;font-family:Arial,Helvetica,sans-serif}
  .share-wrap{display:flex;gap:10px;flex-wrap:wrap;padding:8px 0}
  .share-btn{
    display:inline-flex;align-items:center;gap:6px;
    padding:10px 16px;border-radius:8px;border:none;
    color:#fff;font-size:14px;font-weight:600;
    cursor:pointer;text-decoration:none;
    transition:transform .2s,box-shadow .2s;
  }
  .share-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.2)}
  .wa{background:#25D366}
  .fb{background:#1877F2}
  .tg{background:#0088cc}
  .cp{background:#555}
  .copied{background:#ff6b00!important}
  .share-btn svg{width:18px;height:18px;fill:#fff}
</style>
<div class="share-wrap">
  <a id="wa" class="share-btn wa" target="_blank" rel="noopener" aria-label="Share on WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.752-6.278-2.03l-.438-.328-2.848.955.955-2.848-.328-.438A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
    WhatsApp
  </a>
  <a id="fb" class="share-btn fb" target="_blank" rel="noopener" aria-label="Share on Facebook">
    <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    Facebook
  </a>
  <a id="tg" class="share-btn tg" target="_blank" rel="noopener" aria-label="Share on Telegram">
    <svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    Telegram
  </a>
  <button id="cp" class="share-btn cp" aria-label="Copy link">
    <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
    <span id="cpTxt">Copy Link</span>
  </button>
</div>
<script>
var pageUrl='',pageTitle='';
window.onmessage=function(e){
  if(e.data&&e.data.type==='pageInfo'){
    pageUrl=e.data.url;pageTitle=e.data.title;
    document.getElementById('wa').href='https://api.whatsapp.com/send?text='+encodeURIComponent(pageTitle+' '+pageUrl);
    document.getElementById('fb').href='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(pageUrl);
    document.getElementById('tg').href='https://t.me/share/url?url='+encodeURIComponent(pageUrl)+'&text='+encodeURIComponent(pageTitle);
  }
};
document.getElementById('cp').onclick=function(){
  navigator.clipboard.writeText(pageUrl).then(function(){
    var b=document.getElementById('cp'),t=document.getElementById('cpTxt');
    b.classList.add('copied');t.textContent='Copied!';
    setTimeout(function(){b.classList.remove('copied');t.textContent='Copy Link'},2000);
  });
};
</script>`;

/**
 * Newsletter signup CTA section.
 * Sends { type: 'subscribe', email: String } on submit.
 */
export const newsletterHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:transparent;font-family:Arial,Helvetica,sans-serif}
  .nl-wrap{
    background:linear-gradient(135deg,#1a1a2e,#16213e);
    border-radius:16px;padding:40px 24px;text-align:center;
    color:#fff;max-width:600px;margin:0 auto;
  }
  .nl-wrap h2{font-size:24px;margin-bottom:8px}
  .nl-wrap p{font-size:15px;color:#b0b0c0;margin-bottom:20px}
  .nl-form{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
  .nl-form input{
    flex:1;min-width:200px;padding:12px 16px;border-radius:8px;border:none;
    font-size:15px;outline:none;
  }
  .nl-form button{
    padding:12px 28px;border-radius:8px;border:none;
    background:#ff6b00;color:#fff;font-size:15px;font-weight:700;
    cursor:pointer;transition:background .2s;
  }
  .nl-form button:hover{background:#e65c00}
  .nl-msg{margin-top:12px;font-size:14px;display:none}
  .nl-msg.ok{color:#4caf50;display:block}
  .nl-msg.err{color:#ff5252;display:block}
</style>
<div class="nl-wrap">
  <h2>Stay in the Game</h2>
  <p>Get the latest tips, strategies &amp; updates from BigTaka delivered to your inbox.</p>
  <form class="nl-form" id="nlForm">
    <input type="email" id="nlEmail" placeholder="Enter your email" required aria-label="Email address"/>
    <button type="submit">Subscribe</button>
  </form>
  <div id="nlMsg" class="nl-msg"></div>
</div>
<script>
document.getElementById('nlForm').onsubmit=function(e){
  e.preventDefault();
  var email=document.getElementById('nlEmail').value;
  if(!email){return}
  window.parent.postMessage({type:'subscribe',email:email},'*');
  var msg=document.getElementById('nlMsg');
  msg.className='nl-msg ok';
  msg.textContent='Thanks for subscribing!';
  document.getElementById('nlEmail').value='';
};
window.onmessage=function(e){
  if(e.data&&e.data.type==='subscribeResult'){
    var msg=document.getElementById('nlMsg');
    msg.className='nl-msg '+(e.data.success?'ok':'err');
    msg.textContent=e.data.message;
  }
};
</script>`;

/**
 * Social links footer section.
 * Update the href values below to your actual social URLs.
 */
export const socialLinksHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:transparent;font-family:Arial,Helvetica,sans-serif}
  .social-wrap{
    display:flex;gap:16px;justify-content:center;
    align-items:center;padding:12px 0;flex-wrap:wrap;
  }
  .social-link{
    display:inline-flex;align-items:center;justify-content:center;
    width:44px;height:44px;border-radius:50%;
    background:#1a1a2e;transition:transform .2s,background .2s;
    text-decoration:none;
  }
  .social-link:hover{transform:scale(1.15);background:#ff6b00}
  .social-link svg{width:22px;height:22px;fill:#fff}
</style>
<div class="social-wrap">
  <a class="social-link" href="https://www.playbigtaka.com" target="_blank" rel="noopener" aria-label="Website" title="Website">
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
  </a>
  <a class="social-link" href="https://www.instagram.com/playbigtaka" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
    <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  </a>
  <a class="social-link" href="https://www.facebook.com/playbigtaka" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">
    <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  </a>
</div>`;
