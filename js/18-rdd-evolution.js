
/* ===== TIẾN HÓA NGOẠI HÌNH THÚ + NỘI THẤT THEO CẤP NHÀ ===== */
const PETN = ['', 'Hình dạng thường', 'Linh khí', 'Thần thú', 'Huyền thoại'], PTT = [1, 5, 12, 25];
/* nội thất: tường, trần, sàn đổi theo cấp nhà */
function houseInterior(t) {
  const L = S.hl | 0; if (L < 2) return;
  const fy = H*.672, rail = fy - H*.17, top = H*.03, bands = [[W*.095, W*.655], [W*.945, W]];
  x.save();
  for (const [a, b] of bands) {
    const g = x.createLinearGradient(0, rail, 0, fy); g.addColorStop(0, '#4a2f1b'); g.addColorStop(1, '#26170c'); x.fillStyle = g; x.fillRect(a, rail, b - a, fy - rail);
    x.globalAlpha = .55; x.fillStyle = x.createPattern(TEX_V, 'repeat'); x.fillRect(a, rail, b - a, fy - rail); x.globalAlpha = 1;
    const pw = W*.075; for (let px = a + 8; px + pw < b; px += pw + 10) { x.strokeStyle = 'rgba(15,8,4,.7)'; x.lineWidth = 2; x.strokeRect(px, rail + 10, pw, fy - rail - 20); x.strokeStyle = 'rgba(255,220,170,.15)'; x.lineWidth = 1; x.strokeRect(px + 3, rail + 13, pw - 6, fy - rail - 26); }
    x.fillStyle = '#5d3b22'; x.fillRect(a, rail - 4, b - a, 6); x.fillStyle = 'rgba(255,225,170,.25)'; x.fillRect(a, rail - 4, b - a, 1.5);
    if (L >= 3) { for (const [p, q] of [[a, b]].flatMap(([u, v]) => (u < W*.61 && v > W*.275) ? [[u, Math.min(v, W*.275)], [Math.max(u, W*.61), v]].filter(g => g[1] > g[0] + 2) : [[u, v]])) {
      const wp = x.createLinearGradient(0, top, 0, rail); wp.addColorStop(0, '#2a1f3a'); wp.addColorStop(1, '#3a2a4a'); x.fillStyle = wp; x.fillRect(p, top, q - p, rail - top - 4);
      x.fillStyle = 'rgba(255,224,150,.10)'; for (let px = p; px < q; px += 34) x.fillRect(px, top, 2, rail - top - 4);
      for (let py = H*.06; py < rail - 8; py += 34) for (let px = p + 17; px < q; px += 34) { x.beginPath(); x.arc(px + (Math.floor(py/34)%2)*17, py, 3, 0, 7); x.fill(); } } }
  }
  if (L >= 3) { x.fillStyle = '#4a2f1b'; x.fillRect(0, 0, W, top); x.fillStyle = 'rgba(255,225,170,.22)'; x.fillRect(0, top, W, 2); }
  if (L >= 4) {
    for (const bx of [W*.2, W*.5, W*.78]) { x.fillStyle = '#2c1a0d'; x.fillRect(bx - W*.012, 0, W*.024, H*.05); }
    for (const sx of [W*.255, W*.625]) { x.fillStyle = '#d9b25a'; x.fillRect(sx - 3, H*.24, 6, H*.03); x.fillStyle = '#ffd47a'; x.beginPath(); x.ellipse(sx, H*.235, 6, 9 + Math.sin(t/140 + sx), 0, 0, 7); x.fill();
      x.globalCompositeOperation = 'lighter'; glow('w', sx, H*.235, 70, .55); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1; }
  }
  if (L >= 5) { const rows = 6; for (let r = 0; r < rows; r++) { const y1 = fy + (H - fy)*r/rows, y2 = fy + (H - fy)*(r + 1)/rows; for (let c = -1; c < 15; c++) { if ((c + r)%2) continue; x.fillStyle = 'rgba(210,225,255,.07)'; x.fillRect(W*c/14, y1, W/14, y2 - y1); } }
    x.fillStyle = 'rgba(201,162,74,.65)'; x.fillRect(0, fy - 3, W, 5); }
  x.restore();
}
AC.push(['Người giữ lửa', 'Thêm củi vào lò sưởi 10 lần', () => (S.logs | 0) >= 10], ['Lửa không bao giờ tắt', 'Thêm củi vào lò sưởi 50 lần', () => (S.logs | 0) >= 50]);
function drawTeaChair(t) {                    // ghế gỗ đặt sát bàn trà, người uống trà ngồi đúng ghế này
  const sx = W*.385, sy = H*.815, sw = H*.07;
  x.save(); x.fillStyle = 'rgba(0,0,0,.3)'; x.beginPath(); x.ellipse(sx, sy + 4, sw*.7, H*.012, 0, 0, 7); x.fill();
  const wg = x.createLinearGradient(sx - sw*.5, 0, sx + sw*.5, 0); wg.addColorStop(0, '#3a2414'); wg.addColorStop(.5, '#6b4630'); wg.addColorStop(1, '#3a2414');
  x.fillStyle = wg; x.fillRect(sx - sw*.62, sy - H*.12, sw*.14, H*.12);                       // lưng ghế
  for (let k = 0; k < 3; k++) x.fillRect(sx - sw*.62 + k*sw*.05, sy - H*.12 + k*H*.012, sw*.03, H*.08);
  x.fillStyle = '#2a1a0d'; x.fillRect(sx - sw*.5, sy - H*.012, 5, H*.03); x.fillRect(sx + sw*.36, sy - H*.012, 5, H*.03);
  x.fillStyle = wg; x.beginPath(); x.roundRect(sx - sw*.6, sy - H*.028, sw*1.2, H*.018, 4); x.fill();   // mặt ghế
  x.fillStyle = 'rgba(255,225,170,.22)'; x.fillRect(sx - sw*.58, sy - H*.028, sw*1.16, 1.5); x.restore();
}
function drawHearthSeat(t) {
  const fx = W*.67, fw = W*.27, cy = H*.795, rx = fw*.62, fl = .85 + .15*Math.sin(t/140)*Math.sin(t/63 + 1);
  x.save();
  x.fillStyle = 'rgba(0,0,0,.35)'; x.beginPath(); x.ellipse(fx + fw*.5, cy + 4, rx, H*.03, 0, 0, 7); x.fill();
  const rg = x.createLinearGradient(fx, 0, fx + fw, 0); rg.addColorStop(0, '#6e2a2e'); rg.addColorStop(.5, '#9a3b3a'); rg.addColorStop(1, '#6e2a2e');
  x.fillStyle = rg; x.beginPath(); x.ellipse(fx + fw*.5, cy, rx, H*.026, 0, 0, 7); x.fill();
  x.strokeStyle = 'rgba(240,200,120,.55)'; x.lineWidth = 1.5; x.beginPath(); x.ellipse(fx + fw*.5, cy, rx*.86, H*.02, 0, 0, 7); x.stroke();
  x.fillStyle = 'rgba(255,150,60,' + (.16*fl) + ')'; x.beginPath(); x.ellipse(fx + fw*.5, cy, rx*.9, H*.022, 0, 0, 7); x.fill();
  const sx = W*.70, sy = H*.815, sw = H*.05;           // ghế đẩu gỗ
  x.fillStyle = '#2a1a0d'; x.fillRect(sx - sw*.45, sy - H*.012, 4, H*.03); x.fillRect(sx + sw*.4, sy - H*.012, 4, H*.03);
  const tg = x.createLinearGradient(0, sy - H*.028, 0, sy); tg.addColorStop(0, '#7a5230'); tg.addColorStop(1, '#4a2f1b');
  x.fillStyle = tg; x.beginPath(); x.ellipse(sx, sy - H*.012, sw*.62, H*.012, 0, 0, 7); x.fill(); x.fillStyle = '#5a3a22'; x.fillRect(sx - sw*.62, sy - H*.012, sw*1.24, H*.012);
  x.fillStyle = 'rgba(255,225,170,.25)'; x.fillRect(sx - sw*.6, sy - H*.012, sw*1.2, 1.5);
  x.restore();
}
const roomX0 = roomX; roomX = function (t) { houseInterior(t); roomX0(t); drawHearthSeat(t); drawTeaChair(t); };
/* mô tả bậc tiến hóa trên các hàng bạn rừng */
const ui4 = ui;
ui = function () {
  ui4();
  const lab = lv => { const tr = tierOf(lv), nx = PTT[tr]; return (tr ? 'Bậc ' + PETN[tr] : 'Chưa có') + (nx ? ` · bậc kế ở cấp ${nx}` : ' · tối đa'); };
  try { if (typeof prow !== 'undefined') prow.forEach((r, i) => { const t = PET[i].d + ' · ' + lab(S.pet[i] | 0); if (r.d.textContent !== t) r.d.textContent = t; }); } catch (_) {}
  try { if (typeof sprow !== 'undefined') sprow.forEach((r, i) => { const base = (SP2[i].d || '').split(' · ')[0], t = base + ' · ' + lab(S.pet2[i] | 0); if (r.d && r.d.textContent !== t) r.d.textContent = t; }); } catch (_) {}
};

/* ===== XEM TRƯỚC TIẾN HÓA: đặt mọi cấp theo mốc, có hoàn tác ===== */
(() => {
  const KEY = 'rdd_preview_snap', MARK = [1, 5, 12, 25, 50];
  const snap = () => { try { if (localStorage.getItem(KEY)) return; localStorage.setItem(KEY, JSON.stringify({ pet: S.pet, pet2: S.pet2, home: S.home, hl: S.hl, own: S.own })); } catch (_) {} };
  const refresh = () => { try { save(); } catch (_) {} try { syncF(); } catch (_) {} try { ui(); } catch (_) {} };
  const label = n => n >= 50 ? 'MAX (cấp 50)' : 'cấp ' + n;
  const api = {
    at(n) {
      n = Math.max(0, Math.min(99, Number(n) || 0)); snap();
      const f = a => (a || []).map(() => n);
      S.pet = f(S.pet); S.pet2 = f(S.pet2); S.home = f(S.home); S.own = f(S.own);
      S.hl = n >= 50 ? 5 : n >= 25 ? 4 : n >= 12 ? 3 : n >= 5 ? 2 : 1;
      refresh(); return api.status();
    },
    max() { return api.at(50); },
    pets(n) { snap(); S.pet = (S.pet || []).map(() => n); S.pet2 = (S.pet2 || []).map(() => n); refresh(); return api.status(); },
    home(n) { snap(); S.home = (S.home || []).map(() => n); refresh(); return api.status(); },
    house(l) { snap(); S.hl = Math.max(1, Math.min(5, l | 0)); refresh(); return api.status(); },
    restore() {
      try { const o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (!o) return 'Không có bản lưu để hoàn tác'; Object.assign(S, o); localStorage.removeItem(KEY); refresh(); return 'Đã hoàn tác'; } catch (e) { return 'Lỗi hoàn tác'; }
    },
    status() { return { thuChinh: (S.pet || []).join(','), thuMoi: (S.pet2 || []).join(','), doNha: (S.home || []).join(','), capNha: S.hl, coHoanTac: !!localStorage.getItem(KEY) }; }
  };
  api.emote = (n, ms) => { pl.emote = n; pl.emoteUntil = Date.now() + (ms || 2600); return n; };
  api.pose = (n) => { pl.pose = n; if (n === 'sleep') sl = 9; return n; };
  window.RDD = Object.assign(window.RDD || {}, api);
  const foot = document.querySelector('#rdd-v96-panel .v96-foot');
  if (foot && !document.getElementById('rdd-prev-state')) {
    const box = document.createElement('div');
    box.innerHTML = `<div class="v96-label"><span>Xem trước tiến hóa (thử nghiệm)</span><span id="rdd-prev-state">Chưa dùng</span></div><div class="v96-options" role="group" aria-label="Xem trước cấp độ">${MARK.map(n => `<button type="button" data-prev="${n}">${n >= 50 ? 'MAX' : 'Cấp ' + n}</button>`).join('')}<button type="button" data-prev="undo">↩ Hoàn tác</button></div>`;
    foot.parentNode.insertBefore(box, foot);
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-prev]'); if (!b) return; const v = b.dataset.prev, st = document.getElementById('rdd-prev-state'), msg = document.getElementById('rdd-v96-status');
      if (v === 'undo') { const r = api.restore(); if (st) st.textContent = 'Chưa dùng'; if (msg) msg.textContent = r; return; }
      api.at(+v); if (st) st.textContent = 'Đang xem ' + label(+v); if (msg) msg.textContent = 'Đã đặt mọi cấp = ' + label(+v) + ' · bấm Hoàn tác để quay lại tiến trình thật';
    });
  }
  try { if (localStorage.getItem(KEY)) { const st = document.getElementById('rdd-prev-state'); if (st) st.textContent = 'Đang ở chế độ xem trước'; } } catch (_) {}
})();

