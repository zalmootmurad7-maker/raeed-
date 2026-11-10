// URANUS 30–33
SC8[30]=t=>{white();const a=Math.floor(t*12)/12*0.8;ctx.save();ctx.setLineDash([14,12]);ctx.strokeStyle=G3;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(960,620,700,140,0,0,TAU);ctx.stroke();ctx.restore();
  P_uranus(960+Math.cos(a)*700*0.0,620,190,Math.PI*98/180);P_sun(160,620,60);lbl('URANUS',960,110,90);if(STEP(t,w(30,'ninety')))lblR('TILTED 98°',960,990,72);badge();};
SC8[31]=t=>{white();const R=rng(5);ctx.fillStyle=G3;for(let i=0;i<60;i++){ctx.beginPath();ctx.arc(R()*W,R()*600,2,0,TAU);ctx.fill();}line(0,880,W,880,{w:6,seed:3101});stick(420,880,1.25,t,{pose:'point',mood:'shock'});
  ctx.save();ctx.strokeStyle=RED8;ctx.lineWidth=7;for(const k of[1.5,1.75]){ctx.beginPath();ctx.ellipse(1250,420,210*k,210*k,0,0,TAU);ctx.stroke();}ctx.restore();P_uranus(1250,420,210,0,false);
  if(STEP(t,w(31,'target')))lblR('A GIANT TARGET',1250,60,72);badge();};
SC8[32]=t=>{tide(t,25,{label:'×1,000+ PULL',t0:w(32,'its')});if(STEP(t,w(32,'wrecked')))stampL('WRECKED',960,140,110,RED8,t,w(32,'wrecked'));};
SC8[33]=t=>{white();P_uranus(560,540,150);lbl('STRANGE.',560,760,56,G4);if(STEP(t,w(33,'beautiful'))){P_saturn(1350,520,110);lblR('A QUARTER OF THE SKY?',1350,820,64);}badge();};
// SATURN 34–38
SC8[34]=t=>{const z=t<w(34,'thirty')?expZ(t,w(34,'saturn'),w(34,'thirty'),6,1):1;sky(t,'saturn',{z,fx:1150,fy:420,px:1150,py:420,r0:7.5,mood:'shock',pose:'up'});lbl('SATURN',960,110,90);if(STEP(t,w(34,'quarter')))lblR('RINGS: 250,000+ KM ACROSS',960,990,60);};
SC8[35]=t=>{white();line(0,960,W,960,{w:6,seed:3501});stick(260,960,1.3,t,{pose:'point',mood:'shock'});P_saturn(1100,420,150);
  const fist=(x,c)=>{rrect(x-40,830,80,70,16,{w:5,fill:c?RED8:'#fff',seed:3510+x});};
  fist(1100,0);lbl('PLANET = 1 FIST',1100,780,44);if(STEP(t,w(35,'four'))){for(let i=0;i<4;i++)fist(800+i*200,1);lblR('RINGS = 4 FISTS',1100,1030,56);}if(STEP(t,w(35,'quarter')))lbl('A QUARTER OF THE WAY ACROSS THE SKY',960,110,60);badge();};
SC8[36]=t=>{white();rrect(560,600,800,260,60,{w:7,fill:'#fff',seed:3601});ctx.save();ctx.beginPath();ctx.rect(560,640,800,220);ctx.clip();ctx.fillStyle=G1;ctx.fillRect(560,700,800,160);ctx.restore();
  for(const x of[640,1280])line(x,860,x,930,{w:7,seed:3602+x});P_saturn(960,650,90);stick(1560,930,1.0,t,{pose:'chin',mood:'curious'});
  if(STEP(t,w(36,'float')))lbl('DENSITY 0.69 < WATER',960,110,72);if(STEP(t,w(36,'big')))lblR('(BIG BATHTUB REQUIRED)',960,1010,56);badge();};
SC8[37]=t=>{if(t<w(37,'saturn')){white();P_saturn(960,540,200);lbl('PULL ×7,700',960,110,80);badge();return;}
  white();const cx=900,cy=560;P_saturn(cx,cy,170);const a=STEP(t,w(37,'we'))?Math.floor((t-w(37,'we'))*12)/12*0.9:0;
  ctx.save();ctx.setLineDash([14,12]);ctx.strokeStyle=RED8;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(cx,cy,620,240,0,0,TAU);ctx.stroke();ctx.restore();P_earth(cx+Math.cos(a)*620,cy+Math.sin(a)*240,60);
  lbl('95× HEAVIER THAN EARTH',960,110,70);if(STEP(t,w(37,'we')))stampL('WE ORBIT SATURN',960,990,80,RED8,t,w(37,'we'));if(STEP(t,w(37,'three')))lbl('ONCE EVERY 3 DAYS',1500,860,52);badge();};
SC8[38]=t=>{white();P_saturn(560,540,120);lbl('STEALS OUR SKY',560,780,52,G4);if(STEP(t,w(38,'last'))){P_jupiter(1350,520,220);ctx.save();ctx.setLineDash([10,8]);ctx.strokeStyle=RED8;ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(1350,520,320,90,-0.1,0,TAU);ctx.stroke();ctx.restore();P_earth(1660,480,26);}
  if(STEP(t,w(38,'planet',1)))stampL('STEALS OUR PLANET',1350,860,72,RED8,t,w(38,'planet',1));badge();};
// JUPITER 39–43
SC8[39]=t=>{const z=t<w(39,'forty')?expZ(t,w(39,'jupiter'),w(39,'forty'),8,1):1;sky(t,'jupiter',{z,fx:1200,fy:470,px:1200,py:470,r0:9.5,mood:'shock',pose:'up'});lbl('JUPITER',960,110,90);if(STEP(t,w(39,'three')))lblR('318× EARTH',960,990,64);};
SC8[40]=t=>{white();P_jupiter(960,560,430);P_earth(960+430*0.25+90,560+430*0.28-110,22);lbl('EARTH',960+430*0.25+90,560+430*0.28-160,36);lbl('20° OF SKY = 2 FISTS',960,60,60);if(STEP(t,w(40,'storms')))lblR('STORMS BIGGER THAN EARTH',960,1030,60);badge();};
SC8[41]=t=>{white();const cx=640,cy=560;P_jupiter(cx,cy,110);ctx.save();ctx.fillStyle='rgba(211,47,47,0.10)';ctx.beginPath();ctx.ellipse(cx,cy,700,330,0,0,TAU);ctx.fill();ctx.restore();
  ctx.save();ctx.setLineDash([10,10]);ctx.strokeStyle=G3;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(cx,cy,660,300,0,0,TAU);ctx.stroke();ctx.restore();lbl('IO',cx+660,cy-330,44,G4);
  const a=STEP(t,w(41,'circling'))?Math.floor((t-w(41,'circling'))*12)/12*1.2:0;ctx.save();ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(cx,cy,600,270,0,0,TAU);ctx.stroke();ctx.restore();P_earth(cx+Math.cos(a)*600,cy+Math.sin(a)*270,40);
  lbl('EARTH = A MOON OF JUPITER',960,80,70);if(STEP(t,w(41,'day')))lbl('1 LAP = 1.5 DAYS',1500,960,52);if(STEP(t,w(41,'deadly')))lblR('INSIDE THE RADIATION BELTS',960,1030,56);badge();};
SC8[42]=t=>{white();P_sun(160,540,90);P_jupiter(960,540,170);ctx.save();ctx.fillStyle='rgba(60,60,60,0.35)';ctx.beginPath();ctx.moveTo(960,370);ctx.lineTo(1920,430);ctx.lineTo(1920,650);ctx.lineTo(960,710);ctx.closePath();ctx.fill();ctx.restore();
  const inS=STEP(t,w(42,'slide'));P_earth(inS?1450:1450,inS?540:330,50);if(STEP(t,w(42,'black')))stampL('SUN: GONE ~2 H',960,110,80,RED8,t,w(42,'black'));
  if(STEP(t,w(42,'every')))stampL('EVERY.',560,980,80,INK,t,w(42,'every'));if(STEP(t,w(42,'single')))stampL('SINGLE.',960,980,80,INK,t,w(42,'single'));if(STEP(t,w(42,'day')))stampL('DAY AND A HALF.',1460,980,80,RED8,t,w(42,'day'));badge();};
SC8[43]=t=>{white();P_jupiter(1350,380,520);P_earth(500,1150,420);stick(500,730,1.3,t,{pose:'up',mood:'shock'});if(STEP(t,w(43,'living')))stampL("YOU'RE ON A MOON.",500,140,90,RED8,t,w(43,'living'));badge();};
// SUN 44–46
SC8[44]=t=>{white();line(0,880,W,880,{w:6,seed:4401});stick(700,880,1.4,t,{pose:'point',mood:'curious'});ctx.save();ctx.setLineDash([14,12]);ctx.strokeStyle=G3;ctx.lineWidth=5;ctx.beginPath();ctx.arc(1300,330,90,0,TAU);ctx.stroke();ctx.restore();lbl('?',1300,335,110);lbl('ONE MORE THING…',960,110,80);badge();};
SC8[45]=t=>{white();const z=t<w(45,'put')?expZ(t,w(45,'sun'),w(45,'put'),3.5,1):1;ctx.save();camAt(z,960,540);const sc=330/384400;
  ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle=INK;ctx.lineWidth=4;ctx.beginPath();ctx.arc(960,540,384400*sc,0,TAU);ctx.stroke();ctx.restore();lbl("MOON'S ORBIT: 384,400 KM",960,540-330-30,40,G4);
  if(STEP(t,w(45,'put')))P_sun(960+330,540,696000*sc);P_earth(960,540,24);lbl('EARTH',960,600,36);ctx.restore();
  lbl("SUN'S RADIUS: 696,000 KM",960,90,64);if(STEP(t,w(45,'inside')))stampL('EARTH: INSIDE THE SUN',960,1010,80,RED8,t,w(45,'inside'));badge();};
SC8[46]=t=>{sky(t,'moon',{mood:'happy',pose:'cheer',moonGhost:false,r0:60});stampL('…MAYBE KEEP THE MOON.',960,110,80,INK,t,LN[46].s);};
// 47 recap, 48 CTA
SC8[47]=t=>{white();const k=Math.min(ORDER.length,Math.floor((t-LN[47].s)*3)+1);let x=60;for(let i=0;i<ORDER.length;i++){const n=ORDER[i],r=Math.min(150,5*SZ[n]+12);if(i<k)PL[n](x+r,520,r);x+=2*r+24;}
  if(STEP(t,w(47,'star')))P_sun(1700,520,260);lbl('EVERY WORLD IN THE MOON\'S PLACE',960,110,70);badge();};
SC8[48]=t=>{white();const pk=[['ceres',220],['pluto',540],['mars',860],['venus',1180],['saturn',1500],['jupiter',1760]];for(const[n,x]of pk){rrect(x-130,330,260,300,20,{w:6,fill:'#fff',seed:4801+x});PL[n](x,480,n==='saturn'?55:80);lbl(n.toUpperCase(),x,670,40);}
  lbl('WHICH ONE IN YOUR SKY?',960,140,90);lblR('TELL ME IN THE COMMENTS',960,240,56);if(STEP(t,w(48,'like'))){likeBtn(1500,880,1.0,true);stick(400,1060,1.0,t,{pose:'point',mood:'happy'});}badge();};
function render(t){t=Math.floor(t*12+1e-6)/12;BOIL=Math.floor(t*8);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);
  let i=0;while(i+1<LN.length&&t>=LN[i+1].s-0.08)i++;SC8[i](t);
  if(t>DUR8-0.5){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(255,255,255,${clamp((t-(DUR8-0.5))/0.5)})`;ctx.fillRect(0,0,W,H);}}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
