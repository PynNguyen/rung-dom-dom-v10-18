
(() => {
  'use strict';
  const originalCommand = window.rddCommand;
  window.rddCommand = function rddCommandV104(command) {
    const normalized = String(command || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const result = originalCommand ? originalCommand(normalized) : { ok:false };
    if (normalized !== 'add full' || !result?.ok) return result;
    // "Add full" now means every purchasable companion, not only the first roster.
    if (Array.isArray(window.__v7?.SP2)) S.pet2 = window.__v7.SP2.map((_, i) => Math.max(1, Number((S.pet2 || [])[i]) || 0));
    S.artisanIX = S.artisanIX || {};
    const ids = (window.__v7?.SP2 || []).map(p => p.id);
    S.artisanIX.pets = [...new Set([...(Array.isArray(S.artisanIX.pets) ? S.artisanIX.pets : []), ...ids])];
    try { window.save?.(); ui?.(); } catch (_) {}
    showRoster();
    try { toast('ADD FULL: đã mở đủ 19 bạn rừng và 12 sinh vật hoang dã. Mỗi khu vực hiển thị hệ sinh thái riêng.'); } catch (_) {}
    return { ...result, companions: (PET?.length || 0) + ids.length, extended: ids.length, visualRule:'3 sinh vật hoang dã theo từng khu vực' };
  };

  function showRoster() {
    const stage = document.querySelector('#stage'); if (!stage) return;
    let chip = document.querySelector('#rdd-v104-roster');
    if (!chip) { chip = document.createElement('div'); chip.id = 'rdd-v104-roster'; stage.appendChild(chip); }
    const base = (S.pet || []).filter(v => v > 0).length, extra = (S.pet2 || []).filter(v => v > 0).length;
    chip.innerHTML = '<span aria-hidden="true">✦</span><span>Đội hình: <b>' + (base + extra) + '/19</b> · Hoang dã: <b>12/12</b></span>';
    chip.classList.add('show');
  }

  function setupMiniStart() {
    const top = document.querySelector('#m10 .m10-top'); if (!top || document.querySelector('#m10-start-now')) return;
    const button = document.createElement('button'); button.id = 'm10-start-now'; button.type = 'button'; button.textContent = 'Bắt đầu ngay';
    top.appendChild(button);
    button.addEventListener('click', event => { event.stopPropagation(); const game = window.__m10?.G?.(); if (game && game.cd > 0) game.cd = 0; document.querySelector('#m10')?.classList.remove('preparing'); });
    const m10 = document.querySelector('#m10');
    new MutationObserver(() => {
      const game = window.__m10?.G?.();
      m10.classList.toggle('preparing', m10.classList.contains('on') && !!game && game.cd > 0);
    }).observe(m10, { attributes:true, attributeFilter:['class'] });
    m10.querySelector('#m10-menu')?.addEventListener('click', () => requestAnimationFrame(() => {
      const game = window.__m10?.G?.();
      m10.classList.toggle('preparing', !!game && game.cd > 0);
    }));
  }

  setTimeout(() => { setupMiniStart(); if (window.__RDD_ADD_FULL_ACTIVE) showRoster(); }, 80);
  window.__RDD_V104 = Object.freeze({ showRoster, startMiniNow: () => { const game = window.__m10?.G?.(); if (game) game.cd = 0; } });
})();

