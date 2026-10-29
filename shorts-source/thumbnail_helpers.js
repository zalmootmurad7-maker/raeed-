// Phone-first covers: drawn on a 360x640 virtual canvas, scaled x3 -> every stroke ~10px at 1080x1920
function glow(c,b){ctx.shadowColor=c;ctx.shadowBlur=b;}function noGlow(){ctx.shadowBlur=0;ctx.shadowColor='transparent';}
function bar(x,y,w,h,seed,col='#ffe14a'){ctx.save();ctx.fillStyle=col;const R=rng(seed);ctx.beginPath();ctx.moveTo(x,y+R()*3);ctx.lineTo(x+w,y+R()*3);ctx.lineTo(x+w-2,y+h+R()*3);ctx.lineTo(x+2,y+h+R()*3);ctx.closePath();ctx.fill();ctx.restore();}
function shockFace(x,y,r){for(const sd of[-1,1]){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.12,r*0.26,0,TAU);ctx.fill();circ(x+sd*r*0.36,y-r*0.12,r*0.26,{seed:9000+sd,w:2});
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.08,r*0.11,0,TAU);ctx.fill();line(x+sd*r*0.12,y-r*0.66,x+sd*r*0.58,y-r*0.5,9010+sd,1,2.6);}
  ctx.fillStyle='#3a1414';ctx.beginPath();ctx.ellipse(x,y+r*0.45,r*0.2,r*0.27,0,0,TAU);ctx.fill();circ(x,y+r*0.45,r*0.2,{ry:r*0.27,seed:9020,w:2.2});}
function evilFace(x,y,r){for(const sd of[-1,1]){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x+sd*r*0.34,y-r*0.1,r*0.22,r*0.15,0,0,TAU);ctx.fill();circ(x+sd*r*0.34,y-r*0.1,r*0.22,{ry:r*0.15,seed:9030+sd,w:2,col:RED});
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.3,y-r*0.08,r*0.08,0,TAU);ctx.fill();line(x+sd*r*0.6,y-r*0.45,x+sd*r*0.1,y-r*0.28,9040+sd,1,3,RED);}
  const g=[];for(let i=0;i<=14;i++){const a=0.15*Math.PI+i/14*0.7*Math.PI;g.push([x+Math.cos(a)*r*0.5,y+r*0.08+Math.sin(a)*r*0.42]);}fillPts([...g,[x-r*0.45,y+r*0.25]],'#fff');strokePts(wob([...g,[x-r*0.45,y+r*0.25]],9050,0.4),1,2.6,RED);
  for(let i=-2;i<=2;i++)line(x+i*r*0.14,y+r*0.3,x+i*r*0.14,y+r*0.4+Math.cos(i*0.6)*r*0.08,9060+i,1,1.4,RED);}
const PANIC={la:[-2.0,2.79],ra:[2.0,-2.79],ll:[-0.3,-0.24],rl:[0.3,0.24],paper:0};
function evilMoon(x,y,r){antiMoon(x,y,r,{seed:4001});
  for(const sd of[-1,1]){const a=-Math.PI/2+sd*0.5;const bx=x+Math.cos(a)*r*0.92,by=y+Math.sin(a)*r*0.92;const pts=[[bx-sd*r*0.16,by+4],[bx+sd*r*0.12,by-r*0.42],[bx+sd*r*0.2,by+r*0.06]];fillPts(pts,PINK);strokePts(wob(pts,4010+sd,0.5),1,4,RED);}
  // angry eyes
  for(const sd of[-1,1]){ctx.fillStyle=PAPER;ctx.beginPath();ctx.ellipse(x+sd*r*0.32,y-r*0.05,r*0.17,r*0.13,0,0,TAU);ctx.fill();circ(x+sd*r*0.32,y-r*0.05,r*0.17,{ry:r*0.13,seed:4020+sd,w:3.4});
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.28,y-r*0.02,r*0.06,0,TAU);ctx.fill();line(x+sd*r*0.5,y-r*0.3,x+sd*r*0.12,y-r*0.18,4030+sd,1,5);}
  const m=[[x-r*0.25,y+r*0.38],[x,y+r*0.3],[x+r*0.25,y+r*0.38]];strokePts(wob(m,4040,0.6),1,4);}
