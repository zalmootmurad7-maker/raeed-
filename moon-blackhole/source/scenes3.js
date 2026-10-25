// ================= VIDEO 3: What if the Moon were a black hole? =================
// timings from align.json (forced alignment of the final take)
const NIGHT='#2c2b36';

// ---------- new glyphs ----------
function hole(x,y,r,t,o={}){const s=o.s??1;if(s<=0)return;r*=s;
  if(o.ring!==false){ctx.save();ctx.globalAlpha=0.8;circ(x,y,r*2.1,{dash:[6,7],seed:5001,w:2.2,col:'#6b6975'});ctx.restore();
    for(let i=0;i<3;i++){const a=t*1.4+i*2.1;const pts=[];for(let j=0;j<=10;j++){const aa=a+j*0.16;const rr=r*(2.6-j*0.1);pts.push([x+Math.cos(aa)*rr,y+Math.sin(aa)*rr*0.55]);}strokePts(pts,1,1.8,'#8a8894');}}
  ctx.fillStyle='#111';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
function magnifier(x,y,r,k,o={}){if(k<=0)return;ctx.save();ctx.globalAlpha=clamp(k*2);circ(x,y,r*eOut(k),{seed:5010,w:LW+1.5,fill:o.fill});
  const a=Math.PI*0.25;const x0=x+Math.cos(a)*r,y0=y+Math.sin(a)*r;if(k>0.6){ctx.save();ctx.lineCap='round';ctx.strokeStyle=INK;ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(x0+6,y0+6);ctx.lineTo(x0+r*0.7,y0+r*0.7);ctx.stroke();ctx.restore();}ctx.restore();}
function sandGrain(x,y,r,seed=5020){const R=rng(seed),pts=[];for(let i=0;i<9;i++){const a=i/9*TAU;pts.push([x+Math.cos(a)*r*(0.8+R()*0.3),y+Math.sin(a)*r*(0.75+R()*0.3)]);}pts.push(pts[0]);fillPts(pts,'#ecd9a8');strokePts(wob(pts,seed,0.6),1,LW);
  for(let i=0;i<6;i++){ctx.fillStyle='#b99a5a';ctx.fillRect(x+(R()-.5)*r,y+(R()-.5)*r,3,3);}}
function pencilTip(x,y,s){const P2=(px,py)=>[x+px*s,y+py*s];const wood=[P2(0,0),P2(230,-60),P2(230,60)];fillPts(wood,'#f2d6a6');strokePts(wob([...wood,wood[0]],5030,0.6));
  const lead=[P2(0,0),P2(60,-15.6),P2(60,15.6)];fillPts(lead,'#555');strokePts(wob([...lead,lead[0]],5031,0.4));fillPts([P2(230,-60),P2(420,-60),P2(420,60),P2(230,60)],'#f6c445');rect(x+230*s,y-60*s,190*s,120*s,5032,1,LW);
  line(...P2(230,-20),...P2(420,-20),5033,1,2,'#c99a1f');line(...P2(230,20),...P2(420,20),5034,1,2,'#c99a1f');}
function bigWave(x,y,s,seed){const pts=[];for(let i=0;i<=30;i++){const u=i/30;pts.push([x-160*s+u*320*s,y-Math.sin(u*Math.PI)*120*s*(u<0.7?1:1.2)]);}
  const curl=[];for(let i=0;i<=16;i++){const a=-Math.PI/2+i/16*Math.PI*1.4;curl.push([x+70*s+Math.cos(a)*55*s,y-120*s+55*s+Math.sin(a)*55*s]);}
  fillPts([...pts,[x+160*s,y],[x-160*s,y]],'#d7e3f3');strokePts(wob(pts,seed,0.8),1,LW,'#2f5d9a');strokePts(wob(curl,seed+1,0.6),1,LW,'#2f5d9a');line(x-180*s,y,x+180*s,y,seed+2,1,LW,'#2f5d9a');}
function quake(x,y,s,seed){line(x-170*s,y,x+170*s,y,seed,1,LW);const R=rng(seed);const pts=[[x-20*s,y]];for(let i=1;i<7;i++)pts.push([x-20*s+(R()-.5)*40*s,y+i*16*s]);strokePts(wob(pts,seed+1,0.6),1,4,RED);
  for(const sd of[-1,1])fillPts([[x+sd*60*s,y],[x+sd*110*s,y],[x+sd*110*s,y-60*s],[x+sd*60*s,y-90*s]],PAPER),strokePts(wob([[x+sd*60*s,y],[x+sd*60*s,y-90*s],[x+sd*110*s,y-60*s],[x+sd*110*s,y]],seed+2+sd,0.5),1,LW);
  for(let i=0;i<3;i++){shakeMarks(x,y-40*s,70*s,seed+5+i,1);}}
function rocket(x,y,s,seed=5050,flame=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(flame>0){for(let i=-2;i<=2;i++){const fl=(50+30*Math.sin(flame*30+i))*clamp(flame);line(-110,i*8,-110-fl,i*12,seed+i,1,2.6,i%2?RED:'#e08a2e');}}
  const body=[[-110,-34],[60,-34],[120,0],[60,34],[-110,34]];fillPts(body,PAPER);strokePts(wob([...body,body[0]],seed,0.6));
  for(const sd of[-1,1]){const f=[[-110,sd*34],[-80,sd*34],[-125,sd*75]];fillPts(f,PINK);strokePts(wob([...f,f[0]],seed+sd+3,0.5),1,LW,RED);}
  circ(30,0,16,{seed:seed+7,fill:'#d7e3f3',w:2.6});ctx.restore();}
function telescope(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  for(const dx of[-60,0,60])line(0,0,dx,170,5060+dx,1,LW);
  ctx.rotate(-0.5);fillPts([[-40,-26],[170,-38],[170,38],[-40,26]],PAPER);strokePts(wob([[-40,-26],[170,-38],[170,38],[-40,26],[-40,-26]],5065,0.5));line(150,-38,150,38,5066,1,2);ctx.restore();}
function thermo(x,y,h,fill,col,seed){fillPts([[x-14,y-h],[x+14,y-h],[x+14,y],[x-14,y]],PAPER);rect(x-14,y-h,28,h,seed,1,LW);
  ctx.fillStyle=col;ctx.fillRect(x-7,y-h*fill,14,h*fill);circ(x,y+18,26,{fill:col,seed:seed+1,w:LW});for(let i=1;i<6;i++)line(x+14,y-h*i/6,x+28,y-h*i/6,seed+2+i,1,2);}
function lightSwitch(x,y,on,s=1){fillPts([[x-60*s,y-90*s],[x+60*s,y-90*s],[x+60*s,y+90*s],[x-60*s,y+90*s]],PAPER);rect(x-60*s,y-90*s,120*s,180*s,5080,1,LW);
  rect(x-22*s,y-45*s,44*s,90*s,5081,1,LW);const ty=on?-22:22;fillPts([[x-18*s,y+(ty-20)*s],[x+18*s,y+(ty-20)*s],[x+18*s,y+(ty+20)*s],[x-18*s,y+(ty+20)*s]],on?'#ffe066':'#888');
  txt(on?'ON':'OFF',x,y-120*s,40*s,{col:on?INK:RED});}
function frame(x,y,w,h,seed){fillPts([[x-w/2,y-h/2],[x+w/2,y-h/2],[x+w/2,y+h/2],[x-w/2,y+h/2]],'#e9d7b9');rect(x-w/2,y-h/2,w,h,seed,1,LW+1);rect(x-w/2+16,y-h/2+16,w-32,h-32,seed+1,1,2.4);}
function likeButton(x,y,s,pressed){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const rr=[[-150,-100],[150,-100],[150,100],[-150,100]];fillPts(rr,pressed?'#ffd7d2':PAPER);rect(-150,-100,300,200,5090,1,LW+1,pressed?RED:INK);
  // hand-drawn thumbs up
  const col=pressed?RED:INK;fillPts([[-70,-5],[-35,-5],[-35,70],[-70,70]],PAPER);rect(-70,-5,35,75,5091,1,LW,col);
  const hand=[[-30,-5],[0,-25],[10,-75],[35,-70],[30,-15],[75,-15],[80,0],[72,15],[78,30],[68,45],[72,58],[60,70],[-30,70]];fillPts(hand,PAPER);strokePts(wob([...hand,hand[0]],5092,0.5),1,LW,col);ctx.restore();}
function crescent(x,y,r,seed){ctx.save();moon(x,y,r,{seed});ctx.beginPath();ctx.arc(x,y,r+2,0,TAU);ctx.clip();ctx.fillStyle=BG;ctx.beginPath();ctx.arc(x+r*0.55,y-r*0.1,r*0.95,0,TAU);ctx.fill();ctx.restore();}
function eclipse(x,y,r,t){for(let i=0;i<24;i++){const a=i/24*TAU+t*0.1;const l=r*(1.25+0.25*Math.sin(i*3.7));line(x+Math.cos(a)*r*1.05,y+Math.sin(a)*r*1.05,x+Math.cos(a)*l,y+Math.sin(a)*l,5100+i,1,2.2,'#d9a400');}
  circ(x,y,r*1.08,{fill:'#ffe9a8',seed:5130,w:2,col:'#d9a400'});ctx.fillStyle='#1a1a1f';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
function nightSky(x,y,w,h,t,seed=5140){ctx.fillStyle=NIGHT;ctx.fillRect(x,y,w,h);rect(x,y,w,h,seed,1,LW+0.6);const R=rng(seed);for(let i=0;i<70;i++){const sx=x+12+R()*(w-24),sy=y+12+R()*(h-24),tw=0.5+0.5*Math.sin(t*3+i);ctx.fillStyle=`rgba(255,255,240,${0.4+0.6*tw})`;const ss=R()<0.15?3.2:1.8;ctx.fillRect(sx,sy,ss,ss);}}
function cam(z,fx=CX,fy=CY){ctx.translate(fx,fy);ctx.scale(z,z);ctx.translate(-fx,-fy);}

// ---------- scenes ----------
// 1 HOOK 0-7.2
function s1(t){
  const pull=eInOut(P(t,5.35,6.3));
  if(t<3.1){ // number written at full speed
    const s1='73,000,000,000,000,000,000';
    ctx.save();const j=t<0.4?0:3;ctx.translate(nz(t*30,1)*j,nz(t*33,2)*j);
    txt(s1,CX,430,150,{k:writeK(t,0.16,s1,19)});txt('TONS',CX,610,170,{k:writeK(t,1.95,'TONS',10),col:RED});ctx.restore();
    if(t>2.2){const k=P(t,2.2,2.9);ctx.save();ctx.globalAlpha=k;txt('(THE ENTIRE MOON)',CX,780,60,{});ctx.restore();}
    return;}
  // implode into a dot, magnifier, sand grain for scale
  cam(lerp(1,0.42,pull),CX,lerp(CY,300,pull));
  const imp=eIn(P(t,3.1,3.4));if(imp<1){ctx.save();ctx.translate(CX,520);ctx.scale(1-imp*0.98,1-imp*0.98);txt('73,000,000,000,000,000,000',0,-90,150,{});txt('TONS',0,90,170,{col:RED});ctx.restore();for(let i=0;i<14;i++){const a=i/14*TAU;line(CX+Math.cos(a)*(600-imp*500),520+Math.sin(a)*(600-imp*500),CX+Math.cos(a)*(400-imp*380),520+Math.sin(a)*(400-imp*380),5200+i,1,3);}}
  hole(CX,520,22,t,{s:pop(t,3.35),ring:false});
  magnifier(CX,520,170,P(t,3.5,3.9));
  if(t>3.9){sandGrain(CX+430,520,70);txt('A GRAIN OF SAND',CX+430,640,48,{k:writeK(t,4.1,'A GRAIN OF SAND',40)});arrow(CX+340,520,CX+200,520,{k:eOut(P(t,4.0,4.3)),seed:5210});}
  txt('SMALLER THAN',CX,250,72,{k:writeK(t,3.2,'SMALLER THAN',30),col:RED,a:1-pull});
  if(pull>0){ // the sky above you
    ctx.save();ctx.globalAlpha=pull;line(-1200,2050,3200,2050,5220,1,LW/0.42);figure(CX,2050,POSES.rest,{s:2.6});
    circ(CX,520,260,{dash:[16,14],seed:5221,w:3/0.42});txt('?!',CX+260,1240,220,{col:RED});ctx.restore();
    txt('RIGHT ABOVE YOUR HEAD',CX,-180,170,{k:writeK(t,5.5,'RIGHT ABOVE YOUR HEAD',30)});}
}
// 2 7.2-16.4 tonight we turn the Moon into a black hole
function s2(t){
  const col=eIn(P(t,9.5,10.1));
  if(col<1){moon(CX,420,lerp(230,10,col),{s:pop(t,7.3),seed:5301});if(col>0)for(let i=0;i<10;i++){const a=i/10*TAU+col*4;const r0=lerp(380,60,col);line(CX+Math.cos(a)*r0,420+Math.sin(a)*r0,CX+Math.cos(a+0.6)*(r0*0.6),420+Math.sin(a+0.6)*(r0*0.6),5310+i,1,2.6);}}
  else hole(CX,420,16,t,{s:pop(t,10.05,0.3)});
  txt('TONIGHT:',CX,110,62,{k:writeK(t,7.35,'TONIGHT:',20),col:RED});
  txt('THE MOON BECOMES A BLACK HOLE',CX,690,72,{k:writeK(t,8.6,'THE MOON BECOMES A BLACK HOLE',26)});
  const it=[[620,'EAT THE EARTH?',10.78,11.6],[1250,'EXPLODE?',12.01,12.6]];
  it.forEach(([x,s,t0,tc],i)=>{const y=840;if(t<t0)return;const w=txt(s,x,y,60,{k:writeK(t,t0,s,30)})||300;const k=eOut(P(t,tc,tc+0.3));if(k>0)line(x-w/2-14,y+2,x-w/2-14+(w+28)*k,y-2,5330+i,1,6,RED);});
  if(t>13.58){const k=P(t,13.6,14.0);ctx.save();ctx.globalAlpha=k;figure(1700,1040,POSES.chin,{s:0.75});shakeMarks(1700,830,55,5320,P(t,15.3,15.5));ctx.restore();
    txt('SOMETHING CREEPIER...',CX,1020,72,{k:writeK(t,13.9,'SOMETHING CREEPIER...',16),col:RED});}
}
// 3 16.4-22.0 promise
function s3(t){
  const R=CX+520;hole(R,520,16,t,{s:pop(t,16.5)});
  const sk=pop(t,16.6);if(sk>0)helmetFig(560,820,POSES.up,{s:0.95*sk});
  txt('BEFORE THIS VIDEO IS OVER...',CX,110,62,{k:writeK(t,16.58,'BEFORE THIS VIDEO IS OVER...',30)});
  txt('IT COULD TEAR YOU APART',CX,210,84,{k:writeK(t,18.9,'IT COULD TEAR YOU APART',26),col:RED});
  if(t>20.2){const k=eOut(P(t,20.2,20.6));arrow(700,560,lerp(700,R-60,k),560,{both:true,seed:5401,w:3,head:18});txt('6 KILOMETERS AWAY',(700+R)/2,620,56,{k:writeK(t,20.4,'6 KILOMETERS AWAY',30)});}
  if(t>21.2){ctx.save();ctx.globalAlpha=0.35;ctx.translate(560,600);ctx.scale(2.2,0.5);figure(0,220,POSES.up,{s:0.95});ctx.restore();}
}
// 4 22.0-30.1 size
function s4(t){
  txt('FIRST, THE SIZE',CX,100,64,{k:writeK(t,22.15,'FIRST, THE SIZE',30)});
  const mk=pop(t,23.77);moon(380,500,230,{s:mk,seed:5501});txt("THE MOON'S MASS",380,790,52,{k:writeK(t,24.1,"THE MOON'S MASS",30)});
  if(t>24.95){arrow(650,500,860,500,{k:eOut(P(t,24.95,25.3)),seed:5510,head:24});txt('CRUSHED',755,440,48,{k:writeK(t,25.0,'CRUSHED',20),col:RED});}
  if(t>25.6){hole(1150,500,12,t,{s:pop(t,25.7),ring:false});magnifier(1150,500,110,P(t,25.8,26.1));
    if(t>26.3){const k=eOut(P(t,26.3,26.7));line(1100,650,1100+100*k,650,5520,1,3);for(const xx of[1100,1200])line(xx,635,xx,665,5521+xx,k,3);txt('0.2 MM',1150,710,64,{k:writeK(t,26.4,'0.2 MM',12),col:RED});}}
  if(t>28.3){const s=pop(t,28.3)*1.0;if(s>0){ctx.save();ctx.translate(1340,500);ctx.scale(s,s);pencilTip(0,0,1.25);ctx.restore();}
    txt('SMALLER THAN THE TIP OF A PENCIL',1250,880,56,{k:writeK(t,28.4,'SMALLER THAN THE TIP OF A PENCIL',34)});}
}
// 5 30.1-40.0 expectations
function s5(t){
  figure(220,940,POSES.paper,{s:1.0});board(470,90,1360,700,1);
  txt('WHAT HAPPENS TO US?',1150,170,62,{k:writeK(t,30.3,'WHAT HAPPENS TO US?',30)});
  txt('CHAOS?',1150,260,56,{k:writeK(t,32.3,'CHAOS?',14),col:RED});
  const wob1=t>37.85?nz(t*30,1)*4:0;
  if(t>33.72){ctx.save();ctx.translate(wob1,0);quake(720,560,pop(t,33.72)*0.9||0.0001,5601);txt('EARTHQUAKES',720,680,48,{k:writeK(t,33.75,'EARTHQUAKES')});ctx.restore();}
  if(t>34.39){ctx.save();ctx.translate(-wob1,0);bigWave(1150,600,pop(t,34.39)*0.9||0.0001,5610);txt('GIANT WAVES',1150,680,48,{k:writeK(t,34.45,'GIANT WAVES')});ctx.restore();}
  if(t>35.58){const s=pop(t,35.58);hole(1600,480,10,t,{s});const sw=P(t,35.9,37.6);earth(lerp(1520,1585,sw),lerp(560,495,sw),70*(1-sw*0.6),{s,seed:5620,simple:true});
    for(let i=0;i<3;i++){const a=t*3+i*2;ctx.save();ctx.globalAlpha=0.6;circ(1600,480,40+i*22,{dash:[6,8],seed:5630+i,w:2,k:0.7});ctx.restore();}txt('SWALLOWED',1600,680,48,{k:writeK(t,35.98,'SWALLOWED')});}
  if(t>37.85)txt("BUT HERE'S THE TWIST...",1150,745,56,{k:writeK(t,37.9,"BUT HERE'S THE TWIST...",30),col:RED});
}
// 6 40.0-41.8 nothing changes
function s6(t){const z=1+P(t,40.0,41.8)*0.06;cam(z);
  txt('NOTHING CHANGES.',CX,470,150,{k:writeK(t,40.33,'NOTHING CHANGES.',22)});
  figure(CX,1020,POSES.shrug,{s:pop(t,40.9)*0.9});}
// 7 41.8-56.8 gravity, orbit, tides, invisible pull
function s7(t){
  if(t<48.4){txt('GRAVITY ONLY CARES ABOUT',CX,110,60,{k:writeK(t,41.88,'GRAVITY ONLY CARES ABOUT',34)});
    txt('MASS',700,220,84,{k:writeK(t,43.29,'MASS',12),col:RED});txt('+',CX,220,84,{k:writeK(t,43.6,'+',4)});txt('DISTANCE',1220,220,84,{k:writeK(t,44.0,'DISTANCE',16),col:RED});
    moon(560,560,190,{s:pop(t,44.9),seed:5701});hole(1360,560,12,t,{s:pop(t,45.0)});txt('MOON',560,800,52,{k:writeK(t,45.0,'MOON')});txt('BLACK HOLE',1360,800,52,{k:writeK(t,45.3,'BLACK HOLE')});
    const r1=[['SAME MASS',46.09],['SAME DISTANCE',47.33]];r1.forEach(([s,t0],i)=>{const y=900+i*80;const w=txt(s,CX,y,56,{k:writeK(t,t0,s,30)});check(CX+(w||300)/2+40,y-4,44,eOut(P(t,t0+0.3,t0+0.55)));});
    return;}
  if(t<51.85){// orbit unchanged
    earth(CX,560,170,{seed:5710});circ(CX,560,380,{ry:200,dash:[12,12],seed:5711,w:2.4});const a=t*0.9+1;hole(CX+Math.cos(a)*380,560+Math.sin(a)*200,10,t,{});
    txt('SAME ORBIT',CX,110,72,{k:writeK(t,48.55,'SAME ORBIT',20)});txt('EXACTLY LIKE BEFORE',CX,960,58,{k:writeK(t,50.3,'EXACTLY LIKE BEFORE',30)});return;}
  // tides + invisible pull
  const tide=Math.sin((t-51.9)*2.2);
  ctx.save();ctx.fillStyle='#e9e2cf';ctx.fillRect(0,760,W,320);ctx.restore();line(0,760,W,760,5720,1,LW);
  const wl=620+tide*40;ctx.save();ctx.fillStyle='#d7e3f3';ctx.beginPath();ctx.moveTo(0,wl);for(let x=0;x<=1100;x+=20)ctx.lineTo(x,wl+Math.sin(x/60+t*3)*8+(x>900?(x-900)*0.6:0));ctx.lineTo(1100,1080);ctx.lineTo(0,1080);ctx.closePath();ctx.fill();ctx.restore();
  const wpts=[];for(let x=0;x<=1100;x+=20)wpts.push([x,wl+Math.sin(x/60+t*3)*8+(x>900?(x-900)*0.6:0)]);strokePts(wpts,1,LW,'#2f5d9a');
  txt('THE TIDES STILL COME IN',CX,110,64,{k:writeK(t,51.9,'THE TIDES STILL COME IN',30)});txt('TWICE A DAY',CX,190,52,{k:writeK(t,53.07,'TWICE A DAY',24)});
  if(t>54.4){for(let i=0;i<5;i++){const x=200+i*190;const k=eOut(P(t,54.4+i*0.08,54.8+i*0.08));arrow(x,wl-20,x+60,wl-110*k-30,{k,seed:5730+i,col:RED,w:3});}
    figure(1500,770,POSES.shrug,{s:pop(t,54.7)*0.85||0.0001});txt("WHO'S PULLING?!",1500,330,72,{k:writeK(t,55.3,"WHO'S PULLING?!",22),col:RED});}
}
// 8 56.8-60.8 creepy... but
function s8(t){cam(1+P(t,56.8,60.8)*0.08);figure(CX,1030,POSES.chin,{s:2.0});shakeMarks(CX,500,120,5801,P(t,57.3,57.6));
  txt('CREEPY.',CX,140,110,{k:writeK(t,57.38,'CREEPY.',16),col:RED,a:1-P(t,58.4,58.6)});
  txt('BUT NOT EVERYTHING STAYS THE SAME',CX,140,64,{k:writeK(t,58.6,'BUT NOT EVERYTHING STAYS THE SAME',34)});}
// 9 60.8-75.9 no more moonlight
function s9(t){
  if(t<66.4){const SX=230,SY=480,MX=1100,MY=360,EX=1600,EY=760;sunGlyph(SX,SY,150,t,{seed:5901});
    const isHole=t>=64.18;if(!isHole)moon(MX,MY,120,{s:pop(t,60.95),seed:5902});else hole(MX,MY,10,t,{s:pop(t,64.2)});
    earth(EX,EY,110,{seed:5903});figure(EX,EY-108,POSES.rest,{s:0.35});
    const k1=eOut(P(t,62.72,63.3));arrow(SX+190,SY-20,lerp(SX+190,MX-130,k1),lerp(SY-20,MY+10,k1),{k:k1,seed:5910,col:'#d9a400',w:4});
    if(!isHole){const k2=eOut(P(t,63.3,63.8));if(k2>0)arrow(MX+90,MY+90,lerp(MX+90,EX-100,k2),lerp(MY+90,EY-90,k2),{k:k2,seed:5911,col:'#d9a400',w:4});}
    else{cross(MX+250,MY+200,40,P(t,65.0,65.4));}
    txt("THE MOON HAS NO LIGHT OF ITS OWN",CX,100,58,{k:writeK(t,60.95,"THE MOON HAS NO LIGHT OF ITS OWN",34)});
    if(t>62.72)txt('IT REFLECTS THE SUN',CX,980,56,{k:writeK(t,62.8,'IT REFLECTS THE SUN',30),a:1-P(t,64.0,64.2)});
    if(t>64.18)txt('A BLACK HOLE REFLECTS NOTHING',CX,980,60,{k:writeK(t,64.3,'A BLACK HOLE REFLECTS NOTHING',30),col:RED});return;}
  nightSky(160,140,1600,560,t);
  txt('EVERY NIGHT: MOONLESS',CX,80,62,{k:writeK(t,66.5,'EVERY NIGHT: MOONLESS',30)});
  const ph=[['FULL MOON',69.95,0],['CRESCENT',71.16,1]];ph.forEach(([s,t0,i])=>{const x=520+i*420,y=880;if(t<t0-0.3)return;const sc=pop(t,t0-0.25);if(sc<=0)return;if(i===0)moon(x,y-30,70,{s:sc,seed:5920});else crescent(x,y-30,70*sc,5921);txt(s,x,y+75,44,{k:writeK(t,t0,s,24)});cross(x,y-30,80,P(t,t0+0.45,t0+0.75));});
  if(t>72.33){txt('JUST STARS',1400,860,62,{k:writeK(t,72.4,'JUST STARS',20)});}
  if(t>73.56){const k=P(t,73.6,74.2);ctx.save();ctx.globalAlpha=k;circ(1300,380,90,{dash:[10,10],col:'#cfcfe0',seed:5930,w:2.6});ctx.restore();txt('?',1300,380,90,{col:'#cfcfe0',a:k});txt("A HOLE YOU CAN'T SEE",1300,520,48,{k:writeK(t,74.6,"A HOLE YOU CAN'T SEE",30),col:'#ffe066'});}
}
// 10 75.9-82.8 no more eclipses
function s10(t){
  if(t<79.5){eclipse(CX,470,170,t);txt('TOTAL SOLAR ECLIPSES',CX,110,70,{k:writeK(t,76.1,'TOTAL SOLAR ECLIPSES',30)});
    if(t>77.68){cross(CX,470,240,P(t,77.68,78.0));txt('GONE.',CX-180,860,96,{k:writeK(t,77.7,'GONE.',12),col:RED});}
    if(t>78.39)txt('FOREVER.',CX+200,860,96,{k:writeK(t,78.4,'FOREVER.',14),col:RED});return;}
  sunGlyph(CX,520,300,t,{seed:6001});hole(CX-60,480,8,t,{s:pop(t,79.62)});magnifier(CX-60,480,70,P(t,79.8,80.1),{fill:'rgba(255,255,255,0.0)'});
  txt('A SPECK THIS SMALL',CX,100,62,{k:writeK(t,79.6,'A SPECK THIS SMALL',30)});txt("CAN'T BLOCK THE SUN",CX,1000,72,{k:writeK(t,81.37,"CAN'T BLOCK THE SUN",30),col:RED});
  if(t>80.1)arrow(CX-300,300,CX-110,440,{k:eOut(P(t,80.1,80.4)),seed:6010,col:RED});
}
// 11 82.8-94.9 microlensing flash
function s11(t){
  txt("HOW WOULD WE KNOW IT'S THERE?",CX,95,62,{k:writeK(t,82.95,"HOW WOULD WE KNOW IT'S THERE?",34)});
  figure(230,960,POSES.point,{s:0.9});telescope(330,780,0.9);
  if(t>85.46){const VX=1150,VY=520,VR=330;ctx.save();ctx.beginPath();ctx.arc(VX,VY,VR,0,TAU);ctx.clip();ctx.fillStyle=NIGHT;ctx.fillRect(VX-VR,VY-VR,VR*2,VR*2);const R=rng(6101);for(let i=0;i<40;i++){ctx.fillStyle='rgba(255,255,240,0.8)';ctx.fillRect(VX+(R()-.5)*VR*2,VY+(R()-.5)*VR*2,2.4,2.4);}
      // the star
      const flash=Math.exp(-Math.pow((t-91.6)/0.35,2));const sr=7+flash*30;ctx.fillStyle='#fff8d0';ctx.beginPath();ctx.arc(VX,VY,sr,0,TAU);ctx.fill();if(flash>0.1){for(let i=0;i<8;i++){const a=i/8*TAU;ctx.strokeStyle=`rgba(255,240,170,${flash})`;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(VX+Math.cos(a)*sr*1.2,VY+Math.sin(a)*sr*1.2);ctx.lineTo(VX+Math.cos(a)*sr*3,VY+Math.sin(a)*sr*3);ctx.stroke();}}
      // hole crossing in front
      const hx=lerp(VX-VR-30,VX+VR+30,P(t,86.8,94.2));ctx.fillStyle='#000';ctx.beginPath();ctx.arc(hx,VY+8,9,0,TAU);ctx.fill();ctx.strokeStyle='#8a8894';ctx.setLineDash([5,6]);ctx.lineWidth=2;ctx.beginPath();ctx.arc(hx,VY+8,20,0,TAU);ctx.stroke();ctx.setLineDash([]);
      // bent light rays
      if(t>88.9&&t<93.5){ctx.strokeStyle='rgba(255,240,170,0.8)';ctx.lineWidth=2.4;for(const sd of[-1,1]){ctx.beginPath();ctx.moveTo(VX,VY);ctx.quadraticCurveTo(hx,VY+8+sd*60,VX-VR,VY+sd*20);ctx.stroke();}}
      ctx.restore();circ(VX,VY,VR,{seed:6102,w:LW+1.5});
    txt('WATCH THE STARS',1150,960,58,{k:writeK(t,85.5,'WATCH THE STARS',24),a:1-P(t,88.7,88.9)});
    if(t>88.9)txt('ITS GRAVITY BENDS THE LIGHT',1150,960,58,{k:writeK(t,88.95,'ITS GRAVITY BENDS THE LIGHT',30),a:1-P(t,90.4,90.6)});
    if(t>90.6)txt('FLASH!',1580,300,96,{k:writeK(t,91.4,'FLASH!',14),col:RED,a:1-P(t,93.9,94.2)});
    if(t>92.71)txt('FOR A SPLIT SECOND',1150,960,58,{k:writeK(t,92.75,'FOR A SPLIT SECOND',30)});}
}
// 12 94.9-100.4 remember? let's go visit
function s12(t){
  const R=CX+520;hole(R,520,16,t,{});helmetFig(560,820,POSES.up,{s:0.95});
  arrow(700,560,R-60,560,{both:true,seed:5401,w:3,head:18});txt('6 KILOMETERS AWAY',(700+R)/2,620,56,{});
  txt('REMEMBER?',CX,140,96,{k:writeK(t,95.9,'REMEMBER?',16),col:RED});
  if(t>99.5){txt("LET'S GO VISIT",CX,960,80,{k:writeK(t,99.5,"LET'S GO VISIT",24)});}
}
// 13 100.4-116.4 the trip and the stretch
function s13(t){
  const HX=1700,HY=520;hole(HX,HY,14,t,{});
  // distance readout
  const dist=t<103.3?lerp(40,10,P(t,100.5,103.3)):t<105.7?10:t<106.7?lerp(10,6,P(t,105.7,106.7)):6;
  ctx.save();ctx.fillStyle=PAPER;ctx.fillRect(80,60,420,120);ctx.restore();rect(80,60,420,120,6301,1,LW);txt('DISTANCE: '+Math.round(dist)+' KM',290,120,56,{col:dist<=6?RED:INK});
  if(t<107.8){const rx=lerp(-200,900,eOut(P(t,100.5,102.0)))+lerp(0,200,P(t,102.0,107.6));rocket(rx,HY,1.4,6310,t);
    if(t>102.11)txt('EVERYTHING IS FINE',900,820,62,{k:writeK(t,102.11,'EVERYTHING IS FINE',30),a:1-P(t,103.2,103.4)});
    if(t>103.34){const w=txt('10 KM: STILL FINE',900,820,62,{k:writeK(t,103.34,'10 KM: STILL FINE',24)});check(900+(w||480)/2+40,815,46,eOut(P(t,104.9,105.2)));}
    return;}
  // astronaut lying feet-first toward the hole, stretched
  const st=P(t,111.2,115.9);const sx=1+eIn(st)*2.2,sy=1-st*0.5;const AX=720,AY=520;
  ctx.save();ctx.translate(AX,AY);ctx.scale(sx,sy);ctx.rotate(-Math.PI/2);helmetFig(0,190,POSES.up,{s:1.25});ctx.restore();
  const fk=eOut(P(t,108.1,108.5));if(fk>0){arrow(AX+200*sx,AY+110,AX+200*sx+200*fk,AY+110,{seed:6320,col:RED,w:9,head:28});txt('FEET: 10 G',AX+200*sx+100,AY+185,58,{col:RED,k:writeK(t,109.1,'FEET: 10 G',12)});
    arrow(AX-200*sx,AY+110,AX-200*sx+30*fk,AY+110,{seed:6321,w:3,head:12});txt('HEAD',AX-200*sx,AY+185,44,{k:writeK(t,110.4,'HEAD',10)});}
  txt('YOUR FEET ARE PULLED 10 G HARDER',CX,860,62,{k:writeK(t,107.92,'YOUR FEET ARE PULLED 10 G HARDER',30),a:1-P(t,111.1,111.3)});
  if(t>111.27){txt('LONGER...',CX,860,72,{k:writeK(t,113.05,'LONGER...',16)});if(t>114.16)txt('AND LONGER...',CX,950,62,{k:writeK(t,114.16,'AND LONGER...',18)});txt('AAAAAA!',AX-200,300,72,{k:writeK(t,111.5,'AAAAAA!',8),col:RED});}
}
// 14 116.4-120.3 spaghettification
function s14(t){
  // plate of spaghetti made of stretched stick figures
  const PX=CX,PY=560;circ(PX,PY,300,{ry:130,fill:PAPER,seed:6401,w:LW+0.5});circ(PX,PY,230,{ry:95,seed:6402,w:2.4});
  for(let i=0;i<14;i++){const pts=[];for(let j=0;j<=24;j++){const u=j/24;pts.push([PX-200+u*400,PY-40+Math.sin(u*8+i)*22+(i-7)*6]);}strokePts(wob(pts,6410+i,1),eOut(P(t,116.5+i*0.05,117.4+i*0.05)),3.4,'#c79a3a');}
  // one noodle has a helmet
  if(t>117)circ(PX+215,PY-40+Math.sin(8)*22,22,{seed:6430,w:2.6,fill:PAPER});
  txt('SCIENTISTS CALL THIS...',CX,140,62,{k:writeK(t,116.6,'SCIENTISTS CALL THIS...',30)});
  const w=txt('SPAGHETTIFICATION',CX,880,120,{k:writeK(t,118.77,'SPAGHETTIFICATION',22),col:RED});
  if(t>119.6){const k=eOut(P(t,119.6,120.0));line(CX-(w||900)/2,950,CX-(w||900)/2+(w||900)*k,948,6440,1,6,RED);}
}
// 15 120.3-135.9 Hawking radiation; colder than space; grows
function s15(t){
  const HX=CX,HY=470;const grow=P(t,130.9,133.3);const shrinkDemo=t>125.8&&t<127.3?Math.sin((t-125.8)*6)*0.15:0;
  hole(HX,HY,26*(1+grow*0.35+shrinkDemo),t,{});
  txt('WOULD IT EVER GO AWAY?',CX,95,64,{k:writeK(t,120.4,'WOULD IT EVER GO AWAY?',30)});
  if(t>122.37&&t<130.2){for(let i=0;i<8;i++){const a=i/8*TAU+0.2;const r0=80,ph=((t*0.8+i*0.13)%1);wave(HX+Math.cos(a)*(r0+ph*60),HY+Math.sin(a)*(r0+ph*60),HX+Math.cos(a)*(r0+ph*60+80),HY+Math.sin(a)*(r0+ph*60+80),1,i,'#8a6dc7',5,16,2.2);}
    txt('HAWKING RADIATION',CX,720,62,{k:writeK(t,124.4,'HAWKING RADIATION',26),col:'#6a4fb0'});
    if(t>125.83)txt('IT SHOULD SHRINK...',CX,800,52,{k:writeK(t,125.9,'IT SHOULD SHRINK...',30)});}
  if(t>127.3){const k=pop(t,127.3);ctx.save();ctx.globalAlpha=clamp(k*2)*(1-P(t,130.0,130.3));
      thermo(420,760,320,0.3,'#5b8fd6',6501);txt('BLACK HOLE',420,840,46,{});txt('1.7 K',420,900,54,{col:'#2f5d9a'});
      thermo(1500,760,320,0.48,'#f08a7a',6510);txt('SPACE',1500,840,46,{});txt('2.7 K',1500,900,54,{col:RED});
      txt('COLDER THAN SPACE ITSELF',CX,1000,62,{k:writeK(t,128.2,'COLDER THAN SPACE ITSELF',30),col:RED});ctx.restore();}
  if(t>130.24){for(let i=0;i<8;i++){const a=i/8*TAU+0.2;const ph=1-((t*0.8+i*0.13)%1);wave(HX+Math.cos(a)*(90+ph*90),HY+Math.sin(a)*(90+ph*90),HX+Math.cos(a)*(70+ph*60),HY+Math.sin(a)*(70+ph*60),1,i,'#5b8fd6',5,16,2.2);}
    txt('INSTEAD OF SHRINKING...',CX,760,58,{k:writeK(t,130.4,'INSTEAD OF SHRINKING...',30)});txt('IT GROWS',CX,860,104,{k:writeK(t,132.6,'IT GROWS',16),col:RED,a:1-P(t,133.5,133.7)});
    if(t>133.6)txt('FOR AN UNIMAGINABLY LONG TIME',CX,880,64,{k:writeK(t,133.6,'FOR AN UNIMAGINABLY LONG TIME',26)});}
}
// 16 135.9-147.0 review + turn off the night
function s16(t){
  figure(200,940,POSES.paper,{s:0.95});board(430,90,1430,720,1);
  txt("LET'S REVIEW:",1145,160,58,{k:writeK(t,136.5,"LET'S REVIEW:",24)});
  const cx=[700,1145,1590],Y=390;
  protonBall(cx[0],Y,105,{s:pop(t,137.44),pr:8});txt('PROTON MOON',cx[0],560,44,{k:writeK(t,137.5,'PROTON MOON')});txt('BLOWS ITSELF APART',cx[0],625,44,{k:writeK(t,138.3,'BLOWS ITSELF APART',30),col:RED});
  antiMoon(cx[1],Y,105,{s:pop(t,139.69),seed:6601});txt('ANTIMATTER MOON',cx[1],560,44,{k:writeK(t,139.8,'ANTIMATTER MOON',30)});txt('BLOWS US APART',cx[1],625,44,{k:writeK(t,140.85,'BLOWS US APART',26),col:RED});
  if(t>142.9){hole(cx[2],Y,16,t,{s:pop(t,143.1)});txt('BLACK HOLE MOON',cx[2],560,44,{k:writeK(t,143.2,'BLACK HOLE MOON',30)});}
  for(const x of[922,1367])line(x,230,x,760,6610+x,eOut(P(t,139.4,139.7)),2.2);
  if(t>144.6){lightSwitch(cx[2],700,t<145.96,0.75);}
  if(t>145.96){const k=P(t,145.96,146.4);ctx.save();ctx.globalAlpha=k*0.55;ctx.fillStyle='#141320';ctx.fillRect(0,0,W,H);ctx.restore();txt('...TURNS OFF THE NIGHT',1145,1000,64,{k:writeK(t,146.0,'...TURNS OFF THE NIGHT',30),col:'#ffe066'});}
}
// 17 147.0-150.1 I miss the old one
function s17(t){
  frame(1150,480,380,380,6701);moon(1150,480,130,{seed:6702});
  const hold={la:[1.3,2.0],ra:[1.7,1.5],ll:[-0.26,-0.2],rl:[0.26,0.2],paper:0};figure(780,980,hold,{s:1.15});
  txt('I MISS THE OLD ONE',CX,110,72,{k:writeK(t,148.57,'I MISS THE OLD ONE',26)});
  if(t>149.0){const ty=lerp(0,40,P(t,149.0,149.9));ctx.fillStyle='#7fb2e8';ctx.beginPath();ctx.ellipse(800,980-264*1.15+20+ty,7,11,0,0,TAU);ctx.fill();}
  heart(1420,300,2.2+0.15*Math.sin(t*7));
}
// 18 150.1-153.6 like CTA
function s18(t){
  const pressed=t>151.85;const bs=pop(t,150.2)*(pressed?1+0.15*Math.exp(-(t-151.85)*6):1);
  likeButton(1250,520,bs*1.5,pressed);
  figure(560,960,POSES.point,{s:1.2});
  txt('IF THIS BLEW YOUR MIND',CX,120,74,{k:writeK(t,150.17,'IF THIS BLEW YOUR MIND',30)});
  txt('HIT LIKE!',1250,900,110,{k:writeK(t,151.58,'HIT LIKE!',18),col:RED});
  if(pressed){const tl=t-151.85,k=eOut(clamp(tl/0.3)),fa=1-clamp((tl-0.4)/0.6);ctx.save();ctx.globalAlpha=Math.max(0,fa);for(let i=0;i<16;i++){const a=i/16*TAU;line(1250+Math.cos(a)*(250+k*40),520+Math.sin(a)*(170+k*30),1250+Math.cos(a)*(290+k*90),520+Math.sin(a)*(200+k*70),6801+i,1,4,i%2?RED:INK);}ctx.restore();for(let i=0;i<4;i++)heart(1050+i*130,250-((tl*120)%160),1.4);}
}
// 19 153.6-155.5 end card
function s19(t){txt('WHAT IF THE MOON',CX,420,104,{k:writeK(t,153.65,'WHAT IF THE MOON',34)});txt('WERE A BLACK HOLE?',CX,560,104,{k:writeK(t,154.1,'WERE A BLACK HOLE?',34),col:RED});hole(CX,740,14,t,{s:pop(t,154.6)});}

const SCENES=[[0,7.2,s1],[7.2,16.4,s2],[16.4,22.0,s3],[22.0,30.1,s4],[30.1,40.0,s5],[40.0,41.8,s6],[41.8,56.8,s7],[56.8,60.8,s8],[60.8,75.9,s9],[75.9,82.8,s10],
  [82.8,94.9,s11],[94.9,100.4,s12],[100.4,116.4,s13],[116.4,120.3,s14],[120.3,135.9,s15],[135.9,147.0,s16],[147.0,150.1,s17],[150.1,153.6,s18],[153.6,999,s19]];
const SHAKES=[[0.16,12,6],[3.35,18,5],[10.05,10,6],[40.33,8,6],[91.5,6,6],[111.3,8,3],[151.85,10,6]];
function shake(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0&&t-t0<3){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}
  if(t>111.3&&t<116.3){const k=P(t,111.3,116)*7;x+=nz(t*60,1)*k;y+=nz(t*55,2)*k;}return[x,y];}
function render(t){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let idx=SCENES.findIndex(s=>t>=s[0]&&t<s[1]);if(idx<0)idx=SCENES.length-1;
  const[sx,sy]=shake(t);ctx.save();ctx.translate(sx,sy);
  const st=SCENES[idx][0];const z=1+0.02*P(t,st,SCENES[idx][1]);cam(z);
  SCENES[idx][2](t);ctx.restore();
  const fo=P(t,DURATION-0.6,DURATION);if(fo>0){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(246,244,248,${fo})`;ctx.fillRect(0,0,W,H);}
}
window.render=render;window.DURATION=DURATION;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
