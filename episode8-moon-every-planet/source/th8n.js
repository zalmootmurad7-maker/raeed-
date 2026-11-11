function thN(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0c0d12');g.addColorStop(1,'#2a2c33');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const R=rng(21);for(let i=0;i<220;i++){const x=R()*W,y=R()*820,r=0.8+R()*2.2;ctx.fillStyle=`rgba(255,255,255,${0.35+R()*0.5})`;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
  // Jupiter high in the sky (ink on light grey, so it pops on the dark sky)
  glow(1150,430,620,'rgba(255,255,255,0.10)',1);P_jupiter(1150,430,370);
  // the old Moon: tiny, bright white, right next to it
  glow(560,250,70,'rgba(255,255,255,0.55)',1);ell(560,250,13,13,{w:3,col:'#fff',fill:'#fff',seed:9101,amp:0.4});
  // low horizon + small town silhouette
  ctx.fillStyle='#08090c';ctx.beginPath();ctx.moveTo(0,H);const B=[[0,940],[90,915],[160,930],[230,890],[300,905],[380,880],[440,900],[520,870],[600,895],[700,885],[780,905],[880,875],[960,900],[1060,880],[1160,905],[1260,885],[1360,900],[1460,875],[1560,895],[1660,880],[1760,900],[1860,890],[1920,905]];
  for(let i=0;i<B.length-1;i++){ctx.lineTo(B[i][0],B[i][1]);ctx.lineTo(B[i+1][0],B[i][1]);}ctx.lineTo(1920,H);ctx.closePath();ctx.fill();
  for(let i=0;i<34;i++){const R2=rng(400+i),bx=R2()*1900,by=905+R2()*120;ctx.fillStyle='rgba(255,220,140,0.6)';ctx.fillRect(bx,by,9,12);}
  // big stick figure on the left, white ink, shocked, pointing up
  stick(300,1020,1.55,0,{pose:'point',mood:'shock',col:'#F2F2F2',head:'#F2F2F2'});}
window.render=t=>{BOIL=3;ctx.setTransform(1,0,0,1,0,0);thN();};
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
