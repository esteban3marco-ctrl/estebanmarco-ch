/* Chat-Assistent — Esteban Marco (estebanmarco.ch) — DE / EN / FR / ES */
(function(){
  var FN='https://jwlpwuxunawzcfdfjxyn.supabase.co/functions/v1/chatbot';
  var sid=null;
  try{sid=localStorage.getItem('em_chat_sid');}catch(e){}
  if(!sid){sid='s'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);try{localStorage.setItem('em_chat_sid',sid);}catch(e){}}
  var msgs=[];
  try{var st=sessionStorage.getItem('em_chat_msgs');if(st)msgs=JSON.parse(st);}catch(e){}

  /* ---- Sprache: folgt der Website (i18n.js schreibt em_lang + html[lang]) ---- */
  function siteLang(){
    var l='';
    try{l=localStorage.getItem('em_lang')||'';}catch(e){}
    if(!l)l=(document.documentElement.lang||'').slice(0,2);
    if(!l)l=(navigator.language||'de').slice(0,2);
    return ({de:1,en:1,fr:1,es:1}[l])?l:'de';
  }
  var T={
    de:{sub:'Digitaler Assistent · Antwort in Sekunden',open:'Chat öffnen',close:'Schliessen',ph:'Ihre Frage…',send:'Senden',
        note:'Persönliche Beratung, keine automatischen Angebote.',klon:'Digitaler Klon',skip:'Überspringen',rep:'Nochmals abspielen',snd:'Ton einschalten',mut:'Ton aus',priv:'Datenschutz',typing:'schreibt…',
        hi:'Grüezi! Ich bin Estebans digitaler Assistent. Erzählen Sie mir kurz, was für einen Betrieb Sie führen oder was Sie gerade am meisten Zeit kostet — dann sage ich Ihnen konkret, was sich automatisieren lässt.',
        err:'Entschuldigung, der Chat ist gerade nicht erreichbar. Schreiben Sie mir gern direkt: info@estebanmarco.ch'},
    en:{sub:'Digital assistant · replies in seconds',open:'Open chat',close:'Close',ph:'Your question…',send:'Send',
        note:'Personal advice, no automated quotes.',klon:'Digital clone',skip:'Skip',rep:'Play again',snd:'Turn on sound',mut:'Mute',priv:'Privacy',typing:'typing…',
        hi:'Hello! I am Esteban’s digital assistant. Tell me briefly what kind of business you run, or what is eating most of your time right now — and I will tell you concretely what can be automated.',
        err:'Sorry, the chat is unavailable right now. Feel free to write directly: info@estebanmarco.ch'},
    fr:{sub:'Assistant digital · réponse en quelques secondes',open:'Ouvrir le chat',close:'Fermer',ph:'Votre question…',send:'Envoyer',
        note:'Conseil personnel, aucune offre automatique.',klon:'Clone digital',skip:'Passer',rep:'Revoir',snd:'Activer le son',mut:'Couper le son',priv:'Confidentialité',typing:'écrit…',
        hi:'Bonjour ! Je suis l’assistant digital d’Esteban. Dites-moi brièvement quel type d’entreprise vous dirigez, ou ce qui vous prend le plus de temps en ce moment — je vous dirai concrètement ce qui peut être automatisé.',
        err:'Désolé, le chat est momentanément indisponible. Écrivez-moi directement : info@estebanmarco.ch'},
    es:{sub:'Asistente digital · responde en segundos',open:'Abrir el chat',close:'Cerrar',ph:'Su pregunta…',send:'Enviar',
        note:'Asesoramiento personal, sin ofertas automáticas.',klon:'Clon digital',skip:'Saltar',rep:'Volver a ver',snd:'Activar sonido',mut:'Silenciar',priv:'Privacidad',typing:'escribiendo…',
        hi:'¡Hola! Soy el asistente digital de Esteban. Cuénteme brevemente qué tipo de negocio dirige o qué le está robando más tiempo ahora mismo, y le digo en concreto qué se puede automatizar.',
        err:'Disculpe, el chat no está disponible en este momento. Escríbame directamente: info@estebanmarco.ch'}
  };
  var lang=siteLang();
  function t(k){return (T[lang]||T.de)[k];}

  var css=document.createElement('style');
  css.textContent=
  '#emc-btn{position:fixed;right:22px;bottom:22px;z-index:9990;width:58px;height:58px;border-radius:50%;background:#B0593A;color:#F4F1EA;border:none;cursor:pointer;box-shadow:0 12px 30px -8px rgba(28,23,16,.45);display:grid;place-items:center;transition:transform .2s,background .2s}'+
  '#emc-btn:hover{transform:scale(1.06);background:#974A2E}'+
  '#emc-panel{position:fixed;right:22px;bottom:92px;z-index:9991;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100vh - 130px));background:#F4F1EA;border:1px solid rgba(26,28,23,.15);border-radius:18px;box-shadow:0 30px 70px -20px rgba(28,23,16,.5);display:none;flex-direction:column;overflow:hidden;font-family:Inter,"Helvetica Neue",Arial,sans-serif}'+
  '#emc-panel.open{display:flex}'+
  '#emc-head{background:#1C1710;color:#F4F1EA;padding:16px 18px;display:flex;align-items:center;gap:11px}'+
  '#emc-head .em-av{width:38px;height:38px;border-radius:50%;background:#B0593A;display:grid;place-items:center;font-family:"Instrument Serif",Georgia,serif;font-size:20px;flex:none}'+
  '#emc-head .em-t{font-family:"Instrument Serif",Georgia,serif;font-size:19px;line-height:1.1}'+
  '#emc-head .em-s{font-size:11.5px;color:rgba(244,241,234,.6);margin-top:2px}'+
  '#emc-x{margin-left:auto;background:none;border:none;color:rgba(244,241,234,.7);font-size:17px;cursor:pointer;padding:4px}'+
  '#emc-log{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:9px}'+
  '.emc-m{max-width:84%;padding:10px 13px;border-radius:14px;font-size:13.8px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}'+
  '.emc-bot{background:#fff;border:1px solid rgba(26,28,23,.1);color:#211C14;align-self:flex-start;border-bottom-left-radius:5px}'+
  '.emc-user{background:#B0593A;color:#fff;align-self:flex-end;border-bottom-right-radius:5px}'+
  '.emc-typing{align-self:flex-start;color:rgba(26,28,23,.5);font-size:12.5px;padding:4px 8px}'+
  '#emc-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(26,28,23,.12);background:#ECE4D5}'+
  '#emc-in{flex:1;border:1px solid rgba(26,28,23,.18);border-radius:11px;padding:11px 13px;font-size:14px;font-family:inherit;background:#fff;color:#211C14;resize:none;max-height:90px}'+
  '#emc-in:focus{outline:none;border-color:#B0593A}'+
  '#emc-send{background:#B0593A;border:none;color:#fff;border-radius:11px;width:44px;cursor:pointer;display:grid;place-items:center;flex:none}'+
  '#emc-send:hover{background:#974A2E}'+
  '#emc-note{font-size:10.5px;color:rgba(26,28,23,.45);text-align:center;padding:0 12px 9px;background:#ECE4D5}'+
  '#emc-klon{position:relative;align-self:flex-start;flex:none;height:100%;aspect-ratio:9/16;max-width:100%;border-radius:15px;overflow:hidden;background:#1C1710;line-height:0;box-shadow:0 12px 30px -14px rgba(28,23,16,.55);transition:opacity .4s ease}'+
  '#emc-klon.out{opacity:0}'+
  '#emc-klon video{width:100%;height:100%;object-fit:contain;display:block;background:#1C1710}'+
  '#emc-klon .emc-snd{position:absolute;right:8px;top:8px;width:30px;height:30px;border-radius:50%;border:none;cursor:pointer;background:rgba(244,241,234,.16);color:#F4F1EA;display:grid;place-items:center;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:background .2s}'+
  '#emc-klon .emc-snd:hover{background:rgba(244,241,234,.3)}'+
  '#emc-klon .emc-cap{position:absolute;left:0;right:0;top:0;padding:11px 46px 22px 12px;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,241,234,.72);line-height:1.3;background:linear-gradient(rgba(28,23,16,.7),rgba(28,23,16,0));pointer-events:none}'+
  '#emc-klon .emc-skip{position:absolute;left:50%;transform:translateX(-50%);bottom:12px;border:1px solid rgba(244,241,234,.3);background:rgba(28,23,16,.45);color:rgba(244,241,234,.88);font-family:inherit;font-size:11px;letter-spacing:.07em;line-height:1;padding:7px 14px;border-radius:99px;cursor:pointer;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:background .2s,opacity .3s}'+
  '#emc-klon .emc-skip:hover{background:rgba(244,241,234,.18)}'+
  '#emc-klon.done .emc-skip{opacity:0;pointer-events:none}'+
  '#emc-klon .emc-bar{position:absolute;left:0;bottom:0;height:2px;background:#B0593A;width:0;transition:width .2s linear}'+
  '#emc-klon .emc-replay{position:absolute;inset:0;border:none;background:rgba(28,23,16,.42);color:#F4F1EA;display:none;place-items:center;cursor:pointer;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}'+
  '#emc-klon.done .emc-replay{display:grid}'+
  '@media(prefers-reduced-motion:reduce){#emc-klon{display:none}}'+
  '@media(max-width:480px){#emc-panel{right:16px;bottom:86px}#emc-btn{right:16px;bottom:16px}}';
  document.head.appendChild(css);

  var btn=document.createElement('button');btn.id='emc-btn';
  btn.innerHTML='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var panel=document.createElement('div');panel.id='emc-panel';
  panel.innerHTML=
    '<div id="emc-head"><div class="em-av">E</div><div><div class="em-t">Esteban Marco</div><div class="em-s" id="emc-sub"></div></div><button id="emc-x">✕</button></div>'+
    '<div id="emc-log"></div>'+
    '<form id="emc-form"><textarea id="emc-in" rows="1"></textarea><button id="emc-send" type="submit"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button></form>'+
    '<div id="emc-note"></div>';
  document.body.appendChild(btn);document.body.appendChild(panel);

  var log=panel.querySelector('#emc-log'),form=panel.querySelector('#emc-form'),input=panel.querySelector('#emc-in');
  var closeBtn=panel.querySelector('#emc-x');

  function paintUI(){
    btn.setAttribute('aria-label',t('open'));
    panel.querySelector('#emc-sub').textContent=t('sub');
    closeBtn.setAttribute('aria-label',t('close'));
    input.setAttribute('placeholder',t('ph'));
    panel.querySelector('#emc-send').setAttribute('aria-label',t('send'));
    panel.querySelector('#emc-note').innerHTML=t('note')+' <a href="/datenschutz.html" style="color:inherit">'+t('priv')+'</a>';
  }
  paintUI();

  /* Sprachumschalter der Website beobachten: solange der Chat leer ist, folgt er mit */
  var mo=new MutationObserver(function(){
    var l=siteLang();
    if(l!==lang){lang=l;paintUI();if(msgs.length===0&&greeted){log.innerHTML='';add('assistant',t('hi'));}}
  });
  try{mo.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(e){}

  function add(role,text){var d=document.createElement('div');d.className='emc-m '+(role==='user'?'emc-user':'emc-bot');d.textContent=text;log.appendChild(d);log.scrollTop=log.scrollHeight;}
  function persist(){try{sessionStorage.setItem('em_chat_msgs',JSON.stringify(msgs.slice(-30)));}catch(e){}}

  var greeted=msgs.length>0;

  /* ---- Klon-Video: spielt einmal pro Sitzung beim ersten Öffnen ---- */
  var klonDone=false;
  try{klonDone=sessionStorage.getItem('em_klon')==='1';}catch(e){}
  function klon(){
    if(klonDone)return;
    klonDone=true;try{sessionStorage.setItem('em_klon','1');}catch(e){}
    var wrap=document.createElement('div');wrap.id='emc-klon';
    var v=document.createElement('video');
    v.src='/assets/klon.mp4';v.poster='/assets/klon_poster.jpg';
    v.playsInline=true;v.setAttribute('playsinline','');
    v.preload='auto';v.controls=false;
    var cap=document.createElement('div');cap.className='emc-cap';cap.textContent=t('klon');
    var bar=document.createElement('div');bar.className='emc-bar';
    var snd=document.createElement('button');snd.className='emc-snd';snd.type='button';
    var skip=document.createElement('button');skip.className='emc-skip';skip.type='button';skip.textContent=t('skip');
    var rep=document.createElement('button');rep.className='emc-replay';rep.type='button';
    rep.innerHTML='<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="9 7 18 12 9 17 9 7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="10.2"/></svg>';
    var ON='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>';
    var OFF='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>';
    function paintSnd(){snd.innerHTML=v.muted?OFF:ON;snd.setAttribute('aria-label',v.muted?t('snd'):t('mut'));}
    rep.setAttribute('aria-label',t('rep'));skip.setAttribute('aria-label',t('skip'));
    var done=false;
    function finish(){
      if(done)return;done=true;
      wrap.classList.add('done');
      try{log.scrollTo({top:log.scrollHeight,behavior:'smooth'});}catch(e){log.scrollTop=log.scrollHeight;}
      input.focus();
    }
    snd.addEventListener('click',function(e){e.stopPropagation();v.muted=!v.muted;if(!v.muted&&v.paused&&!done)v.play();paintSnd();});
    skip.addEventListener('click',function(e){e.stopPropagation();try{v.pause();}catch(err){}finish();});
    rep.addEventListener('click',function(e){
      e.stopPropagation();wrap.classList.remove('done');done=false;
      v.currentTime=0;v.play();
      try{wrap.scrollIntoView({block:'nearest',behavior:'smooth'});}catch(err){}
    });
    v.addEventListener('ended',finish);
    v.addEventListener('error',function(){done=true;wrap.remove();});
    v.addEventListener('timeupdate',function(){if(v.duration)bar.style.width=(v.currentTime/v.duration*100)+'%';});
    wrap.appendChild(v);wrap.appendChild(cap);wrap.appendChild(snd);wrap.appendChild(skip);wrap.appendChild(rep);wrap.appendChild(bar);
    log.appendChild(wrap);
    v.muted=false;paintSnd();
    var pr=v.play();
    if(pr&&pr.catch)pr.catch(function(){v.muted=true;paintSnd();v.play().catch(function(){done=true;wrap.remove();});});
  }

  function open(){panel.classList.add('open');if(!greeted){greeted=true;klon();add('assistant',t('hi'));if(document.getElementById('emc-klon'))log.scrollTop=0;}input.focus();}
  btn.addEventListener('click',function(){panel.classList.contains('open')?panel.classList.remove('open'):open();});
  closeBtn.addEventListener('click',function(){panel.classList.remove('open');});
  msgs.forEach(function(m){add(m.role,m.content);});

  var busy=false;
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    var tx=input.value.trim();
    if(!tx||busy)return;
    input.value='';add('user',tx);msgs.push({role:'user',content:tx});persist();
    busy=true;
    var ty=document.createElement('div');ty.className='emc-typing';ty.textContent=t('typing');log.appendChild(ty);log.scrollTop=log.scrollHeight;
    fetch(FN,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({session:sid,lang:lang,messages:msgs.slice(-20)})})
      .then(function(r){return r.json();})
      .then(function(j){
        ty.remove();busy=false;
        if(j&&j.reply){add('assistant',j.reply);msgs.push({role:'assistant',content:j.reply});persist();}
        else{add('assistant',t('err'));}
      })
      .catch(function(){ty.remove();busy=false;add('assistant',t('err'));});
  });
  input.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();form.dispatchEvent(new Event('submit'));}});
})();
