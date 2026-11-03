
(()=>{'use strict';
const $=s=>document.querySelector(s);
if(!window.S || !$('#stage')) return;
const state=S;
state.expansion=state.expansion||{essence:0,skill:{touch:0,idle:0,weather:0},garden:0,discovered:[],log:[]};
state.artisanIX=state.artisanIX||{pets:[],claimed:[],minigames:0,expeditions:0,garden:0,zones:[0],petLevels:{}};
state.customLook=state.customLook||'gold';
state.phase8=state.phase8||{furniture:{},stars:0,expeditions:[],event:null,eventAt:0,wardrobe:{lantern:'gold',interior:'warm',hat:'none'},lorePage:0};
const P8=state.phase8;
const safeSave=()=>{try{if(typeof window.save==='function')window.save();else localStorage.setItem('rdd5',JSON.stringify(state))}catch(e){console.warn('[Phase 8 save]',e)}};
const toast8=t=>{if(typeof window.toast==='function')window.toast(t);else {const el=$('#toast');if(el){el.textContent=t;el.classList.add('on');setTimeout(()=>el.classList.remove('on'),1800)}}};
const modal=document.createElement('div');modal.id='rdd-phase8-modal';modal.innerHTML='<section id="rdd-phase8-card" role="dialog" aria-modal="true"><div id="p8-content"></div><button data-p8="close" style="margin-top:12px;width:100%">Đóng</button></section>';document.body.append(modal);
const content=$('#p8-content');
function open(title,body){content.innerHTML='<h2>'+title+'</h2>'+body;modal.classList.add('open')}
function close(){modal.classList.remove('open')}
modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-p8="close"]'))close()});
const fmt=n=>typeof fm==='function'?fm(n):Math.floor(n).toLocaleString('vi-VN');
function actions(){
 let bar=$('#phase8-actions');if(!bar){bar=document.createElement('div');bar.id='phase8-actions';$('#panel-head')?.append(bar)}
 bar.innerHTML='<button data-p8="stars">🌌 Chòm sao</button><button data-p8="journey">🧭 Hành trình</button><button data-p8="mini">🎮 Mini-game</button><button data-p8="lore">📖 Cổ ngữ</button><button data-p8="expedition">🐾 Thám hiểm</button><button data-p8="wardrobe">🎨 Tủ đồ</button>';
}
function starTree(){
 const sk=state.expansion.skill, costs={touch:1,idle:1,weather:1};
 open('🌌 Cây kỹ năng Chòm sao',`<p>Tinh Hoa hiện có: <b style="color:#ffe6a0">${fmt(state.ess||0)}</b>. Chọn nhánh phát triển; mỗi điểm tiêu tốn 1 Tinh Hoa và được lưu vào hồ sơ rdd5.</p><div class="p8-grid">
 <button data-skill="touch">✨ Chạm · Cấp ${sk.touch||0}<p class="p8-muted">+8% sức mạnh chạm mỗi cấp</p></button>
 <button data-skill="idle">🌙 Nhàn rỗi · Cấp ${sk.idle||0}<p class="p8-muted">+5% sản lượng mỗi cấp</p></button>
 <button data-skill="weather">🌦️ Thời tiết · Cấp ${sk.weather||0}<p class="p8-muted">+10% hiệu ứng thời tiết mỗi cấp</p></button>
 </div><p class="p8-muted">Các nhánh dùng Tinh Hoa hiện có; không tự cộng điểm miễn phí.</p>`);
}
function journey(){open('🧭 Hành trình',`<p>Tiến trình bốn cảnh quan, thành tựu và mục tiêu khám phá.</p><div class="p8-grid"><button data-zone="0">🏡 Nhà gỗ</button><button data-zone="1">🌲 Rừng linh hồn</button><button data-zone="2">💧 Thác ngân hà</button><button data-zone="3">🌙 Hồ trăng</button></div><p>Đã thu thập ${fmt(state.tot||0)} ánh sáng · Bắt sinh vật: ${state.caught||0} · Thú cưng: ${(state.pet||[]).filter(v=>v>0).length} loài.</p><p class="p8-muted">Dùng nút cảnh quan trong game để di chuyển; các nút trên đây đóng bảng và chuyển sang vị trí tương ứng.</p>`)}
function mini(){open('🎮 Trò chơi tại cảnh quan',`<p>Chọn thử thách phù hợp với khu vực hiện tại. Chạm trực tiếp lên vùng chơi để ghi điểm.</p><div class="p8-grid"><button data-mini="water">💧 Gợn sóng Thác</button><button data-mini="stars">🌟 Nối sao Hồ Trăng</button></div><p id="p8-ministatus">Điểm mini-game: ${P8.minigameScore||0}. Thử thách sẽ chạy ngay trên Canvas, không mở cửa sổ trò chơi riêng.</p>`);P8.mini=null}
function lore(){const stories=window.__RDD_LORE||[];const idx=Math.max(0,Math.min(stories.length-1,P8.lorePage||0));open('📖 Sổ tay · Cổ ngữ '+(idx+1)+'/15',`<p>${stories[idx]||'Hãy khám phá khu rừng để mở thêm ký ức.'}</p><div class="p8-grid"><button data-lore-prev>← Trang trước</button><button data-lore-next>Trang tiếp →</button></div><p class="p8-muted">15 trang Cổ ngữ được tích hợp trực tiếp vào Sổ tay.</p>`)}
function expedition(){const pets=(state.pet||[]).map((lv,i)=>({lv,i})).filter(v=>v.lv>0);const active=P8.expeditions.filter(e=>e.until>Date.now());open('🐾 Thám hiểm Bạn rừng',`<p>Gửi một bạn rừng đã mở khóa đi tìm nguyên liệu. Mỗi chuyến kéo dài 60 giây; phần thưởng được nhận khi quay về.</p><p>Chuyến đang đi: ${active.length}/2</p><div class="p8-grid">${pets.slice(0,12).map(p=>`<button data-expedition="${p.i}" ${active.length>=2||active.some(e=>e.pet===p.i)?'disabled':''}>${(PET[p.i]||{}).i||'🐾'} ${(PET[p.i]||{}).n||'Bạn rừng'} · cấp ${p.lv}</button>`).join('')||'<p>Hãy mở khóa Bạn rừng trước.</p>'}</div><p class="p8-muted">Nguyên liệu thu được: ${fmt(P8.materials||0)}.</p>`)}
function wardrobe(){const look=P8.wardrobe;open('🎨 Tủ đồ',`<p>Chọn ngoại quan đèn lồng, mũ và sắc thái nội thất.</p><p>Đèn lồng</p><div class="p8-grid"><button data-ward="lantern:gold">✨ Ánh vàng</button><button data-ward="lantern:crystal">💎 Pha lê</button><button data-ward="lantern:violet">🔮 Tím tinh tú</button><button data-ward="lantern:fox">🦊 Lửa hồ ly</button></div><p>Mũ nhân vật</p><div class="p8-grid"><button data-ward="hat:none">Không mũ</button><button data-ward="hat:leaf">🍃 Mũ lá</button><button data-ward="hat:star">🌟 Mũ sao</button></div><p>Nội thất</p><div class="p8-grid"><button data-ward="interior:warm">🪵 Gỗ ấm</button><button data-ward="interior:moon">🌙 Ánh trăng</button></div><p class="p8-muted">Đang chọn: đèn ${look.lantern}, mũ ${look.hat}, nội thất ${look.interior}.</p>`)}
function interactFurniture(){
 const names=['Lò sưởi','Giường','Giá sách','Đèn chùm','Tranh phong cảnh','Bàn trà','Thảm','Bình pha lê','Đồng hồ cổ','Dương xỉ sáng','Đàn piano'];
 const idx=(P8.furniture.next||0)%names.length;const name=names[idx];
 const effects=['Lò sưởi: duy trì hơi ấm, tăng sản lượng 20 giây.','Giường: nghỉ ngơi, nhận buff nhàn rỗi 30 giây.','Giá sách: mở khóa một trang Cổ ngữ.','Đèn chùm: tích lũy Tinh Hoa.','Tranh phong cảnh: tăng sản lượng trong 20 giây.','Bàn trà: pha trà, giữ combo trong 12 giây.','Thảm: tìm nguyên liệu ẩn.','Bình pha lê: nhận Tinh Hoa.','Đồng hồ cổ: nhận sản lượng tương đương 30 giây.','Dương xỉ sáng: nhận nguyên liệu khu vườn.','Đàn piano: tăng tốc hiệu ứng đom đóm trong 20 giây.'];
 open('🏡 Tương tác Tổ ấm',`<p>Chọn món nội thất để sử dụng. Mỗi tương tác có hiệu ứng hoặc phần thưởng trong game.</p><div class="p8-grid">${names.map((n,i)=>`<button data-furniture="${i}">${['🔥','🛏️','📚','🕯️','🖼️','☕','🧶','🏺','🕰️','🪴','🎹'][i]} ${n}</button>`).join('')}</div><p class="p8-muted">Món gợi ý: ${name} — ${effects[idx]}</p>`);
}
function runFurniture(i){
 const now=Date.now(), lv=(state.home||[])[i]||0, effects=[
 ()=>{state.buff=Math.max(state.buff||0,now+20000);},
 ()=>{state.nextSleep=now+30000;state.sleeps=(state.sleeps||0)+1;},
 ()=>{state.codexLore=state.codexLore||[];const l=window.__RDD_LORE||[];if(l.length)state.codexLore.push((state.codexLore.length)%l.length);state.reads=(state.reads||0)+1;},
 ()=>{state.ess=(state.ess||0)+Math.max(1,Math.floor(Math.sqrt((state.run||0)/2e5)));},
 ()=>{state.buff=Math.max(state.buff||0,now+20000);},
 ()=>{combo=Math.max(combo||1,5);comboTimer=Math.max(comboTimer||0,12);},
 ()=>{P8.materials=(P8.materials||0)+1;},
 ()=>{state.ess=(state.ess||0)+2;},
 ()=>{const v=Math.max(1,(typeof cps==='function'?cps():1)*30);if(typeof add==='function')add(v);else state.l+=v;},
 ()=>{P8.materials=(P8.materials||0)+2;},
 ()=>{state.buff=Math.max(state.buff||0,now+20000);P8.fireflyBoost=now+20000;}
 ];
 effects[i]?.();P8.furniture[i]=(P8.furniture[i]||0)+1;P8.furniture.next=i+1;safeSave();toast8('✨ '+['Lò sưởi ấm lên','Bạn đã nghỉ ngơi','Đã đọc Cổ ngữ','Tinh Hoa cộng thêm','Phong cảnh truyền cảm hứng','Combo pha trà được giữ','Tìm thấy nguyên liệu','Pha lê cộng Tinh Hoa','Đồng hồ tua nhanh sản lượng','Khu vườn nhận nguyên liệu','Piano gọi đom đóm'][i]);interactFurniture();
}
function clickSkill(k){const sk=state.expansion.skill;if((state.ess||0)<1){toast8('Chưa đủ Tinh Hoa để mở kỹ năng.');return}state.ess--;sk[k]=(sk[k]||0)+1;safeSave();starTree()}
function startMini(type){P8.mini={type,score:0,until:Date.now()+20000,last:0};close();toast8(type==='water'?'💧 Chạm các gợn sóng trên Thác!':'🌟 Chạm lần lượt các điểm sáng trên Hồ Trăng!')}
const stage=$('#stage');
stage.addEventListener('pointerdown',e=>{
 if(!P8.mini)return;
 const m=P8.mini, r=stage.getBoundingClientRect();if(Date.now()>m.until){P8.minigameScore=(P8.minigameScore||0)+m.score;P8.mini=null;safeSave();toast8('🎮 Kết thúc thử thách: '+m.score+' điểm');return}
 const px=e.clientX-r.left,py=e.clientY-r.top;
 if(m.type==='water'&&Math.abs(py-r.height*.7)<r.height*.25){m.score++;if(typeof add==='function')add(Math.max(1,(typeof cps==='function'?cps():1)*2));if(typeof glow==='function')try{glow('c',px,py,65,.8)}catch(_){}}
 else if(m.type==='stars'&&py<r.height*.62){m.score++;state.ess=(state.ess||0)+1}
 toast8((m.type==='water'?'💧 Gợn sóng':'🌟 Nối sao')+' · '+m.score+' điểm');
},{passive:true});
/* Unified mobile access: keep every expansion action reachable instead of hiding launchers. */
actions();
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-p8],[data-skill],[data-zone],[data-mini],[data-lore-prev],[data-lore-next],[data-expedition],[data-ward],[data-furniture]');if(!b)return;
 if(b.dataset.p8==='close'){close();return}
 if(b.dataset.p8==='stars')starTree();
 if(b.dataset.p8==='journey')journey();
 if(b.dataset.p8==='mini')mini();
 if(b.dataset.p8==='lore')lore();
 if(b.dataset.p8==='expedition')expedition();
 if(b.dataset.p8==='wardrobe')wardrobe();
 if(b.dataset.skill)clickSkill(b.dataset.skill);
 if(b.dataset.zone!==undefined){const z=+b.dataset.zone;close();document.querySelector(`.loc-pill[data-loc="${z}"]`)?.click()}
 if(b.dataset.mini)startMini(b.dataset.mini);
 if(b.hasAttribute('data-lore-prev')){P8.lorePage=Math.max(0,(P8.lorePage||0)-1);lore()}
 if(b.hasAttribute('data-lore-next')){P8.lorePage=Math.min(14,(P8.lorePage||0)+1);lore()}
 if(b.dataset.expedition!==undefined){const i=+b.dataset.expedition;if(P8.expeditions.some(v=>v.pet===i&&v.until>Date.now()))return;P8.expeditions.push({pet:i,until:Date.now()+60000});P8.expeditions=P8.expeditions.slice(-2);safeSave();toast8('🐾 Bạn rừng đã lên đường thám hiểm!');expedition()}
 if(b.dataset.ward){const [k,v]=b.dataset.ward.split(':');P8.wardrobe[k]=v;if(k==='lantern')state.customLook=v;safeSave();wardrobe()}
 if(b.dataset.furniture!==undefined)runFurniture(+b.dataset.furniture);
});
/* Expeditions resolve lazily without another polling timer. */
function settleExpeditions(){const now=Date.now();let n=0;P8.expeditions=P8.expeditions.filter(e=>{if(e.until<=now){n++;return false}return true});if(n){P8.materials=(P8.materials||0)+n*2;state.l=(state.l||0)+n*Math.max(10,Math.floor((typeof cps==='function'?cps():1)*10));safeSave();toast8('🎒 Thám hiểm trở về: nhận nguyên liệu và ánh sáng.')} }
const oldDraw=typeof draw==='function'?draw:null;
if(oldDraw&&!window.__RDD_PHASE8_DRAW_HOOK){window.__RDD_PHASE8_DRAW_HOOK=true;draw=function(t,dt){oldDraw.apply(this,arguments);try{settleExpeditions();const now=Date.now();if(!P8.eventAt||now>P8.eventAt){P8.event=['Nguyệt thực','Cực quang'][Math.floor(Math.random()*2)];P8.eventAt=now+180000}if(P8.event==='Cực quang'&&typeof glow==='function'&&!inside){const c=now/1000;glow('v',W*.22+Math.sin(c*.2)*W*.05,H*.22,W*.65,.13);glow('c',W*.72,H*.28,W*.5,.12)}}catch(_){}};window.draw=draw}
/* Replace purchase cycling with NEXT: buy the exact affordable quantity up to the next 10-level milestone. */
const buy=$('#buy-mult');if(buy){buy.title='Mua x1 / x10 / NEXT / MAX';buy.onclick=function(){buyMode=buyMode===1?10:buyMode===10?'next':buyMode==='next'?'max':1;buy.textContent=buyMode==='max'?'MAX':buyMode==='next'?'NEXT':'x'+buyMode;buy.title='Chế độ mua: '+(buyMode==='next'?'đến mốc 10 cấp kế tiếp':buyMode==='max'?'mua tối đa trong giới hạn':'mua '+buyMode+' cấp');ui()}}
safeSave();
window.__RDD_PHASE8={version:'8.0',state:P8,open,starTree,journey,mini,lore,expedition,wardrobe,interactFurniture};
console.info('[Rừng Đom Đóm] Phase 8 integration loaded');
})();
/* End of V9.4 source: all IIFEs and HTML document are closed. */

