/**
 * Cloud Hak AI Chatbot Widget
 * Self-contained embeddable widget — add <script src="assets/js/chatbot.js"></script> before </body>
 * Uses Shadow DOM to avoid CSS conflicts with host page
 */
(function () {
  'use strict';

  // Don't double-init
  if (window.__cloudHakBot) return;
  window.__cloudHakBot = true;

  var API = 'https://app.cloud-hak.com/api/demo';
  var WF_ID = 23;
  var sending = false;
  var messages = []; // Client-side message history
  var streamingEl = null;

  // ===== Shadow DOM container =====
  var host = document.createElement('div');
  host.id = 'ch-chatbot-host';
  host.style.cssText = 'position:fixed;z-index:2147483647;top:0;right:0;pointer-events:none;';
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: 'open' });

  root.innerHTML = '\
  <style>\
  * { margin:0; padding:0; box-sizing:border-box; font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }\
  :host { all: initial; }\
  \
  /* ===== FLOAT BUBBLE ===== */\
  .bubble {\
    position:fixed; bottom:24px; right:24px; width:64px; height:64px; border-radius:50%;\
    border:none; cursor:pointer; pointer-events:auto;\
    background: linear-gradient(135deg, #0a1a3a, #1a2a4d);\
    box-shadow: 0 8px 32px rgba(10,26,58,0.3), 0 2px 8px rgba(192,133,82,0.2);\
    display:flex; align-items:center; justify-content:center;\
    transition: transform 0.2s cubic-bezier(.2,.7,.2,1);\
    animation: bubbleIn 0.5s cubic-bezier(.2,.7,.2,1);\
  }\
  .bubble:hover { transform: scale(1.05); }\
  .bubble:active { transform: scale(0.92); }\
  .bubble svg { width:28px; height:28px; }\
  .bubble .badge {\
    position:absolute; top:2px; right:2px; width:18px; height:18px; border-radius:50%;\
    background:#2d8a4a; border:3px solid #0a1a3a;\
    animation: pulse 2s infinite;\
  }\
  .bubble .notif {\
    position:absolute; top:-6px; left:-12px; background:#c08552; color:#fff;\
    font-size:11px; font-weight:700; padding:3px 8px; border-radius:12px;\
    white-space:nowrap; animation: notifIn 0.5s 1s both;\
  }\
  @keyframes bubbleIn { 0%{transform:scale(0);} 60%{transform:scale(1.1);} 100%{transform:scale(1);} }\
  @keyframes notifIn { 0%{opacity:0;transform:translateX(10px);} 100%{opacity:1;transform:translateX(0);} }\
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(0.7);} }\
  \
  .bubble.hidden { display:none; }\
  \
  /* ===== CHAT PANEL ===== */\
  .panel {\
    position:fixed; bottom:0; right:0; width:100vw; height:100vh;\
    background: #fbf9f4; display:none; flex-direction:column;\
    pointer-events:auto; animation: panelUp 0.3s cubic-bezier(.2,.7,.2,1);\
  }\
  @media(min-width:601px){\
    .panel {\
      bottom:24px; right:24px; width:420px; height:640px;\
      max-height:calc(100vh - 48px); border-radius:24px;\
      box-shadow: 0 16px 64px rgba(10,26,58,0.25), 0 4px 16px rgba(0,0,0,0.1);\
      border: 1px solid rgba(10,26,58,0.08);\
      overflow:hidden;\
    }\
  }\
  @keyframes panelUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }\
  .panel.active { display:flex; }\
  \
  /* Header */\
  .header {\
    padding:16px 20px; display:flex; align-items:center; gap:12px;\
    background: #0a1a3a; color:#fff; flex-shrink:0;\
  }\
  .avatar {\
    width:42px; height:42px; border-radius:50%; flex-shrink:0;\
    background: linear-gradient(135deg, #c08552, #d9b97a);\
    display:flex; align-items:center; justify-content:center;\
  }\
  .avatar svg { width:22px; height:22px; }\
  .header-info { flex:1; min-width:0; }\
  .header-info h1 { font-size:16px; font-weight:700; color:#fff; letter-spacing:-0.2px; }\
  .header-info p { font-size:12px; color:rgba(255,255,255,0.6); display:flex; align-items:center; gap:5px; margin-top:2px; }\
  .header-info .dot { width:7px; height:7px; border-radius:50%; background:#2d8a4a; }\
  .close-btn {\
    width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.08);\
    border:none; color:rgba(255,255,255,0.7); cursor:pointer; font-size:20px; flex-shrink:0;\
    display:flex; align-items:center; justify-content:center; transition:all 0.15s;\
  }\
  .close-btn:hover { background:rgba(255,255,255,0.15); color:#fff; }\
  \
  /* Chat area */\
  .chat {\
    flex:1; overflow-y:auto; -webkit-overflow-scrolling:touch;\
    padding:18px 16px; display:flex; flex-direction:column; gap:10px;\
    background: #fbf9f4;\
  }\
  \
  /* Welcome banner */\
  .welcome {\
    text-align:center; padding:8px 12px 16px; border-bottom:1px solid rgba(10,26,58,0.06); margin-bottom:8px;\
  }\
  .welcome .tag {\
    display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600;\
    color:#c08552; background:rgba(192,133,82,0.1); padding:4px 12px; border-radius:16px; margin-bottom:10px;\
  }\
  .welcome .tag .live-dot { width:7px; height:7px; border-radius:50%; background:#2d8a4a; animation:pulse 2s infinite; }\
  .welcome h2 { font-size:18px; font-weight:700; color:#0a1a3a; font-family:"Fraunces",Georgia,serif; margin-bottom:4px; }\
  .welcome p { font-size:13px; color:#5a6378; }\
  \
  /* Messages */\
  .msg {\
    max-width:82%; padding:11px 16px; border-radius:18px; font-size:15px; line-height:1.5;\
    word-wrap:break-word; animation: msgIn 0.3s ease;\
  }\
  .msg.user {\
    align-self:flex-end; color:#fff; font-weight:500;\
    background: linear-gradient(135deg, #0a1a3a, #1a2a4d);\
    border-bottom-right-radius:6px;\
  }\
  .msg.bot {\
    align-self:flex-start; background:#fff;\
    border:1px solid rgba(10,26,58,0.08); color:#0a1a3a;\
    border-bottom-left-radius:6px;\
    box-shadow: 0 1px 3px rgba(10,26,58,0.04);\
  }\
  @keyframes msgIn { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }\
  \
  /* Quick replies */\
  .quick-row { display:flex; flex-wrap:wrap; gap:8px; align-self:flex-start; max-width:90%; }\
  .quick {\
    padding:8px 14px; border-radius:20px; cursor:pointer; font-size:13px; font-weight:500;\
    background:#fff; border:1px solid rgba(192,133,82,0.3); color:#a06a3a;\
    transition:all 0.15s; white-space:nowrap; font-family:inherit;\
  }\
  .quick:hover { background:rgba(192,133,82,0.08); border-color:#c08552; }\
  .quick:active { transform:scale(0.95); }\
  \
  /* Typing */\
  .typing {\
    align-self:flex-start; background:#fff; border:1px solid rgba(10,26,58,0.08);\
    padding:14px 20px; border-radius:18px; border-bottom-left-radius:6px;\
    display:flex; gap:5px; box-shadow: 0 1px 3px rgba(10,26,58,0.04);\
  }\
  .typing span { width:8px; height:8px; border-radius:50%; background:#8a91a3; animation:blink 1.4s infinite; }\
  .typing span:nth-child(2){animation-delay:0.2s;}\
  .typing span:nth-child(3){animation-delay:0.4s;}\
  @keyframes blink { 0%,60%,100%{opacity:0.3;} 30%{opacity:1;} }\
  \
  /* Input */\
  .input-bar {\
    flex-shrink:0; padding:10px 14px 8px; border-top:1px solid rgba(10,26,58,0.08); background:#fff;\
  }\
  .input-box {\
    display:flex; gap:8px; align-items:flex-end;\
    background:#f6f3ed; border:1px solid rgba(10,26,58,0.1); border-radius:24px; padding:4px 4px 4px 18px;\
    transition:border-color 0.2s;\
  }\
  .input-box:focus-within { border-color:#c08552; }\
  .input-box textarea {\
    flex:1; background:transparent; border:none; color:#0a1a3a;\
    font-size:16px; resize:none; outline:none; font-family:inherit;\
    max-height:80px; line-height:1.4; padding:10px 0;\
  }\
  .input-box textarea::placeholder { color:#8a91a3; }\
  .send-btn {\
    width:40px; height:40px; border-radius:50%; border:none; cursor:pointer;\
    display:flex; align-items:center; justify-content:center; flex-shrink:0;\
    background: linear-gradient(135deg, #c08552, #a06a3a);\
    transition:transform 0.15s;\
  }\
  .send-btn:active { transform:scale(0.88); }\
  .send-btn:disabled { opacity:0.3; cursor:not-allowed; }\
  .send-btn svg { width:18px; height:18px; }\
  \
  .powered { text-align:center; padding:6px; font-size:11px; color:#8a91a3; background:#fff; }\
  .powered b { color:#5a6378; }\
  </style>\
  \
  <!-- FLOAT BUBBLE -->\
  <button class="bubble" id="bubble">\
    <svg viewBox="0 0 24 24" fill="#d9b97a"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>\
    <span class="badge"></span>\
    <span class="notif">Chat with our AI 👋</span>\
  </button>\
  \
  <!-- CHAT PANEL -->\
  <div class="panel" id="panel">\
    <div class="header">\
      <div class="avatar">\
        <svg viewBox="0 0 24 24" fill="#0a1a3a"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>\
      </div>\
      <div class="header-info">\
        <h1>Cloud Hak Assistant</h1>\
        <p><span class="dot"></span> AI-powered · Replies instantly</p>\
      </div>\
      <button class="close-btn" id="closeBtn">&times;</button>\
    </div>\
    <div class="chat" id="chat">\
      <div class="welcome">\
        <div class="tag"><span class="live-dot"></span> Live AI Demo</div>\
        <h2>Experience our AI yourself</h2>\
        <p>This chat IS what we build for your business.</p>\
      </div>\
    </div>\
    <div class="input-bar">\
      <div class="input-box">\
        <textarea id="msgInput" rows="1" placeholder="Ask about our services..."></textarea>\
        <button class="send-btn" id="sendBtn">\
          <svg viewBox="0 0 24 24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>\
        </button>\
      </div>\
    </div>\
    <div class="powered">⚡ Powered by <b>Cloud Hak</b> · GLM-5.2</div>\
  </div>';

  // ===== Element refs =====
  var bubble = root.getElementById('bubble');
  var panel = root.getElementById('panel');
  var closeBtn = root.getElementById('closeBtn');
  var chat = root.getElementById('chat');
  var input = root.getElementById('msgInput');
  var sendBtn = root.getElementById('sendBtn');

  // ===== QUICK REPLIES =====
  var QUICKIES = [
    { icon: '🤖', text: 'What can AI do for my business?' },
    { icon: '📞', text: 'I keep missing calls' },
    { icon: '💰', text: 'How much does a website cost?' },
    { icon: '🚀', text: 'I want to grow my business' }
  ];
  var quickShown = false;

  // ===== OPEN / CLOSE =====
  function openChat() {
    bubble.classList.add('hidden');
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
    var notif = bubble.querySelector('.notif');
    if (notif) notif.style.display = 'none';
    if (!quickShown) setTimeout(showQuick, 300);
    setTimeout(function() { input.focus(); }, 300);
  }

  function closeChat() {
    panel.classList.remove('active');
    bubble.classList.remove('hidden');
    document.body.style.overflow = '';
  }

  bubble.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);

  // ===== INPUT =====
  input.addEventListener('input', function() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  sendBtn.addEventListener('click', sendMessage);

  // Auto-remove notif after 6s
  setTimeout(function() {
    var n = bubble.querySelector('.notif');
    if (n) n.style.transition = 'opacity 0.3s'; n.style.opacity = '0';
    setTimeout(function() { if (n) n.style.display = 'none'; }, 300);
  }, 6000);

  // ===== MESSAGES =====
  function renderMd(text) {
    var html = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#0a1a3a;text-decoration:underline">$1</a>')
      .replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener" style="color:#0a1a3a;text-decoration:underline">$2</a>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<span style="display:block;padding-left:12px">• $1</span>')
      .replace(/\n/g, '<br>');
    return html;
  }

  function addMsg(role, text, html) {
    var div = document.createElement('div');
    div.className = 'msg ' + role;
    div.innerHTML = html || renderMd(text || '');
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
  }

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function hideTyping() {
    var el = root.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function showQuick() {
    if (quickShown) return;
    quickShown = true;
    var row = document.createElement('div');
    row.className = 'quick-row';
    QUICKIES.forEach(function(q) {
      var btn = document.createElement('button');
      btn.className = 'quick';
      btn.textContent = q.icon + ' ' + q.text;
      btn.addEventListener('click', function() {
        input.value = q.text;
        sendMessage();
      });
      row.appendChild(btn);
    });
    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
  }

  function hideQuick() {
    var el = chat.querySelector('.quick-row');
    if (el) el.remove();
    quickShown = false;
  }

  // ===== SEND (streaming — tokens appear as they arrive) =====
  function sendMessage() {
    if (sending) return;
    var text = input.value.trim();
    if (!text) return;

    sending = true;
    sendBtn.disabled = true;
    input.value = '';
    input.style.height = 'auto';

    hideQuick();
    addMsg('user', text);
    showTyping();

    // Add user message to history
    messages.push({ role: 'user', content: text });

    // Stream response
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages, workflow_id: WF_ID }),
    }).then(function(response) {
      hideTyping();

      // Create bot message element for streaming
      var botEl = addMsg('bot', '');
      streamingEl = botEl;
      var fullText = '';

      if (!response.ok) throw new Error('API error');

      var reader = response.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      function readChunk() {
        return reader.read().then(function(result) {
          if (result.done) {
            streamingEl = null;
            if (fullText) {
              messages.push({ role: 'assistant', content: fullText });
            }
            sending = false; sendBtn.disabled = false;
            setTimeout(function() { input.focus(); }, 100);
            return;
          }

          buffer += decoder.decode(result.value, { stream: true });
          var lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line || !line.startsWith('data: ')) continue;
            var data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              var parsed = JSON.parse(data);
              if (parsed.content) {
                fullText += parsed.content;
                if (streamingEl) streamingEl.innerHTML = renderMd(fullText);
                chat.scrollTop = chat.scrollHeight;
              }
            } catch (_) {}
          }

          return readChunk();
        });
      }

      return readChunk();
    }).catch(function() {
      hideTyping();
      if (!streamingEl || !streamingEl.textContent) {
        addMsg('bot', 'Connection issue — please try again.');
      }
      streamingEl = null;
      if (messages.length && messages[messages.length - 1].role === 'user') {
        messages.pop();
      }
      sending = false; sendBtn.disabled = false;
    });
  }

  // Mobile viewport handling
  if (window.visualViewport) {
    var vw = window.visualViewport;
    vw.addEventListener('resize', function() {
      if (panel.classList.contains('active')) {
        panel.style.height = vw.height + 'px';
        chat.scrollTop = chat.scrollHeight;
      }
    });
  }
})();
