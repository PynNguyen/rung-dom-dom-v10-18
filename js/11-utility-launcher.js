
/* ===== M9 · hub menu ===== */
(() => {
'use strict';
const st = document.getElementById('stage'); if (!st || document.getElementById('m9-menu-btn')) return;
const ITEMS = [
  { id:'exp-launch',      ic:'🧭', t:'Hành trình & hệ thống', s:'Lời hẹn mỗi ngày, thám hiểm, linh mạch' },
  { id:'minigame-launch', ic:'🎮', t:'Mini game cảnh quan',    s:'Chơi nhanh theo từng khu vực' },
  { id:'world-launch',    ic:'🌌', t:'Bộ sưu tập & thành tựu', s:'Sổ tay thế giới và di sản' },
  { id:'rdd-v96-launch',  ic:'⚙️', t:'Chế độ chơi & cài đặt',  s:'Hình ảnh, âm thanh, chuyển động' }
];
const btn = document.createElement('button'); btn.id = 'm9-menu-btn'; btn.type = 'button'; btn.className = 'top-btn';
btn.setAttribute('aria-haspopup', 'true'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Mở menu tính năng'); btn.textContent = '☰';
const scrim = document.createElement('div'); scrim.id = 'm9-scrim';
const menu = document.createElement('div'); menu.id = 'm9-menu'; menu.setAttribute('role', 'menu');
ITEMS.forEach(it => {
  const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'menuitem'); b.dataset.target = it.id;
  b.innerHTML = '<span class="ic">' + it.ic + '</span><span>' + it.t + '<small>' + it.s + '</small></span>';
  menu.appendChild(b);
});
st.appendChild(scrim); st.appendChild(menu); st.appendChild(btn);
const set = on => { menu.classList.toggle('on', on); scrim.classList.toggle('on', on); btn.setAttribute('aria-expanded', on ? 'true' : 'false'); };
btn.addEventListener('click', e => { e.stopPropagation(); set(!menu.classList.contains('on')); try { navigator.vibrate && navigator.vibrate(8); } catch (x) {} });
scrim.addEventListener('pointerdown', e => { e.stopPropagation(); set(false); });
menu.addEventListener('click', e => {
  const b = e.target.closest('button[data-target]'); if (!b) return;
  set(false); const t = document.getElementById(b.dataset.target); if (t) setTimeout(() => t.click(), 70);
});
addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
})();


