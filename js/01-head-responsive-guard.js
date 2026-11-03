
/* Phase 5.10 responsive guard for Android local-file browsers with a desktop-sized CSS viewport. */
(function(){
 function apply(){
  var screenW=(window.screen&&window.screen.width)||9999;
  var screenH=(window.screen&&window.screen.height)||9999;
  var touch=('ontouchstart' in window)||(navigator.maxTouchPoints||0)>0;
  var android=/Android/i.test(navigator.userAgent||'');
  var narrow=Math.min(window.innerWidth||9999,screenW)<=860;
  var portraitTouch=touch && screenH>=screenW; // Android local-file browsers may expose a desktop-sized CSS viewport.
  document.documentElement.classList.toggle('rdd-mobile',!!(narrow||portraitTouch||(android&&touch))); 
 }
 apply(); window.addEventListener('resize',apply,{passive:true});
 window.addEventListener('orientationchange',function(){setTimeout(apply,100);},{passive:true});
})();

