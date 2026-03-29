// notFound.js — Custom 404 error page HTML embed for PlayBigTaka
// Add to a custom 404 page in Wix, or use in a router for unmatched routes.
// Paste this into an HTML embed component with ID #notFoundEmbed.

export const notFoundHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    background:#0d0d1a;
    font-family:Arial,Helvetica,sans-serif;
    display:flex;align-items:center;justify-content:center;
    min-height:100vh;color:#fff;overflow:hidden;
  }
  .container{text-align:center;padding:40px 24px;max-width:600px}
  .error-code{
    font-size:clamp(80px,15vw,150px);font-weight:900;
    background:linear-gradient(135deg,#ff6b00,#ff9500,#ffb347);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
    line-height:1;margin-bottom:16px;
    animation:float 3s ease-in-out infinite;
  }
  @keyframes float{
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-10px)}
  }
  .title{font-size:24px;margin-bottom:12px;color:#fff}
  .subtitle{font-size:16px;color:#b0b0c0;margin-bottom:32px;line-height:1.5}
  .actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn{
    display:inline-flex;align-items:center;gap:8px;
    padding:14px 28px;border-radius:10px;
    font-size:15px;font-weight:600;text-decoration:none;
    cursor:pointer;transition:transform .2s,box-shadow .2s;
    border:none;
  }
  .btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.3)}
  .btn-primary{background:#ff6b00;color:#fff}
  .btn-secondary{background:#1a1a2e;color:#fff;border:1px solid #2a2a4a}
  .game-cards{
    display:flex;gap:12px;justify-content:center;flex-wrap:wrap;
    margin-top:40px;
  }
  .game-card{
    background:#16213e;border-radius:10px;padding:14px 20px;
    font-size:13px;color:#b0b0c0;cursor:pointer;
    transition:background .2s,color .2s;text-decoration:none;
  }
  .game-card:hover{background:#ff6b00;color:#fff}
  .particles{
    position:fixed;top:0;left:0;width:100%;height:100%;
    pointer-events:none;z-index:0;
  }
  .particle{
    position:absolute;border-radius:50%;
    background:rgba(255,107,0,.15);
    animation:drift linear infinite;
  }
  @keyframes drift{
    0%{transform:translateY(100vh) rotate(0);opacity:0}
    10%{opacity:1}
    90%{opacity:1}
    100%{transform:translateY(-20vh) rotate(360deg);opacity:0}
  }
  .container{position:relative;z-index:1}
</style>

<div class="particles" id="particles"></div>

<div class="container">
  <div class="error-code">404</div>
  <h1 class="title">Oops! Page Not Found</h1>
  <p class="subtitle">
    Looks like this page went all-in and lost. Don't worry — there's plenty more to explore on PlayBigTaka.
  </p>
  <div class="actions">
    <a class="btn btn-primary" id="homeBtn">Back to Home</a>
    <a class="btn btn-secondary" id="gamesBtn">Browse Games</a>
  </div>
  <div class="game-cards">
    <a class="game-card" id="aviatorLink">Aviator</a>
    <a class="game-card" id="crazyLink">Crazy Time</a>
    <a class="game-card" id="funkyLink">Funky Time</a>
    <a class="game-card" id="superLink">Super Ace</a>
    <a class="game-card" id="moneyLink">Money Coming</a>
  </div>
</div>

<script>
// Floating particles
var container=document.getElementById('particles');
for(var i=0;i<15;i++){
  var p=document.createElement('div');
  p.className='particle';
  var size=Math.random()*8+4;
  p.style.width=size+'px';
  p.style.height=size+'px';
  p.style.left=Math.random()*100+'%';
  p.style.animationDuration=(Math.random()*8+6)+'s';
  p.style.animationDelay=Math.random()*5+'s';
  container.appendChild(p);
}

// Navigation via postMessage
function nav(page){window.parent.postMessage({type:'navigate',page:page},'*')}
document.getElementById('homeBtn').onclick=function(){nav('/')};
document.getElementById('gamesBtn').onclick=function(){nav('/')};
document.getElementById('aviatorLink').onclick=function(){nav('/aviator')};
document.getElementById('crazyLink').onclick=function(){nav('/crazy-time')};
document.getElementById('funkyLink').onclick=function(){nav('/funky-time')};
document.getElementById('superLink').onclick=function(){nav('/super-ace')};
document.getElementById('moneyLink').onclick=function(){nav('/money-coming')};
</script>`;
