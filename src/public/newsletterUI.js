// newsletterUI.js — All HTML embed components for the PlayBigTaka newsletter site
// Each export is a complete HTML string to paste into a Wix HtmlComponent embed.

/**
 * Hero section for the homepage.
 * Receives { type: 'featured', articles: [...] } with featured articles.
 * Sends { type: 'openArticle', slug: '...' } on click.
 */
export const heroSectionHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;overflow-x:hidden}
.hero{position:relative;min-height:480px;background:#0d0d1a;border-radius:20px;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#0d0d1a 0%,#1a1a2e 50%,#16213e 100%)}
.hero-glow{position:absolute;top:-50%;right:-20%;width:60%;height:200%;background:radial-gradient(ellipse,rgba(255,107,0,.12) 0%,transparent 70%);pointer-events:none}
.hero-content{position:relative;z-index:2;padding:48px 40px}
.hero-badge{display:inline-block;background:rgba(255,107,0,.15);color:#ff6b00;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px}
.hero-title{font-size:clamp(28px,5vw,48px);font-weight:800;color:#fff;line-height:1.15;margin-bottom:16px;max-width:600px}
.hero-title span{background:linear-gradient(135deg,#ff6b00,#ff9500);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-desc{font-size:clamp(15px,2vw,18px);color:#9ca3af;line-height:1.6;max-width:500px;margin-bottom:32px}
.hero-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:#ff6b00;color:#fff;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;text-decoration:none;transition:all .2s}
.hero-cta:hover{background:#e65c00;transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,107,0,.3)}
.hero-stats{display:flex;gap:32px;margin-top:40px}
.stat{text-align:left}
.stat-num{font-size:24px;font-weight:800;color:#ff6b00}
.stat-label{font-size:13px;color:#6b7280;margin-top:2px}
.featured-strip{display:flex;gap:16px;margin-top:32px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none}
.featured-strip::-webkit-scrollbar{display:none}
.feat-card{flex-shrink:0;width:260px;background:rgba(26,26,46,.8);border:1px solid rgba(255,255,255,.06);border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .2s,border-color .2s}
.feat-card:hover{transform:translateY(-4px);border-color:rgba(255,107,0,.3)}
.feat-img{width:100%;height:140px;object-fit:cover;display:block}
.feat-body{padding:14px}
.feat-cat{font-size:11px;color:#ff6b00;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.feat-title{font-size:15px;font-weight:700;color:#fff;margin-top:6px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.feat-date{font-size:12px;color:#6b7280;margin-top:8px}
@media(max-width:768px){
  .hero-content{padding:32px 20px}
  .hero-stats{gap:20px}
  .feat-card{width:220px}
}
</style>
<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-content">
    <div class="hero-badge">Daily Gaming Newsletter</div>
    <h1 class="hero-title">Your Daily Dose of <span>Gaming Intelligence</span></h1>
    <p class="hero-desc">Get the latest tips, strategies, news, and insider insights from the world of online gaming — delivered fresh every day.</p>
    <button class="hero-cta" id="subscribeCta">Subscribe Free &#8594;</button>
    <div class="hero-stats">
      <div class="stat"><div class="stat-num" id="subCount">1,000+</div><div class="stat-label">Subscribers</div></div>
      <div class="stat"><div class="stat-num" id="articleCount">100+</div><div class="stat-label">Articles</div></div>
      <div class="stat"><div class="stat-num">Daily</div><div class="stat-label">Updates</div></div>
    </div>
    <div class="featured-strip" id="featuredStrip"></div>
  </div>
</div>
<script>
document.getElementById('subscribeCta').onclick=function(){
  window.parent.postMessage({type:'scrollToSubscribe'},'*');
};
window.onmessage=function(e){
  if(!e.data)return;
  if(e.data.type==='featured'){
    var strip=document.getElementById('featuredStrip');
    strip.innerHTML='';
    (e.data.articles||[]).forEach(function(a){
      var card=document.createElement('div');
      card.className='feat-card';
      card.onclick=function(){window.parent.postMessage({type:'openArticle',slug:a.slug},'*')};
      card.innerHTML='<img class="feat-img" src="'+(a.coverImage||'')+'" alt="'+a.title+'"/>'
        +'<div class="feat-body"><div class="feat-cat">'+(a.category||'News')+'</div>'
        +'<div class="feat-title">'+a.title+'</div>'
        +'<div class="feat-date">'+formatDate(a.publishedDate)+'</div></div>';
      strip.appendChild(card);
    });
  }
  if(e.data.type==='stats'){
    if(e.data.subscribers)document.getElementById('subCount').textContent=e.data.subscribers;
    if(e.data.articles)document.getElementById('articleCount').textContent=e.data.articles;
  }
};
function formatDate(d){if(!d)return'';var dt=new Date(d);return dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
</script>`;

/**
 * Article card grid for latest articles on homepage.
 * Receives { type: 'articles', items: [...], hasMore: bool }.
 * Sends { type: 'openArticle', slug }, { type: 'loadMore' }.
 */
export const articleGridHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.section-title{font-size:22px;font-weight:800;color:#fff}
.section-title span{color:#ff6b00}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.card{background:#16213e;border:1px solid rgba(255,255,255,.06);border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s}
.card:hover{transform:translateY(-6px);border-color:rgba(255,107,0,.25);box-shadow:0 12px 32px rgba(0,0,0,.3)}
.card-img{width:100%;height:180px;object-fit:cover;display:block;background:#1a1a2e}
.card-body{padding:18px}
.card-meta{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.card-cat{font-size:11px;color:#ff6b00;font-weight:700;text-transform:uppercase;letter-spacing:.5px;background:rgba(255,107,0,.1);padding:3px 10px;border-radius:12px}
.card-date{font-size:12px;color:#6b7280}
.card-title{font-size:17px;font-weight:700;color:#fff;line-height:1.35;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-excerpt{font-size:14px;color:#9ca3af;line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.card-footer{display:flex;align-items:center;justify-content:space-between;padding:0 18px 16px}
.read-more{font-size:13px;color:#ff6b00;font-weight:600;text-decoration:none}
.views{font-size:12px;color:#6b7280}
.load-more{display:none;margin:32px auto 0;padding:14px 36px;background:transparent;color:#ff6b00;border:2px solid #ff6b00;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s}
.load-more:hover{background:#ff6b00;color:#fff}
.load-more.show{display:block}
.empty{text-align:center;padding:60px 20px;color:#6b7280;font-size:16px}
@media(max-width:640px){.grid{grid-template-columns:1fr}.card-img{height:200px}}
</style>
<div>
  <div class="section-header">
    <h2 class="section-title"><span>Latest</span> Articles</h2>
  </div>
  <div class="grid" id="grid"></div>
  <div class="empty" id="empty" style="display:none">No articles yet. Check back soon!</div>
  <button class="load-more" id="loadMore">Load More Articles</button>
</div>
<script>
var grid=document.getElementById('grid');
var empty=document.getElementById('empty');
var loadBtn=document.getElementById('loadMore');
loadBtn.onclick=function(){window.parent.postMessage({type:'loadMore'},'*')};

window.onmessage=function(e){
  if(!e.data)return;
  if(e.data.type==='articles'){
    var items=e.data.items||[];
    if(items.length===0&&grid.children.length===0){empty.style.display='block';return}
    empty.style.display='none';
    items.forEach(function(a){
      var card=document.createElement('div');
      card.className='card';
      card.onclick=function(){window.parent.postMessage({type:'openArticle',slug:a.slug},'*')};
      card.innerHTML='<img class="card-img" src="'+(a.coverImage||'')+'" alt="'+a.title+'" loading="lazy"/>'
        +'<div class="card-body">'
        +'<div class="card-meta"><span class="card-cat">'+(a.category||'News')+'</span><span class="card-date">'+formatDate(a.publishedDate)+'</span></div>'
        +'<h3 class="card-title">'+a.title+'</h3>'
        +'<p class="card-excerpt">'+(a.excerpt||'')+'</p>'
        +'</div>'
        +'<div class="card-footer"><span class="read-more">Read more &#8594;</span><span class="views">'+(a.views||0)+' views</span></div>';
      grid.appendChild(card);
    });
    loadBtn.className=e.data.hasMore?'load-more show':'load-more';
  }
  if(e.data.type==='clearArticles'){grid.innerHTML='';empty.style.display='none'}
};
function formatDate(d){if(!d)return'';var dt=new Date(d);return dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
</script>`;

/**
 * Category filter bar.
 * Receives { type: 'categories', items: [{name, slug, count}...], active: 'slug' }.
 * Sends { type: 'filterCategory', slug } on click.
 */
export const categoryBarHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.cat-bar{display:flex;gap:8px;overflow-x:auto;padding:4px 0;scrollbar-width:none}
.cat-bar::-webkit-scrollbar{display:none}
.cat-pill{flex-shrink:0;padding:10px 20px;border-radius:24px;border:1px solid #2a2a4a;background:transparent;color:#9ca3af;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap}
.cat-pill:hover{border-color:#ff6b00;color:#ff6b00}
.cat-pill.active{background:#ff6b00;color:#fff;border-color:#ff6b00}
.cat-count{font-size:11px;color:#6b7280;margin-left:4px}
.cat-pill.active .cat-count{color:rgba(255,255,255,.7)}
</style>
<div class="cat-bar" id="catBar"></div>
<script>
window.onmessage=function(e){
  if(!e.data||e.data.type!=='categories')return;
  var bar=document.getElementById('catBar');
  bar.innerHTML='';
  var items=[{name:'All',slug:'all'}].concat(e.data.items||[]);
  var active=e.data.active||'all';
  items.forEach(function(c){
    var pill=document.createElement('button');
    pill.className='cat-pill'+(c.slug===active?' active':'');
    pill.innerHTML=c.name+(c.count?'<span class="cat-count">'+c.count+'</span>':'');
    pill.onclick=function(){
      bar.querySelectorAll('.cat-pill').forEach(function(p){p.classList.remove('active')});
      pill.classList.add('active');
      window.parent.postMessage({type:'filterCategory',slug:c.slug},'*');
    };
    bar.appendChild(pill);
  });
};
</script>`;

/**
 * Inline newsletter subscribe bar (compact version for mid-page or sticky).
 * Sends { type: 'subscribe', email } on submit.
 */
export const subscribeBarHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.sub-bar{background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:16px;padding:32px;text-align:center}
.sub-icon{font-size:40px;margin-bottom:12px}
.sub-title{font-size:22px;font-weight:800;color:#fff;margin-bottom:6px}
.sub-desc{font-size:15px;color:#9ca3af;margin-bottom:20px;line-height:1.5}
.sub-form{display:flex;gap:10px;max-width:460px;margin:0 auto}
.sub-form input{flex:1;padding:14px 18px;border-radius:10px;border:1px solid #2a2a4a;background:#0d0d1a;color:#fff;font-size:15px;outline:none;transition:border-color .2s}
.sub-form input:focus{border-color:#ff6b00}
.sub-form input::placeholder{color:#6b7280}
.sub-form button{padding:14px 24px;border-radius:10px;border:none;background:#ff6b00;color:#fff;font-size:15px;font-weight:700;cursor:pointer;transition:background .2s;white-space:nowrap}
.sub-form button:hover{background:#e65c00}
.sub-msg{margin-top:12px;font-size:14px}
.sub-msg.ok{color:#4caf50}.sub-msg.err{color:#ff5252}
.sub-trust{display:flex;gap:16px;justify-content:center;margin-top:16px;font-size:12px;color:#6b7280}
@media(max-width:480px){.sub-form{flex-direction:column}.sub-form button{width:100%}}
</style>
<div class="sub-bar" id="subBar">
  <div class="sub-icon">&#128233;</div>
  <h2 class="sub-title">Never Miss an Update</h2>
  <p class="sub-desc">Join thousands of gamers. Get daily tips, strategies, and breaking news straight to your inbox.</p>
  <form class="sub-form" id="subForm">
    <input type="email" id="subEmail" placeholder="your@email.com" required aria-label="Email"/>
    <button type="submit">Subscribe</button>
  </form>
  <div class="sub-msg" id="subMsg"></div>
  <div class="sub-trust">
    <span>&#10003; Free forever</span>
    <span>&#10003; No spam</span>
    <span>&#10003; Unsubscribe anytime</span>
  </div>
</div>
<script>
document.getElementById('subForm').onsubmit=function(e){
  e.preventDefault();
  var email=document.getElementById('subEmail').value;
  if(!email)return;
  window.parent.postMessage({type:'subscribe',email:email},'*');
};
window.onmessage=function(e){
  if(!e.data)return;
  if(e.data.type==='subscribeResult'){
    var msg=document.getElementById('subMsg');
    msg.className='sub-msg '+(e.data.success?'ok':'err');
    msg.textContent=e.data.message;
    if(e.data.success)document.getElementById('subEmail').value='';
  }
};
</script>`;

/**
 * Search bar with live results dropdown.
 * Sends { type: 'search', query } on input.
 * Receives { type: 'searchResults', items: [...] }.
 * Sends { type: 'openArticle', slug } on result click.
 */
export const searchBarHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.search-wrap{position:relative;max-width:400px;width:100%}
.search-input{width:100%;padding:12px 44px 12px 16px;border-radius:12px;border:1px solid #2a2a4a;background:#0d0d1a;color:#fff;font-size:15px;outline:none;transition:border-color .2s}
.search-input:focus{border-color:#ff6b00}
.search-input::placeholder{color:#6b7280}
.search-icon{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:#6b7280;font-size:18px;pointer-events:none}
.clear-btn{position:absolute;right:40px;top:50%;transform:translateY(-50%);background:none;border:none;color:#6b7280;font-size:18px;cursor:pointer;display:none}
.clear-btn.show{display:block}
.results{position:absolute;top:calc(100% + 8px);left:0;right:0;background:#16213e;border:1px solid #2a2a4a;border-radius:12px;max-height:320px;overflow-y:auto;z-index:100;display:none;box-shadow:0 12px 32px rgba(0,0,0,.4)}
.results.show{display:block}
.result-item{display:flex;gap:12px;padding:12px 16px;cursor:pointer;transition:background .15s;border-bottom:1px solid rgba(255,255,255,.04)}
.result-item:hover{background:rgba(255,107,0,.08)}
.result-item:last-child{border-bottom:none}
.result-img{width:48px;height:48px;border-radius:8px;object-fit:cover;flex-shrink:0}
.result-info{flex:1;min-width:0}
.result-title{font-size:14px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.result-cat{font-size:11px;color:#ff6b00;margin-top:2px}
.no-results{padding:20px;text-align:center;color:#6b7280;font-size:14px}
</style>
<div class="search-wrap">
  <input class="search-input" id="searchInput" type="text" placeholder="Search articles..." aria-label="Search"/>
  <button class="clear-btn" id="clearBtn" aria-label="Clear search">&times;</button>
  <span class="search-icon">&#128269;</span>
  <div class="results" id="results"></div>
</div>
<script>
var input=document.getElementById('searchInput');
var clearBtn=document.getElementById('clearBtn');
var results=document.getElementById('results');
var debounce;

input.oninput=function(){
  var q=input.value.trim();
  clearBtn.className=q?'clear-btn show':'clear-btn';
  clearTimeout(debounce);
  if(q.length<2){results.className='results';return}
  debounce=setTimeout(function(){
    window.parent.postMessage({type:'search',query:q},'*');
  },300);
};
clearBtn.onclick=function(){input.value='';clearBtn.className='clear-btn';results.className='results'};
input.onblur=function(){setTimeout(function(){results.className='results'},200)};
input.onfocus=function(){if(results.children.length>0)results.className='results show'};

window.onmessage=function(e){
  if(!e.data||e.data.type!=='searchResults')return;
  results.innerHTML='';
  var items=e.data.items||[];
  if(items.length===0){results.innerHTML='<div class="no-results">No articles found</div>';results.className='results show';return}
  items.forEach(function(a){
    var div=document.createElement('div');
    div.className='result-item';
    div.onclick=function(){window.parent.postMessage({type:'openArticle',slug:a.slug},'*')};
    div.innerHTML=(a.coverImage?'<img class="result-img" src="'+a.coverImage+'" alt=""/>':'')
      +'<div class="result-info"><div class="result-title">'+a.title+'</div><div class="result-cat">'+(a.category||'News')+'</div></div>';
    results.appendChild(div);
  });
  results.className='results show';
};
</script>`;

/**
 * Site footer with links, social, and branding.
 */
export const siteFooterHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:transparent;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
.footer{background:#0a0a16;padding:48px 32px 24px;color:#9ca3af}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;max-width:1100px;margin:0 auto}
.footer-brand h3{font-size:22px;font-weight:800;margin-bottom:12px}
.footer-brand h3 .p{color:#ff6b00}.footer-brand h3 .b{color:#fff}.footer-brand h3 .t{color:#ff9500}
.footer-brand p{font-size:14px;line-height:1.6;color:#6b7280;max-width:280px}
.footer-col h4{font-size:14px;font-weight:700;color:#fff;margin-bottom:16px;text-transform:uppercase;letter-spacing:1px}
.footer-col a{display:block;font-size:14px;color:#9ca3af;text-decoration:none;margin-bottom:10px;transition:color .2s}
.footer-col a:hover{color:#ff6b00}
.social-links{display:flex;gap:12px;margin-top:16px}
.social-link{width:36px;height:36px;border-radius:50%;background:#1a1a2e;display:flex;align-items:center;justify-content:center;transition:background .2s}
.social-link:hover{background:#ff6b00}
.social-link svg{width:18px;height:18px;fill:#fff}
.footer-bottom{max-width:1100px;margin:32px auto 0;padding-top:20px;border-top:1px solid #1a1a2e;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.footer-bottom p{font-size:13px;color:#4b5563}
.footer-bottom a{color:#6b7280;text-decoration:none;font-size:13px;transition:color .2s}
.footer-bottom a:hover{color:#ff6b00}
@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr;gap:24px}.footer-bottom{flex-direction:column;text-align:center}}
</style>
<div class="footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <h3><span class="p">Play</span><span class="b">Big</span><span class="t">Taka</span></h3>
      <p>Your daily source for online gaming tips, strategies, and breaking news. Subscribe to stay ahead of the game.</p>
      <div class="social-links">
        <a class="social-link" href="https://www.instagram.com/playbigtaka" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <a class="social-link" href="https://www.facebook.com/playbigtaka" target="_blank" rel="noopener" aria-label="Facebook">
          <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a class="social-link" href="https://www.playbigtaka.com" target="_blank" rel="noopener" aria-label="Website">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Games</h4>
      <a href="/aviator">Aviator</a>
      <a href="/crazy-time">Crazy Time</a>
      <a href="/funky-time">Funky Time</a>
      <a href="/super-ace">Super Ace</a>
      <a href="/money-coming">Money Coming</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="/">Home</a>
      <a href="/about">About Us</a>
      <a href="/contact">Contact</a>
      <a href="/_functions/rss">RSS Feed</a>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/disclaimer">Disclaimer</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 PlayBigTaka. All rights reserved.</p>
    <a href="/_functions/rss">RSS Feed</a>
  </div>
</div>`;
