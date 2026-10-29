function glow(c,b){ctx.shadowColor=c;ctx.shadowBlur=b;}
function noGlow(){ctx.shadowBlur=0;ctx.shadowColor='transparent';}
function sparkle(x,y,s){glow('rgba(255,255,255,0.9)',12*s);ctx.strokeStyle='#fff';ctx.lineWidth=2*s;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-14*s,y);ctx.lineTo(x+14*s,y);ctx.moveTo(x,y-14*s);ctx.lineTo(x,y+14*s);ctx.stroke();
  ctx.lineWidth=1.2*s;ctx.beginPath();ctx.moveTo(x-6*s,y-6*s);ctx.lineTo(x+6*s,y+6*s);ctx.moveTo(x+6*s,y-6*s);ctx.lineTo(x-6*s,y+6*s);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,2.4*s,0,TAU);ctx.fill();noGlow();}
function scaredFace(x,y,r){for(const sd of[-1,1]){ctx.fillStyle=PAPER;ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.15,r*0.24,0,TAU);ctx.fill();circ(x+sd*r*0.36,y-r*0.15,r*0.24,{seed:8000+sd,w:2});ctx.fillStyle=INK;ctx.beginPath();ctx.arc(x+sd*r*0.36,y-r*0.12,r*0.1,0,TAU);ctx.fill();
    line(x+sd*r*0.12,y-r*0.66,x+sd*r*0.56,y-r*0.5,8010+sd,1,2.4);}
  ctx.fillStyle='#3a1414';ctx.beginPath();ctx.ellipse(x,y+r*0.42,r*0.22,r*0.28,0,0,TAU);ctx.fill();circ(x,y+r*0.42,r*0.22,{ry:r*0.28,seed:8020,w:2.2});}
function drawC2(){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#fbfbfd';ctx.fillRect(0,0,W,H);const S=1.6;ctx.scale(S,S);
  // black sky
  ctx.fillStyle='#050507';ctx.fillRect(40,30,1120,420);rect(40,30,1120,420,8100,1,LW+0.8);
  const R=rng(8101);for(let i=0;i<120;i++){const x=55+R()*1090,y=45+R()*390;const b=R();glow('rgba(255,255,255,0.8)',b*8);ctx.fillStyle=`rgba(255,255,255,${0.35+b*0.65})`;ctx.beginPath();ctx.arc(x,y,0.6+b*1.6,0,TAU);ctx.fill();}noGlow();
  [[200,380],[560,415],[640,170],[1080,120],[1060,360],[980,420],[150,245]].forEach(([x,y],i)=>sparkle(x,y,0.9+0.35*(i%3)));
  // glowing headline
  glow('rgba(255,255,255,0.75)',26);txt('THE MOON',300,160,108,{col:'#ffffff'});txt('IS GONE...',300,285,108,{col:'#ffffff'});noGlow();
  // the empty spot: dashed yellow ring with red glow + big ?
  for(let i=0;i<3;i++){glow('rgba(255,30,20,1)',30+i*14);circ(860,230,135,{dash:[18,14],seed:8110,w:5.5,col:'#ffd21a'});}noGlow();
  glow('rgba(255,30,20,1)',44);txt('?',864,242,220,{col:'#ff2a1a'});noGlow();
  ctx.save();ctx.globalAlpha=0.92;txt('?',858,236,220,{col:'#ffd21a'});ctx.restore();
  // ground + scared figure with hands on head
  line(0,665,1200,665,8120,1,LW);
  const hands={la:[-2.0,2.79],ra:[2.0,-2.79],ll:[-0.3,-0.24],rl:[0.3,0.24],paper:0};
  figure(880,668,hands,{s:0.7,seed:8130});scaredFace(880,668-264*0.7,38*0.7);
  glow('rgba(255,30,30,0.9)',20);txt('!?!',1000,520,72,{col:RED,rot:0.08});noGlow();
  // yellow banner
  ctx.save();ctx.fillStyle='#ffe600';const Q=rng(8140);ctx.beginPath();ctx.moveTo(60,525+Q()*5);ctx.lineTo(650,522+Q()*5);ctx.lineTo(646,630+Q()*5);ctx.lineTo(64,633+Q()*5);ctx.closePath();ctx.fill();ctx.restore();
  txt('BUT STILL THERE!',355,578,80,{col:'#d4140f'});
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawC2());
</script></body></html>
