function hl(x,y,w,h,seed){ctx.save();ctx.globalAlpha=0.9;ctx.fillStyle='#ffe066';const R=rng(seed);ctx.beginPath();ctx.moveTo(x,y+R()*6);ctx.lineTo(x+w,y+R()*6);ctx.lineTo(x+w-4,y+h+R()*6);ctx.lineTo(x+4,y+h+R()*6);ctx.closePath();ctx.fill();ctx.restore();}
function stretched(x,y,len,ang,s,th=0.55){ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(len,th);ctx.rotate(-Math.PI/2);helmetFig(0,190,POSES.up,{s});ctx.restore();}
function drawT(kind){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);const S=1.6;ctx.scale(S,S);const t=1.3;
  if(kind==='A'){ // THIS IS THE MOON  (1200x675)
    txt('THIS IS',300,180,110);hl(30,250,560,135,3);txt('THE MOON',310,318,130,{col:RED});
    magnifier(860,330,200,1,{fill:'#fdfcff'});hole(860,330,14,t,{ring:false});
    sandGrain(640,590,52);txt('A GRAIN OF SAND',640,650,34);arrow(690,550,790,420,{seed:7001,w:3});
    arrow(600,330,700,330,{seed:7002,w:5,head:26,col:RED});
    txt('(ALL OF IT)',300,470,56,{});}
  else if(kind==='B'){ // too close
    hole(1060,330,16,t,{});
    stretched(600,360,1.9,0,1.25,0.8);txt('!!!',330,240,64,{col:RED,rot:-0.1});
    arrow(820,470,940,470,{seed:7101,col:RED,w:8,head:26});txt('6 KM',880,540,46,{col:RED});
    hl(40,40,470,120,7);txt('TOO CLOSE!',275,100,104,{col:RED});txt('AAAAAA!',300,560,72,{col:RED});}
  else if(kind==='C'){ // the moon is gone (but still there)
    nightSky(40,40,1120,430,t,7201);circ(830,230,120,{dash:[14,12],col:'#cfcfe0',seed:7202,w:3});txt('?',830,230,120,{col:'#cfcfe0'});
    line(0,640,1200,640,7203,1,LW);figure(830,640,POSES.shrug,{s:0.55});txt('?!',920,500,60,{col:RED});
    txt('THE MOON',300,150,96,{col:'#ffffff'});txt('IS GONE...',300,260,96,{col:'#ffffff'});
    hl(60,500,560,100,9);txt('BUT STILL THERE',340,550,72,{col:RED});}
  else if(kind==='R1'){ // reel 1 cover 675x1200
    txt('THE MOON',337,170,104);txt('IS NOW A',337,275,96);hl(40,320,595,120,11);txt('BLACK HOLE',337,382,112,{col:RED});
    circ(337,640,150,{dash:[14,12],seed:7301,w:3});hole(337,640,12,t,{});
    txt('AND NOTHING',337,900,90);txt('CHANGES?!',337,1010,110,{col:RED});}
  else { // R2 cover
    hl(30,110,615,125,13);txt('SPAGHETTI-',337,175,110,{col:RED});txt('FICATION',337,290,110,{col:RED});
    hole(337,430,14,t,{});stretched(337,730,1.45,-Math.PI/2,1.15,0.85);
    arrow(470,600,470,480,{seed:7401,col:RED,w:7,head:22});txt('6 KM',540,640,46,{col:RED});
    txt('WHAT A BLACK HOLE',337,1050,64);txt('DOES TO YOU',337,1120,64);}
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawT(window.KIND));
</script></body></html>
