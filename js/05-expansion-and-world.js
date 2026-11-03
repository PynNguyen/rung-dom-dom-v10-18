
/* ===== V7: HOUSE LEVELS · FOREST COMPANIONS II · ACHIEVEMENTS & GOALS ===== */
(() => {
'use strict';
const $q = s => document.querySelector(s), cl = (v,a,b) => Math.max(a, Math.min(b, v)), clamp = cl;
const R = { sonar:0, moon:0, ring:[], flash:0 };

/* ---------- state ---------- */
const HL = [
  { n:'Chòi gỗ',       slots:3,  c:0,     d:'Một gian nhỏ ấm áp' },
  { n:'Nhà gỗ nhỏ',    slots:5,  c:3e4,   d:'Thêm hiên gỗ, rào và kho củi' },
  { n:'Nhà gỗ rộng',   slots:7,  c:4e6,   d:'Thêm nhà kính ven tường' },
  { n:'Biệt thự rừng', slots:9,  c:6e8,   d:'Thêm cổng vòm, đèn đường' },
  { n:'Tháp Sao',      slots:11, c:9e10,  d:'Thêm tháp quan sát thiên văn' }
];
const SP2 = [
  { id:'bee',  n:'Ong ánh sao',  i:'🐝', c:3e7,   d:'Bay đi thụ phấn hoa dạ quang, mỗi chuyến thu ánh sáng (×6 sản lượng/giây mỗi cấp)' },
  { id:'bat',  n:'Dơi đêm',      i:'🦇', c:3e8,   d:'Phát sóng siêu âm mỗi 14 giây: sản lượng ×1.25 trong 10 giây' },
  { id:'frog', n:'Ếch cây ngọc', i:'🐸', c:1.5e9, d:'Kêu bên hồ gọi mưa: sản lượng ×1.5 khi trời mưa, thu giọt mưa vàng' },
  { id:'lark', n:'Sơn ca',       i:'🐦', c:8e9,   d:'Hót trên mái nhà: giữ combo chạm không bị tắt' },
  { id:'koi',  n:'Cá chép sao',  i:'🐟', c:3e10,  d:'Nhảy khỏi mặt hồ nhả sao vàng (×12 sản lượng/giây mỗi cấp)' },
  { id:'bear', n:'Gấu nâu',      i:'🐻', c:1.2e11,d:'Đi kiếm tổ mật và nấm trong rừng (×40 sản lượng/giây mỗi cấp)' },
  { id:'wolf', n:'Sói trăng',    i:'🐺', c:5e11,  d:'Hú dưới trăng: Trăng sáng ×1.35 sản lượng trong 15 giây' }
];
if (!Array.isArray(S.pet2)) S.pet2 = [];
while (S.pet2.length < SP2.length) S.pet2.push(0);
if (!Array.isArray(S.zt) || S.zt.length < 4) S.zt = [0,0,0,0];
if (!Array.isArray(S.gl)) S.gl = [];
if (!Array.isArray(S.home)) S.home = [];
const placed = () => S.home.filter(v => v > 0).length;
if (!S.hl) S.hl = Math.max(1, HL.findIndex(h => h.slots >= placed()) + 1);   // existing saves keep every item they own
S.hl = cl(S.hl | 0, 1, 5);
const lv = i => S.pet2[i] | 0;

/* ---------- economy hooks ---------- */
const _em = extraMult, baseN = AC.length;
extraMult = function () {
  let m = _em.apply(this, arguments) * (1 + .08*(S.hl - 1));
  const now = Date.now();
  if (lv(1) && now < R.sonar) m *= 1.25 + .03*(lv(1) - 1);
  if (lv(2) && S.wth === 1)  m *= 1.5 + .05*(lv(2) - 1);
  if (lv(6) && now < R.moon) m *= 1.35 + .04*(lv(6) - 1);
  const k = S.ach.filter(i => i >= baseN).length;             // new achievements give +2% instead of +5%
  if (k) m *= (1 + .05*(S.ach.length - k) + .02*k) / (1 + .05*S.ach.length);
  return m;
};

/* ---------- house: upgrade card + slot gating ---------- */
const hr = mkRow('🏡', 'Nhà', '', () => {
  const nx = HL[S.hl];
  if (!nx) return toast('🏡 Nhà đã đạt cấp cao nhất');
  if (S.l < nx.c) { blip(); return toast('Cần ' + fm(nx.c) + ' ánh sáng để nâng nhà'); }
  S.l -= nx.c; S.hl++; burst(90); arp([0,2,4,7,9,12], .16);
  toast('🏡 Nhà lên cấp ' + S.hl + ': ' + HL[S.hl-1].n + ' · thêm chỗ đặt đồ'); ui();
});
hr.b.dataset.t = '3';
{ const first = [...list.children].find(c => c.dataset.t === '3' && c !== hr.b); if (first) list.insertBefore(hr.b, first); }
hrow.forEach((r, i) => {
  const o = r.b.onclick;
  r.b.onclick = function (e) {
    if (!S.home[i] && placed() >= HL[S.hl-1].slots) {
      const need = HL.findIndex(h => h.slots > placed()) + 1;
      blip(); return toast('🏡 Nhà chưa đủ chỗ cho món mới · nâng nhà lên cấp ' + need + ' (' + HL[need-1].n + ')');
    }
    return o.call(this, e);
  };
});

/* ---------- new species rows (tab "Bạn rừng") ---------- */
const spCost = i => Math.ceil(SP2[i].c * Math.pow(1.7, lv(i)));
const sprow = SP2.map((s, i) => {
  const r = mkRow(s.i, s.n, s.d, () => {
    const l0 = lv(i), bulk = calcBulk(s.c, 1.7, l0, buyMode);
    if (S.l < bulk.total) { blip(); return; }
    S.l -= bulk.total; S.pet2[i] += bulk.count; burst(Math.min(90, 20 + bulk.count * 2)); arp([0,4,7,12], .14);
    toast(s.i + ' ' + s.n + (l0 ? ' lên cấp ' + (l0 + bulk.count) : ' đã đến khu rừng!') + (bulk.count > 1 ? ' (+' + bulk.count + ' cấp)' : '')); ui();
  });
  r.b.dataset.t = '1'; return r;
});

/* ---------- achievements ---------- */
const zoneDone = z => { const a = WL.filter(w => w.z === z); return a.length > 0 && a.every(w => S.codex.includes(w.id)); };
AC.push(
  ['Chủ nhà thực thụ', 'Nâng nhà lên cấp 2', () => S.hl >= 2],
  ['Nhà rộng rãi', 'Nâng nhà lên cấp 3', () => S.hl >= 3],
  ['Biệt thự giữa rừng', 'Nâng nhà lên cấp 4', () => S.hl >= 4],
  ['Chủ nhân Tháp Sao', 'Nâng nhà lên cấp 5 (tối đa)', () => S.hl >= 5],
  ['Đủ chỗ cho mọi thứ', 'Đặt đủ 11 món nội thất', () => S.home.length >= 11 && S.home.every(n => n > 0)],
  ['Thợ mộc khéo tay', 'Một món nội thất đạt cấp 10', () => Math.max(0, ...S.home) >= 10],
  ['Nghệ nhân nội thất', 'Một món nội thất đạt cấp 25', () => Math.max(0, ...S.home) >= 25],
  ['Bạn rừng thế hệ mới', 'Làm quen một bạn rừng mới', () => S.pet2.some(n => n > 0)],
  ['Thế giới nhỏ bé', 'Có đủ 7 bạn rừng mới', () => S.pet2.every(n => n > 0)],
  ['Mười chín sinh linh', 'Có 19 loài bạn rừng', () => S.pet.filter(n => n > 0).length + S.pet2.filter(n => n > 0).length >= 19],
  ['Bậc thầy chăm sóc', 'Tổng cấp các bạn rừng đạt 100', () => S.pet.reduce((a,b)=>a+b,0) + S.pet2.reduce((a,b)=>a+b,0) >= 100],
  ['Người nuôi ong', 'Ong ánh sao đạt cấp 5', () => lv(0) >= 5],
  ['Tai nghe sóng', 'Dơi đêm đạt cấp 5', () => lv(1) >= 5],
  ['Điệp khúc sau mưa', 'Ếch cây ngọc đạt cấp 5', () => lv(2) >= 5],
  ['Bản nhạc buổi sớm', 'Sơn ca đạt cấp 5', () => lv(3) >= 5],
  ['Chủ hồ trăng', 'Cá chép sao đạt cấp 5', () => lv(4) >= 5],
  ['Bạn của gấu', 'Gấu nâu đạt cấp 5', () => lv(5) >= 5],
  ['Tiếng hú dưới trăng', 'Sói trăng đạt cấp 5', () => lv(6) >= 5],
  ['Khách quen Nhà gỗ', 'Ở 5 phút tại Nhà gỗ', () => S.zt[0] >= 300],
  ['Dân rừng linh hồn', 'Ở 5 phút tại Rừng linh hồn', () => S.zt[1] >= 300],
  ['Bạn của thác', 'Ở 5 phút tại Thác ngân hà', () => S.zt[2] >= 300],
  ['Người của hồ', 'Ở 5 phút tại Hồ trăng', () => S.zt[3] >= 300],
  ['Cư dân bốn cảnh', 'Ở mỗi cảnh quan 30 phút', () => S.zt.every(v => v >= 1800)],
  ['Sổ tay Bìa rừng', 'Ghi đủ sinh vật ở Bìa rừng', () => zoneDone(0)],
  ['Sổ tay Rừng linh hồn', 'Ghi đủ sinh vật ở Rừng linh hồn', () => zoneDone(1)],
  ['Sổ tay Thác ngân hà', 'Ghi đủ sinh vật ở Thác ngân hà', () => zoneDone(2)],
  ['Sổ tay Hồ trăng', 'Ghi đủ sinh vật ở Hồ trăng', () => zoneDone(3)]
);

/* ---------- goals shown in the notebook ---------- */
const GOALS = [];
for (let z = 0; z < 4; z++) {
  GOALS.push({ g:'zone', id:'zt5-' + z,  t:'Ở ' + ZN[z] + ' 5 phút',  cur:() => S.zt[z]/60, goal:5,  r:1 });
  GOALS.push({ g:'zone', id:'zt30-' + z, t:'Ở ' + ZN[z] + ' 30 phút', cur:() => S.zt[z]/60, goal:30, r:3 });
  GOALS.push({ g:'zone', id:'zw-' + z,   t:'Ghi đủ sinh vật ở ' + ZN[z], r:4,
    cur:() => WL.filter(w => w.z === z && S.codex.includes(w.id)).length, goal:Math.max(1, WL.filter(w => w.z === z).length) });
}
SP2.forEach((s, i) => [5, 15].forEach((g, j) => GOALS.push({ g:'sp', id:'sp2-' + s.id + '-' + g, t:s.i + ' ' + s.n + ' đạt cấp ' + g, cur:() => lv(i), goal:g, r:j + 2 })));
PET.forEach((p, i) => GOALS.push({ g:'sp', id:'sp-' + i, t:p.i + ' ' + p.n + ' đạt cấp 5', cur:() => S.pet[i] | 0, goal:5, r:1 }));
const GN = { zone:'🧭 Mục tiêu theo khu vực', sp:'🐾 Mục tiêu theo loài' };
function goalTick() {
  let n = 0, sum = 0;
  GOALS.forEach(g => { if (!S.gl.includes(g.id) && g.cur() >= g.goal) { S.gl.push(g.id); const v = Math.max(500, cps()*600*g.r); add(v); n++; sum += v; if (n <= 2) toast('🎯 ' + g.t + ' · +' + fm(v)); } });
  if (n > 2) toast('🎯 Hoàn thành ' + n + ' mục tiêu · +' + fm(sum));
}
function nbHTML() {
  const used = placed(), cap = HL[S.hl-1].slots, nx = HL[S.hl];
  let h = `<div class="nb-h">🏡 Ngôi nhà · cấp ${S.hl}/5 · ${HL[S.hl-1].n}</div>
    <div class="ac on" style="display:block"><div style="display:flex;justify-content:space-between;gap:8px"><b style="color:var(--gold)">Chỗ đặt đồ ${used}/${cap}</b><span>+${(S.hl-1)*8}% sản lượng</span></div>
    <div class="ach-prog-bg"><div class="ach-prog-fill" style="width:${Math.min(100, used/cap*100)}%"></div></div>
    <small>${nx ? 'Cấp tiếp: ' + nx.n + ' · ' + nx.slots + ' chỗ · ✦ ' + fm(nx.c) : 'Đã đạt cấp tối đa'}</small></div>`;
  h += `<div class="nb-h">🐾 Bạn rừng mới · ${S.pet2.filter(v => v > 0).length}/${SP2.length}</div><div class="sp-grid">`;
  SP2.forEach((s, i) => { const on = lv(i) > 0;
    h += `<div class="ac ${on ? 'on' : ''}"><span class="ac-ic">${on ? s.i : '❔'}</span><div class="ac-info"><b>${on ? s.n : 'Chưa gặp'}</b><small>${on ? 'Cấp ' + lv(i) : 'Mở khóa ở tab Bạn rừng'}</small></div></div>`; });
  h += '</div>';
  ['zone', 'sp'].forEach(grp => {
    const gs = GOALS.filter(g => g.g === grp);
    h += `<div class="nb-h">${GN[grp]} · ${gs.filter(g => S.gl.includes(g.id)).length}/${gs.length}</div>`;
    gs.forEach(g => { const c = Math.min(g.goal, g.cur()), ok = S.gl.includes(g.id);
      h += `<div class="ac ${ok ? 'on' : ''}" style="display:block"><div style="display:flex;justify-content:space-between;gap:8px"><b>${g.t}</b><span>${ok ? '✓' : Math.floor(c) + '/' + g.goal}</span></div>
        <div class="ach-prog-bg"><div class="ach-prog-fill" style="width:${c/g.goal*100}%"></div></div></div>`; });
  });
  return h;
}
const _rn = renderNb;
renderNb = function () {
  _rn.apply(this, arguments);
  const nb = $q('#nb'); if (!nb) return;
  let el = nb.querySelector('#v7nb'); if (!el) { el = document.createElement('div'); el.id = 'v7nb'; el._h = ''; nb.appendChild(el); }
  const h = nbHTML(); if (el._h !== h) { el._h = h; el.innerHTML = h; }
};
const _ui = ui;
ui = function () {
  _ui.apply(this, arguments);
  try {
    const nx = HL[S.hl], b = hr.b.querySelector('b');
    if (b) b.textContent = 'Nhà cấp ' + S.hl + '/5 · ' + HL[S.hl-1].n;
    hr.d.textContent = (nx ? 'Lên "' + nx.n + '": ' + nx.slots + ' chỗ đặt đồ · ' + nx.d + ' · +8% sản lượng' : 'Cấp tối đa · ' + HL[4].d) + ' · Đang dùng ' + placed() + '/' + HL[S.hl-1].slots + ' chỗ';
    hr.c.textContent = 'Cấp ' + S.hl; hr.p.textContent = nx ? '✦ ' + fm(nx.c) : 'MAX'; hr.b.classList.toggle('ok', !!nx && S.l >= nx.c);
    hrow.forEach((r, i) => { const full = !S.home[i] && placed() >= HL[S.hl-1].slots; r.b.classList.toggle('locked', full); if (full && !r.d.textContent.includes('🔒')) r.d.textContent += ' · 🔒 Nhà hết chỗ'; });
    sprow.forEach((r, i) => { const b = calcBulk(SP2[i].c, 1.7, lv(i), buyMode); r.c.textContent = 'Cấp ' + lv(i) + (b.count > 1 ? ' → ' + (lv(i) + b.count) : ''); r.p.textContent = '✦ ' + fm(b.total); r.b.classList.toggle('ok', S.l >= b.total); });
    goalTick();
  } catch (e) { console.warn('[v7 ui]', e); }
};

/* ---------- companions II: drawing ---------- */
const rr = (a, b, w, h, r) => { x.beginPath(); x.roundRect ? x.roundRect(a, b, w, h, r) : x.rect(a, b, w, h); };
function dBee(u, t, e) {
  const s = u*.5, f = Math.sin(t/16 + e.ph);
  x.rotate(Math.sin(t/260 + e.ph)*.12);
  x.fillStyle = 'rgba(214,240,255,.55)'; x.strokeStyle = 'rgba(255,255,255,.6)'; x.lineWidth = .6;
  for (const k of [-1, 1]) { x.save(); x.translate(-s*.1, -s*.35); x.rotate(k*(.5 + f*.45) - .5); x.beginPath(); x.ellipse(0, -s*.55, s*.22, s*.62, 0, 0, 7); x.fill(); x.stroke(); x.restore(); }
  const g = x.createLinearGradient(0, -s*.5, 0, s*.5); g.addColorStop(0, '#ffe58f'); g.addColorStop(1, '#d9942a');
  x.fillStyle = g; x.beginPath(); x.ellipse(-s*.15, 0, s*.78, s*.5, 0, 0, 7); x.fill();
  x.save(); x.beginPath(); x.ellipse(-s*.15, 0, s*.78, s*.5, 0, 0, 7); x.clip(); x.fillStyle = '#3b2410'; for (let i = 0; i < 3; i++) x.fillRect(-s*.62 + i*s*.34, -s*.6, s*.14, s*1.2); x.restore();
  x.fillStyle = '#4a2f14'; x.beginPath(); x.arc(s*.62, -s*.02, s*.36, 0, 7); x.fill();
  x.fillStyle = '#101010'; x.beginPath(); x.arc(s*.76, -s*.1, s*.09, 0, 7); x.fill();
  x.strokeStyle = '#3b2410'; x.lineWidth = 1; x.beginPath(); x.moveTo(s*.78, -s*.22); x.quadraticCurveTo(s*1, -s*.6, s*1.12, -s*.5); x.stroke();
  x.globalCompositeOperation = 'lighter'; glow('w', -s*.9, s*.05, s*1.7, .7 + .25*Math.sin(t/120 + e.ph)); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
}
function dBat(u, t, e) {
  const fl = Math.sin(t/95 + e.ph), s = u*.62;
  x.rotate(Math.sin(t/400 + e.ph)*.1);
  const wing = k => { x.save(); x.scale(k, 1); x.translate(s*.08, -s*.1); x.rotate(-.35 + fl*.7);
    x.fillStyle = '#2a1f47'; x.strokeStyle = '#8f7cd6'; x.lineWidth = .8; x.beginPath(); x.moveTo(0, 0);
    x.quadraticCurveTo(s*.6, -s*.7, s*1.55, -s*.35); x.quadraticCurveTo(s*1.3, -s*.1, s*1.18, s*.25); x.quadraticCurveTo(s*.95, s*.02, s*.74, s*.34); x.quadraticCurveTo(s*.48, s*.08, s*.28, s*.4); x.quadraticCurveTo(s*.12, s*.2, 0, s*.18); x.closePath(); x.fill(); x.stroke();
    x.beginPath(); x.moveTo(0, 0); x.lineTo(s*1.55, -s*.35); x.moveTo(0, 0); x.lineTo(s*1.18, s*.25); x.moveTo(0, 0); x.lineTo(s*.74, s*.34); x.stroke(); x.restore(); };
  wing(1); wing(-1);
  x.fillStyle = '#3a2c63'; x.beginPath(); x.ellipse(0, s*.06, s*.3, s*.42, 0, 0, 7); x.fill(); x.beginPath(); x.arc(0, -s*.36, s*.24, 0, 7); x.fill();
  x.beginPath(); x.moveTo(-s*.2, -s*.5); x.lineTo(-s*.14, -s*.82); x.lineTo(-s*.02, -s*.55); x.moveTo(s*.2, -s*.5); x.lineTo(s*.14, -s*.82); x.lineTo(s*.02, -s*.55); x.fill();
  x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(-s*.09, -s*.38, s*.04, 0, 7); x.arc(s*.09, -s*.38, s*.04, 0, 7); x.fill();
}
function dFrog(u, t, e) {
  const s = u*.6, sac = e.sac || 0, hop = e.hop || 0;
  x.translate(0, -hop*s*.9);
  x.fillStyle = '#2f9e68'; x.strokeStyle = '#176b47'; x.lineWidth = 1;
  x.beginPath(); x.ellipse(-s*.5, -s*.16, s*.36, s*.2, -.4, 0, 7); x.fill(); x.stroke(); x.beginPath(); x.ellipse(-s*.9, -s*.04, s*.34, s*.09, 0, 0, 7); x.fill();
  const g = x.createLinearGradient(0, -s, 0, 0); g.addColorStop(0, '#7ff0a8'); g.addColorStop(1, '#238a5f'); x.fillStyle = g;
  x.beginPath(); x.ellipse(0, -s*.46, s*.78, s*.5, 0, 0, 7); x.fill();
  x.fillStyle = '#d8ffd2'; x.beginPath(); x.ellipse(s*.4, -s*.2, s*(.3 + .2*sac), s*(.14 + .22*sac), 0, 0, 7); x.fill();
  x.fillStyle = 'rgba(20,90,60,.45)'; for (const [a, b, r] of [[-.2,-.7,.1],[.1,-.78,.08],[-.45,-.55,.07]]) { x.beginPath(); x.arc(a*s*1.4, b*s, r*s, 0, 7); x.fill(); }
  for (const ex of [.28, .55]) { x.fillStyle = '#8cf4b0'; x.beginPath(); x.arc(s*ex, -s*.95, s*.2, 0, 7); x.fill(); x.fillStyle = '#ffd45e'; x.beginPath(); x.arc(s*ex + s*.03, -s*.95, s*.13, 0, 7); x.fill();
    x.fillStyle = '#111'; x.beginPath(); x.ellipse(s*ex + s*.04, -s*.95, s*.035, s*.1, 0, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(s*ex + s*.07, -s*.99, s*.025, 0, 7); x.fill(); }
  x.fillStyle = '#2f9e68'; x.beginPath(); x.ellipse(s*.5, -s*.08, s*.15, s*.12, 0, 0, 7); x.fill();
  x.strokeStyle = 'rgba(200,230,255,.35)'; x.lineWidth = 1; x.beginPath(); x.ellipse(0, -s*.46, s*.78, s*.5, 0, Math.PI*1.15, Math.PI*1.75); x.stroke();
}
function dLark(u, t, e) {
  const s = u*.55, sing = e.sing || 0;
  x.translate(0, Math.sin(t/260 + e.ph)*s*.03);
  x.fillStyle = '#7a5a3c'; x.beginPath(); x.moveTo(-s*.45, -s*.5); x.lineTo(-s*1.2, -s*.3); x.lineTo(-s*1.15, -s*.15); x.lineTo(-s*.45, -s*.35); x.fill();
  x.strokeStyle = '#caa27a'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(-s*.08, -s*.15); x.lineTo(-s*.08, 0); x.moveTo(s*.1, -s*.15); x.lineTo(s*.1, 0); x.stroke();
  const g = x.createLinearGradient(0, -s*1.1, 0, -s*.1); g.addColorStop(0, '#a37c54'); g.addColorStop(.6, '#8a6644'); g.addColorStop(1, '#f0dcc0');
  x.fillStyle = g; x.beginPath(); x.ellipse(0, -s*.5, s*.55, s*.4, -.2, 0, 7); x.fill();
  x.strokeStyle = 'rgba(110,78,50,.55)'; x.lineWidth = 1; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(s*(.1 + i*.1), -s*.4); x.lineTo(s*(.12 + i*.1), -s*.25); x.stroke(); }
  x.fillStyle = '#6d4f33'; x.beginPath(); x.ellipse(-s*.12, -s*.55, s*.36, s*.2, -.3, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,230,190,.35)'; x.beginPath(); x.moveTo(-s*.4, -s*.5); x.lineTo(s*.1, -s*.6); x.moveTo(-s*.38, -s*.44); x.lineTo(s*.08, -s*.53); x.stroke();
  x.fillStyle = '#a37c54'; x.beginPath(); x.arc(s*.38, -s*.82, s*.27, 0, 7); x.fill();
  x.beginPath(); x.moveTo(s*.2, -s); x.lineTo(s*.08, -s*1.24); x.lineTo(s*.3, -s*1.05); x.fill();
  x.fillStyle = '#f0a24a'; x.beginPath(); x.moveTo(s*.58, -s*.88); x.lineTo(s*.88, -s*(.82 + .1*sing)); x.lineTo(s*.58, -s*.8); x.fill();
  if (sing) { x.beginPath(); x.moveTo(s*.58, -s*.8); x.lineTo(s*.84, -s*.7); x.lineTo(s*.58, -s*.76); x.fill(); }
  x.fillStyle = '#111'; x.beginPath(); x.arc(s*.46, -s*.86, s*.04, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(s*.47, -s*.875, s*.015, 0, 7); x.fill();
}
function dKoi(u, t, e) {
  const s = u*.9, w = Math.sin(t/220 + e.ph);
  x.fillStyle = 'rgba(255,170,90,.8)'; x.beginPath(); x.moveTo(-s*.7, 0); x.quadraticCurveTo(-s*1.05, -s*(.35 + w*.12), -s*1.25, -s*(.4 + w*.25)); x.quadraticCurveTo(-s, w*s*.05, -s*1.25, s*(.4 - w*.25)); x.quadraticCurveTo(-s*1.05, s*(.35 - w*.12), -s*.7, 0); x.fill();
  const g = x.createLinearGradient(0, -s*.3, 0, s*.3); g.addColorStop(0, '#fff6e8'); g.addColorStop(1, '#ffcfa0'); x.fillStyle = g;
  x.beginPath(); x.moveTo(s*.75, 0); x.quadraticCurveTo(s*.3, -s*.38, -s*.4, -s*.22 + w*s*.03); x.quadraticCurveTo(-s*.75, -s*.05, -s*.75, 0); x.quadraticCurveTo(-s*.75, s*.08, -s*.4, s*.22 - w*s*.03); x.quadraticCurveTo(s*.3, s*.38, s*.75, 0); x.fill();
  x.save(); x.clip(); x.fillStyle = '#ff7a2e'; x.beginPath(); x.ellipse(-s*.05, -s*.1, s*.3, s*.18, .2, 0, 7); x.fill(); x.fillStyle = '#d44b2a'; x.beginPath(); x.ellipse(s*.45, -s*.05, s*.14, s*.12, 0, 0, 7); x.fill();
  x.fillStyle = 'rgba(60,60,80,.5)'; x.beginPath(); x.ellipse(-s*.35, s*.08, s*.12, s*.07, 0, 0, 7); x.fill(); x.restore();
  x.fillStyle = 'rgba(255,190,120,.7)'; x.beginPath(); x.moveTo(s*.1, s*.15); x.quadraticCurveTo(-s*.1, s*.5 + w*s*.05, -s*.3, s*.3); x.fill(); x.beginPath(); x.moveTo(s*.2, -s*.28); x.quadraticCurveTo(-s*.1, -s*.55, -s*.45, -s*.22); x.fill();
  x.fillStyle = '#111'; x.beginPath(); x.arc(s*.55, -s*.08, s*.04, 0, 7); x.fill();
  x.globalCompositeOperation = 'lighter'; glow('w', -s*.1, -s*.05, s*1.8, .18); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
}
function dBear(u, t, e) {
  const s = u*1.15, g = e.walk ? Math.sin(t/230 + e.ph) : 0, dig = e.dig || 0;
  x.fillStyle = '#3c2a1c'; for (const [lx, ph] of [[-.5, 1], [.42, -1]]) { rr(s*lx - s*.12, -s*.45, s*.24, s*.45 + g*ph*s*.04, s*.08); x.fill(); }
  const gr = x.createLinearGradient(0, -s*1.2, 0, -s*.2); gr.addColorStop(0, '#74513a'); gr.addColorStop(1, '#4a3123'); x.fillStyle = gr;
  x.beginPath(); x.moveTo(-s*.85, -s*.45); x.quadraticCurveTo(-s*.9, -s, -s*.35, -s*1.12); x.quadraticCurveTo(s*.1, -s*1.28, s*.5, -s); x.quadraticCurveTo(s*.82, -s*.7, s*.7, -s*.4); x.quadraticCurveTo(0, -s*.25, -s*.85, -s*.45); x.fill();
  for (const [lx, ph] of [[-.6, -1], [.5, 1]]) { x.fillStyle = '#4f3523'; rr(s*lx - s*.14, -s*.5, s*.28, s*.5 + g*ph*s*.05, s*.09); x.fill(); x.fillStyle = '#2e1f15'; x.fillRect(s*lx - s*.14, -s*.04, s*.28, s*.04); }
  x.save(); x.translate(s*.62, -s*.82 + dig*s*.35); x.rotate(dig*.55);
  x.fillStyle = '#664630'; x.beginPath(); x.ellipse(0, 0, s*.3, s*.26, 0, 0, 7); x.fill(); x.fillStyle = '#8a6446'; x.beginPath(); x.ellipse(s*.22, s*.07, s*.17, s*.12, 0, 0, 7); x.fill();
  x.fillStyle = '#161012'; x.beginPath(); x.ellipse(s*.36, s*.04, s*.045, s*.035, 0, 0, 7); x.fill(); x.fillStyle = '#664630'; x.beginPath(); x.arc(-s*.12, -s*.22, s*.1, 0, 7); x.arc(s*.1, -s*.24, s*.1, 0, 7); x.fill();
  x.fillStyle = '#111'; x.beginPath(); x.arc(s*.12, -s*.05, s*.035, 0, 7); x.fill(); x.restore();
  x.strokeStyle = 'rgba(190,215,255,.3)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(-s*.3, -s*1.12); x.quadraticCurveTo(s*.1, -s*1.28, s*.5, -s); x.stroke();
}
function dWolf(u, t, e) {
  const s = u*1.05, h = e.howl || 0, br = Math.sin(t/900)*s*.012;
  x.fillStyle = '#1a2540'; x.beginPath(); x.moveTo(-s*1.1, 0); x.quadraticCurveTo(-s*.9, -s*.5, -s*.3, -s*.55); x.quadraticCurveTo(s*.4, -s*.62, s*.9, -s*.3); x.quadraticCurveTo(s*1.1, -s*.1, s*1.15, 0); x.fill();
  x.strokeStyle = 'rgba(170,200,255,.25)'; x.lineWidth = 1; x.beginPath(); x.moveTo(-s*.3, -s*.55); x.quadraticCurveTo(s*.4, -s*.62, s*.9, -s*.3); x.stroke();
  x.translate(0, -s*.55);
  x.strokeStyle = '#8e9bb8'; x.lineWidth = s*.22; x.lineCap = 'round'; x.beginPath(); x.moveTo(-s*.45, -s*.1); x.quadraticCurveTo(-s*.95, s*.1, -s*.8, s*.38); x.stroke();
  const g = x.createLinearGradient(0, -s*1.1, 0, 0); g.addColorStop(0, '#c3cde4'); g.addColorStop(1, '#6c7893'); x.fillStyle = g;
  x.beginPath(); x.moveTo(-s*.5, 0); x.quadraticCurveTo(-s*.55, -s*.55 + br, -s*.15, -s*.95); x.quadraticCurveTo(s*.05, -s*1.05, s*.18, -s*.9); x.quadraticCurveTo(s*.32, -s*.5, s*.3, 0); x.closePath(); x.fill();
  x.fillStyle = '#aab5cf'; x.fillRect(s*.12, -s*.45, s*.14, s*.45); x.fillStyle = '#e8edf8'; x.beginPath(); x.ellipse(s*.2, -s*.62, s*.12, s*.22, .1, 0, 7); x.fill();
  x.save(); x.translate(s*.08, -s*.98); x.rotate(-h*.85);
  x.fillStyle = '#aeb9d2'; x.beginPath(); x.ellipse(0, -s*.05, s*.22, s*.18, 0, 0, 7); x.fill();
  x.fillStyle = '#c9d2e6'; x.beginPath(); x.moveTo(s*.1, -s*.14); x.lineTo(s*.5, -s*(.1 + h*.06)); x.lineTo(s*.5, -s*.02); x.lineTo(s*.1, s*.05); x.fill();
  if (h > .3) { x.fillStyle = '#2a1520'; x.beginPath(); x.moveTo(s*.28, -s*.07); x.lineTo(s*.5, -s*.12); x.lineTo(s*.5, s*.02); x.fill(); }
  x.fillStyle = '#8e9bb8'; x.beginPath(); x.moveTo(-s*.1, -s*.18); x.lineTo(-s*.08, -s*.45); x.lineTo(s*.08, -s*.2); x.fill();
  x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(s*.08, -s*.1, s*.035, 0, 7); x.fill(); x.restore();
}
const DRAW = [dBee, dBat, dFrog, dLark, dKoi, dBear, dWolf];

/* ---------- companions II: behaviour (each species does a real job in the scene) ---------- */
const E = SP2.map((s, i) => ({ on:0, u:0, v:0, fl:1, ph:i*1.7, st:'idle', tm:1 + i, cool:0, tu:0, tv:0 }));
const vis = wx => !inside && wx - cam > -60 && wx - cam < W + 60;
const say = (wx, wy, txt, col) => { const ok = vis(wx); pushParticles({ k:'t', x:ok ? wx - cam : W*.5, y:ok ? wy - 30 : H*.3, text:txt, col, life:1.2 }); };
const sparks = (wx, wy, c, n) => { if (!vis(wx)) return; for (let i = 0; i < n; i++) pushParticles({ k:'s', c, x:wx - cam, y:wy, vx:(Math.random() - .5)*120, vy:-Math.random()*110, life:1 }); };
const rand = (a, b) => a + Math.random()*(b - a);
function go(e, tu, tv, sp, dt) {          // move toward (tu in W units, tv in H units); returns remaining pixels
  const dx = (tu - e.u)*W, dy = (tv - e.v)*H, d = Math.hypot(dx, dy) || 1, st = Math.min(d, sp*dt);
  e.u += dx/d*st/W; e.v += dy/d*st/H; if (Math.abs(dx) > 2) e.fl = dx < 0 ? -1 : 1; return d - st;
}
const GY = wx => H*.885 + (typeof bridgeY === 'function' ? bridgeY(wx) : 0);
function spawn(i) {
  const e = E[i];
  [() => { e.u = rand(.3, 1.2); e.v = .8; e.st = 'hover'; e.tm = 1; },
   () => { e.u = rand(.3, 1.2); e.v = .3; e.st = 'fly'; e.tm = 5; e.tu = e.u; e.tv = e.v; },
   () => { e.u = 3.14; e.v = .875; },
   () => { e.u = .6; e.v = .515; },
   () => { e.u = 3.4; e.v = .9; e.a = rand(0, 6.28); },
   () => { e.u = 1.5; e.v = .885; e.st = 'walk'; e.tu = 1.5; e.tm = 2; },
   () => { e.u = 2.08; e.v = .86; e.tm = 12; }][i]();
}
function tick(t, dt) {
  const cp = cps(), now = Date.now();
  for (let i = 0; i < 7; i++) {
    const e = E[i], L = lv(i); if (!L) { e.on = 0; continue; } if (!e.on) { e.on = 1; spawn(i); }
    e.tm -= dt; e.cool -= dt; const X = e.u*W, Y = e.v*H;
    if (i === 0) {                                                         // 🐝 pollinates flowers
      if (e.st === 'fly') { if (go(e, e.tu, e.tv, H*.9, dt) < 8) { e.st = 'hover'; e.tm = 1.1; } e.v += Math.sin(t/90 + e.ph)*.0012; }
      else { e.v += Math.sin(t/260 + e.ph)*.0004;
        if (e.tm <= 0) { if (e.cool <= 0) { const v = cp*6*L; add(v); e.cool = 6/(1 + .15*L); say(X, Y, '🐝 +' + fm(v), '#ffe17a'); sparks(X, Y, 'g', 8); if (vis(X)) chime(11 + (Math.random()*3|0), .06, .8); }
          e.tu = clamp((cam/W) + rand(-.1, 1.1), .1, 3.9); e.tv = rand(.78, .86); e.st = 'fly'; } }
    } else if (i === 1) {                                                  // 🦇 sonar buff
      if (go(e, e.tu, e.tv, H*.55, dt) < 10 || e.tm <= 0) { e.tu = clamp(cam/W + rand(-.05, 1.05), .05, 3.95); e.tv = rand(.18, .42); e.tm = 4; }
      e.v += Math.sin(t/230 + e.ph)*.0016;
      if (e.cool <= 0) { e.cool = 14; R.sonar = now + 10000; R.ring.push({ u:e.u, v:e.v, r:0 }); say(X, Y, '🦇 Sóng siêu âm ×1.25', '#b9a7ff'); }
    } else if (i === 2) {                                                  // 🐸 croaks, hunts raindrops
      e.sac = Math.max(0, (e.sac || 0) - dt*1.4); e.hop = Math.max(0, (e.hop || 0) - dt*3);
      if (e.tm <= 0) { e.tm = rand(4.5, 8); e.sac = 1; if (vis(X)) { chime(2, .05, .9); setTimeout(() => chime(1, .04, .9), 160); }
        if (S.wth === 1) { const v = cp*8*L; add(v); say(X, Y, '🐸 +' + fm(v), '#7affb2'); sparks(X, Y - 20, 'c', 8); e.hop = 1; } }
    } else if (i === 3) {                                                  // 🐦 sings on the roof ridge
      e.sing = Math.max(0, (e.sing || 0) - dt*.5);
      if (e.tm <= 0) { e.tm = rand(11, 17); e.sing = 1; comboTimer = Math.max(comboTimer, 5);
        say(X, Y - 10, '♪ giữ combo', '#ffe9a0'); if (vis(X)) arp([4, 7, 9, 12, 9], .07); }
      if (e.sing > .2 && Math.random() < dt*4) pushParticles({ k:'t', x:vis(X) ? X - cam + 24 : -99, y:Y - 34 - Math.random()*14, text:'♪', col:'#ffe9a0', life:1 });
    } else if (i === 4) {                                                  // 🐟 swims, leaps, drops star
      if (e.st !== 'leap') { e.a += dt*.55; e.u = 3.4 + Math.cos(e.a)*.24; e.v = .905 + Math.sin(e.a)*.022; e.fl = Math.sin(e.a) > 0 ? -1 : 1;
        if (e.tm <= 0) { e.st = 'leap'; e.tm = .95; e.lu = e.u; } }
      else { const q = 1 - e.tm/.95; e.u = e.lu + (e.fl > 0 ? 1 : -1)*q*.06; e.v = .905 - Math.sin(q*Math.PI)*.12; e.rot = (e.fl > 0 ? -1 : 1)*(q - .5)*1.6;
        if (e.tm <= 0) { e.st = 'swim'; e.tm = 22/(1 + .1*L); e.rot = 0; const v = cp*12*L; add(v); say(e.u*W, e.v*H, '🐟 +' + fm(v), '#ffd45e'); if (vis(e.u*W)) { pushParticles({ k:'r', x:e.u*W - cam, y:e.v*H + 4, life:1 }); sparks(e.u*W, e.v*H, 'g', 10); chime(9, .06, 1); } } }
    } else if (i === 5) {                                                  // 🐻 forages honey & mushrooms
      e.walkNow = 0; e.dig = Math.max(0, (e.dig || 0) - dt*(e.st === 'dig' ? -.9 : 1));
      if (e.st === 'walk') { e.walkNow = 1; if (go(e, e.tu, e.v, H*.06, dt) < 4) { e.st = 'dig'; e.tm = 3; } }
      else if (e.st === 'dig') { e.dig = Math.min(1, (e.dig || 0) + dt*1.4); if (e.tm <= 0) { if (e.cool <= 0) { const v = cp*40*L; add(v); e.cool = 20/(1 + .1*L); say(X + 30, Y - 30, '🍯 +' + fm(v), '#ffcf6a'); sparks(X + 30, Y - 20, 'g', 12); } e.st = 'walk'; e.tu = rand(1.15, 1.9); if (Math.abs(e.tu*W - pl.x) < W*.22) e.tu = clamp(e.tu + (e.tu*W < pl.x ? -.32 : .32), 1.1, 1.95); } }
    } else if (i === 6) {                                                  // 🐺 howls at the moon
      e.howl = e.howl || 0; e.cool = e.cool || 0;
      if (e.st === 'howl') { e.howl = Math.min(1, e.howl + dt*1.6); if (e.tm <= 0) { e.st = 'idle'; e.tm = 50/(1 + .08*L); } }
      else { e.howl = Math.max(0, e.howl - dt*1.2); if (e.tm <= 0) { e.st = 'howl'; e.tm = 4; R.moon = now + 15000; R.flash = 1; say(X, Y - 40, '🐺 Trăng sáng ×1.35', '#cfe3ff'); } }
    }
  }
  if (R.flash > 0) R.flash = Math.max(0, R.flash - dt*.5);
  R.ring.forEach(r => r.r += dt*H*.42); R.ring = R.ring.filter(r => r.r < H*.55);
}
function drawAll(t) {
  if (inside) return;
  for (let i = 0; i < 7; i++) {
    const e = E[i]; if (!e.on) continue; const X = e.u*W - cam; if (X < -140 || X > W + 140) continue;
    let Y = e.v*H; if (i === 5 || i === 6) Y = GY(e.u*W) - (i === 6 ? H*.02 : 0);
    x.save(); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.translate(X, Y);
    if (i === 5 || i === 2 || i === 6 || i === 3) { x.fillStyle = 'rgba(3,7,17,.3)'; x.beginPath(); x.ellipse(0, i === 3 ? H*.02 : 3, H*.045, H*.01, 0, 0, 7); x.fill(); }
    const K = [.46, .56, .55, .6, .5, .8, .82][i]; x.scale((e.fl || 1)*K, K); if (e.rot) x.rotate(e.rot);
    if (i === 3) x.translate(0, H*.012);
    { const _tr = tierOf(S.pet2[i] | 0), _col = ['#ffd35a','#b9a6ff','#7affb2','#ffe9a8','#ffb78a','#e6b98a','#bfe0ff'][i], _fl = (i === 0 || i === 1 || i === 3);
      if (_tr >= 2) x.scale(1 + .04*(_tr - 1), 1 + .04*(_tr - 1));
      evoBack(x, _col, _tr, H*.075, t, i, _fl); DRAW[i](H*.075, t, e); evoFront(x, _col, _tr, H*.075, t, i, _fl); }
    x.restore();
  }
  if (R.ring.length) { x.save(); x.lineWidth = 1.6; R.ring.forEach(r => { x.strokeStyle = 'rgba(185,167,255,' + (.6*(1 - r.r/(H*.55))) + ')'; x.beginPath(); x.ellipse(r.u*W - cam, r.v*H, r.r*1.2, r.r*.7, 0, 0, 7); x.stroke(); }); x.restore(); }
  if (R.flash > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow('m', W*.74, H*.16, W*.9, .5*R.flash); x.restore(); x.globalAlpha = 1; }
}

/* ---------- house exterior by level (drawn on top of the cabin, in world space) ---------- */
function houseExtras(t, gy) {
  const L = S.hl | 0; if (L < 2) return;
  const X = W*.62, y = gy + H*.145, w = cabW(), h = H*.14;
  if (X < cam - w*2.2 || X > cam + W + w*2.2) return;
  x.save(); x.translate(X, y); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
  { // L2 woodshed (right): lean-to roof, stacked logs, swinging lantern
    const sx = w*.47, sw = w*.36, sh = h*.7;
    x.fillStyle = '#24160e'; x.fillRect(sx, -sh, sw, sh);
    x.fillStyle = '#4a2f1c'; x.fillRect(sx - 1, -sh - 3, 5, sh + 3); x.fillRect(sx + sw - 4, -sh - 3, 5, sh + 3);
    const g = x.createLinearGradient(0, -sh - h*.22, 0, -sh); g.addColorStop(0, '#5f3d28'); g.addColorStop(1, '#3a2418'); x.fillStyle = g;
    x.beginPath(); x.moveTo(sx - 8, -sh + 4); x.lineTo(sx + 4, -sh - h*.22); x.lineTo(sx + sw + 9, -sh - h*.12); x.lineTo(sx + sw + 9, -sh + 3); x.closePath(); x.fill();
    x.strokeStyle = 'rgba(235,190,126,.32)'; x.beginPath(); x.moveTo(sx + 4, -sh - h*.22); x.lineTo(sx + sw + 9, -sh - h*.12); x.stroke();
    for (let r = 0; r < 4; r++) { const n = r % 2 ? 4 : 5, step = (sw - 14)/n;
      for (let c = 0; c < n; c++) { const lx = sx + 9 + c*step + (r % 2 ? step/2 : 0), ly = -6 - r*h*.13, rad = h*.058;
        x.fillStyle = '#6d4a2d'; x.beginPath(); x.arc(lx, ly, rad, 0, 7); x.fill(); x.fillStyle = '#c79a64'; x.beginPath(); x.arc(lx, ly, rad*.72, 0, 7); x.fill();
        x.strokeStyle = 'rgba(90,55,30,.7)'; x.lineWidth = .8; x.beginPath(); x.arc(lx, ly, rad*.4, 0, 7); x.stroke(); } }
    const lx0 = sx + sw*.5, sw2 = Math.sin(t/700)*2; x.strokeStyle = '#2a1a10'; x.lineWidth = 1; x.beginPath(); x.moveTo(lx0, -sh - h*.17); x.lineTo(lx0 + sw2, -sh + h*.08); x.stroke();
    x.fillStyle = '#ffb35a'; x.fillRect(lx0 + sw2 - 4, -sh + h*.08, 8, 11);
    x.globalCompositeOperation = 'lighter'; glow('w', lx0 + sw2, -sh + h*.14, h*.9, .6); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
  }
  if (L >= 3) { // greenhouse (left)
    const gw = w*.4, gx = -w*.47 - gw, gh = h*.72;
    x.fillStyle = '#1d2a30'; x.fillRect(gx, -h*.14, gw, h*.14);
    const gg = x.createLinearGradient(0, -gh - h*.2, 0, 0); gg.addColorStop(0, 'rgba(170,225,240,.22)'); gg.addColorStop(1, 'rgba(110,200,190,.10)'); x.fillStyle = gg;
    x.beginPath(); x.moveTo(gx, -h*.14); x.lineTo(gx, -gh); x.lineTo(gx + gw*.5, -gh - h*.2); x.lineTo(gx + gw, -gh); x.lineTo(gx + gw, -h*.14); x.closePath(); x.fill();
    x.strokeStyle = '#2f7a52'; x.lineWidth = 2; for (let k = 0; k < 5; k++) { const px = gx + gw*(.14 + k*.18); x.beginPath(); x.moveTo(px, -h*.14); x.quadraticCurveTo(px - 6, -h*.36, px + 4, -h*(.42 + (k % 3)*.06)); x.stroke(); }
    x.globalCompositeOperation = 'lighter'; for (let k = 0; k < 5; k++) glow(k % 2 ? 'c' : 'w', gx + gw*(.14 + k*.18), -h*(.34 + (k % 3)*.07), h*.5, .5 + .2*Math.sin(t/500 + k)); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
    x.strokeStyle = 'rgba(215,240,245,.6)'; x.lineWidth = 1.3; x.beginPath(); x.moveTo(gx, -h*.14); x.lineTo(gx, -gh); x.lineTo(gx + gw*.5, -gh - h*.2); x.lineTo(gx + gw, -gh); x.lineTo(gx + gw, -h*.14); x.closePath();
    x.moveTo(gx + gw*.5, -gh - h*.2); x.lineTo(gx + gw*.5, -h*.14); x.moveTo(gx, -h*.45); x.lineTo(gx + gw, -h*.45); x.stroke();
  }
  if (L >= 4) { // garden arch + lamp posts
    for (const side of [-1, 1]) { const px = side*w*.2, py = h*.34;
      x.fillStyle = '#2a1c14'; x.fillRect(px - 2, py - h*.5, 4, h*.5);
      x.fillStyle = '#ffd47a'; x.fillRect(px - 5, py - h*.62, 10, 13);
      x.globalCompositeOperation = 'lighter'; glow('w', px, py - h*.55, h*.9, .55 + .1*Math.sin(t/300 + side)); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1; }
    const ax = -w*.78, ay = h*.34;
    x.strokeStyle = '#6d4a2d'; x.lineWidth = 3; x.beginPath(); x.moveTo(ax - w*.07, ay); x.lineTo(ax - w*.07, ay - h*.55); x.quadraticCurveTo(ax, ay - h*.8, ax + w*.07, ay - h*.55); x.lineTo(ax + w*.07, ay); x.stroke();
    x.strokeStyle = '#3f9a62'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(ax - w*.07, ay - h*.1); for (let k = 1; k <= 8; k++) x.lineTo(ax - w*.07 + k*w*.0175, ay - h*(.4 + .35*Math.sin(k/8*Math.PI) + .04*Math.sin(k*2.4))); x.stroke();
    x.globalCompositeOperation = 'lighter'; for (let k = 0; k < 4; k++) glow('p', ax - w*.05 + k*w*.033, ay - h*(.56 + .12*Math.sin(k*1.7)), 12, .55 + .3*Math.sin(t/400 + k)); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
  }
  if (L >= 5) { // observatory tower (far left)
    const tx = w*1.32, tw = w*.2, th = h*2.1;
    const tg = x.createLinearGradient(tx - tw/2, 0, tx + tw/2, 0); tg.addColorStop(0, '#2b3550'); tg.addColorStop(.6, '#3c4a6c'); tg.addColorStop(1, '#202a42'); x.fillStyle = tg; x.fillRect(tx - tw/2, -th, tw, th);
    x.strokeStyle = 'rgba(160,185,230,.18)'; x.lineWidth = 1; for (let k = 1; k < 9; k++) { x.beginPath(); x.moveTo(tx - tw/2, -th*k/9); x.lineTo(tx + tw/2, -th*k/9); x.stroke(); }
    x.fillStyle = '#ffe3a0'; x.fillRect(tx - 4, -th*.55, 8, 14); x.fillRect(tx - 4, -th*.3, 8, 14);
    x.fillStyle = '#4a5c86'; x.beginPath(); x.ellipse(tx, -th, tw*.62, tw*.32, 0, Math.PI, 0); x.fill();
    x.fillStyle = '#12182c'; x.save(); x.translate(tx, -th - tw*.12); x.rotate(-.5 + Math.sin(t/3000)*.08); x.fillRect(0, -tw*.08, tw*.9, tw*.12); x.restore();
    x.globalCompositeOperation = 'lighter'; glow('c', tx, -th - tw*.4, tw*2.4, .35 + .12*Math.sin(t/500)); glow('w', tx, -th*.5, tw*2, .25); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
  }
  x.restore();
}
const _cabin = cabin; cabin = function (t, gy) { _cabin.apply(this, arguments); try { houseExtras(t, gy); } catch (e) { console.warn('[v7 house]', e); } };

/* ---------- main hook ---------- */
const _draw = draw;
draw = function (t, dt) {
  _draw.apply(this, arguments);
  try { const d = Math.min(.1, dt || .016); S.zt[currentZone()] += d; tick(t, d); drawAll(t); } catch (e) { console.warn('[v7]', e); }
};
window.__v7 = { E, SP2, HL, GOALS, R };
})();


