
(()=>{
 'use strict';
 const root=document.getElementById('stage'); if(!root)return;
 // Preserve the existing canvas renderer and event handlers; add only a transient visual response.
 const onPress=e=>{const b=e.target.closest('button,.loc-pill');if(!b||!root.contains(b))return;b.classList.remove('v15-pressed');void b.offsetWidth;b.classList.add('v15-pressed');setTimeout(()=>b.classList.remove('v15-pressed'),180)};
 root.addEventListener('pointerdown',onPress,{passive:true});
 // Keep status-bar layout legible on tall phones without creating a second game mode.
 const hint=document.getElementById('hint'); if(hint&&!hint.dataset.v15){hint.dataset.v15='1';hint.setAttribute('aria-live','polite')}
})();

