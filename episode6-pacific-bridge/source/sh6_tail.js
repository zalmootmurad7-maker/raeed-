// ===== Episode 6 shorts (9:16). Scene functions take SOURCE time t. Safe zone y 288–1536, no subtitle bar. =====
const SEA='#CFE3F2',DEEP='#7FA8CC',ABYSS='#2E4A6B',LAND='#E8DDB5',CONC='#C9C9D2',MONEY='#2E8B3D';
function T(s,y,size,col=INK,o={}){return txt(s,CX,y,size,{col,maxW:960,...o});}
function shakeAt(t,t0,amp=14,d=0.35){if(t<t0||t>t0+d)return[0,0];const k=amp*(1-(t-t0)/d);return[nz(t*60,3)*k,nz(t*57,4)*k];}
function counter(t,t0,t1,v0,v1){return Math.round(lerp(v0,v1,eOut(P(t,t0,t1))));}
function fmt(n){return n.toLocaleString('en-US');}
function seaV(t,y0,pxkm,{trench=true,floor=4}={}){paper();ctx.fillStyle='#E9F2F8';ctx.fillRect(0,0,W,y0);const fy=y0+floor*pxkm,ty=y0+11*pxkm;
  const g=ctx.createLinearGradient(0,y0,0,Math.max(fy,ty));g.addColorStop(0,DEEP);g.addColorStop(1,ABYSS);ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,y0);ctx.lineTo(W,y0);ctx.lineTo(W,fy);
  if(trench){ctx.lineTo(760,fy);ctx.lineTo(660,ty);ctx.lineTo(420,ty);ctx.lineTo(320,fy);}ctx.lineTo(0,fy);ctx.closePath();ctx.fill();
  const sb=trench?[[0,fy],[320,fy],[420,ty],[660,ty],[760,fy],[W,fy]]:[[0,fy],[W,fy]];poly(sb,{w:LW+2,col:INK,seed:830,amp:3});
  ctx.fillStyle='#6b5a44';ctx.beginPath();ctx.moveTo(0,fy);for(const[x,y]of sb)ctx.lineTo(x,y);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();line(0,y0,W,y0,{w:LW,col:'#3b6a96',seed:845,amp:2});}
function everestV(x,y,s,sx){ctx.save();ctx.translate(x,y);ctx.scale(1,-1);ctx.scale(sx,s);poly([[-120,0],[-20,-200],[10,-170],[30,-205],[130,0]],{w:6,fill:'#9a8e80',close:true,seed:860});poly([[-20,-200],[-45,-150],[-5,-160],[10,-170],[30,-205],[48,-150]],{w:5,fill:'#fff',seed:861});ctx.restore();}
function island(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,70,26,{w:6,fill:LAND,seed:940});for(const[dx,h]of[[-35,50],[-5,80],[25,60]]){rrect(dx-12,-h,24,h,3,{w:4,fill:'#ddd',seed:941+dx});}ctx.restore();}
function ship(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-160,0],[160,0],[130,50],[-140,50]],{w:7,fill:'#555',close:true,seed:910});
  for(let i=0;i<5;i++)for(let j=0;j<2;j++){const cs=['#d2382c','#2e6fb0','#e0a800','#2e8b3d'];ctx.fillStyle=cs[(i+j)%4];ctx.fillRect(-130+i*50,-40-j*30,46,28);}rrect(110,-80,40,80,4,{w:5,fill:'#fff',seed:914});ctx.restore();}
function drawbridge(x,y,s,open){ctx.save();ctx.translate(x,y);ctx.scale(s,s);line(-260,0,-90,0,{w:12,seed:950});line(90,0,260,0,{w:12,seed:951});
  const a=open*1.1;for(const sd of[-1,1]){ctx.save();ctx.translate(sd*90,0);ctx.rotate(sd*-a);line(0,0,-sd*90,0,{w:12,col:RED,seed:952+sd});ctx.restore();}
  rrect(-110,0,40,60,4,{w:5,fill:CONC,seed:953});rrect(70,0,40,60,4,{w:5,fill:CONC,seed:954});ctx.restore();}
function billV(x,y,s,lines){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const h=120+lines.length*80;const zz=[[-260,0],[260,0],[260,h]];for(let k=0;k<=17;k++)zz.push([260-k*30,h+(k%2?0:20)]);
  poly(zz,{w:6,fill:'#fff',close:true,seed:960});txt('THE BILL',0,60,80,{col:RED});lines.forEach(([a,b,col],i)=>{txt(a,-230,150+i*80,52,{align:'left'});txt(b,230,150+i*80,52,{align:'right',col:col||INK});});ctx.restore();}
// ---- short A: Everest upside down (sources 29.5–39.6 + 24.0–24.9 hook line reorder) ----
function A(t){
  if(t>=39.6){paper();const base=1460,pxm=t<47.51?lerp(5.0,1.5,eInOut(P(t,43.95,44.35))):lerp(1.5,0.25,eInOut(P(t,47.51,48.6)));line(0,base,W,base,{w:LW,seed:1110});
    const h65=Math.max(14,65*pxm);{ctx.save();ctx.globalAlpha=0.55;ctx.fillStyle=SEA;ctx.fillRect(0,base-h65,W,h65);ctx.restore();line(0,base-h65,W,base-h65,{w:5,col:'#3b6a96',seed:1119});}if(t<44.34){line(60,base-h65-30,1020,base-h65-30,{w:16,seed:1118});stick(800,base-h65-38,1.3,t,{pose:'point',mood:'curious'});T('GREECE:',480,110,RED);T('65 M OF WATER',600,110,RED);}rrect(170-50,base-h65,100,h65,6,{w:6,fill:CONC,seed:1111});txt('65 M',170,base-h65-(t<44.34?80:50),72,{});txt('BRIDGE',170,base+60,56,{});
    if(t>44.34){rrect(470-55,base-535*pxm,110,535*pxm,6,{w:6,fill:CONC,seed:1112});txt('535 M',470,base-535*pxm-50,72,{});txt('OIL RIG',470,base+60,56,{});}
    if(t>47.51){const h=4000*pxm;ctx.save();ctx.setLineDash([22,14]);rrect(830-80,base-h,160,h,8,{w:9,col:RED,seed:1113});ctx.restore();if(h>600){txt('4,000 M',830,base-h-50,80,{col:RED});}if(t>48.47)stamp('×8',600,820,190,RED,t,48.47);}
    T(t<44.3?'RECORD BRIDGE PILLAR':t<47.5?'DEEPEST OIL PLATFORM':'WE WOULD NEED',260,110,INK);if(t>49.87)T('THOUSANDS OF THEM!',1600,96,RED);return;}
  const y0=440,pk=92;seaV(t,y0,pk);
  if(t>=35.08){const ey=lerp(y0-850,y0,eOut(P(t,36.94,38.0)));const yy=t<36.94?lerp(-1100,y0-850,eOut(P(t,35.08,35.8))):ey;everestV(540,yy,4.0,1.15);}
  txt('4 KM',160,y0+4*pk+60,80,{col:WHITE,stroke:8,strokeCol:INK});if(t>32.41)T('11 KM',y0+11*pk+60,90,GOLD,{stroke:8,strokeCol:INK});
  if(t>37.86){const[sx,sy]=shakeAt(t,37.86);ctx.save();ctx.translate(sx,sy);T("STILL DOESN'T",230,130,RED,{stroke:10,strokeCol:'#FFFFFF'});T('TOUCH THE BOTTOM!',350,110,RED,{stroke:10,strokeCol:'#FFFFFF'});ctx.restore();}
  else if(t>=35.08){T('FLIP MT EVEREST',600,120,WHITE,{stroke:10,strokeCol:INK});T('UPSIDE DOWN...',730,110,WHITE,{stroke:10,strokeCol:INK});}
  else{T('HOW DEEP IS',230,140,INK);T('THE PACIFIC?',360,150,RED);}}
// ---- short B: 2,000 drawbridges (sources 92.17–118.27) ----
function B(t){
  if(t<104.5){paper();ctx.fillStyle=SEA;ctx.fillRect(0,300,W,1250);ctx.drawImage(GRAIN,0,0);
    const n=Math.round(lerp(6,24,P(t,93.57,98.2)));for(let i=0;i<n;i++){const x=150+(i%4)*260,y=430+Math.floor(i/4)*190;island(x,y,0.9);}
    T('2,000 ISLANDS?!',200,150,RED,{stroke:8,strokeCol:'#FFFFFF'});if(t>98.19&&t<104.5){rrect(90,1250,900,200,34,{w:9,fill:'#111',seed:1400});T(fmt(counter(t,98.19,99.3,0,2000))+' ISLANDS',1350,120,GOLD);}return;}
  if(t<114.0){paper();ctx.fillStyle=SEA;ctx.fillRect(0,300,W,1250);line(0,920,W,920,{w:16,col:t>110.3?RED:INK,seed:1501});
    for(let i=0;i<4;i++){const y=lerp(1450,380,((t-104.5)*0.13+i*0.25)%1);const yy=t>110.3&&y<1010?1010:y;ship(170+i*250,yy,0.55);}
    T('THOUSANDS OF SHIPS',170,110,INK);if(t>110.32)T('8,000 KM WALL!',1240,130,RED,{stroke:10,strokeCol:'#FFFFFF'});return;}
  paper();ctx.fillStyle=SEA;ctx.fillRect(0,880,W,670);line(0,880,W,880,{w:LW,col:'#3b6a96',seed:1500});const op=0.5+0.5*Math.sin((t-114)*2.4);drawbridge(CX,840,1.9,op);ship(CX,960,0.9);
  T('EVERY ISLAND NEEDS',170,110,INK);T('A DRAWBRIDGE',300,120,RED);if(t>116.45){rrect(60,1250,960,200,34,{w:9,fill:'#111',seed:1510});T(fmt(counter(t,116.45,117.6,0,2000))+' DRAWBRIDGES',1350,104,GOLD);}}
// ---- short C: the bill (sources 120.0–134.4, then 148.4–151.7) ----
function C(t){paper();
  if(t<127.9){ctx.fillStyle=SEA;ctx.fillRect(0,900,W,650);line(0,900,W,900,{w:LW,col:'#3b6a96',seed:1600});
    line(60,840,1020,840,{w:16,seed:1601});for(let x=110;x<1020;x+=150)rrect(x-14,840,28,160,4,{w:5,fill:CONC,seed:1602+x});
    T('LONGEST SEA BRIDGE',170,110,INK);if(t>122.48)T('$300 MILLION',330,140,RED);if(t>122.6)T('PER KM',470,120,RED);if(t>125.55)T('(SHALLOW WATER!)',1250,90,INK);return;}
  if(t<134.4){const v=t<129.9?counter(t,127.91,129.8,0,2.7e12):2.7e12;if(t>=129.91)T('THE BILL?!',200,150,RED,{stroke:8,strokeCol:'#FFFFFF'});billV(CX,360,1.55,[['8,000 KM','× $340 M'],['TOTAL',(v/1e12).toFixed(1)+' T',RED]]);
    if(t>129.91){glow(CX,1150,420,'rgba(46,139,61,0.35)',1);stamp('$2.7',CX,1100,190,MONEY,t,129.91,{stroke:8,strokeCol:'#0b3d14'});stamp('TRILLION',CX,1270,150,MONEY,t,130.0,{stroke:8,strokeCol:'#0b3d14'});}
    if(t>132.29)T('DEEP OCEAN? FAR MORE.',1450,84,RED);return;}
  T('NOT THE PHYSICS.',820,120,INK);line(60,820,1020,820,{w:12,col:RED,seed:1700,k:P(t,149.9,150.3)});if(t>150.89){glow(CX,1110,480,'rgba(255,68,68,0.35)',1);stamp('THE BILL.',CX,1110,220,RED,t,150.89,{stroke:10,strokeCol:'#7a0000'});}}
const SCN={A,B,C};
function ctaBanner(u,q){const k=eOut(clamp(u/0.25));ctx.save();ctx.translate(0,-(1-k)*400);glow(CX,430,560,'rgba(255,68,68,0.25)',1);rrect(40,290,1000,300,34,{w:10,col:RED,fill:'#FFFFFF',seed:9100});
  const ps=1+0.05*Math.sin(u*10);ctx.save();ctx.translate(CX,440);ctx.scale(ps,ps);txt(q,0,-60,104,{col:INK,maxW:900});txt('COMMENT BELOW! 👇'.replace(' 👇',''),0,65,100,{col:RED,maxW:900});ctx.restore();ctx.restore();}
const REEL_LEN=CFG.segs.reduce((a,[s,e])=>a+(e-s),0);
function render(tr){BOIL=Math.floor(tr/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  let acc=0,t=CFG.segs[CFG.segs.length-1][1]-0.001;const cuts=[];for(const[s,e]of CFG.segs){cuts.push(acc);if(tr<acc+(e-s)){t=s+(tr-acc);break;}acc+=e-s;}
  for(const c of cuts){if(tr>=c&&tr<c+0.1&&c>0)ctx.filter=`blur(${(8*(1-(tr-c)/0.1)).toFixed(1)}px)`;}
  ctx.save();if(tr<0.5){const k=eOut(clamp(tr/0.5));ctx.translate(nz(tr*60,1)*16*(1-k),nz(tr*55,2)*16*(1-k));ctx.translate(CX,CY);ctx.scale(lerp(1.1,1,k),lerp(1.1,1,k));ctx.translate(-CX,-CY);}
  SCN[CFG.id](t);ctx.restore();ctx.filter='none';
  if(tr>REEL_LEN-2.2){ctx.setTransform(1,0,0,1,0,0);ctaBanner(tr-(REEL_LEN-2.2),CFG.cta);}}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
