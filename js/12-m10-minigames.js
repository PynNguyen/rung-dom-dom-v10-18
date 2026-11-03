
/* ===== M10 · FOUR REAL MINIGAMES ===== */
(() => {
'use strict';
const $ = s => document.querySelector(s), rnd = (a, b) => a + Math.random()*(b - a), clamp = (v, a, b) => Math.max(a, Math.min(b, v));
if ($('#m10')) return;
if (!S.mg || !S.mg.best) S.mg = { best:[0,0,0,0], stars:[0,0,0,0], plays:0, last:[0,0,0,0] };
const ZN = ['Nhà gỗ', 'Rừng linh hồn', 'Thác ngân hà', 'Hồ trăng'];
const DEF = [
  { id:'cabin',  ic:'🕯️', n:'Ký ức bên lò sưởi', how:'Nhìn các ngọn nến sáng lên rồi bấm lại đúng thứ tự. Mỗi vòng thêm một nến, có 3 mạng.', pal:['#33190a', '#080403'], goal:'Mốc sao: 2 · 4 · 6 vòng' },
  { id:'forest', ic:'✨', n:'Bắt đom đóm', how:'Chạm đom đóm trong 30 giây. Đom đóm vàng được 5 điểm, bướm đêm tím làm mất điểm và thời gian.', pal:['#0c2d2a', '#030a10'], goal:'Mốc sao: 25 · 50 · 80 điểm' },
  { id:'water',  ic:'🎵', n:'Nhịp thác nước', how:'Hạt sáng rơi xuống ba dòng nước. Chạm vào dòng đó đúng lúc hạt chạm vòng sáng, chuỗi liên tiếp nhân điểm.', pal:['#0d2c58', '#040a1c'], goal:'Mốc sao: 50% · 75% · 90% chính xác' },
  { id:'moon',   ic:'🌙', n:'Nối chòm sao', how:'Chạm các ngôi sao theo thứ tự số 1, 2, 3… Có 4 chòm sao, mỗi chòm 10 giây, chạm sai bị trừ giờ.', pal:['#1b1450', '#03030e'], goal:'Mốc sao: 1 · 3 · 4 chòm' }
];
const NOTE = [5, 7, 9, 12];
const snd = (n, v = .16, l = .8) => { try { if (typeof chime === 'function') chime(n, v, l); } catch (e) {} };
const vib = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };

/* ---------- DOM ---------- */
const ov = document.createElement('div'); ov.id = 'm10';
ov.innerHTML = '<div class="m10-top"><button id="m10-x" type="button" aria-label="Quay lại">←</button><b id="m10-t">Mini game</b><span id="m10-s" class="m10-hud"></span></div><canvas id="m10-c"></canvas><div id="m10-menu" class="m10-menu"></div><div id="m10-res" class="m10-res"></div>';
document.body.appendChild(ov);
const cv = $('#m10-c'), c = cv.getContext('2d'), menuEl = $('#m10-menu'), resEl = $('#m10-res'), titleEl = $('#m10-t'), hudEl = $('#m10-s');
let Wd = 0, Hd = 0, G = null, raf = 0, last = 0, T = 0, zi = 0;
const FX = [], POP = [];
const pop = (x, y, txt, col) => POP.push({ x, y, txt, col, t:0 });
const fxb = (x, y, col, n = 10) => { for (let i = 0; i < n; i++) { const a = Math.random()*6.283, s = rnd(40, 150); FX.push({ x, y, vx:Math.cos(a)*s, vy:Math.sin(a)*s - 30, t:0, col, r:rnd(1.5, 3.4) }); } };
function fit() { const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); Wd = r.width; Hd = r.height; cv.width = Math.round(Wd*d); cv.height = Math.round(Hd*d); c.setTransform(d, 0, 0, d, 0, 0); }
function glow(x, y, r, col, a) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, col + '00'); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = a; c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.restore(); }
function starPath(x, y, r, n = 5, k = .45) { c.beginPath(); for (let i = 0; i < n*2; i++) { const a = -Math.PI/2 + i*Math.PI/n, rr = i % 2 ? r*k : r; c.lineTo(x + Math.cos(a)*rr, y + Math.sin(a)*rr); } c.closePath(); }
function text(t, x, y, size, col, al = 'center', w = '800') { c.font = w + ' ' + size + 'px system-ui,sans-serif'; c.textAlign = al; c.fillStyle = col; c.fillText(t, x, y); }
const SK = Array.from({ length:46 }, (_, i) => [(Math.sin(i*12.9898)*43758.5453 % 1 + 1) % 1, (Math.sin(i*78.233)*12345.6789 % 1 + 1) % 1, i]);
function bg(pal) {
  const g = c.createLinearGradient(0, 0, 0, Hd); g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1]); c.fillStyle = g; c.fillRect(0, 0, Wd, Hd);
  SK.forEach(s => { c.globalAlpha = .25 + .5*Math.abs(Math.sin(T*1.3 + s[2])); c.fillStyle = '#fff'; c.fillRect(s[0]*Wd, s[1]*Hd*.7, 1.6, 1.6); }); c.globalAlpha = 1;
}

/* ---------- 1 · Ký ức bên lò sưởi (memory) ---------- */
function mkCabin() {
  const g = { score:0, round:1, lives:3, seq:[], phase:'show', i:0, t:-.6, lit:-1, litT:0, litK:-1, wait:0, rounds:0, flash:0 };
  const COL = ['#ffd36a', '#ff8a4c', '#7de8ff', '#c9a5ff'];
  const pads = () => { const R = Math.min(Wd*.085, 42), y = Hd*.56; return [0,1,2,3].map(k => ({ x:Wd*(.17 + k*.22), y, R })); };
  const rn = () => Math.floor(Math.random()*4);
  g.seq = [rn(), rn(), rn()];
  const replay = () => { g.phase = 'show'; g.i = 0; g.t = -.6; g.litK = -1; };
  g.update = dt => {
    g.litT = Math.max(0, g.litT - dt); g.flash = Math.max(0, g.flash - dt);
    if (g.phase === 'show') { g.t += dt; const k = Math.floor(g.t/.72);
      if (g.t >= 0 && k < g.seq.length && g.litK !== k) { g.litK = k; g.lit = g.seq[k]; g.litT = .5; snd(NOTE[g.lit], .2, .9); }
      if (k >= g.seq.length) { g.phase = 'input'; g.i = 0; } }
    else if (g.phase === 'ok' || g.phase === 'bad') { g.wait -= dt; if (g.wait <= 0) replay(); }
  };
  g.tap = (x, y) => {
    if (g.phase !== 'input') return;
    const ps = pads(); const k = ps.findIndex(p => Math.hypot(p.x - x, p.y - p.R*.3 - y) < p.R*1.5); if (k < 0) return;
    g.lit = k; g.litT = .32; snd(NOTE[k], .2, .9); vib(10);
    if (k === g.seq[g.i]) { g.i++; g.score += 2; fxb(ps[k].x, ps[k].y - 20, COL[k], 6);
      if (g.i >= g.seq.length) { g.score += 8 + g.round*2; g.rounds++; pop(Wd/2, Hd*.3, 'Đúng rồi! +' + (8 + g.round*2), '#ffe07d'); g.round++; if (g.round > 6) { g.end(); return; } g.seq.push(rn()); g.phase = 'ok'; g.wait = 1; } }
    else { window.__RDD_MGM&&window.__RDD_MGM.miss(); g.lives--; g.flash = .45; pop(Wd/2, Hd*.3, 'Sai rồi!', '#ff9b9b'); vib(40); if (g.lives <= 0) { g.end(); return; } g.phase = 'bad'; g.wait = 1.1; }
  };
  g.hud = () => '❤ ' + g.lives + ' · Vòng ' + Math.min(g.round, 6) + '/6 · ✦ ' + g.score;
  g.rate = () => g.rounds >= 6 ? 3 : g.rounds >= 4 ? 2 : g.rounds >= 2 ? 1 : 0;
  g.draw = () => {
    const gr = c.createRadialGradient(Wd/2, Hd*.5, 10, Wd/2, Hd*.5, Wd*.8); gr.addColorStop(0, 'rgba(255,140,50,.3)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = gr; c.fillRect(0, 0, Wd, Hd);
    if (g.flash > 0) { c.fillStyle = 'rgba(255,60,60,' + g.flash*.3 + ')'; c.fillRect(0, 0, Wd, Hd); }
    const my = Hd*.56 + Math.min(Wd*.085, 42)*1.1 + Hd*.07;
    c.fillStyle = '#4a2c18'; c.fillRect(Wd*.03, my, Wd*.94, Hd*.05); c.fillStyle = '#6a4326'; c.fillRect(Wd*.03, my, Wd*.94, 4); c.fillStyle = '#2a170c'; c.fillRect(Wd*.03, my + Hd*.05, Wd*.94, Hd*.12);
    pads().forEach((p, k) => {
      const lit = g.litT > 0 && g.lit === k, fl = Math.sin(T*9 + k*2)*.5;
      c.fillStyle = '#efe4c6'; c.fillRect(p.x - p.R*.4, p.y + p.R*.2, p.R*.8, my - p.y - p.R*.2); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(p.x + p.R*.08, p.y + p.R*.2, p.R*.32, my - p.y - p.R*.2);
      c.fillStyle = '#3a2a1a'; c.fillRect(p.x - 1, p.y + p.R*.05, 2, p.R*.2);
      const fh = lit ? p.R*1.35 : p.R*.62, fw = lit ? p.R*.55 : p.R*.26;
      glow(p.x, p.y - fh*.4, lit ? p.R*3.2 : p.R*1.1, COL[k], lit ? .95 : .28);
      c.fillStyle = lit ? COL[k] : '#c9923c'; c.beginPath(); c.moveTo(p.x, p.y - fh + fl);
      c.quadraticCurveTo(p.x + fw, p.y - fh*.3, p.x, p.y + p.R*.05); c.quadraticCurveTo(p.x - fw, p.y - fh*.3, p.x, p.y - fh + fl); c.fill();
      if (lit) { c.fillStyle = '#fff6dc'; c.beginPath(); c.ellipse(p.x, p.y - fh*.28, fw*.35, fh*.28, 0, 0, 7); c.fill(); }
    });
    text(g.phase === 'show' ? 'Nhìn kỹ thứ tự nến…' : g.phase === 'input' ? 'Đến lượt bạn!' : g.phase === 'ok' ? 'Tuyệt!' : 'Xem lại nhé', Wd/2, Hd*.16, 20, '#fff3cc');
    for (let i = 0; i < g.seq.length; i++) { c.fillStyle = (g.phase === 'input' && i < g.i) ? '#ffe07d' : 'rgba(255,255,255,.22)'; c.beginPath(); c.arc(Wd/2 + (i - (g.seq.length - 1)/2)*18, Hd*.22, 5, 0, 7); c.fill(); }
  };
  return g;
}

/* ---------- 2 · Bắt đom đóm (reflex) ---------- */
function mkForest() {
  const g = { score:0, time:30, flies:[], sp:.2, combo:0, caught:0 };
  g.update = dt => {
    g.time -= dt; if (g.time <= 0) { g.end(); return; }
    g.sp -= dt;
    if (g.sp <= 0) { g.sp = Math.max(.3, .85 - (30 - g.time)*.02); const r = Math.random(), k = r < .12 ? 'g' : r < .27 ? 'm' : 'n';
      g.flies.push({ x:rnd(.1, .9)*Wd, y:rnd(.16, .88)*Hd, vx:rnd(-34, 34), vy:rnd(-26, 26), ph:rnd(0, 6), life:k === 'g' ? 1.7 : 2.7, max:k === 'g' ? 1.7 : 2.7, k, r:k === 'g' ? 22 : 26 }); }
    g.flies.forEach(f => { f.life -= dt; f.x += f.vx*dt + Math.sin(f.ph + T*3)*.6; f.y += f.vy*dt + Math.cos(f.ph + T*2.2)*.6; });
    g.flies = g.flies.filter(f => { if (f.life <= 0) { if (f.k === 'n') g.combo = 0; return false; } return true; });
  };
  g.tap = (x, y) => {
    let best = null, bd = 1e9; g.flies.forEach(f => { const d = Math.hypot(f.x - x, f.y - y); if (d < f.r + 20 && d < bd) { bd = d; best = f; } });
    if (!best) return; g.flies.splice(g.flies.indexOf(best), 1);
    if (best.k === 'm') { g.score = Math.max(0, g.score - 3); g.time -= 2; g.combo = 0; pop(best.x, best.y, '-3', '#c9a5ff'); window.__RDD_MGM&&window.__RDD_MGM.miss(); fxb(best.x, best.y, '#9b6cff', 12); snd(0, .12, .6); vib(40); return; }
    g.combo++; const mult = 1 + Math.min(3, Math.floor(g.combo/4)), gain = (best.k === 'g' ? 5 : 1)*mult; g.score += gain; g.caught++;
    pop(best.x, best.y, '+' + gain, best.k === 'g' ? '#ffe07d' : '#d6ffb8'); fxb(best.x, best.y, best.k === 'g' ? '#ffd36a' : '#b8ff9a', best.k === 'g' ? 16 : 8); snd(NOTE[g.combo % 4] + (best.k === 'g' ? 3 : 0), .16, .7); vib(8);
  };
  g.hud = () => '⏱ ' + Math.max(0, g.time).toFixed(0) + 's · ✦ ' + g.score + (g.combo >= 4 ? ' · ×' + (1 + Math.min(3, Math.floor(g.combo/4))) : '');
  g.rate = () => g.score >= 80 ? 3 : g.score >= 50 ? 2 : g.score >= 25 ? 1 : 0;
  g.draw = () => {
    for (let i = 0; i < 7; i++) { const x = (i*.17 + .05)*Wd, h = Hd*(.22 + (i % 3)*.08); c.fillStyle = 'rgba(2,10,14,' + (.55 + (i % 2)*.2) + ')'; c.beginPath(); c.moveTo(x - 36, Hd); c.lineTo(x, Hd - h); c.lineTo(x + 36, Hd); c.fill(); }
    g.flies.forEach(f => {
      const a = clamp(Math.min(f.life, f.max - f.life + .25)*2.2, 0, 1); c.globalAlpha = a;
      if (f.k === 'm') { const fl = Math.sin(T*18 + f.ph)*.5 + .6; glow(f.x, f.y, 26, '#8a5cff', .5);
        c.fillStyle = '#5a2fa8'; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(f.x + s*10*fl, f.y - 3, 11*fl + 3, 8, s*.5, 0, 7); c.fill(); }
        c.fillStyle = '#1b0d3a'; c.beginPath(); c.ellipse(f.x, f.y, 3.5, 8, 0, 0, 7); c.fill(); }
      else { const gold = f.k === 'g', col = gold ? '#ffcf4a' : '#c8ff8a', r = gold ? 15 : 11, pulse = 1 + Math.sin(T*6 + f.ph)*.18;
        glow(f.x, f.y, r*3.2*pulse, col, .85); c.fillStyle = gold ? '#fff2b8' : '#f3ffd9'; c.beginPath(); c.arc(f.x, f.y, r*.34, 0, 7); c.fill();
        if (gold) { c.strokeStyle = 'rgba(255,224,120,.7)'; c.lineWidth = 1.5; c.beginPath(); c.arc(f.x, f.y, r*1.5 + Math.sin(T*8)*2, 0, 7); c.stroke(); } }
      c.globalAlpha = 1; });
  };
  return g;
}

/* ---------- 3 · Nhịp thác nước (rhythm) ---------- */
function mkWater() {
  const g = { score:0, t:-1.6, notes:[], hits:0, total:0, combo:0, max:0, flash:[0,0,0] }, FALL = 1.55;
  let tt = 1.4; for (let i = 0; i < 34; i++) { tt += Math.random() < .25 ? .36 : .72; g.notes.push({ t:tt, l:Math.floor(Math.random()*3), done:0 }); }
  g.total = g.notes.length; g.endT = tt + 1.2;
  const LX = l => Wd*(1/6 + l/3), HY = () => Hd*.78;
  g.update = dt => {
    g.t += dt; window.__RDD_MGM&&window.__RDD_MGM.sync(g.t); g.flash = g.flash.map(v => Math.max(0, v - dt*3));
    g.notes.forEach(n => { if (!n.done && g.t - n.t > .27) { n.done = 2; g.combo = 0; pop(LX(n.l), HY() - 24, 'Trượt', '#8fa3d6'); window.__RDD_MGM&&window.__RDD_MGM.miss(.5); } });
    if (g.t > g.endT) g.end();
  };
  g.tap = (x, y) => {
    const l = clamp(Math.floor(x/Wd*3), 0, 2); let best = null, bd = 9;
    g.notes.forEach(n => { if (!n.done && n.l === l) { const d = Math.abs(g.t - n.t); if (d < bd) { bd = d; best = n; } } });
    g.flash[l] = 1;
    if (best && bd < .27) { best.done = 1; const q = bd < .09 ? 3 : bd < .18 ? 2 : 1; g.hits += q === 1 ? .5 : 1; g.combo++; g.max = Math.max(g.max, g.combo);
      const gain = q*(1 + Math.floor(g.combo/8)); g.score += gain; pop(LX(l), HY() - 30, q === 3 ? 'Hoàn hảo!' : q === 2 ? 'Tốt' : 'Khá', q === 3 ? '#ffe07d' : '#bfe6ff');
      fxb(LX(l), HY(), q === 3 ? '#ffd36a' : '#8fe3ff', q === 3 ? 14 : 8); snd([5, 7, 9][l] + (q === 3 ? 3 : 0), .17, .8); vib(10); }
    else { g.combo = 0; vib(25); window.__RDD_MGM&&window.__RDD_MGM.miss(.6); }
  };
  g.acc = () => g.hits/g.total;
  g.hud = () => 'Chuỗi ' + g.combo + ' · ✦ ' + g.score;
  g.rate = () => g.acc() >= .9 ? 3 : g.acc() >= .75 ? 2 : g.acc() >= .5 ? 1 : 0;
  g.draw = () => {
    for (let l = 0; l < 3; l++) { const x = LX(l), w = Wd/3 - 14;
      const gr = c.createLinearGradient(0, 0, 0, Hd); gr.addColorStop(0, 'rgba(90,170,255,.02)'); gr.addColorStop(1, 'rgba(90,200,255,' + (.18 + g.flash[l]*.25) + ')'); c.fillStyle = gr; c.fillRect(x - w/2, 0, w, Hd);
      c.strokeStyle = 'rgba(190,230,255,.25)'; c.lineWidth = 2; for (let k = 0; k < 6; k++) { const yy = ((T*140 + k*Hd/6 + l*40) % Hd); c.beginPath(); c.moveTo(x - w*.3 + Math.sin(k + l)*w*.2, yy); c.lineTo(x - w*.3 + Math.sin(k + l)*w*.2, yy + 22); c.stroke(); } }
    const hy = HY(); for (let l = 0; l < 3; l++) { const x = LX(l); glow(x, hy, 56, '#6fd8ff', .35 + g.flash[l]*.5); c.strokeStyle = 'rgba(210,245,255,' + (.6 + g.flash[l]*.4) + ')'; c.lineWidth = 3; c.beginPath(); c.arc(x, hy, 26 + g.flash[l]*6, 0, 7); c.stroke(); }
    g.notes.forEach(n => { if (n.done) return; const p = (g.t - n.t)/FALL + 1; if (p < 0 || p > 1.3) return; const x = LX(n.l), y = hy - (1 - p)*(hy - Hd*.04);
      c.strokeStyle = 'rgba(160,225,255,.35)'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y - 46); c.lineTo(x, y); c.stroke();
      glow(x, y, 34, '#8fe3ff', .8); c.fillStyle = '#f2fcff'; c.beginPath(); c.arc(x, y, 12, 0, 7); c.fill(); });
    if (g.t < 0) text('Chuẩn bị…', Wd/2, Hd*.4, 22, '#bfe6ff');
  };
  return g;
}

/* ---------- 4 · Nối chòm sao (precision + speed) ---------- */
function mkMoon() {
  const g = { score:0, round:0, rounds:0, stars:[], next:0, time:10, wait:0, shake:0 };
  const gen = () => { const N = [4, 5, 6, 7][g.round], pts = []; let guard = 0, md = Math.min(Wd, Hd)*.2;
    while (pts.length < N && guard++ < 600) { const p = { x:rnd(.12, .88)*Wd, y:rnd(.16, .78)*Hd }; if (pts.every(q => Math.hypot(q.x - p.x, q.y - p.y) > md)) pts.push(p); if (guard % 120 === 0) md *= .85; }
    g.stars = pts; g.next = 0; g.time = 10; };
  gen();
  g.update = dt => { g.shake = Math.max(0, g.shake - dt); if (g.wait > 0) { g.wait -= dt; if (g.wait <= 0) gen(); return; } g.time -= dt; if (g.time <= 0) g.end(); };
  g.tap = (x, y) => {
    if (g.wait > 0) return; const rad = Math.max(30, Math.min(Wd, Hd)*.075), hit = g.stars.findIndex(s => Math.hypot(s.x - x, s.y - y) < rad); if (hit < 0) return;
    if (hit === g.next) { const s = g.stars[hit]; g.next++; g.score += 3; snd(NOTE[hit % 4] + Math.floor(hit/4)*3, .17, .9); fxb(s.x, s.y, '#ffe9a8', 10); vib(10);
      if (g.next >= g.stars.length) { const b = 10 + Math.round(g.time*2); g.score += b; g.rounds++; g.round++; pop(Wd/2, Hd*.14, 'Chòm sao hoàn thành! +' + b, '#ffe07d'); arp && arp([0, 2, 4, 7], .12); if (g.round >= 4) { g.end(); return; } g.wait = 1.1; } }
    else { window.__RDD_MGM&&window.__RDD_MGM.miss(); g.time -= 1.5; g.shake = .3; g.score = Math.max(0, g.score - 1); pop(g.stars[hit].x, g.stars[hit].y, '-1.5s', '#ff9b9b'); vib(40); }
  };
  g.hud = () => '⏱ ' + Math.max(0, g.time).toFixed(0) + 's · Chòm ' + Math.min(g.round + 1, 4) + '/4 · ✦ ' + g.score;
  g.rate = () => g.rounds >= 4 ? 3 : g.rounds >= 3 ? 2 : g.rounds >= 1 ? 1 : 0;
  g.draw = () => {
    const my = Hd*.9; glow(Wd*.72, Hd*.12, 90, '#f2eeff', .5); c.fillStyle = '#f6f2dc'; c.beginPath(); c.arc(Wd*.72, Hd*.12, 24, 0, 7); c.fill();
    c.fillStyle = 'rgba(40,70,130,.35)'; c.fillRect(0, my, Wd, Hd - my); glow(Wd*.72, my + 8, 80, '#cfe0ff', .18);
    const sh = g.shake > 0 ? Math.sin(T*80)*4 : 0; c.save(); c.translate(sh, 0);
    c.strokeStyle = 'rgba(255,224,140,.85)'; c.lineWidth = 2.5; c.lineJoin = 'round'; c.shadowColor = '#ffd36a'; c.shadowBlur = 10; c.beginPath();
    for (let i = 0; i < Math.min(g.next, g.stars.length); i++) { const s = g.stars[i]; i ? c.lineTo(s.x, s.y) : c.moveTo(s.x, s.y); } c.stroke(); c.shadowBlur = 0;
    g.stars.forEach((s, i) => { const done = i < g.next, nx = i === g.next && g.wait <= 0, r = nx ? 17 + Math.sin(T*7)*2.5 : 14;
      glow(s.x, s.y, nx ? 48 : 30, done ? '#ffd36a' : '#9fb8ff', done ? .8 : nx ? .7 : .35);
      starPath(s.x, s.y, r); c.fillStyle = done ? '#fff1b8' : nx ? '#ffffff' : '#b9c9ff'; c.fill();
      if (nx) { c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2; c.beginPath(); c.arc(s.x, s.y, r + 9 + Math.sin(T*5)*3, 0, 7); c.stroke(); }
      text(String(i + 1), s.x, s.y + r + 18, 14, done ? '#ffe9a8' : '#dfe8ff'); });
    c.restore();
    c.fillStyle = 'rgba(255,255,255,.1)'; c.fillRect(Wd*.1, Hd*.045, Wd*.8, 5); c.fillStyle = g.time < 3 ? '#ff7b7b' : '#8fe3ff'; c.fillRect(Wd*.1, Hd*.045, Wd*.8*clamp(g.time/10, 0, 1), 5);
  };
  return g;
}
const MK = [mkCabin, mkForest, mkWater, mkMoon];

/* ---------- engine ---------- */
function loop(t) {
  if (!G) return; const dt = Math.min(.05, (t - last)/1000 || 0); last = t; T += dt;
  if (G.cd > 0) G.cd -= dt; else if (!G.over) G.update(dt);
  FX.forEach(p => { p.t += dt; p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 220*dt; }); for (let i = FX.length - 1; i >= 0; i--) if (FX[i].t > .8) FX.splice(i, 1);
  POP.forEach(p => { p.t += dt; }); for (let i = POP.length - 1; i >= 0; i--) if (POP[i].t > 1.2) POP.splice(i, 1);
  c.clearRect(0, 0, Wd, Hd); bg(DEF[zi].pal); G.draw();
  FX.forEach(p => { c.globalAlpha = clamp(1 - p.t/.8, 0, 1); c.fillStyle = p.col; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fill(); }); c.globalAlpha = 1;
  POP.forEach(p => { c.globalAlpha = clamp(1.2 - p.t, 0, 1); text(p.txt, p.x, p.y - p.t*38, 18, p.col); }); c.globalAlpha = 1;
  if (G.cd > 0) { c.fillStyle = 'rgba(3,6,18,.55)'; c.fillRect(0, 0, Wd, Hd); text(String(Math.ceil(G.cd)), Wd/2, Hd*.46, 72, '#ffe9b0'); text(DEF[zi].n, Wd/2, Hd*.46 + 46, 17, '#c8d3f5', 'center', '700'); }
  hudEl.textContent = G.hud ? G.hud() : '';
  raf = requestAnimationFrame(loop);
}
function begin(z) {
  zi = z; resEl.classList.remove('on'); menuEl.classList.remove('on'); fit(); FX.length = 0; POP.length = 0;
  G = MK[z](); G.cd = 3; G.over = false; G.end = () => finish(G); window.__RDD_MGM&&window.__RDD_MGM.start(DEF[z].id); titleEl.textContent = DEF[z].ic + ' ' + DEF[z].n;
  last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
  try { typeof initAudio === 'function' && initAudio(); } catch (e) {}
}
function finish(g) {
  if (!g || g.over) return; g.over = true; window.__RDD_MGM&&window.__RDD_MGM.finish(g.score); const z = zi, stars = g.rate(), score = g.score, now = Date.now();
  const cool = now - S.mg.last[z] < 120000, zb = (typeof currentZone === 'function' && currentZone() === z) ? 1.25 : 1;
  const secs = 40 + stars*110 + Math.min(score, 120)*1.2, cp = typeof cps === 'function' ? cps() : 0;
  let reward = Math.floor(Math.max(60, Math.min(cp*secs*(cool ? .3 : 1)*zb, cp*900 + 1000)));
  if (stars === 0) reward = Math.floor(reward*.25);
  const newBest = score > S.mg.best[z]; S.mg.best[z] = Math.max(S.mg.best[z], score); S.mg.stars[z] = Math.max(S.mg.stars[z], stars); S.mg.plays++; S.mg.last[z] = now;
  try { typeof add === 'function' ? add(reward) : (S.l += reward); typeof burst === 'function' && burst(40); typeof arp === 'function' && arp([0, 2, 4, 7, 12], .14); typeof toast === 'function' && toast('🎮 Mini game kết thúc · ' + score + ' điểm'); } catch (e) { console.warn('[m10 reward]', e); }
  const f = typeof fm === 'function' ? fm : v => String(v);
  resEl.innerHTML = '<div class="m10-box"><h3>' + DEF[z].ic + ' ' + DEF[z].n + '</h3><div class="m10-stars">' + '★'.repeat(stars) + '<span style="opacity:.25">' + '★'.repeat(3 - stars) + '</span></div>'
    + '<div class="m10-big">' + score + ' điểm</div><p>' + (newBest ? '🏆 Kỷ lục mới!' : 'Kỷ lục: ' + S.mg.best[z] + ' điểm') + '</p><p><b>+' + f(reward) + ' ánh sáng</b>' + (zb > 1 ? ' · thưởng ×1.25 vì đang ở đúng cảnh' : '') + (cool ? '<br>Chơi liên tục nên thưởng giảm, nghỉ 2 phút để nhận đầy đủ.' : '') + '</p>'
    + '<div class="m10-row"><button type="button" data-a="menu">Chọn game</button><button type="button" class="pri" data-a="again">Chơi lại</button></div></div>';
  resEl.classList.add('on'); try { typeof save === 'function' && save(); } catch (e) {}
}
function openMenu() {
  G = null; cancelAnimationFrame(raf); window.__RDD_MGM&&window.__RDD_MGM.stop(); resEl.classList.remove('on'); titleEl.textContent = '🎮 Mini game cảnh quan'; hudEl.textContent = '';
  const here = typeof currentZone === 'function' ? currentZone() : -1;
  menuEl.innerHTML = '<div class="m10-intro">Mỗi cảnh quan có một trò chơi riêng. Chơi ở đúng cảnh quan nhận thêm 25% thưởng. Thưởng tính theo sản lượng của bạn, nghỉ 2 phút giữa các lượt để nhận đầy đủ.</div>'
    + DEF.map((d, i) => '<button type="button" class="m10-card' + (i === here ? ' here' : '') + '" data-z="' + i + '"><span class="ic">' + d.ic + '</span><span><h4>' + d.n + ' · ' + ZN[i] + '</h4><p>' + d.how + '</p><div class="meta">' + '★'.repeat(S.mg.stars[i]) + '☆'.repeat(3 - S.mg.stars[i]) + ' · Kỷ lục ' + S.mg.best[i] + ' · ' + d.goal.replace('Mốc sao: ', '') + (i === here ? ' · Bạn đang ở đây' : '') + '</div></span></button>').join('');
  menuEl.classList.add('on');
}
function open() { ov.classList.add('on'); fit(); openMenu(); }
function close() { G = null; cancelAnimationFrame(raf); window.__RDD_MGM&&window.__RDD_MGM.stop(); ov.classList.remove('on'); }
$('#m10-x').onclick = () => { if (G && !G.over) { G = null; cancelAnimationFrame(raf); openMenu(); } else if (menuEl.classList.contains('on')) close(); else openMenu(); };
menuEl.addEventListener('click', e => { const b = e.target.closest('[data-z]'); if (b) begin(+b.dataset.z); });
resEl.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; if (b.dataset.a === 'again') begin(zi); else openMenu(); });
cv.addEventListener('pointerdown', e => { if (!G || G.over || G.cd > 0) return; e.preventDefault(); const r = cv.getBoundingClientRect(); G.tap(e.clientX - r.left, e.clientY - r.top); });
addEventListener('resize', () => { if (ov.classList.contains('on')) fit(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('on')) $('#m10-x').click(); });
// the legacy 🎮 entry (text card with no playfield) is replaced by this screen
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('#minigame-launch'); if (b) { e.stopImmediatePropagation(); e.preventDefault(); open(); } }, true);
window.__m10 = { open, close, begin, step:dt => { if (G) { if (G.cd > 0) G.cd -= dt; else if (!G.over) G.update(dt); } }, G:() => G, zi:() => zi };
})();


