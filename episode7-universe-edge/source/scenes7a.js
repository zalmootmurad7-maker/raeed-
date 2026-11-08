// ===================== HOOK =====================
// S1 0–3.40 flying straight: camera starts tight on the pilot, pulls out; star streaks
function S1(t){ctx.save();cam(t,[[0,2.4,1010,520],[1.3,1.0,CX,CY],[3.4,1.08,CX,CY]]);deep(t,{speed:900});ship(960,540,1.6,t,{flame:1});ctx.restore();
  ST('NO TURNING.',600,880,110,WHITE,t,1.64);ST('NO STOPPING.',1330,880,110,RED,t,2.56);vignette();}
// S2 3.40–7.69 fly-bys: Moon, Sun, last star of the galaxy (objects rush past the camera)
function flyby(t,t0,dur,draw){const u=(t-t0)/dur;if(u<0||u>1)return;const z=lerp(0.25,3.2,Math.pow(u,1.6)),x=lerp(1700,-400,eInOut(u));ctx.save();ctx.translate(x,CY);ctx.scale(z,z);draw();ctx.restore();}
function S2(t){deep(t,{speed:1100});
  flyby(t,3.55,1.3,()=>{moon(0,0,120,0);});if(t>3.86&&t<4.6)TX('THE MOON',CX,150,90,WHITE);
  flyby(t,4.35,1.4,()=>{sun(0,0,130,t);});if(t>4.67&&t<5.5)TX('THE SUN',CX,150,90,GOLD);
  if(t>5.5){const k=P(t,5.5,7.69);ctx.save();ctx.translate(lerp(1250,980,k),lerp(560,520,k));const z=lerp(1.4,0.55,eOut(k));ctx.scale(z,z);galaxy(0,0,620,t*0.05);
    ctx.fillStyle='#fff';glow(lerp(380,0,0),0,40,'rgba(255,255,255,0.9)',1);ctx.restore();ship(lerp(1100,700,k),lerp(700,760,k),0.9,t);TX('THE LAST STAR OF OUR GALAXY',CX,150,80,WHITE,{k:wk(t,5.5,'THE LAST STAR OF OUR GALAXY',32)});}
  else ship(700,760,0.9,t);vignette();}
// S3 7.69–13.71 punch through the farthest light (the glowing shell), odometer 46 billion ly
function S3(t){ctx.save();const k=P(t,7.69,10.4);cam(t,[[7.69,0.55,CX,CY],[10.3,2.6,CX,CY],[10.6,1.0,CX,CY]]);deep(t,{speed:600});
  if(t<10.45){shell(CX,CY,520,t);ship(CX,CY,0.5,t);}
  ctx.restore();
  if(t<10.45){WR('THE FARTHEST LIGHT',CX,140,90,WHITE,t,8.16);WR('ANY TELESCOPE HAS EVER SEEN',CX,250,70,'#cfd6ea',t,9.0);}
  if(t>=10.45){ctx.save();shake(t,10.45,18,0.4);deep(t,{speed:1400});ship(CX,600,1.1,t);ctx.restore();
    const f=1-P(t,10.45,10.8);if(f>0){ctx.fillStyle=`rgba(255,235,200,${f})`;ctx.fillRect(0,0,W,H);}
    const v=counter(t,11.24,13.2,0,46);odo(CX,250,1,v+(v>=46?'':'')+' BILLION','LIGHT-YEARS FROM HOME');}
  vignette();}
// S4 13.71–15.59 keep going… and going: the ship shrinks into the void
function S4(t){ctx.save();cam(t,[[13.71,1.2,CX,CY],[15.59,0.42,CX,CY]]);deep(t,{speed:1500,dim:0.7});ship(CX,CY,1.0,t);ctx.restore();
  const v=counter(t,13.71,15.59,46,95);odo(CX,950,0.7,v+' BILLION','LIGHT-YEARS…',{col:'#cfd6ea'});ST('AND GOING…',CX,150,90,WHITE,t,14.73);vignette(0.7);}
// S5 15.59–18.59 POV: a blue dot ahead… EARTH. In front of you.
function S5(t){deep(t,{speed:120,dim:0.8});const z=t<17.04?lerp(0.08,0.35,P(t,15.59,17.0)):lerp(0.35,1.0,eOut(P(t,17.04,17.5)));
  ctx.save();shake(t,17.04,22,0.4);ctx.translate(CX,520);ctx.scale(z,z);glow(0,0,420,'rgba(127,178,229,0.6)',1);earth(0,0,300,{lit:1});ctx.restore();
  // cockpit frame (POV)
  ctx.save();ctx.strokeStyle='#10121c';ctx.lineWidth=170;ctx.beginPath();ctx.ellipse(CX,560,1060,700,0,0,TAU);ctx.stroke();ctx.restore();
  ell(CX,560,975,615,{w:10,col:'#cfd6ea',seed:7801,amp:2});
  if(t>17.04)ST('EARTH?!',CX,170,130,RED,t,17.04);if(t>17.54)WR('IN FRONT OF YOU.',CX,930,80,WHITE,t,17.54,30);vignette(0.4);}
// S6 18.59–21.83 you never turned around: one straight line, Earth at BOTH ends
function S6(t){ctx.save();cam(t,[[18.59,1.3,CX,CY],[19.8,0.9,CX,CY],[21.83,0.95,CX,CY]]);deep(t,{speed:0,dim:0.8});
  earth(200,560,90);const k=eOut(P(t,18.59,19.6));ctx.save();ctx.setLineDash([26,20]);ctx.strokeStyle=GOLD;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(300,560);ctx.lineTo(lerp(300,1620,k),560);ctx.stroke();ctx.restore();
  ship(lerp(320,1450,k),560,0.6,t);earth(1720,560,90);ctx.restore();
  TX('YOU NEVER TURNED AROUND.',CX,170,90,WHITE,{k:wk(t,18.59,'YOU NEVER TURNED AROUND.',30)});TX('START',200,700,56,'#cfd6ea');if(t>19.4)TX('…EARTH AGAIN',1720,700,56,RED);
  if(t>20.57){ST('HOW?',CX,880,190,RED,t,20.57,{stroke:10,strokeCol:'#000'});}vignette();}
// S7 21.83–28.41 the promise: two sealed "case files"
function card(x,y,rot,t,t0,draw,title,locked){if(t<t0)return;const k=pop(t,t0,0.3);ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(k,k);
  rrect(-330,-250,660,500,20,{w:9,col:INK,fill:'#fff',seed:7900+Math.round(x)});ctx.save();ctx.beginPath();ctx.rect(-300,-220,600,380);ctx.clip();draw();ctx.restore();
  rrect(-300,-220,600,380,8,{w:6,col:INK,seed:7910+Math.round(x)});txt(title,0,205,46,{col:INK});
  if(locked){ctx.save();ctx.globalAlpha=0.92;ctx.fillStyle='#111';ctx.fillRect(-300,-220,600,380);ctx.restore();txt('?',0,-30,230,{col:GOLD});}
  ctx.restore();}
function S7(t){paper();ctx.save();cam(t,[[21.83,1.15,CX,CY],[24.9,1.0,CX,CY],[26.3,1.12,1300,560],[28.41,1.12,1300,560]]);
  card(560,520,-0.05,t,22.16,()=>{deep(t);heroBack(0,140,0.8,t,{col:WHITE,head:'#F6F4F8'});},'THE BACK OF YOUR OWN HEAD',true);
  card(1340,540,0.05,t,25.27,()=>{deep(t);earth(0,-20,120);},'THE ONE REASON',false);
  if(t>26.32){ctx.save();ctx.translate(1340,500);ctx.rotate(-0.15);const k=pop(t,26.32,0.25);ctx.scale(k,k);rrect(-280,-70,560,140,14,{w:10,col:RED,seed:7950});txt('NEVER GO HOME',0,6,80,{col:RED});ctx.restore();}
  ctx.restore();TX('BEFORE THIS VIDEO IS OVER…',CX,90,72,INK,{k:wk(t,21.83,'BEFORE THIS VIDEO IS OVER…',32)});}
// ===================== SCIENCE =====================
// S8 28.41–32.43 one thing everyone gets wrong
function S8(t){paper();ctx.save();cam(t,[[28.41,1.25,CX,CY],[29.6,1.0,CX,CY]]);hero(420,1000,2.2,t,{pose:'point',mood:'curious'});
  ST('ALMOST EVERYONE',1180,360,110,INK,t,29.75);ST('GETS THIS WRONG',1180,520,130,RED,t,30.75,{stroke:8,strokeCol:'#000'});ctx.restore();}
// S9 32.43–35.63 we can see the whole universe? We can't.
function S9(t){deep(t,{dim:0.9});const shrink=t>35.06?lerp(1,0.42,eOut(P(t,35.06,35.5))):1;
  ctx.save();ctx.translate(CX,560);ctx.scale(shrink,shrink);bubble(0,0,430,{fill:'rgba(127,168,216,0.15)'});for(let i=0;i<14;i++){const R=rng(40+i);galaxy((R()-0.5)*600,(R()-0.5)*500,40+R()*30,R()*3,{a:0.8});}ctx.restore();
  TX('"WE SEE THE WHOLE UNIVERSE"',CX,120,80,WHITE,{k:wk(t,32.43,'"WE SEE THE WHOLE UNIVERSE"',30)});if(t>35.06){bigX(CX,560,360*shrink+60,t,35.06);ST("WE CAN'T.",CX,960,130,RED,t,35.06);}vignette();}
// S10 35.63–45.74 the observable universe: 46 billion ly every direction, 93 across, light reaching us
function S10(t){ctx.save();cam(t,[[35.63,1.6,CX,560],[37.0,1.0,CX,560],[44.0,0.82,CX,560],[45.74,0.78,CX,560]]);deep(t);
  for(let i=0;i<40;i++){const R=rng(200+i),a=R()*TAU,r=480+R()*500;galaxy(CX+Math.cos(a)*r,560+Math.sin(a)*r*0.8,25+R()*25,R()*3,{a:0.5});}
  bubble(CX,560,400,{fill:'rgba(127,168,216,0.16)'});earth(CX,560,26);
  if(t>36.66)TX('THE OBSERVABLE UNIVERSE',CX,100,80,GOLD,{k:wk(t,36.66,'THE OBSERVABLE UNIVERSE',30)});
  if(t>38.11){const k=eOut(P(t,38.11,38.7));arrow(CX+30,560,CX+30+360*k,560,{col:WHITE,w:8});TX('46 BILLION LY',CX+220,520,50,WHITE);}
  if(t>39.65){for(let i=1;i<8;i++){const a=i/8*TAU,k=eOut(P(t,39.65+i*0.07,40.2+i*0.07));arrow(CX+Math.cos(a)*30,560+Math.sin(a)*30,CX+Math.cos(a)*(30+340*k),560+Math.sin(a)*(30+340*k),{col:'rgba(255,255,255,0.8)',w:5,head:16,seed:7700+i});}}
  if(t>40.96){const k=eOut(P(t,40.96,41.8));ctx.save();ctx.setLineDash([16,12]);line(CX-400*k,1010,CX+400*k,1010,{w:7,col:GOLD,seed:7720});ctx.restore();if(t<42.89)TX('93 BILLION LY ACROSS',CX,1060,56,GOLD);}
  if(t>42.89){for(let i=0;i<10;i++){const a=i/10*TAU+0.3,u=((t-42.89)*0.6+i*0.1)%1;photon(CX+Math.cos(a)*400*(1-u),560+Math.sin(a)*400*(1-u),7);}}
  ctx.restore();if(t>44.0)TX('LIGHT HAD TIME TO REACH US',CX,980,64,WHITE,{k:wk(t,44.0,'LIGHT HAD TIME TO REACH US',30)});vignette();}
// S11 45.74–51.30 the dark ocean: you see to the horizon; the ocean goes on (camera pans right past it)
function S11(t){const pan=t<49.08?0:eInOut(P(t,49.08,50.9))*1500;ctx.save();ctx.translate(-pan,0);
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0b1020');g.addColorStop(0.5,'#1b2a44');g.addColorStop(1,'#05070d');ctx.fillStyle=g;ctx.fillRect(-100,0,W+1700,H);
  for(let i=0;i<60;i++){const R=rng(300+i);ctx.fillStyle=`rgba(255,255,255,${0.3+R()*0.4})`;ctx.beginPath();ctx.arc(R()*(W+1600),R()*420,1+R()*2,0,TAU);ctx.fill();}
  line(-100,520,W+1700,520,{w:5,col:'#5f7fa8',seed:8001,amp:2});
  for(let i=0;i<70;i++){const R=rng(400+i),x=R()*(W+1600),y=540+R()*520,l=20+R()*60;line(x,y,x+l,y+Math.sin(t*2+i)*4,{w:3,col:'rgba(140,170,210,0.5)',seed:8010+i,amp:1});}
  hero(330,860,1.5,t,{pose:'relax',mood:'curious',col:WHITE});glow(330,640,260,'rgba(255,215,0,0.25)',1);
  if(t>47.68){ctx.save();ctx.setLineDash([16,14]);ctx.strokeStyle=GOLD;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(360,470);ctx.lineTo(lerp(360,1500,eOut(P(t,47.68,48.4))),520);ctx.stroke();ctx.restore();TX('HORIZON',1500,470,56,GOLD);}
  if(t>49.08)TX('…THE OCEAN KEEPS GOING',2400,300,80,WHITE);ctx.restore();
  TX("IT'S LIKE A DARK OCEAN",CX,110,80,WHITE,{k:wk(t,45.74,"IT'S LIKE A DARK OCEAN",30)});vignette();}
// S12 51.30–54.97 past the horizon: a wall? an edge?
function S12(t){ctx.save();cam(t,[[51.3,0.9,CX,CY],[52.6,1.0,CX,CY],[54.97,1.12,CX,CY]]);deep(t,{dim:0.8});bubble(-300,560,900,{fill:'rgba(127,168,216,0.14)'});
  if(t>53.18){const k=pop(t,53.18,0.3);ctx.save();ctx.translate(1000,560);ctx.scale(k,k);brickWall(0,0,360,480);ctx.restore();ST('A WALL?',1000,220,90,WHITE,t,53.22);}
  if(t>53.95){const k=pop(t,53.95,0.3);ctx.save();ctx.translate(1560,640);ctx.scale(k,k);cliff(0,0,0.9);ctx.restore();ST('AN EDGE?',1560,220,90,WHITE,t,54.06);}
  ctx.restore();TX("WHAT'S PAST THE HORIZON?",CX,100,84,GOLD,{k:wk(t,51.3,"WHAT'S PAST THE HORIZON?",30)});vignette();}
