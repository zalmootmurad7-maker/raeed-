// ===================== TWIST =====================
// S27 129.28–132.81 fine — just fly farther, you've got forever
function S27(t){ctx.save();cam(t,[[129.28,1.3,CX,CY],[130.4,1.0,CX,CY]]);deep(t,{speed:1100});ship(CX-100,560,1.3,t);ctx.restore();
  ST('FINE.',CX,140,110,WHITE,t,129.28);if(t>130.41)ST('JUST FLY FARTHER',CX,260,90,GOLD,t,130.41);if(t>131.69){ST('∞',1550,800,220,GOLD,t,131.69);TX('FOREVER?',1550,980,70,WHITE);}vignette();}
// S28 132.81–138.43 NO. The universe is expanding… faster and faster (the grid stretches)
function S28(t){deep(t,{dim:0.6});const s=t<135.83?1:1+Math.pow(P(t,135.83,138.4),1.6)*2.2;ctx.save();ctx.translate(CX,600);ctx.scale(s,s);
  ctx.strokeStyle='rgba(127,168,216,0.45)';ctx.lineWidth=3/s;for(let i=-8;i<=8;i++){ctx.beginPath();ctx.moveTo(i*110,-660);ctx.lineTo(i*110,660);ctx.stroke();ctx.beginPath();ctx.moveTo(-990,i*90);ctx.lineTo(990,i*90);ctx.stroke();}
  for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){if((i+j)%2)continue;galaxy(i*220,j*180,26,i+j,{a:0.8});}ctx.restore();
  ctx.save();shake(t,132.81,24,0.45);ST('NO.',CX,330,300,RED,t,132.81,{stroke:14,strokeCol:'#000'});ctx.restore();
  if(t>135.7)ST("IT'S EXPANDING",CX,820,110,WHITE,t,135.7);if(t>136.76){ST('FASTER AND FASTER',CX,960,96,GOLD,t,136.76);for(const sx of[-1,1]){const k=P(t,136.76,138.4);arrow(CX+sx*500,600,CX+sx*(560+400*k*k),600,{col:GOLD,w:10,head:30,seed:8800+sx});}}vignette();}
// S29 138.43–144.74 a beam of light leaving Earth tonight never reaches past ~16 billion ly
function S29(t){deep(t);ctx.save();cam(t,[[138.43,1.0,CX,560],[144.74,0.9,CX,560]]);earth(170,560,60);
  const hx=lerp(1100,1240,P(t,138.4,144.7));ctx.save();ctx.setLineDash([24,16]);ctx.strokeStyle=RED;ctx.lineWidth=8;ctx.beginPath();ctx.arc(170,560,hx-170,-0.6,0.6);ctx.stroke();ctx.restore();
  const g=[[1450,380],[1600,620],[1750,470],[1500,800]];g.forEach(([x,y],i)=>galaxy(x+(t-138.43)*40*(1+i*0.2),y,50,i,{a:0.85}));
  const bx=lerp(240,hx-40,1-Math.exp(-(t-139.0)*0.45));if(t>139.0){ctx.save();ctx.strokeStyle='rgba(255,215,0,0.85)';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(240,560);ctx.lineTo(bx,560);ctx.stroke();ctx.restore();photon(bx,560,12);}
  ctx.restore();WR('A BEAM OF LIGHT LEAVING EARTH TONIGHT…',CX,90,64,GOLD,t,138.49,34);if(t>140.3)ST('WILL NEVER REACH',CX,200,100,RED,t,140.3,{stroke:8,strokeCol:'#000'});
  if(t>142.22)ST('16 BILLION LY',hx,860,80,RED,t,142.22);vignette();}
// S30 144.74–150.80 about 95% of what we see is already out of reach
function S30(t){deep(t);ctx.save();cam(t,[[144.74,0.9,CX,580],[146.2,1.0,CX,580]]);const R=420,r=R*16/46.5;
  ctx.save();ctx.fillStyle='rgba(210,56,44,0.35)';ctx.beginPath();ctx.arc(CX,580,R,0,TAU);ctx.fill();ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(CX,580,R,0,TAU);ctx.clip();ctx.strokeStyle='rgba(255,90,80,0.55)';ctx.lineWidth=5;for(let i=-20;i<20;i++){ctx.beginPath();ctx.moveTo(CX-R+i*40,580-R);ctx.lineTo(CX+R+i*40,580+R);ctx.stroke();}ctx.restore();
  bubble(CX,580,R,{fill:'rgba(0,0,0,0)',col:'rgba(255,120,110,0.9)'});bubble(CX,580,r,{fill:'rgba(127,178,229,0.55)',col:'#cfe3f2'});earth(CX,580,20);txt('REACHABLE',CX,580+r+40,40,{col:'#cfe3f2'});
  ctx.restore();const v=counter(t,144.97,146.0,0,95);TX(v+'%',1560,450,190,RED,{stroke:12,strokeCol:'#000'});TX('OUT OF REACH',1560,600,70,WHITE);
  if(t>149.12)ST('AT ANY SPEED.',360,860,80,WHITE,t,149.12);if(t>150.01)ST('FOREVER.',1560,860,110,RED,t,150.01,{stroke:8,strokeCol:'#000'});vignette();}
// S31 150.80–153.69 the road home stretches faster than you can travel
function S31(t){deep(t,{speed:500});const k=P(t,150.8,153.69),ex=lerp(500,-300,eInOut(k));ctx.save();ctx.setLineDash([26,20]);ctx.strokeStyle=GOLD;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(ex+60,580);ctx.lineTo(1300,580);ctx.stroke();ctx.restore();
  earth(ex,580,lerp(70,30,k));ship(1350,580,1.0,t,{flame:1,tilt:Math.PI,mood:'shock'});const L=Math.round(lerp(16,40,k*k));TX(L+' BILLION LY HOME…',CX,860,80,WHITE);
  WR('THE ROAD HOME STRETCHES',CX,110,80,GOLD,t,150.8,32);if(t>151.99)WR('FASTER THAN YOU CAN TRAVEL',CX,220,72,WHITE,t,151.99,34);vignette();}
// S32 153.69–156.49 you are trapped in a bubble with no walls
function S32(t){deep(t,{dim:0.7});const z=lerp(1.25,0.75,eInOut(P(t,153.69,156.49)));ctx.save();ctx.translate(CX,600);ctx.scale(z,z);
  bubble(0,0,420,{fill:'rgba(127,168,216,0.14)',dash:true,col:'rgba(200,220,255,0.75)'});hero(0,250,1.3,t,{pose:'up',mood:'shock',col:WHITE});ctx.restore();
  ST('TRAPPED IN A BUBBLE',CX,110,100,WHITE,t,153.9);if(t>155.02)ST('WITH NO WALLS',CX,1000,110,RED,t,155.02,{stroke:8,strokeCol:'#000'});vignette(0.75);}
// ===================== ANSWER + CALLBACK =====================
// S33 156.49–165.61 does it have an edge? No. Infinite? Finite & curved? No wall to find.
function S33(t){paper();if(t<159.27){TX('DOES THE UNIVERSE HAVE AN EDGE?',CX,330,90,INK,{k:wk(t,156.49,'DOES THE UNIVERSE HAVE AN EDGE?',34)});ctx.save();shake(t,158.65,20,0.4);ST('NO.',CX,640,280,RED,t,158.65,{stroke:12,strokeCol:'#000'});ctx.restore();return;}
  const panel=(x,t0,title,draw)=>{if(t<t0)return;const k=pop(t,t0,0.3);ctx.save();ctx.translate(x,500);ctx.scale(k,k);rrect(-380,-300,760,560,24,{w:8,fill:'#0b0d18',seed:8900+x});ctx.save();ctx.beginPath();ctx.rect(-370,-290,740,540);ctx.clip();draw();ctx.restore();txt(title,0,310,64,{col:INK});ctx.restore();};
  panel(520,159.27,'INFINITE?',()=>{ctx.strokeStyle='rgba(127,168,216,0.6)';ctx.lineWidth=3;for(let i=-12;i<=12;i++){ctx.beginPath();ctx.moveTo(i*40,-40);ctx.lineTo(i*160,300);ctx.stroke();}for(let j=0;j<8;j++){const y=-40+j*j*6;ctx.beginPath();ctx.moveTo(-370,y);ctx.lineTo(370,y);ctx.stroke();}TX('∞',0,-170,150,GOLD);});
  panel(1400,160.42,'FINITE & CURVED?',()=>{ell(0,0,200,200,{w:6,col:'#cfd6ea',seed:8950});for(const ry of[60,130,190])ell(0,0,200,ry,{w:3,col:'rgba(207,214,234,0.6)',seed:8951+ry});for(const rx of[70,140])ell(0,0,rx,200,{w:3,col:'rgba(207,214,234,0.6)',seed:8960+rx});});
  if(t>162.23){ctx.fillStyle='rgba(246,244,248,0.93)';ctx.fillRect(0,0,W,H);ST('BUT ONE THING IS CERTAIN:',CX,250,90,INK,t,162.23);if(t>163.8){ctx.save();ctx.translate(CX,640);brickWall(0,0,420,300,0.9);ctx.restore();bigX(CX,640,260,t,164.12);ST('NO WALL TO FIND',CX,960,110,RED,t,164.12,{stroke:8,strokeCol:'#000'});}}}
// S34 165.61–169.90 fly forever… never hit a wall… never make it home (Earth fades behind you)
function S34(t){deep(t,{speed:700});const k=P(t,165.61,169.9);earth(lerp(300,120,k),600,lerp(60,14,k));ctx.save();ctx.globalAlpha=1-P(t,168.5,169.6);ctx.restore();ship(lerp(1100,1350,k),560,1.1,t);
  WR('YOU CAN FLY FOREVER…',CX,120,84,WHITE,t,165.61,30);if(t>166.91)ST('NEVER HIT A WALL',CX,850,90,GOLD,t,166.91);if(t>168.24)ST('NEVER MAKE IT HOME',CX,980,100,RED,t,168.24,{stroke:8,strokeCol:'#000'});vignette(0.7);}
// S35 169.90–178.21 CTA: alone… the back of your own head. Wave… or run? Comment HI or RUN
function S35(t){deep(t,{dim:0.7});if(t<174.25){const z=lerp(0.25,0.55,eInOut(P(t,171.88,174.2)));ctx.save();ctx.translate(CX,560);ctx.scale(z,z);heroBack(0,330,1.6,t,{col:'#cfd6ea'});ctx.restore();
    ctx.save();ctx.strokeStyle='#10121c';ctx.lineWidth=200;ctx.beginPath();ctx.ellipse(CX,560,1000,660,0,0,TAU);ctx.stroke();ctx.restore();ell(CX,560,900,560,{w:10,col:'#cfd6ea',seed:8501,amp:2});
    WR("YOU'RE OUT THERE. ALONE…",CX,120,80,WHITE,t,170.49,30);if(t>172.2)ST('THE BACK OF YOUR OWN HEAD',CX,980,74,RED,t,172.2);vignette(0.6);return;}
  paper();const L=t>174.51,Rn=t>175.6;hero(560,1040,1.35,t,{pose:L?'cheer':'relax',mood:'happy'});if(t>175.6)hero(1360,1040,1.35,t,{pose:'walk',mood:'scream'});
  if(L)ST('WAVE?',560,500,110,INK,t,174.51);if(Rn)ST('RUN?',1360,500,110,RED,t,175.6);
  if(t>176.25){const k=pop(t,176.25,0.3),ps=1+0.05*Math.sin(t*9);ctx.save();ctx.translate(CX,215);ctx.scale(k,k);rrect(-470,-150,940,300,30,{w:9,fill:'#fff',seed:9001});txt('COMMENT',0,-80,64,{col:INK});ctx.save();ctx.translate(0,45);ctx.scale(ps,ps);txt('HI  or  RUN',0,0,140,{col:RED,stroke:6,strokeCol:'#000'});ctx.restore();ctx.restore();}}
// S36 178.21–end like
function S36(t){paper();likeBtn(1250,560,1.7,t>179.41);hero(560,1000,2.0,t,{pose:'point',mood:'happy'});TX('IF THIS BLEW YOUR MIND',CX,150,110,INK);if(t>179.41)ST('HIT LIKE!',1250,860,120,RED,t,179.41);}
// ===================== timeline + transitions =====================
const SC=[[0,S1,'cut'],[3.40,S2,'whip'],[7.69,S3,'zoom'],[13.71,S4,'cut'],[15.59,S5,'flash'],[18.59,S6,'whip'],[21.83,S7,'zoom'],[28.41,S8,'whip'],[32.43,S9,'zoom'],[35.63,S10,'cut'],
  [45.74,S11,'whip'],[51.30,S12,'zoom'],[54.97,S13,'flash'],[60.46,S14,'whip'],[68.46,S15,'zoom'],[75.19,S16,'whip'],[81.23,S17,'zoom'],[83.67,S18,'flash'],[88.36,S19,'cut'],[94.22,S20,'flash'],
  [99.06,S21,'whip'],[104.13,S22,'cut'],[111.07,S23,'whip'],[114.70,S24,'zoom'],[121.42,S25,'cut'],[123.15,S26,'zoom'],[129.28,S27,'whip'],[132.81,S28,'flash'],[138.43,S29,'whip'],[144.74,S30,'zoom'],
  [150.80,S31,'whip'],[153.69,S32,'zoom'],[156.49,S33,'flash'],[165.61,S34,'whip'],[169.90,S35,'zoom'],[178.21,S36,'whip']];
const DUR7=181.4;const TMP=document.createElement('canvas');TMP.width=W;TMP.height=H;const TMPX=TMP.getContext('2d');
function render(t){BOIL=Math.floor(t/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  let i=0;while(i+1<SC.length&&t>=SC[i+1][0])i++;const c0=SC[i][0],tp=SC[i][2],u=t-c0;ctx.save();
  let k=0;if(i>0&&u<0.22){k=1-eOut(u/0.22);if(tp==='whip')ctx.translate(k*420,0);
    else if(tp==='zoom'){ctx.translate(CX,CY);ctx.scale(1+0.35*k,1+0.35*k);ctx.translate(-CX,-CY);}}
  SC[i][1](t);ctx.restore();ctx.filter='none';ctx.setTransform(1,0,0,1,0,0);
  // cheap motion blur: smear copies of the finished frame (no per-draw ctx.filter)
  if(k>0.05&&(tp==='whip'||tp==='zoom')){TMPX.clearRect(0,0,W,H);TMPX.drawImage(cv,0,0);for(let j=1;j<=5;j++){ctx.globalAlpha=0.22;
      if(tp==='whip')ctx.drawImage(TMP,-j*18*k,0);else{const z=1+j*0.03*k;ctx.drawImage(TMP,CX-CX*z,CY-CY*z,W*z,H*z);}}ctx.globalAlpha=1;}
  if(i>0&&tp==='flash'&&u<0.18){ctx.fillStyle=`rgba(255,255,255,${(1-u/0.18)*0.85})`;ctx.fillRect(0,0,W,H);}
  if(t>DUR7-0.6){ctx.fillStyle=`rgba(0,0,0,${P(t,DUR7-0.6,DUR7)})`;ctx.fillRect(0,0,W,H);}}
window.render=render;
window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
