
/* Phase 5.10: clear stale legacy saves before any startup migration runs. */
(function(){
  try {
    if (sessionStorage.getItem('rdd_force_fresh_start') === '1') {
      sessionStorage.removeItem('rdd_force_fresh_start');
      window.__RDD_RESETTING = false;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && /^rdd/i.test(key)) keys.push(key);
      }
      keys.forEach(key => localStorage.removeItem(key));
    }
  } catch (e) { console.warn('[Rừng Đom Đóm] Reset startup check:', e); }
})();

