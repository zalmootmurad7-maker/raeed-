// ===================== MARS & MERCURY =====================
function greyPlanet(x,y,r,seed=1){disc(x,y,r,{fill:'#eee'});craters(x,y,r,8,seed);hatch(x,y,r,1,Math.max(8,r/5));}
function M1(t){white();greyPlanet(620,540,280,21);greyPlanet(1380,560,200,23);ink('MARS',620,900,80,INK);ink('MERCURY',1380,860,80,INK);ink('THE SMALL ROCKY WORLDS',960,110,76,INK);
  if(t>wa('thirty',167))stamp10('38% OF EARTH\'S GRAVITY',620,220,60,t,wa('thirty',167));}
function M2(t){white();const gy=950;groundL(gy);jumpAt(t,{g:3.71,tj:wa('float',175)-0.4,gx:760,gy,ppm:420,s:0.75,hudX:1450,hudY:220,props:()=>car(1150,gy,330)});ink('MARS',960,110,96,INK);}
function M3(t){white();const gy=990,ppm=230;groundL(gy);const tj=wa('slam',185)-0.6,T=2*V0/3.71;hoop(1180,gy,ppm);const tau=t-tj;const h=tau>0&&tau<T?hJ(3.71,tau):0;
  const x=lerp(760,1080,clamp(tau/(T*0.5)));fig(x,gy-h*ppm,0.62,t,{pose:tau>0&&tau<T?'air':'idle',mood:'happy'});
  if(tau>0&&tau<T){ell(x+60,gy-h*ppm-200,20,20,{w:4,fill:R10,seed:6201});}else if(tau>=T)ell(1150,gy-60,20,20,{w:4,fill:R10,seed:6201});
  ink('REGULATION HOOP: 3.05 m',600,160,56,INK);if(t>wa('without',190))stamp10('STANDING SLAM DUNK',600,280,64,t,wa('without',190));}
function M4(t){white();const k=eOut(P(t,wa('half',194),wa('half',194)+0.6));const ang=-0.25*k;line(960,860,960,600,{w:8,seed:6210});ctx.save();ctx.translate(960,600);ctx.rotate(ang);line(-520,0,520,0,{w:8,seed:6211});ctx.restore();
  const lx=960-520*Math.cos(ang),ly=600-520*Math.sin(ang),rx=960+520*Math.cos(ang),ry=600+520*Math.sin(ang);greyPlanet(lx,ly+170*0+0,160,21);greyPlanet(rx,ry-110,105,23);ink('MARS',lx,ly+220,60,INK);ink('MERCURY',rx,ry+60,60,INK);
  if(t>wa('half',194))ink('½ THE MASS',rx,ry-270,60,R10);if(t>wa('exact',197))stamp10('SAME JUMP?!',960,170,90,t,wa('exact',197));}
function Me1(t){white();const gy=950;groundL(gy);jumpAt(t,{g:3.70,tj:wa('reads',200)-0.3,gx:760,gy,ppm:420,s:0.75,hudX:1450,hudY:220});ink('MERCURY',960,110,96,INK);
  stamp10('AGAIN.',1450,520,110,t,wa('again',203));if(t>wa('twice',206))ink('BUT MARS HAS 2× THE MASS',1400,700,52,INK);}
function core(x,y,r,cf,lbl){ell(x,y,r,r,{w:7,fill:'#fff',seed:6220+x});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();hatchRect(x-r,y-r,2*r,2*r,{dens:18});ctx.restore();ell(x,y,r*cf,r*cf,{w:6,fill:'#333',seed:6230+x});ink(lbl,x,y+r+60,56,INK);}
function Me2(t){white();core(560,520,300,0.54,'MARS · ROCK');core(1400,560,215,0.85,'MERCURY · IRON');if(t>wa('eighty',217)){arrowI(1400,560,1400+215*0.85,560,{col:R10,w:6});ink('85%',1400+110,510,60,R10);}
  ink('THE SECRET IS UNDERGROUND',960,100,76,INK);if(t>wa('surface',227))stamp10('3.71 vs 3.70 m/s²',960,960,70,t,wa('surface',227));}
// ===================== THE MOON =====================
function Mo0(t){white();hatchRect(0,0,W,1080,{dens:30,col:'rgba(136,136,136,0.18)'});P_moon(960,480,260);groundL(950);if(t>wa('doubles',234))stamp10('MORE THAN DOUBLE',960,900,70,t,wa('doubles',234));}
function Mo1(t){white();const gy=990,ppm=190;groundL(gy);jumpAt(t,{g:1.62,tj:wa('turns',241)-0.2,gx:760,gy,ppm,s:0.6,hudX:1400,hudY:220,props:()=>hoop(1150,gy,ppm)});ink('THE MOON · 1/6 GRAVITY',960,100,76,INK);}
function Mo2(t){white();const gy=930;groundL(gy);potato(1650,1100,400,120,6240);const per=1.6;const u=((t-248.5)%per)/per;const h=Math.sin(u*Math.PI)*0.22;fig(800+((t-248.5)*60)%500,gy-h*520,1.05,t,{suit:true,pose:u<0.85?'air':'land',mood:'deadpan'});
  if(t>wa('eighty',255))stamp10('81 KG SUIT',1350,260,80,t,wa('eighty',255));ink('APOLLO: BUNNY HOPS',700,120,70,INK);}
function Mo3(t){white();const gy=990,ppm=190,ceil=gy-2.6*ppm;rrect(300,ceil-30,1320,30,0,{w:6,fill:'#eee',seed:6250});groundL(gy);const tj=wa('normal',264)-0.1;const tau=t-tj;const h=tau>0?hJ(1.62,Math.min(tau,1.0)):0;
  fig(960,gy-h*ppm,0.6,t,{pose:tau>0?'air':'idle',mood:tau>0.9?'shock':'happy'});if(tau>0.9){for(let i=0;i<6;i++)line(960,ceil,960+Math.cos(i)*90,ceil-30+Math.sin(i*1.7)*30,{w:5,seed:6260+i});stamp10('CEILING!',1400,300,90,t,tj+0.9);}ink('INDOOR LUNAR GYM',960,100,76,INK);}
function Mo4(t){white();disc(960,560,260,{fill:'#f4f4f4'});hatch(960,560,260,1,14,'#888');ink('TITAN',960,900,90,INK);if(t>wa('fly',272)){for(const sd of[-1,1])poly([[960,560],[960+sd*420,430],[960+sd*380,520],[960+sd*300,600]],{w:6,fill:'#fff',close:true,seed:6270+sd});}
  ink('EVEN BETTER',960,110,80,INK);if(t>wa('fly',272))stamp10('YOU FLY',960,250,90,t,wa('fly',272));}
// ===================== TITAN =====================
function T1(t){white();hatchRect(0,0,W,1000,{dens:28,col:'rgba(136,136,136,0.22)'});const gy=990,ppm=150;groundL(gy);wadlow(1250,gy,2.72*ppm);ink('ROBERT WADLOW 2.72 m',1250,gy-2.72*ppm-50,44,INK);
  jumpAt(t,{g:1.35,tj:wa('sends',280)-0.1,gx:880,gy,ppm,s:0.5,hudX:400,hudY:200});ink('TITAN · 14% GRAVITY',960,90,70,INK);}
function T2(t){white();const boxes=[[560,'EARTH AIR',30],[1360,'TITAN AIR',120]];boxes.forEach(([x,n,k])=>{rrect(x-300,280,600,500,20,{w:7,fill:'#fff',seed:6280+x});const R=rng(x);for(let i=0;i<k;i++){const px=x-280+R()*560,py=300+R()*460;ctx.fillStyle='#555';ctx.beginPath();ctx.arc(px,py,6,0,TAU);ctx.fill();}ink(n,x,850,60,INK);});
  if(t>wa('half',291))ink('1.5× PRESSURE',1360,190,64,INK);if(t>wa('four',294))stamp10('~4× DENSER',1360,960,80,t,wa('four',294));}
function T3(t){white();hatchRect(0,0,W,1000,{dens:28,col:'rgba(136,136,136,0.22)'});groundL(990);const tw=wa('wings',301),tf=wa('flap',305);const fly=Math.max(0,t-tf);const x=600+fly*160,y=990-(t>tw?300:0)-fly*45;
  if(t>tw){for(const sd of[-1,1]){const fl=Math.sin(t*20)*0.4;ctx.save();ctx.translate(x,y-210*0.7);ctx.rotate(sd*fl);poly([[0,0],[sd*230,-60],[sd*210,30],[sd*120,60]],{w:5,fill:'#e8d8b0',close:true,seed:6290+sd});ctx.restore();}}
  fig(x,y,0.7,t,{pose:t>tf?'flap':t>tw?'air':'idle',mood:'happy'});ink('STRAP ON WINGS',960,100,76,INK);if(t>tf)stamp10('HUMAN-POWERED FLIGHT',1300,300,64,t,tf);}
function T4(t){white();groundL(960);const k=P(t,309.5,311.5);[[300,250],[520,420],[760,330],[1020,560],[1300,450],[1560,640]].forEach(([x,h],i)=>{const hh=h*clamp(k*1.5-i*0.1);rrect(x-80,960-hh,160,hh,4,{w:6,fill:'#fff',seed:6300+i});});
  ink('METERS → BUILDINGS',960,110,84,INK);}
// ===================== ERIS & PLUTO =====================
function P1(t){white();const R=rng(6310);for(let i=0;i<70;i++){const x=R()*W,y=200+R()*700,r=4+R()*14;ell(x,y,r,r*0.7,{w:3,fill:'#fff',seed:6311+i,amp:0.5});}ink('THE KUIPER BELT',960,110,90,INK);
  if(t>wa('glitch',318)){const o=Math.sin(t*60)*12;ctx.save();ctx.globalAlpha=0.6;ink('GLITCH?',960+o,560,160,R10);ctx.restore();ink('GLITCH?',960,560,160,INK);}}
function P2(t){white();const gy=990,ppm=95;groundL(gy);giraffe(1250,gy,5.5*ppm);jumpAt(t,{g:0.82,tj:wa('carries',321),gx:820,gy,ppm,s:0.32,sp:1.3,hudX:400,hudY:200});ink('ERIS',960,90,90,INK);}
function P3(t){white();const gy=990,ppm=78;groundL(gy);house(1250,gy,7.5*ppm*0.95);const tj=wa('explodes',330)-0.2;jumpAt(t,{g:0.62,tj,gx:820,gy,ppm,s:0.27,hudX:400,hudY:200});ink('PLUTO',960,90,90,INK);
  if(t>tj+3&&t<tj+10)ink('10 SECONDS OF SILENCE…',1250,180,52,'#777');}
