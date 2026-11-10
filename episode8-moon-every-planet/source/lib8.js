// ===== Ink & Atoms — Ep 8 "What If We Replaced the Moon With Other Planets?" — minimalist ink motion comic =====
// White paper, black ink, grey wash, ONE red (#D32F2F). Rendered at 12 fps (posterized); line boil steps at 8 fps.
const RED8='#D32F2F',G1='#E9E9E9',G2='#C8C8C8',G3='#9A9A9A',G4='#5E5E5E';
function white(){ctx.fillStyle='#FFFFFF';ctx.fillRect(-W,-H,W*3,H*3);}
function lbl(s,x,y,size,col=INK,o={}){return txt(s,x,y,size,{col,maxW:1760,stroke:Math.max(8,size*0.22),strokeCol:'#fff',...o});}
function lblR(s,x,y,size,o={}){return txt(s,x,y,size,{col:RED8,maxW:1760,stroke:Math.max(8,size*0.22),strokeCol:'#fff',...o});}
function stampL(s,x,y,size,col,t,t0){if(t<t0)return;const k=(t-t0)<1/12?1.25:1;ctx.save();ctx.translate(x,y);ctx.scale(k,k);txt(s,0,0,size,{col,maxW:1760,stroke:Math.max(8,size*0.22),strokeCol:'#fff'});ctx.restore();} // snappy: one oversized frame then rest
const STEP=(t,t0)=>t>=t0;                                         // stepped key: on/off, no easing
function snapZ(t,t0,z0,z1){return t<t0?z0:t<t0+1/12?(z0+z1)/2:z1;} // 1–2 frame snap zoom
function expZ(t,t0,t1,z0,z1){const u=clamp((t-t0)/(t1-t0));return z0*Math.pow(z1/z0,u);}
function camAt(z,fx,fy,ax=CX,ay=CY){ctx.translate(ax,ay);ctx.scale(z,z);ctx.translate(-fx,-fy);}
function badge(){ctx.save();ctx.globalAlpha=0.9;ell(78,74,46,46,{w:5,col:RED8,seed:9901,amp:1.2});txt('I&A',78,76,30,{col:RED8});ctx.restore();}
// ink planet: outline + features + hatched night side
function hatch(x,y,r,side=1,dens=14,col=G4,w=3){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();ctx.beginPath();ctx.ellipse(x+side*r*0.35,y,r*0.95,r*1.2,0,0,TAU);ctx.clip();
  ctx.strokeStyle=col;ctx.lineWidth=w;for(let i=-r*2;i<r*2;i+=dens){ctx.beginPath();ctx.moveTo(x+i,y-r*1.2);ctx.lineTo(x+i+r*0.9,y+r*1.2);ctx.stroke();}ctx.restore();}
function disc(x,y,r,{fill='#fff',w=7,col=INK,seed=1}={}){ell(x,y,r,r,{w,col,fill,seed,amp:Math.min(3,1+r/200)});}
function craters(x,y,r,n=7,seed=3){const R=rng(seed);for(let i=0;i<n;i++){const a=R()*TAU,d=R()*r*0.7,cr=r*(0.06+R()*0.12);ell(x+Math.cos(a)*d,y+Math.sin(a)*d,cr,cr,{w:Math.max(2,r/45),col:G4,seed:seed*10+i,amp:0.6});}}
function P_moon(x,y,r){disc(x,y,r,{fill:'#fff'});craters(x,y,r,6,11);hatch(x,y,r,1,Math.max(8,r/5));}
function P_ceres(x,y,r){disc(x,y,r,{fill:G1});craters(x,y,r,5,12);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-r*0.2,y-r*0.1,r*0.12,0,TAU);ctx.fill();hatch(x,y,r,1,Math.max(8,r/5));}
function P_pluto(x,y,r,red=true){disc(x,y,r,{fill:'#fff'});const hx=x-r*0.15,hy=y+r*0.1,s=r*0.42;ctx.save();ctx.beginPath();ctx.moveTo(hx,hy+s*0.9);
  ctx.bezierCurveTo(hx-s*1.4,hy-s*0.1,hx-s*0.6,hy-s*1.1,hx,hy-s*0.35);ctx.bezierCurveTo(hx+s*0.6,hy-s*1.1,hx+s*1.4,hy-s*0.1,hx,hy+s*0.9);ctx.fillStyle=red?'rgba(211,47,47,0.85)':G1;ctx.fill();ctx.lineWidth=Math.max(2,r/40);ctx.strokeStyle=INK;ctx.stroke();ctx.restore();hatch(x,y,r,1,Math.max(8,r/5));}
function P_mercury(x,y,r){disc(x,y,r,{fill:G1});craters(x,y,r,10,13);hatch(x,y,r,1,Math.max(8,r/5));}
function P_mars(x,y,r,canyon=true){disc(x,y,r,{fill:'rgba(211,47,47,0.75)'});if(canyon){poly([[x-r*0.75,y+r*0.05],[x-r*0.3,y+r*0.12],[x+r*0.1,y+r*0.05],[x+r*0.45,y+r*0.15]],{w:Math.max(3,r/18),col:INK,seed:701,amp:1});
  ell(x-r*0.55,y-r*0.35,r*0.1,r*0.1,{w:Math.max(2,r/40),col:INK,fill:G4,seed:702,amp:0.6});}ell(x,y-r*0.85,r*0.3,r*0.1,{w:0,fill:'#fff',seed:703});ell(x,y,r,r,{w:7,seed:704});hatch(x,y,r,1,Math.max(8,r/5),'rgba(60,0,0,0.55)');}
function P_venus(x,y,r){disc(x,y,r,{fill:'#fff'});for(let i=0;i<4;i++){const yy=y-r*0.6+i*r*0.38;poly(Array.from({length:12},(_,k)=>[x-r*0.85+k*r*0.155,yy+Math.sin(k*0.9+i)*r*0.06]),{w:Math.max(2,r/45),col:G3,seed:710+i,amp:0.8});}hatch(x,y,r,1,Math.max(8,r/5),G3);}
function P_earth(x,y,r,{night=false}={}){disc(x,y,r,{fill:'#fff'});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();ctx.fillStyle=G2;
  for(const[a,b,rx,ry,rt]of[[-0.35,-0.2,0.32,0.45,0.3],[0.3,0.25,0.25,0.35,-0.4],[0.1,-0.55,0.3,0.16,0.1],[-0.55,0.45,0.18,0.2,0.6]]){ctx.beginPath();ctx.ellipse(x+a*r,y+b*r,rx*r,ry*r,rt,0,TAU);ctx.fill();ctx.lineWidth=Math.max(2,r/60);ctx.strokeStyle=INK;ctx.stroke();}ctx.restore();
  hatch(x,y,r,1,Math.max(8,r/5));if(night){const R=rng(77);ctx.fillStyle=INK;for(let i=0;i<40;i++){const a=R()*TAU,d=R()*r*0.8,px=x+r*0.35+Math.cos(a)*d*0.5,py=y+Math.sin(a)*d;if(Math.hypot(px-x,py-y)<r*0.95){ctx.beginPath();ctx.arc(px,py,Math.max(2,r/90),0,TAU);ctx.fill();}}}}
function P_neptune(x,y,r){disc(x,y,r,{fill:G1});for(let i=0;i<3;i++){const yy=y-r*0.4+i*r*0.4;poly([[x-r*0.8,yy],[x-r*0.2,yy+r*0.04],[x+r*0.5,yy-r*0.03],[x+r*0.85,yy]],{w:Math.max(2,r/60),col:G3,seed:720+i,amp:1});}
  ell(x-r*0.2,y+r*0.15,r*0.16,r*0.08,{w:Math.max(2,r/60),fill:G4,seed:724,amp:1});hatch(x,y,r,1,Math.max(10,r/6));}
function P_uranus(x,y,r,tilt=Math.PI*98/180,rings=true){if(rings){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.strokeStyle=INK;ctx.lineWidth=Math.max(2,r/70);for(const k of[1.45,1.6]){ctx.beginPath();ctx.ellipse(0,0,r*k,r*k*0.12,0,0,TAU);ctx.stroke();}ctx.restore();}
  disc(x,y,r,{fill:G1});ctx.save();ctx.translate(x,y);ctx.rotate(tilt);line(-r*1.25,0,r*1.25,0,{w:Math.max(2,r/60),col:G4,seed:731,amp:0.5});ctx.restore();hatch(x,y,r,1,Math.max(10,r/6));}
function P_saturn(x,y,r,tilt=-0.18){const rr=[1.25,2.3];ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.strokeStyle=INK;ctx.lineWidth=Math.max(3,r/30);for(const k of[1.25,1.6,1.95,2.3]){ctx.beginPath();ctx.ellipse(0,0,r*k,r*k*0.28,0,Math.PI,TAU);ctx.stroke();}ctx.restore();
  disc(x,y,r,{fill:'#fff'});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();for(let i=0;i<5;i++){ctx.fillStyle=i%2?G1:G2;ctx.fillRect(x-r,y-r*0.7+i*r*0.3,2*r,r*0.12);}ctx.restore();ell(x,y,r,r,{w:Math.max(4,r/30),seed:741});hatch(x,y,r,1,Math.max(10,r/6));
  ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.strokeStyle=INK;ctx.lineWidth=Math.max(3,r/30);for(const k of[1.25,1.6,1.95,2.3]){ctx.beginPath();ctx.ellipse(0,0,r*k,r*k*0.28,0,0,Math.PI);ctx.stroke();}ctx.restore();}
function P_jupiter(x,y,r,spot=true){disc(x,y,r,{fill:'#fff'});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const B=[[-0.75,0.08,G2],[-0.5,0.12,G3],[-0.2,0.07,G2],[0.06,0.14,G3],[0.36,0.09,G2],[0.6,0.12,G3]];
  for(const[c,h,col]of B){ctx.fillStyle=col;ctx.beginPath();for(let i=0;i<=30;i++){const xx=x-r+i*r/15;ctx.lineTo(xx,y+c*r+Math.sin(i*0.8)*r*0.015);}for(let i=30;i>=0;i--){ctx.lineTo(x-r+i*r/15,y+(c+h)*r+Math.sin(i*0.9)*r*0.02);}ctx.closePath();ctx.fill();}ctx.restore();
  if(spot)ell(x+r*0.25,y+r*0.28,r*0.16,r*0.09,{w:Math.max(2,r/60),fill:RED8,seed:751,amp:1});ell(x,y,r,r,{w:Math.max(5,r/30),seed:752});hatch(x,y,r,1,Math.max(10,r/6));}
function P_sun(x,y,r){disc(x,y,r,{fill:'rgba(211,47,47,0.18)',col:RED8,w:Math.max(5,r/40)});for(let i=0;i<16;i++){const a=i/16*TAU;line(x+Math.cos(a)*r*1.08,y+Math.sin(a)*r*1.08,x+Math.cos(a)*r*(i%2?1.2:1.3),y+Math.sin(a)*r*(i%2?1.2:1.3),{w:Math.max(4,r/45),col:RED8,seed:760+i,amp:1});}}
const PL={moon:P_moon,ceres:P_ceres,pluto:P_pluto,mercury:P_mercury,mars:P_mars,venus:P_venus,earth:P_earth,neptune:P_neptune,uranus:P_uranus,saturn:P_saturn,jupiter:P_jupiter};
const SZ={moon:1,ceres:0.27,pluto:0.68,mercury:1.4,mars:1.95,venus:3.5,earth:3.67,neptune:14.2,uranus:14.6,saturn:33.5,jupiter:40.2};
// the sky window: hill, house, stick figure, a planet where the Moon was (true relative sizes, base Moon = r0 px)
function sky(t,name,{r0=34,px=1250,py=330,z=1,fx=CX,fy=CY,pose='point',mood='shock',moonGhost=true,stars=true,label=true}={}){white();ctx.save();camAt(z,fx,fy);
  if(stars){const R=rng(5);ctx.fillStyle=G3;for(let i=0;i<70;i++){const sx=R()*W*1.6-W*0.3,sy=R()*600-200;ctx.beginPath();ctx.arc(sx,sy,2,0,TAU);ctx.fill();}}
  const r=r0*SZ[name];if(moonGhost&&name!=='moon'){ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=G3;ctx.lineWidth=4;ctx.beginPath();ctx.arc(px-r-r0*1.6-30,py,r0,0,TAU);ctx.stroke();ctx.restore();if(label)lbl('OLD MOON',px-r-r0*1.6-30,py+r0+34,34,G4);}
  PL[name](px,py,r);
  poly([[-400,860],[200,830],[520,800],[760,835],[1100,860],[1500,850],[2400,870]],{w:7,seed:801,amp:3});
  ctx.fillStyle='#fff';ctx.fillRect(-400,868,3200,900);
  // house
  poly([[1500,852],[1500,740],[1590,680],[1680,740],[1680,852]],{w:6,seed:802});rrect(1560,770,50,50,4,{w:5,seed:803});
  stick(420,820,1.25,t,{pose,mood});ctx.restore();badge();}
// tide gauge: beach cross-section, building for scale, water level in metres (red line = new high tide)
function tide(t,h,{label='',t0=0,city=true}={}){white();const base=880,ppm=14;line(0,base,W,base,{w:6,seed:811});
  if(city){for(const[bx,bw,bh]of[[1180,120,300],[1320,90,190],[1430,140,420],[1600,100,250],[1720,130,340]]){rrect(bx,base-bh,bw,bh,4,{w:5,fill:'#fff',seed:812+bx});for(let yy=base-bh+24;yy<base-20;yy+=42)for(let xx=bx+16;xx<bx+bw-20;xx+=34)ctx.strokeRect(xx,yy,16,22);}}
  stick(980,base,1.05,t,{pose:'up',mood:'shock'});
  const k=t0?clamp((t-t0)/1.2):1,lev=base-Math.min(h,60)*ppm*k;ctx.save();ctx.fillStyle='rgba(150,150,150,0.35)';ctx.fillRect(0,lev,W,base-lev);ctx.restore();
  poly(Array.from({length:40},(_,i)=>[i*50,lev+Math.sin(i*1.3+t*6)*6]),{w:6,col:RED8,seed:813,amp:1});
  line(0,base-0.5*ppm,700,base-0.5*ppm,{w:4,col:G4,seed:814});lbl('TODAY ~0.5 M',350,base-0.5*ppm+40,40,G4);
  if(label)lblR(label,560,lev-50,70);badge();}
