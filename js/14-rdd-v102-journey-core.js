
(() => {
  'use strict';
  const dayKey = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
  const safe = value => Math.max(0, Number(value) || 0);
  const zones = ['Nhà gỗ', 'Rừng linh hồn', 'Thác ngân hà', 'Hồ trăng'];
  let lastPaint = 0;

  function state() {
    const now = dayKey();
    const existing = S.journeyV102;
    if (!existing || existing.day !== now) {
      const production = Math.max(60, Math.floor((typeof cps === 'function' ? cps() : 1) * 90));
      S.journeyV102 = { day: now, baseLight: safe(S.tot), baseTaps: safe(S.taps), baseCaught: safe(S.caught), collect: production, taps: 24, catches: 2, claimed: false };
    }
    return S.journeyV102;
  }
  function progress(q = state()) {
    return [
      { icon: '✦', name: 'Gom ánh rừng', got: Math.max(0, safe(S.tot) - safe(q.baseLight)), need: q.collect },
      { icon: '◌', name: 'Đánh thức đom đóm', got: Math.max(0, safe(S.taps) - safe(q.baseTaps)), need: q.taps },
      { icon: '⌁', name: 'Gặp gỡ sinh linh', got: Math.max(0, safe(S.caught) - safe(q.baseCaught)), need: q.catches }
    ];
  }
  function completed(q = state()) { return progress(q).every(x => x.got >= x.need); }
  function reward(q = state()) { return Math.max(120, Math.floor(q.collect * 1.5)); }
  function mount() {
    const stage = document.querySelector('#stage'); if (!stage || document.querySelector('#rdd-v102-journey')) return;
    const chip = document.createElement('section'); chip.id = 'rdd-v102-journey';
    chip.innerHTML = '<button id="rdd-v102-open" type="button" aria-haspopup="dialog"><span class="rdd-v102-sigil" aria-hidden="true"></span><span><span class="rdd-v102-kicker">Nhịp rừng hôm nay</span><span class="rdd-v102-title">Hành trình đang chờ</span></span><span class="rdd-v102-progress">0/3</span></button>';
    const modal = document.createElement('section'); modal.id = 'rdd-v102-modal'; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
    modal.innerHTML = '<div class="rdd-v102-sheet" role="document"></div>';
    stage.append(chip, modal);
    chip.querySelector('button').addEventListener('click', () => { renderSheet(); modal.classList.add('on'); });
    modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-v102-close]')) modal.classList.remove('on'); if (e.target.closest('[data-v102-claim]')) claim(); });
  }
  function renderChip() {
    const chip = document.querySelector('#rdd-v102-journey'); if (!chip) return;
    const p = progress(), done = p.filter(x => x.got >= x.need).length;
    const zone = typeof currentZone === 'function' ? currentZone() : 0;
    chip.querySelector('.rdd-v102-title').textContent = zones[Math.max(0, Math.min(3, zone))] + ' · ' + (state().claimed ? 'Đã nhận quà' : 'Hành trình');
    chip.querySelector('.rdd-v102-progress').textContent = state().claimed ? 'Hoàn tất' : done + '/3';
  }
  function renderSheet() {
    const sheet = document.querySelector('#rdd-v102-modal .rdd-v102-sheet'); if (!sheet) return;
    const q = state(), p = progress(q), ready = completed(q), claimed = q.claimed;
    sheet.innerHTML = '<h2>Nhịp rừng hôm nay</h2><p>Ba mục tiêu ngắn giúp cuộc dạo chơi có nhịp điệu. Hoàn thành cả ba để nhận <b>' + (typeof fm === 'function' ? fm(reward(q)) : reward(q)) + ' ánh sáng</b>.</p>' + p.map(x => { const got = Math.min(x.got, x.need), pct = Math.min(100, got / x.need * 100); return '<div class="rdd-v102-quest"><span aria-hidden="true">' + x.icon + '</span><div><strong>' + x.name + '</strong><small>' + got + ' / ' + x.need + '</small><div class="rdd-v102-meter"><i style="width:' + pct + '%"></i></div></div><b>' + Math.floor(pct) + '%</b></div>'; }).join('') + '<div class="rdd-v102-actions"><button type="button" data-v102-close>Đóng</button><button type="button" class="claim" data-v102-claim ' + (!ready || claimed ? 'disabled' : '') + '>' + (claimed ? 'Đã nhận' : 'Nhận phần thưởng') + '</button></div>';
  }
  function claim() {
    const q = state(); if (!completed(q) || q.claimed) return;
    q.claimed = true; const value = reward(q);
    S.l += value; S.tot += value; S.run += value;
    try { burst(28); arp([0, 4, 7, 12], .11); toast('Nhịp rừng hoàn tất · +' + (typeof fm === 'function' ? fm(value) : value) + ' ánh sáng'); window.save?.(); } catch (_) {}
    renderChip(); renderSheet();
  }
  function tick() {
    const now = performance.now(); if (now - lastPaint < 350) return;
    lastPaint = now; mount(); renderChip();
  }
  window.__RDD_JOURNEY_V102 = Object.freeze({ tick, open: () => { mount(); renderSheet(); document.querySelector('#rdd-v102-modal')?.classList.add('on'); }, state });
  setTimeout(tick, 180);
})();

