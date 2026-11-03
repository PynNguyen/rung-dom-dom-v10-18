
(() => {
  'use strict';
  const activeSelector = '#m10.on,#minigame-overlay.open,#exp-overlay.open,#world-modal.open,#rdd-phase8-modal.open,#rdd-vii-panel.open,#rdd-v96-panel.open,#rdd-v102-modal.on';
  let historyArmed = false, closing = false;
  const active = () => !!document.querySelector(activeSelector);
  const update = () => {
    const button = document.querySelector('#rdd-v103-return'); if (!button) return;
    const open = active(); button.classList.toggle('show', open);
    if (open && !historyArmed && !closing) { try { history.pushState({ rddOverlay: true }, ''); historyArmed = true; } catch (_) {} }
  };
  const closeAll = () => {
    closing = true;
    try { window.__m10?.close?.(); } catch (_) {}
    // Use each system's own close control first so it also cancels its timers.
    ['#mg-close','#exp-close','#w9-close'].forEach(selector => { try { document.querySelector(selector)?.click(); } catch (_) {} });
    document.querySelectorAll('#minigame-overlay,#exp-overlay,#world-modal,#rdd-phase8-modal,#rdd-vii-panel,#rdd-v96-panel').forEach(el => el.classList.remove('open'));
    document.querySelector('#rdd-v102-modal')?.classList.remove('on');
    try { document.querySelector('#stage')?.focus?.(); } catch (_) {}
    if (historyArmed) { historyArmed = false; try { history.back(); } catch (_) {} }
    closing = false; update();
  };
  const button = document.createElement('button');
  button.id = 'rdd-v103-return'; button.type = 'button'; button.setAttribute('aria-label','Quay lại thế giới Rừng Đom Đóm');
  button.innerHTML = '<span aria-hidden="true">←</span> Quay lại rừng'; button.addEventListener('click', closeAll);
  document.body.appendChild(button);
  document.addEventListener('keydown', event => {
    if ((event.key === 'Escape' || event.key === 'BrowserBack') && active()) { event.preventDefault(); event.stopImmediatePropagation(); closeAll(); }
  }, true);
  addEventListener('popstate', () => { if (active()) { historyArmed = false; closeAll(); } });
  new MutationObserver(update).observe(document.body, { subtree:true, attributes:true, attributeFilter:['class'] });
  update();
  window.__RDD_RETURN_V103 = Object.freeze({ closeAll, active });
})();

