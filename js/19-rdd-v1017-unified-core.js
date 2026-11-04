
(() => {
  'use strict';
  // Route every legacy shortcut to the two canonical systems: M10 games and E.trip expeditions.
  document.addEventListener('click', event => {
    const mini = event.target.closest('[data-p8="mini"]');
    const expedition = event.target.closest('[data-p8="expedition"]');
    if (!mini && !expedition) return;
    event.preventDefault(); event.stopImmediatePropagation();
    document.querySelector('#rdd-phase8-modal')?.classList.remove('open');
    const target = document.querySelector(mini ? '#minigame-launch' : '#exp-launch');
    target?.click();
  }, true);

  // Preview controls used to write temporary levels into the live save. They are disabled
  // until preview is rebuilt as an isolated renderer state rather than a save mutation.
  document.addEventListener('click', event => {
    const preview = event.target.closest('[data-prev]'); if (!preview) return;
    event.preventDefault(); event.stopImmediatePropagation();
    try { toast('Xem trước tiến hóa đang được khóa để bảo vệ tiến trình thật.'); } catch (_) {}
  }, true);
  const panel = document.querySelector('#rdd-v96-panel');
  if (panel && !panel.querySelector('.rdd-v1017-safe-note')) {
    const note = document.createElement('p'); note.className = 'rdd-v1017-safe-note';
    note.textContent = 'Xem trước tiến hóa tạm khóa: bản cũ có thể ghi cấp thử nghiệm vào save thật.';
    panel.appendChild(note);
  }

  // Preserve the existing rdd5 path and add a two-generation validated rolling backup.
  const inheritedSave = window.save;
  window.save = function saveV1017() {
    const result = inheritedSave?.apply(this, arguments);
    try {
      const raw = localStorage.getItem('rdd5'), parsed = raw && JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return result;
      const metaKey = 'rdd5_backup_rolling_meta', meta = JSON.parse(localStorage.getItem(metaKey) || '{}');
      const day = new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Ho_Chi_Minh' }).format(new Date());
      if (meta.day !== day) {
        const current = localStorage.getItem('rdd5_backup_rolling_current');
        if (current) localStorage.setItem('rdd5_backup_rolling_previous', current);
        localStorage.setItem('rdd5_backup_rolling_current', raw);
        localStorage.setItem(metaKey, JSON.stringify({ day, savedAt:Date.now(), version:'10.17' }));
      }
    } catch (_) {}
    return result;
  };

  // Stop temporary music loops when the page loses focus; restore the zone layer only
  // when the game is audible already, avoiding a new AudioContext or surprise playback.
  addEventListener('visibilitychange', () => {
    if (document.hidden) {
      try { window.__RDD_MGM?.stop?.(); } catch (_) {}
      try { stopTrack?.(); } catch (_) {}
      try { window.save?.(); } catch (_) {}
    } else if (S?.snd && typeof A !== 'undefined' && A?.state === 'running') {
      try { startTrack?.(true); } catch (_) {}
    }
  }, { passive:true });

  window.__RDD_V1017 = Object.freeze({
    version:'10.17.0',
    systems:{ miniGame:'M10', expedition:'E.trip', saveKey:'rdd5' },
    backupKeys:['rdd5_backup_rolling_current','rdd5_backup_rolling_previous']
  });
})();

