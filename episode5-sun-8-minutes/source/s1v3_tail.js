// ===== Short 1 v2 — STILL SHINING (owner spec, 9:16, 19.85 s). Time = short time tr. Safe zone y 288–1536. No subtitle bar. =====
// voice segments (source s): [0,4.6] hook · [25.6,32.15] why · [51.85,57.5] nothing can know · [57.5,60.55] beautiful day
function T(s,y,size,col,o={}){return txt(s,CX,y,size,{col,maxW:960,...o});}
function Z(z,fx=CX,fy=CY){ctx.translate(fx,fy);ctx.scale(z,z);ctx.translate(-fx,-fy);}
function zin(tr,t0,z0,z1,d=0.4){return lerp(z0,z1,eOut(P(tr,t0,t0+d)));}
function sky(tr){daySky(tr);}
// ---- scene 1: 5 rapid cuts 0–4.6 (0.7 / 1.5 / 2.3 / 3.2), white flash, motion blur + zoom-in on every cut ----
const CUTS=[0,0.7,1.5,2.3,3.2];
function S1(tr){const ci=tr<0.7?0:tr<1.5?1:tr<2.3?2:tr<3.2?3:4,c0=CUTS[ci],c1=ci<4?CUTS[ci+1]:4.6;
  const bl=clamp(1-(tr-c0)/0.1);if(ci>0&&bl>0)ctx.filter=`blur(${(10*bl).toFixed(1)}px)`;
  ctx.save();const z=ci===0?1:lerp(ci===3?1.1:1.0,ci===3?1.2:1.1,eOut(P(tr,c0,c1)));
  if(ci===0){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const sh=tr<0.25?18:4;glow(CX,CY,560,'rgba(255,68,68,0.5)',1);ctx.save();ctx.translate(nz(tr*80,1)*sh,nz(tr*70,2)*sh);T('GONE',CY,300,RED);ctx.restore();
    if(tr<0.1){ctx.fillStyle=`rgba(255,255,255,${1-tr/0.1})`;ctx.fillRect(0,0,W,H);}ctx.restore();ctx.filter='none';return;}
  if(ci===1){Z(z,CX,900);ctx.fillStyle='#E5E5E5';ctx.fillRect(0,0,W,H);ctx.fillStyle='#90C060';ctx.fillRect(0,GY,W,H-GY);line(0,GY,W,GY,{w:LW,seed:600,amp:3});
    clockBig(650,800,1.3,'0:00',{bg:'#8a8a8a',col:WHITE});stick(190,GY,2.3,tr,{pose:'relax',mood:'curious'});ctx.restore();ctx.filter='none';T('RIGHT NOW...',360,150,'#666666');return;}
  const fadeK=ci===4?P(tr,3.2,3.7):0;Z(z,700,1040);sky(tr);if(fadeK>0){ctx.save();ctx.globalAlpha=fadeK;space(tr);ctx.restore();}
  sun(700,1040,210,tr);stick(230,GY,2.4,tr,{pose:'point',mood:'shock',col:fadeK>0.5?WHITE:INK});
  if(ci>=3){const k=pop(tr,2.3,0.25),fa=ci===4?1-P(tr,3.3,3.6):1;if(fa>0){ctx.save();ctx.globalAlpha=fa;ctx.translate(720,1380);ctx.scale(k,k);clockBig(0,0,0.9,'8:00',{});ctx.restore();}}
  if(ci===4&&tr>3.6){const k=P(tr,3.6,4.5);ctx.setLineDash([16,18]);ctx.strokeStyle=GOLD;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(700,1270);ctx.lineTo(700,lerp(1270,1500,k));ctx.stroke();ctx.setLineDash([]);}
  ctx.restore();ctx.filter='none';const tc=fadeK>0.5?WHITE:INK;
  T('THE SUN COULD BE',330,140,tc);T('GONE',490,190,RED,{stroke:6,strokeCol:'#7a0000'});T('RIGHT NOW?!',650,140,tc);}
// ---- scene 2: why? 4.6–11.15 ----
function S2(tr){space(tr);const z=lerp(1.0,1.1,P(tr,5.5,11.15));ctx.save();Z(z,CX,1000);
  const SY=860,EY=1400;sun(CX,SY,140,tr);earth(CX,EY,110,{lit:1});
  ctx.setLineDash([16,18]);ctx.strokeStyle=GOLD;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(CX,SY+160);ctx.lineTo(CX,EY-125);ctx.stroke();ctx.setLineDash([]);
  if(tr>5.3){const k=P(tr,5.3,8.9);const py=lerp(SY+160,EY-125,k);glow(CX,py,80,'rgba(255,215,0,0.95)',1);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(CX,py,14,0,TAU);ctx.fill();}
  if(tr>8.9)glow(CX,EY,230,'rgba(255,230,120,0.6)',0.6+0.4*Math.sin(tr*8));
  if(tr>7.4){txt('8m 20s',820,1110,130,{col:GOLD});txt('OLD LIGHT',820,1220,100,{col:GOLD});}
  ctx.restore();
  if(tr<5.3){stamp('WHY?',CX,330,190,WHITE,tr,4.65);return;}
  if(tr<8.1){T('THE LIGHT HITTING',310,112,WHITE);T('YOUR FACE...',430,112,WHITE);if(tr>7.4)T('LEFT THE SUN',550,112,GOLD);return;}
  if(tr<10.25){T('8 MIN 20 SEC',330,150,GOLD);T('AGO',490,150,WHITE);return;}
  const ps=tr>10.9?1+0.07*Math.sin((tr-10.9)*14):1;T("YOU'RE LOOKING AT",330,110,WHITE);ctx.save();ctx.translate(CX,500);ctx.scale(ps,ps);txt('THE PAST',0,0,190,{col:RED,maxW:960});ctx.restore();}
// ---- scene 3: nothing can know 11.15–16.8 ----
function S3(tr){const sh=tr>15.24&&tr<15.45?[nz(tr*60,9)*16,nz(tr*55,10)*12]:[0,0];ctx.save();ctx.translate(sh[0],sh[1]);paper();
  const z=tr>15.9?lerp(1.0,1.1,P(tr,15.9,16.8)):1;ctx.save();Z(z,CX,1000);
  telescope(320,980,1.9);satellite(760,1270,1.45);
  if(tr>13.52){const s=tr<13.75?nz(tr*60,3)*10:0;ctx.save();ctx.translate(s,0);bigX(320,1000,230,tr,13.52);ctx.restore();}
  if(tr>14.49){const s=tr<14.72?nz(tr*60,4)*10:0;ctx.save();ctx.translate(s,0);bigX(760,1270,220,tr,14.49);ctx.restore();}
  ctx.restore();
  if(tr<13.5){T('FOR 8 MIN 20 SEC',330,140,INK);}
  else if(tr<15.24){T('NO TELESCOPE.',330,140,INK);if(tr>14.49)T('NO SATELLITE.',490,140,INK);}
  else{stamp('NOTHING',CX,330,170,RED,tr,15.24);stamp('ON EARTH',CX,490,130,INK,tr,15.4);stamp('CAN KNOW',CX,650,150,RED,tr,16.0);}
  ctx.restore();}
// ---- scene 4: beautiful day + comment CTA 16.8–19.85 ----
function S4(tr){sky(tr);sun(800,760,170,tr);stick(300,GY,2.5,tr,{pose:'cheer',mood:'happy'});
  if(tr<17.85){T('THE SUN IS GONE...',330,130,RED);if(tr>17.4)T('AND IT\'S STILL A',490,110,INK);}
  if(tr>18.55)stamp('BEAUTIFUL DAY',CX,1150,150,'#00AA00',tr,18.58,{stroke:8,strokeCol:'#0b4d0b'});
  if(tr>17.85){const u=tr-17.85,k=eOut(clamp(u/0.25)),ps=1+0.05*Math.sin(u*10);ctx.save();ctx.translate(0,-(1-k)*420);
    glow(CX,430,560,'rgba(255,68,68,0.25)',0.6+0.4*Math.sin(u*8));rrect(40,290,1000,300,34,{w:10,col:RED,fill:'#FFFFFF',seed:9100});
    ctx.save();ctx.translate(CX,440);ctx.scale(ps,ps);txt('WOULD YOU NOTICE?',0,-60,110,{col:INK,maxW:900});txt('YES / NO? COMMENT!',0,65,104,{col:RED,maxW:900});ctx.restore();ctx.restore();}
  if(tr>18.0)txt('Full: youtu.be/xQwfpcWWy94',CX,1480,52,{col:'#555555',a:clamp((tr-18.0)/0.3)});}
function render(tr){BOIL=Math.floor(tr/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);
  if(tr<4.6)S1(tr);else if(tr<11.15)S2(tr);else if(tr<16.8)S3(tr);else S4(tr);}
const REEL_LEN=19.85;window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
