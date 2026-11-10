// word-time helper: w(i,'word',n) = start of the n-th 'word' in line i
function w(i,word,n=0){const ws=LN[i].w;let c=0;for(const[x,s]of ws){if(x===word){if(c===n)return s;c++;}}return LN[i].s;}
const SC8=[];
// 0 HOOK: three snap-cut vignettes
SC8[0]=t=>{if(t<w(0,'swap',1)){white();const z=snapZ(t,w(0,'canyon'),1,1.6);ctx.save();camAt(z,960,560);P_mars(960,560,330);
    if(STEP(t,w(0,'longer'))){ctx.save();ctx.setLineDash([16,12]);ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.arc(960,560,150,0,TAU);ctx.stroke();ctx.restore();lbl('THE WHOLE MOON',960,760,44,G4);}
    if(STEP(t,w(0,'canyon')))poly([[640,600],[800,620],[960,600],[1120,625],[1280,610]],{w:14,col:INK,seed:901});ctx.restore();if(STEP(t,w(0,'canyon')))lbl('A CANYON',960,120,80);badge();return;}
  if(t<w(0,'swap',2)){tide(t,30,{label:'30 M. TWICE A DAY.',t0:w(0,'ocean')});return;}
  white();const z=t<w(0,'earth',1)?expZ(t,w(0,'swap',2),w(0,'earth',1),2.4,0.85):snapZ(t,w(0,'moon',1),0.85,1.0);ctx.save();camAt(z,960,540);
  P_jupiter(760,600,380);ctx.save();ctx.setLineDash([14,12]);ctx.strokeStyle=RED8;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(760,600,620,160,-0.1,0,TAU);ctx.stroke();ctx.restore();
  P_earth(1370,540,60);stick(1370,480,0.3,t,{pose:'up',mood:'shock'});ctx.restore();
  if(STEP(t,w(0,'earth',2)))stampL('EARTH = THE MOON',960,90,100,RED8,t,w(0,'earth',2));badge();};
// 1 lineup of every world, camera steps along it
const ORDER=['ceres','pluto','mercury','mars','venus','earth','neptune','uranus','saturn','jupiter'];
SC8[1]=t=>{white();let TOT=200;for(const n of ORDER){const r=12+22*Math.sqrt(SZ[n]),hw=Math.max(80,n==='saturn'||n==='uranus'?r*2.4:r);TOT+=2*hw+50;}const PMAX=Math.max(0,TOT-1800);const pan=t<w(1,'smallest')?0:t<w(1,'one')?Math.min(PMAX,Math.floor((t-w(1,'smallest'))*4)/4*PMAX/2):PMAX;ctx.save();ctx.translate(-pan,0);
  let x=200;for(const n of ORDER){const r=12+22*Math.sqrt(SZ[n]),hw=Math.max(80,n==='saturn'||n==='uranus'?r*2.4:r);PL[n](x+hw,600,r);lbl(n.toUpperCase(),x+hw,600+r+60,40,n==='jupiter'?RED8:INK);x+=2*hw+50;}ctx.restore();
  ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=G3;ctx.lineWidth=4;ctx.beginPath();ctx.arc(1700,180,40,0,TAU);ctx.stroke();ctx.restore();lbl('MOON SLOT',1700,260,36,G4);
  stick(160,1020,0.9,t,{pose:'point',mood:'happy'});if(STEP(t,w(1,'steals')))stampL('STEALS OUR PLANET',960,120,80,RED8,t,w(1,'steals'));badge();};
// CERES 2–5
SC8[2]=t=>{sky(t,'ceres',{z:snapZ(t,w(2,'smallest'),1,2.2),fx:1250,fy:330});if(STEP(t,w(2,'ceres')))lbl('CERES',960,110,90);if(STEP(t,w(2,'four')))lblR('4× NARROWER THAN THE MOON',960,980,64);};
SC8[3]=t=>{if(t<w(3,'and')){sky(t,'ceres',{mood:'curious',pose:'chin'});lbl('…A TINY GREY DOT',960,110,72);return;}
  white();P_sun(960,520,300);P_ceres(960,520,34);if(STEP(t,w(3,'small')))bigX(960,520,110,t,w(3,'small'));lbl('TOTAL SOLAR ECLIPSE?',960,120,80);if(STEP(t,w(3,'ever')))stampL('NEVER AGAIN',960,960,96,RED8,t,w(3,'ever'));badge();};
SC8[4]=t=>{tide(t,0.23,{label:t>w(4,'less')?'TIDES < HALF':'',city:false});lbl('CERES = 1/80 OF THE MOON',960,120,72);if(STEP(t,w(4,'sun',0)))lbl('ONLY THE SUN PULLS',960,220,56,G4);};
SC8[5]=t=>{white();P_ceres(700,520,60);lbl('TINY.',700,640,60);if(STEP(t,w(5,'heart'))){P_pluto(1250,520,160);lblR('A HEART?',1250,760,80);}badge();};
// PLUTO 6–9
SC8[6]=t=>{sky(t,'pluto',{mood:'happy',pose:'up'});lbl('PLUTO',960,110,90);if(STEP(t,w(6,'twice')))lblR('2× BRIGHTER THAN A FULL MOON',960,980,60);};
SC8[7]=t=>{white();const z=snapZ(t,w(7,'heart'),1,1.8);ctx.save();camAt(z,960,560);P_pluto(960,560,330);ctx.restore();if(STEP(t,w(7,'thousand')))lblR('1,000 KM',960,110,90);if(STEP(t,w(7,'own'))){stick(260,1060,1.0,t,{pose:'point',mood:'shock'});lbl('VISIBLE BY EYE',960,990,60);}badge();};
SC8[8]=t=>{tide(t,0.1,{label:'1/5 THE PULL',city:false});if(STEP(t,w(8,'gentle')))lbl('GENTLE TIDES.',960,120,80);if(STEP(t,w(8,'beautiful')))lbl('A QUIET SKY.',960,220,64,G4);};
SC8[9]=t=>{white();P_pluto(700,520,180,false);if(STEP(t,w(9,'title')))stampL('NOT A PLANET (2006)',700,800,64,RED8,t,w(9,'title'));if(STEP(t,w(9,'smallest'))){P_mercury(1400,520,90);lbl('SMALLEST REAL PLANET →',1400,700,48);}badge();};
// MERCURY 10–13
SC8[10]=t=>{sky(t,'mercury',{mood:'curious',pose:'chin'});lbl('MERCURY',960,110,90);if(STEP(t,w(10,'third')))lblR('1.4× THE MOON',960,980,64);};
SC8[11]=t=>{sky(t,'mercury',{mood:'happy',pose:'relax',moonGhost:false});if(STEP(t,w(11,'notice')))lbl('…NOTICE ANYTHING?',960,110,72);if(STEP(t,w(11,'slightly')))lbl('SLIGHTLY BIGGER. SLIGHTLY BRIGHTER.',960,980,52,G4);};
SC8[12]=t=>{if(t<w(12,'so')){white();P_mercury(700,540,280);ctx.save();ctx.beginPath();ctx.arc(700,540,280,0,TAU);ctx.clip();ell(700,540,190,190,{w:6,fill:G3,seed:1201});ctx.restore();lbl('IRON CORE',700,540,56);
    P_moon(1350,540,62);if(STEP(t,w(12,'four')))stampL('4.5× HEAVIER',1350,700,72,RED8,t,w(12,'four'));badge();return;}
  tide(t,2.2,{label:'×4.5 TIDES',t0:w(12,'so')});if(STEP(t,w(12,'every')))lbl('EVERY BEACH: UNDERWATER',960,120,72);};
SC8[13]=t=>{white();P_mercury(600,540,140);lbl('BARELY CHANGES THE SKY',600,760,48,G4);if(STEP(t,w(13,'scars'))){P_mars(1350,540,200);lblR('SCARS?',1350,820,80);}badge();};
