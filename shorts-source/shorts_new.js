// ===== new vertical scenes for the shorts (source time t) =====
// --- episode 2 (antimatter) ---
function sCv(t){ // 12.4-19.0 mirror / evil twin
  mirrorFrame(CX,560,1420,P(t,12.45,13.3));
  const L=290,Rx=790,G=1400;
  if(t>13.3)figure(L,G,POSES.point,{s:pop(t,13.36)*1.05||0.0001});
  if(t>13.5)figure(Rx,G,mirrorPose(POSES.point),{s:pop(t,13.6)*1.05||0.0001,seed:140});
  horns(Rx,G,1.05,pop(t,16.59));
  txt('ANTIMATTER',CX,280,120,{k:writeK(t,12.45,'ANTIMATTER',24),col:RED});
  txt('= MIRROR MATTER',CX,400,84,{k:writeK(t,13.4,'= MIRROR MATTER',30)});
  txt('NORMAL',L,930,64,{k:writeK(t,14.32,'NORMAL',20)});txt('EVIL TWIN',Rx,930,64,{k:writeK(t,16.7,'EVIL TWIN',22),col:RED});
  if(pop(t,17.71)>0)proton(L,G-178,36,{s:pop(t,17.71),seed:1540});if(pop(t,18.11)>0)antiproton(Rx,G-178,36,{s:pop(t,18.11),seed:1541});
  txt('OPPOSITE CHARGE',CX,1500,76,{k:writeK(t,17.71,'OPPOSITE CHARGE',30)});}
function sDv(t){ // 19.0-23.9 the twins
  mirrorFrame(CX,480,1460,1);
  txt('THE TWINS',CX,300,110,{});
  electron(270,700,85,{s:pop(t,19.15),seed:1701});txt('ELECTRON',270,850,60,{k:writeK(t,19.2,'ELECTRON')});
  positron(810,700,85,{s:pop(t,20.28),seed:1702});txt('POSITRON',810,850,60,{k:writeK(t,20.3,'POSITRON'),col:RED});
  proton(270,1150,85,{s:pop(t,21.43),seed:1704});txt('PROTON',270,1300,60,{k:writeK(t,21.45,'PROTON')});
  antiproton(810,1150,85,{s:pop(t,22.67),seed:1705});txt('ANTIPROTON',810,1300,60,{k:writeK(t,22.7,'ANTIPROTON'),col:RED});}
function sNv(t){ // 98.15-111.4 the lander
  const GY=1300;ctx.save();ctx.fillStyle='#d9d6de';ctx.beginPath();ctx.ellipse(CX,GY+1000,1500,1000,0,0,TAU);ctx.fill();ctx.restore();
  circ(CX,GY+1000,1500,{ry:1000,seed:2801,w:LW+0.6});circ(CX,GY+980,1500,{ry:1000,seed:2802,w:2.4,col:RED,dash:[12,10]});
  for(let i=0;i<4;i++)circ(150+i*260,GY+80+(i%2)*40,34,{ry:10,seed:2810+i,w:2.2});
  txt('LANDING ON',CX,280,100,{});txt('THE ANTI-MOON',CX,395,100,{col:RED});
  const bt=105.93,desc=eOut(P(t,99.0,104.4)),LY=lerp(450,GY-170,desc),s=1.5;
  if(t<bt){lander(CX,LY,s);const ex=t>101.0?lerp(30,lerp(70,GY-(LY+44*s),P(t,103.2,104.1)),P(t,101.0,101.3)):0;
    if(ex>0)for(let i=-2;i<=2;i++){const fl=ex*(0.75+0.25*Math.sin(t*40+i));line(CX+i*7,LY+46*s,CX+i*14,LY+46*s+fl,2820+i,1,2.6,i%2?RED:INK);}
    if(t>104.1){const R=rng(Math.floor(t*20));const n=Math.floor(lerp(2,10,P(t,104.1,105.9)));for(let i=0;i<n;i++){const px=CX+(R()-.5)*lerp(60,300,P(t,104.1,105.9));for(let j=0;j<5;j++){const b=-Math.PI*R();line(px,GY,px+Math.cos(b)*(12+R()*18),GY+Math.sin(b)*(12+R()*18),2830+i*5+j,1,2.4,RED);}}}
    txt('...SLOWLY...',820,640,64,{k:writeK(t,101.9,'...SLOWLY...',16),a:1-P(t,103.0,103.2)});}
  else{const tl=t-bt;greyFlash(CX,GY,tl,0.9);boom(CX,GY-60,tl,400,2840,{hold:0.9,fade:0.7});
    const R=rng(2850);for(let i=0;i<8;i++){const a=-Math.PI*(0.1+0.8*R()),sp=700+R()*600;const x=CX+Math.cos(a)*sp*tl,y=GY-160+Math.sin(a)*sp*tl+700*tl*tl;if(y>H+100)continue;ctx.save();ctx.translate(x,y);ctx.rotate(tl*(4+i));rect(-22,-14,46+i*4,28,2860+i,1,2.8);ctx.restore();}
    if(tl>1.6){const sm=cloudPath(CX,GY-60,240,110,2870);ctx.save();ctx.globalAlpha=clamp((tl-1.6)*3);fillPts(sm,'#e6e3ea');strokePts(wob(sm,2871,0.8),1,2.6,'#888');ctx.restore();}
    txt('LANDING: OVER',CX,700,120,{k:writeK(t,106.4,'LANDING: OVER',22),col:RED});}
  if(t>108.4){txt('"ONE SMALL STEP',CX,1430,70,{k:writeK(t,108.47,'"ONE SMALL STEP',14)});const w=txt('FOR MAN..."',CX,1520,70,{k:writeK(t,109.7,'FOR MAN..."',12)});
    if(t>110.75){scribble(CX-300,1430,600,44,2880,eOut(P(t,110.75,111.1)));scribble(CX-200,1520,400,44,2881,eOut(P(t,110.9,111.2)));}}}
// --- episode 3 (black hole) ---
function s9v1(t){ // 60.8-66.4 no light of its own
  const SX=230,SY=620,MX=780,MY=780,EX=560,EY=1230;sunGlyph(SX,SY,120,t,{seed:5901});
  const isHole=t>=64.18;if(!isHole)moon(MX,MY,105,{s:pop(t,60.95),seed:5902});else hole(MX,MY,12,t,{s:pop(t,64.2)});
  earth(EX,EY,120,{seed:5903});figure(EX,EY-118,POSES.rest,{s:0.38});
  const k1=eOut(P(t,62.72,63.3));arrow(SX+150,SY+30,lerp(SX+150,MX-120,k1),lerp(SY+30,MY-20,k1),{k:k1,seed:5910,col:'#d9a400',w:5});
  if(!isHole){const k2=eOut(P(t,63.3,63.8));if(k2>0)arrow(MX-40,MY+110,lerp(MX-40,EX+90,k2),lerp(MY+110,EY-110,k2),{k:k2,seed:5911,col:'#d9a400',w:5});}else cross(680,1010,46,P(t,65.0,65.4));
  txt('THE MOON HAS',CX,270,88,{});txt('NO LIGHT OF ITS OWN',CX,380,84,{});
  if(t<64.18)txt('IT REFLECTS THE SUN',CX,1470,72,{k:writeK(t,62.8,'IT REFLECTS THE SUN',30)});
  else{txt('A BLACK HOLE',CX,1440,84,{k:writeK(t,64.3,'A BLACK HOLE',30),col:RED});txt('REFLECTS NOTHING',CX,1540,84,{k:writeK(t,64.9,'REFLECTS NOTHING',30),col:RED});}}
function s9v2(t){ // 66.4-75.9 moonless nights
  nightSky(60,470,960,640,t,5140);
  txt('EVERY NIGHT:',CX,270,92,{k:writeK(t,66.5,'EVERY NIGHT:',26)});txt('MOONLESS',CX,385,120,{k:writeK(t,67.2,'MOONLESS',20),col:RED});
  [['FULL MOON',69.95,0],['CRESCENT',71.16,1]].forEach(([s,t0,i])=>{const x=300+i*480,y=1300;if(t<t0-0.3)return;const sc=pop(t,t0-0.25);if(sc<=0)return;if(i===0)moon(x,y,90,{s:sc,seed:5920});else crescent(x,y,90*sc,5921);txt(s,x,y+130,60,{k:writeK(t,t0,s,24)});cross(x,y,100,P(t,t0+0.45,t0+0.75));});
  if(t>72.33)txt('JUST STARS',CX,1040,80,{k:writeK(t,72.4,'JUST STARS',20),col:'#ffffff'});
  if(t>73.56){const k=P(t,73.6,74.2);ctx.save();ctx.globalAlpha=k;circ(700,700,110,{dash:[10,10],col:'#cfcfe0',seed:5930,w:3});ctx.restore();txt('?',700,700,110,{col:'#cfcfe0',a:k});txt("A HOLE YOU CAN'T SEE",CX,1540,64,{k:writeK(t,74.6,"A HOLE YOU CAN'T SEE",30),col:RED});}}
function s10v(t){ // 75.9-82.8 eclipses
  if(t<79.5){eclipse(CX,830,230,t);txt('TOTAL SOLAR',CX,270,100,{k:writeK(t,76.1,'TOTAL SOLAR',30)});txt('ECLIPSES',CX,385,120,{k:writeK(t,76.6,'ECLIPSES',24)});
    if(t>77.68){cross(CX,830,300,P(t,77.68,78.0));txt('GONE.',300,1330,130,{k:writeK(t,77.7,'GONE.',12),col:RED});}if(t>78.39)txt('FOREVER.',760,1330,130,{k:writeK(t,78.4,'FOREVER.',14),col:RED});return;}
  sunGlyph(CX,850,300,t,{seed:6001});hole(CX-60,820,9,t,{s:pop(t,79.62)});magnifier(CX-60,820,80,P(t,79.8,80.1));
  txt('A SPECK THIS SMALL',CX,300,90,{k:writeK(t,79.6,'A SPECK THIS SMALL',30)});txt("CAN'T BLOCK",CX,1360,110,{k:writeK(t,81.37,"CAN'T BLOCK",24),col:RED});txt('THE SUN',CX,1480,110,{k:writeK(t,81.8,'THE SUN',18),col:RED});}
function s15v(t){ // 120.3-135.9 colder than space, grows
  const HX=CX,HY=720;const grow=P(t,130.9,133.3);hole(HX,HY,32*(1+grow*0.35),t,{});
  txt('WOULD IT EVER',CX,270,96,{k:writeK(t,120.4,'WOULD IT EVER',30)});txt('GO AWAY?',CX,385,110,{k:writeK(t,121.1,'GO AWAY?',20)});
  if(t>122.37&&t<130.2){for(let i=0;i<8;i++){const a=i/8*TAU+0.2;const ph=((t*0.8+i*0.13)%1);wave(HX+Math.cos(a)*(90+ph*70),HY+Math.sin(a)*(90+ph*70),HX+Math.cos(a)*(90+ph*70+90),HY+Math.sin(a)*(90+ph*70+90),1,i,'#8a6dc7',6,18,2.6);}
    const ha=1-P(t,127.1,127.3);txt('HAWKING RADIATION',CX,1060,86,{k:writeK(t,124.4,'HAWKING RADIATION',26),col:'#6a4fb0',a:ha});if(t>125.83)txt('IT SHOULD SHRINK...',CX,1170,70,{k:writeK(t,125.9,'IT SHOULD SHRINK...',30),a:ha});}
  if(t>127.3&&t<130.3){const k=pop(t,127.3);ctx.save();ctx.globalAlpha=clamp(k*2)*(1-P(t,130.0,130.3));
    thermo(250,1380,280,0.3,'#5b8fd6',6501);txt('BLACK HOLE',250,1450,52,{});txt('1.7 K',250,1520,64,{col:'#2f5d9a'});
    thermo(830,1380,280,0.48,'#f08a7a',6510);txt('SPACE',830,1450,52,{});txt('2.7 K',830,1520,64,{col:RED});
    txt('COLDER THAN',CX,1010,92,{k:writeK(t,128.2,'COLDER THAN',30),col:RED});txt('SPACE ITSELF',CX,1110,92,{k:writeK(t,128.75,'SPACE ITSELF',30),col:RED});ctx.restore();}
  if(t>130.24){for(let i=0;i<8;i++){const a=i/8*TAU+0.2;const ph=1-((t*0.8+i*0.13)%1);wave(HX+Math.cos(a)*(110+ph*100),HY+Math.sin(a)*(110+ph*100),HX+Math.cos(a)*(85+ph*70),HY+Math.sin(a)*(85+ph*70),1,i,'#5b8fd6',6,18,2.6);}
    txt('INSTEAD OF SHRINKING...',CX,1100,72,{k:writeK(t,130.4,'INSTEAD OF SHRINKING...',30)});
    if(t<133.55)txt('IT GROWS',CX,1250,140,{k:writeK(t,132.6,'IT GROWS',16),col:RED});
    else{txt('FOR AN UNIMAGINABLY',CX,1250,80,{k:writeK(t,133.6,'FOR AN UNIMAGINABLY',30)});txt('LONG TIME',CX,1360,110,{k:writeK(t,134.92,'LONG TIME',16),col:RED});}}}

// ===== cold-open cards (first ~1.2 s): full headline + strongest visual =====
function hlBar(x,y,w,h,seed){ctx.save();ctx.globalAlpha=0.92;ctx.fillStyle='#ffe066';const R=rng(seed);ctx.beginPath();ctx.moveTo(x,y+R()*6);ctx.lineTo(x+w,y+R()*6);ctx.lineTo(x+w-4,y+h+R()*6);ctx.lineTo(x+4,y+h+R()*6);ctx.closePath();ctx.fill();ctx.restore();}
const CARDS={
  twinQ:(tr)=>{mirrorFrame(CX,560,1420,clamp(tr/0.35));
    figure(290,1400,POSES.point,{s:pop(tr,-0.2)*1.05||0.0001});
    figure(790,1400,mirrorPose(POSES.point),{s:pop(tr,0.25)*1.05||0.0001,seed:140});horns(790,1400,1.05,pop(tr,0.5));
    txt('WHAT IF YOU MET',CX,280,92,{k:clamp(0.25+tr/0.3)});txt('YOUR EVIL TWIN?',CX,405,116,{k:clamp((tr-0.15)/0.35),col:RED});},
  eclipseQ:(tr)=>{eclipse(CX,830,230,1);txt('TOTAL SOLAR',CX,270,100,{k:clamp(0.3+tr/0.35)});txt('ECLIPSES',CX,385,120,{k:clamp((tr-0.2)/0.3)});},
  colderQ:(tr)=>{hole(CX,720,32,1,{s:pop(tr,-0.1)});txt('WOULD IT EVER',CX,270,96,{k:clamp(0.3+tr/0.35)});txt('GO AWAY?',CX,385,110,{k:clamp((tr-0.2)/0.3)});},
  lander:(tr)=>{const GY=1300;ctx.save();ctx.fillStyle='#d9d6de';ctx.beginPath();ctx.ellipse(CX,GY+1000,1500,1000,0,0,TAU);ctx.fill();ctx.restore();circ(CX,GY+980,1500,{ry:1000,seed:2802,w:2.4,col:RED,dash:[12,10]});
    lander(CX,GY-170,1.5);boom(CX,GY,0.5,170,2841,{hold:5});hlBar(70,330,940,140,3);txt("DON'T LAND HERE",CX,400,104,{col:RED});txt('IT\'S ANTIMATTER',CX,560,84,{});},
  twin:(tr)=>{mirrorFrame(CX,560,1420,1);figure(290,1400,POSES.point,{s:1.05});figure(790,1400,mirrorPose(POSES.point),{s:1.05,seed:140});horns(790,1400,1.05,1);
    hlBar(110,240,860,150,5);txt('YOUR EVIL TWIN',CX,315,110,{col:RED});txt('IS MADE OF ANTIMATTER',CX,470,70,{});},
  eclipse:(tr)=>{eclipse(CX,850,230,1);cross(CX,850,300,1);hlBar(100,250,880,150,7);txt('NO MORE ECLIPSES',CX,325,100,{col:RED});txt('EVER.',CX,1330,160,{col:RED});hole(CX,1520,12,1,{});},
  colder:(tr)=>{hole(CX,720,34,1,{});thermo(250,1380,280,0.3,'#5b8fd6',6501);txt('1.7 K',250,1500,70,{col:'#2f5d9a'});thermo(830,1380,280,0.48,'#f08a7a',6510);txt('2.7 K',830,1500,70,{col:RED});
    hlBar(70,240,940,150,9);txt('COLDER THAN SPACE',CX,315,100,{col:RED});txt('THIS BLACK HOLE IS',CX,470,74,{});},
};
// ===== visual like banner (last ~2 s) =====
function likeBanner(u){ // u = seconds into the banner; sits over the top heading so the payoff below stays visible
  const k=eOut(clamp(u/0.25));ctx.save();ctx.translate(0,-(1-k)*320);
  ctx.fillStyle='rgba(251,250,253,0.97)';ctx.fillRect(40,170,1000,210);rect(40,170,1000,210,9100,1,LW);
  const pressed=u>1.0;likeButton(250,275,0.55*(pressed?1+0.15*Math.exp(-(u-1.0)*6):1),pressed);
  txt('HIT LIKE!',680,240,104,{col:RED});txt('IF THIS BLEW YOUR MIND',680,330,48,{});
  if(pressed){const tl=u-1.0,fa=1-clamp((tl-0.3)/0.5);ctx.save();ctx.globalAlpha=Math.max(0,fa);for(let i=0;i<12;i++){const a=i/12*TAU;line(250+Math.cos(a)*100,275+Math.sin(a)*70,250+Math.cos(a)*(140+tl*80),275+Math.sin(a)*(100+tl*60),9110+i,1,4,i%2?RED:INK);}ctx.restore();}
  ctx.restore();}
