// ===== Ink & Atoms — Pacific Bridge FINAL (owner spec v2). Timeline = the locked voiceover (align.json). 1920x1080 =====
const BEIGE='#F5E6C8',OCL='#B8D4E8',OCD='#1A2A4A',RA='#FF2A2A',YEL='#FFE600',GRN='#2ECC71';
function paper(){ctx.fillStyle=BEIGE;ctx.fillRect(0,0,W,H);ctx.drawImage(GRAIN,0,0);}
// text: titles >=60px, body >=40px, inside the 100 px safe margin; coloured text gets a black outline
function TX(s,x,y,size,col=INK,o={}){const out=col!==INK;if(o.glow){glow(x,y,Math.max(220,size*2.2),'rgba(255,140,0,0.45)',1);}
  return txt(s,x,y,size,{col,maxW:1720,stroke:out?Math.max(6,size*0.11):0,strokeCol:'#000000',...o});}
function ST(s,x,y,size,col,t,t0,o={}){if(t<t0)return;const k=pop(t,t0,0.22);ctx.save();ctx.translate(x,y);ctx.scale(k,k);TX(s,0,0,size,col,o);ctx.restore();}
function yelBox(s,x,y,size=90){ctx.save();ctx.font=`${size}px "PH"`;const w=ctx.measureText(s).width;ctx.restore();rrect(x-w/2-40,y-size*0.75,w+80,size*1.5,24,{w:7,col:'#000',fill:'#000',seed:3000});txt(s,x,y,size,{col:YEL});}
// ---------- new glyphs ----------
function rainPOV(t,{push=1,gps=0}={}){ctx.save();Z(push,CX,520);
  const g=ctx.createLinearGradient(0,0,0,560);g.addColorStop(0,'#1b2433');g.addColorStop(1,'#3a4a5e');ctx.fillStyle=g;ctx.fillRect(0,0,W,560);
  const s=ctx.createLinearGradient(0,560,0,H);s.addColorStop(0,'#24384f');s.addColorStop(1,'#0e1724');ctx.fillStyle=s;ctx.fillRect(0,560,W,H-560);
  for(let i=0;i<30;i++){const y=560+i*18+((t*40)%18);line(0,y,W,y+3,{w:2,col:'rgba(160,190,220,0.25)',seed:3100+i,amp:2});}
  ctx.fillStyle='#2c2c33';ctx.beginPath();ctx.moveTo(660,H);ctx.lineTo(1260,H);ctx.lineTo(968,560);ctx.lineTo(952,560);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#FFE600';ctx.lineWidth=6;ctx.setLineDash([30,26]);ctx.lineDashOffset=-t*300;ctx.beginPath();ctx.moveTo(960,H);ctx.lineTo(960,560);ctx.stroke();ctx.setLineDash([]);
  ctx.restore();
  // rain on the glass
  const R=rng(Math.floor(t*12));for(let i=0;i<120;i++){const x=R()*W,y=R()*H,l=10+R()*26;ctx.strokeStyle='rgba(220,235,255,0.55)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-4,y+l);ctx.stroke();}
  const R2=rng(77);for(let i=0;i<70;i++){const x=R2()*W,y=R2()*780,r=3+R2()*7;ctx.fillStyle='rgba(230,240,255,0.35)';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
  // wipers: one sweep every 0.5 s
  const ph=(t%1.0)/1.0,a=-Math.PI*0.95+Math.PI*0.8*(ph<0.5?eInOut(ph*2):eInOut(2-ph*2));
  for(const bx of[620,1260]){ctx.save();ctx.translate(bx,860);ctx.rotate(a);rrect(0,-8,560,16,6,{w:4,col:'#000',fill:'#222',seed:3200+bx});ctx.restore();}
  // windshield frame + dashboard + steering wheel
  ctx.fillStyle='#111';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(220,0);ctx.lineTo(60,820);ctx.lineTo(0,820);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(W,0);ctx.lineTo(W-220,0);ctx.lineTo(W-60,820);ctx.lineTo(W,820);ctx.closePath();ctx.fill();ctx.fillRect(0,0,W,40);
  ctx.fillStyle='#1a1a1f';ctx.beginPath();ctx.moveTo(0,840);ctx.quadraticCurveTo(CX,760,W,840);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  ell(560,1010,230,230,{w:22,col:'#000',seed:3300,amp:1.5});ell(560,1010,60,60,{w:14,col:'#000',fill:'#222',seed:3301});
  if(gps>0){ctx.save();ctx.globalAlpha=gps;rrect(1230,110,560,220,26,{w:7,col:'#000',fill:'#123A6B',seed:3400});txt('CONTINUE STRAIGHT FOR',1510,170,46,{col:WHITE});txt('7,800 KM',1510,265,110,{col:WHITE,stroke:6,strokeCol:'#000'});
    poly([[1290,230],[1310,190],[1330,230]],{w:5,col:WHITE,fill:WHITE,seed:3401});ctx.restore();}}
function earthSpace(x,y,r,t,k){glow(x,y,r*1.35,'rgba(120,170,255,0.35)',1);ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();ctx.fillStyle='#2a6fb3';ctx.fillRect(x-r,y-r,2*r,2*r);
  const off=Math.sin(t*0.3)*20;ctx.fillStyle='#8CC06A';ctx.beginPath();ctx.ellipse(x-r*0.78+off,y-r*0.1,r*0.32,r*0.75,0.2,0,TAU);ctx.fill();ctx.beginPath();ctx.ellipse(x+r*0.82+off,y-r*0.05,r*0.3,r*0.8,-0.2,0,TAU);ctx.fill();
  ctx.fillStyle='#e8f2ff';ctx.beginPath();ctx.ellipse(x+off,y-r*0.92,r*0.6,r*0.14,0,0,TAU);ctx.fill();ctx.restore();ell(x,y,r,r,{w:8,col:'#000',seed:3500,amp:2});
  if(k>0){const a=[x-r*0.5+off,y-r*0.15],b=[x+r*0.55+off,y-r*0.08],c=[x,y-r*0.55];ctx.strokeStyle=RA;ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();const n=40;
    for(let i=0;i<=n*k;i++){const u=i/n,px=(1-u)*(1-u)*a[0]+2*u*(1-u)*c[0]+u*u*b[0],py=(1-u)*(1-u)*a[1]+2*u*(1-u)*c[1]+u*u*b[1];i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();
    ctx.fillStyle=YEL;for(const p of[a,b]){ctx.beginPath();ctx.arc(p[0],p[1],10,0,TAU);ctx.fill();}}}
function ringOfFire(t,a){ctx.save();ctx.globalAlpha=a;ctx.shadowColor='rgba(255,90,0,0.9)';ctx.shadowBlur=30;ctx.strokeStyle=RA;ctx.lineWidth=16;ctx.lineCap='round';ctx.lineJoin='round';
  ctx.beginPath();ctx.moveTo(240,980);ctx.lineTo(280,700);ctx.lineTo(360,420);ctx.quadraticCurveTo(520,170,960,160);ctx.quadraticCurveTo(1480,170,1640,380);ctx.lineTo(1700,640);ctx.lineTo(1720,980);ctx.stroke();ctx.restore();}
function arrowH(x,y,dir,len,col){line(x,y,x+dir*len,y,{w:14,col,seed:3600+x});poly([[x+dir*len,y-26],[x+dir*(len+40),y],[x+dir*len,y+26]],{w:8,col,fill:col,close:true,seed:3601+x});}
function accordionRoute(sq,snapped,t){const n=80;ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=16;ctx.lineCap='round';
  const pts=[];for(let i=0;i<=n;i++){const u=i/n;const[x,y]=route(u);const off=Math.sin(u*TAU*14)*42*sq;pts.push([x,y+off]);}
  if(!snapped){ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}
  else{const g=Math.min(1,(t-snapped)*3);ctx.beginPath();pts.slice(0,38).forEach(([x,y],i)=>i?ctx.lineTo(x,y+(i>30?(i-30)*g*14:0)):ctx.moveTo(x,y));ctx.stroke();
    ctx.beginPath();pts.slice(43).forEach(([x,y],i)=>i?ctx.lineTo(x,y+(i<8?(8-i)*g*14:0)):ctx.moveTo(x,y+8*g*14));ctx.stroke();const[mx,my]=route(0.51);glow(mx,my+60,200,'rgba(255,60,0,0.8)',1-Math.min(1,(t-snapped)/1.5));}
  ctx.restore();}
function islandCity(x,y,s,t,labels){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,320,90,{w:8,fill:'#E8DDB5',seed:3700});
  rrect(-250,-150,90,150,6,{w:6,fill:'#ddd',seed:3701});rrect(-150,-230,110,230,6,{w:6,fill:'#e9e3d5',seed:3702});
  rrect(-20,-120,150,120,6,{w:6,fill:'#fff',seed:3703});ctx.fillStyle=RA;ctx.fillRect(40,-100,30,80);ctx.fillRect(15,-75,80,30);
  rrect(170,-90,60,90,6,{w:6,fill:'#ffd166',seed:3704});ell(260,-10,60,22,{w:6,fill:'#555',seed:3705});txt('H',260,-12,40,{col:'#fff'});ctx.restore();
  if(labels>0)TX('FUEL',x+200*s*0.0+x*0-((x)-(x+200*s)),y-100*s-120,52,YEL,{a:clamp(labels)});}
function rocket(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[0,-160],[40,-80],[40,60],[-40,60],[-40,-80]],{w:7,fill:'#fff',close:true,seed:3800});ell(0,-60,16,16,{w:5,fill:OCL,seed:3801});
  poly([[-40,20],[-80,80],[-40,60]],{w:6,fill:RA,close:true,seed:3802});poly([[40,20],[80,80],[40,60]],{w:6,fill:RA,close:true,seed:3803});glow(0,90,90,'rgba(255,140,0,0.9)',0.7+0.3*Math.sin(t*30));ctx.restore();}
function mars(x,y,r){glow(x,y,r*1.5,'rgba(255,90,40,0.35)',1);ell(x,y,r,r,{w:8,col:'#000',fill:'#C1440E',seed:3900});ctx.fillStyle='rgba(120,30,10,0.4)';for(const[dx,dy,rr]of[[-0.3,-0.2,0.2],[0.25,0.25,0.15],[0.1,-0.4,0.1]]){ctx.beginPath();ctx.arc(x+dx*r,y+dy*r,rr*r,0,TAU);ctx.fill();}}
function tunnelScene(t,y0){section(t,y0,70,{trench:false});const ty=y0+4*70+120;rrect(-20,ty-55,W+40,110,55,{w:8,col:'#000',fill:'#15151a',seed:4000});return ty;}
// ---------- colour grading (warm → medium blue → dark grey-blue → near black) + vignette ----------
function grade(t){const st=[[0,'#FFF0CC',0.0],[36.3,'#FFF0CC',0.0],[39.3,'#D6E4F5',0.0],[106.9,'#D6E4F5',0.0],[109.9,'#C6D0E0',0.10],[185.7,'#C6D0E0',0.10],[188.7,'#B9BFCC',0.20],[999,'#B9BFCC',0.20]];
  let a=st[0],b=st[0];for(let i=0;i<st.length-1;i++){if(t>=st[i][0]&&t<st[i+1][0]){a=st[i];b=st[i+1];break;}}const k=(t-a[0])/Math.max(0.001,b[0]-a[0]);
  const hx=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];const A=hx(a[1]),B=hx(b[1]);const c=A.map((v,i)=>Math.round(lerp(v,B[i],k)));
  ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle=`rgb(${c[0]},${c[1]},${c[2]})`;ctx.fillRect(0,0,W,H);ctx.restore();
  const v=lerp(a[2],b[2],k);if(v>0){const g=ctx.createRadialGradient(CX,CY,H*0.45,CX,CY,H*1.05);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${v*1.8})`);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}}
// ================= SCENES (times = words in the locked voiceover) =================
function S1(t){const sh=[nz(t*20,1)*4,nz(t*22,2)*3];ctx.save();ctx.translate(sh[0],sh[1]);rainPOV(t,{gps:clamp((t-3.24)/0.3)});ctx.restore();}
function S2(t){rainPOV(t,{push:lerp(1,1.15,P(t,8.25,11.45))});
  ST('NO LAND',CX,300,140,RA,t,8.29,{glow:1});ST('NO GAS',CX,470,140,RA,t,9.33,{glow:1});ST('NO WAY BACK',CX,640,140,RA,t,10.70,{glow:1});
  const f=P(t,11.45,11.95);if(f>0){ctx.fillStyle=`rgba(0,0,0,${f})`;ctx.fillRect(0,0,W,H);}}
function S3(t){if(t<12.1){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);return;}
  const z=t<14.1?lerp(5,1,eInOut(P(t,12.1,14.1))):1;space(t);ctx.save();Z(z,CX,470);earthSpace(CX,600,380,t,P(t,13.7,15.5));ctx.restore();const cs=lerp(1.6,0,eInOut(P(t,12.1,13.4)));if(cs>0.02)car(CX,470,cs,t);
  if(t>15.03)ST('PHYSICALLY POSSIBLE...',CX,150,80,WHITE,t,15.03);
  if(t>16.91){const[sx,sy]=shakeAt(t,16.91,22,0.5);ctx.save();ctx.translate(sx,sy);ST('8,000 KM',CX,520,240,RA,t,16.91,{glow:1});ctx.restore();ST('THE DUMBEST PROJECT EVER?',CX,900,80,WHITE,t,17.33);}}
function S4(t){mapPacific(t);routeLine(P(t,19.9,21.5),{w:16});const u=P(t,22.0,28.6);const[cx,cy]=route(u);car(cx,cy-40,0.9,t);
  TX('TOKYO → SAN FRANCISCO',CX,200,80,INK);if(t>21.79)ST('8,000 KM',CX,860,110,RA,t,21.79);
  if(t>25.41&&t<27.1)yelBox('80 HOURS',CX,660,100);if(t>27.1){plane(CX,640,0.9);bigX(CX,640,120,t,27.33);ST('NO FLIGHTS. EVER.',CX,860,100,RA,t,28.21);}}
function S5(t){mapPacific(t);routeLine(1,{w:16});const[cx,cy]=route(0.5);car(cx,cy-40,1.0,t);
  if(t>32.52){const ps=1+0.06*Math.sin((t-32.52)*7);ctx.save();ctx.translate(CX,560);ctx.scale(ps,ps);TX('WHAT BREAKS?',0,0,170,RA,{glow:1});ctx.restore();}
  else TX('BEFORE THIS VIDEO IS OVER...',CX,200,80,INK);if(t>33.97)ST("SPOILER: IT'S NOT THE OCEAN",CX,820,90,WHITE,t,33.97);}
function S6(t){paper();ctx.fillStyle=OCL;ctx.fillRect(0,640,W,320);line(0,640,W,640,{w:LW,col:'#3b6a96',seed:4100});ctx.fillStyle='#7a5c3c';ctx.fillRect(0,900,W,180);line(0,900,W,900,{w:LW,seed:4101});
  pillarBridge(120,1800,560,340);TX('STEP 1: HOLD UP THE ROAD',CX,170,100,INK);if(t>38.56)ST('BRIDGES STAND ON PILLARS',CX,330,80,INK,t,38.56);if(t>41.49)ST('HOW DEEP?',CX,470,130,RA,t,41.49,{glow:1});}
function S7(t){const y0=230,pk=66,rk=P(t,43.0,44.0);section(t,y0,pk);if(rk>0){ctx.save();ctx.globalAlpha=rk;ruler(150,y0,pk,11);ctx.restore();}
  TX('THE PACIFIC',CX,130,110,INK);if(t>43.82)ST('AVG DEPTH: 4 KM',600,y0+4*pk-55,80,WHITE,t,43.82);if(t>46.1){glow(1120,y0+9*pk,260,'rgba(255,230,0,0.35)',1);ST('TRENCH: 11 KM',1120,y0+11*pk+50,80,YEL,t,46.1);}}
function S8(t){const y0=230,pk=66;section(t,y0,pk);ruler(150,y0,pk,11);
  const rot=Math.PI*eInOut(P(t,49.06,50.06)),dy=lerp(-40,y0+0,eOut(P(t,51.08,52.1)));ctx.save();ctx.translate(1120,t<51.08?60:dy);ctx.rotate(rot);everest(0,0,3.1,false,1.15);ctx.restore();
  if(t>50.06)TX('MT EVEREST (UPSIDE DOWN)',1500,330,56,WHITE);
  if(t>52.1){const gy=y0+8.85*pk*0.98,ty=y0+11*pk;ctx.save();ctx.setLineDash([14,10]);ctx.strokeStyle=YEL;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(1120,gy+40);ctx.lineTo(1120,ty-6);ctx.stroke();ctx.restore();TX('GAP!',1240,(gy+ty)/2+20,70,YEL);}
  if(t>52.17){const[sx,sy]=shakeAt(t,52.17,16,0.4);ctx.save();ctx.translate(sx,sy);ST("STILL DOESN'T TOUCH!",CX,130,120,RA,t,52.17,{glow:1});ctx.restore();}else TX('FLIP MT EVEREST...',CX,130,110,INK);}
function S9(t){paper();const base=930,pxm=t<62.64?lerp(2.6,1.15,eInOut(P(t,57.9,58.4))):lerp(1.15,0.15,eInOut(P(t,62.64,64.6)));line(100,base,1820,base,{w:LW,seed:1110});
  towerBar(380,base,Math.max(14,65*pxm),'65 M',CONC,150);TX('GREECE',380,base+60,56,INK);
  if(t>58.3){towerBar(820,base,535*pxm,'535 M',CONC,150);TX('OIL PLATFORM',820,base+60,56,INK);}
  if(t>62.64){const h=4000*pxm;ctx.save();ctx.setLineDash([24,14]);rrect(1340,base-h,190,h,8,{w:9,col:RA,seed:1111});ctx.restore();if(h>640)TX('4,000 M NEEDED',1435,base-h-50,64,RA);if(t>65.34)ST('×8',1660,520,170,RA,t,65.34,{glow:1});}
  if(t>67.03){for(let i=0;i<14;i++){const k=pop(t,67.03+i*0.04,0.18);if(k>0){ctx.save();ctx.translate(1200+i*44,base);ctx.scale(k,k);ctx.save();ctx.setLineDash([8,6]);rrect(-10,-130,20,130,3,{w:4,col:RA,seed:1120+i});ctx.restore();ctx.restore();}}ST('THOUSANDS!',1500,780,100,RA,t,67.03);}
  TX(t<58.3?'RECORD BRIDGE PILLARS':t<62.6?'DEEPEST FIXED PLATFORM':'WE NEED TOWERS',CX,150,100,INK);}
function S10(t){const quake=t>76.48?[nz(t*60,5)*(t<78.2?10:18),nz(t*57,6)*(t<78.2?10:18)]:[0,0];ctx.save();ctx.translate(quake[0],quake[1]);mapPacific(t);
  const sq=t<76.48?0:t<78.21?eOut(P(t,76.48,77.4)):1;accordionRoute(sq,t>78.21?78.21:0,t);if(t>71.97)ringOfFire(t,clamp((t-71.97)/0.4)*(0.75+0.25*Math.sin(t*6)));
  if(t>73.83){const m=Math.sin(t*4)*10;arrowH(380+m,820,1,120,RA);arrowH(1560-m,820,-1,120,RA);TX('PLATES MOVE EVERY YEAR',CX,940,64,INK);}
  ctx.restore();
  if(t<70.6)ST('AND WAIT...',CX,600,130,INK,t,68.38);else TX('RING OF FIRE',CX,560,130,RA,{glow:1});
  if(t>77.0&&t<78.21)ST('SQUEEZED',CX,720,110,RA,t,77.0);if(t>78.21)ST('SNAPPED!',CX,720,150,RA,t,78.21,{glow:1});}
function S11A(t){if(t<82.26){paper();ctx.fillStyle=OCL;ctx.fillRect(0,640,W,320);ctx.fillStyle='#7a5c3c';ctx.fillRect(0,900,W,180);pillarBridge(220,1700,560,340);bigX(CX,700,280,t,79.95);
    ST('FORGET PILLARS',CX,180,130,RA,t,79.95,{glow:1});if(t>81.21)ST('FLOAT IT!',CX,360,140,GRN,t,81.21);return;}
  paper();ctx.fillStyle=OCL;ctx.fillRect(0,520,W,420);line(0,520,W,520,{w:LW,col:'#3b6a96',seed:4200});ctx.fillStyle='#7a5c3c';ctx.fillRect(0,940,W,140);line(0,940,W,940,{w:LW,seed:4201});
  pontoonBridge(140,1780,500,{chains:400});TX('FLOATING BRIDGES ARE REAL',CX,160,100,INK);if(t>85.07)ST('SEATTLE: 2.35 KM',CX,330,110,RA,t,85.07,{glow:1});}
function S11B(t){if(t<91.7){paper();ctx.fillStyle=OCL;ctx.fillRect(0,520,W,420);line(0,520,W,520,{w:LW,col:'#3b6a96',seed:4200});ctx.fillStyle='#7a5c3c';ctx.fillRect(0,940,W,140);
    pontoonBridge(140,1780,500,{chains:400});TX('SEATTLE: 2.35 KM',CX,160,100,RA);ST('CONCRETE PONTOONS + CHAINS',CX,330,90,INK,t,88.54);return;}
  section(t,330,150,{trench:false});const k=eOut(P(t,91.7,93.8));ctx.strokeStyle=INK;ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(CX-(CX-100)*k-40,322);ctx.lineTo(CX+(CX-100)*k+40,322);ctx.stroke();
  for(let x=CX-(CX-100)*k-40;x<CX+(CX-100)*k+40;x+=48){ctx.fillStyle=CONC;ctx.fillRect(x,322,36,16);}
  const ck=P(t,94.98,97.6);ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=INK;ctx.lineWidth=4;for(let x=200;x<1800;x+=160){ctx.beginPath();ctx.moveTo(x,338);ctx.lineTo(x,338+(930-338)*ck);ctx.stroke();}ctx.restore();
  if(t>92.47){const s=lerp(0.6,1,eOut(P(t,92.47,94.2)));ctx.save();ctx.translate(CX,190);ctx.scale(s,s);TX('×3,400 LONGER',0,0,150,RA,{glow:1});ctx.restore();}
  if(t>94.98){ctx.save();ctx.globalAlpha=ck;ruler(140,330,150,4);ctx.restore();}if(t>96.84)ST('CHAINED 4 KM DOWN',CX,1010-40,80,WHITE,t,96.84);}
function S12(t){section(t,250,170,{trench:false});ruler(140,250,170,4);ship(820,250,1.1,{fpso:true});
  ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(780,300);ctx.lineTo(650,250+2.9*170);ctx.moveTo(860,300);ctx.lineTo(990,250+2.9*170);ctx.stroke();ctx.restore();
  TX('DEEPEST GIANT FLOATING PLATFORM',CX,130,90,INK);
  if(t>103.54){line(560,250+2.9*170,1080,250+2.9*170,{w:8,col:YEL,seed:1210});TX('RECORD: 2.9 KM',1390,250+2.9*170,72,YEL);}
  if(t>105.74){line(560,250+4*170-6,1080,250+4*170-6,{w:10,col:RA,seed:1211});TX('WE NEED: 4 KM',1390,250+4*170-60,72,RA,{glow:1});}}
function S13(t){
  if(t<113.5){paper();ctx.fillStyle=OCL;ctx.fillRect(0,600,W,480);ctx.drawImage(GRAIN,0,0);line(0,600,W,600,{w:LW,col:'#3b6a96',seed:4300});line(0,560,W,560,{w:16,seed:4301});
    car(800,515,1.4,t);TX('NOW, THE 80 HOURS',CX,150,110,INK);
    if(t>108.88){rrect(1200,700,520,240,30,{w:8,col:'#000',fill:'#111',seed:4302});const f=1-P(t,109.0,111.0);rrect(1260,800,400,60,10,{w:5,col:WHITE,seed:4303});ctx.fillStyle=f>0.25?YEL:RA;ctx.fillRect(1268,808,384*f,44);txt('FUEL',1460,750,52,{col:WHITE});txt('600 KM MAX',1460,900,52,{col:YEL});}
    if(t>111.92)ST("WHERE'S THE GAS STATION?",CX,320,90,RA,t,111.92);return;}
  if(t<120.3){paper();ctx.fillStyle=OCD;ctx.fillRect(0,0,W,H);line(0,560,W,560,{w:16,col:'#555',seed:4301});car(820,515,1.4,t);
    for(let i=0;i<5;i++){const ph=(t*0.8+i*0.2)%1;ctx.fillStyle=`rgba(170,170,170,${0.6*(1-ph)})`;ctx.beginPath();ctx.arc(880+ph*60,450-ph*220,30+ph*50,0,TAU);ctx.fill();}
    ST('KM 4,000',CX,170,110,YEL,t,113.79);if(t>116.62)ST('NO LAND.',500,760,90,WHITE,t,116.62);if(t>117.67)ST('NO HOSPITAL.',CX,880,90,WHITE,t,117.67);if(t>118.88)ST('NO ONE CAN HEAR YOU.',1380,760,80,RA,t,118.88);return;}
  if(t<124.7){mapPacific(t,{label:false});routeLine(1,{w:8,col:'#666',dash:[14,12]});const n=Math.round(lerp(0,40,P(t,121.0,123.0)));for(let i=1;i<=n;i++){const[x,y]=route(i/41);island(x,y,0.35);}
    TX('AN ISLAND EVERY 4 KM',CX,880,90,INK);if(t>121.25)yelBox(fmt(counter(t,121.25,123.0,0,2000))+' ISLANDS',CX,700,90);if(t>123.36)ST('NOT JUST PILLARS.',CX,180,90,RA,t,123.36);return;}
  paper();ctx.fillStyle=OCL;ctx.fillRect(0,560,W,520);ctx.drawImage(GRAIN,0,0);islandCity(CX,700,1.6,t,0);
  TX('SURVIVAL CITIES',CX,150,120,RA,{glow:1});if(t>126.47)ST('FUEL',CX+380,420,64,YEL,t,126.47);if(t>127.11)ST('HOSPITAL',CX+90,330,64,WHITE,t,127.11);if(t>127.95)ST('HELIPAD',CX+560,540,64,WHITE,t,127.95);
  if(t>129.43)ST('FLOATING IN THE MIDDLE OF NOWHERE',CX,960,72,INK,t,129.43);}
function S14(t){
  if(t<141.1){mapPacific(t,{label:false});routeLine(1,{w:16,col:t>138.2?RA:INK});
    for(let i=0;i<6;i++){const x=480+i*200;const y=lerp(960,140,((t-131)*0.11+i*0.17)%1);const yy=t>138.2?Math.max(y,route((x-330)/1290)[1]+90):y;ship(x,yy,0.35);}
    TX(t<133.1?'BUT WAIT. SHIPS.':'THOUSANDS OF CARGO SHIPS',CX,180,100,INK);if(t>138.2)ST('AN 8,000 KM WALL',CX,860,120,RA,t,138.2,{glow:1});return;}
  paper();ctx.fillStyle=OCL;ctx.fillRect(0,640,W,440);line(0,640,W,640,{w:LW,col:'#3b6a96',seed:1500});const op=0.5+0.5*Math.sin((t-141)*2.2);drawbridge(CX,600,2.2,op);ship(CX,700,1.0);
  TX('EVERY ISLAND NEEDS A DRAWBRIDGE',CX,170,90,INK);if(t>143.63)yelBox(fmt(counter(t,143.63,144.6,0,2000))+' DRAWBRIDGES',CX,940,80);}
function S15(t){
  if(t<149.5){space(t);ctx.fillStyle='rgba(26,42,74,0.6)';ctx.fillRect(0,0,W,H);glow(CX,600,460,'rgba(160,190,255,0.3)',1);typhoon(CX,600,400,t);
    ST('THE OCEAN FIGHTS BACK',CX,150,120,RA,t,145.49,{glow:1});if(t>148.43)ST('TYPHOONS',CX,980-40,100,WHITE,t,148.43);return;}
  const[sx,sy]=t>154.07&&t<155.07?[nz(t*70,7)*34*(1-(t-154.07)),nz(t*66,8)*26*(1-(t-154.07))]:[0,0];ctx.save();ctx.translate(sx,sy);
  ctx.fillStyle='#4b5566';ctx.fillRect(0,0,W,H);ctx.drawImage(GRAIN,0,0);const base=900;ctx.fillStyle=OCD;ctx.fillRect(0,base,W,H-base);line(0,base,W,base,{w:LW,col:'#000',seed:1300});
  const wh=32*15*eOut(P(t,149.6,150.8)),wx=t<154.07?760:lerp(760,1050,eOut(P(t,154.07,154.6)));if(t>152.96){building(1500,base,10,150,48);TX('10 STORIES',1500,base-540,60,WHITE);}
  ctx.strokeStyle=INK;ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(0,base-30);ctx.lineTo(1300,base-30);ctx.stroke();car(300,base-62,0.8,t);bigWave(wx,base,wh,t);
  if(t>151.52)TX('32 M',wx,base-wh-60,110,RA,{glow:1});ctx.restore();
  TX(t<152.86?'ONE TYPHOON WAVE':t<155.68?'A 10-STORY BUILDING':'EVERY DAY. FOR DECADES.',CX,130,100,WHITE);if(t>154.07&&t<155.0){ctx.fillStyle=`rgba(255,255,255,${0.5*(1-(t-154.07))})`;ctx.fillRect(0,0,W,H);}}
function S16(t){const snap=t>169.52;const[sx,sy]=snap&&t<170.6?[nz(t*70,9)*30,nz(t*66,10)*22]:[0,0];ctx.save();ctx.translate(sx,sy);
  ctx.fillStyle='#2b3140';ctx.fillRect(0,0,W,H);ctx.drawImage(GRAIN,0,0);ctx.fillStyle=OCD;ctx.fillRect(0,760,W,320);
  for(let i=0;i<3;i++){const ph=((t*1.6)+i/3)%1;ctx.strokeStyle=`rgba(184,212,232,${1-ph})`;ctx.lineWidth=8;ctx.beginPath();ctx.arc(CX+(i-1)*420,760,60+ph*120,Math.PI,TAU);ctx.stroke();}
  const by=520;if(!snap){rrect(100,by-90,1720,180,10,{w:9,col:'#000',fill:'#8a919c',seed:4400});}
  else{const g=Math.min(1,(t-169.52)/1.0);ctx.save();ctx.translate(-g*40,g*g*260);ctx.rotate(g*0.12);rrect(100,by-90,840,180,10,{w:9,col:'#000',fill:'#8a919c',seed:4400});ctx.restore();
    ctx.save();ctx.translate(g*40,g*g*300);ctx.rotate(-g*0.15);rrect(980,by-90,840,180,10,{w:9,col:'#000',fill:'#8a919c',seed:4401});ctx.restore();}
  const rust=P(t,165.18,168.5);if(!snap&&rust>0){const R=rng(9);for(let i=0;i<26*rust;i++){ctx.fillStyle='rgba(150,70,20,0.75)';ctx.beginPath();ctx.ellipse(R()*1700+110,by-60+R()*120,20+R()*40,10+R()*18,0,0,TAU);ctx.fill();}}
  const ck=P(t,167.53,169.5);if(!snap&&ck>0){const pts=[[CX,by-90],[CX+20,by-50],[CX-15,by-10],[CX+25,by+30],[CX-5,by+90]];glow(CX,by,180*ck,'rgba(255,60,0,0.7)',1);poly(pts,{w:10,col:RA,seed:4402,k:ck});}
  ctx.restore();
  if(t<160.3)TX("IT'S NOT ONE WAVE...",CX,150,100,WHITE);else if(!snap)TX('METAL FATIGUE',CX,150,130,RA,{glow:1});
  if(t>161.56&&!snap)yelBox(fmt(counter(t,161.56,163.0,0,100))+' MILLION HITS',CX,880,80);if(t>163.65&&!snap)ST('50 YEARS',350,320,80,WHITE,t,163.65);if(t>165.18&&!snap)ST('SALT EATS IRON',1560,320,70,RA,t,165.18);
  if(snap){const[a,b]=shakeAt(t,169.52,30,0.6);ctx.save();ctx.translate(a,b);ST('SNAP!',CX,330,260,RA,t,169.52,{glow:1});ctx.restore();if(t>170.1)TX('100 MILLION HITS',CX,880,80,YEL);}}
function S17(t){paper();
  if(t<172.2){ST('AND THEN...',CX,380,130,INK,t,170.67);if(t>171.56)ST('THE BILL',CX,600,190,RA,t,171.56,{glow:1});return;}
  if(t<181.4){ctx.fillStyle=OCL;ctx.fillRect(0,620,W,460);line(0,620,W,620,{w:LW,col:'#3b6a96',seed:1600});pillarBridge(140,1780,600,120);TX('LONGEST SEA BRIDGE (CHINA)',CX,150,100,INK);
    if(t>175.23)ST('~$340 MILLION / KM',CX,330,120,RA,t,175.23,{glow:1});if(t>179.25)ST('IN SHALLOW WATER',CX,490,90,INK,t,179.25);return;}
  const dy=lerp(-700,150,eOut(P(t,181.47,182.1)));const v=t<183.6?0:counter(t,183.6,184.4,0,27)/10;bill(560,dy,1.35,[['8,000 KM','× $340 M'],['TOTAL',v.toFixed(1)+' TRILLION',RA]],t);
  if(t>184.46){glow(1350,520,400,'rgba(46,204,113,0.4)',1);ST('$2.7 TRILLION',1350,520,140,GRN,t,184.46);}}
function S18(t){
  if(t<190.2){paper();bill(560,150,1.35,[['8,000 KM','× $340 M'],['TOTAL','2.7 TRILLION',RA]],t);TX('SHALLOW WATER PRICE',1350,330,80,INK);if(t>188.2){ST('DEEP OCEAN?',1350,560,100,INK,t,188.2);ST('FAR MORE ↑',1350,700,120,RA,t,189.19,{glow:1});}return;}
  space(t);if(t<194.9){const n=Math.min(50,Math.round(lerp(0,50,P(t,192.33,194.06))));for(let i=0;i<n;i++){const x=260+(i%10)*155,y=360+Math.floor(i/10)*130;ctx.save();ctx.translate(x,y);ctx.scale(0.18,0.18);iss(0,0,1,t);ctx.restore();}
    TX('$2.7 TRILLION =',CX,160,100,WHITE);if(t>193.71)ST('ISS × 50',CX,1000-60,110,YEL,t,193.71);return;}
  mars(1350,560,240);rocket(lerp(420,1050,eInOut(P(t,195.1,197.4))),lerp(820,520,eInOut(P(t,195.1,197.4))),1.3,t);TX('MARS MISSION',CX,160,110,RA,{glow:1});if(t>197.49)ST('...AND COLONIZE IT',CX,960,90,WHITE,t,197.49);}
function S19(t){
  if(t<207.4){paper();ST("HERE'S THE TWIST",CX,150,120,INK,t,198.72);const rows=[['THE DEPTH','FLOAT IT',200.13],['THE STORMS','ENGINEER IT',202.44],['THE SHIPS','DRAWBRIDGES',205.27]];
    rows.forEach(([a,b,t0],i)=>{if(t<t0)return;const y=360+i*210;TX(a,600,y,100,INK);TX(b,1240,y,90,GRN);check(1620,y,P(t,t0+0.3,t0+0.6));});return;}
  if(t<214.4){paper();const n=Math.min(48,Math.round(lerp(0,48,P(t,207.6,209.5))));for(let i=0;i<n;i++)island(220+(i%12)*134,330+Math.floor(i/12)*130,0.48);
    TX('2,000 FLOATING CITIES',CX,160,110,INK);if(t>209.92)ST('DECADES OF TYPHOONS. ZERO FAILURES.',CX,920,80,RA,t,209.92);if(t>213.15){ctx.fillStyle='rgba(245,230,200,0.75)';ctx.fillRect(0,0,W,H);ST("THAT'S WHAT BREAKS",CX,560,140,RA,t,213.15,{glow:1});}return;}
  paper();TX('NOT THE PHYSICS.',CX,330,120,INK);line(CX-540,330,CX+540,330,{w:14,col:RA,seed:1700,k:P(t,214.8,215.3)});if(t>215.71)ST('THE BILL.',CX,640,260,RA,t,215.71,{glow:1});}
function S20(t){
  if(t<221.9){const ty=tunnelScene(t,200);TX('JUST DIG A TUNNEL?',CX,110,110,INK);if(t>218.85)ST("IT'S WORSE.",640,420,130,RA,t,218.85,{glow:1});
    if(t>219.93){gauge(1560,440,170,counter(t,219.93,221.4,0,400),450);TX(fmt(counter(t,219.93,221.4,0,400))+' ATM',1560,680,80,WHITE);}return;}
  if(t<227.6){paper();rrect(260,360,1400,320,20,{w:10,col:'#000',fill:'#2a2a33',seed:4500});for(let i=0;i<6;i++){const k=pop(t,222.6+i*0.25,0.2);if(k>0){ctx.save();ctx.translate(420+i*215,330);ctx.scale(k*0.7,k*0.7);car(0,0,1,t);ctx.restore();}}
    for(let i=0;i<7;i++)line(310+i*215,360,310+i*215,380,{w:5,col:'#ddd',seed:4510+i});TX('EVERY CM² = A CAR PRESSING DOWN',CX,170,80,INK);if(t>226.53)ST('ALL THE TIME.',CX,880,110,RA,t,226.53,{glow:1});return;}
  const ty=tunnelScene(t,200);const k=P(t,229.6,231.2);if(t>227.95){glow(CX,ty-50,120,'rgba(255,60,0,0.6)',0.6+0.4*Math.sin(t*20));poly([[CX-4,ty-58],[CX+14,ty-40],[CX-10,ty-24],[CX+8,ty-8]],{w:6,col:RA,seed:4600});}
  if(k>0){ctx.save();ctx.beginPath();ctx.rect(0,ty-55,W,110);ctx.clip();const g=ctx.createLinearGradient(CX,ty,CX+900*k,ty);g.addColorStop(0,'rgba(220,240,255,1)');g.addColorStop(0.3,'rgba(90,170,255,1)');g.addColorStop(1,'rgba(90,170,255,0.4)');
    ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(CX,ty-50);ctx.lineTo(CX+900*k,ty-55);ctx.lineTo(CX+900*k,ty+55);ctx.lineTo(CX,ty+40);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(CX,ty-50);ctx.lineTo(CX-900*k,ty-55);ctx.lineTo(CX-900*k,ty+55);ctx.lineTo(CX,ty+40);ctx.closePath();ctx.fill();ctx.restore();}
  if(t<229.6)ST('ONE CRACK. THE SIZE OF A HAIR.',CX,110,90,INK,t,227.69);else{const[sx,sy]=shakeAt(t,230.77,20,0.6);ctx.save();ctx.translate(sx,sy);ST('WATER CANNON',CX,110,130,RA,t,230.4,{glow:1});ctx.restore();}
  if(t>231.75)ST('EVERYONE INSIDE. IN SECONDS.',CX,940,80,WHITE,t,231.75);}
function S21(t){paper();TX('LONGEST UNDERSEA TUNNEL TODAY',CX,150,100,INK);const L=1620,x0=150;
  rrect(x0,330,Math.max(10,L*38/8000),100,10,{w:6,fill:GRN,seed:1810});TX('38 KM',x0+90,480,80,GRN,{align:'left'});
  if(t>238.21){const k=eOut(P(t,238.21,239.6));rrect(x0,600,L*k,100,10,{w:6,fill:RA,seed:1811});TX('8,000 KM',x0+L*k-10,770,80,RA,{align:'right'});}
  if(t>239.82)ST('×210',1500,360,150,RA,t,239.82,{glow:1});}
function S22(t){
  if(t<243.9){paper();TX('BRIDGE OR TUNNEL?',CX,160,130,INK);const ps=1+0.05*Math.sin(t*9);for(const[x,s,c,f]of[[620,'BRIDGE',RA,'#fff'],[1300,'TUNNEL','#fff','#111']]){ctx.save();ctx.translate(x,560);ctx.scale(ps,ps);rrect(-280,-100,560,200,40,{w:9,col:'#000',fill:f,seed:1902+x});txt(s,0,0,110,{col:c,stroke:c===RA?8:0,strokeCol:'#000'});ctx.restore();}return;}
  if(t<255.1){ctx.fillStyle='#05070d';ctx.fillRect(0,0,W,H);const g=ctx.createLinearGradient(0,420,0,H);g.addColorStop(0,'#13233d');g.addColorStop(1,'#000');ctx.fillStyle=g;ctx.fillRect(0,420,W,H-420);
    line(100,420,1820,420,{w:12,col:'#888',seed:4700});car(lerp(300,1500,P(t,243.9,255)),380,0.9,t);ruler(150,450,140,4);
    TX('THE REAL QUESTION:',CX,140,90,WHITE);if(t>247.73)yelBox('$50 TICKET',560,640,90);if(t>251.23)yelBox('3 DAYS',1180,640,90);if(t>252.48)ST('OVER A DARK ABYSS 4 KM DEEP',CX,900,80,RA,t,252.48,{glow:1});return;}
  if(t<260.9){paper();const ps=1+0.05*Math.sin(t*9);ctx.save();ctx.translate(CX,430);ctx.scale(ps,ps);TX('WOULD YOU DARE?',0,-110,130,INK);TX('YES / NO?',0,60,150,RA,{glow:1});ctx.restore();
    TX('$50 TICKET · 3 DAYS · 4 KM DEEP',CX,720,64,INK);if(t>258.33)ST('+ WHAT SHOULD WE BUILD NEXT?',CX,900,80,INK,t,258.33);return;}
  if(t<263.25){paper();likeBtn(1250,560,1.7,t>262.37);stick(560,1000,2.0,t,{pose:'point',mood:'happy'});TX('IF THIS BLEW YOUR MIND',CX,150,110,INK);if(t>262.37)ST('HIT LIKE!',1250,860,120,RA,t,262.37,{glow:1});return;}
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ST('NEXT:',CX,340,100,YEL,t,263.25);ST('WHAT SHOULD WE BUILD',CX,500,120,WHITE,t,263.5);ST('ACROSS THE ATLANTIC?',CX,660,130,RA,t,264.7,{glow:1});}
const SC=[[0,S1],[8.25,S2],[11.45,S3],[19.8,S4],[28.9,S5],[36.3,S6],[42.9,S7],[49.0,S8],[54.1,S9],[68.3,S10],[79.6,S11A],[87.8,S11B],[98.2,S12],[106.9,S13],[131.2,S14],[145.4,S15],[157.9,S16],[170.6,S17],[185.7,S18],[198.6,S19],[216.4,S20],[234.2,S21],[242.0,S22]];
function render(t){BOIL=Math.floor(t/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  let i=0;while(i+1<SC.length&&t>=SC[i+1][0])i++;const c0=SC[i][0];if(i>0&&t-c0<0.1&&i!==2)ctx.filter=`blur(${(8*(1-(t-c0)/0.1)).toFixed(1)}px)`;
  SC[i][1](t);ctx.filter='none';ctx.setTransform(1,0,0,1,0,0);if(i!==22||t<263.25)grade(t);}
window.render=render;
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
