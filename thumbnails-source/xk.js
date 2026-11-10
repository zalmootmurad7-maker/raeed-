// xkcd-inspired long thumbnails (our own drawings): mostly greyscale ink, ONE red element, a single absurd scene, tiny hand lettering.
const R7=rng(17);const XSTARS=Array.from({length:260},()=>[R7()*W,R7()*H,0.6+R7()*1.8]);
function greySpace(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a3a3a');g.addColorStop(1,'#0f0f0f');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  for(const[x,y,r]of XSTARS){ctx.fillStyle='rgba(255,255,255,0.65)';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}}
function hand(s,x,y,size,col='#111',o={}){txt(s,x,y,size,{col,...o});}
function bubble2(x,y,w,h,tx,ty,o={}){ctx.save();ctx.fillStyle=o.fill||'#fff';ctx.strokeStyle=o.col||'#111';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,y,w/2,h/2,0,0,TAU);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(x+w*0.12,y+h*0.42);ctx.lineTo(tx,ty);ctx.lineTo(x+w*0.25,y+h*0.32);ctx.fillStyle=o.fill||'#fff';ctx.fill();ctx.stroke();ctx.restore();}
// --- ep7: the universe loops — you see the back of your own head ---
function thumb7(){greySpace();
  ctx.save();ctx.setLineDash([22,16]);ctx.strokeStyle='#d2382c';ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(960,560,860,330,0,Math.PI*0.06,Math.PI*1.94);ctx.stroke();ctx.restore();
  for(const a of[0.55,1.0,1.45]){const x=960+Math.cos(a*Math.PI)*860,y=560+Math.sin(a*Math.PI)*330,dx=-Math.sin(a*Math.PI)*860,dy=Math.cos(a*Math.PI)*330,l=Math.hypot(dx,dy);
    ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(dy,dx));ctx.fillStyle='#d2382c';ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(-14,-16);ctx.lineTo(-14,16);ctx.closePath();ctx.fill();ctx.restore();}
  heroBack(560,860,1.75,0,{col:'#e8e8e8',head:'#F2F2F2'});
  hero(1380,880,1.75,0,{pose:'point',mood:'shock',col:'#e8e8e8',head:'#F2F2F2'});
  bubble2(1460,190,520,170,1400,330);hand('WAIT... IS THAT',1460,165,54);hand('ME?!',1460,225,64,'#d2382c');}
// --- ep8: Jupiter where the Moon should be ---
function jup(x,y,r){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();const g=ctx.createLinearGradient(0,y-r,0,y+r);g.addColorStop(0,'#bdbdbd');g.addColorStop(1,'#8a8a8a');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);
  const bands=[[-0.75,0.08,'#9b9b9b'],[-0.5,0.12,'#6f6f6f'],[-0.22,0.07,'#a9a9a9'],[0.05,0.14,'#6a6a6a'],[0.35,0.09,'#9a9a9a'],[0.6,0.12,'#727272']];
  for(const[c,h,col]of bands){ctx.fillStyle=col;ctx.beginPath();for(let i=0;i<=40;i++){const xx=x-r+i*r/20,yy=y+c*r+Math.sin(i*0.7)*r*0.015;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}for(let i=40;i>=0;i--){const xx=x-r+i*r/20;ctx.lineTo(xx,y+(c+h)*r+Math.sin(i*0.9)*r*0.02);}ctx.closePath();ctx.fill();}
  ctx.fillStyle='#d2382c';ctx.beginPath();ctx.ellipse(x+r*0.28,y+r*0.2,r*0.16,r*0.09,0,0,TAU);ctx.fill();
  const sh=ctx.createRadialGradient(x-r*0.45,y-r*0.35,r*0.2,x,y,r*1.05);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,0.45)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();
  ctx.lineWidth=6;ctx.strokeStyle='#111';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();}
function thumb8(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a1a1a');g.addColorStop(1,'#4a4a4a');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  for(const[x,y,r]of XSTARS)if(y<700){ctx.fillStyle='rgba(255,255,255,0.55)';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
  jup(1180,430,560);
  // skyline silhouette
  ctx.fillStyle='#0b0b0b';const B=[[0,880],[120,820],[220,860],[300,760],[420,800],[520,700],[640,780],[760,840],[900,800],[1040,860],[1180,780],[1320,840],[1460,760],[1600,820],[1760,780],[1920,840]];
  ctx.beginPath();ctx.moveTo(0,H);for(let i=0;i<B.length-1;i++){ctx.lineTo(B[i][0],B[i][1]);ctx.lineTo(B[i+1][0],B[i][1]);}ctx.lineTo(1920,840);ctx.lineTo(1920,H);ctx.closePath();ctx.fill();
  for(let i=0;i<40;i++){const R=rng(300+i),bx=R()*1900,by=820+R()*200;ctx.fillStyle='rgba(255,230,150,0.55)';ctx.fillRect(bx,by,10,14);}
  // stick figure on a rooftop pointing up
  ctx.fillStyle='#0b0b0b';ctx.fillRect(170,700,330,400);hero(330,700,1.15,0,{pose:'point',mood:'shock',col:'#e8e8e8',head:'#F2F2F2'});
  // the old Moon, tiny, labelled
  ctx.fillStyle='#e8e8e8';ctx.beginPath();ctx.arc(250,170,22,0,TAU);ctx.fill();hand('OLD MOON',250,240,40,'#e8e8e8');
  bubble2(560,330,380,140,420,430);hand('UH...',560,310,52);hand('NEW MOON?',560,360,46,'#d2382c');}
window.render=t=>{BOIL=3;ctx.setTransform(1,0,0,1,0,0);(window.TH==='8'?thumb8:thumb7)();};
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
