// ===================== DANGER (158–222): fast cuts =====================
// F1 158.0–161.43 "And leaving Earth? That just became a nightmare." launch pad under the rocky sky
function F1(t){ctx.save();shake(t,159.5,22,0.5);sky('#070b20','#24325e');arch(t,{hy:900,rx:1300,ry:760,th:200});const R=rng(77);for(let i=0;i<50;i++){const a=Math.PI+R()*Math.PI,f=0.75+R()*0.25;rock(CX+Math.cos(a)*1300*f,900+Math.sin(a)*760*f,4+R()*8,1200+i);}
  ctx.fillStyle='#10131f';ctx.fillRect(-W,900,W*3,H);poly([[860,900],[880,600],[900,900]],{w:5,col:'#cfd6ea',seed:1210});rocket(1000,780,1.0,t,{flame:P(t,159.4,160)});ctx.restore();ST('NIGHTMARE',CX,170,130,RED,t,159.5,{stroke:10,strokeCol:'#000'});vignette(0.5);}
// F2 161.43–166.95 billions of rocks racing at up to 7 km/s
function F2(t){deep(t,{dim:0.6});for(let i=0;i<70;i++){const R=rng(1300+i);const lane=R();const v=600+lane*900;const x=((R()*2400+t*v)%2400)-240,y=150+lane*800;line(x-90,y,x-10,y,{w:3,col:'rgba(200,190,170,0.5)',seed:1300+i});rock(x,y,8+R()*22,1300+i);}
  if(t>163.5){const n=counter(t,163.5,165.5,0,7);TX(n+' KM/S',CX,540,190,GOLD,{stroke:12,strokeCol:'#000'});}chip('BILLIONS OF ROCKS',CX,100,80,WHITE,t,161.6);vignette(0.5);}
// F3 166.95–171.06 they barely touch: all moving together (lanes with parallel arrows)
function F3(t){deep(t,{dim:0.6});for(let i=0;i<5;i++){const y=260+i*130;for(let j=0;j<6;j++){const x=((j*360+t*250)%2160)-120;rock(x,y,26,1400+i*10+j);}arrow(200,y+60,420,y+60,{col:'rgba(255,215,0,0.7)',w:5,head:18,seed:1450+i});}
  chip('ALL MOVING TOGETHER',CX,100,80,GOLD,t,167.2);if(t>169.3)ST('BARELY TOUCH',CX,980,90,WHITE,t,169.3);vignette(0.5);}
// F4 171.06–172.63 "But your rocket isn't." — rocket cuts across the lanes
function F4(t){deep(t,{dim:0.6});for(let i=0;i<5;i++){const y=260+i*130;for(let j=0;j<6;j++){const x=((j*360+t*250)%2160)-120;rock(x,y,26,1400+i*10+j);}}rocket(CX,lerp(1100,-100,P(t,171.1,172.6)),0.9,t);ST('YOUR ROCKET',1450,950,90,RED,t,171.2,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// F5 172.63–176.63 several km/s impacts
function F5(t){ctx.save();shake(t,174.2,20,0.35);shake(t,175.6,20,0.35);deep(t,{speed:1200,dirx:-1});rocket(800,540,1.4,t,{ang:0});
  for(const[t0,y]of[[173.2,470],[174.2,600],[175.6,520]]){if(t>t0){const k=P(t,t0,t0+0.2);rock(lerp(1900,920,k),y,16,1500+y);if(k>=1){glow(920,y,90,'rgba(255,150,60,0.9)',1-P(t,t0+0.2,t0+0.6));}}}ctx.restore();
  chip('SEVERAL KM PER SECOND',CX,100,80,WHITE,t,172.8);vignette(0.5);}
// F6 176.63–180.69 a single gram of rock hits harder than a rifle bullet (energy bars)
function F6(t){deep(t);const k=eOut(P(t,177.2,178.8));rock(300,330,40,1600);TX('1 GRAM OF ROCK',300,450,72,WHITE);TX('AT 5 KM/S',300,520,60,'#cfd6ea');ctx.fillStyle=RED;ctx.fillRect(600,290,1200*k,110);
  ell(300,720,12,32,{w:5,col:'#cfd6ea',fill:'#c8a050',seed:1601});TX('RIFLE BULLET',300,830,72,WHITE);ctx.fillStyle='#8a8fa8';ctx.fillRect(600,670,175*k,110);
  if(k>=1){TX('12,500 J',1560,230,80,GOLD);TX('1,800 J',900,725,72,'#cfd6ea');ST('×7',1450,560,170,RED,t,179.0,{stroke:10,strokeCol:'#000'});}chip('ENERGY',CX,100,80,WHITE,t,176.8);vignette(0.5);}
// F7 180.69–189.83 2009: two satellites collide at 42,000 km/h -> more than 2,000 pieces
function F7(t){ctx.save();const tc=184.4;shake(t,tc,30,0.6);deep(t);earthS(CX,1350,600);if(t<tc){const k=P(t,182,tc);satellite(lerp(300,CX-60,k),lerp(300,420,k),0.8);satellite(lerp(1620,CX+60,k),lerp(260,420,k),0.8);}
  else{const k=P(t,tc,188);glow(CX,420,300*(1-k*0.7),'rgba(255,170,80,0.9)',1-k*0.6);const R=rng(1700);for(let i=0;i<160;i++){const a=R()*TAU,sp=R();ctx.fillStyle='#ddd';ctx.fillRect(CX+Math.cos(a)*sp*900*eOut(k),420+Math.sin(a)*sp*500*eOut(k),5,5);}}ctx.restore();
  chip('2009 · IRIDIUM 33 × KOSMOS 2251',CX,90,64,GOLD,t,181.0);if(t>183)TX('42,000 KM/H',CX,880,90,WHITE,{stroke:8,strokeCol:'#000'});if(t>tc+1.5){const n=counter(t,tc+1.5,189.0,0,2000);TX('> '+n.toLocaleString('en-US')+' PIECES',CX,1000,90,RED,{stroke:8,strokeCol:'#000'});}vignette(0.5);}
// F8 189.83–193.72 internet satellites inside the rings: gone
function orbitView(t,{gps=0,sats=0,x0=CX,y0=560,r=120}={}){earthS(x0,y0,r);ctx.save();ctx.translate(x0,y0);const s=r/6371;for(const[a0,b0,col]of RB){ctx.fillStyle=col;ctx.beginPath();ctx.arc(0,0,b0*6371*s,0,TAU);ctx.arc(0,0,a0*6371*s,0,TAU,true);ctx.fill();}ctx.restore();earthS(x0,y0,r);
  if(gps>0){ctx.save();ctx.setLineDash([16,12]);ctx.strokeStyle='#5bd16a';ctx.lineWidth=6;ctx.beginPath();ctx.arc(x0,y0,26600*s,0,TAU);ctx.stroke();ctx.restore();}}
function F8(t){deep(t);orbitView(t,{r:110});const s=110/6371;const R=rng(1800);for(let i=0;i<8;i++){const a=i/8*TAU+t*0.05;const x=CX+Math.cos(a)*14433*s,y=560+Math.sin(a)*14433*s;satellite(x,y,0.28);if(t>192.6)bigX(x,y,40,t,192.6+i*0.05);}
  chip('INTERNET SATELLITES (8,000 KM UP)',CX,90,64,WHITE,t,190.0);if(t>192.8)ST("THEY'RE GONE",1600,900,90,RED,t,192.8,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// F9 193.72–198.86 GPS survives: its orbit is way out beyond the rings
function F9(t){deep(t);ctx.save();cam(t,[[193.72,1.0,CX,CY],[198.8,0.92,CX,CY]]);orbitView(t,{r:85,gps:eOut(P(t,194,195.5))});const s=85/6371;for(let i=0;i<6;i++){const a=i/6*TAU+t*0.04;satellite(CX+Math.cos(a)*26600*s,560+Math.sin(a)*26600*s,0.25);}ctx.restore();
  chip('GPS: 20,200 KM UP',CX,90,72,'#7ee08a',t,194.0);if(t>195.8)ST('SURVIVES',1650,880,90,'#7ee08a',t,195.8,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// F10 198.86–205.11 every launch must sneak under the rings, or swing out past them
function F10(t){deep(t);const ex=560,ey=620;earthS(ex,ey,150);ctx.save();ctx.translate(ex,ey);ctx.rotate(0);for(const[a0,b0,col]of RB)band(a0*150,b0*150,0.12,true,col);for(const[a0,b0,col]of RB)band(a0*150,b0*150,0.12,false,col);ctx.restore();
  const k1=P(t,199.5,201.3),k2=P(t,201.6,203.5),k3=P(t,203.0,204.6);ctx.save();ctx.setLineDash([14,10]);
  if(k1>0){ctx.strokeStyle=RED;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(ex,ey-150);ctx.lineTo(lerp(ex,ex+200,k1),lerp(ey-150,ey,k1));ctx.stroke();}ctx.restore();if(k1>=1){bigX(ex+200,ey,40,t,201.3);}
  ctx.save();ctx.setLineDash([14,10]);if(k2>0){ctx.strokeStyle='#7ee08a';ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(ex,ey,175,160,0,-Math.PI/2,-Math.PI/2+TAU*k2*0.5);ctx.stroke();}
  if(k3>0){ctx.strokeStyle='#7ee08a';ctx.beginPath();ctx.moveTo(ex,ey-150);ctx.bezierCurveTo(ex+150,ey-600,ex+900,ey-500,lerp(ex+300,ex+1150,k3),lerp(ey-300,ey-40,k3));ctx.stroke();}ctx.restore();
  if(t>201.6)TX('UNDER',ex+260,ey+250,64,'#7ee08a');if(t>203.2)TX('OUT PAST THEM',1500,340,64,'#7ee08a');chip('EVERY LAUNCH',CX,90,80,WHITE,t,199.0);vignette(0.45);}
// F11 205.11–210.09 a cosmic minefield
function F11(t){ctx.save();cam(t,[[205.11,1.2,CX,CY],[210.0,0.95,CX,CY]]);deep(t);earthR(CX,560,170,t,{flat:0.24});for(let i=0;i<8;i++){const a=i/8*TAU+0.3;const x=CX+Math.cos(a)*430,y=560+Math.sin(a)*105;if(t>207.2+i*0.12){glow(x,y,30,'rgba(255,60,60,0.8)',0.6+0.4*Math.sin(t*10+i));TX('!',x,y,46,WHITE);}}ctx.restore();
  if(t>205.3&&t<207)ST('NO MOON…',CX,140,110,'#cfd6ea',t,205.3);if(t>=207)ST('A COSMIC MINEFIELD',CX,140,120,RED,t,207.3,{stroke:10,strokeCol:'#000'});vignette(0.5);}
// F12 210.09–216.56 Saturn's rings are raining into Saturn right now
function F12(t){deep(t);ctx.save();cam(t,[[210.09,1.0,CX,CY],[216.5,1.15,CX,560]]);satC(CX,620,260,t);for(let i=0;i<40;i++){const R=rng(1900+i);const x=CX-200+R()*400,ph=(t*0.9+R())%1;ctx.strokeStyle='rgba(200,225,255,0.7)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+(R()-0.5)*500,500-80+ph*60);ctx.lineTo(x,620-200+ph*120);ctx.stroke();}ctx.restore();
  chip('RIGHT NOW: "RING RAIN"',CX,90,76,WHITE,t,210.3);if(t>214.3)ST('TONS EVERY SECOND',CX,950,90,GOLD,t,214.3,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// F13 216.56–222.6 shooting stars every night... and now and then, something much bigger
function F13(t){ctx.save();const big=221.5;shake(t,big,34,0.7);sky('#060a1c','#1e2a55');arch(t,{hy:900,rx:1300,ry:760,th:190});
  for(let i=0;i<14;i++){const R=rng(2000+i);const t0=216.8+R()*4.5,ph=(t-t0)/0.6;if(ph<0||ph>1)continue;const x=200+R()*1500,y=100+R()*300;line(x,y,x-200*ph,y+260*ph,{w:4,col:'rgba(255,255,255,0.9)',seed:2000+i});}
  if(t>220.3){const k=P(t,220.3,big);const x=lerp(1500,1100,k),y=lerp(-50,880,k);glow(x,y,160,'rgba(255,150,60,0.95)',1);line(x,y,x+220,y-480,{w:16,col:'rgba(255,200,120,0.8)',seed:2050});}
  city(900,t);if(t>big){const f=1-P(t,big,big+1.0);ctx.fillStyle=`rgba(255,230,190,${f})`;ctx.fillRect(-W,-H,W*3,H*3);}ctx.restore();
  chip('SHOOTING STARS EVERY NIGHT',CX,90,72,WHITE,t,218.5);if(t>big)ST('SOMETHING BIGGER',CX,320,120,RED,t,big,{stroke:10,strokeCol:'#000'});vignette(0.45);}
// ===================== NEW MOON (222–244) : calmer =====================
// G1 222.6–224.54 "But the rings wouldn't last forever." time-lapse clock
function G1(t){deep(t,{dim:0.8});earthR(CX,600,150,t*6,{flat:0.22});chip('NOT FOREVER',CX,140,90,GOLD,t,222.8);vignette(0.5);}
// G2 224.54–233.58 past the Roche limit, rock clumps together and builds a new (smaller) Moon
function G2(t){deep(t,{dim:0.8});const x0=600,y0=580,r=150;earthR(x0,y0,r,t,{flat:0.2,tilt:0});ctx.save();ctx.setLineDash([20,14]);ctx.strokeStyle=RED;ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(x0,y0,2.89*r,2.89*r*0.2,0,0,TAU);ctx.stroke();ctx.restore();TX('ROCHE LIMIT',x0,y0+120,48,RED);
  const k=P(t,225.8,230.6);const mx=1480,my=520;const R=rng(2100);for(let i=0;i<60;i++){const a=R()*TAU,d=(1-eOut(k))*(120+R()*260);rock(mx+Math.cos(a)*d,my+Math.sin(a)*d*0.6,3+R()*6,2100+i);}
  if(k>0.3)moonC(mx,my,lerp(14,120,eOut((k-0.3)/0.7)));if(t>231){ctx.save();ctx.setLineDash([12,10]);ctx.strokeStyle='#cfd6ea';ctx.lineWidth=4;ctx.beginPath();ctx.arc(mx,my,170,0,TAU);ctx.stroke();ctx.restore();TX('OLD MOON SIZE',mx,my+215,56,'#cfd6ea');}
  if(t>228.2)ST('A NEW MOON',mx,220,110,GOLD,t,228.2,{stroke:8,strokeCol:'#000'});if(t>232.4)ST('…BUT A MOON',mx,880,80,WHITE,t,232.4);vignette(0.5);}
// G3 233.58–237.48 Cassini may have caught a baby moon (Peggy, 2013) at the edge of Saturn's rings
function G3(t){deep(t);ctx.save();cam(t,[[233.58,1.0,CX,CY],[237.4,1.9,1330,600]]);satC(CX,560,220,t);const px=CX+2.25*220*Math.cos(0.15),py=560+2.25*220*0.24*Math.sin(0.15)-2.25*220*0.26*Math.cos(0.15)*0.26;glow(1395,640,40,'rgba(255,255,255,0.95)',0.6+0.4*Math.sin(t*6));ctx.restore();
  chip('2013 · "PEGGY"',CX,90,80,GOLD,t,233.8);if(t>235.2)ST('A BABY MOON?',CX,950,100,WHITE,t,235.2,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// G4 237.48–244.53 how our own Moon was born: a debris ring around the young Earth, 4.5 billion years ago
function G4(t){deep(t);const k=P(t,239.5,243.5);earthS(760,560,170,{young:1});ctx.save();ctx.translate(760,560);for(const[a0,b0,col]of[[1.4,2.6,'rgba(255,150,80,0.5)']]){band(a0*170,b0*170,0.22,true,col);band(a0*170,b0*170,0.22,false,col);}ctx.restore();
  const mx=lerp(1050,1450,k),my=lerp(600,480,k);moonC(mx,my,lerp(12,70,eOut(k)));chip('4.5 BILLION YEARS AGO',CX,90,80,GOLD,t,240.2);if(t>238)TX('OUR MOON WAS BORN LIKE THIS',CX,960,70,WHITE);vignette(0.5);}
// ===================== TWIST (244.5–283.7) : break the rhythm, calm and focused =====================
// H1 244.53–247.88 "Now... the craziest part. The one I promised." slow push into the dark
function H1(t){deep(t,{dim:0.5});ctx.save();cam(t,[[244.0,0.85,CX,CY],[247.88,1.1,CX,CY]]);ancient(CX,560,230,t,{});ctx.restore();if(t>245.2)TX('THE CRAZIEST PART',CX,150,110,WHITE,{a:P(t,245.2,245.8)});if(t>246.7)TX('(THE ONE I PROMISED)',CX,960,60,'#cfd6ea',{a:P(t,246.7,247.2)});vignette(0.7);}
// H2 247.88–249.75 Earth might have had rings before
function H2(t){deep(t,{dim:0.6});ctx.save();cam(t,[[247.88,1.0,CX,CY],[249.75,1.08,CX,CY]]);ancient(CX,560,240,t,{ring:P(t,248.2,249.2)});ctx.restore();chip('EARTH HAD RINGS?',CX,100,90,GOLD,t,248.0);vignette(0.6);}
// H3 249.75–253.83 random impacts would be scattered everywhere
function H3(t){deep(t,{dim:0.6});ancient(CX,560,280,t,{rand:P(t,250,252.8)});chip('RANDOM HITS: SCATTERED EVERYWHERE',CX,100,70,WHITE,t,250.0);vignette(0.6);}
// H4 253.83–262.89 2024: 21 craters ~466 Myr old, all near the equator of that time
function H4(t){deep(t,{dim:0.6});ctx.save();cam(t,[[253.83,1.0,CX,CY],[262.8,1.12,CX,CY]]);ancient(CX,560,280,t,{craters:P(t,256.5,260.5)});ctx.restore();chip('2024 STUDY',CX,90,80,GOLD,t,254.0);
  if(t>257){ctx.save();ctx.setLineDash([12,12]);line(CX-330,560,CX+330,560,{w:4,col:'rgba(255,215,0,0.8)',seed:2200});ctx.restore();TX('ANCIENT EQUATOR',CX+470,520,48,GOLD);}
  if(t>258.5){const n=counter(t,258.5,260.5,0,21);TX(n+' CRATERS',360,880,90,RED,{stroke:8,strokeCol:'#000'});}if(t>260.6)TX('466 MILLION YEARS AGO',1500,880,64,WHITE);vignette(0.6);}
// H5 262.89–265.39 exactly where falling ring debris would land
function H5(t){deep(t,{dim:0.6});ancient(CX,560,240,t,{ring:1,craters:1});for(let i=0;i<10;i++){const R=rng(2300+i);const ph=(t*0.8+R())%1;const sx=CX+(R()-0.5)*700;ctx.strokeStyle='rgba(255,180,120,0.8)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(sx,560);ctx.lineTo(lerp(sx,CX+(sx-CX)*0.4,ph),560+(R()-0.5)*20);ctx.stroke();}
  chip('FALLING RING DEBRIS',CX,100,80,RED,t,263.0);vignette(0.6);}
// H6 265.39–271.27 one of the coldest periods of the last 500 million years
function H6(t){deep(t,{dim:0.6});const k=P(t,266.3,270.5);ancient(CX,560,260,t,{ring:1});ctx.save();ctx.beginPath();ctx.arc(CX,560,260,0,TAU);ctx.clip();ctx.fillStyle='rgba(240,248,255,0.92)';ctx.fillRect(CX-260,300,520,220*eOut(k));ctx.fillRect(CX-260,820-220*eOut(k),520,220*eOut(k));ctx.restore();
  rrect(1600,300,70,420,30,{w:5,col:'#cfd6ea',fill:'#141a38',seed:2400});const th=lerp(320,60,k);ctx.fillStyle='#9cd2ff';ctx.fillRect(1616,700-th,38,th);
  chip('ICE AGE',CX,100,90,'#9cd2ff',t,265.6);if(t>268.5)TX('ONE OF THE COLDEST IN 500 MILLION YEARS',CX,980,60,WHITE);vignette(0.6);}
// H7 271.27–273.6 "Maybe... in the shadow of its rings."
function H7(t){deep(t,{dim:0.5});ancient(CX,560,260,t,{ring:1});ctx.save();ctx.beginPath();ctx.arc(CX,560,260,0,TAU);ctx.clip();ctx.fillStyle=`rgba(0,0,0,${0.7*P(t,271.8,272.6)})`;ctx.fillRect(CX-260,380,520,120);ctx.restore();ST('IN THE SHADOW OF ITS RINGS?',CX,980,80,GOLD,t,272.0);vignette(0.65);}
// H8 273.6–276.31 still a hypothesis... but a real one
function H8(t){deep(t,{dim:0.5});const k=pop(t,273.7,0.3);ctx.save();ctx.translate(CX,520);ctx.rotate(-0.06);ctx.scale(k,k);rrect(-520,-120,1040,240,22,{w:10,col:RED,fill:'rgba(0,0,0,0)',seed:2500});TX('HYPOTHESIS',0,8,170,RED);ctx.restore();
  if(t>275.0)ST('PUBLISHED · 2024',CX,800,80,GOLD,t,275.0);vignette(0.6);}
// H9 276.31–283.68 Mars is next: Phobos spirals in and could become a ring in 30–50 million years
function marsC(x,y,r){glow(x,y,r*1.5,'rgba(255,120,80,0.25)',1);ell(x,y,r,r,{w:6,col:INK,fill:'#C1502E',seed:2600});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();ctx.fillStyle='rgba(120,40,20,0.6)';ctx.fillRect(x-r,y-r*0.05,2*r,r*0.12);ctx.fillStyle='rgba(255,255,255,0.85)';ctx.beginPath();ctx.ellipse(x,y-r*0.92,r*0.4,r*0.14,0,0,TAU);ctx.fill();ctx.restore();ell(x,y,r,r,{w:6,col:INK,seed:2600});}
function H9(t){deep(t);const k=P(t,278.5,282.8);const x0=760,y0=560;if(k>0.75){ctx.save();ctx.translate(x0,y0);ctx.globalAlpha=(k-0.75)*4;for(const[a0,b0,col]of RB)band(a0*170,b0*170,0.2,false,col);ctx.restore();}marsC(x0,y0,170);
  if(k<0.75){const a=t*1.6,rr=lerp(420,250,k/0.75);ctx.save();ctx.setLineDash([10,10]);ctx.strokeStyle='rgba(255,215,0,0.6)';ctx.lineWidth=4;ctx.beginPath();for(let q=0;q<1;q+=0.01){const aa=a-q*8,rq=rr+q*200;ctx.lineTo(x0+Math.cos(aa)*rq,y0+Math.sin(aa)*rq*0.4);}ctx.stroke();ctx.restore();rock(x0+Math.cos(a)*rr,y0+Math.sin(a)*rr*0.4,22,2601,{col:'#8a7d70'});TX('PHOBOS',x0+Math.cos(a)*rr,y0+Math.sin(a)*rr*0.4-50,40,WHITE);}
  else{ctx.save();ctx.translate(x0,y0);ctx.globalAlpha=(k-0.75)*4;for(const[a0,b0,col]of RB)band(a0*170,b0*170,0.2,true,col);ctx.restore();}
  chip('MARS IS NEXT',CX,90,90,RED,t,276.5);if(t>281)ST('30–50 MILLION YEARS',1450,880,76,GOLD,t,281.0,{stroke:8,strokeCol:'#000'});vignette(0.5);}
// H10 283.68–287.1 which sky would you pick: the Moon, or rings?
function H10(t){ctx.save();ctx.beginPath();ctx.rect(0,0,CX,H);ctx.clip();sky('#060a1c','#1e2a55');moonS(480,330,60);city(900,t);TX('THE MOON',480,560,90,WHITE);ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(CX,0,CX,H);ctx.clip();sky('#060a1c','#1e2a55');ctx.translate(CX/2,0);ctx.scale(0.5,1);ctx.translate(-CX/2,0);ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(CX,0,CX,H);ctx.clip();ctx.translate(CX+480,0);ctx.scale(0.62,0.62);ctx.translate(-CX,330);arch(t,{hy:880,rx:1250,ry:720,th:180});ctx.restore();ctx.save();ctx.beginPath();ctx.rect(CX,0,CX,H);ctx.clip();city(900,t);ctx.restore();TX('RINGS',1440,560,90,GOLD);
  line(CX,0,CX,H,{w:8,col:WHITE,seed:2700});ST('WHICH SKY?',CX,140,130,RED,t,283.8,{stroke:10,strokeCol:'#000'});chip('TELL ME IN THE COMMENTS',CX,1000,64,WHITE,t,285.4);}
// H11 287.1–end like CTA
function H11(t){deep(t,{dim:0.8});likeBtnD(1300,540,1.6,t>288.2);hero(560,1030,1.9,t,{pose:'point',mood:'happy',col:WHITE});TX('IF THIS BLEW YOUR MIND',CX,130,100,WHITE);if(t>288.2)ST('HIT LIKE!',1300,860,120,RED,t,288.2,{stroke:8,strokeCol:'#000'});}
function likeBtnD(x,y,s,pressed){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rrect(-110,-90,220,180,30,{w:8,col:'#cfd6ea',fill:pressed?'#FFD9D9':'#141a38',seed:2800});
  poly([[-55,-5],[-20,-5],[0,-60],[25,-55],[18,-10],[60,-10],[60,55],[-20,55],[-20,-5]],{w:8,col:pressed?RED:WHITE,seed:2801,close:true,fill:pressed?RED:null});rrect(-60,-5,32,62,6,{w:8,col:pressed?RED:WHITE,seed:2802,fill:pressed?RED:null});ctx.restore();}
// ===================== timeline + transitions =====================
const SC=[[0,A1,'cut'],[0.87,A2,'whip'],[1.98,A3,'flash'],[5.09,A4,'zoom'],[6.91,A5,'whip'],[8.2,A6,'whip'],[9.46,A7,'zoom'],[12.22,A8,'flash'],[13.53,A9,'whip'],[16.96,A10,'zoom'],[20.09,A11,'whip'],[22.13,A12,'zoom'],
  [23.93,B1,'flash'],[25.05,B2,'whip'],[28.57,B3,'zoom'],[29.57,B4,'whip'],[34.04,B5,'whip'],[37.47,B6,'cut'],[38.93,B7,'flash'],[39.7,B8,'cut'],[41.98,B9,'whip'],[47.32,B10,'zoom'],[51.59,B11,'cut'],[54.72,B12,'flash'],
  [56.85,C1,'whip'],[61.67,C2,'zoom'],[64.99,C3,'whip'],[71.05,C4,'whip'],[77.39,C5,'zoom'],[80.04,C6,'whip'],
  [82.2,D1,'zoom'],[83.84,D2,'whip'],[91.57,D3,'whip'],[98.73,D4,'whip'],[104.48,D5,'cut'],[107.52,D6,'zoom'],[112.42,D7,'whip'],[116.81,D8,'whip'],[122.16,D9,'whip'],[126.63,D10,'zoom'],[128.16,D11,'flash'],
  [129.28,E1,'whip'],[135.21,E2,'zoom'],[142.54,E3,'whip'],[149.09,E4,'whip'],
  [158.0,F1,'flash'],[161.43,F2,'whip'],[166.95,F3,'cut'],[171.06,F4,'cut'],[172.63,F5,'whip'],[176.63,F6,'whip'],[180.69,F7,'whip'],[189.83,F8,'zoom'],[193.72,F9,'whip'],[198.86,F10,'whip'],[205.11,F11,'zoom'],[210.09,F12,'whip'],[216.56,F13,'whip'],
  [222.6,G1,'zoom'],[224.54,G2,'whip'],[233.58,G3,'whip'],[237.48,G4,'whip'],
  [244.0,H1,'cut'],[247.88,H2,'cut'],[249.75,H3,'zoom'],[253.83,H4,'whip'],[262.89,H5,'cut'],[265.39,H6,'whip'],[271.27,H7,'cut'],[273.6,H8,'flash'],[276.31,H9,'whip'],[283.68,H10,'whip'],[287.1,H11,'zoom']];
const DUR9=289.46;const TMP=document.createElement('canvas');TMP.width=W;TMP.height=H;const TMPX=TMP.getContext('2d');
function render(t){BOIL=Math.floor(t/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  let i=0;while(i+1<SC.length&&t>=SC[i+1][0])i++;const c0=SC[i][0],tp=SC[i][2],u=t-c0;ctx.save();
  let k=0;if(i>0&&u<0.22){k=1-eOut(u/0.22);if(tp==='whip')ctx.translate(k*420,0);else if(tp==='zoom'){ctx.translate(CX,CY);ctx.scale(1+0.35*k,1+0.35*k);ctx.translate(-CX,-CY);}}
  if(t<0.45){const q=eOut(clamp(t/0.45));ctx.translate(nz(t*60,1)*12*(1-q),nz(t*55,2)*12*(1-q));}
  SC[i][1](t);ctx.restore();ctx.filter='none';ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;
  if(k>0.05&&(tp==='whip'||tp==='zoom')){TMPX.clearRect(0,0,W,H);TMPX.drawImage(cv,0,0);for(let j=1;j<=5;j++){ctx.globalAlpha=0.22;if(tp==='whip')ctx.drawImage(TMP,-j*18*k,0);else{const z=1+j*0.03*k;ctx.drawImage(TMP,CX-CX*z,CY-CY*z,W*z,H*z);}}ctx.globalAlpha=1;}
  if(i>0&&tp==='flash'&&u<0.18){ctx.fillStyle=`rgba(255,255,255,${(1-u/0.18)*0.85})`;ctx.fillRect(0,0,W,H);}
  if(t>DUR9-0.5){ctx.fillStyle=`rgba(0,0,0,${P(t,DUR9-0.5,DUR9)})`;ctx.fillRect(0,0,W,H);}}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
