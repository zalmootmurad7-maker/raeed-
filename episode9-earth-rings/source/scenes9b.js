// ===================== WHAT YOU'D SEE (82–126) =====================
// D1 82.2–83.84 "It depends on where you live." globe with 3 pins
function pin(x,y,lab,col,t,t0,dx=0){if(t<t0)return;const k=pop(t,t0,0.25);ctx.save();ctx.translate(x,y);ctx.scale(k*1.6,k*1.6);poly([[0,0],[-18,-40],[18,-40]],{w:4,col:INK,fill:col,close:true,seed:1100});ell(0,-48,20,20,{w:4,col:INK,fill:col,seed:1101});ctx.restore();TX(lab,x+dx,y-110,72,col,{stroke:8,strokeCol:'#000'});}
function D1(t){deep(t);earthS(CX,560,300);ctx.save();ctx.setLineDash([10,10]);line(CX-300,560,CX+300,560,{w:3,col:'rgba(255,90,80,0.8)',seed:1102});ctx.restore();
  pin(CX-60,560,'EQUATOR',GOLD,t,82.4,-200);pin(CX+40,560-300*Math.sin(0.71),'NEW YORK',WHITE,t,82.8,200);pin(CX-20,560-300*Math.sin(1.36),'SVALBARD',RED,t,83.2,-220);vignette(0.5);}
// D2 83.84–91.57 equator: rings edge-on, a razor-thin line from horizon to horizon through the zenith
function D2(t){ctx.save();cam(t,[[83.84,1.0,CX,CY],[91.5,1.08,CX,500]]);sky('#060a1c','#1e2a55');const k=eInOut(P(t,84.3,90.6));
  ctx.save();ctx.strokeStyle='rgba(255,240,205,0.95)';ctx.lineWidth=14;ctx.shadowColor='rgba(255,230,180,0.9)';ctx.shadowBlur=30;glow(CX,120,500,'rgba(255,240,200,0.12)',1);ctx.beginPath();ctx.ellipse(CX,940,1100,1000,0,Math.PI+ (1-k)*Math.PI*0.5,TAU-(1-k)*Math.PI*0.5);ctx.stroke();ctx.restore();
  ctx.fillStyle='#0f1a10';ctx.fillRect(-W,940,W*3,H);line(-50,940,W+50,940,{w:5,col:'#8fb98f',seed:1110,amp:2});
  for(const x of[220,420,1500,1700]){poly([[x,940],[x+8,800],[x-60,780],[x+10,770],[x+80,790],[x+14,800],[x+20,940]],{w:4,col:'#8fb98f',fill:'#0f1a10',close:true,seed:1111+x});}ctx.restore();
  heroBack(CX,1060,1.25,t,{col:WHITE});chip('EQUATOR',230,110,72,GOLD,t,84.0);if(t>87.5)ST('A RAZOR-THIN LINE',CX,980,80,WHITE,t,87.5);vignette(0.45);}
// D3 91.57–98.73 New York: a glowing wall a third of the way up the southern sky (32°)
function D3(t){const k=eOut(P(t,92.3,96.8));ctx.save();cam(t,[[91.57,1.06,CX,CY],[98.7,1.0,CX,CY]]);sky('#070b20','#24325e');
  ctx.save();ctx.beginPath();ctx.ellipse(CX,880,1400,lerp(40,520,k),0,Math.PI,TAU);ctx.closePath();const g=ctx.createLinearGradient(0,360,0,880);g.addColorStop(0,'rgba(240,226,196,0.95)');g.addColorStop(1,'rgba(200,185,155,0.85)');ctx.fillStyle=g;ctx.fill();
  ctx.clip();for(let i=1;i<7;i++){ctx.strokeStyle=i===4?'rgba(40,35,30,0.6)':'rgba(120,105,85,0.35)';ctx.lineWidth=i===4?14:3;ctx.beginPath();ctx.ellipse(CX,880,1400,lerp(40,520,k)*i/7,0,Math.PI,TAU);ctx.stroke();}ctx.restore();
  city(900,t);ctx.restore();chip('NEW YORK · LOOKING SOUTH',CX,100,72,WHITE,t,91.7);
  if(k>0.3){redArrow(1780,880,1780,880-lerp(40,520,k)+20,t,93.5,0.6);TX('32° UP',1640,880-lerp(40,520,k)*0.5,72,GOLD,{stroke:8,strokeCol:'#000'});}
  if(t>96.5)ST('1/3 OF THE SKY',1450,250,90,GOLD,t,96.5,{stroke:8,strokeCol:'#000'});vignette(0.45);}
// D4 98.73–104.48 above 70°N (Svalbard): you'd never see them; the rings stay below the horizon
function D4(t){sky('#081028','#2c3f70');ctx.save();ctx.globalAlpha=0.35+0.15*Math.sin(t*2);for(let i=0;i<3;i++){ctx.strokeStyle=['#5bffb0','#4fd6ff','#9cff8a'][i];ctx.lineWidth=40;ctx.beginPath();ctx.moveTo(-50,260+i*50);ctx.bezierCurveTo(500,120+i*40,1200,380,1980,200+i*60);ctx.stroke();}ctx.restore();
  snowGround(860);if(t>101.3){ctx.save();ctx.setLineDash([18,14]);ctx.strokeStyle='rgba(232,218,190,0.8)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(CX,1060,1100,120,0,Math.PI,TAU);ctx.stroke();ctx.restore();TX('THE RINGS: BELOW YOUR HORIZON',CX,1000,56,INK);}
  hero(560,1040,1.3,t,{pose:'chin',mood:'curious',col:INK});chip('SVALBARD · 78°N',CX,100,72,WHITE,t,98.9);if(t>102.5)ST('NO RINGS. EVER.',1350,420,100,RED,t,102.5,{stroke:8,strokeCol:'#000'});vignette(0.4);}
// D5 104.48–107.52 nights never truly dark again
function D5(t){const k=P(t,104.5,106.5);sky(k<0.5?'#020308':'#0b1232','#28396a');arch(t,{hy:880,rx:1250,ry:720,th:180,a:eOut(k)});city(900,t,{lit:1});glow(CX,850,1100,'rgba(255,240,200,0.18)',k);
  hero(1500,1070,1.2,t,{pose:'up',mood:'happy',col:WHITE});chip('NO MORE DARK NIGHTS',CX,100,80,GOLD,t,104.7);vignette(0.4);}
// D6 107.52–112.42 far brighter than a full Moon
function D6(t){deep(t,{dim:0.7});const k=P(t,108.2,110.0);moonS(260,420,60);TX('FULL MOON',260,560,64,'#cfd6ea');
  ctx.save();ctx.translate(1200,700);const s=0.55;ctx.scale(s,s);ctx.translate(-CX,-880);arch(t,{hy:880,rx:1250,ry:720,th:180});ctx.restore();glow(1200,500,520,'rgba(255,240,200,0.25)',eOut(k));TX('OUR RINGS',1200,800,60,'#cfd6ea');
ST('FAR BRIGHTER',CX,120,110,GOLD,t,110.6,{stroke:8,strokeCol:'#000'});vignette(0.4);}
function moonS(x,y,r){glow(x,y,r*3,'rgba(255,255,255,0.6)',1);ctx.fillStyle='#F4F4F8';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
// D7 112.42–116.81 one black gap: Earth's own shadow across the rings (+ small diagram)
function D7(t){sky('#060a1c','#1e2a55');arch(t,{hy:880,rx:1250,ry:720,th:180,gap:eOut(P(t,112.6,113.6)),gapW:300});city(900,t);
  ctx.save();ctx.translate(1600,250);rrect(-260,-140,520,280,18,{w:5,col:'#cfd6ea',fill:'rgba(8,10,22,0.92)',seed:1130});sunDisk(-200,0,34,t);earthS(0,0,48);ctx.fillStyle='rgba(0,0,0,0.85)';ctx.fillRect(0,-48,240,96);
  ctx.save();ctx.translate(0,0);ringHalf(0,0,48,t,{front:true,flat:0.12,tilt:0});ctx.restore();TX("EARTH'S SHADOW",60,105,40,GOLD);ctx.restore();
  if(t>114)redArrow(CX,180,CX,330,t,114);ST("EARTH'S SHADOW",CX,120,90,RED,t,114.2,{stroke:8,strokeCol:'#000'});vignette(0.45);}
// D8 116.81–122.16 Cassini: Saturn's rings light up its night side
function cassini(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,0,46,18,{w:5,col:'#cfd6ea',fill:'#8a8f9e',seed:1140});poly([[-20,10],[20,10],[30,70],[-30,70]],{w:5,col:'#cfd6ea',fill:'#c79a3a',close:true,seed:1141});line(0,70,0,110,{w:4,col:'#cfd6ea',seed:1142});line(-60,40,60,40,{w:4,col:'#cfd6ea',seed:1143});ctx.restore();}
function D8(t){deep(t);ctx.save();cam(t,[[116.81,0.95,CX,CY],[122.1,1.12,900,CY]]);satC(820,560,230,t,{night:eOut(P(t,118.3,119.8))});ctx.restore();cassini(1600,260,1.1);TX('CASSINI',1600,400,60,GOLD);
  chip('SATURN DOES IT TOO',CX,100,80,WHITE,t,117.0);if(t>119.8)ST('RINGSHINE',1150,620,90,GOLD,t,119.8,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// D9 122.16–126.63 tides shrink to less than half: only the Sun pulls
function D9(t){sky('#0b1232','#28396a');const k=eOut(P(t,122.6,124.4));const lv=lerp(560,700,k);ctx.fillStyle='#d9c48e';ctx.fillRect(-W,760,W*3,H);ctx.fillStyle='rgba(60,130,200,0.85)';ctx.beginPath();ctx.moveTo(-50,lv);for(let x=-50;x<=1300;x+=40)ctx.lineTo(x,lv+8*Math.sin(x*0.02+t*2));ctx.lineTo(1300,H);ctx.lineTo(-50,H);ctx.closePath();ctx.fill();
  rrect(1450,250,160,560,14,{w:6,col:'#cfd6ea',fill:'#141a38',seed:1150});const hh=lerp(520,240,k);ctx.fillStyle='#5aa0e0';ctx.fillRect(1462,802-hh,136,hh);TX(lerp(100,46,k).toFixed(0)+'%',1530,200,80,GOLD);TX('TIDE',1530,860,56,WHITE);
  if(t>124.8){sunDisk(380,220,60,t);TX('ONLY THE SUN PULLS',380,350,56,GOLD);}chip('TIDES: LESS THAN HALF',CX,100,80,WHITE,t,122.3);vignette(0.4);}
// D10 126.63–128.16 "That's the beautiful part." — postcard
function D10(t){sky('#0a1030','#2b3a66');arch(t,{hy:880,rx:1250,ry:720,th:180});city(900,t);ST('BEAUTIFUL…',CX,300,130,GOLD,t,126.8,{stroke:8,strokeCol:'#000'});vignette(0.4);}
// D11 128.16–129.28 "Now the bad part." — the postcard turns red and tears
function D11(t){ctx.save();shake(t,128.2,22,0.4);sky('#200606','#4a0f0f');arch(t,{hy:880,rx:1250,ry:720,th:180,col:[200,120,100]});city(900,t,{lit:0.3});ctx.restore();
  poly([[1000,0],[960,200],[1030,380],[950,600],[1020,820],[970,1080]],{w:10,col:'#000',seed:1160});ST('THE BAD PART',CX,300,150,RED,t,128.25,{stroke:10,strokeCol:'#000'});vignette(0.6);}
// ===================== WINTER (129–158) =====================
// E1 129.28–135.21 Earth is tilted: in winter the Sun sits low, right behind the rings
function E1(t){deep(t);sunDisk(220,700,110,t);ctx.save();ctx.translate(1150,520);ctx.rotate(0.41*eOut(P(t,129.4,130.4)));earthR(0,0,170,t,{tilt:0,flat:0.1});ctx.save();ctx.setLineDash([12,12]);line(0,-260,0,260,{w:4,col:'#cfd6ea',seed:1170});ctx.restore();ctx.restore();
  if(t>130)TX('23.4° TILT',1150,930,70,WHITE);if(t>131){for(let i=0;i<5;i++){const y=560+i*40;line(330,y,lerp(330,880,P(t,131,132.5)),y-120,{w:5,col:GOLD,seed:1171+i});}}
  if(t>133.6)ST('BLOCKED BY THE RINGS',1150,120,90,RED,t,133.6,{stroke:8,strokeCol:'#000'});else chip('WINTER: THE SUN SITS LOW',CX,100,72,WHITE,t,130.7);vignette(0.45);}
// E2 135.21–142.54 shadow band 10°–60° latitude, where most people live
function E2(t){deep(t);const r=330,ex=760,ey=560;earthS(ex,ey,r);const k=eOut(P(t,135.5,137.5));ctx.save();ctx.beginPath();ctx.arc(ex,ey,r,0,TAU);ctx.clip();const y10=ey-r*Math.sin(10*Math.PI/180),y60=ey-r*Math.sin(60*Math.PI/180);
  ctx.fillStyle='rgba(0,0,0,0.72)';ctx.fillRect(ex-r,y60,2*r*k,y10-y60);ctx.restore();line(ex+r+20,y60,ex+r+120,y60,{w:4,col:GOLD,seed:1180});line(ex+r+20,y10,ex+r+120,y10,{w:4,col:GOLD,seed:1181});TX('60°',ex+r+190,y60,64,GOLD);TX('10°',ex+r+190,y10,64,GOLD);
  if(t>140.5){const R=rng(5);for(let i=0;i<40;i++){const x=ex-r*0.7+R()*r*1.4,y=lerp(y60,y10,R());glow(x,y,14,'rgba(255,214,120,0.9)',1);}ST('MOST PEOPLE LIVE HERE',1480,320,80,RED,t,140.7,{stroke:8,strokeCol:'#000'});}
  chip('THE RING SHADOW',CX,100,80,WHITE,t,135.4);vignette(0.45);}
// E3 142.54–149.09 Cassini photographed that exact shadow on Saturn's winter half
function E3(t){deep(t);ctx.save();cam(t,[[142.54,1.0,CX,CY],[149.0,1.18,820,480]]);satC(820,560,250,t,{shadow:eOut(P(t,144.6,146.0))});ctx.restore();cassini(1620,250,1.0);TX('CASSINI',1620,380,56,GOLD);
  chip('NOT A GUESS: PHOTOGRAPHED',CX,100,76,WHITE,t,142.7);if(t>146.5)ST('RING SHADOW',1350,700,90,RED,t,146.5,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// E4 149.09–158.0 midwinter noon: the Sun slides behind the rings, noon goes dim, colder
function E4(t){const k=eInOut(P(t,150.0,153.4));sky('#4d6b98','#9db6d8');sunDisk(lerp(400,960,k),lerp(560,330,k),80,t);arch(t,{hy:900,rx:1350,ry:640,th:240,col:[200,190,170]});
  snowGround(900);city(905,t,{lit:0.2,snow:1,col:'#1b2232'});dim(lerp(0,0.62,P(t,153.4,155.0)));
  rrect(1600,150,250,120,20,{w:5,col:'#cfd6ea',fill:'rgba(8,10,22,0.9)',seed:1190});TX('12:00',1725,212,84,GOLD);
  rrect(160,250,70,420,30,{w:5,col:'#cfd6ea',fill:'#141a38',seed:1191});const th=lerp(300,90,P(t,155.2,157.5));ctx.fillStyle=RED;ctx.fillRect(176,650-th,38,th);ell(195,690,46,46,{w:5,col:'#cfd6ea',fill:RED,seed:1192});
  if(t>153.5)ST('NOON… GOES DIM',CX,200,110,WHITE,t,153.5,{stroke:8,strokeCol:'#000'});if(t>155.3)ST('COLDER',CX,340,110,'#9cd2ff',t,155.3,{stroke:8,strokeCol:'#000'});vignette(0.4);}
