// ================= vertical reel scenes for video 3 (driven by SOURCE time t) =================
function r1(t){ // hook 0-7.2
  if(t<3.1){const j=t<0.4?0:3;ctx.save();ctx.translate(nz(t*30,1)*j,nz(t*33,2)*j);
    const L=['73,000,000,','000,000,000,','000,000'];let acc=0;L.forEach((s,i)=>{txt(s,CX,520+i*165,150,{k:writeK(t,0.16+i*0.55,s,20)});});
    txt('TONS',CX,1050,190,{k:writeK(t,1.95,'TONS',10),col:RED});ctx.restore();
    if(t>2.2)txt('(THE ENTIRE MOON)',CX,1220,66,{a:P(t,2.2,2.9)});return;}
  if(t<5.35){const imp=eIn(P(t,3.1,3.4));if(imp<1){ctx.save();ctx.translate(CX,780);ctx.scale(1-imp*0.98,1-imp*0.98);txt('73,000,000,000,000,000,000',0,0,90,{});txt('TONS',0,150,190,{col:RED});ctx.restore();}
    hole(CX,780,26,t,{s:pop(t,3.35),ring:false});magnifier(CX,780,210,P(t,3.5,3.9));
    txt('SMALLER THAN',CX,380,100,{k:writeK(t,3.2,'SMALLER THAN',30),col:RED});
    if(t>3.9){sandGrain(CX,1270,90);txt('A GRAIN OF SAND',CX,1420,70,{k:writeK(t,4.1,'A GRAIN OF SAND',40)});arrow(CX,1160,CX,1040,{k:eOut(P(t,4.0,4.3)),seed:5210});}
    return;}
  circ(CX,720,220,{dash:[16,14],seed:5221,w:3});hole(CX,720,14,t,{});line(-50,1500,1130,1500,5220,1,LW);
  figure(CX,1500,POSES.rest,{s:1.2});txt('?!',CX+150,1050,130,{col:RED,a:P(t,5.6,5.8)});
  txt('RIGHT ABOVE',CX,250,104,{k:writeK(t,5.45,'RIGHT ABOVE',30)});txt('YOUR HEAD',CX,365,104,{k:writeK(t,5.9,'YOUR HEAD',24),col:RED});}
function r2(t){ // 7.2-10.45
  const col=eIn(P(t,9.5,10.1));
  if(col<1){moon(CX,820,lerp(290,10,col),{s:pop(t,7.3),seed:5301});if(col>0)for(let i=0;i<10;i++){const a=i/10*TAU+col*4;const r0=lerp(460,70,col);line(CX+Math.cos(a)*r0,820+Math.sin(a)*r0,CX+Math.cos(a+0.6)*(r0*0.6),820+Math.sin(a+0.6)*(r0*0.6),5310+i,1,3);}}
  else hole(CX,820,20,t,{s:pop(t,10.05,0.3)});
  txt('TONIGHT:',CX,330,100,{k:writeK(t,7.35,'TONIGHT:',20),col:RED});
  txt('THE MOON BECOMES',CX,1300,96,{k:writeK(t,8.6,'THE MOON BECOMES',34)});txt('A BLACK HOLE',CX,1420,120,{k:writeK(t,9.5,'A BLACK HOLE',24),col:RED});}
function r5(t){ // chaos? 30.1-40.0
  txt('YOU EXPECT',CX,300,96,{k:writeK(t,32.15,'YOU EXPECT',26)});txt('CHAOS',CX,420,130,{k:writeK(t,32.75,'CHAOS',12),col:RED});
  const wb=t>37.85?nz(t*30,1)*4:0;
  if(t>33.72){ctx.save();ctx.translate(wb,0);quake(CX,760,pop(t,33.72)*1.1||0.0001,5601);txt('EARTHQUAKES',CX,860,64,{k:writeK(t,33.75,'EARTHQUAKES')});ctx.restore();}
  if(t>34.39){ctx.save();ctx.translate(-wb,0);bigWave(CX,1110,pop(t,34.39)*1.0||0.0001,5610);txt('GIANT WAVES',CX,1190,64,{k:writeK(t,34.45,'GIANT WAVES')});ctx.restore();}
  if(t>35.58){const s=pop(t,35.58);hole(CX+80,1330,10,t,{s});const sw=P(t,35.9,37.6);earth(lerp(CX-30,CX+70,sw),lerp(1360,1335,sw),60*(1-sw*0.6),{s,seed:5620,simple:true});txt('SWALLOWED?',CX,1470,64,{k:writeK(t,35.98,'SWALLOWED?')});}
  if(t>37.85){ctx.save();ctx.fillStyle=BG;ctx.globalAlpha=P(t,37.85,38.1)*0.85;ctx.fillRect(0,0,W,H);ctx.restore();txt("BUT HERE'S",CX,800,110,{k:writeK(t,37.9,"BUT HERE'S",26),col:RED});txt('THE TWIST...',CX,930,110,{k:writeK(t,38.3,'THE TWIST...',26),col:RED});}}
function r6(t){cam(1+P(t,40.0,41.8)*0.06);txt('NOTHING',CX,700,190,{k:writeK(t,40.33,'NOTHING',18)});txt('CHANGES.',CX,900,190,{k:writeK(t,40.77,'CHANGES.',18),col:RED});figure(CX,1500,POSES.shrug,{s:pop(t,40.9)*1.1});}
function r7(t){ // orbit 48.5-51.85, tides 51.85-56.6
  if(t<51.85){earth(CX,880,200,{seed:5710});circ(CX,880,430,{ry:250,dash:[12,12],seed:5711,w:2.6});const a=t*0.9+1;hole(CX+Math.cos(a)*430,880+Math.sin(a)*250,12,t,{});
    txt('SAME ORBIT',CX,320,120,{k:writeK(t,48.55,'SAME ORBIT',20)});txt('EXACTLY LIKE BEFORE',CX,1400,78,{k:writeK(t,50.3,'EXACTLY LIKE BEFORE',30)});return;}
  const tide=Math.sin((t-51.9)*2.2);ctx.save();ctx.fillStyle='#e9e2cf';ctx.fillRect(0,1300,W,620);ctx.restore();line(0,1300,W,1300,5720,1,LW);
  const wl=1140+tide*40;const fwl=x=>wl+Math.sin(x/60+t*3)*8+(x>650?(x-650)*0.6:0);ctx.save();ctx.fillStyle='#d7e3f3';ctx.beginPath();ctx.moveTo(0,wl);for(let x=0;x<=900;x+=20)ctx.lineTo(x,fwl(x));ctx.lineTo(900,1920);ctx.lineTo(0,1920);ctx.closePath();ctx.fill();ctx.restore();
  const wp=[];for(let x=0;x<=900;x+=20)wp.push([x,fwl(x)]);strokePts(wp,1,LW,'#2f5d9a');
  txt('THE TIDES',CX,300,104,{k:writeK(t,51.9,'THE TIDES',24)});txt('STILL COME IN',CX,415,96,{k:writeK(t,52.3,'STILL COME IN',30)});txt('TWICE A DAY',CX,520,70,{k:writeK(t,53.07,'TWICE A DAY',24)});
  if(t>54.4){for(let i=0;i<4;i++){const x=110+i*170;const k=eOut(P(t,54.4+i*0.08,54.8+i*0.08));arrow(x,wl-20,x+50,wl-130*k-30,{k,seed:5730+i,col:RED,w:4});}
    figure(890,1310,POSES.shrug,{s:pop(t,54.7)*0.9||0.0001});txt("WHO'S",CX,760,120,{k:writeK(t,55.3,"WHO'S",14),col:RED});txt('PULLING?!',CX,890,120,{k:writeK(t,55.6,'PULLING?!',18),col:RED});}}
function r13(t){ // trip + stretch 100.4-116.4 (vertical: the hole is up)
  const HX=CX,HY=260;hole(HX,HY,16,t,{});
  const dist=t<103.3?lerp(40,10,P(t,100.5,103.3)):t<105.7?10:t<106.7?lerp(10,6,P(t,105.7,106.7)):6;
  ctx.save();ctx.fillStyle=PAPER;ctx.fillRect(240,1430,600,120);ctx.restore();rect(240,1430,600,120,6301,1,LW);txt('DISTANCE: '+Math.round(dist)+' KM',CX,1490,70,{col:dist<=6?RED:INK});
  if(t<107.8){const ry=lerp(1500,980,eOut(P(t,100.5,102.0)))-lerp(0,180,P(t,102.0,107.6));ctx.save();ctx.translate(CX,ry);ctx.rotate(-Math.PI/2);rocket(0,0,1.5,6310,t);ctx.restore();
    if(t>103.34){const w=txt('10 KM: STILL FINE',CX,1300,76,{k:writeK(t,103.34,'10 KM: STILL FINE',24)});check(CX+(w||560)/2+45,1295,52,eOut(P(t,104.9,105.2)));}
    return;}
  const st=P(t,111.2,115.9);const sy=1+eIn(st)*1.6,sx=1-st*0.5;const AX=CX,AY=900;
  ctx.save();ctx.translate(AX,AY);ctx.scale(sx,sy);ctx.rotate(Math.PI);helmetFig(0,190,POSES.up,{s:1.2});ctx.restore();
  const fk=eOut(P(t,108.1,108.5));if(fk>0){arrow(AX+150,AY-200*sy,AX+150,AY-200*sy-170*fk,{seed:6320,col:RED,w:9,head:28});txt('FEET: 10 G',AX+260,AY-200*sy-60,58,{col:RED,k:writeK(t,109.1,'FEET: 10 G',12),align:'left'});
    arrow(AX+150,AY+200*sy,AX+150,AY+200*sy-30*fk,{seed:6321,w:3,head:12});txt('HEAD',AX+200,AY+200*sy,48,{k:writeK(t,110.4,'HEAD',10),align:'left'});}
  if(t<111.2)txt('YOUR FEET ARE PULLED',CX,1270,70,{k:writeK(t,107.92,'YOUR FEET ARE PULLED',30)});
  if(t>111.27){txt('AAAAAA!',230,620,90,{k:writeK(t,111.5,'AAAAAA!',8),col:RED});txt('LONGER...',120,1150,72,{k:writeK(t,113.05,'LONGER...',16),align:'left'});if(t>114.16)txt('AND LONGER...',120,1250,64,{k:writeK(t,114.16,'AND LONGER...',18),align:'left'});}}
function r14(t){const PX=CX,PY=880;circ(PX,PY,400,{ry:170,fill:PAPER,seed:6401,w:LW+0.5});circ(PX,PY,310,{ry:125,seed:6402,w:2.4});
  for(let i=0;i<14;i++){const pts=[];for(let j=0;j<=24;j++){const u=j/24;pts.push([PX-270+u*540,PY-50+Math.sin(u*8+i)*28+(i-7)*8]);}strokePts(wob(pts,6410+i,1),eOut(P(t,116.5+i*0.05,117.4+i*0.05)),3.6,'#c79a3a');}
  if(t>117)circ(PX+290,PY-50+Math.sin(8)*28,26,{seed:6430,w:2.6,fill:PAPER});
  txt('SCIENTISTS',CX,320,100,{k:writeK(t,116.6,'SCIENTISTS',26)});txt('CALL THIS...',CX,435,100,{k:writeK(t,117.3,'CALL THIS...',26)});
  const w=txt('SPAGHETTIFICATION',CX,1300,110,{k:writeK(t,118.77,'SPAGHETTIFICATION',22),col:RED});if(t>119.6){const k=eOut(P(t,119.6,120.0));line(CX-(w||900)/2,1375,CX-(w||900)/2+(w||900)*k,1373,6440,1,6,RED);}}
function r18(t){ // like CTA (source 150.05-152.7)
  const pressed=t>151.85;const bs=pop(t,150.2)*(pressed?1+0.15*Math.exp(-(t-151.85)*6):1);likeButton(CX,850,bs*1.7,pressed);
  figure(200,1480,POSES.point,{s:1.0});
  txt('IF THIS BLEW',CX,300,100,{k:writeK(t,150.17,'IF THIS BLEW',30)});txt('YOUR MIND',CX,415,100,{k:writeK(t,150.6,'YOUR MIND',24)});
  txt('HIT LIKE!',CX+90,1260,140,{k:writeK(t,151.58,'HIT LIKE!',18),col:RED});
  if(t>152.0)txt('FULL VIDEO ON THE CHANNEL',CX+80,1440,54,{k:writeK(t,152.0,'FULL VIDEO ON THE CHANNEL',40)});
  if(pressed){const tl=t-151.85,k=eOut(clamp(tl/0.3)),fa=1-clamp((tl-0.4)/0.6);ctx.save();ctx.globalAlpha=Math.max(0,fa);for(let i=0;i<16;i++){const a=i/16*TAU;line(CX+Math.cos(a)*(280+k*40),850+Math.sin(a)*(190+k*30),CX+Math.cos(a)*(320+k*90),850+Math.sin(a)*(220+k*70),6801+i,1,4,i%2?RED:INK);}ctx.restore();}}
function sceneFor(t){if(t<7.2)return r1;if(t<16.4)return r2;if(t<40.0)return r5;if(t<41.8)return r6;if(t<56.8)return r7;if(t<116.4)return r13;if(t<120.3)return r14;return r18;}
const SHAKES=[[0.16,12,6],[3.35,18,5],[10.05,10,6],[40.33,8,6],[111.3,8,3],[151.85,10,6]];
function shakeV(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0&&t-t0<3){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}if(t>111.3&&t<116.3){const k=P(t,111.3,116)*7;x+=nz(t*60,1)*k;y+=nz(t*55,2)*k;}return[x,y];}
let REEL=window.REEL_SEGS;const REEL_LEN=REEL.reduce((a,[s,e])=>a+(e-s),0);
function render(tr){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let acc=0,t=REEL[REEL.length-1][1]-0.001,segStart=0;for(const[s,e]of REEL){if(tr<acc+(e-s)){t=s+(tr-acc);segStart=acc;break;}acc+=e-s;}
  const[sx,sy]=shakeV(t);ctx.save();ctx.translate(sx,sy);cam(1+0.03*clamp((tr-segStart)/6));sceneFor(t)(t);ctx.restore();
  const fi=1-clamp(tr/0.2);if(fi>0){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(246,244,248,${fi})`;ctx.fillRect(0,0,W,H);}
}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
