
/* ===== M7 · phone navigation helpers ===== */
(() => {
'use strict';
const $ = s => document.querySelector(s), root = document.documentElement;
const metrics = () => {
  const h = $('#hud'); root.style.setProperty('--m7-hudb', Math.round(h ? h.getBoundingClientRect().bottom : 96) + 'px');
  root.style.setProperty('--m7-sheet', Math.round(Math.min(innerHeight*.47, 440)) + 'px');
};
metrics(); addEventListener('resize', metrics); addEventListener('orientationchange', () => setTimeout(metrics, 250));
if (window.ResizeObserver) {
  if ($('#hud')) new ResizeObserver(metrics).observe($('#hud'));
  let q = 0; new ResizeObserver(() => { if (q) return; q = requestAnimationFrame(() => { q = 0;
    if (typeof size === 'function' && typeof W !== 'undefined') { const r = $('#stage').getBoundingClientRect(); if (Math.abs(r.width - W) > 1 || Math.abs(r.height - H) > 1) size(); } }); }).observe($('#stage'));
}
const L = $('#mobile-upgrade-launch'), G = $('#grab'), vib = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
setInterval(() => {                                       // glance cue: how many upgrades are affordable right now
  let b = $('#m7-badge'); if (L && !b) { b = document.createElement('i'); b.id = 'm7-badge'; L.appendChild(b); }
  const n = document.querySelectorAll('#list .row.ok').length;
  if (b) b.textContent = n > 0 ? (n > 9 ? '9+' : n) : '';
}, 700);
let skip = false;
const swipe = (el, dir, act) => { if (!el) return; let y0 = null;
  el.addEventListener('pointerdown', e => { y0 = e.clientY; });
  el.addEventListener('pointerup', e => { if (y0 === null) return; const dy = e.clientY - y0; y0 = null; if ((dir > 0 && dy > 36) || (dir < 0 && dy < -30)) { act(); skip = true; setTimeout(() => skip = false, 400); } });
  el.addEventListener('click', e => { if (skip) { skip = false; e.stopImmediatePropagation(); e.preventDefault(); } }, true);
};
swipe(G, 1, () => { if (!$('#app').classList.contains('peek')) G.click(); });          // swipe the sheet handle down to close
swipe(L, -1, () => { if ($('#app').classList.contains('peek')) L.click(); });          // swipe the Upgrade button up to open
addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#app').classList.contains('peek')) G.click(); });
document.addEventListener('click', e => { if (e.target.closest && e.target.closest('#nav-bar .loc-pill, #mobile-upgrade-launch, #tabs button')) vib(8); }, true);
})();


