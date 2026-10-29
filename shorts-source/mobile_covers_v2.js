function glassesFace(x,y,r){ctx.fillStyle='#111';ctx.beginPath();ctx.roundRect(x-r*0.72,y-r*0.36,r*0.62,r*0.38,r*0.12);ctx.roundRect(x+r*0.1,y-r*0.36,r*0.62,r*0.38,r*0.12);ctx.fill();line(x-r*0.12,y-r*0.2,x+r*0.12,y-r*0.2,9400,1,2.4);
  ctx.fillStyle='#3a1414';ctx.beginPath();ctx.ellipse(x,y+r*0.45,r*0.2,r*0.27,0,0,TAU);ctx.fill();circ(x,y+r*0.45,r*0.2,{ry:r*0.27,seed:9401,w:2.2});
  for(const sd of[-1,1])line(x+sd*r*0.12,y-r*0.62,x+sd*r*0.58,y-r*0.5,9402+sd,1,2.6);}
function coldFace(x,y,r){for(const sd of[-1,1]){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.12,r*0.24,0,TAU);ctx.fill();circ(x+sd*r*0.36,y-r*0.12,r*0.24,{seed:9410+sd,w:2});
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.1,r*0.1,0,TAU);ctx.fill();line(x+sd*r*0.12,y-r*0.64,x+sd*r*0.58,y-r*0.5,9420+sd,1,2.6);}
  // chattering teeth
  ctx.fillStyle='#fff';ctx.fillRect(x-r*0.42,y+r*0.32,r*0.84,r*0.3);rect(x-r*0.42,y+r*0.32,r*0.84,r*0.3,9430,1,2.2);for(let i=1;i<5;i++)line(x-r*0.42+i*r*0.168,y+r*0.32,x-r*0.42+i*r*0.168,y+r*0.62,9431+i,1,1.6);
  line(x-r*0.42,y+r*0.47,x+r*0.42,y+r*0.47,9440,1,1.6);
  // icicles on the head
  for(let i=-2;i<=2;i++){const ix=x+i*r*0.3,iy=y-r*0.93+Math.abs(i)*r*0.06;fillPts([[ix-r*0.09,iy],[ix+r*0.09,iy],[ix,iy+r*0.32]],'#bfe9ff');strokePts([[ix-r*0.09,iy],[ix,iy+r*0.32],[ix+r*0.09,iy]],1,1.6,'#3fb5f0');}}
const HUG={la:[-0.55,1.45],ra:[0.55,-1.45],ll:[-0.12,-0.1],rl:[0.12,0.1],paper:0};
function cover2(kind){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);ctx.scale(3,3);
  if(kind==='twin'){
    bar(18,24,324,170,11);txt('EVIL',180,72,96,{col:RED});txt('TWIN',180,150,96,{col:RED});
    const g=ctx.createRadialGradient(268,380,10,268,380,170);g.addColorStop(0,'rgba(255,40,30,0.6)');g.addColorStop(1,'rgba(255,40,30,0)');ctx.fillStyle=g;ctx.fillRect(110,215,250,425);
    mirrorFrame(180,220,640,1);
    const S=1.6,FY=800;figure(90,FY,PANIC,{s:S,seed:9100});shockFace(90,FY-264*S,38*S);
    const CLAW={la:[-1.9,-2.9],ra:[1.9,2.9],ll:[-0.12,-0.1],rl:[0.12,0.1],paper:0};glow('rgba(255,30,20,0.9)',40);figure(282,FY,CLAW,{s:S,seed:9110});noGlow();horns(282,FY,S,1);evilFace(282,FY-264*S,38*S);
  }else if(kind==='eclipse'){
    txt('NO MORE',180,62,80,{});bar(12,100,336,94,13);txt('ECLIPSES',180,147,90,{col:RED});
    const X=205,Y=360,R=118;
    glow('rgba(255,170,0,1)',80);for(let i=0;i<26;i++){const a=i/26*TAU;const l=R*(1.2+0.18*Math.sin(i*3.7));line(X+Math.cos(a)*R*1.06,Y+Math.sin(a)*R*1.06,X+Math.cos(a)*l,Y+Math.sin(a)*l,9500+i,1,3.4,'#ffb300');}
    ctx.fillStyle='#ffd34d';ctx.beginPath();ctx.arc(X,Y,R,0,TAU);ctx.fill();noGlow();circ(X,Y,R,{seed:9530,w:3.4});
    // the black-hole Moon: a tiny dot that can't cover the Sun
    ctx.fillStyle='#000';ctx.beginPath();ctx.arc(X+10,Y+5,6,0,TAU);ctx.fill();
    circ(X+10,Y+5,26,{seed:9531,w:4,col:RED});arrow(X+95,Y-110,X+32,Y-16,{seed:9532,w:4,head:14,col:RED});
    const S=1.05,FX=78,FY=700;figure(FX,FY,POSES.point,{s:S,seed:9540});glassesFace(FX,FY-264*S,38*S);
  }else{
    txt('COLDER',180,70,104,{col:'#1764c4'});bar(14,112,332,86,15);txt('THAN SPACE',180,154,70,{});
    const X=215,Y=360,R=100;
    glow('rgba(80,200,255,1)',80);ctx.strokeStyle='#7fd8ff';ctx.lineWidth=7;ctx.beginPath();ctx.arc(X,Y,R*1.16,0,TAU);ctx.stroke();noGlow();
    ctx.fillStyle='#050508';ctx.beginPath();ctx.arc(X,Y,R,0,TAU);ctx.fill();
    for(let i=0;i<12;i++){const a=i/12*TAU+0.2;const x0=X+Math.cos(a)*R*1.18,y0=Y+Math.sin(a)*R*1.18;fillPts([[x0-4,y0],[x0+4,y0],[x0+Math.cos(a)*14,y0+Math.sin(a)*14]],'#bfe9ff');}
    for(const[sx,sy]of[[320,240],[318,500],[150,230]])for(let k=0;k<3;k++){const a=k/3*Math.PI;line(sx-Math.cos(a)*12,sy-Math.sin(a)*12,sx+Math.cos(a)*12,sy+Math.sin(a)*12,9620+k+sx,1,2.6,'#3fb5f0');}
    const S=1.15,FX=78,FY=740;figure(FX,FY,HUG,{s:S,seed:9640});coldFace(FX,FY-264*S,38*S);shakeMarks(FX,FY-264*S,46,9650,1);
    // breath cloud
    const cp=cloudPath(FX+62,FY-264*S+22,20,12,9660);fillPts(cp,'#ffffff');strokePts(wob(cp,9661,0.5),1,2,'#3fb5f0');
  }
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>cover2(window.KIND));
</script></body></html>
