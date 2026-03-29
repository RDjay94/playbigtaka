// contactForm.js — Contact form HTML embed for PlayBigTaka
// Sends { type: 'contactSubmit', name, email, message } via postMessage.

export const contactFormHTML = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:transparent;font-family:Arial,Helvetica,sans-serif}
  .contact-wrap{
    background:linear-gradient(135deg,#1a1a2e,#16213e);
    border-radius:16px;padding:40px 28px;
    color:#fff;max-width:560px;margin:0 auto;
  }
  .contact-wrap h2{font-size:24px;margin-bottom:6px;text-align:center}
  .contact-wrap .sub{font-size:14px;color:#b0b0c0;text-align:center;margin-bottom:24px}
  .form-group{margin-bottom:16px}
  .form-group label{display:block;font-size:13px;color:#b0b0c0;margin-bottom:4px}
  .form-group input,.form-group textarea{
    width:100%;padding:12px 14px;border-radius:8px;border:1px solid #2a2a4a;
    background:#0d0d1a;color:#fff;font-size:14px;outline:none;
    transition:border-color .2s;
  }
  .form-group input:focus,.form-group textarea:focus{border-color:#ff6b00}
  .form-group textarea{resize:vertical;min-height:100px}
  .submit-btn{
    width:100%;padding:14px;border-radius:8px;border:none;
    background:#ff6b00;color:#fff;font-size:16px;font-weight:700;
    cursor:pointer;transition:background .2s;
  }
  .submit-btn:hover{background:#e65c00}
  .submit-btn:disabled{opacity:.6;cursor:not-allowed}
  .msg{margin-top:12px;text-align:center;font-size:14px;display:none}
  .msg.ok{color:#4caf50;display:block}
  .msg.err{color:#ff5252;display:block}
</style>
<div class="contact-wrap">
  <h2>Get in Touch</h2>
  <p class="sub">Have a question or feedback? We'd love to hear from you.</p>
  <form id="contactForm">
    <div class="form-group">
      <label for="cName">Name</label>
      <input type="text" id="cName" placeholder="Your name" required/>
    </div>
    <div class="form-group">
      <label for="cEmail">Email</label>
      <input type="email" id="cEmail" placeholder="you@example.com" required/>
    </div>
    <div class="form-group">
      <label for="cMsg">Message</label>
      <textarea id="cMsg" placeholder="How can we help?" required></textarea>
    </div>
    <button type="submit" class="submit-btn" id="submitBtn">Send Message</button>
    <div id="formMsg" class="msg"></div>
  </form>
</div>
<script>
document.getElementById('contactForm').onsubmit=function(e){
  e.preventDefault();
  var btn=document.getElementById('submitBtn');
  btn.disabled=true;btn.textContent='Sending...';
  var data={
    type:'contactSubmit',
    name:document.getElementById('cName').value,
    email:document.getElementById('cEmail').value,
    message:document.getElementById('cMsg').value
  };
  window.parent.postMessage(data,'*');
};
window.onmessage=function(e){
  if(e.data&&e.data.type==='contactResult'){
    var msg=document.getElementById('formMsg');
    var btn=document.getElementById('submitBtn');
    msg.className='msg '+(e.data.success?'ok':'err');
    msg.textContent=e.data.message;
    btn.disabled=false;btn.textContent='Send Message';
    if(e.data.success){document.getElementById('contactForm').reset()}
  }
};
</script>`;
