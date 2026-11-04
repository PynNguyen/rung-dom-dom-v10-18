/* Phone defaults and lightweight rendering guard.  Does not overwrite an explicit player preference. */
(() => {
  'use strict';
  const isMobile = () => matchMedia('(max-width:859px)').matches || (matchMedia('(pointer:coarse)').matches && innerWidth < 1100);
  const applyPhoneDefaults = () => {
    const app = document.getElementById('app');
    if (!app) return;
    if (!isMobile()) { app.classList.remove('rdd-mobile-defaulted'); return; }
    if (!app.classList.contains('rdd-mobile-defaulted')) {
      app.classList.add('peek', 'rdd-mobile-defaulted');
      const grab = document.getElementById('grab');
      if (grab) { grab.setAttribute('aria-expanded', 'false'); grab.setAttribute('aria-label', 'Mở bảng nâng cấp'); }
      const launch = document.getElementById('mobile-upgrade-launch');
      if (launch) launch.setAttribute('aria-expanded', 'false');
    }
    let preference = null;
    try { preference = JSON.parse(localStorage.getItem('rdd_v96_preferences') || 'null'); } catch (_) {}
    const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches || Number(navigator.deviceMemory || 8) <= 4 || Number(navigator.hardwareConcurrency || 8) <= 4;
    document.documentElement.classList.toggle('rdd-mobile-lite', reduced);
    if (reduced && (!preference || !preference.mode)) {
      document.documentElement.classList.remove('rdd-v96-balanced', 'rdd-v96-cinematic');
      document.documentElement.classList.add('rdd-v96-performance');
      try { if (window.VFX) window.VFX.reduced = true; } catch (_) {}
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyPhoneDefaults, { once:true });
  else applyPhoneDefaults();
  addEventListener('pageshow', applyPhoneDefaults, { passive:true });
  addEventListener('orientationchange', () => setTimeout(applyPhoneDefaults, 120), { passive:true });
})();

