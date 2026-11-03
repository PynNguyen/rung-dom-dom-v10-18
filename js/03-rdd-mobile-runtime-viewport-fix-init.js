
(function(){
 function apply(){
  var d=document.documentElement, touch=('ontouchstart' in window)||(navigator.maxTouchPoints||0)>0;
  var sw=(screen&&screen.width)||innerWidth, sh=(screen&&screen.height)||innerHeight;
  var portrait=sh>=sw;
  var android=/Android/i.test(navigator.userAgent||'');
  if(touch && (portrait || android)) d.classList.add('rdd-mobile');
 }
 apply(); addEventListener('resize',apply,{passive:true}); addEventListener('orientationchange',function(){setTimeout(apply,120)},{passive:true});
})();

