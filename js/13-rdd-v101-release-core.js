
(() => {
  'use strict';
  const KEY = 'rdd5', BACKUP = 'rdd5_backup_v101', META = 'rdd5_meta_v101';
  const finite = (v, fallback = 0) => Number.isFinite(Number(v)) ? Math.max(0, Number(v)) : fallback;
  const arrays = [['own', G.length], ['pet', PET.length], ['home', HM.length]];

  function normalize(state) {
    if (!state || typeof state !== 'object') return false;
    ['l','tap','tot','run','ess','caught','taps','sleeps','reads','gold','hits'].forEach(k => state[k] = finite(state[k]));
    arrays.forEach(([key, length]) => {
      if (!Array.isArray(state[key])) state[key] = [];
      state[key] = state[key].slice(0, length).map(v => finite(v));
      while (state[key].length < length) state[key].push(0);
    });
    ['ach','codex','q'].forEach(k => { if (!Array.isArray(state[k])) state[k] = []; });
    state.m = Date.now();
    state.saveVersion = Math.max(10, finite(state.saveVersion, 10));
    return true;
  }

  function parse(text) { try { const value = JSON.parse(text); return value && typeof value === 'object' ? value : null; } catch (_) { return null; } }
  function recover() {
    const primary = parse(localStorage.getItem(KEY));
    if (primary) return;
    const backup = parse(localStorage.getItem(BACKUP));
    if (backup && normalize(backup)) {
      Object.assign(S, backup);
      localStorage.setItem(KEY, JSON.stringify(S));
      setTimeout(() => { try { syncF(); ui(); toast('Đã khôi phục bản lưu an toàn gần nhất.'); } catch (_) {} }, 0);
    }
  }
  function snapshot() {
    if (!normalize(S)) return false;
    const json = JSON.stringify(S);
    localStorage.setItem(BACKUP, json);
    localStorage.setItem(META, JSON.stringify({ version: '10.1', savedAt: Date.now(), key: KEY }));
    localStorage.setItem(KEY, json);
    return true;
  }

  recover();
  const coreSave = typeof save === 'function' ? save : null;
  window.save = function saveV101() {
    try { return snapshot(); }
    catch (_) { try { return coreSave && coreSave(); } catch (_) { return false; } }
  };
  addEventListener('pagehide', () => { try { window.save(); } catch (_) {} }, { passive: true });
  addEventListener('visibilitychange', () => { if (document.hidden) { try { window.save(); } catch (_) {} } }, { passive: true });

  // The existing preferences panel already owns audio/quality settings. This small
  // entry point keeps those controls reachable from the permanent settings tab.
  const mountReleaseCard = () => {
    const config = document.querySelector('#cfg');
    if (!config || document.querySelector('#rdd-v101-card')) return;
    const card = document.createElement('section');
    card.id = 'rdd-v101-card'; card.className = 'cfg-card';
    card.innerHTML = '<h4>Phiên bản 10.1</h4><p class="rdd-v101-copy">Lưu tự động có bản sao an toàn · dữ liệu chính vẫn là <b>rdd5</b>.</p><div class="btn-group"><button class="cfg-btn" type="button" data-rdd101="quality">Chất lượng & âm thanh</button><button class="cfg-btn" type="button" data-rdd101="backup">Sao lưu ngay</button></div><small id="rdd-v101-status" aria-live="polite"></small>';
    config.appendChild(card);
    card.addEventListener('click', e => {
      const action = e.target.closest('[data-rdd101]')?.dataset.rdd101, status = card.querySelector('#rdd-v101-status');
      if (action === 'quality') document.querySelector('#rdd-v96-launch')?.click();
      if (action === 'backup') { const ok = window.save(); if (status) status.textContent = ok ? 'Đã tạo bản sao lưu an toàn.' : 'Chưa thể sao lưu trên thiết bị này.'; }
    });
  };
  setTimeout(mountReleaseCard, 120);
  window.__RDD_V101 = Object.freeze({ version: '10.1.0', saveKey: KEY, backupKey: BACKUP, snapshot, recover });
})();

