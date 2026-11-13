// ===== Ink & Atoms — Episode 9: What If Earth Had Rings Like Saturn? (16:9, Event Horizon look) =====
const SKYN='#070A18',ROCK='#bfae92';
function jupC(x,y,r,t,{spot=true,glowA=0.35}={}){glow(x,y,r*1.5,'rgba(255,190,120,'+glowA+')',1);ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();
  const g=ctx.createLinearGradient(0,y-r,0,y+r);g.addColorStop(0,'#F2E3C6');g.addColorStop(1,'#D9B98C');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);
  for(const[c,h,col]of[[-0.78,0.07,'#C9A27A'],[-0.52,0.12,'#B07A52'],[-0.25,0.06,'#E8D3B0'],[0.02,0.15,'#A86E48'],[0.32,0.08,'#C9A27A'],[0.55,0.12,'#B5845C'],[0.8,0.08,'#C9A27A']]){ctx.fillStyle=col;ctx.fillRect(x-r,y+c*r,2*r,h*r);}
  if(spot){ctx.fillStyle='#D2382C';ctx.beginPath();ctx.ellipse(x+r*0.28,y+r*0.26,r*0.17,r*0.1,0,0,TAU);ctx.fill();}
  const sh=ctx.createRadialGradient(x-r*0.4,y-r*0.35,r*0.2,x,y,r*1.05);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,0.5)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();
  ell(x,y,r,r,{w:6,col:INK,seed:7801,amp:2});}
function satC(x,y,r,t,{tilt=-0.26,glowA=0.3,flat=0.24,shadow=0,night=0}={}){glow(x,y,r*2.2,'rgba(255,220,150,'+glowA+')',1);
  const B=[[1.28,1.50,'rgba(150,130,100,0.75)'],[1.52,1.94,'#EADCB6'],[1.94,2.03,'#2a2418'],[2.03,2.30,'#D3BE8E']];
  function half(front){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);for(const[a,b,col]of B)band(a*r,b*r,flat,front,col);
    ctx.strokeStyle=INK;ctx.lineWidth=5;for(const f of[1.28,2.30]){ctx.beginPath();ctx.ellipse(0,0,f*r,f*r*flat,0,front?0:Math.PI,front?Math.PI:TAU);ctx.stroke();}ctx.restore();}
  half(false);ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const g=ctx.createLinearGradient(0,y-r,0,y+r);g.addColorStop(0,'#F5E7C4');g.addColorStop(1,'#D3B074');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);
  ctx.translate(x,y);ctx.rotate(tilt);for(const[c,h,col]of[[-0.62,0.10,'#E6CF9C'],[-0.3,0.14,'#CDAA70'],[0.05,0.08,'#EBD9AE'],[0.3,0.16,'#C29D63'],[0.62,0.1,'#D9BE88']]){ctx.fillStyle=col;ctx.fillRect(-r*1.2,c*r,r*2.4,h*r);}
  if(shadow>0){ctx.fillStyle=`rgba(10,8,5,${0.75*shadow})`;ctx.fillRect(-r*1.2,-r*0.62,r*2.4,r*0.34);}ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const sh=ctx.createRadialGradient(x-r*0.4,y-r*0.35,r*0.2,x,y,r*1.05);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,0.5)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);
  if(night>0){ctx.fillStyle=`rgba(5,6,15,${0.85})`;ctx.beginPath();ctx.arc(x+r*0.55,y,r*1.05,0,TAU);ctx.fill();ctx.fillStyle=`rgba(234,220,182,${0.35*night})`;ctx.beginPath();ctx.arc(x+r*0.55,y,r*1.05,0,TAU);ctx.fill();}ctx.restore();
  ell(x,y,r,r,{w:6,col:INK,seed:8801,amp:2});half(true);}
// filled half-annulus of a flattened ring, in the current (rotated) frame
function band(rIn,rOut,flat,front,col){ctx.beginPath();ctx.ellipse(0,0,rOut,rOut*flat,0,front?0:Math.PI,front?Math.PI:TAU);ctx.ellipse(0,0,rIn,rIn*flat,0,front?Math.PI:TAU,front?0:Math.PI,true);ctx.closePath();ctx.fillStyle=col;ctx.fill();}
const RB=[[1.31,1.62,'rgba(140,128,110,0.9)'],[1.62,2.16,'#d9cdb5'],[2.16,2.26,'rgba(45,40,33,0.95)'],[2.26,2.89,'#b9a98d']];
const RDOTS=(()=>{const R=rng(19),a=[];for(let i=0;i<170;i++)a.push([1.33+R()*1.54,R()*TAU,0.7+R()*1.6,R()]);return a;})();
function ringHalf(x,y,r,t,{tilt=-0.2,flat=0.2,a=1,front,lit=1}={}){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(tilt);
  for(const[a0,b0,col]of RB)band(a0*r,b0*r,flat,front,col);
  for(const[f,th0,s,c]of RDOTS){const th=th0+t*(0.35/Math.pow(f,1.5));const yy=Math.sin(th);if(front?yy<0:yy>0)continue;ctx.fillStyle=c<0.5?'rgba(80,70,58,0.8)':'rgba(255,248,230,0.85)';ctx.beginPath();ctx.arc(Math.cos(th)*f*r,yy*f*r*flat,s*Math.max(1,r/180),0,TAU);ctx.fill();}
  if(lit<1){ctx.fillStyle=`rgba(0,0,0,${1-lit})`;band(1.3*r,2.9*r,flat,front,`rgba(0,0,0,${1-lit})`);}
  ctx.strokeStyle=INK;ctx.lineWidth=4;for(const f of[1.31,2.89]){ctx.beginPath();ctx.ellipse(0,0,f*r,f*r*flat,0,front?0:Math.PI,front?Math.PI:TAU);ctx.stroke();}ctx.restore();}
function earthR(x,y,r,t,o={}){glow(x,y,r*1.6,'rgba(120,170,255,0.25)',1);ringHalf(x,y,r,t,{...o,front:false});earth(x,y,r,{seed:o.seed||80});
  ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const sh=ctx.createRadialGradient(x-r*0.4,y-r*0.4,r*0.3,x,y,r*1.05);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,10,0.55)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();
  ringHalf(x,y,r,t,{...o,front:true});}
function earthS(x,y,r,{seed=80,ice=0,young=0}={}){glow(x,y,r*1.5,'rgba(120,170,255,0.22)',1);if(young>0){ell(x,y,r,r,{w:6,col:INK,fill:'#B8442A',seed});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const R=rng(seed);for(let i=0;i<9;i++){ctx.fillStyle='rgba(255,170,60,0.7)';ctx.beginPath();ctx.ellipse(x+(R()-.5)*r*1.6,y+(R()-.5)*r*1.6,r*0.2,r*0.08,R()*3,0,TAU);ctx.fill();}ctx.restore();ell(x,y,r,r,{w:6,col:INK,seed});return;}
  earth(x,y,r,{seed});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();if(ice>0){ctx.fillStyle=`rgba(245,250,255,${0.92})`;ctx.fillRect(x-r,y-r,2*r,r*0.9*ice);ctx.fillRect(x-r,y+r-r*0.9*ice,2*r,r*0.9*ice);}
  const sh=ctx.createRadialGradient(x-r*0.4,y-r*0.4,r*0.3,x,y,r*1.05);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,10,0.55)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();ell(x,y,r,r,{w:6,col:INK,seed});}
function moonC(x,y,r,{crack=0,a=1}={}){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;glow(x,y,r*2.2,'rgba(255,255,255,0.35)',1);ell(x,y,r,r,{w:5,col:INK,fill:'#E9E9EF',seed:9101,amp:1.5});
  ctx.fillStyle='rgba(0,0,0,0.13)';for(const[dx,dy,rr]of[[-0.3,-0.2,0.2],[0.25,0.15,0.16],[-0.05,0.35,0.12],[0.35,-0.35,0.1]]){ctx.beginPath();ctx.arc(x+dx*r,y+dy*r,rr*r,0,TAU);ctx.fill();}
  if(crack>0){const C=[[[0,0],[-0.3,-0.2],[-0.55,-0.5],[-0.9,-0.45]],[[0,0],[0.25,-0.3],[0.4,-0.7],[0.3,-0.95]],[[0,0],[0.35,0.15],[0.7,0.1],[0.98,0.2]],[[0,0],[-0.1,0.4],[-0.35,0.7],[-0.4,0.92]],[[0,0],[0.2,0.5],[0.5,0.8]]];
    for(const c of C)poly(c.map(([u,v])=>[x+u*r,y+v*r]),{w:Math.max(4,r*0.04),col:RED,seed:9102,amp:1,k:crack});glow(x,y,r*0.5*crack,'rgba(255,90,60,0.6)',1);}
  ctx.restore();}
const FR=(()=>{const R=rng(23),a=[];for(let i=0;i<26;i++){const th=R()*TAU,d=R()*0.6;const pts=[];const n=5+Math.floor(R()*3);for(let j=0;j<n;j++){const q=j/n*TAU;pts.push([Math.cos(q)*(0.18+R()*0.12),Math.sin(q)*(0.18+R()*0.12)]);}a.push([Math.cos(th)*d,Math.sin(th)*d,th,0.5+R(),pts,R()*6]);}return a;})();
function fragments(x,y,r,k,t){for(const[u,v,th,sp,pts,rot]of FR){const dd=k*sp*1.8;const px=x+(u+Math.cos(th)*dd)*r,py=y+(v+Math.sin(th)*dd)*r;ctx.save();ctx.translate(px,py);ctx.rotate(rot+k*sp*3);
  poly(pts.map(([a,b])=>[a*r*0.9,b*r*0.9]),{w:4,col:INK,fill:'#D9D9E2',close:true,seed:9110,amp:1});ctx.restore();}}
function rock(x,y,s,seed,{col='#9a8f80'}={}){const R=rng(seed);const pts=[];for(let j=0;j<7;j++){const q=j/7*TAU;pts.push([x+Math.cos(q)*s*(0.7+R()*0.5),y+Math.sin(q)*s*(0.7+R()*0.5)]);}poly(pts,{w:Math.max(3,s*0.12),col:INK,fill:col,close:true,seed,amp:1});}
function rocket(x,y,s,t,{ang=-Math.PI/2,flame=1}={}){ctx.save();ctx.translate(x,y);ctx.rotate(ang+Math.PI/2);ctx.scale(s,s);
  if(flame>0){const f=1+0.25*Math.sin(t*40);poly([[-24,90],[0,90+110*f*flame],[24,90]],{w:5,col:'#E8A400',fill:GOLD,close:true,seed:9201});}
  poly([[-36,90],[-36,-60],[0,-140],[36,-60],[36,90]],{w:7,col:INK,fill:'#F4F4F8',close:true,seed:9202});poly([[0,-140],[-30,-75],[30,-75]],{w:6,col:INK,fill:RED,close:true,seed:9203});
  for(const sx of[-1,1])poly([[sx*36,40],[sx*76,110],[sx*36,90]],{w:6,col:INK,fill:RED,close:true,seed:9204+sx});ell(0,-20,16,16,{w:5,col:INK,fill:'#9cc8ef',seed:9206});ctx.restore();}
function sky(top='#0b1230',bot='#26355e'){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(1,bot);ctx.fillStyle=g;ctx.fillRect(-W,-H,W*3,H*3);
  for(const[x,y,r,ph]of STARS.slice(0,140)){ctx.fillStyle=`rgba(255,255,255,${0.25+0.25*Math.sin(ph)})`;ctx.fillRect(x*1.8,y*0.55,1.6,1.6);}}
// glowing ring arch over the ground: upper half-annulus centred on the horizon
function arch(t,{hy=860,rx=1150,ry=700,th=150,a=1,gap=0,gapW=260,flatTop=1,col=[246,226,182]}={}){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;
  const rin=rx-th*1.6,ryin=ry-th;glow(CX,hy-ry*0.75,rx*1.0,`rgba(255,225,170,0.28)`,1);ctx.save();ctx.shadowColor='rgba(255,220,160,0.9)';ctx.shadowBlur=40;ctx.strokeStyle='rgba(255,230,190,0.6)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(CX,hy,rx,ry,0,Math.PI,TAU);ctx.stroke();ctx.restore();
  ctx.beginPath();ctx.ellipse(CX,hy,rx,ry,0,Math.PI,TAU);ctx.ellipse(CX,hy,rin,ryin,0,TAU,Math.PI,true);ctx.closePath();
  const g=ctx.createLinearGradient(0,hy-ry,0,hy);g.addColorStop(0,`rgba(${col[0]},${col[1]},${col[2]},0.95)`);g.addColorStop(1,`rgba(${col[0]-30},${col[1]-30},${col[2]-30},0.75)`);ctx.fillStyle=g;ctx.fill();
  ctx.save();ctx.clip();for(let i=1;i<6;i++){const f=i/6;ctx.strokeStyle=i===3?'rgba(40,35,30,0.55)':'rgba(120,105,85,0.35)';ctx.lineWidth=i===3?th*0.06:3;ctx.beginPath();ctx.ellipse(CX,hy,lerp(rin,rx,f),lerp(ryin,ry,f),0,Math.PI,TAU);ctx.stroke();}
  {const R=rng(3);for(let i=0;i<260;i++){const q=Math.PI+R()*Math.PI,f=R();const x=CX+Math.cos(q)*lerp(rin,rx,f),y=hy+Math.sin(q)*lerp(ryin,ry,f);ctx.fillStyle=R()<0.5?'rgba(90,75,55,0.55)':'rgba(255,250,235,0.8)';ctx.fillRect(x,y,3+R()*4,3+R()*4);}}
  if(gap>0){ctx.fillStyle=`rgba(3,4,10,${0.95*gap})`;ctx.fillRect(CX-gapW/2,0,gapW,hy);}ctx.restore();
  ctx.strokeStyle='rgba(20,18,15,0.9)';ctx.lineWidth=4;for(const[a1,b1]of[[rx,ry],[rin,ryin]]){ctx.beginPath();ctx.ellipse(CX,hy,a1,b1,0,Math.PI,TAU);ctx.stroke();}ctx.restore();}
const BLD=(()=>{const R=rng(31),a=[];let x=-40;while(x<W+60){const w=60+R()*110,h=60+R()*230;a.push([x,w,h,R()]);x+=w+R()*14;}return a;})();
function city(hy,t,{lit=1,snow=0,col='#0b0d18'}={}){for(const[x,w,h,r]of BLD){ctx.fillStyle=col;ctx.fillRect(x,hy-h,w,h+300);ctx.strokeStyle='rgba(160,170,210,0.35)';ctx.lineWidth=3;ctx.strokeRect(x,hy-h,w,h+300);
  if(snow>0){ctx.fillStyle='rgba(240,245,255,0.9)';ctx.fillRect(x-2,hy-h-8,w+4,10);}
  if(lit>0){const R=rng(Math.floor(x));for(let yy=hy-h+18;yy<hy-10;yy+=30)for(let xx=x+10;xx<x+w-14;xx+=24)if(R()<0.45){ctx.fillStyle=`rgba(255,214,120,${0.75*lit})`;ctx.fillRect(xx,yy,10,14);}}}
  ctx.fillStyle=col;ctx.fillRect(-W,hy,W*3,H);}
function snowGround(hy){ctx.fillStyle='#dfe8f5';ctx.beginPath();ctx.moveTo(-50,hy);for(let x=-50;x<=W+50;x+=60)ctx.lineTo(x,hy-30*Math.sin(x*0.004)-12*Math.sin(x*0.013));ctx.lineTo(W+50,H+50);ctx.lineTo(-50,H+50);ctx.closePath();ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.stroke();}
function sunDisk(x,y,r,t,a=1){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;glow(x,y,r*3,'rgba(255,215,0,0.5)',1);ell(x,y,r,r,{w:5,col:'#E8A400',fill:GOLD,seed:9301,amp:1});ctx.restore();}
function cap(s,y=95,size=92,col=WHITE){TX(s,CX,y,size,col);}
function chip(s,x,y,size,col,t,t0){if(t<t0)return;const k=pop(t,t0,0.22);ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.font=`${size}px "PH"`;const w=ctx.measureText(s).width;
  rrect(-w/2-26,-size*0.62,w+52,size*1.24,18,{w:5,col:'#cfd6ea',fill:'rgba(8,10,22,0.88)',seed:9401,amp:1});TX(s,0,4,size,col);ctx.restore();}
function redArrow(x1,y1,x2,y2,t,t0,d=0.35){if(t<t0)return;const k=eOut(P(t,t0,t0+d));arrow(x1,y1,lerp(x1,x2,k),lerp(y1,y2,k),{col:RED,w:9,head:30,seed:9501});}
function dim(a){if(a>0){ctx.fillStyle=`rgba(0,0,0,${a})`;ctx.fillRect(-W,-H,W*3,H*3);}}
