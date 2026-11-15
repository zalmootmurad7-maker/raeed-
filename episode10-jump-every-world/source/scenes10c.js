// ===================== SMALL MOONS & COMETS =====================
function X1(t){white();const z=expZ(t,343.8,346.5,1,0.08);ctx.save();camAt(z,960,800);groundL(990);house(1250,990,560);fig(820,990,0.27,t);ctx.restore();
  if(t>346){ctx.save();ctx.globalAlpha=P(t,346,347);[[960,560,330],[960,560,210]].forEach(([x,y,r])=>{ctx.setLineDash([14,12]);ctx.strokeStyle='#777';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(x,y,r*1.6,r*0.6,0,0,TAU);ctx.stroke();});ctx.setLineDash([]);
    greyPlanet(960,560,90,21);potato(960+528,560,40,26,6320);potato(960-336,560,26,18,6321);ctx.restore();ink('SMALL MOONS & COMETS',960,110,80,INK);if(t>wa('orbital',350))stamp10('ORBITAL MECHANICS',960,920,70,t,wa('orbital',350));}}
function PH1(t){white();potato(960,560,520,300,6330);ink('PHOBOS',960,110,96,INK);if(t>wa('twenty',358)){arrowI(440,940,1480,940,{col:R10,w:6});arrowI(1480,940,440,940,{col:R10,w:6});ink('22 KM',960,990,60,R10);}
  if(t>wa('seventeen',360))stamp10('GRAVITY 1,700× WEAKER',960,240,70,t,wa('seventeen',360));}
// Phobos jump: zoom out from human scale to the Burj Khalifa; ~920 m (energy method)
function PH2(t){white();const tj=wa('jump',364.5),tr=wa('rise',370.5),tk=wa('khalifa',374);const s=expZ(t,tr-0.6,tr+1.4,130,0.95);
  const z0=tr-0.6,h1=V0*Math.max(0,z0-tj);const hm=t<z0?V0*Math.max(0,t-tj):lerp(h1,919,eOut(P(t,z0,tk+0.8)));
  const gyS=1000+Math.max(0,hm*s-560);const fy=gyS-hm*s;groundL(gyS);const bh=828*s;if(bh<4000)burj(1350,gyS,bh);
  if(hm>0){ctx.save();ctx.setLineDash([18,12]);line(800,gyS,800,fy,{w:6,col:R10,seed:6400});ctx.restore();}
  const fs=Math.max(0.22,Math.min(0.6,s*1.75/320));fig(800,fy,fs,t,{pose:t>tj?'air':'crouch',mood:'shock'});if(s<5)ink('YOU',800,fy-fs*340-30,44,R10);
  if(t<z0&&t>tj)for(let i=0;i<5;i++){const yy=((t*600+i*230)%1100);line(560,yy,560,yy+80,{w:4,col:'#bbb',seed:6410+i});line(1040,yy+120,1040,yy+200,{w:4,col:'#bbb',seed:6420+i});}
  ink('HEIGHT: '+Math.round(hm)+' m',360,200,64,R10);if(t>tk)stamp10('HIGHER THAN THE BURJ KHALIFA',1300,140,56,t,tk);ink('PHOBOS',360,110,70,INK);}
function PH3(t){white();clockFF(560,520,220,t,8);ink('≈ 20 MIN IN THE AIR',560,880,70,R10);const tt=[wa('four',384),wa('songs',384),wa('sandwich',385)];
  if(t>tt[0])for(let i=0;i<4;i++)ink('♪',1150+i*120,420,110,INK);if(t>tt[2]){rrect(1180,560,360,120,40,{w:6,fill:'#f0e0c0',seed:6340});line(1200,610,1520,610,{w:5,col:R10,seed:6341});}
  if(t>wa('waiting',386))stamp10('STILL WAITING TO LAND',1350,860,56,t,wa('waiting',386));}
function PH4(t){white();greyPlanet(560,560,220,21);potato(1350,560,90,60,6350);ink('DEIMOS',1350,720,70,INK);ink('MARS',560,850,70,INK);if(t>wa('forever',392))stamp10('LEAVE FOREVER?',1350,300,80,t,wa('forever',392));}
function D1(t){white();potato(960,1240,700,360,6351);fig(960,940-eOut(P(t,wa('standing',397),wa('high',399)+1))*700,0.5,t,{pose:'air',mood:'shock'});
  if(t>wa('three',397))ink('≈ 2.9 KM UP',1450,300,80,R10);if(t>wa('hour',400))stamp10('OVER AN HOUR',1450,450,70,t,wa('hour',400));ink('DEIMOS',960,90,90,INK);}
function D2(t){white();ink('ESCAPE VELOCITY',960,110,96,INK);if(t>wa('earth',407)){ink('EARTH: 11.2 KM/S',560,330,72,INK);ink('(MACH 33)',560,410,52,'#777');P_earth(560,650,150);}
  if(t>wa('deimos',414)){ink('DEIMOS: 5.6 m/s',1380,330,72,R10);potato(1380,650,150,100,6352);ink('= A FAST RUN',1380,860,56,INK);}}
function D3(t){white();ink('DEIMOS',960,90,80,INK);const tr=wa('run',421),tp=wa('pole',427);
  if(t<tr){speedBar(360,520,1200,3.13,8,5.6,'ESCAPE 5.6 m/s');ink('STANDING JUMP: 3.13 m/s',960,700,60,R10);stamp10('NOT QUITE',960,860,70,t,wa('quite',420));return;}
  groundL(900);if(t<tp){const u=Math.max(0,t-wa('first',424));fig(700+u*60,900-u*u*140,0.8,t,{pose:u>0?'air':'idle',mood:u>0?'shock':'happy'});ink('NO RUN-UP: YOUR FIRST STEP LAUNCHES YOU',960,240,52,INK);return;}
  line(1100,900,1100,500,{w:12,seed:6360});const k=P(t,tp+0.5,tp+3);fig(lerp(1050,1300,k),900-k*80,0.8,t,{pose:k>0?'air':'point',lean:k*0.8});ink('GRAB A POLE. FLING.',960,240,64,INK);}
function D4(t){white();const k=P(t,wa('hit',432),wa('come',434));if(t<wa('never',434.3)){speedBar(360,520,1200,lerp(3.13,5.8,k),8,5.6,'ESCAPE 5.6 m/s');ink('PUSH-OFF: '+lerp(3.13,5.8,k).toFixed(2)+' m/s',960,700,64,R10);return;}
  greyPlanet(960,560,170,21);const u=t-wa('never',434.3);ctx.save();ctx.setLineDash([16,12]);ctx.strokeStyle='#888';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(960,560,560,260,0,0,TAU);ctx.stroke();ctx.restore();
  const a=-Math.PI/2+u*0.9;const x=960+Math.cos(a)*560,y=560+Math.sin(a)*260;ctx.save();ctx.setLineDash([16,12]);ctx.strokeStyle=R10;ctx.lineWidth=6;ctx.beginPath();for(let q=0;q<=1;q+=0.02){const aa=-Math.PI/2+u*0.9*q;ctx.lineTo(960+Math.cos(aa)*560,560+Math.sin(aa)*260);}ctx.stroke();ctx.restore();
  fig(x,y+40,0.28,t,{pose:'air'});ink('MARS',960,800,60,INK);if(t>wa('tiny',436))stamp10('A NEW MOON OF MARS',960,130,80,t,wa('tiny',436));}
function C0(t){white();stamp10('NO POLE.',560,360,90,t,wa('pole',440));stamp10('NO RUN-UP.',1360,360,90,t,wa('run',442));if(t>wa('normal',443)){groundL(900);fig(960,900,1.0,t,{pose:'crouch'});ink('JUST A NORMAL JUMP',960,180,80,R10);}}
function C1(t){white();duck(960,600,2.2);ink('COMET 67P · 4 KM',960,100,84,INK);if(t>wa('one',452))ink('ESCAPE VELOCITY: 1 m/s',960,900,72,R10);if(t>wa('slow',455))stamp10('= A SLOW WALK',960,1000,60,t,wa('slow',455));}
function philae(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rrect(-40,-30,80,60,6,{w:5,fill:'#fff',seed:6370});for(const sx of[-1,0,1])line(sx*30,30,sx*55,70,{w:4,seed:6371+sx});rrect(-90,-20,40,30,3,{w:4,fill:'#cde',seed:6374});rrect(50,-20,40,30,3,{w:4,fill:'#cde',seed:6375});ctx.restore();}
function C2(t){white();duck(1100,740,1.7);const tl=wa('touched',461),tb=wa('bounced',462.5);const u=Math.max(0,(t-tb)/6);const x=lerp(700,1500,clamp(u)),y=520-Math.sin(clamp(u)*Math.PI)*360;
  if(t>tb){ctx.save();ctx.setLineDash([14,10]);ctx.strokeStyle=R10;ctx.lineWidth=5;ctx.beginPath();for(let q=0;q<=clamp(u);q+=0.02){ctx.lineTo(lerp(700,1500,q),520-Math.sin(q*Math.PI)*360);}ctx.stroke();ctx.restore();}
  philae(t>tb?x:700,t>tb?y:lerp(-80,520,P(t,457.3,tl)),1.1);ink('2014 · PHILAE LANDER',960,90,80,INK);if(t>wa('two',465))ink('≈ 2 HOURS IN THE AIR',560,300,60,R10);if(t>wa('less',469))stamp10('ONLY 0.38 m/s',1450,250,64,t,wa('less',469));}
function C3(t){white();duck(960,820,1.6);const tj=wa('normal',473);const up=Math.max(0,t-tj);const y=640-up*95;fig(960,y,0.75,t,{pose:up>0?'wave':'crouch',mood:'happy'});
  if(up>0){ctx.save();ctx.setLineDash([16,12]);line(960,640,960,y,{w:6,col:R10,seed:6380});ctx.restore();}ink(up>0?'HEIGHT: ∞':'HEIGHT: 0.00 m',400,200,64,R10);if(t>wa('triple',477))ink('3× ESCAPE SPEED',400,280,52,INK);
  stamp10('NOW ORBITING THE SUN',1350,300,70,t,wa('congratulations',484));}
function E1(t){white();const ch=[['MARS','DUNK 1.32 m',wa('slam',494)],['TITAN','WINGS 3.6 m',wa('flying',496)],['PHOBOS','20-MIN JUMP',wa('skyscraper',498)]];ch.forEach(([n,d,tt],i)=>{const x=360+i*600;if(t<tt)return;rrect(x-250,240,500,480,20,{w:7,fill:'#fff',seed:6390+i});ink(n,x,330,80,INK);ink(d,x,430,56,R10);fig(x,680,0.6,t,{pose:i===1?'flap':'air'});});
  ink('WHICH ONE?',960,110,90,INK);if(t>wa('comments',501))stamp10('DROP YOUR PICK IN THE COMMENTS',760,800,56,t,wa('comments',501));
  if(t>wa('subscribe',502)){P_jupiter(1700,960,140);const u=t-wa('subscribe',502);fig(1200+u*90,980-u*30,0.35,t,{pose:'wave'});rrect(360,930,420,90,20,{w:6,fill:R10,col:R10,seed:6399});ink('SUBSCRIBE',570,975,56,'#fff',{stroke:0});}}
// ===================== timeline =====================
const SCN=[[0,H1],[18.62,H2],[25.12,H3],[35.86,S1],[48.12,S2],[53.2,J1],[64.54,J2],[74.57,J3],[86.23,J4],[93.9,N1],[104.93,N2],[107.47,U1],[122.55,U2],[138.91,V1],[145.55,V2],[156.12,V3],
  [161.84,M1],[171.35,M2],[181.01,M3],[192.95,M4],[199.23,Me1],[209.25,Me2],[231.47,Mo0],[236.74,Mo1],[248.44,Mo2],[262.77,Mo3],[268.39,Mo4],[274.26,T1],[290.39,T2],[296.76,T3],[309.27,T4],
  [314.64,P1],[320.06,P2],[326.79,P3],[343.6,X1],[353.97,PH1],[363.93,PH2],[378.09,PH3],[388.4,PH4],[394.12,D1],[402.69,D2],[419.04,D3],[432.2,D4],[439.11,C0],[444.43,C1],[457.16,C2],[471.02,C3],[489.01,E1]];
const DUR10=506.07;
function render(t){TREAL=t;const tp=Math.floor(t*10+1e-6)/10;BOIL=Math.floor(t*8);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);
  let i=0;while(i+1<SCN.length&&t>=SCN[i+1][0])i++;ctx.save();SCN[i][1](tp);ctx.restore();
  if(t>DUR10-0.5){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(255,255,255,${clamp((t-(DUR10-0.5))/0.5)})`;ctx.fillRect(0,0,W,H);}}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
