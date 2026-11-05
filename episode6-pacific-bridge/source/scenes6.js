// ===== Ink & Atoms — Episode 6: What If We Built a Bridge Across the Pacific? (16:9, timed to align.json) =====
const SEA='#CFE3F2',DEEP='#7FA8CC',ABYSS='#2E4A6B',LAND='#E8DDB5',CONC='#C9C9D2',MONEY='#2E8B3D';
function T(s,x,y,size,col=INK,o={}){return txt(s,x,y,size,{col,maxW:1760,...o});}
function Z(z,fx=CX,fy=CY){ctx.translate(fx,fy);ctx.scale(z,z);ctx.translate(-fx,-fy);}
function shakeAt(t,t0,amp=14,d=0.35){if(t<t0||t>t0+d)return[0,0];const k=amp*(1-(t-t0)/d);return[nz(t*60,3)*k,nz(t*57,4)*k];}
function counter(t,t0,t1,v0,v1){return Math.round(lerp(v0,v1,eOut(P(t,t0,t1))));}
function fmt(n){return n.toLocaleString('en-US');}
// ---------- map ----------
const TOK=[330,470],SFO=[1620,520];
function route(u){const c=[975,250];const a=(1-u)*(1-u),b=2*u*(1-u),d=u*u;return[a*TOK[0]+b*c[0]+d*SFO[0],a*TOK[1]+b*c[1]+d*SFO[1]];}
function mapPacific(t,{label=true}={}){paper();ctx.fillStyle=SEA;ctx.fillRect(0,120,W,880);ctx.drawImage(GRAIN,0,0);
  // Asia + Japan (left), North America (right)
  poly([[0,120],[170,120],[220,260],[160,420],[210,600],[150,800],[200,1000],[0,1000]],{w:LW,fill:LAND,close:true,seed:801,amp:4});
  poly([[300,330],[350,380],[360,470],[320,560],[285,600],[300,520],[310,440],[280,380]],{w:LW,fill:LAND,close:true,seed:802,amp:3});
  poly([[1920,120],[1760,120],[1700,300],[1650,460],[1680,600],[1720,780],[1700,1000],[1920,1000]],{w:LW,fill:LAND,close:true,seed:803,amp:4});
  line(0,120,W,120,{w:LW,seed:804,amp:2});line(0,1000,W,1000,{w:LW,seed:805,amp:2});
  if(label){txt('JAPAN',300,650,54,{});txt('CALIFORNIA',1790,660,54,{});}
  ctx.fillStyle=RED;for(const[x,y]of[TOK,SFO]){ctx.beginPath();ctx.arc(x,y,14,0,TAU);ctx.fill();}
  txt('TOKYO',TOK[0],TOK[1]-50,48,{col:RED});txt('SAN FRANCISCO',SFO[0]-40,SFO[1]-50,48,{col:RED});}
function routeLine(k,{col=INK,w=10,dash=null}={}){const n=60;ctx.save();if(dash)ctx.setLineDash(dash);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();
  for(let i=0;i<=n*k;i++){const[x,y]=route(i/n);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.restore();}
function car(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rrect(-70,-40,140,50,14,{w:6,fill:RED,seed:810});rrect(-40,-75,80,40,12,{w:6,fill:'#fff',seed:811});
  ell(-12,-56,13,13,{w:4,fill:'#F6F4F8',seed:812});for(const wx of[-42,42]){ell(wx,12,18,18,{w:6,fill:INK,seed:813+wx});}ctx.restore();}
function plane(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-120,0],[110,-10],[130,0],[110,10],[-120,0]],{w:7,fill:'#fff',close:true,seed:820});
  poly([[-10,0],[-60,-90],[-30,-90],[40,0]],{w:7,fill:'#fff',close:true,seed:821});poly([[-10,0],[-60,90],[-30,90],[40,0]],{w:7,fill:'#fff',close:true,seed:822});poly([[-110,0],[-130,-40],[-100,-40],[-80,0]],{w:6,fill:'#fff',close:true,seed:823});ctx.restore();}
// ---------- ocean cross-section: surface y0, depth px per km ----------
function section(t,y0,pxkm,{trench=true,floor=4}={}){paper();ctx.fillStyle='#E9F2F8';ctx.fillRect(0,0,W,y0);
  const fy=y0+floor*pxkm,ty=y0+11*pxkm;const g=ctx.createLinearGradient(0,y0,0,Math.max(fy,ty));g.addColorStop(0,DEEP);g.addColorStop(1,ABYSS);
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,y0);ctx.lineTo(W,y0);ctx.lineTo(W,fy);
  if(trench){ctx.lineTo(1300,fy);ctx.lineTo(1180,ty);ctx.lineTo(1060,ty);ctx.lineTo(940,fy);}ctx.lineTo(0,fy);ctx.closePath();ctx.fill();
  const sb=trench?[[0,fy],[940,fy],[1060,ty],[1180,ty],[1300,fy],[W,fy]]:[[0,fy],[W,fy]];poly(sb,{w:LW+2,col:INK,seed:830,amp:3});
  ctx.fillStyle='#6b5a44';ctx.beginPath();ctx.moveTo(0,fy);for(const[x,y]of sb)ctx.lineTo(x,y);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  for(let i=0;i<14;i++){const x=i*150+((t*40)%150);line(x,y0,x+60,y0-10,{w:4,col:'#5d86b0',seed:840+i,amp:2});}
  line(0,y0,W,y0,{w:LW,col:'#3b6a96',seed:845,amp:2});}
function ruler(x,y0,pxkm,km){line(x,y0,x,y0+km*pxkm,{w:5,col:WHITE,seed:850});for(let k=0;k<=km;k++){line(x-14,y0+k*pxkm,x+14,y0+k*pxkm,{w:4,col:WHITE,seed:851+k});if(k&&(k%2===0||k===km))txt(k+' KM',x+30,y0+k*pxkm,40,{col:WHITE,align:'left'});}}
function everest(x,y,s,flip=false,sx=null){ctx.save();ctx.translate(x,y);if(flip)ctx.scale(1,-1);ctx.scale(sx??s,s);poly([[-120,0],[-20,-200],[10,-170],[30,-205],[130,0]],{w:6,fill:'#9a8e80',close:true,seed:860});
  poly([[-20,-200],[-45,-150],[-5,-160],[10,-170],[30,-205],[48,-150]],{w:5,fill:'#fff',seed:861});ctx.restore();}
function pillarBridge(x0,x1,y,depth){line(x0,y,x1,y,{w:14,col:INK,seed:870});for(let x=x0+60;x<x1;x+=180){rrect(x-14,y,28,depth,4,{w:5,fill:CONC,seed:871+x});}}
function towerBar(x,base,h,label,col,w=110){rrect(x-w/2,base-h,w,h,8,{w:6,fill:col,seed:880+x});txt(label,x,base-h-45,68,{col:INK});}
// ---------- floating bridge ----------
function pontoonBridge(x0,x1,y,{chains=200,col=INK}={}){for(let x=x0;x<x1;x+=110){rrect(x,y,90,34,8,{w:5,col,fill:CONC,seed:900+x});}line(x0,y-6,x1,y-6,{w:12,col,seed:901});
  for(let x=x0+45;x<x1;x+=220){ctx.save();ctx.setLineDash([10,8]);ctx.strokeStyle=col;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y+34);ctx.lineTo(x-60,y+34+chains);ctx.moveTo(x,y+34);ctx.lineTo(x+60,y+34+chains);ctx.stroke();ctx.restore();}}
function ship(x,y,s,{fpso=false}={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-160,0],[160,0],[130,50],[-140,50]],{w:7,fill:fpso?'#d9534f':'#555',close:true,seed:910});
  if(fpso){rrect(-60,-60,120,60,6,{w:6,fill:'#ddd',seed:911});line(70,-10,70,-110,{w:6,seed:912});line(70,-110,40,-70,{w:5,seed:913});}
  else{for(let i=0;i<5;i++)for(let j=0;j<2;j++){const cs=['#d2382c','#2e6fb0','#e0a800','#2e8b3d'];ctx.fillStyle=cs[(i+j)%4];ctx.fillRect(-130+i*50,-40-j*30,46,28);}rrect(110,-80,40,80,4,{w:5,fill:'#fff',seed:914});}
  ctx.restore();}
// ---------- storm ----------
function building(x,base,floors,fw=120,fh=40){rrect(x-fw/2,base-floors*fh,fw,floors*fh,4,{w:6,fill:'#e8e4da',seed:920});for(let f=0;f<floors;f++)for(const dx of[-30,30]){ctx.fillStyle='#8aa';ctx.fillRect(x+dx-12,base-f*fh-fh+10,24,18);}}
function bigWave(x,base,h,t){const g=ctx.createLinearGradient(0,base-h,0,base);g.addColorStop(0,'#5d8fc0');g.addColorStop(1,'#1d3d63');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-420,base);
  ctx.quadraticCurveTo(x-200,base-h*0.5,x,base-h);ctx.quadraticCurveTo(x+120,base-h*1.05,x+180,base-h*0.75);ctx.quadraticCurveTo(x+90,base-h*0.78,x+60,base-h*0.6);ctx.quadraticCurveTo(x+200,base-h*0.3,x+320,base);ctx.closePath();ctx.fill();
  ctx.strokeStyle=INK;ctx.lineWidth=6;ctx.stroke();for(let i=0;i<8;i++){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+60+i*16+Math.sin(t*6+i)*6,base-h*0.78-Math.cos(i)*10,10,0,TAU);ctx.fill();}}
function typhoon(x,y,r,t){ctx.save();ctx.translate(x,y);ctx.rotate(-t*2);for(let k=0;k<3;k++){ctx.rotate(TAU/3);ctx.strokeStyle='#e8ecf6';ctx.lineWidth=26;ctx.beginPath();for(let a=0;a<4.2;a+=0.1){const rr=r*(a/4.2);const px=Math.cos(a)*rr,py=Math.sin(a)*rr;a?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();}ctx.restore();ell(x,y,r*0.12,r*0.12,{w:5,col:'#cfd6ea',fill:SPACE,seed:930});}
// ---------- islands / ships / money ----------
function island(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,70,26,{w:6,fill:LAND,seed:940});for(const[dx,h]of[[-35,50],[-5,80],[25,60]]){rrect(dx-12,-h,24,h,3,{w:4,fill:'#ddd',seed:941+dx});}ctx.restore();}
function drawbridge(x,y,s,open){ctx.save();ctx.translate(x,y);ctx.scale(s,s);line(-260,0,-90,0,{w:12,seed:950});line(90,0,260,0,{w:12,seed:951});
  const a=open*1.1;for(const sd of[-1,1]){ctx.save();ctx.translate(sd*90,0);ctx.rotate(sd*-a);line(0,0,-sd*90,0,{w:12,col:RED,seed:952+sd});ctx.restore();}
  rrect(-110,0,40,60,4,{w:5,fill:CONC,seed:953});rrect(70,0,40,60,4,{w:5,fill:CONC,seed:954});ctx.restore();}
function bill(x,y,s,lines,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const h=120+lines.length*80;poly([[-260,0],[260,0],[260,h],[230,h+20],[200,h],[170,h+20],[140,h],[110,h+20],[80,h],[50,h+20],[20,h],[-10,h+20],[-40,h],[-70,h+20],[-100,h],[-130,h+20],[-160,h],[-190,h+20],[-220,h],[-260,h+20]],{w:6,fill:'#fff',close:true,seed:960});
  txt('THE BILL',0,60,80,{col:RED});lines.forEach(([a,b,col],i)=>{txt(a,-230,150+i*80,52,{align:'left'});txt(b,230,150+i*80,52,{align:'right',col:col||INK});});ctx.restore();}
function gauge(x,y,r,v,max){ell(x,y,r,r,{w:8,fill:'#fff',seed:970});for(let i=0;i<=8;i++){const a=Math.PI*0.75+i/8*Math.PI*1.5;line(x+Math.cos(a)*r*0.78,y+Math.sin(a)*r*0.78,x+Math.cos(a)*r*0.92,y+Math.sin(a)*r*0.92,{w:5,seed:971+i});}
  const a=Math.PI*0.75+clamp(v/max)*Math.PI*1.5;line(x,y,x+Math.cos(a)*r*0.8,y+Math.sin(a)*r*0.8,{w:10,col:RED,seed:980});ell(x,y,14,14,{w:5,fill:INK,seed:981});}
function check(x,y,k){if(k<=0)return;poly([[x-30,y],[x-8,y+26],[x+38,y-30]],{w:14,col:MONEY,seed:990,k});}
// ================= SCENES =================
// S1 hook 0–7.2 (rapid cuts)
function S1(t){
  if(t<0.7){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);glow(CX,CY,600,'rgba(255,68,68,0.45)',1);const sh=t<0.3?18:4;ctx.save();ctx.translate(nz(t*80,1)*sh,nz(t*70,2)*sh);T('×3,000',CX,CY,300,RED);ctx.restore();
    if(t<0.08){ctx.fillStyle=`rgba(255,255,255,${1-t/0.08})`;ctx.fillRect(0,0,W,H);}return;}
  const z=t<2.2?lerp(1.1,1,eOut(P(t,0.7,1.1))):1;ctx.save();Z(z);mapPacific(t);
  if(t<2.2){car(TOK[0]+40,TOK[1]+60,1.1,t);ctx.restore();T('JAPAN → CALIFORNIA',CX,60,90,INK);return;}
  routeLine(P(t,2.2,3.3),{col:INK,w:16});const [ex,ey]=route(P(t,2.2,3.3));glow(ex,ey,60,'rgba(255,215,0,0.9)',t<3.4?1:0);
  ctx.restore();
  if(t<4.1){T('A BRIDGE',CX,60,96,INK);return;}
  // compare: tiny Seattle bridge vs Pacific
  rrect(90,800,900,170,24,{w:7,fill:'#fff',seed:1001});line(140,885,170,885,{w:16,col:RED,seed:1002});txt('= LONGEST FLOATING BRIDGE (2.35 KM)',195,885,52,{align:'left'});
  stamp('3,000× LONGER',CX,60,110,RED,t,4.1,{stroke:6,strokeCol:'#7a0000'});}
// S2 setup 7.2–24
function S2(t){ctx.save();Z(lerp(1,1.04,P(t,7.2,24)));mapPacific(t);routeLine(1,{w:16});
  const u=P(t,12.74,23.9);const[cx,cy]=route(u);car(cx,cy-40,0.9,t);ctx.restore();
  if(t<12.7){T("LET'S BUILD IT ANYWAY",CX,60,96,INK);if(t>10.68)stamp('8,000 KM',CX,830,130,RED,t,10.68);return;}
  if(t<15.85){T('YOU. IN YOUR CAR.',CX,60,96,INK);if(t>14.21){rrect(CX-230,770,460,150,26,{w:7,fill:'#111',seed:1010});txt('80 HOURS',CX,845,100,{col:GOLD});}return;}
  if(t<17.7){T('NO FLIGHTS. EVER.',CX,60,96,INK);plane(CX,830,0.9);bigX(CX,830,120,t,16.11);return;}
  if(t<21.8){T('BEFORE THIS VIDEO IS OVER...',CX,60,90,INK);stamp('WHAT BREAKS?',CX,830,130,RED,t,19.3);return;}
  T('SPOILER:',CX,60,96,INK);stamp("IT'S NOT THE OCEAN",CX,830,120,RED,t,22.74);}
// S3 depth 24–51.1
function S3(t){
  if(t<29.5){paper();ctx.fillStyle=SEA;ctx.fillRect(0,640,W,440);line(0,640,W,640,{w:LW,col:'#3b6a96',seed:1100});ctx.fillStyle='#6b5a44';ctx.fillRect(0,920,W,160);line(0,920,W,920,{w:LW,seed:1101});
    pillarBridge(80,1840,560,360);T('STEP 1: HOLD UP THE ROAD',CX,90,96,INK);if(t>25.95)T('BRIDGES STAND ON PILLARS',CX,220,80,INK);if(t>27.88)stamp('HOW DEEP?',CX,380,120,RED,t,27.88);return;}
  if(t<39.6){const y0=200,pk=72;section(t,y0,pk);ruler(140,y0,pk,11);
    const ex=1120,ey=lerp(y0-560,y0,eOut(P(t,36.94,38.0)));if(t>35.08){const yy=t<36.94?lerp(-700,y0-560,eOut(P(t,35.08,35.8))):ey;everest(ex,yy,3.1,true,1.25);txt('MT EVEREST',ex+430,Math.max(300,yy+250),60,{col:WHITE,stroke:8,strokeCol:INK});txt('(UPSIDE DOWN)',ex+430,Math.max(300,yy+250)+70,48,{col:WHITE,stroke:6,strokeCol:INK});}
    T('AVG DEPTH: 4 KM',560,y0+4*pk-60,70,WHITE);if(t>32.41)T('TRENCH: 11 KM',1120,y0+11*pk+60,70,GOLD);
    if(t>37.86){const[sx,sy]=shakeAt(t,37.86);stamp("STILL DOESN'T TOUCH!",560+sx,120+sy,96,RED,t,37.86);}else T(t>35.08?'FLIP MT EVEREST...':'THE PACIFIC',560,120,96,INK);return;}
  // tower comparison (to scale-ish: 4,000 m = 760 px)
  paper();const base=980,pxm=t<47.51?lerp(2.4,1.2,eInOut(P(t,43.95,44.35))):lerp(1.2,0.19,eInOut(P(t,47.51,48.6)));line(0,base,W,base,{w:LW,seed:1110});
  towerBar(360,base,Math.max(14,65*pxm),'65 M',CONC);txt('GREECE',360,base+55,56,{});
  if(t>44.34){towerBar(820,base,535*pxm,'535 M',CONC);txt('OIL PLATFORM',820,base+55,56,{});}
  if(t>47.51){const h=4000*pxm;ctx.save();ctx.setLineDash([22,14]);rrect(1360,base-h,140,h,8,{w:8,col:RED,seed:1111});ctx.restore();if(h>700){txt('4,000 M NEEDED',1430,base-h-45,68,{col:RED});stamp('×8',1640,500,140,RED,t,48.47);}}
  if(t>49.87){for(let i=0;i<10;i++){const k=pop(t,49.87+i*0.07,0.2);if(k>0){ctx.save();ctx.translate(1560+i*34,base);ctx.scale(k,k);ctx.save();ctx.setLineDash([8,6]);rrect(-8,-120,16,120,3,{w:4,col:RED,seed:1120+i});ctx.restore();ctx.restore();}}stamp('THOUSANDS!',1640,820,90,RED,t,49.87);}
  T(t<44.3?'RECORD BRIDGE PILLARS':t<47.5?'DEEPEST FIXED PLATFORM':'WE NEED TOWERS',CX,90,96,INK);}
// S4 floating 51.1–76.4
function S4(t){
  if(t<54.2){paper();pillarBridge(260,1660,520,380);bigX(CX,700,260,t,51.74);stamp('FORGET PILLARS',CX,160,120,RED,t,51.74);if(t>52.85)stamp('FLOAT IT!',CX,950,120,MONEY,t,52.85);return;}
  if(t<63.0){paper();ctx.fillStyle=SEA;ctx.fillRect(0,520,W,420);line(0,520,W,520,{w:LW,col:'#3b6a96',seed:1200});ctx.fillStyle='#6b5a44';ctx.fillRect(0,940,W,140);line(0,940,W,940,{w:LW,seed:1201});
    pontoonBridge(120,1800,500,{chains:400});T('FLOATING BRIDGES ARE REAL',CX,90,96,INK);if(t>55.78)stamp('SEATTLE: 2.35 KM',CX,250,100,RED,t,55.78);if(t>59.5)T('CONCRETE PONTOONS + CHAINS',CX,380,70,INK);return;}
  if(t<70.2){section(t,330,150,{trench:false});const k=eOut(P(t,63.0,64.2));
    ctx.strokeStyle=INK;ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(CX-(CX)*k,322);ctx.lineTo(CX+(CX)*k,322);ctx.stroke();
    for(let x=CX-(CX)*k;x<CX+(CX)*k;x+=48){ctx.fillStyle=CONC;ctx.fillRect(x,322,36,16);}
    const ck=P(t,66.58,69.6);ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=INK;ctx.lineWidth=4;for(let x=120;x<W;x+=160){ctx.beginPath();ctx.moveTo(x,338);ctx.lineTo(x,338+(930-338)*ck);ctx.stroke();}ctx.restore();
    if(t>63.84)stamp('×3,500 LONGER',CX,170,130,RED,t,63.84);if(t>68.72){ruler(80,330,150,4);T('CHAINED 4 KM DOWN',CX,1010,80,WHITE);}return;}
  section(t,250,170,{trench:false});ruler(140,250,170,4);ship(820,250,1.1,{fpso:true});
  ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(780,300);ctx.lineTo(650,250+2.9*170);ctx.moveTo(860,300);ctx.lineTo(990,250+2.9*170);ctx.stroke();ctx.restore();
  line(560,250+2.9*170,1080,250+2.9*170,{w:8,col:GOLD,seed:1210});txt('RECORD: 2.9 KM',1360,250+2.9*170,72,{col:GOLD,stroke:8,strokeCol:INK});
  line(560,250+4*170-4,1080,250+4*170-4,{w:10,col:RED,seed:1211});txt('WE NEED: 4 KM',1360,250+4*170-50,72,{col:'#FFFFFF',stroke:10,strokeCol:RED});
  T('DEEPEST GIANT FLOATING PLATFORM',CX,120,84,INK);}
// S5 storms 76.4–92.1
function S5(t){
  if(t<81.2){space(t);const[sx,sy]=shakeAt(t,76.43,10,0.4);ctx.save();ctx.translate(sx,sy);glow(CX,600,460,'rgba(160,190,255,0.35)',1);typhoon(CX,600,400,t);ctx.restore();stamp('THE OCEAN FIGHTS BACK',CX,110,104,RED,t,76.43);if(t>79.44)T('TYPHOONS',CX,980,90,WHITE);return;}
  paper();ctx.fillStyle='#d9dde3';ctx.fillRect(0,0,W,H);ctx.drawImage(GRAIN,0,0);const base=900;ctx.fillStyle=DEEP;ctx.fillRect(0,base,W,H-base);line(0,base,W,base,{w:LW,col:'#3b6a96',seed:1300});
  const wh=32*16*eOut(P(t,81.28,82.4));building(1500,base,10,150,51);txt('10 STORIES',1500,base-560,52,{});
  const bend=Math.sin(t*3)*30*P(t,85.5,86.5);ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(0,base-30);ctx.quadraticCurveTo(700,base-30-bend*3,1250,base-30);ctx.stroke();ctx.restore();if(t<91.38)car(260,base-62,0.8,t);
  if(t<91.38){bigWave(760,base,wh,t);}
  if(t>81.98&&t<91.38)T('32 M',760,base-wh-60,90,RED);
  if(t>89.63&&t<91.38){glow(640,base-40,140,'rgba(255,68,68,0.8)',0.6+0.4*Math.sin(t*20));poly([[620,base-60],[650,base-30],[630,base-10],[660,base+10]],{w:8,col:RED,seed:1310});}
  if(t>91.38){const[sx,sy]=shakeAt(t,91.38,22,0.4);ctx.save();ctx.translate(sx,sy);ctx.fillStyle=DEEP;ctx.fillRect(560,base-60,200,80);line(380,base-30,600,base+60,{w:14,seed:1311});line(720,base+70,960,base-30,{w:14,seed:1312});ctx.restore();stamp('SNAP!',760,300,200,RED,t,91.38);}
  T(t<84.2?'ONE TYPHOON WAVE':t<86.9?'A 10-STORY BUILDING':t<89.6?'EVERY DAY. FOR DECADES.':'ONE WEAK SPOT...',CX,90,96,INK);}
// S6 islands 92.1–105
function S6(t){
  if(t<100.0){ctx.save();Z(1);mapPacific(t,{label:false});routeLine(1,{w:6,col:'#777',dash:[14,12]});
    const n=Math.round(lerp(0,40,P(t,93.57,98.0)));for(let i=1;i<=n;i++){const[x,y]=route(i/41);island(x,y,0.35);}ctx.restore();
    stamp("FINE. LET'S CHEAT.",CX,60,96,RED,t,92.17);if(t>93.57&&t<98.19)T('AN ISLAND EVERY 4 KM',CX,880,80,INK);
    if(t>98.19){rrect(CX-300,750,600,180,30,{w:8,fill:'#111',seed:1400});txt(fmt(counter(t,98.19,99.3,0,2000))+' ISLANDS',CX,840,96,{col:GOLD});}return;}
  paper();ctx.fillStyle=DEEP;ctx.fillRect(0,0,W,H);ctx.drawImage(GRAIN,0,0);for(let i=0;i<20;i++)line(i*100+((t*30)%100),300+(i%4)*180,i*100+60+((t*30)%100),290+(i%4)*180,{w:4,col:'#a9c6e0',seed:1410+i});
  ctx.save();ctx.translate(CX,620);const z=lerp(1.2,1.5,P(t,100,105));ctx.scale(z,z);island(0,0,3.0);ctx.restore();
  T('A TINY OFFSHORE CITY',CX,110,100,WHITE);if(t>102.21)T('NO LAND IN SIGHT',CX,990,80,GOLD);}
// S7 ships 105–118.3
function S7(t){
  if(t<114.0){mapPacific(t,{label:false});routeLine(1,{w:16,col:t>110.3?RED:INK});
    for(let i=0;i<6;i++){const x=480+i*200;const y=lerp(960,140,((t-105)*0.12+i*0.17)%1);const yy=t>110.3?Math.max(y,route((x-330)/1290)[1]+90):y;ship(x,yy,0.35);}
    T(t<106.6?'BUT WAIT. SHIPS.':'THOUSANDS OF CARGO SHIPS',CX,60,96,INK);if(t>110.32)stamp('AN 8,000 KM WALL',CX,880,110,RED,t,110.32);return;}
  paper();ctx.fillStyle=SEA;ctx.fillRect(0,640,W,440);line(0,640,W,640,{w:LW,col:'#3b6a96',seed:1500});
  const op=0.5+0.5*Math.sin((t-114)*2.2);drawbridge(CX,600,2.2,op);ship(CX,700,1.0);
  T('EVERY ISLAND NEEDS A DRAWBRIDGE',CX,90,90,INK);if(t>116.45){rrect(CX-380,860,760,170,30,{w:8,fill:'#111',seed:1510});txt(fmt(counter(t,116.45,117.6,0,2000))+' DRAWBRIDGES',CX,945,88,{col:GOLD});}}
// S8 the bill 118.3–134.4
function S8(t){paper();
  if(t<120.0){bill(CX,280,2.0,[],t);stamp('AND THEN...',CX,140,96,INK,t,118.29);return;}
  if(t<127.9){ctx.fillStyle=SEA;ctx.fillRect(0,620,W,460);line(0,620,W,620,{w:LW,col:'#3b6a96',seed:1600});pillarBridge(140,1780,600,120);
    T('LONGEST SEA BRIDGE (CHINA)',CX,90,90,INK);if(t>122.48)stamp('~$300 MILLION / KM',CX,280,120,RED,t,122.48);if(t>125.55)T('IN SHALLOW WATER',CX,470,80,INK);return;}
  const v=t<129.9?counter(t,127.91,129.8,0,2.7e12):2.7e12;bill(560,200,1.55,[['8,000 KM','× $340 M'],['TOTAL',(v/1e12).toFixed(1)+' TRILLION',RED]],t);
  if(t>129.91){glow(1350,520,380,'rgba(46,139,61,0.35)',1);stamp('$2.7 TRILLION',1350,520,130,MONEY,t,129.91,{stroke:6,strokeCol:'#0b3d14'});}
  if(t>132.29){T('DEEP OCEAN?',1350,780,90,INK);stamp('FAR MORE ↑',1350,900,100,RED,t,133.12);}}
// S9 twist 134.4–151.7
function S9(t){
  if(t<142.2){paper();stamp("HERE'S THE TWIST",CX,110,110,INK,t,134.46);
    const rows=[['THE DEPTH','FLOAT IT',136.02],['THE STORMS','ENGINEER IT',138.03],['THE SHIPS','DRAWBRIDGES',140.65]];
    rows.forEach(([a,b,t0],i)=>{if(t<t0)return;const y=330+i*220;T(a,560,y,96,INK,{align:'center'});T(b,1260,y,90,MONEY,{align:'center'});check(1640,y,P(t,t0+0.3,t0+0.6));});return;}
  if(t<149.7){paper();const n=Math.min(40,Math.round(lerp(0,40,P(t,142.6,144.4))));for(let i=0;i<n;i++){island(160+(i%10)*180,330+Math.floor(i/10)*150,0.55);}
    T('2,000 FLOATING CITIES',CX,90,96,INK);if(t>145.12)T('DECADES OF TYPHOONS. ZERO FAILURES.',CX,960,74,RED);if(t>148.42){ctx.fillStyle='rgba(246,244,248,0.6)';ctx.fillRect(0,0,W,H);stamp("THAT'S WHAT BREAKS",CX,560,130,RED,t,148.42);}return;}
  paper();T('NOT THE PHYSICS.',CX,330,120,INK);line(CX-560,330,CX+560,330,{w:12,col:RED,seed:1700,k:P(t,149.9,150.3)});
  if(t>150.89){glow(CX,640,520,'rgba(255,68,68,0.35)',1);stamp('THE BILL.',CX,640,240,RED,t,150.89,{stroke:10,strokeCol:'#7a0000'});}}
// S10 tunnel 151.7–165
function S10(t){
  if(t<158.2){section(t,220,90,{trench:false});const y=220+4*90+70;ctx.fillStyle='#3d3226';rrect(0,y-40,W,80,40,{w:6,col:INK,fill:'#2a2219',seed:1800});
    T('JUST DIG A TUNNEL?',CX,90,96,INK);if(t>154.16)stamp("IT'S WORSE.",820,420,130,RED,t,154.16,{stroke:10,strokeCol:'#FFFFFF'});if(t>155.1){gauge(1600,420,170,counter(t,155.1,156.5,0,400),450);txt(fmt(counter(t,155.1,156.5,0,400))+' ATM',1600,650,70,{col:WHITE});}return;}
  paper();T('LONGEST UNDERSEA TUNNEL TODAY',CX,90,90,INK);const L=1600,x0=160;
  rrect(x0,300,Math.max(8,L*38/8000),90,10,{w:6,fill:MONEY,seed:1810});txt('38 KM',x0+80,450,70,{col:MONEY,align:'left'});
  if(t>159.28){const k=eOut(P(t,159.28,160.6));rrect(x0,560,L*k,90,10,{w:6,fill:RED,seed:1811});txt('8,000 KM',x0+L*k-10,720,70,{col:RED,align:'right'});}
  if(t>163.45)stamp('×210',1500,330,120,RED,t,163.45);}
// S11 CTA 165–end
function S11(t){paper();
  if(t<170.2){T('BRIDGE OR TUNNEL?',CX,110,120,INK);rrect(260,280,1400,560,40,{w:8,fill:'#fff',seed:1900});ell(360,370,48,48,{w:6,fill:'#ddd',seed:1901});txt('@YOU',440,370,56,{align:'left',col:'#666'});
    const ps=1+0.06*Math.sin(t*9);for(const[x,s,c]of[[620,'BRIDGE',RED],[1300,'TUNNEL',INK]]){ctx.save();ctx.translate(x,600);ctx.scale(ps,ps);rrect(-260,-90,520,180,40,{w:8,col:c,fill:'#fff',seed:1902+x});txt(s,0,0,110,{col:c});ctx.restore();}
    if(t>168.37)T('+ WHAT SHOULD WE BUILD NEXT?',CX,960,74,INK);return;}
  if(t<173.0){likeBtn(1250,560,1.7,t>171.45);stick(560,1000,2.0,t,{pose:'point',mood:'happy'});T('IF THIS BLEW YOUR MIND',CX,150,110,INK);if(t>171.45)stamp('HIT LIKE!',1250,860,120,RED,t,171.45);return;}
  space(t);T('NEXT:',CX,330,90,GOLD);T('WHAT SHOULD WE BUILD',CX,480,120,WHITE);T('ACROSS THE ATLANTIC?',CX,630,120,RED);}
function render(t){BOIL=Math.floor(t/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  const cuts=[0.7,2.2,4.1,7.2,24.0,29.5,39.6,51.1,54.2,63.0,70.2,76.4,81.2,92.1,100.0,105.0,114.0,118.3,120.0,127.9,134.4,142.2,149.7,151.7,158.2,165.0,170.2,173.0];
  let bl=0;for(const c of cuts){if(t>=c&&t<c+0.1)bl=1-(t-c)/0.1;}if(bl>0)ctx.filter=`blur(${(8*bl).toFixed(1)}px)`;
  if(t<7.2)S1(t);else if(t<24)S2(t);else if(t<51.1)S3(t);else if(t<76.4)S4(t);else if(t<92.1)S5(t);else if(t<105)S6(t);else if(t<118.3)S7(t);else if(t<134.4)S8(t);else if(t<151.7)S9(t);else if(t<165)S10(t);else S11(t);
  ctx.filter='none';}
window.render=render;
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
