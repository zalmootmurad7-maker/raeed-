// ---------- thumbnail (static) ----------
function explodingMoon(MX,MY,R,seed,biasF){biasF=biasF||(a=>0.55+0.45*Math.cos(a+Math.PI/4));
  const r0=rng(seed);
  // burst rays behind, stronger toward upper-right
  for(let i=0;i<44;i++){const a=i/44*TAU+r0()*0.08;const bias=biasF(a);const a0=R*0.95,a1=R*(1.1+bias*1.1+r0()*0.22);
    line(MX+Math.cos(a)*a0,MY+Math.sin(a)*a0,MX+Math.cos(a)*a1,MY+Math.sin(a)*a1,3000+i,1,2.6);}
  // escaping protons with motion lines
  for(let i=0;i<34;i++){const a=r0()*TAU,bias=biasF(a);const d=R*(1.12+r0()*0.6*bias+0.15);const x=MX+Math.cos(a)*d,y=MY+Math.sin(a)*d;
    const ps=13+r0()*5;if(bias<0.25)continue;if(bias>0.35)motionLines(x,y,a,40+50*bias,2,3100+i,1);proton(x,y,ps,{seed:3200+i});}
  protonBall(MX,MY,R,{pr:11,seed:3300});
  // cracks
  const rc=rng(seed+9);for(let c=0;c<8;c++){let ang=c/8*TAU+rc()*0.5,x=Math.cos(ang)*14,y=Math.sin(ang)*14;const pts=[[MX+x,MY+y]];
    for(let s=0;s<6;s++){ang+=(rc()-.5)*1.0;x+=Math.cos(ang)*R*0.15;y+=Math.sin(ang)*R*0.15;if(x*x+y*y>R*R*0.97)break;pts.push([MX+x,MY+y]);}strokePts(wob(pts,3400+c,1),1,5,RED);}
  // white-hot core
  ctx.fillStyle=PAPER;ctx.beginPath();ctx.arc(MX,MY,R*0.09,0,TAU);ctx.fill();for(let i=0;i<12;i++){const a=i/12*TAU;line(MX+Math.cos(a)*R*0.1,MY+Math.sin(a)*R*0.1,MX+Math.cos(a)*R*0.2,MY+Math.sin(a)*R*0.2,3500+i,1,3.4,RED);}
  shakeMarks(MX,MY,R,3600,1);
}
function highlight(x,y,w,h,seed){ctx.save();ctx.globalAlpha=0.9;ctx.fillStyle='#ffe066';ctx.beginPath();const R=rng(seed);ctx.moveTo(x,y+R()*6);ctx.lineTo(x+w,y+R()*6);ctx.lineTo(x+w-4,y+h+R()*6);ctx.lineTo(x+4,y+h+R()*6);ctx.closePath();ctx.fill();ctx.restore();}
function drawThumb(){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  const S=1.6;ctx.scale(S,S);const VW=W/S,VH=H/S;
  if(VH>VW){ // vertical 675x1200
    ctx.save();ctx.font='76px "PH"';const w1=ctx.measureText('A MOON MADE OF').width;ctx.restore();
    txt('A MOON MADE OF',VW/2,215,76);
    highlight(VW/2-235,262,470,118,5);
    txt('PROTONS?',VW/2,322,150,{col:RED});
    explodingMoon(VW/2,660,170,11,a=>0.15+0.85*Math.abs(Math.cos(a)));
    figure(105,1150,POSES.up,{s:0.55});
    txt('!!!',185,995,60,{col:RED,rot:0.1});
    ctx.save();ctx.translate(520,1060);ctx.rotate(-0.06);txt('10',-28,0,74);txt('36',22,-26,40);ctx.restore();
    txt('x GRAVITY',525,1118,34,{col:RED});
  }else{ // horizontal 1200x675
    txt('A MOON',300,175,104);
    txt('MADE OF',300,285,104);
    highlight(70,345,460,128,7);
    txt('PROTONS?',300,410,146,{col:RED});
    figure(140,660,POSES.up,{s:0.46});
    txt('!!!',210,525,50,{col:RED,rot:0.1});
    explodingMoon(925,340,200,11,a=>0.2+0.8*Math.max(0,Math.cos(a))**0.7);
    ctx.save();ctx.translate(420,585);ctx.rotate(-0.05);txt('10',-26,0,72);txt('36',22,-26,40);ctx.restore();
    txt('x GRAVITY',425,640,34,{col:RED});
  }
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawThumb());
</script></body></html>
