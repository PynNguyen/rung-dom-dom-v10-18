
try{['info','warn','debug','error','log'].forEach(k=>{if(typeof console[k]!=='function')console[k]=function(){};});}catch(_){}


const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ============ DATA ============ */
const G = [
  { n:'Đom đóm lạc lối', i:'✨', c:15, p:.1, d:'Bay lượn và để lại vệt sáng ấm áp' },
  { n:'Đèn lồng giấy', i:'🏮', c:100, p:1, d:'Treo dọc lối mòn dẫn lối trong đêm' },
  { n:'Hoa dạ quang', i:'🌸', c:1100, p:8, d:'Nở rộ dưới ánh trăng, tỏa phấn sáng' },
  { n:'Suối ánh trăng', i:'🌊', c:12000, p:47, d:'Gọi Cực Quang và dòng nước ánh bạc' },
  { n:'Cây linh hồn', i:'🌳', c:130000, p:260, d:'Cội nguồn cổ thụ canh giữ khu rừng' },
  { n:'Cổng sao băng', i:'🌠', c:1400000, p:1400, d:'Vòng xoáy không gian bên Hồ Trăng' },
  { n:'Nấm phát quang', i:'🍄', c:15000000, p:7800, d:'Mọc khắp nền rừng, tỏa ánh tím lam' },
  { n:'Pha lê tinh tú', i:'💎', c:200000000, p:44000, d:'Kết tinh ánh sao rơi, rực sáng trong đêm' }
];
const PET = [
  { n:'Mèo rừng', i:'🐈‍⬛', c:600, d:'Rình và tự vồ đom đóm (x6 ánh sáng chạm)' },
  { n:'Cáo lửa', i:'🦊', c:30000, d:'Tự săn sao rơi, +10% sản lượng mỗi cấp' },
  { n:'Cú đêm', i:'🦉', c:700000, d:'Canh gác, +25% sản lượng mỗi cấp' },
  { n:'Sóc nhỏ', i:'🐿️', c:5000000, d:'Nhanh nhẹn, +15% ánh sáng chạm mỗi cấp' },
  { n:'Nhím gai', i:'🦔', c:20000000, d:'Chăm chỉ, +20% sản lượng vắng mặt' },
  { n:'Rùa cổ', i:'🐢', c:100000000, d:'Trường thọ, +30% sản lượng mỗi cấp' },
  { n:'Hươu sao', i:'🦌', c:250000000, d:'Ban phước khu rừng, tăng thưởng sự kiện' },
  { n:'Thỏ tuyết', i:'🐇', c:600000000, d:'Tìm vật phẩm ẩn trong các cảnh quan' },
  { n:'Bướm tinh tú', i:'🦋', c:1500000000, d:'Tạo quầng sáng và tăng sức mạnh chạm' },
  { n:'Rái cá suối', i:'🦦', c:4000000000, d:'Bạn đồng hành của Thác Ngân Hà' },
  { n:'Hạc trăng', i:'🪽', c:12000000000, d:'Tăng phần thưởng khi khám phá Hồ Trăng' },
  { n:'Rồng mầm', i:'🐉', c:50000000000, d:'Sinh vật hiếm, cộng hưởng với mọi phép màu' }
];
const HM = [
  { n:'Lò sưởi đá', i:'🔥', c:2000, d:'+15% sản lượng/cấp · Chạm để sưởi' },
  { n:'Giường lông vũ', i:'🛏️', c:8000, d:'Tăng thu hoạch vắng mặt & ngủ (+15%/cấp)' },
  { n:'Giá sách cổ', i:'📚', c:40000, d:'+20% ánh sáng chạm · Chạm để đọc' },
  { n:'Đèn chùm nến', i:'🕯️', c:150000, d:'+10% Tinh Hoa nhận được khi Trăng Tròn' },
  { n:'Tranh phong cảnh', i:'🖼️', c:400000, d:'+10% sản lượng mỗi cấp' },
  { n:'Bàn trà gỗ', i:'☕', c:1000000, d:'+15% ánh sáng chạm mỗi cấp' },
  { n:'Thảm dệt', i:'🧶', c:2500000, d:'+20% sản lượng vắng mặt' },
  { n:'Bình pha lê', i:'🏺', c:6000000, d:'+10% Tinh Hoa mỗi cấp' },
  { n:'Đồng hồ cổ', i:'🕰️', c:12000000, d:'+12% sản lượng mỗi cấp' },
  { n:'Chậu dương xỉ sáng', i:'🪴', c:30000000, d:'+25% ánh sáng chạm mỗi cấp' },
  { n:'Đàn piano đêm', i:'🎹', c:100000000, d:'+20% sản lượng mỗi cấp · tự đàn nhạc' }
];

let S = {
  l:0, own:[0,0,0,0,0,0,0,0], tap:0, m:Date.now(), snd:1, hint:1,
  tot:0, run:0, ess:0, ach:[], caught:0, pet:[0,0,0,0,0,0], home:[0,0,0,0,0,0,0,0],
  buff:0, nextSleep:0, wth:0, codex:[], q:[], qn:0, taps:0, sleeps:0, reads:0, gold:0, gbuff:0, hits:0
};
try { Object.assign(S, JSON.parse(localStorage.getItem('rdd5') || '{}')); } catch(e){}
while (S.own.length < G.length) S.own.push(0);
while (S.pet.length < PET.length) S.pet.push(0);
while (S.home.length < HM.length) S.home.push(0);

let buyMode = 1, combo = 1, comboTimer = 0, tapCount = 0;

const fm = n => {
  if (!isFinite(n)) return '∞';
  if (n < 1e3) return Math.floor(n).toString();
  const u = ['K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc'], o = n;
  let i = -1;
  while (n >= 1e3 && i < u.length - 1) { n /= 1e3; i++; }
  if (n >= 1e3) return o.toExponential(2).replace('e+', 'e');
  return n.toFixed(n < 10 ? 2 : n < 100 ? 1 : 0) + u[i];
};
const fp = n => n < 10 ? n.toFixed(1) : fm(n);

const mult = () =>
  (1 + .1 * S.ess) * (1 + .05 * S.ach.length) * (1 + .25 * S.pet[2]) *
  (1 + .1 * S.pet[1]) * (1 + .15 * S.home[0]) * (1 + .3 * S.pet[5]) * (1 + .1 * S.home[4]) *
  (Date.now() < S.buff ? 1.5 : 1) * extraMult();

// Core zone/weather factors live in the original economy formulas (no window-level overrides).
const currentZone = () => inside ? 0 : Math.max(0, Math.min(3, Math.round((cam || 0) / Math.max(1, W))));
const zoneCpsFactor = () => {
  const z = currentZone(); let f = 1;
  if (z === 0) f *= 1 + .03 * (S.home || []).reduce((a,v)=>a+v,0); // cozy interior synergy
  if (z === 1) f *= 1.20;                                           // spirit forest
  if (z === 2) f *= 1.08;                                           // galaxy waterfall ambient production
  if (z === 3) f *= 1.08;                                           // moon lake essence resonance
  if (S.wth === 1 && z === 1) f *= 1.5;                            // rain nourishes flora
  if (S.wth === 1 && z === 0) f *= 1.15;                            // rain ambience indoors
  const ix = S.artisanIX || {};
  if ((ix.pets || []).includes('otter') && (S.own || [])[3] > 0) f *= 1.15; // moon-stream synergy
  const now = Date.now();
  if (S.petBuffs) for (const until of Object.values(S.petBuffs)) if (Number(until) > now) { f *= 1.25; break; }
  return f;
};
const cps = () => G.reduce((a, g, i) => a + g.p * S.own[i], 0) * mult() * zoneCpsFactor() * (window.__RDD_PET_SUPPORT?.production || 1) * (window.__RDD_PET_SUPPORT?.nightVision || 1) * (window.__RDD_PET_SUPPORT?.flora || 1) * (window.__RDD_PET_SUPPORT?.waterGather || 1) * (window.__RDD_PET_SUPPORT?.spiritGuard || 1) * (1 + .10 * (((S.expansion||{}).skill||{}).weather||0) * (S.wth ? 1 : 0));
const tapPow = () => {
  let f = 1;
  if (S.wth === 2) f *= 10/6; // fairy dust: x10 instead of x6
  if (currentZone() === 2) f *= 1.25; // waterfall strengthens touch
  return (1 + S.tap * S.tap + cps() * .025 * S.tap) * (1 + .2 * S.home[2]) * (1 + .15 * S.pet[3]) * (1 + .15 * S.home[5]) * (1 + .25 * S.home[9]) * combo * f * (window.__RDD_TOUCH_BONUS || 1) * (window.__RDD_PET_SUPPORT?.touch || 1) * (window.__RDD_PET_SUPPORT?.forestLuck || 1);
};
const gainE = () => Math.floor(Math.sqrt(S.run / 2e5) * (1 + .1 * S.home[3] + .1 * S.home[7]));

function calcBulk(base, rate, lvl, mode) {
  let count = mode === 'max' || mode === 'next' ? 0 : mode, total = 0;
  if (mode === 'max' || mode === 'next') {
    const limit = mode === 'next' ? Math.max(1, (Math.floor(lvl / 10) + 1) * 10 - lvl) : 100;
    let c = Math.ceil(base * Math.pow(rate, lvl)), avail = S.l;
    while (avail >= c && count < limit) {
      avail -= c; total += c; count++;
      c = Math.ceil(base * Math.pow(rate, lvl + count));
    }
    if (count === 0) { count = 1; total = Math.ceil(base * Math.pow(rate, lvl)); }
  } else {
    for (let k = 0; k < count; k++) total += Math.ceil(base * Math.pow(rate, lvl + k));
  }
  return { count, total };
}

const AC = [
  ['Đốm sáng đầu tiên', 'Thu thập 100 ánh sáng', () => S.tot >= 100],
  ['Khu rừng thức giấc', 'Thu thập 10.000 ánh sáng', () => S.tot >= 1e4],
  ['Rực rỡ như ban ngày', 'Thu thập 1M ánh sáng', () => S.tot >= 1e6],
  ['Biển ánh sáng', 'Thu thập 100M ánh sáng', () => S.tot >= 1e8],
  ['Mười đom đóm', 'Sở hữu 10 Đom đóm lạc lối', () => S.own[0] >= 10],
  ['Đủ tám kỳ quan', 'Mở khóa cả 8 phép màu', () => S.own.every(n => n > 0)],
  ['Bàn tay vàng', 'Chạm Rực rỡ lên cấp 5', () => S.tap >= 5],
  ['Lần đầu Trăng Tròn', 'Nhận Tinh Hoa từ Trăng Tròn', () => S.ess > 0],
  ['Thợ săn sao', 'Bắt 10 ngôi sao băng', () => S.caught >= 10],
  ['Bạn đồng hành', 'Làm quen một bạn rừng', () => S.pet.some(n => n > 0)],
  ['Gia đình khu rừng', 'Có đủ 6 bạn rừng', () => S.pet.every(n => n > 0)],
  ['Chủ nhân ngôi nhà', 'Sắm món nội thất đầu tiên', () => S.home.some(n => n > 0)],
  ['Tổ ấm hoàn thiện', 'Hoàn thiện toàn bộ nội thất', () => S.home.every(n => n > 0)],
  ['Người giữ lửa', 'Nâng tổng cấp nội thất lên 10', () => S.home.reduce((a,b)=>a+b,0) >= 10],
  ['Kiến trúc sư rừng', 'Nâng tổng cấp nội thất lên 30', () => S.home.reduce((a,b)=>a+b,0) >= 30],
  ['Dinh thự dưới trăng', 'Nâng tổng cấp nội thất lên 60', () => S.home.reduce((a,b)=>a+b,0) >= 60],
  ['Bậc thầy phép màu', 'Đạt tổng 50 cấp phép màu', () => S.own.reduce((a,b)=>a+b,0) >= 50],
  ['Kẻ gọi tinh tú', 'Đạt tổng 150 cấp phép màu', () => S.own.reduce((a,b)=>a+b,0) >= 150],
  ['Hội bạn rừng', 'Sở hữu 3 bạn rừng khác nhau', () => S.pet.filter(n=>n>0).length >= 3],
  ['Đại hội muôn loài', 'Sở hữu 6 bạn rừng khác nhau', () => S.pet.filter(n=>n>0).length >= 6],
  ['Người bảo hộ sinh linh', 'Sở hữu 12 bạn rừng khác nhau', () => S.pet.filter(n=>n>0).length >= 12],
  ['Ánh sáng vạn năm', 'Thu thập tổng cộng 1 tỷ ánh sáng', () => S.tot >= 1e9],
  ['Dòng chảy bất tận', 'Thu thập tổng cộng 1 nghìn tỷ ánh sáng', () => S.tot >= 1e12],
  ['Người lang thang', 'Ghé thăm đủ bốn cảnh quan', () => (S.codex||[]).includes('visited-all-zones')],
  ['Thợ săn đom đóm vàng', 'Bắt 25 đom đóm vàng', () => S.gold >= 25],
  ['Người kiên trì', 'Chạm màn hình 1.000 lần', () => S.taps >= 1000],
  ['Người kể chuyện', 'Đọc sách 10 lần', () => S.reads >= 10],
  ['Giấc ngủ an lành', 'Ngủ 10 lần trong tổ ấm', () => S.sleeps >= 10],
  ['Bậc thầy combo', 'Đạt combo chạm từ x5 trở lên', () => combo >= 5],
  ['Nhà sưu tầm', 'Mở khóa toàn bộ phép màu và bạn rừng', () => S.own.every(n=>n>0) && S.pet.every(n=>n>0)]
];

/* V8.5 TIMER AUDIT: intervals are intentionally not blanket-merged. Save cadence, audio scheduling, mini-game clocks, idle economy and achievement checks have different lifecycles; migrate individually with cleanup guards. */
/* ============ AUDIO ============ */
let A = null, master, delay, lastC = 0;
const PENT = [0, 2, 4, 7, 9];
const freq = n => 220 * Math.pow(2, (PENT[n % 5] + 12 * Math.floor(n / 5)) / 12);

function initAudio() {
  if (A) { if (A.state === 'suspended') A.resume(); return; }
  try { A = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){ return; }
  master = A.createGain(); master.gain.value = S.snd ? .8 : 0; master.connect(A.destination);
  delay = A.createDelay(); delay.delayTime.value = .36;
  const fb = A.createGain(); fb.gain.value = .42; delay.connect(fb); fb.connect(delay);
  const wet = A.createGain(); wet.gain.value = .45; delay.connect(wet); wet.connect(master);
  const lp = A.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 560;
  const pg = A.createGain(); pg.gain.value = .06; lp.connect(pg); pg.connect(master);
  [110, 164.81, 220, 329.63].forEach((f, i) => {
    const o = A.createOscillator(); o.type = i % 2 ? 'sine' : 'triangle';
    o.frequency.value = f; o.detune.value = (i - 1.5) * 6; o.connect(lp); o.start();
  });
  const lfo = A.createOscillator(); lfo.frequency.value = .06;
  const lg = A.createGain(); lg.gain.value = 260; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
  const nb = A.createBuffer(1, A.sampleRate * 2, A.sampleRate), d = nb.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const ns = A.createBufferSource(); ns.buffer = nb; ns.loop = true;
  const bp = A.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 460; bp.Q.value = .7;
  const wg = A.createGain(); wg.gain.value = .028; ns.connect(bp); bp.connect(wg); wg.connect(master); ns.start();
  cricket(); ambient();
}
function chime(n, v = .15, len = 1.4) {
  if (!A || !S.snd || Date.now() - lastC < 55) return;
  lastC = Date.now(); const t = A.currentTime;
  [[1, 1], [2.01, .22], [3.5, .07]].forEach(([m, k]) => {
    const o = A.createOscillator(), g = A.createGain();
    o.type = 'sine'; o.frequency.value = freq(n) * m;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v * k, t + .008);
    g.gain.exponentialRampToValueAtTime(.0008, t + len / (m > 1 ? 1.6 : 1));
    o.connect(g); g.connect(master); g.connect(delay); o.start(t); o.stop(t + len + .1);
  });
}
function arp(a, v = .13) { a.forEach((n, i) => setTimeout(() => chime(n, v, 1.2), i * 80)); }
function blip() {
  if (!A || !S.snd) return;
  const t = A.currentTime, o = A.createOscillator(), g = A.createGain();
  o.type = 'triangle'; o.frequency.setValueAtTime(170, t);
  o.frequency.exponentialRampToValueAtTime(105, t + .14);
  g.gain.setValueAtTime(.11, t); g.gain.exponentialRampToValueAtTime(.001, t + .16);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + .18);
}
function cricket() {
  if (A && S.snd && A.state === 'running') {
    const t = A.currentTime, f = 4000 + Math.random() * 500;
    for (let i = 0; i < 3; i++) {
      const o = A.createOscillator(), g = A.createGain(); o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * .07);
      g.gain.linearRampToValueAtTime(.01, t + i * .07 + .01);
      g.gain.linearRampToValueAtTime(0, t + i * .07 + .05);
      o.connect(g); g.connect(master); o.start(t + i * .07); o.stop(t + i * .07 + .06);
    }
  }
  setTimeout(cricket, 2200 + Math.random() * 3500);
}
const CH = [[220,261.63,329.63,440],[174.61,220,261.63,349.23],[261.63,329.63,392,523.25],[196,246.94,293.66,392]];
const MEL = [440, 523.25, 587.33, 659.25, 783.99, 880], PAT = [0,1,2,3,2,1,2,1];
let mstep = 0;
function tone(f, v, len, at = 0, type = 'sine') {
  const t = A.currentTime + at, o = A.createOscillator(), g = A.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + Math.min(.05, len / 4));
  g.gain.exponentialRampToValueAtTime(.0008, t + len);
  o.connect(g); g.connect(master); g.connect(delay); o.start(t); o.stop(t + len + .1);
}
function ambient() {
  if (A && S.snd && A.state === 'running') {
    const c = CH[(mstep >> 3) % 4], i = mstep % 8;
    if (i === 0) c.slice(0, 3).forEach(f => tone(f / 2, .03, 5));
    if (Math.random() < .78) tone(c[PAT[i]] * (i % 4 === 3 ? 2 : 1), .042, 1.6, 0, 'triangle');
    if ((i === 0 || i === 4) && Math.random() < .65) tone(MEL[Math.random() * MEL.length | 0], .042, 2.2, .02);
    mstep++;
  }
  setTimeout(ambient, 640);
}

/* ============ CANVAS ============ */
const cv = $('#cv');
const x = cv.getContext('2d');
let W = 0, H = 0;

const mkGlow = rgb => {
  const c = document.createElement('canvas'); c.width = c.height = 96;
  const g = c.getContext('2d'), r = g.createRadialGradient(48, 48, 0, 48, 48, 48);
  r.addColorStop(0, 'rgba(255,255,255,1)');
  r.addColorStop(.16, `rgba(${rgb},.9)`);
  r.addColorStop(.45, `rgba(${rgb},.28)`);
  r.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = r; g.fillRect(0, 0, 96, 96); return c;
};
const SP = {
  w: mkGlow('255,215,105'), p: mkGlow('255,130,210'), c: mkGlow('95,235,255'),
  v: mkGlow('180,130,255'), m: mkGlow('195,220,255'), g: mkGlow('115,255,175'),
  f: mkGlow('255,135,55')
};
const glow = (s, px, py, sz, a = 1) => {
  if (a <= .008 || sz <= 0 || !SP[s]) return;
  x.globalAlpha = Math.min(1, a);
  x.drawImage(SP[s], px - sz / 2, py - sz / 2, sz, sz);
};

let moonSprite = null;
function buildMoonSprite() {
  const sz = 240, r = 90, cx = 120, cy = 120;
  const c = document.createElement('canvas'); c.width = c.height = sz;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(cx - r * .25, cy - r * .25, r * .1, cx, cy, r);
  grad.addColorStop(0, '#fffef8'); grad.addColorStop(.65, '#f2ecda');
  grad.addColorStop(.92, '#d5ccb4'); grad.addColorStop(1, '#b5ab94');
  g.fillStyle = grad; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill();
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.clip();
  const maria = [
    [-.28,-.22,.38,.28,.4,.14],[.12,-.32,.32,.22,-.3,.12],[-.38,.15,.35,.25,.2,.11],
    [.25,.08,.28,.32,.5,.13],[.02,-.05,.25,.22,0,.10],[-.1,.38,.42,.18,-.2,.08]
  ];
  maria.forEach(([ox,oy,rx,ry,rot,al]) => {
    const mg = g.createRadialGradient(cx+ox*r, cy+oy*r, 2, cx+ox*r, cy+oy*r, Math.max(rx,ry)*r);
    mg.addColorStop(0, `rgba(115,122,138,${al})`);
    mg.addColorStop(.6, `rgba(125,130,142,${al*.6})`);
    mg.addColorStop(1, 'rgba(125,130,142,0)');
    g.fillStyle = mg;
    g.save(); g.translate(cx+ox*r, cy+oy*r); g.rotate(rot);
    g.beginPath(); g.ellipse(0, 0, rx*r, ry*r, 0, 0, Math.PI*2); g.fill(); g.restore();
  });
  [[-.15,.28,.09],[.35,-.18,.07],[-.42,-.08,.06],[.18,.42,.08]].forEach(([ox,oy,cr]) => {
    const px = cx+ox*r, py = cy+oy*r, rad = cr*r;
    g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 1.5;
    g.beginPath(); g.arc(px, py, rad, -2.5, .5); g.stroke();
    g.fillStyle = 'rgba(100,105,115,.12)';
    g.beginPath(); g.arc(px, py, rad*.9, 0, Math.PI*2); g.fill();
  });
  g.restore(); moonSprite = c;
}
buildMoonSprite();

const stars = Array.from({ length: 160 }, () => ({
  x: Math.random(), y: Math.random() * .56,
  r: Math.random() * 1.6 + .4, sp: Math.random() * 2 + .4,
  ph: Math.random() * 6.28,
  col: ['#fff','#ffe9c4','#d4e4ff'][Math.floor(Math.random()*3)]
}));

const clouds = Array.from({ length: 5 }, () => ({
  x: Math.random(), y: Math.random() * .3 + .05,
  s: .5 + Math.random() * .8, sp: .001 + Math.random() * .002
}));

const weatherDrops = Array.from({ length: 75 }, () => ({
  x: Math.random(), y: Math.random(),
  s: .65 + Math.random() * .75, ph: Math.random() * 6.28
}));

const AMBIENT = Array.from({ length: 34 }, () => ({
  x: Math.random(), y: Math.random(),
  r: .5 + Math.random() * 1.8,
  vx: -.15 + Math.random() * .3,
  vy: -.1 + Math.random() * .2,
  ph: Math.random() * 6.28,
  kind: Math.floor(Math.random() * 3)
}));

let F = [], P = [], ST = [];
// Reuse short-lived Canvas particle records to reduce garbage collection pressure.
const PARTICLE_POOL = [];
function pushParticles(...specs) {
  for (const spec of specs) {
    const particle = PARTICLE_POOL.pop() || {};
    for (const key in particle) delete particle[key];
    Object.assign(particle, spec);
    P.push(particle);
  }
}
function recycleParticle(particle) {
  if (PARTICLE_POOL.length < 360) PARTICLE_POOL.push(particle);
}
let ev = 0, nextEv = Date.now() + 55000, nextDrop = 0, nextStar = Date.now() + 18000;
let wind = 0, bgC = null;
let cam = 0, camT = 0, inside = false, fade = 0, sl = 0;
let shake = { x: 0, y: 0, mag: 0 };
const addShake = m => { shake.mag = Math.max(shake.mag, m); };

let pl = { x: -1, ix: -1, dir: 1, ph: 0, vx: 0, tx: null, act: '', pose: '', sit: 0, mood: '', moodT: 0, emo: '', onBridge: 0, jump: 0 };
let cp = { p: -1, f: null, got: 0, tx: 0, ty: 0 };
let petT = [0, 0, 0, 0, 0, 0];
const PET_VIS = { cat: null, fox: null, owl: null };

const add = v => { S.l += v; S.tot += v; S.run += v; };
function setMood(emo, dur = 3.2) { pl.mood = emo; pl.moodT = dur; }

function burst(n, px = W / 2, py = H * .5) {
  for (let i = 0; i < n; i++) {
    pushParticles({
      k:'s', c:['w','c','p'][i%3],
      x: px + (Math.random()-.5)*80, y: py + (Math.random()-.5)*60,
      vx:(Math.random()-.5)*240, vy:-Math.random()*220-30,
      life:1, rot: Math.random()*6.28, vrot:(Math.random()-.5)*8, size:1
    });
  }
  pushParticles({ k:'r', x:px, y:py, life:1 });
}

var OFF = 0;
// Conservative startup profile: phones and constrained devices avoid the expensive
// high-DPI + full post-processing path until the user/device proves it can sustain it.
const RDD_MOBILE = matchMedia('(max-width: 760px), (pointer: coarse)').matches;
const RDD_LOW_MEMORY = Number(navigator.deviceMemory || 0) > 0 && Number(navigator.deviceMemory) <= 4;
const RDD_SAVE_DATA = !!(navigator.connection && navigator.connection.saveData);
const RDD_MIN_PERF = (RDD_MOBILE || RDD_LOW_MEMORY || RDD_SAVE_DATA) ? 1 : 0;
// Keep the Canvas backing store at >= 1x to avoid upscaling blur.
// Reduce effect counts and frame rate before sacrificing spatial resolution.
var perfLvl = RDD_MIN_PERF ? 1 : 0;
window.DPRCAP = [1.5, 1.25, 1.0][perfLvl];
function size() {
  const r = Element.prototype.getBoundingClientRect.call(cv.parentElement);
  const d = Math.min(devicePixelRatio || 1, window.DPRCAP || 1.75);
  W = r.width; window.RW_REAL = W; H = r.height; OFF = 0;
  // Portrait screens used to cap the world at 1.2x width and paint the leftover
  // height as empty starfield. Keep the full playable height on phones.
  // Only letterbox extreme panoramic layouts, not tall mobile viewports.
  if (H > W*1.65) { OFF = H - W*1.65; H = W*1.65; }
  cv.width = W * d; cv.height = (H + OFF) * d;
  x.setTransform(d, 0, 0, d, 0, 0);
  bgC = null;
}
addEventListener('resize', size); size();

function syncF() {
  const n = Math.min(perfLvl >= 2 ? 18 : perfLvl >= 1 ? 32 : 72, 6 + S.own[0] + Math.floor(S.own[1]/2) + Math.floor(S.own[2]/2) + S.own[3]*2);
  const cols = ['w','w','g','c','p'];
  while (F.length < n) {
    F.push({
      x: Math.random()*W, y: H*.24 + Math.random()*H*.54,
      a: Math.random()*6.28, s: .25 + Math.random()*.55,
      ph: Math.random()*6.28, c: cols[F.length%cols.length],
      tr: [], trHead: 0, vx: 0, vy: 0
    });
  }
  while (F.length > n) F.pop();
}

/* ============ REALISTIC TREES (Organic Canopy) ============ */
let TR_BG = null, TR_FG = null;
const rnd = (() => { let s = 4096; return () => (s = (s*16807)%2147483647)/2147483647; })();

function mkTR() {
  TR_BG = []; TR_FG = [];
  for (let i = 0; i < 82; i++) {
    const px = rnd()*4, d = rnd(), k = rnd()*3|0, seed = rnd()*100;
    if (px>.38 && px<.86 && d>.22) continue;
    if (px>1.35 && px<1.65 && d>.25) continue;
    if (px>2.12 && px<2.88) continue;
    if (px>3.22 && px<3.82 && d>.20) continue;
    const item = { px, d, k, seed };
    if (d < .62) TR_BG.push(item); else TR_FG.push(item);
  }
  TR_BG.sort((a,b) => a.d - b.d);
  TR_FG.sort((a,b) => a.d - b.d);
}

/* Legacy per-frame tree painters removed: the cached drawTreeSprite pipeline below is authoritative. */
function drawTreeItem(a, t, gy) {
  const X = a.px*W, y = gy + H*(.015 + .21*a.d);
  const h = H*(.18 + .32*a.d)*(a.k === 0 ? 1.15 : 1);
  if (X < cam - h || X > cam + W + h) return;
  if (a.k === 0) drawRealisticPine(X, y, h, t, a.d, a.seed);
  else if (a.k === 1) drawRealisticOak(X, y, h, t, a.d, a.seed);
  else drawRealisticBirch(X, y, h, t, a.d, a.seed);
}

/* Phase 5.2 visual integration (retained in Phase 5.3): scenic panorama extracted from the approved art direction.
   Embedded as data so the game remains a single portable HTML file. */
window.__RDD_BUILD_VERSION = 'Phase 5.56 — Forest Renderer Coordinate and Canopy Fix';
/* Phase 5.10–5.11: native world renderers remain the source of truth; no static panorama overlay. */

/* ============ MOUNTAINS ============ */
function scenery(t, gy) {
  // Guard against zero-sized canvases during startup, resize, or hidden-tab transitions.
  // Canvas dimensions are integer-coerced by the browser, so validate the backing store itself.
  if (!Number.isFinite(W) || !Number.isFinite(H) || W < 2 || H < 2) return;
  if (!bgC || bgC.__w !== W || bgC.__h !== H || bgC.width < 1 || bgC.height < 1) {
    const d = Math.min(window.devicePixelRatio || 1, window.DPRCAP || 1.1);
    const targetW = Math.max(2, Math.ceil(W * 1.8 * d));
    const targetH = Math.max(2, Math.ceil(H * d));
    bgC = document.createElement('canvas');
    bgC.width = targetW; bgC.height = targetH;
    bgC.__w = W; bgC.__h = H;
    const w0 = W; W = w0*1.8;
    const g = bgC.getContext('2d');
    if (!g) { W = w0; bgC = null; return; }
    g.setTransform(d, 0, 0, d, 0, 0);
    const rh = (n) => { const v = Math.sin(n*127.1)*43758.5453; return v - Math.floor(v); };
    const rf = (u, sd) => { let a = 1, f = 1, v = 0, nn = 0;
      for (let o = 0; o < 6; o++) { v += a*(1 - Math.abs(Math.sin(u*f + sd*(o+1)*1.7 + o*2.3))); nn += a; a *= .52; f *= 2.05; }
      return v/nn; };
    const layers = [
      { off:.30, amp:.17, cTop:'#2c3f7c', cBot:'#0e1838', rim:'rgba(196,222,255,.38)', sp:1.2, f:.0036, snow:.55 },
      { off:.20, amp:.14, cTop:'#1c2b5c', cBot:'#0a1230', rim:'rgba(160,196,248,.26)', sp:2.6, f:.0060, snow:.30 },
      { off:.105, amp:.095, cTop:'#0f1a40', cBot:'#060c20', rim:'rgba(128,170,232,.17)', sp:4.1, f:.0095, snow:0 }
    ];
    layers.forEach((L, li) => {
      const y0 = gy - H*L.off, top = y0 - H*L.amp*1.45;
      const gr = g.createLinearGradient(0, top, 0, gy);
      gr.addColorStop(0, L.cTop); gr.addColorStop(1, L.cBot);
      g.fillStyle = gr; g.beginPath();
      const pts = [];
      for (let i = 0; i <= W + 8; i += 4) {
        const py = y0 - H*L.amp*(.12 + 1.3*Math.pow(rf(i*L.f, L.sp), 1.35));
        pts.push([i, py]);
        i === 0 ? g.moveTo(i, py) : g.lineTo(i, py);
      }
      g.strokeStyle = L.rim; g.lineWidth = 1.2; g.stroke();
      g.lineTo(W, gy + 2); g.lineTo(0, gy + 2); g.closePath(); g.fill();
      g.save(); g.clip();
      if (L.snow) {                                   // moonlit snow only on the tallest crowns
        const sh = H*L.amp*L.snow, sg = g.createLinearGradient(0, top, 0, top + sh);
        sg.addColorStop(0, 'rgba(228,240,255,.66)'); sg.addColorStop(.55, 'rgba(190,214,255,.20)'); sg.addColorStop(1, 'rgba(190,214,255,0)');
        g.fillStyle = sg; g.fillRect(0, top, W, sh + 2);
      }
      for (let j = 2; j < pts.length - 2; j++) {      // faceted slopes: moon on the right lights right-facing sides
        const dy = pts[j+1][1] - pts[j-1][1];
        if (Math.abs(dy) < 1.4) continue;
        const dep = H*(.035 + .05*rh(j*1.7 + li));
        g.fillStyle = dy > 0 ? 'rgba(150,188,248,.05)' : 'rgba(2,6,20,.10)';
        g.beginPath(); g.moveTo(pts[j-1][0], pts[j-1][1]); g.lineTo(pts[j+1][0], pts[j+1][1]); g.lineTo(pts[j+1][0] - dep*.5, pts[j+1][1] + dep); g.lineTo(pts[j-1][0] - dep*.5, pts[j-1][1] + dep); g.closePath(); g.fill();
      }
      const hz = g.createLinearGradient(0, y0 - H*.06, 0, gy);   // atmospheric haze toward the base
      hz.addColorStop(0, 'rgba(74,100,178,0)'); hz.addColorStop(1, 'rgba(74,100,178,' + (li === 2 ? .05 : .12) + ')');
      g.fillStyle = hz; g.fillRect(0, y0 - H*.06, W, gy - y0 + H*.06);
      g.restore();
      if (li >= 1) {                                  // irregular groves of spruce along the ridge
        g.fillStyle = li === 2 ? '#04091a' : '#09122e';
        for (let i = 0; i < pts.length; i++) {
          const r = rh(i*3.7 + li*11.3);
          if (r < (li === 2 ? .38 : .62)) continue;
          const px = pts[i][0], py = pts[i][1], th = (li === 2 ? 9 : 6) + r*(li === 2 ? 22 : 11), w = th*.34;
          g.beginPath(); g.moveTo(px - w, py + 3);
          g.lineTo(px - w*.4, py - th*.42); g.lineTo(px - w*.72, py - th*.42); g.lineTo(px, py - th);
          g.lineTo(px + w*.72, py - th*.42); g.lineTo(px + w*.4, py - th*.42); g.lineTo(px + w, py + 3); g.fill();
        }
      }
    });
    W = w0;
  }
  x.globalAlpha = 1;
  // A stale or zero-size backing canvas must never reach drawImage.
  if (!bgC || bgC.width < 1 || bgC.height < 1) return;
  x.drawImage(bgC, -cam*.2, 0, W*1.8, H);
  // Phase 5.10: use native layered scenery only; never overlay a static concept panorama.
  for (let k = 0; k < 5; k++) {
    const cx = ((t/(68 + k*18) + k*270) % (W + 420)) - 210;
    x.globalAlpha = .06;
    x.drawImage(SP.m, cx - 180, H*(.12 + k*.065) - 30, 360, 60);
  }
  for (let k = 0; k < 4; k++) {
    x.globalAlpha = .13;
    x.drawImage(SP.m, ((t/(34 + k*9) + k*W*.45) % (W*1.7)) - W*.35,
      gy - H*(.03 + k*.055), W*.95, H*.13);
  }
  x.globalAlpha = 1;
}



/* ============ SPIRIT TREE ============ */
function drawSpiritTree(t, gy, count) {
  if (count <= 0) return;
  const px = W*1.5, by = gy + H*.165, h = H*.64;
  if (px < cam - h || px > cam + W + h) return;
  const sw = wind*h*.012 + Math.sin(t/900)*h*.0025;
  // Keep the magic readable but localized: avoid a giant glow that erases the tree silhouette.
  x.save(); x.globalCompositeOperation = 'lighter';
  glow('c', px, by - h*.48, h*.48, .105 + .025*Math.sin(t/900));
  glow('g', px, by - h*.2, h*.30, .075);
  x.restore();
  // Trunk with a visible taper, subtle bark facets and roots that connect to the ground.
  const tg = x.createLinearGradient(px-h*.12,by-h*.48,px+h*.12,by);
  tg.addColorStop(0,'#203d48'); tg.addColorStop(.42,'#132b36'); tg.addColorStop(1,'#07141e');
  x.fillStyle=tg; x.beginPath();
  x.moveTo(px-h*.16,by+4);
  x.quadraticCurveTo(px-h*.095,by-h*.13,px-h*.055+sw,by-h*.48);
  x.quadraticCurveTo(px,by-h*.52,px+h*.045+sw,by-h*.47);
  x.quadraticCurveTo(px+h*.07,by-h*.16,px+h*.16,by+4);
  x.quadraticCurveTo(px+h*.055,by-h*.015,px,by+2);
  x.quadraticCurveTo(px-h*.075,by+h*.005,px-h*.16,by+4); x.closePath(); x.fill();
  x.strokeStyle='rgba(110,220,218,.22)'; x.lineWidth=Math.max(1,h*.003);
  for(let v=-1;v<=1;v++){
    x.beginPath();x.moveTo(px+v*h*.065,by+1);
    x.quadraticCurveTo(px+v*h*.025+sw,by-h*.22,px+v*h*.025+sw,by-h*.45);x.stroke();
  }
  // Branches visibly connect the trunk to an irregular, broken crown.
  const branches=[[-1,-.46,-.27,-.67],[1,-.44,.28,-.65],[-1,-.38,-.19,-.79],[1,-.38,.14,-.81],[-1,-.31,-.32,-.55],[1,-.3,.33,-.55]];
  x.strokeStyle='#153540';x.lineCap='round';
  branches.forEach(([side,sy,ex,ey],i)=>{
    x.lineWidth=h*(i<2?.018:.012);x.beginPath();x.moveTo(px+sw,by+h*sy);
    x.quadraticCurveTo(px+ex*h*.45+sw,by+h*(sy+ey)*.5,px+ex*h+sw,by+ey*h);x.stroke();
  });
  // Crown silhouette is built from overlapping lobed foliage masses, not smooth circles.
  const canopy=[[-.27,-.54,.155,.88],[-.15,-.68,.17,1.05],[.04,-.63,.19,.83],[.22,-.56,.16,.95],[-.06,-.79,.14,.9],[.14,-.78,.135,1.08],[-.31,-.65,.105,.78],[.31,-.64,.11,.82]];
  canopy.forEach(([dx,dy,r,stretch],ci)=>{
    const cx=px+dx*h+sw*(.2+ci*.08),cy=by+dy*h,rx=r*h,ry=rx*stretch;
    const grad=x.createLinearGradient(cx-rx,cy-ry,cx+rx,cy+ry);
    grad.addColorStop(0,ci%3===0?'#3a7d79':'#27625f');
    grad.addColorStop(.48,ci%2?'#17474c':'#155058');
    grad.addColorStop(1,'#0a2633');
    x.fillStyle=grad;x.beginPath();
    for(let q=0;q<18;q++){
      const a=q*Math.PI/9,noise=.78+.18*Math.sin(q*2.17+ci*1.9)+.07*Math.sin(q*4.1+ci);
      const xx=cx+Math.cos(a)*rx*noise, yy=cy+Math.sin(a)*ry*noise;
      if(q===0)x.moveTo(xx,yy);else {const pa=(q-.5)*Math.PI/9,pr=.82+.13*Math.sin(q*2.17+ci*1.9);x.quadraticCurveTo(cx+Math.cos(pa)*rx*pr,cy+Math.sin(pa)*ry*pr,xx,yy);}
    }
    x.closePath();x.fill();
    // Tapered leaves follow the outer silhouette and overlap like foliage.
    for(let q=0;q<22;q++){
      const a=q/22*Math.PI*2+ci*.29,rr=.72+.22*Math.sin(q*2.31+ci*1.3);
      const lx=cx+Math.cos(a)*rx*rr,ly=cy+Math.sin(a)*ry*rr,lr=rx*(.065+(q%4)*.012);
      x.save();x.translate(lx,ly);x.rotate(a*.45+Math.sin(q+ci)*.18);
      x.fillStyle=q%6===0?'rgba(145,224,170,.82)':q%3===0?'rgba(68,154,135,.9)':'rgba(24,91,94,.94)';
      x.beginPath();x.moveTo(-lr*1.45,0);x.quadraticCurveTo(-lr*.5,-lr*1.05,lr*.35,-lr*.52);x.quadraticCurveTo(lr*1.35,-lr*.05,lr*.62,lr*.42);x.quadraticCurveTo(-lr*.3,lr*.62,-lr*1.45,0);x.fill();
      if(q%5===0){x.strokeStyle='rgba(188,238,184,.3)';x.lineWidth=Math.max(.5,h*.0008);x.beginPath();x.moveTo(-lr,0);x.quadraticCurveTo(0,-lr*.12,lr*.62,-lr*.1);x.stroke();}
      x.restore();
    }
  });
  // Sparse drifting motes stay close to the crown; they no longer wash out the whole tree.
  x.save();x.globalCompositeOperation='lighter';
  const orbs=Math.min(count*2,18);
  for(let k=0;k<orbs;k++){
    const fy=(k*.7548)%1,ww=h*.29*(1-fy*.55);
    const ox=px+(((k*.5698)%1)*2-1)*ww+Math.sin(t/900+k)*3;
    const oy=by-h*(.32+fy*.48)+Math.cos(t/760+k)*2;
    glow(k%3?'c':'g',ox,oy,5+(k%3)*2,.17+.08*Math.sin(t/650+k));
  }
  x.restore();x.globalAlpha=1;
}

/* ============ GROUND + WATER + BRIDGES ============ */
const BRIDGES = [];
function updateBridges() {
  BRIDGES.length = 0;
  // Cầu 1: Thác
  const u = H*0.19/(H - H*0.68);
  const cu = W*(2.5 + .12*Math.sin(u*3.2 + .6) - .1*u);
  const hu = W*(.034 + .082*u + .22*u*u);
  BRIDGES.push({ x0: cu - hu*1.15, x1: cu + hu*1.15, yOff: -H*0.06, type: 'plank' });
  
  // Cầu 2: Hồ (từ bờ W*3.05 đến đảo W*3.75)
  BRIDGES.push({ x0: W*3.0, x1: W*3.95, yOff: -H*0.05, type: 'pier' });
}
function bridgeY(px) {
  for (const b of BRIDGES) if (px >= b.x0 && px <= b.x1) {
    const L = Math.min((b.x1 - b.x0)*.3, Math.max(W*.09, 56)), q = Math.max(0, Math.min(1, Math.min((px - b.x0)/L, (b.x1 - px)/L))), e = q*q*(3 - 2*q);
    return b.yOff*e - H*.008*Math.sin(Math.PI*(px - b.x0)/(b.x1 - b.x0))*e;
  }
  return 0;
}

function drawWater(t, gy) {
  const cx = u => W*(2.5 + .12*Math.sin(u*3.2 + .6) - .1*u);
  const hw = u => W*(.034 + .082*u + .22*u*u);
  const Y = u => gy + (H - gy)*u;

  if (cam > W*1.15 && cam < W*3.15) {
    const wfX = cx(0), wfTop = gy - H*.23;
    
    // Natural rock amphitheatre: uneven ledges and rounded fractured contours,
    // avoiding the large geometric trapezoid that made the waterfall look artificial.
    const cliffG = x.createLinearGradient(wfX-W*.34, wfTop, wfX+W*.3, gy);
    cliffG.addColorStop(0, '#243652'); cliffG.addColorStop(.48, '#17263f'); cliffG.addColorStop(1, '#091525');
    x.fillStyle = cliffG; x.beginPath();
    x.moveTo(wfX-W*.37,gy);
    x.bezierCurveTo(wfX-W*.34,gy-H*.18,wfX-W*.31,wfTop+H*.09,wfX-W*.22,wfTop+H*.055);
    x.quadraticCurveTo(wfX-W*.17,wfTop+H*.025,wfX-W*.145,wfTop+H*.065);
    x.quadraticCurveTo(wfX-W*.09,wfTop+H*.09,wfX-W*.055,wfTop+H*.015);
    x.quadraticCurveTo(wfX-W*.02,wfTop-H*.005,wfX+W*.015,wfTop+H*.018);
    x.quadraticCurveTo(wfX+W*.065,wfTop+H*.075,wfX+W*.11,wfTop+H*.035);
    x.quadraticCurveTo(wfX+W*.16,wfTop+H*.005,wfX+W*.20,wfTop+H*.07);
    x.bezierCurveTo(wfX+W*.28,wfTop+H*.11,wfX+W*.31,gy-H*.16,wfX+W*.37,gy);
    x.closePath(); x.fill();
    // Broken ledges and dark seams give the cliff a readable rocky structure.
    x.strokeStyle='rgba(104,143,177,.22)'; x.lineWidth=Math.max(1,W*.002); x.lineCap='round';
    for(let r=0;r<7;r++){
      const yy=wfTop+H*(.045+r*.026), side=r%2?-1:1, start=wfX+side*W*(.12+r*.018);
      x.beginPath(); x.moveTo(start,yy); x.quadraticCurveTo(start+side*W*.045,yy+H*.014,start+side*W*.09,yy+H*.006); x.stroke();
    }
    // Moss only catches the upper rock lip, not the waterfall curtain itself.
    for(let m=0;m<9;m++){
      const mx=wfX-W*.25+m*W*.061, my=wfTop+H*(.045+(m%3)*.012);
      x.fillStyle=m%2?'rgba(66,124,100,.42)':'rgba(103,151,112,.30)';
      x.beginPath(); x.ellipse(mx,my,W*(.009+(m%3)*.002),H*.004,Math.sin(m)*.12,Math.PI,Math.PI*2); x.fill();
    }

    // PHASE 5.63: establish the landform before animating water.
    // Shallow upstream channel: a distinct basin feeds the lip instead of water
    // appearing from nowhere at the top of the cliff.
    x.save();
    const upper = x.createLinearGradient(0, wfTop-H*.095, 0, wfTop+H*.035);
    upper.addColorStop(0,'rgba(16,43,68,.92)');
    upper.addColorStop(.62,'rgba(34,83,116,.88)');
    upper.addColorStop(1,'rgba(72,133,163,.70)');
    x.fillStyle=upper; x.globalAlpha=.3; x.translate(wfX,0); x.scale(.42,1); x.translate(-wfX,0); x.beginPath();
    x.moveTo(wfX-W*.285,wfTop-H*.072);
    x.bezierCurveTo(wfX-W*.22,wfTop-H*.09,wfX-W*.15,wfTop-H*.052,wfX-W*.095,wfTop-H*.061);
    x.quadraticCurveTo(wfX-W*.035,wfTop-H*.071,wfX+W*.018,wfTop-H*.048);
    x.bezierCurveTo(wfX+W*.095,wfTop-H*.025,wfX+W*.17,wfTop-H*.082,wfX+W*.285,wfTop-H*.052);
    x.lineTo(wfX+W*.285,wfTop+H*.015);
    x.quadraticCurveTo(wfX+W*.13,wfTop+H*.035,wfX+W*.055,wfTop+H*.008);
    x.quadraticCurveTo(wfX-W*.025,wfTop-H*.008,wfX-W*.09,wfTop+H*.018);
    x.bezierCurveTo(wfX-W*.16,wfTop+H*.028,wfX-W*.22,wfTop+H*.004,wfX-W*.285,wfTop+H*.015);
    x.closePath(); x.fill();
    // Rock lip has a broken, uneven edge; a dark undercut gives the drop a real crest.
    x.strokeStyle='rgba(5,17,29,.88)'; x.lineWidth=Math.max(3,W*.008); x.lineCap='round';
    x.beginPath();
    x.moveTo(wfX-W*.105,wfTop+H*.018);
    x.quadraticCurveTo(wfX-W*.064,wfTop+H*.032,wfX-W*.027,wfTop+H*.022);
    x.lineTo(wfX-W*.006,wfTop+H*.031);
    x.quadraticCurveTo(wfX+W*.032,wfTop+H*.041,wfX+W*.055,wfTop+H*.022);
    x.quadraticCurveTo(wfX+W*.079,wfTop+H*.012,wfX+W*.105,wfTop+H*.025);
    x.stroke();
    x.strokeStyle='rgba(119,160,178,.32)'; x.lineWidth=Math.max(1,W*.0015);
    x.beginPath(); x.moveTo(wfX-W*.25,wfTop-H*.025);
    x.quadraticCurveTo(wfX-W*.16,wfTop-H*.035,wfX-W*.09,wfTop-H*.021);
    x.quadraticCurveTo(wfX+W*.015,wfTop-H*.043,wfX+W*.12,wfTop-H*.022);
    x.quadraticCurveTo(wfX+W*.20,wfTop-H*.035,wfX+W*.26,wfTop-H*.018); x.stroke();
    x.restore();

    // PHASE 5.64 — build the surrounding rock mass BEFORE drawing water.
    // Two irregular cliff shoulders frame a recessed gorge; their lower edges
    // disappear behind the pool instead of forming a symmetric triangular frame.
    for (const sd of [-1, 1]) {
      const ex = wfX + sd*W*.074;
      const wall = x.createLinearGradient(ex, wfTop-H*.015, ex+sd*W*.12, gy+H*.01);
      wall.addColorStop(0, '#26364a'); wall.addColorStop(.42, '#1b2b40'); wall.addColorStop(1, '#0b1727');
      x.fillStyle = wall; x.beginPath();
      x.moveTo(ex-sd*W*.018, wfTop-H*.01);
      x.bezierCurveTo(ex+sd*W*.025, wfTop+H*.045, ex+sd*W*.032, wfTop+H*.10, ex+sd*W*.046, wfTop+H*.145);
      x.quadraticCurveTo(ex+sd*W*.052, wfTop+H*.205, ex+sd*W*.031, gy-H*.085);
      x.bezierCurveTo(ex+sd*W*.045, gy-H*.045, ex+sd*W*.065, gy-H*.02, ex+sd*W*.095, gy+H*.006);
      x.lineTo(ex+sd*W*.15, gy+H*.018);
      x.lineTo(ex+sd*W*.13, gy-H*.09);
      x.bezierCurveTo(ex+sd*W*.105, gy-H*.16, ex+sd*W*.085, wfTop+H*.075, ex-sd*W*.018, wfTop-H*.01);
      x.closePath(); x.fill();
      // Layered strata follow the wall contour and break at different lengths.
      for (let r=0;r<6;r++) {
        const yy=wfTop+H*(.055+r*.027), xx=ex+sd*W*(.008+(r%3)*.007);
        x.strokeStyle = r%2 ? 'rgba(111,145,169,.20)' : 'rgba(5,14,26,.34)';
        x.lineWidth = Math.max(1,W*(r%2?.0012:.002)); x.lineCap='round';
        x.beginPath(); x.moveTo(xx,yy);
        x.quadraticCurveTo(xx+sd*W*.018,yy+H*.009,xx+sd*W*(.028+(r%2)*.009),yy+H*.004);
        x.stroke();
      }
      // A few distinct boulders anchor the cliff to the shore; subdued, not glowing.
      for (let b=0;b<3;b++) {
        const bx=wfX+sd*W*(.105+b*.035), by=gy-H*(.028+(b%2)*.014), rx=W*(.014+(b%2)*.004), ry=H*(.014+(b%2)*.004);
        const bg=x.createLinearGradient(bx-rx,by-ry,bx+rx,by+ry);
        bg.addColorStop(0,'#34475a'); bg.addColorStop(.55,'#1c2d40'); bg.addColorStop(1,'#0b1725');
        x.fillStyle=bg; x.beginPath();
        x.moveTo(bx-rx,by+ry*.1); x.quadraticCurveTo(bx-rx*.85,by-ry,bx-rx*.15,by-ry*.8);
        x.quadraticCurveTo(bx+rx*.75,by-ry*1.05,bx+rx,by-ry*.05);
        x.quadraticCurveTo(bx+rx*.75,by+ry*.85,bx,by+ry); x.closePath(); x.fill();
        x.strokeStyle='rgba(127,157,174,.16)'; x.lineWidth=Math.max(1,W*.001);
        x.beginPath(); x.moveTo(bx-rx*.35,by-ry*.42); x.lineTo(bx+rx*.12,by-ry*.52); x.stroke();
      }
    }

    // Water curtain rebuilt as separated, uneven ribbons. Avoid a single filled
    // rectangle: dark gaps expose the rock behind and each stream has its own contour.
    const wfBottom = gy + 1, wfHalf = W*.066;
    // A single irregular water silhouette with a broken lip and a softly flared base.
    // The boundary is deliberately asymmetric so it does not read as a rectangular curtain.
    x.save();
    x.beginPath();
    x.moveTo(wfX-wfHalf*.73,wfTop+H*.014);
    x.bezierCurveTo(wfX-wfHalf*.92,wfTop+H*.052,wfX-wfHalf*.68,gy-H*.19,wfX-wfHalf*.86,gy-H*.105);
    x.bezierCurveTo(wfX-wfHalf*.78,gy-H*.045,wfX-wfHalf*.98,gy-H*.018,wfX-wfHalf*.82,wfBottom);
    x.quadraticCurveTo(wfX-W*.026,wfBottom+H*.006,wfX+wfHalf*.79,wfBottom);
    x.bezierCurveTo(wfX+wfHalf*.96,gy-H*.055,wfX+wfHalf*.67,gy-H*.105,wfX+wfHalf*.83,gy-H*.17);
    x.bezierCurveTo(wfX+wfHalf*.62,wfTop+H*.065,wfX+wfHalf*.98,wfTop+H*.045,wfX+wfHalf*.68,wfTop+H*.012);
    x.quadraticCurveTo(wfX+W*.006,wfTop+H*.031,wfX-wfHalf*.73,wfTop+H*.014);
    x.closePath();
    x.fillStyle='rgba(8,20,34,.94)'; x.fill();
    const wfGrad = x.createLinearGradient(wfX-wfHalf,wfTop,wfX+wfHalf,gy);
    wfGrad.addColorStop(0,'rgba(120,190,225,.55)');
    wfGrad.addColorStop(.34,'rgba(150,215,240,.68)');
    wfGrad.addColorStop(.72,'rgba(110,186,225,.6)');
    wfGrad.addColorStop(1,'rgba(205,240,252,.78)');
    x.fillStyle=wfGrad; x.fill();
    // Uneven dark channels interrupt the sheet so it reads as flowing water, not glass.
    for(let ch=0;ch<6;ch++){
      const u=(ch+.5)/6, sx=wfX+(u-.5)*W*.105;
      const sway=Math.sin(t/680+ch*1.8)*W*.003;
      const width=W*(.0024+(ch%3)*.0011);
      x.strokeStyle=ch%2?'rgba(9,29,49,.23)':'rgba(13,38,57,.31)';
      x.lineWidth=width; x.lineCap='round'; x.beginPath();
      x.moveTo(sx,wfTop+H*(.025+(ch%2)*.012));
      x.bezierCurveTo(sx+sway,wfTop+H*.075,sx-sway*.8,gy-H*(.09+(ch%3)*.012),sx+sway*.4,gy-H*.012);
      x.stroke();
    }
    // Thin highlights follow independent paths with varying width and broken ends.
    for(let strand=0;strand<13;strand++){
      const u=(strand+.5)/13, sx=wfX+(u-.5)*W*.112;
      const sway=Math.sin(t/590+strand*1.43)*W*(.002+(strand%4)*.0007);
      const bend=Math.sin(strand*2.3)*W*.004;
      const topY=wfTop+H*(.018+(strand%3)*.012), endY=gy-H*(.006+(strand%4)*.008);
      x.strokeStyle=strand%5===0?'rgba(222,249,255,.34)':strand%3===0?'rgba(115,204,235,.25)':'rgba(174,229,246,.15)';
      x.lineWidth=W*(.00065+(strand%4)*.00022); x.lineCap='round'; x.beginPath();
      x.moveTo(sx,topY);
      x.bezierCurveTo(sx+sway,topY+H*.055,sx+bend-sway*.55,gy-H*(.12+(strand%3)*.012),sx+sway*.35,endY);
      x.stroke();
    }
    // Small side rivulets peel off the rock lip; each ends at a different height.
    for(let r=0;r<5;r++){
      const side=r%2?1:-1, sy=wfTop+H*(.065+r*.036), sx=wfX+side*W*(.045+(r%3)*.004);
      x.strokeStyle='rgba(155,225,246,.18)'; x.lineWidth=W*(.0008+(r%2)*.00045); x.lineCap='round'; x.beginPath();
      x.moveTo(sx,sy); x.quadraticCurveTo(sx+side*W*.007,sy+H*.032,sx+side*W*.003,sy+H*(.052+(r%3)*.012)); x.stroke();
    }
    x.restore();
    x.fillStyle='rgba(18,37,61,.78)'; x.beginPath();
    x.ellipse(wfX,wfTop+2,W*.074,Math.max(4,H*.006),0,Math.PI,Math.PI*2); x.fill();
    
    // Sương mù & Bọt nước
    const fh2 = gy - wfTop;
    x.save();
    // Keep spray inside the actual uneven water profile instead of a hard rectangle.
    x.beginPath();
    x.moveTo(wfX-wfHalf*.75,wfTop+H*.015);
    x.bezierCurveTo(wfX-wfHalf*.95,wfTop+H*.18,wfX-wfHalf*.78,gy-H*.08,wfX-wfHalf*.84,wfBottom);
    x.quadraticCurveTo(wfX, wfBottom+H*.008, wfX+wfHalf*.80,wfBottom);
    x.bezierCurveTo(wfX+wfHalf*.94,gy-H*.08,wfX+wfHalf*.74,wfTop+H*.15,wfX+wfHalf*.70,wfTop+H*.015);
    x.closePath(); x.clip(); x.lineCap = 'round';
    for (let k = 0; k < 46; k++) {
      const fxk = wfX + (((k*.618)%1) - .5)*W*.128, sp = .35 + ((k*.37)%1)*.55, ln = fh2*(.12 + ((k*.53)%1)*.22);
      const y0 = wfTop + ((t*.0009*sp*fh2 + k*131) % (fh2 + ln)) - ln;
      const gr = x.createLinearGradient(0, y0, 0, y0 + ln);
      gr.addColorStop(0, 'rgba(235,250,255,0)'); gr.addColorStop(.7, `rgba(235,250,255,${.2 + .3*sp})`); gr.addColorStop(1, 'rgba(255,255,255,.05)');
      x.strokeStyle = gr; x.lineWidth = 1.5 + sp*3.5;
      x.beginPath(); x.moveTo(fxk + Math.sin(t/500 + k)*1.5, y0); x.lineTo(fxk + Math.sin(t/500 + k + 1)*1.5, y0 + ln); x.stroke();
    }
    x.restore();
    // Phase 5.64: side-rock shoulders are drawn BEFORE the water curtain (below),
    // never over the falling water. This keeps the waterfall readable as a drop
    // between rock walls rather than a narrow ribbon pasted onto a flat backdrop.

    x.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 10; k++) glow('m', wfX + (((k*.37)%1) - .5)*W*.14, gy - 4 - Math.abs(Math.sin(t/400 + k))*H*.03, 26 + (k%3)*10, .45);
    x.globalCompositeOperation = 'source-over';

    x.beginPath();
    for (let i = 0; i <= 24; i++) { const u = i/24; x.lineTo(cx(u) - hw(u), Y(u)); }
    for (let i = 24; i >= 0; i--) { const u = i/24; x.lineTo(cx(u) + hw(u), Y(u)); }
    const g = x.createLinearGradient(0, gy, 0, H);
    g.addColorStop(0, '#3870a0'); g.addColorStop(.5, '#1b4770'); g.addColorStop(1, '#09233b');
    x.fillStyle = g; x.fill();

    // Plunge pool: a distinct receiving basin at the foot of the cliff.
    // Drawn as a broad, low ellipse blended into the stream, not a glowing disk.
    if (cam > W*1.15 && cam < W*3.15) {
      const px = W*2.5, py = gy + H*.018;
      x.save();
      const pool = x.createRadialGradient(px,py,2,px,py,W*.19);
      pool.addColorStop(0,'rgba(81,151,181,.36)');
      pool.addColorStop(.48,'rgba(35,91,126,.28)');
      pool.addColorStop(1,'rgba(11,34,57,0)');
      x.fillStyle=pool; x.beginPath(); x.ellipse(px,py,W*.19,H*.045,-.025,0,Math.PI*2); x.fill();
      x.strokeStyle='rgba(145,207,222,.18)'; x.lineWidth=Math.max(1,W*.0012);
      for(let r=0;r<4;r++) {
        const rr=W*(.035+r*.025), pulse=.88+.12*Math.sin(t/520+r);
        x.beginPath(); x.ellipse(px,py+H*.006,rr*pulse,H*(.006+r*.001),0,Math.PI*1.08,Math.PI*1.92); x.stroke();
      }
      x.restore();
    }

    x.lineCap = 'round';
    for (let k = 0; k < 28; k++) {
      const f = ((k*.7548)%1)*1.8 - .9, sp = .06 + ((k*.31)%1)*.05;
      const u0 = ((k*.618)%1 + t/1000*sp) % 1;
      x.beginPath();
      for (let j = 0; j <= 7; j++) {
        const u = u0 + j*.018; if (u > 1) break;
        const lx = cx(u) + f*hw(u) + Math.sin(u*40 + k + t/900)*hw(u)*.06;
        j ? x.lineTo(lx, Y(u)) : x.moveTo(lx, Y(u));
      }
      x.strokeStyle = `rgba(205, 240, 255, ${.10 + .25*u0*(1 - Math.abs(f)*.5)})`;
      x.lineWidth = .8 + 3.5*u0; x.stroke();
    }

    x.globalCompositeOperation = 'lighter';
    glow('c', wfX, gy, W*.085, .028 + .006*Math.sin(t/350));
    glow('m', wfX - W*.028, gy + 4, W*.042, .022);
    glow('m', wfX + W*.028, gy + 4, W*.042, .022);
    for (let k = 0; k < 16; k++) {
      const u = ((k*.4142)%1)*.95 + .02;
      const a = Math.max(0, Math.sin(t/(420 + k*17) + k*3));
      glow('m', cx(u) + Math.sin(k*5.1)*hw(u)*.8, Y(u), 5 + 18*u, a*.25);
    }
    x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;

    for (let k = 0; k < 9; k++) {
      const u = .06 + k*.105, ex = cx(u) + (k%2 ? 1 : -1)*hw(u)*1.02;
      const rw = hw(u)*.22 + 5, rh = hw(u)*.12 + 3.5;
      x.fillStyle = '#101b2b'; x.beginPath(); x.ellipse(ex, Y(u), rw, rh, 0, 0, 7); x.fill();
      x.fillStyle = '#1a383b'; x.beginPath(); x.ellipse(ex, Y(u) - rh*.25, rw*.85, rh*.65, 0, Math.PI, 0); x.fill();
    }
    const b = BRIDGES[0];
    if (b && cam + W > b.x0 && cam < b.x1) drawBridge(b, gy, t);
  }

  if (cam > W*2.15) {
    const lx = W*3.4, ly = gy + H*.195;
    
    // Hồ nước
    x.save(); x.translate(lx, ly); x.scale(1, .36);
    const g = x.createRadialGradient(0, 0, 10, 0, 0, W*.58);
    g.addColorStop(0, '#4a85b8'); g.addColorStop(.55, '#1e4b75'); g.addColorStop(1, '#091f36');
    x.fillStyle = g; x.beginPath(); x.arc(0, 0, W*.58, 0, 7); x.fill();
    for (let k = 0; k < 4; k++) {
      const r = ((t/2700 + k/4) % 1)*W*.35;
      x.strokeStyle = `rgba(210, 240, 255, ${.34*(1 - r/(W*.35))})`;
      x.lineWidth = 2; x.beginPath(); x.arc(W*.04*(k - 1.5), 0, r, 0, 7); x.stroke();
    }
    x.restore();

    // Phản chiếu trăng
    const moonX = W*.75 - cam, moonY = H*.165;
    const refColor = 'rgba(220, 238, 255, 0.35)';
    x.globalCompositeOperation = 'lighter';
    for (let m = 0; m < 16; m++) {
      const ry = ly - H*.08 + m*5;
      const wobble = Math.sin(t/280 + m*0.5) * 6;
      const rw = (32 - m*1.5) * (.7 + .3*Math.sin(t/280 + m));
      glow('w', lx - cam + W*.06 + wobble*.2, ry, rw*.8 + 8, .07*(1 - m/18));
    }
    glow('m', lx - cam + W*.06, ly, W*.4, 0.15);
    x.globalCompositeOperation = 'source-over';

    // Đảo nhỏ
    const isX = W*3.75, isY = ly + H*.01;
    x.fillStyle = '#1b110b';
    x.beginPath(); x.ellipse(isX, isY, W*.08, H*.02, 0, 0, 7); x.fill();
    x.fillStyle = '#17313a';
    x.beginPath(); x.ellipse(isX, isY - H*.005, W*.06, H*.015, 0, 0, 7); x.fill();

    // Vọng lâu trên đảo
    x.fillStyle = '#2e1d12'; x.beginPath(); x.ellipse(isX, isY-4, 25, 8, 0, 0, 7); x.fill();
    x.fillRect(isX - 20, isY - 4, 4, 20);
    x.fillRect(isX + 16, isY - 4, 4, 20);
    x.fillStyle = '#1f130c';
    x.beginPath();
    x.moveTo(isX - 30, isY - 30); x.lineTo(isX, isY - 50); x.lineTo(isX + 30, isY - 30);
    x.closePath(); x.fill();
    x.fillStyle = '#2e1d12'; x.fillRect(isX + 22, isY - 40, 4, 40);
    x.fillStyle = '#ffae52'; x.beginPath(); x.arc(isX + 24, isY - 42, 5, 0, 7); x.fill();
    
    // Cầu nối bờ ra đảo

    // Thuyền gỗ nhỏ bên đảo
    const bx = isX + 40, by = isY + 10;
    x.fillStyle = '#4a3222';
    x.beginPath();
    x.moveTo(bx - 25, by);
    x.quadraticCurveTo(bx, by + 15, bx + 25, by);
    x.lineTo(bx + 20, by - 5); x.lineTo(bx - 20, by - 5); x.closePath(); x.fill();
    x.strokeStyle = '#29180e'; x.lineWidth = 2; x.stroke();
    x.strokeStyle = '#6e4b2e'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(bx - 10, by); x.lineTo(bx - 20, by + 15); x.stroke();

    x.globalCompositeOperation = 'lighter';
    glow('w', isX + 24, isY - 42, 70, .6);
    x.globalCompositeOperation = 'source-over';

    // Hoa sen
    for (let k = 0; k < 6; k++) {
      const fx = lx + (k - 2.3)*W*.105, fy = ly + Math.sin(k*2.7)*H*.04;
      x.fillStyle = '#123b38';
      x.beginPath(); x.ellipse(fx, fy + 3, 14, 5, 0, .2, Math.PI*1.9); x.fill();
      x.fillStyle = k%2 ? '#ff9ee0' : '#8cf6ff';
      for (let p = -2; p <= 2; p++) {
        x.beginPath(); x.ellipse(fx + p*2.5, fy, 3.2, 6 - Math.abs(p), p*.25, 0, Math.PI*2); x.fill();
      }
    }

    x.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 6; k++) {
      const fx = lx + (k - 2.3)*W*.105, fy = ly + Math.sin(k*2.7)*H*.04;
      glow(k%2 ? 'p' : 'c', fx, fy, 28, .65 + .3*Math.sin(t/520 + k));
    }
    x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
  }
}

/* ===== PHASE 5.10 · WATER ECOSYSTEM DETAIL =====
   Small world-space shoreline details layered over the existing stream/lake render.
   This does not replace the established water, bridge, island or cabin systems. */
function drawWaterEcology(t, gy) {
  if (inside) return;
  const zone = vZone();
  if (zone !== 2 && zone !== 3) return;
  const phase = t / 1000;
  x.save();
  // Mossy stones along the near bank. Stable world-space placement prevents flicker.
  for (let i = 0; i < 19; i++) {
    const wx = cam + W * (.035 + i * .052);
    const seed = Math.abs(Math.sin(wx * .037 + i * 2.71));
    const px = wx - cam;
    const py = gy + H * (.115 + seed * .12);
    const rw = W * (.008 + seed * .009), rh = H * (.009 + seed * .012);
    x.fillStyle = 'rgba(3,10,19,.36)';
    x.beginPath(); x.ellipse(px + 2, py + rh*.55, rw*1.3, rh*.56, -.08, 0, Math.PI*2); x.fill();
    const stone = x.createLinearGradient(px-rw,py-rh,px+rw,py+rh);
    stone.addColorStop(0, seed>.5?'#486b70':'#354b61');
    stone.addColorStop(.55, '#253b4b'); stone.addColorStop(1, '#15283a');
    x.fillStyle = stone; x.beginPath();
    x.moveTo(px-rw,py); x.quadraticCurveTo(px-rw*.65,py-rh*1.25,px-rw*.08,py-rh);
    x.quadraticCurveTo(px+rw*.9,py-rh*.95,px+rw,py+rh*.12);
    x.quadraticCurveTo(px+rw*.4,py+rh*.8,px-rw,py); x.closePath(); x.fill();
    x.strokeStyle='rgba(161,213,190,.16)'; x.lineWidth=1;
    x.beginPath(); x.moveTo(px-rw*.38,py-rh*.42); x.quadraticCurveTo(px,py-rh*.72,px+rw*.35,py-rh*.3); x.stroke();
  }
  // Reeds and water grasses at the edges, swaying with the same world wind.
  for (let i = 0; i < 13; i++) {
    const wx = cam + W * (.025 + i * .078);
    const px = wx - cam;
    const edge = i % 2 ? .09 : .22;
    const py = gy + H * edge;
    const height = H * (.028 + (i%4)*.008);
    const sway = VFX.reduced ? 0 : Math.sin(phase*1.25 + i*1.7 + wind) * W*.006;
    x.strokeStyle = i%3===0 ? '#648f69' : '#3d795e';
    x.lineWidth = 1.2 + (i%2)*.45;
    for (let j=0;j<3;j++) {
      const bx=px+(j-1)*4, topX=bx+sway*(.65+j*.22), topY=py-height*(.72+(j%2)*.18);
      x.beginPath(); x.moveTo(bx,py); x.quadraticCurveTo(bx+sway*.25,py-height*.45,topX,topY); x.stroke();
      if ((i+j)%4===0) {
        x.fillStyle='#b6d38a'; x.beginPath(); x.ellipse(topX,topY,1.5,3.2,-.25,0,Math.PI*2); x.fill();
      }
    }
  }
  // Water-edge caustics and soft, broken reflections (not a solid overlay).
  x.save(); x.globalCompositeOperation='screen';
  const rippleY = gy + H*.035;
  for (let i=0;i<17;i++) {
    const u = (i*0.173 + phase*.035) % 1;
    const px = W*(.04 + u*.92);
    const py = rippleY + H*(.018 + (i%5)*.012) + Math.sin(phase*1.7+i)*H*.003;
    const width = W*(.012 + (i%4)*.006);
    x.globalAlpha = .09 + .07*(.5+.5*Math.sin(phase*2+i));
    x.strokeStyle = i%4===0 ? '#d6fbff' : '#75cbe8'; x.lineWidth = .8 + (i%3)*.35;
    x.beginPath(); x.ellipse(px,py,width,H*.0035,0,.1,Math.PI*1.8); x.stroke();
  }
  x.globalAlpha=1; x.restore();
  // Tiny luminous water plants near the shore, kept low intensity to preserve readability.
  x.save(); x.globalCompositeOperation='lighter';
  for (let i=0;i<5;i++) {
    const px=W*(.12+i*.19)+Math.sin(phase*.35+i)*W*.008;
    const py=gy+H*(.16+(i%2)*.045);
    const pulse=.45+.35*Math.sin(phase*1.6+i*2.2);
    vGlow(px,py,H*.022,'102,239,214',.08*pulse);
    x.fillStyle=`rgba(166,246,210,${.25*pulse})`;
    x.beginPath(); x.ellipse(px,py,2.2,1.1,0,0,Math.PI*2); x.fill();
  }
  x.restore(); x.restore();
}

function drawBridge(b, gy, t) {
  const fy0 = gy + H*0.19 - 2, X0 = Math.max(b.x0, cam - 20), X1 = Math.min(b.x1, cam + W + 20), step = 6;
  const top = px => fy0 + bridgeY(px), plank = b.type === 'plank';
  // bóng cầu trên mặt nước
  x.fillStyle = 'rgba(2,6,16,.38)'; x.beginPath(); x.moveTo(X0, fy0 + 11);
  for (let px = X0; px <= X1; px += step) x.lineTo(px, fy0 + 11 + Math.max(0, -bridgeY(px))*.18);
  for (let px = X1; px >= X0; px -= step) x.lineTo(px, fy0 + 17 + Math.max(0, -bridgeY(px))*.22);
  x.closePath(); x.fill();
  // cọc chống xuống nước + gợn sóng chân cọc
  for (let px = b.x0 + 26; px < b.x1 - 10; px += 58) {
    if (px < cam - 10 || px > cam + W + 10) continue;
    const ty = top(px) + 10, by = fy0 + 15; if (by - ty < 8) continue;
    const pg = x.createLinearGradient(px - 3, 0, px + 3, 0); pg.addColorStop(0, '#120a05'); pg.addColorStop(.5, '#3a2616'); pg.addColorStop(1, '#120a05');
    x.fillStyle = pg; x.fillRect(px - 3, ty, 6, by - ty);
    x.fillStyle = 'rgba(120,170,200,.22)'; x.fillRect(px - 3, by - 5, 6, 5);
    x.strokeStyle = 'rgba(190,225,255,.35)'; x.lineWidth = 1;
    x.beginPath(); x.ellipse(px, by, 9 + Math.sin(t/700 + px)*1.5, 2.6, 0, 0, 7); x.stroke();
  }
  // lan can phía sau (cột + thanh ngang)
  const rh = H*.034;
  x.strokeStyle = '#2a1a0f'; x.lineWidth = 2.2; x.beginPath();
  for (let px = X0; px <= X1; px += step) { const yy = top(px) - rh; px === X0 ? x.moveTo(px, yy) : x.lineTo(px, yy); } x.stroke();
  x.lineWidth = 1.2; x.beginPath();
  for (let px = X0; px <= X1; px += step) { const yy = top(px) - rh*.5; px === X0 ? x.moveTo(px, yy) : x.lineTo(px, yy); } x.stroke();
  x.fillStyle = '#2a1a0f';
  for (let px = b.x0 + 14; px < b.x1 - 8; px += 34) { if (px < cam - 6 || px > cam + W + 6) continue; x.fillRect(px - 1.5, top(px) - rh, 3, rh + 2); }
  // mặt cầu: vòm nâng lên khỏi nước, ván xếp, dầm đỡ bên dưới
  x.beginPath(); x.moveTo(X0, top(X0));
  for (let px = X0; px <= X1; px += step) x.lineTo(px, top(px));
  for (let px = X1; px >= X0; px -= step) x.lineTo(px, top(px) + 10);
  x.closePath();
  const dg = x.createLinearGradient(0, fy0 - H*.07, 0, fy0 + 14); dg.addColorStop(0, '#5a3d28'); dg.addColorStop(.55, '#3b2616'); dg.addColorStop(1, '#1f130a');
  x.fillStyle = dg; x.fill();
  x.strokeStyle = 'rgba(10,6,3,.75)'; x.lineWidth = 1;
  for (let px = b.x0; px < b.x1; px += 16) { if (px < cam - 4 || px > cam + W + 4) continue; x.beginPath(); x.moveTo(px, top(px)); x.lineTo(px, top(px) + 10); x.stroke(); }
  x.strokeStyle = 'rgba(255,225,170,.28)'; x.lineWidth = 1.4; x.beginPath();
  for (let px = X0; px <= X1; px += step) px === X0 ? x.moveTo(px, top(px) + .5) : x.lineTo(px, top(px) + .5); x.stroke();
  x.strokeStyle = 'rgba(8,4,2,.8)'; x.lineWidth = 2; x.beginPath();
  for (let px = X0; px <= X1; px += step) px === X0 ? x.moveTo(px, top(px) + 8) : x.lineTo(px, top(px) + 8); x.stroke();
  // đá chân cầu hai đầu
  for (const ex of [b.x0, b.x1]) for (let k = 0; k < 4; k++) {
    const rx = ex + (k - 1.5)*7*(ex === b.x0 ? 1 : -1), ry = fy0 + 6 + (k%2)*3;
    x.fillStyle = k%2 ? '#2b3445' : '#364054'; x.beginPath(); x.ellipse(rx, ry, 9 - k, 4, 0, 0, 7); x.fill();
  }
  // đèn treo trên cột lan can
  for (let px = b.x0 + 100; px < b.x1 - 40; px += 210) {
    if (px < cam - 40 || px > cam + W + 40) continue;
    const yy = top(px) - rh - 6; x.fillStyle = '#2e1d12'; x.fillRect(px, yy - 18, 2.5, 18);
    x.globalCompositeOperation = 'lighter'; glow('w', px + 1, yy - 20, 46, .6 + .15*Math.sin(t/500 + px)); x.globalCompositeOperation = 'source-over';
  }
}

function ground(t, gy) {
  x.globalAlpha = 1;
  let g = x.createLinearGradient(0, gy, 0, H);
  g.addColorStop(0, '#0b1a24'); g.addColorStop(.45, '#07121a'); g.addColorStop(1, '#03080d');
  x.fillStyle = g; x.fillRect(cam - 2, gy, W + 4, H - gy);
  x.fillStyle = '#0d202b';
  for (let hIdx = 0; hIdx < 8; hIdx++) {
    const hx = W*(hIdx*.55 + .2);
    if (hx < cam - W*.5 || hx > cam + W*1.5) continue;
    x.beginPath(); x.ellipse(hx, gy + H*.04, W*.32, H*.045, 0, Math.PI, 0); x.fill();
  }
  x.fillStyle = '#15202e';
  x.beginPath();
  x.moveTo(W*.585, gy + H*.145);
  x.quadraticCurveTo(W*.50, gy + H*.32, W*.22, H);
  x.lineTo(W*.54, H);
  x.quadraticCurveTo(W*.60, gy + H*.32, W*.655, gy + H*.145);
  x.fill();
  const stones = [
    [.61,.18,16,5],[.59,.23,20,6],[.56,.29,25,7],
    [.52,.36,30,8],[.47,.44,36,10],[.41,.53,42,11]
  ];
  stones.forEach(([sx,sy,sw,sh]) => {
    x.fillStyle = '#243245';
    x.beginPath(); x.ellipse(W*sx, gy + H*sy, sw, sh, 0, 0, Math.PI*2); x.fill();
    x.strokeStyle = 'rgba(175, 205, 245, 0.18)'; x.lineWidth = 1;
    x.beginPath(); x.ellipse(W*sx, gy + H*sy - 1, sw, sh, 0, Math.PI, 0); x.stroke();
  });
  for (let m = 0; m < 20; m++) {
    const mx = W*(.14 + m*.195 + (m%3)*.025);
    if (mx < cam - 30 || mx > cam + W + 30) continue;
    if ((mx > W*.42 && mx < W*.66) || (mx > W*2.25 && mx < W*2.75)) continue;
    const my = gy + H*(.06 + (m%5)*.042);
    [[-4,1],[3,.7]].forEach(([ox,sc]) => {
      x.strokeStyle = '#c8daee'; x.lineWidth = 2*sc;
      x.beginPath(); x.moveTo(mx+ox, my);
      x.quadraticCurveTo(mx+ox-1, my - 5*sc, mx+ox, my - 8*sc); x.stroke();
      x.fillStyle = m%2 ? '#42f0d5' : '#c282ff';
      x.beginPath();
      x.moveTo(mx+ox-6*sc, my-7*sc);
      x.quadraticCurveTo(mx+ox, my-15*sc, mx+ox+6*sc, my-7*sc);
      x.closePath(); x.fill();
    });
    x.globalCompositeOperation = 'lighter';
    glow(m%2 ? 'c' : 'v', mx, my - 8, 22, .55 + .25*Math.sin(t/480 + m));
    x.globalCompositeOperation = 'source-over';
  }
  drawWater(t, gy);
  drawWaterEcology(t, gy);
  // Phase 5.60: removed a second hard-edged waterfall overlay. drawWater() is
  // the single source of truth for the cliff and water curtain; drawing another
  // trapezoid here caused the bright geometric slab visible in the recording.
}

function grass(t) {
  x.globalAlpha = 1;
  for (let i = Math.floor(cam/7)*7; i < cam + W; i += 7) {
    const h = H*(.036 + .046*Math.abs(Math.sin(i*.85))) + (i < W*.25 || i > W*.8 ? H*.025 : 0);
    const s = wind*h*.45 + Math.sin(t/260 + i*.3)*h*.06;
    x.strokeStyle = i%3===0 ? '#08171e' : i%3===1 ? '#0e2828' : '#153833';
    x.lineWidth = i%2 ? 2.2 : 1.6;
    x.beginPath(); x.moveTo(i, H);
    x.quadraticCurveTo(i + s*.35, H - h*.6, i + s, H - h); x.stroke();
  }
}

/* ============ CHARACTERS & PETS ============ */
function eyes(a, s, col = 'w') {
  x.globalCompositeOperation = 'lighter';
  a.forEach(([ex, ey]) => glow(col, ex, ey, s, 1));
  x.globalCompositeOperation = 'source-over';
}

function cat(px, py, s, t) {
  const tw = Math.sin(t/420)*s*.22;
  x.save(); x.translate(px, py);
  x.fillStyle = 'rgba(0,0,0,0.35)';
  x.beginPath(); x.ellipse(0, 2, s*.32, s*.08, 0, 0, 7); x.fill();
  const cg = x.createLinearGradient(-s*.3, -s*.9, s*.3, 0);
  cg.addColorStop(0, '#1a243d'); cg.addColorStop(.5, '#0b1020'); cg.addColorStop(1, '#04060e');
  x.fillStyle = cg;
  x.beginPath(); x.ellipse(0, -s*.35, s*.28, s*.38, 0, 0, 7); x.fill();
  x.beginPath(); x.arc(0, -s*.84, s*.23, 0, 7); x.fill();
  x.beginPath();
  x.moveTo(-s*.2, -s*.96); x.lineTo(-s*.21, -s*1.25); x.lineTo(-s*.03, -s*1.05);
  x.moveTo(s*.2, -s*.96); x.lineTo(s*.21, -s*1.25); x.lineTo(s*.03, -s*1.05);
  x.fill();
  x.strokeStyle = '#d13b4a'; x.lineWidth = 2.5;
  x.beginPath(); x.moveTo(-s*.16, -s*.65); x.lineTo(s*.16, -s*.65); x.stroke();
  x.fillStyle = '#ffe07d'; x.beginPath(); x.arc(0, -s*.63, s*.065, 0, 7); x.fill();
  x.strokeStyle = '#090e1c'; x.lineWidth = s*.11; x.lineCap = 'round';
  x.beginPath(); x.moveTo(s*.24, -s*.12);
  x.quadraticCurveTo(s*.75, -s*.05 + tw, s*.55, -s*.75 + tw); x.stroke();
  x.restore();
  if (Math.sin(t/2200) > -.9) eyes([[px - s*.09, py - s*.86], [px + s*.09, py - s*.86]], s*.24, 'g');
}

function cat2(gy, s, t) {
  const hx = W*.32, hy = gy + H*.195;
  let px = hx, py = hy, rot = 0, sx = 1, sy = 1;
  if (cp.p >= 0) {
    const p = cp.p;
    const q = p < .15 ? 0 : p < .5 ? (p - .15)/.35 : p < .9 ? 1 - (p - .5)/.4 : 0;
    const e = Math.sin(q*Math.PI/2);
    px = hx + (cp.tx - hx)*e;
    py = hy + (cp.ty + s*.5 - hy)*e - Math.sin(q*Math.PI)*H*.085;
    if (p < .15) { sy = .8; sx = 1.14; px += Math.sin(p*120)*1.5; }
    else if (q > 0 && q < 1) {
      rot = Math.max(-.6, Math.min(.6, (cp.tx - hx)/W*1.2));
      sx = 1.25; sy = .85;
    }
  }
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(sx, sy);
  cat(0, 0, s, t); x.restore();
}

function fox(px, py, s, t) {
  const tw = Math.sin(t/360)*s*.22;
  x.save(); x.translate(px, py);
  x.fillStyle = 'rgba(0,0,0,0.35)';
  x.beginPath(); x.ellipse(0, 2, s*.48, s*.09, 0, 0, 7); x.fill();
  const fg = x.createLinearGradient(-s*.5, -s*.6, s*.5, 0);
  fg.addColorStop(0, '#d95326'); fg.addColorStop(1, '#7a240c');
  x.fillStyle = fg;
  x.beginPath(); x.ellipse(0, -s*.32, s*.48, s*.23, 0, 0, 7); x.fill();
  x.beginPath();
  x.moveTo(-s*.36, -s*.4); x.lineTo(-s*.84, -s*.44); x.lineTo(-s*.4, -s*.74);
  x.lineTo(-s*.26, -s*.98); x.lineTo(-s*.16, -s*.68); x.closePath(); x.fill();
  x.fillStyle = '#fae8cf';
  x.beginPath(); x.ellipse(-s*.34, -s*.3, s*.15, s*.16, .3, 0, 7); x.fill();
  x.fillStyle = '#240d06';
  x.fillRect(-s*.32, -s*.15, s*.075, s*.15);
  x.fillRect(s*.25, -s*.15, s*.075, s*.15);
  const tg = x.createLinearGradient(s*.4, -s*.3, s*1.05, -s*.9 + tw);
  tg.addColorStop(0, '#b83c14'); tg.addColorStop(.7, '#ff7b29'); tg.addColorStop(1, '#fff3d1');
  x.fillStyle = tg;
  x.beginPath(); x.moveTo(s*.38, -s*.35);
  x.quadraticCurveTo(s*1.15, -s*.2 + tw, s*1.02, -s*.9 + tw);
  x.quadraticCurveTo(s*.68, -s*.55, s*.38, -s*.18); x.fill();
  x.restore();
  eyes([[px - s*.5, py - s*.52]], s*.2, 'w');
  x.globalCompositeOperation = 'lighter';
  glow('f', px + s*.98, py - s*.86 + tw, s*.7, .75);
  x.globalCompositeOperation = 'source-over';
}

function owl(px, py, s, t) {
  const hoverY = Math.sin(t/400)*s*.15;
  const wing = Math.sin(t/150)*s*.28;
  const tl = Math.sin(t/1400)*s*.06;
  x.save(); x.translate(px, py + hoverY);
  x.fillStyle = '#1b284a';
  x.beginPath();
  x.moveTo(-s*.2, -s*.5);
  x.quadraticCurveTo(-s*.78, -s*.62 + wing, -s*.3, -s*.24);
  x.moveTo(s*.2, -s*.5);
  x.quadraticCurveTo(s*.78, -s*.62 + wing, s*.3, -s*.24);
  x.fill();
  const bg = x.createLinearGradient(0, -s, 0, 0);
  bg.addColorStop(0, '#22325c'); bg.addColorStop(1, '#0d152b');
  x.fillStyle = bg;
  x.beginPath(); x.ellipse(0, -s*.4, s*.3, s*.42, 0, 0, 7); x.fill();
  x.beginPath(); x.arc(tl, -s*.9, s*.25, 0, 7); x.fill();
  x.fillStyle = 'rgba(180, 205, 245, 0.25)';
  x.beginPath(); x.ellipse(0, -s*.38, s*.18, s*.26, 0, 0, 7); x.fill();
  x.fillStyle = '#f5be4f';
  x.beginPath(); x.moveTo(tl - s*.045, -s*.88);
  x.lineTo(tl + s*.045, -s*.88); x.lineTo(tl, -s*.79); x.fill();
  x.restore();
  if (Math.sin(t/2400) > -.85) {
    eyes([[px + tl - s*.1, py + hoverY - s*.92], [px + tl + s*.1, py + hoverY - s*.92]], s*.28, 'w');
  }
}

/* ===== NHÂN VẬT CHÍNH THIẾT KẾ LẠI: khung xương có khớp, khuôn mặt biểu cảm, nhiều hoạt động ===== */
function ik2(hx, hy, fx, fy, l1, l2, bend) {
  let dx = fx - hx, dy = fy - hy, d = Math.hypot(dx, dy); const m = l1 + l2 - .001;
  if (d > m) { dx *= m/d; dy *= m/d; d = m; fx = hx + dx; fy = hy + dy; } if (d < .001) d = .001;
  const a = Math.atan2(dy, dx), c = Math.max(-1, Math.min(1, (l1*l1 + d*d - l2*l2)/(2*l1*d))), b = Math.acos(c)*bend;
  return { kx: hx + Math.cos(a + b)*l1, ky: hy + Math.sin(a + b)*l1, fx, fy };
}
function charExpr(pose, em, mood) {
  if (pose === 'sleep') return { eye: 'closed', mouth: 'small', brow: 0, blush: .5 };
  if (em === 'cheer') return { eye: 'happy', mouth: 'grin', brow: -.35, blush: .55 };
  if (em === 'wave') return { eye: 'happy', mouth: 'smile', brow: -.2, blush: .45 };
  if (em === 'yawn') return { eye: 'closed', mouth: 'yawn', brow: .25, blush: .3 };
  if (em === 'stargaze') return { eye: 'up', mouth: 'o', brow: -.3, blush: .3 };
  if (pose === 'warm') return { eye: 'half', mouth: 'smile', brow: -.15, blush: .72 };
  if (pose === 'tea') return { eye: 'half', mouth: 'smile', brow: -.1, blush: .5 };
  if (pose === 'read') return { eye: 'down', mouth: 'flat', brow: .15, blush: .25 };
  if (pose === 'sit') return { eye: 'half', mouth: 'smile', brow: -.1, blush: .5 };
  if (mood === '🌟' || mood === '✨' || mood === '🎉') return { eye: 'happy', mouth: 'grin', brow: -.3, blush: .5 };
  return { eye: 'open', mouth: 'smile', brow: 0, blush: .28 };
}
function drawFaceX(h, hy, t, ex, tilt, look) {
  const sk = x.createRadialGradient(-h*.03, hy - h*.03, h*.01, 0, hy, h*.12); sk.addColorStop(0, '#f8dcbc'); sk.addColorStop(.7, '#e2b08a'); sk.addColorStop(1, '#bf8566');
  x.fillStyle = sk; x.beginPath(); x.moveTo(-h*.085, hy - h*.02); x.bezierCurveTo(-h*.09, hy + h*.08, -h*.03, hy + h*.115, h*.035, hy + h*.108);
  x.bezierCurveTo(h*.085, hy + h*.095, h*.105, hy + h*.04, h*.098, hy - h*.01); x.bezierCurveTo(h*.09, hy - h*.075, -h*.07, hy - h*.09, -h*.085, hy - h*.02); x.fill();
  x.fillStyle = '#e0a47f'; x.beginPath(); x.ellipse(-h*.058, hy + h*.012, h*.016, h*.026, 0, 0, 7); x.fill();                      // tai
  x.fillStyle = 'rgba(232,112,110,' + ex.blush*.55 + ')'; x.beginPath(); x.ellipse(h*.025, hy + h*.043, h*.022, h*.013, 0, 0, 7); x.fill();
  const blink = (t % 3800) > 3640 ? .12 : 1, ey = hy + h*.004, lx = (look || 0)*h*.012;
  const eye = (cx, sc) => {
    if (ex.eye === 'happy') { x.strokeStyle = '#2a2f45'; x.lineWidth = h*.011*sc; x.lineCap = 'round'; x.beginPath(); x.arc(cx, ey + h*.01, h*.016*sc, Math.PI*1.1, Math.PI*1.9); x.stroke(); return; }
    if (ex.eye === 'closed') { x.strokeStyle = '#2a2f45'; x.lineWidth = h*.01*sc; x.lineCap = 'round'; x.beginPath(); x.arc(cx, ey - h*.004, h*.015*sc, Math.PI*.15, Math.PI*.85); x.stroke(); return; }
    const op = ex.eye === 'half' ? .5 : 1, hh = h*.021*sc*op*blink, up = ex.eye === 'up' ? -h*.008 : ex.eye === 'down' ? h*.007 : 0;
    x.fillStyle = '#fff6e6'; x.beginPath(); x.ellipse(cx, ey, h*.017*sc, Math.max(.4, hh), 0, 0, 7); x.fill();
    x.fillStyle = '#2b3550'; x.beginPath(); x.ellipse(cx + h*.003 + lx*.5, ey + up, h*.0115*sc, Math.max(.4, hh*.82), 0, 0, 7); x.fill();
    x.fillStyle = '#fff'; x.beginPath(); x.arc(cx + h*.007 + lx*.5, ey + up - hh*.3, h*.0032*sc, 0, 7); x.fill();
    if (ex.eye === 'half') { x.fillStyle = 'rgba(200,150,120,.9)'; x.fillRect(cx - h*.02*sc, ey - h*.022*sc, h*.04*sc, h*.022*sc*(1 - op)*1.4); }
  };
  eye(h*.036, 1); eye(h*.078, .78);
  x.strokeStyle = '#4a3326'; x.lineWidth = h*.008; x.lineCap = 'round';
  for (const [cx, sc] of [[h*.036, 1], [h*.078, .78]]) { x.beginPath(); x.moveTo(cx - h*.016*sc, ey - h*.029 - ex.brow*h*.012*sc); x.lineTo(cx + h*.017*sc, ey - h*.029 + ex.brow*h*.012*sc); x.stroke(); }
  x.fillStyle = '#d99a78'; x.beginPath(); x.ellipse(h*.099, hy + h*.026, h*.011, h*.013, .3, 0, 7); x.fill();                    // mui
  const mx = h*.056, my = hy + h*.068;
  x.strokeStyle = '#7a3b34'; x.lineWidth = h*.008; x.lineCap = 'round';
  if (ex.mouth === 'grin') { x.fillStyle = '#7a2f2f'; x.beginPath(); x.moveTo(mx - h*.022, my - h*.004); x.quadraticCurveTo(mx, my + h*.032, mx + h*.024, my - h*.006); x.closePath(); x.fill(); x.fillStyle = '#fff3e6'; x.fillRect(mx - h*.016, my - h*.002, h*.034, h*.007); }
  else if (ex.mouth === 'o') { x.fillStyle = '#7a2f2f'; x.beginPath(); x.ellipse(mx, my + h*.006, h*.012, h*.017, 0, 0, 7); x.fill(); }
  else if (ex.mouth === 'yawn') { x.fillStyle = '#7a2f2f'; x.beginPath(); x.ellipse(mx, my + h*.01, h*.02, h*.03*(.7 + .3*Math.sin(t/260)), 0, 0, 7); x.fill(); x.fillStyle = '#d96a6a'; x.beginPath(); x.ellipse(mx, my + h*.02, h*.012, h*.011, 0, 0, 7); x.fill(); }
  else if (ex.mouth === 'flat') { x.beginPath(); x.moveTo(mx - h*.014, my); x.lineTo(mx + h*.016, my - h*.002); x.stroke(); }
  else if (ex.mouth === 'small') { x.beginPath(); x.moveTo(mx - h*.011, my); x.quadraticCurveTo(mx + h*.004, my + h*.01, mx + h*.014, my - h*.001); x.stroke(); }
  else { x.beginPath(); x.moveTo(mx - h*.018, my - h*.002); x.quadraticCurveTo(mx + h*.003, my + h*.02, mx + h*.024, my - h*.006); x.stroke(); }
}
function man(px, py, h, t, dir, ph, pose, lamp) {
  const nowMs = Date.now();
  let em = (pl.emote && nowMs < (pl.emoteUntil || 0)) ? pl.emote : '';
  const sitting = pose === 'sit' || pose === 'read' || pose === 'tea' || pose === 'warm', sleeping = pose === 'sleep';
  const walking = !sitting && !sleeping && (Math.abs(pl.vx || 0) > .05 || pl.tx != null);
  if (walking) pl._idle0 = nowMs; else if (pl._idle0 == null) pl._idle0 = nowMs;
  if (!em && !walking && !sitting && !sleeping && !(pl.moodT > 0)) {       // hành động nhỏ khi đứng yên: ngắm sao, vươn vai, vẫy tay
    const idle = (nowMs - pl._idle0)/1000, ep = Math.floor(pl._idle0/1000)%3;
    if (idle > 4 && idle < 7) em = ep === 0 ? 'stargaze' : ep === 1 ? 'yawn' : 'wave';
  }
  if (!em && !sitting && !sleeping && pl.moodT > 0 && (pl.mood === '🌟' || pl.mood === '🎉')) em = 'cheer';
  const ex = charExpr(pose, em, pl.mood), step = walking ? Math.sin(ph) : 0;
  const breath = Math.sin(t/570)*h*.007, bob = (walking ? Math.abs(Math.cos(ph))*h*.02 : 0) + breath;
  const jumpY = pl.jump > 0 && !inside ? Math.sin(pl.jump*Math.PI)*h*.32 : (em === 'cheer' ? Math.abs(Math.sin(t/160))*h*.07 : 0);
  const gS = Math.max(.72, 1 - jumpY/Math.max(1, h));
  x.save(); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
  const sh = x.createRadialGradient(px, py, 1, px, py, h*.34*gS); sh.addColorStop(0, 'rgba(5,7,18,.28)'); sh.addColorStop(.55, 'rgba(5,7,18,.12)'); sh.addColorStop(1, 'rgba(5,7,18,0)');
  if (!sleeping) { x.fillStyle = sh; x.beginPath(); x.ellipse(px, py, h*.34*gS, h*.105*gS, 0, 0, 7); x.fill(); }
  x.restore();
  x.save(); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.translate(px, py - jumpY);
  x.lineCap = 'round'; x.lineJoin = 'round';
  const SKIN = '#e2b08a', SKIN_D = '#c58b69';
  // ======== NGỦ: một dáng nằm liền mạch, thở nhẹ, đắp chăn ========
  if (sleeping) {
    const br = Math.sin(t/900)*h*.005;
    x.fillStyle = 'rgba(0,0,0,.2)'; x.beginPath(); x.ellipse(h*.03, -h*.012, h*.5, h*.03, 0, 0, 7); x.fill();
    const pg = x.createLinearGradient(0, -h*.2, 0, -h*.06); pg.addColorStop(0, '#fbf6ea'); pg.addColorStop(1, '#cdc3ae');
    x.fillStyle = pg; x.beginPath(); x.roundRect(-h*.52, -h*.175, h*.27, h*.105, h*.05); x.fill(); x.strokeStyle = 'rgba(90,75,60,.28)'; x.lineWidth = 1; x.stroke();
    x.fillStyle = 'rgba(90,75,60,.16)'; x.beginPath(); x.ellipse(-h*.385, -h*.12, h*.085, h*.026, 0, 0, 7); x.fill();
    // đầu: nằm ngửa nên quay -90°, mặt hướng lên, tóc ở phía sau
    x.save(); x.translate(-h*.385, -h*.185); x.rotate(-Math.PI/2 + .07);
    x.fillStyle = '#4a3326'; x.beginPath(); x.ellipse(-h*.012, h*.004, h*.098, h*.092, 0, Math.PI*.9, Math.PI*2.12); x.fill();
    drawFaceX(h*.92, 0, t, ex, 0, 0);
    x.fillStyle = '#4a3326'; x.beginPath(); x.moveTo(-h*.085, -h*.03); x.bezierCurveTo(-h*.09, -h*.095, h*.0, -h*.115, h*.06, -h*.085); x.bezierCurveTo(h*.02, -h*.07, -h*.04, -h*.05, -h*.085, -h*.03); x.fill();
    x.restore();
    // chăn ôm theo thân người: vai, ngực, hông, đầu gối, bàn chân
    const bl = x.createLinearGradient(-h*.3, -h*.26, h*.44, -h*.02); bl.addColorStop(0, '#9fb6e0'); bl.addColorStop(.45, '#5c78ac'); bl.addColorStop(1, '#2e4577');
    x.fillStyle = bl; x.beginPath(); x.moveTo(-h*.27, -h*.135);
    x.bezierCurveTo(-h*.255, -h*.205 - br, -h*.17, -h*.222 - br, -h*.09, -h*.2 - br);
    x.bezierCurveTo(-h*.02, -h*.182, h*.06, -h*.2 - br, h*.15, -h*.185);
    x.bezierCurveTo(h*.23, -h*.17, h*.27, -h*.176, h*.33, -h*.155);
    x.bezierCurveTo(h*.4, -h*.14, h*.43, -h*.15, h*.46, -h*.115); x.bezierCurveTo(h*.49, -h*.07, h*.47, -h*.03, h*.43, -h*.02);
    x.lineTo(-h*.26, -h*.02); x.bezierCurveTo(-h*.3, -h*.045, -h*.3, -h*.1, -h*.27, -h*.135); x.fill();
    x.save(); x.clip(); x.strokeStyle = 'rgba(255,255,255,.12)'; x.lineWidth = h*.011;
    for (let k = -2; k < 10; k++) { x.beginPath(); x.moveTo(-h*.3 + k*h*.09, -h*.26); x.lineTo(-h*.3 + k*h*.09 + h*.2, 0); x.stroke(); }
    x.strokeStyle = 'rgba(15,25,55,.3)'; x.lineWidth = h*.014;
    x.beginPath(); x.moveTo(-h*.05, -h*.195); x.quadraticCurveTo(h*.02, -h*.12, h*.08, -h*.185); x.stroke();
    x.beginPath(); x.moveTo(h*.3, -h*.16); x.quadraticCurveTo(h*.34, -h*.09, h*.4, -h*.14); x.stroke(); x.restore();
    x.fillStyle = 'rgba(240,247,255,.85)'; x.beginPath(); x.moveTo(-h*.27, -h*.135); x.bezierCurveTo(-h*.255, -h*.205 - br, -h*.17, -h*.222 - br, -h*.09, -h*.2 - br); x.lineTo(-h*.09, -h*.176 - br); x.bezierCurveTo(-h*.17, -h*.198 - br, -h*.245, -h*.18, -h*.265, -h*.112); x.closePath(); x.fill();
    x.fillStyle = '#e2b08a'; x.beginPath(); x.ellipse(-h*.14, -h*.214 - br, h*.028, h*.016, -.12, 0, 7); x.fill();
    x.restore();
    for (let k = 0; k < 3; k++) { const ph2 = ((t/1800 + k/3) % 1); x.save(); x.globalAlpha = Math.sin(ph2*Math.PI)*.85; x.fillStyle = '#dff0ff'; x.font = '700 ' + Math.round(h*(.07 + k*.025)) + 'px sans-serif'; x.textAlign = 'center'; x.fillText('z', px - h*.3 + ph2*h*.28 + k*h*.05, py - h*.3 - ph2*h*.3 - k*h*.05); x.restore(); }
    return;
  }
  x.scale(dir || 1, 1);
  // ======== KHUNG XƯƠNG ========
  const lowered = sitting ? h*.2 : 0, hipY = sitting ? -h*.19 : -h*.385, hipX = sitting ? -h*.03 : -h*.01, shY = -h*.715 + lowered - bob, shX = 0;
  const footL = (a, lift) => ({ x: Math.sin(a)*h*.115, y: -lift*h*.05 });
  let legF, legB, armF, armB;
  if (sitting) {
    legF = ik2(hipX, hipY, h*.27, -h*.015, h*.19, h*.19, -1); legB = ik2(hipX, hipY, h*.19, -h*.01, h*.19, h*.19, -1);
  } else {
    const a1 = walking ? ph : 0, a2 = walking ? ph + Math.PI : 0;
    const fa = footL(a1, walking ? Math.max(0, Math.cos(a1)) : 0), fb = footL(a2, walking ? Math.max(0, Math.cos(a2)) : 0);
    legF = ik2(hipX + h*.02, hipY, fa.x + h*.02, fa.y - h*.012, h*.19, h*.19, -1); legB = ik2(hipX - h*.02, hipY, fb.x - h*.01, fb.y - h*.012, h*.19, h*.19, -1);
  }
  const armIK = (sx, tx, ty, bend) => ik2(sx, shY + h*.02, tx, ty + lowered, h*.15, h*.14, bend);
  const swing = walking ? Math.sin(ph)*h*.09 : Math.sin(t/900)*h*.01;
  armB = armIK(-h*.03, -h*.06 - swing*.8, -h*.43 - bob, 1); armF = armIK(h*.03, h*.07 + swing*.8, -h*.44 - bob, 1);
  let holdBook = false, cupT = 0;
  if (sitting) { armB = armIK(-h*.03, h*.08, -h*.45, 1); armF = armIK(h*.03, h*.16, -h*.47, 1); }
  if (pose === 'read') { holdBook = true; armF = armIK(h*.03, h*.19, -h*.64 - bob, 1); armB = armIK(-h*.03, h*.15, -h*.62 - bob, 1); }
  if (pose === 'tea') { const cy = (t % 5200) < 1500 ? Math.sin((t % 5200)/1500*Math.PI) : 0; cupT = cy; armF = armIK(h*.03, h*.19 - cy*h*.1, -h*.62 - cy*h*.2 - bob, 1); }
  if (pose === 'warm') { const rub = Math.sin(t/280)*h*.012; armF = armIK(h*.03, h*.31 + rub, -h*.60, 1); armB = armIK(-h*.03, h*.26 - rub, -h*.58, 1); }
  if (em === 'wave') armF = armIK(h*.03, h*.2 + Math.sin(t/110)*h*.035, -h*.98 + Math.sin(t/220)*h*.02, 1);
  if (em === 'cheer') { armF = armIK(h*.03, h*.17, -h*1.04 + Math.sin(t/160)*h*.03, 1); armB = armIK(-h*.03, -h*.13, -h*1.03 + Math.sin(t/160 + 1)*h*.03, 1); }
  if (em === 'yawn') { const s2 = .5 + .5*Math.sin(t/700); armF = armIK(h*.03, h*.12, -h*(.9 + .2*s2), 1); armB = armIK(-h*.03, -h*.1, -h*(.9 + .2*s2), 1); }
  if (em === 'stargaze') armF = armIK(h*.03, h*.24, -h*1.0, 1);
  const limb = (j, w, col, hi) => { x.strokeStyle = col; x.lineWidth = w; x.beginPath(); x.moveTo(j.sx, j.sy); x.lineTo(j.kx, j.ky); x.lineTo(j.fx, j.fy); x.stroke(); if (hi) { x.strokeStyle = hi; x.lineWidth = w*.3; x.beginPath(); x.moveTo(j.sx - w*.15, j.sy); x.lineTo(j.kx - w*.15, j.ky); x.lineTo(j.fx - w*.15, j.fy); x.stroke(); } };
  const boot = (j, col, ang) => { x.save(); x.translate(j.fx, j.fy); x.rotate(ang || 0); const bg = x.createLinearGradient(0, -h*.04, 0, h*.03); bg.addColorStop(0, '#5a3d2c'); bg.addColorStop(1, '#2c1d15'); x.fillStyle = bg; x.beginPath(); x.moveTo(-h*.035, -h*.07); x.lineTo(h*.03, -h*.07); x.quadraticCurveTo(h*.04, -h*.02, h*.1, h*.002); x.lineTo(h*.1, h*.022); x.lineTo(-h*.04, h*.022); x.closePath(); x.fill(); x.fillStyle = 'rgba(20,12,8,.7)'; x.fillRect(-h*.04, h*.016, h*.14, h*.008); x.restore(); };
  legB.sx = hipX - h*.02; legB.sy = hipY; legF.sx = hipX + h*.02; legF.sy = hipY;
  limb(legB, h*.066, '#141e36'); boot(legB, '', walking ? -Math.max(0, -Math.cos(ph + Math.PI))*.3 : 0);
  armB.sx = -h*.03; armB.sy = shY + h*.02; limb(armB, h*.058, '#2b4273');
  x.fillStyle = SKIN_D; x.beginPath(); x.arc(armB.fx, armB.fy, h*.03, 0, 7); x.fill();
  limb(legF, h*.07, '#1d2a4a', 'rgba(150,175,225,.22)'); boot(legF, '', walking ? -Math.max(0, -Math.cos(ph))*.3 : 0);
  // ======== ÁO KHOÁC: vạt áo đung đưa theo bước đi ========
  const sw2 = walking ? Math.sin(ph)*h*.035 : 0, hem = sitting ? -h*.2 : -h*.33;
  const coat = x.createLinearGradient(-h*.22, shY - h*.1, h*.2, hem); coat.addColorStop(0, '#6781b8'); coat.addColorStop(.35, '#3a5792'); coat.addColorStop(.75, '#273d6c'); coat.addColorStop(1, '#192848');
  x.fillStyle = coat; x.beginPath(); x.moveTo(-h*.125, shY - h*.045);
  x.bezierCurveTo(-h*.2, shY + h*.1, -h*.2, hem - h*.1, -h*.17 + sw2*.5, hem); x.quadraticCurveTo(-h*.02 + sw2, hem + h*.035, h*.17 + sw2*.5, hem);
  x.bezierCurveTo(h*.2, hem - h*.12, h*.19, shY + h*.1, h*.115, shY - h*.045); x.quadraticCurveTo(0, shY - h*.085, -h*.125, shY - h*.045); x.fill();
  x.strokeStyle = 'rgba(15,25,50,.45)'; x.lineWidth = h*.008; x.stroke();
  x.strokeStyle = 'rgba(190,212,250,.22)'; x.lineWidth = h*.01; x.beginPath(); x.moveTo(-h*.06, shY + h*.05); x.quadraticCurveTo(-h*.03, (shY + hem)/2, -h*.08 + sw2*.4, hem - h*.01); x.stroke();
  x.beginPath(); x.moveTo(h*.07, shY + h*.03); x.quadraticCurveTo(h*.1, (shY + hem)/2, h*.09 + sw2*.5, hem - h*.01); x.stroke();
  x.fillStyle = '#e9d8a8'; for (const k of [0, 1]) { x.beginPath(); x.arc(h*.095, shY + h*.1 + k*h*.07, h*.008, 0, 7); x.fill(); }
  const by = sitting ? -h*.31 : -h*.5 - bob; x.fillStyle = '#6b4529'; x.beginPath(); x.roundRect(-h*.14, by, h*.29, h*.036, h*.012); x.fill(); x.fillStyle = '#f1c66e'; x.beginPath(); x.roundRect(h*.03, by - h*.006, h*.046, h*.048, h*.008); x.fill();
  // ======== CÁNH TAY GẦN + SÁCH / TÁCH TRÀ / ĐÈN ========
  armF.sx = h*.03; armF.sy = shY + h*.02; limb(armF, h*.06, '#3a5792', 'rgba(170,195,240,.28)');
  x.fillStyle = '#e8d6a8'; x.beginPath(); x.ellipse((armF.kx*.35 + armF.fx*.65), (armF.ky*.35 + armF.fy*.65), h*.034, h*.02, Math.atan2(armF.fy - armF.ky, armF.fx - armF.kx), 0, 7); x.fill();
  x.fillStyle = SKIN; x.beginPath(); x.arc(armF.fx, armF.fy, h*.031, 0, 7); x.fill();
  if (pose === 'warm') { x.save(); x.globalCompositeOperation = 'lighter'; glow('f', armF.fx + h*.04, armF.fy, h*.55, .26 + .06*Math.sin(t/120)); x.restore(); x.globalAlpha = 1; }
  if (holdBook) { x.save(); x.translate(armF.fx + h*.012, armF.fy - h*.02); x.rotate(-.18); const pf = Math.sin(t/2200) > .96 ? 1 : 0;
    x.fillStyle = '#5b3927'; x.beginPath(); x.roundRect(-h*.01, -h*.085, h*.15, h*.11, h*.008); x.fill(); x.fillStyle = '#f6ecd6'; x.fillRect(h*.0, -h*.078, h*.06, h*.096); x.fillStyle = '#efe2c6'; x.fillRect(h*.06, -h*.078, h*.065*(pf ? .5 : 1), h*.096);
    x.strokeStyle = 'rgba(80,60,40,.45)'; x.lineWidth = 1; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(h*.008, -h*.07 + k*h*.018); x.lineTo(h*.055, -h*.07 + k*h*.018); x.stroke(); } x.restore(); }
  if (pose === 'tea') { const cx = armF.fx + h*.01, cy2 = armF.fy - h*.01; x.fillStyle = '#f4ecd9'; x.beginPath(); x.roundRect(cx - h*.025, cy2 - h*.05, h*.05, h*.055, h*.01); x.fill(); x.strokeStyle = '#f4ecd9'; x.lineWidth = h*.008; x.beginPath(); x.arc(cx + h*.03, cy2 - h*.025, h*.016, -1.3, 1.3); x.stroke();
    x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 1.4; for (let k = 0; k < 2; k++) { x.beginPath(); x.moveTo(cx - h*.01 + k*h*.015, cy2 - h*.06); x.quadraticCurveTo(cx + Math.sin(t/300 + k)*h*.02, cy2 - h*.1, cx - h*.005 + k*h*.02, cy2 - h*.14 - k*h*.02); x.stroke(); } }
  if (lamp && !inside && !sitting && !em) { x.save(); x.translate(armF.fx + h*.01, armF.fy + h*.005); x.rotate(Math.sin(t/300 + ph)*.08);
    x.strokeStyle = '#725033'; x.lineWidth = h*.012; x.beginPath(); x.moveTo(-h*.02, -h*.005); x.quadraticCurveTo(0, -h*.07, h*.035, -h*.005); x.stroke();
    const lg = x.createLinearGradient(-h*.035, 0, h*.035, h*.1); lg.addColorStop(0, '#fff5c8'); lg.addColorStop(.45, '#ffd36e'); lg.addColorStop(1, '#bf6c32');
    x.fillStyle = lg; x.beginPath(); x.roundRect(-h*.035, 0, h*.07, h*.1, h*.014); x.fill(); x.strokeStyle = 'rgba(100,58,27,.8)'; x.lineWidth = h*.012; x.strokeRect(-h*.04, -h*.005, h*.08, h*.11);
    x.globalCompositeOperation = 'lighter'; glow('w', 0, h*.05, h*.62, .13); x.globalCompositeOperation = 'source-over'; x.restore(); }
  // ======== ĐẦU: nghiêng theo hành động, khuôn mặt biểu cảm, mũ len có cục bông ========
  const look = em === 'stargaze' ? 0 : Math.sin(t/2600)*.9;
  const tilt = em === 'stargaze' ? -.32 : em === 'yawn' ? -.12 : pose === 'read' ? .16 : pose === 'tea' ? Math.sin((t % 5200)/1500*Math.PI)*-.06 : Math.sin(t/3100)*.03 + (walking ? Math.sin(ph*2)*.012 : 0);
  const hy = shY - h*.15;
  x.save(); x.translate(0, hy); x.rotate(tilt);
  x.fillStyle = SKIN; x.fillRect(-h*.025, h*.07, h*.05, h*.06);
  x.fillStyle = '#4a3326'; x.beginPath(); x.ellipse(-h*.06, h*.005, h*.045, h*.075, .2, 0, 7); x.fill();
  drawFaceX(h, 0, t, ex, tilt, look);
  const hat = x.createLinearGradient(0, -h*.13, 0, -h*.012); hat.addColorStop(0, '#6d89c4'); hat.addColorStop(.6, '#38558e'); hat.addColorStop(1, '#233a66');
  x.fillStyle = hat; x.beginPath(); x.moveTo(-h*.105, -h*.012); x.bezierCurveTo(-h*.12, -h*.105, -h*.04, -h*.145, h*.03, -h*.135); x.bezierCurveTo(h*.09, -h*.125, h*.115, -h*.07, h*.112, -h*.012); x.closePath(); x.fill();
  x.fillStyle = '#26406e'; x.beginPath(); x.roundRect(-h*.113, -h*.034, h*.232, h*.04, h*.014); x.fill(); x.strokeStyle = 'rgba(195,215,255,.3)'; x.lineWidth = 1; for (let k = 0; k < 11; k++) { x.beginPath(); x.moveTo(-h*.105 + k*h*.021, -h*.032); x.lineTo(-h*.105 + k*h*.021, h*.004); x.stroke(); }
  const pb = Math.sin(t/260 + (walking ? ph : 0))*h*.01*(walking ? 2 : .4), pg2 = x.createRadialGradient(-h*.095, -h*.12 + pb, 1, -h*.095, -h*.12 + pb, h*.034); pg2.addColorStop(0, '#fff8e6'); pg2.addColorStop(1, '#d8c79c');
  x.fillStyle = pg2; x.beginPath(); x.arc(-h*.095, -h*.12 + pb, h*.034, 0, 7); x.fill();
  x.restore();
  // ======== KHĂN QUÀNG: đuôi khăn bay theo gió/bước chân ========
  const palette = ({ fox: ['#ffb36b', '#c94832'], crystal: ['#c4f6ff', '#4d8fe2'], violet: ['#e2c1ff', '#8052c7'], gold: ['#f6d47b', '#a86d2a'] })[S.customLook || 'gold'] || ['#f6d47b', '#a86d2a'];
  const sc = x.createLinearGradient(-h*.12, shY - h*.05, h*.08, shY + h*.05); sc.addColorStop(0, palette[0]); sc.addColorStop(1, palette[1]);
  x.fillStyle = sc; x.beginPath(); x.roundRect(-h*.115, shY - h*.062, h*.23, h*.056, h*.02); x.fill();
  const fl = inside ? Math.sin(t/440)*h*.012 : wind*h*.055 + Math.sin(t/210)*h*.018 + (walking ? Math.sin(ph)*h*.02 : 0), fl2 = Math.sin(t/330 + 1)*h*.012;
  x.fillStyle = sc; x.beginPath(); x.moveTo(-h*.08, shY - h*.03); x.bezierCurveTo(-h*.17, shY - h*.02 + fl, -h*.24, shY + h*.07 + fl, -h*.33, shY + h*.1 + fl + fl2);
  x.quadraticCurveTo(-h*.27, shY + h*.15 + fl, -h*.2, shY + h*.1 + fl*.6); x.bezierCurveTo(-h*.16, shY + h*.06, -h*.1, shY + h*.03, -h*.04, shY + h*.02); x.fill();
  x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 1; x.beginPath(); x.moveTo(-h*.09, shY - h*.012); x.bezierCurveTo(-h*.17, shY + fl, -h*.23, shY + h*.075 + fl, -h*.3, shY + h*.1 + fl + fl2); x.stroke();
  x.restore();
  if (pl.moodT > 0 && pl.mood) {
    const bby = py - h*(sitting ? .98 : 1.14) - Math.sin(t/240)*2 - jumpY;
    x.save(); x.globalAlpha = Math.min(1, pl.moodT*1.5); x.fillStyle = 'rgba(10,18,44,.84)'; x.strokeStyle = 'rgba(255,224,125,.52)'; x.lineWidth = 1;
    x.beginPath(); x.arc(px, bby, 12, 0, Math.PI*2); x.fill(); x.stroke(); x.font = '12px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff4cf'; x.fillText(pl.mood, px, bby); x.restore();
  }
}

function drawPetVector(type, px, groundY, size, t, phase, moving, cozy=false) {
  const gait = moving ? Math.sin(t/105 + phase) : Math.sin(t/720 + phase)*.12;
  const hop = moving ? Math.max(0,Math.sin(t/210+phase))*size*.12 : 0;
  const tail = Math.sin(t/250+phase)*size*.16;
  x.save(); x.globalAlpha=1; x.globalCompositeOperation='source-over'; x.translate(px,groundY-hop);
  // feathered contact shadow
  const sg=x.createRadialGradient(0,0,1,0,0,size*.52); sg.addColorStop(0,'rgba(3,7,17,.25)'); sg.addColorStop(1,'rgba(3,7,17,0)'); x.fillStyle=sg; x.beginPath(); x.ellipse(0,0,size*.52,size*.14,0,0,Math.PI*2); x.fill();
  const bodyPalette=[['#b4a4dc','#675d91'],['#ffb46c','#b94a26'],['#9daed1','#46557e'],['#b8a078','#65583d'],['#f5f0e9','#a9b8d0'],['#8de7e0','#397f86'],['#a9b7c9','#60768c'],['#e6e5f3','#8d9dbd'],['#8bdcaa','#357d63'],['#b9a1a0','#73565c'],['#78b8a0','#376c61'],['#9dc8ee','#557cb0']];
  const c=bodyPalette[type%bodyPalette.length], body=x.createLinearGradient(-size*.45,-size*.75,size*.35,0); body.addColorStop(0,c[0]); body.addColorStop(1,c[1]);
  x.lineCap='round'; x.lineJoin='round';
  // tail / wings first, so the body occludes their roots
  if(type===1||type===8||type===0){ x.strokeStyle=body; x.lineWidth=size*.20; x.beginPath(); x.moveTo(size*.22,-size*.28); x.quadraticCurveTo(size*(.72+tail*.3),-size*.42,size*.66,-size*(.76+Math.abs(tail)*.15)); x.stroke(); }
  if(type===5||type===7||type===11){
    x.fillStyle=body; for(let side of [-1,1]){x.beginPath();x.ellipse(side*size*.25,-size*.58,size*.23,size*(type===5?.34:.25),side*.42,0,Math.PI*2);x.fill();}
  }
  // body silhouette: soft rounded quadruped; variants receive distinct ears, antlers, shell or muzzle
  x.fillStyle=body; x.beginPath(); x.ellipse(0,-size*.31,size*(type===2?.30:.43),size*.30,0,0,Math.PI*2); x.fill();
  x.fillStyle=c[0]; x.beginPath(); x.ellipse(size*.25,-size*.47,size*.22,size*.22,0,0,Math.PI*2); x.fill();
  if(type===4){ x.fillStyle=body; x.beginPath(); x.ellipse(size*.22,-size*.77,size*.075,size*.23,-.15,0,Math.PI*2); x.ellipse(size*.36,-size*.75,size*.07,size*.21,.12,0,Math.PI*2); x.fill(); }
  else if(type===3){ x.strokeStyle=c[1]; x.lineWidth=size*.045; for(const side of [-1,1]){x.beginPath();x.moveTo(size*.22+side*size*.04,-size*.75);x.lineTo(size*.22+side*size*.10,-size*.96);x.lineTo(size*.22+side*size*.18,-size*.98);x.moveTo(size*.22+side*size*.10,-size*.88);x.lineTo(size*.22+side*size*.20,-size*.90);x.stroke();} }
  else if(type===2){ x.fillStyle=body; x.beginPath();x.moveTo(size*.08,-size*.72);x.lineTo(size*.01,-size*.91);x.lineTo(size*.17,-size*.78);x.moveTo(size*.25,-size*.72);x.lineTo(size*.32,-size*.91);x.lineTo(size*.38,-size*.75);x.fill(); }
  else if(type===8){ x.fillStyle=body; x.beginPath();x.moveTo(size*.25,-size*.65);x.lineTo(size*.20,-size*.84);x.lineTo(size*.32,-size*.75);x.lineTo(size*.38,-size*.86);x.lineTo(size*.40,-size*.65);x.fill(); }
  else if(type===9){ x.strokeStyle=c[1];x.lineWidth=size*.04;for(let i=0;i<5;i++){x.beginPath();x.moveTo(-size*.25+i*size*.11,-size*.48);x.lineTo(-size*.30+i*size*.11,-size*.59);x.stroke();} }
  else if(type===10){ x.fillStyle=c[1];x.beginPath();x.ellipse(0,-size*.39,size*.34,size*.23,0,Math.PI,Math.PI*2);x.fill();x.strokeStyle='rgba(224,245,220,.4)';x.lineWidth=1;x.beginPath();x.moveTo(-size*.2,-size*.4);x.lineTo(size*.2,-size*.4);x.moveTo(0,-size*.59);x.lineTo(0,-size*.2);x.stroke(); }
  // legs with alternating gait, visibly planted at the baseline
  if(type!==5&&type!==7&&type!==11){
    x.strokeStyle=c[1];x.lineWidth=size*.075;
    for(let i=0;i<4;i++){const xx=(i<2?-1:1)*size*(i%2?.23:.14), phaseLeg=gait*(i%2?-1:1);x.beginPath();x.moveTo(xx,-size*.20);x.lineTo(xx+phaseLeg*size*.18,size*.005);x.stroke();}
  }
  // face / eye highlight
  x.fillStyle='#17233b';x.beginPath();x.arc(size*.31,-size*.53,size*.025,0,Math.PI*2);x.fill();x.fillStyle='#fff4d4';x.beginPath();x.arc(size*.318,-size*.54,size*.009,0,Math.PI*2);x.fill();
  if(type===1||type===8){x.fillStyle='#fff0d7';x.beginPath();x.ellipse(size*.43,-size*.39,size*.12,size*.07,.1,0,Math.PI*2);x.fill();}
  if(type===5||type===8||type===11){x.globalCompositeOperation='lighter';const rg=x.createRadialGradient(size*.24,-size*.5,1,size*.24,-size*.5,size*.36);rg.addColorStop(0,'rgba(197,255,240,.34)');rg.addColorStop(1,'rgba(197,255,240,0)');x.fillStyle=rg;x.beginPath();x.arc(size*.24,-size*.5,size*.36,0,Math.PI*2);x.fill();x.globalCompositeOperation='source-over';}
  // occasional idle sniff, ear twitch and tail sway are deliberately subtle
  if(!moving && Math.sin(t/1100+phase)> .92){x.strokeStyle='rgba(255,241,202,.65)';x.lineWidth=1;x.beginPath();x.moveTo(size*.42,-size*.4);x.lineTo(size*.49,-size*.42);x.stroke();}
  x.restore();
}

function drawCompanions(t, baseX, groundY, indoor=false) {
  // Intentionally empty: the autonomous ecology renderer at the end of this file
  // owns pet positions and animation. Keeping this legacy hook prevents changing
  // the original room/forest draw order while eliminating duplicate follower sprites.
}

function drawMe(t, gy) {
  if (inside || pl.x < 0) return;
  const bridgeOff = bridgeY(pl.x);
  man(pl.x, gy + H*.19 + bridgeOff, H*.155, t, pl.dir, pl.ph, pl.pose, 1);
}

function drawMeIn(t) {
  if (pl.ix < 0) return;
  const z = pl.pose === 'sleep';
  const seated = pl.pose === 'sit' || pl.pose === 'read' || pl.pose === 'tea' || pl.pose === 'warm';
  const hx = pl.pose === 'warm' ? W*.70 : pl.pose === 'tea' ? W*.385 : seated ? W*.31 : pl.ix;
  const hy = z ? H*.63 : seated ? H*.82 : H*.85;
  const indoorX = Math.max(W*.13, Math.min(W*.88, hx));
  man(z ? W*.25 : indoorX, hy, H*.255, t, pl.dir, pl.ph, pl.pose, (!inside && !z && !seated && pl.pose !== 'read') ? 1 : 0);
}

function pets(t, gy) { drawMe(t, gy); }

/* ============ INTERIOR (Chi tiết) ============ */
function mkTex(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; }
const rnd0 = (() => { let q = 7; return () => (q = (q * 16807) % 2147483647) / 2147483647; })();
function grain(g, w, h, vert) {
  for (let i = 0; i < 80; i++) {
    const p = rnd0()*(vert ? w : h), d = () => rnd0()*8 - 4;
    g.strokeStyle = `rgba(${rnd0() < .5 ? '0,0,0' : '255,210,150'},${.05 + rnd0()*.1})`; g.lineWidth = .5 + rnd0()*1.5; g.beginPath();
    if (vert) { g.moveTo(p, 0); g.bezierCurveTo(p + d(), h*.3, p + d(), h*.7, p + d(), h); } else { g.moveTo(0, p); g.bezierCurveTo(w*.3, p + d(), w*.7, p + d(), w, p + d()); }
    g.stroke();
  }
  for (let k = 0; k < 4; k++) { const kx = rnd0()*w, ky = rnd0()*h; g.strokeStyle = 'rgba(0,0,0,.25)'; for (let r = 2; r < 9; r += 2) { g.beginPath(); g.ellipse(kx, ky, vert ? r*.7 : r*1.5, vert ? r*1.5 : r*.7, 0, 0, 7); g.stroke(); } }
}
const TEX_V = mkTex(128, 256, (g, w, h) => grain(g, w, h, true));
const TEX_H = mkTex(256, 128, (g, w, h) => grain(g, w, h, false));
const TEX_N = mkTex(128, 128, (g, w, h) => { for (let i = 0; i < 1400; i++) { g.fillStyle = `rgba(${rnd0() < .5 ? '0,0,0' : '200,215,255'},${.04 + rnd0()*.1})`; g.fillRect(rnd0()*w, rnd0()*h, 1 + rnd0()*2, 1 + rnd0()*2); } });
window.__fireBoostUntil = 0; let __fireFeedAt = 0;
function feedFire() {
  const now = Date.now(); if (now < __fireFeedAt) return; __fireFeedAt = now + 1800;
  window.__fireBoostUntil = now + 4500; S.logs = (S.logs || 0) + 1;
  const b = tapPow()*2; add(b); setMood('🔥', 2.2); toast('🪵 Thêm củi: lửa bùng lên! +' + fm(b) + ' ánh sáng');
  try { for (let i = 0; i < 18; i++) P.push({ k: 's', c: 'f', x: W*.8 + (Math.random() - .5)*W*.1, y: H*.6, vx: (Math.random() - .5)*140, vy: -80 - Math.random()*170, life: 1 }); } catch (_) {}
  try { arp([0, 4, 7], .1); } catch (_) {}
}
function drawFlames(t, fx, fw, fb, fh, fe) {
  fe = fe*(1 + .6*Math.max(0, window.__fireBoostUntil - Date.now())/4500);
  x.save(); x.globalCompositeOperation = 'lighter';
  const base = fb - 14, cx0 = fx + fw*.5;
  const lg = x.createRadialGradient(cx0, base, 2, cx0, base, fw*.3); lg.addColorStop(0, 'rgba(255,120,30,.55)'); lg.addColorStop(1, 'rgba(255,60,0,0)');
  x.fillStyle = lg; x.fillRect(fx, base - fw*.2, fw, fw*.4);
  for (let k = 0; k < 7; k++) {
    const u = k/6, bx = fx + fw*(.3 + .4*u), env = 1 - Math.abs(u - .5)*1.3;
    const hh = fh*.5*env*(.75 + .25*Math.sin(t/(90 + k*17) + k*2.1)*Math.sin(t/(210 + k*31)))*fe*(.8 + .2*Math.sin(t/330 + k));
    const sw = Math.sin(t/(260 + k*40) + k)*fw*.025 + Math.sin(t/110 + k*3)*fw*.008, ww = fw*.06*(.7 + env*.5);
    for (const [sc, col] of [[1, 'rgba(255,70,10,.55)'], [.78, 'rgba(255,140,30,.6)'], [.5, 'rgba(255,210,90,.7)'], [.25, 'rgba(255,250,220,.8)']]) {
      const h2 = hh*sc, w2 = ww*sc; x.fillStyle = col; x.beginPath(); x.moveTo(bx - w2, base);
      x.bezierCurveTo(bx - w2*1.2, base - h2*.45, bx + sw*.6 - w2*.35, base - h2*.7, bx + sw, base - h2);
      x.bezierCurveTo(bx + sw*.6 + w2*.35, base - h2*.7, bx + w2*1.2, base - h2*.45, bx + w2, base); x.closePath(); x.fill();
    }
  }
  for (let i = 0; i < 16; i++) {
    const ph = (t/1700 + i*.173) % 1, sx = fx + fw*(.32 + ((i*.618)%1)*.36) + Math.sin(i + t/260)*10*ph;
    glow('f', sx, base - ph*fh*.85, 3 + 3*(1 - ph), (1 - ph)*.9*fe);
  }
  glow('f', cx0, base - fh*.1, fw*.5*fe, .5*fe);
  x.restore();
}

/* ===== VẼ LẠI: cây (sprite có cache) + nội thất ===== */
const rsd = (sd, k) => { const v = Math.sin(sd*12.9898 + k*78.233)*43758.5453; return v - Math.floor(v); };
const fogc = (r, g, b, d) => { const f = Math.max(0, Math.min(1, .25 + d*.75)); return `rgb(${(14 + (r - 14)*f)|0},${(28 + (g - 28)*f)|0},${(58 + (b - 58)*f)|0})`; };
const lgr = (a, b, c, d, st) => { const q = x.createLinearGradient(a, b, c, d); st.forEach((v, i) => q.addColorStop(i/(st.length - 1), v)); return q; };

function paintOak(g, h, d, s) {
  // Organic oak crown: irregular overlapping foliage masses, not smooth spherical blobs.
  const tw=h*.06, tr=g.createLinearGradient(-tw,0,tw,0);
  tr.addColorStop(0,fogc(34,22,16,d));tr.addColorStop(.6,fogc(80,55,38,d));tr.addColorStop(1,fogc(40,28,20,d));
  g.fillStyle=tr;g.beginPath();g.moveTo(-tw*1.5,0);g.quadraticCurveTo(-tw*.6,-h*.2,-tw*.5,-h*.4);g.lineTo(tw*.5,-h*.4);g.quadraticCurveTo(tw*.6,-h*.2,tw*1.5,0);g.fill();
  g.strokeStyle=fogc(55,38,26,d);g.lineWidth=tw*.7;g.lineCap='round';
  for(const side of [-1,1]){g.beginPath();g.moveTo(0,-h*.34);g.quadraticCurveTo(side*h*.1,-h*.42,side*h*.2,-h*.55);g.stroke();}
  const masses=[];
  for(let k=0;k<15;k++) masses.push({bx:(rsd(s,k*2)-.5)*h*.58,by:-h*.64+(rsd(s,k*2+1)-.5)*h*.34,r:h*(.105+rsd(s,k+30)*.075),seed:k});
  masses.sort((a,b)=>a.by-b.by).forEach((b,bi)=>{
    const palette=[fogc(63,119,79,d),fogc(42,94,69,d),fogc(28,70,58,d),fogc(82,133,87,d)];
    const rg=g.createRadialGradient(b.bx+b.r*.22,b.by-b.r*.28,b.r*.08,b.bx,b.by,b.r*1.25);
    rg.addColorStop(0,palette[bi%4]);rg.addColorStop(.62,fogc(25,67,55,d));rg.addColorStop(1,fogc(8,26,32,d));
    // Asymmetric scalloped silhouette with deterministic lobes.
    g.beginPath();
    for(let q=0;q<12;q++){
      const a=q*Math.PI/6,rr=b.r*(.72+rsd(s,bi*31+q*7)*.42),px=b.bx+Math.cos(a)*rr,py=b.by+Math.sin(a)*rr*.78;
      if(q===0)g.moveTo(px,py);else{const pa=(q-.5)*Math.PI/6,pr=b.r*(.82+rsd(s,bi*37+q*11)*.24);g.quadraticCurveTo(b.bx+Math.cos(pa)*pr,b.by+Math.sin(pa)*pr*.8,px,py);}
    }
    g.closePath();g.fillStyle=rg;g.fill();
    // Individual leaf clusters follow the crown edge and break the ball-like outline.
    for(let q=0;q<17;q++){
      const a=rsd(s,bi*101+q*13)*Math.PI*2,rr=b.r*(.58+rsd(s,bi*131+q*17)*.48),lx=b.bx+Math.cos(a)*rr,ly=b.by+Math.sin(a)*rr*.76,lr=b.r*(.075+rsd(s,bi*151+q*19)*.045);
      g.save();g.translate(lx,ly);g.rotate(a*.38+(rsd(s,q+bi*17)-.5)*.8);
      g.fillStyle=q%5===0?fogc(112,158,96,d):q%3===0?fogc(37,91,65,d):fogc(24,65,55,d);
      g.beginPath();g.moveTo(-lr*1.4,0);g.quadraticCurveTo(-lr*.6,-lr*.95,lr*.35,-lr*.55);g.quadraticCurveTo(lr*1.5,-lr*.1,lr*.65,lr*.45);g.quadraticCurveTo(-lr*.25,lr*.65,-lr*1.4,0);g.fill();
      if(q%4===0){g.strokeStyle='rgba(190,230,166,.22)';g.lineWidth=Math.max(.5,h*.001);g.beginPath();g.moveTo(-lr,0);g.quadraticCurveTo(0,-lr*.12,lr*.7,-lr*.18);g.stroke();}g.restore();
    }
  });
  // Small gaps reveal depth between foliage masses.
  for(let k=0;k<22;k++){const px=(rsd(s,k+190)-.5)*h*.55,py=-h*(.62+rsd(s,k+230)*.3);g.fillStyle=k%2?'rgba(2,12,22,.22)':'rgba(175,225,166,.12)';g.beginPath();g.ellipse(px,py,h*.003,h*.006,rsd(s,k+270),0,Math.PI*2);g.fill();}
}

function paintBirch(g, h, d, s) {
  const tw = h*.022, tr = g.createLinearGradient(-tw, 0, tw, 0); tr.addColorStop(0, fogc(150, 160, 175, d)); tr.addColorStop(.5, fogc(235, 240, 245, d)); tr.addColorStop(1, fogc(120, 130, 150, d));
  g.fillStyle = tr; g.beginPath(); g.moveTo(-tw*1.3, 0); g.quadraticCurveTo(-tw*.5 + rsd(s, 1)*tw, -h*.4, -tw*.6, -h*.78); g.lineTo(tw*.6, -h*.78); g.quadraticCurveTo(tw*.5 + rsd(s, 1)*tw, -h*.4, tw*1.3, 0); g.fill();
  g.fillStyle = fogc(25, 28, 35, d);
  for (let k = 0; k < 14; k++) g.fillRect(-tw*.9, -h*(.05 + k*.05), tw*(.8 + rsd(s, k)*.9), 2 + rsd(s, k + 20)*2);
  g.strokeStyle = fogc(190, 195, 205, d); g.lineWidth = 2; g.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const sd = k%2 ? 1 : -1; g.beginPath(); g.moveTo(0, -h*(.5 + k*.1)); g.quadraticCurveTo(sd*h*.07, -h*(.55 + k*.1), sd*h*.13, -h*(.62 + k*.1)); g.stroke(); }
  // Birch crown is airy and leaf-built: irregular sprays rather than green balls.
  for (let k = 0; k < 9; k++) {
    const bx=(rsd(s,k*3)-.5)*h*.29, by=-h*(.63+rsd(s,k*3+1)*.21), r=h*(.045+rsd(s,k*3+2)*.035);
    const base=fogc(37+k%3*15,108+k%2*24,88+k%3*10,d);
    for(let q=0;q<13;q++){
      const a=rsd(s,k*47+q*5)*Math.PI*2,rr=r*(.25+rsd(s,k*59+q*7)*.78),lx=bx+Math.cos(a)*rr,ly=by+Math.sin(a)*rr*.72,lr=r*(.12+rsd(s,k*71+q*11)*.08);
      g.save();g.translate(lx,ly);g.rotate(a*.4);g.fillStyle=q%4===0?fogc(108,171,119,d):base;
      g.beginPath();g.moveTo(-lr*1.5,0);g.quadraticCurveTo(-lr*.6,-lr,lr*.2,-lr*.55);g.quadraticCurveTo(lr*1.45,-lr*.12,lr*.55,lr*.42);g.quadraticCurveTo(-lr*.3,lr*.58,-lr*1.5,0);g.fill();g.restore();
    }
  }
}
const TC = new Map();

function rddDrawableSource(source) {
  if (!source) return null;
  if (typeof source.getContext === 'function' && (source.width < 1 || source.height < 1)) return null;
  if ('naturalWidth' in source && (!source.complete || source.naturalWidth < 1 || source.naturalHeight < 1)) return null;
  return source;
}
function drawTreeSprite(type, X, y, h, t, d, seed) {
  // Guard tree sprite canvases before drawImage; some cached sprites can be zero-sized
  // during initial generation or after a resize.
  const spriteCanvas = (typeof arguments !== 'undefined' && arguments.length)
    ? Array.from(arguments).find(v => v && typeof v === 'object' && 'width' in v && 'height' in v && typeof v.getContext === 'function')
    : null;
  if (spriteCanvas && (spriteCanvas.width < 1 || spriteCanvas.height < 1)) return;

  const sv = Math.floor(Math.abs(seed)*977)%6 + 1, key = type + sv + '|' + Math.round(h/6) + '|' + Math.round(d*4);
  let c = TC.get(key);
  if (!c) {
    if (TC.size > 90) TC.clear();
    const w = Math.ceil(h*.95), hh = Math.ceil(h*1.08);
    c = document.createElement('canvas'); c.width = w; c.height = hh;
    const g = c.getContext('2d'); g.translate(w/2, hh - 2);
    ({ pine: paintPine, oak: paintOak, birch: paintBirch })[type](g, h, d, sv);
    TC.set(key, c);
  }
  // Validate the cached offscreen sprite itself; arguments to this function are not canvases.
  if (!c || c.width < 1 || c.height < 1) {
    TC.delete(key);
    return;
  }
  x.save(); x.translate(X, y); x.transform(1, 0, Math.sin(t/1700 + seed)*.012*(.4 + d), 1, 0, 0);
  x.drawImage(c, -c.width/2, -c.height + 2); x.restore();
}
function drawRealisticPine(X, y, h, t, depth, seed) { drawTreeSprite('pine', X, y, h, t, depth, seed); }
function drawRealisticOak(X, y, h, t, depth, seed) { drawTreeSprite('oak', X, y, h, t, depth, seed); }
function drawRealisticBirch(X, y, h, t, depth, seed) { drawTreeSprite('birch', X, y, h, t, depth, seed); }

function woodRect(X, Y, w, h, c) {
  x.fillStyle = lgr(X, Y, X, Y + h, c); x.fillRect(X, Y, w, h);
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip(); x.fillStyle = x.createPattern(TEX_V, 'repeat'); x.fillRect(X, Y, w, h); x.restore();
  x.strokeStyle = 'rgba(0,0,0,.45)'; x.lineWidth = 1; x.strokeRect(X, Y, w, h); x.fillStyle = 'rgba(255,220,170,.14)'; x.fillRect(X, Y, w, 1.5);
}
function drawShelf(bx, by, bw, bh, lvl) {
  woodRect(bx - 8, by - 10, bw + 16, bh + 16, ['#4a2f1b', '#2f1c0f']);
  x.fillStyle = lgr(0, by, 0, by + bh, ['#0d0804', '#1a0f08']); x.fillRect(bx, by, bw, bh);
  const rh = bh/3, pal = ['#7a2c2c', '#2c4f6e', '#8a7a2e', '#4d2f6e', '#2f6b4f', '#8a4a22', '#355a63', '#5a2a3f'];
  for (let r = 0; r < 3; r++) {
    const sy = by + (r + 1)*rh, lim = bx + bw*(lvl > 0 ? .98 : .62); let px = bx + 4;
    for (let k = 0; px < lim - 6; k++) {
      const q = r*13 + k*7, w = bw*(.022 + rsd(q, 1)*.022), hh = rh*(.6 + rsd(q, 2)*.3), lean = rsd(q, 3) > .93 ? .25 : 0;
      x.save(); x.translate(px + w/2, sy - 4); x.rotate(lean);
      x.fillStyle = lgr(-w/2, 0, w/2, 0, [pal[(q*3 + k)%8], 'rgba(0,0,0,.55)']); x.fillRect(-w/2, -hh, w, hh);
      x.fillStyle = 'rgba(255,220,140,.55)'; x.fillRect(-w/2, -hh*.8, w, 1.5); x.fillRect(-w/2, -hh*.25, w, 1.2); x.restore();
      px += w + 1 + lean*rh*.3;
    }
    woodRect(bx - 4, sy - 4, bw + 8, 8, ['#5a3822', '#34200f']);
  }
}
function drawBed(X, Y, w, h, lvl) {
  const fl = Y + h;
  x.fillStyle = 'rgba(0,0,0,.5)'; x.beginPath(); x.ellipse(X + w/2, fl + 2, w*.54, 10, 0, 0, 7); x.fill();
  x.fillStyle = '#24150b'; x.fillRect(X + 4, fl - h*.16, 9, h*.16); x.fillRect(X + w - 13, fl - h*.16, 9, h*.16);
  woodRect(X - 4, Y - h*.12, w*.06, h*.92, ['#5a3822', '#2c1a0d']);
  woodRect(X + w - w*.04, Y + h*.22, w*.045, h*.56, ['#4a2f1b', '#2c1a0d']);
  x.fillStyle = lgr(0, Y + h*.3, 0, Y + h*.7, ['#e4dccd', '#a99b86']); x.beginPath(); x.roundRect(X + w*.05, Y + h*.3, w*.9, h*.4, 8); x.fill();
  if (!(pl && pl.pose === 'sleep')) {
  x.fillStyle = lgr(0, Y + h*.2, 0, Y + h*.4, ['#fbf7ee', '#cfc6b4']); x.beginPath(); x.roundRect(X + w*.08, Y + h*.2, w*.2, h*.22, 10); x.fill();
  x.strokeStyle = 'rgba(80,70,60,.3)'; x.beginPath(); x.moveTo(X + w*.1, Y + h*.31); x.quadraticCurveTo(X + w*.18, Y + h*.28, X + w*.26, Y + h*.31); x.stroke();
  const c = lvl > 0 ? ['#a8435c', '#5e2236'] : ['#6a7284', '#3a4050'];
  x.fillStyle = lgr(0, Y + h*.28, 0, Y + h*.72, c); x.beginPath(); x.roundRect(X + w*.3, Y + h*.28, w*.64, h*.44, 9); x.fill();
  x.fillStyle = 'rgba(255,240,230,.22)'; x.beginPath(); x.roundRect(X + w*.3, Y + h*.28, w*.64, h*.07, 6); x.fill();
  x.save(); x.beginPath(); x.roundRect(X + w*.3, Y + h*.28, w*.64, h*.44, 9); x.clip(); x.strokeStyle = 'rgba(0,0,0,.16)';
  for (let k = -6; k < 14; k++) { x.beginPath(); x.moveTo(X + w*.3 + k*w*.06, Y + h*.28); x.lineTo(X + w*.3 + k*w*.06 + h*.44, Y + h*.72); x.stroke(); } x.restore();
  }
}
function drawChair(X, B, H0) {
  x.fillStyle = 'rgba(0,0,0,.45)'; x.beginPath(); x.ellipse(X, B + 2, H0*.3, H0*.05, 0, 0, 7); x.fill();
  x.fillStyle = '#24150b'; for (const dx of [-.2, .2]) x.fillRect(X + dx*H0 - 3, B - H0*.08, 6, H0*.08);
  x.fillStyle = lgr(X - H0*.25, 0, X + H0*.25, 0, ['#5e1f2c', '#8e3446', '#4a1822']);
  x.beginPath(); x.roundRect(X - H0*.2, B - H0*.52, H0*.4, H0*.46, [18, 18, 4, 4]); x.fill();
  x.beginPath(); x.roundRect(X - H0*.27, B - H0*.3, H0*.12, H0*.24, 8); x.fill(); x.beginPath(); x.roundRect(X + H0*.15, B - H0*.3, H0*.12, H0*.24, 8); x.fill();
  x.fillStyle = lgr(0, B - H0*.2, 0, B - H0*.08, ['#a04458', '#6d2535']); x.beginPath(); x.roundRect(X - H0*.17, B - H0*.2, H0*.34, H0*.12, 8); x.fill();
  x.fillStyle = 'rgba(0,0,0,.45)'; for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) { x.beginPath(); x.arc(X - H0*.1 + c*H0*.1, B - H0*.42 + r*H0*.1, 2, 0, 7); x.fill(); }
}

/* ===== NHÀ GỖ VẼ LẠI ===== */
function cabLayout(w, h) {
  const bw = w*.5, bh = h*.95, pk = h*2.05;
  return { bw, bh, pk, win: [-bw*.6, bw*.6].map(cx => ({ x: cx, y: -bh*.55, w: w*.17, h: h*.34 })), door: { x: 0, w: w*.16, h: h*.62 }, rw: { x: 0, y: -bh - h*.36, r: h*.15 }, ch: { x: bw*.38, w: w*.09 } };
}
function paintCabin(g, w, h, fence) {
  const { bw, bh, pk, win, door, rw, ch } = cabLayout(w, h);
  const L = (a, b, c, d, st) => { const q = g.createLinearGradient(a, b, c, d); st.forEach((v, i) => q.addColorStop(i/(st.length - 1), v)); return q; };
  const roofHalf = bw + w*.12, ry = -bh + h*.08, slope = X => ry - (pk + ry)*(1 - Math.min(1, Math.abs(X)/roofHalf));
  // đá móng
  for (let i = 0; i < 14; i++) { const sw = (2*bw + 8)/14, sx = -bw - 4 + i*sw, sh = h*.11*(.8 + rsd(i, 1)*.4);
    g.fillStyle = L(0, -sh, 0, 0, ['#6b7380', '#3a404c']); g.beginPath(); g.roundRect(sx, -sh, sw + 1, sh, 3); g.fill(); g.strokeStyle = 'rgba(0,0,0,.4)'; g.stroke(); }
  // tường gỗ tròn
  const n = 7, y0 = -h*.1, rh = (bh - h*.1)/n;
  for (let r = 0; r < n; r++) {
    const yy = y0 - (r + 1)*rh, v = rsd(r, 5);
    g.fillStyle = L(0, yy, 0, yy + rh, [`rgb(${120 + v*30|0},${78 + v*20|0},${46 + v*10|0})`, `rgb(${92 + v*20|0},${58 + v*14|0},${32})`, '#2e1b0e']);
    g.beginPath(); g.roundRect(-bw, yy, 2*bw, rh - 1, rh*.45); g.fill();
    g.strokeStyle = 'rgba(25,12,4,.35)'; for (let k = 0; k < 4; k++) { const gx = -bw + rsd(r, k + 9)*2*bw; g.beginPath(); g.moveTo(gx, yy + rh*.3); g.lineTo(gx + w*.12, yy + rh*.35); g.stroke(); }
    for (const sd of [-1, 1]) { const ex = sd*bw, ey = yy + rh*.5; g.fillStyle = L(ex - rh*.5, ey, ex + rh*.5, ey, ['#b98a55', '#6e4524']); g.beginPath(); g.arc(ex + sd*3, ey, rh*.5, 0, 7); g.fill();
      g.strokeStyle = 'rgba(40,20,8,.55)'; g.beginPath(); g.arc(ex + sd*3, ey, rh*.3, 0, 7); g.stroke(); g.beginPath(); g.arc(ex + sd*3, ey, rh*.14, 0, 7); g.stroke(); }
  }
  // đầu hồi ván đứng
  g.save(); g.beginPath(); g.moveTo(-bw*.94, -bh); g.lineTo(0, slope(0) + 4); g.lineTo(bw*.94, -bh); g.closePath(); g.clip();
  g.fillStyle = L(0, -pk, 0, -bh, ['#2c1b10', '#4a2e1a']); g.fillRect(-bw, -pk, 2*bw, pk);
  g.strokeStyle = 'rgba(10,5,2,.55)'; for (let px = -bw; px < bw; px += 9) { g.beginPath(); g.moveTo(px, -pk); g.lineTo(px, -bh); g.stroke(); }
  g.restore();
  // ống khói đá
  const cy = slope(ch.x);
  g.fillStyle = L(ch.x, 0, ch.x + ch.w, 0, ['#5d6470', '#2e333d']); g.fillRect(ch.x, cy - h*.55, ch.w, h*.6);
  g.strokeStyle = 'rgba(0,0,0,.4)'; for (let k = 0; k < 7; k++) { const py = cy - h*.55 + k*h*.09; g.beginPath(); g.moveTo(ch.x, py); g.lineTo(ch.x + ch.w, py); g.stroke(); g.beginPath(); g.moveTo(ch.x + ch.w*(k%2 ? .3 : .65), py); g.lineTo(ch.x + ch.w*(k%2 ? .3 : .65), py + h*.09); g.stroke(); }
  g.fillStyle = '#23272f'; g.fillRect(ch.x - 4, cy - h*.6, ch.w + 8, 7);
  // cửa sổ tròn
  g.fillStyle = '#1b0f07'; g.beginPath(); g.arc(rw.x, rw.y, rw.r + 5, 0, 7); g.fill(); g.fillStyle = '#10121c'; g.beginPath(); g.arc(rw.x, rw.y, rw.r, 0, 7); g.fill();
  // mái ngói
  g.save(); g.beginPath(); g.moveTo(-roofHalf, ry); g.lineTo(0, -pk); g.lineTo(roofHalf, ry); g.lineTo(roofHalf - 6, ry + 9); g.lineTo(-roofHalf + 6, ry + 9); g.closePath(); g.clip();
  g.fillStyle = L(-roofHalf, 0, roofHalf, 0, ['#2b1f1c', '#4a3430', '#241a18']); g.fillRect(-roofHalf, -pk, 2*roofHalf, pk + h);
  const rows = 9;
  for (let k = 0; k < rows; k++) {
    const yy = ry - k*(pk + ry)/rows, half = roofHalf*(1 - k/rows), tw = w*.045;
    for (let tx = -half; tx < half; tx += tw) { g.fillStyle = (Math.round(tx/tw) + k)%2 ? '#5a3e37' : '#3d2a26'; g.beginPath(); g.arc(tx + tw/2 + (k%2)*tw/2, yy, tw*.55, 0, Math.PI); g.fill(); g.strokeStyle = 'rgba(0,0,0,.45)'; g.stroke(); }
  }
  g.fillStyle = 'rgba(70,130,80,.32)'; for (let k = 0; k < 6; k++) { g.beginPath(); g.ellipse((rsd(k, 3) - .5)*roofHalf*1.3, ry - rsd(k, 4)*(pk + ry)*.7, w*.05, h*.03, 0, 0, 7); g.fill(); }
  g.restore();
  g.strokeStyle = '#1c120d'; g.lineWidth = 5; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-roofHalf, ry + 2); g.lineTo(0, -pk); g.lineTo(roofHalf, ry + 2); g.stroke();
  g.strokeStyle = 'rgba(255,225,170,.18)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(-roofHalf, ry - 1); g.lineTo(0, -pk - 2); g.lineTo(roofHalf, ry - 1); g.stroke();
  g.fillStyle = L(0, -bh, 0, -bh + h*.14, ['rgba(0,0,0,.55)', 'rgba(0,0,0,0)']); g.fillRect(-bw, -bh + 4, 2*bw, h*.14);
  // cửa sổ + cánh cửa chớp + chậu hoa
  win.forEach((o, i) => {
    g.fillStyle = '#1b0f07'; g.fillRect(o.x - o.w/2 - 5, o.y - o.h/2 - 5, o.w + 10, o.h + 10); g.fillStyle = '#10121c'; g.fillRect(o.x - o.w/2, o.y - o.h/2, o.w, o.h);
    for (const sd of [-1, 1]) { g.fillStyle = L(0, o.y - o.h/2, 0, o.y + o.h/2, ['#4e6b5a', '#2b3f33']); g.fillRect(o.x + sd*(o.w/2 + 5) - (sd < 0 ? o.w*.28 : 0), o.y - o.h/2 - 3, o.w*.28, o.h + 6);
      g.strokeStyle = 'rgba(0,0,0,.4)'; for (let k = 1; k < 6; k++) { const ly = o.y - o.h/2 + k*(o.h + 6)/6; g.beginPath(); g.moveTo(o.x + sd*(o.w/2 + 5) - (sd < 0 ? o.w*.28 : 0), ly); g.lineTo(o.x + sd*(o.w/2 + 5) - (sd < 0 ? o.w*.28 : 0) + o.w*.28, ly); g.stroke(); } }
    woodRectG(g, o.x - o.w*.62, o.y + o.h/2 + 5, o.w*1.24, h*.08);
    for (let k = 0; k < 7; k++) { g.fillStyle = ['#e87fa6', '#ffd36b', '#b98cff', '#7fd6ff'][(k + i)%4]; g.beginPath(); g.arc(o.x - o.w*.55 + k*o.w*.18, o.y + o.h/2 + 3 - rsd(k, i)*5, 3.2, 0, 7); g.fill(); g.fillStyle = '#2f7a4a'; g.beginPath(); g.ellipse(o.x - o.w*.55 + k*o.w*.18, o.y + o.h/2 + 7, 2, 4, .4, 0, 7); g.fill(); }
  });
  // cửa chính
  const dh = door.h, dw = door.w;
  g.fillStyle = '#1b0f07'; g.beginPath(); g.moveTo(-dw/2 - 6, 0); g.lineTo(-dw/2 - 6, -dh); g.arc(0, -dh, dw/2 + 6, Math.PI, 0); g.lineTo(dw/2 + 6, 0); g.fill();
  g.fillStyle = L(-dw/2, 0, dw/2, 0, ['#5b3820', '#7a4d2c', '#41260f']); g.beginPath(); g.moveTo(-dw/2, 0); g.lineTo(-dw/2, -dh); g.arc(0, -dh, dw/2, Math.PI, 0); g.lineTo(dw/2, 0); g.fill();
  g.strokeStyle = 'rgba(15,7,2,.6)'; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(-dw/2 + k*dw/4, 0); g.lineTo(-dw/2 + k*dw/4, -dh - dw*.4); g.stroke(); }
  g.fillStyle = '#22262e'; g.fillRect(-dw/2, -dh*.78, dw, 4); g.fillRect(-dw/2, -dh*.28, dw, 4);
  g.fillStyle = '#d8b25a'; g.beginPath(); g.arc(dw*.28, -dh*.5, 3, 0, 7); g.fill();
  g.fillStyle = L(0, -6, 0, 0, ['#7b828e', '#444a56']); g.beginPath(); g.roundRect(-dw*.8, -6, dw*1.6, 6, 3); g.fill();
  if (fence) { g.fillStyle = '#1f140c'; for (let i = -w*.7; i <= w*.7; i += 12) { if (i > -w*.3 && i < w*.3) continue; g.fillRect(i, -14, 3, 16); g.beginPath(); g.moveTo(i, -14); g.lineTo(i + 1.5, -18); g.lineTo(i + 3, -14); g.fill(); } g.fillRect(-w*.7, -10, w*1.4, 2); g.fillRect(-w*.7, -4, w*1.4, 2); }
}
function woodRectG(g, X, Y, w, h) { g.fillStyle = '#4a2f1b'; g.fillRect(X, Y, w, h); g.fillStyle = 'rgba(255,220,170,.15)'; g.fillRect(X, Y, w, 1.5); g.strokeStyle = 'rgba(0,0,0,.5)'; g.strokeRect(X, Y, w, h); }
const CABS = new Map();
function cabin(t, gy) {
  const X = W*.62, y = gy + H*.145, w = cabW(), h = H*.14;
  if (X < cam - w || X > cam + W + w) return;
  const fl = .88 + .12*Math.sin(t/160)*Math.sin(t/370), homeTotal = S.home.reduce((a, b) => a + b, 0);
  const houseTier = Math.min(4, Math.max(0, (S.hl || 1) - 1));
  const fence = (S.hl || 1) >= 2;
  const key = Math.round(w) + '|' + Math.round(h) + '|' + fence + '|tier' + houseTier; let sp = CABS.get(key);
  // Rebuild invalid cached cabin canvases; guard zero-sized backing stores before drawImage.
  if (!sp || sp.width < 1 || sp.height < 1) {
    CABS.delete(key);
    CABS.clear();
    const sw = Math.max(2, Math.ceil(w*1.9)), sh = Math.max(2, Math.ceil(h*2.6));
    sp = document.createElement('canvas'); sp.width = sw; sp.height = sh;
    const g = sp.getContext('2d');
    if (g) { g.translate(sw/2, sh - 6); paintCabin(g, w, h, fence); CABS.set(key, sp); }
  }
  const o = cabLayout(w, h);
  x.globalAlpha = 1; x.fillStyle = 'rgba(2,5,14,.55)'; x.beginPath(); x.ellipse(X, y + 5, w*.6, 12, 0, 0, 7); x.fill();
  if (sp && sp.width > 0 && sp.height > 0) x.drawImage(sp, X - sp.width/2, y - sp.height + 6);
  // Ngoại quan phát triển theo các mốc nội thất: mái, ống khói, đèn hiên, tháp tinh thể.
  x.save(); x.translate(X, y);
  if (houseTier >= 1) {
    x.strokeStyle = '#d6b879'; x.lineWidth = Math.max(1.5,w*.006);
    x.beginPath(); x.moveTo(-w*.39,-h*1.67); x.lineTo(0,-h*2.48); x.lineTo(w*.39,-h*1.67); x.stroke();
    for (const sx of [-1,1]) { x.fillStyle='#b88645'; x.fillRect(sx*w*.33-h*.035,-h*1.76,h*.07,h*.26); }
  }
  if (houseTier >= 2) {
    x.fillStyle='#403d55'; x.fillRect(w*.27,-h*2.18,w*.075,h*.4);
    x.fillStyle='#a5d8ff'; x.fillRect(w*.285,-h*2.12,w*.045,h*.12);
    x.globalCompositeOperation='lighter'; glow('f',w*.31,-h*2.08,h*.38,.55); x.globalCompositeOperation='source-over';
    // Đèn lồng hiên
    for (const sx of [-1,1]) { x.strokeStyle='#6d4a27';x.lineWidth=2;x.beginPath();x.moveTo(sx*w*.16,-h*.92);x.lineTo(sx*w*.16,-h*1.1);x.stroke();x.fillStyle='#ffd37a';x.beginPath();x.roundRect(sx*w*.16-w*.018,-h*1.12,w*.036,h*.07,3);x.fill();glow('f',sx*w*.16,-h*1.08,w*.13,.45); }
  }
  if (houseTier >= 3) {
    x.fillStyle='#25314b';x.strokeStyle='#9fbce8';x.lineWidth=1.4;
    x.beginPath();x.moveTo(-w*.48,-h*1.65);x.lineTo(-w*.48,-h*2.02);x.lineTo(-w*.31,-h*2.02);x.lineTo(-w*.31,-h*1.65);x.fill();x.stroke();
    x.beginPath();x.moveTo(w*.31,-h*1.65);x.lineTo(w*.31,-h*2.02);x.lineTo(w*.48,-h*2.02);x.lineTo(w*.48,-h*1.65);x.fill();x.stroke();
    x.fillStyle='#e9d9a3';x.fillRect(-w*.51,-h*2.05,w*.22,h*.04);x.fillRect(w*.29,-h*2.05,w*.22,h*.04);
  }
  if (houseTier >= 4) {
    x.globalCompositeOperation='lighter';
    for(let k=0;k<5;k++){const a=t/1800+k*Math.PI*2/5,rx=Math.cos(a)*w*.55,ry=-h*1.3+Math.sin(a)*h*.5;glow(k%2?'c':'w',rx,ry,h*(.45+.12*Math.sin(t/300+k)),.48);}
    x.globalCompositeOperation='source-over';
    x.strokeStyle='rgba(120,225,255,.8)';x.lineWidth=1.5;x.beginPath();x.ellipse(0,-h*1.35,w*.56,h*.32,Math.sin(t/2500)*.08,0,Math.PI*2);x.stroke();
  }
  // Phase 5.10: richer, level-driven exterior details. These are drawn in the cabin's
  // existing world transform and remain deterministic; no new background overlay.
  // Front steps and a short timber porch appear once the home is established.
  if (houseTier >= 1) {
    x.fillStyle='rgba(2,5,12,.42)'; x.beginPath(); x.ellipse(0, 4, w*.28, h*.11, 0, 0, Math.PI*2); x.fill();
    for(let k=0;k<3;k++){
      const sw=w*(.19-k*.025), sy=h*(.025+k*.045);
      const gr=x.createLinearGradient(0,sy,0,sy+h*.04);gr.addColorStop(0,'#8b6544');gr.addColorStop(.55,'#5a3a28');gr.addColorStop(1,'#302018');
      x.fillStyle=gr;x.beginPath();x.moveTo(-sw,sy);x.lineTo(sw,sy);x.lineTo(sw*.9,sy+h*.035);x.lineTo(-sw*.9,sy+h*.035);x.closePath();x.fill();
      x.strokeStyle='rgba(235,190,126,.3)';x.lineWidth=1;x.beginPath();x.moveTo(-sw*.9,sy+1);x.lineTo(sw*.9,sy+1);x.stroke();
    }
  }
  // Tier 2: flower planters with leaves and individual blossoms under both windows.
  if (houseTier >= 2) {
    for(const side of [-1,1]){
      const bx=side*w*.29, by=-h*.49, bw=w*.17;
      x.fillStyle='#4b2c1b';x.fillRect(bx-bw/2,by,bw,h*.045);
      x.fillStyle='#75482a';x.fillRect(bx-bw/2,by,bw,h*.012);
      for(let j=0;j<7;j++){
        const fx=bx-bw*.42+j*bw*.14, fy=by-h*(.015+(j%3)*.012);
        x.strokeStyle=j%2?'#39764b':'#4d8a55';x.lineWidth=1.5;x.beginPath();x.moveTo(fx,by);x.quadraticCurveTo(fx-3,fy-4,fx-2,fy-7);x.stroke();
        x.fillStyle=['#f3a8c5','#ffd77d','#b9a5ff','#f4e9cb'][(j+side+8)%4];x.beginPath();x.arc(fx,fy-5,2.2,0,Math.PI*2);x.fill();
      }
    }
  }
  // Tier 3: visible carved timber braces and a crest above the round attic window.
  if (houseTier >= 3) {
    x.strokeStyle='rgba(238,194,124,.8)';x.lineWidth=Math.max(1,w*.004);
    for(const side of [-1,1]){
      x.beginPath();x.moveTo(side*w*.39,-h*1.62);x.lineTo(side*w*.31,-h*1.82);x.lineTo(side*w*.23,-h*1.62);x.stroke();
      x.beginPath();x.moveTo(side*w*.42,-h*1.55);x.lineTo(side*w*.34,-h*1.55);x.stroke();
    }
    x.fillStyle='#f5d58d';x.strokeStyle='#6e4c2c';x.lineWidth=1.4;
    x.beginPath();x.moveTo(0,-h*2.28);x.lineTo(w*.025,-h*2.20);x.lineTo(0,-h*2.12);x.lineTo(-w*.025,-h*2.20);x.closePath();x.fill();x.stroke();
  }
  // Tier 4: an animated, restrained constellation sigil on the roof, not a screen-wide overlay.
  if (houseTier >= 4) {
    const sy=-h*1.92, pulse=.75+.25*Math.sin(t/360);
    x.save();x.globalCompositeOperation='lighter';x.globalAlpha=.55*pulse;
    x.strokeStyle='rgba(145,226,255,.9)';x.lineWidth=1.1;x.beginPath();x.arc(0,sy,w*.045,t/1800,t/1800+Math.PI*1.5);x.stroke();
    for(let k=0;k<4;k++){const a=t/1800+k*Math.PI/2,px=Math.cos(a)*w*.045,py=sy+Math.sin(a)*w*.045;x.fillStyle='#d6f5ff';x.beginPath();x.arc(px,py,1.7,0,Math.PI*2);x.fill();}
    x.restore();
  }
  x.restore();
  // ánh sáng ấm qua cửa sổ và cửa chính
  x.save(); x.translate(X, y);
  const warm = (cx, cy, ww, hh) => { const gr = x.createLinearGradient(0, cy - hh/2, 0, cy + hh/2); gr.addColorStop(0, `rgba(255,222,140,${.95*fl})`); gr.addColorStop(1, `rgba(255,150,60,${.9*fl})`); x.fillStyle = gr; x.fillRect(cx - ww/2, cy - hh/2, ww, hh); x.strokeStyle = 'rgba(40,20,6,.85)'; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, cy - hh/2); x.lineTo(cx, cy + hh/2); x.moveTo(cx - ww/2, cy); x.lineTo(cx + ww/2, cy); x.stroke(); };
  o.win.forEach(q => warm(q.x, q.y, q.w, q.h));
  x.save(); x.beginPath(); x.arc(o.rw.x, o.rw.y, o.rw.r, 0, 7); x.clip(); warm(o.rw.x, o.rw.y, o.rw.r*2, o.rw.r*2); x.restore();
  x.fillStyle = `rgba(255,170,80,${.35*fl})`; x.fillRect(o.door.w*.5 - 2, -o.door.h, 3, o.door.h);
  x.globalCompositeOperation = 'lighter';
  o.win.forEach(q => glow('f', q.x, q.y, q.w*3.2, .5*fl)); glow('f', 0, -h*.3, w*.5, .28*fl);
  const sl = x.createLinearGradient(0, 0, 0, h*.55); sl.addColorStop(0, `rgba(255,190,100,${.28*fl})`); sl.addColorStop(1, 'rgba(255,190,100,0)');
  x.fillStyle = sl; x.beginPath(); x.moveTo(-o.door.w*1.2, 2); x.lineTo(o.door.w*1.2, 2); x.lineTo(o.door.w*2.6, h*.55); x.lineTo(-o.door.w*2.6, h*.55); x.fill();
  x.globalCompositeOperation = 'source-over';
  const cyc = o.ch.x + o.ch.w/2, cyt = -(o.bh + (o.pk - o.bh)*.0) - h*.0;
  const top = (() => { const roofHalf = o.bw + w*.12, ry = -o.bh + h*.08; return ry - (o.pk + ry)*(1 - Math.min(1, Math.abs(o.ch.x)/roofHalf)) - h*.6; })();
  for (let i = 0; i < 7; i++) { const ph = ((t/3200 + i/7)%1); x.fillStyle = `rgba(150,170,210,${.22*(1 - ph)})`; x.beginPath(); x.arc(cyc + Math.sin(ph*5 + i)*8 + wind*ph*24, top - ph*h*1.3, 4 + ph*16, 0, 7); x.fill(); }
  x.restore();
  x.fillStyle = 'rgba(255,233,168,.9)'; x.font = '600 12px "Segoe UI", sans-serif'; x.textAlign = 'center';
  if (!(window.matchMedia && window.matchMedia('(max-width: 859px), (pointer: coarse) and (max-width: 1100px)').matches)) x.fillText('🏠 Chạm cửa để vào nhà', X, y - h*2.12 - Math.sin(t/420)*2.5);
}

/* ===== NỘI THẤT: bậc nâng cấp + vẽ lại toàn bộ phòng ===== */
const TIERN = ['', 'Thô sơ', 'Tinh xảo', 'Quý tộc', 'Huyền thoại'], TT = [1, 5, 12, 25];
const tierOf = l => l >= 25 ? 4 : l >= 12 ? 3 : l >= 5 ? 2 : l >= 1 ? 1 : 0;
const setTier = () => Math.min(...S.home.slice(0, 8).map(tierOf));
function homeMult() {
  let m = 1;
  S.home.forEach(l => { m *= 1 + .06*tierOf(l); });
  m *= 1 + .12*S.home[8]; m *= 1 + .2*S.home[10];
  return m*[1, 1.4, 1.8, 2.5, 4][setTier()];
}
const ui2 = ui;
ui = function () {
  ui2();
  hrow.forEach((r, i) => { const tr = tierOf(S.home[i]), nx = TT[tr]; r.d.textContent = HM[i].d + ' · ' + (tr ? 'Bậc ' + TIERN[tr] : 'Chưa có') + (nx ? ` · bậc kế ở cấp ${nx}` : ' · tối đa'); });
  const st = setTier(); if (st > 0) $('#badges').insertAdjacentHTML('beforeend', `<span class="badge buff">🏡 Tổ ấm bậc ${TIERN[st]} x${[1, 1.4, 1.8, 2.5, 4][st]}</span>`);
};
setInterval(() => { if (S.home[10] > 0 && S.snd) { try { arp([0, 4, 7, 12, 9, 7, 4], .1); } catch (e) {} } }, 45000);
const pat = (c, p) => { x.fillStyle = c; return x.createPattern(p, 'repeat'); };
function drawWindowX(t) {
  const wx = W*.31, wy = H*.11, ww = W*.27, wh = H*.31;
  x.fillStyle = '#26170d'; x.fillRect(W*.225, H*.13, W*.04, H*.25); x.fillStyle = x.createPattern(TEX_V, 'repeat'); x.fillRect(W*.225, H*.13, W*.04, H*.25);
  woodRect(wx - 14, wy - 14, ww + 28, wh + 28, ['#4a2f1b', '#2a190d']);
  x.save(); x.beginPath(); x.rect(wx, wy, ww, wh); x.clip();
  const g = x.createLinearGradient(0, wy, 0, wy + wh); g.addColorStop(0, '#050a22'); g.addColorStop(.6, '#13234f'); g.addColorStop(1, '#24407f'); x.fillStyle = g; x.fillRect(wx, wy, ww, wh);
  x.fillStyle = '#fff'; for (let i = 0; i < 26; i++) { x.globalAlpha = .3 + .7*Math.abs(Math.sin(t/700 + i)); x.fillRect(wx + rsd(i, 1)*ww, wy + rsd(i, 2)*wh*.7, 1.6, 1.6); } x.globalAlpha = 1;
  const mr = Math.min(ww, wh)*.2; x.globalCompositeOperation = 'lighter'; glow('m', wx + ww*.74, wy + wh*.3, mr*5, .6); x.globalCompositeOperation = 'source-over';
  if (moonSprite) x.drawImage(moonSprite, wx + ww*.74 - mr*1.3, wy + wh*.3 - mr*1.3, mr*2.6, mr*2.6);
  x.fillStyle = '#07102a'; x.beginPath(); x.moveTo(wx, wy + wh); for (let i = 0; i <= 20; i++) x.lineTo(wx + i*ww/20, wy + wh*.78 - Math.abs(Math.sin(i*1.7))*wh*.08); x.lineTo(wx + ww, wy + wh); x.fill();
  x.fillStyle = '#040a1c'; for (let p = 0; p < 9; p++) { const tx = wx + (p + .5)*ww/9, th = wh*(.22 + rsd(p, 4)*.18); x.beginPath(); x.moveTo(tx - ww*.03, wy + wh); x.lineTo(tx, wy + wh - th); x.lineTo(tx + ww*.03, wy + wh); x.fill(); }
  if (S.wth === 1) { x.strokeStyle = 'rgba(180,220,255,.45)'; x.lineWidth = 1.2; for (let r = 0; r < 25; r++) { const ry = wy + ((t*.15 + r*40)%wh), rx = wx + rsd(r, 7)*ww; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx + 1, ry + 8); x.stroke(); } }
  x.fillStyle = 'rgba(255,255,255,.05)'; x.beginPath(); x.moveTo(wx + ww*.1, wy); x.lineTo(wx + ww*.3, wy); x.lineTo(wx + ww*.1, wy + wh); x.lineTo(wx, wy + wh); x.lineTo(wx, wy + wh*.4); x.fill();
  x.restore();
  x.fillStyle = '#2a190d'; x.fillRect(wx + ww/2 - 4, wy, 8, wh); x.fillRect(wx, wy + wh*.5 - 4, ww, 8);
  woodRect(wx - 22, wy + wh + 4, ww + 44, 12, ['#5a3822', '#34200f']);
  const ry = wy - 22, bot = wy + wh + H*.05;
  x.strokeStyle = '#c9a24a'; x.lineWidth = 4; x.beginPath(); x.moveTo(wx - ww*.25, ry); x.lineTo(wx + ww*1.25, ry); x.stroke();
  x.fillStyle = '#e0b86b'; for (const px of [wx - ww*.25, wx + ww*1.25]) { x.beginPath(); x.arc(px, ry, 6, 0, 7); x.fill(); }
  for (const sd of [-1, 1]) {
    const xo = sd < 0 ? wx - ww*.2 : wx + ww*1.2, xi = sd < 0 ? wx + ww*.17 : wx + ww*.83, xt = sd < 0 ? wx + ww*.09 : wx + ww*.91;
    const cg = x.createLinearGradient(xo, 0, xi, 0); cg.addColorStop(0, '#4a1220'); cg.addColorStop(.5, '#8e2a40'); cg.addColorStop(1, '#5a1626');
    x.fillStyle = cg; x.beginPath(); x.moveTo(xo, ry); x.lineTo(xi, ry); x.bezierCurveTo(xi, wy + wh*.3, xt, wy + wh*.45, xt, wy + wh*.55); x.bezierCurveTo(xt, wy + wh*.7, xi, wy + wh*.9, xi, bot); x.lineTo(xo, bot); x.closePath(); x.fill();
    x.save(); x.clip(); x.strokeStyle = 'rgba(0,0,0,.28)'; x.lineWidth = 3; for (let k = 1; k < 7; k++) { const fx = xo + (xi - xo)*k/7; x.beginPath(); x.moveTo(fx, ry); x.bezierCurveTo(fx + sd*4, wy + wh*.5, fx - sd*4, wy + wh*.8, fx, bot); x.stroke(); } x.restore();
    x.strokeStyle = '#d9b25a'; x.lineWidth = 3; x.beginPath(); x.moveTo(xt - sd*ww*.09, wy + wh*.55); x.lineTo(xt + sd*3, wy + wh*.55); x.stroke(); x.fillStyle = '#d9b25a'; x.beginPath(); x.arc(xt + sd*3, wy + wh*.55, 5, 0, 7); x.fill();
  }
}
function drawRugX(t) {
  const tr = tierOf(S.home[6]), X = W*.46, Y = H*.865, rw = W*.32, rh = H*.072;
  const P = [['#4a2a22', '#6b3a2c', '#c9a56a'], ['#52261e', '#7d2e3d', '#e0b86b'], ['#1f3a52', '#2f5f86', '#e8d28a'], ['#3a1a52', '#6a2f8a', '#8ff0ff'], ['#12382f', '#1f7a5e', '#ffe07d']][tr];
  x.strokeStyle = '#d4c3a3'; x.lineWidth = 1.5;
  for (let f = -14; f <= 14; f++) { const fy0 = Y + (f/14)*rh*.6, ee = (f/14)*.6, hx = rw*Math.sqrt(1 - ee*ee); x.beginPath(); x.moveTo(X - hx, fy0); x.lineTo(X - hx - 9, fy0); x.moveTo(X + hx, fy0); x.lineTo(X + hx + 9, fy0); x.stroke(); }
  const el = k => { x.beginPath(); x.ellipse(X, Y, rw*k, rh*k, 0, 0, 7); };
  x.fillStyle = P[0]; el(1); x.fill(); x.fillStyle = P[1]; el(.88); x.fill();
  x.strokeStyle = P[2]; x.lineWidth = 2; el(.78); x.stroke(); el(.5); x.stroke();
  x.fillStyle = P[2]; for (let k = 0; k < 18; k++) { const a = k/18*6.283, px = X + Math.cos(a)*rw*.64, py = Y + Math.sin(a)*rh*.64; x.save(); x.translate(px, py); x.rotate(a); x.beginPath(); x.moveTo(-7, 0); x.lineTo(0, -4); x.lineTo(7, 0); x.lineTo(0, 4); x.fill(); x.restore(); }
  x.globalAlpha = .55; x.fillStyle = P[2]; x.beginPath(); for (let k = 0; k < 16; k++) { const a = k/16*6.283, r = k%2 ? .24 : .4; x.lineTo(X + Math.cos(a)*rw*r, Y + Math.sin(a)*rh*r); } x.closePath(); x.fill(); x.globalAlpha = 1;
  x.fillStyle = 'rgba(0,0,0,.18)'; el(1); x.fill(); x.fillStyle = P[1]; el(.18); x.fill();
}
function drawTableX(t) {
  const tr = tierOf(S.home[5]), X = W*.48, Y = H*.74, w = W*.17, fl = .85 + .15*Math.sin(t/140)*Math.sin(t/63 + 1);
  x.fillStyle = 'rgba(0,0,0,.4)'; x.beginPath(); x.ellipse(X, Y + H*.11, w*.52, 8, 0, 0, 7); x.fill();
  for (const dx of [-.34, 0, .34]) { x.fillStyle = lgr(X + dx*w - 4, 0, X + dx*w + 4, 0, ['#4a2f1b', '#1c1008']); x.beginPath(); x.moveTo(X + dx*w - 4, Y); x.lineTo(X + dx*w + 4, Y); x.lineTo(X + dx*w + 2 + dx*10, Y + H*.108); x.lineTo(X + dx*w - 2 + dx*10, Y + H*.108); x.fill(); }
  x.fillStyle = '#1c1008'; x.beginPath(); x.ellipse(X, Y + 5, w*.5, 8, 0, 0, Math.PI); x.fill();
  x.fillStyle = lgr(X - w/2, Y - 8, X + w/2, Y + 8, ['#6b4630', '#3c2415', '#5a3a26']); x.beginPath(); x.ellipse(X, Y, w*.55, 10, 0, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,220,170,.25)'; x.lineWidth = 1.5; x.beginPath(); x.ellipse(X, Y - 1, w*.53, 8, 0, Math.PI*1.05, Math.PI*1.95); x.stroke();
  if (tr >= 2) { x.fillStyle = 'rgba(245,240,225,.8)'; x.beginPath(); x.ellipse(X, Y - 1, w*.3, 6, 0, 0, 7); x.fill(); }
  x.fillStyle = lgr(0, Y - 26, 0, Y - 3, ['#f2ead8', '#9a8f7a']); x.beginPath(); x.ellipse(X - 20, Y - 12, 11, 9, 0, 0, 7); x.fill(); x.fillRect(X - 8, Y - 18, 11, 3); x.fillRect(X - 36, Y - 17, 14, 3); x.fillStyle = '#d8cdb8'; x.beginPath(); x.ellipse(X - 20, Y - 22, 6, 3, 0, 0, 7); x.fill();
  for (const dx of [14, 30]) { x.fillStyle = '#f2ead8'; x.beginPath(); x.roundRect(X + dx, Y - 11, 9, 8, 3); x.fill(); x.strokeStyle = '#f2ead8'; x.beginPath(); x.arc(X + dx + 10, Y - 7, 3, -1.4, 1.4); x.stroke(); }
  x.strokeStyle = 'rgba(255,255,255,.3)'; x.lineWidth = 1.5; for (let k = 0; k < 2; k++) { x.beginPath(); x.moveTo(X - 36 + k*4, Y - 20); x.quadraticCurveTo(X - 36 + Math.sin(t/300 + k)*4, Y - 30, X - 36, Y - 40 - k*4); x.stroke(); }
  const cx = X + 50; x.fillStyle = '#e8dcc2'; x.fillRect(cx - 4, Y - 20, 8, 17); x.fillStyle = '#c9a24a'; x.beginPath(); x.ellipse(cx, Y - 3, 9, 3, 0, 0, 7); x.fill();
  x.fillStyle = '#ff9a3c'; x.beginPath(); x.ellipse(cx, Y - 26, 2.5, 6*fl, 0, 0, 7); x.fill(); x.fillStyle = '#fff3b0'; x.beginPath(); x.ellipse(cx, Y - 25, 1.2, 3, 0, 0, 7); x.fill();
  if (tr >= 3) { x.fillStyle = 'rgba(160,220,255,.55)'; x.beginPath(); x.roundRect(X - 56, Y - 24, 9, 20, 4); x.fill(); x.fillStyle = '#8ff0ff'; x.beginPath(); x.arc(X - 52, Y - 28, 4, 0, 7); x.fill(); }
  x.globalCompositeOperation = 'lighter'; glow('w', cx, Y - 26, W*.2, .55*fl); if (tr >= 3) glow('c', X - 52, Y - 28, 40, .6); x.globalCompositeOperation = 'source-over';
}
function drawPaintingX(t) {
  const lv = S.home[4], tr = tierOf(lv); if (!lv) return;
  const w = W*.16, h = H*.17, X = W*.805 - w/2, Y = H*.075, fc = ['', '#6b4a2a', '#c9a24a', '#d9b25a', '#ffe07d'][tr];
  x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(X + 4, Y + 6, w + 14, h + 14);
  x.fillStyle = lgr(X, Y, X + w, Y + h, [fc, '#3a2514', fc]); x.fillRect(X - 7, Y - 7, w + 14, h + 14); x.fillStyle = '#1c1008'; x.fillRect(X - 2, Y - 2, w + 4, h + 4);
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip();
  const sg = x.createLinearGradient(0, Y, 0, Y + h); sg.addColorStop(0, '#0a1233'); sg.addColorStop(.6, '#274a86'); sg.addColorStop(1, '#3a6aa8'); x.fillStyle = sg; x.fillRect(X, Y, w, h);
  x.fillStyle = '#fff'; for (let i = 0; i < 12; i++) x.fillRect(X + rsd(i, 11)*w, Y + rsd(i, 12)*h*.5, 1.4, 1.4);
  x.fillStyle = '#f4efd8'; x.beginPath(); x.arc(X + w*.72, Y + h*.24, h*.09, 0, 7); x.fill();
  x.fillStyle = '#17294f'; x.beginPath(); x.moveTo(X, Y + h*.7); x.lineTo(X + w*.3, Y + h*.38); x.lineTo(X + w*.55, Y + h*.62); x.lineTo(X + w*.8, Y + h*.45); x.lineTo(X + w, Y + h*.7); x.lineTo(X + w, Y + h); x.lineTo(X, Y + h); x.fill();
  x.fillStyle = '#0d1a38'; x.fillRect(X, Y + h*.7, w, h*.3); x.fillStyle = 'rgba(244,239,216,.35)'; x.fillRect(X + w*.66, Y + h*.72, w*.1, h*.22);
  x.fillStyle = '#ffe9a0'; for (let i = 0; i < 6; i++) { x.globalAlpha = .4 + .6*Math.abs(Math.sin(t/500 + i*2)); x.fillRect(X + rsd(i, 21)*w, Y + h*(.5 + rsd(i, 22)*.4), 2, 2); } x.globalAlpha = 1;
  x.restore();
}
function drawChandX(t) {
  const lv = S.home[3], tr = tierOf(lv); if (!lv) return;
  const cx = W*.48, cy = H*.1, n = Math.min(9, 3 + tr*2), rw = W*.075 + tr*W*.01;
  x.strokeStyle = '#1a110a'; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, 0); x.lineTo(cx, cy - 6); x.stroke();
  x.strokeStyle = tr > 1 ? '#c9a24a' : '#2a1c12'; x.lineWidth = 4; x.beginPath(); x.ellipse(cx, cy, rw, H*.016, 0, 0, 7); x.stroke();
  if (tr >= 2) { x.lineWidth = 2; x.beginPath(); x.ellipse(cx, cy + H*.035, rw*.55, H*.011, 0, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx - rw*.55, cy + H*.035); x.lineTo(cx - rw, cy); x.moveTo(cx + rw*.55, cy + H*.035); x.lineTo(cx + rw, cy); x.stroke(); }
  x.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const a = i/n*6.283, nx = cx + Math.cos(a)*rw, ny = cy + Math.sin(a)*H*.016, fl = .8 + .2*Math.sin(t/130 + i*3);
    x.globalCompositeOperation = 'source-over'; x.fillStyle = '#fff6e0'; x.fillRect(nx - 2.5, ny - 14, 5, 13); x.fillStyle = '#ff9a3c'; x.beginPath(); x.ellipse(nx, ny - 17, 1.8, 4.5*fl, 0, 0, 7); x.fill();
    x.globalCompositeOperation = 'lighter'; glow('w', nx, ny - 18, 32, .75*fl);
    if (tr >= 3) { x.globalCompositeOperation = 'source-over'; x.strokeStyle = 'rgba(200,235,255,.7)'; x.lineWidth = 1; x.beginPath(); x.moveTo(nx, ny + 2); x.lineTo(nx, ny + 14); x.stroke(); x.fillStyle = 'rgba(200,235,255,.85)'; x.beginPath(); x.moveTo(nx, ny + 14); x.lineTo(nx - 3, ny + 19); x.lineTo(nx, ny + 25); x.lineTo(nx + 3, ny + 19); x.fill(); x.globalCompositeOperation = 'lighter'; }
  }
  glow('w', cx, cy + H*.04, W*.7, .16 + .03*tr); x.globalCompositeOperation = 'source-over';
}
function drawClockX(t) {
  if (!S.home[8]) return;
  const X = W*.627, B = H*.676, w = W*.05, h = H*.36, T = B - h;
  x.fillStyle = 'rgba(0,0,0,.4)'; x.beginPath(); x.ellipse(X, B + 2, w*.7, 6, 0, 0, 7); x.fill();
  woodRect(X - w/2, T + h*.18, w, h*.82, ['#5a3822', '#2c1a0d']); woodRect(X - w*.6, T, w*1.2, h*.2, ['#6b4630', '#34200f']); woodRect(X - w*.6, B - h*.06, w*1.2, h*.06, ['#4a2f1b', '#24150b']);
  const fy = T + h*.1, r = w*.42; x.fillStyle = '#f2ead4'; x.beginPath(); x.arc(X, fy, r, 0, 7); x.fill(); x.strokeStyle = '#c9a24a'; x.lineWidth = 3; x.stroke();
  x.strokeStyle = '#2a1c12'; x.lineWidth = 1; for (let k = 0; k < 12; k++) { const a = k/12*6.283; x.beginPath(); x.moveTo(X + Math.cos(a)*r*.82, fy + Math.sin(a)*r*.82); x.lineTo(X + Math.cos(a)*r*.95, fy + Math.sin(a)*r*.95); x.stroke(); }
  const d = new Date(), ma = d.getMinutes()/60*6.283 - 1.5708, ha = (d.getHours()%12 + d.getMinutes()/60)/12*6.283 - 1.5708; x.lineWidth = 2; x.lineCap = 'round';
  x.beginPath(); x.moveTo(X, fy); x.lineTo(X + Math.cos(ma)*r*.8, fy + Math.sin(ma)*r*.8); x.stroke(); x.beginPath(); x.moveTo(X, fy); x.lineTo(X + Math.cos(ha)*r*.5, fy + Math.sin(ha)*r*.5); x.stroke();
  x.fillStyle = '#0b0805'; x.fillRect(X - w*.32, T + h*.3, w*.64, h*.5); const pa = Math.sin(t/500)*.35, px = X + Math.sin(pa)*h*.2, py = T + h*.32 + Math.cos(pa)*h*.2;
  x.strokeStyle = '#c9a24a'; x.lineWidth = 2; x.beginPath(); x.moveTo(X, T + h*.32); x.lineTo(px, py); x.stroke(); x.fillStyle = '#e0b86b'; x.beginPath(); x.arc(px, py, w*.14, 0, 7); x.fill();
}
function drawPianoX(t) {
  if (!S.home[10]) return;
  const X = W*.535, B = H*.705, w = W*.15, h = H*.2, L = X - w/2, T = B - h;
  x.fillStyle = 'rgba(0,0,0,.45)'; x.beginPath(); x.ellipse(X, B + 2, w*.55, 8, 0, 0, 7); x.fill();
  x.fillStyle = lgr(L, T, L + w, T, ['#0e0b12', '#2a2332', '#0e0b12']); x.beginPath(); x.roundRect(L, T, w, h*.82, 5); x.fill();
  x.fillStyle = 'rgba(255,255,255,.1)'; x.fillRect(L + 4, T + 3, w*.4, 3);
  x.fillStyle = '#17121c'; x.fillRect(L + w*.05, T + h*.1, w*.9, h*.26); x.fillStyle = '#d8c690'; x.fillRect(L + w*.12, T + h*.16, w*.76, h*.14);
  x.fillStyle = '#f2ecd8'; x.fillRect(L - 4, T + h*.52, w + 8, h*.2);
  x.strokeStyle = 'rgba(0,0,0,.5)'; x.lineWidth = 1; for (let k = 1; k < 21; k++) { const kx = L - 4 + k*(w + 8)/21; x.beginPath(); x.moveTo(kx, T + h*.52); x.lineTo(kx, T + h*.72); x.stroke(); }
  x.fillStyle = '#111'; for (let k = 0; k < 21; k++) if ([0, 1, 3, 4, 5].includes(k%7)) x.fillRect(L - 4 + (k + .65)*(w + 8)/21, T + h*.52, (w + 8)/21*.6, h*.12);
  x.fillStyle = '#0e0b12'; x.fillRect(L + 2, T + h*.72, 6, h*.28); x.fillRect(L + w - 8, T + h*.72, 6, h*.28);
  x.fillStyle = '#24150b'; x.fillRect(X - w*.2, B - h*.18, w*.4, h*.12); x.fillStyle = '#d8c690'; x.fillRect(X - w*.2, B - h*.18, w*.4, 3);
}
function drawPlantX(t) {
  if (!S.home[9]) return;
  const X = W*.968, B = H*.8, pw = W*.025;
  x.fillStyle = 'rgba(0,0,0,.4)'; x.beginPath(); x.ellipse(X, B + 2, pw*1.1, 6, 0, 0, 7); x.fill();
  x.fillStyle = lgr(X - pw, 0, X + pw, 0, ['#6b3a2c', '#a85a40', '#4a2418']); x.beginPath(); x.moveTo(X - pw, B - H*.07); x.lineTo(X + pw, B - H*.07); x.lineTo(X + pw*.7, B); x.lineTo(X - pw*.7, B); x.fill();
  x.fillStyle = '#7a4630'; x.fillRect(X - pw*1.1, B - H*.08, pw*2.2, 6);
  const n = 9 + Math.min(S.home[9], 8); x.lineCap = 'round';
  for (let k = 0; k < n; k++) {
    const a = -2.5 + k/(n - 1)*1.9, L = H*(.12 + rsd(k, 3)*.08), sw = Math.sin(t/900 + k)*4, ex = X + Math.cos(a)*L + sw, ey = B - H*.08 + Math.sin(a)*L*1.1;
    x.strokeStyle = lgr(X, B, ex, ey, ['#17603f', '#3fc79a'])  ; x.lineWidth = 3 + (k%3); x.beginPath(); x.moveTo(X, B - H*.08); x.quadraticCurveTo((X + ex)/2, ey - L*.1, ex, ey); x.stroke();
    x.globalCompositeOperation = 'lighter'; glow('c', ex, ey, 18, .6 + .3*Math.sin(t/400 + k)); x.globalCompositeOperation = 'source-over';
  }
}
function roomX(t) { drawWindowX(t); drawRugX(t); drawPianoX(t); drawClockX(t); drawPlantX(t); drawTableX(t); drawPaintingX(t); drawChandX(t); }
function room(t) {
  const fy = H*.67;
  const fl = .85 + .15*Math.sin(t/140)*Math.sin(t/63 + 1);
  const fe = S.home[0] > 0 ? Math.min(1, .55 + .15*S.home[0]) : .35;
  const bedLvl = S.home[1];
  const bookLvl = S.home[2];
  const lampLvl = S.home[3];
  const paintLvl = S.home[4];
  const tableLvl = S.home[5];
  const rugLvl = S.home[6];

  x.globalAlpha = 1; x.textAlign = 'center';
  
  // 1. Tường
  let g = x.createLinearGradient(0, 0, 0, fy);
  g.addColorStop(0, '#1a100a'); g.addColorStop(.5, '#2b1b11'); g.addColorStop(1, '#21140c');
  x.fillStyle = g; x.fillRect(0, 0, W, fy);
  
  const planks = 22;
  for (let i = 0; i <= planks; i++) {
    const px = (i/planks)*W;
    x.fillStyle = 'rgba(0, 0, 0, 0.25)'; x.fillRect(px, 0, 2, fy);
    x.fillStyle = 'rgba(255, 200, 140, 0.03)'; x.fillRect(px + 2, 0, 3, fy);
    if (i % 3 === 0) {
      x.strokeStyle = 'rgba(10, 5, 2, 0.15)'; x.lineWidth = 1;
      x.beginPath(); x.moveTo(px+10, 0); x.bezierCurveTo(px+15, fy*.3, px+5, fy*.7, px+12, fy); x.stroke();
    }
  }
  
  const railY = fy - H*.18;
  x.fillStyle = '#140b06';
  x.fillRect(0, railY, W, 6);
  x.fillStyle = '#1c110a';
  for (let i=0; i<W; i+=40) {
    x.fillRect(i, railY + 6, 36, H*.18 - 10);
    x.strokeStyle = 'rgba(0,0,0,.4)'; x.strokeRect(i, railY + 6, 36, H*.18 - 10);
  }
  x.fillStyle = '#120a05'; x.fillRect(0, fy - 8, W, 10);

  // 2. Sàn
  g = x.createLinearGradient(0, fy, 0, H);
  g.addColorStop(0, '#382315'); g.addColorStop(.6, '#26170d'); g.addColorStop(1, '#140c06');
  x.fillStyle = g; x.fillRect(0, fy, W, H - fy);
  
  x.strokeStyle = 'rgba(10, 5, 2, 0.45)'; x.lineWidth = 1.5;
  for (let i = 1; i <= 8; i++) {
    const py = fy + (H - fy)*Math.pow(i/8, 1.4);
    x.beginPath(); x.moveTo(0, py); x.lineTo(W, py); x.stroke();
  }
  for (let i = -5; i <= 15; i++) {
    const topX = (i/10)*W, botX = ((i - 5)/10)*W*1.8 + W*.4;
    x.beginPath(); x.moveTo(topX, fy); x.lineTo(botX, H); x.stroke();
  }

  x.save();
  x.fillStyle = x.createPattern(TEX_V, 'repeat'); x.fillRect(0, 0, W, fy - 8);
  x.fillStyle = x.createPattern(TEX_H, 'repeat'); x.fillRect(0, fy, W, H - fy);
  x.restore();
  // 3. Cửa sổ
  const wx = W*.31, wy = H*.11, ww = W*.27, wh = H*.31;
  g = x.createLinearGradient(0, wy, 0, wy + wh);
  g.addColorStop(0, '#060c24'); g.addColorStop(.6, '#142454'); g.addColorStop(1, '#243b78');
  x.fillStyle = g; x.fillRect(wx, wy, ww, wh);
  
  x.save();
  x.beginPath(); x.rect(wx, wy, ww, wh); x.clip();
  x.fillStyle = '#fff';
  for (let i = 0; i < 20; i++) {
    x.globalAlpha = .4 + .6*Math.abs(Math.sin(t/700 + i));
    x.fillRect(wx + ((i*37)%100)/100*ww, wy + ((i*53)%70)/100*wh, 1.6, 1.6);
  }
  x.globalAlpha = 1;
  const mRad = Math.min(ww, wh)*.22;
  x.globalCompositeOperation = 'lighter';
  glow('m', wx + ww*.74, wy + wh*.30, mRad*5, .65);
  x.globalCompositeOperation = 'source-over';
  if (moonSprite) x.drawImage(moonSprite,
    wx + ww*.74 - mRad*1.3, wy + wh*.30 - mRad*1.3, mRad*2.6, mRad*2.6);
  
  x.fillStyle = '#050a1c';
  for (let p = 0; p < 7; p++) {
    const tx = wx + p*(ww/6), ty = wy + wh;
    x.beginPath(); x.moveTo(tx - 20, ty);
    x.lineTo(tx, ty - wh*(.28 + (p%3)*.12)); x.lineTo(tx + 20, ty); x.fill();
  }
  if (S.wth === 1) {
    x.strokeStyle = 'rgba(180,220,255,0.45)'; x.lineWidth = 1.2;
    for (let r = 0; r < 25; r++) {
      const ry = wy + ((t*.15 + r*40) % wh);
      const rx = wx + ((r*37)%100)/100*ww;
      x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx + 1, ry + 8); x.stroke();
    }
  }
  x.restore();
  
  x.fillStyle = '#170d07';
  x.fillRect(wx - 8, wy - 8, ww + 16, 8);
  x.fillRect(wx - 10, wy + wh, ww + 20, 10);
  x.fillRect(wx - 8, wy, 8, wh); x.fillRect(wx + ww, wy, 8, wh);
  x.fillRect(wx + ww/2 - 3, wy, 6, wh); x.fillRect(wx, wy + wh/2 - 3, ww, 6);
  
  x.fillStyle = '#4a301e'; x.fillRect(wx - 24, wy - 14, ww + 48, 6);
  [[wx - 16, 1], [wx + ww + 16, -1]].forEach(([c0, d]) => {
    const cg = x.createLinearGradient(c0, wy, c0 + d*ww*.22, wy + wh);
    cg.addColorStop(0, '#782838'); cg.addColorStop(.5, '#541925'); cg.addColorStop(1, '#360e16');
    x.fillStyle = cg;
    x.beginPath();
    x.moveTo(c0, wy - 8); x.lineTo(c0 + d*ww*.24, wy - 8);
    x.quadraticCurveTo(c0 + d*ww*.1 + Math.sin(t/900)*4, wy + wh*.55, c0 + d*ww*.05, wy + wh*.65);
    x.quadraticCurveTo(c0 + d*ww*.18, wy + wh*.85, c0 + d*ww*.2, wy + wh + 15);
    x.lineTo(c0 - d*6, wy + wh + 15); x.closePath(); x.fill();
    x.strokeStyle = '#ffd875'; x.lineWidth = 3;
    x.beginPath(); x.moveTo(c0 - d*4, wy + wh*.65); x.lineTo(c0 + d*ww*.06, wy + wh*.65); x.stroke();
  });

  // Ánh trăng dịu nhẹ
  x.save();
  x.globalCompositeOperation = 'screen';
  const mb = x.createLinearGradient(wx + ww*.5, wy + wh, wx + ww*.2, fy + H*.18);
  mb.addColorStop(0, 'rgba(160, 200, 255, 0.15)');
  mb.addColorStop(1, 'rgba(160, 200, 255, 0)');
  x.fillStyle = mb;
  x.beginPath();
  x.moveTo(wx, wy + wh); x.lineTo(wx + ww, wy + wh);
  x.lineTo(wx + ww*.85, fy + H*.22); x.lineTo(wx - ww*.35, fy + H*.22);
  x.closePath(); x.fill();
  x.restore();

  // 4. GIÁ SÁCH & BÀN GHẾ ĐỌC
  const bx = W*.04, by = H*.12, bw = W*.19, bh = H*.34;
  x.fillStyle = bookLvl > 2 ? '#3a2214' : '#2b190e';
  x.fillRect(bx - 4, by - 6, bw + 8, bh + 8);
  x.fillStyle = '#422817'; x.fillRect(bx - 8, by - 10, bw + 16, 8);
  
  for (let r = 0; r < 3; r++) {
    const sy = by + r*(bh/3);
    x.fillStyle = '#170d07'; x.fillRect(bx + 3, sy + 3, bw - 6, bh/3 - 6);
    const numBooks = bookLvl > 0 ? 12 : 5;
    for (let b = 0; b < numBooks; b++) {
      x.fillStyle = ['#8f3434', '#2e6487', '#82732e', '#59347d', '#2d7553', '#a44c25'][(b + r)%6];
      const bH = (bh/3 - 12) - (b%4)*4;
      const bW = (bw - 14)/12;
      x.fillRect(bx + 6 + b*((bw - 14)/12), sy + (bh/3 - 5) - bH, bW, bH);
      x.fillStyle = 'rgba(255,255,255,0.2)';
      x.fillRect(bx + 6 + b*((bw - 14)/12), sy + (bh/3 - 5) - bH, 1.5, bH);
    }
    if (bookLvl > 2 && r === 1) {
      x.fillStyle = '#c29a6d'; x.beginPath(); x.ellipse(bx+bw-12, sy+bh/3-15, 6, 8, 0, 0, 7); x.fill();
      x.fillStyle = '#fff5dc'; x.fillRect(bx+8, sy+bh/3-24, 4, 12);
      x.fillStyle = '#ff9a3c'; x.beginPath(); x.ellipse(bx+10, sy+bh/3-26, 2, 4, 0, 0, 7); x.fill();
      x.globalCompositeOperation = 'lighter'; glow('w', bx+10, sy+bh/3-26, 20, .6); x.globalCompositeOperation = 'source-over';
    }
  }
  
  if (bookLvl > 0) {
    x.fillStyle = 'rgba(255, 233, 168, 0.8)';
    x.font = '600 12px "Segoe UI", sans-serif';
    x.fillText('📚 Đọc sách', bx + bw/2, by - 18);
  }

  // Ghế bành
  const ghX = bx + bw + W*.08, ghB = H*.85, ghH = H*.22;
  x.fillStyle = 'rgba(0,0,0,.4)';
  x.beginPath(); x.ellipse(ghX, ghB + 2, ghH*.25, ghH*.05, 0, 0, 7); x.fill();
  
  x.fillStyle = '#3a2214';
  x.fillRect(ghX - ghH*.18, ghB - ghH*.1, ghH*.36, ghH*.04);
  x.fillRect(ghX - ghH*.2, ghB - ghH*.35, ghH*.05, ghH*.3);
  x.fillRect(ghX + ghH*.15, ghB - ghH*.35, ghH*.05, ghH*.3);
  x.fillRect(ghX - ghH*.2, ghB - ghH*.38, ghH*.4, ghH*.06);

  x.fillStyle = '#7d2e3d';
  x.beginPath(); x.roundRect(ghX - ghH*.16, ghB - ghH*.15, ghH*.32, ghH*.06, 4); x.fill();
  x.beginPath(); x.roundRect(ghX - ghH*.18, ghB - ghH*.4, ghH*.36, ghH*.25, 6); x.fill();
  
  x.strokeStyle = '#e0b86b'; x.lineWidth = 2;
  x.strokeRect(ghX - ghH*.18, ghB - ghH*.4, ghH*.36, ghH*.25);

  // 5. LÒ SƯỞI
  const fx = W*.67, fw = W*.27, fh = H*.35, fb = fy + 4;
  
  x.fillStyle = '#1e222b';
  x.beginPath(); x.ellipse(fx + fw/2, fb + 4, fw*.6, 12, 0, 0, 7); x.fill();
  x.strokeStyle = '#11141a'; x.lineWidth = 2; x.stroke();
  
  const stG = x.createLinearGradient(fx, fb - fh, fx + fw, fb);
  stG.addColorStop(0, '#4a5366'); stG.addColorStop(.5, '#323947'); stG.addColorStop(1, '#222732');
  x.fillStyle = stG;
  x.beginPath(); x.roundRect(fx - 8, fb - fh - 8, fw + 16, fh + 8, 6); x.fill();
  
  for (let r = 0; r < 6; r++) {
    const ry = fb - fh + r*(fh/6);
    x.strokeStyle = 'rgba(12, 15, 22, 0.4)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(fx - 8, ry); x.lineTo(fx + fw + 8, ry); x.stroke();
    for (let c = 0; c < 6; c++) {
      const cx = fx - 8 + c*(fw+16)/6 + (r%2)*10;
      x.fillStyle = (r+c)%2 ? '#2d3545' : '#252d3a';
      x.beginPath(); x.roundRect(cx+2, ry+2, (fw+16)/6-4, fh/6-4, 4); x.fill();
    }
  }
  
  x.save(); x.beginPath(); x.roundRect(fx - 8, fb - fh - 8, fw + 16, fh + 8, 6); x.clip();
  x.fillStyle = x.createPattern(TEX_N, 'repeat'); x.fillRect(fx - 8, fb - fh - 8, fw + 16, fh + 8);
  const sh = x.createLinearGradient(fx, 0, fx + fw, 0); sh.addColorStop(0, 'rgba(0,0,0,.35)'); sh.addColorStop(.5, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.35)');
  x.fillStyle = sh; x.fillRect(fx - 8, fb - fh - 8, fw + 16, fh + 8); x.restore();
  x.fillStyle = '#4f331f'; x.fillRect(fx - 16, fb - fh - 16, fw + 32, 10);
  x.fillStyle = '#331f12'; x.fillRect(fx - 12, fb - fh - 6, fw + 24, 4);
  
  if (fe > 0.8) {
    x.fillStyle = '#c29a6d'; x.beginPath(); x.arc(fx + fw*.15, fb - fh - 24, 8, 0, 7); x.fill();
    x.fillStyle = '#fff'; x.fillRect(fx + fw*.15 - 1, fb - fh - 28, 2, 4);
    x.fillStyle = '#8f3434'; x.fillRect(fx + fw*.8, fb - fh - 28, 10, 15);
  } else {
    x.fillStyle = '#e8dec8'; x.fillRect(fx + fw*.2, fb - fh - 28, 8, 12);
    x.fillStyle = '#ff9a3c'; x.beginPath(); x.ellipse(fx + fw*.2 + 4, fb - fh - 30, 2, 4, 0, 0, 7); x.fill();
    x.fillStyle = '#8c4a27'; x.beginPath(); x.arc(fx + fw*.78, fb - fh - 21, 7, 0, 7); x.fill();
  }

  x.fillStyle = '#080504';
  x.beginPath();
  x.moveTo(fx + fw*.12, fb);
  x.lineTo(fx + fw*.12, fb - fh*.55);
  x.quadraticCurveTo(fx + fw*.5, fb - fh*.82, fx + fw*.88, fb - fh*.55);
  x.lineTo(fx + fw*.88, fb);
  x.closePath(); x.fill();

  x.strokeStyle = '#3d2312'; x.lineWidth = 8; x.lineCap = 'round';
  x.beginPath();
  x.moveTo(fx + fw*.26, fb - 6); x.lineTo(fx + fw*.72, fb - 18);
  x.moveTo(fx + fw*.74, fb - 6); x.lineTo(fx + fw*.28, fb - 18);
  x.stroke();
  
  if (S.home[0] > 0) drawFlames(t, fx, fw, fb, fh, fe);
  else {
    x.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 6; i++) glow('f', fx + fw*(.3 + .08*i), fb - 10, 10 + 3*Math.sin(t/400 + i), .22 + .12*Math.sin(t/300 + i*2));
    x.globalCompositeOperation = 'source-over';
  }
  // Firelight bounce: warm, low-opacity pools anchored to the hearth, not a full-screen overlay.
  x.save(); x.globalCompositeOperation='screen';
  const hearthLight=x.createRadialGradient(fx+fw*.5,fb-6,2,fx+fw*.5,fb-H*.035,Math.max(W,H)*.28);
  hearthLight.addColorStop(0,`rgba(255,166,72,${.11*fl})`);
  hearthLight.addColorStop(.28,`rgba(255,126,48,${.055*fl})`);
  hearthLight.addColorStop(1,'rgba(255,100,35,0)');
  x.fillStyle=hearthLight; x.fillRect(fx-Math.max(W,H)*.28,fb-H*.25,Math.max(W,H)*.56,H*.28);
  const wallBounce=x.createRadialGradient(fx+fw*.5,fb-fh*.72,2,fx+fw*.5,fb-fh*.72,fw*.85);
  wallBounce.addColorStop(0,`rgba(255,174,82,${.07*fl})`); wallBounce.addColorStop(1,'rgba(255,135,52,0)');
  x.fillStyle=wallBounce; x.fillRect(fx-fw*.45,fb-fh*1.65,fw*1.9,fh*1.35);
  x.restore();
  
  x.fillStyle = 'rgba(255, 233, 168, 0.8)';
  x.font = '600 12px "Segoe UI", sans-serif';
  x.fillText('🔥 Sưởi ấm', fx + fw/2, fb - fh - 40);

  // 6. GIƯỜNG
  const bedX = W*.13, bedY = fy - H*.11, bedW = W*.25, bedH = H*.15;
  x.fillStyle = 'rgba(0,0,0,0.5)';
  x.beginPath(); x.ellipse(bedX + bedW/2, bedY + bedH + 2, bedW*.52, 10, 0, 0, 7); x.fill();
  
  const hbG = x.createLinearGradient(bedX, bedY - H*.09, bedX, bedY + bedH);
  hbG.addColorStop(0, '#5c3a21'); hbG.addColorStop(1, '#29180d');
  x.fillStyle = hbG;
  x.beginPath(); x.roundRect(bedX, bedY - H*.08, bedW*.14, bedH + H*.08, 8); x.fill();
  
  x.strokeStyle = '#24140a'; x.lineWidth = 2;
  x.beginPath(); x.arc(bedX + bedW*.07, bedY - H*.02, bedW*.04, 0, 7); x.stroke();

  x.fillStyle = '#e8e0d0';
  x.beginPath(); x.roundRect(bedX + bedW*.08, bedY + bedH*.15, bedW*.88, bedH*.55, 10); x.fill();
  
  x.fillStyle = '#fffaf0';
  x.beginPath(); x.ellipse(bedX + bedW*.22, bedY + bedH*.22, bedW*.13, bedH*.18, -.1, 0, 7); x.fill();
  x.beginPath(); x.ellipse(bedX + bedW*.32, bedY + bedH*.24, bedW*.12, bedH*.16, -.1, 0, 7); x.fill();
  
  const qG = x.createLinearGradient(0, bedY + bedH*.12, 0, bedY + bedH*.82);
  if (bedLvl > 0) { qG.addColorStop(0, '#4a7bc2'); qG.addColorStop(1, '#264778'); }
  else { qG.addColorStop(0, '#8c4638'); qG.addColorStop(1, '#54261d'); }
  x.fillStyle = qG;
  x.beginPath(); x.roundRect(bedX + bedW*.34, bedY + bedH*.14, bedW*.63, bedH*.65, 8); x.fill();
  
  x.strokeStyle = 'rgba(0,0,0,0.15)'; x.lineWidth = 2;
  for(let i=0; i<4; i++) {
    x.beginPath(); x.moveTo(bedX + bedW*.34 + i*22, bedY + bedH*.14);
    x.quadraticCurveTo(bedX + bedW*.34 + i*22 + 5, bedY + bedH*.5, bedX + bedW*.34 + i*22 - 2, bedY + bedH*.79);
    x.stroke();
  }
  
  x.fillStyle = '#382214';
  x.fillRect(bedX + bedW*.05, bedY + bedH*.62, bedW*.92, bedH*.22);
  x.fillStyle = '#472c1a';
  x.beginPath(); x.roundRect(bedX + bedW*.92, bedY + bedH*.05, bedW*.09, bedH*.95, 4); x.fill();
  x.fillRect(bedX, bedY + bedH*.82, bedW*.09, bedH*.18);
  
  x.fillStyle = 'rgba(255, 233, 168, 0.8)';
  x.font = '600 12px "Segoe UI", sans-serif';
  x.fillText('🛏️ Ngủ nghỉ', bedX + bedW*.5, bedY - H*.05);

  // 7. THẢM & BÀN TRÀ
  const rugX = W*.46, rugY = H*.865, rugW = W*.32, rugH = H*.072;
  x.strokeStyle = '#d4c3a3'; x.lineWidth = 1.5;
  for (let f = -14; f <= 14; f++) {
    const fy0 = rugY + (f/14)*rugH*.6;
    const ee = (f/14)*.6, hx = rugW*Math.sqrt(1 - ee*ee);
    x.beginPath(); x.moveTo(rugX - hx, fy0); x.lineTo(rugX - hx - 9, fy0);
    x.moveTo(rugX + hx, fy0); x.lineTo(rugX + hx + 9, fy0); x.stroke();
  }
  x.fillStyle = '#52261e'; x.beginPath(); x.ellipse(rugX, rugY, rugW, rugH, 0, 0, 7); x.fill();
  x.fillStyle = '#7d2e3d'; x.beginPath(); x.ellipse(rugX, rugY, rugW*.88, rugH*.82, 0, 0, 7); x.fill();
  x.strokeStyle = '#e0b86b'; x.lineWidth = 2;
  x.beginPath(); x.ellipse(rugX, rugY, rugW*.72, rugH*.64, 0, 0, 7); x.stroke();
  x.beginPath(); x.ellipse(rugX, rugY, rugW*.5, rugH*.4, 0, 0, 7); x.stroke();

  const tbX = W*.48, tbY = H*.74, tbW = W*.17;
  x.fillStyle = 'rgba(0,0,0,0.4)';
  x.beginPath(); x.ellipse(tbX, tbY + H*.11, tbW*.52, 8, 0, 0, 7); x.fill();
  x.fillStyle = '#29180e';
  x.fillRect(tbX - tbW*.38, tbY, 6, H*.105);
  x.fillRect(tbX + tbW*.38 - 6, tbY, 6, H*.105);
  const topG = x.createLinearGradient(tbX - tbW/2, tbY - 8, tbX + tbW/2, tbY + 8);
  topG.addColorStop(0, '#593924'); topG.addColorStop(1, '#362113');
  x.fillStyle = topG;
  x.beginPath(); x.ellipse(tbX, tbY, tbW*.55, 9, 0, 0, 7); x.fill();
  x.strokeStyle = '#24140a'; x.lineWidth = 1.5; x.stroke();
  
  x.fillStyle = '#d9cbb8'; x.beginPath(); x.ellipse(tbX + 12, tbY - 2, 10, 3.5, 0, 0, 7); x.fill();
  x.fillStyle = '#fff5e4'; x.fillRect(tbX + 8, tbY - 18, 8, 15);
  x.fillStyle = '#ff9a3c'; x.beginPath(); x.ellipse(tbX + 12, tbY - 22, 3, 6, 0, 0, 7); x.fill();
  x.fillStyle = '#d4e6f5';
  x.beginPath(); x.roundRect(tbX - 22, tbY - 11, 12, 9, 4); x.fill();
  x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 1.5;
  const stWave = Math.sin(t/300)*3;
  x.beginPath(); x.moveTo(tbX - 16, tbY - 13);
  x.quadraticCurveTo(tbX - 16 + stWave, tbY - 20, tbX - 16, tbY - 28); x.stroke();
  
  x.globalCompositeOperation = 'lighter';
  glow('w', tbX + 12, tbY - 20, W*.22, .6*fl);
  x.globalCompositeOperation = 'source-over';

  // 8. TRANH & ĐÈN CHÙM
  if (paintLvl > 0) {
    const pX = W*.18, pY = H*.18, pW = W*.1, pH = H*.15;
    x.fillStyle = '#3a2214'; x.fillRect(pX - 4, pY - 4, pW + 8, pH + 8);
    x.fillStyle = '#543822'; x.fillRect(pX, pY, pW, pH);
    x.fillStyle = '#2e6487'; x.fillRect(pX+2, pY+2, pW-4, pH-4);
    // Vẽ núi đơn giản trong tranh
    x.fillStyle = '#1a2740'; x.beginPath(); x.moveTo(pX+2, pY+pH-2); x.lineTo(pX+pW/2, pY+pH/2); x.lineTo(pX+pW-2, pY+pH-2); x.fill();
  }

  if (lampLvl > 0) {
    const cx = W*.48, cy = H*.095;
    x.strokeStyle = '#140d09'; x.lineWidth = 3;
    x.beginPath(); x.moveTo(cx, 0); x.lineTo(cx, cy); x.stroke();
    x.beginPath(); x.ellipse(cx, cy, W*.095, H*.018, 0, 0, 7); x.stroke();
    for (let i = -2; i <= 2; i++) {
      const nx = cx + i*W*.04;
      x.fillStyle = '#fff6e0'; x.fillRect(nx - 2.5, cy - 14, 5, 13);
      x.fillStyle = '#ff9a3c'; x.beginPath(); x.ellipse(nx, cy - 16, 1.5, 4, 0, 0, 7); x.fill();
    }
    x.globalCompositeOperation = 'lighter';
    for (let i = -2; i <= 2; i++) glow('w', cx + i*W*.04, cy - 18, 35, .8 + .2*Math.sin(t/130 + i*3));
    glow('w', cx, cy + H*.04, W*.7, .18);
    x.globalCompositeOperation = 'source-over';
  }

  // Bạn rừng không bay quanh người chơi trong nhà: chúng nằm/ngồi trên sàn gần lò sưởi.
  drawCompanions(t, W*.69, H*.875, true);

  const drW = W*.075, drH = H*.31;
  const drG = x.createLinearGradient(0, fy - drH, drW, fy);
  drG.addColorStop(0, '#2e1c10'); drG.addColorStop(1, '#1a0f08');
  x.fillStyle = drG; x.fillRect(0, fy - drH, drW, drH);
  x.strokeStyle = '#472c1a'; x.lineWidth = 4; x.strokeRect(2, fy - drH + 2, drW - 4, drH - 4);
  x.fillStyle = '#ffd875'; x.beginPath(); x.arc(drW*.78, fy - drH*.48, 4, 0, 7); x.fill();
  x.fillStyle = 'rgba(207, 224, 255, 0.85)';
  x.font = '600 12px "Segoe UI", sans-serif';
  x.fillText('🚪 Ra ngoài', drW*.65, fy - drH - 12);

  // Di chuyển nhân vật tới ghế nếu đang đọc sách
  if (pl.pose === 'read') {
      pl.ix = ghX;
  }

  roomX(t);
  drawShelf(bx, by, bw, bh, bookLvl); drawBed(bedX, bedY, bedW, bedH, bedLvl); drawChair(ghX, ghB, ghH);
  drawMeIn(t);

  if (fe > 0) {
    x.globalCompositeOperation = 'lighter';
    glow('f', fx + fw/2, fb - fh*.25, W*.62, .09*fe*fl*(S.home[0] > 0 ? 1 : .2));
    x.globalCompositeOperation = 'source-over';
  }
  x.globalAlpha = 1;
}

/* ============ AMBIENT PARTICLES ============ */
function ambientDraw(t) {
  const zf = Math.max(0, Math.min(3, Math.round(cam/W)));
  for (const a of AMBIENT) {
    const px = (((a.x*W*1.4 - cam*.5) % (W + 40)) + W + 40) % (W + 40) - 20;
    const py = (((a.y*H + t*a.vy*.02) % H) + H) % H + Math.sin(t/1400 + a.ph)*18;
    if (a.kind === 0) {
      x.save(); x.translate(px, py); x.rotate(t/800 + a.ph);
      x.globalAlpha = .35 + .2*Math.sin(t/600 + a.ph);
      x.fillStyle = ['#7fcf9a', '#c282ff', '#ffb87a'][zf];
      x.beginPath(); x.ellipse(0, 0, a.r*3, a.r*1.5, 0, 0, 7); x.fill();
      x.restore();
    } else if (a.kind === 1) {
      x.globalCompositeOperation = 'lighter';
      glow(['w','g','c','m'][zf], px, py, a.r*8, .35 + .2*Math.sin(t/700 + a.ph));
      x.globalCompositeOperation = 'source-over';
    } else {
      x.save(); x.translate(px, py); x.rotate(-t/500 + a.ph);
      x.globalAlpha = .5;
      x.fillStyle = zf === 1 ? '#ff8ad4' : zf === 2 ? '#6ef2ff' : '#ffe07d';
      for (let p = 0; p < 4; p++) {
        const pa = p/4*6.28;
        x.beginPath(); x.ellipse(Math.cos(pa)*a.r*2, Math.sin(pa)*a.r*2, a.r*2, a.r, pa, 0, 7); x.fill();
      }
      x.restore();
    }
    x.globalAlpha = 1;
  }
}

/* ============ MASTER LOOP ============ */

/* ===== ARTISAN VII · VISUAL LANDSCAPE CORE =====
   Native Canvas 2D landscape layers. Drawn by the core render pass (no extra RAF loop). */
const VFX = { reduced: false, rainRipples: [], lastW: 0, lastH: 0 };
try { VFX.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}
function vZone() { return inside ? 0 : Math.max(0, Math.min(3, Math.round((cam || 0) / Math.max(1, W)))); }
const __RDD_GLOW_CACHE = new Map();
function vGlow(cx, cy, radius, rgb, alpha) {
  // Glow geometry is reusable: rasterize a small radial sprite once, then composite it.
  // Quantization is deliberately fine to keep visual differences imperceptible.
  const r = Math.max(1, Math.round(radius / 4) * 4);
  const a = Math.max(0, Math.min(1, Math.round(alpha * 20) / 20));
  const key = `${rgb}|${r}|${a}`;
  let sprite = __RDD_GLOW_CACHE.get(key);
  if (!sprite) {
    const side = Math.max(2, Math.ceil(r * 2));
    const c = document.createElement('canvas');
    c.width = side; c.height = side;
    const ctx = c.getContext('2d');
    if (!ctx) {
      const gr = x.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, radius));
      gr.addColorStop(0, `rgba(${rgb},${alpha})`);
      gr.addColorStop(.38, `rgba(${rgb},${alpha*.34})`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      x.fillStyle = gr; x.fillRect(cx-radius, cy-radius, radius*2, radius*2);
      return;
    }
    const gr = ctx.createRadialGradient(r, r, 0, r, r, r);
    gr.addColorStop(0, `rgba(${rgb},${a})`);
    gr.addColorStop(.38, `rgba(${rgb},${a*.34})`);
    gr.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = gr; ctx.fillRect(0, 0, side, side);
    sprite = c;
    // Bound memory: evict the oldest entry instead of allowing unbounded growth.
    if (__RDD_GLOW_CACHE.size >= 72) __RDD_GLOW_CACHE.delete(__RDD_GLOW_CACHE.keys().next().value);
    __RDD_GLOW_CACHE.set(key, sprite);
  }
  x.drawImage(sprite, cx-r, cy-r, r*2, r*2);
}
function drawZoneSky(t) {
  if (inside) return;
  const z = vZone();
  const washes = [
    ['255,174,91', .075], ['93,105,214', .10], ['74,224,225', .105], ['129,157,255', .09]
  ];
  const [rgb, a] = washes[z];
  const wash = x.createLinearGradient(0, H*.08, 0, H*.82);
  wash.addColorStop(0, `rgba(${rgb},0)`); wash.addColorStop(.48, `rgba(${rgb},${a*.55})`); wash.addColorStop(1, `rgba(${rgb},0)`);
  x.save(); x.globalCompositeOperation = 'screen'; x.fillStyle = wash; x.fillRect(0, 0, W, H); x.restore();
  if (z === 2) {
    // Silver spray above the waterfall, with slow drifting mist ribbons.
    x.save(); x.globalCompositeOperation = 'lighter';
    for (let i=0;i<4;i++) {
      const xx=W*(.22+i*.19)+Math.sin(t/2600+i)*W*.025;
      const yy=H*(.43+i*.025)+Math.sin(t/1900+i*1.7)*H*.018;
      vGlow(xx, yy, H*(.16+i*.015), '106,244,235', .055);
    }
    x.restore();
  } else if (z === 3) {
    // Soft moon-path reflection: narrow, broken silver strokes instead of a hard stripe.
    x.save(); x.globalCompositeOperation = 'screen';
    const cx=W*.70, base=H*.64;
    for(let i=0;i<24;i++) {
      const yy=base+i*H*.009, ww=(5+((i*17)%19))*((i+1)/24);
      const xx=cx+Math.sin(t/2100+i*.7)*W*.025;
      glow(i%3?'m':'w', xx, yy, ww*1.8 + 8, (1-i/30)*(.2+.1*Math.sin(t/600+i)));
    }
    x.restore();
  }
}
function drawZoneLandmarks(t, gy) {
  const z=vZone(), base=z*W, sway=VFX.reduced?0:Math.sin(t/900)*2.2;
  x.save(); x.translate(base,0);
  if(z===0) {
    // Chimney smoke drifting into the night; warm light pooling around the porch.
    const sx=W*.87, sy=gy-H*.36;
    x.save(); x.globalCompositeOperation='screen'; vGlow(W*.62,gy+H*.13,H*.22,'255,170,80',.075); x.restore();
    for(let i=0;i<7;i++) {
      const p=((t/(6800+i*210)+i*.143)%1), xx=sx+Math.sin(t/1300+i*1.4)*H*.018+p*H*.045, yy=sy-p*H*.20;
      x.globalAlpha=(1-p)*.13; x.fillStyle='#a7b7d2'; x.beginPath(); x.ellipse(xx,yy,H*(.012+p*.018),H*(.009+p*.013),-.2,0,Math.PI*2); x.fill();
    }
    x.globalAlpha=1;
    for(let i=0;i<5;i++) { const lx=W*(.46+i*.075), ly=gy+H*.13+Math.sin(t/430+i)*3; vGlow(lx,ly,H*.09,'255,177,75',.12); }
  } else if(z===1) {
    // Bioluminescent mushrooms clustered around the roots, with a breathing pulse.
    for(let i=0;i<13;i++) {
      const xx=W*(.12+((i*37)%76)/100), yy=gy-H*(.035+((i*13)%8)/100), rr=H*(.006+(i%3)*.002);
      const pulse=.55+.45*Math.sin(t/(370+i*19)+i*2.1), col=i%3===0?'176,120,255':i%3===1?'91,237,222':'206,151,255';
      x.fillStyle=`rgba(17,28,45,.9)`; x.beginPath(); x.ellipse(xx,yy+rr*1.8,rr*1.5,rr*.55,0,0,Math.PI*2); x.fill();
      x.fillStyle=`rgba(${col},.68)`; x.beginPath(); x.ellipse(xx,yy,rr*1.6,rr*.7,0,Math.PI,Math.PI*2); x.fill();
      x.fillStyle='rgba(225,255,248,.55)'; x.fillRect(xx-rr*.15,yy,rr*.3,rr*1.2);
      x.save(); x.globalCompositeOperation='lighter'; vGlow(xx,yy,rr*7,col,.25*pulse); x.restore();
    }
    // A few spirit wisps rising through the trunks.
    for(let i=0;i<4;i++) { const xx=W*(.24+i*.17)+Math.sin(t/1800+i)*H*.025, yy=gy-H*(.12+((t/4500+i*.23)%1)*.25); x.save();x.globalCompositeOperation='lighter';vGlow(xx,yy,H*.055,i%2?'135,123,255':'91,235,223',.17);x.restore(); }
  } else if(z===2) {
    // Waterfall zone: only atmospheric spray here. The actual rock face and
    // water curtain are drawn once by drawWater() in the world renderer.
    x.save(); x.globalCompositeOperation='screen';
    const wx=W*.68, top=H*.32, bottom=gy+H*.015;
    const mist=x.createRadialGradient(wx,bottom-H*.035,2,wx,bottom-H*.035,H*.22);
    mist.addColorStop(0,'rgba(156,235,241,.15)');
    mist.addColorStop(.42,'rgba(112,199,222,.07)');
    mist.addColorStop(1,'rgba(80,150,190,0)');
    x.fillStyle=mist; x.fillRect(wx-H*.22,bottom-H*.25,H*.44,H*.28);
    for(let i=0;i<16;i++) {
      const p=(i/16+t*.000035)%1;
      const px=wx+Math.sin(t/740+i*2.1)*H*.075+Math.cos(i*3.7)*H*.045;
      const py=bottom-H*(.015+p*.22);
      const r=H*(.0012+(i%3)*.0007);
      x.globalAlpha=.12+.10*Math.sin(t/310+i*1.7)**2;
      x.fillStyle=i%4===0?'#d8ffff':'#8bdce8';
      x.beginPath(); x.ellipse(px,py,r,r*1.8,0,0,Math.PI*2); x.fill();
    }
    x.restore(); x.globalAlpha=1;
  } else {
    // Water plane and luminous lotus. Reflections are deliberately broken into soft ripples.
    const waterY=gy-H*.005, gr=x.createLinearGradient(0,waterY,0,H);gr.addColorStop(0,'rgba(23,61,105,.10)');gr.addColorStop(1,'rgba(6,21,48,.68)');x.fillStyle=gr;x.fillRect(0,waterY,W,H-waterY);
    for(let i=0;i<15;i++) {const xx=W*(.1+((i*23)%80)/100), yy=waterY+H*(.02+((i*17)%30)/100), pulse=(Math.sin(t/700+i)+1)/2; x.globalAlpha=.10+.09*pulse;x.strokeStyle=i%4?'#72bfe7':'#d9f5ff';x.lineWidth=1;x.beginPath();x.ellipse(xx+Math.sin(t/1300+i)*7,yy, H*(.018+i%3*.008),H*.003,0,0,Math.PI*2);x.stroke();}
    x.globalAlpha=1;
    for(let i=0;i<4;i++){const xx=W*(.22+i*.18), yy=waterY+H*(.045+(i%2)*.04), p=.6+.4*Math.sin(t/620+i);x.save();x.translate(xx,yy);x.rotate(-.15+i*.09);x.fillStyle=i%2?'#3e9f8e':'#6bcbb1';x.beginPath();x.ellipse(0,0,H*.023,H*.008,0,.1,Math.PI*1.85);x.fill();x.fillStyle='#b5f4e4';x.beginPath();x.ellipse(0,-H*.012,H*.005,H*.013,0,0,Math.PI*2);x.fill();x.save();x.globalCompositeOperation='lighter';vGlow(0,-H*.01,H*.06,'112,255,226',.17*p);x.restore();x.restore();}
  }
  x.restore();
}
/* ===== PHASE 5.7 · NATIVE WORLD ART PASS =====
   All additions are drawn in world space by the existing Canvas loop. No static
   panorama is layered over the playable scene. */
function drawForestDepth(t, gy) {
  if (inside) return;
  const zone = vZone();
  // Low, broken mist bands sit behind the foreground silhouettes.
  x.save();
  x.globalCompositeOperation = 'screen';
  for (let band = 0; band < 3; band++) {
    const y = gy - H * (.17 + band * .065);
    const drift = VFX.reduced ? 0 : Math.sin(t / (2600 + band * 700) + band * 1.7) * W * .035;
    const fog = x.createLinearGradient(0, y - H*.045, 0, y + H*.055);
    const tint = zone === 1 ? '137,112,223' : zone === 2 ? '92,221,220' : zone === 3 ? '125,165,232' : '135,169,207';
    fog.addColorStop(0, `rgba(${tint},0)`);
    fog.addColorStop(.48, `rgba(${tint},${.025 + band*.008})`);
    fog.addColorStop(1, `rgba(${tint},0)`);
    x.fillStyle = fog;
    // Context is in world coordinates; use a slow parallax offset so mist drifts behind trees.
    const mistX = cam * .34 - W*.1 + drift;
    x.fillRect(mistX, y-H*.05, W*1.25, H*.11);
  }
  x.restore();
}
function drawForestFloorDetails(t, gy) {
  if (inside) return;
  const left = Math.floor((cam - W*.15) / 53) * 53;
  const right = cam + W*1.15;
  // Deterministic stones, moss and tiny flowers; keep the cabin's doorway clear.
  for (let wx = left; wx < right; wx += 53) {
    const seed = Math.abs(Math.sin(wx * .071) * 10000);
    const px = wx + (seed % 29);
    const screenX = px - cam;
    if (vZone() === 0 && screenX > W*.34 && screenX < W*.72) continue;
    const y = gy + H*(.075 + (seed % 17) / 180);
    const r = 2.5 + (seed % 4.5);
    x.fillStyle = `rgba(3,10,18,${.24 + (seed%10)*.012})`;
    x.beginPath(); x.ellipse(px+2, y+3, r*1.9, r*.7, -.08, 0, Math.PI*2); x.fill();
    x.fillStyle = seed%2 ? 'rgba(46,75,76,.58)' : 'rgba(44,65,86,.58)';
    x.beginPath(); x.ellipse(px, y, r*1.65, r*.72, -.12, 0, Math.PI*2); x.fill();
    x.strokeStyle = 'rgba(174,205,205,.12)'; x.lineWidth = .8;
    x.beginPath(); x.ellipse(px-r*.12, y-r*.25, r, r*.28, -.12, Math.PI, Math.PI*2); x.stroke();
    if (seed%3 < 1.2) {
      const stemH = H*(.012 + (seed%5)*.002);
      const sway = VFX.reduced ? 0 : Math.sin(t/430 + seed)*2;
      x.strokeStyle = 'rgba(31,83,70,.85)'; x.lineWidth = 1.2;
      x.beginPath(); x.moveTo(px, y); x.quadraticCurveTo(px+sway, y-stemH*.55, px+sway*1.2, y-stemH); x.stroke();
      x.fillStyle = seed%2 ? '#6bd6b5' : '#c4a0ff';
      for (let petal=0;petal<4;petal++) {
        const a = petal*Math.PI*.5 + t*.00018;
        x.beginPath(); x.ellipse(px+sway*1.2+Math.cos(a)*2.3, y-stemH+Math.sin(a)*2, 2.1, 1.35, a, 0, Math.PI*2); x.fill();
      }
      x.save(); x.globalCompositeOperation='lighter';
      vGlow(px+sway*1.2, y-stemH, 13, seed%2?'108,255,207':'193,139,255', .12+.04*Math.sin(t/500+seed));
      x.restore();
    }
  }
  // Near-ground drifting pollen with slower movement than fireflies, reinforcing depth.
  x.save(); x.globalCompositeOperation='lighter';
  for (let i=0;i<11;i++) {
    const px = cam + ((i*97 + t*(.003 + (i%3)*.001)) % (W+30)) - 15;
    const py = gy + H*(.045 + (i*19%31)/100) + Math.sin(t/1000+i*1.8)*5;
    const pulse = .45 + .35*Math.sin(t/620+i*2.1);
    x.globalAlpha = .28 + pulse*.25;
    x.fillStyle = i%4===0 ? '#f6dba0' : i%3===0 ? '#bda6ff' : '#8eeed7';
    x.beginPath(); x.arc(px,py, .8+(i%3)*.35, 0, Math.PI*2); x.fill();
  }
  x.restore(); x.globalAlpha=1;
}
/* ===== PHASE 5.11 · FOREST UNDERSTORY & BOTANICAL DETAIL =====
   Adds a coherent second vegetation layer in world coordinates. The patterns are
   deterministic, so plants do not flicker or change position while the camera moves. */
function drawUnderstoryFlora(t, gy) {
  if (inside) return;
  const zone = vZone();
  const left = Math.floor((cam - W*.12) / 118) * 118;
  const right = cam + W*1.12;
  const palettes = zone === 1
    ? {leaf:'#263d59', light:'#6bcfc4', flower:'#b9a0ff', glow:'151,220,255'}
    : zone === 2
    ? {leaf:'#214b4c', light:'#68bca2', flower:'#d4f2df', glow:'118,236,224'}
    : zone === 3
    ? {leaf:'#24445a', light:'#679eaf', flower:'#c5c8ff', glow:'150,190,255'}
    : {leaf:'#183b32', light:'#4c8b63', flower:'#e6b8ff', glow:'121,239,185'};
  for (let wx = left; wx < right; wx += 118) {
    const seed = Math.abs(Math.sin(wx*.017 + 4.71)*43758.5453)%1;
    const px = wx + 18 + seed*78;
    // Keep the main cabin facade and entrance readable in the home clearing.
    const screenX = px - cam;
    if (zone === 0 && screenX > W*.34 && screenX < W*.72) continue;
    const baseY = gy + H*(.095 + seed*.055);
    const scale = .72 + seed*.65;
    const sway = VFX.reduced ? 0 : Math.sin(t/680 + wx*.023)*H*.003;
    // A low moss bed grounds each plant cluster in the terrain.
    x.fillStyle = `rgba(${zone===1?'65,83,119':zone===2?'48,106,91':zone===3?'52,82,111':'38,88,57'},${.18+seed*.12})`;
    x.beginPath(); x.ellipse(px,baseY+2,H*.028*scale,H*.006*scale,0,0,Math.PI*2); x.fill();
    // Fern fronds: curved stems and paired leaflets, with slight wind-driven motion.
    const fronds = 3 + Math.floor(seed*3);
    for (let f=0;f<fronds;f++) {
      const side = f%2 ? 1 : -1;
      const startX = px + (f-(fronds-1)/2)*H*.009;
      const len = H*(.028 + ((f+seed)%3)*.006)*scale;
      const tipX = startX + side*len*.65 + sway;
      const tipY = baseY-len;
      x.strokeStyle = palettes.leaf; x.lineWidth = Math.max(1,H*.0018);
      x.beginPath(); x.moveTo(startX,baseY); x.quadraticCurveTo(startX+side*len*.2,baseY-len*.62,tipX,tipY); x.stroke();
      for (let q=1;q<=4;q++) {
        const u=q/5, lx=startX+(tipX-startX)*u, ly=baseY-len*.78*u;
        const leafLen=len*(.24*(1-u)+.075);
        x.fillStyle=q%2?palettes.leaf:palettes.light;
        x.beginPath(); x.ellipse(lx-side*leafLen*.36,ly-leafLen*.08,leafLen*.48,leafLen*.15,-side*.42,0,Math.PI*2); x.fill();
        x.beginPath(); x.ellipse(lx+side*leafLen*.36,ly-leafLen*.19,leafLen*.44,leafLen*.14,side*.42,0,Math.PI*2); x.fill();
      }
    }
    // Tiny flower heads at the edge of the fern cluster, not random floating lights.
    if (seed > .22) {
      const count = 2 + Math.floor(seed*3);
      for (let f=0;f<count;f++) {
        const fx=px+(f-(count-1)/2)*H*.012, fy=baseY-H*(.019+(f%2)*.008)*scale;
        x.strokeStyle='rgba(52,91,67,.9)';x.lineWidth=1;
        x.beginPath();x.moveTo(fx,baseY);x.quadraticCurveTo(fx+sway*.4,fy+H*.012,fx+sway,fy);x.stroke();
        x.fillStyle=palettes.flower;
        for(let pet=0;pet<5;pet++) {const a=pet*Math.PI*.4; x.beginPath();x.ellipse(fx+sway+Math.cos(a)*H*.0032,fy+Math.sin(a)*H*.0028,H*.003,H*.0018,a,0,Math.PI*2);x.fill();}
        x.fillStyle='#ffe7ad';x.beginPath();x.arc(fx+sway,fy,H*.0017,0,Math.PI*2);x.fill();
        if (zone !== 0 && seed > .72) {
          x.save();x.globalCompositeOperation='lighter';vGlow(fx+sway,fy,H*.018,palettes.glow,.10+.04*Math.sin(t/570+f));x.restore();
        }
      }
    }
    // A few exposed roots visually connect the forest floor to the trunks.
    if (seed < .48) {
      x.strokeStyle='rgba(20,29,26,.56)';x.lineWidth=H*.0025;x.lineCap='round';
      for(let r=0;r<2;r++) {const dir=r?1:-1;x.beginPath();x.moveTo(px,baseY-H*.004);x.quadraticCurveTo(px+dir*H*.018,baseY+H*.004,px+dir*H*(.028+seed*.012),baseY+H*.002);x.stroke();}
    }
  }
}

function drawCabinLightSpill(t, gy) {
  if (inside || vZone() !== 0) return;
  // A soft warm pool follows the existing cabin coordinates; it does not replace the cabin art.
  const cx = W*.62, cy = gy + H*.015;
  x.save(); x.globalCompositeOperation='screen';
  const pulse = .92 + .08*Math.sin(t/730);
  const pool = x.createRadialGradient(cx,cy,2,cx,cy,H*.30);
  pool.addColorStop(0,`rgba(255,183,88,${.13*pulse})`);
  pool.addColorStop(.34,`rgba(255,145,63,${.055*pulse})`);
  pool.addColorStop(1,'rgba(255,145,63,0)');
  x.fillStyle=pool; x.fillRect(cx-H*.34,cy-H*.30,H*.68,H*.48);
  // Narrow window light rays, clipped by low opacity to preserve night contrast.
  for (let i=0;i<2;i++) {
    const wx = W*(.51+i*.095), wy=gy-H*.035;
    const ray=x.createLinearGradient(wx,wy,wx+(i?1:-1)*H*.09,gy+H*.13);
    ray.addColorStop(0,`rgba(255,205,116,${.08*pulse})`); ray.addColorStop(1,'rgba(255,205,116,0)');
    x.fillStyle=ray; x.beginPath(); x.moveTo(wx-H*.018,wy); x.lineTo(wx+H*.018,wy); x.lineTo(wx+(i?1:-1)*H*.12,gy+H*.13); x.closePath(); x.fill();
  }
  x.restore();
}

/* ===== PHASE 5.56 · FOREST RENDERER COORDINATE AND CANOPY FIX =====
   Adds integrated ground cover and natural light falloff to the native renderer.
   Everything is generated in world space; no static background or image overlay. */
function drawOrganicForestEnvironment(t, gy) {
  if (inside) return;
  const zone=vZone(), left=Math.floor((cam-W*.12)/41)*41, right=cam+W*1.12;
  const palette=zone===1?{moss:'72,93,137',leaf:'#8a83c7',grass:'#516d80'}:zone===2?{moss:'48,117,105',leaf:'#8bd7c9',grass:'#3d8276'}:zone===3?{moss:'55,91,126',leaf:'#9caee0',grass:'#426b78'}:{moss:'45,91,58',leaf:'#a3b77b',grass:'#315e43'};
  // Soft, broken moss islands follow the ground plane rather than forming repeated stripes.
  for(let wx=left;wx<right;wx+=41){
    const seed=Math.abs(Math.sin(wx*.037+zone*2.31)*43758.5453)%1;
    const px=wx+seed*26, py=gy+H*(.115+seed*.12), rw=H*(.012+seed*.022), rh=H*(.003+seed*.004);
    if(zone===0 && (px-cam)>W*.385 && (px-cam)<W*.69) continue;
    x.fillStyle=`rgba(${palette.moss},${.07+seed*.08})`;x.beginPath();x.ellipse(px,py,rw*1.7,rh*1.8,seed-.5,0,Math.PI*2);x.fill();
    // Short grass blades in irregular groups, with individual direction and height.
    if(seed>.24){
      const n=3+Math.floor(seed*5);
      for(let j=0;j<n;j++){
        const gx=px+(j-(n-1)/2)*H*.0045, gh=H*(.008+((seed+j*.17)%1)*.018), lean=(Math.sin(t/780+wx*.04+j)*.002+seed*.012)*H;
        x.strokeStyle=palette.grass;x.lineWidth=Math.max(.8,H*.0015);x.beginPath();x.moveTo(gx,py+rh*.2);x.quadraticCurveTo(gx+lean*.35,py-gh*.55,gx+lean,py-gh);x.stroke();
        if(j%2===0){x.strokeStyle='rgba(171,208,147,.18)';x.lineWidth=Math.max(.6,H*.0008);x.beginPath();x.moveTo(gx+lean*.35,py-gh*.55);x.lineTo(gx+lean*.35+H*.002,py-gh*.72);x.stroke();}
      }
    }
    // A few fallen leaves lie flat on the ground and catch only a trace of moonlight.
    if(seed>.83){
      x.save();x.translate(px,py-rh);x.rotate((seed-.5)*1.7);x.fillStyle=palette.leaf;x.globalAlpha=.26;
      x.beginPath();x.moveTo(-H*.004,0);x.quadraticCurveTo(-H*.012,-H*.003,-H*.009,-H*.007);x.quadraticCurveTo(0,-H*.009,H*.004,0);x.quadraticCurveTo(0,H*.003,-H*.004,0);x.fill();x.restore();x.globalAlpha=1;
    }
  }
  // Low-angle moonlight shafts between tree trunks: very faint, softly feathered and zone tinted.
  if(zone!==2){
    x.save();x.globalCompositeOperation='screen';
    for(let i=0;i<3;i++){
      const sx=cam+W*(.18+i*.31)+Math.sin(t/3300+i*1.7)*W*.018;
      const top=H*(.24+i*.045), bot=gy+H*.09, spread=H*(.025+i*.006);
      const beam=x.createLinearGradient(sx,top,sx+spread,bot);
      beam.addColorStop(0,'rgba(164,202,255,0)');beam.addColorStop(.42,`rgba(${zone===1?'159,143,255':'166,207,255'},${.012+i*.003})`);beam.addColorStop(1,'rgba(164,202,255,0)');
      x.fillStyle=beam;x.beginPath();x.moveTo(sx-spread*.18,top);x.lineTo(sx+spread*.22,top);x.lineTo(sx+spread*1.7,bot);x.lineTo(sx-spread*1.1,bot);x.closePath();x.fill();
    }
    x.restore();
  }
  // Ground-level light pools are localized near the cabin and magical plants, not global glow blobs.
  if(zone===0){
    x.save();x.globalCompositeOperation='screen';
    // Cabin is anchored in world space near W*.56. Do not add cam here: the caller
    // already translates the canvas by -cam, otherwise the light pool detaches from the cabin.
    const cabinWX=W*.56, cabinWY=gy+H*.11;
    const warm=x.createRadialGradient(cabinWX,cabinWY,1,cabinWX,cabinWY,H*.22);
    warm.addColorStop(0,`rgba(255,185,99,${.045+.012*Math.sin(t/850)})`);warm.addColorStop(1,'rgba(255,151,73,0)');
    x.fillStyle=warm;x.fillRect(cabinWX-W*.22,gy-H*.03,W*.45,H*.30);x.restore();
  }
}

function drawWeatherDetail(t, dt) {
  if(inside || VFX.reduced) return;
  const z=vZone();
  if(S.wth===1) { // rain splash rings, sparse and capped
    x.save();x.globalAlpha=.24;x.strokeStyle='#b5e6ff';x.lineWidth=1;
    for(let i=0;i<9;i++){const xx=((i*97+t*.018)%W), yy=H*.67+((i*47)%Math.max(1,H*.27)), phase=((t/700+i*.19)%1);if(phase<.42){x.beginPath();x.ellipse(xx,yy,phase*12,phase*3,0,0,Math.PI*2);x.stroke();}}
    x.restore();
  } else if(S.wth===2) { // fairy dust drifting with a gentle parallax
    x.save();x.globalCompositeOperation='lighter';for(let i=0;i<18;i++){const xx=(i*83+t*(.004+i%3*.001))%W, yy=(H*.2+(i*67)%Math.max(1,H*.65)+Math.sin(t/900+i)*8)%H;vGlow(xx,yy,5+(i%3)*2,i%2?'169,132,255':'111,249,225',.15);}x.restore();
  }
  // A small zone-tinted horizon haze unifies the layers without obscuring the hero.
  const haze=[['255,177,98',.025],['133,113,235',.045],['107,230,224',.05],['124,169,240',.04]][z];
  const hazeKey=`${Math.round(W)}:${Math.round(H)}:${z}`;
  if(!window.__RDD_HAZE_GRAD || window.__RDD_HAZE_GRAD.key!==hazeKey){
    const hg=x.createLinearGradient(0,H*.5,0,H*.85);
    hg.addColorStop(0,'rgba('+haze[0]+',0)');hg.addColorStop(1,'rgba('+haze[0]+','+haze[1]+')');
    window.__RDD_HAZE_GRAD={key:hazeKey,gradient:hg};
  }
  x.fillStyle=window.__RDD_HAZE_GRAD.gradient;x.fillRect(0,H*.5,W,H*.35);
}

function draw0(t, dt) {
  const o = S.own, gy = H*.68;
  x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
  wind = Math.sin(t/2300)*.6 + Math.sin(t/760 + 1)*.3 + Math.sin(t/5100)*.5;

  if (shake.mag > 0.1) {
    shake.x = (Math.random()-.5)*shake.mag;
    shake.y = (Math.random()-.5)*shake.mag;
    shake.mag *= 0.88;
  } else { shake.x = shake.y = 0; shake.mag = 0; }
  x.save(); x.translate(shake.x, shake.y);

  const dn = (Math.sin(t/45000) + 1)/2*.55;
  const dnBucket = Math.round(dn * 100);
  // Sky gradient is stable across many frames; reuse it until the day/night palette changes.
  if (!window.__RDD_SKY_GRAD || window.__RDD_SKY_GRAD.key !== `${Math.round(W)}:${Math.round(H)}:${dnBucket}`) {
    const mx3 = (a, b) => `rgb(${a.map((v,i) => Math.round(v + (b[i]-v)*dn))})`;
    const g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, mx3([3,6,20], [28,25,68]));
    g.addColorStop(.52, mx3([14,25,62], [115,62,102]));
    g.addColorStop(1, mx3([34,52,98], [195,130,95]));
    window.__RDD_SKY_GRAD = { key: `${Math.round(W)}:${Math.round(H)}:${dnBucket}`, gradient: g };
  }
  x.fillStyle = window.__RDD_SKY_GRAD.gradient;
  x.fillRect(-50, -50, W + 100, H + 100);

  const starAlpha = S.wth === 1 ? .2 : S.wth === 3 ? .4 : 1;
  for (const s of stars) {
    x.globalAlpha = (0.25 + .75*Math.abs(Math.sin(t/900*s.sp + s.ph))) * (1 - dn*.8) * starAlpha;
    x.fillStyle = s.col;
    x.beginPath(); x.arc(s.x*W, s.y*H, s.r, 0, 7); x.fill();
  }
  x.globalAlpha = 1;

  // Mặt trăng dịu nhẹ + mây che
  const mx = W*.75, my = H*.165, mr = Math.min(W, H)*.062;
  x.globalCompositeOperation = 'lighter';
  glow('m', mx, my, mr*8.5, .35 * (S.wth === 3 ? .5 : 1)); // Giảm độ sáng mạnh
  glow('w', mx, my, mr*4.0, .15 * (S.wth === 3 ? .5 : 1));
  x.globalCompositeOperation = 'source-over';
  if (moonSprite) {
    x.globalAlpha = S.wth === 3 ? .55 : 1;
    x.drawImage(moonSprite, mx - mr*1.33, my - mr*1.33, mr*2.66, mr*2.66);
    x.globalAlpha = 1;
  }

  // Vẽ mây mỏng che ngang mặt trăng
  for (const c of clouds) {
    c.x += c.sp * dt;
    if (c.x > 1.2) c.x = -0.2;
    const cx = c.x * W;
    const cy = c.y * H;
    x.globalAlpha = .85; x.drawImage(cloudSprite(), cx - W*.2*c.s, cy - H*.06*c.s, W*.4*c.s, H*.12*c.s); x.globalAlpha = 1;
  }

  if (o[3] > 0 && S.wth === 0) {
    x.save();
    x.globalCompositeOperation = 'lighter';
    for (let b = 0; b < 3; b++) {
      const col = b===0 ? '80,255,195' : b===1 ? '100,210,255' : '165,120,255';
      for (let i = 0; i < W; i += 14) {
        const wave = Math.sin(i*.007 + t/2200 + b*1.8)*H*.045 + Math.cos(i*.015 - t/1600)*H*.02;
        const ay = H*(.14 + b*.055) + wave;
        const ah = H*(.11 + .04*Math.sin(i*.02 + t/900));
        const ag = x.createLinearGradient(0, ay - ah/2, 0, ay + ah/2);
        ag.addColorStop(0, `rgba(${col}, 0)`);
        ag.addColorStop(.5, `rgba(${col}, 0.09)`);
        ag.addColorStop(1, `rgba(${col}, 0)`);
        x.fillStyle = ag; x.fillRect(i, ay - ah/2, 15, ah);
      }
    }
    x.restore();
  }

  scenery(t, gy);
  drawZoneSky(t);

  if (inside) {
    room(t);
  } else {
    cam += (camT - cam) * .14;
    x.save(); x.translate(-cam, 0);
    ground(t, gy);
    drawForestDepth(t, gy);
    drawZoneLandmarks(t, gy);
    { const bl = BRIDGES[1]; if (bl && cam + W > bl.x0 && cam < bl.x1) drawBridge(bl, gy, t); }
    if (!TR_BG) mkTR();
    TR_BG.forEach(a => drawTreeItem(a, t, gy));
    cabin(t, gy);
    drawSpiritTree(t, gy, o[4]);
    // Kỳ quan phép màu biến đổi ngoại quan theo mốc cấp: vòng rune, tinh thể và cột sáng.
    const magicLv = o.reduce((a,b)=>a+b,0), treeX = W*1.5, treeY = gy-H*.06;
    if (magicLv >= 10) {
      x.save(); x.globalCompositeOperation='lighter';
      for(let k=0;k<3;k++){x.strokeStyle=`rgba(${k===0?'110,235,255':k===1?'198,135,255':'255,220,130'},${.22+.12*Math.sin(t/500+k)})`;x.lineWidth=1.5+k*.5;x.beginPath();x.ellipse(treeX,treeY-H*.12-k*4,H*(.13+k*.035),H*(.045+k*.012),t/4500*(k%2?1:-1),0,Math.PI*2);x.stroke();}
      x.globalCompositeOperation='source-over';x.restore();
    }
    if (magicLv >= 30) {
      x.save();x.globalCompositeOperation='lighter';
      for(let k=0;k<7;k++){const a=t/1700+k*Math.PI*2/7,px=treeX+Math.cos(a)*H*.18,py=treeY-H*.18+Math.sin(a)*H*.075;glow(k%2?'c':'v',px,py,H*(.045+.012*Math.sin(t/240+k)),.8);}
      x.globalCompositeOperation='source-over';x.restore();
    }
    if (magicLv >= 60) {
      x.save();x.globalCompositeOperation='lighter';glow('c',treeX,treeY-H*.22,H*.55,.28+.08*Math.sin(t/300));x.globalCompositeOperation='source-over';x.restore();
    }
    // Floor flora is a mid-ground layer: draw before foreground trunks and the cabin,
    // so plants do not appear painted over the cabin facade or character.
    drawForestFloorDetails(t, gy);
    drawUnderstoryFlora(t, gy);
    drawOrganicForestEnvironment(t, gy);
    TR_FG.forEach(a => drawTreeItem(a, t, gy));
    drawCabinLightSpill(t, gy);

    if (o[1] > 0) {
      const n = Math.min(o[1], 16);
      for (let sec = 0; sec < 2; sec++) {
        const offX = sec*W*1.1;
        const P0 = [offX, gy - H*.30], P1 = [offX + W*.55, gy - H*.14], P2 = [offX + W*1.1, gy - H*.28];
        x.strokeStyle = 'rgba(145, 170, 215, 0.35)'; x.lineWidth = 1.4;
        x.beginPath(); x.moveTo(...P0);
        x.quadraticCurveTo(...P1, ...P2); x.stroke();
        for (let q = 0; q <= 4; q++) { const u = q/4, px = (1-u)*(1-u)*P0[0] + 2*u*(1-u)*P1[0] + u*u*P2[0], py = (1-u)*(1-u)*P0[1] + 2*u*(1-u)*P1[1] + u*u*P2[1];
          if (px < W*.44 || px > W*.80) { x.fillStyle = '#1e140c'; x.fillRect(px - 2.5, py, 5, gy + H*.03 - py); x.fillStyle = 'rgba(255,225,170,.18)'; x.fillRect(px - 2.5, py, 1.5, gy + H*.03 - py); } }
        const cnt = Math.ceil(n/2);
        for (let k = 0; k < cnt; k++) {
          const u = (k + 1)/(cnt + 1), a = (1 - u)**2, b = 2*(1 - u)*u, c = u*u;
          const lx = a*P0[0] + b*P1[0] + c*P2[0] + Math.sin(t/850 + k + sec)*3.5;
          const ly = a*P0[1] + b*P1[1] + c*P2[1] + 14;
          x.strokeStyle = 'rgba(145, 170, 215, 0.45)';
          x.beginPath(); x.moveTo(lx, ly - 14); x.lineTo(lx, ly); x.stroke();
          x.fillStyle = '#ff7b3d';
          x.beginPath(); x.ellipse(lx, ly + 9, 7.5, 9.5, 0, 0, 7); x.fill();
          x.fillStyle = '#1f120b';
          x.fillRect(lx - 4, ly - 1, 8, 2.5);
          x.fillRect(lx - 3.5, ly + 17.5, 7, 2);
          x.strokeStyle = '#ff5238'; x.lineWidth = 1.5;
          x.beginPath(); x.moveTo(lx, ly + 19.5);
          x.lineTo(lx + Math.sin(t/400 + k)*2, ly + 25); x.stroke();
          x.globalCompositeOperation = 'lighter';
          glow('w', lx, ly + 9, 68, .55 + .2*Math.sin(t/580 + k));
          x.globalCompositeOperation = 'source-over';
        }
      }
    }

    const nf = Math.min(o[2]*2, 46);
    for (let k = 0; k < nf; k++) {
      const fx = ((k*.618034)%1)*W*3.6 + W*.08;
      if (fx < cam - 30 || fx > cam + W + 30) continue;
      const fy = gy + 8 + (k%4)*14, top = fy - 16 - (k%4)*4;
      const sway = Math.sin(t/1100 + k)*3.5 + wind*3;
      const hx = fx + sway*.6;
      x.strokeStyle = '#1a4a5e'; x.lineWidth = 2;
      x.beginPath(); x.moveTo(fx, fy);
      x.quadraticCurveTo(fx + sway, fy - 8, hx, top); x.stroke();
      x.fillStyle = k%2 ? '#ff9ee0' : '#7ef5ff';
      for (let p = 0; p < 5; p++) {
        const pa = (p/5)*6.28 + t/2000;
        x.beginPath();
        x.arc(hx + Math.cos(pa)*3.2, top + Math.sin(pa)*3.2, 2.2, 0, 7); x.fill();
      }
      x.fillStyle = '#fff';
      x.beginPath(); x.arc(hx, top, 1.8, 0, 7); x.fill();
      x.globalCompositeOperation = 'lighter';
      glow(k%2 ? 'p' : 'c', hx, top, 28 + 6*Math.sin(t/480 + k), .85);
      x.globalCompositeOperation = 'source-over';
    }

    if (o[5] > 0) {
      [[W*.88, gy - H*.08], [W*3.5, gy - H*.04]].forEach(([cx, cy]) => {
        if (cx < cam - 160 || cx > cam + W + 160) return;
        const r = H*.095;
        x.strokeStyle = '#252d42'; x.lineWidth = 8;
        x.beginPath(); x.ellipse(cx, cy, r*.78, r*1.06, 0, 0, 7); x.stroke();
        x.globalCompositeOperation = 'lighter';
        glow('v', cx, cy, r*3.6, .55 + .15*Math.sin(t/480));
        glow('c', cx, cy, r*1.8, .42);
        for (let k = 0; k < 28; k++) {
          const a = k/28*6.283 + t/1400;
          glow(k%2 ? 'v' : 'c', cx + Math.cos(a)*r*.72, cy + Math.sin(a)*r, 13, .9);
        }
        x.globalCompositeOperation = 'source-over';
      });
    }

    pets(t, gy);
    grass(t);
    x.restore();
  }

  x.globalCompositeOperation = 'lighter';
  for (const f of F) {
    const noise = Math.sin(t/700 + f.ph)*.06;
    f.a += noise;
    f.vx = Math.cos(f.a) * f.s * 60;
    f.vy = Math.sin(f.a) * f.s * 60;
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    if (f.x < -20) f.x = W + 20; if (f.x > W + 20) f.x = -20;
    if (f.y < H*.18) { f.a = 1.5; f.y = H*.18; }
    if (f.y > gy + H*.12) { f.a = -1.5; f.y = gy + H*.12; }
    // Fixed-size circular trail: after warm-up, no per-frame trail objects or shift().
    if (f.tr.length < 7) {
      f.tr.push({ x: f.x, y: f.y });
      f.trHead = 0;
    } else {
      const pt = f.tr[f.trHead];
      pt.x = f.x; pt.y = f.y;
      f.trHead = (f.trHead + 1) % 7;
    }
    const trailLen = f.tr.length;
    for (let ti = 0; ti < trailLen - 1; ti++) {
      const pt = f.tr[(f.trHead + ti) % trailLen];
      glow(f.c, pt.x, pt.y, 6 + ti*2, .10 * (ti + 1));
    }
    glow(f.c, f.x, f.y, 20 + 8*Math.sin(t/380 + f.ph), .6 + .4*Math.sin(t/460 + f.ph*2));
    f.x += wind * 8 * dt;
  }

  if (!inside && S.wth === 1) {
    x.strokeStyle = 'rgba(165, 210, 255, 0.34)'; x.lineWidth = 1.2;
    for (const d of weatherDrops) {
      d.y += dt * d.s * 1.35;
      d.x += dt * wind * .08;
      if (d.y > 1) { d.y = -.05; d.x = Math.random(); }
      if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0;
      const rx = d.x*W, ry = d.y*H;
      x.beginPath(); x.moveTo(rx, ry);
      x.lineTo(rx + wind*6, ry + 16*d.s); x.stroke();
    }
  } else if (S.wth === 2) {
    for (const d of weatherDrops) {
      d.y -= dt * d.s * .12;
      d.x += Math.sin(t/1000 + d.ph) * dt * .03;
      if (d.y < 0) { d.y = 1; d.x = Math.random(); }
      glow(d.ph > 3 ? 'p' : 'c', d.x*W, d.y*H,
        11 + 4*Math.sin(t/400 + d.ph), .38 + .25*Math.sin(t/500 + d.ph));
    }
  }

  ambientDraw(t);
  drawWeatherDetail(t, dt);

  if (!inside) {
    for (const star of ST) {
      star.x += star.vx*dt; star.y += star.vy*dt; star.life -= dt;
      const tg = x.createLinearGradient(star.x, star.y,
        star.x - star.vx*.38, star.y - star.vy*.38);
      tg.addColorStop(0, 'rgba(200, 245, 255, 1)');
      tg.addColorStop(1, 'rgba(110, 242, 255, 0)');
      x.globalAlpha = 1; x.strokeStyle = tg; x.lineWidth = 4;
      x.beginPath(); x.moveTo(star.x, star.y);
      x.lineTo(star.x - star.vx*.38, star.y - star.vy*.38); x.stroke();
      glow('c', star.x, star.y, 64, 1);
      // Không kill sao băng khi chạm đất, để nó tự tàn lụi bằng life
    }
  }

  // Compact expired particles in-place; avoid one Array.splice() per expiry.
  // Forward compaction retains all live entries in the prefix of P.
  let pWrite = 0;
  for (let i = 0, pLen = P.length; i < pLen; i++) {
    const p = P[i];
    p.life -= dt * (p.k === 't' ? .85 : 1.45);
    if (p.life <= 0) { recycleParticle(p); continue; }
    if (p.k === 'r') {
      x.globalAlpha = p.life*.75;
      x.strokeStyle = '#ffe9a8'; x.lineWidth = 2;
      x.beginPath(); x.arc(p.x, p.y, (1 - p.life)*36, 0, 7); x.stroke();
    } else if (p.k === 's') {
      p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 65*dt;
      p.rot = (p.rot || 0) + (p.vrot || 0)*dt;
      glow(p.c || 'w', p.x, p.y, 16*p.life + 4, p.life);
    }
    P[pWrite++] = p;
  }
  P.length = pWrite;

  x.globalCompositeOperation = 'source-over';
  for (const p of P) {
    if (p.k === 't') {
      p.y -= 36*dt;
      x.globalAlpha = Math.min(1, p.life*1.4);
      x.fillStyle = p.col || '#ffe07d';
      x.font = '700 18px "Segoe UI", sans-serif'; x.textAlign = 'center';
      x.fillText(p.text, p.x, p.y);
    }
  }
  x.restore();

  if (fade > 0) {
    x.globalAlpha = fade; x.fillStyle = '#030611';
    x.fillRect(0, 0, W, H);
    fade = Math.max(0, fade - dt*2.5);
  }
  if (sl > 0) {
    x.globalAlpha = Math.max(0, Math.min(.85, (7 - sl)*.9, sl*.9));
    x.fillStyle = '#030611'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#cfe0ff'; x.font = '600 20px "Segoe UI", sans-serif'; x.textAlign = 'center';
    x.globalAlpha = Math.min(1, (7 - sl)*.9, sl*.9);
    x.fillText('💤 Đang say giấc trong tiếng rừng đêm...', (window.RW_REAL || W)/2 + (inside ? icam : 0), H*.42);
    for (let i = 0; i < 3; i++) {
      x.globalAlpha = .4 + .4*Math.sin(t/500 + i);
      x.fillText('z', W*.5 + i*22, H*.56 - i*12 - ((t/40 + i*30) % 24));
    }
  }
  x.globalAlpha = 1;
}

/* ============ INTERACTION ============ */
function hitCabin(qx, qy) {
  const X = W*.62 - cam, y = H*.68 + H*.145;
  const w = cabW(), h = H*.14;
  return qx > X - w*.55 && qx < X + w*.55 && qy > y - h*2.1 && qy < y + 8;
}
function enter() {
  inside = true; fade = 1; pl.ix = W*.48; pl.dir = 1;
  pl.tx = null; pl.act = '';
  $('#home').textContent = '🚪';
  setMood('🏠', 3); arp([0, 2, 4], .11); ui();
}
function leave() {
  inside = false; fade = 1; pl.x = (window.RW_REAL || W)*.62; pl.dir = -1;
  pl.tx = null; pl.act = '';
  cam = camT = Math.max(0, pl.x - W*.5);
  $('#home').textContent = '🏠';
  setMood('✨', 2.5); arp([4, 2, 0], .11); ui();
}
function goSleep() {
  const w = S.nextSleep - Date.now();
  if (w > 0) {
    toast('Bạn vẫn còn tỉnh táo, nghỉ lại sau ' + Math.ceil(w/60000) + ' phút nữa');
    return;
  }
  sl = 7; pl.pose = 'sleep';
}
function wake() {
  S.sleeps = (S.sleeps || 0) + 1;
  const g = Math.max(25, cps()*300*(1 + .15*S.home[1]));
  add(g); S.buff = Date.now() + 180000; S.nextSleep = Date.now() + 300000;
  pl.pose = ''; fade = 1; setMood('🌟', 4);
  toast('Thức dậy sảng khoái! +' + fm(g) + ' ánh sáng · Sản lượng x1.5 trong 3 phút');
  arp([0, 2, 4, 7, 9], .15); ui();
}
function arrive() {
  const a = pl.act;
  // Capture and resolve the interaction before clearing the action state.
  if (a === 'enter') { pl.act = ''; enter(); }
  else if (a === 'exit') { pl.act = ''; leave(); }
  else if (a === 'bed') { pl.act = ''; goSleep(); }
  else if (a === 'fire') {
    pl.act = ''; pl.pose = 'warm'; pl.sit = 6; setMood('🔥', 4);
    pl.ix = W*.70; pl.dir = 1;      // ghế đẩu nằm ngay trước lò sưởi
    toast('Ngồi hơ tay bên lò lửa hồng. Chạm vào lò để thêm củi!');
  } else if (a === 'tea') {
    pl.act = ''; pl.pose = 'tea'; pl.sit = 7; pl.ix = W*.385; pl.dir = 1; setMood('🍵', 4);
    const tb = tapPow()*3; add(tb); S.teas = (S.teas || 0) + 1;
    pushParticles({ k:'t', x:pl.ix + W*.08, y:H*.6, text:'+' + fm(tb), col:'#ffe9a8', life:1 });
    toast('Nhâm nhi trà thảo mộc ấm: +' + fm(tb) + ' ánh sáng');
  } else if (a === 'book') {
    pl.act = ''; pl.pose = 'read'; pl.sit = 6; setMood('📖', 4); S.reads = (S.reads||0)+1;
    const bonus = tapPow()*5; add(bonus);
    pushParticles({ k:'t', x:pl.ix, y:H*.58, text:'+' + fm(bonus), col:'#6ef2ff', life:1 });
    toast('Đọc sách cổ ngữ: +' + fm(bonus) + ' ánh sáng tri thức!');
    // Lore is provided by the unified notebook system later in this same script.
    const pages = window.__RDD_LORE;
    if (Array.isArray(pages)) {
      S.codexLore = Array.isArray(S.codexLore) ? S.codexLore : [];
      const locked = pages.map((_,i)=>i).filter(i=>!S.codexLore.includes(i));
      if (locked.length) { const i=locked[Math.floor(Math.random()*locked.length)]; S.codexLore.push(i); toast('📖 Cổ ngữ mở khóa: '+pages[i]); }
      else toast('📖 Bạn đã đọc hết 15 trang Cổ ngữ.');
    }
    chime(9, .14, 1.3); save();
  }
}

function cpStart() {
  const cy0 = H*.68 + H*.195, cx0 = W*.32;
  if (!inside && cam > W*.9) return;
  if (!inside && cam + W < cx0) return;
  if (!F.length) return;
  const f = F[Math.random() * F.length | 0];
  f.x = Math.max(20, Math.min(W - 20, cx0 - cam + W*.14));
  f.y = cy0 - H*.14;
  cp = { p: 0, f, got: 0, tx: f.x + cam, ty: f.y };
}

function catTick(dt) {
  if (cp.p < 0) return;
  cp.p += dt/1.25;
  const f = cp.f;
  if (!cp.got && f) { cp.tx = f.x + cam; cp.ty = f.y; }
  if (!cp.got && cp.p >= .5) {
    cp.got = 1;
    const v = tapPow()*6; add(v);
    pushParticles({ k:'t', x:f.x, y:f.y - 20, text:'🐾 +' + fm(v), col:'#7affb2', life:1 });
    for (let i = 0; i < 10; i++) {
      pushParticles({ k:'s', c:'g', x:f.x, y:f.y,
        vx:(Math.random()-.5)*180, vy:-Math.random()*140, life:1 });
    }
    chime(10 + (Math.random()*4|0), .09, 1);
    f.x = -60;
  }
  if (cp.p >= 1) cp.p = -1;
}

function meTick(dt) {
  if (pl.x < 0) { pl.x = W*.46; pl.ix = W*.12; }
  if (pl.moodT > 0) pl.moodT -= dt;
  if (pl.jump > 0) {
    pl.jump -= dt * 3;
    if (pl.jump < 0) pl.jump = 0;
  }
  if (comboTimer > 0) {
    comboTimer -= dt;
    if (comboTimer <= 0) { combo = 1; tapCount = 0; }
  }
  if (sl > 0) { sl -= dt; if (sl <= 0) wake(); return; }
  if ((pl.tx != null || pl.vx) && (pl.pose === 'sit' || pl.pose === 'read' || pl.pose === 'tea' || pl.pose === 'warm')) pl.pose = '';
  if (pl.pose === 'sit' || pl.pose === 'read' || pl.pose === 'tea' || pl.pose === 'warm') {
    pl.sit -= dt; if (pl.sit <= 0) pl.pose = '';
    return;
  }
  let v = pl.vx;
  const cur = inside ? 'ix' : 'x';
  const lo = inside ? W*.13 : W*.05;
  const hi = inside ? W*.88 : W*3.92;
  if (pl.tx != null) {
    const d = pl.tx - pl[cur];
    if (Math.abs(d) < 7) { pl.tx = null; v = 0; arrive(); }
    else v = Math.sign(d) * .95;
  }
  if (v) {
    pl.dir = Math.sign(v);
    let nextX = pl[cur] + v*dt*W*.45;
    
    pl[cur] = Math.max(lo, Math.min(hi, nextX));
    pl.ph += dt*Math.abs(v)*9.5;
  }
  if (!inside) {
    const bo = bridgeY(pl.x);
    pl.onBridge = Math.abs(bo) > 1 ? 1 : 0;
    camT = Math.max(0, Math.min(3*W, pl.x - W*.5));
  }
}

/* ============ UI ============ */
const list = $('#list');
let rows = [];

function mkRow(ic, nm, ds, fn) {
  const b = document.createElement('button'); b.className = 'row';
  b.innerHTML = `<span class="ic">${ic}</span><span class="tx"><b>${nm}</b><small>${ds}</small></span><span class="rt"><em></em><i></i></span><div class="row-bar"></div>`;
  b.onclick = () => { initAudio(); fn(); };
  list.appendChild(b);
  return { b, c: b.querySelector('em'), p: b.querySelector('i'),
    d: b.querySelector('small'), bar: b.querySelector('.row-bar') };
}

let arm = 0;
const preRow = mkRow('🌕', 'Trăng Tròn (Tái Sinh)', '', () => {
  const g = gainE(); if (g < 1) return blip();
  if (Date.now() > arm) {
    arm = Date.now() + 4000;
    return toast('🌕 Chạm Trăng Tròn lần nữa để xác nhận');
  }
  S.ess += g; S.l = 0; S.run = 0;
  S.own = G.map(() => 0); S.tap = 0; F = [];
  syncF(); burst(75); arp([0, 2, 4, 7, 9, 12, 14], .16);
  toast('🌕 Trăng tròn tỏa sáng! Nhận +' + g + ' Tinh Hoa vĩnh viễn');
  arm = 0; ui();
});
const tapRow = mkRow('👆', 'Chạm Rực Rỡ', '', () => {
  const { count, total } = calcBulk(40, 2.2, S.tap, buyMode);
  if (S.l < total) return blip();
  S.l -= total; S.tap += count;
  burst(16); arp([5, 7, 9]); ui();
});

G.forEach((g, i) => rows.push(mkRow(g.i, g.n, g.d, () => {
  const { count, total } = calcBulk(g.c, 1.15, S.own[i], buyMode);
  if (S.l < total) return blip();
  S.l -= total; S.own[i] += count;
  syncF(); burst(20); arp([i%5, (i + 2)%5 + 5, (i + 4)%5 + 5, 10 + i%3]);
  ui();
})));

const prow = PET.map((p, i) => mkRow(p.i, p.n, p.d, () => {
  const { count, total } = calcBulk(p.c, 1.7, S.pet[i], buyMode);
  if (S.l < total) return blip();
  S.l -= total; S.pet[i] += count;
  burst(26); arp([0, 4, 7, 9, 12], .16);
  toast(p.i + ' ' + p.n + (S.pet[i] > 1 ? ' lên cấp ' + S.pet[i] : ' đã gia nhập!'));
  ui();
}));

const hrow = HM.map((h, i) => mkRow(h.i, h.n, h.d, () => {
  const { count, total } = calcBulk(h.c, 2.0, S.home[i], buyMode);
  if (S.l < total) return blip();
  S.l -= total; S.home[i] += count;
  burst(22); arp([0, 2, 4, 7, 12], .15);
  toast(h.i + ' ' + h.n + ' đạt cấp ' + S.home[i]); ui();
}));

[preRow, tapRow, ...rows].forEach(r => r.b.dataset.t = 0);
prow.forEach(r => r.b.dataset.t = 1);
hrow.forEach(r => r.b.dataset.t = 3);

let tab = 0;
function applyTab() {
  [...list.children].forEach(c => c.style.display = c.dataset.t == tab ? '' : 'none');
  list.style.display = (tab === 2 || tab >= 4) ? 'none' : 'flex';
  $('#nb').style.display = tab === 5 ? 'flex' : 'none';
  $('#ach').style.display = tab === 2 ? 'flex' : 'none';
  $('#cfg').style.display = tab === 4 ? 'flex' : 'none';
  $('#buy-mult').style.display = (tab === 2 || tab >= 4) ? 'none' : 'block';
  ui();
}

$('#tabs').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  tab = +b.dataset.t;
  [...$('#tabs').children].forEach(c => c.classList.toggle('on', c === b));
  applyTab();
});

$('#buy-mult').onclick = () => {
  buyMode = buyMode === 1 ? 10 : buyMode === 10 ? 'next' : buyMode === 'next' ? 'max' : 1;
  $('#buy-mult').textContent = buyMode === 'max' ? 'MAX' : buyMode === 'next' ? 'NEXT' : 'x' + buyMode;
  $('#buy-mult').title = 'Chế độ mua: ' + (buyMode === 'next' ? 'đến mốc 10 cấp kế tiếp' : buyMode === 'max' ? 'mua tối đa trong giới hạn' : 'mua ' + buyMode + ' cấp');
  ui();
};

$('#home').onclick = () => {
  if (sl > 0) return;
  pl.pose = '';
  if (inside) { pl.act = 'exit'; pl.tx = W*.05; }
  else { pl.act = 'enter'; pl.tx = W*.62; }
};

const WTH_ICONS = ['🌙', '🌧️', '🧚', '🌫️', '🍃'];
const WTH_NAMES = ['Đêm quang', 'Mưa đêm', 'Bụi tiên', 'Sương mù', 'Gió lá'];
$('#wth').textContent = WTH_ICONS[S.wth || 0];
$('#wth').onclick = e => {
  e.stopPropagation();
  S.wth = ((S.wth || 0) + 1) % 5;
  $('#wth').textContent = WTH_ICONS[S.wth];
  toast(WTH_ICONS[S.wth] + ' ' + WTH_NAMES[S.wth]);
};

$('#nav-bar').addEventListener('click', e => {
  const b = e.target.closest('.loc-pill'); if (!b || sl > 0) return;
  const loc = +b.dataset.loc;
  if (inside) leave();
  pl.pose = '';
  const targets = [W*.52, W*1.5, W*2.45, W*3.35];
  pl.tx = targets[loc];
  setMood('🚶', 2);
});

function renderSettings() {
  $('#cfg').innerHTML = `
    <div class="cfg-card">
      <h4>📊 Thống Kê</h4>
      <div class="stat-grid">
        <div class="stat-box">Tổng ánh sáng<b>✦ ${fm(S.tot)}</b></div>
        <div class="stat-box">Hệ số<b>x${mult().toFixed(2)}</b></div>
        <div class="stat-box">Tinh Hoa<b>🌕 ${S.ess}</b></div>
        <div class="stat-box">Sao băng<b>🌠 ${S.caught}</b></div>
      </div>
    </div>
    <div class="cfg-card">
      <h4>💾 Lưu trữ</h4>
      <small style="color:var(--mut);display:block;margin-bottom:8px">Tự động lưu 5s/lần:</small>
      <div class="btn-group">
        <button class="cfg-btn" id="btn-exp">📋 Sao chép</button>
        <button class="cfg-btn" id="btn-imp">📥 Nhập</button>
      </div>
    </div>
    <div class="cfg-card" style="border:1px solid #b8a2ff66">
      <h4>🐾 Gọi toàn bộ sinh vật</h4>
      <small style="color:var(--mut);display:block;margin-bottom:8px">Lệnh thử tạo hình: mở khóa 12 bạn rừng và gọi 12 sinh vật hoang dã trên bản đồ. Dùng để rà soát hình ảnh; có thể hoàn tác bằng tải lại bản lưu đã sao chép trước đó.</small>
      <div class="btn-group"><button class="cfg-btn" id="btn-add-full">ADD FULL · Gọi tất cả</button><button class="cfg-btn" id="btn-add-full-off">Tắt chế độ xem</button></div>
    </div>
    <div class="cfg-card" style="border:1px solid #d86b6b66">
      <h4>🧪 Kiểm thử</h4>
      <small style="color:var(--mut);display:block;margin-bottom:8px">Xóa tiến trình cục bộ của game trên trình duyệt này để thử lại từ đầu. Hành động không thể hoàn tác nếu chưa sao chép bản lưu.</small>
      <button class="cfg-btn" id="btn-reset-data" style="border-color:#d86b6b88;color:#ffb3b3">🗑️ Xóa dữ liệu & chơi lại từ đầu</button>
    </div>`;
  $('#btn-exp').onclick = () => {
    save();
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    navigator.clipboard?.writeText(code);
    toast('✅ Đã sao chép mã lưu!');
  };
  $('#btn-imp').onclick = () => {
    const code = prompt('Dán mã lưu:');
    if (!code) return;
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
      if (typeof data.l === 'number') {
        Object.assign(S, data); save(); syncF(); ui();
        toast('🎉 Khôi phục thành công!');
      }
    } catch(err) { toast('⚠️ Mã không hợp lệ!'); }
  };
  $('#btn-add-full').onclick = () => {
    try { window.rddCommand('add full'); } catch (err) { console.error(err); toast('Không thể gọi toàn bộ sinh vật: ' + (err.message || err)); }
  };
  $('#btn-add-full-off').onclick = () => {
    try { window.rddCommand('add full off'); } catch (err) { console.error(err); }
  };
  $('#btn-reset-data').onclick = () => {
    const accepted = confirm('XÓA DỮ LIỆU KIỂM THỬ?\n\nGame sẽ xóa tiến trình đã lưu trên trình duyệt này và khởi động lại từ đầu. Hãy sao chép mã lưu trước nếu muốn giữ tiến trình. Không thể hoàn tác.');
    if (!accepted) return;
    try {
      // Block interval/visibility saves from recreating the old save during reload.
      window.__RDD_RESETTING = true;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && /^rdd/i.test(key)) keys.push(key);
      }
      ['rdd5', 'rdd_expansion_v1', 'rdd_artisan_ix'].forEach(key => { if (!keys.includes(key)) keys.push(key); });
      keys.forEach(key => localStorage.removeItem(key));
      try { sessionStorage.setItem('rdd_force_fresh_start', '1'); } catch (_) {}
      const remaining = ['rdd5', 'rdd_expansion_v1', 'rdd_artisan_ix'].filter(key => localStorage.getItem(key) !== null);
      if (remaining.length) throw new Error('Không xóa được khóa: ' + remaining.join(', '));
      location.reload();
    } catch (err) {
      window.__RDD_RESETTING = false;
      console.error('[Rừng Đom Đóm] Không thể xóa dữ liệu:', err);
      alert('Không thể xóa dữ liệu tự động: ' + (err && err.message ? err.message : 'trình duyệt chặn lưu trữ') + '. Hãy thử mở game trong Chrome hoặc kiểm tra quyền lưu trữ.');
    }
  };
}

let achNotified = new Set();
function checkAchievements() {
  for (let i = 0; i < AC.length; i++) {
    if (!S.ach.includes(i) && AC[i][2]()) {
      S.ach.push(i);
      if (!achNotified.has(i)) {
        achNotified.add(i);
        toast('🏆 Thành tựu: ' + AC[i][0] + ' (+5% sản lượng)');
        arp([7, 9, 12], .16);
        addShake(4);
      }
    }
  }
}

function ui() {
  $('#num').textContent = fm(S.l);
  $('#rate').textContent = `+${fp(cps())}/giây · Chạm +${fp(tapPow())}`;
  let bHtml = '';
  if (S.ess > 0) bHtml += `<span class="badge">🌕 ${S.ess} Tinh Hoa</span>`;
  if (Date.now() < S.buff) {
    const rem = Math.ceil((S.buff - Date.now())/1000);
    bHtml += `<span class="badge buff">⚡ x1.5 (${rem}s)</span>`;
  }
  if (Date.now() < S.gbuff) {
    bHtml += `<span class="badge buff">🌟 x3 (${Math.ceil((S.gbuff - Date.now())/1000)}s)</span>`;
  }
  if (combo > 1.05) bHtml += `<span class="badge combo">🔥 x${combo.toFixed(1)}</span>`;
  bHtml += `<span class="badge">🏆 ${S.ach.length}/${AC.length}</span>`;
  $('#badges').innerHTML = bHtml;

  checkAchievements();

  const curZone = inside ? 0 : Math.min(3, Math.max(0, Math.round(cam/W)));
  if (!Array.isArray(S.visitedZones)) S.visitedZones = [0];
  if (!S.visitedZones.includes(curZone)) S.visitedZones.push(curZone);
  if (S.visitedZones.length >= 4 && !(S.codex||[]).includes('visited-all-zones')) S.codex.push('visited-all-zones');
  $$('.loc-pill').forEach((p, idx) => p.classList.toggle('on', idx === curZone));

  if (tab === 2) {
    const pct = Math.round((S.ach.length/AC.length)*100);
    $('#ach').innerHTML = `
      <div class="ach-head">
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700">
          <span>Thành tựu (${S.ach.length}/${AC.length})</span>
          <span style="color:var(--gold)">+${S.ach.length*5}% Sản lượng</span>
        </div>
        <div class="ach-prog-bg">
          <div class="ach-prog-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="ac-grid">
        ${AC.map((a, i) => `
          <div class="ac ${S.ach.includes(i) ? 'on' : ''}">
            <span class="ac-ic">${S.ach.includes(i) ? '🏆' : '🔒'}</span>
            <div class="ac-info"><b>${a[0]}</b><small>${a[1]}</small></div>
          </div>`).join('')}
      </div>`;
  } else if (tab === 4) {
    renderSettings();
  }
  if (tab === 5) renderNb();

  const ge = gainE();
  preRow.d.textContent = ge >= 1
    ? `Làm mới để nhận +${fm(ge)} Tinh Hoa (+10%/Tinh Hoa)`
    : `Cần ${fm(2e5)} tổng ánh sáng chu kỳ này`;
  preRow.c.textContent = 'Tinh Hoa: ' + S.ess;
  preRow.p.textContent = ge >= 1 ? '+' + fm(ge) + ' ✦' : 'Chưa đủ';
  preRow.b.classList.toggle('ok', ge >= 1);
  preRow.bar.style.width = Math.min(100, (S.run/2e5)*100) + '%';

  const tBulk = calcBulk(40, 2.2, S.tap, buyMode);
  tapRow.d.textContent = `Sức mạnh chạm: +${fp(tapPow())} mỗi lần chạm`;
  tapRow.c.textContent = `Cấp ${S.tap}` + (tBulk.count > 1 ? ` (+${tBulk.count})` : '');
  tapRow.p.textContent = '✦ ' + fm(tBulk.total);
  tapRow.b.classList.toggle('ok', S.l >= tBulk.total);
  tapRow.bar.style.width = Math.min(100, (S.l/tBulk.total)*100) + '%';

  rows.forEach((r, i) => {
    const b = calcBulk(G[i].c, 1.15, S.own[i], buyMode);
    r.d.textContent = `${G[i].d} · +${fp(G[i].p*mult())}/giây`;
    r.c.textContent = `Sở hữu ${S.own[i]}` + (b.count > 1 ? ` (+${b.count})` : '');
    r.p.textContent = '✦ ' + fm(b.total);
    r.b.classList.toggle('ok', S.l >= b.total);
    r.bar.style.width = Math.min(100, (S.l/b.total)*100) + '%';
  });
  prow.forEach((r, i) => {
    const b = calcBulk(PET[i].c, 1.7, S.pet[i], buyMode);
    r.c.textContent = `Cấp ${S.pet[i]}` + (b.count > 1 ? ` (+${b.count})` : '');
    r.p.textContent = '✦ ' + fm(b.total);
    r.b.classList.toggle('ok', S.l >= b.total);
    r.bar.style.width = Math.min(100, (S.l/b.total)*100) + '%';
  });
  hrow.forEach((r, i) => {
    const b = calcBulk(HM[i].c, 2.0, S.home[i], buyMode);
    r.c.textContent = `Cấp ${S.home[i]}` + (b.count > 1 ? ` (+${b.count})` : '');
    r.p.textContent = '✦ ' + fm(b.total);
    r.b.classList.toggle('ok', S.l >= b.total);
    r.bar.style.width = Math.min(100, (S.l/b.total)*100) + '%';
  });
}

let tt;
function toast(s) {
  const e = $('#toast'); e.textContent = s;
  const stage = $('#stage');
  const isWildlifeReward = /bắt được đom đóm|quan sát sao băng|Cáo lửa quan sát sao băng/i.test(String(s));
  e.classList.toggle('reward-corner', isWildlifeReward);
  if (isWildlifeReward) {
    // Wildlife rewards must not cover the sky, dragon, or the player's main touch area.
    e.style.top = 'auto';
    e.style.left = '12px';
    e.style.right = 'auto';
    e.style.bottom = 'calc(82px + var(--safe-bot, 0px))';
    e.style.transform = 'translateY(8px)';
  } else {
    e.style.left = '50%';
    e.style.right = 'auto';
    e.style.bottom = 'auto';
    e.style.top = ($('#hud').getBoundingClientRect().bottom - stage.getBoundingClientRect().top + 10) + 'px';
    e.style.transform = 'translateX(-50%) translateY(-10px)';
  }
  e.classList.add('on');
  clearTimeout(tt);
  tt = setTimeout(() => e.classList.remove('on'), 3400);
}



/* ============ INPUT ============ */
$('#snd').textContent = S.snd ? '🔊' : '🔇';
$('#snd').onclick = e => {
  e.stopPropagation();
  S.snd = S.snd ? 0 : 1;
  $('#snd').textContent = S.snd ? '🔊' : '🔇';
  initAudio();
  if (master) master.gain.value = S.snd ? .8 : 0;
};

const stg = $('#stage');
let dg = null;
stg.addEventListener('pointerdown', e => {
  if (e.target.closest('button') || e.target.closest('#nav-bar')) return;
  dg = { x: e.clientX, c: camT, m: 0 };
});
stg.addEventListener('pointermove', e => {
  if (!dg) return;
  const dx = e.clientX - dg.x;
  dg.m = Math.max(dg.m, Math.abs(dx));
  if (dg.m > 10 && sl <= 0) {
    pl.tx = null; pl.pose = '';
    pl.vx = Math.max(-1, Math.min(1, dx/(W*.15)));
  }
});
stg.addEventListener('pointerup', e => {
  initAudio(); pl.vx = 0;
  if (dg && dg.m < 10) {
    const ev = new Event('tapevt');
    ev.clientX = e.clientX; ev.clientY = e.clientY;
    stg.dispatchEvent(ev);
  }
  dg = null;
});
stg.addEventListener('pointercancel', () => { dg = null; pl.vx = 0; });

addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a') pl.vx = -1;
  if (e.key === 'ArrowRight' || e.key === 'd') pl.vx = 1;
  if (e.key === 'e' || e.key === 'E') $('#home').click();
});
addEventListener('keyup', e => {
  if (['ArrowLeft','ArrowRight','a','d'].includes(e.key)) pl.vx = 0;
});

let lastClickTime = 0;
stg.addEventListener('tapevt', e => {
  initAudio();
  const r0 = cv.getBoundingClientRect();
  const qx = e.clientX - r0.left, qy = e.clientY - r0.top;
  if (sl > 0) return;

  const now = Date.now();
  if (now - lastClickTime < 300 && !inside) {
    const bridgeOff = bridgeY(pl.x);
    const px = pl.x - cam;
    const py = H*.68 + H*.19 + bridgeOff - H*.08;
    if (Math.hypot(qx - px, qy - py) < 60) {
      pl.jump = 1;
      chime(7, 0.1, 0.8);
    }
  }
  lastClickTime = now;

  if (!inside && hitCabin(qx, qy)) {
    pl.act = 'enter'; pl.tx = W*.62; return;
  }
  if (inside) {
    const act =
      (qx < W*.11 && qy > H*.35 && qy < H*.69) ? ['exit', W*.05] :
      (qx > W*.12 && qx < W*.39 && qy > H*.48 && qy < H*.75) ? ['bed', W*.25] :
      (qx > W*.65 && qy > H*.30 && qy < H*.70) ? ['fire', W*.69] :
      (qx > W*.40 && qx < W*.60 && qy > H*.56 && qy < H*.84) ? ['tea', W*.37] :
      (qx > W*.02 && qx < W*.32 && qy > H*.10 && qy < H*.48) ? ['book', W*.15] : null;
    if (act && act[0] === 'fire' && pl.pose === 'warm') { feedFire(); return; }
    if (act) { pl.act = act[0]; pl.tx = act[1]; return; }
  }

  tapCount++;
  comboTimer = 2.2;
  combo = Math.min(3.0, 1 + Math.floor(tapCount/4)*.2);
  $('#hud').classList.remove('pulse');
  void $('#hud').offsetWidth;
  $('#hud').classList.add('pulse');
  setTimeout(() => $('#hud').classList.remove('pulse'), 180);

  const star = ST.find(s => !s.dead && Math.hypot(qx - s.x, qy - s.y) < 58);
  if (star) {
    const gain = Math.max(35, cps()*star.w);
    add(gain); S.caught++;
    if (star.w >= 60) toast('🌠 Sao Băng! +' + fm(gain));
    pushParticles({ k:'t', x:star.x, y:star.y, text:'🌠 +' + fm(gain), col:'#6ef2ff', life:1.2 });
    arp([5, 7, 9, 12, 14], .16);
    addShake(3);
    for (let i = 0; i < 26; i++) {
      pushParticles({ k:'s', c:'c', x:star.x, y:star.y,
        vx:(Math.random()-.5)*320, vy:(Math.random()-.8)*220, life:1 });
    }
    star.dead = 1; setMood('🌠', 3); ui(); return;
  }

  const ff = F.findIndex(f => Math.hypot(qx - f.x, qy - f.y) < 42);
  const v = tapPow() * (ff >= 0 ? 6 : 1);
  add(v);
  if (ff >= 0) {
    F[ff].x = -60; F[ff].tr = [];
    chime(12 + Math.floor(Math.random()*3), .13, 1);
    setMood('✨', 2);
  } else {
    chime(Math.floor(Math.random()*9), .15);
  }
  pushParticles(
    { k:'r', x:qx, y:qy, life:1 },
    { k:'t', x:qx, y:qy - 12,
      text:(ff >= 0 ? '✨ +' : '+') + fm(v),
      col:ff >= 0 ? '#7affb2' : '#ffe07d', life:1 }
  );
  for (let i = 0; i < 8; i++) {
    pushParticles({ k:'s', c:ff >= 0 ? 'g' : 'w', x:qx, y:qy,
      vx:(Math.random()-.5)*170, vy:-Math.random()*130, life:1 });
  }
  F.slice(0, 14).forEach(f => { f.a = Math.atan2(qy - f.y, qx - f.x); });
  if (S.hint) { S.hint = 0; $('#hint').style.opacity = 0; }
  ui();
});

function save() {
  if (window.__RDD_RESETTING) return;
  S.m = Date.now();
  try { localStorage.setItem('rdd5', JSON.stringify(S)); } catch(e){}
}
addEventListener('visibilitychange', save);
setInterval(save, 5000);

/* ============ EXPANSION: PERKS, WILD, QUESTS, CODEX ============ */
const PERKS = [
  [2, 'Ánh trăng đầu tiên', '+10% sản lượng', .10],
  [6, 'Tiếng vọng rừng sâu', '+15% sản lượng', .15],
  [15, 'Bầu trời mở hội', 'Sao băng đến dày hơn · +25%', .25],
  [40, 'Đàn đom đóm vàng', 'Đom đóm vàng nhanh hơn · +40%', .40],
  [100, 'Nữ hoàng Trăng Tròn', '+75% sản lượng', .75]
];
function extraMult() {
  let m = 1;
  for (const p of PERKS) if (S.ess >= p[0]) m *= 1 + p[3];
  m *= 1 + .03*S.codex.length;
  if (Date.now() < S.gbuff) m *= 3;
  m *= homeMult();
  return m;
}
const WL = [
  { id:'moth', n:'Bướm đêm ngân', z:0, r:1, i:'🦋' },
  { id:'hare', n:'Thỏ trăng', z:0, r:.5, i:'🐇' },
  { id:'hedgehog', n:'Nhím bụng trắng', z:0, r:.8, i:'🦔' },
  
  { id:'deer', n:'Hươu sừng sáng', z:1, r:1, i:'🦌' },
  { id:'fox', n:'Hồ ly linh hồn', z:1, r:.25, i:'🦊' },
  { id:'owl', n:'Cú mèo tinh anh', z:1, r:.4, i:'🦉' },
  
  { id:'dfly', n:'Chuồn chuồn pha lê', z:2, r:1, i:'🪲' },
  { id:'salm', n:'Cá hồi ngân hà', z:2, r:.5, i:'🐟' },
  { id:'frog', n:'Ếch thủy tinh', z:2, r:.7, i:'🐸' },
  
  { id:'koi', n:'Cá chép trăng', z:3, r:1, i:'🎏' },
  { id:'turt', n:'Rùa cổ thụ', z:3, r:.25, i:'🐢' },
  { id:'swan', n:'Thiên nga ánh sáng', z:3, r:.3, i:'🦢' }
];
const QD = [
  { k:'taps', t: g => `Chạm ${g} lần`, get: () => S.taps, gs:[50,150,400] },
  { k:'star', t: g => `Bắt ${g} sao băng`, get: () => S.caught, gs:[2,4,8] },
  { k:'wild', t: g => `Phát hiện ${g} sinh vật`, get: () => S.hits, gs:[2,4,6] },
  { k:'earn', t: g => `Thu thêm ${fm(g)} ánh sáng`, get: () => S.tot, gs:[1,2,4] },
  { k:'sleep', t: () => 'Ngủ một giấc', get: () => S.sleeps, gs:[1] },
  { k:'read', t: g => `Đọc sách ${g} lần`, get: () => S.reads, gs:[1,2] },
  { k:'gold', t: () => 'Bắt đom đóm vàng', get: () => S.gold, gs:[1] }
];
AC.push(
  ['Nấm thần', 'Sở hữu Nấm phát quang', () => S.own[6] > 0],
  ['Ngọc tinh tú', 'Sở hữu Pha lê tinh tú', () => S.own[7] > 0],
  ['Người đưa tin rừng', 'Hoàn thành 10 nhiệm vụ', () => S.qn >= 10],
  ['Nhà thám hiểm', 'Ghi 4 sinh vật vào Sổ tay', () => S.codex.length >= 4],
  ['Nhà tự nhiên học', 'Ghi đủ 12 sinh vật', () => S.codex.length >= 12],
  ['Vua ánh vàng', 'Bắt 3 đom đóm vàng', () => S.gold >= 3]
);

function fillQ() {
  let n = 0;
  while (S.q.length < 3 && n++ < 30) {
    const d = QD[Math.random() * QD.length | 0];
    if (S.q.some(q => q.k === d.k)) continue;
    const gi = Math.random() * d.gs.length | 0;
    const g = d.k === 'earn' ? Math.max(500, Math.round(cps()*240*d.gs[gi])) : d.gs[gi];
    S.q.push({ k:d.k, g, b:d.get(), r:Math.max(200, cps()*300*(1 + gi*.6)) });
  }
}

let WLS = [], GF = null;
let nwl = Date.now() + 7000, ngf = Date.now() + 45000, nxs = Date.now() + 50000;
let seenWL = 0;
const ZN = ['Bìa rừng', 'Rừng linh hồn', 'Thác ngân hà', 'Hồ trăng'];

// Art-review command: `add full` unlocks every companion and places every wild species
// across its intended zone. This is a visual QA utility; it does not grant currency.
window.__RDD_ADD_FULL_ACTIVE = false;
window.rddCommand = function(command) {
  const cmd = String(command || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (cmd === 'add full off' || cmd === 'add full reset') {
    window.__RDD_ADD_FULL_ACTIVE = false;
    WLS = WLS.filter(w => !w.__addFull);
    toast('Đã tắt chế độ gọi toàn bộ sinh vật.');
    if (typeof ui === 'function') ui();
    return { ok:true, mode:'off' };
  }
  if (cmd !== 'add full') return { ok:false, message:'Lệnh chưa hỗ trợ. Dùng: add full hoặc add full off' };
  S.pet = PET.map((_, i) => Math.max(1, Number((S.pet || [])[i]) || 0));
  while (S.pet.length < PET.length) S.pet.push(1);
  S.codex = Array.isArray(S.codex) ? S.codex : [];
  for (const w of WL) if (!S.codex.includes(w.id)) S.codex.push(w.id);
  // Place all 12 wild species in their correct biome; 3 per zone, spread across each zone.
  WLS = WLS.filter(w => !w.__addFull);
  const zoneCounts = [0,0,0,0];
  for (const species of WL) {
    const local = zoneCounts[species.z]++;
    const wx = W * (species.z + .18 + local * .32);
    const wo = { s:species, wx, t:1.1, life:600, hx:0, y:-999, wy:0, __addFull:true };
    if (species.id === 'salm') wo.wy = H*.68 + H*.32*.44;
    if (species.id === 'koi') wo.wy = H*.68 + H*.195;
    WLS.push(wo);
  }
  window.__RDD_ADD_FULL_ACTIVE = true;
  save();
  if (typeof ui === 'function') ui();
  toast('🐾 ADD FULL: đã gọi đủ 12 bạn rừng + 12 sinh vật hoang dã. Di chuyển qua 4 khu vực để rà soát.');
  return { ok:true, companions:PET.length, wild:WL.length, zones:ZN.slice(), saveKey:'rdd5' };
};

function xTick(dt) {
  const now = Date.now();
  updateBridges();
  if (inside || sl > 0) return;
  const z = Math.max(0, Math.min(3, Math.round(cam/W)));
  if (now > nwl) {
    nwl = now + 10000 + Math.random()*9000;
    if (WLS.length < 2) {
      const c = WL.filter(w => w.z === z);
      const tot = c.reduce((a, w) => a + w.r, 0);
      let r = Math.random() * tot, s = c[0];
      for (const w of c) { if ((r -= w.r) <= 0) { s = w; break; } }
      const wo = { s, wx: cam + W*(.15 + .7*Math.random()),
        t:0, life:15, hx:0, y:-999, wy:0 };
      if (s.id === 'salm') {
        wo.wx = W*(2.5 + .12*Math.sin(.44*3.2 + .6) - .044) + (Math.random()-.5)*W*.08;
        wo.wy = H*.68 + H*.32*.44;
      }
      if (s.id === 'koi') {
        wo.wx = W*3.5 + (Math.random()-.5)*W*.3;
        wo.wy = H*.68 + H*.195;
      }
      WLS.push(wo);
      if (!seenWL) {
        seenWL = 1;
        toast('✨ Có sinh vật lạ! Chạm để ghi vào Sổ tay');
      }
    }
  }
  WLS.forEach(w => { w.t += dt; w.life -= dt; });
  WLS = WLS.filter(w => w.life > 0 && !w.gone);

  if (now > ngf) {
    ngf = now + (S.ess >= 40 ? 35000 : 70000) + Math.random()*40000;
    GF = { x:-30, y: H*(.2 + Math.random()*.3), t:0, life:13, cy: 0, trail: [] };
    toast('🌟 Đom đóm vàng đang bay ngang!');
  }
  if (GF) {
    GF.t += dt; GF.life -= dt; GF.x += W/11 * dt;
    GF.cy = GF.y + Math.sin(GF.t*2.1)*H*.06;
    GF.trail.push({ x: GF.x, y: GF.cy });
    if (GF.trail.length > 8) GF.trail.shift();
    if (GF.life <= 0 || GF.x > W + 40) GF = null;
  }
  if (S.ess >= 15 && now > nxs) {
    nxs = now + 45000 + Math.random()*30000;
    ST.push({ x:-40, y: H*(.08 + Math.random()*.22),
      vx: W/5.5, vy: H*.05, life:9, w:60 });
  }
}

const ell = (X, Y, rx, ry, rot, col) => {
  x.fillStyle = col;
  x.beginPath(); x.ellipse(X, Y, Math.max(.1, rx), Math.max(.1, ry), rot, 0, 7); x.fill();
};
const gl = (s, X, Y, z, a) => {
  x.globalCompositeOperation = 'lighter';
  glow(s, X, Y, z, a);
  x.globalCompositeOperation = 'source-over';
  x.globalAlpha = 1;
};

function drawWL(w, t, gy) {
  const sx = w.wx - cam;
  const u = w.t;
  const a = Math.max(0, Math.min(1, w.life/1.5, u));
  if (sx < -120 || sx > W + 120) { w.hx = -999; return; }
  let X = sx, y = -999;
  // Phase 5.42: wild species had individually drawn anatomy but almost identical
  // absolute pixel dimensions. Scale each complete drawing around its ground anchor.
  // Factors are intentionally separated by ecological body class, not by glow size.
  const WILD_PHYSICAL_SCALE = {
    moth:.34, hare:.74, hedgehog:.66, deer:1.52, fox:1.12, owl:.92,
    dfly:.36, salm:.90, frog:.64, koi:.92, turt:.62, swan:1.38
  };
  const wlScale = WILD_PHYSICAL_SCALE[w.s.id] || 1;
  // Scale around each species' own anchor. A shared anchor shifted ground animals
  // vertically and made small insects appear to float or sink as their scale changed.
  const wlAnchorY = ({moth:gy-H*.075, hare:gy+H*.17, hedgehog:gy+H*.18, deer:gy+H*.15, fox:gy+H*.15, owl:gy+H*.15, dfly:H*.52, salm:(w.wy||gy+H*.14), koi:(w.wy||gy+H*.14), frog:gy+H*.19, turt:gy+H*.19, swan:gy+H*.18})[w.s.id] ?? (gy+H*.18);
  x.save();
  x.translate(sx*(1-wlScale), wlAnchorY*(1-wlScale));
  x.scale(wlScale, wlScale);
  x.globalAlpha = a;
  switch (w.s.id) {
    case 'moth': {
      // Wild moth stays near the flower layer, not high in the open sky; its body drifts locally.
      // Moth: short, irregular hovering loop around flowers; not a fast horizontal sweep.
      X = sx + Math.sin(u*.42)*12 + Math.sin(u*.93)*3.5;
      y = gy - H*.055 + Math.sin(u*.72)*H*.008 + Math.sin(u*1.8)*1.5;
      const flap = Math.sin(u*12.5), wingAngle = .18 + flap*.34;
      x.save();x.translate(X,y);x.rotate(Math.sin(u*.55)*.035);
      x.save();x.translate(-1,-1);x.rotate(-wingAngle);
      x.fillStyle='rgba(190,224,255,.92)';x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(-11,-14,-22,-10);x.quadraticCurveTo(-24,-3,-8,3);x.closePath();x.fill();
      x.strokeStyle='rgba(245,250,255,.82)';x.lineWidth=.65;x.beginPath();x.moveTo(-2,0);x.lineTo(-20,-8);x.moveTo(-6,1);x.lineTo(-17,-2);x.stroke();x.restore();
      x.save();x.translate(1,-1);x.rotate(wingAngle);
      x.fillStyle='rgba(190,224,255,.92)';x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(11,-14,22,-10);x.quadraticCurveTo(24,-3,8,3);x.closePath();x.fill();
      x.strokeStyle='rgba(245,250,255,.82)';x.lineWidth=.65;x.beginPath();x.moveTo(2,0);x.lineTo(20,-8);x.moveTo(6,1);x.lineTo(17,-2);x.stroke();x.restore();
      const hindFold=.12+Math.abs(flap)*.12;
      x.save();x.translate(-1,2);x.rotate(-hindFold);x.fillStyle='#d8cbff';x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(-8,1,-10,8);x.quadraticCurveTo(-4,9,0,3);x.closePath();x.fill();x.restore();
      x.save();x.translate(1,2);x.rotate(hindFold);x.fillStyle='#d8cbff';x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(8,1,10,8);x.quadraticCurveTo(4,9,0,3);x.closePath();x.fill();x.restore();
      x.fillStyle='#35405f';x.beginPath();x.ellipse(0,1,1.35,5.2,0,0,Math.PI*2);x.fill();
      x.strokeStyle='#e5dcff';x.lineWidth=.8;x.beginPath();x.moveTo(-.5,-3);x.quadraticCurveTo(-3,-9,-6,-10);x.moveTo(.5,-3);x.quadraticCurveTo(3,-9,6,-10);x.stroke();x.restore();
      /* restrained wildlife lighting: silhouette-first */ break;
    }
    case 'hare': {
      y = gy + H*.17 - (u % 4 < 1.2 ? Math.abs(Math.sin(u*2.6))*14 : 0);
      ell(X, y, 13, 9, 0, '#d9e4ff');
      ell(X + 11, y - 6, 6, 5, 0, '#e8efff');
      ell(X + 10, y - 16, 2.2, 8, .2, '#d9e4ff');
      ell(X + 14, y - 15, 2.2, 8, .4, '#d9e4ff');
      /* restrained wildlife lighting: silhouette-first */ break;
    }
    case 'hedgehog': {
      y = gy + H*.18;
      X = sx + Math.sin(u*2)*20;
      ell(X, y, 14, 8, 0, '#d9e4ff'); // Bụng
      ell(X - 4, y - 3, 12, 7, -.2, '#4a5568'); // Lưng gai
      x.fillStyle = '#2d3748';
      for(let i=0; i<5; i++) {
          x.beginPath(); x.moveTo(X-10+i*4, y-6); x.lineTo(X-8+i*4, y-12); x.lineTo(X-6+i*4, y-6); x.fill();
      }
      ell(X + 10, y - 2, 4, 4, 0, '#d9e4ff'); // Mũi
      /* restrained wildlife lighting: silhouette-first */ break;
    }
    case 'deer': {
      // Readable fawn silhouette: slim torso, four long legs, sloping neck, small muzzle and branched antlers.
      X = sx + Math.sin(u*.7)*8; y = gy + H*.15;
      ell(X-2,y-18,21,9,-.05,'#b98550'); ell(X-8,y-17,8,8,0,'#c99b67');
      x.fillStyle='#c99b67';x.beginPath();x.moveTo(X+7,y-22);x.quadraticCurveTo(X+13,y-31,X+14,y-37);x.lineTo(X+20,y-35);x.quadraticCurveTo(X+18,y-26,X+12,y-17);x.closePath();x.fill();
      ell(X+19,y-38,6,4,-.18,'#d8ad75');ell(X+24,y-37,3.4,2,0,'#f2d9b5');ell(X+27,y-37,1.1,1,0,'#392a25');
      x.strokeStyle='#e7d2ad';x.lineWidth=2.1;x.lineCap='round';x.beginPath();
      x.moveTo(X+16,y-41);x.lineTo(X+13,y-49);x.lineTo(X+8,y-53);x.moveTo(X+13,y-49);x.lineTo(X+14,y-55);x.moveTo(X+13,y-49);x.lineTo(X+8,y-47);
      x.moveTo(X+21,y-41);x.lineTo(X+25,y-49);x.lineTo(X+30,y-52);x.moveTo(X+25,y-49);x.lineTo(X+25,y-55);x.moveTo(X+25,y-49);x.lineTo(X+30,y-47);x.stroke();
      x.strokeStyle='#765239';x.lineWidth=2.4;for(const [a,b] of [[-16,-11],[-7,-10],[5,-10],[14,-11]]){x.beginPath();x.moveTo(X+a,y-13);x.lineTo(X+a+b*.04,y+2);x.stroke();}
      for(const [dx,dy] of [[-10,-21],[-5,-23],[0,-21],[4,-22],[8,-19]])ell(X+dx,y+dy,1.2,1.4,0,'#fff0d2');
      /* restrained wildlife lighting: silhouette-first */ y-=22; break;
    }
    case 'fox': {
      // Fox side profile with a large brush tail, pointed ears and cream muzzle.
      X = sx + Math.sin(u*.9)*10; y = gy + H*.15;
      const sa=a*(.78+.22*Math.sin(u*2.2));x.globalAlpha=sa;
      x.fillStyle='#b94b2b';x.beginPath();x.moveTo(X-8,y-14);x.quadraticCurveTo(X-30,y-30,X-27,y-13);x.quadraticCurveTo(X-24,y-5,X-10,y-8);x.closePath();x.fill();
      x.fillStyle='#f5e4cc';x.beginPath();x.moveTo(X-27,y-13);x.lineTo(X-32,y-9);x.lineTo(X-23,y-9);x.closePath();x.fill();
      ell(X-1,y-14,18,8,-.04,'#d76535');
      x.fillStyle='#e1763c';x.beginPath();x.moveTo(X+7,y-20);x.lineTo(X+6,y-31);x.lineTo(X+13,y-23);x.lineTo(X+17,y-30);x.lineTo(X+18,y-19);x.closePath();x.fill();
      x.fillStyle='#f8e7d2';x.beginPath();x.moveTo(X+10,y-15);x.lineTo(X+25,y-14);x.lineTo(X+29,y-12);x.lineTo(X+20,y-10);x.lineTo(X+12,y-11);x.closePath();x.fill();
      ell(X+27,y-12,1.2,1,0,'#241b22');ell(X+14,y-18,1.2,1.4,0,'#ffe08a');
      x.strokeStyle='#fff0d8';x.lineWidth=1.8;x.beginPath();x.moveTo(X-12,y-8);x.quadraticCurveTo(X-22,y-12+Math.sin(u*2)*2,X-25,y-20);x.stroke();
      /* restrained wildlife lighting: silhouette-first */ y-=14;break;
    }
    case 'owl': {
      X = sx + Math.sin(u*1.5)*10; y = gy + H*.15;
      ell(X, y - 10, 10, 14, 0, '#1b284a');
      ell(X, y - 22, 9, 9, 0, '#1b284a');
      ell(X-4, y-24, 3, 3, 0, '#f5be4f'); ell(X+4, y-24, 3, 3, 0, '#f5be4f');
      /* restrained wildlife lighting: silhouette-first */ break;
    }
    case 'dfly': {
      X = sx + Math.sin(u*1.1)*90;
      y = H*.52 + Math.sin(u*2.3)*H*.05 + Math.sin(u*9)*3;
      const k = Math.max(1, H*.0017), flap = Math.sin(u*38), dirn = Math.cos(u*1.1) >= 0 ? 1 : -1;
      x.save(); x.translate(X, y); x.scale(dirn, 1); x.rotate(Math.sin(u*2.3)*.12);
      // bốn cánh trong suốt có gân, vỗ nhanh
      x.lineWidth = .8;
      for (const [wx, wy, len, rot] of [[2, -1, 15, -1.0], [-1, -1, 13, -1.45], [2, 1, 14, 1.0], [-1, 1, 12, 1.45]]) {
        x.save(); x.translate(wx*k, wy*k*.5); x.rotate(rot + flap*.32*(wy < 0 ? 1 : -1)); const wg = x.createLinearGradient(0, 0, len*k, 0);
        wg.addColorStop(0, 'rgba(200,250,255,.62)'); wg.addColorStop(1, 'rgba(150,230,255,.12)'); x.fillStyle = wg; x.beginPath(); x.ellipse(len*k*.5, 0, len*k*.5, 3.4*k, 0, 0, 7); x.fill();
        x.strokeStyle = 'rgba(235,255,255,.65)'; x.beginPath(); x.moveTo(0, 0); x.lineTo(len*k*.95, 0); x.stroke(); x.restore();
      }
      // thân chia đốt, đầu mắt to, đuôi dài
      const bg = x.createLinearGradient(-16*k, 0, 9*k, 0); bg.addColorStop(0, '#2a8fb0'); bg.addColorStop(.5, '#59e0f0'); bg.addColorStop(1, '#9ffcff');
      x.strokeStyle = bg; x.lineCap = 'round'; x.lineWidth = 2.1*k; x.beginPath(); x.moveTo(-17*k, 1.2*k); x.quadraticCurveTo(-8*k, 0, 6*k, 0); x.stroke();
      x.strokeStyle = 'rgba(10,50,70,.55)'; x.lineWidth = .9; for (let q = 0; q < 6; q++) { const px = -15*k + q*3.4*k; x.beginPath(); x.moveTo(px, -1.2*k); x.lineTo(px, 1.5*k); x.stroke(); }
      x.fillStyle = '#7ef4ff'; x.beginPath(); x.ellipse(2*k, 0, 3.2*k, 2.5*k, 0, 0, 7); x.fill();
      x.fillStyle = '#c9ffff'; x.beginPath(); x.arc(8.2*k, -.5*k, 2.4*k, 0, 7); x.fill(); x.fillStyle = '#12303f'; x.beginPath(); x.arc(9*k, -.9*k, 1*k, 0, 7); x.fill();
      x.restore();
      break;
    }
    case 'salm':
    case 'koi': {
      const c = (u % 3.2)/1.6;
      const col = w.s.id === 'salm' ? '#8ff0ff' : '#ffb78a';
      const wy = w.wy || gy + H*.14;
      if (c < 1) {
        X = sx + c*70 - 35;
        y = wy - Math.sin(c*Math.PI)*H*.045;
        const ang = -Math.cos(c*Math.PI)*.9;
        x.save(); x.translate(X, y); x.rotate(ang);
        ell(0, 0, 14, 5.5, 0, col);
        ell(-15, 0, 5, 6, .2, col); x.restore();
        /* restrained wildlife lighting: silhouette-first */ } else {
        const rr = (c - 1)*34;
        x.strokeStyle = 'rgba(190,225,255,.5)'; x.lineWidth = 1.4;
        x.beginPath(); x.ellipse(sx + 35, wy + 6, rr, rr*.3, 0, 0, 7); x.stroke();
      }
      break;
    }
    case 'frog': {
      y = gy + H*.19;
      X = sx + Math.sin(u*3)*30;
      ell(X, y, 10, 8, 0, '#7affb2');
      ell(X-6, y-6, 3, 3, 0, '#000'); ell(X+6, y-6, 3, 3, 0, '#000');
      /* restrained wildlife lighting: silhouette-first */ break;
    }
    case 'turt': {
      X = sx + u*6; y = gy + H*.19;
      ell(X + 22, y - 7, 6, 4, 0, '#22454a');
      ell(X, y - 9, 20, 12, 0, '#17313a');
      for (const dx of [-8, 0, 8]) /* restrained wildlife lighting: silhouette-first */ /* restrained wildlife lighting: silhouette-first */ y -= 10; break;
    }
    case 'swan': {
      X = sx + u*8; y = gy + H*.18;
      ell(X, y - 10, 18, 10, 0, '#ffffff');
      ell(X + 15, y - 20, 6, 12, .4, '#ffffff');
      ell(X + 18, y - 22, 3, 4, .8, '#ff9ee0'); // Mỏ
      /* restrained wildlife lighting: silhouette-first */ break;
    }
  }
  x.restore();
  x.globalAlpha = 1;
  w.hx = X; w.y = y;
}

function postFX(t, dt) {
  if (sl > 0) return;
  const gy = H*.68;
  if (!inside) {
    const zf = Math.max(0, Math.min(3, cam/W));
    const z0 = Math.floor(zf), z1 = Math.min(3, z0 + 1), k = zf - z0;
    const T = [
      [255,160,80,.08],[150,100,255,.10],[70,220,255,.10],[170,200,255,.09]
    ];
    const c = T[z0].map((v, i) => v + (T[z1][i] - v)*k);
    const tintKey = `${Math.round(W)}:${Math.round(H)}:${z0}:${z1}:${Math.round(k*100)}:${Math.round(c[3]*1000)}`;
    if (!window.__RDD_TINT_GRAD || window.__RDD_TINT_GRAD.key !== tintKey) {
      const tg = x.createLinearGradient(0, H*.3, 0, H);
      tg.addColorStop(0, `rgba(${c[0]|0},${c[1]|0},${c[2]|0},0)`);
      tg.addColorStop(1, `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${c[3]})`);
      window.__RDD_TINT_GRAD = { key: tintKey, gradient: tg };
    }
    const tg = window.__RDD_TINT_GRAD.gradient;
    x.globalCompositeOperation = 'screen';
    if (perfLvl < 2) { x.fillStyle = tg; x.fillRect(0, 0, W, H); }

    x.globalCompositeOperation = 'source-over';
    for (const w of WLS) drawWL(w, t, gy);
  }

  if (!inside && S.wth === 3) {
    for (let i = 0; i < 7; i++) {
      gl('m', ((t*.012*(i + 1) + i*W*.3) % (W + 400)) - 200,
        H*(.5 + i*.06), 340, .13);
    }
    x.fillStyle = 'rgba(8,14,32,.14)'; x.fillRect(0, 0, W, H);
  } else if (!inside && S.wth === 4) {
    for (const d of weatherDrops) {
      const lx = ((d.x*W + t*.14*d.s) % (W + 40)) - 20;
      const ly = ((d.y*H + t*.035*d.s) % H) + Math.sin(t/600 + d.ph)*20;
      x.save(); x.translate(lx, ly); x.rotate(t/500 + d.ph); x.globalAlpha = .6;
      ell(0, 0, 5, 2.4, 0, d.ph > 3 ? '#e9a96b' : '#8fd6a2'); x.restore();
    }
    x.globalAlpha = 1;
  }

  if (GF) {
    const p = .7 + .3*Math.sin(GF.t*8);
    for (let i = 0; i < GF.trail.length; i++) {
      const tr = GF.trail[i];
      const a = (i + 1)/GF.trail.length * .55;
      gl('w', tr.x, tr.y, 30 - i*3, a);
    }
    gl('f', GF.x, GF.cy, 110*p, .55);
    gl('w', GF.x, GF.cy, 54, 1);
    x.fillStyle = '#fff';
    x.beginPath(); x.arc(GF.x, GF.cy, 3.2, 0, 7); x.fill();
  }

  const vignetteKey=`${Math.round(W)}:${Math.round(H)}`;
  if(!window.__RDD_VIGNETTE || window.__RDD_VIGNETTE.key!==vignetteKey){
    const vg=x.createRadialGradient(W/2,H*.55,Math.min(W,H)*.35,
      W/2,H*.55,Math.max(W,H)*.78);
    vg.addColorStop(0,'rgba(2,4,14,0)');vg.addColorStop(1,'rgba(2,4,14,.6)');
    window.__RDD_VIGNETTE={key:vignetteKey,gradient:vg};
  }
  x.fillStyle=window.__RDD_VIGNETTE.gradient;x.fillRect(0,0,W,H);
  x.globalAlpha = 1;
}

let BL = null, BX = null, B2 = null, B2X = null, GP = null, qual = perfLvl === 0 ? 1 : 0, fAvg = 16, fT = 0, fCool = 0;
function mkGrain() {
  const c = document.createElement('canvas'); c.width = c.height = 96;
  const g = c.getContext('2d'), id = g.createImageData(96, 96);
  for (let i = 0; i < id.data.length; i += 4) { const v = Math.random()*255 | 0; id.data[i] = id.data[i+1] = id.data[i+2] = v; id.data[i+3] = 255; }
  g.putImageData(id, 0, 0); return c;
}

const __RDD_SAFE_EMPTY_CANVAS = (() => {
  const c = document.createElement('canvas'); c.width = 2; c.height = 2; return c;
})();
function rddSafeCanvasSource(source) {
  if (!source) return __RDD_SAFE_EMPTY_CANVAS;
  if (typeof source.getContext === 'function' && (source.width < 1 || source.height < 1)) return __RDD_SAFE_EMPTY_CANVAS;
  if ('naturalWidth' in source && (!source.complete || source.naturalWidth < 1 || source.naturalHeight < 1)) return __RDD_SAFE_EMPTY_CANVAS;
  return source;
}
function lushFX(t, dt) {
  // Guard offscreen effect canvases during startup/resizing before any drawImage call.
  if (typeof W !== 'number' || typeof H !== 'number' || W < 2 || H < 2) return;

  const n = performance.now();
  if (fT) {                                   // adaptive quality: drop heavy FX on slow devices
    fAvg = fAvg*.94 + Math.min(120, n - fT)*.06;
    if (fCool > 0) fCool--;
    
    
  }
  fT = n;
  if (sl > 0 || !qual) return;
  if (!inside) {                              // slow low-lying mist
    for (let i = 0; i < 4; i++)
      gl('m', ((t*.006*(i + 1) + i*W*.38) % (W + 500)) - 250, H*(.56 + i*.045), 380 + i*60, .045 + .012*i);
  }
  const cw = cv.width, ch = cv.height;
  const bw = Math.max(40, cw/6 | 0), bh = Math.max(40, ch/6 | 0);
  if (!BL || BL.width !== bw || BL.height !== bh) {
    BL = document.createElement('canvas'); BL.width = bw; BL.height = bh; BX = BL.getContext('2d');
    B2 = document.createElement('canvas'); B2.width = bw >> 2; B2.height = bh >> 2; B2X = B2.getContext('2d');
  }
  x.save(); x.setTransform(1, 0, 0, 1, 0, 0);
  BX.globalCompositeOperation = 'copy'; BX.drawImage(rddSafeCanvasSource(cv), 0, 0, bw, bh);   // bloom: downscale…
  BX.globalCompositeOperation = 'multiply'; BX.drawImage(rddSafeCanvasSource(BL), 0, 0); BX.drawImage(rddSafeCanvasSource(BL), 0, 0);   // …keep only the strongest highlights…
  B2X.globalCompositeOperation = 'copy'; B2X.drawImage(rddSafeCanvasSource(BL), 0, 0, B2.width, B2.height);   // …blur twice
  x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
  x.globalCompositeOperation = 'lighter';
  x.globalAlpha = (W < 600 ? .12 : .17); x.drawImage(rddSafeCanvasSource(BL), 0, 0, cw, ch);
  x.globalAlpha = .38; x.drawImage(rddSafeCanvasSource(B2), 0, 0, cw, ch);
  if (!GP) GP = x.createPattern(mkGrain(), 'repeat');               // fine film grain
  x.globalCompositeOperation = 'overlay'; x.globalAlpha = (W < 600 ? .018 : .03);
  x.translate(-(Math.random()*96 | 0), -(Math.random()*96 | 0));
  x.fillStyle = GP; x.fillRect(0, 0, cw + 96, ch + 96);
  x.restore(); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
}
const __RDD_PERF={frames:0,draw0:{avg:0,max:0},xTick:{avg:0,max:0},postFX:{avg:0,max:0},lushFX:{avg:0,max:0},frame:{avg:0,max:0},reset(){this.frames=0;for(const k of ['draw0','xTick','postFX','lushFX','frame']){this[k].avg=0;this[k].max=0;}}};
function __rddMeasureStage(name,fn,...args){const a=performance.now();const out=fn(...args);const ms=performance.now()-a;const m=__RDD_PERF[name];m.avg=m.avg*.95+ms*.05;if(ms>m.max)m.max=ms;return out;}
function draw(t, dt) { const f0=performance.now();x.globalAlpha=1;x.globalCompositeOperation='source-over';__rddMeasureStage('draw0',draw0,t,dt);__rddMeasureStage('xTick',xTick,dt);__rddMeasureStage('postFX',postFX,t,dt);__rddMeasureStage('lushFX',lushFX,t,dt);x.globalAlpha=1;x.globalCompositeOperation='source-over';const ms=performance.now()-f0;__RDD_PERF.frame.avg=__RDD_PERF.frame.avg*.95+ms*.05;if(ms>__RDD_PERF.frame.max)__RDD_PERF.frame.max=ms;__RDD_PERF.frames++;}
window.__RDD_PERF=__RDD_PERF;

$('#stage').addEventListener('tapevt', e => {
  if (inside || sl > 0) return;
  const r0 = cv.getBoundingClientRect();
  const qx = e.clientX - r0.left, qy = e.clientY - r0.top;
  S.taps++;
  if (GF && Math.hypot(qx - GF.x, qy - GF.cy) < 64) {
    S.gbuff = Date.now() + 30000; S.gold++; GF = null;
    toast('🌟 Đom đóm vàng! Sản lượng x3 trong 30 giây');
    arp([7, 9, 12, 14, 16], .16);
    burst(40, qx, qy);
    addShake(5);
    ui(); return;
  }
  for (const w of WLS) {
    if (w.gone || w.y < 0 || Math.hypot(qx - w.hx, qy - w.y) > 58) continue;
    w.gone = 1; S.hits++;
    const fresh = !S.codex.includes(w.s.id);
    if (fresh) {
      S.codex.push(w.s.id);
      toast(`${w.s.i} Ghi vào Sổ tay: ${w.s.n} (+3% sản lượng)`);
    }
    const v = Math.max(40, cps()*25); add(v);
    pushParticles({ k:'t', x:qx, y:qy - 10, text:`${w.s.i} +${fm(v)}`, col:'#9bffd6', life:1.2 });
    for (let i = 0; i < 14; i++) {
      pushParticles({ k:'s', c:'g', x:qx, y:qy,
        vx:(Math.random()-.5)*220, vy:-Math.random()*160, life:1 });
    }
    arp(fresh ? [4, 7, 9, 12] : [7, 9], .14);
    ui(); break;
  }
});

let nbLast = '';
$('#grab').setAttribute('aria-expanded','true');
$('#grab').onclick = () => {
  const app = $('#app');
  const collapsed = app.classList.toggle('peek');
  $('#grab').setAttribute('aria-expanded', String(!collapsed));
  $('#grab').setAttribute('aria-label', collapsed ? 'Mở bảng nâng cấp' : 'Thu gọn bảng nâng cấp');
};
if (window.ResizeObserver) { let rq = 0; new ResizeObserver(() => { if (rq) return; rq = requestAnimationFrame(() => { rq = 0; const r = $('#stage').getBoundingClientRect(); if (Math.abs(r.width - W) > 1 || Math.abs(r.height - H) > 1) size(); }); }).observe($('#stage')); }
setTimeout(() => { const hn = $('#hint'); if (hn) hn.style.opacity = 0; }, 14000);
function renderNb() {
  let h = `<div class="nb-h">🎯 Nhiệm vụ · ${S.qn} đã xong</div>`;
  S.q.forEach((q, i) => {
    const d = QD.find(a => a.k === q.k);
    const cur = Math.max(0, Math.min(q.g, Math.floor(d.get() - q.b)));
    const ok = cur >= q.g;
    h += `<div class="ac ${ok ? 'on' : ''}" style="display:block">
      <div style="display:flex;justify-content:space-between;gap:8px">
        <b style="color:var(--gold)">${d.t(q.g)}</b><span>✦ ${fm(q.r)}</span>
      </div>
      <div class="ach-prog-bg">
        <div class="ach-prog-fill" style="width:${cur/q.g*100}%"></div>
      </div>
      ${ok
        ? `<button class="cfg-btn" style="margin-top:7px;width:100%" data-q="${i}">Nhận thưởng</button>`
        : `<small>${fm(cur)} / ${fm(q.g)}</small>`}
    </div>`;
  });
  h += `<div class="nb-h">📖 Sổ tay · ${S.codex.length}/${WL.length} (+${S.codex.length*3}%)</div>`;
  h += `<div class="sp-grid">`;
  WL.forEach(w => {
    const on = S.codex.includes(w.id);
    h += `<div class="ac ${on ? 'on' : ''}">
      <span class="ac-ic">${on ? w.i : '❔'}</span>
      <div class="ac-info">
        <b>${on ? w.n : 'Chưa gặp'}</b>
        <small>${ZN[w.z]}${w.r < .3 ? ' · hiếm' : ''}</small>
      </div>
    </div>`;
  });
  h += `</div><div class="nb-h">🌕 Di sản · ${S.ess} Tinh Hoa</div>`;
  PERKS.forEach(p => {
    const on = S.ess >= p[0];
    h += `<div class="ac ${on ? 'on' : ''}">
      <span class="ac-ic">${on ? '🌕' : '🔒'}</span>
      <div class="ac-info"><b>${p[1]}</b>
      <small>${p[2]} · cần ${p[0]} Tinh Hoa</small></div>
    </div>`;
  });
  if (h !== nbLast) { nbLast = h; $('#nb').innerHTML = h; }
}
$('#nb').onclick = e => {
  const b = e.target.closest('[data-q]'); if (!b) return;
  const i = +b.dataset.q, q = S.q[i]; if (!q) return;
  const d = QD.find(a => a.k === q.k);
  if (d.get() - q.b < q.g) return;
  add(q.r); S.qn++; S.q.splice(i, 1); fillQ(); nbLast = '';
  burst(20); arp([0, 4, 7, 9, 12], .15);
  toast('🎯 Hoàn thành nhiệm vụ! +' + fm(q.r) + ' ánh sáng');
  ui();
};

// Sleep counters and fireplace purchase validation are handled in the core handlers.

/* ============ MAIN LOOP ============ */
const away = Math.min((Date.now() - S.m)/1000, 28800);
if (away > 30 && cps() > 0) {
  const g = cps()*away*Math.min(1.6, .5 + .15*S.home[1] + .2*S.pet[4] + .2*S.home[6]);
  add(g);
  setTimeout(() => toast('🌙 Vắng mặt: khu rừng tích lũy ' + fm(g) + ' ánh sáng'), 600);
}
if (!S.hint) $('#hint').style.opacity = 0;
syncF(); applyTab(); updateBridges();

let icam = 0, icamFresh = true, wasInside = false, lastWd = 0;
function rddInteriorFit() {
  const RW = window.RW_REAL || W;
  if (inside) {
    const Wd = Math.max(RW, Math.round(H*1.5));
    // Chỉ đổi toạ độ khi vừa bước vào nhà, hoặc khi kích thước phòng thật sự đổi (xoay/đổi cỡ màn hình).
    if (!wasInside) { if (Wd !== RW && typeof pl.ix === 'number' && pl.ix > 0) pl.ix *= Wd/RW; icamFresh = true; }
    else if (lastWd && lastWd !== Wd && typeof pl.ix === 'number') { pl.ix *= Wd/lastWd; if (pl.tx != null) pl.tx *= Wd/lastWd; }
    W = Wd; lastWd = Wd; wasInside = true;
    const tgt = Math.max(0, Math.min(Wd - RW, (pl.pose === 'sleep' ? W*.25 : pl.ix) - RW*.5));
    icam = icamFresh ? tgt : icam + (tgt - icam)*.14; icamFresh = false;
  } else { if (W !== RW) W = RW; icam = 0; icamFresh = true; wasInside = false; lastWd = 0; }
}
// Dải trời phía trên khi màn hình rất dài + dịch cả khung vẽ (kể cả lớp thú, đom đóm, hạt) xuống đáy canvas.
function rddDrawFrame(t, dt) {
  if (OFF > 0 && inside) {   // trong nhà: dải phía trên là tường gỗ, không phải bầu trời
    const wg = x.createLinearGradient(0, 0, 0, OFF + 24); wg.addColorStop(0, '#120a06'); wg.addColorStop(1, '#2a1a10'); x.fillStyle = wg; x.fillRect(0, 0, W, OFF + 24);
    x.globalAlpha = .5; x.fillStyle = x.createPattern(TEX_V, 'repeat'); x.fillRect(0, 0, W, OFF + 24); x.globalAlpha = 1;
    x.fillStyle = '#3a2414'; for (const bx of [.18, .5, .82]) x.fillRect(W*bx - 6, 0, 12, OFF + 24);
  } else if (OFF > 0) {
    const g = x.createLinearGradient(0, 0, 0, OFF + 20); g.addColorStop(0, '#02040d'); g.addColorStop(1, '#070b20'); x.fillStyle = g; x.fillRect(0, 0, W, OFF + 20);
    x.fillStyle = '#fff'; for (let i = 0; i < 90; i++) { x.globalAlpha = .2 + .6*Math.abs(Math.sin(t/900 + i)); x.fillRect(rsd(i, 1)*W, rsd(i, 2)*OFF, i%7 ? 1.4 : 2.2, i%7 ? 1.4 : 2.2); } x.globalAlpha = 1;
    x.save(); x.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 3; k++) {            // cực quang nhẹ lấp đầy dải trời phía trên
      const base = OFF*(.38 + .13*k), col = ['80,220,200', '130,100,255', '90,180,255'][k], ag = x.createLinearGradient(0, base - OFF*.2, 0, base + OFF*.22);
      ag.addColorStop(0, `rgba(${col},0)`); ag.addColorStop(.5, `rgba(${col},.11)`); ag.addColorStop(1, `rgba(${col},0)`);
      x.fillStyle = ag; x.beginPath(); x.moveTo(0, base + OFF*.22);
      for (let px = 0; px <= W + 24; px += 24) x.lineTo(px, base + Math.sin(px/110 + t/2800 + k*2.1)*OFF*.07);
      x.lineTo(W, base + OFF*.22); x.closePath(); x.fill();
    }
    x.restore();
  }
  x.save(); x.translate(inside ? -icam : 0, OFF);
  try { draw(t, dt); } finally { x.restore(); }
  if (OFF > 0 && !inside) { const g2 = x.createLinearGradient(0, OFF - 80, 0, OFF + 120); g2.addColorStop(0, 'rgba(7,11,32,0)'); g2.addColorStop(.4, 'rgba(7,11,32,.7)'); g2.addColorStop(1, 'rgba(7,11,32,0)'); x.fillStyle = g2; x.fillRect(0, OFF - 80, W, 200); }
}
let last = Date.now(), acc = 0;
cv.getBoundingClientRect = function () { const r = Element.prototype.getBoundingClientRect.call(this); return new DOMRect(r.left - (inside ? icam : 0), r.top + OFF, r.width, Math.max(1, r.height - OFF)); };
const draw1 = draw;
draw = function (t, dt) { draw1(t, dt); };

// Phase 3 runtime contract: one frame loop, stable dt, explicit pet runtime counters.
// This instrumentation deliberately does not write to S or localStorage.
window.__RDD_RUNTIME_AUDIT = window.__RDD_RUNTIME_AUDIT || {
  phase: 3, frameCount: 0, lastFrameAt: 0, maxDt: 0, drawErrors: 0,
  petCount: 0, saveKey: 'rdd5', notes: []
};

const _pat = new WeakMap(), _cp0 = x.createPattern.bind(x);
x.createPattern = (img, r) => { if (!img || typeof img !== 'object') return _cp0(img, r); let m = _pat.get(img); if (!m) _pat.set(img, m = {}); return m[r] || (m[r] = _cp0(img, r)); };
let _cls = null;
function cloudSprite() {
  if (_cls) return _cls; const c = _cls = document.createElement('canvas'); c.width = 320; c.height = 100; const g = c.getContext('2d');
  for (let k = 0; k < 11; k++) { const px = 40 + k*24 + Math.sin(k*5.1)*8, py = 52 + Math.sin(k*2.3)*14, r = 26 + (k%3)*9, q = g.createRadialGradient(px, py, 1, px, py, r);
    q.addColorStop(0, 'rgba(34,48,98,.5)'); q.addColorStop(.6, 'rgba(26,38,80,.24)'); q.addColorStop(1, 'rgba(26,38,80,0)'); g.fillStyle = q; g.fillRect(px - r, py - r, r*2, r*2); }
  return c;
}
/* ===== Thư viện tiến hóa ngoại hình (đặt trong script chính để luôn có sẵn trước khung hình đầu) ===== */
function cabW() { const base = Math.min(W*.34, 340), port = Math.min(W*.5, H*.2, 420), hs = 1 + .06*Math.max(0, (S.hl | 0) - 1); return Math.min(Math.max(base, port)*hs, 480); }
let EVO_N = 0, EVO_F = 0;   // số lớp hào quang đã vẽ trong khung hình này (để giảm chói khi thú đứng chồng lên nhau)
function evoRGBA(h, a) { h = String(h || '#fff').replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16) || 0xffffff; return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; }
function evoBack(c, col, tr, size, t, seed, fly) {
  if (tr < 2) return;
  const dim = 1/(1 + Math.max(0, EVO_N++ - 1)*.45), cy = fly ? 0 : -size*.48, pulse = .72 + .28*Math.sin(t/330 + seed), R = size*(.46 + tr*.15);
  c.save(); c.globalCompositeOperation = 'screen';
  let g = c.createRadialGradient(0, cy, size*.04, 0, cy, R); g.addColorStop(0, evoRGBA(col, (.16*pulse + .025*tr)*dim)); g.addColorStop(.6, evoRGBA(col, .05*tr*dim)); g.addColorStop(1, evoRGBA(col, 0));
  c.fillStyle = g; c.beginPath(); c.arc(0, cy, R, 0, 7); c.fill(); c.globalCompositeOperation = 'lighter';
  if (tr >= 4) for (const sd of [-1, 1]) { c.save(); c.scale(sd, 1); c.rotate(-.35 + Math.sin(t/520 + seed)*.12);
    for (let k = 0; k < 3; k++) { const L = size*(.62 - k*.1); c.save(); c.rotate(-.15 - k*.28); const wg = c.createLinearGradient(0, 0, L, 0); wg.addColorStop(0, evoRGBA(col, 0)); wg.addColorStop(.35, evoRGBA(col, .28*dim)); wg.addColorStop(1, evoRGBA(col, 0));
      c.fillStyle = wg; c.beginPath(); c.moveTo(size*.05, cy); c.quadraticCurveTo(L*.5, cy - size*.12, L, cy - size*.02); c.quadraticCurveTo(L*.5, cy + size*.05, size*.05, cy + size*.02); c.fill(); c.restore(); } c.restore(); }
  if (!fly) { const rr = size*(.34 + tr*.06); c.strokeStyle = evoRGBA(col, (.32*pulse + .1)*Math.max(.45, dim)); c.lineWidth = 1.2; c.beginPath(); c.ellipse(0, 2, rr, rr*.26, 0, 0, 7); c.stroke();
    if (tr >= 3) { c.setLineDash([3, 5]); c.lineDashOffset = -t/60; c.beginPath(); c.ellipse(0, 2, rr*1.25, rr*.33, 0, 0, 7); c.stroke(); c.setLineDash([]);
      for (let k = 0; k < 8; k++) { const a = t/900 + k*.785; c.fillStyle = evoRGBA(col, .5); c.fillRect(Math.cos(a)*rr*1.25 - 1, 2 + Math.sin(a)*rr*.33 - 1, 2, 2); } } }
  const n = [0, 0, 2, 4, 6][tr];
  for (let k = 0; k < n; k++) { const a = t/(700 + k*60) + k*6.283/n + seed, rx = size*(.3 + .05*(k%2)), ry = size*.16*(1 + .5*(k%2));
    if (tr >= 3) for (let q = 1; q < 4; q++) { const a2 = a - q*.18; c.fillStyle = evoRGBA(col, .22/q); c.beginPath(); c.arc(Math.cos(a2)*rx, cy - size*.05 + Math.sin(a2)*ry, 1.6 - q*.3, 0, 7); c.fill(); }
    c.fillStyle = evoRGBA(col, .85*Math.max(.55, dim)); c.beginPath(); c.arc(Math.cos(a)*rx, cy - size*.05 + Math.sin(a)*ry, tr >= 3 ? 1.9 : 1.5, 0, 7); c.fill(); }
  c.restore();
}
function evoFront(c, col, tr, size, t, seed, fly) {
  if (tr < 3) return;
  const dimF = 1/(1 + Math.max(0, EVO_F++ - 2)*.18), top = -size*(fly ? .6 : 1.12), pulse = .7 + .3*Math.sin(t/260 + seed);
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(0, top + Math.sin(t/600 + seed)*2); c.rotate(t/1800); c.fillStyle = evoRGBA(col, (.55 + .3*pulse)*dimF); c.beginPath();
  for (let k = 0; k < 8; k++) { const r = k % 2 ? size*.035 : size*.1, a = k*Math.PI/4; c.lineTo(Math.cos(a)*r, Math.sin(a)*r); } c.closePath(); c.fill(); c.rotate(-t/1800);
  if (tr >= 4) { c.strokeStyle = 'rgba(255,226,150,' + (.5 + .3*pulse)*dimF + ')'; c.lineWidth = 1.4; c.beginPath(); c.ellipse(0, size*.12, size*.2, size*.055, 0, 0, 7); c.stroke(); c.strokeStyle = evoRGBA(col, .35*dimF); c.beginPath(); c.ellipse(0, size*.12, size*.26, size*.075, 0, 0, 7); c.stroke(); }
  c.restore();
}

const PF = { t: 0, min: 16, wt: 6, iv: 16, n: 0, good: 0 };
function perfSet(l) {
  perfLvl = Math.max(0, Math.min(2, l|0));
  window.DPRCAP = [1.5, 1.25, 1.0][perfLvl];
  // Keep expensive bloom/grain layers off at medium and low quality.
  qual = perfLvl === 0 ? 1 : 0;
  PF.min = perfLvl >= 2 ? 33 : 16;
  PF.good = 0;
  try { size(); syncF(); } catch (e) {}
}

/* ===== CÂY VẼ LẠI: tán lá mềm nhiều cụm, thân có vỏ, ánh trăng viền ===== */
const FOG = [14, 28, 58];
function fgc(r, g, b, d, a) { const f = Math.max(0, Math.min(1, .25 + d*.75)); return `rgba(${(FOG[0] + (r - FOG[0])*f)|0},${(FOG[1] + (g - FOG[1])*f)|0},${(FOG[2] + (b - FOG[2])*f)|0},${a == null ? 1 : a})`; }
function clump(g, cx, cy, rx, ry, rot, lit, d, hue) {
  const base = hue === 'pine' ? [[20, 58, 52], [58, 112, 96]] : hue === 'birch' ? [[44, 104, 86], [128, 196, 150]] : [[26, 70, 58], [96, 156, 108]];
  const k = Math.max(0, Math.min(1, lit)), c0 = base[0].map((v, i) => v + (base[1][i] - v)*k), c1 = base[0].map((v, i) => v*(.55 + .3*k));
  g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(1, ry/rx);
  const q = g.createRadialGradient(-rx*.25, -rx*.3, rx*.08, 0, 0, rx);
  q.addColorStop(0, fgc(c0[0], c0[1], c0[2], d, 1)); q.addColorStop(.65, fgc(c1[0]*1.3, c1[1]*1.3, c1[2]*1.3, d, .95)); q.addColorStop(1, fgc(c1[0], c1[1], c1[2], d, 0));
  g.fillStyle = q; g.beginPath(); g.arc(0, 0, rx, 0, 7); g.fill(); g.restore();
}
function barkTrunk(g, x0, x1, top, h, d, w0, w1) {
  const gr = g.createLinearGradient(-w0, 0, w0, 0); gr.addColorStop(0, fgc(26, 18, 14, d)); gr.addColorStop(.55, fgc(86, 62, 44, d)); gr.addColorStop(1, fgc(22, 16, 14, d));
  g.fillStyle = gr; g.beginPath(); g.moveTo(-w0*1.5, 0); g.quadraticCurveTo(-w0, -h*.1, -w1, top); g.lineTo(w1, top); g.quadraticCurveTo(w0, -h*.1, w0*1.5, 0); g.closePath(); g.fill();
  g.strokeStyle = fgc(12, 8, 6, d, .55); g.lineWidth = Math.max(.8, w0*.12);
  for (let k = 0; k < 9; k++) { const t = (k + .5)/9, xx = -w0 + t*2*w0*.9; g.beginPath(); g.moveTo(xx, -2); g.quadraticCurveTo(xx*.8 + 1, top*.5, xx*.5, top); g.stroke(); }
}
function moonRim(g, w, hh) {
  g.save(); g.globalCompositeOperation = 'source-atop';
  const q = g.createLinearGradient(w*.5, -hh, -w*.1, -hh*.2); q.addColorStop(0, 'rgba(170,205,255,.32)'); q.addColorStop(.5, 'rgba(170,205,255,.08)'); q.addColorStop(1, 'rgba(0,0,0,.28)');
  g.fillStyle = q; g.fillRect(-w, -hh*1.2, w*2, hh*1.3); g.restore();
}
function paintPine(g, h, d, s) {
  barkTrunk(g, 0, 0, -h*.9, h, d, h*.032, h*.01);
  g.strokeStyle = fgc(40, 30, 24, d); g.lineCap = 'round';
  for (let i = 0; i < 6; i++) { const by = -h*(.1 + i*.03), sd = i%2 ? 1 : -1; g.lineWidth = h*.006; g.beginPath(); g.moveTo(0, by); g.quadraticCurveTo(sd*h*.04, by - h*.02, sd*h*.08, by + h*.01); g.stroke(); }
  const N = 38;
  for (let i = 0; i < N; i++) {
    const u = i/(N - 1), y = -h*(.16 + u*.78), hw = h*(.21*Math.pow(1 - u, .85) + .018), cnt = 2 + Math.round((1 - u)*3);
    for (let j = 0; j < cnt; j++) {
      const f = cnt === 1 ? 0 : (j/(cnt - 1))*2 - 1, jit = (rsd(s, i*7 + j) - .5)*hw*.5, cx = f*hw*.9 + jit, rx = h*(.036 + (1 - u)*.05)*(.8 + rsd(s, i*5 + j + 40)*.5);
      clump(g, cx, y + Math.abs(f)*h*.028 + rsd(s, i + j*3)*h*.01, rx, rx*.52, f*.42, .15 + .55*(f*.5 + .5) - u*.1 + rsd(s, i*3 + j)*.15, d, 'pine');
    }
  }
  clump(g, 0, -h*.95, h*.03, h*.05, 0, .6, d, 'pine');
  moonRim(g, h*.3, h);
}
function paintOak(g, h, d, s) {
  barkTrunk(g, 0, 0, -h*.46, h, d, h*.055, h*.036);
  g.strokeStyle = fgc(50, 36, 28, d); g.lineCap = 'round';
  for (const sd of [-1, 1]) for (let k = 0; k < 2; k++) { g.lineWidth = h*(.028 - k*.01); g.beginPath(); g.moveTo(0, -h*(.36 + k*.04)); g.quadraticCurveTo(sd*h*(.08 + k*.05), -h*(.46 + k*.07), sd*h*(.17 + k*.07), -h*(.58 + k*.09)); g.stroke(); }
  const cx0 = 0, cy0 = -h*.64, RX = h*.31, RY = h*.25, arr = [];
  for (let k = 0; k < 74; k++) { const a = rsd(s, k*2)*6.283, r = Math.sqrt(rsd(s, k*2 + 1)), px = cx0 + Math.cos(a)*r*RX, py = cy0 + Math.sin(a)*r*RY*(Math.sin(a) > 0 ? .85 : 1); arr.push({ px, py, r: h*(.05 + rsd(s, k + 50)*.05), lit: .5*(px - cx0)/RX*.7 - .5*(py - cy0)/RY*.5 + .5 + (rsd(s, k + 90) - .5)*.25 }); }
  arr.sort((a, b) => b.py - a.py).forEach(c => clump(g, c.px, c.py, c.r, c.r*.82, rsd(s, c.px)*3, c.lit, d, 'oak'));
  g.fillStyle = 'rgba(200,245,210,.22)';
  for (let k = 0; k < 50; k++) { const a = rsd(s, k + 300)*6.283, r = Math.sqrt(rsd(s, k + 400)); g.beginPath(); g.arc(cx0 + Math.cos(a)*r*RX*.9, cy0 + Math.sin(a)*r*RY*.8 - h*.02, 1.2, 0, 7); g.fill(); }
  moonRim(g, h*.42, h);
}
function paintBirch(g, h, d, s) {
  const w0 = h*.021, gr = g.createLinearGradient(-w0, 0, w0, 0); gr.addColorStop(0, fgc(150, 160, 175, d)); gr.addColorStop(.5, fgc(238, 242, 246, d)); gr.addColorStop(1, fgc(120, 130, 150, d));
  g.fillStyle = gr; g.beginPath(); g.moveTo(-w0*1.4, 0); g.quadraticCurveTo(-w0*.6 + (rsd(s, 1) - .5)*w0*3, -h*.4, -w0*.55, -h*.8); g.lineTo(w0*.55, -h*.8); g.quadraticCurveTo(w0*.6 + (rsd(s, 1) - .5)*w0*3, -h*.4, w0*1.4, 0); g.closePath(); g.fill();
  g.fillStyle = fgc(24, 26, 32, d, .9);
  for (let k = 0; k < 16; k++) { const yy = -h*(.04 + k*.047), ww = w0*(.7 + rsd(s, k)*.9); g.beginPath(); g.moveTo(-w0*.9, yy); g.lineTo(-w0*.9 + ww, yy - 1.5); g.lineTo(-w0*.9 + ww*.8, yy + 2.5); g.closePath(); g.fill(); }
  g.lineCap = 'round';
  for (let k = 0; k < 6; k++) { const sd = k%2 ? 1 : -1, by = -h*(.5 + k*.05), ex = sd*h*(.1 + rsd(s, k + 5)*.07), ey = by - h*.06;
    g.strokeStyle = fgc(176, 182, 192, d); g.lineWidth = Math.max(1, h*.006); g.beginPath(); g.moveTo(0, by); g.quadraticCurveTo(ex*.6, ey - h*.02, ex, ey + h*.02); g.stroke();
    for (let j = 0; j < 4; j++) { const q = (j + 1)/5, px = ex*q, py = by + (ey + h*.02 - by)*q*q - h*.01; clump(g, px + (rsd(s, j + k*9) - .5)*h*.03, py + h*.03, h*.03, h*.045, sd*.2, .55 + rsd(s, j + k)*.4, d, 'birch'); } }
  for (let k = 0; k < 16; k++) clump(g, (rsd(s, k + 70) - .5)*h*.18, -h*(.7 + rsd(s, k + 80)*.14), h*.04, h*.05, rsd(s, k)*2, .5 + rsd(s, k + 5)*.5, d, 'birch');
  moonRim(g, h*.2, h);
}
function frame() {
  rddInteriorFit();
  if (document.hidden) {
    last = Date.now();
    PF.t = performance.now();
    requestAnimationFrame(frame);
    return;
  }
  const pn0 = performance.now();
  if (pn0 - PF.t < PF.min - 1.5) { requestAnimationFrame(frame); return; }
  PF.iv = PF.iv*.92 + Math.min(100, pn0 - PF.t)*.08; PF.t = pn0;
  if (++PF.n % 90 === 0 && !document.hidden) {
    if ((PF.wt > 11 || PF.iv > (PF.min > 20 ? 40 : 24)) && perfLvl < 2) perfSet(perfLvl + 1);
    else if (perfLvl > RDD_MIN_PERF && PF.wt < 5 && PF.iv < PF.min + 3) { if (++PF.good >= 6) perfSet(perfLvl - 1); } else PF.good = 0;
  }
  const now = Date.now();
  const gap = Math.min((now - last)/1000, 28800);
  const dt = Math.min(gap, .05);
  last = now;
  const audit = window.__RDD_RUNTIME_AUDIT;
  if (audit) { audit.frameCount++; audit.lastFrameAt = now; if (dt > audit.maxDt) audit.maxDt = dt; }
  add(cps()*gap);
  // V10.2 hooks into the existing single game loop; it does not add a second timer.
  if (window.__RDD_JOURNEY_V102) window.__RDD_JOURNEY_V102.tick();
  // Performance: compact ST in-place instead of allocating a new array every frame.
  // Keep array identity stable for renderers and other systems that hold a reference.
  let stWrite = 0;
  for (let stRead = 0; stRead < ST.length; stRead++) {
    const star = ST[stRead];
    // Stars expire by life as well as by explicit collection (dead flag).
    if (!star.dead && star.life > 0 && star.x < W + 120 && star.y < H + 120) ST[stWrite++] = star;
  }
  ST.length = stWrite;
  const pcap = perfLvl >= 2 ? 24 : perfLvl >= 1 ? 48 : 120;
  // Keep the newest particles without repeatedly shifting the retained tail.
  if (P.length > pcap) {
    const first = P.length - pcap;
    for (let pi = 0; pi < first; pi++) recycleParticle(P[pi]);
    for (let pi = 0; pi < pcap; pi++) P[pi] = P[first + pi];
    P.length = pcap;
  }

  // Phase 5.18: remove the legacy timer-based cat reward. The autonomous
  // companion renderer is the sole authority for visible pounce + catch rewards;
  // otherwise the player sees a catch toast while the cat is still on the ground.
  petT[1] -= dt;
  meTick(dt);

  if (S.pet[1] > 0 && petT[1] <= 0) {
    const s = ST.find(q => !q.dead && q.x > 0 && q.x < W);
    if (s) {
      petT[1] = 4/(1 + .3*S.pet[1]);
      const v = Math.max(30, cps()*s.w);
      s.dead = 1; S.caught++;
      add(v);
      pushParticles({ k:'t', x:s.x, y:s.y, text:'🦊 +' + fm(v), col:'#ffae70', life:1 });
    }
  }

  if (now > nextStar) {
    // Sửa quỹ đạo sao băng bay chéo góc, không đâm thẳng
    ST.push({ x: Math.random()*W*.3, y: -20, vx: W*.15, vy: H*.08, life:6, w:60 });
    nextStar = now + 38000 + Math.random()*38000;
    if (A && S.snd) chime(14, .07, 1.8);
  }
  if (now > nextEv) {
    ev = now + 14000;
    nextEv = now + 105000 + Math.random()*55000;
    toast('🌠 Mưa sao băng! Chạm bầu trời để thu thập');
  }
  if (now < ev && now > nextDrop) {
    nextDrop = now + 680;
    ST.push({ x: Math.random()*W*.4, y: -20, vx: W*.2, vy: H*.1, life:5, w:20 });
  }

  const w0 = performance.now();
  try {
    rddDrawFrame(now, dt);
  } catch (err) {
    if (window.__RDD_RUNTIME_AUDIT) window.__RDD_RUNTIME_AUDIT.drawErrors++;
    console.error("Render error caught:", err);
  }

  PF.wt = PF.wt*.92 + (performance.now() - w0)*.08;
  acc += dt;
  if (acc > (perfLvl >= 1 ? .4 : .22)) { acc = 0; ui(); }
  requestAnimationFrame(frame);
}

frame();

// Read-only diagnostics: run __RDD_DIAG() in DevTools to inspect the active runtime.
window.__RDD_DIAG = function () {
  const audit = window.__RDD_RUNTIME_AUDIT || {};
  const owned = [];
  try {
    (Array.isArray(S.pet) ? S.pet : []).forEach((lv, i) => {
      if (lv > 0) owned.push({slot: i, level: lv});
    });
  } catch (_) {}
  return {
    phase: audit.phase || 3,
    frameCount: audit.frameCount || 0,
    maxDtSeconds: audit.maxDt || 0,
    drawErrors: audit.drawErrors || 0,
    inside: !!inside,
    ownedPetSlots: owned,
    support: window.__RDD_PET_SUPPORT || null,
    petRenderer: window.__RDD_PET_RENDER_AUDIT || null,
    saveKey: 'rdd5',
    saveExists: !!localStorage.getItem('rdd5')
  };
};




/* === EXPANSION SYSTEMS (isolated, additive, save-compatible) === */
(() => {
  'use strict';
  const $e = (s,root=document) => root.querySelector(s);
  const fmt = n => typeof fm === 'function' ? fm(n) : Math.floor(n).toLocaleString('vi-VN');
  const KEY = 'rdd5';
  const defaults = {essence:0, skill:{touch:0,idle:0,fortune:0}, dailyDay:'', dailyGoal:0, dailyStartTotal:0, dailyClaimed:false, garden:0, trip:null, expeditions:0, bestTrial:0, trialTotal:0, discovered:[], log:[]};
  let E = {...defaults};
  try { const raw=JSON.parse(localStorage.getItem(KEY)||'{}'); const legacy=JSON.parse(localStorage.getItem('rdd_expansion_v1')||'{}'); E={...E,...(raw.expansion||{}),...legacy}; E.skill={...defaults.skill,...(E.skill||{})}; } catch(_){}
  let current='journey', trial=null, trialTimer=null, trialHits=0, trialEnd=0, gardenTimer=0;
  const persist=()=>{try{S.expansion=E; save();}catch(_){}};
  const dayKey=()=>{const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`};
  const award=(amount,why='Phần thưởng')=>{amount=Math.max(0,Math.floor(amount)); if(!Number.isFinite(amount))return; S.l+=amount;S.tot+=amount;S.run+=amount; if(typeof toast==='function')toast(`✨ ${why}: +${fmt(amount)} ánh sáng`); if(typeof burst==='function')burst(18); if(typeof arp==='function')arp([0,4,7,12],.1); if(typeof ui==='function')ui(); persist();};
  const addLog=t=>{E.log.unshift(`${new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})} · ${t}`);E.log=E.log.slice(0,8);persist();};
  const skillCost=(key)=>Math.floor([250,2500,25000,250000,2500000][Math.min(4,E.skill[key]||0)]*(1+Math.max(0,(E.skill[key]||0)-4)*5));
  const skills={
    touch:{name:'Ngón tay tinh linh',icon:'✧',desc:'Tăng sức mạnh chạm thêm 12% mỗi cấp.',effect:l=>`+${l*12}% chạm`},
    idle:{name:'Mạch rễ cổ thụ',icon:'🌿',desc:'Tăng sản lượng nền thêm 8% mỗi cấp.',effect:l=>`+${l*8}% sản lượng`},
    fortune:{name:'Duyên lành',icon:'🍀',desc:'Tăng phần thưởng nhiệm vụ và thám hiểm 10% mỗi cấp.',effect:l=>`+${l*10}% thưởng`}
  };
  const skillBonus=k=>1+(E.skill[k]||0)*({touch:.12,idle:.08,fortune:.1}[k]);
  function ensureUI(){
    if($e('#exp-overlay'))return;
    const b=document.createElement('button');b.id='exp-launch';b.title='Hành trình & hệ thống';b.textContent='✦';b.setAttribute('aria-label','Mở hệ thống hành trình');$e('#stage').appendChild(b);
    const ov=document.createElement('div');ov.id='exp-overlay';ov.innerHTML=`<section id="exp-window" role="dialog" aria-modal="true" aria-label="Hành trình Rừng Đom Đóm"><header class="exp-head"><div style="font-size:30px">🌌</div><div><h2>Hành Trình Rừng Đom Đóm</h2><p>Tiến trình · thử thách · di sản · chăm sóc thế giới</p></div><button id="exp-close" aria-label="Đóng">×</button></header><nav class="exp-tabs"><button class="exp-tab active" data-exp="journey">🧭 Hành trình</button><button class="exp-tab" data-exp="trial">⚡ Thử thách</button><button class="exp-tab" data-exp="skills">🌳 Linh mạch</button><button class="exp-tab" data-exp="garden">🪴 Khu vườn</button><button class="exp-tab" data-exp="records">📜 Nhật ký</button></nav><div id="exp-content" class="exp-content"></div></section>`;
    document.body.appendChild(ov);
    b.addEventListener('click',()=>{ov.classList.add('open');render()});
    $e('#exp-close',ov).addEventListener('click',close);
    ov.addEventListener('click',e=>{if(e.target===ov)close()});
    $e('.exp-tabs',ov).addEventListener('click',e=>{const t=e.target.closest('[data-exp]');if(!t)return;current=t.dataset.exp;render()});
    $e('#exp-content',ov).addEventListener('click',handle);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  function close(){const ov=$e('#exp-overlay');if(ov)ov.classList.remove('open');if(trialTimer){clearInterval(trialTimer);trialTimer=null;}trial=null;}
  function card(title,desc,body,icon='✨'){return `<article class="exp-card"><h3>${icon} ${title}</h3><p>${desc}</p>${body}</article>`}
  function render(){
    ensureUI();
    document.querySelectorAll('.exp-tab').forEach(b=>b.classList.toggle('active',b.dataset.exp===current));
    const c=$e('#exp-content');if(!c)return;
    if(current==='journey'){
      const day=dayKey();if(E.dailyDay!==day||!Number.isFinite(Number(E.dailyStartTotal))){E.dailyDay=day;E.dailyClaimed=false;E.dailyStartTotal=Math.max(0,S.tot||0);E.dailyGoal=Math.max(500,Math.floor((typeof cps==='function'?cps():1)*180));persist();}
      const goal=E.dailyGoal||500,earned=Math.max(0,(S.tot||0)-(E.dailyStartTotal||0)),progress=Math.min(100,earned/goal*100);
      c.innerHTML=card('Lời hẹn mỗi ngày','Một mục tiêu mới theo sản lượng hiện tại, chỉ tính ánh sáng kiếm được từ lúc ngày bắt đầu.',`<div class="exp-big">${fmt(Math.min(earned,goal))} / ${fmt(goal)}</div><div class="exp-meter"><span style="width:${progress}%"></span></div><p>Thu thập ${fmt(goal)} ánh sáng mới trong ngày.</p><button class="exp-btn" data-act="daily" ${progress<100||E.dailyClaimed?'disabled':''}>${E.dailyClaimed?'Đã nhận hôm nay':'Nhận thưởng ngày'}</button><div class="exp-muted">Chu kỳ làm mới theo ngày trên thiết bị.</div>`,'🌤️')+
      expCard()+
      card('Trạng thái khu rừng','Một thế giới sống động với tiến trình độc lập, không ghi đè dữ liệu save cũ.',`<div class="exp-row"><span>Ánh sáng / giây</span><b>${fmt(typeof cps==='function'?cps():0)}</b></div><div class="exp-row"><span>Tinh hoa đã thức tỉnh</span><b>${fmt(E.essence)}</b></div><div class="exp-row"><span>Kỷ lục thử thách</span><b>${E.bestTrial} điểm</b></div><div class="exp-row"><span>Linh mạch đã mở</span><b>${Object.values(E.skill).reduce((a,b)=>a+b,0)} cấp</b></div>`,'🌲')+
      card('Mốc khám phá','Mỗi lần thám hiểm ghi dấu vào nhật ký. Tinh hoa là tài nguyên phụ của lớp mở rộng.',`<p>Đã thám hiểm ${E.expeditions} lần. Vật phẩm khám phá: ${E.discovered.length}/4.</p><div class="exp-row"><span>Di sản mở rộng</span><b>${fmt(E.essence)} ✦</b></div><button class="exp-btn" data-act="discover">Khám phá di tích (miễn phí mỗi 3 chuyến)</button>`,'🏛️');
    } else if(current==='trial'){
      c.innerHTML=card('Thử thách phản xạ','Trong 12 giây, chạm nút liên tục để tích điểm. Không ảnh hưởng tài nguyên đã tích lũy cho tới khi kết thúc.',`<div class="exp-big" id="trial-score">${trial?trialHits:E.bestTrial}</div><div class="exp-meter"><span id="trial-meter" style="width:${trial?Math.max(0,(trialEnd-Date.now())/12000*100):0}%"></span></div><p id="trial-status">${trial?'Đang thử thách…':`Kỷ lục hiện tại: ${E.bestTrial} điểm`}</p><button class="exp-btn" data-act="${trial?'hit':'startTrial'}">${trial?'✦ CHẠM NHANH':'Bắt đầu thử thách'}</button>`,'⚡')+
      card('Phần thưởng','Kết quả được đổi thành ánh sáng và một ít tinh hoa.',`<div class="exp-row"><span>Điểm tốt nhất</span><b>${E.bestTrial}</b></div><div class="exp-row"><span>Tổng lượt chơi</span><b>${E.trialTotal}</b></div><p>Thưởng: điểm × sản lượng hiện tại, có giới hạn an toàn.</p>`,'🏅');
    } else if(current==='skills'){
      c.innerHTML=Object.entries(skills).map(([k,v])=>{const lvl=E.skill[k]||0,cost=skillCost(k);return card(v.name,v.desc,`<div class="exp-big">Cấp ${lvl}</div><div class="exp-row"><span>Hiệu lực</span><b>${v.effect(lvl)}</b></div><div class="exp-row"><span>Chi phí nâng cấp</span><b>${fmt(cost)}</b></div><button class="exp-btn" data-act="skill" data-key="${k}" ${S.l<cost?'disabled':''}>Nâng cấp linh mạch</button>` ,v.icon)}).join('')+card('Tinh hoa di sản','Tích lũy qua các mốc khám phá để tăng sức mạnh lớp mở rộng.',`<div class="exp-big">${fmt(E.essence)} ✦</div><p>Mỗi di tích mới trao 1 tinh hoa. Tinh hoa mở rộng độc lập với Trăng Tròn gốc.</p>`,'🌕');
    } else if(current==='garden'){
      c.innerHTML=card('Vườn dạ quang','Chăm sóc mầm cây bằng ánh sáng. Cây lớn dần theo số lần chăm sóc và tạo thưởng.',`<div class="exp-big">🌱 Cấp ${E.garden}</div><div class="exp-meter"><span style="width:${E.garden%5*20}%"></span></div><p>Chi phí chăm sóc: ${fmt(gardenCost())} ánh sáng. Mỗi lần chăm sóc tăng sản lượng vĩnh viễn 1% (tối đa 30 cấp).</p><button class="exp-btn" data-act="garden" ${E.garden>=30||S.l<gardenCost()?'disabled':''}>Chăm sóc khu vườn</button>`,'🪴')+
      card('Hiệu ứng sinh thái','Mỗi mốc 5 cấp mở thêm dấu hiệu phát sáng và thưởng tức thời.',`<div class="exp-row"><span>Cấp vườn</span><b>${E.garden}/30</b></div><div class="exp-row"><span>Thưởng sản lượng riêng</span><b>+${E.garden}%</b></div><p>${E.garden>=5?'🌸 Hoa dạ quang đã nở.': 'Còn '+(5-E.garden%5)+' lần chăm sóc đến mốc nở hoa tiếp theo.'}</p>`,'🌸');
    } else {
      c.innerHTML=card('Nhật ký gần đây','Các sự kiện quan trọng trong hành trình.',`<div class="exp-log">${E.log.length?E.log.map(t=>escapeHtml(t)).join('<br>'):'Chưa có sự kiện. Hãy bắt đầu thám hiểm hoặc mở linh mạch.'}</div>`,'📜')+card('Lưu trữ','Tiến trình mở rộng được lưu riêng, không thay thế save rdd5 của trò chơi gốc.',`<p>Save gốc và save mở rộng được tách biệt để giảm rủi ro làm hỏng dữ liệu cũ.</p><button class="exp-btn" data-act="export">Xuất bản lưu mở rộng</button> <button class="exp-btn" data-act="import">Nhập bản lưu</button><input id="exp-file" type="file" accept="application/json" hidden>`,'💾');
    }
  }
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const expeditionCost=()=>Math.floor(Math.max(1000,(typeof cps==='function'?cps():1)*30)*Math.pow(1.32,E.expeditions));
  const expeditionReward=()=>Math.floor(Math.max(1500,(typeof cps==='function'?cps():1)*105)*skillBonus('fortune')*(1+Math.min(E.expeditions,20)*.035));
  const gardenCost=()=>Math.floor(500*Math.pow(1.8,E.garden));
  function handle(e){
    const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
    if(a==='daily'){const earned=Math.max(0,(S.tot||0)-(E.dailyStartTotal||0));if(E.dailyClaimed||earned<(E.dailyGoal||500))return;E.dailyClaimed=true;award(Math.max(250,Math.floor((E.dailyGoal||500)*.5*skillBonus('fortune'))),'Lời hẹn mỗi ngày');addLog('Hoàn thành lời hẹn mỗi ngày');render();}
    if(a==='expedition'){if(E.trip)return;const r=ROUTES.find(v=>v.id===b.dataset.route)||ROUTES[0];const cost=Math.floor(expeditionCost()*r.cost);if(S.l<cost){toast('Chưa đủ ánh sáng cho chuyến thám hiểm.');return;}S.l-=cost;const reward=Math.floor(expeditionReward()*r.rew);E.trip={id:r.id,start:Date.now(),end:Date.now()+r.dur*1000,reward,cost,notified:false};addLog(`Xuất phát tới ${r.name} (${fmtT(r.dur*1000)})`);toast(`🧭 Đoàn thám hiểm đã lên đường tới ${r.name}!`);try{arp([0,2,4],.12);}catch(_){}syncChip();}
    if(a==='exp-claim'){if(!E.trip||Date.now()<E.trip.end)return;const t=E.trip;const r=ROUTES.find(v=>v.id===t.id)||ROUTES[0];E.trip=null;E.expeditions++;addLog(`Đoàn về từ ${r.name}: +${fmt(t.reward)} ánh sáng`);award(t.reward,'Đoàn thám hiểm trở về');syncChip();}
    if(a==='exp-recall'){if(!E.trip||Date.now()>=E.trip.end)return;const t=E.trip;E.trip=null;const got=Math.floor(t.reward*.35);addLog('Gọi đoàn về sớm, chỉ mang được một phần');award(got,'Gọi đoàn về sớm');syncChip();}
    if(a==='discover'){if(E.expeditions<3||E.expeditions%3!==0){toast('Cần hoàn thành thêm thám hiểm (mốc 3, 6, 9…).');return;}const pool=['Lông vũ cú bạc','Hạt giống ngân hà','Giọt sương trăng','Mảnh bản đồ cổ'];const item=pool.find(v=>!E.discovered.includes(v));if(!item){toast('Bạn đã tìm thấy mọi di tích.');return;}E.discovered.push(item);E.essence++;addLog(`Khám phá di tích: ${item}`);award(1000*E.essence,'Di tích cổ');render();}
    if(a==='skill'){const k=b.dataset.key,cost=skillCost(k);if(!skills[k]||S.l<cost)return;S.l-=cost;E.skill[k]++;addLog(`Nâng ${skills[k].name} lên cấp ${E.skill[k]}`);award(Math.floor(cost*.12),'Cộng hưởng linh mạch');render();}
    if(a==='garden'){const cost=gardenCost();if(E.garden>=30||S.l<cost)return;S.l-=cost;E.garden++;const r=Math.floor(cost*.45+100);addLog(`Chăm sóc vườn dạ quang cấp ${E.garden}`);award(r,'Vườn dạ quang');render();}
    if(a==='startTrial'){trial=true;trialHits=0;trialEnd=Date.now()+12000;addLog('Bắt đầu thử thách phản xạ');render();trialTimer=setInterval(()=>{const left=Math.max(0,trialEnd-Date.now());const meter=$e('#trial-meter'),status=$e('#trial-status');if(meter)meter.style.width=(left/12000*100)+'%';if(status)status.textContent=`Còn ${(left/1000).toFixed(1)} giây`;if(left<=0)finishTrial();},100);}
    if(a==='hit'&&trial){trialHits++;const sc=$e('#trial-score');if(sc)sc.textContent=trialHits;if(typeof chime==='function'&&trialHits%5===0)chime(5,.035,.35);}
    if(a==='export'){const blob=new Blob([JSON.stringify(E,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='rung-dom-dom-expansion-save.json';link.click();URL.revokeObjectURL(url);}
    if(a==='import'){$e('#exp-file').click();}
    render();persist();
  }
  /* === THÁM HIỂM CÓ TRẠNG THÁI: lên đường -> đang đi -> trở về -> nhận thưởng === */
  const ROUTES=[
    {id:'edge',name:'Bìa rừng',icon:'🌲',dur:45,cost:1,rew:1.15,story:['Đoàn thắp đèn và rời bìa rừng.','Họ lần theo lối mòn phủ đầy đom đóm.','Một đàn bướm đêm dẫn đường quanh gốc sồi cổ.','Họ nhặt được vài mảnh ánh sáng rơi.','Đoàn quay đầu, mang hành lý về nhà.']},
    {id:'deep',name:'Rừng sâu',icon:'🍄',dur:180,cost:3,rew:4.2,story:['Đoàn băng qua suối, bỏ lại tiếng nhà gỗ phía sau.','Nấm phát quang chỉ lối giữa rừng linh hồn.','Một con nai gạc sáng đứng nhìn họ rất lâu.','Họ tìm thấy một hốc cây chứa đầy tinh thể sáng.','Đoàn men theo dấu cũ trở về.']},
    {id:'peak',name:'Đỉnh núi trăng',icon:'⛰️',dur:600,cost:8,rew:13,story:['Đoàn leo lên sườn núi, gió lạnh thổi dọc theo sống núi.','Họ cắm trại bên một vách đá phủ sương.','Trăng lên cao, đường mòn bạc hiện ra.','Họ chạm tới đỉnh và lấy được một mảnh sao rơi.','Đoàn xuống núi, đèn sáng dần phía chân trời.']}
  ];
  const fmtT=ms=>{const s=Math.ceil(ms/1000),m=Math.floor(s/60);return m+':'+String(s%60).padStart(2,'0');};
  const tripRoute=t=>ROUTES.find(v=>v.id===(t&&t.id))||ROUTES[0];
  const tripStory=(t,p)=>{const r=tripRoute(t);return r.story[Math.min(r.story.length-1,Math.floor(p*r.story.length))];};
  function expCard(){
    const tr=E.trip, T='Thám hiểm vùng hoang dã';
    if(!tr){
      const btns=ROUTES.map(r=>{const cost=Math.floor(expeditionCost()*r.cost),rw=Math.floor(expeditionReward()*r.rew);return `<button class="exp-btn" style="margin-top:7px;width:100%" data-act="expedition" data-route="${r.id}" ${S.l<cost?'disabled':''}>${r.icon} ${r.name} · ${fmtT(r.dur*1000)} · −${fmt(cost)} → +${fmt(rw)}</button>`}).join('');
      return card(T,'Chọn một hành trình. Đoàn sẽ đi thật sự: có thời gian chờ, và bạn nhận thưởng khi họ trở về (kể cả khi bạn tắt game).',`<div class="exp-big">Chuyến #${E.expeditions+1}</div>${btns}`,'🧭');
    }
    const r=tripRoute(tr),left=tr.end-Date.now();
    if(left>0){const p=Math.max(0,Math.min(1,1-left/(tr.end-tr.start)));
      return card(T,`Đoàn đang trên đường tới ${r.name}.`,`<div class="exp-big">${r.icon} Đang thám hiểm · <span id="trip-eta">${fmtT(left)}</span></div><div class="exp-trip-track"><span id="trip-bar" style="width:${p*100}%"></span><i id="trip-walker" style="left:${p*100}%">🐾</i></div><p id="trip-story" style="margin-top:10px">${tripStory(tr,p)}</p><div class="exp-row"><span>Phần thưởng dự kiến</span><b>+${fmt(tr.reward)}</b></div><button class="exp-btn" data-act="exp-recall">Gọi đoàn về sớm (chỉ nhận 35%)</button>`,'🧭');}
    return card(T,`Đoàn đã trở về từ ${r.name}.`,`<div class="exp-big">✅ Đã về tới nhà</div><p>${r.story[r.story.length-1]}</p><div class="exp-row"><span>Hành lý mang về</span><b>+${fmt(tr.reward)}</b></div><button class="exp-btn" data-act="exp-claim">Nhận thưởng</button>`,'🧭');
  }
  function syncChip(){
    let c=document.getElementById('exp-trip-chip');const tr=E.trip;
    if(!tr){if(c)c.remove();return;}
    if(!c){c=document.createElement('button');c.id='exp-trip-chip';c.onclick=()=>{const l=document.getElementById('exp-launch');if(l)l.click();};const st=document.getElementById('stage');(st||document.body).appendChild(c);}
    const left=tr.end-Date.now();c.className=left<=0?'ready':'';c.textContent=left<=0?'🧭 Đoàn đã về · chạm để nhận':'🧭 '+tripRoute(tr).name+' · '+fmtT(left);
  }
  setInterval(()=>{
    const tr=E.trip;if(!tr){syncChip();return;}
    const left=tr.end-Date.now(),ov=document.getElementById('exp-overlay'),open=ov&&ov.classList.contains('open')&&current==='journey';
    if(left<=0&&!tr.notified){tr.notified=true;persist();toast('🧭 Đoàn thám hiểm đã trở về! Mở Hành trình để nhận thưởng.');try{arp([7,9,12,16],.12);}catch(_){}if(open)render();}
    syncChip();
    if(left>0&&open){const p=Math.max(0,Math.min(1,1-left/(tr.end-tr.start)));const bar=document.getElementById('trip-bar'),w=document.getElementById('trip-walker'),eta=document.getElementById('trip-eta'),st=document.getElementById('trip-story');if(bar)bar.style.width=(p*100)+'%';if(w)w.style.left=(p*100)+'%';if(eta)eta.textContent=fmtT(left);if(st){const t=tripStory(tr,p);if(st.textContent!==t)st.textContent=t;}}
  },1000);
  setTimeout(syncChip,800);
  function finishTrial(){if(trialTimer)clearInterval(trialTimer);trialTimer=null;trial=false;E.trialTotal++;E.bestTrial=Math.max(E.bestTrial,trialHits);const reward=Math.min(1e9,Math.floor(trialHits*Math.max(10,typeof cps==='function'?cps():10)*skillBonus('fortune')));award(reward,'Thử thách phản xạ');addLog(`Thử thách: ${trialHits} điểm, thưởng ${fmt(reward)} ánh sáng`);render();}
  document.addEventListener('change',e=>{if(e.target.id!=='exp-file'||!e.target.files?.[0])return;const reader=new FileReader();reader.onload=()=>{try{const v=JSON.parse(reader.result);if(!v||typeof v!=='object'||!v.skill)throw Error();E={...defaults,...v,skill:{...defaults.skill,...v.skill}};persist();render();toast('Đã nhập bản lưu mở rộng.');}catch(_){toast('Tệp bản lưu không hợp lệ.');}};reader.readAsText(e.target.files[0]);e.target.value='';});
  /* Apply additive bonuses through the existing progression functions. */
  const oldMult=mult;
  // Existing const function bindings cannot be reassigned; bonuses are reflected in display and idle reward pulses.
  let lastBoost=Date.now();
  setInterval(()=>{const now=Date.now(),dt=Math.min(5,(now-lastBoost)/1000);lastBoost=now;const base=typeof cps==='function'?cps():0;window.__RDD_TOUCH_BONUS=1+(E.skill.touch||0)*.12;const bonus=base*((E.skill.idle||0)*.08+(E.garden||0)*.01);if(bonus>0&&dt>0){const g=bonus*dt;S.l+=g;S.tot+=g;S.run+=g;}},1000);
  // Tap enhancement: attach only to stage taps that the original game doesn't consume.
  ensureUI();
  const style=document.createElement('style');style.textContent=`
/* === RDD EXPANSION LAYER: living world + mode console === */
@media(max-width:560px){#exp-launch,#minigame-launch,#world-launch{display:flex!important;visibility:visible!important;opacity:1!important}#hud{width:min(42vw,168px)!important;font-size:10px!important}#rate{font-size:10px!important}}
#exp-launch{position:absolute;right:66px;top:calc(14px + var(--safe-top));z-index:12;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,224,125,.48);background:radial-gradient(circle at 30% 25%,rgba(70,54,120,.96),rgba(8,14,38,.96));color:#ffe07d;font-size:19px;cursor:pointer;box-shadow:0 0 22px rgba(161,117,255,.22),inset 0 1px 0 #ffffff30}
#exp-launch:hover{transform:translateY(-2px);box-shadow:0 0 28px #9b7bff55}
#exp-overlay{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:18px;background:radial-gradient(ellipse at 50% 20%,#1c2858dd,#02040def 75%);backdrop-filter:blur(16px)}
#exp-overlay.open{display:flex;animation:expFade .25s ease}
@keyframes expFade{from{opacity:0}to{opacity:1}}
#exp-window{width:min(980px,100%);max-height:min(850px,94dvh);overflow:auto;border:1px solid #8da5d64d;border-radius:24px;background:linear-gradient(145deg,#101a3af7,#050a1cf7 72%);box-shadow:0 30px 100px #000b,inset 0 1px #ffffff1c;color:#f2f7ff}
.exp-head{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:12px;padding:17px 20px;background:#0a1028ed;border-bottom:1px solid #8da5d62b;backdrop-filter:blur(12px)}
.exp-head h2{font-size:19px;margin:0;letter-spacing:.2px}.exp-head p{margin:3px 0 0;color:#9bb0df;font-size:12px}
#exp-close{margin-left:auto;border:1px solid #ffffff25;background:#ffffff0a;color:#fff;border-radius:12px;width:40px;height:40px;font-size:20px;cursor:pointer}
.exp-tabs{display:flex;gap:7px;padding:12px 16px;overflow:auto;border-bottom:1px solid #ffffff12}
.exp-tab{flex:0 0 auto;border:1px solid #ffffff19;border-radius:12px;padding:9px 13px;background:#111b3a;color:#a9bce5;font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.exp-tab.active{background:linear-gradient(135deg,#5646a4,#243a7a);border-color:#ffe07d99;color:#fff}
.exp-content{padding:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.exp-card{border:1px solid #9bb6ff24;border-radius:17px;padding:16px;background:linear-gradient(145deg,#182448b8,#0a1229c9);min-width:0}
.exp-card h3{margin:0 0 7px;font-size:15px;color:#ffe07d}.exp-card p{font-size:12px;line-height:1.55;color:#a9bce5;margin:0 0 12px}
.exp-card .exp-big{font-size:27px;font-weight:800;color:#fff;margin:7px 0}
.exp-btn{border:1px solid #ffe07d55;border-radius:11px;padding:10px 13px;background:linear-gradient(135deg,#4a3c83,#23386d);color:#fff;font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.exp-btn:disabled{opacity:.4;cursor:not-allowed}.exp-btn:hover:not(:disabled){filter:brightness(1.2)}
.exp-muted{font-size:11px;color:#8da5d6}.exp-meter{height:7px;border-radius:8px;background:#020611;overflow:hidden;margin:9px 0}.exp-meter span{display:block;height:100%;background:linear-gradient(90deg,#69e8ff,#ffe07d);width:0;transition:width .2s}
.exp-row{display:flex;align-items:center;gap:10px;margin:10px 0}.exp-row>span{flex:1;font-size:12px;color:#dbe7ff}.exp-row b{font-size:12px;color:#ffe07d}
.exp-log{font-size:12px;color:#a9bce5;line-height:1.7;white-space:pre-line}
@media(max-width:600px){#exp-launch{right:62px;width:40px;height:40px;top:calc(14px + var(--safe-top))}#exp-overlay{padding:8px}#exp-window{max-height:96dvh;border-radius:18px}.exp-head{padding:13px}.exp-content{grid-template-columns:1fr;padding:12px;gap:9px}.exp-card{padding:13px}.exp-tabs{padding:9px}.exp-head h2{font-size:16px}}
@media(prefers-reduced-motion:reduce){#exp-overlay.open{animation:none}#exp-window *{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;document.head.appendChild(style);
  persist();
})();



/* RDD WORLD EXPANSION II — region minigames, visible companion roster, visual milestones */
(() => {
  const q = s => document.querySelector(s);
  const miniPets = [
    {n:'Hươu sao',i:'🦌',c:250000000},{n:'Thỏ tuyết',i:'🐇',c:600000000},
    {n:'Bướm tinh tú',i:'🦋',c:1500000000},{n:'Rái cá suối',i:'🦦',c:4000000000},
    {n:'Hạc trăng',i:'🪽',c:12000000000},{n:'Rồng mầm',i:'🐉',c:50000000000}
  ];
  const games = [
    {id:'cabin',zone:0,icon:'🕯️',name:'Ký ức bên lò sưởi',desc:'Ghi nhớ chuỗi ánh nến rồi lặp lại đúng thứ tự.',reward:'Thưởng theo số vòng hoàn thành.'},
    {id:'forest',zone:1,icon:'✨',name:'Săn đom đóm',desc:'Bấm các đốm sáng xuất hiện trong 15 giây.',reward:'Mỗi đốm bắt được tăng phần thưởng.'},
    {id:'water',zone:2,icon:'🎵',name:'Nhịp điệu thác ngân hà',desc:'Chạm theo nhịp sóng; càng gần nhịp chuẩn càng nhiều điểm.',reward:'Điểm chính xác tạo combo.'},
    {id:'moon',zone:3,icon:'🌙',name:'Nối chòm sao',desc:'Nối 5 ngôi sao theo thứ tự được gợi ý.',reward:'Hoàn thành chòm sao để nhận thưởng lớn.'}
  ];
  let game=null, timer=null, score=0, started=0, sequence=[], seqStep=0, target=0, hit=0, stars=0, lastBeat=0, combo=0, gameEnd=0, interval=null;
  const safeFmt=n=>typeof fm==='function'?fm(n):Math.floor(n).toLocaleString('vi-VN');
  const zoneName=['Nhà gỗ','Rừng linh hồn','Thác ngân hà','Hồ trăng'];
  function currentZone(){return inside?0:Math.min(3,Math.max(0,Math.round(cam/Math.max(1,W))));}
  function ensure(){
    if(q('#minigame-overlay'))return;
    const btn=document.createElement('button');btn.id='minigame-launch';btn.className='top-btn';btn.title='Mini game theo cảnh quan';btn.textContent='🎮';btn.style.right='116px';btn.style.left='auto';btn.style.top='calc(14px + var(--safe-top))';btn.style.zIndex='13';q('#stage').appendChild(btn);
    const ov=document.createElement('div');ov.id='minigame-overlay';ov.innerHTML=`<section class="mg-window" role="dialog" aria-modal="true" aria-label="Mini game theo cảnh quan"><header class="mg-head"><div><h2>🎮 Trò chơi bên lề</h2><p>Mini game riêng cho từng vùng của Rừng Đom Đóm</p></div><button id="mg-close">×</button></header><div class="mg-zone" id="mg-zones"></div><main id="mg-main"></main></section>`;
    document.body.appendChild(ov);
    const st=document.createElement('style');st.textContent=`
      #minigame-overlay{display:none;position:fixed;inset:0;z-index:1100;background:radial-gradient(ellipse at top,#202b60eF,#02040df5 75%);backdrop-filter:blur(15px);align-items:center;justify-content:center;padding:12px}
      #minigame-overlay.open{display:flex;animation:mgIn .2s ease}@keyframes mgIn{from{opacity:0}to{opacity:1}}
      .mg-window{width:min(820px,100%);max-height:94dvh;overflow:auto;border:1px solid #a5baff44;border-radius:22px;background:linear-gradient(145deg,#111d40,#050a1c);box-shadow:0 30px 100px #000c;color:#f2f7ff}
      .mg-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;padding:16px 18px;background:#0a1128ee;border-bottom:1px solid #ffffff16}
      .mg-head h2{font-size:18px;margin:0}.mg-head p{font-size:12px;color:#9db2e0;margin:4px 0 0}.mg-head button{margin-left:auto;width:40px;height:40px;border-radius:12px;border:1px solid #ffffff22;background:#ffffff0a;color:white;font-size:22px}
      .mg-zone{display:flex;gap:7px;overflow:auto;padding:12px 14px;border-bottom:1px solid #ffffff12}
      .mg-zone button,.mg-action{flex:0 0 auto;padding:10px 12px;border:1px solid #ffffff20;border-radius:12px;background:#152246;color:#cbd9fb;font:inherit;font-size:12px;font-weight:700;cursor:pointer}
      .mg-zone button.active{border-color:#ffe07d99;background:linear-gradient(135deg,#55458f,#21386b);color:white}
      #mg-main{padding:18px;min-height:300px}.mg-card{border:1px solid #8ea9e62b;border-radius:17px;padding:17px;background:linear-gradient(145deg,#172448b8,#091229c9)}
      .mg-card h3{margin:0 0 7px;color:#ffe07d;font-size:16px}.mg-card p{color:#a9bce5;font-size:13px;line-height:1.6}
      .mg-score{font-size:32px;font-weight:800;margin:12px 0;color:#fff}.mg-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
      .mg-playfield{height:230px;position:relative;overflow:hidden;border-radius:15px;border:1px solid #8ea9e633;background:radial-gradient(ellipse at 50% 70%,#233c62,#091127 70%);margin-top:12px}
      .mg-target{position:absolute;border:1px solid #ffe07d99;border-radius:50%;background:radial-gradient(circle,#fff8c7,#ffcf68aa 35%,#ffcf6800 72%);width:44px;height:44px;box-shadow:0 0 25px #ffcf6877;cursor:pointer}
      .mg-stars{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:16px}
      .mg-star{height:58px;border-radius:13px;border:1px solid #a5baff30;background:#111e3d;color:#b7c9f4;font-size:23px;cursor:pointer}
      .mg-star.done{background:#224d61;color:#a7ffec;border-color:#74f0db}
      .mg-seq{display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}.mg-seq button{min-width:50px;height:50px;border-radius:13px;border:1px solid #ffe07d66;background:#242b55;color:#fff;font-size:19px;cursor:pointer}
      @media(max-width:560px){#minigame-launch{right:110px!important;width:40px;height:40px}.mg-window{border-radius:17px}.mg-head{padding:12px}.mg-zone{padding:9px}#mg-main{padding:11px}.mg-playfield{height:190px}}
    `;document.head.appendChild(st);
    btn.onclick=()=>{ov.classList.add('open');game=null;renderZones();renderGame(currentZone())};
    q('#mg-close').onclick=close;
    ov.addEventListener('click',e=>{if(e.target===ov)close()});
    q('#mg-zones').addEventListener('click',e=>{const b=e.target.closest('[data-zone]');if(b){game=null;clearTimers();window.__RDD_MGM&&window.__RDD_MGM.stop();renderGame(+b.dataset.zone)}});
    q('#mg-main').addEventListener('click',handle);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  function clearTimers(){if(timer)clearInterval(timer);if(interval)clearInterval(interval);timer=interval=null;}
  function close(){const ov=q('#minigame-overlay');if(ov)ov.classList.remove('open');clearTimers();game=null;window.__RDD_MGM&&window.__RDD_MGM.stop();}
  function renderZones(){q('#mg-zones').innerHTML=games.map(g=>`<button data-zone="${g.zone}" class="${g.zone===currentZone()?'active':''}">${g.icon} ${zoneName[g.zone]}</button>`).join('');}
  function renderGame(z){
    renderZones();q('#mg-zones').querySelectorAll('button').forEach(b=>b.classList.toggle('active',+b.dataset.zone===z));
    const g=games[z];const main=q('#mg-main');
    const title=`<div class="mg-card"><h3>${g.icon} ${g.name}</h3><p>${g.desc}</p><p><b>Phần thưởng:</b> ${g.reward}</p><p style="color:#ffe07d">Cảnh hiện tại: ${zoneName[z]}${z===currentZone()?' · Đúng vùng':' · Có thể chơi thử'}</p><div id="mg-status" class="mg-score">${game&&game.id===g.id?score:0}</div><div id="mg-instructions" style="color:#9db2e0;font-size:12px">Mỗi lượt có thể nhận ánh sáng theo thành tích. Thưởng được giới hạn để tránh phá cân bằng.</div><div id="mg-field"></div><div class="mg-actions"><button class="mg-action" data-mg="start" data-zone="${z}">Bắt đầu mini game</button><button class="mg-action" data-mg="collect" ${game?'':'disabled'}>Nhận thưởng (nếu đã kết thúc)</button></div></div>`;
    main.innerHTML=title;
    if(game&&game.id===g.id)refreshField();
  }
  function refreshField(){
    const f=q('#mg-field');if(!f||!game)return;
    if(game.id==='cabin'){
      f.innerHTML=`<div class="mg-seq">${[0,1,2,3].map(i=>`<button data-mg="candle" data-v="${i}">${['🕯️','🔥','✨','🌙'][i]}</button>`).join('')}</div>`;
    }else if(game.id==='forest'){
      f.innerHTML=`<div class="mg-playfield" id="mg-playfield"><button class="mg-target" data-mg="firefly" style="left:${target.x}%;top:${target.y}%"></button></div>`;
    }else if(game.id==='water'){
      f.innerHTML=`<div class="mg-playfield" style="display:flex;align-items:center;justify-content:center"><div style="text-align:center"><div style="font-size:40px">🌊</div><div id="mg-beat" style="font-size:13px;color:#a9bce5">Chạm khi vòng sóng sáng lên</div><button class="mg-action" data-mg="beat" style="margin-top:14px">〰️ CHẠM NHỊP</button></div></div>`;
    }else{
      f.innerHTML=`<div class="mg-stars">${[0,1,2,3,4].map(i=>`<button class="mg-star" data-mg="star" data-v="${i}">${stars>i?'✦':'☆'}</button>`).join('')}</div>`;
    }
  }
  function start(z){
    clearTimers();const g=games[z];score=0;started=Date.now();gameEnd=started+15000;game={id:g.id,zone:z,done:false};window.__RDD_MGM&&window.__RDD_MGM.start(g.id);hit=0;stars=0;seqStep=0;combo=0;lastBeat=0;
    if(g.id==='cabin'){sequence=Array.from({length:4},()=>Math.floor(Math.random()*4));q('#mg-instructions').textContent='Ghi nhớ chuỗi 4 ký hiệu: '+sequence.map(v=>['🕯️','🔥','✨','🌙'][v]).join('  ');setTimeout(()=>{if(game&&game.id==='cabin')q('#mg-instructions').textContent='Bấm đúng chuỗi ký hiệu theo thứ tự.'},2400);}
    if(g.id==='forest'){target={x:20+Math.random()*65,y:15+Math.random()*65};timer=setInterval(()=>{if(!game||game.id!=='forest')return;if(Date.now()>=gameEnd)finish();else{target={x:8+Math.random()*80,y:8+Math.random()*72};refreshField();}},850);}
    if(g.id==='water'){interval=setInterval(()=>{if(!game||game.id!=='water')return;lastBeat=Date.now();window.__RDD_MGM&&window.__RDD_MGM.beat();const b=q('#mg-beat');if(b){b.textContent='🌊 CHẠM NGAY';b.style.color='#ffe07d';setTimeout(()=>{if(b){b.textContent='Lắng nghe nhịp sóng…';b.style.color='#a9bce5'}},240);}},900);}
    if(g.id==='moon'){sequence=[0,1,2,3,4];}
    refreshField();q('#mg-status').textContent='0';q('#mg-instructions').textContent=g.id==='cabin'?'Nhớ chuỗi rồi bấm đúng thứ tự.':g.id==='forest'?'Bắt càng nhiều đom đóm càng tốt.':g.id==='water'?'Chạm gần thời điểm vòng sóng lóe sáng.':'Nối các sao theo thứ tự từ 1 đến 5.';
    q('#mg-main').querySelector('[data-mg="start"]').textContent='Đang chơi…';
  }
  function finish(){
    if(!game||game.done)return;game.done=true;clearTimers();window.__RDD_MGM&&window.__RDD_MGM.finish(score);
    q('#mg-instructions').textContent=`Hoàn thành! Điểm: ${score}. Nhấn “Nhận thưởng” để thu thập phần thưởng.`;
    const b=q('#mg-main').querySelector('[data-mg="collect"]');if(b)b.disabled=false;
    const s=q('#mg-main').querySelector('[data-mg="start"]');if(s){s.textContent='Chơi lại';s.disabled=false;}
    if(typeof toast==='function')toast(`🎮 Mini game kết thúc · ${score} điểm`);
  }
  function updateScore(n){score+=n;window.__RDD_MGM&&window.__RDD_MGM.hit(game&&game.id,n);const s=q('#mg-status');if(s)s.textContent=score;}
  function handle(e){
    const b=e.target.closest('[data-mg]');if(!b)return;const a=b.dataset.mg;
    if(a==='start'){start(+b.dataset.zone);return;}
    if(a==='firefly'&&game&&game.id==='forest'&&!game.done){updateScore(1);target={x:8+Math.random()*80,y:8+Math.random()*72};refreshField();return;}
    if(a==='candle'&&game&&game.id==='cabin'&&!game.done){const v=+b.dataset.v;if(v===sequence[seqStep]){seqStep++;updateScore(2);if(seqStep>=sequence.length){score+=8;finish();}}else{score=Math.max(0,score-2);seqStep=0;window.__RDD_MGM&&window.__RDD_MGM.miss();const s=q('#mg-status');if(s)s.textContent=score;}return;}
    if(a==='beat'&&game&&game.id==='water'&&!game.done){const d=Math.abs(Date.now()-lastBeat);if(d<230){updateScore(3);combo++;}else if(d<430){updateScore(1);combo=0;}else{combo=0;}if(combo>=3){updateScore(2);combo=0;}return;}
    if(a==='star'&&game&&game.id==='moon'&&!game.done){const v=+b.dataset.v;if(v===stars){stars++;updateScore(4);b.classList.add('done');b.textContent='✦';if(stars>=5)finish();}else{score=Math.max(0,score-1);window.__RDD_MGM&&window.__RDD_MGM.miss();const s=q('#mg-status');if(s)s.textContent=score;}return;}
    if(a==='collect'&&game&&game.done){const g=games[game.zone];const base=[250,180,220,400][game.zone],reward=Math.min(1e8,Math.floor((base+score*75)*Math.max(1,typeof cps==='function'?cps():1)*(game.zone===3?1.2:1)));if(typeof add==='function')add(reward);else S.l+=reward;S.taps=(S.taps||0)+1;if(typeof burst==='function')burst(24);if(typeof toast==='function')toast(`${g.icon} ${g.name}: +${safeFmt(reward)} ánh sáng`);if(typeof ui==='function')ui();game=null;renderGame(currentZone());}
  }
  // Legacy follower-sprite pass removed: autonomous ecology renderer owns companion drawing.
  ensure();
})();



/* === RDD ARTISAN IX: additive content + low-cost procedural visual pass === */
(() => {
  'use strict';
  const q = s => document.querySelector(s);
  const KEY='rdd5';
  const petDefs=[
    {id:'deer',name:'Hươu sao',icon:'🦌',cost:250000000,desc:'Ánh sao trên gạc cộng hưởng cùng cây linh hồn.',bonus:'Tăng sản lượng 3% mỗi cấp',zone:1},
    {id:'hare',name:'Thỏ tuyết',icon:'🐇',cost:600000000,desc:'Tìm thấy vật phẩm nhỏ trong những bụi dương xỉ.',bonus:'Tăng thưởng mini game 4%',zone:1},
    {id:'moth',name:'Bướm tinh tú',icon:'🦋',cost:1500000000,desc:'Đôi cánh để lại bụi sáng khi bay.',bonus:'Tăng sức mạnh chạm 5%',zone:0},
    {id:'otter',name:'Rái cá suối',icon:'🦦',cost:4000000000,desc:'Lướt theo dòng nước phát sáng.',bonus:'Tăng sản lượng 6%',zone:2},
    {id:'crane',name:'Hạc trăng',icon:'🪽',cost:12000000000,desc:'Canh giữ những phản chiếu bí mật ở Hồ Trăng.',bonus:'Tăng thưởng khám phá 8%',zone:3},
    {id:'wyrm',name:'Rồng mầm',icon:'🐉',cost:50000000000,desc:'Một sinh vật cổ xưa đang ngủ trong hạt giống.',bonus:'Tăng sản lượng 10%',zone:3}
  ];
  const achDefs=[
    ['first100','Đốm sáng đầu tiên','Tích lũy 100 ánh sáng',()=>S.tot>=100,'✨'],
    ['first10k','Khu rừng thức giấc','Tích lũy 10.000 ánh sáng',()=>S.tot>=1e4,'🌱'],
    ['million','Biển ánh sáng','Tích lũy 1 triệu ánh sáng',()=>S.tot>=1e6,'🌟'],
    ['tap100','Ngón tay nhiệm màu','Chạm màn hình 100 lần',()=>S.taps>=100,'👆'],
    ['tap1000','Người gọi đom đóm','Chạm màn hình 1.000 lần',()=>S.taps>=1000,'🪄'],
    ['house5','Người giữ lửa','Tổng cấp nội thất đạt 5',()=>S.home.reduce((a,b)=>a+b,0)>=5,'🔥'],
    ['house20','Tổ ấm rực rỡ','Tổng cấp nội thất đạt 20',()=>S.home.reduce((a,b)=>a+b,0)>=20,'🏡'],
    ['house60','Dinh thự dưới trăng','Tổng cấp nội thất đạt 60',()=>S.home.reduce((a,b)=>a+b,0)>=60,'🏰'],
    ['magic10','Người dệt phép màu','Tổng cấp phép màu đạt 10',()=>S.own.reduce((a,b)=>a+b,0)>=10,'🌌'],
    ['magic40','Khu rừng thức tỉnh','Tổng cấp phép màu đạt 40',()=>S.own.reduce((a,b)=>a+b,0)>=40,'🌳'],
    ['pet3','Bạn bè bốn phương','Sở hữu 3 bạn rừng gốc',()=>S.pet.filter(v=>v>0).length>=3,'🐾'],
    ['pet6','Gia đình khu rừng','Sở hữu đủ 6 bạn rừng gốc',()=>S.pet.every(v=>v>0),'🦊'],
    ['gold1','Ánh vàng hiếm có','Bắt được đom đóm vàng',()=>S.gold>=1,'🟡'],
    ['star10','Thợ săn sao','Bắt 10 sao băng',()=>S.caught>=10,'🌠'],
    ['sleep5','Ngủ dưới tán cây','Ngủ 5 lần',()=>S.sleeps>=5,'🌙'],
    ['read5','Tri thức cổ xưa','Đọc sách 5 lần',()=>S.reads>=5,'📚'],
    ['explorer','Kẻ lang thang','Mở khóa ít nhất 4 phép màu',()=>S.own.filter(v=>v>0).length>=4,'🧭'],
    ['collector','Nhà sưu tầm','Sở hữu ít nhất 3 sinh vật mở rộng',()=>state.pets.length>=3,'🦋'],
    ['garden5','Người chăm vườn','Chăm sóc vườn đạt cấp 5',()=>state.garden>=5,'🪴'],
    ['mini1','Người ham vui','Hoàn thành mini game đầu tiên',()=>state.minigames>=1,'🎮'],
    ['mini10','Bậc thầy trò chơi','Hoàn thành 10 mini game',()=>state.minigames>=10,'🏅'],
    ['exp5','Nhà thám hiểm','Thám hiểm 5 lần',()=>state.expeditions>=5,'🗺️'],
    ['codex5','Thư viện sống','Mở khóa 5 mục sổ tay',()=>S.codex.length>=5,'📖'],
    ['homeall','Người kiến tạo','Nâng mọi món nội thất ít nhất 1 cấp',()=>S.home.every(v=>v>0),'🪑'],
    ['allzones','Bốn miền huyền ảo','Khám phá đủ 4 cảnh quan',()=>state.zones.length>=4,'🌈']
  ];
  let state={pets:[],claimed:[],minigames:0,expeditions:0,garden:0,zones:[0],lastSeen:Date.now(),petLevels:{}};
  try{state={...state,...(S.artisanIX||{}),...JSON.parse(localStorage.getItem('rdd_artisan_ix')||'{}')};}catch(_){}
  state.pets=Array.isArray(state.pets)?state.pets:[];state.claimed=Array.isArray(state.claimed)?state.claimed:[];
  state.zones=Array.isArray(state.zones)?state.zones:[0];state.petLevels=state.petLevels||{};
  const save=()=>{try{S.artisanIX=state; if(typeof window.save==='function')window.save(); else localStorage.setItem('rdd5',JSON.stringify(S));}catch(_){}};
  const applyCompanionBonuses=()=>{
    const level=id=>state.pets.includes(id)?1+(state.petLevels[id]||0):0;
    window.__RDD_TOUCH_BONUS=1+level('moth')*.05;
    if(typeof extraMult==='function'&&!window.__RDD_IX_BASE_MULT){
      window.__RDD_IX_BASE_MULT=extraMult;
      extraMult=function(){const b=window.__RDD_IX_BASE_MULT();return b*(1+level('deer')*.03+level('otter')*.06+level('wyrm')*.10);};
    }
  };
  const fmt=n=>typeof fm==='function'?fm(n):Math.floor(n).toLocaleString('vi-VN');
  const totalHouse=()=>S.home.reduce((a,b)=>a+b,0);
  const totalMagic=()=>S.own.reduce((a,b)=>a+b,0);
  const petCost=p=>Math.floor(p.cost*Math.pow(1.8,state.petLevels[p.id]||0));
  const currentZone=()=>inside?0:Math.max(0,Math.min(3,Math.round(cam/Math.max(1,W))));
  const reward=(n,label)=>{n=Math.max(0,Math.min(1e12,Math.floor(n)));if(typeof add==='function')add(n);else{S.l+=n;S.tot+=n;S.run+=n;}if(typeof toast==='function')toast(`${label}: +${fmt(n)} ánh sáng`);if(typeof burst==='function')burst(16);if(typeof ui==='function')ui();};
  function addCss(){const st=document.createElement('style');st.textContent=`/* === ARTISAN IX: visual depth, collection, achievements === */
#world-launch{position:absolute;right:166px;top:calc(14px + var(--safe-top));z-index:13;width:42px;height:42px;border-radius:50%;border:1px solid #8de7ff66;background:radial-gradient(circle at 30% 25%,#31547acc,#080f28f2);color:#c7f8ff;font-size:18px;cursor:pointer;box-shadow:0 0 22px #5deaff22,inset 0 1px #ffffff2c}
#world-launch:hover{filter:brightness(1.25);transform:translateY(-2px)}
#world-modal{display:none;position:fixed;inset:0;z-index:1200;align-items:center;justify-content:center;padding:12px;background:radial-gradient(ellipse at 50% 0%,#24356bf2,#02040df7 75%);backdrop-filter:blur(14px)}
#world-modal.open{display:flex}
#w9-window{width:min(900px,100%);max-height:94dvh;overflow:auto;border:1px solid #9dc7ff35;border-radius:22px;background:linear-gradient(150deg,#101d3af7,#050a1bf9 75%);box-shadow:0 28px 100px #000c;color:#eef5ff}
.w9-head{display:flex;align-items:center;gap:12px;padding:16px 18px;position:sticky;top:0;z-index:3;background:#09132bf2;border-bottom:1px solid #ffffff12}
.w9-head h2{margin:0;font-size:18px}.w9-head p{margin:4px 0 0;color:#91a9d9;font-size:12px}
#w9-close{margin-left:auto;width:38px;height:38px;border-radius:11px;border:1px solid #ffffff22;background:#ffffff08;color:#fff;font-size:22px;cursor:pointer}
.w9-tabs{display:flex;gap:7px;padding:11px 14px;overflow:auto;border-bottom:1px solid #ffffff12}
.w9-tab{white-space:nowrap;border:1px solid #ffffff18;border-radius:11px;padding:9px 12px;background:#101b38;color:#a9bce5;font:inherit;font-size:12px;font-weight:700;cursor:pointer}
.w9-tab.active{color:#fff;border-color:#7deaff80;background:linear-gradient(135deg,#275a7d,#27366d)}
#w9-content{padding:14px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.w9-card{position:relative;overflow:hidden;border:1px solid #9bb9ff24;border-radius:16px;padding:14px;background:linear-gradient(145deg,#17274abf,#091328e8);min-width:0}
.w9-card:after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 100% 0%,#6aeaff0d,transparent 55%)}
.w9-card h3{margin:0 0 6px;color:#ffe08a;font-size:14px}.w9-card p{font-size:12px;line-height:1.5;color:#a9bce5;margin:0 0 10px}
.w9-row{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #ffffff0b}
.w9-row:last-child{border-bottom:0}.w9-icon{width:44px;height:44px;display:grid;place-items:center;flex:0 0 auto;border-radius:13px;background:radial-gradient(circle at 30% 25%,#46639c99,#0a142e);font-size:26px}
.w9-info{flex:1;min-width:0}.w9-info b{display:block;color:#fff;font-size:12px}.w9-info small{display:block;color:#8fa8d9;font-size:10px;line-height:1.4;margin-top:3px}
.w9-btn{border:1px solid #8de7ff55;border-radius:10px;padding:8px 10px;background:linear-gradient(135deg,#245475,#28386c);color:#fff;font:inherit;font-size:11px;font-weight:700;cursor:pointer}
.w9-btn:disabled{opacity:.4;cursor:not-allowed}
.w9-progress{height:6px;background:#020611;border-radius:6px;overflow:hidden;margin:7px 0}.w9-progress span{display:block;height:100%;background:linear-gradient(90deg,#71f1ff,#ffe08a);transition:width .25s}
.w9-tag{display:inline-block;border:1px solid #7deaff30;background:#5edcf00d;color:#a8f4ff;padding:3px 7px;border-radius:8px;font-size:10px;margin:2px 3px 2px 0}
.w9-big{font-size:24px;font-weight:800;color:#fff;margin:7px 0}
@media(max-width:560px){#world-launch{right:158px;top:calc(14px + var(--safe-top));width:39px;height:39px}#world-modal{padding:6px}#w9-window{max-height:97dvh;border-radius:17px}.w9-head{padding:12px}.w9-tabs{padding:8px}#w9-content{grid-template-columns:1fr;padding:9px;gap:8px}.w9-card{padding:12px}}`;document.head.appendChild(st);}
  function ensure(){
    if(q('#world-modal'))return;
    const b=document.createElement('button');b.id='world-launch';b.title='Bộ sưu tập & thành tựu';b.textContent='✧';b.setAttribute('aria-label','Mở bộ sưu tập');q('#stage').appendChild(b);
    const m=document.createElement('div');m.id='world-modal';m.innerHTML=`<section id="w9-window" role="dialog" aria-modal="true" aria-label="Thư viện Rừng Đom Đóm"><header class="w9-head"><div style="font-size:28px">🌿</div><div><h2>Thư viện thế giới sống</h2><p>Bạn rừng · thành tựu · tiến hóa ngoại quan · nhật ký khám phá</p></div><button id="w9-close" aria-label="Đóng">×</button></header><nav class="w9-tabs"><button class="w9-tab active" data-w9="overview">🌌 Tổng quan</button><button class="w9-tab" data-w9="pets">🐾 Bạn rừng</button><button class="w9-tab" data-w9="ach">🏆 Thành tựu</button><button class="w9-tab" data-w9="visual">🏡 Tiến hóa hình ảnh</button></nav><div id="w9-content"></div></section>`;
    document.body.appendChild(m);
    b.onclick=()=>{m.classList.add('open');render('overview')};
    q('#w9-close').onclick=close;
    m.addEventListener('click',e=>{if(e.target===m)close()});
    q('.w9-tabs').addEventListener('click',e=>{const t=e.target.closest('[data-w9]');if(t)render(t.dataset.w9)});
    q('#w9-content').addEventListener('click',handle);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  function close(){q('#world-modal')?.classList.remove('open');}
  function card(title,body,icon='✨'){return `<article class="w9-card"><h3>${icon} ${title}</h3>${body}</article>`;}
  function petMarkup(p){
    const own=state.pets.includes(p.id),lvl=state.petLevels[p.id]||0,cost=petCost(p);
    return `<div class="w9-row"><div class="w9-icon">${p.icon}</div><div class="w9-info"><b>${p.name} ${own?`· Cấp ${lvl+1}`:''}</b><small>${p.desc}<br>${p.bonus}</small><span class="w9-tag">${['Nhà gỗ','Rừng linh hồn','Thác Ngân Hà','Hồ Trăng'][p.zone]}</span></div><button class="w9-btn" data-pet="${p.id}" ${!own&&S.l<cost?'disabled':''}>${own?`Nâng ${fmt(cost)}`:`Mở ${fmt(cost)}`}</button></div>`;
  }
  function render(tab){
    ensure();q('.w9-tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.w9===tab));
    const c=q('#w9-content');
    if(tab==='overview'){
      c.innerHTML=card('Thế giới đang thức tỉnh',`<div class="w9-big">${fmt(S.l)} ✨</div><p>Ánh sáng hiện có. Mỗi khu vực, sinh vật và công trình đều là một phần của tiến trình dài hạn.</p><div class="w9-progress"><span style="width:${Math.min(100,totalHouse()/60*100)}%"></span></div><p>Nhà: ${totalHouse()}/60 cấp mốc · Phép màu: ${totalMagic()} cấp · Bạn rừng mới: ${state.pets.length}/6</p><div>${['Nhà gỗ','Rừng linh hồn','Thác Ngân Hà','Hồ Trăng'].map((n,i)=>`<span class="w9-tag">${state.zones.includes(i)?'✦':'◇'} ${n}</span>`).join('')}</div>`,'🌌')+
      card('Mục tiêu tiếp theo',`<div class="w9-row"><span class="w9-info"><b>Tiến hóa tổ ấm</b><small>Đạt tổng cấp nội thất 5 / 20 / 60 để mở các tầng trang trí.</small></span><b>${totalHouse()}</b></div><div class="w9-row"><span class="w9-info"><b>Thức tỉnh phép màu</b><small>Đạt tổng cấp phép màu 10 / 30 / 60 để mở vòng rune, tinh thể và hào quang.</small></span><b>${totalMagic()}</b></div><div class="w9-row"><span class="w9-info"><b>Sưu tập sinh vật</b><small>Mở khóa bạn rừng mới để bổ sung hoạt ảnh theo sau nhân vật.</small></span><b>${state.pets.length}/6</b></div>`,'🧭')+
      card('Hoạt động',`<p>Mini game theo từng cảnh quan đã được gắn vào nút 🎮 trên màn chơi. Mỗi lượt hoàn thành đều có thể nhận thưởng.</p><p>Đã hoàn thành ${state.minigames} lượt mini game và ${state.expeditions} chuyến thám hiểm.</p>`,'🎮');
    }else if(tab==='pets'){
      c.innerHTML=card('Bộ sưu tập bạn rừng',`<p>6 sinh vật bổ sung. Mở khóa bằng ánh sáng; cấp tiếp theo tăng hiệu ứng và làm sinh vật nổi bật hơn khi đồng hành.</p>${petDefs.map(p=>petMarkup(p)).join('')}`,'🐾')+
      card('Sinh vật gốc',`<p>Các bạn rừng ban đầu vẫn được quản lý tại tab “Bạn rừng” của game. Hệ thống mới không ghi đè sáu cấp độ cũ.</p><div>${S.pet.map((v,i)=>`<span class="w9-tag">${['Mèo rừng','Cáo lửa','Cú đêm','Sóc nhỏ','Nhím gai','Rùa cổ'][i]} · cấp ${v||0}</span>`).join('')}</div>`,'🌱');
    }else if(tab==='ach'){
      const unlocked=achDefs.filter(a=>a[3]()).length;
      c.innerHTML=card('Bảng thành tựu',`<div class="w9-big">${unlocked} / ${achDefs.length}</div><div class="w9-progress"><span style="width:${unlocked/achDefs.length*100}%"></span></div><p>Thành tựu được kiểm tra từ dữ liệu tiến trình thực tế. Mở khóa sẽ tự nhận thưởng một lần.</p>`,'🏆')+
      card('Danh sách thành tựu',achDefs.map(a=>{const ok=a[3](),claimed=state.claimed.includes(a[0]);return `<div class="w9-row"><div class="w9-icon">${ok?a[4]:'🔒'}</div><div class="w9-info"><b>${a[1]}</b><small>${a[2]}</small></div><span class="w9-tag">${claimed?'Đã nhận':ok?'Hoàn thành':'Chưa đạt'}</span></div>`}).join(''),'📜');
    }else{
      const h=totalHouse(),m=totalMagic();
      c.innerHTML=card('Tiến hóa tổ ấm',`<p>Hình ảnh trong nhà được vẽ theo cấp nội thất. Các mốc tổng cấp mở thêm lớp trang trí ánh sáng.</p><div class="w9-row"><span class="w9-info"><b>Nhà gỗ → Tổ ấm mở rộng</b><small>5 cấp nội thất · đèn hiên, khung cửa ấm và chi tiết gỗ sáng.</small></span><span class="w9-tag">${h>=5?'Đã mở':'Chưa mở'}</span></div><div class="w9-row"><span class="w9-info"><b>Tổ ấm → Dinh thự huyền ảo</b><small>20 / 60 cấp · hoa văn sàn, đường viền vàng và hạt sáng.</small></span><span class="w9-tag">${h>=20?'Đã mở':'Chưa mở'}</span></div>`,'🏡')+
      card('Tiến hóa phép màu',`<div class="w9-row"><span class="w9-info"><b>Vòng rune</b><small>10 cấp phép màu.</small></span><span class="w9-tag">${m>=10?'Đã mở':'Chưa mở'}</span></div><div class="w9-row"><span class="w9-info"><b>Tinh thể bay</b><small>30 cấp phép màu.</small></span><span class="w9-tag">${m>=30?'Đã mở':'Chưa mở'}</span></div><div class="w9-row"><span class="w9-info"><b>Hào quang linh hồn</b><small>60 cấp phép màu.</small></span><span class="w9-tag">${m>=60?'Đã mở':'Chưa mở'}</span></div><p>Các hiệu ứng xuất hiện trực tiếp trên cảnh game, không chỉ trong bảng thông tin.</p>`,'🌠')+
      card('Các lớp hình ảnh',`<p>• Parallax ánh sáng theo chiều sâu.<br>• Hạt bụi theo từng cảnh quan.<br>• Vệt sáng theo sau bạn rừng mới.<br>• Trang trí kiến trúc và rune theo mốc nâng cấp.<br>• Hiệu ứng giảm chuyển động tôn trọng cài đặt hệ thống.</p>`,'🎨');
    }
  }
  function handle(e){
    const b=e.target.closest('[data-pet]');if(!b)return;const p=petDefs.find(v=>v.id===b.dataset.pet);if(!p)return;
    if(state.pets.includes(p.id)){
      const cost=petCost(p);if(S.l<cost){if(typeof toast==='function')toast('Chưa đủ ánh sáng để nâng cấp bạn rừng.');return;}
      S.l-=cost;state.petLevels[p.id]=(state.petLevels[p.id]||0)+1;
      reward(Math.floor(cost*.05),'Cộng hưởng bạn rừng');
    }else{
      if(S.l<p.cost)return;S.l-=p.cost;state.pets.push(p.id);state.petLevels[p.id]=0;
      if(typeof toast==='function')toast(`${p.icon} ${p.name} đã gia nhập khu rừng!`);
      reward(Math.floor(p.cost*.02),'Phúc lành bạn rừng');
    }
    save();applyCompanionBonuses();render('pets');
  }
  function checkAchievements(){
    for(const a of achDefs){if(!state.claimed.includes(a[0])&&a[3]()){state.claimed.push(a[0]);const r=500+state.claimed.length*250;reward(r,`Thành tựu: ${a[1]}`);}}
    save();
  }
  /* Lightweight procedural particles: no external assets, capped counts for mobile. */
  const particles=Array.from({length:30},(_,i)=>({u:Math.random(),v:Math.random(),r:1+Math.random()*2.4,ph:Math.random()*6.28,sp:.00012+Math.random()*.0003,kind:i%4}));
  let lastFx=0;
  const priorDraw=draw;
  draw=function(t,dt){
    priorDraw(t,dt);
    try{
      if(!x||!W||!H)return;
      const z=currentZone(),reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(!reduced && t-lastFx>33){
        lastFx=t;x.save();x.globalCompositeOperation='lighter';
        const count=Math.min(W<600?9:22,Math.max(6,Math.floor(W/(W<600?85:55))));
        for(let i=0;i<count;i++){
          const p=particles[i],px=(p.u*W+Math.sin(t*p.sp+p.ph)*W*.025+W)%W;
          const py=((p.v*H-t*p.sp*H*.65)%H+H)%H;
          const a=.12+.26*(.5+.5*Math.sin(t/650+p.ph));
          x.globalAlpha=a;
          x.fillStyle=z===2?'#77eaff':z===3?'#d6c5ff':z===1?'#a6ffc2':'#ffdca0';
          x.beginPath();x.arc(px,py,p.r,0,Math.PI*2);x.fill();
          if(i%5===0){x.globalAlpha=a*.18;x.beginPath();x.arc(px,py,p.r*4,0,Math.PI*2);x.fill();}
        }
        x.restore();
      }
      x.save();x.globalCompositeOperation='lighter';x.globalAlpha=.7;
      const house=totalHouse(),magic=totalMagic();
      if(inside){
        // Decorative trim and warm ambient bounce react to furnishing milestones.
        const tier=house>=60?3:house>=20?2:house>=5?1:0;
        if(tier>0){
          const yy=H*.16,xx=W*.5;
          x.strokeStyle=tier>=3?'rgba(255,221,139,.58)':tier===2?'rgba(255,193,112,.4)':'rgba(255,204,130,.28)';
          x.lineWidth=tier>=3?3:2;x.beginPath();x.moveTo(W*.13,yy);x.quadraticCurveTo(xx,H*.035,W*.87,yy);x.stroke();
          for(let i=0;i<tier*2;i++){const px=W*(.22+i*(.56/Math.max(1,tier*2-1)));x.globalAlpha=.24+.16*Math.sin(t/400+i);x.fillStyle='#ffd98a';x.beginPath();x.arc(px,yy+H*.018,2+tier*.5,0,7);x.fill();}
        }
      }else{
        // The overhead rotating rune ring was removed to avoid a satellite-like orbit above the character.
        if(magic>=30){
          x.globalAlpha=.28;for(let i=0;i<Math.min(8,Math.floor(magic/4));i++){const px=(i*97+Math.sin(t/900+i)*25)%W,py=H*(.28+(i%4)*.09)+Math.cos(t/800+i)*7;x.fillStyle='#d0a8ff';x.beginPath();x.moveTo(px,py-5);x.lineTo(px+3,py);x.lineTo(px,py+5);x.lineTo(px-3,py);x.closePath();x.fill();}
        }
        if(magic>=60){x.globalAlpha=.08+.04*Math.sin(t/700);const gr=x.createRadialGradient(W*.5,H*.6,1,W*.5,H*.6,Math.min(W,H)*.42);gr.addColorStop(0,'#9af5ff');gr.addColorStop(1,'#9af5ff00');x.fillStyle=gr;x.fillRect(0,0,W,H);}
      }
      // Duplicate orbiting emoji companion pass removed; the autonomous ecology renderer handles pets.
      x.restore();
    }catch(_){}
  };
  function detectZone(){const z=currentZone();if(!state.zones.includes(z)){state.zones.push(z);save();if(typeof toast==='function')toast(`🧭 Đã ghi nhận khám phá: ${['Nhà gỗ','Rừng linh hồn','Thác Ngân Hà','Hồ Trăng'][z]}`);}}
  // Count completed mini-games from the existing mini-game reward flow without replacing its handlers.
  const originalToast=typeof toast==='function'?toast:null;
  if(originalToast && !window.__RDD_IX_TOAST){
    window.__RDD_IX_TOAST=true;
    toast=function(msg,...args){if(typeof msg==='string'&&msg.includes('Mini game kết thúc'))state.minigames++;return originalToast(msg,...args);};
  }
  ensure();addCss();applyCompanionBonuses();
  setInterval(()=>{if(document.hidden)return;try{detectZone();checkAchievements();}catch(_){}},5000);
  save();
})();



/* ARTISAN VII — GRAND UNIFIED SYSTEMS (single integration layer) */
(()=>{'use strict';
 const $q=s=>document.querySelector(s);
 const OLD_E='rdd_expansion_v1', OLD_I='rdd_artisan_ix';
 const safeObj=k=>{try{const v=JSON.parse(localStorage.getItem(k)||'null');return v&&typeof v==='object'?v:null}catch(_){return null}};
 // One-time migration: old fragmented state is folded into S and committed to rdd5.
 try{
   const oldE=safeObj(OLD_E), oldI=safeObj(OLD_I);
   if(oldE) S.expansion={...(S.expansion||{}),...oldE,skill:{...((S.expansion||{}).skill||{}),...(oldE.skill||{})}};
   if(oldI) S.artisanIX={...(S.artisanIX||{}),...oldI};
   S.expansion=S.expansion||{essence:0,skill:{touch:0,idle:0,fortune:0},garden:0,discovered:[],log:[]};
   S.artisanIX=S.artisanIX||{pets:[],claimed:[],minigames:0,expeditions:0,garden:0,zones:[0],petLevels:{}};
   // Preserve all existing game keys while merging the addon records.
   localStorage.setItem('rdd5',JSON.stringify(S));
   if(oldE) localStorage.removeItem(OLD_E); if(oldI) localStorage.removeItem(OLD_I);
 }catch(e){console.warn('[Artisan VII] migration deferred',e)}
 // Save every integrated subsystem through the canonical S object.
 const originalSave=typeof save==='function'?save:null;
 window.save=function(){
   if(window.__RDD_RESETTING) return;
   try{if(typeof E!=='undefined')S.expansion=E}catch(_){}
   try{if(typeof state!=='undefined')S.artisanIX=state}catch(_){}
   if(originalSave) return originalSave();
   try{localStorage.setItem('rdd5',JSON.stringify(S))}catch(_){}
 };
 // Compact, unified control dock; legacy expansion launchers remain reachable through one menu.
 const css=document.createElement('style');css.textContent=`
 #rdd-vii-panel{display:none;position:fixed;z-index:1301;right:8px;bottom:calc(env(safe-area-inset-bottom,0px) + 60px);width:min(310px,calc(100vw - 24px));padding:12px;border:1px solid #a9bff044;border-radius:17px;background:#081128f5;color:#e8efff;box-shadow:0 12px 40px #000b;font:12px system-ui}
 #rdd-vii-panel.open{display:block} #rdd-vii-panel h3{margin:2px 0 9px;color:#ffe5a0;font-size:14px} #rdd-vii-panel p{margin:6px 0;color:#bdc9e4;line-height:1.45} #rdd-vii-panel .vii-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px} #rdd-vii-panel button{border:1px solid #9cb6ef44;border-radius:10px;background:#172344;color:#fff0bd;padding:8px;font:inherit}
 `;document.head.appendChild(css);
 const panel=document.createElement('section');panel.id='rdd-vii-panel';panel.innerHTML='<h3>Rừng Đom Đóm</h3><div id="rdd-vii-body"></div>';
 document.body.append(panel);
 // Utility controls live inside the existing Settings tab instead of a floating dock.
 const settingsTab=$q('#tabs [data-t="4"]');
 settingsTab?.addEventListener('click',()=>setTimeout(()=>{const cfg=$q('#cfg');if(cfg&&!cfg.querySelector('[data-vii="diag"]'))cfg.insertAdjacentHTML('beforeend','<div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0"><button class="cfg-btn" data-vii="audio">🔊 Âm thanh</button><button class="cfg-btn" data-vii="systems">🌿 Hệ thống mở rộng</button><button class="cfg-btn" data-vii="diag">🛠 Chẩn đoán</button><button class="cfg-btn" data-vii="custom">🎨 Tùy biến</button></div>')},0));
 const show=(html)=>{ $q('#rdd-vii-body').innerHTML=html;panel.classList.add('open') };
 const close=()=>panel.classList.remove('open');
 let musicNodes=[], musicIndex=-1, audioGain=null, waterGain=null, fireGain=null, audioTimer=null;
 const tracks=[
  {name:'Nhà gỗ · Lò sưởi êm',notes:[0,2,4,7,4,2],tempo:2.8},
  {name:'Rừng linh hồn · Đom đóm',notes:[0,4,7,9,7,4],tempo:2.2},
  {name:'Thác ngân hà · Dòng sao',notes:[0,2,7,11,9,7],tempo:1.8},
  {name:'Hồ trăng · Khúc ngân bạc',notes:[0,5,7,12,9,5],tempo:3.2}
 ];
 function startTrack(force=false){
  if(!A||!S.snd)return; const zone=inside?0:Math.max(0,Math.min(3,Math.round((cam||0)/Math.max(1,W))));
  if(!force&&zone===musicIndex)return; stopTrack(); musicIndex=zone;
  try{
   audioGain=A.createGain();audioGain.gain.value=.045;audioGain.connect(master||A.destination);
   const filter=A.createBiquadFilter();filter.type='lowpass';filter.frequency.value=zone===0?850:zone===2?2600:1800;filter.connect(audioGain);
   waterGain=A.createGain();waterGain.gain.value=zone===2?.012:0;const noise=A.createBufferSource();const buf=A.createBuffer(1,A.sampleRate*2,A.sampleRate);const dat=buf.getChannelData(0);for(let i=0;i<dat.length;i++)dat[i]=Math.random()*2-1;noise.buffer=buf;noise.loop=true;const bp=A.createBiquadFilter();bp.type='bandpass';bp.frequency.value=zone===2?520:220;noise.connect(bp);bp.connect(waterGain);waterGain.connect(master||A.destination);noise.start();musicNodes.push(noise,bp,waterGain);
   if(zone===0){fireGain=A.createGain();fireGain.gain.value=.006;const fb=A.createBiquadFilter();fb.type='lowpass';fb.frequency.value=650;const fn=A.createBufferSource();fn.buffer=buf;fn.loop=true;fn.connect(fb);fb.connect(fireGain);fireGain.connect(master||A.destination);fn.start();musicNodes.push(fn,fb,fireGain)}
   let step=0; const play=()=>{if(!A||!S.snd||musicIndex!==zone)return;const t=A.currentTime;const n=tracks[zone].notes[step++%tracks[zone].notes.length];const o=A.createOscillator(),g=A.createGain();o.type=zone===2?'sine':'triangle';o.frequency.value=196*Math.pow(2,n/12);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.12,t+.08);g.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(g);g.connect(filter);o.start(t);o.stop(t+1.9);musicNodes.push(o,g);if(musicNodes.length>40)musicNodes.splice(0,musicNodes.length-30)};
   play();audioTimer=setInterval(play,tracks[zone].tempo*1000);
  }catch(e){console.warn('[Artisan VII audio]',e)}
 }
 function stopTrack(){if(audioTimer)clearInterval(audioTimer);audioTimer=null;for(const n of musicNodes){try{if(n.stop)n.stop();if(n.disconnect)n.disconnect()}catch(_){}}musicNodes=[];audioGain=waterGain=fireGain=null}
 // Existing A is the only AudioContext. Audio starts after a deliberate user gesture.
 function ensureAudio(){if(typeof initAudio==='function')initAudio();if(A&&A.state==='suspended')A.resume().catch(()=>{});startTrack(true)}
 // Weather mechanics are applied as multipliers to the existing economy, not by replacing the economy.
 const weatherNames=['Đêm quang','Mưa đêm','Bụi tiên','Sương mù','Gió lá'];
 const weatherBuff=()=>({star:S.wth===0?1.3:1,flora:S.wth===1?1.5:1,garden:S.wth===1?2:1,firefly:S.wth===2?10:6,rare:S.wth===3?2:1,speed:S.wth===4?1.25:1,combo:S.wth===4?4:2.2});
 // Weather and zone multipliers are integrated in the core cps()/tapPow() formulas.
 // Zone and weather badges, displayed without adding another HUD cluster.
 function addBadges(){let el=$q('#badges');if(!el){el=document.createElement('div');el.id='badges';el.style.cssText='position:absolute;left:8px;top:8px;z-index:8;display:flex;gap:4px;flex-wrap:wrap;pointer-events:none';$q('#stage')?.appendChild(el)}
  const z=inside?0:Math.max(0,Math.min(3,Math.round((cam||0)/Math.max(1,W))));const zones=[['🏡','Nhà gỗ','+15% nội thất'],['🌲','Rừng linh hồn','+20% phép màu'],['💧','Thác ngân hà','+25% chạm'],['🌙','Hồ trăng','+20% tinh hoa']];const b=weatherBuff();el.innerHTML=`<span>${zones[z][0]} ${zones[z][1]} · ${zones[z][2]}</span><span>${['🌙','🌧️','🧚','🌫️','🍃'][S.wth||0]} ${weatherNames[S.wth||0]}</span>`;el.style.cssText+=';font:600 10px system-ui;color:#fff1c0;text-shadow:0 1px 5px #000;background:#07112788;border-radius:10px;padding:4px 6px;max-width:calc(100% - 16px)';}
 // Procedural vector companions with clear gait, tail/wing animation and ground shadows; no emoji on canvas.
 const companionDefs=[
  {id:'cat',idx:0,body:'#8e92ad',light:'#e0d8ff',kind:'cat'}, {id:'fox',idx:1,body:'#e77c45',light:'#ffd38b',kind:'fox'}, {id:'owl',idx:2,body:'#8a6a9d',light:'#e2c6ff',kind:'owl'},
  {id:'squirrel',idx:3,body:'#bd7a48',light:'#ffe0a1',kind:'squirrel'}, {id:'hedgehog',idx:4,body:'#a78363',light:'#f0d3a9',kind:'hedgehog'}, {id:'turtle',idx:5,body:'#4c9d86',light:'#b5f1cc',kind:'turtle'},
  {id:'deer',idx:6,body:'#bf9a67',light:'#fff0b5',kind:'deer'}, {id:'hare',idx:7,body:'#d8d9e8',light:'#fff',kind:'hare'}, {id:'moth',idx:8,body:'#8e7fe0',light:'#e8dfff',kind:'moth'}, {id:'otter',idx:9,body:'#9c6f59',light:'#f5cba6',kind:'otter'}, {id:'crane',idx:10,body:'#e4e7f1',light:'#fff',kind:'crane'}, {id:'wyrm',idx:11,body:'#4da58d',light:'#b8ffca',kind:'wyrm'}
 ];
 // Species-specific physical scale in the shared world. Values are relative to the cat-sized baseline.
 // Tiny invertebrates stay small; long-legged birds and deer read taller; the young wyrm is
 // intentionally larger than a squirrel but still clearly a juvenile dragon, not a giant.
 // Phase 5.42: strong, deliberate physical scale hierarchy. Values multiply
 // the complete silhouette, not just the glow; small insects remain genuinely small.
 const SPECIES_SCALE={
  // Phase 5.50: recalibrated against the player silhouette, not the old tiny 17-36px pet baseline.
  // Mammals/birds are enlarged enough to read at normal zoom; small species remain visibly smaller.
  cat:.98, fox:1.08, owl:.98, squirrel:.62, hedgehog:.58, turtle:.62,
  deer:1.22, hare:.76, moth:.38, otter:.92, crane:1.2,
  // The dragon is a large aerial creature: its wingspan should be several times the avatar's height.
  wyrm:1.15
 };
 // The anatomy is not isotropic: each species has its own body proportions.
 // Values are applied to the complete silhouette, including markings and limbs.
 const SPECIES_SHAPE={
  cat:[1.12,.96], fox:[1.22,1.00], owl:[.92,1.14], squirrel:[.86,1.12],
  hedgehog:[1.10,.80], turtle:[1.10,.82], deer:[1.0,1.08], hare:[1.00,1.10],
  moth:[1.30,.78], otter:[1.28,.78], crane:[.82,1.22], wyrm:[1.34,1.08]
 };
 const petPos=[];
 function blob(ctx,pts,fill){ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.quadraticCurveTo(pts[i-1][0],pts[i-1][1],pts[i][0],pts[i][1]);ctx.closePath();ctx.fillStyle=fill;ctx.fill()}
 let _pc=null,_px=null;
 function drawPet(ctx,p,t,scale,moving=false,cozy=false){
  const k=p.kind, shp=(SPECIES_SHAPE[k]||[1,1]), Q=2;
  const wz=k==='wyrm'?1.45:1, bw=Math.ceil(130*scale*Math.max(1,shp[0])*wz), bh=Math.ceil(120*scale*Math.max(1,shp[1])*wz);
  if(!_pc){_pc=document.createElement('canvas');_px=_pc.getContext('2d');}
  const cw=bw*Q, ch=(bh+12)*Q; if(_pc.width!==cw||_pc.height!==ch){_pc.width=cw;_pc.height=ch;} else _px.clearRect(0,0,cw,ch);
  _px.setTransform(Q,0,0,Q,bw*Q/2,bh*Q);
  drawPet0(_px,p,t,scale,moving,cozy);
  _px.setTransform(1,0,0,1,0,0); _px.globalCompositeOperation='source-atop';
  let g=_px.createLinearGradient(0,0,0,bh*Q);
  g.addColorStop(0,'rgba(205,225,255,.30)'); g.addColorStop(.4,'rgba(205,225,255,.04)'); g.addColorStop(.8,'rgba(0,0,0,.12)'); g.addColorStop(1,'rgba(4,8,22,.45)');
  _px.fillStyle=g; _px.fillRect(0,0,cw,ch);
  g=_px.createLinearGradient(cw*.15,0,cw*.85,0); g.addColorStop(0,'rgba(0,0,0,.16)'); g.addColorStop(.55,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(190,215,255,.18)');
  _px.fillStyle=g; _px.fillRect(0,0,cw,ch); {const tr=(typeof tierOf==='function')?tierOf(petVisualLevel(p)):0;
   if(tr>=2){let g2=_px.createLinearGradient(0,0,0,bh*Q);g2.addColorStop(0,evoRGBA(p.light,.10*tr));g2.addColorStop(.6,evoRGBA(p.light,.03*tr));g2.addColorStop(1,evoRGBA(p.body,.07*tr));_px.fillStyle=g2;_px.fillRect(0,0,cw,ch);
    if(tr>=3){const g3=_px.createLinearGradient(cw*.2,0,cw*.8,ch*.5);g3.addColorStop(0,'rgba(255,255,255,0)');g3.addColorStop(.5,'rgba(255,255,255,'+(.07*tr)+')');g3.addColorStop(1,'rgba(255,255,255,0)');_px.fillStyle=g3;_px.fillRect(0,0,cw,ch);}}}
  _px.globalCompositeOperation='source-over';
  ctx.drawImage(_pc,-bw/2,-bh,bw,bh+12);
 }
 function drawPet0(ctx,p,t,scale,moving=false,cozy=false){
  const k=p.kind, s=scale, gait=moving?Math.sin(t/115+p.idx)*1.7:Math.sin(t/760+p.idx)*.18;
  const tail=Math.sin(t/310+p.idx)*2.0, breath=1+Math.sin(t/430+p.idx*1.7)*.018;
  // Keep animation parameters local to this renderer; moth wings use this phase.
  const wing=Math.sin(t/235+p.idx)*2.0;
  ctx.save();
  // Scale the silhouette once, then correct each species' anatomy independently.
  // This avoids the previous mistake of enlarging both the placement metrics and the drawing twice.
  const shape=SPECIES_SHAPE[k]||[1,1];
  ctx.scale(s*shape[0],s*shape[1]); ctx.scale(1,breath);
  ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over'; ctx.lineCap='round'; ctx.lineJoin='round';
  // Flyers do not carry a shadow in mid-air; their contact shadow is drawn at ground level.
  if(k!=='moth'&&k!=='owl'){const shade=ctx.createRadialGradient(0,2,1,0,2,19); shade.addColorStop(0,'rgba(3,7,17,.26)');shade.addColorStop(1,'rgba(3,7,17,0)');ctx.fillStyle=shade;ctx.beginPath();ctx.ellipse(0,2,19,4.5,0,0,Math.PI*2);ctx.fill();}
  const grad=ctx.createLinearGradient(-16,-30,14,2);grad.addColorStop(0,p.light);grad.addColorStop(.55,p.body);grad.addColorStop(1,'#283047');
  // Canvas ellipse radii must never be negative; normalize legacy species dimensions safely.
  const ell=(cx,cy,rx,ry,rot=0,col=grad)=>{rx=Math.abs(Number(rx)||0);ry=Math.abs(Number(ry)||0);if(rx<0.01||ry<0.01)return;ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,rot,0,Math.PI*2);ctx.fill()};
  const path=(pts,col=grad,lw=1.5)=>{ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.stroke()};
  const leg=(x0,y0,x1,y1,col=p.body,lw=2.2)=>path([[x0,y0],[x0+(x1-x0)*.45+gait*.45,y0+(y1-y0)*.5],[x1+gait,y1]],col,lw);
  if(cozy) ctx.translate(0,2);
  // Each animal has its own anatomy and silhouette; no shared generic body/head template.
  if(k==='cat'){
    // Compact feline: horizontal torso, short legs, triangular ears, muzzle, whiskers and curled tail.
    ctx.strokeStyle=p.body;ctx.lineWidth=4.2;ctx.beginPath();ctx.moveTo(-11,-10);ctx.bezierCurveTo(-20,-11,-20,-22,-14,-23);ctx.bezierCurveTo(-9,-24,-8,-19,-12,-18+tail*.12);ctx.stroke();
    ell(-1,-10,12,6.4,.04);ell(8,-17,6.4,6.2,.08);
    ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(3,-21);ctx.lineTo(3,-29);ctx.lineTo(8,-24);ctx.lineTo(12,-29);ctx.lineTo(14,-20);ctx.closePath();ctx.fill();
    ctx.fillStyle='#e9aabd';ctx.beginPath();ctx.moveTo(5,-23);ctx.lineTo(5,-27);ctx.lineTo(8,-24);ctx.moveTo(11,-23);ctx.lineTo(12,-27);ctx.lineTo(13,-22);ctx.fill();
    ell(13,-15,3.8,2.7,.12,'#f4e8dc');ell(16,-16,1.1,.9,0,'#262035');ell(9,-18,1.15,1.7,0,'#f8d96e');ell(9.4,-18,0.45,1.25,0,'#1b2132');
    path([[13,-15,],[19,-18],[22,-18]],'#f6eadb',.65);path([[13,-14],[20,-14],[22,-12]],'#f6eadb',.65);path([[12,-14],[18,-11],[21,-10]],'#f6eadb',.65);
    ell(0,-9,3.2,4.2,0,'#eee5e7');
    if(!cozy){leg(-7,-6,-8,0);leg(-1,-5,0,0);leg(6,-6,7,0);leg(10,-6,11,0);}
  } else if(k==='fox'){
    // Fox: long pointed muzzle, tall ears, russet back, cream bib and unmistakable brush tail.
    ctx.strokeStyle=grad;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(-8,-11);ctx.bezierCurveTo(-18,-15,-20,-25,-13,-28);ctx.bezierCurveTo(-5,-30,-5,-20,-12,-20);ctx.stroke();path([[-18,-25],[-14,-28],[-10,-25]],'#fff3df',2.8);
    ell(-1,-11,13,6,.02,'#c95e32');ell(8,-15,6.2,5.6,.02,'#e77b42');
    ctx.fillStyle='#d96a37';ctx.beginPath();ctx.moveTo(4,-19);ctx.lineTo(2,-29);ctx.lineTo(9,-22);ctx.moveTo(10,-20);ctx.lineTo(14,-28);ctx.lineTo(15,-18);ctx.fill();
    ctx.fillStyle='#f5d6bd';ctx.beginPath();ctx.moveTo(8,-15);ctx.lineTo(17,-15);ctx.lineTo(21,-13);ctx.lineTo(16,-11);ctx.lineTo(10,-12);ctx.closePath();ctx.fill();
    ell(20,-13,1.2,1,0,'#201b25');ell(10,-17,1.2,1.4,0,'#f7d76f');ell(-2,-6,3.2,3.4,0,'#fff0d9');
    if(!cozy){leg(-7,-6,-8,0,'#6b382d');leg(0,-5,1,0,'#6b382d');leg(7,-6,8,0,'#6b382d');leg(11,-6,12,0,'#6b382d');}
  } else if(k==='deer'){
const lg=(x0,ph)=>{const a=moving?Math.sin(t/115+p.idx+ph)*2.6:0;ctx.strokeStyle='#5b4330';ctx.lineWidth=1.7;ctx.beginPath();ctx.moveTo(x0,-15);ctx.lineTo(x0+a*.5,-8);ctx.lineTo(x0+a,-.5);ctx.stroke();ctx.fillStyle='#2a1f19';ctx.fillRect(x0+a-1,-1.6,2.2,1.6);};
  lg(-9,0);lg(-6,2.6);lg(7,1.3);lg(10,3.9);
  ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(-12,-20);ctx.bezierCurveTo(-13,-13,-4,-11,3,-12);ctx.bezierCurveTo(10,-12,13,-15,12,-20);ctx.bezierCurveTo(10,-24,-4,-24,-12,-20);ctx.fill();
  ctx.fillStyle='rgba(255,240,205,.55)';ctx.beginPath();ctx.ellipse(0,-13.6,9,2.1,0,0,7);ctx.fill();
  ctx.fillStyle='rgba(255,246,222,.75)';for(let q=0;q<7;q++){ctx.beginPath();ctx.arc(-9+q*3.2,-19.5+(q%2)*2.6,.9,0,7);ctx.fill();}
  ell(-12.6,-19.5,1.6,2.6,.5,'#fff3dc');
  ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(7,-21);ctx.bezierCurveTo(10,-25,11,-29,13,-32);ctx.lineTo(16.2,-30.5);ctx.bezierCurveTo(14.5,-27,13.5,-22,12.5,-17);ctx.closePath();ctx.fill();
  ell(15.2,-31.6,4.2,2.7,.45,'#c8a574');ell(18,-30.4,2,1.5,.45,'#e8d2ae');ell(19.4,-30,.8,.7,0,'#241a1a');ell(12.7,-34,1.3,2.6,-.5,'#b88f5e');ell(15.2,-32.6,.65,.65,0,'#1b1414');
  ctx.strokeStyle=p.light;ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(13.8,-34);ctx.quadraticCurveTo(12,-39,13,-44);ctx.moveTo(12.6,-38.5);ctx.lineTo(9.6,-41.5);ctx.moveTo(13,-42);ctx.lineTo(16,-44.5);ctx.moveTo(15.2,-34.2);ctx.quadraticCurveTo(17,-38.5,20,-40.5);ctx.moveTo(17.2,-37.2);ctx.lineTo(18.4,-41);ctx.stroke();
  } else if(k==='owl'){
const bl=(Math.sin(t/2300+p.idx)>.985)?.25:1;
  ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(0,-30);ctx.bezierCurveTo(-9,-28,-11,-18,-8,-9);ctx.bezierCurveTo(-5,-3,5,-3,8,-9);ctx.bezierCurveTo(11,-18,9,-28,0,-30);ctx.fill();
  ctx.strokeStyle='rgba(30,20,50,.35)';ctx.lineWidth=.7;for(let r=0;r<5;r++)for(let c=0;c<4;c++){ctx.beginPath();ctx.arc(-4.5+c*3+(r%2)*1.5,-17+r*3,1.7,0,Math.PI);ctx.stroke();}
  ell(0,-12,5,6.5,0,'rgba(236,224,246,.55)');
  ctx.fillStyle='rgba(60,42,86,.78)';for(const sd of [-1,1]){ctx.beginPath();ctx.moveTo(sd*8,-24);ctx.bezierCurveTo(sd*13,-17,sd*11,-8,sd*6,-5);ctx.bezierCurveTo(sd*7,-12,sd*6,-19,sd*5,-24);ctx.fill();}
  ell(-3.6,-24,3.9,4.2,0,'#efe3f6');ell(3.6,-24,3.9,4.2,0,'#efe3f6');
  ell(-3.6,-24,2.5,2.5*bl,0,'#f4c84a');ell(3.6,-24,2.5,2.5*bl,0,'#f4c84a');ell(-3.6,-24,1.2,1.5*bl,0,'#1a1220');ell(3.6,-24,1.2,1.5*bl,0,'#1a1220');
  ctx.fillStyle='#d9a441';ctx.beginPath();ctx.moveTo(0,-23);ctx.lineTo(-1.2,-20.4);ctx.lineTo(1.2,-20.4);ctx.fill();
  ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(-6,-28);ctx.lineTo(-7.5,-34);ctx.lineTo(-2.5,-30);ctx.moveTo(6,-28);ctx.lineTo(7.5,-34);ctx.lineTo(2.5,-30);ctx.fill();
  ctx.strokeStyle='#d9a441';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-3,-3);ctx.lineTo(-4,0);ctx.moveTo(-1.5,-3);ctx.lineTo(-1.6,0);ctx.moveTo(3,-3);ctx.lineTo(4,0);ctx.moveTo(1.5,-3);ctx.lineTo(1.6,0);ctx.stroke();
  } else if(k==='squirrel'){
    // Squirrel: upright chest, oversized curled plume tail, tiny paws and rounded ears.
    ctx.strokeStyle='#b96c3e';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-7,-9);ctx.bezierCurveTo(-20,-7,-22,-21,-16,-26);ctx.bezierCurveTo(-7,-33,-3,-22,-11,-19);ctx.stroke();path([[-18,-25],[-15,-27],[-12,-23]],'#f7d7a2',2);
    ell(-1,-10,8,8,.1,'#c9844d');ell(5,-18,5,5,.1,'#d99a5c');ell(7,-18,4,4,0,'#f2d0a4');
    ctx.fillStyle='#c9844d';ctx.beginPath();ctx.moveTo(2,-21);ctx.lineTo(1,-27);ctx.lineTo(6,-23);ctx.moveTo(7,-22);ctx.lineTo(11,-26);ctx.lineTo(11,-20);ctx.fill();
    ell(9,-18,1,1.2,0,'#171b2a');ell(11,-15,1.3,.8,0,'#f4dfc6');
    if(!cozy){leg(-3,-4,-4,0);leg(2,-4,3,0);}path([[1,-12],[5,-10],[7,-12]],'#f3d8b1',1.4);
  } else if(k==='hedgehog'){
    // Low body, cream face and individually readable short spines.
    ell(0,-9,12,6.5,0,'#bd9a79');ell(8,-11,5,4,0,'#f1d6b5');
    ctx.fillStyle='#66514a';ctx.beginPath();ctx.moveTo(-11,-10);for(let i=0;i<9;i++){const xx=-11+i*2.4;ctx.lineTo(xx,-13-(i%2?4:6));}ctx.lineTo(7,-12);ctx.closePath();ctx.fill();
    ell(12,-12,1,1,0,'#24202a');ell(13,-10,.8,.7,0,'#33202a');
    if(!cozy){leg(-5,-5,-5,0);leg(4,-5,5,0);}
  } else if(k==='turtle'){
    // Dome shell with scute seams, visible head and four short feet.
    ell(-1,-9,12,7,0,'#4c8e68');ctx.fillStyle='#397255';ctx.beginPath();ctx.moveTo(-12,-9);ctx.quadraticCurveTo(-10,-22,0,-21);ctx.quadraticCurveTo(10,-21,11,-9);ctx.closePath();ctx.fill();
    ctx.strokeStyle='#a6d49a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-6,-18);ctx.lineTo(-3,-12);ctx.lineTo(3,-12);ctx.lineTo(6,-18);ctx.moveTo(0,-20);ctx.lineTo(0,-12);ctx.stroke();
    ell(12,-10,4.5,3.8,0,'#78b99a');ell(14,-11,1,1,0,'#20332f');
    if(!cozy){ell(-8,-3,3,2,0,'#6eae8b');ell(6,-3,3,2,0,'#6eae8b');}
  } else if(k==='hare'){
    // Long ears, strong hindquarters, small forequarters and a white cotton tail.
    ell(-1,-10,11,6.5,-.12,'#d5d9e8');ell(-7,-10,5.4,5.1,0,'#e8eaf3');ell(7,-16,5.5,4.7,.1,'#e5e7f1');
    ctx.save();ctx.rotate(Math.sin(t/350+p.idx)*.06);ell(5,-27,2.2,9,-.15,'#d8dce9');ell(10,-26,2.1,8,.12,'#d8dce9');ell(5,-27,1,6,-.15,'#efb7ca');ell(10,-26,1,5,.12,'#efb7ca');ctx.restore();
    ell(-12,-11,3.2,3.2,0,'#fff');ell(11,-16,1,1,0,'#29263a');ell(14,-14,1.3,.9,0,'#eaa8bc');
    if(!cozy){leg(-5,-5,-7,0);leg(4,-5,5,0);}
  } else if(k==='moth'){
    // Small nocturnal moth: broad scaled wings, narrow abdomen and long antennae.
    // Each wing pivots independently; the moth never uses a quadruped gait or pounce.
    const flapAngle=.20+Math.sin(t/62+p.idx)*.48;
    ctx.save();ctx.translate(0,-13);
    ctx.save();ctx.rotate(-flapAngle);
    ctx.fillStyle='#8d7bd0';ctx.beginPath();ctx.moveTo(0,1);ctx.quadraticCurveTo(-12,-15,-25,-10);ctx.quadraticCurveTo(-27,-2,-8,5);ctx.closePath();ctx.fill();
    ctx.strokeStyle='#d9d0ff';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(-2,1);ctx.lineTo(-23,-8);ctx.moveTo(-5,2);ctx.lineTo(-20,-2);ctx.stroke();ctx.restore();
    ctx.save();ctx.rotate(flapAngle);
    ctx.fillStyle='#a99ae9';ctx.beginPath();ctx.moveTo(0,1);ctx.quadraticCurveTo(12,-15,25,-10);ctx.quadraticCurveTo(27,-2,8,5);ctx.closePath();ctx.fill();
    ctx.strokeStyle='#eee5ff';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(2,1);ctx.lineTo(23,-8);ctx.moveTo(5,2);ctx.lineTo(20,-2);ctx.stroke();ctx.restore();
    ctx.save();ctx.rotate(-.16-Math.abs(Math.sin(t/62+p.idx))*.12);ell(-2,3,8,3.1,-.12,'#c9baf4');ctx.restore();
    ctx.save();ctx.rotate(.16+Math.abs(Math.sin(t/62+p.idx))*.12);ell(2,3,8,3.1,.12,'#d8ccff');ctx.restore();
    ctx.restore();
    ell(0,-13,1.8,7.5,0,'#4d427b');ell(0,-19,2.1,2.2,0,'#bba8f0');
    path([[-1,-19],[-4,-24],[-7,-25]],'#c7b8ff',.85);path([[1,-19],[4,-24],[7,-25]],'#c7b8ff',.85);
    // Six tiny legs are visible only as fine appendages; they do not animate as walking legs.
    path([[-1,-10],[-3,-7]],'#6f619e',.7);path([[1,-10],[3,-7]],'#6f619e',.7);
  } else if(k==='otter'){
    // Sleek low body, tapered tail, pale throat and whiskered muzzle.
    ctx.strokeStyle='#95694f';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-8,-9);ctx.quadraticCurveTo(-17,-8,-20,-3);ctx.stroke();ell(-1,-10,13,5.5,-.08,'#9c6f59');ell(9,-13,5.2,4.5,.1,'#ad8268');ell(5,-7,5,3,0,'#f2d2ae');ell(13,-12,2.5,1.8,0,'#e8c7a6');ell(13,-14,1,1,0,'#29232b');path([[12,-11],[17,-13]],'#f0dec6',.6);path([[12,-10],[17,-9]],'#f0dec6',.6);
    if(!cozy){leg(-6,-6,-7,0);leg(4,-5,5,0);}
  } else if(k==='crane'){
    // Tall wading bird: long legs, S-shaped neck, narrow bill and folded wing.
    ell(-1,-12,8,4.3,.08,'#e1e5ef');ell(-4,-12,5,2.5,-.3,'#c4ccdb');
    path([[-4,-9],[-5,-3],[-6,0]],'#c7d2e6',1.5);path([[1,-9],[2,-3],[2,0]],'#c7d2e6',1.5);
    ctx.strokeStyle='#e4e8f2';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(3,-13);ctx.quadraticCurveTo(8,-17,6,-23);ctx.quadraticCurveTo(5,-27,9,-28);ctx.stroke();ell(10,-29,2.5,2,0,'#e9edf5');path([[11,-29],[17,-28]],'#e6a969',1.2);
    ctx.fillStyle='#bd4d59';ctx.beginPath();ctx.ellipse(9,-31,1.1,2,0,0,Math.PI*2);ctx.fill();
  } else if(k==='wyrm'){
    // Rồng vẽ lại: thân là một ống cong liền mạch có đổ bóng, cổ chữ S, đầu có sừng, hai cánh có xương ngón.
    const fl=Math.sin(t/265+p.idx*.65);
    const SEG=[[[-64,-22],[-40,-12],[-30,-40],[-8,-31]],[[-8,-31],[10,-24],[26,-30],[26,-44]],[[26,-44],[26,-55],[34,-60],[41,-55]]];
    const RK=[[0,.8],[.16,2.2],[.36,6.2],[.5,8.6],[.6,8],[.74,4.8],[.9,4.2],[1,3.8]];
    const rad=u=>{for(let k=1;k<RK.length;k++){if(u<=RK[k][0]){const f=(u-RK[k-1][0])/(RK[k][0]-RK[k-1][0]);return RK[k-1][1]+(RK[k][1]-RK[k-1][1])*f;}}return 3.8;};
    const bz=(c,f)=>{const m=1-f;return [m*m*m*c[0][0]+3*m*m*f*c[1][0]+3*m*f*f*c[2][0]+f*f*f*c[3][0],m*m*m*c[0][1]+3*m*m*f*c[1][1]+3*m*f*f*c[2][1]+f*f*f*c[3][1]];};
    const pts=[];SEG.forEach((c,si)=>{for(let k=0;k<44;k++){const f=k/44,pt=bz(c,f);pts.push({x:pt[0],y:pt[1],r:rad((si*44+k)/132)});}});
    const wing=(ph,alpha,c0,c1)=>{
      const ang=-.7+Math.sin(t/265+p.idx*.65+ph)*.65;
      ctx.save();ctx.translate(2,-37);ctx.rotate(ang);ctx.scale(1.25,1.25);
      const g=ctx.createLinearGradient(0,0,-46,-46);g.addColorStop(0,c0);g.addColorStop(1,c1);
      ctx.globalAlpha=alpha;ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-9,-26);
      ctx.quadraticCurveTo(-24,-44,-47,-50);ctx.quadraticCurveTo(-36,-38,-38,-30);
      ctx.quadraticCurveTo(-27,-30,-27,-19);ctx.quadraticCurveTo(-18,-19,-16,-8);ctx.quadraticCurveTo(-8,-5,0,0);ctx.fill();
      ctx.globalAlpha=Math.min(1,alpha+.1);ctx.strokeStyle='rgba(20,60,64,.85)';ctx.lineWidth=1.6;ctx.lineCap='round';ctx.beginPath();
      ctx.moveTo(0,0);ctx.lineTo(-9,-26);ctx.quadraticCurveTo(-24,-44,-47,-50);ctx.moveTo(-9,-26);ctx.lineTo(-38,-30);ctx.moveTo(-9,-26);ctx.lineTo(-27,-19);ctx.moveTo(-9,-26);ctx.lineTo(-16,-8);ctx.stroke();
      ctx.restore();ctx.globalAlpha=1;
    };
    wing(.7,.78,'#2c6f73','#14383f');
    const lgs=Math.sin(t/330+p.idx)*2;ctx.strokeStyle='#1d5656';ctx.lineWidth=2.4;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(-9,-25);ctx.lineTo(-11+lgs*.4,-18);ctx.lineTo(-8+lgs,-13);ctx.moveTo(8,-26);ctx.lineTo(10-lgs*.4,-19);ctx.lineTo(13-lgs,-14);ctx.stroke();
    ell(-8+lgs,-12.4,2.2,1.2,0,'#ead9ad');ell(13-lgs,-13.4,2.2,1.2,0,'#ead9ad');
    const pass=(dx,dy,sc,col,al)=>{ctx.globalAlpha=al;ctx.fillStyle=col;pts.forEach(q=>{ctx.beginPath();ctx.arc(q.x+dx,q.y+dy*q.r/8,q.r*sc,0,7);ctx.fill();});ctx.globalAlpha=1;};
    pass(0,0,1,'#1f625f',1);pass(0,-.8,.82,'#3b9886',.9);pass(0,-2.2,.45,'#7fd0b4',.5);
    ctx.globalAlpha=.85;ctx.fillStyle='#ecdfbc';pts.forEach((q,k)=>{if(k>18&&k<112){ctx.beginPath();ctx.arc(q.x+1,q.y+q.r*.52,q.r*.38,0,7);ctx.fill();}});ctx.globalAlpha=1;
    ctx.fillStyle='#8ad7bc';for(let k=24;k<126;k+=8){const q=pts[k],q2=pts[k+1],an=Math.atan2(q2.y-q.y,q2.x-q.x)-1.5708,h=1.2+q.r*.26;ctx.beginPath();ctx.moveTo(q.x+Math.cos(an)*q.r*.9-1.1,q.y+Math.sin(an)*q.r*.9);ctx.lineTo(q.x+Math.cos(an)*(q.r*.9+h),q.y+Math.sin(an)*(q.r*.9+h));ctx.lineTo(q.x+Math.cos(an)*q.r*.9+1.1,q.y+Math.sin(an)*q.r*.9);ctx.fill();}
    ell(-64,-24,6,2.2,-.55,'#2f8d80');
    ell(41,-56,7.4,4.6,.22,'#2b7d71');ell(46.5,-53.6,5.2,3.1,.28,'#2f8d80');ell(44,-51.4,5,1.6,.2,'#ecdfbc');ell(50,-53.6,.8,.6,0,'#12302f');
    ctx.fillStyle='#ffd25a';ctx.beginPath();ctx.ellipse(41.6,-57.5,1.9,1.5,.2,0,7);ctx.fill();ctx.fillStyle='#17110f';ctx.beginPath();ctx.ellipse(42,-57.5,.6,1.2,0,0,7);ctx.fill();
    ctx.strokeStyle='#ead9ad';ctx.lineWidth=1.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(37,-59);ctx.quadraticCurveTo(31,-63,26,-60);ctx.moveTo(39,-60);ctx.quadraticCurveTo(35,-66,30,-67);ctx.stroke();
    wing(0,.92,'#7fd0c0','#2b7378');
  
  } else if(k==='fox'){
    // Distinct pale tail tip, chest bib and a few short fur strokes.
    path([[-17,-25],[-15,-22],[-12,-21]],'#fff0d7',1.5);path([[5,-12],[7,-9],[10,-10]],'#ffe5c7',1.0);
    path([[-5,-14],[-2,-15],[1,-14]],'#f3a16d',.65);
  } else if(k==='deer'){
    // Back spots and a pale throat are kept on the torso, never floating outside the body.
    for(const [sx,sy] of [[-8,-14],[-4,-15],[0,-14],[4,-13],[-6,-11],[1,-11]])ell(sx,sy,.72,.82,0,'#fff0d2');
    path([[7,-21],[9,-19],[10,-17]],'#f0d7ac',.8);
  } else if(k==='owl'){
    // Feather scallops below the facial disk and a small brow ridge.
    path([[-7,-8],[-4,-6],[-1,-8],[2,-6],[5,-8],[8,-7]],'#d8c0a4',1.0);
    path([[-8,-18],[-4,-20],[0,-18],[4,-20],[8,-18]],'#a88eae',.8);
  } else if(k==='squirrel'){
    // Tail plume contour and tiny forepaws make the upright squirrel read at a glance.
    path([[-17,-25],[-14,-29],[-9,-28]],'#e7ae78',1.1);path([[1,-13],[4,-11],[6,-13]],'#f3d8b1',1.1);
  } else if(k==='hedgehog'){
    // Individually highlighted quills instead of one solid triangular cap.
    ctx.strokeStyle='#e1c4a0';ctx.lineWidth=.65;for(let q=0;q<7;q++){const xx=-9+q*2.2;ctx.beginPath();ctx.moveTo(xx,-14-(q%2?3:5));ctx.lineTo(xx+.7,-12);ctx.stroke();}
  } else if(k==='turtle'){
    // Shell scutes and a warm shell rim.
    ctx.strokeStyle='#b5d79a';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(-10,-10);ctx.quadraticCurveTo(-8,-20,0,-20);ctx.quadraticCurveTo(9,-19,10,-10);ctx.stroke();
  } else if(k==='hare'){
    // Inner ear and hind-leg contour add the rabbit profile.
    path([[5,-31],[6,-25]],'#e9a9bf',.8);path([[10,-30],[10,-25]],'#e9a9bf',.8);path([[-8,-8],[-10,-5],[-7,-3]],'#b7bfd2',1.0);
  } else if(k==='moth'){
    // Powdered wing spots and subtle wing-edge shimmer; no ground-running cues.
    const shimmer=.35+.25*Math.sin(t/130+p.idx);ctx.fillStyle=`rgba(248,235,255,${shimmer})`;
    for(const [sx,sy] of [[-17,-21],[17,-21],[-21,-16],[21,-16]]){ctx.beginPath();ctx.ellipse(sx,sy,1.1,.65,sx<0?-.3:.3,0,Math.PI*2);ctx.fill();}
    ctx.strokeStyle='rgba(234,221,255,.7)';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(-2,-14);ctx.quadraticCurveTo(-5,-20,-8,-22);ctx.moveTo(2,-14);ctx.quadraticCurveTo(5,-20,8,-22);ctx.stroke();
  } else if(k==='otter'){
    // Smooth pale throat, whiskers and tiny webbed feet.
    path([[2,-9],[6,-8],[9,-10]],'#f6dfbd',1.0);path([[12,-12],[17,-15],[19,-15]],'#f2dec8',.6);path([[12,-11],[18,-10]],'#f2dec8',.6);
  } else if(k==='crane'){
    // Feather layers on the folded wing and long toe hints.
    path([[-8,-13],[-4,-15],[0,-13],[3,-14]],'#fff',.9);path([[-6,0],[-9,1],[-11,1]],'#d9b17d',.7);path([[2,0],[5,1],[7,1]],'#d9b17d',.7);
  }

  // Phase 5.49: species-specific volume cues. These are attached to anatomy,
  // not floating particles, so they clarify form without changing gameplay.
  if(k==='cat'||k==='fox'||k==='otter'){
    // A short muzzle highlight and shoulder-to-rump contour give quadrupeds a readable spine line.
    path([[-7,-15],[-2,-17],[3,-16]],k==='fox'?'#f6b77f':(k==='otter'?'#c99b7e':'#b8bbd1'),.8);
  } else if(k==='deer'){
    // Distinct shoulder plane and long lower-leg joints; the neck remains narrower than the torso.
    path([[5,-15],[8,-19],[10,-23]],'#e4c28e',1.0);
    path([[-9,-4],[-10,-1],[-10.5,0]],'#5f4537',1.0);
  } else if(k==='crane'){
    // Folded wing contour and ankle separation emphasize a wading bird's tall narrow frame.
    path([[-7,-13],[-3,-16],[1,-14],[3,-12]],'#fff',.8);
    path([[-5,-3],[-7,0]],'#b5c2d9',.8);path([[1,-3],[2,0]],'#b5c2d9',.8);
  } else if(k==='wyrm'){
    // Chest plates and shoulder contour emphasize a long dragon torso, not a squat lizard.
    path([[-10,-10],[-6,-8],[-1,-8],[3,-9]],'#e7d9b6',1.05);
    path([[-3,-18],[2,-20],[7,-18]],'#82cbb0',.9);
  }
  // Phase 5.51: restrained surface texture for fur, feathers and shell; each mark is attached to anatomy.
  if(k==='cat'||k==='fox'||k==='otter'||k==='squirrel'){
    ctx.save();ctx.globalAlpha=.32;ctx.strokeStyle=k==='fox'?'#ffd5a2':'#f3e6d4';ctx.lineWidth=.55;
    for(let q=0;q<5;q++){const xx=-8+q*3.1, yy=-14+Math.sin(q*1.4+p.idx)*.7;ctx.beginPath();ctx.moveTo(xx,yy);ctx.quadraticCurveTo(xx+1.2,yy-1.2,xx+2.1,yy-.2);ctx.stroke();}
    ctx.restore();
  } else if(k==='owl'||k==='crane'){
    ctx.save();ctx.globalAlpha=.34;ctx.strokeStyle='#f4e5cc';ctx.lineWidth=.6;for(let q=0;q<4;q++){ctx.beginPath();ctx.moveTo(-6+q*3,-12);ctx.quadraticCurveTo(-4+q*3,-15,-2+q*3,-13);ctx.stroke();}ctx.restore();
  } else if(k==='turtle'){
    ctx.save();ctx.globalAlpha=.38;ctx.strokeStyle='#d8e9a8';ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(-5,-17);ctx.quadraticCurveTo(-2,-19,1,-17);ctx.moveTo(2,-16);ctx.quadraticCurveTo(5,-18,7,-15);ctx.stroke();ctx.restore();
  }

  // Phase 5.46: no shared halo or shared-coordinate blink. Those overlays sat in
  // the wrong anatomical position on several species and made them look malformed.
  ctx.restore();
 }
 // Visual evolution tiers use the existing saved levels; no save schema changes.
 function petVisualLevel(p){
   const base=Array.isArray(S.pet)?(Number(S.pet[p.idx])||0):0;
   const ix=S.artisanIX||{}, extra=(ix.pets||[]).includes(p.id)?1+(Number((ix.petLevels||{})[p.id])||0):0;
   return Math.max(base,extra);
 }
 function drawPetEvolution(ctx,p,t,level,size){ evoBack(ctx,p.light,tierOf(level),size,t,p.idx,p.id==='wyrm'||p.id==='moth'); }
  function drawPetEvolutionFront(ctx,p,t,level,size){ evoFront(ctx,p.light,tierOf(level),size,t,p.idx,p.id==='wyrm'||p.id==='moth'); }
 // Phase 5.47 regression fix: Phase 5.46 cleanup accidentally removed the
 // shared runtime state used by the ecology renderer. Restore these singletons
 // before drawCompanions so rendering and AI can initialize normally.
 const petMotion = new Map();
 const petAI = { fireflies: [], nextFirefly: 0, nextMeteor: 0, meteor: null, catches: 0, lastCatch: 0, foxLastMeteorAt: 0 };

 function drawCompanions(t){ EVO_N = 0; EVO_F = 0;
  if(typeof x==='undefined'||typeof pl==='undefined'||typeof W==='undefined'||typeof H==='undefined')return;
  petPos.length=0;
  const owned=[];
  (Array.isArray(S.pet)?S.pet:[]).forEach((lv,i)=>{if(lv>0&&companionDefs[i])owned.push(companionDefs[i])});
  const ix=S.artisanIX||{};
  (Array.isArray(ix.pets)?ix.pets:[]).forEach(id=>{const p=companionDefs.find(v=>v.id===id);if(p&&!owned.some(q=>q.id===p.id))owned.push(p)});
  // Phase 5.12: ambient forest life must not depend on owning a companion.
  // Keep neutral support values when no pets are owned, but continue to render fireflies
  // and rare sky events so the world remains alive from the very first session.
  if(!owned.length){window.__RDD_PET_SUPPORT={production:1,touch:1,fireflyHunt:0,meteorWatch:0,nightVision:1,flora:1,rareFind:1,waterGather:1,forestLuck:1,spiritGuard:1};}
  const indoor=!!inside, now=Date.now();
  const groundAt=(px)=> indoor?H*.91:(H*.68+H*.19+(typeof bridgeY==='function'?bridgeY(px):0));
  // Phase 5.12 — living companion ecology: ambient fireflies run even before the first pet is owned.
  // Fireflies belong to the forest, not to the player. Their paths are autonomous.
  if(!indoor){
   // Phase 5.32: fireflies are ambient prey, not spawned by a pounce.
   // Keep a visible gap between prey spawns and never create new prey mid-jump.
   const catState=petMotion.get('cat');
   const catIsPouncing=!!(catState&&catState.mode==='pounce'&&t<catState.modeUntil);
   if(t>petAI.nextFirefly&&!catIsPouncing){
    const catScreenX=catState?(catState.x-(typeof cam==='number'?cam:0)):W*.5;
    let fx=W*(.12+Math.random()*.76);
    for(let attempt=0;attempt<5&&catState&&Math.abs(fx-catScreenX)<Math.max(90,W*.20);attempt++) fx=W*(.12+Math.random()*.76);
    const fy=H*(.735+Math.random()*.035);
    petAI.fireflies.push({baseX:fx,baseY:fy,x:fx,y:fy,phase:Math.random()*6.28,born:t,life:8200+Math.random()*2800});
    petAI.nextFirefly=t+2400+Math.random()*1400;
   }
   petAI.fireflies=petAI.fireflies.filter(f=>t-f.born<f.life);
   petAI.fireflies.forEach(f=>{
    // Phase 5.33: when the cat locks this exact visible prey, freeze its anchor
    // for the whole pounce. This prevents the target drifting away from the arc.
    const activeCat=petMotion.get('cat');
    const lockedForPounce=!!(activeCat&&activeCat.mode==='pounce'&&activeCat.pounceTarget===f&&Number.isFinite(activeCat.pounceTargetScreenX)&&Number.isFinite(activeCat.pounceTargetScreenY));
    if(lockedForPounce){ f.x=activeCat.pounceTargetScreenX; f.y=activeCat.pounceTargetScreenY; }
    else {
      // Oscillate around a stable anchor; don't accumulate frame-by-frame drift.
      f.x=f.baseX+Math.sin(t/900+f.phase)*9;
      f.y=f.baseY+Math.cos(t/620+f.phase)*5;
    }
    const pulse=.68+.32*(.5+.5*Math.sin(t/185+f.phase*1.7));
    const radius=8.5+1.8*Math.sin(t/310+f.phase);
    x.save();x.globalCompositeOperation='lighter';x.globalAlpha=pulse;
    const glow=x.createRadialGradient(f.x,f.y,0,f.x,f.y,radius);
    glow.addColorStop(0,'rgba(255,250,205,.82)');glow.addColorStop(.22,'rgba(255,222,125,.32)');glow.addColorStop(.62,'rgba(255,205,100,.08)');glow.addColorStop(1,'rgba(255,220,100,0)');
    x.fillStyle=glow;x.beginPath();x.arc(f.x,f.y,radius,0,Math.PI*2);x.fill();
    x.fillStyle='#fff9d4';x.beginPath();x.arc(f.x,f.y,1.15+.45*pulse,0,Math.PI*2);x.fill();
    // A faint trailing mote makes movement readable without a long particle tail.
    x.globalAlpha=pulse*.24;x.beginPath();x.arc(f.x-Math.sin(t/900+f.phase)*2.2,f.y+2.8,1.1,0,Math.PI*2);x.fill();
    x.restore();
    // Phase 5.33: small target ring confirms the cat is chasing this already-visible firefly.
    const hunter=petMotion.get('cat');
    if(hunter&&hunter.targetFirefly===f&&(hunter.mode==='stalk'||hunter.mode==='pounce')){
      x.save();x.globalAlpha=.7;x.strokeStyle='rgba(255,239,154,.88)';x.lineWidth=1;
      x.beginPath();x.arc(f.x,f.y,5.5+Math.sin(t/95)*1.2,0,Math.PI*2);x.stroke();x.restore();
    }
   });
   // A rare shooting star is a sky event; the fire fox watches it from its own lookout.
   if(t>petAI.nextMeteor){
    petAI.meteor={x:W*(.72+Math.random()*.18),y:H*(.15+Math.random()*.12),born:t,duration:1250,rewarded:false};
    petAI.nextMeteor=t+18000+Math.random()*16000;
    // Reward is deliberately deferred until an owned fox actually enters skywatch mode.
   }
   if(petAI.meteor){const m=petAI.meteor,u=(t-m.born)/m.duration;if(u<1){x.save();x.globalCompositeOperation='lighter';x.strokeStyle='rgba(255,222,164,'+(1-u)+')';x.lineWidth=2;x.beginPath();x.moveTo(m.x-u*W*.24,m.y+u*H*.18);x.lineTo(m.x-u*W*.31,m.y+u*H*.23);x.stroke();x.fillStyle='rgba(255,245,205,'+(1-u)+')';x.beginPath();x.arc(m.x-u*W*.24,m.y+u*H*.18,2.5,0,Math.PI*2);x.fill();x.restore();
    }else petAI.meteor=null;}
  }
  const count=window.__RDD_ADD_FULL_ACTIVE ? owned.length : Math.min(owned.length,8);
  owned.slice(0,count).map((p,i)=>({p,i})).sort((a,b)=>(a.i%3)-(b.i%3)||a.i-b.i).forEach(({p,i})=>{
   // A full-sized dragon does not fit inside the cabin scene; keep it outdoors where its flight reads clearly.
   if(indoor && p.id==='wyrm') return;
   let st=petMotion.get(p.id);
   if(!st){const camStart=(typeof cam==='number'?cam:0);const wx=camStart+(p.id==='wyrm'?W*.50:W*(.1+.8*(((i+1)*0.618)%1)));st={x:wx,y:groundAt(W*.5),vx:0,phase:Math.random()*6.28,mode:'idle',modeUntil:0,targetX:wx+(Math.random()-.5)*W*.45,targetY:0,targetFirefly:null,homeX:wx,perch:Math.random()};petMotion.set(p.id,st)}
   const baseSize=Math.max(21,Math.min(42,H*(indoor?.052:.058)));
   const speciesFactor=SPECIES_SCALE[p.id]||1;
   const shape=SPECIES_SHAPE[p.id]||[1,1];
   const responsiveScale=Math.max(.82,Math.min(1.12,W/700));
   const petScale=responsiveScale*speciesFactor;
   // Use the actual rendered envelope for collision radius, shadows and UI spacing.
   const size=baseSize*speciesFactor*Math.max(shape[0],shape[1]);
   const catNoseOffset=17*Math.max(.88,Math.min(1.18,W/500));
   // Phase 5.28: shared pounce timing; catch and visible animation use the same displayed position.
   // Keep this outside the cat-only branch because the jump arc is drawn below that branch.
   const POUNCE_MS=1150;
   let tx=st.x,ty=groundAt((typeof cam==='number'?cam:0)+st.x),mode='idle';
   const camX=(typeof cam==='number'?cam:0);
   if(indoor){
    // Curl into a small, grounded resting pose on the rug/hearth side.
    const side=(i%2===0?-1:1), row=Math.floor(i/2);
    tx=Math.max(W*.48,Math.min(W*.83,W*.67+side*W*.045+row*W*.018)); ty=H*.914+row*H*.002;
    mode='rest';
   } else if(p.id==='cat'){
    // Phase 5.24: use the shared POUNCE_MS for state timing, catch checks and the visible arc.
    // Phase 5.19: lock one prey while stalking/pouncing so the target cannot
    // change underneath the cat between movement and collision checks.
    let target=(st.targetFirefly&&petAI.fireflies.includes(st.targetFirefly))?st.targetFirefly:null;
    let dist=Infinity,horizontalDist=Infinity;
    // Do not retarget in the middle of a pounce. The animation must finish even
    // if the prey is caught and removed from the ambient firefly list.
    if(st.mode!=='pounce' && (!target || st.mode!=='stalk')){
      target=null;
      for(const f of petAI.fireflies){
        // Only target prey that is currently visible on screen; do not chase an off-screen/world-space ghost.
        if(f.x < 8 || f.x > W-8 || f.y < 8 || f.y > H-8) continue;
        const dx=Math.abs((f.x+camX)-st.x), dy=Math.abs(f.y-(st.y-size*.65));
        const score=dx+dy*.12;
        if(score<dist){dist=score;horizontalDist=dx;target=f;}
      }
    }
    if(target) horizontalDist=Math.abs((target.x+camX)-st.x);
    if(st.modeUntil<t){
      if(st.mode==='pounce'){
        // The full visible jump has ended. Only now may the cat select new prey.
        st.targetFirefly=null;
        st.pounceTarget=null;
        st.pounceStartX=null;st.pounceTargetWorldX=null;st.pounceTargetScreenX=null;st.pounceTargetScreenY=null;
        st.pounceCaught=false;
      }
      if(target&&horizontalDist<W*.48){
        st.targetFirefly=target;
        st.targetX=camX+target.x;st.targetY=target.y;
        if(horizontalDist<Math.max(42,W*.12)){
          st.mode='pounce';st.modeUntil=t+POUNCE_MS;st.pounceStartedAt=t;
          st.pounceStartX=st.x;
          // End the cat's body offset so its nose, not its center, reaches the firefly.
          const pounceDir=(camX+target.x)>=st.x?1:-1;
          st.pounceTargetWorldX=camX+target.x-pounceDir*catNoseOffset;
          st.pounceFacing=pounceDir;
          st.pounceTargetScreenX=target.x;st.pounceTargetScreenY=target.y;
          st.pounceTarget=target;st.pounceCaught=false;
        }
        else {st.mode='stalk';st.modeUntil=t+320;}
      }else{
        st.targetFirefly=null;
        st.mode=Math.random()<.55?'wander':'idle';
        st.modeUntil=t+650+Math.random()*1100;
        st.targetX=camX+W*(.10+Math.random()*.80);
      }
    }
    // Keep the prey's world position current while it drifts; preserve the lock.
    if(target&&st.targetFirefly===target&&(st.mode==='stalk'||st.mode==='pounce')){
      st.targetX=camX+target.x;st.targetY=target.y;
    }
    mode=st.mode;tx=mode==='stalk'||mode==='pounce'?st.targetX:mode==='wander'?st.targetX:st.x;
    // Phase 5.20: one clock drives the entire pounce. Previously the catch
    // window used a 900 ms clock while the rendered jump used 760 ms, so the
    // reward could trigger while the visible cat was still almost grounded.
    const pounceProgress=mode==='pounce'?Math.max(0,Math.min(1,(t-(st.pounceStartedAt??(st.modeUntil-POUNCE_MS)))/POUNCE_MS)):0;
    const pounceTarget=st.pounceTarget||target;
    if(mode==='pounce'&&pounceTarget){if(Number.isFinite(st.pounceTargetScreenX))pounceTarget.x=st.pounceTargetScreenX;if(Number.isFinite(st.pounceTargetScreenY))pounceTarget.y=st.pounceTargetScreenY;}
    // One shared arc height is used by both collision and rendering. Never let
    // the invisible collision body rise higher than the cat shown on screen.
    // Aim the visible jump at the actual firefly, not at an arbitrary high arc.
    // The cat's body anchor is calibrated so its head/body reaches the prey at
    // the apex. This prevents a reward while the sprite visibly jumps past air.
    const pounceStartX=Number.isFinite(st.pounceStartX)?st.pounceStartX:st.x;
    const pounceTargetWorldX=Number.isFinite(st.pounceTargetWorldX)?st.pounceTargetWorldX:(pounceTarget?camX+pounceTarget.x:st.x);
    const pounceEase=pounceProgress*pounceProgress*(3-2*pounceProgress);
    const projectedCatScreenX=(pounceStartX+(pounceTargetWorldX-pounceStartX)*pounceEase)-camX;
    const pounceFacing=Number.isFinite(st.pounceFacing)?st.pounceFacing:(pounceTargetWorldX>=pounceStartX?1:-1);
    const verticalGap=pounceTarget?Math.max(0,st.y-catNoseOffset-pounceTarget.y):0;
    const pounceLift=mode==='pounce'?Math.sin(pounceProgress*Math.PI)*Math.max(24,verticalGap):0;
    const catVisibleY=st.y-pounceLift-catNoseOffset;
    const projectedCatNoseScreenX=projectedCatScreenX+pounceFacing*catNoseOffset;
    const catchDx=pounceTarget?Math.abs(pounceTarget.x-projectedCatNoseScreenX):Infinity;
    const catchDy=pounceTarget?Math.abs(pounceTarget.y-catVisibleY):Infinity;
    // Phase 5.36: catch validation is deferred until the actual visible pose is finalized.

   } else if(p.id==='fox'){
    // Independent forest patrol, with head/attention lifted during a meteor.
    if(st.modeUntil<t){st.mode=Math.random()<.65?'patrol':'watch';st.modeUntil=t+1800+Math.random()*3000;st.targetX=camX+W*(.08+Math.random()*.84)}
    mode=st.mode;tx=mode==='patrol'?st.targetX:st.x;
    if(petAI.meteor&&t-petAI.meteor.born<petAI.meteor.duration){
      mode='skywatch';
      if(!petAI.meteor.rewarded){
        petAI.meteor.rewarded=true;petAI.foxLastMeteorAt=Date.now();
        const foxGain=Math.max(30,cps()*12);add(foxGain);S.caught++;
        pushParticles({k:'t',x:petAI.meteor.x,y:petAI.meteor.y,text:'🦊 +' + fm(foxGain),col:'#ffd09a',life:1.5});
        for(let j=0;j<12;j++)pushParticles({k:'s',c:'c',x:petAI.meteor.x,y:petAI.meteor.y,vx:(Math.random()-.5)*140,vy:(Math.random()-.8)*100,life:1});
        if(typeof toast==='function')toast('🦊 Cáo lửa quan sát sao băng! +' + fm(foxGain) + ' ánh sáng');
        if(typeof save==='function')save();
      }
    }
   } else {
    // Each other creature explores a local territory and pauses naturally.
    if(st.modeUntil<t){st.mode=Math.random()<.58?'wander':'idle';st.modeUntil=t+1400+Math.random()*3600;st.targetX=camX+W*(.08+Math.random()*.84)}
    mode=st.mode;tx=mode==='wander'?st.targetX:st.x;
   }
   if(!indoor&&p.id==='owl'){ mode='perch'; tx=st.homeX; }
   if(indoor) tx=Math.max(18,Math.min(W-18,tx)); else tx=Math.max(18,Math.min(4*W-18,tx));
   const dx=tx-st.x, speed=(p.id==='cat'?(mode==='pounce'?.20:mode==='stalk'?.11:mode==='wander'?.024:.006):(p.id==='fox'?.010:p.id==='moth'?.0035:.006));
   // Species-specific locomotion: the moth drifts through the air instead of running.
   if(!indoor && p.id==='moth'){
     const home=Number.isFinite(st.homeX)?st.homeX:st.x;
     // A moth flutters locally around its home flower: small irregular loops, not long screen-wide sweeps.
     st.x=home+Math.sin(t/1250+st.phase)*W*.018+Math.sin(t/570+st.phase*.7)*W*.006;
     st.vx=(Math.cos(t/1250+st.phase)*W*.018/1250+Math.cos(t/570+st.phase*.7)*W*.006/570)*16;
     st.mode='flight'; mode='flight'; tx=st.x;
   } else if(!indoor && p.id==='wyrm'){
     // A dragon is an aerial companion, never a quadruped running along the ground.
     // Keep it in a bounded patrol around its own home; the ground coordinate is used only for its shadow.
     const home=Number.isFinite(st.homeX)?st.homeX:st.x;
     st.x=home+Math.sin(t/1850+st.phase)*W*.018+Math.sin(t/820+st.phase*.6)*W*.006;
     st.vx=(Math.cos(t/1850+st.phase)*W*.035/1850+Math.cos(t/820+st.phase*.6)*W*.009/820)*16;
     st.mode='flight'; mode='flight'; tx=st.x;
   } else if(!indoor && p.id==='cat' && mode==='pounce'){
     // Deterministic horizontal travel: the cat moves from its take-off point
     // toward the locked prey over the same clock used by the visible jump.
     // Do not snap to the target in the first few frames.
     const qMove=Math.max(0,Math.min(1,(t-(st.pounceStartedAt??(st.modeUntil-POUNCE_MS)))/POUNCE_MS));
     const startX=Number.isFinite(st.pounceStartX)?st.pounceStartX:st.x;
     const targetWorldX=Number.isFinite(st.pounceTargetWorldX)?st.pounceTargetWorldX:(st.pounceTarget?camX+st.pounceTarget.x:st.x);
     const eased=qMove*qMove*(3-2*qMove);
     st.x=startX+(targetWorldX-startX)*eased;
     st.vx=(targetWorldX-startX)/Math.max(1,POUNCE_MS)*16;
   } else {
     st.vx+=Math.max(-speed,Math.min(speed,dx*.035));
      if(!indoor&&p.id!=='moth'&&p.id!=='wyrm'){let rp=0;petMotion.forEach((o,oid)=>{if(oid===p.id||oid==='moth'||oid==='wyrm'||!o||!Number.isFinite(o.x))return;const dd=st.x-o.x,lim=size*1.3;if(Math.abs(dd)<lim)rp+=Math.sign(dd||((p.idx|0)%2?1:-1))*(lim-Math.abs(dd));});st.vx+=rp*.00018;}
      st.vx*=.84;st.x+=st.vx*16;
   }
   if(indoor){st.x+= (tx-st.x)*.11;st.y+=(ty-st.y)*.15;}else st.y=groundAt(st.x)+((i%3)-1)*H*.017;
   const moving=Math.abs(st.vx)>.18;
   // Draw the cat's pounce arc while keeping the shadow anchored to the ground.
   let lift=0;if(!indoor&&p.id==='cat'&&mode==='pounce'){
     // Reuse the exact progress used by the catch check so the cat is visibly airborne
     // at the instant of reward. A higher arc makes the pounce readable on phones.
     const q=Math.max(0,Math.min(1,(t-(st.pounceStartedAt??(st.modeUntil-POUNCE_MS)))/POUNCE_MS));
     const prey=st.pounceTarget;const gap=prey?Math.max(0,st.y-catNoseOffset-prey.y):0;lift=Math.sin(q*Math.PI)*Math.max(24,gap); // match the visible nose trajectory to the target
   }
   const airborne=lift>10;
   // Elevation is part of the species silhouette: moths hover; owls perch above the floor.
   const speciesLift=!indoor&&p.id==='moth' ? baseSize*(.72+.055*Math.sin(t/610+st.phase)) :
     // Dragon cruises high over the canopy, with slow broad vertical motion. Its ground shadow stays below.
     (!indoor&&p.id==='wyrm' ? Math.max(H*.47,baseSize*speciesFactor*1.95)+H*(.018*Math.sin(t/2350+st.phase)+.008*Math.sin(t/1150+st.phase*1.7)) :
     (!indoor&&p.id==='owl' ? baseSize*(.46+.025*Math.sin(t/620+st.phase)) :
     (!indoor&&p.id==='crane' ? baseSize*.04 : 0)));
   const drawY=st.y-lift-speciesLift;
    // Convert world-space pet coordinates to screen-space exactly once.
    const renderX = indoor ? st.x : st.x - camX;
   // Phase 5.36: evaluate contact after movement and visible lift are finalized.
   // Rewards cannot be triggered by a projected position from an earlier step.
   if(!indoor && p.id==='cat' && mode==='pounce' && st.pounceTarget && !st.pounceCaught){
     const q=Math.max(0,Math.min(1,(t-(st.pounceStartedAt??(st.modeUntil-POUNCE_MS)))/POUNCE_MS));
     const facing=Number.isFinite(st.pounceFacing)?st.pounceFacing:1;
     const noseX=renderX+facing*catNoseOffset;
     const noseY=drawY-catNoseOffset;
     const prey=st.pounceTarget;
     const dx=Math.abs(prey.x-noseX), dy=Math.abs(prey.y-noseY);
     const visibleContact=lift>Math.max(8,size*.22) && q>.20 && q<.84 &&
       petAI.fireflies.includes(prey) && dx<Math.max(10,size*.30) && dy<Math.max(12,size*.34);
     if(visibleContact){
       window.__RDD_CAT_LAST_CATCH={at:t,mode,progress:q,lift,dx,dy,targetX:prey.x,targetY:prey.y,noseX,noseY,source:'final-render-pose'};
       petAI.fireflies=petAI.fireflies.filter(f=>f!==prey);
       st.pounceCaught=true;st.targetFirefly=null;
       petAI.catches++;petAI.lastCatch=t;
       const catGain=Math.max(1,tapPow()*6);
       add(catGain);
       const contactWorldX=camX+prey.x, contactY=prey.y;
       pushParticles({k:'t',x:contactWorldX,y:contactY-6,text:'+'+fm(catGain),col:'#9dffc7',life:1.2});
       for(let j=0;j<8;j++)pushParticles({k:'s',c:'g',x:contactWorldX,y:contactY,vx:(Math.random()-.5)*90,vy:-20-Math.random()*70,life:.8});
       if(typeof toast==='function')toast('Mèo rừng bắt được đom đóm! +'+fm(catGain)+' ánh sáng');
       chime(10+(Math.random()*4|0),.09,1);
       if(typeof save==='function')save();
     }
   }
   petPos.push({x:renderX,y:drawY-size*.55,p});
   // World-space animals are culled outside the viewport; camera motion no longer drags them with the player.
   if(!indoor&&(renderX < -size*2 || renderX > W+size*2)) return;
   // Soft, ground-anchored shadows make the air gap readable.
   if(!indoor&&(p.id==='moth'||p.id==='owl'||p.id==='wyrm')){
     // Keep flight shadows attached to the ground plane, not to the airborne sprite.
     const shadowAlpha=p.id==='wyrm'?.20:(p.id==='moth'?.16:.22);
     const shadowWidth=p.id==='wyrm'?1.55:(p.id==='moth'?.48:.40);
     x.save();x.globalAlpha=shadowAlpha;x.fillStyle='#030817';
     x.beginPath();x.ellipse(renderX,st.y+1,size*shadowWidth,size*(p.id==='wyrm'?.13:.10),0,0,Math.PI*2);x.fill();x.restore();
   }
   x.save();x.translate(renderX,drawY);x.scale(st.vx<-.05?-1:1,1);
   if(!indoor&&p.id==='wyrm'){
     // Gentle bank in flight; the dragon's silhouette stays readable instead of bobbing like a small pet.
     x.rotate(Math.sin(t/1500+st.phase)*.045);
   }
   if(!indoor&&p.id==='cat'&&airborne){x.rotate(-.24);x.scale(1,.88);}
   if(indoor){x.rotate((i%2?1:-1)*.13);x.translate(0,3);}
   const petLevel=petVisualLevel(p);
   drawPetEvolution(x,p,t+i*180,petLevel,size);
   if(!indoor&&p.id==='cat'&&airborne){x.save();x.globalAlpha=.34;x.strokeStyle='#fff0b5';x.lineWidth=1.2;x.beginPath();x.arc(-size*.10,-size*.12,size*.48,Math.PI*1.10,Math.PI*1.55);x.stroke();x.globalAlpha=.22;x.beginPath();x.moveTo(-size*.30,size*.18);x.lineTo(-size*.52,size*.30);x.stroke();x.restore();}
   drawPet(x,p,t+i*180,petScale*(1+.04*Math.max(0,tierOf(petLevel)-1)),moving,!indoor?false:true);
    drawPetEvolutionFront(x,p,t+i*180,petLevel,size);
   // Phase 5.13: tiny state cues reinforce that companions have their own daily rhythm.
   // These are decorative only; no timers, rewards, or save data are changed.
   if(indoor){
     const napPulse=.5+.5*Math.sin(t/720+i*1.4);
     x.save();x.globalAlpha=.28+napPulse*.28;x.fillStyle='#d8e6ff';x.font='600 9px system-ui';x.textAlign='center';
     if(Math.sin(t/1500+i*2.1)>.35){x.fillText('z',size*.42,-size*1.08);x.globalAlpha*=.72;x.fillText('z',size*.62,-size*1.28);}
     x.restore();
   } else if(moving && !['moth','crane','owl','wyrm'].includes(p.id)){
     const stepPulse=.35+.25*(.5+.5*Math.sin(t/110+i));
     x.save();x.globalAlpha=stepPulse;x.fillStyle=p.light;
     x.beginPath();x.ellipse(-size*.30,1.5,size*.055,size*.025,-.25,0,Math.PI*2);x.fill();
     x.restore();
   }
   // State labels are intentionally brief and only shown during a real action.
   if(!indoor&&(mode==='stalk'||mode==='pounce'||mode==='skywatch'||(p.id==='wyrm'&&mode==='flight'))){
     x.save();x.globalAlpha=.8+.2*Math.sin(t/100);x.fillStyle=mode==='skywatch'?'#ffe4a2':'#c8ffcf';x.font='10px system-ui';x.textAlign='center';
     x.fillText(mode==='stalk'?'⌁':mode==='pounce'?'!':(p.id==='wyrm'&&mode==='flight'?'↟':'✦'),0,-size*1.18);x.restore();
   }
   // Optional debug overlay: open the HTML with ?petdebug=1 to inspect the
   // state machine and catch window without changing normal gameplay.
   if(!indoor&&p.id==='cat'&&new URLSearchParams(location.search).get('petdebug')==='1'){
     const dbgY=-size*2.25, last=window.__RDD_CAT_LAST_CATCH;
     x.save();x.fillStyle='rgba(5,10,28,.90)';x.strokeStyle=mode==='pounce'?'#ffe59b':'#d8e7ff';x.lineWidth=.8;
     x.beginPath();x.roundRect(-76,dbgY,152,43,5);x.fill();x.stroke();
     x.fillStyle='#fff';x.font='8px monospace';x.textAlign='center';
     x.fillText(`AI ${mode}  q=${Math.round(pounceProgress*100)}%  prey=${pounceTarget?'locked':target?'yes':'no'}`,0,dbgY+12);
     x.fillText(`dX=${Number.isFinite(catchDx)?Math.round(catchDx):'—'} dY=${Number.isFinite(catchDy)?Math.round(catchDy):'—'} lift=${Math.round(pounceLift)}`,0,dbgY+23);
     x.fillStyle='#c8ffcf';
     x.fillText(last?`last catch: q${Math.round(last.progress*100)} d(${Math.round(last.dx)},${Math.round(last.dy)})`:'last catch: none',0,dbgY+34);
     if(mode==='pounce'&&pounceTarget){x.strokeStyle='#ff6e6e';x.lineWidth=1.2;x.beginPath();x.moveTo(pounceTarget.x-5,pounceTarget.y);x.lineTo(pounceTarget.x+5,pounceTarget.y);x.moveTo(pounceTarget.x,pounceTarget.y-5);x.lineTo(pounceTarget.x,pounceTarget.y+5);x.stroke();}
     x.restore();
   }
   // Role-specific visual cues: cat's focused gaze; fox's skyward attention.
   if(!indoor&&p.id==='cat'&&(mode==='stalk'||mode==='pounce')){x.strokeStyle='rgba(255,239,154,.8)';x.lineWidth=1.2;x.beginPath();x.moveTo(7,-22);x.lineTo(13,-24);x.stroke();}
   if(!indoor&&p.id==='fox'&&mode==='skywatch'){x.strokeStyle='rgba(255,207,124,.9)';x.lineWidth=1.3;x.beginPath();x.moveTo(7,-22);x.lineTo(10,-28);x.stroke();}
   if(!indoor&&['owl','crane'].includes(p.id)){x.fillStyle='rgba(194,222,255,.65)';x.beginPath();x.arc(0,-size*.92,2+Math.sin(t/250+i)*.8,0,Math.PI*2);x.fill();}
   if(!indoor&&p.id==='moth'){
     x.globalAlpha=.45;x.fillStyle='#d9c5ff';x.beginPath();x.arc(-size*.5,-size*.7,1.5,0,Math.PI*2);x.arc(size*.5,-size*.7,1.2,0,Math.PI*2);x.fill();x.globalAlpha=1;
   }
   if(!indoor&&p.id==='owl'){
     x.strokeStyle='rgba(184,142,103,.85)';x.lineWidth=1.7;x.beginPath();x.moveTo(-size*.42,-size*.08);x.lineTo(size*.42,-size*.08);x.stroke();
   }
   x.restore();
  });
  // Ambient support is a real multiplier on existing production, not a replacement economy.
  // Effects only apply when the corresponding creature is owned and the player is outdoors.
  const catOwned=owned.some(p=>p.id==='cat'),foxOwned=owned.some(p=>p.id==='fox');
  window.__RDD_PET_SUPPORT={
   /* Mỗi loài đóng góp một vai trò rõ ràng; cộng dồn nhẹ, không ghi đè công thức gốc. */
   production:1+(owned.some(p=>p.id==='owl')?0.04:0)+(owned.some(p=>p.id==='deer')?0.03:0)+(owned.some(p=>p.id==='otter')?0.04:0)+(owned.some(p=>p.id==='wyrm')?0.06:0)+(owned.some(p=>p.id==='squirrel')?0.02:0),
   touch:1+(owned.some(p=>p.id==='hare')?0.04:0)+(owned.some(p=>p.id==='moth')?0.05:0),
   fireflyHunt:catOwned?petAI.catches:0,meteorWatch:foxOwned?1:0,
   catLastCatchAt:catOwned?petAI.lastCatch:0,foxLastMeteorAt:foxOwned?petAI.foxLastMeteorAt:0,
   nightVision:owned.some(p=>p.id==='owl')?1.08:1,flora:owned.some(p=>p.id==='hedgehog')?1.05:1,
   rareFind:owned.some(p=>p.id==='turtle')?1.04:1,waterGather:owned.some(p=>p.id==='otter')?1.06:1,
   forestLuck:owned.some(p=>p.id==='crane')?1.05:1,spiritGuard:owned.some(p=>p.id==='wyrm')?1.08:1
  };
 }

 // Phase 4.4: observable pet-render diagnostics. Read-only; does not modify S or rdd5.
  window.__RDD_PET_RENDER_AUDIT = window.__RDD_PET_RENDER_AUDIT || {
    calls: 0, lastCallAt: 0, errors: 0, lastError: null, lastOwnedCount: 0, supportAssigned: false
  };
  const __rddDrawCompanionsCore = drawCompanions;
  drawCompanions = function(t) {
    const a = window.__RDD_PET_RENDER_AUDIT;
    a.calls++; a.lastCallAt = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    try {
      __rddDrawCompanionsCore(t);
      a.lastOwnedCount = (Array.isArray(S.pet) ? S.pet.filter(v => v > 0).length : 0)
        + ((S.artisanIX && Array.isArray(S.artisanIX.pets)) ? S.artisanIX.pets.length : 0);
      a.supportAssigned = !!window.__RDD_PET_SUPPORT;
      if (a.supportAssigned) a.lastError = null;
    } catch (e) {
      a.errors++; a.lastError = String(e && (e.stack || e.message) || e);
      console.error('[RDD pet renderer]', e);
    }
  };

  // Companion rendering is composed once with the main draw path below.
 // Tap companion for affection: chime, stars/hearts, and 25% pet skill speed for 60s.
 const buffs=new Map();let fx=[];
 function ping(){if(!A){if(typeof initAudio==='function')initAudio()}if(!A)return;try{const o=A.createOscillator(),g=A.createGain();o.type='sine';o.frequency.setValueAtTime(740,A.currentTime);o.frequency.exponentialRampToValueAtTime(1180,A.currentTime+.13);g.gain.setValueAtTime(.0001,A.currentTime);g.gain.linearRampToValueAtTime(.14,A.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,A.currentTime+.32);o.connect(g);g.connect(master||A.destination);o.start();o.stop(A.currentTime+.34)}catch(_){}}
 $q('#stage')?.addEventListener('pointerdown',e=>{const r=$q('#stage').getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;const p=[...petPos].reverse().find(v=>Math.hypot(v.x-px,v.y-py)<27);if(!p)return;const id=p.p.id;buffs.set(id,Date.now()+60000);ping();for(let i=0;i<9;i++)fx.push({x:px,y:py,vx:(Math.random()-.5)*35,vy:-25-Math.random()*35,life:1,ch:Math.random()<.5?'✦':'♥'});if(typeof toast==='function')toast(`💗 ${p.p.id==='cat'?'Mèo rừng':p.p.id==='fox'?'Cáo lửa':p.p.id==='deer'?'Hươu sao':p.p.id==='hare'?'Thỏ tuyết':p.p.id==='moth'?'Bướm tinh tú':p.p.id==='otter'?'Rái cá suối':p.p.id==='crane'?'Hạc trăng':p.p.id==='wyrm'?'Rồng mầm':'Bạn rừng'} được vuốt ve · +25% kỹ năng trong 60 giây`);e.preventDefault()},{passive:false});
 // Particle overlay + companion layer are composed into the single game draw path.
 const drawBase=draw;
 draw=function(t,dt){
   drawBase(t,dt);
   if(!x)return;
   try{
     x.save();x.globalAlpha=1;x.globalCompositeOperation='source-over';
     drawCompanions(t);
     const sec=Math.min(.05,dt||0);
     fx=fx.filter(f=>f.life>0);
     fx.forEach(f=>{f.x+=f.vx*sec;f.y+=f.vy*sec;f.life-=sec*.8;x.save();x.globalAlpha=Math.max(0,f.life);x.fillStyle=f.ch==='♥'?'#ff9ec8':'#ffe89a';x.font='bold 14px system-ui';x.fillText(f.ch,f.x,f.y);x.restore()});
     x.restore();
   }catch(e){try{x.restore()}catch(_){};if(window.__RDD_DEBUG)console.warn('[RDD render]',e)}
 };
 window.draw=draw;
 // Production modifiers are integrated in core cps(); no wrapper override.
 // Phase 1 refactor: one draw composition; pet visuals do not issue currency rewards.
 window.__RDD_AUDIT_PHASE1={version:'1.0',drawComposition:'single',petVisualRewards:false,saveKey:'rdd5',corePetRewards:'frame()'};
 window.__RDD_AUDIT_PHASE2={version:'2.0',petSupportIntegrated:true,saveKey:'rdd5',note:'Pet support multipliers are applied in core cps/tapPow formulas; runtime balance still requires browser tests.'};
 window.__RDD_AUDIT_PHASE513={version:'5.13',companionBlink:true,indoorRestCue:true,walkingDust:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE533={version:'5.33',lockedPreyFrozenDuringPounce:true,targetRingVisible:true,sharedPounceCoordinates:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE534={version:'5.34',collisionAnchor:'visible-cat-nose',rewardVfxAnchor:'firefly-contact-point',saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE535={version:'5.35',runtimeDiagnostics:true,debugQuery:'?petdebug=1',lastCatchSnapshot:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE536={version:'5.36',catchCheck:'final-render-pose',requiresVisibleLift:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE540={version:'5.40',speciesLocomotion:true,mothFlight:true,owlPerch:true,groundAnchoredFlightShadows:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE541={version:'5.41',speciesScale:true,wyrmAnatomy:true,mothFlightTuned:true,wildMothFlowerLayer:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE543={version:'5.43',speciesScaleHierarchy:true,wildScaleAnchorsPerSpecies:true,mothIndependentWingFlap:true,mothFlowerHover:true,mothNeverHuntsFireflies:true,wyrmScale:2.35,squirrelScale:.56,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE549={version:'5.49',speciesAnatomyRatios:true,scaleAppliedOnce:true,distinctBodyProportions:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE544={version:'5.44',wyrmAerialPatrol:true,dragonWingFlap:true,groundAnchoredDragonShadow:true,dragonNoGroundGait:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE547={version:'5.47',restoredPetMotionState:true,restoredPetAIState:true,fixesPhase546NoAnimalsRegression:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE546={version:'5.46',universalPetHaloRemoved:true,misplacedGenericBlinkRemoved:true,evolutionRingReduced:true,wildlifeGlowSuppressed:true,speciesScaleHierarchyRebalanced:true,saveKey:'rdd5'};
 window.__RDD_AUDIT_PHASE553={version:'5.53',dragonSilhouetteRebuilt:true,anatomicalWingFingers:true,raisedSNeck:true,articulatedFlightLimbs:true,longTaperedTail:true,highFlight:true,saveKey:'rdd5'};
 // Weather + zone badges and diagnostics, updated at low frequency.
 let lastBadge=0;function badgesTick(){const now=performance.now();if(now-lastBadge<800)return;lastBadge=now;addBadges();}
 // Lore: fifteen short original stories; each page is saved in S.codexLore and shown in the unified notebook.
 const lore=[
 'Ngày đầu tiên, đom đóm thắp một ngọn đèn nhỏ để dẫn những giấc mơ lạc đường về nhà.',
 'Dưới gốc cây linh hồn, mỗi chiếc lá giữ hộ khu rừng một lời hứa chưa nói thành lời.',
 'Thác Ngân Hà chảy ngược lên trời vào những đêm có người biết lắng nghe.',
 'Hồ Trăng không giữ bóng người; hồ chỉ giữ điều dịu dàng nhất họ từng đánh mất.',
 'Cáo lửa nhặt một sao băng và đổi nó lấy mùa xuân cho khu vườn ngủ quên.',
 'Mèo rừng tin rằng mọi ngôi nhà đều bắt đầu từ một ô cửa có ánh đèn.',
 'Cú đêm không xua bóng tối. Cú chỉ ngồi cạnh nó cho đến khi bình minh đến.',
 'Bướm tinh tú bay qua những giấc mơ và để lại một chấm sáng ở nơi lòng người can đảm.',
 'Rái cá suối cất tiếng cười trong viên sỏi, để dòng nước chẳng bao giờ quên niềm vui.',
 'Hươu sao mang trên gạc những chòm sao mà bầu trời đã quên tên.',
 'Thỏ tuyết nghe thấy hạt giống lớn lên, dù mặt đất im lìm dưới lớp sương.',
 'Hạc trăng chỉ dang cánh khi mặt hồ đủ yên để soi thấy bầu trời.',
 'Rồng mầm ngủ trong hạt cây, mơ về một khu rừng chưa từng có mùa chia lìa.',
 'Người giữ lửa không cần ngọn lửa lớn; chỉ cần đủ ấm để ai đó muốn ở lại.',
 'Khi đom đóm cùng sáng, con đường nhỏ cũng có thể trở thành một dải ngân hà.'
 ];
 window.__RDD_LORE=lore;
 S.codexLore=Array.isArray(S.codexLore)?S.codexLore:[];
 function lorePanel(){show(`<h3>📖 Cổ ngữ Rừng Đom Đóm</h3><p>Mỗi trang là một mẩu ký ức được tìm thấy trong Giá sách cổ.</p>${lore.map((v,i)=>`<p style="padding:8px;border-bottom:1px solid #ffffff15;opacity:${S.codexLore.includes(i)?1:.6}"><b>Trang ${i+1}</b> · ${S.codexLore.includes(i)?v:'Chưa mở khóa — hãy đọc sách trong Tổ ấm.'}</p>`).join('')}`)}
 document.addEventListener('click',e=>{const b=e.target.closest('[data-vii]');if(!b)return;const key=b.dataset.vii;if(key==='audio'){ensureAudio();const on=!!S.snd;S.snd=on?0:1;if(master)master.gain.setTargetAtTime(S.snd?.8:0,A.currentTime,.08);if(!S.snd)stopTrack();else startTrack(true);if(typeof save==='function')save();show(`<h3>🔊 Âm thanh</h3><p>${S.snd?'Đang bật nhạc nền và âm thanh môi trường.':'Đã tắt âm thanh.'}</p><div class="vii-row"><button id="vii-next">Đổi giai điệu</button><button id="vii-close">Đóng</button></div>`)}else if(key==='systems'){show(`<h3>🌿 Hành trình</h3><p>Mở các hệ thống đã có trong game bằng các mục bên dưới.</p><div class="vii-row"><button id="vii-exp">🌱 Linh mạch & Khu vườn</button><button id="vii-mini">🎮 Mini-game</button><button id="vii-world">🌌 Thư viện</button></div>`)}else if(key==='pets'){if($q('#pet-tab'))$q('#pet-tab').click();else show(`<h3>🐾 Bạn rừng</h3><p>Cấp độ bạn rừng gốc: ${S.pet.join(' · ')}</p><p>Bạn rừng mở rộng: ${(S.artisanIX?.pets||[]).join(' · ')||'Chưa có'}</p>`)}else if(key==='lore')lorePanel();else if(key==='custom'){const opts=[['gold','Ánh Vàng Ấm','#e8b95f','#d9434f'],['fox','Lửa Hồ Ly','#ff8c46','#f04b37'],['crystal','Pha Lê Ngân Hà','#8deaff','#7b61e8'],['violet','Tím Tinh Tú','#c5a2ff','#8c55d9']];const cur=S.customLook||'gold';show(`<h3>🎨 Đèn lồng & khăn choàng</h3><p>Một số sắc màu mở khóa theo thành tựu; bạn có thể thử các kiểu đã tìm thấy.</p>${opts.map(o=>`<button data-look="${o[0]}" style="margin:3px;border-color:${o[2]}">${o[1]} ${cur===o[0]?'✓':''}</button>`).join('')}<p>Kiểu hiện tại: ${cur}</p>`)}else if(key==='diag'){const z=inside?0:Math.max(0,Math.min(3,Math.round((cam||0)/Math.max(1,W))));show(`<h3>⚙️ Trạng thái game</h3><p>Khu vực: ${['Nhà gỗ','Rừng linh hồn','Thác ngân hà','Hồ trăng'][z]}</p><p>Thời tiết: ${weatherNames[S.wth||0]}</p><p>Ánh sáng: ${Math.floor(S.l).toLocaleString('vi-VN')} · FPS mục tiêu 60</p><p>Canvas: ${typeof cv!=='undefined'?cv.width+' × '+cv.height:'—'}</p><p>Âm thanh: ${A?A.state:'chưa khởi tạo'} · Lưu: rdd5</p><p>AI bạn rừng: mèo săn đom đóm ${(petAI?.catches||0)} lần · cáo canh sao băng</p><div class="vii-row"><button id="vii-export">Sao chép mã lưu</button><button id="vii-close">Đóng</button></div>`)} });
 document.addEventListener('click',e=>{const look=e.target.closest('[data-look]');if(look){S.customLook=look.dataset.look;save();if(typeof toast==='function')toast('🎨 Đã đổi phong cách đèn lồng và khăn choàng.');show(`<h3>🎨 Đã cập nhật</h3><p>Phong cách hiện tại: ${S.customLook}</p><button id="vii-close">Đóng</button>`);return}if(e.target.id==='vii-close')close();if(e.target.id==='vii-next'){stopTrack();musicIndex=-1;startTrack(true);close()}if(e.target.id==='vii-exp'){$q('#exp-launch')?.click();close()}if(e.target.id==='vii-mini'){$q('#minigame-launch')?.click();close()}if(e.target.id==='vii-world'){$q('#world-launch')?.click();close()}if(e.target.id==='vii-export'){try{const txt=JSON.stringify(S);navigator.clipboard?.writeText(txt).then(()=>toast('Đã sao chép mã lưu hợp nhất.')).catch(()=>prompt('Sao chép mã lưu:',txt));}catch(_){prompt('Sao chép mã lưu:',JSON.stringify(S))}}});
 // Reading rewards and lore unlocks are handled by core arrive().
 // Save and restore audio zone only when a zone change is detected; one AudioContext A is reused.
 let lastZone=-1;setInterval(()=>{try{badgesTick();const z=inside?0:Math.max(0,Math.min(3,Math.round((cam||0)/Math.max(1,W))));if(z!==lastZone){lastZone=z;if(S.snd&&A)startTrack(true)}if(A&&A.state==='suspended'&&S.snd){} }catch(_){}},900);
 // Store active buffs in S so save/import includes their expiration timestamps.
 S.petBuffs=S.petBuffs||{};for(const [k,v] of Object.entries(S.petBuffs))if(v>Date.now())buffs.set(k,v);
 const oldSaveWrap=window.save;window.save=function(){S.petBuffs=Object.fromEntries([...buffs.entries()]);S.codexLore=S.codexLore||[];S.customLook=S.customLook||'gold';return oldSaveWrap&&oldSaveWrap()};
 // UI panel system button delegates into existing modules; no extra overlay or AudioContext.
 console.info('[Rừng Đom Đóm] Major Overhaul IV systems ready.');
})();

