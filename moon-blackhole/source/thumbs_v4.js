// thumbnails D/E for Test & Compare (C got 1.6% CTR): light channel style, one big picture, <=4 words
// page = ../moon-antimatter/source/head.html + glyph part of scenes.js + glyph part of scenes3.js + this file; window.KIND = 'D' | 'E'
function hl(x,y,w,h,seed){ctx.save();ctx.globalAlpha=0.92;ctx.fillStyle='#ffe066';const R=rng(seed);ctx.beginPath();ctx.moveTo(x,y+R()*6);ctx.lineTo(x+w,y+R()*6);ctx.lineTo(x+w-4,y+h+R()*6);ctx.lineTo(x+4,y+h+R()*6);ctx.closePath();ctx.fill();ctx.restore();}
function scaredFace(x,y,r){for(const sd of[-1,1]){ctx.fillStyle=PAPER;ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.15,r*0.24,0,TAU);ctx.fill();circ(x+sd*r*0.36,y-r*0.15,r*0.24,{seed:8000+sd,w:2});ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.12,r*0.1,0,TAU);ctx.fill();
    line(x+sd*r*0.12,y-r*0.66,x+sd*r*0.56,y-r*0.5,8010+sd,1,2.4);}
  ctx.fillStyle='#3a1414';ctx.beginPath();ctx.ellipse(x,y+r*0.42,r*0.22,r*0.28,0,0,TAU);ctx.fill();circ(x,y+r*0.42,r*0.22,{ry:r*0.28,seed:8020,w:2.2});}
const HANDS_ON_HEAD={la:[-2.0,2.79],ra:[2.0,-2.79],ll:[-0.3,-0.24],rl:[0.3,0.24],paper:0};
function drawT(kind){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);ctx.scale(1.6,1.6);const t=1.3; // 1200x675 space
  if(kind==='D'){ // the hole hangs where the Moon was, the sea still rises
    circ(870,250,190,{dash:[16,14],seed:7501,w:3,col:GREY});hole(870,250,46,t,{});
    ctx.save();ctx.fillStyle='#e9e2cf';ctx.fillRect(0,560,1200,115);ctx.restore();line(0,560,1200,560,7502,1,LW);
    const fwl=x=>470+Math.sin(x/55)*9+(x>760?(x-760)*0.9:0);ctx.save();ctx.fillStyle='#d7e3f3';ctx.beginPath();ctx.moveTo(0,fwl(0));for(let x=0;x<=860;x+=20)ctx.lineTo(x,fwl(x));ctx.lineTo(860,675);ctx.lineTo(0,675);ctx.closePath();ctx.fill();ctx.restore();
    const wp=[];for(let x=0;x<=860;x+=20)wp.push([x,fwl(x)]);strokePts(wp,1,LW+1,'#2f5d9a');
    for(let i=0;i<5;i++){const x=70+i*130;arrow(x,450,x+30,350,{seed:7510+i,col:RED,w:5,head:20});}
    figure(1020,562,HANDS_ON_HEAD,{s:0.62,seed:8130});scaredFace(1020,562-264*0.62,38*0.62);txt('?!',1110,330,80,{col:RED,rot:0.1});
    txt('THE MOON IS NOW',330,90,84,{});hl(30,140,600,120,21);txt('A BLACK HOLE',330,200,108,{col:RED});}
  else { // the whole Moon -> a speck under a magnifier
    moon(240,380,190,{seed:7601});txt('THE MOON',240,630,64,{});
    bigArrow(460,380,640,380,46,1,7602);
    magnifier(880,370,170,1,{fill:'#fdfcff'});hole(880,370,12,t,{ring:false});sandGrain(730,590,40);txt('A GRAIN OF SAND',730,645,36,{});arrow(770,555,840,440,{seed:7603,w:3});
    hl(35,40,690,120,23);txt('SMALLER THAN SAND',380,100,84,{col:RED});}
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawT(window.KIND));
</script></body></html>
