function bar(x,y,w,h,seed){ctx.save();ctx.fillStyle='#ffe14a';const R=rng(seed);ctx.beginPath();ctx.moveTo(x,y+R()*3);ctx.lineTo(x+w,y+R()*3);ctx.lineTo(x+w-2,y+h+R()*3);ctx.lineTo(x+2,y+h+R()*3);ctx.closePath();ctx.fill();ctx.restore();}
function shockFace(x,y,r){for(const sd of[-1,1]){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.12,r*0.26,0,TAU);ctx.fill();circ(x+sd*r*0.36,y-r*0.12,r*0.26,{seed:9000+sd,w:2});
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.08,r*0.11,0,TAU);ctx.fill();line(x+sd*r*0.12,y-r*0.66,x+sd*r*0.58,y-r*0.5,9010+sd,1,2.6);}
  ctx.fillStyle='#3a1414';ctx.beginPath();ctx.ellipse(x,y+r*0.45,r*0.2,r*0.27,0,0,TAU);ctx.fill();circ(x,y+r*0.45,r*0.2,{ry:r*0.27,seed:9020,w:2.2});}
const PANIC={la:[-2.0,2.79],ra:[2.0,-2.79],ll:[-0.3,-0.24],rl:[0.3,0.24],paper:0};
function panic(x,y,s,seed){figure(x,y,PANIC,{s,seed});shockFace(x,y-264*s,38*s);}
function darkCity(x0,y0,w,h,seed){ctx.fillStyle=NIGHT;ctx.fillRect(x0,y0,w,h);const R=rng(seed);let x=x0+10;while(x<x0+w-30){const bw=34+R()*40,bh=60+R()*(h*0.55);ctx.fillStyle='#3d3c4a';ctx.fillRect(x,y0+h-bh,bw,bh);for(let r=0;r<bh/22-1;r++)for(let c=0;c<bw/16-1;c++){ctx.fillStyle='#2a2934';ctx.fillRect(x+6+c*16,y0+h-bh+8+r*22,8,10);}x+=bw+6;}rect(x0,y0,w,h,seed+1,1,LW);}
function drawT(k){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);ctx.scale(3,3);const t=1.2;
  if(k==='L1'){ // THE LAST LIGHT (16:9 640x360)
    darkCity(150,110,480,240,9101);exitSign(420,215,0.62,1,t,{});
    bar(16,10,430,86,9102);txt('THE LAST LIGHT',231,55,74,{col:RED});
    panic(85,400,1.0,9103);}
  else if(k==='L2'){ // NOBODY HOME: glowing ISS above dark Earth
    ctx.fillStyle=NIGHT;ctx.fillRect(150,100,480,250);rect(150,100,480,250,9201,1,LW);
    ctx.save();ctx.beginPath();ctx.rect(150,100,480,250);ctx.clip();ctx.beginPath();ctx.arc(390,900,600,0,TAU);ctx.fillStyle='#14131a';ctx.fill();ctx.restore();
    iss(400,210,0.48,t,true);bar(16,10,400,86,9202);txt('NOBODY HOME',216,55,74,{col:RED});panic(85,400,1.0,9203);}
  else if(k==='L3'){ // MAYBE NEVER: light rings leaving dark Earth
    ctx.fillStyle=NIGHT;ctx.fillRect(150,100,480,250);rect(150,100,480,250,9301,1,LW);
    ctx.save();ctx.beginPath();ctx.rect(150,100,480,250);ctx.clip();softGlow(420,230,160,'rgba(255,216,74,0.55)',1);for(let i=0;i<4;i++){ctx.strokeStyle=WIN;ctx.globalAlpha=0.9-i*0.2;ctx.lineWidth=4;ctx.beginPath();ctx.arc(420,230,70+i*45,0,TAU);ctx.stroke();}ctx.restore();
    earth(420,230,52,{seed:9302,simple:true,w:3.4});bar(16,10,440,86,9303);txt('NEVER GOES OUT?',236,55,58,{col:RED});panic(85,400,1.0,9304);}
  else if(k==='L4'){ // minimal: the vacuum
    ctx.fillStyle='#fbfbfd';ctx.fillRect(0,0,640,360);txt('STILL CLEANING.',220,58,70,{});
    line(0,280,640,280,9401,1,LW);vacuum(230,300,1.4,t);ctx.save();cam(0.8,500,280);dock(500,280,false);ctx.restore();
    txt('(DEAD DOCK)',500,150,36,{col:RED});arrow(500,170,500,205,{seed:9402,col:RED,w:3,head:10});}
  // ---- 9:16 covers (360x640) ----
  else if(k==='C1'){ctx.fillStyle=NIGHT;ctx.fillRect(10,190,340,290);rect(10,190,340,290,9501,1,LW);ctx.save();ctx.beginPath();ctx.rect(10,190,340,290);ctx.clip();ctx.beginPath();ctx.arc(180,860,500,0,TAU);ctx.fillStyle='#14131a';ctx.fill();ctx.restore();
    iss(185,320,0.5,t,true);bar(14,20,332,150,9502);txt('NOBODY',180,62,84,{col:RED});txt('HOME',180,136,84,{col:RED});panic(110,860,1.15,9503);}
  else if(k==='C2'){ctx.fillStyle=NIGHT;ctx.fillRect(10,190,340,290);rect(10,190,340,290,9601,1,LW);exitSign(180,330,0.78,1,t,{});
    bar(14,20,332,150,9602);txt('50 YEARS',180,62,84,{col:RED});txt('NO POWER',180,136,74,{});panic(110,860,1.15,9603);}
  else if(k==='C3'){line(0,470,360,470,9701,1,LW);vacuum(150,500,1.6,t);ctx.save();cam(1.4,300,500);dock(300,500,false);ctx.restore();
    bar(14,20,332,150,9702);txt('STILL',180,62,84,{col:RED});txt('CLEANING',180,136,80,{col:RED});
    circ(180,300,50,{seed:9703,w:4,fill:'#fff'});line(180,300,180,265,9704,1,5);line(180,300,205,300,9705,1,5);txt('9:00 AM',180,375,34,{});}
  else {ctx.fillStyle=NIGHT;ctx.fillRect(10,190,340,290);rect(10,190,340,290,9801,1,LW);ctx.save();ctx.beginPath();ctx.rect(10,190,340,290);ctx.clip();softGlow(180,335,160,'rgba(255,216,74,0.55)',1);for(let i=0;i<4;i++){ctx.strokeStyle=WIN;ctx.globalAlpha=0.9-i*0.2;ctx.lineWidth=4;ctx.beginPath();ctx.arc(180,335,62+i*40,0,TAU);ctx.stroke();}ctx.restore();
    earth(180,335,46,{seed:9802,simple:true,w:3.4});bar(14,20,332,150,9803);txt('MAYBE',180,62,90,{col:RED});txt('NEVER',180,136,90,{col:RED});panic(110,860,1.15,9804);}
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawT(window.KIND));
</script></body></html>
