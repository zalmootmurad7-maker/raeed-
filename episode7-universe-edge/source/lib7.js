// ===== Ink & Atoms — Episode 7: What If the Universe Has No Edge? (16:9, timed to align.json) =====
const PAPER7='#F6F4F8',SCARF='#d2382c',CMB1='#E8A25A',CMB2='#7FA8D8';
function paper(){ctx.fillStyle=PAPER7;ctx.fillRect(0,0,W,H);ctx.drawImage(GRAIN,0,0);}
function TX(s,x,y,size,col=INK,o={}){const dark=col!==INK;return txt(s,x,y,size,{col,maxW:1720,stroke:dark?Math.max(6,size*0.1):0,strokeCol:'#000',...o});}
function ST(s,x,y,size,col,t,t0,o={}){if(t<t0)return;const k=pop(t,t0,0.22);const sk=t-t0<0.25?nz(t*60,7)*8:0;ctx.save();ctx.translate(x+sk,y);ctx.scale(k,k);TX(s,0,0,size,col,o);ctx.restore();}
function WR(s,x,y,size,col,t,t0,cps=26,o={}){if(t<t0)return;TX(s,x,y,size,col,{k:wk(t,t0,s,cps),...o});}
// ---------- camera: keys [[t,zoom,focusX,focusY,rot]] eased ----------
function cam(t,keys){let a=keys[0],b=keys[keys.length-1];for(let i=0;i+1<keys.length;i++){if(t>=keys[i][0]&&t<=keys[i+1][0]){a=keys[i];b=keys[i+1];break;}}
  const k=t<=a[0]?0:t>=b[0]?1:eInOut((t-a[0])/((b[0]-a[0])||1));const z=lerp(a[1],b[1],k),x=lerp(a[2],b[2],k),y=lerp(a[3],b[3],k),r=lerp(a[4]||0,b[4]||0,k);
  ctx.translate(CX,CY);ctx.rotate(r);ctx.scale(z,z);ctx.translate(-x,-y);}
function shake(t,t0,amp=16,d=0.35){if(t<t0||t>t0+d)return;const k=amp*(1-(t-t0)/d);ctx.translate(nz(t*60,3)*k,nz(t*57,4)*k);}
// ---------- deep space ----------
const DSTARS=(()=>{const R=rng(77),a=[];for(let i=0;i<520;i++)a.push([R()*W*1.6-W*0.3,R()*H*1.6-H*0.3,0.2+R()*0.8,R()*TAU]);return a;})();
function deep(t,{speed=0,dirx=1,diry=0,dim=1}={}){ctx.fillStyle='#05060F';ctx.fillRect(-W,-H,W*3,H*3);
  for(const[x0,y0,d,ph]of DSTARS){let x=x0-dirx*t*speed*d,y=y0-diry*t*speed*d;const w=W*1.6,h=H*1.6;x=((x+W*0.3)%w+w)%w-W*0.3;y=((y+H*0.3)%h+h)%h-H*0.3;
    const a=(0.35+0.45*Math.sin(t*2+ph))*dim,len=speed*d*0.06;ctx.strokeStyle=`rgba(255,255,255,${a})`;ctx.fillStyle=ctx.strokeStyle;
    if(len>3){ctx.lineWidth=1+d*2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dirx*len,y+diry*len);ctx.stroke();}else{ctx.beginPath();ctx.arc(x,y,0.8+d*2,0,TAU);ctx.fill();}}}
function vignette(a=0.55){const g=ctx.createRadialGradient(CX,CY,H*0.35,CX,CY,H*1.05);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
// ---------- the pilot + ship (red scarf = "you", visible from front AND back) ----------
function ship(x,y,s,t,{flame=1,mood='happy',tilt=0}={}){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.scale(s,s);
  if(flame>0){const f=1+0.25*Math.sin(t*40);poly([[-150,-28],[-150-120*f*flame,0],[-150,28]],{w:6,col:'#E8A400',fill:GOLD,close:true,seed:7001});poly([[-150,-14],[-150-60*f*flame,0],[-150,14]],{w:0,fill:'#fff',close:true,seed:7002});}
  // scarf trailing behind the window
  const wv=Math.sin(t*9)*10;poly([[-10,-70],[-90,-80+wv],[-170,-60-wv],[-160,-40+wv],[-80,-55],[-10,-52]],{w:5,col:INK,fill:SCARF,close:true,seed:7003,amp:1.5});
  poly([[-150,-60],[110,-60],[200,0],[110,60],[-150,60]],{w:8,col:INK,fill:'#FFFFFF',close:true,seed:7004,amp:2});
  poly([[110,-60],[200,0],[110,60]],{w:8,col:INK,fill:RED,close:true,seed:7005,amp:2});
  for(const sy of[-1,1])poly([[-150,sy*60],[-200,sy*115],[-90,sy*60]],{w:8,col:INK,fill:RED,close:true,seed:7006+sy,amp:2});
  ell(20,0,46,46,{w:8,col:INK,fill:'#CFE3F2',seed:7008,amp:1.2});
  // pilot face (looking right)
  ell(26,6,26,26,{w:5,col:INK,fill:'#F6F4F8',seed:7009,amp:0.8});ctx.fillStyle=INK;
  if(mood==='shock'){for(const ex of[22,40]){ctx.beginPath();ctx.arc(ex,0,4.5,0,TAU);ctx.fill();}ctx.fillStyle='#3a1414';ctx.beginPath();ctx.ellipse(34,16,5,7,0,0,TAU);ctx.fill();}
  else{for(const ex of[22,40]){ctx.beginPath();ctx.arc(ex,0,4,0,TAU);ctx.fill();}ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.beginPath();ctx.arc(32,8,9,0.2*Math.PI,0.85*Math.PI);ctx.stroke();}
  ctx.restore();}
// big front stick figure with scarf
function hero(x,y,s,t,o={}){stick(x,y,s,t,o);ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-30,-228],[30,-228],[34,-212],[-34,-212]],{w:4,col:INK,fill:SCARF,close:true,seed:7020,amp:1});
  const wv=Math.sin(t*7)*6;poly([[20,-220],[70,-200+wv],[64,-182+wv],[16,-206]],{w:4,col:INK,fill:SCARF,close:true,seed:7021,amp:1});ctx.restore();}
// the same person from BEHIND: head with no face, scarf knot on the back
function heroBack(x,y,s,t,{col=INK,head='#F6F4F8'}={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const w=LW/s*1.1;
  line(0,-110,0,-230,{w,col,seed:7030});line(0,-110,-42,0,{w,col,seed:7031});line(0,-110,42,0,{w,col,seed:7032});line(0,-200,-55,-120,{w,col,seed:7033});line(0,-200,55,-120,{w,col,seed:7034});
  ell(0,-270,40,40,{w,col,fill:head,seed:7035,amp:1.2});poly([[-32,-228],[32,-228],[36,-212],[-36,-212]],{w:4,col:INK,fill:SCARF,close:true,seed:7036,amp:1});
  const wv=Math.sin(t*7)*8;poly([[-6,-220],[-26,-170+wv],[-6,-160+wv],[6,-212]],{w:4,col:INK,fill:SCARF,close:true,seed:7037,amp:1});poly([[6,-220],[30,-176-wv],[44,-186-wv],[14,-214]],{w:4,col:INK,fill:SCARF,close:true,seed:7038,amp:1});
  ctx.restore();}
// ---------- cosmic glyphs ----------
function galaxy(x,y,r,rot,{a=1,col='rgba(220,225,255,'}={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(1,0.55);glow(0,0,r*0.7,'rgba(255,240,200,0.55)',a);
  const R=rng(31);for(let arm=0;arm<2;arm++)for(let i=0;i<260;i++){const u=i/260,th=arm*Math.PI+u*3.6*Math.PI,rr=u*r,j=(R()-0.5)*r*0.12;
    ctx.fillStyle=col+(a*(0.9-u*0.5))+')';ctx.beginPath();ctx.arc(Math.cos(th)*rr+j,Math.sin(th)*rr+j,1.5+R()*3*(1-u),0,TAU);ctx.fill();}
  ctx.restore();}
const CMBSPOTS=(()=>{const R=rng(9),a=[];for(let i=0;i<900;i++)a.push([R()*2-1,R()*2-1,R(),2+R()*7]);return a;})();
function cmbDisk(x,y,rx,ry,a=1){ctx.save();ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,TAU);ctx.clip();ctx.fillStyle='#C9B8A0';ctx.fillRect(x-rx,y-ry,2*rx,2*ry);
  for(const[u,v,c,r]of CMBSPOTS){ctx.fillStyle=c<0.5?`rgba(90,140,210,${0.55*a})`:`rgba(225,110,60,${0.55*a})`;ctx.beginPath();ctx.arc(x+u*rx,y+v*ry,r*rx/600,0,TAU);ctx.fill();}ctx.restore();
  ell(x,y,rx,ry,{w:7,col:INK,seed:7101,amp:2});}
function shell(x,y,r,t,{a=1}={}){ctx.save();ctx.globalAlpha*=a;glow(x,y,r*1.15,'rgba(232,162,90,0.35)',1);ctx.lineWidth=Math.max(6,r*0.05);
  const R=rng(5);for(let i=0;i<140;i++){const th=i/140*TAU;ctx.strokeStyle=R()<0.5?'rgba(232,140,80,0.9)':'rgba(127,168,216,0.9)';ctx.beginPath();ctx.arc(x,y,r,th,th+TAU/140+0.01);ctx.stroke();}
  ctx.restore();}
function bubble(x,y,r,{fill='rgba(127,168,216,0.12)',dash=false,col='rgba(200,220,255,0.9)',w=6}={}){ctx.save();ctx.fillStyle=fill;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
  if(dash)ctx.setLineDash([22,18]);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();ctx.restore();}
function brickWall(x,y,w,h,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rrect(-w/2,-h/2,w,h,6,{w:8,fill:'#C8553D',seed:7201});
  for(let r=0;r<h/40;r++){const yy=-h/2+r*40;line(-w/2,yy,w/2,yy,{w:4,seed:7210+r,amp:1});for(let c=0;c<w/90+1;c++){const xx=-w/2+c*90+(r%2)*45;if(xx>-w/2&&xx<w/2)line(xx,yy,xx,yy+40,{w:4,seed:7230+r*10+c,amp:1});}}ctx.restore();}
function cliff(x,y,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-300,0],[40,0],[60,40],[50,260],[-300,260]],{w:8,fill:'#D8CFB8',close:true,seed:7301,amp:3});
  line(-160,0,-160,-150,{w:9,seed:7302});rrect(-250,-230,180,90,10,{w:7,fill:'#fff',seed:7303});txt('THE END',-160,-185,46,{col:RED});ctx.restore();}
function arrow(x1,y1,x2,y2,{col=INK,w=8,head=26,seed=7400,dash=null}={}){ctx.save();if(dash)ctx.setLineDash(dash);line(x1,y1,x2,y2,{w,col,seed});ctx.setLineDash([]);const a=Math.atan2(y2-y1,x2-x1);
  poly([[x2-Math.cos(a-0.45)*head,y2-Math.sin(a-0.45)*head],[x2,y2],[x2-Math.cos(a+0.45)*head,y2-Math.sin(a+0.45)*head]],{w,col,seed:seed+1});ctx.restore();}
function photon(x,y,r=10){glow(x,y,r*4,'rgba(255,215,0,0.9)',1);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
function odo(x,y,s,val,label,{col=GOLD}={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rrect(-430,-80,860,160,24,{w:8,col:'#cfd6ea',fill:'rgba(10,10,25,0.9)',seed:7501});
  txt(val,0,-6,96,{col});txt(label,0,62,40,{col:'#cfd6ea'});ctx.restore();}
function bigCheck(x,y,s,t,t0){const k=P(t,t0,t0+0.25);if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-40,0],[-10,32],[46,-40]],{w:14,col:'#2E9E4A',seed:7601,k});ctx.restore();}
function bigNo(x,y,r,t,t0){bigX(x,y,r,t,t0);}
function counter(t,t0,t1,v0,v1){return Math.round(lerp(v0,v1,eOut(P(t,t0,t1))));}
