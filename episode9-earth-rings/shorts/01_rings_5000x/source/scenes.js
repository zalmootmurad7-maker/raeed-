// ===== Short: Earth's rings, 5,000× Saturn's (ep. 9 door, 9:16, Event Horizon dark look) =====
function everestV(x,base,h){poly([[x-h*0.9,base],[x,base-h],[x+h*0.9,base]],{w:6,col:INK,fill:'#8a8fa8',close:true,seed:1010+x});poly([[x-h*0.22,base-h*0.75],[x,base-h],[x+h*0.22,base-h*0.75]],{w:4,col:INK,fill:'#fff',close:true,seed:1011+x});}
function A(t){deep(t);const z=lerp(1.08,1.0,eOut(P(t,0,1.7)));ctx.save();ctx.translate(CX,980);ctx.scale(z,z);ctx.translate(-CX,-980);earthR(CX,980,175,t,{tilt:-0.2,flat:0.24});ctx.restore();
  TX('EARTH HAS',CX,300,150,WHITE);TX('RINGS?!',CX,470,200,GOLD,{stroke:12,strokeCol:'#000'});vignette(0.5);}
function B(t){deep(t);const k=eOut(P(t,1.8,2.4));satC(lerp(CX,300,k),lerp(980,700,k),lerp(110,70,k),t,{glowA:0.2});earthR(lerp(CX,700,k),lerp(980,1180,k),lerp(175,120,k),t,{flat:0.22});
  if(k>0.9){TX("SATURN'S",300,890,72,'#cfd6ea');TX('OURS',700,1340,76,'#cfd6ea');}
  if(t>wt('five')){const n=counter(t,wt('five'),wt('heavier'),1,4770);TX('×'+n.toLocaleString('en-US'),CX,360,170,GOLD,{stroke:12,strokeCol:'#000'});TX('HEAVIER',CX,500,90,WHITE);}
  if(t>wt('than'))ST('≈ 5,000×',720,830,140,RED,t,wt('than'),{stroke:10,strokeCol:'#000'});vignette(0.5);}
function C(t){deep(t);const k=P(t,wt('used')-0.1,wt('moon')+0.6);earthS(CX,1180,150);if(k<0.35)moonC(CX,720,160,{crack:clamp(k/0.3)});else fragments(CX,720,160,eOut((k-0.35)/0.65)*0.9,t);
  if(k>0.55)ringHalf(CX,1180,150,t,{a:(k-0.55)*2.2,front:true,flat:0.22});TX('THEY WERE',CX,300,120,WHITE);TX('OUR MOON',CX,430,150,GOLD,{stroke:10,strokeCol:'#000'});vignette(0.5);}
function D(t){deep(t,{dim:0.7});const B0=1370;const zz=1+0.08*eInOut(P(t,wt('slab'),wt("they'll")));ctx.save();ctx.translate(CX,1060);ctx.scale(zz,zz);ctx.translate(-CX,-1060);const k=eOut(P(t,wt('squash')-0.1,wt('twenty')));const top=lerp(1180,760,k);
  if(k<1){for(let i=0;i<16;i++){const R=rng(1200+i);const ph=((t-wt('squash'))*1.6+R())%1;const x=130+R()*460,y=lerp(560,top,ph);rock(x,y,14+R()*22,1200+i);}}
  ctx.fillStyle='#8e8170';ctx.fillRect(110,top,500,B0-top);poly([[110,top],[610,top],[610,B0],[110,B0]],{w:7,col:INK,close:true,seed:1001});
  ctx.fillStyle='rgba(0,0,0,0.2)';for(let i=0;i<24;i++){const R=rng(1000+i);ctx.beginPath();ctx.arc(110+R()*500,top+R()*(B0-top),5+R()*14,0,TAU);ctx.fill();}
  if(t>wt('twenty'))TX(counter(t,wt('twenty'),wt('thick'),1,26)+' KM',360,(top+B0)/2,150,WHITE,{stroke:12,strokeCol:'#000'});
  if(t>wt('three')){const h=200;[0,1,2].forEach(i=>{if(t>wt('three')+i*0.25)everestV(805,B0-i*h,h);});ST('3 EVERESTS',795,690,88,GOLD,t,wt('everests'),{stroke:10,strokeCol:'#000'});}ctx.restore();
  TX('SQUASH THEM FLAT:',CX,300,96,WHITE);TX('SOLID ROCK',CX,420,130,RED,{stroke:10,strokeCol:'#000'});vignette(0.45);}
function E(t){sky('#0a1030','#2b3a66');ctx.save();ctx.translate(CX,0);ctx.scale(0.62,1);ctx.translate(-CX,0);arch(t,{hy:1260,rx:1050,ry:820,th:200});ctx.restore();city(1270,t,{lit:1});glow(CX,1100,800,'rgba(255,240,200,0.14)',1);
  TX('BRIGHT',CX,300,170,GOLD,{stroke:12,strokeCol:'#000'});TX('NIGHTS',CX,470,170,WHITE,{stroke:12,strokeCol:'#000'});vignette(0.4);}
function F(t){const k=P(t,wt('winter')-0.2,wt('sun')+0.6);sky('#5d7aa6','#a9c0dd');sunDisk(lerp(380,CX,k),lerp(900,720,k),80,t);ctx.save();ctx.translate(CX,0);ctx.scale(0.6,1);ctx.translate(-CX,0);arch(t,{hy:1300,rx:1100,ry:760,th:260,col:[200,190,170]});ctx.restore();
  snowGround(1300);dim(0.55*k);TX('NO WINTER',CX,300,150,WHITE,{stroke:12,strokeCol:'#000'});TX('SUN',CX,460,170,GOLD,{stroke:12,strokeCol:'#000'});vignette(0.4);}
function G(t){ctx.save();shake(t,wt('nightmare'),28,0.5);deep(t,{speed:500,dirx:0,diry:1});for(let i=0;i<34;i++){const R=rng(700+i);const x=R()*1080,y=(R()*2100+t*700*(0.5+R()))%2100-90;rock(x,y,12+R()*30,700+i);}
  const u=P(t,wt('leaving')-0.2,wt('nightmare'));rocket(CX,lerp(1500,950,eOut(u)),1.4,t);if(t>wt('nightmare')){glow(CX,880,320,'rgba(255,120,60,0.85)',P(t,wt('nightmare'),wt('nightmare')+0.2));}ctx.restore();
  TX('LEAVING EARTH?',CX,300,120,WHITE,{stroke:10,strokeCol:'#000'});if(t>wt('nightmare'))ST('NIGHTMARE',CX,470,170,RED,t,wt('nightmare'),{stroke:12,strokeCol:'#000'});vignette(0.5);}
function HZ(t){deep(t,{dim:0.7});earthR(CX,1150,150,t,{flat:0.22});const k=eOut(clamp((t-TM.vend-0.1)/0.3));ctx.save();ctx.translate(0,-(1-k)*600);glow(CX,470,620,'rgba(255,68,68,0.25)',0.8);
  rrect(40,250,1000,440,34,{w:9,col:RED,fill:'#fff',seed:9300});txt('WHY A',CX,370,130,{col:INK,maxW:920});txt('NIGHTMARE?',CX,545,160,{col:RED,stroke:6,strokeCol:'#000',maxW:920});ctx.restore();
  if(t>=TM.vend+0.5){const kk=pop(t,TM.vend+0.5,0.3);ctx.save();ctx.translate(CX,1440);ctx.scale(kk,kk);rrect(-300,-70,600,140,30,{w:6,col:'#cfd6ea',fill:'rgba(10,10,25,0.92)',seed:9310});likeBtn(-200,0,0.55,t>TM.vend+1.0);txt('HIT LIKE',70,4,80,{col:WHITE});ctx.restore();}}
function render(t){BOIL=Math.floor(t/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  ctx.save();if(t<0.5){const k=eOut(clamp(t/0.5));ctx.translate(nz(t*60,1)*14*(1-k),nz(t*55,2)*14*(1-k));ctx.translate(CX,CY);ctx.scale(lerp(1.06,1,k),lerp(1.06,1,k));ctx.translate(-CX,-CY);}
  (t<wt('almost')-0.05?A:t<wt('and')-0.1?B:t<wt('squash')-0.1?C:t<wt("they'll")-0.1?D:t<wt('steal')-0.05?E:t<wt('and',2)-0.05?F:t<TM.vend?G:HZ)(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);if(t<TM.vend)caps(t);}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
