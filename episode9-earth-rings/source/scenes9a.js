// ===================== HOOK (0–24) : a visual change every 1.5–2.5 s =====================
// A1 0–0.87 "Look up." frame 0: night city, a giant glowing ring arch fills the sky, you look up
function A1(t){ctx.save();cam(t,[[0,1.05,CX,560],[0.87,1.0,CX,540]]);sky('#060a1c','#1a2650');arch(t,{hy:860,rx:1250,ry:760,th:170,a:1});city(880,t);ctx.restore();
  hero(520,1080,1.6,t,{pose:'up',mood:'shock',col:WHITE});TX('LOOK UP.',1350,330,170,GOLD,{stroke:12,strokeCol:'#000'});vignette(0.45);}
// A2 0.87–1.98 "Earth has rings now..." space shot, fast push-in
function A2(t){deep(t);ctx.save();cam(t,[[0.87,1.5,CX,CY],[1.98,1.0,CX,CY]]);earthR(CX,560,190,t,{tilt:-0.22,flat:0.22});ctx.restore();ST('EARTH HAS RINGS',CX,110,110,WHITE,t,0.95);vignette(0.5);}
// A3 1.98–5.09 "almost five thousand times heavier than Saturn's." scale: Saturn's rings vs ours
function A3(t){deep(t);const k=eOut(P(t,1.98,2.6));satC(lerp(600,480,k),560,120,t,{glowA:0.2});earthR(lerp(1320,1440,k),560,95,t,{flat:0.22});
  TX("SATURN'S RINGS",480,860,60,'#cfd6ea');TX('OUR RINGS',1440,860,60,'#cfd6ea');
  if(t>2.7){const n=counter(t,2.7,4.4,1,4770);TX('×'+n.toLocaleString('en-US'),CX,560,150,GOLD,{stroke:10,strokeCol:'#000'});TX('HEAVIER',CX,680,70,WHITE);}
  if(t>4.0)ST('≈ 5,000×',CX,150,120,RED,t,4.4,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// A4 5.09–6.91 "And they used to be our Moon." Moon cracks and smears into the ring (rewind look)
function A4(t){deep(t);const k=P(t,5.3,6.6);earthS(620,600,170);if(k<0.35)moonC(1340,540,170,{crack:clamp(k/0.3)});else{fragments(1340,540,170,eOut((k-0.35)/0.65)*0.9,t);}
  if(k>0.5)ringHalf(620,600,170,t,{a:(k-0.5)*2,front:true,flat:0.22});ST('USED TO BE OUR MOON',CX,120,110,GOLD,t,5.4,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// A5 6.91–8.2 "They'll light up your nights" — glowing night city
function A5(t){ctx.save();cam(t,[[6.91,1.0,CX,CY],[8.2,1.06,CX,CY]]);sky('#0a1030','#2b3a66');arch(t,{hy:880,rx:1200,ry:720,th:180});city(900,t,{lit:1});glow(CX,700,900,'rgba(255,240,200,0.12)',1);ctx.restore();
  chip('BRIGHT NIGHTS',CX,160,90,GOLD,t,7.1);vignette(0.4);}
// A6 8.2–9.46 "steal your winter Sun..." — snowy noon, the Sun slides behind the ring, everything dims
function A6(t){const k=P(t,8.3,9.3);sky('#5d7aa6','#a9c0dd');sunDisk(lerp(700,960,k),lerp(520,360,k),70,t);arch(t,{hy:900,rx:1300,ry:620,th:220,col:[200,190,170]});snowGround(900);dim(0.55*k);
  hero(1500,1050,1.2,t,{pose:'relax',mood:'shock',col:INK});chip('NO WINTER SUN',CX,160,90,WHITE,t,8.4);vignette(0.4);}
// A7 9.46–12.22 "and turn leaving Earth into a nightmare." — rocket into the rock storm, shake on "nightmare"
function A7(t){ctx.save();shake(t,11.4,26,0.5);deep(t,{speed:500,dirx:0,diry:1});const u=P(t,9.46,12.2);
  for(let i=0;i<40;i++){const R=rng(700+i);const x=(R()*2400-240+t*900*(0.5+R()))%2400-240,y=R()*1080;rock(x,y,10+R()*28,700+i);}
  rocket(CX,lerp(1000,560,eOut(u)),1.1,t);if(t>11.4){glow(CX,520,260,'rgba(255,120,60,0.8)',P(t,11.4,11.6));for(let i=0;i<10;i++){const a=i/10*TAU;line(CX,520,CX+Math.cos(a)*200*P(t,11.4,11.8),520+Math.sin(a)*200*P(t,11.4,11.8),{w:8,col:GOLD,seed:720+i});}}ctx.restore();
  ST('NIGHTMARE',CX,150,140,RED,t,11.4,{stroke:10,strokeCol:'#000'});vignette(0.55);}
// A8 12.22–13.53 "This isn't fantasy."
function A8(t){deep(t);TX('FANTASY',CX,500,190,'#9aa3c0');if(t>12.6){const k=eOut(P(t,12.6,12.9));line(CX-420,520,lerp(CX-420,CX+420,k),480,{w:18,col:RED,seed:801});}ST('REAL PHYSICS',CX,760,110,GOLD,t,13.0);vignette(0.5);}
// A9 13.53–16.96 "Every step... already happened somewhere in space." four evidence cards pop
function card(x,y,w,h,title,draw,t,t0){if(t<t0)return;const k=pop(t,t0,0.25);ctx.save();ctx.translate(x,y);ctx.rotate(nz(x,3)*0.04);ctx.scale(k,k);rrect(-w/2,-h/2,w,h,18,{w:6,col:'#cfd6ea',fill:'#0d1230',seed:810+x});
  ctx.save();ctx.beginPath();ctx.rect(-w/2+10,-h/2+10,w-20,h-80);ctx.clip();draw();ctx.restore();TX(title,0,h/2-38,46,GOLD);ctx.restore();}
function A9(t){deep(t);const W4=400,H4=420;
  card(270,520,W4,H4,'1992 · JUPITER',()=>{jupC(-60,-30,120,t,{glowA:0});for(let i=0;i<9;i++)ell(70+i*14,-90+i*16,6,6,{w:3,col:WHITE,fill:WHITE,seed:820+i});},t,13.6);
  card(730,520,W4,H4,'SATURN',()=>{satC(0,-20,70,t,{glowA:0});},t,14.3);
  card(1190,520,W4,H4,'2009 · COLLISION',()=>{satellite(-40,-40,0.6);satellite(50,20,0.6);glow(0,-10,80,'rgba(255,140,60,0.8)',1);},t,15.0);
  card(1650,520,W4,H4,'2024 · STUDY',()=>{earthS(0,-20,110);for(let i=0;i<8;i++)ell(-90+i*26,-20+nz(i,4)*12,7,7,{w:3,col:RED,fill:RED,seed:830+i});},t,15.7);
  cap('ALREADY SEEN IN SPACE',110,96,WHITE);vignette(0.5);}
// A10 16.96–20.09 "before this video is over, I'll show you the craziest part:" timeline bar to a "?"
function A10(t){deep(t);const k=P(t,17.0,19.6);rrect(260,520,1400,40,20,{w:5,col:'#cfd6ea',fill:'#141a38',seed:840});ctx.fillStyle=RED;ctx.fillRect(268,528,1384*eOut(k),24);
  ell(260+1400*eOut(k),540,26,26,{w:5,col:WHITE,fill:RED,seed:841});TX('THIS VIDEO',260,450,56,'#cfd6ea',{align:'left'});
  ST('?',1660,380,220,GOLD,t,18.6,{stroke:10,strokeCol:'#000'});TX('THE CRAZIEST PART',CX,760,100,WHITE,{k:wk(t,17.6,'',30)});vignette(0.5);}
// A11 20.09–22.13 "Earth might have had rings before..." ancient Earth with a ghost ring
function ancient(x,y,r,t,{ring=0,craters=0,rand=0}={}){glow(x,y,r*1.5,'rgba(120,170,255,0.22)',1);if(ring>0)ringHalf(x,y,r,t,{front:false,a:ring*0.7,flat:0.2,tilt:-0.15});
  ell(x,y,r,r,{w:6,col:INK,fill:'#3f78c0',seed:850});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();ctx.fillStyle='#b9a36a';
  for(const[u,v,a,b]of[[-0.35,0.45,0.42,0.3],[0.3,0.25,0.25,0.18],[0.5,-0.1,0.16,0.22],[-0.55,-0.25,0.15,0.12]]){ctx.beginPath();ctx.ellipse(x+u*r,y+v*r,a*r,b*r,0.4,0,TAU);ctx.fill();}
  if(rand>0){const R=rng(11);for(let i=0;i<21;i++){if(i/21>rand)break;ell(x+(R()*1.6-0.8)*r,y+(R()*1.6-0.8)*r,r*0.035,r*0.035,{w:3,col:RED,fill:RED,seed:860+i});}}
  if(craters>0){const R=rng(12);for(let i=0;i<21;i++){if(i/21>craters)break;ell(x+(R()*1.5-0.75)*r,y+(R()*0.36-0.18)*r,r*0.035,r*0.035,{w:3,col:RED,fill:RED,seed:870+i});}}
  const sh=ctx.createRadialGradient(x-r*0.4,y-r*0.4,r*0.3,x,y,r*1.05);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,10,0.55)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();ell(x,y,r,r,{w:6,col:INK,seed:850});
  if(ring>0)ringHalf(x,y,r,t,{front:true,a:ring*0.7,flat:0.2,tilt:-0.15});}
function A11(t){deep(t,{dim:0.8});ctx.save();cam(t,[[20.09,0.9,CX,CY],[22.13,1.05,CX,CY]]);ancient(CX,560,230,t,{ring:P(t,20.4,21.4)});ctx.restore();chip('466 MILLION YEARS AGO?',CX,120,80,GOLD,t,20.3);vignette(0.5);}
// A12 22.13–23.93 "and we may have found the scars."
function A12(t){deep(t,{dim:0.8});ctx.save();cam(t,[[22.13,1.05,CX,CY],[23.93,1.35,CX,600]]);ancient(CX,560,230,t,{craters:P(t,22.3,23.4)});ctx.restore();ST('THE SCARS',CX,960,120,RED,t,23.0,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// ===================== SETUP (24–55) =====================
// B1 23.93–25.05 "Here's the experiment."
function B1(t){deep(t);ctx.save();ctx.translate(CX,540);ctx.rotate(-0.03);const k=pop(t,24.0,0.3);ctx.scale(k,k);rrect(-560,-200,1120,400,26,{w:8,col:INK,fill:'#F6F4F8',seed:901});
  for(let i=0;i<5;i++)line(-520,-120+i*70,520,-120+i*70,{w:2,col:'#9fb3d9',seed:902+i,amp:0.5});TX('THE EXPERIMENT',0,-40,130,INK);TX('ONE ASSUMPTION. REAL PHYSICS.',0,90,60,RED);ctx.restore();vignette(0.4);}
// B2 25.05–28.57 pull the Moon in to 18,000 km — distance counter
function B2(t){deep(t);const k=eInOut(P(t,25.3,28.2));earthS(380,520,160);const mx=lerp(1780,700,k);moonC(mx,520,55);
  ctx.save();ctx.setLineDash([16,14]);line(380,720,mx,720,{w:4,col:'#cfd6ea',seed:910});ctx.restore();const d=Math.round(lerp(384400,18000,k)/100)*100;
  odo(1150,880,1.0,d.toLocaleString('en-US')+' KM','FROM EARTH\'S CENTER');redArrow(1600,400,1400,400,t,25.4);vignette(0.5);}
// B3 28.57–29.57 "The Roche limit." dashed red circle
function B3(t){deep(t);earthS(700,560,110);const k=eOut(P(t,28.6,29.2));ctx.save();ctx.setLineDash([22,16]);ctx.strokeStyle=RED;ctx.lineWidth=8;ctx.beginPath();ctx.arc(700,560,318*k,0,TAU);ctx.stroke();ctx.restore();
  moonC(1030,560,40);ST('ROCHE LIMIT',1450,420,120,RED,t,28.7,{stroke:8,strokeCol:'#000'});TX('18,000 KM',1450,560,80,WHITE);vignette(0.5);}
// B4 29.57–34.04 stretched Moon: near side pulled harder than far side
function B4(t){deep(t);ctx.save();cam(t,[[29.57,1.0,900,560],[34.0,1.25,1150,560]]);earthS(420,560,140);const s=lerp(1,1.45,eOut(P(t,31.0,33.6)));
  ctx.save();ctx.translate(1180,560);ctx.scale(s,1/Math.sqrt(s));moonC(0,0,130,{crack:P(t,33.0,34.0)*0.6});ctx.restore();
  redArrow(1180-130*s,560,1180-130*s-180,560,t,30.3);redArrow(1180+130*s,560,1180+130*s+60,560,t,30.6);ctx.restore();
  TX('NEAR SIDE: PULLED HARDER',600,920,58,GOLD);TX('FAR SIDE: PULLED LESS',1400,920,58,'#cfd6ea');chip('STRETCHED APART',CX,120,90,WHITE,t,31.5);vignette(0.5);}
// B5 34.04–37.47 slow approach = giant tides wreck Earth (skipped)
function B5(t){deep(t);ctx.save();ctx.translate(800,560);ctx.rotate(0);ctx.fillStyle='rgba(90,160,235,0.55)';const k=0.5+0.5*Math.sin(t*3);ctx.beginPath();ctx.ellipse(0,0,230+60*k,165,0,0,TAU);ctx.fill();ctx.restore();earthS(800,560,160);moonC(1350,560,50);
  if(t>35.0)TX('TIDES ×9,000',800,820,90,GOLD,{stroke:8,strokeCol:'#000'});if(t>36.0){bigX(800,560,240,t,36.0);}chip('WE SKIP THIS',1450,170,80,WHITE,t,37.0);vignette(0.5);}
// B6 37.47–38.93 "So we skip that part." fast-forward
function B6(t){deep(t,{speed:2200});const k=pop(t,37.5,0.25);ctx.save();ctx.translate(CX,540);ctx.scale(k,k);for(const dx of[-90,60])poly([[dx-70,-110],[dx+70,0],[dx-70,110]],{w:8,col:INK,fill:WHITE,close:true,seed:930+dx});ctx.restore();TX('SKIP',CX,800,110,GOLD);vignette(0.5);}
// B7 38.93–39.7 "Snap." flash + crack
function B7(t){ctx.save();shake(t,38.95,30,0.5);deep(t);moonC(CX,540,250,{crack:P(t,38.95,39.3)});ctx.restore();ST('SNAP.',1500,220,150,RED,t,38.95,{stroke:10,strokeCol:'#000'});vignette(0.5);}
// B8 39.7–41.98 "The Moon cracks... and breaks apart."
function B8(t){deep(t);ctx.save();cam(t,[[39.7,1.15,CX,CY],[41.98,0.85,CX,CY]]);const k=P(t,40.5,41.98);if(k<=0)moonC(CX,540,250,{crack:1});else fragments(CX,540,250,eOut(k),t);ctx.restore();vignette(0.5);}
// B9 41.98–47.32 1992: Jupiter tears comet Shoemaker-Levy 9 into 21 pieces
function B9(t){deep(t);ctx.save();cam(t,[[41.98,0.9,CX,CY],[47.3,1.1,1100,CY]]);jupC(520,560,300,t);const k=P(t,43.6,46.5);
  for(let i=0;i<21;i++){const f=i/20;const sp=lerp(0,f-0.5,eOut(k));const x=1330+sp*1000,y=430+sp*420;if(k<=0&&i>0)continue;glow(x,y,30,'rgba(220,235,255,0.8)',1);line(x,y,x+50,y-30,{w:4,col:'rgba(220,235,255,0.6)',seed:950+i,amp:1});
    ell(x,y,9,9,{w:3,col:WHITE,fill:WHITE,seed:960+i});}ctx.restore();
  chip('1992 · COMET SHOEMAKER-LEVY 9',CX,110,72,GOLD,t,42.2);if(t>44){const n=counter(t,44,46.6,1,21);TX(n+' PIECES',1400,900,110,RED,{stroke:8,strokeCol:'#000'});}vignette(0.5);}
// B10 47.32–51.59 the pieces don't fall: they keep circling
function B10(t){deep(t);earthS(CX,560,130);const R=rng(41);for(let i=0;i<60;i++){const a0=R()*TAU,rr=330+R()*90,e=R()*60;const a=a0+(t-47)*0.5;rock(CX+Math.cos(a)*rr,560+Math.sin(a)*(rr*0.55+e),6+R()*14,970+i);}
  ctx.save();ctx.setLineDash([14,14]);ctx.strokeStyle='rgba(255,215,0,0.7)';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(CX,560,520,300,0,-0.4,1.2);ctx.stroke();ctx.restore();
  chip("THEY DON'T FALL",CX,110,90,WHITE,t,47.5);if(t>49.5)chip('THEY ORBIT',CX,960,80,GOLD,t,49.5);vignette(0.5);}
// B11 51.59–54.72 the cloud flattens into a disk above the equator
function B11(t){deep(t);const k=eInOut(P(t,51.7,54.2));earthS(CX,560,130);const R=rng(42);
  for(let i=0;i<110;i++){const a=R()*TAU+(t-51)*0.4,rr=180+R()*240;const fl=lerp(0.6,0.16,k);rock(CX+Math.cos(a)*rr*1.6,560+Math.sin(a)*rr*fl+lerp((R()-0.5)*200,0,k),4+R()*9,990+i);}
  if(k>0.6)ringHalf(CX,560,130,t,{front:true,a:(k-0.6)*2.5,flat:0.16,tilt:0});ctx.save();ctx.setLineDash([12,12]);line(CX-700,560,CX+700,560,{w:3,col:'rgba(255,90,80,0.7)',seed:995});ctx.restore();TX('EQUATOR',CX+620,520,46,RED);vignette(0.5);}
// B12 54.72–56.85 "And there they are. Earth's rings." hero shot, slow orbit
function B12(t){deep(t);ctx.save();cam(t,[[54.72,1.25,CX,CY],[56.85,1.0,CX,CY]]);earthR(CX,560,200,t,{tilt:lerp(-0.1,-0.25,P(t,54.7,56.9)),flat:0.24});ctx.restore();ST("EARTH'S RINGS",CX,120,120,GOLD,t,55.8);vignette(0.5);}
// ===================== SCIENCE (57–82) =====================
// C1 56.85–61.67 Saturn's rings may be a shredded moon (hypothesis)
function C1(t){deep(t);satC(800,560,170,t);const k=P(t,57.5,60.5);if(k<0.6)moonC(lerp(1500,1220,k/0.6),lerp(300,380,k/0.6),48,{crack:clamp((k-0.3)/0.3)});else fragments(1220,380,48,(k-0.6)*2.5,t);
  chip('HYPOTHESIS: A SHREDDED MOON',CX,110,72,GOLD,t,57.2);vignette(0.5);}
// C2 61.67–64.99 ours = a whole Moon = so heavy
function C2(t){deep(t);moonC(560,520,150);TX('A WHOLE MOON',560,780,80,WHITE);if(t>62.3){TX('=',CX,520,140,GOLD);earthR(1400,520,80,t,{flat:0.22});TX('OUR RINGS',1400,780,80,WHITE);}ST('SO HEAVY',CX,150,120,RED,t,63.8,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// C3 64.99–71.05 squash them flat: a slab 26 km thick = three Everests
function everest(x,base,h,col='#8a8fa8'){poly([[x-h*0.9,base],[x,base-h],[x+h*0.9,base]],{w:6,col:INK,fill:col,close:true,seed:1010+x});poly([[x-h*0.22,base-h*0.75],[x,base-h],[x+h*0.22,base-h*0.75]],{w:4,col:INK,fill:'#fff',close:true,seed:1011+x});}
function C3(t){deep(t);const k=eOut(P(t,65.2,67.0));const top=lerp(500,240,k);ctx.fillStyle='#8e8170';ctx.fillRect(150,top,1100,900-top);poly([[150,top],[1250,top],[1250,900],[150,900]],{w:7,col:INK,close:true,seed:1001});
  ctx.fillStyle='rgba(0,0,0,0.18)';for(let i=0;i<30;i++){const R=rng(1000+i);ctx.beginPath();ctx.arc(150+R()*1100,top+R()*(900-top),5+R()*14,0,TAU);ctx.fill();}
  if(t>66.5)TX('26 KM',700,(top+900)/2,150,WHITE,{stroke:10,strokeCol:'#000'});
  if(t>69.5){const h=220;[0,1,2].forEach(i=>{if(t>69.5+i*0.3)everest(1550,900-i*h,h);});ST('3 EVERESTS',1550,170,100,GOLD,t,70.3);}
  chip('SOLID ROCK',700,150,80,WHITE,t,65.4);vignette(0.4);}
// C4 71.05–77.39 from 2,000 km up to 12,000 km: almost as wide as Earth
function C4(t){deep(t);const ex=420,ey=560,r=220,s=r/6371;earthS(ex,ey,r);const x0=ex+(6371+2000)*s,x1=ex+(18400)*s;
  const k=eOut(P(t,71.3,73.5));ctx.fillStyle='rgba(217,205,181,0.9)';ctx.fillRect(x0,ey-40,(x1-x0)*k,80);poly([[x0,ey-40],[x0+(x1-x0)*k,ey-40],[x0+(x1-x0)*k,ey+40],[x0,ey+40]],{w:5,col:INK,close:true,seed:1020});
  if(t>72.0){line(x0,ey+60,x0,ey+140,{w:5,col:GOLD,seed:1021});TX('2,000 KM UP',x0,ey+190,68,GOLD);}
  if(t>74.0){line(x1,ey+60,x1,ey+140,{w:5,col:GOLD,seed:1022});TX('12,000 KM UP',x1+40,ey+190,68,GOLD);}
  if(t>75.4){redArrow(x0,ey-120,x1,ey-120,t,75.4);redArrow(x1,ey-120,x0,ey-120,t,75.4);ST('≈ AS WIDE AS EARTH',(x0+x1)/2+80,ey-220,90,RED,t,75.6,{stroke:8,strokeCol:'#000'});}vignette(0.4);}
// C5 77.39–80.04 so packed no light gets through (Saturn's rings let light through, ours don't)
function C5(t){deep(t);sunDisk(170,540,90,t);const k=P(t,77.6,79.0);for(let i=0;i<6;i++){const y=300+i*96;const xEnd=lerp(260,1080,k);line(270,y,xEnd,y,{w:6,col:GOLD,seed:1030+i});}
  ctx.fillStyle='#9e917c';ctx.fillRect(1080,180,90,760);poly([[1080,180],[1170,180],[1170,940],[1080,940]],{w:6,col:INK,close:true,seed:1040});TX('OUR RINGS',1125,140,56,WHITE);
  if(k>=1){ctx.fillStyle='#000';ctx.fillRect(1180,180,740,760);TX('DARK',1550,540,140,'#59607a');}ST('NO LIGHT GETS THROUGH',CX,1000,80,GOLD,t,78.8);vignette(0.4);}
// C6 80.04–82.2 "So what would you actually see?"
function C6(t){ctx.save();cam(t,[[80.04,1.0,CX,CY],[82.2,1.1,CX,600]]);sky('#060a1c','#1a2650');city(900,t);ctx.restore();heroBack(CX,1060,1.4,t,{col:WHITE,head:'#F6F4F8'});ST('WHAT WOULD YOU SEE?',CX,300,120,GOLD,t,80.3,{stroke:8,strokeCol:'#000'});vignette(0.5);}
