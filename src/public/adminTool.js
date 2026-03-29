// adminTool.js — Admin article publisher embed for site owner
// Add an HTML embed with ID #adminToolEmbed on a hidden/private admin page.
// Sends articles to Velo for saving. Only usable by site owner.

export const adminToolHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#fff;padding:24px}
h1{font-size:24px;margin-bottom:4px}
h1 span{color:#ff6b00}
.subtitle{color:#6b7280;font-size:14px;margin-bottom:24px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-group{display:flex;flex-direction:column;gap:4px}
.form-group.full{grid-column:1/-1}
label{font-size:13px;color:#9ca3af;font-weight:600}
input,select,textarea{
  padding:12px 14px;border-radius:8px;border:1px solid #2a2a4a;
  background:#16213e;color:#fff;font-size:14px;outline:none;
  transition:border-color .2s;font-family:inherit;
}
input:focus,select:focus,textarea:focus{border-color:#ff6b00}
textarea{resize:vertical;min-height:200px}
select{cursor:pointer}
.checkbox-group{display:flex;align-items:center;gap:8px}
.checkbox-group input[type=checkbox]{width:18px;height:18px;accent-color:#ff6b00}
.actions{display:flex;gap:12px;margin-top:20px}
.btn{padding:14px 28px;border-radius:8px;border:none;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s}
.btn-publish{background:#ff6b00;color:#fff}
.btn-publish:hover{background:#e65c00}
.btn-draft{background:#1a1a2e;color:#9ca3af;border:1px solid #2a2a4a}
.btn-draft:hover{border-color:#ff6b00;color:#ff6b00}
.btn-setup{background:#16213e;color:#4caf50;border:1px solid #2a4a2a}
.btn-setup:hover{background:#1a2e1a}
.msg{margin-top:16px;padding:12px 16px;border-radius:8px;font-size:14px;display:none}
.msg.ok{display:block;background:rgba(76,175,80,.1);color:#4caf50;border:1px solid rgba(76,175,80,.2)}
.msg.err{display:block;background:rgba(255,82,82,.1);color:#ff5252;border:1px solid rgba(255,82,82,.2)}
.divider{grid-column:1/-1;border-top:1px solid #1a1a2e;margin:8px 0}
.tag-input{display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:8px;border:1px solid #2a2a4a;border-radius:8px;background:#16213e;min-height:44px}
.tag{display:inline-flex;align-items:center;gap:4px;background:rgba(255,107,0,.15);color:#ff6b00;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600}
.tag button{background:none;border:none;color:#ff6b00;cursor:pointer;font-size:14px}
.tag-field{flex:1;border:none;background:transparent;color:#fff;outline:none;font-size:14px;min-width:100px}
.preview-bar{display:flex;gap:12px;margin-top:16px;align-items:center}
.preview-bar span{color:#6b7280;font-size:13px}
.counter{color:#ff6b00;font-weight:700}
</style>

<h1><span>PlayBigTaka</span> Article Publisher</h1>
<p class="subtitle">Create and publish articles directly to your newsletter site.</p>

<div class="form-grid">
  <div class="form-group full">
    <label>Title</label>
    <input type="text" id="title" placeholder="Article title..." oninput="updateSlug()"/>
  </div>

  <div class="form-group full">
    <label>URL Slug</label>
    <input type="text" id="slug" placeholder="auto-generated-from-title"/>
  </div>

  <div class="form-group">
    <label>Category</label>
    <select id="category">
      <option value="Crash Games" data-slug="crash-games">Crash Games</option>
      <option value="Live Casino" data-slug="live-casino">Live Casino</option>
      <option value="Slots" data-slug="slots">Slots</option>
      <option value="Tips &amp; Strategy" data-slug="tips-strategy">Tips & Strategy</option>
      <option value="News" data-slug="news">News</option>
      <option value="Reviews" data-slug="reviews">Reviews</option>
    </select>
  </div>

  <div class="form-group">
    <label>Author</label>
    <input type="text" id="author" value="BigTaka Team"/>
  </div>

  <div class="form-group full">
    <label>Cover Image URL</label>
    <input type="url" id="coverImage" placeholder="https://static.wixstatic.com/media/..."/>
  </div>

  <div class="form-group full">
    <label>Excerpt (short summary for cards & SEO)</label>
    <textarea id="excerpt" rows="3" placeholder="Write a 1-2 sentence summary..." oninput="updateCounters()"></textarea>
  </div>

  <div class="form-group full">
    <label>Content (HTML)</label>
    <textarea id="content" rows="12" placeholder="<h2>Section Title</h2><p>Your article content...</p>" oninput="updateCounters()"></textarea>
  </div>

  <div class="form-group full">
    <label>Tags (press Enter to add)</label>
    <div class="tag-input" id="tagInput">
      <input class="tag-field" id="tagField" placeholder="Add a tag..." onkeydown="addTag(event)"/>
    </div>
  </div>

  <div class="form-group">
    <div class="checkbox-group">
      <input type="checkbox" id="featured"/>
      <label for="featured">Featured (shows in hero section)</label>
    </div>
  </div>

  <div class="preview-bar">
    <span>Excerpt: <span class="counter" id="excerptCount">0</span>/160 chars</span>
    <span>Content: <span class="counter" id="contentCount">0</span> chars</span>
  </div>
</div>

<div class="actions">
  <button class="btn btn-publish" onclick="publish('published')">Publish Now</button>
  <button class="btn btn-draft" onclick="publish('draft')">Save as Draft</button>
  <button class="btn btn-setup" onclick="runSetup()">Run Initial Setup</button>
</div>

<div class="msg" id="msg"></div>

<script>
var tags=[];

function updateSlug(){
  var title=document.getElementById('title').value;
  document.getElementById('slug').value=title.toLowerCase()
    .replace(/[^a-z0-9\\s-]/g,'').replace(/\\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');
}

function updateCounters(){
  document.getElementById('excerptCount').textContent=document.getElementById('excerpt').value.length;
  document.getElementById('contentCount').textContent=document.getElementById('content').value.length;
}

function addTag(e){
  if(e.key!=='Enter')return;
  e.preventDefault();
  var field=document.getElementById('tagField');
  var tag=field.value.trim().toLowerCase();
  if(!tag||tags.includes(tag))return;
  tags.push(tag);
  renderTags();
  field.value='';
}

function removeTag(t){tags=tags.filter(function(x){return x!==t});renderTags()}

function renderTags(){
  var container=document.getElementById('tagInput');
  container.querySelectorAll('.tag').forEach(function(el){el.remove()});
  var field=document.getElementById('tagField');
  tags.forEach(function(t){
    var span=document.createElement('span');
    span.className='tag';
    span.innerHTML=t+'<button onclick="removeTag(\''+t+'\')">&times;</button>';
    container.insertBefore(span,field);
  });
}

function publish(status){
  var cat=document.getElementById('category');
  var catSlug=cat.options[cat.selectedIndex].getAttribute('data-slug');
  var data={
    type:'publishArticle',
    article:{
      title:document.getElementById('title').value,
      slug:document.getElementById('slug').value,
      excerpt:document.getElementById('excerpt').value,
      content:document.getElementById('content').value,
      coverImage:document.getElementById('coverImage').value,
      category:cat.value,
      categorySlug:catSlug,
      tags:tags,
      author:document.getElementById('author').value,
      featured:document.getElementById('featured').checked,
      status:status
    }
  };
  if(!data.article.title||!data.article.slug){
    showMsg('err','Title and slug are required.');return;
  }
  window.parent.postMessage(data,'*');
  showMsg('ok','Publishing...');
}

function runSetup(){
  window.parent.postMessage({type:'runSetup'},'*');
  showMsg('ok','Running setup...');
}

function showMsg(cls,text){
  var msg=document.getElementById('msg');
  msg.className='msg '+cls;
  msg.textContent=text;
}

window.onmessage=function(e){
  if(!e.data)return;
  if(e.data.type==='publishResult'){
    showMsg(e.data.success?'ok':'err',e.data.message);
    if(e.data.success){
      document.getElementById('title').value='';
      document.getElementById('slug').value='';
      document.getElementById('excerpt').value='';
      document.getElementById('content').value='';
      document.getElementById('coverImage').value='';
      document.getElementById('featured').checked=false;
      tags=[];renderTags();updateCounters();
    }
  }
  if(e.data.type==='setupResult'){
    showMsg(e.data.success?'ok':'err',e.data.message);
  }
};
</script>`;
