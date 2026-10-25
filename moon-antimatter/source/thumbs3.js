function niceMoon(x,y,r){moon(x,y,r,{seed:4401});
  for(const sd of[-1,1]){ctx.fillStyle=PAPER;ctx.beginPath();ctx.ellipse(x+sd*r*0.3,y-r*0.08,r*0.15,r*0.17,0,0,TAU);ctx.fill();circ(x+sd*r*0.3,y-r*0.08,r*0.15,{ry:r*0.17,seed:4410+sd,w:3.4});
    ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.3+r*0.03,y-r*0.05,r*0.065,0,TAU);ctx.fill();}
  const sm=[];for(let i=0;i<=12;i++){const a=0.25*Math.PI+i/12*0.5*Math.PI;sm.push([x+Math.cos(a)*r*0.38,y+r*0.05+Math.sin(a)*r*0.3]);}strokePts(wob(sm,4420,0.5),1,4.5);
  for(const sd of[-1,1]){ctx.save();ctx.globalAlpha=0.35;ctx.fillStyle='#f39a9a';ctx.beginPath();ctx.ellipse(x+sd*r*0.52,y+r*0.2,r*0.1,r*0.06,0,0,TAU);ctx.fill();ctx.restore();}}
function drawAlt(kind){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);const S=1.6;ctx.scale(S,S);
  if(kind==='yt2'){ // 1200x675: mirror, moon vs evil twin
    mirrorFrame(600,40,640,1);
    niceMoon(300,330,185);evilMoon(900,330,185);
    txt('MOON',300,600,84);
    hl(690,548,420,110,9);txt('EVIL TWIN',900,603,96,{col:RED});
    for(let i=0;i<3;i++){line(585+i*12,70+i*40,615+i*12,40+i*40,4450+i,1,2.6,'#9a98a2');}
  }else{ // yt3: don't touch it
    hl(30,150,560,130,11);
    txt("DON'T",300,100,108);txt('TOUCH IT!',310,215,112,{col:RED});
    evilMoon(930,370,215);
    const fig={la:[-0.25,-0.15],ra:[1.75,1.6],ll:[-0.3,-0.22],rl:[0.3,0.22],paper:0};
    figure(250,650,fig,{s:1.0});
    // poking stick from the hand to the Moon's edge
    const hx=250+Math.sin(1.75)*52+Math.sin(1.6)*50,hy=650-212+Math.cos(1.75)*52+Math.cos(1.6)*50;const tx=930-215-6,ty=440;
    strokePts(wob([[hx-20,hy+4],[tx,ty]],4460,0.8),1,6,'#8a6a45');
    boom(tx+4,ty,1,62,4470,{hold:5});
    txt('!!!',330,350,60,{col:RED,rot:0.1});
  }
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawAlt(window.KIND));
</script></body></html>
