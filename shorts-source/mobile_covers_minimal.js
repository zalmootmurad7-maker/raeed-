// Minimal "one absurd situation" covers for shorts (test concept): 360x640 virtual x3, thick ink, one red accent
function minCover(k){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#fbfbfd';ctx.fillRect(0,0,W,H);ctx.scale(3,3);
  if(k==='twin'){
    txt('HIGH FIVE?',180,78,74,{});
    const S=1.3,G=740;
    const reachR={la:[-0.2,-0.1],ra:[1.62,1.57],ll:[-0.2,-0.15],rl:[0.2,0.15],paper:0};
    const reachL={la:[-1.62,-1.57],ra:[0.2,0.1],ll:[-0.2,-0.15],rl:[0.2,0.15],paper:0};
    figure(68,G,reachR,{s:S,seed:9900});shockFace(68,G-264*S,38*S);
    figure(292,G,reachL,{s:S,seed:9910});horns(292,G,S,1);evilFace(292,G-264*S,38*S);
    const hx=180,hy=G-212*S+2;for(let i=0;i<10;i++){const a=i/10*TAU;line(hx+Math.cos(a)*7,hy+Math.sin(a)*7,hx+Math.cos(a)*(18+(i%2)*9),hy+Math.sin(a)*(18+(i%2)*9),9920+i,1,3.2,RED);}
    txt('ANTI-YOU',270,215,40,{col:RED});arrow(285,240,292,300,{seed:9930,col:RED,w:3.2,head:11});
  }else if(k==='eclipse'){
    txt("THAT'S",180,64,80,{});txt('THE MOON?',180,140,80,{});
    const X=190,Y=360,R=125;
    for(let i=0;i<20;i++){const a=i/20*TAU;line(X+Math.cos(a)*(R+12),Y+Math.sin(a)*(R+12),X+Math.cos(a)*(R+(i%2?26:38)),Y+Math.sin(a)*(R+(i%2?26:38)),9800+i,1,3.4);}
    circ(X,Y,R,{seed:9830,w:LW+1,fill:'#fff6d6'});
    ctx.fillStyle='#000';ctx.beginPath();ctx.arc(X+20,Y+10,4.5,0,TAU);ctx.fill();
    circ(X+20,Y+10,22,{seed:9831,w:4,col:RED});arrow(X+110,Y-120,X+38,Y-6,{seed:9832,w:4,head:14,col:RED});
    const S=1.1,FX=70,FY=760;figure(FX,FY,POSES.point,{s:S,seed:9840});glassesFace(FX,FY-264*S,38*S);
  }else{
    txt('BRRR...',180,74,96,{});
    const X=175,Y=345,R=100;ctx.fillStyle='#050508';ctx.beginPath();ctx.arc(X,Y,R,0,TAU);ctx.fill();circ(X,Y,R+10,{seed:9850,w:2.6,dash:[7,7]});
    // thermometer in the hole's frost: the only red
    thermo(320,440,150,0.12,RED,9860);txt('1.7 K',314,262,46,{col:RED});
    const S=1.2,FX=85,FY=760;figure(FX,FY,HUG,{s:S,seed:9870});coldFace(FX,FY-264*S,38*S);shakeMarks(FX,FY-264*S,48,9880,1);
    const cp=cloudPath(FX+64,FY-264*S+24,20,12,9890);fillPts(cp,'#ffffff');strokePts(wob(cp,9891,0.5),1,2.4);
  }
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>minCover(window.KIND));
</script></body></html>
