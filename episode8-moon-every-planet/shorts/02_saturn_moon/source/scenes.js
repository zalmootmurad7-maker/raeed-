// ===== Ink & Atoms — Short: Saturn as our Moon (ep. 8 door, Event Horizon style + formula) =====
function satC(x,y,r,t,{tilt=-0.26,glowA=0.3,flat=0.24}={}){glow(x,y,r*2.2,'rgba(255,220,150,'+glowA+')',1);
  const B=[[1.28,1.50,'rgba(150,130,100,0.75)'],[1.52,1.94,'#EADCB6'],[1.94,2.03,'#2a2418'],[2.03,2.30,'#D3BE8E']];
  function half(front){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);for(const[a,b,col]of B){const m=(a+b)/2*r;ctx.strokeStyle=col;ctx.lineWidth=(b-a)*r;ctx.beginPath();ctx.ellipse(0,0,m,m*flat,0,front?0:Math.PI,front?Math.PI:TAU);ctx.stroke();}
    ctx.strokeStyle=INK;ctx.lineWidth=6;for(const f of[1.28,2.30]){ctx.beginPath();ctx.ellipse(0,0,f*r,f*r*flat,0,front?0:Math.PI,front?Math.PI:TAU);ctx.stroke();}ctx.restore();}
  half(false);
  ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const g=ctx.createLinearGradient(0,y-r,0,y+r);g.addColorStop(0,'#F5E7C4');g.addColorStop(1,'#D3B074');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);
  ctx.translate(x,y);ctx.rotate(tilt);for(const[c,h,col]of[[-0.62,0.10,'#E6CF9C'],[-0.3,0.14,'#CDAA70'],[0.05,0.08,'#EBD9AE'],[0.3,0.16,'#C29D63'],[0.62,0.1,'#D9BE88']]){ctx.fillStyle=col;ctx.fillRect(-r*1.2,c*r,r*2.4,h*r);}
  ctx.setTransform(1,0,0,1,0,0);ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const sh=ctx.createRadialGradient(x-r*0.4,y-r*0.35,r*0.2,x,y,r*1.05);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,0.5)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();
  ell(x,y,r,r,{w:7,col:INK,seed:8801,amp:2});half(true);}
// NOTE: satC uses setTransform inside a clip; callers draw it only with an identity camera (scenes below scale via S() instead).
function satAt(x,y,r,t,o){ctx.save();const m=ctx.getTransform();ctx.restore();const k=Math.hypot(m.a,m.b);ctx.save();ctx.setTransform(1,0,0,1,0,0);satC(m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f,r*k,t,o);ctx.restore();}
function fist(x,y,s,{a=1,arm=true,col=INK}={}){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.scale(s,s);
  if(arm){poly([[-55,60],[-90,420],[90,420],[60,60]],{w:8,col,fill:'#F6F4F8',close:true,seed:8811,amp:2});}
  rrect(-112,-72,224,144,46,{w:8,col,fill:'#F6F4F8',seed:8812,amp:1.5});for(const xx of[-56,0,56])line(xx,-72,xx,-20,{w:6,col,seed:8813+xx,amp:1});
  poly([[-112,10],[-40,-6],[30,8],[40,34],[-20,40],[-104,44]],{w:7,col,fill:'#F6F4F8',close:true,seed:8820,amp:1.2});ctx.restore();}
function horizon(col='#1b2a1b',edge='#8fb98f'){ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(CX,1900,1100,560,0,0,TAU);ctx.fill();ell(CX,1900,1100,560,{w:7,col:edge,seed:7802,amp:3});}
function oceanEarth(x,y,r,k,dir=-0.75){const s=1+0.55*k;ctx.save();ctx.translate(x,y);ctx.rotate(dir);ctx.fillStyle='rgba(90,160,235,0.55)';ctx.beginPath();ctx.ellipse(0,0,r*1.05*s,r*1.05/Math.sqrt(s),0,0,TAU);ctx.fill();
  ctx.strokeStyle='rgba(170,215,255,0.9)';ctx.lineWidth=5;ctx.stroke();ctx.restore();earth(x,y,r);}
function scale2(t,k){const bx=CX,by=920,L=330,ang=lerp(0,0.32,eOut(k));ctx.save();
  poly([[bx-90,1150],[bx,940],[bx+90,1150]],{w:8,col:'#cfd6ea',fill:'#2a2f45',close:true,seed:8831,amp:1.5});
  const lx=bx-Math.cos(ang)*L,ly=by+Math.sin(ang)*L,rx=bx+Math.cos(ang)*L,ry=by-Math.sin(ang)*L;line(lx,ly,rx,ry,{w:12,col:'#cfd6ea',seed:8832,amp:1});ell(bx,by,16,16,{w:6,col:'#cfd6ea',fill:'#cfd6ea',seed:8833});
  for(const[px,py]of[[lx,ly],[rx,ry]]){line(px,py,px-90,py+170,{w:5,col:'#cfd6ea',seed:8834});line(px,py,px+90,py+170,{w:5,col:'#cfd6ea',seed:8835});poly([[px-120,py+170],[px+120,py+170],[px+80,py+200],[px-80,py+200]],{w:7,col:'#cfd6ea',fill:'#3a4060',close:true,seed:8836});}
  satAt(lx,ly+60,95,t,{glowA:0.3});earth(rx,ry+148,22);ctx.restore();}
const R8=RED;
// A 0–3.2 "Saturn. Thirty-three times wider than the Moon."  frame 0 = Saturn filling the sky over the horizon + shocked you
function A(t){deep(t,{dim:0.9});const z=lerp(1.0,1.05,P(t,0,3.2));ctx.save();ctx.translate(CX,900);ctx.scale(z,z);ctx.translate(-CX,-900);satAt(600,900,215,t);ctx.restore();
  horizon();hero(165,1440,1.45,t,{pose:t<wt('thirty')?'up':'point',mood:'shock',col:WHITE});
  TX('SATURN',CX,250,190,GOLD,{maxW:1000});TX('AS OUR MOON?!',CX,420,150,WHITE,{maxW:1000});
  if(t>=wt('thirty'))ST('33× WIDER',640,1240,130,R8,t,wt('thirty'),{stroke:10,strokeCol:'#000'});vignette(0.5);}
// B 3.2–7.2 "Put it where the Moon is, and the planet alone would be wider than your fist."
function B(t){deep(t,{dim:0.9});const z=lerp(1.0,1.08,eInOut(P(t,3.2,7.2)));ctx.save();ctx.translate(CX,860);ctx.scale(z,z);ctx.translate(-CX,-860);satAt(CX,860,200,t);
  const k=pop(t,wt('fist')-0.25,0.3);if(k>0){ctx.save();ctx.translate(0,(1-k)*500);fist(CX+30,930,1.0,{a:0.92});ctx.restore();}ctx.restore();
  horizon();TX('PUT IT WHERE',CX,250,130,WHITE);TX('THE MOON IS',CX,390,140,GOLD);
  if(t>=wt('fist'))ST('WIDER THAN YOUR FIST',CX,1290,90,R8,t,wt('fist'),{stroke:8,strokeCol:'#000'});vignette(0.5);}
// C 7.2–9.6 "The rings? Four fists wide."
function C(t){deep(t,{dim:0.9});satAt(CX,860,200,t);horizon();
  const t0=wt('four'),xs=[CX-345,CX-115,CX+115,CX+345];xs.forEach((x,i)=>{const tt=t0+i*0.22;if(t<tt)return;const k=pop(t,tt,0.2);ctx.save();ctx.translate(x,860);ctx.scale(k,k);fist(0,0,0.98,{a:0.8,arm:false});TX(String(i+1),0,8,80,R8,{stroke:6,strokeCol:'#000'});ctx.restore();});
  TX('THE RINGS?',CX,300,150,GOLD);if(t>=wt('wide'))ST('4 FISTS WIDE',CX,1290,110,R8,t,wt('wide'),{stroke:8,strokeCol:'#000'});vignette(0.5);}
// C2 9.6–12.1 "A quarter of the way across the whole sky." — zoom out to the whole sky dome; the rings take a 45° slice of 180°
function C2(t){deep(t,{dim:0.9});const k=eOut(P(t,9.6,10.4));const cx=CX,cy=1180,R=470;
  ctx.save();ctx.strokeStyle='rgba(207,214,234,0.7)';ctx.lineWidth=5;ctx.setLineDash([16,14]);ctx.beginPath();ctx.arc(cx,cy,R,Math.PI,TAU);ctx.stroke();ctx.setLineDash([]);ctx.restore();
  const sw=Math.PI/4*eOut(P(t,wt('quarter'),wt('sky')));ctx.save();ctx.strokeStyle=R8;ctx.lineWidth=22;ctx.lineCap='round';ctx.beginPath();ctx.arc(cx,cy,R,-Math.PI/2-sw/2,-Math.PI/2+sw/2);ctx.stroke();ctx.restore();
  glow(cx,cy-R,200,'rgba(255,68,68,0.25)',P(t,wt('quarter'),wt('sky')));
  const sr=lerp(200,80,k),sy=lerp(860,cy-R+10,k);satAt(cx,sy,sr,t,{glowA:0.25});
  ctx.fillStyle='#1b2a1b';ctx.fillRect(0,cy,W,700);line(0,cy,W,cy,{w:7,col:'#8fb98f',seed:8840,amp:3});hero(cx,cy+230,0.75,t,{pose:'up',mood:'shock',col:WHITE});
  TX('THE WHOLE SKY',CX,300,140,WHITE);if(t>=wt('quarter'))ST('1/4 OF IT = RINGS',CX,470,120,GOLD,t,wt('quarter'));vignette(0.5);}
// D 12.1–15.7 "But its pull is almost eight thousand times the Moon's."
function D(t){deep(t,{dim:0.85});shake(t,wt('thousand'),18,0.4);satAt(980,420,150,t,{glowA:0.25});const k=P(t,wt('almost'),wt("moon's")+0.2);
  oceanEarth(470,880,190,eOut(k));const n=counter(t,wt('almost'),wt("moon's"),1,7740);
  TX('ITS PULL',300,250,140,WHITE);if(t>=wt('almost'))TX(n.toLocaleString('en-US')+'×',CX,1250,150,GOLD,{stroke:10,strokeCol:'#000'});if(t>=wt('almost'))TX("THE MOON'S PULL",CX,1340,64,WHITE);vignette(0.5);}
// E 15.7–vend "Saturn is ninety-five times heavier than Earth."
function E(t){deep(t,{dim:0.85});scale2(t,P(t,wt('heavier')-0.3,wt('heavier')+0.4));TX('SATURN VS EARTH',CX,280,130,WHITE);
  if(t>=wt('ninety'))ST('95× HEAVIER THAN EARTH',CX,470,112,R8,t,wt('ninety'),{stroke:8,strokeCol:'#000'});vignette(0.5);}
// F vend–end: puzzle card (answer only in the long video), then loops back to "Saturn."
function F(t){deep(t,{dim:0.6});scale2(t,1);const k=eOut(clamp((t-TM.vend-0.15)/0.3));if(t>=TM.vend+0.15){ctx.save();ctx.translate(0,-(1-k)*600);glow(CX,470,620,'rgba(255,68,68,0.25)',0.8);
    rrect(40,250,1000,440,34,{w:9,col:R8,fill:'#fff',seed:9300});txt('SO WHO ORBITS',CX,370,120,{col:INK,maxW:920});txt('WHO?!',CX,540,170,{col:R8,stroke:6,strokeCol:'#000',maxW:920});ctx.restore();}
  if(t>=TM.vend+0.5){const kk=pop(t,TM.vend+0.5,0.3);ctx.save();ctx.translate(CX,1440);ctx.scale(kk,kk);rrect(-300,-70,600,140,30,{w:6,col:'#cfd6ea',fill:'rgba(10,10,25,0.92)',seed:9310});likeBtn(-200,0,0.55,t>TM.vend+1.0);txt('HIT LIKE',70,4,80,{col:WHITE});ctx.restore();}}
function render(t){BOIL=Math.floor(t/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  ctx.save();if(t<0.5){const k=eOut(clamp(t/0.5));ctx.translate(nz(t*60,1)*14*(1-k),nz(t*55,2)*14*(1-k));ctx.translate(CX,CY);ctx.scale(lerp(1.06,1,k),lerp(1.06,1,k));ctx.translate(-CX,-CY);}
  (t<wt('put')-0.1?A:t<wt('the',3)-0.1?B:t<wt('a')-0.15?C:t<wt('but')-0.2?C2:t<wt('saturn',1)-0.2?D:t<TM.vend?E:F)(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);if(t<TM.vend)caps(t);}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
