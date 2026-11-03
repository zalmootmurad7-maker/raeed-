// ===== Episode 5 shorts (9:16). Scenes are functions of SOURCE time t (long-video timeline). Safe zone y 288–1536. =====
function T(s,y,size,col,k=1,o={}){return txt(s,CX,y,size,{col,k,maxW:960,...o});}
// ---- short 1: the 8-minute illusion ----
function a_hook(t,tr){daySky(t);sun(700,820,190,t);stick(260,GY,2.4,t,{pose:'point',mood:'shock'});
  T('THE SUN COULD BE',330,120,INK);T('GONE RIGHT NOW?!',480,150,RED);
  if(t>2.9){rrect(560,1070,440,190,30,{w:7,fill:'#111',seed:900});txt('8:00',780,1170,140,{col:GOLD});}}
function a_why(t){space(t);sun(540,700,150,t);earth(540,1250,110);ctx.setLineDash([14,18]);ctx.strokeStyle=GOLD;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(540,880);ctx.lineTo(540,1130);ctx.stroke();ctx.setLineDash([]);
  const py=lerp(880,1130,((t-26.3)/2.5)%1);if(t>26.3){glow(540,py,70,'rgba(255,215,0,0.9)',1);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(540,py,12,0,TAU);ctx.fill();}
  T('WHY?',330,170,WHITE,1);if(t>29.1)txt('8m 20s',840,1000,90,{col:GOLD,k:wk(t,29.12,'8m 20s',20)});if(t>29.5)txt('OLD LIGHT',840,1090,70,{col:GOLD,k:wk(t,29.6,'OLD LIGHT',24)});
  if(t>31.26)stamp('YOU SEE THE PAST',CX,480,110,RED,t,31.26);}
function a_know(t){if(t<57.55){paper();telescope(330,800,1.1);satellite(760,1080,0.9);bigX(330,820,150,t,54.22);bigX(760,1080,150,t,55.19);
    T('FOR 8 MIN 20 SEC',330,120,INK,wk(t,51.91,'FOR 8 MIN 20 SEC',30));if(t>55.9)stamp('NOTHING CAN KNOW',CX,520,110,RED,t,55.94);return;}
  daySky(t);sun(820,700,130,t);ctx.fillStyle='#F2D99A';ctx.fillRect(0,1300,W,260);line(0,1300,W,1300,{w:LW,seed:430});
  stick(330,1500,2.2,t,{pose:'cheer',mood:'happy'});ctx.fillStyle=INK;ctx.fillRect(330-44,1500-594,34,15);ctx.fillRect(330+9,1500-594,34,15);
  T('THE SUN IS GONE...',330,110,RED,wk(t,57.57,'THE SUN IS GONE...',30));if(t>58.6)T("AND IT'S STILL A",470,100,INK,wk(t,58.6,"AND IT'S STILL A",30));if(t>59.5)T('BEAUTIFUL DAY',610,130,'#2a7a3a',wk(t,59.59,'BEAUTIFUL DAY',30));}
// ---- short 2: instant night ----
function b_noon(t){daySky(t);sun(800,720,150,t);stick(300,GY,2.4,t,{pose:'relax',mood:'happy'});T("IT'S NOON.",330,170,INK);T('THE SKY IS BRIGHT.',490,110,INK);
  if(t>64.54)stamp('AND THEN...',740,1150,130,RED,t,64.54);}
function b_dark(t){const sh=t<65.6?[nz(t*60,9)*18,nz(t*55,10)*12]:[0,0];ctx.save();ctx.translate(sh[0],sh[1]);nightSky(t);stick(820,GY,2.2,t,{pose:'up',mood:'shock',col:WHITE});
  stamp('DARKNESS.',CX,330,190,WHITE,t,65.32);if(t>66.2)T('NO SUNSET.',520,120,GOLD,wk(t,66.21,'NO SUNSET.',30));if(t>67.2)T('NO WARNING.',650,120,GOLD,wk(t,67.22,'NO WARNING.',30));
  if(t>68.2)stamp('JUST NIGHT.',CX,820,160,RED,t,68.22);if(t>69.08)txt('STARS AT',360,1010,100,{col:WHITE,k:wk(t,69.08,'STARS AT',30)});if(t>69.5)txt('LUNCHTIME',360,1120,100,{col:WHITE,k:wk(t,69.52,'LUNCHTIME',30)});ctx.restore();}
function b_solar(t){nightSky(t);const X0=170,Y0=1200,Wg=780,Hg=560;line(X0,Y0-Hg,X0,Y0,{w:7,col:WHITE,seed:500});line(X0,Y0,X0+Wg,Y0,{w:7,col:WHITE,seed:501});
  txt('100%',X0+20,Y0-Hg-40,60,{col:WHITE,align:'left'});txt('0%',X0+20,Y0+50,60,{col:WHITE,align:'left'});
  const k=P(t,70.75,72.4),dk=P(t,72.42,72.6),xs=X0+Wg*0.5;ctx.lineWidth=12;ctx.strokeStyle=dk>0?RED:GOLD;ctx.beginPath();ctx.moveTo(X0,Y0-Hg+40);ctx.lineTo(lerp(X0,xs,k),Y0-Hg+40);
  if(dk>0){ctx.lineTo(xs,lerp(Y0-Hg+40,Y0-6,dk));if(dk>=1)ctx.lineTo(lerp(xs,X0+Wg,P(t,72.6,73.5)),Y0-6);}ctx.stroke();
  T('SOLAR PANELS',330,140,WHITE);if(t>72.8)stamp('ZERO',700,900,170,RED,t,72.82);}
function b_birds(t){nightSky(t);for(let i=0;i<3;i++){const bx=260+i*280,by=600;poly([[bx-55,by],[bx,by+28],[bx+55,by]],{w:8,col:WHITE,seed:520+i});txt('Z',bx+40+((t*20+i*7)%30),by-70-((t*30+i*10)%40),60,{col:GOLD});}
  T('BIRDS GO QUIET',330,120,WHITE,wk(t,77.76,'BIRDS GO QUIET',30));
  if(t>79.12){for(let i=0;i<3;i++){const cx=260+i*280,cy=1050;ell(cx,cy,60,26,{w:7,col:WHITE,fill:'#2a4a2a',seed:530+i});line(cx-40,cy+20,cx-65,cy+60,{w:6,col:WHITE,seed:540+i});line(cx+25,cy+20,cx+60,cy+60,{w:6,col:WHITE,seed:545+i});txt('♪',cx+25,cy-90-Math.abs(Math.sin(t*6+i))*25,90,{col:GOLD});}
    T('CRICKETS:',820,120,GOLD,wk(t,79.12,'CRICKETS:',30));T('"IT\'S NIGHT!"',1240,120,GOLD,wk(t,79.8,'"IT\'S NIGHT!"',30));}}
function b_moon(t){nightSky(t);const dk=P(t,84.25,84.6);glow(CX,800,330,'rgba(230,230,240,0.5)',1-dk);moon(CX,800,230,dk>0.5?1:0);stick(220,GY,2.0,t,{pose:'point',mood:dk>0.5?'shock':'curious',col:WHITE});
  T('ON THE NIGHT SIDE...',330,110,WHITE,wk(t,81.5,'ON THE NIGHT SIDE...',30));if(t>84.25)stamp('THE MOON',CX,1150,150,RED,t,84.3),stamp('TURNED BLACK',CX,1290,130,RED,t,84.4);}
// ---- short 3: cosmic dominoes ----
function c_poof(t){space(t);if(t<7.37)sun(CX,820,230,t);else if(t<10.76){const k=P(t,7.37,7.6);if(k<1){ctx.save();ctx.globalAlpha=1-k;for(let i=0;i<14;i++){const an=i/14*TAU;line(CX+Math.cos(an)*(230+k*160),820+Math.sin(an)*(230+k*160),CX+Math.cos(an)*(270+k*200),820+Math.sin(an)*(270+k*200),{w:9,col:GOLD,seed:300+i});}ctx.restore();}
    sun(CX,820,230,t,{dashed:true});txt('POOF!',CX,820,170,{col:RED,a:clamp((t-7.37)/0.1)});}
  else{sun(CX,820,230*pop(t,10.76,0.3),t);}
  T('THE SUN VANISHES',330,130,WHITE);if(t>9.0)T('8 MIN LATER: BACK!',1250,110,GOLD,wk(t,9.02,'8 MIN LATER: BACK!',30));}
function c_dom(t){space(t);const SX=CX,SY=560,EY=780,JY=1010,SAY=1260,LX=760;sun(SX,SY,95,t);earth(SX,EY,42);
  const jd=t>127.36&&t<133.0,sd=t>130.67;jupiter(SX,JY,95,jd?1:0);saturn(SX,SAY,62,sd?1:0);
  T("THE BLACKOUT ISN'T OVER",330,100,WHITE,1);
  if(t>120.33&&t<124.2){const k=P(t,120.33,123.6);ctx.setLineDash([12,16]);ctx.strokeStyle=GOLD;ctx.lineWidth=7;for(const py of[JY,SAY]){ctx.beginPath();ctx.moveTo(SX-60,SY+90);ctx.lineTo(SX-60,lerp(SY+90,py-80,Math.min(1,k*2)));ctx.stroke();
      if(k>0.5){ctx.beginPath();ctx.moveTo(SX+60,py-80);ctx.lineTo(SX+60,lerp(py-80,EY+50,(k-0.5)*2));ctx.stroke();}}ctx.setLineDash([]);txt('OUT...',250,900,80,{col:GOLD});txt('...AND BACK',840,900,70,{col:GOLD,a:clamp((k-0.5)*3)});}
  if(t>124.2){if(t<127.36){const k=P(t,124.2,127.36);ctx.save();ctx.globalAlpha=0.8;ctx.fillStyle='#000';ctx.beginPath();ctx.moveTo(SX,SY);ctx.arc(SX,SY,lerp(100,JY-SY,k),Math.PI/2-0.3,Math.PI/2+0.3);ctx.fill();ctx.restore();}
    if(jd)bigX(SX,JY,120,t,127.4);txt('JUPITER',230,JY,64,{col:WHITE});txt('~1h 30m',LX+110,JY,72,{col:GOLD,k:wk(t,124.54,'~1h 30m',20)});}
  if(t>128.19){if(t<130.67){const k=P(t,128.19,130.67);ctx.save();ctx.globalAlpha=0.8;ctx.fillStyle='#000';ctx.beginPath();ctx.moveTo(SX,SY);ctx.arc(SX,SY,lerp(100,SAY-SY,k),Math.PI/2-0.22,Math.PI/2+0.22);ctx.fill();ctx.restore();}
    if(sd)bigX(SX,SAY,110,t,130.7);txt('SATURN',230,SAY,64,{col:WHITE});txt('~3 HOURS',LX+110,SAY,72,{col:RED,k:wk(t,128.31,'~3 HOURS',20)});}}
const SCENES={
  s1:t=>t<5?a_hook(t):t<33?a_why(t):a_know(t),
  s2:t=>t<65.3?b_noon(t):t<70.7?b_dark(t):t<74?b_solar(t):t<81.4?b_birds(t):b_moon(t),
  s3:t=>t<12?c_poof(t):c_dom(t)};
function ctaBanner(u,q){const k=eOut(clamp(u/0.25));ctx.save();ctx.translate(0,-(1-k)*400);rrect(40,300,1000,250,30,{w:7,fill:'rgba(251,250,253,0.97)',seed:9100});
  txt(q,CX,370,100,{col:INK,maxW:900});const ps=1+0.06*Math.sin(u*10);txt('YES / NO? COMMENT!',CX,480,96*ps,{col:RED,maxW:900,a:clamp((u-0.3)/0.2)});ctx.restore();}
const REEL_LEN=CFG.segs.reduce((a,[s,e])=>a+(e-s),0);
function render(tr){BOIL=Math.floor(tr/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);
  let acc=0,t=CFG.segs[CFG.segs.length-1][1]-0.001;for(const[s,e]of CFG.segs){if(tr<acc+(e-s)){t=s+(tr-acc);break;}acc+=e-s;}
  ctx.save();if(tr<0.5){const k=eOut(clamp(tr/0.5));ctx.translate(nz(tr*60,1)*14*(1-k),nz(tr*55,2)*14*(1-k));ctx.translate(CX,CY);ctx.scale(lerp(1.06,1,k),lerp(1.06,1,k));ctx.translate(-CX,-CY);}
  SCENES[CFG.id](t);ctx.restore();captions(t);
  if(tr>REEL_LEN-2.0){ctx.setTransform(1,0,0,1,0,0);ctaBanner(tr-(REEL_LEN-2.0),CFG.cta);}}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=Promise.all([document.fonts.load('40px "PH"')]).then(()=>{WORDS=ALIGN;buildCaps();}).then(()=>document.fonts.ready);
</script></body></html>
