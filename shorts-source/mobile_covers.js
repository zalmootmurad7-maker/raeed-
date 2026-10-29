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
function cover(kind){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);ctx.scale(3,3);const t=1.2;
  if(kind==='twin'){
    bar(18,28,324,178,11);txt('EVIL',180,78,100,{col:RED});txt('TWIN',180,160,100,{col:RED});
    // red danger glow behind the twin
    const g=ctx.createRadialGradient(262,400,10,262,400,190);g.addColorStop(0,'rgba(255,40,30,0.55)');g.addColorStop(1,'rgba(255,40,30,0)');ctx.fillStyle=g;ctx.fillRect(60,220,300,420);
    mirrorFrame(180,232,640,1);
    figure(92,650,PANIC,{s:1.25,seed:9100});shockFace(92,650-264*1.25,38*1.25);
    glow('rgba(255,30,20,0.9)',40);figure(268,650,mirrorPose(POSES.point),{s:1.25,seed:9110});noGlow();horns(268,650,1.25,1);evilFace(268,650-264*1.25,38*1.25);
  }else if(kind==='eclipse'){
    txt('NO MORE',180,68,84,{});bar(12,112,336,96,13);txt('ECLIPSES',180,160,92,{col:RED});
    const X=180,Y=375,R=128;
    glow('rgba(255,170,0,1)',90);for(let i=0;i<28;i++){const a=i/28*TAU;const l=R*(1.28+0.22*Math.sin(i*3.7));line(X+Math.cos(a)*R*1.04,Y+Math.sin(a)*R*1.04,X+Math.cos(a)*l,Y+Math.sin(a)*l,9200+i,1,3.4,'#ffb300');}
    ctx.fillStyle='#ffd34d';ctx.beginPath();ctx.arc(X,Y,R*1.1,0,TAU);ctx.fill();noGlow();
    ctx.fillStyle='#0b0b0f';ctx.beginPath();ctx.arc(X,Y,R,0,TAU);ctx.fill();
    line(X-R*1.15,Y-R*1.15,X+R*1.15,Y+R*1.15,9230,1,10,RED);line(X+R*1.15,Y-R*1.15,X-R*1.15,Y+R*1.15,9231,1,10,RED);
    figure(70,655,PANIC,{s:0.95,seed:9240});shockFace(70,655-264*0.95,38*0.95);
  }else{ // colder than space
    txt('COLDER',180,76,104,{col:'#1764c4'});bar(14,118,332,90,15);txt('THAN SPACE',180,162,68,{});
    const X=190,Y=385,R=92;
    glow('rgba(80,200,255,1)',90);ctx.strokeStyle='#7fd8ff';ctx.lineWidth=6;ctx.beginPath();ctx.arc(X,Y,R*1.18,0,TAU);ctx.stroke();noGlow();
    for(let i=0;i<16;i++){const a=i/16*TAU;const l=R*(1.35+0.25*((i*7)%3)/2);line(X+Math.cos(a)*R*1.22,Y+Math.sin(a)*R*1.22,X+Math.cos(a)*l,Y+Math.sin(a)*l,9300+i,1,3,'#3fb5f0');}
    ctx.fillStyle='#050508';ctx.beginPath();ctx.arc(X,Y,R,0,TAU);ctx.fill();
    for(const[sx,sy]of[[300,260],[60,330],[320,520],[120,240]]){for(let k=0;k<3;k++){const a=k/3*Math.PI;line(sx-Math.cos(a)*12,sy-Math.sin(a)*12,sx+Math.cos(a)*12,sy+Math.sin(a)*12,9320+k+sx,1,2.4,'#3fb5f0');}}
    figure(70,655,POSES.chin,{s:0.95,seed:9340});shockFace(70,655-264*0.95,38*0.95);shakeMarks(70,655-264*0.95,40,9350,1);
  }
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>cover(window.KIND));
</script></body></html>
