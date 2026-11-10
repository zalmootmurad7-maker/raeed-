function bub(x,y,w,h,tx,ty){ctx.save();ctx.fillStyle='#fff';ctx.strokeStyle=INK;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(x,y,w/2,h/2,0,0,TAU);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(x-w*0.18,y+h*0.38);ctx.lineTo(tx,ty);ctx.lineTo(x-w*0.02,y+h*0.45);ctx.fill();ctx.stroke();ctx.restore();}
function thA(){white();
  // Jupiter rising behind the town, far too big for the sky
  P_jupiter(1240,760,640,false);ell(1080,430,105,58,{w:6,fill:RED8,seed:9002,amp:1.5});
  // ground + simple town in front (white blocks hide Jupiter's lower half)
  ctx.fillStyle='#fff';ctx.fillRect(0,880,W,300);line(0,880,W,880,{w:7,seed:9001});
  for(const[bx,bw,bh]of[[700,130,170],[850,90,120],[960,150,230],[1130,110,150],[1260,160,260],[1440,120,180],[1580,150,140],[1750,140,210]]){rrect(bx,880-bh,bw,bh,4,{w:6,fill:'#fff',seed:9010+bx});for(let yy=880-bh+26;yy<860;yy+=44)for(let xx=bx+18;xx<bx+bw-22;xx+=36)ctx.strokeRect(xx,yy,16,22);}
  // the old Moon, tiny, top-left, labelled
  P_moon(120,110,30);lbl('← OLD MOON',290,112,44,G4);
  // stick figure on the left, big reaction
  stick(300,880,1.45,0,{pose:'point',mood:'shock'});
  bub(470,300,520,170,350,440);txt('UH... NEW MOON?',470,300,64,{col:INK});}
window.render=t=>{BOIL=3;ctx.setTransform(1,0,0,1,0,0);thA();};
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
