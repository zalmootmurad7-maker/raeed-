// ================= EPISODE 4: Every human vanished — the last light =================
// timings from align.json (final, tightened voiceover)
const WIN='#ffd84a',EXITG='#39d27a';
function softGlow(x,y,r,c,a){if(a<=0)return;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');ctx.save();ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();}

function nightPanel(x,y,w,h,t,seed=7001,a=1){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.fillStyle=NIGHT;ctx.fillRect(x,y,w,h);const R=rng(seed);for(let i=0;i<90;i++){const sx=x+R()*w,sy=y+R()*h*0.6,tw=0.5+0.5*Math.sin(t*3+i);ctx.fillStyle=`rgba(255,255,240,${0.3+0.6*tw})`;ctx.fillRect(sx,sy,R()<0.15?3:2,R()<0.15?3:2);}ctx.restore();rect(x,y,w,h,seed+1,1,LW+0.6);}

// ---------- city skyline: windows switch off by time ----------
const CITY=(()=>{const R=rng(7100),b=[];let x=150;while(x<1780){const w=110+R()*120,h=220+R()*420;b.push({x,w,h,cols:Math.max(2,Math.floor(w/42)),rows:Math.max(3,Math.floor(h/58)),ph:R()});x+=w+18+R()*30;}return b;})();
function city(t,offAt,base=980,o={}){ // offAt(b,i) -> time this window goes dark (Infinity = stays lit)
  CITY.forEach((b,bi)=>{const x=b.x,y=base-b.h;ctx.fillStyle='#3d3c4a';ctx.fillRect(x,y,b.w,b.h);rect(x,y,b.w,b.h,7110+bi,1,2.6,'#0f0f14');
    const cw=b.w/(b.cols+1),ch=b.h/(b.rows+1);let k=0;
    for(let r=0;r<b.rows;r++)for(let c=0;c<b.cols;c++){k++;const wx=x+cw*(c+1)-11,wy=y+ch*(r+1)-12;const lit=t<offAt(bi,k,b);
      ctx.fillStyle=lit?WIN:'#2a2934';ctx.fillRect(wx,wy,22,24);}
  });
  if(o.street){ctx.fillStyle='#15141b';ctx.fillRect(100,base,1720,28);}
}
function poof(x,y,tl){if(tl<0||tl>0.5)return;const k=tl/0.5;ctx.save();ctx.globalAlpha=1-k;for(let i=0;i<8;i++){const a=i/8*TAU;line(x+Math.cos(a)*(8+k*30),y+Math.sin(a)*(8+k*30),x+Math.cos(a)*(14+k*44),y+Math.sin(a)*(14+k*44),7200+i,1,2.4,'#fff');}ctx.restore();}
const PEOPLE=(()=>{const R=rng(7300),a=[];for(let i=0;i<16;i++)a.push({x:180+R()*1560,d:R()*0.5,s:0.28+R()*0.05});return a;})();
function exitSign(x,y,s,glow,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  softGlow(0,0,330,`rgba(57,210,122,${0.75*glow})`,1);
  ctx.fillStyle=`rgba(20,60,36,1)`;ctx.fillRect(-180,-75,360,150);
  ctx.fillStyle=`rgba(${Math.round(lerp(40,57,glow))},${Math.round(lerp(70,210,glow))},${Math.round(lerp(50,122,glow))},1)`;ctx.fillRect(-168,-63,336,126);
  rect(-180,-75,360,150,7400,1,LW+1);
  ctx.save();ctx.font='400 86px "PH"';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillStyle=glow>0.25?'#f4fff7':'#7da88c';ctx.fillText('EXIT',-150,4);ctx.restore();
  // running pictogram
  ctx.strokeStyle=glow>0.25?'#f4fff7':'#7da88c';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.arc(95,-36,11,0,TAU);ctx.stroke();
  ctx.beginPath();ctx.moveTo(90,-22);ctx.lineTo(80,14);ctx.moveTo(80,14);ctx.lineTo(60,42);ctx.moveTo(80,14);ctx.lineTo(108,40);ctx.moveTo(86,-6);ctx.lineTo(62,-12);ctx.moveTo(86,-6);ctx.lineTo(112,4);ctx.stroke();
  if(o.arrow!==false){ctx.beginPath();ctx.moveTo(130,0);ctx.lineTo(165,0);ctx.moveTo(152,-13);ctx.lineTo(165,0);ctx.lineTo(152,13);ctx.stroke();}
  ctx.restore();}
function battery(x,y,w,h,f,col,seed){fillPts([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],PAPER);rect(x,y,w,h,seed,1,LW);ctx.fillStyle=INK;ctx.fillRect(x+w,y+h*0.3,10,h*0.4);
  if(f>0){ctx.fillStyle=col;ctx.fillRect(x+8,y+8,(w-16)*f,h-16);}}
function phone(x,y,s,pct,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle=PAPER;ctx.beginPath();ctx.roundRect(-130,-250,260,500,34);ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=LW+1;ctx.stroke();
  ctx.fillStyle='#22212b';ctx.beginPath();ctx.roundRect(-112,-220,224,420,18);ctx.fill();
  battery(-70,-70,130,70,pct/100,pct>20?'#7ad36a':RED,7500);
  ctx.save();ctx.font='400 64px "PH"';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#fff';ctx.fillText(Math.max(0,Math.round(pct))+'%',0,70);ctx.restore();
  ctx.restore();
  // cable
  const plugX=x,plugY=y+250*s;const gap=o.unplug?eOut(clamp(o.unplug))*90:0;
  fillPts([[plugX-18,plugY+gap],[plugX+18,plugY+gap],[plugX+18,plugY+gap+46],[plugX-18,plugY+gap+46]],INK);
  strokePts(wob([[plugX,plugY+gap+46],[plugX+10,plugY+gap+140],[plugX-40,plugY+gap+230]],7510,1),1,6);
  if(o.unplug>0&&o.unplug<1.2){for(let i=0;i<6;i++){const a=-Math.PI/2+(i-2.5)*0.4;line(plugX+Math.cos(a)*20,plugY+gap/2+Math.sin(a)*20,plugX+Math.cos(a)*44,plugY+gap/2+Math.sin(a)*44,7520+i,1,3,RED);}}
}
function powerPlant(x,y,t,on){ // y=ground
  fillPts([[x,y],[x+260,y],[x+260,y-170],[x,y-170]],PAPER);rect(x,y-170,260,170,7600,1,LW);
  for(let i=0;i<4;i++){ctx.fillStyle=on?WIN:'#cfcdd6';ctx.fillRect(x+24+i*58,y-120,32,38);}
  const tw=[[x+300,y],[x+470,y],[x+440,y-290],[x+330,y-290]];fillPts(tw,PAPER);strokePts(wob([...tw,tw[0]],7601,0.8),1,LW);
  fillPts([[x+200,y-170],[x+235,y-170],[x+235,y-360],[x+200,y-360]],PAPER);rect(x+200,y-360,35,190,7602,1,LW);
  if(on){for(let i=0;i<4;i++){const ph=((t*0.6+i*0.25)%1);const cp=cloudPath(x+385+ph*40,y-320-ph*170,42+ph*30,26+ph*18,7610+i);ctx.save();ctx.globalAlpha=0.9*(1-ph);fillPts(cp,'#ffffff');strokePts(wob(cp,7620+i,0.6),1,2.4,'#999');ctx.restore();}}
}
function hospital(x,y,lit,t){fillPts([[x,y],[x+420,y],[x+420,y-380],[x,y-380]],PAPER);rect(x,y-380,420,380,7700,1,LW+0.6);
  for(let r=0;r<4;r++)for(let c=0;c<4;c++){ctx.fillStyle=lit?WIN:'#3a3946';ctx.fillRect(x+40+c*95,y-330+r*78,50,46);}
  ctx.fillStyle=RED;ctx.fillRect(x+180,y-470,60,150);ctx.fillRect(x+135,y-425,150,60);rect(x+180,y-470,60,150,7701,1,2.4,RED);}
function generator(x,y,running,t,fuel){fillPts([[x,y],[x+230,y],[x+230,y-150],[x,y-150]],'#e7e4ec');rect(x,y-150,230,150,7710,1,LW);
  for(let i=0;i<4;i++)line(x+30+i*25,y-120,x+30+i*25,y-30,7711+i,1,3);
  // fuel gauge
  const gx=x+160,gy=y-70;circ(gx,gy,40,{seed:7720,w:3,fill:PAPER});const a=Math.PI*(1.15+0.7*fuel*0+(-0.7+1.4*fuel));
  line(gx,gy,gx+Math.cos(Math.PI+fuel*Math.PI)*32,gy+Math.sin(Math.PI+fuel*Math.PI)*32,7721,1,4,fuel<0.2?RED:INK);
  txt('FUEL',gx,gy+62,30,{});
  if(running){shakeMarks(x+115,y-75,130,7730,1);for(let i=0;i<3;i++){const ph=((t*1.5+i/3)%1);const cp=cloudPath(x+40-ph*30,y-170-ph*90,16+ph*16,10+ph*10,7740+i);ctx.save();ctx.globalAlpha=1-ph;fillPts(cp,'#d9d6de');strokePts(wob(cp,7750+i,0.5),1,2,'#888');ctx.restore();}}}
function vacuum(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#e9e7ef';ctx.beginPath();ctx.ellipse(0,0,80,30,0,0,TAU);ctx.fill();circ(0,0,80,{ry:30,seed:7800,w:LW});
  circ(0,-8,22,{ry:8,seed:7801,w:2.4});ctx.fillStyle='#6ad16a';ctx.beginPath();ctx.arc(30,-6,5,0,TAU);ctx.fill();ctx.restore();}
function dock(x,y,alive){fillPts([[x-50,y],[x+50,y],[x+40,y-110],[x-40,y-110]],'#d9d6de');strokePts(wob([[x-50,y],[x-40,y-110],[x+40,y-110],[x+50,y],[x-50,y]],7810,0.6),1,LW);
  ctx.fillStyle=alive?'#6ad16a':'#3a3946';ctx.beginPath();ctx.arc(x,y-80,9,0,TAU);ctx.fill();}
function iss(x,y,s,t,lit){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(-0.08);
  if(lit)softGlow(0,0,260,'rgba(255,216,74,0.55)',1);
  line(-300,0,300,0,7900,1,7);
  for(const sx of[-270,-170,170,270])for(const sy of[-1,1]){const px=sx-35,py=sy<0?-150:20;fillPts([[px,py],[px+70,py],[px+70,py+130],[px,py+130]],'#c9d6ee');rect(px,py,70,130,7910+sx+sy,1,3);for(let k=1;k<4;k++)line(px,py+k*32,px+70,py+k*32,7920+k+sx,1,1.4,'#6a7aa0');line(sx,sy<0?-20:0,sx,sy<0?0:20,7930+sx,1,3);}
  for(const[mx,mw]of[[-90,90],[10,110],[120,70]]){fillPts([[mx,-28],[mx+mw,-28],[mx+mw,28],[mx,28]],PAPER);rect(mx,-28,mw,56,7940+mx,1,3);
    for(let k=0;k<2;k++){ctx.fillStyle=lit?WIN:'#3a3946';ctx.beginPath();ctx.arc(mx+mw*(k+1)/3,0,9,0,TAU);ctx.fill();}}
  ctx.restore();}
function solarLamp(x,y,s,lit){ctx.save();ctx.translate(x,y);ctx.scale(s,s);line(0,0,0,-160,8000+Math.floor(x),1,LW);
  if(lit)softGlow(0,-190,90,'rgba(255,216,74,0.8)',1);
  circ(0,-190,30,{seed:8010+Math.floor(x),w:3,fill:lit?'#fff3b0':'#d9d6de'});fillPts([[-36,-222],[36,-222],[28,-236],[-28,-236]],'#9fb2d6');strokePts([[-36,-222],[-28,-236],[28,-236],[36,-222],[-36,-222]],1,3);ctx.restore();}
function cabin(x,y,lit,vines){fillPts([[x,y],[x+300,y],[x+300,y-190],[x,y-190]],PAPER);rect(x,y-190,300,190,8100,1,LW);
  const roof=[[x-30,y-190],[x+150,y-320],[x+330,y-190]];fillPts(roof,'#d9d6de');strokePts(wob([...roof,roof[0]],8101,0.6),1,LW);
  const pn=[[x+175,y-290],[x+280,y-215],[x+250,y-200],[x+150,y-272]];fillPts(pn,'#9fb2d6');strokePts(wob([...pn,pn[0]],8102,0.4),1,3);
  if(lit)softGlow(x+90,y-100,120,'rgba(255,216,74,0.7)',1);ctx.fillStyle=lit?WIN:'#3a3946';ctx.fillRect(x+50,y-140,80,70);rect(x+50,y-140,80,70,8103,1,3);
  fillPts([[x+190,y],[x+250,y],[x+250,y-110],[x+190,y-110]],'#cdb79a');rect(x+190,y-110,60,110,8104,1,3);
  if(vines>0){const R=rng(8110);for(let v=0;v<7;v++){const vx=x+R()*300,len=vines*(80+R()*160);const pts=[];for(let i=0;i<=10;i++){pts.push([vx+Math.sin(i*1.3+v)*14,y-i*len/10]);}strokePts(pts,1,3.2,'#4f8a3c');for(let i=2;i<10;i+=2){const p=pts[i];ctx.fillStyle='#5ea34a';ctx.beginPath();ctx.ellipse(p[0]+8,p[1],9,5,0.5,0,TAU);ctx.fill();}}}}
function clockBadge(label,a){if(a<=0||!label)return;ctx.save();ctx.globalAlpha=a;ctx.fillStyle=PAPER;ctx.fillRect(1560,40,320,96);rect(1560,40,320,96,8200,1,LW);
  circ(1612,88,30,{seed:8201,w:3,fill:'#fff'});line(1612,88,1612,66,8202,1,3);line(1612,88,1630,94,8203,1,3);
  txt(label,1760,90,58,{col:RED});ctx.restore();}

// ---------- scenes ----------
// 1: 0-4.1 vanish + cities go dark
function e1(t){
  nightPanel(60,40,1800,1000,t,7001);
  city(t,(bi,k)=>t<2.0?Infinity:2.1+bi*0.13+(k%5)*0.05,980,{street:true});
  PEOPLE.forEach((p,i)=>{const tv=1.33+p.d*0.3;if(t<tv)figure(p.x,1000,POSES.rest,{s:p.s,seed:7310+i});else poof(p.x,940,t-tv);});
  txt('EVERY HUMAN:',CX,150,96,{k:clamp(0.3+t/0.4),col:'#ffffff'});
  if(t>1.33)txt('GONE',CX,265,130,{k:writeK(t,1.33,'GONE',14),col:RED});
  if(t>2.1){ctx.save();ctx.globalAlpha=1-P(t,2.6,2.9);ctx.restore();}
}
// 2: 4.1-9.1 one light 50 years / one never goes out
function e2(t){
  nightPanel(60,40,1800,1000,t,7002);
  const g=1;exitSign(560,560,1.0,g,t);
  txt('STILL GLOWING',560,330,76,{k:writeK(t,4.14,'STILL GLOWING',30),col:'#ffffff'});
  txt('IN 50 YEARS',560,800,96,{k:writeK(t,5.66,'IN 50 YEARS',26),col:EXITG});
  if(t>7.24){const k=eOut(P(t,7.24,7.8));softGlow(1380,540,300*k,'rgba(255,255,255,0.8)',k);
    ctx.save();ctx.globalAlpha=k;ctx.font='400 260px "PH"';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ffffff';ctx.fillText('?',1380,560);ctx.restore();
    txt('NEVER GOES OUT',1380,850,84,{k:writeK(t,7.79,'NEVER GOES OUT',26),col:RED});}
}
// 3: 9.1-12.5 the question + start the clock
function e3(t){
  txt('WHEN DOES THE',CX,300,110,{k:clamp(0.4+(t-9.15)/0.4)});
  txt('LAST LIGHT',CX,450,150,{k:writeK(t,9.9,'LAST LIGHT',22),col:RED});txt('GO OUT?',CX,600,120,{k:writeK(t,10.6,'GO OUT?',18)});
  const k=pop(t,11.4);if(k>0){ctx.save();ctx.translate(CX,830);ctx.scale(k,k);circ(0,0,110,{seed:8300,w:LW+2,fill:'#fff'});for(let i=0;i<12;i++){const a=i/12*TAU;line(Math.cos(a)*90,Math.sin(a)*90,Math.cos(a)*102,Math.sin(a)*102,8301+i,1,3);}
    const hand=(t-11.4)*6;line(0,0,Math.cos(hand-Math.PI/2)*80,Math.sin(hand-Math.PI/2)*80,8320,1,6,RED);line(0,0,0,-55,8321,1,6);ctx.restore();}
}
// 4: 12.5-22.7 hour one: plants shut down, click click click
function e4(t){
  if(t<17.55){ // plant + empty control room
    powerPlant(160,900,t,true);
    // power lines to a small lit city
    line(640,640,1100,560,8400,1,3);line(640,660,1100,590,8401,1,3);
    ctx.save();ctx.translate(1180,900);fillPts([[0,0],[600,0],[600,-360],[0,-360]],NIGHT);rect(0,-360,600,360,8402,1,LW);
    for(let b=0;b<5;b++){const bh=120+b*37%140;ctx.fillStyle='#3d3c4a';ctx.fillRect(30+b*112,-bh,90,bh);for(let r=0;r<3;r++)for(let c=0;c<2;c++){ctx.fillStyle=WIN;ctx.fillRect(45+b*112+c*38,-bh+20+r*34,20,20);}}ctx.restore();
    txt('HOUR 1',CX,130,110,{k:writeK(t,12.6,'HOUR 1',14),col:RED});
    if(t>14.16){txt('NEEDS HUMANS',800,240,64,{k:writeK(t,14.16,'NEEDS HUMANS',30)});txt('EVERY SECOND',800,320,52,{k:writeK(t,15.3,'EVERY SECOND',30)});}
    if(t>16.36){const k=pop(t,16.36);ctx.save();ctx.translate(1500,330);ctx.scale(k,k);fillPts([[-120,40],[120,40],[120,60],[-120,60]],'#cdb79a');rect(-120,40,240,20,8410,1,3);
      fillPts([[-50,-60],[50,-60],[50,30],[-50,30]],'#22212b');rect(-50,-60,100,90,8411,1,3);
      strokePts(wob([[-40,-10],[-20,-30],[0,0],[20,-25],[40,-5]],8412,0.4),1,3,'#7ad36a');
      strokePts([[160,40],[160,-30],[210,-30],[210,40]],1,LW);line(160,10,210,10,8413,1,LW);ctx.restore();
      txt("NOBODY'S WATCHING",1500,470,52,{k:writeK(t,16.4,"NOBODY'S WATCHING",34),col:RED});}
    return;}
  if(t<20.75){ // three regions click off
    const regions=[[100,18.82],[700,19.47],[1300,20.11]];
    regions.forEach(([x,tc],i)=>{const off=t>=tc;ctx.fillStyle=NIGHT;ctx.fillRect(x,250,520,640);rect(x,250,520,640,8420+i,1,LW);
      const R=rng(8430+i);for(let b=0;b<4;b++){const bh=180+R()*300,bx=x+30+b*122;ctx.fillStyle='#3d3c4a';ctx.fillRect(bx,890-bh,100,bh);for(let r=0;r<Math.floor(bh/60);r++)for(let c=0;c<2;c++){ctx.fillStyle=off?'#2a2934':WIN;ctx.fillRect(bx+18+c*44,890-bh+18+r*58,22,26);}}
      if(off&&t-tc<0.45){ctx.save();ctx.globalAlpha=1-(t-tc)/0.45;ctx.fillStyle='#000';ctx.fillRect(x,250,520,640);ctx.restore();}
      if(t>tc-0.05){ctx.save();const k=eBack(clamp((t-tc)/0.2));ctx.translate(x+260,170);ctx.scale(k,k);txt('CLICK',0,0,96,{col:RED});ctx.restore();}});
    txt('SHUT DOWN',CX,980,64,{k:writeK(t,17.86,'SHUT DOWN',24)});
    return;}
  // whole countries: Earth night side
  const EX=CX,EY=620,ER=330;earth(EX,EY,ER,{seed:8440});
  ctx.save();ctx.beginPath();ctx.arc(EX,EY,ER,0,TAU);ctx.clip();ctx.fillStyle='rgba(20,18,30,0.82)';ctx.fillRect(EX-ER,EY-ER,ER*2,ER*2);
  const R=rng(8450);for(let i=0;i<160;i++){const a=R()*TAU,d=Math.sqrt(R())*ER*0.95;const x=EX+Math.cos(a)*d,y=EY+Math.sin(a)*d;const off=21.0+(x-(EX-ER))/(2*ER)*1.2;if(t<off){ctx.fillStyle=WIN;ctx.fillRect(x,y,4,4);}}
  ctx.restore();circ(EX,EY,ER,{seed:8451,w:LW+0.6});
  txt('WHOLE COUNTRIES',CX,130,96,{k:writeK(t,20.79,'WHOLE COUNTRIES',30)});txt('GONE DARK',CX,240,96,{k:writeK(t,21.87,'GONE DARK',22),col:RED});
}
// 5: 22.7-26.85 phone
function e5(t){const pct=t<23.67?100:lerp(99,93,P(t,24.0,26.8));
  phone(CX,500,1.2,pct,t,{unplug:t<23.67?0:(t-23.67)/0.3});
  txt('YOUR PHONE',500,250,90,{k:writeK(t,22.84,'YOUR PHONE',30)});
  txt('STOPPED',1440,420,90,{k:writeK(t,23.67,'STOPPED',20),col:RED});txt('CHARGING',1440,520,90,{k:writeK(t,24.0,'CHARGING',20),col:RED});
  if(t>25.95){const k=eOut(P(t,25.95,26.4));arrow(1440,640,1440,640+180*k,{seed:8500,col:RED,w:10,head:30});}
}
// 6: 26.85-33.0 hospital generators
function e6(t){const out=t>=32.4;const fuel=clamp(1-P(t,29.3,32.4));
  ctx.save();cam(1.35,560,960);hospital(240,940,!out||t<32.45,t);generator(760,940,!out,t,fuel);ctx.restore();
  txt('DAY 1',CX,110,110,{k:writeK(t,26.9,'DAY 1',14),col:RED});
  txt('BACKUP GENERATORS',1440,300,72,{k:writeK(t,28.9,'BACKUP GENERATORS',34)});
  if(t>30.22)txt('A FEW DAYS',1440,400,72,{k:writeK(t,30.3,'A FEW DAYS',24)});
  if(t>31.6){txt('THEN: EMPTY',1440,510,84,{k:writeK(t,31.8,'THEN: EMPTY',22),col:RED});}
  
}
// 7: 33.0-41.25 robot vacuum
function e7(t){
  ctx.fillStyle='#ece8df';ctx.fillRect(0,820,W,260);line(0,820,W,820,8600,1,LW);
  // wall clock
  circ(300,330,120,{seed:8601,w:LW+1,fill:'#fff'});line(300,330,300,240,8602,1,7);line(300,330,360,330,8603,1,7);txt('9:00 AM',300,510,72,{});
  const DX=1640,DY=960;ctx.save();cam(1.8,DX,DY);dock(DX,DY,t<40.6);ctx.restore();
  // path: leave dock, zig-zag, return
  let vx,vy;if(t<38.6){const u=P(t,33.8,38.4);const zig=[[DX-120,900],[400,880],[1200,1010],[600,1030],[1500,900]];const seg=Math.min(3.999,u*4),i=Math.floor(seg),f=eInOut(seg-i);vx=lerp(zig[i][0],zig[i+1][0],f);vy=lerp(zig[i][1],zig[i+1][1],f);}
  else{const f=eInOut(P(t,38.6,39.5));vx=lerp(1500,DX-120,f);vy=lerp(900,DY-30,f);}
  if(t<38.4)for(let i=1;i<9;i++){ctx.fillStyle='rgba(120,120,140,0.3)';const tt=t-i*0.12;}
  vacuum(vx,vy,2.3,t);
  if(t>36.5&&t<38.6){txt('EMPTY HOUSE',900,560,84,{k:writeK(t,36.52,'EMPTY HOUSE',30)});}
  if(t>37.56&&t<38.8){for(let i=0;i<6;i++){const a=i/6*TAU;line(vx+Math.cos(a)*120,vy-40+Math.sin(a)*60,vx+Math.cos(a)*140,vy-40+Math.sin(a)*72,8610+i,1,3,'#d9a400');}txt('SPOTLESS',vx,vy-170,72,{k:writeK(t,37.56,'SPOTLESS',20)});}
  if(t>40.12){txt('THE DOCK IS DEAD.',1000,560,110,{k:writeK(t,40.12,'THE DOCK IS DEAD.',26),col:RED});}
}
// 8: 41.25-57.9 the ISS
function e8(t){
  nightPanel(60,40,1800,1000,t,7008);
  // dark Earth arc
  ctx.save();ctx.beginPath();ctx.arc(CX,2300,1550,0,TAU);ctx.fillStyle='#14131a';ctx.fill();ctx.restore();circ(CX,2300,1550,{seed:8700,w:LW});
  const fall=P(t,53.65,56.0),sink=P(t,50.66,53.65);
  if(t<54.6){const x=lerp(CX,CX+160,sink+fall),y=lerp(560,680,sink)+fall*200,s=lerp(1.15,0.8,sink+fall);iss(x,y,s,t,true);}
  if(t>54.4){const tl=t-54.4;const x=CX+160+tl*260,y=780+tl*70;ctx.save();const g=ctx.createLinearGradient(x-360,y-120,x,y);g.addColorStop(0,'rgba(255,140,0,0)');g.addColorStop(1,'rgba(255,200,80,1)');ctx.strokeStyle=g;ctx.lineWidth=18;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-360,y-120);ctx.lineTo(x,y);ctx.stroke();ctx.restore();softGlow(x,y,90,'rgba(255,220,120,1)',1);}
  if(t<45.7){txt("BUT THE BRIGHTEST LIGHT",CX,130,72,{k:writeK(t,41.3,"BUT THE BRIGHTEST LIGHT",34),col:'#ffffff'});txt("ISN'T ON EARTH",CX,230,84,{k:writeK(t,42.9,"ISN'T ON EARTH",26),col:RED});}
  else if(t<50.6){txt('SPACE STATION: STILL LIT',CX,130,72,{k:writeK(t,45.77,'SPACE STATION: STILL LIT',34),col:'#ffffff'});if(t>49.58)txt('NOBODY HOME',CX,860,84,{k:writeK(t,49.58,'NOBODY HOME',24),col:RED});}
  else if(t<56.0){txt('NO ONE TO BOOST IT',CX,130,72,{k:writeK(t,50.7,'NO ONE TO BOOST IT',30),col:'#ffffff'});if(t<54.6){const a=eOut(P(t,52.0,52.6));arrow(CX+460,520,CX+460,520+160*a,{seed:8710,col:RED,w:8,head:24});}}
  else txt('OUR LAST SHOOTING STAR',CX,130,80,{k:writeK(t,56.03,'OUR LAST SHOOTING STAR',36),col:WIN});
}
// 9: 57.9-65.55 year one: solar lamps, cabins, day/night
function e9(t){const day=Math.sin((t-57.9)*1.3)>0;const nightA=day?0:1;
  ctx.fillStyle=day?'#eaf2fb':NIGHT;ctx.fillRect(60,40,1800,1000);rect(60,40,1800,1000,8800,1,LW+0.6);
  if(day)sunGlyph(1600,240,70,t,{seed:8801});else{circ(1600,240,60,{dash:[10,10],seed:8802,w:2.6,col:'#9a98a6'});}
  ctx.fillStyle='#cfe0b8';ctx.fillRect(60,860,1800,180);line(60,860,1860,860,8803,1,LW);
  cabin(1100,860,!day,0);
  [300,480,660,840].forEach((x,i)=>solarLamp(x,890,1.1,!day&&t>60.4));
  battery(1180,560,150,64,day?clamp(((t-57.9)*1.3%(2*Math.PI))/Math.PI):0.6,'#7ad36a',8810);
  txt('YEAR 1',CX,120,110,{k:writeK(t,57.98,'YEAR 1',14),col:RED});
  if(t>63.2)txt('CHARGE BY DAY, GLOW BY NIGHT',CX,230,64,{k:writeK(t,63.23,'CHARGE BY DAY, GLOW BY NIGHT',34),col:day?INK:'#ffffff'});
}
// 10: 65.55-70.65 year ten: dead
function e10(t){const dark=t>=70.0;
  ctx.fillStyle=NIGHT;ctx.fillRect(60,40,1800,1000);rect(60,40,1800,1000,8900,1,LW+0.6);
  ctx.fillStyle='#55634a';ctx.fillRect(60,860,1800,180);
  cabin(1100,860,false,eOut(P(t,67.7,69.6)));
  [300,480,660,840].forEach((x,i)=>{solarLamp(x,890,1.1,t<66.6+i*0.15);});
  battery(1180,560,150,64,0,RED,8910);if(t>66.65)cross(1255,592,50,P(t,66.7,67.0));
  // dust
  const R=rng(8920);ctx.save();ctx.globalAlpha=P(t,67.7,69.0)*0.6;for(let i=0;i<120;i++){ctx.fillStyle='#b8a888';ctx.fillRect(1240+R()*120,600+R()*80,3,3);}ctx.restore();
  txt('YEAR 10',CX,120,110,{k:writeK(t,65.64,'YEAR 10',14),col:RED});
  if(t>66.65)txt('BATTERIES DEAD',CX,230,72,{k:writeK(t,66.65,'BATTERIES DEAD',30),col:'#ffffff'});
  if(dark){ctx.save();ctx.globalAlpha=clamp((t-70.0)/0.25)*0.85;ctx.fillStyle='#000';ctx.fillRect(60,40,1800,1000);ctx.restore();txt('DARK.',CX,560,180,{k:writeK(t,70.04,'DARK.',12),col:'#ffffff'});}
}
// 11: 70.65-86.9 exit signs
function e11(t){
  const corridor=t>80.6;
  nightPanel(60,40,1800,1000,t,7011);
  if(corridor){// empty corridor perspective
    ctx.strokeStyle='#4a4958';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(60,1040);ctx.lineTo(760,620);ctx.moveTo(1860,1040);ctx.lineTo(1160,620);ctx.moveTo(60,40);ctx.lineTo(760,420);ctx.moveTo(1860,40);ctx.lineTo(1160,420);ctx.stroke();
    ctx.strokeRect(760,420,400,200);}
  const glow=t<78.4?1:t<80.6?lerp(1,0.5,P(t,79.5,80.4)):lerp(0.5,0.12,P(t,80.6,82.6));
  const s=corridor?0.75:1.15,y=corridor?520:470;exitSign(CX,y,s,glow,t);
  if(t<73.0)txt("NEEDS NO POWER",CX,880,90,{k:writeK(t,71.2,"NEEDS NO POWER",30),col:'#ffffff'});
  else if(t<78.3){txt('TRITIUM',CX,150,110,{k:writeK(t,74.87,'TRITIUM',20),col:EXITG});if(t>75.7)txt('RADIOACTIVE GAS, GLOWS ON ITS OWN',CX,860,60,{k:writeK(t,75.74,'RADIOACTIVE GAS, GLOWS ON ITS OWN',40),col:'#ffffff'});}
  else if(!corridor){txt('EVERY 12 YEARS: HALF AS BRIGHT',CX,150,72,{k:writeK(t,78.39,'EVERY 12 YEARS: HALF AS BRIGHT',40),col:'#ffffff'});
    const bars=[1,0.5,0.25,0.125,0.0625];bars.forEach((b,i)=>{const k=eOut(P(t,78.6+i*0.25,78.9+i*0.25));const bx=560+i*170,bh=220*b*k;ctx.fillStyle=EXITG;ctx.fillRect(bx,1010-bh,90,bh);rect(bx,790,90,220,8950+i,1,2.4,'#9a98a6');txt(String(i*12)+' YRS',bx+45,755,46,{col:'#ffffff',a:k});});}
  else{txt('50 YEARS LATER',CX,150,90,{k:writeK(t,80.62,'50 YEARS LATER',26),col:'#ffffff'});
    if(t>84.4)txt('STILL POINTING TO THE EXIT',CX,860,64,{k:writeK(t,84.4,'STILL POINTING TO THE EXIT',36),col:EXITG});
    if(t>85.97)txt('...FOR NOBODY.',CX,960,72,{k:writeK(t,85.97,'...FOR NOBODY.',20),col:RED});}
}
// 12: 86.9-91.4 not even close / remember
function e12(t){
  if(t<89.5){txt('THE LAST LIGHT?',CX,330,120,{k:writeK(t,86.94,'THE LAST LIGHT?',30)});
    if(t>88.36){ctx.save();const k=eBack(clamp((t-88.36)/0.25));ctx.translate(CX,620);ctx.scale(k,k);ctx.rotate(-0.05);txt('NOT EVEN CLOSE',0,0,150,{col:RED});ctx.restore();}return;}
  nightPanel(60,40,1800,1000,t,7012);softGlow(CX,560,300,'rgba(255,255,255,0.8)',1);
  ctx.save();ctx.font='400 260px "PH"';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ffffff';ctx.fillText('?',CX,580);ctx.restore();
  txt('REMEMBER?',CX,150,110,{k:writeK(t,89.58,'REMEMBER?',18),col:WIN});txt('THE ONE THAT NEVER GOES OUT',CX,900,72,{k:writeK(t,90.0,'THE ONE THAT NEVER GOES OUT',40),col:'#ffffff'});
}
// 13: 91.4-104 light leaving Earth
function e13(t){
  nightPanel(60,40,1800,1000,t,7013);
  if(t<96.9){const EX=CX,EY=580,ER=200;earth(EX,EY,ER,{seed:8460});ctx.save();ctx.beginPath();ctx.arc(EX,EY,ER,0,TAU);ctx.clip();ctx.fillStyle='rgba(20,18,30,0.75)';ctx.fillRect(EX-ER,EY-ER,2*ER,2*ER);
      const R=rng(8470);for(let i=0;i<90;i++){const a=R()*TAU,d=Math.sqrt(R())*ER*0.9;ctx.fillStyle=WIN;ctx.fillRect(EX+Math.cos(a)*d,EY+Math.sin(a)*d,4,4);}ctx.restore();circ(EX,EY,ER,{seed:8471,w:LW,col:'#cfcfe0'});
    for(let i=0;i<5;i++){const ph=((t-91.4)*0.45+i/5)%1;ctx.save();ctx.globalAlpha=1-ph;ctx.strokeStyle=WIN;ctx.lineWidth=5;ctx.beginPath();ctx.arc(EX,EY,ER+20+ph*700,0,TAU);ctx.stroke();ctx.restore();}
    txt("TONIGHT'S LIGHT HAS ALREADY LEFT",CX,130,68,{k:writeK(t,91.5,"TONIGHT'S LIGHT HAS ALREADY LEFT",40),col:'#ffffff'});
    if(t>94.3)txt('300,000 KM EVERY SECOND',CX,940,72,{k:writeK(t,94.32,'300,000 KM EVERY SECOND',32),col:WIN});return;}
  // distance ladder
  const Y=560;line(220,Y,1780,Y,8480,1,3,'#9a98a6');
  earth(220,Y,46,{seed:8481,simple:true,w:3});
  const stops=[[560,'THE SUN','8 MIN',96.95],[1060,'NEAREST STAR','4 YEARS',99.04],[1640,'ANDROMEDA','2,500,000 YEARS',101.36]];
  const px=t<96.95?220:t<99.04?lerp(220,560,eOut(P(t,96.95,97.9))):t<101.36?lerp(560,1060,eOut(P(t,99.04,100.6))):lerp(1060,1640,eOut(P(t,101.36,103.0)));
  stops.forEach(([x,n,d,t0],i)=>{if(t<t0-0.2)return;const k=pop(t,t0-0.2);if(i===0)sunGlyph(x,Y,40*k+0.01,t,{seed:8490});else if(i===1){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,Y,12*k,0,TAU);ctx.fill();}else{ctx.save();ctx.translate(x,Y);ctx.scale(k,k);ctx.rotate(-0.4);ctx.fillStyle='rgba(220,220,255,0.6)';ctx.beginPath();ctx.ellipse(0,0,90,30,0,0,TAU);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,0,24,10,0,0,TAU);ctx.fill();ctx.restore();}
    txt(n,x,Y-130,62,{k:writeK(t,t0,n,30),col:'#ffffff'});txt(d,x,Y+140,i===2?56:72,{k:writeK(t,t0+0.15,d,26),col:WIN});});
  softGlow(px,Y,70,'rgba(255,230,120,1)',1);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(px,Y,12,0,TAU);ctx.fill();
}
// 14: 104-107.3 maybe never
function e14(t){nightPanel(60,40,1800,1000,t,7014);
  for(let i=0;i<4;i++){const ph=((t-104)*0.35+i/4)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.8;ctx.strokeStyle=WIN;ctx.lineWidth=4;ctx.beginPath();ctx.arc(CX,560,60+ph*900,0,TAU);ctx.stroke();ctx.restore();}
  txt('WHEN DOES THE LAST LIGHT GO OUT?',CX,200,70,{k:writeK(t,104.07,'WHEN DOES THE LAST LIGHT GO OUT?',40),col:'#ffffff'});
  if(t>106.36){const k=eBack(clamp((t-106.36)/0.3));ctx.save();ctx.translate(CX,600);ctx.scale(k,k);txt('MAYBE NEVER.',0,0,190,{col:WIN});ctx.restore();}}
// 15: 107.3-111.9 we were here
function e15(t){nightPanel(60,40,1800,1000,t,7015);
  earth(300,560,40,{seed:8530,simple:true,w:3});
  const x=lerp(380,1500,eOut(P(t,107.4,111.0)));
  for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=0.6-i*0.18;ctx.strokeStyle=WIN;ctx.lineWidth=4;ctx.beginPath();ctx.arc(300,560,x-300-i*40,-0.35,0.35);ctx.stroke();ctx.restore();}
  if(t>110.2){ctx.save();ctx.translate(x,560);ctx.rotate(-0.05);txt('WE WERE HERE',0,-10,110,{k:writeK(t,110.23,'WE WERE HERE',20),col:WIN});ctx.restore();}
  txt('OUR LIGHT KEEPS TRAVELING',CX,170,72,{k:writeK(t,108.7,'OUR LIGHT KEEPS TRAVELING',34),col:'#ffffff'});}
// 16: 111.9-118.2 like CTA + comment ask
function e16(t){
  const pressed=t>113.3;const bs=pop(t,112.0)*(pressed?1+0.15*Math.exp(-(t-113.3)*6):1);likeButton(1250,460,bs*1.4,pressed);
  figure(520,1000,POSES.point,{s:1.2});
  txt('IF THIS BLEW YOUR MIND',CX,110,74,{k:writeK(t,111.94,'IF THIS BLEW YOUR MIND',30)});
  txt('HIT LIKE!',1250,790,110,{k:writeK(t,113.15,'HIT LIKE!',18),col:RED});
  if(pressed&&t<114.0){const tl=t-113.3;for(let i=0;i<16;i++){const a=i/16*TAU;line(1250+Math.cos(a)*(240+tl*90),460+Math.sin(a)*(160+tl*60),1250+Math.cos(a)*(280+tl*140),460+Math.sin(a)*(190+tl*90),8600+i,1,4,i%2?RED:INK);}}
  if(t>114.1){const k=eOut(P(t,114.1,114.4));ctx.save();ctx.globalAlpha=k;fillPts([[1020,880],[1720,880],[1720,1040],[1100,1040],[1060,1070],[1070,1040],[1020,1040]],PAPER);strokePts(wob([[1020,880],[1720,880],[1720,1040],[1100,1040],[1060,1070],[1070,1040],[1020,1040],[1020,880]],8650,0.6),1,LW);ctx.restore();
    txt('WHAT SHOULD VANISH NEXT?',1370,940,52,{k:writeK(t,114.87,'WHAT SHOULD VANISH NEXT?',34)});txt('BEST IDEA = NEXT EPISODE',1370,1005,40,{k:writeK(t,116.27,'BEST IDEA = NEXT EPISODE',34),col:RED});}
}
// 17: end card
function e17(t){nightPanel(60,40,1800,1000,t,7017);exitSign(CX,640,0.8,0.6,t);
  txt('EVERY HUMAN VANISHED.',CX,240,96,{k:writeK(t,118.25,'EVERY HUMAN VANISHED.',40),col:'#ffffff'});txt('THE LAST LIGHT',CX,370,110,{k:writeK(t,118.9,'THE LAST LIGHT',30),col:WIN});}

const SCENES=[[0,4.1,e1],[4.1,9.1,e2],[9.1,12.5,e3],[12.5,22.75,e4],[22.75,26.85,e5],[26.85,33.0,e6],[33.0,41.25,e7],[41.25,57.9,e8],[57.9,65.55,e9],[65.55,70.65,e10],
  [70.65,86.9,e11],[86.9,91.4,e12],[91.4,104.0,e13],[104.0,107.3,e14],[107.3,111.9,e15],[111.9,118.2,e16],[118.2,999,e17]];
const CLOCK=[[12.6,'HOUR 1'],[26.9,'DAY 1'],[41.25,null],[57.98,'YEAR 1'],[65.64,'YEAR 10'],[70.65,null],[80.62,'YEAR 50'],[86.9,null]];
function clockLabel(t){let l=null,lt=0;for(const[t0,s]of CLOCK)if(t>=t0){l=s;lt=t0;}return (t-lt>2.4)?l:null;}
const SHAKES=[[0.0,10,6],[1.33,14,6],[18.82,8,8],[19.47,8,8],[20.11,10,7],[40.7,6,8],[54.6,14,4],[70.04,10,6],[88.36,10,6],[106.36,8,5],[113.3,8,6]];
function shake(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0&&t-t0<2.5){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}
  if(t>28.9&&t<32.4){x+=nz(t*70,9)*2;y+=nz(t*66,8)*2;}return[x,y];}
function render(t){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let idx=SCENES.findIndex(s=>t>=s[0]&&t<s[1]);if(idx<0)idx=SCENES.length-1;
  const[sx,sy]=shake(t);ctx.save();ctx.translate(sx,sy);
  const st=SCENES[idx][0];const z=1+0.03*P(t,st,SCENES[idx][1]);cam(z);
  // quick punch-in on every cut (motion every few seconds)
  const pk=Math.exp(-(t-st)*9);cam(1+0.05*pk);
  SCENES[idx][2](t);ctx.restore();
  const cl=clockLabel(t);if(cl&&idx>=3&&idx<=10&&idx!==7)clockBadge(cl,1);
  const fo=P(t,DURATION-0.6,DURATION);if(fo>0){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(246,244,248,${fo})`;ctx.fillRect(0,0,W,H);}
}
window.render=render;window.DURATION=DURATION;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
