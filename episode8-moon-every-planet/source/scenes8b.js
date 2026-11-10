// MARS 14–17
SC8[14]=t=>{sky(t,'mars',{mood:'shock',pose:'up'});lbl('MARS',960,110,90);if(STEP(t,w(14,'red',1)))lblR('A RED MOON. EVERY NIGHT.',960,980,64);};
SC8[15]=t=>{white();const z=t<w(15,'olympus')?1:snapZ(t,w(15,'olympus'),1,1.12);ctx.save();camAt(z,960,520);P_mars(960,520,330);
  if(STEP(t,w(15,'olympus'))){ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.arc(960-330*0.55,520-330*0.35,60,0,TAU);ctx.stroke();ctx.restore();lbl('OLYMPUS MONS',380,250,52);line(470,280,700,370,{w:4,seed:1502});}
  if(STEP(t,w(15,'valles'))){ctx.save();ctx.setLineDash([16,12]);ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.arc(960-40,560,125,0,TAU);ctx.stroke();ctx.restore();lbl('THE WHOLE MOON (TODAY)',1560,760,44,G4);line(1400,740,1060,620,{w:4,col:G4,seed:1503});
    line(960-330*0.75,520+18,960+330*0.45,520+50,{w:12,col:INK,seed:1501});lbl('4,000 KM CANYON',1560,420,56);line(1420,440,1150,540,{w:4,seed:1504});}
  ctx.restore();if(STEP(t,w(15,'without')))lbl('NO TELESCOPE NEEDED',960,1020,64,RED8);badge();};
SC8[16]=t=>{tide(t,4.5,{label:'×9 TIDES',t0:w(16,'about')});if(STEP(t,w(16,'coastal')))lbl('COASTAL CITIES FLOOD',960,120,72);};
SC8[17]=t=>{white();P_mars(560,540,120);lbl('EXPECTED SIZE',560,720,48,G4);if(STEP(t,w(17,'twin'))){P_venus(1250,520,230);P_earth(1650,560,90);lbl('EARTH',1650,700,40,G4);}if(STEP(t,w(17,'nights')))lblR('NIGHT → DAY?',1250,820,80);badge();};
// VENUS 18–21
SC8[18]=t=>{sky(t,'venus',{mood:'shock',pose:'up'});lbl('VENUS',960,110,90);if(STEP(t,w(18,'three')))lblR('3.5× THE MOON',960,980,64);};
SC8[19]=t=>{white();const R=rng(3);ctx.fillStyle=G3;for(let i=0;i<40;i++){ctx.beginPath();ctx.arc(R()*W,R()*500,2,0,TAU);ctx.fill();}P_venus(1400,280,170);
  for(let i=0;i<12;i++){const a=i/12*TAU;line(1400+Math.cos(a)*190,280+Math.sin(a)*190,1400+Math.cos(a)*240,280+Math.sin(a)*240,{w:5,col:G4,seed:1901+i});}
  line(0,880,W,880,{w:6,seed:1910});stick(620,880,1.3,t,{pose:'relax',mood:'happy'});rrect(560,620,130,90,6,{w:5,fill:'#fff',seed:1911});line(625,620,625,710,{w:4,seed:1912});
  if(STEP(t,w(19,'seventy')))stampL('70× BRIGHTER THAN A FULL MOON',960,110,70,RED8,t,w(19,'seventy'));if(STEP(t,w(19,'midnight')))lbl('READING AT MIDNIGHT',620,980,56);badge();};
SC8[20]=t=>{if(t<w(20,'today')){white();P_venus(700,520,230);P_moon(1350,520,66);if(STEP(t,w(20,'sixty')))stampL('66× HEAVIER',1350,690,80,RED8,t,w(20,'sixty'));lbl("IT'S THE WEIGHT",960,110,80);badge();return;}
  tide(t,30,{label:'~30 M. TWICE A DAY.',t0:w(20,'around')});if(STEP(t,w(20,'gone')))stampL('GONE.',960,140,130,RED8,t,w(20,'gone'));};
SC8[21]=t=>{white();P_venus(620,540,230);lbl('ALMOST EARTH',620,830,56,G4);if(STEP(t,w(21,'it',1))){P_earth(1350,540,240);stampL('IT IS EARTH.',1350,860,80,RED8,t,w(21,'it',1));}badge();};
// SECOND EARTH 22–24
SC8[22]=t=>{sky(t,'earth',{mood:'shock',pose:'up'});lbl('A SECOND EARTH',960,110,90);if(STEP(t,w(22,'cities'))){ctx.save();const R=rng(9);ctx.fillStyle=RED8;for(let i=0;i<14;i++){const a=R()*TAU,d=R()*90;ctx.beginPath();ctx.arc(1250+60+Math.cos(a)*d*0.5,330+Math.sin(a)*d,5,0,TAU);ctx.fill();}ctx.restore();lblR('CITY LIGHTS',1250,560,56);}};
SC8[23]=t=>{white();const a=t<w(23,'circle')?0:Math.floor((t-w(23,'circle'))*12)/12*1.1;const cx=960,cy=560,d=330;
  ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=RED8;ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,d,0,TAU);ctx.stroke();ctx.restore();
  P_earth(cx+Math.cos(a)*d,cy+Math.sin(a)*d,110);P_earth(cx-Math.cos(a)*d,cy-Math.sin(a)*d,110);ell(cx,cy,8,8,{w:4,fill:INK,seed:2301});
  if(STEP(t,w(23,'eighty')))lbl('PULL ×80',960,110,80);if(STEP(t,w(23,'forty')))lblR('TIDES ~40 M',960,200,64);if(STEP(t,w(23,'nineteen')))stampL('ONE DANCE = 19 DAYS',960,990,72,RED8,t,w(23,'nineteen'));badge();};
SC8[24]=t=>{white();stick(420,950,1.6,t,{pose:'point',mood:'happy'});rrect(760,360,520,170,30,{w:7,fill:RED8,seed:2401});txt('SUBSCRIBE',1020,448,80,{col:'#fff'});
  if(STEP(t,w(24,'giants'))){for(const[n,x]of[['neptune',1560],['saturn',1780]]){PL[n](x,820,n==='saturn'?70:90);}lbl('NEXT: THE GIANTS',1660,640,52);}if(STEP(t,w(24,'fourteen')))lblR('14× THE MOON',1660,1000,56);badge();};
// NEPTUNE 25–29
SC8[25]=t=>{const z=t<w(25,'fourteen')?expZ(t,w(25,'neptune'),w(25,'fourteen'),3,1):1;sky(t,'neptune',{z,fx:1250,fy:450,px:1250,py:450,mood:'shock',pose:'up',r0:19});lbl('NEPTUNE',960,110,90);if(STEP(t,w(25,'fourteen')))lblR('14× WIDER THAN THE MOON',960,990,60);};
SC8[26]=t=>{white();line(0,900,W,900,{w:6,seed:2601});stick(420,900,1.4,t,{pose:'point',mood:'curious'});const ex=420+110*1.4,ey=900-250*1.4;
  for(let i=0;i<3;i++)rrect(ex-8+i*16,ey-60,14,60,6,{w:4,fill:'#fff',seed:2610+i});ctx.save();ctx.setLineDash([10,10]);ctx.strokeStyle=G3;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(400,560);ctx.lineTo(1500,300);ctx.moveTo(400,560);ctx.lineTo(1500,640);ctx.stroke();ctx.restore();
  P_neptune(1500,470,170);lbl('3 FINGERS ≈ 5°',ex+30,ey-110,48);if(STEP(t,w(26,'wider')))lblR('NEPTUNE ≈ 7°',1500,720,64);if(STEP(t,w(26,'eye')))lbl('A GIANT EYE IN THE SKY',960,110,72);badge();};
SC8[27]=t=>{white();P_neptune(960,540,320);const k=Math.floor(t*12)%6;for(let i=0;i<5;i++){const y=380+i*80;line(400+k*20,y,620+k*20,y,{w:6,col:G4,seed:2701+i});}
  if(STEP(t,w(27,'two')))stampL('~2,000 KM/H WINDS',960,110,80,RED8,t,w(27,'two'));if(STEP(t,w(27,'watch')))lbl('YOU COULD WATCH THE STORMS MOVE',960,980,56);badge();};
SC8[28]=t=>{white();const bul=STEP(t,w(28,'torn'))?1:0;P_earth(960,560,200);ctx.save();ctx.strokeStyle=RED8;ctx.lineWidth=7;ctx.setLineDash([16,12]);ctx.beginPath();ctx.ellipse(960,560,200+bul*180,200-bul*20,0,0,TAU);ctx.stroke();ctx.restore();
  P_neptune(1700,560,150);lbl('×1,400 PULL',960,110,80);if(bul)lblR('THE OCEAN, TORN INTO A BULGE',960,990,60);badge();};
SC8[29]=t=>{white();P_neptune(560,540,160);lbl('BLUE. WILD.',560,760,56,G4);if(STEP(t,w(29,'rolls'))){const a=Math.floor((t-w(29,'rolls'))*12)*0.35;P_uranus(1350,540,170,Math.PI*98/180+a,false);stampL('IT ROLLS.',1350,800,96,RED8,t,w(29,'rolls'));}badge();};
