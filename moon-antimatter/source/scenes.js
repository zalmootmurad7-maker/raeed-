// ================= VIDEO 2: What if the Moon were made of antimatter? =================
// timings come from the forced alignment of the voiceover (align.json)
const PINK='#fbe3e0',SUNY='#fff1c2',SEA='#e9eef7',LAND='#cfcbd6';

// ---------- extra glyphs ----------
function antiproton(x,y,r,o={}){const s=o.s??1;if(s<=0)return;r*=s;const sd=o.seed??Math.floor(x*7+y*3);circ(x,y,r,{fill:PINK,seed:sd,col:RED,w:o.w??LW});line(x-r*0.5,y,x+r*0.5,y,sd+1,1,o.w??LW,RED);}
function positron(x,y,r,o={}){const s=o.s??1;if(s<=0)return;r*=s;circ(x,y,r,{fill:PINK,seed:o.seed??Math.floor(x*5+y*11),col:RED,w:o.w??LW});
  ctx.save();ctx.font=`${r*1.5}px "PHL"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=RED;ctx.fillText('e',x-r*0.1,y-r*0.08);ctx.font=`${r*0.95}px "PHL"`;ctx.fillText('+',x+r*0.47,y-r*0.42);ctx.restore();}
function antineutron(x,y,r,o={}){const s=o.s??1;if(s<=0)return;r*=s;circ(x,y,r,{fill:'#ecd3d6',seed:o.seed??Math.floor(x*3+y*13),col:RED,w:o.w??LW});}
const APSPR=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');g.fillStyle=PINK;g.strokeStyle=RED;g.lineWidth=3;g.lineCap='round';
  g.beginPath();g.arc(32,32,24,0,TAU);g.fill();g.stroke();g.beginPath();g.moveTo(20,32);g.lineTo(44,32);g.stroke();return c;})();
function antiBall(x,y,r,o={}){const s=o.s??1;if(s<=0)return;r*=s;const pr=o.pr??15,jit=o.jit??0,t=o.t??0;ctx.save();ctx.beginPath();ctx.arc(x,y,r+pr,0,TAU);ctx.clip();
  const st=pr*1.95;let i=0;for(let yy=-r;yy<=r;yy+=st*0.87){const off=(Math.round(yy/(st*0.87))&1)*st/2;for(let xx=-r-off;xx<=r;xx+=st){i++;if(xx*xx+yy*yy>(r-pr*0.6)**2)continue;
    const jx=nz(t*18+i,i)*jit,jy=nz(t*21+i*1.3,i+4)*jit;ctx.drawImage(APSPR,x+xx+jx-pr,y+yy+jy-pr,pr*2,pr*2);}}
  ctx.restore();circ(x,y,r,{seed:o.seed??47,w:LW+0.4,col:RED});}
function antiMoon(x,y,r,o={}){const s=o.s??1;if(s<=0)return;moon(x,y,r,o);circ(x,y,(r+12)*s,{col:RED,w:3,dash:[12,10],seed:(o.seed??41)+5});}
function earth(x,y,r,o={}){const s=o.s??1;if(s<=0)return;r*=s;const sd=o.seed??61;ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=SEA;ctx.fill();ctx.clip();
  const R=rng(sd);const blobs=o.simple?2:5;for(let b=0;b<blobs;b++){const bx=x+(R()-.5)*r*1.3,by=y+(R()-.5)*r*1.3,br=r*(0.22+R()*0.25);const pts=[];for(let i=0;i<=16;i++){const a=i/16*TAU;const rr=br*(0.7+0.5*R());pts.push([bx+Math.cos(a)*rr,by+Math.sin(a)*rr*0.8]);}pts.push(pts[0]);
    ctx.fillStyle=LAND;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.fill();if(!o.simple)strokePts(wob(pts,sd+b,0.8),1,2,INK);}
  ctx.restore();circ(x,y,r,{seed:sd+9,w:o.w??LW+0.4});}
function sunGlyph(x,y,r,t,o={}){const sd=o.seed??71;for(let i=0;i<16;i++){const a=i/16*TAU+t*0.15;const r0=r+16,r1=r+(i%2?46:70);line(x+Math.cos(a)*r0,y+Math.sin(a)*r0,x+Math.cos(a)*r1,y+Math.sin(a)*r1,sd+i,1,3.2);}
  circ(x,y,r,{fill:SUNY,seed:sd,w:LW+0.6});}
function cloudPath(x,y,rx,ry,seed){const R=rng(seed);const pts=[];const n=11;for(let i=0;i<n;i++){const a0=i/n*TAU,a1=(i+1)/n*TAU,b=0.18+R()*0.12;for(let j=0;j<=6;j++){const a=lerp(a0,a1,j/6);const bump=1+b*Math.sin(j/6*Math.PI);pts.push([x+Math.cos(a)*rx*bump,y+Math.sin(a)*ry*bump]);}}pts.push(pts[0]);return pts;}
function fillPts(pts,col){ctx.fillStyle=col;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill();}
function mushroom(x,y,s,seed){if(s<=0)return;const sw=24*s,sh=120*s;
  const stem=[[x-sw,y],[x-sw*0.55,y-sh],[x+sw*0.55,y-sh],[x+sw,y]];fillPts(stem,PAPER);strokePts(wob([stem[0],stem[1]],seed,1));strokePts(wob([stem[3],stem[2]],seed+1,1));
  const base=cloudPath(x,y,85*s,20*s,seed+2);fillPts(base,PAPER);strokePts(wob(base,seed+3,0.8),1,LW);
  const cap=cloudPath(x,y-sh-40*s,100*s,55*s,seed+4);fillPts(cap,PAPER);strokePts(wob(cap,seed+5,0.8),1,LW);
  line(x-60*s,y-sh-45*s,x+50*s,y-sh-30*s,seed+6,1,2,'#888');}
function boom(x,y,tl,R,seed,o={}){if(tl<0)return;const k=eOut(clamp(tl/0.3));const fade=1-clamp((tl-(o.hold??0.35))/(o.fade??0.8));if(fade<=0)return;
  ctx.save();ctx.globalAlpha=fade;const r0=rng(seed);const n=18,pts=[];for(let i=0;i<n*2;i++){const a=i/(n*2)*TAU;const rr=R*k*(i%2?0.55:1)*(0.85+r0()*0.3);pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}pts.push(pts[0]);
  fillPts(pts,'#fffdf4');strokePts(wob(pts,seed,1),1,LW);
  const inner=pts.map(([px,py])=>[x+(px-x)*0.55,y+(py-y)*0.55]);fillPts(inner,'#fde0c8');strokePts(wob(inner,seed+1,0.8),1,2.4,RED);
  for(let i=0;i<14;i++){const a=i/14*TAU+0.2;const a0=R*k*1.1,a1=R*k*(1.35+r0()*0.3);line(x+Math.cos(a)*a0,y+Math.sin(a)*a0,x+Math.cos(a)*a1,y+Math.sin(a)*a1,seed+10+i,1,3);}
  ctx.restore();}
function greyFlash(x,y,tl,dur=0.9){const fk=clamp(tl/dur);if(tl<0||fk>=1)return;const g=ctx.createRadialGradient(x,y,0,x,y,1500);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.25,`rgba(205,203,210,${0.9*(1-fk)})`);g.addColorStop(1,`rgba(120,118,128,${0.85*(1-fk)})`);ctx.fillStyle=g;ctx.fillRect(-50,-50,W+100,H+100);}
function rockGlyph(x,y,r,seed,anti=false){const R=rng(seed);const pts=[];for(let i=0;i<10;i++){const a=i/10*TAU;const rr=r*(0.78+R()*0.32);pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr*0.85]);}pts.push(pts[0]);
  fillPts(pts,anti?PINK:'#d6d3dc');strokePts(wob(pts,seed,0.8),1,LW,anti?RED:INK);for(let i=0;i<3;i++){const hx=x+(R()-.5)*r,hy=y+(R()-.5)*r*0.6;line(hx,hy,hx+r*0.25,hy-r*0.12,seed+i+3,1,2,anti?RED:'#666');}}
function check(x,y,sz,k,col=RED){if(k<=0)return;strokePts([[x-sz*0.5,y],[x-sz*0.12,y+sz*0.42],[x+sz*0.6,y-sz*0.5]],k,5,col);}
function cross(x,y,sz,k,col=RED){if(k<=0)return;line(x-sz,y-sz,x+sz,y+sz,901,clamp(k*2),5,col);line(x+sz,y-sz,x-sz,y+sz,902,clamp(k*2-1),5,col);}
function cube(x,y,s,anti,o={}){if(s<=0)return;const a=50*s,d=22*s;const col=anti?RED:INK,f=anti?PINK:PAPER;
  fillPts([[x-a/2,y-a/2],[x+a/2,y-a/2],[x+a/2,y+a/2],[x-a/2,y+a/2]],f);fillPts([[x-a/2,y-a/2],[x-a/2+d,y-a/2-d],[x+a/2+d,y-a/2-d],[x+a/2,y-a/2]],f);fillPts([[x+a/2,y-a/2],[x+a/2+d,y-a/2-d],[x+a/2+d,y+a/2-d],[x+a/2,y+a/2]],f);
  rect(x-a/2,y-a/2,a,a,o.seed??5,1,LW,col);strokePts(wob([[x-a/2,y-a/2],[x-a/2+d,y-a/2-d],[x+a/2+d,y-a/2-d],[x+a/2+d,y+a/2-d],[x+a/2,y+a/2]],(o.seed??5)+3,0.8),1,LW,col);line(x+a/2,y-a/2,x+a/2+d,y-a/2-d,(o.seed??5)+4,1,LW,col);}
function wave(x1,y1,x2,y2,k,seed,col=RED,amp=9,wl=26,w=2.8){const L=Math.hypot(x2-x1,y2-y1),ux=(x2-x1)/L,uy=(y2-y1)/L;const pts=[];for(let s=0;s<=L;s+=4){const o=Math.sin(s/wl*TAU+seed)*amp;pts.push([x1+ux*s-uy*o,y1+uy*s+ux*o]);}strokePts(pts,k,w,col);}
function heart(x,y,s,col=RED){const pts=[];for(let i=0;i<=40;i++){const t=i/40*TAU;const hx=16*Math.sin(t)**3,hy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));pts.push([x+hx*s,y+hy*s]);}fillPts(pts,'#f6c7c2');strokePts(wob(pts,77,0.6),1,3,col);}
function lander(x,y,s,seed=1201){const P2=(px,py)=>[x+px*s,y+py*s];
  for(const sx of[-1,1]){strokePts(wob([P2(sx*40,20),P2(sx*78,78)],seed+sx,0.6),1,LW);line(...P2(sx*90,80),...P2(sx*66,80),seed+sx+3,1,LW);}
  fillPts([P2(-48,-30),P2(48,-30),P2(52,24),P2(-52,24)],PAPER);rect(x-50*s,y-30*s,100*s,54*s,seed+5,1,LW);
  const top=[P2(-34,-30),P2(-26,-78),P2(26,-78),P2(34,-30)];fillPts(top,PAPER);strokePts(wob([...top],seed+6,0.6));
  circ(x,y-56*s,10*s,{seed:seed+7,w:2.4,fill:PAPER});fillPts([P2(-14,24),P2(14,24),P2(20,44),P2(-20,44)],PAPER);strokePts(wob([P2(-14,24),P2(-20,44),P2(20,44),P2(14,24)],seed+8,0.5));}
function helmetFig(x,y,pose,o={}){figure(x,y,pose,o);const s=o.s??1;circ(x,y-264*s,52*s,{seed:1300,w:2.6});}
function mirrorPose(p){return{la:[-p.ra[0],-p.ra[1]],ra:[-p.la[0],-p.la[1]],ll:[-p.rl[0],-p.rl[1]],rl:[-p.ll[0],-p.ll[1]],paper:p.paper};}
function horns(x,y,s,k){if(k<=0)return;const hx=x,hy=y-264*s;ctx.save();ctx.translate(hx,hy);ctx.scale(k,k);for(const sd of[-1,1]){const pts=[[sd*18*s,-30*s],[sd*30*s,-62*s],[sd*34*s,-26*s]];fillPts(pts,PINK);strokePts(wob(pts,1400+sd,0.4),1,3,RED);}
  const g=[[-10*s,36*s],[0,62*s],[10*s,36*s]];fillPts(g,INK);ctx.restore();}
function mirrorFrame(x,y0,y1,k){rect(x-22,y0,44,(y1-y0)*clamp(k*1.2),1500,clamp(k*1.3),LW);if(k>0.6){for(let i=0;i<6;i++){const yy=y0+60+i*((y1-y0-120)/5);line(x-12,yy+14,x+8,yy-10,1510+i,clamp((k-0.6)*3),2,'#9a98a2');}}}
const NUCA=(()=>{const R=rng(9),a=[];const pts=[[0,0],[30,-12],[-28,-16],[8,28],[-24,24],[26,24],[-4,-34],[36,12]];pts.forEach((p,i)=>a.push({x:p[0],y:p[1],p:i%2===0,z:R()}));a.sort((u,v)=>(u.p-v.p)||(u.z-v.z));return a;})();
function antiAtom(x,y,S,t,o={}){circ(x,y,150*S,{ry:52*S,dash:[10,10],seed:1600,w:2.4,col:RED,k:o.k??1});NUCA.forEach((n,i)=>{const fn=n.p?antiproton:antineutron;fn(x+n.x*S,y+n.y*S,24*S,{seed:1610+i});});
  const th=t*2.2;positron(x+Math.cos(th)*150*S,y+Math.sin(th)*52*S,18*S,{seed:1620});}
function flyingDebris(x,y,tl,n,seed,fn){const R=rng(seed);for(let i=0;i<n;i++){const a=R()*TAU,sp=500+R()*900;const d=sp*tl+300*tl*tl;const px=x+Math.cos(a)*d,py=y+Math.sin(a)*d+400*tl*tl;if(px<-80||px>W+80||py<-80||py>H+80)continue;
  if(d>40)motionLines(px,py,a,Math.min(120,d*0.4),2,seed+i,1);fn(px,py,i);}}

// ---------- scenes ----------
// A 0-5.45: recap of the proton Moon
function sA(t){
  const fp=t<3.74?POSES.paper:lerpPose(POSES.paper,POSES.up,eOut(P(t,3.74,3.95)));figure(220,940,fp,{s:1.05});
  txt('LAST TIME:',260,110,64,{k:writeK(t,0.0,'LAST TIME:',20),col:RED});
  const MX=1120,MY=500;
  if(t<3.74){protonBall(MX,MY,230,{s:pop(t,1.36),jit:P(t,2.9,3.74)*6,t,pr:14});if(t>3.0)shakeMarks(MX,MY,230,701,P(t,3.0,3.2));}
  else{const tl=t-3.74;greyFlash(MX,MY,tl,0.8);flyingDebris(MX,MY,tl,40,710,(px,py,i)=>proton(px,py,18,{seed:720+i}));boom(MX,MY,tl,220,730,{hold:0.4,fade:0.8});}
  txt('PROTON MOON',MX,800,60,{k:writeK(t,1.4,'PROTON MOON'),a:1-P(t,3.6,3.74)});
  txt('BLEW ITSELF APART',MX,900,84,{k:writeK(t,3.9,'BLEW ITSELF APART',30),col:RED});
}
// B 5.45-12.4: let's try something safer... antimatter
function sB(t){
  const fp=t<8.55?POSES.paper:lerpPose(POSES.paper,POSES.point,eOut(P(t,8.55,8.8)));figure(220,940,fp,{s:1.0});
  board(470,90,1360,700,1);
  txt('THIS TIME:',640,180,52,{k:writeK(t,5.77,'THIS TIME:',24),col:RED});
  const w=txt('SOMETHING SAFER',1020,180,64,{k:writeK(t,7.0,'SOMETHING SAFER',30)});
  if(t>7.9)txt('?',1020+(w||480)/2+28,180,84,{col:RED});
  const MX=1150,MY=470,R=190;
  circ(MX,MY,R,{dash:[14,12],k:eOut(P(t,8.6,9.3)),seed:801,w:3});
  if(t>10.99){antiBall(MX,MY,R,{s:pop(t,10.99,0.3),pr:13});circ(MX,MY,R+14,{col:RED,w:3,dash:[12,10],seed:806,k:eOut(P(t,11.2,11.6))});}
  txt('ANTIMATTER',MX,720,84,{k:writeK(t,11.0,'ANTIMATTER',22),col:RED});
  if(t>9.1&&t<10.99)txt('...',MX,MY,90,{k:writeK(t,9.7,'...',3)});
}
// C 12.4-19.0: mirror version, evil twin, opposite charge
function sC(t){
  mirrorFrame(CX,130,900,P(t,12.45,13.3));
  const L=600,Rx=1320,G=900;
  const lp=POSES.point,rp=mirrorPose(POSES.point);
  if(t>13.3)figure(L,G,lp,{s:pop(t,13.36)*1.15||0.0001});
  if(t>13.5)figure(Rx,G,rp,{s:pop(t,13.6)*1.15||0.0001,seed:140});
  horns(Rx,G,1.15,pop(t,16.59));
  txt('ANTIMATTER',Rx,110,64,{k:writeK(t,12.45,'ANTIMATTER',24),col:RED});
  txt('NORMAL MATTER',L,110,64,{k:writeK(t,14.32,'NORMAL MATTER',26)});
  txt('EVIL TWIN',Rx+260,430,60,{k:writeK(t,16.75,'EVIL TWIN',22),col:RED});
  if(t>16.9)arrow(Rx+200,470,Rx+70,560,{k:eOut(P(t,16.9,17.15)),seed:1530,col:RED});
  // charges on the chests
  const ck=pop(t,17.71),ck2=pop(t,18.11);
  if(ck>0)proton(L,G-170*1.15,34,{s:ck,seed:1540});
  if(ck2>0)antiproton(Rx,G-170*1.15,34,{s:ck2,seed:1541});
  txt('OPPOSITE CHARGE',CX,990,58,{k:writeK(t,17.71,'OPPOSITE CHARGE',30)});
}
// D 19.0-23.9: electron/positron, proton/antiproton
function sD(t){
  mirrorFrame(CX,130,900,1);
  const L=600,Rx=1320,y1=330,y2=680;
  electron(L,y1,62,{s:pop(t,19.15),seed:1701});txt('ELECTRON',L,y1+110,54,{k:writeK(t,19.2,'ELECTRON')});
  positron(Rx,y1,62,{s:pop(t,20.28),seed:1702});txt('POSITRON',Rx,y1+110,54,{k:writeK(t,20.3,'POSITRON'),col:RED});
  if(t>20.3)arrow(L+90,y1,Rx-90,y1,{k:eOut(P(t,20.3,20.6)),seed:1703,both:true,w:2.4});
  proton(L,y2,62,{s:pop(t,21.43),seed:1704});txt('PROTON',L,y2+110,54,{k:writeK(t,21.45,'PROTON')});
  antiproton(Rx,y2,62,{s:pop(t,22.67),seed:1705});txt('ANTIPROTON',Rx,y2+110,54,{k:writeK(t,22.7,'ANTIPROTON'),col:RED});
  if(t>22.7)arrow(L+90,y2,Rx-90,y2,{k:eOut(P(t,22.7,23.0)),seed:1706,both:true,w:2.4});
}
// E 23.9-30.15: anti-atoms, anti-rocks, an anti-Moon
function sE(t){
  txt('PUT THEM TOGETHER:',CX,110,62,{k:writeK(t,23.93,'PUT THEM TOGETHER:',30)});
  // particles converge into the anti-atom
  const c=eInOut(P(t,24.2,25.5));if(c<1){antiproton(lerp(-80,380,c),lerp(300,520,c),30,{seed:1801});positron(lerp(-60,380,c),lerp(760,520,c),22,{seed:1802});antiproton(lerp(820,380,c),lerp(-60,520,c),30,{seed:1803});}
  else antiAtom(380,520,pop(t,25.5)*1.0||0.0001,t);
  txt('ANTI-ATOMS',380,780,58,{k:writeK(t,26.0,'ANTI-ATOMS'),col:RED});
  arrow(590,520,700,520,{k:eOut(P(t,26.6,26.85)),seed:1810});
  if(t>26.74){const s=pop(t,26.74);ctx.save();ctx.translate(900,520);ctx.scale(s,s);rockGlyph(0,0,110,1811,true);ctx.restore();}
  txt('ANTI-ROCKS',900,780,58,{k:writeK(t,27.09,'ANTI-ROCKS'),col:RED});
  arrow(1080,520,1200,520,{k:eOut(P(t,28.1,28.4)),seed:1812});
  antiMoon(1500,500,200,{s:pop(t,28.86),seed:1813});
  txt('AN ANTI-MOON',1500,780,66,{k:writeK(t,29.1,'AN ANTI-MOON',26),col:RED});
}
// F 30.15-35.7: spot the difference
function sF(t){
  txt('SPOT THE DIFFERENCE',CX,110,72,{k:writeK(t,31.3,'SPOT THE DIFFERENCE',30)});
  moon(600,450,210,{s:pop(t,30.3),seed:1901});antiMoon(1320,450,210,{s:pop(t,30.55),seed:1902});
  txt('MOON',600,710,56,{k:writeK(t,30.5,'MOON')});txt('ANTI-MOON',1320,710,56,{k:writeK(t,30.7,'ANTI-MOON'),col:RED});
  [['SAME SIZE',32.81],['SAME CRATERS',33.75],['SAME ORBIT',34.70]].forEach(([s,t0],i)=>{const x=480+i*480,y=880;const w=txt(s,x,y,54,{k:writeK(t,t0,s,30)});check(x+(w||250)/2+40,y-4,40,eOut(P(t,t0+0.25,t0+0.45)));});
  if(t>32.81){const k=eOut(P(t,32.81,33.1));arrow(600-210,190,600+210,190,{k,both:true,seed:1910,w:2.2,head:12});arrow(1320-210,190,1320+210,190,{k,both:true,seed:1911,w:2.2,head:12});}
}
// G 35.7-41.95: antimatter falls down; scientists checked in 2023
function sG(t){
  const tubes=[[640,'NORMAL',false],[1100,'ANTI',true]];
  txt('ANTIMATTER FALLS DOWN',CX,105,66,{k:writeK(t,35.75,'ANTIMATTER FALLS DOWN',32),col:RED});
  tubes.forEach(([x,lab,anti],i)=>{rect(x-90,190,180,640,1950+i,eOut(P(t,35.75+i*0.15,36.2+i*0.15)),LW);
    const t0=anti?36.4:37.9;const fall=eIn(P(t,t0,t0+0.65));const y=lerp(260,770,fall);
    if(t>t0-0.4){if(anti){antiproton(x,y,26,{seed:1960});const th=t*4;positron(x+Math.cos(th)*60,y+Math.sin(th)*22,13,{seed:1961});}else{proton(x,y,26,{seed:1962});const th=t*4;electron(x+Math.cos(th)*60,y+Math.sin(th)*22,13,{seed:1963});}
      if(fall>0&&fall<1)motionLines(x,y,Math.PI/2,90,3,1970+i,1);}
    if(t>t0+0.6)arrow(x+130,350,x+130,700,{k:eOut(P(t,t0+0.6,t0+0.9)),seed:1980+i,col:anti?RED:INK});
    txt(anti?'ANTI-HYDROGEN':'HYDROGEN',x,880,44,{k:writeK(t,t0-0.3,anti?'ANTI-HYDROGEN':'HYDROGEN',40),col:anti?RED:INK});});
  // scientist
  const sk=pop(t,39.06);if(sk>0){figure(1560,900,POSES.paper,{s:sk,seed:1990});txt('SCIENTISTS',1560,520,52,{k:writeK(t,39.1,'SCIENTISTS')});}
  if(t>40.03)check(1700,430,70,eOut(P(t,40.03,40.3)));
  txt('2023',1560,440,76,{k:writeK(t,40.73,'2023',10),col:RED});
}
// H 41.95-45.85: tides keep working, nobody notices
function sH(t){
  const EX=760,EY=540;const rot=t*0.25;
  // tidal bulge (dashed) toward the moon on the right
  ctx.save();ctx.translate(EX,EY);circ(0,0,280,{ry:236,dash:[12,10],seed:2001,w:2.6,k:eOut(P(t,42.0,42.5)),col:'#3d6fb5'});ctx.restore();
  earth(EX,EY,230,{s:pop(t,41.97),seed:2002});
  antiMoon(1550,540,95,{s:pop(t,42.05),seed:2003});
  txt('TIDES',EX,110,72,{k:writeK(t,42.22,'TIDES',16)});check(EX+120,104,50,eOut(P(t,42.6,42.85)));
  const nk=pop(t,43.85);if(nk>0){figure(1250,1010,POSES.shrug,{s:0.75*nk,seed:2010});}
  txt('NOBODY NOTICES',1240,690,56,{k:writeK(t,43.9,'NOBODY NOTICES',30)});
}
// I 45.85-55.3: the catch: annihilation
function sI(t){
  const ha=1-P(t,49.6,49.85);txt('BUT...',300,120,90,{k:writeK(t,45.9,'BUT...',12),col:RED,a:ha});
  txt("THERE'S A CATCH",620,128,62,{k:writeK(t,46.25,"THERE'S A CATCH",30),align:'left',a:ha});
  const ap=eIn(P(t,48.2,50.85));const hit=t>=50.95;
  const lx=lerp(420,CX-92,ap),rx=lerp(1500,CX+92,ap),y=540;
  const gone=P(t,50.95,51.15);
  if(t<51.15){proton(lx,y,90,{s:pop(t,47.7)*(1-gone),seed:2101});antiproton(rx,y,90,{s:pop(t,47.85)*(1-gone),seed:2102});}
  txt('MATTER',420,700,54,{k:writeK(t,47.8,'MATTER'),a:1-P(t,48.2,48.5)});txt('ANTIMATTER',1500,700,54,{k:writeK(t,48.56,'ANTIMATTER'),col:RED,a:1-P(t,49.4,49.7)});
  if(t>48.3&&t<50.95){motionLines(lx-90,y,0,110,3,2110,1);motionLines(rx+90,y,Math.PI,110,3,2111,1);}
  // "bounce?" crossed out
  if(t>49.85&&t<50.95){const k=eOut(P(t,49.9,50.2));ctx.save();ctx.setLineDash([10,10]);const pts=[];for(let i=0;i<=20;i++){const a=Math.PI+i/20*Math.PI;pts.push([CX+Math.cos(a)*240,380+Math.sin(a)*130]);}strokePts(pts,k,2.6);ctx.restore();
    txt('BOUNCE?',CX,200,60,{k:writeK(t,49.9,'BOUNCE?',30)});cross(CX,205,60,P(t,50.3,50.6));}
  if(hit){const tl=t-50.99;boom(CX,y,tl,200,2120,{hold:0.5,fade:0.6});
    txt('ANNIHILATE!',CX,850,104,{k:writeK(t,51.0,'ANNIHILATE!',24),col:RED,a:1-P(t,52.5,52.7)});}
  if(t>52.6){txt('BOTH VANISH',CX,850,72,{k:writeK(t,52.65,'BOTH VANISH',30),a:1-P(t,53.2,53.3)});
    for(let i=0;i<2;i++){const k=P(t,52.6,53.2);ring(CX+(i?92:-92),y,90+k*30,k);}}
  if(t>53.27){const tl=t-53.27;greyFlash(CX,440,tl,0.9);boom(CX,440,tl,280,2130,{hold:1.6,fade:0.6});
    txt('PURE ENERGY',CX,900,96,{k:writeK(t,53.9,'PURE ENERGY',24)});if(t>54.4){ctx.save();ctx.globalAlpha=P(t,54.4,54.6);sup('E = MC','2',CX,1005,62);ctx.restore();}}
}
function ring(x,y,r,k){if(k>=1)return;ctx.save();ctx.globalAlpha=1-k;circ(x,y,r,{seed:2140+Math.floor(x),w:2.4,dash:[8,8]});ctx.restore();}
// J 55.3-65.05: 1 g + 1 g = 3 Hiroshima bombs
function sJ(t){
  txt('THAT ENERGY IS',640,120,62,{k:writeK(t,55.4,'THAT ENERGY IS',30)});
  if(t>56.42){ctx.save();const j=Math.max(0,1-(t-56.42)/1.2)*5;ctx.translate(nz(t*40,1)*j,nz(t*43,2)*j);txt('RIDICULOUS',1230,124,96,{k:writeK(t,56.42,'RIDICULOUS',22),col:RED});ctx.restore();}
  cube(300,520,pop(t,57.9)*2.4,false,{seed:2201});txt('1 GRAM',320,720,64,{k:writeK(t,58.2,'1 GRAM')});txt('MATTER',320,790,50,{k:writeK(t,58.5,'MATTER')});
  txt('+',480,520,110,{k:writeK(t,58.98,'+',5)});
  cube(660,520,pop(t,59.4)*2.4,true,{seed:2202});txt('1 GRAM',680,720,64,{k:writeK(t,59.62,'1 GRAM'),col:RED});txt('ANTIMATTER',680,790,50,{k:writeK(t,59.95,'ANTIMATTER'),col:RED});
  txt('=',880,520,120,{k:writeK(t,60.99,'=',5)});
  for(let i=0;i<3;i++)mushroom(1150+i*290,740,pop(t,62.93+i*0.3,0.3)*1.45,2210+i*10);
  txt('3 HIROSHIMA BOMBS',1410,880,74,{k:writeK(t,63.5,'3 HIROSHIMA BOMBS',30),col:RED});
}
// K 65.05-81.0: solar wind hits the anti-Moon -> gamma glow
const WIND=(()=>{const R=rng(31),a=[];for(let i=0;i<110;i++)a.push({ph:R(),y:(R()-.5)*2,sp:0.75+R()*0.5});return a;})();
function sK(t){
  const SX=110,SY=560,MX=1560,MY=560,MR=190;
  sunGlyph(SX,SY,240,t,{seed:2301});
  antiMoon(MX,MY,MR,{s:pop(t,65.1),seed:2302});
  txt("SPACE ISN'T EMPTY",1000,105,66,{k:writeK(t,65.23,"SPACE ISN'T EMPTY",30)});
  const wa=P(t,66.9,67.6);
  if(wa>0){const x0=380,x1=MX-MR+10;for(const p of WIND){const prog=((t-66.9)*0.32*p.sp+p.ph)%1;const x=lerp(x0,x1,prog);const y=SY+p.y*lerp(260,150,prog);
      if((x-MX)**2+(y-MY)**2<(MR+4)**2)continue;ctx.save();ctx.globalAlpha=wa;ctx.drawImage(PSPR,x-13,y-13,26,26);ctx.restore();}
    txt('SOLAR WIND',700,860,60,{k:writeK(t,67.9,'SOLAR WIND',24)});txt('(PROTONS)',700,925,46,{k:writeK(t,68.8,'(PROTONS)',24)});}
  if(t>69.98){txt('EVERY SECOND:',1000,190,48,{k:writeK(t,69.98,'EVERY SECOND:',30),col:RED,a:1-P(t,75.6,75.9)});txt('TRILLIONS OF TRILLIONS',1000,255,58,{k:writeK(t,70.93,'TRILLIONS OF TRILLIONS',30),col:RED,a:1-P(t,75.6,75.9)});}
  // annihilation sparks on the sun-facing limb
  if(t>73.17){const R=rng(Math.floor(t*30));const n=Math.floor(lerp(2,7,P(t,73.17,74.5)));for(let i=0;i<n;i++){const a=Math.PI+(R()-.5)*2.2;const px=MX+Math.cos(a)*MR,py=MY+Math.sin(a)*MR;
      for(let j=0;j<6;j++){const b=j/6*TAU+R();line(px+Math.cos(b)*5,py+Math.sin(b)*5,px+Math.cos(b)*(14+R()*10),py+Math.sin(b)*(14+R()*10),2400+i*7+j,1,2.2,RED);}}}
  // gamma rays radiating out
  if(t>75.85){const g=P(t,75.85,77.0);for(let i=0;i<12;i++){const a=i/12*TAU+0.15;if(Math.cos(a)<-0.6&&g<1)continue;const r0=MR+30,r1=MR+lerp(60,260,g)*(0.8+0.2*Math.sin(i*3));
      const off=((t*120)%40);wave(MX+Math.cos(a)*(r0+off*0.2),MY+Math.sin(a)*(r0+off*0.2),MX+Math.cos(a)*r1,MY+Math.sin(a)*r1,1,i+t*8,RED,7,22,2.4);}
    txt('GAMMA RAYS',MX,105,60,{k:writeK(t,75.9,'GAMMA RAYS',24),col:RED});}
  if(t>76.99){const gl=0.5+0.5*Math.sin(t*6);for(let i=0;i<2;i++)circ(MX,MY,MR+40+i*22+gl*6,{col:RED,w:2,seed:2450+i,dash:[4,10]});txt('IT GLOWS. ALL THE TIME.',1000,1000,60,{k:writeK(t,77.8,'IT GLOWS. ALL THE TIME.',30)});}
}
// L 81.0-83.6: atmosphere blocks them
function sL(t){
  const EX=CX,EY=1700,ER=1150;
  ctx.save();circ(EX,EY,ER+70,{dash:[14,12],seed:2501,w:3,col:'#3d6fb5',k:eOut(P(t,81.2,81.9))});ctx.restore();
  earth(EX,EY,ER,{seed:2502});
  for(let i=0;i<9;i++){const x=260+i*175;const k=P(t,81.0+i*0.05,81.6+i*0.05);const yStop=EY-Math.sqrt((ER+70)**2-(x-EX)**2);wave(x+40,40,x,yStop,k,i*2,RED,7,22,2.4);
    if(k>=1){const j=(i*7)%5;line(x-10,yStop-10,x+10,yStop+10,2510+i,1,3);line(x+10,yStop-10,x-10,yStop+10,2520+i,1,3);}}
  txt('LUCKILY...',300,110,72,{k:writeK(t,81.1,'LUCKILY...',16),col:RED});
  txt('ATMOSPHERE',1500,500,58,{k:writeK(t,81.94,'ATMOSPHERE',24)});
  const fk=pop(t,82.4);if(fk>0){figure(CX,EY-ER+8,POSES.up,{s:0.6*fk,seed:2530});speech(CX+70,EY-ER-210,'PHEW!',writeK(t,82.6,'PHEW!',14),46);}
}
// M 83.6-98.15: space rocks; grapefruit rock; sparkle
const ROCKS=(()=>{const R=rng(41),a=[];for(let i=0;i<7;i++)a.push({t0:84.2+i*0.55,y:(R()-.5)*1.4,sd:2600+i});return a;})();
function sM(t){
  const anti=t>=88.14;const center=eInOut(P(t,94.9,95.4));
  const MX=lerp(anti?1450:1250,CX,center),MY=540,MR=lerp(anti?230:250,300,center);
  if(!anti){moon(MX,MY,MR,{s:pop(t,83.7),seed:2601});
    for(const r of ROCKS){const k=P(t,r.t0,r.t0+0.5);if(k<=0)continue;const ang=Math.PI+r.y*0.7;const tx=MX+Math.cos(ang)*MR,ty=MY+Math.sin(ang)*MR;
      if(k<1){const x=lerp(-60,tx,eIn(k)),y=lerp(ty+r.y*150,ty,k);rockGlyph(x,y,16,r.sd);motionLines(x,y,Math.atan2(ty-(ty+r.y*150),tx+60),60,2,r.sd,1);}
      else{const tl=t-(r.t0+0.5);if(tl<0.4){ctx.save();ctx.globalAlpha=1-tl/0.4;circ(tx,ty,10+tl*60,{seed:r.sd,w:2,dash:[4,6]});ctx.restore();}}}
    txt('SPACE ROCKS',520,180,66,{k:writeK(t,84.36,'SPACE ROCKS',24)});txt('HIT THE MOON ALL THE TIME',560,260,48,{k:writeK(t,85.4,'HIT THE MOON ALL THE TIME',32)});}
  else{antiMoon(MX,MY,MR,{s:pop(t,88.14),seed:2602});txt('ANTI-MOON',MX,MY+MR+70,56,{k:writeK(t,88.4,'ANTI-MOON'),col:RED,a:1-center});
    // grapefruit-sized rock
    const fa=1-P(t,90.9,91.0);const fly=eIn(P(t,91.0,91.16));
    if(t>89.3){if(fly<1){const x=lerp(330,MX-MR,fly),y=lerp(470,MY-40,fly);rockGlyph(x,y,62,2610);if(fly>0)motionLines(x,y,0,140,3,2611,1);}}
    if(t>89.3&&fa>0){ctx.save();ctx.globalAlpha=fa;txt('A ROCK',330,360,60,{k:writeK(t,89.4,'A ROCK')});
      circ(330,690,62,{fill:'#ffd9c2',seed:2620,s:pop(t,90.3)});if(t>90.4){for(let i=0;i<6;i++){const a=i/6*TAU;line(330,690,330+Math.cos(a)*52,690+Math.sin(a)*52,2621+i,1,1.8,'#c96');}}
      txt('= SIZE OF A GRAPEFRUIT',400,810,52,{k:writeK(t,90.3,'= SIZE OF A GRAPEFRUIT',36)});ctx.restore();}
    if(t>91.16){const tl=t-91.16;greyFlash(MX-MR,MY-40,tl,0.7);boom(MX-MR,MY-40,tl,260,2630,{hold:2.6,fade:0.6});}
    // comparison: more than the biggest bomb ever
    if(t>91.76&&t<95.2){const a=1-P(t,94.8,95.1);ctx.save();ctx.globalAlpha=a;txt('MORE ENERGY THAN THE',430,330,48,{k:writeK(t,91.76,'MORE ENERGY THAN THE',34)});
      const bs=pop(t,93.1);if(bs>0){ctx.save();ctx.translate(430,540);ctx.scale(bs,bs);const body=cloudPath(0,0,150,52,2640);fillPts(body,'#dcd9e2');
        ctx.beginPath();ctx.ellipse(0,0,150,50,0,0,TAU);ctx.fillStyle='#dcd9e2';ctx.fill();circ(0,0,150,{ry:50,seed:2641});for(const sd of[-1,1])strokePts(wob([[-130,0],[-200,sd*60],[-170,0]],2642+sd,0.5));ctx.restore();}
      txt('BIGGEST BOMB EVER BUILT',430,720,52,{k:writeK(t,92.93,'BIGGEST BOMB EVER BUILT',32),col:RED});ctx.restore();}
    // whole moon sparkles
    if(t>95.11){const R=rng(Math.floor(t*8));const n=Math.floor(lerp(3,14,P(t,95.11,96.5)));for(let i=0;i<n;i++){const a=R()*TAU,d=Math.sqrt(R())*MR*0.95;boom(MX+Math.cos(a)*d,MY+Math.sin(a)*d,((t*8)%1)/8+0.05,22+R()*26,2700+i+Math.floor(t*8)*13,{hold:0.2,fade:0.2});}
      txt('SPARKLE!',CX,980,80,{k:writeK(t,96.0,'SPARKLE!',16),col:RED});}
  }
}
// N 98.15-111.4: the lander
function sN(t){
  const GY=820;
  // anti-moon horizon
  ctx.save();ctx.fillStyle='#d9d6de';ctx.beginPath();ctx.ellipse(CX,GY+1600,2400,1600,0,0,TAU);ctx.fill();ctx.restore();
  circ(CX,GY+1600,2400,{ry:1600,seed:2801,w:LW+0.6});circ(CX,GY+1580,2400,{ry:1600,seed:2802,w:2.4,col:RED,dash:[12,10]});
  for(let i=0;i<6;i++){circ(250+i*300,GY+70+(i%2)*40,30+(i%3)*14,{ry:9+(i%3)*4,seed:2810+i,w:2.2});}
  txt('LANDING ON THE ANTI-MOON',CX,105,64,{k:writeK(t,98.5,'LANDING ON THE ANTI-MOON',32)});
  const boomT=105.93;
  const desc=eOut(P(t,99.0,104.4));const LY=lerp(-120,GY-160,desc);
  if(t<boomT){const s=1.25;lander(CX,LY,s);
    const ex=t>101.0?lerp(30,lerp(70,GY-(LY+44*s),P(t,103.2,104.1)),P(t,101.0,101.3)):0;
    if(ex>0){for(let i=-2;i<=2;i++){const fl=ex*(0.75+0.25*Math.sin(t*40+i));line(CX+i*7,LY+46*s,CX+i*14,LY+46*s+fl,2820+i,1,2.4,i%2?RED:INK);}}
    if(t>104.1){const R=rng(Math.floor(t*20));const n=Math.floor(lerp(2,10,P(t,104.1,105.9)));for(let i=0;i<n;i++){const px=CX+(R()-.5)*lerp(60,260,P(t,104.1,105.9));for(let j=0;j<5;j++){const b=-Math.PI*R();line(px,GY,px+Math.cos(b)*(10+R()*16),GY+Math.sin(b)*(10+R()*16),2830+i*5+j,1,2.2,RED);}}}
    txt('...SLOWLY...',1480,420,52,{k:writeK(t,101.9,'...SLOWLY...',16),a:1-P(t,103.0,103.2)});}
  else{const tl=t-boomT;greyFlash(CX,GY,tl,0.9);boom(CX,GY-40,tl,330,2840,{hold:0.9,fade:0.7});
    const R=rng(2850);for(let i=0;i<8;i++){const a=-Math.PI*(0.1+0.8*R()),sp=700+R()*600;const x=CX+Math.cos(a)*sp*tl,y=GY-120+Math.sin(a)*sp*tl+700*tl*tl;if(y>H+100)continue;ctx.save();ctx.translate(x,y);ctx.rotate(tl*(4+i));rect(-20,-12,40+i*4,24,2860+i,1,2.6);ctx.restore();}
    if(tl>1.6){const sm=cloudPath(CX,GY-40,200,90,2870);ctx.save();ctx.globalAlpha=clamp((tl-1.6)*3)*(1-P(t,110.8,111.3));fillPts(sm,'#e6e3ea');strokePts(wob(sm,2871,0.8),1,2.4,'#888');ctx.restore();}
    txt('LANDING: OVER',CX,330,84,{k:writeK(t,106.4,'LANDING: OVER',22),col:RED});}
  if(t>108.4){const q='"ONE SMALL STEP FOR MAN..."';const w=txt(q,CX,960,58,{k:writeK(t,108.47,q,12)});if(t>110.75)scribble(CX-(w||700)/2-10,960,(w||700)+20,40,2880,eOut(P(t,110.75,111.2)));}
}
// O 111.4-113.4: but that's not the worst part
function sO(t){const z=1+P(t,111.4,113.4)*0.08;ctx.translate(CX,CY);ctx.scale(z,z);ctx.translate(-CX,-CY);
  figure(CX,1020,POSES.chin,{s:2.2});txt("BUT THAT'S NOT THE WORST PART",CX,120,72,{k:writeK(t,111.5,"BUT THAT'S NOT THE WORST PART",26),col:RED});}
// P 113.4-128.0: anti-Moon falls into Earth -> 10^40 J
function sP(t){
  const EX=1450,EY=560,ER=250;const hitT=116.3;
  if(t<hitT+0.05){earth(EX,EY,ER,{seed:2901});const k=eIn(P(t,113.5,hitT));const mx=lerp(-200,EX-ER-110,k),my=lerp(300,EY-20,k);antiMoon(mx,my,110,{seed:2902});motionLines(mx-110,my,Math.atan2(EY-300,EX+200)*0.4,180,4,2903,1);
    txt('WHAT IF IT FELL INTO THE EARTH?',780,110,62,{k:writeK(t,113.46,'WHAT IF IT FELL INTO THE EARTH?',34)});}
  else{const tl=t-hitT;greyFlash(EX-ER,EY,tl,1.4);if(tl<1.3)boom(EX-ER,EY,tl,560,2910,{hold:0.8,fade:0.5});
    if(t>117.6){const k=pop(t,118.76,0.3);if(k>0){ctx.save();ctx.translate(CX,330);ctx.scale(k,k);sup('10','40',-110,0,220);txt('JOULES',40,30,96,{align:'left'});ctx.restore();}
      txt('IF ALL OF IT ANNIHILATED',CX,110,56,{k:writeK(t,117.0,'IF ALL OF IT ANNIHILATED',32)});}
    if(t>120.83){sunGlyph(520,740,80,t,{seed:2920});txt('MORE THAN THE SUN',520,920,48,{k:writeK(t,120.9,'MORE THAN THE SUN',30)});txt('IN 1,000,000 YEARS',520,985,56,{k:writeK(t,122.6,'IN 1,000,000 YEARS',30),col:RED});}
    if(t>124.44){earth(1400,740,90,{s:pop(t,124.5),seed:2930});if(t>126.57){strokePts(wob([[1360,660],[1400,720],[1380,780],[1420,830]],2931,1),eOut(P(t,126.57,126.9)),4,RED);}
      txt('60,000,000 x',1400,920,64,{k:writeK(t,124.72,'60,000,000 x',24),col:RED});txt('WHAT IT TAKES TO BLOW EARTH APART',1400,985,40,{k:writeK(t,126.1,'WHAT IT TAKES TO BLOW EARTH APART',40)});}
  }
}
// Q 128.0-133.0: blow it apart sixty million times over
function sQ(t){
  if(t<129.7){const tl=t-128.5;earth(CX,520,220,{seed:3001,s:1});if(tl>0){boom(CX,520,tl,300,3002,{hold:0.6,fade:0.4});}
    txt('NOT JUST ONCE...',CX,900,72,{k:writeK(t,128.14,'NOT JUST ONCE...',22)});return;}
  const lv=Math.min(4,Math.floor((t-129.74)/0.55));const n=[2,4,8,16,32][lv];const cell=Math.min(1700/ (n*16/9),760/n);
  const cols=Math.round(n*16/9),rows=n;const cw=1800/cols,ch=820/rows;const r=Math.min(cw,ch)*0.36;
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=60+cw*(i+0.5),y=60+ch*(j+0.5);const ph=((i*7+j*13)%10)/10;const tl=((t*1.6+ph)%1)*0.6;
    if(n<=8)earth(x,y,r,{seed:3010+(i*3+j)%7,simple:true,w:2.4});else{ctx.fillStyle=SEA;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=1.6;ctx.stroke();}
    if(n<=8)boom(x,y,tl,r*1.25,3100+i+j*40,{hold:0.25,fade:0.3});else if(tl<0.3){ctx.strokeStyle=RED;ctx.lineWidth=1.6;for(let q=0;q<6;q++){const a=q/6*TAU;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);ctx.lineTo(x+Math.cos(a)*r*1.6,y+Math.sin(a)*r*1.6);ctx.stroke();}}}
  const cnt=Math.round(Math.pow(10,lerp(0,Math.log10(6e7),P(t,129.8,132.1))));
  ctx.save();ctx.fillStyle=PAPER;ctx.fillRect(560,915,800,120);ctx.restore();rect(560,915,800,120,3200,1,LW);
  txt('x '+cnt.toLocaleString('en-US'),CX,975,84,{col:RED});
}
// R 133.0-140.1: let's review
function sR(t){
  figure(220,940,POSES.paper,{s:1.0});board(470,90,1360,700,1);
  txt("LET'S REVIEW:",1150,170,62,{k:writeK(t,133.5,"LET'S REVIEW:",24)});
  const Lx=830,Rx=1470,Y=400;
  protonBall(Lx,Y,115,{s:pop(t,134.55),pr:9});if(t>135.43)for(let i=0;i<12;i++){const a=i/12*TAU;line(Lx+Math.cos(a)*130,Y+Math.sin(a)*130,Lx+Math.cos(a)*165,Y+Math.sin(a)*165,3300+i,eOut(P(t,135.43,135.7)),3);}
  txt('PROTON MOON',Lx,570,50,{k:writeK(t,134.6,'PROTON MOON')});txt('BLOWS ITSELF APART',Lx,650,52,{k:writeK(t,135.43,'BLOWS ITSELF APART',30),col:RED});
  antiMoon(Rx,Y,115,{s:pop(t,136.96),seed:3310});
  txt('ANTIMATTER MOON',Rx,570,50,{k:writeK(t,137.2,'ANTIMATTER MOON',30)});txt('BLOWS US APART',Rx,650,52,{k:writeK(t,138.23,'BLOWS US APART',26),col:RED});
  if(t>138.6){earth(Rx+175,Y+90,40,{s:pop(t,138.6),seed:3320,simple:true});strokePts(wob([[Rx+165,Y+55],[Rx+180,Y+90],[Rx+170,Y+125]],3321,0.6),eOut(P(t,138.8,139.0)),3,RED);}
  line(CX+190,200,CX+190,700,3330,eOut(P(t,136.8,137.1)),2.2);
}
// S 140.1-147.5: keep the normal Moon + end card
function sS(t){
  if(t<144.7){const hug={la:[1.1,1.9],ra:[1.5,1.25],ll:[-0.26,-0.2],rl:[0.26,0.2],paper:0};
    moon(1060,600,220,{s:pop(t,140.15),seed:3401});figure(760,960,lerpPose(POSES.rest,hug,eOut(P(t,141.3,141.7))),{s:1.1});
    txt('MAYBE...',CX,110,68,{k:writeK(t,140.21,'MAYBE...',14)});
    txt('THE NORMAL MOON IS FINE',CX,200,72,{k:writeK(t,141.0,'THE NORMAL MOON IS FINE',30)});
    if(t>142.1){heart(1300,360,2.6+0.2*Math.sin(t*8));heart(1380,300,1.6+0.15*Math.sin(t*8+1));}
    const w=txt("LET'S KEEP IT",1500,880,84,{k:writeK(t,143.18,"LET'S KEEP IT",22),col:RED});if(t>143.9)check(1500+(w||420)/2+50,870,60,eOut(P(t,143.9,144.2)));
    return;}
  txt('WHAT IF THE MOON',CX,430,104,{k:writeK(t,144.8,'WHAT IF THE MOON',30)});
  txt('WERE MADE OF ANTIMATTER?',CX,570,104,{k:writeK(t,145.3,'WERE MADE OF ANTIMATTER?',34),col:RED});
  for(let i=0;i<5;i++){const fn=i%2?positron:antiproton;fn(CX-220+i*110,740,28,{s:pop(t,146.2+i*0.07),seed:3410+i});}
}
const SCENES=[[0,5.45,sA],[5.45,12.4,sB],[12.4,19.0,sC],[19.0,23.9,sD],[23.9,30.15,sE],[30.15,35.7,sF],[35.7,41.95,sG],[41.95,45.85,sH],[45.85,55.3,sI],[55.3,65.05,sJ],
  [65.05,81.0,sK],[81.0,83.6,sL],[83.6,98.15,sM],[98.15,111.4,sN],[111.4,113.4,sO],[113.4,128.0,sP],[128.0,133.0,sQ],[133.0,140.1,sR],[140.1,999,sS]];
const SHAKES=[[3.74,26,3.5],[50.99,14,6],[53.27,22,4],[63.0,6,8],[91.16,26,4],[105.93,40,3],[116.3,60,2],[128.5,16,4]];
function shake(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}
  if(t>129.74&&t<132.2){x+=nz(t*60,1)*5;y+=nz(t*55,2)*5;}return[x,y];}
function render(t){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let idx=SCENES.findIndex(s=>t>=s[0]&&t<s[1]);if(idx<0)idx=SCENES.length-1;
  const[sx,sy]=shake(t);ctx.save();ctx.translate(sx,sy);
  const st=SCENES[idx][0];const z=1+0.025*P(t,st,SCENES[idx][1]);ctx.translate(CX,CY);ctx.scale(z,z);ctx.translate(-CX,-CY);
  SCENES[idx][2](t);ctx.restore();
  const fi=1-P(t,0,0.3);const fo=P(t,DURATION-0.6,DURATION);const f=Math.max(fi*0,fo);if(f>0){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(246,244,248,${f})`;ctx.fillRect(0,0,W,H);}
}
window.render=render;window.DURATION=DURATION;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
