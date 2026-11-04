
/* Nhạc riêng cho 4 mini-game: mỗi game một nhịp, một âm sắc, và chạm trúng/trượt đều có phản hồi âm nhạc. */
(() => {
  'use strict';
  const SC = [0, 2, 4, 7, 9];                     // thang ngũ cung
  const fr = n => 261.63*Math.pow(2, n/12);
  let lastIdx = null, out = null, timer = null, id = null, step = 0, moonIdx = 0, cabIdx = 0, savedMaster = null, alive = false, beatN = 0;
  const ctx = () => (typeof A !== 'undefined' && A && S.snd) ? A : null;
  function tone(f, when, dur, type, vol, dest) {
    const a = ctx(); if (!a || !out) return;
    const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(.0001, when); g.gain.exponentialRampToValueAtTime(vol, when + .015); g.gain.exponentialRampToValueAtTime(.0001, when + dur);
    o.connect(g); g.connect(dest || out); o.start(when); o.stop(when + dur + .05);
  }
  function hat(when, vol) {
    const a = ctx(); if (!a || !out) return;
    const len = Math.floor(a.sampleRate*.05), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random()*2 - 1)*(1 - i/len);
    const n = a.createBufferSource(), hp = a.createBiquadFilter(), g = a.createGain(); hp.type = 'highpass'; hp.frequency.value = 6000; g.gain.value = vol;
    n.buffer = buf; n.connect(hp); hp.connect(g); g.connect(out); n.start(when);
  }
  function thump(when) {
    const a = ctx(); if (!a || !out) return;
    const o = a.createOscillator(), g = a.createGain(); o.type = 'sine';
    o.frequency.setValueAtTime(150, when); o.frequency.exponentialRampToValueAtTime(48, when + .16);
    g.gain.setValueAtTime(.5, when); g.gain.exponentialRampToValueAtTime(.001, when + .22); o.connect(g); g.connect(out); o.start(when); o.stop(when + .25);
  }
  const PLAN = {
    cabin:  { tempo: 550, run(a, t) {                         // hộp nhạc ấm, chậm
      const mel = [12, 16, 19, 24, 21, 19, 16, 14], root = [0, -3, -5, -7][(step >> 3) % 4];
      tone(fr(root + mel[step % 8]), t, .9, 'triangle', .05); if (step % 4 === 0) tone(fr(root - 12), t, 1.8, 'sine', .06); } },
    forest: { tempo: 210, run(a, t) {                         // arpeggio nhanh, lấp lánh
      const n = SC[(step*3 + (step >> 2)) % 5] + (step % 8 < 4 ? 12 : 24);
      tone(fr(n), t, .22, 'sine', .035); if (step % 4 === 0) tone(fr(-12 + [0, 5, 7, 5][(step >> 2) % 4]), t, .35, 'triangle', .07); if (step % 2) hat(t, .05); } },
    moon:   { tempo: 1200, run(a, t) {                        // pad vũ trụ thở chậm
      const ch = [[0, 4, 7], [-3, 0, 4], [-5, -1, 2], [-7, -3, 0]][step % 4];
      ch.forEach(n => tone(fr(n), t, 2.5, 'sine', .03)); tone(fr(24 + SC[(step*2) % 5]), t + .6, .9, 'sine', .018); } },
    water:  { tempo: 0, run() {} }                            // nhịp do chính mini-game phát (beat())
  };
  function begin(g) {
    try { if (typeof A !== 'undefined' && !A && typeof initAudio === 'function') initAudio(); if (A && A.state === 'suspended') A.resume(); } catch (_) {}
    const a = ctx(); if (!a) return; stopNow();
    out = a.createGain(); out.gain.value = .0001; out.gain.exponentialRampToValueAtTime(.7, a.currentTime + .4); out.connect(a.destination);
    try { if (typeof master !== 'undefined' && master) { savedMaster = master.gain.value; master.gain.setTargetAtTime(savedMaster*.3, a.currentTime, .2); } } catch (_) {}
    id = g; step = 0; moonIdx = 0; cabIdx = 0; beatN = 0; alive = true; lastIdx = null;
    const p = PLAN[g]; if (p && p.tempo) { const play = () => { const c = ctx(); if (!alive || !c) return; p.run(c, c.currentTime + .02); step++; }; play(); timer = setInterval(play, p.tempo); }
  }
  function stopNow() {
    alive = false; if (timer) clearInterval(timer); timer = null;
    const a = ctx(); if (out && a) { try { out.gain.cancelScheduledValues(a.currentTime); out.gain.setTargetAtTime(.0001, a.currentTime, .12); const o = out; setTimeout(() => { try { o.disconnect(); } catch (_) {} }, 700); } catch (_) {} }
    out = null;
    try { if (savedMaster != null && typeof master !== 'undefined' && master && A) master.gain.setTargetAtTime(savedMaster, A.currentTime, .25); } catch (_) {}
    savedMaster = null; id = null;
  }
  window.__RDD_MGM = {
    start: begin,
    stop: stopNow,
    beat() {                                                  // game Thác: mỗi nhịp 900ms có trống + hợp âm + chồng nhịp phụ
      const a = ctx(); if (!a || !out || id !== 'water') return; const t = a.currentTime + .01, bar = beatN++ % 4;
      thump(t); [0, 7, 12].forEach(n => tone(fr([0, -3, -5, -2][bar] + n), t, .85, 'sine', .03));
      hat(t + .45, .07); tone(fr(12 + SC[(bar*2) % 5]), t + .3, .3, 'triangle', .03); tone(fr(12 + SC[(bar*2 + 1) % 5]), t + .6, .3, 'triangle', .03);
    },
    hit(game, n) {
      const a = ctx(); if (!a || !out) return; const t = a.currentTime + .005;
      if (game === 'moon') { tone(fr(12 + SC[moonIdx % 5] + 12*Math.floor(moonIdx/5)), t, 1.1, 'sine', .09); tone(fr(24 + SC[moonIdx % 5]), t + .04, .6, 'sine', .035); moonIdx++; }
      else if (game === 'cabin') { tone(fr(12 + SC[cabIdx % 5]), t, .5, 'triangle', .09); cabIdx = (cabIdx + 1) % 5; }
      else if (game === 'forest') { tone(fr(24 + SC[Math.floor(Math.random()*5)]), t, .3, 'sine', .08); tone(fr(36), t + .06, .2, 'sine', .035); }
      else if (game === 'water') { if (n >= 3) { [0, 4, 7, 12].forEach((k, i) => tone(fr(12 + k), t + i*.03, .5, 'triangle', .06)); } else tone(fr(19), t, .18, 'sine', .05); }
    },
    miss(v = 1) { const a = ctx(); if (!a || !out) return; const t = a.currentTime + .005; tone(fr(-17), t, .28, 'triangle', .09*v); tone(fr(-18), t + .02, .26, 'sine', .06*v); },
    sync(gt) {                                                // game Thác: nhạc nền bám đúng đồng hồ của game (lưới 0,36s, nốt đầu tại 1,4s)
      const a = ctx(); if (!a || !out || id !== 'water') return;
      const m1 = Math.floor((gt + .12 - 1.4)/.36); if (lastIdx === null) lastIdx = Math.floor((gt - 1.4)/.36);
      for (let m = lastIdx + 1; m <= m1; m++) {
        const tb = 1.4 + m*.36; if (tb < -1.2) continue;
        const at = a.currentTime + Math.max(.005, tb - gt), q = ((m % 4) + 4) % 4, bar = (((m >> 2) % 4) + 4) % 4, root = [0, -3, -5, -2][bar];
        if (m % 2 === 0) thump(at); else hat(at, .06);
        if (q === 0) tone(fr(-24 + root), at, .7, 'sine', .12);
        if (m % 8 === 0) [0, 7, 12].forEach(n => tone(fr(root + n), at, 2.8, 'sine', .022));
        tone(fr(12 + SC[((m*3) % 5 + 5) % 5] + root), at, .2, 'triangle', .028);
      }
      lastIdx = Math.max(lastIdx, m1);
    },
    finish(score) {
      const a = ctx(); if (!a || !out) { stopNow(); return; }
      const t = a.currentTime + .05, top = score >= 20 ? [0, 4, 7, 12, 16] : [0, 4, 7, 12];
      top.forEach((n, i) => tone(fr(12 + n), t + i*.1, .8, 'triangle', .08)); alive = false; if (timer) clearInterval(timer); timer = null;
      setTimeout(stopNow, 1400);
    }
  };
})();

