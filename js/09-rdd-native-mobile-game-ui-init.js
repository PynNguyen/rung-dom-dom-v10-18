
(function(){
  const mobile = () => matchMedia('(max-width: 859px)').matches || (matchMedia('(pointer: coarse)').matches && innerWidth < 1100);
  function applyMobileGameLayout(){
    const app=document.getElementById('app');
    if(!app) return;
    let launch=document.getElementById('mobile-upgrade-launch');
    if(!launch){
      launch=document.createElement('button');
      launch.id='mobile-upgrade-launch';
      launch.type='button';
      launch.innerHTML='<span aria-hidden="true">✦</span><span>Mở bảng nâng cấp</span>';
      launch.setAttribute('aria-controls','panel');
      launch.setAttribute('aria-expanded','false');
      const stage=document.getElementById('stage');
      if(stage) stage.appendChild(launch);
      launch.addEventListener('click',()=>{
        app.classList.remove('peek');
        launch.setAttribute('aria-expanded','true');
        const grab=document.getElementById('grab');
        if(grab){grab.setAttribute('aria-expanded','true');grab.setAttribute('aria-label','Thu gọn bảng nâng cấp');}
      });
    }
    if(mobile()){
      if(!app.dataset.mobileUiInitialized){
        app.classList.add('peek');
        app.dataset.mobileUiInitialized='1';
        const grab=document.getElementById('grab');
        if(grab){grab.setAttribute('aria-expanded','false');grab.setAttribute('aria-label','Mở bảng nâng cấp');}
      }
    } else {
      app.classList.remove('peek');
      delete app.dataset.mobileUiInitialized;
    }
    launch.style.display=mobile()?'flex':'none';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyMobileGameLayout,{once:true});
  else applyMobileGameLayout();
  addEventListener('resize',applyMobileGameLayout,{passive:true});
  addEventListener('orientationchange',()=>setTimeout(applyMobileGameLayout,120),{passive:true});
  const app=document.getElementById('app');
  const grab=document.getElementById('grab');
  if(app && grab) grab.addEventListener('click',()=>{
    const launch=document.getElementById('mobile-upgrade-launch');
    if(launch) launch.setAttribute('aria-expanded',String(app.classList.contains('peek')));
  });
})();

