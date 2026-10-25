function hl(x,y,w,h,seed){ctx.save();ctx.globalAlpha=0.9;ctx.fillStyle='#ffe066';const R=rng(seed);ctx.beginPath();ctx.moveTo(x,y+R()*6);ctx.lineTo(x+w,y+R()*6);ctx.lineTo(x+w-4,y+h+R()*6);ctx.lineTo(x+4,y+h+R()*6);ctx.closePath();ctx.fill();ctx.restore();}
function evilMoon(x,y,r){antiMoon(x,y,r,{seed:4001});
  for(const sd of[-1,1]){const a=-Math.PI/2+sd*0.5;const bx=x+Math.cos(a)*r*0.92,by=y+Math.sin(a)*r*0.92;const pts=[[bx-sd*r*0.16,by+4],[bx+sd*r*0.12,by-r*0.42],[bx+sd*r*0.2,by+r*0.06]];fillPts(pts,PINK);strokePts(wob(pts,4010+sd,0.5),1,4,RED);}
  // angry eyes
  for(const sd of[-1,1]){ctx.fillStyle=PAPER;ctx.beginPath();ctx.ellipse(x+sd*r*0.32,y-r*0.05,r*0.17,r*0.13,0,0,TAU);ctx.fill();circ(x+sd*r*0.32,y-r*0.05,r*0.17,{ry:r*0.13,seed:4020+sd,w:3.4});
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.28,y-r*0.02,r*0.06,0,TAU);ctx.fill();line(x+sd*r*0.5,y-r*0.3,x+sd*r*0.12,y-r*0.18,4030+sd,1,5);}
  const m=[[x-r*0.25,y+r*0.38],[x,y+r*0.3],[x+r*0.25,y+r*0.38]];strokePts(wob(m,4040,0.6),1,4);}
function drawThumb(kind){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);const S=1.6;ctx.scale(S,S);
  if(kind==='yt'){ // 1200x675
    txt('THE MOON',320,150,104);txt('MADE OF',320,265,104);hl(25,330,600,130,3);txt('ANTIMATTER?',325,395,122,{col:RED});
    earth(1040,545,105,{seed:4101});txt('!!!',1080,400,56,{col:RED,rot:0.1});
    const mx=840,my=255;for(let i=0;i<4;i++){const o=(i-1.5)*34;line(mx-150+o*0.4,my-120+o,mx-300+o*0.4,my-220+o,4110+i,1,3.4);}
    evilMoon(mx,my,158);
    const bx=930,by=420;for(let i=0;i<12;i++){const a=i/12*TAU;line(bx+Math.cos(a)*22,by+Math.sin(a)*22,bx+Math.cos(a)*48,by+Math.sin(a)*48,4120+i,1,3.4,RED);}
    ctx.save();ctx.translate(250,590);ctx.rotate(-0.04);sup('10','40',0,0,74);ctx.restore();txt('JOULES',318,602,50,{col:RED,align:'left'});
  }else if(kind==='r1'){ // 675x1200
    txt('1 GRAM OF',337,215,96);hl(70,280,535,120,5);txt('ANTIMATTER',337,340,104,{col:RED});
    cube(337,545,2.6,true,{seed:4201});txt('=',337,720,110);
    for(let i=0;i<3;i++)mushroom(125+i*212,1000,0.95,4210+i*10);
    txt('3 HIROSHIMAS',337,1085,96,{col:RED});
  }else{ // r2 675x1200
    txt('ANTI-MOON',337,180,100,{col:RED});txt('VS EARTH',337,285,100);
    earth(337,870,160,{seed:4302});evilMoon(337,530,120);
    boom(337,700,1,115,4310,{hold:5});
    ctx.save();ctx.translate(290,1090);sup('10','40',0,0,96);ctx.restore();txt('JOULES',430,1100,64,{col:RED});
  }
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawThumb(window.KIND));
</script></body></html>
