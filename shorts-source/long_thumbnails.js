// Long-video thumbnails, phone first: 640x360 virtual canvas x3 -> 1920x1080 (exported at 1280x720)
function bigBar(txtS,size,col=RED){bar(16,10,608,92,21);txt(txtS,320,58,size,{col});}
function panicFig(x,y,s,seed=9500){figure(x,y,PANIC,{s,seed});shockFace(x,y-264*s,38*s);}
function drawLong(k){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);ctx.scale(3,3);const t=1.2;
  if(k==='A1'){bigBar('EVIL TWIN MOON',80);
    const g=ctx.createRadialGradient(430,245,40,430,245,190);g.addColorStop(0,'rgba(255,40,30,0.6)');g.addColorStop(1,'rgba(255,40,30,0)');ctx.fillStyle=g;ctx.fillRect(220,100,420,260);
    evilMoon(440,248,104);panicFig(135,430,1.12);}
  else if(k==='A2'){bigBar("DON'T TOUCH IT!",80);
    evilMoon(505,250,100);
    const hand={la:[-0.25,-0.15],ra:[1.75,1.6],ll:[-0.3,-0.22],rl:[0.3,0.22],paper:0},FS=1.12,FX=115,FY=430;figure(FX,FY,hand,{s:FS,seed:9510});shockFace(FX,FY-264*FS,38*FS);
    const hx=FX+(Math.sin(1.75)*52+Math.sin(1.6)*50)*FS,hy=FY-212*FS+(Math.cos(1.75)*52+Math.cos(1.6)*50)*FS;
    strokePts(wob([[hx-8,hy+2],[400,272]],9520,0.6),1,4.5,'#8a6a45');
    glow('rgba(255,120,0,1)',60);boom(404,272,1,46,9530,{hold:9});noGlow();}
  else if(k==='A3'){bigBar('GOODBYE EARTH',84);
    earth(470,352,135,{seed:9541});evilMoon(300,172,60);motionLines(255,135,Math.atan2(40,55),60,3,9545,1);
    glow('rgba(255,110,0,1)',70);boom(362,240,1,55,9550,{hold:9});noGlow();
    panicFig(115,430,1.12,9560);}
  else if(k==='B1'){bigBar("WHERE'S THE MOON?",72);
    ctx.fillStyle='#050507';ctx.fillRect(232,112,392,240);rect(232,112,392,240,9600,1,LW);
    const R=rng(9601);for(let i=0;i<60;i++){ctx.fillStyle=`rgba(255,255,255,${0.4+R()*0.6})`;ctx.beginPath();ctx.arc(240+R()*376,120+R()*224,0.6+R()*1.3,0,TAU);ctx.fill();}
    glow('rgba(255,40,20,1)',50);circ(440,232,88,{dash:[14,11],seed:9610,w:4.5,col:'#ffd21a'});noGlow();
    txt('?',442,236,130,{col:'#ffd21a'});
    panicFig(115,430,1.12,9620);}
  else if(k==='B2'){bigBar('THE MOON?!',96);
    ctx.fillStyle='#fdfcff';ctx.beginPath();ctx.arc(420,235,108,0,TAU);ctx.fill();circ(420,235,108,{seed:9700,w:6});
    ctx.save();ctx.lineCap='round';ctx.strokeStyle=INK;ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(420+80,235+80);ctx.lineTo(420+138,235+138);ctx.stroke();ctx.restore();
    glow('rgba(255,200,0,1)',40);ctx.strokeStyle='#ffc400';ctx.lineWidth=4;ctx.beginPath();ctx.arc(420,235,22,0,TAU);ctx.stroke();noGlow();
    ctx.fillStyle='#000';ctx.beginPath();ctx.arc(420,235,11,0,TAU);ctx.fill();
    const pt={la:[-0.25,-0.15],ra:[2.0,2.05],ll:[-0.3,-0.22],rl:[0.3,0.22],paper:0};figure(125,430,pt,{s:1.12,seed:9710});shockFace(125,430-264*1.12,38*1.12);}
  else { // B3 too close: astronaut being stretched toward the hole
    bigBar('TOO CLOSE!',96);
    const HX=545,HY=240;
    glow('rgba(255,120,0,1)',60);ctx.strokeStyle='#ff8a00';ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(HX,HY,62,20,-0.2,0,TAU);ctx.stroke();noGlow();
    ctx.fillStyle='#050507';ctx.beginPath();ctx.arc(HX,HY,34,0,TAU);ctx.fill();
    // stretched body: helmet head on the left, limbs pulled into long noodles toward the hole
    const Hx=150,Hy=232,r=40;
    for(const[dy,sd]of[[-14,1],[14,2],[-30,3],[30,4]]){const pts=[];for(let i=0;i<=20;i++){const u=i/20;pts.push([lerp(Hx+r,HX-36,u),Hy+dy*(1-u)+Math.sin(u*9+sd)*3*(1-u)]);}strokePts(wob(pts,9800+sd,0.5),1,LW);}
    circ(Hx,Hy,r+10,{seed:9810,w:3});ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(Hx,Hy,r,0,TAU);ctx.fill();circ(Hx,Hy,r,{seed:9811,w:LW});shockFace(Hx,Hy,r);
    motionLines(320,232,0,90,3,9820,1);txt('AAAA!',150,320,46,{col:RED});}
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawLong(window.KIND));
</script></body></html>
