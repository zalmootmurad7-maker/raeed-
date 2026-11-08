// S13 54.97–60.46 the mind-breaker: finite… and no edge
function S13(t){paper();ctx.save();shake(t,55.44,20,0.45);cam(t,[[54.97,1.4,CX,CY],[55.9,1.0,CX,CY]]);
  hero(400,1010,2.1,t,{pose:'up',mood:'shock'});if(t>55.44){for(let i=0;i<12;i++){const a=-Math.PI/2+(i-5.5)*0.22,k=eOut(P(t,55.44,55.8));line(400+Math.cos(a)*(180),450+Math.sin(a)*180,400+Math.cos(a)*(180+120*k),450+Math.sin(a)*(180+120*k),{w:8,col:RED,seed:8100+i});}}
  ST('MIND-BREAKER',1200,230,140,RED,t,55.44,{stroke:9,strokeCol:'#000'});
  if(t>57.6){ST('FINITE',1000,560,120,INK,t,57.6);bigCheck(1260,560,1.6,t,57.7);}
  if(t>59.3){ST('NO EDGE',1000,760,120,INK,t,59.3);bigCheck(1290,760,1.6,t,59.4);}ctx.restore();}
// S14 60.46–68.46 walk straight on Earth and come back
function S14(t){paper();ctx.save();cam(t,[[60.46,0.85,CX,600],[62.0,1.0,CX,600],[67.0,1.0,CX,600],[68.46,0.9,CX,600]]);
  const R=330,gx=CX,gy=720,rot=t<61.43?0:P(t,61.43,64.4)*TAU;glow(gx,gy,R*1.4,'rgba(127,178,229,0.35)',1);
  ell(gx,gy,R,R,{w:9,fill:'#7FB2E5',seed:8201,amp:2});ctx.save();ctx.beginPath();ctx.arc(gx,gy,R-4,0,TAU);ctx.clip();ctx.fillStyle='#8CC06A';
  for(let i=0;i<6;i++){const a=i*1.1-rot;const x=gx+Math.sin(a)*R*0.8;if(Math.cos(a)>-0.2){ctx.beginPath();ctx.ellipse(x,gy+(i%3-1)*120,R*0.18*Math.max(0.2,Math.cos(a)),R*0.14,0,0,TAU);ctx.fill();}}ctx.restore();ell(gx,gy,R,R,{w:9,seed:8201,amp:2});
  // trail around the globe
  if(t>61.43){ctx.save();ctx.setLineDash([18,14]);ctx.strokeStyle=RED;ctx.lineWidth=7;ctx.beginPath();ctx.arc(gx,gy,R+18,-Math.PI/2,-Math.PI/2+Math.min(TAU,rot)*0.999,false);ctx.stroke();ctx.restore();}
  // flag at START (rotates with the planet) + walker on top
  const fa=-Math.PI/2-rot;const fx=gx+Math.cos(fa)*R,fy=gy+Math.sin(fa)*R;ctx.save();ctx.translate(fx,fy);ctx.rotate(fa+Math.PI/2);line(0,0,0,-90,{w:6,seed:8210});poly([[0,-90],[60,-75],[0,-60]],{w:5,fill:RED,close:true,seed:8211});ctx.restore();
  hero(gx,gy-R,0.75,t,{pose:t>61.43&&t<64.4?'walk':'cheer',mood:t>64.3?'shock':'happy'});ctx.restore();
  WR('WALK STRAIGHT…',420,140,80,INK,t,61.43);if(t>62.27)WR('YOU NEVER FALL OFF',420,250,62,INK,t,62.27);if(t>64.3)ST('YOU COME BACK!',1500,180,96,RED,t,64.3);
  if(t>65.22){rrect(1330,420,540,250,24,{w:7,fill:'#fff',seed:8220});TX('FINITE SURFACE',1600,490,60,INK);if(t>66.8)ST('NO EDGE',1600,600,90,RED,t,66.8);}}
// S15 68.46–75.19 three dimensions + the arcade screen wrap
function cube3d(t,cx,cy,s){const a=t*0.6,b=0.5;const P3=[];for(const x of[-1,1])for(const y of[-1,1])for(const z of[-1,1]){let X=x*Math.cos(a)-z*Math.sin(a),Z=x*Math.sin(a)+z*Math.cos(a),Y=y*Math.cos(b)-Z*Math.sin(b);P3.push([cx+X*s,cy+Y*s]);}
  const E=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];E.forEach(([i,j],n)=>line(P3[i][0],P3[i][1],P3[j][0],P3[j][1],{w:7,seed:8300+n}));}
function S15(t){if(t<70.42){paper();ctx.save();cam(t,[[68.46,0.8,CX,CY],[70.4,1.05,CX,CY]]);cube3d(t,CX,560,260);ctx.restore();ST('NOW IN 3D',CX,140,110,RED,t,69.19);return;}
  ctx.fillStyle='#1d1d26';ctx.fillRect(0,0,W,H);ctx.save();cam(t,[[70.42,0.7,CX,CY],[71.4,1.0,CX,CY]]);
  rrect(260,90,1400,900,50,{w:14,col:'#000',fill:'#0d1a10',seed:8350});ctx.save();ctx.beginPath();ctx.rect(300,130,1320,820);ctx.clip();
  for(let y=130;y<950;y+=8){ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(300,y,1320,3);}
  for(let i=0;i<40;i++){const R=rng(500+i);ctx.fillStyle='rgba(180,255,180,0.6)';ctx.fillRect(300+R()*1320,130+R()*820,3,3);}
  // ship crosses: off the right edge at 72.26, back in on the left at 73.54
  let x=t<72.26?lerp(700,1700,P(t,71.2,72.6)):t<73.54?1700:lerp(150,900,P(t,73.54,74.9));if(t>=72.26&&t<73.54)x=lerp(1500,1800,P(t,72.26,72.6));
  const sx=t>=73.54?x:x;ship(sx,540,0.7,t);if(t>=73.4&&t<74.9)ship(sx-1320,540,0.7,t);ctx.restore();
  txt('1UP  000046',520,170,40,{col:'#9f9'});ctx.restore();
  if(t>72.26&&t<73.4){arrow(1500,800,1700,800,{col:GOLD,w:8});TX('OFF THE RIGHT…',1350,900,64,GOLD);}
  if(t>73.54){arrow(200,800,420,800,{col:GOLD,w:8});TX('…BACK ON THE LEFT',600,900,64,GOLD);}vignette(0.4);}
// S16 75.19–81.23 no wall, no edge: space loops → that's how Earth was in front of you
function S16(t){deep(t);if(t<77.09){ctx.save();ctx.translate(560,520);brickWall(0,0,300,380,0.9);ctx.restore();bigX(560,520,230,t,75.44);ctx.save();ctx.translate(1300,520);cliff(0,0,0.7);ctx.restore();bigX(1250,520,230,t,76.44);
    ST('NO WALL.',560,900,100,WHITE,t,75.19);ST('NO EDGE.',1300,900,100,WHITE,t,76.11);vignette();return;}
  ctx.save();cam(t,[[77.09,1.4,CX,560],[78.6,1.0,CX,560]]);const R=380;ctx.save();ctx.setLineDash([22,16]);ctx.strokeStyle='rgba(200,220,255,0.7)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(CX,560,R*1.6,R,0,0,TAU);ctx.stroke();ctx.restore();
  earth(CX,560+R,70);const u=P(t,77.3,79.77),a=Math.PI/2-u*TAU;const sx=CX+Math.cos(a)*R*1.6,sy=560+Math.sin(a)*R;ship(sx,sy,0.55,t,{tilt:a-Math.PI/2+Math.PI});
  ctx.restore();ST('SPACE MIGHT SIMPLY…',CX,90,80,WHITE,t,77.09);ST('LOOP',CX,560,200,GOLD,t,78.64,{stroke:10,strokeCol:'#000'});if(t>79.39)WR("THAT'S HOW EARTH WAS IN FRONT OF YOU",CX,1010,58,WHITE,t,79.39,34);vignette();}
// ===================== CONSEQUENCES =====================
// S17 81.23–83.67 remember my promise? the sealed card comes back and opens
function S17(t){paper();ctx.save();cam(t,[[81.23,0.8,CX,CY],[82.5,1.25,CX,CY],[83.67,1.4,CX,CY]]);
  card(CX,520,0,t,81.23,()=>{deep(t);heroBack(0,140,0.8,t,{col:WHITE});},'THE BACK OF YOUR OWN HEAD',t<82.52);
  if(t>82.52){const f=1-P(t,82.52,82.9);ctx.fillStyle=`rgba(255,255,255,${f})`;ctx.fillRect(0,0,W,H);}ctx.restore();ST('REMEMBER MY PROMISE?',CX,100,84,INK,t,81.23);}
// S18 83.67–88.36 if space loops, light loops too — including the light bouncing off you
function S18(t){deep(t);ctx.save();cam(t,[[83.67,0.9,CX,560],[88.36,1.05,CX,560]]);const R=360;ctx.save();ctx.setLineDash([22,16]);ctx.strokeStyle='rgba(200,220,255,0.55)';ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(CX,560,R*1.6,R,0,0,TAU);ctx.stroke();ctx.restore();
  for(let i=0;i<8;i++){const a=((t-83.67)*0.9+i/8)*TAU;photon(CX+Math.cos(a)*R*1.6,560+Math.sin(a)*R,8);}
  ship(CX,560+R,0.7,t,{flame:0});if(t>86.08){for(let i=0;i<3;i++){const u=((t-86.08)*1.2+i/3)%1;photon(lerp(CX-120,CX-500,u),560+R-lerp(0,60,u),9);}TX('LIGHT FROM YOU',CX-420,560+R-140,56,GOLD);}
  ctx.restore();ST('IF SPACE LOOPS…',CX,90,84,WHITE,t,83.67);ST('LIGHT LOOPS TOO',CX,200,96,GOLD,t,84.84);vignette();}
// S19 88.36–94.22 a small universe; you look out of the window… someone is out there (slow dolly-in)
function S19(t){deep(t,{speed:40,dim:0.7});const z=lerp(0.04,0.42,eInOut(P(t,92.6,94.2)));
  if(t>92.6){ctx.save();ctx.translate(CX,560);ctx.scale(z,z);heroBack(0,330,1.6,t,{col:'#cfd6ea',head:'#F6F4F8'});ctx.restore();}
  ctx.save();ctx.strokeStyle='#10121c';ctx.lineWidth=200;ctx.beginPath();ctx.ellipse(CX,560,1000,660,0,0,TAU);ctx.stroke();ctx.restore();ell(CX,560,900,560,{w:10,col:'#cfd6ea',seed:8501,amp:2});
  TX('IMAGINE THE UNIVERSE WAS SMALL',CX,120,72,WHITE,{k:wk(t,88.55,'IMAGINE THE UNIVERSE WAS SMALL',32)});if(t>92.67)ST('SOMEONE IS OUT THERE…',CX,980,80,RED,t,92.67);vignette(0.7);}
// S20 94.22–99.06 it's you. not a copy. not a twin. YOU. from behind.
function S20(t){deep(t,{dim:0.6});ctx.save();cam(t,[[94.22,0.7,CX,560],[94.7,1.0,CX,560],[96.99,1.0,CX,560],[97.3,1.18,1050,520]]);shake(t,94.37,18,0.4);
  glow(1050,520,380,'rgba(210,56,44,0.35)',1);heroBack(1050,940,2.2,t,{col:'#E9EEF8'});ctx.restore();
  ST("IT'S YOU.",500,200,140,RED,t,94.22,{stroke:10,strokeCol:'#000'});
  const strike=(y,t0)=>{const k=eOut(P(t,t0,t0+0.2));if(k>0)line(250,y,250+370*k,y+4,{w:14,col:RED,seed:8551+y});};
  if(t>95.11){WR('NOT A COPY.',430,420,80,WHITE,t,95.11,40);strike(420,95.45);}
  if(t>95.98){WR('NOT A TWIN.',430,600,80,WHITE,t,95.98,40);strike(600,96.3);}
  if(t>96.99)ST('YOU.',430,800,170,RED,t,96.99,{stroke:10,strokeCol:'#000'});if(t>97.71)ST('FROM BEHIND',1050,1010,80,WHITE,t,97.71);vignette(0.5);}
// S21 99.06–104.13 the light from your back goes all the way around… into your eyes
function S21(t){deep(t);ctx.save();cam(t,[[99.06,1.0,CX,560],[103.2,1.0,CX,560],[103.6,1.5,560,560]]);const R=360,cx=CX,cy=560;
  ctx.save();ctx.setLineDash([22,16]);ctx.strokeStyle='rgba(200,220,255,0.55)';ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(cx,cy,R*1.7,R,0,0,TAU);ctx.stroke();ctx.restore();
  // you, at the left of the loop, facing right; the light leaves your back (to the left) and circles round to your eyes
  const px=cx-R*1.7+40;hero(px+60,cy+150,0.75,t,{pose:'relax',mood:t>103.4?'shock':'curious',col:WHITE});
  const u=P(t,100.04,103.45);if(u>0&&u<1){const a=Math.PI+u*TAU*0.995;photon(cx+Math.cos(a)*R*1.7,cy-Math.sin(a)*R,12);
    ctx.save();ctx.strokeStyle='rgba(255,215,0,0.8)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(cx,cy,R*1.7,R,0,-Math.PI,-Math.PI-u*TAU*0.995,true);ctx.stroke();ctx.restore();}
  if(t>103.45){const f=1-P(t,103.45,103.9);glow(px+60,cy-50,300,`rgba(255,240,180,${0.9*f})`,1);}
  ctx.restore();WR('LIGHT FROM YOUR OWN BACK…',CX,90,72,GOLD,t,99.06,32);if(t>100.68)WR('…ALL THE WAY AROUND THE UNIVERSE',CX,190,60,WHITE,t,100.68,34);if(t>103.08)ST('INTO YOUR EYES',CX,1000,90,RED,t,103.08);vignette();}
// S22 104.13–111.07 look left, right, up: you again and again — your own past lined up across the sky
function S22(t){deep(t);let cx=CX,cy=560;const whip=(t0,dx,dy)=>{if(t>t0){const k=eOut(P(t,t0,t0+0.35));cx+=dx*k;cy+=dy*k;}};
  if(t<106.2){whip(104.32,700,0);whip(105.0,-1400,0);whip(105.61,700,600);}
  ctx.save();if(t<106.2){ctx.translate(CX-cx,CY-cy+20);}else{const z=lerp(1.0,0.38,eInOut(P(t,106.2,107.8)));ctx.translate(CX,CY);ctx.scale(z,z);ctx.translate(-CX,-CY);}
  for(let gy=-3;gy<=3;gy++)for(let gx=-4;gx<=4;gx++){if(gx===0&&gy===0)continue;const d=Math.hypot(gx,gy),x=CX+gx*700,y=560+gy*600;ctx.save();ctx.globalAlpha=Math.max(0.15,1-d*0.18);heroBack(x,y+300,1.0,t,{col:'#E9EEF8'});ctx.restore();}
  ctx.restore();hero(CX,1040,0.9,t,{pose:'up',mood:'shock',col:WHITE});
  if(t<106.2){ST('LEFT',300,120,90,WHITE,t,104.32);if(t>105.0)ST('RIGHT',1620,120,90,WHITE,t,105.0);if(t>105.61)ST('UP',CX,120,90,WHITE,t,105.61);}
  else{ST('YOU. AGAIN AND AGAIN.',CX,110,90,WHITE,t,106.21);if(t>108.34){ST('YOUR OWN PAST',CX,230,110,RED,t,108.34,{stroke:8,strokeCol:'#000'});const L=['1 YEAR AGO','1,000 YEARS AGO','1 MILLION YEARS AGO'];L.forEach((s,i)=>{if(t>108.8+i*0.4)TX(s,[520,CX,1400][i],[700,860,700][i],60,GOLD);});}}vignette();}
// S23 111.07–114.70 not a thought experiment: scientists went looking
function S23(t){paper();ctx.save();cam(t,[[111.07,1.2,CX,CY],[112.3,1.0,CX,CY]]);
  // radio dish
  ctx.save();ctx.translate(1250,700);ctx.rotate(-0.5);ctx.beginPath();ctx.ellipse(0,0,260,90,0,0,Math.PI);ctx.fillStyle='#fff';ctx.fill();ctx.lineWidth=9;ctx.strokeStyle=INK;ctx.stroke();line(0,0,0,-150,{w:7,seed:8601});ctx.restore();line(1250,700,1250,980,{w:10,seed:8602});line(1150,980,1350,980,{w:10,seed:8603});
  for(let i=0;i<3;i++)hero(330+i*230,1000,1.2,t,{pose:i===1?'point':'relax',mood:'curious',seed:8610+i*10});ctx.restore();
  ST('NOT A THOUGHT EXPERIMENT',CX,120,90,INK,t,111.26);ST('SCIENTISTS WENT LOOKING',CX,250,100,RED,t,113.04,{stroke:8,strokeCol:'#000'});}
// S24 114.70–121.42 searching the oldest light for a ghost copy of our sky
function S24(t){paper();ctx.save();cam(t,[[114.7,0.9,CX,580],[116.5,1.0,CX,580],[119.6,1.25,CX,580],[121.42,1.3,CX,580]]);cmbDisk(CX,600,700,350,1);
  if(t>117.03){for(const[x,y]of[[640,520],[1280,680]]){ctx.save();ctx.strokeStyle=GOLD;ctx.lineWidth=10;ctx.beginPath();ctx.arc(x,y,lerp(10,120,eOut(P(t,117.03,117.5))),0,TAU);ctx.stroke();ctx.restore();}}
  if(t>119.65){const k=eOut(P(t,119.65,120.3));ctx.save();ctx.setLineDash([16,12]);line(760,540,lerp(760,1160,k),lerp(540,660,k),{w:7,col:GOLD,seed:8701});ctx.restore();if(k>=1)TX('SAME?',CX,560,110,RED,{stroke:9,strokeCol:'#000'});}
  ctx.restore();WR('THE OLDEST LIGHT IN THE UNIVERSE',CX,90,76,INK,t,115.46,34);if(t>117.03)ST('A GHOST COPY OF OUR SKY?',CX,1010,80,RED,t,117.03);}
// S25 121.42–123.15 they found… nothing
function S25(t){paper();ctx.save();cam(t,[[121.42,1.3,CX,580],[122.37,1.3,CX,580],[123.15,1.0,CX,580]]);ctx.globalAlpha=0.5;cmbDisk(CX,600,700,350,1);ctx.globalAlpha=1;ctx.restore();
  TX('THEY FOUND…',CX,160,100,INK);if(t>122.37){ctx.save();shake(t,122.37,22,0.4);ST('NOTHING.',CX,600,240,RED,t,122.37,{stroke:12,strokeCol:'#000'});ctx.restore();}}
// S26 123.15–129.28 the loop must be almost as big as everything we see — or far bigger (huge pull-out)
function S26(t){deep(t);const z=t<127.64?lerp(1.0,0.85,P(t,123.15,127.6)):lerp(0.85,0.16,eInOut(P(t,127.64,129.0)));ctx.save();ctx.translate(CX,560);ctx.scale(z,z);
  bubble(0,0,260,{fill:'rgba(127,168,216,0.22)'});txt('EVERYTHING WE CAN SEE',0,0,40,{col:WHITE});
  ctx.save();ctx.setLineDash([30,22]);ctx.strokeStyle=GOLD;ctx.lineWidth=12/Math.max(z,0.3);ctx.beginPath();ctx.ellipse(0,0,t<127.64?560:2600,t<127.64?330:1500,0,0,TAU);ctx.stroke();ctx.restore();
  ctx.restore();ST('IF SPACE LOOPS…',CX,90,84,WHITE,t,123.15);if(t>124.62)WR('THE LOOP IS ALMOST AS BIG AS EVERYTHING WE SEE',CX,990,56,GOLD,t,124.62,36);if(t>127.92)ST('OR FAR BIGGER.',CX,200,130,RED,t,127.92,{stroke:9,strokeCol:'#000'});vignette();}
