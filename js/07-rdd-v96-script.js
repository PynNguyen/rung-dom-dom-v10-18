
(function(){
 'use strict';
 const $=(s)=>document.querySelector(s), root=document.documentElement, panel=$('#rdd-v96-panel'), launch=$('#rdd-v96-launch');
 if(!panel||!launch||window.__RDD_V96_READY)return;window.__RDD_V96_READY=true;
 const KEY='rdd_v96_preferences';
 const defaults={mode:'balanced',audio:null,volume:70,motion:'system'};
 let pref={...defaults};try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');if(v&&typeof v==='object')pref={...pref,...v}}catch(_){}
 const persistPrefs=()=>{try{localStorage.setItem(KEY,JSON.stringify(pref))}catch(_){}};
 const status=(s)=>{const el=$('#rdd-v96-status');if(el)el.textContent=s};
 function getSnd(){try{return typeof S!=='undefined'?!!S.snd:null}catch(_){return null}}
 function audioReady(){try{if(typeof initAudio==='function')initAudio();if(typeof A!=='undefined'&&A&&A.state==='suspended')A.resume().catch(()=>{});return typeof A!=='undefined'&&!!A}catch(_){return false}}
 function setAudio(on){
   pref.audio=!!on;
   try{if(typeof S!=='undefined'){S.snd=on?1:0;if(typeof save==='function')save()}}catch(_){ }
   if(on){audioReady();try{if(typeof master!=='undefined'&&master&&typeof A!=='undefined'&&A)master.gain.setTargetAtTime((pref.volume/100)*.8,A.currentTime,.08)}catch(_){};try{document.querySelector('[data-vii="audio"]')?.setAttribute('aria-pressed','true')}catch(_){} }
   else{try{if(typeof master!=='undefined'&&master&&typeof A!=='undefined'&&A)master.gain.setTargetAtTime(0,A.currentTime,.08)}catch(_){};try{if(typeof stopTrack==='function')stopTrack()}catch(_){} }
   persistPrefs();try{if(typeof save==='function')save()}catch(_){}render();status(on?'Đã bật âm thanh':'Đã tắt âm thanh');
 }
 function setMode(mode){pref.mode=mode;root.classList.remove('rdd-v96-balanced','rdd-v96-cinematic','rdd-v96-performance');root.classList.add('rdd-v96-'+mode);
   try{if(typeof VFX!=='undefined'){if(mode==='performance')VFX.reduced=true;else if(pref.motion==='system')VFX.reduced=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);else VFX.reduced=pref.motion==='calm'}}catch(_){}
   persistPrefs();render();status(({balanced:'Đã chọn Cân bằng',cinematic:'Đã chọn Điện ảnh',performance:'Đã chọn Mượt nhẹ'})[mode]||'Đã cập nhật');
 }
 function setMotion(motion){pref.motion=motion;try{if(typeof VFX!=='undefined'){VFX.reduced=pref.mode==='performance'||(motion==='system'?(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches):motion==='calm')}}catch(_){}persistPrefs();render();status('Đã cập nhật chuyển động nền')}
 function setVolume(n){pref.volume=Math.max(0,Math.min(100,+n||0));try{if(typeof master!=='undefined'&&master&&typeof A!=='undefined'&&A){const on=pref.audio===null?getSnd():pref.audio;master.gain.setTargetAtTime(on?(pref.volume/100)*.8:0,A.currentTime,.06)}}catch(_){}persistPrefs();const v=$('#rdd-v96-volume-value');if(v)v.textContent=pref.volume+'%'}
 function render(){
   root.classList.remove('rdd-v96-balanced','rdd-v96-cinematic','rdd-v96-performance');root.classList.add('rdd-v96-'+(['balanced','cinematic','performance'].includes(pref.mode)?pref.mode:'balanced'));
   panel.querySelectorAll('[data-v96-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v96Mode===pref.mode)));
   const sound=pref.audio===null?getSnd():pref.audio;panel.querySelectorAll('[data-v96-audio]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v96Audio===(sound?'on':'off'))));
   const a=$('#rdd-v96-audio-state');if(a)a.textContent=sound===null?'Chưa khởi tạo':sound?'Đang bật':'Đang tắt';
   panel.querySelectorAll('[data-v96-motion]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v96Motion===pref.motion)));
   const range=$('#rdd-v96-volume');if(range)range.value=String(pref.volume);const vv=$('#rdd-v96-volume-value');if(vv)vv.textContent=pref.volume+'%';
 }
 function open(){panel.classList.add('open');launch.setAttribute('aria-expanded','true');render()}
 function close(){panel.classList.remove('open');launch.setAttribute('aria-expanded','false');launch.focus()}
 launch.addEventListener('click',()=>panel.classList.contains('open')?close():open());$('#rdd-v96-close').addEventListener('click',close);
 panel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
   if(b.dataset.v96Mode){setMode(b.dataset.v96Mode);return}
   if(b.dataset.v96Audio){setAudio(b.dataset.v96Audio==='on');return}
   if(b.dataset.v96Motion){setMotion(b.dataset.v96Motion);return}
   if(b.id==='rdd-v96-test'){if(!audioReady()){status('Thiết bị chưa hỗ trợ Web Audio');return}setAudio(true);try{if(typeof chime==='function')chime(7,.1,.7);else if(typeof ping==='function')ping();status('Đã phát âm thử')}catch(_){status('Không thể phát âm thử lúc này')} }
 });
 $('#rdd-v96-volume').addEventListener('input',e=>setVolume(e.target.value));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))close()});
 // Apply settings once; no extra animation loop, polling timer, or AudioContext is created.
 if(pref.audio!==null){try{if(typeof S!=='undefined'){S.snd=pref.audio?1:0}}catch(_){} }
 setMode(pref.mode);setMotion(pref.motion);setVolume(pref.volume);render();
})();

