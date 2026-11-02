// ===== v7 hook cards: full drawing at frame 0, huge question written by ~0.6 s, big shocked figure =====
function bigLine(s,y,size,col,k){ctx.save();ctx.font=`${size}px "PH"`;const w=ctx.measureText(s).width;ctx.restore();const sz=Math.min(size,size*900/w);txt(s,CX,y,sz,{k,col});}
function hookText(tr,lines){lines.forEach(([s,y,size,col],i)=>bigLine(s,y,size,col,CFG.instant?1:(i===0?clamp(0.45+tr/0.3):clamp((tr-0.08-i*0.12)/0.32))));}
function shockFig(x,y,s,pose,tr,dark,pop0=0.85){ // big narrator with a shocked face; white ink + light head on night panels
  const k=eBack(clamp(tr/0.28)),sc=s*(pop0+(1-pop0)*k);
  ctx.save();if(dark){ctx.beginPath();ctx.rect(30,180,1020,1560);ctx.clip();ctx.filter='invert(1)';}
  figure(x,y,POSES[pose],{s:sc,seed:9300});shakeMarks(x,y-264*sc,38*sc,9310,1);ctx.restore();
  ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);
  if(dark)circ(0,-264,38,{seed:9300,fill:BG,w:LW/sc*1.05,col:'#ffffff'});
  ctx.fillStyle=INK;for(const ex of[-13,13]){ctx.beginPath();ctx.arc(ex,-272,6.5,0,TAU);ctx.fill();}
  ctx.lineWidth=LW*1.05/sc;ctx.strokeStyle=INK;ctx.beginPath();ctx.ellipse(0,-245,8,11,0,0,TAU);ctx.stroke();ctx.restore();}
const CARDS={
  issQ:(tr)=>{vNight(tr,7108);ctx.save();ctx.beginPath();ctx.arc(CX,2900,1650,0,TAU);ctx.fillStyle='#14131a';ctx.fill();ctx.restore();circ(CX,2900,1650,{seed:8700,w:LW,col:'#55536a'});
    iss(700,930,1.0,tr,true);shockFig(250,2110,3.0,'up',tr,true);
    hookText(tr,[["EVERYONE'S GONE.",320,150,'#ffffff'],['WHO LEFT',490,165,WIN],['THIS ON?!',650,165,WIN]]);},
  exitQ:(tr)=>{vNight(tr,7111);exitSign(740,1010,1.35,1,tr);shockFig(250,2110,3.0,'up',tr,true);
    hookText(tr,[["EVERYONE'S GONE.",320,150,'#ffffff'],['WHY IS THIS',490,160,EXITG],['STILL ON?!',650,165,EXITG]]);},
  vacQ:(tr)=>{ctx.fillStyle='#ece8df';ctx.fillRect(0,790,W,1130);line(0,790,W,790,8600,1,LW);
    ctx.save();ctx.translate(1000,960);ctx.scale(1.6,1.6);dock(0,0,false);ctx.restore();
    const vx=lerp(600,700,eOut(clamp(tr/2.1))),vy=1000;motionLines(vx-330,vy,0,150,4,9400,1);
    softGlow(vx+120,vy-24,90,'rgba(106,209,106,0.9)',0.6+0.4*Math.sin(tr*12));vacuum(vx,vy,4.0,tr);
    shockFig(230,2150,3.2,'up',tr,false,1.0);
    hookText(tr,[['YOU VANISHED.',300,170,INK],['YOUR VACUUM',470,175,RED],["DIDN'T.",645,195,RED]]);},
  lightQ:(tr)=>{vNight(tr,7113);const EX=700,EY=1060,ER=170;
    for(let i=0;i<4;i++){const ph=(tr*0.45+i/4)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.85;ctx.strokeStyle=WIN;ctx.lineWidth=7;ctx.beginPath();ctx.arc(EX,EY,ER+20+ph*560,0,TAU);ctx.stroke();ctx.restore();}
    earth(EX,EY,ER,{seed:8460});ctx.save();ctx.beginPath();ctx.arc(EX,EY,ER,0,TAU);ctx.clip();ctx.fillStyle='rgba(20,18,30,0.75)';ctx.fillRect(EX-ER,EY-ER,2*ER,2*ER);
    const R=rng(8470);for(let i=0;i<70;i++){const a=R()*TAU,d=Math.sqrt(R())*ER*0.9;ctx.fillStyle=WIN;ctx.fillRect(EX+Math.cos(a)*d,EY+Math.sin(a)*d,6,6);}ctx.restore();circ(EX,EY,ER,{seed:8471,w:LW,col:'#cfcfe0'});
    shockFig(240,2110,3.0,'up',tr,true);
    hookText(tr,[['WHEN DOES THE',320,140,'#ffffff'],['LAST LIGHT',480,180,WIN],['GO OUT?',640,160,'#ffffff']]);},
};
// s2 extra line (4.12-6.9): "One light will still be glowing fifty years from now"
function vExitPre(t){vNight(t,7111);exitSign(CX,950,1.5,1,t);
  txt('ONE LIGHT',CX,330,120,{k:writeK(t,4.14,'ONE LIGHT',30),col:'#ffffff'});txt('STILL GLOWING',CX,470,120,{k:writeK(t,4.81,'STILL GLOWING',34),col:EXITG});
  if(t>5.6)txt('IN 50 YEARS',CX,1400,130,{k:writeK(t,5.66,'IN 50 YEARS',24),col:'#ffffff'});}
function vHook7(t){if(t<2.1)return vHook(t);vNight(t,7101);
  ctx.save();ctx.beginPath();ctx.rect(30,180,1020,1560);ctx.clip();ctx.translate(CX,1740);ctx.scale(1.65,1.65);ctx.translate(-975,-1740);
  city(t,(bi,k,b)=>2.2+clamp((b.x-640)/640)*1.3+(k%5)*0.05,1740,{street:false});ctx.restore();
  txt('WITHIN HOURS',CX,330,130,{k:writeK(t,2.1,'WITHIN HOURS',34),col:'#ffffff'});txt('CITIES GO DARK',CX,480,140,{k:writeK(t,3.0,'CITIES GO DARK',34),col:RED});}
function vExit7(t){vExit(t);if(t>=72.9&&t<74.8)txt('EXIT SIGNS',CX,360,150,{k:writeK(t,73.05,'EXIT SIGNS',24),col:EXITG});}
// vertical re-layout of the robot-vacuum scene (33.0-41.25): big vacuum, big text, payoff below the like banner
function sparkle4(x,y,r,a){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=INK;ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-r,y);ctx.lineTo(x+r,y);ctx.moveTo(x,y-r);ctx.lineTo(x,y+r);ctx.stroke();ctx.restore();}
function vVac7(t){ctx.fillStyle='#ece8df';ctx.fillRect(0,780,W,1140);line(0,780,W,780,8600,1,LW);
  const alive=t<40.6;ctx.save();ctx.translate(930,1010);ctx.scale(1.8,1.8);dock(0,0,alive);ctx.restore();
  let vx,vy,mv=false;const P1=[[650,1230],[330,1000],[760,1180],[340,1300],[600,1050]];
  if(t<33.8){vx=650;vy=1230;}else if(t<38.4){const u=P(t,33.8,38.4),seg=Math.min(3.999,u*4),i=Math.floor(seg),f=eInOut(seg-i);vx=lerp(P1[i][0],P1[i+1][0],f);vy=lerp(P1[i][1],P1[i+1][1],f);mv=true;}
  else{const f=eInOut(P(t,38.55,39.5));vx=lerp(600,640,f);vy=lerp(1050,1110,f);mv=f>0&&f<1;}
  if(mv)motionLines(vx-300,vy,0,130,3,9500,1);vacuum(vx,vy,3.4,t);
  if(t<36.5){bigLine('A ROBOT VACUUM',300,150,INK,writeK(t,33.11,'A ROBOT VACUUM',26));bigLine('STARTS ITS 9 AM CLEAN',460,105,RED,writeK(t,34.77,'STARTS ITS 9 AM CLEAN',34));
    const ck=pop(t,35.2);if(ck>0){circ(CX,650,95*ck,{seed:9510,w:LW+1,fill:'#fff'});if(ck>0.9){line(CX,650,CX,585,9511,1,7);line(CX,650,CX-55,650,9512,1,7);}}}
  else if(t<38.5){bigLine('EMPTY HOUSE.',300,165,INK,writeK(t,36.52,'EMPTY HOUSE.',26));bigLine('SPOTLESS.',480,165,RED,writeK(t,37.56,'SPOTLESS.',24));
    if(t>37.56)[[-260,-90],[250,-120],[-120,-170],[300,40]].forEach(([dx,dy],i)=>sparkle4(vx+dx,vy+dy,22+8*Math.sin(t*9+i),clamp((t-37.6-i*0.1)/0.15)));}
  else if(t<40.1){bigLine('BACK TO ITS DOCK…',520,150,INK,writeK(t,38.54,'BACK TO ITS DOCK…',26));}
  else{bigLine('THE DOCK',520,185,RED,writeK(t,40.12,'THE DOCK',24));bigLine('IS DEAD.',700,185,RED,writeK(t,40.54,'IS DEAD.',24));
    const q=pop(t,40.8);if(q>0)txt('?',vx-40,vy-170,150*q,{});}}
function vPhone7(t){const pct=t<23.67?100:lerp(99,93,P(t,24.0,26.8));phone(CX,1080,1.6,pct,t,{unplug:t<23.67?0:(t-23.67)/0.3});
  bigLine('YOUR PHONE?',300,175,INK,writeK(t,22.84,'YOUR PHONE?',30));bigLine('STOPPED CHARGING.',470,150,RED,writeK(t,23.67,'STOPPED CHARGING.',34));}

// ===== v8 (10/10 audit): vertical re-layouts with big text, comment CTA instead of like banner =====
function vExit8(t){vNight(t,7111);const corridor=t>80.6;
  if(corridor){ctx.save();ctx.strokeStyle='#5a5968';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(30,1740);ctx.lineTo(300,1150);ctx.moveTo(1050,1740);ctx.lineTo(780,1150);ctx.moveTo(30,180);ctx.lineTo(300,640);ctx.moveTo(1050,180);ctx.lineTo(780,640);ctx.stroke();ctx.strokeRect(300,640,480,510);ctx.restore();}
  const glow=t<78.4?1:t<80.6?lerp(1,0.5,P(t,79.5,80.4)):lerp(0.5,0.15,P(t,80.6,82.6));exitSign(CX,corridor?895:900,corridor?1.15:1.4,glow,t);
  if(t<74.8){bigLine('EXIT SIGNS',330,170,EXITG,writeK(t,73.05,'EXIT SIGNS',28));}
  else if(t<78.3){bigLine('TRITIUM',330,175,EXITG,writeK(t,74.87,'TRITIUM',24));if(t>75.7){bigLine('RADIOACTIVE GAS',1250,125,'#ffffff',writeK(t,75.74,'RADIOACTIVE GAS',34));bigLine('GLOWS ON ITS OWN',1400,125,'#ffffff',writeK(t,76.98,'GLOWS ON ITS OWN',34));}}
  else if(!corridor){bigLine('EVERY 12 YEARS',300,140,'#ffffff',writeK(t,78.39,'EVERY 12 YEARS',34));bigLine('HALF AS BRIGHT',460,140,EXITG,writeK(t,79.55,'HALF AS BRIGHT',34));
    [1,0.5,0.25,0.125,0.0625].forEach((b,i)=>{const k=eOut(P(t,78.6+i*0.25,78.9+i*0.25));const bx=130+i*170,bh=320*b*k;ctx.fillStyle=EXITG;ctx.fillRect(bx,1500-bh,130,bh);rect(bx,1180,130,320,8950+i,1,3,'#9a98a6');txt(String(i*12),bx+65,1120,80,{col:'#ffffff',a:k});});}
  else{bigLine('50 YEARS LATER',330,150,'#ffffff',writeK(t,80.62,'50 YEARS LATER',30));if(t>84.4)bigLine('STILL POINTING',1290,135,EXITG,writeK(t,84.4,'STILL POINTING',34));if(t>85.97)bigLine('...FOR NOBODY.',1440,145,RED,writeK(t,85.97,'...FOR NOBODY.',26));}}
function vStops8(t){vNight(t,7113);earth(CX,1440,62,{seed:8481,simple:true,w:3});line(CX,1380,CX,260,8480,1,4,'#6a6878');
  const st=t<99.04?0:t<101.36?1:2,t0=[96.95,99.04,101.36][st],k=pop(t,t0,0.3);
  if(st===0)sunGlyph(CX,900,150*k+0.01,t,{seed:8490});
  else if(st===1){softGlow(CX,900,220*k,'rgba(255,255,255,0.9)',1);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(CX,900,46*k,0,TAU);ctx.fill();}
  else{ctx.save();ctx.translate(CX,900);ctx.scale(k,k);ctx.rotate(-0.35);softGlow(0,0,330,'rgba(220,220,255,0.55)',1);ctx.fillStyle='rgba(220,220,255,0.65)';ctx.beginPath();ctx.ellipse(0,0,330,105,0,0,TAU);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,0,85,34,0,0,TAU);ctx.fill();ctx.restore();}
  const py=lerp(1380,520,eOut(P(t,t0,t0+1.6)));softGlow(CX,py,110,'rgba(255,230,120,1)',1);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(CX,py,20,0,TAU);ctx.fill();
  const L=[['8 MINUTES','PAST THE SUN'],['4 YEARS','NEAREST STAR'],['2.5 MILLION YEARS','ANDROMEDA']][st];
  bigLine(L[0],300,175,WIN,clamp((t-t0)/0.3));bigLine(L[1],470,140,'#ffffff',clamp((t-t0-0.25)/0.3));}
function vLight8(t){if(t>=96.9&&t<104)return vStops8(t);
  if(t>=107.3){vNight(t,7113);for(let i=0;i<4;i++){const ph=((t-104)*0.35+i/4)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.8;ctx.strokeStyle=WIN;ctx.lineWidth=5;ctx.beginPath();ctx.arc(CX,980,60+ph*900,0,TAU);ctx.stroke();ctx.restore();}
    earth(CX,1480,60,{seed:8530,simple:true,w:3});const y=lerp(1380,760,eOut(P(t,107.4,111.0)));
    for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=0.7-i*0.2;ctx.strokeStyle=WIN;ctx.lineWidth=7;ctx.beginPath();ctx.arc(CX,1480,1480-y-i*45,-Math.PI/2-0.45,-Math.PI/2+0.45);ctx.stroke();ctx.restore();}
    if(t<108.65){bigLine('LONG AFTER',330,165,'#ffffff',writeK(t,107.36,'LONG AFTER',30));bigLine("WE'RE GONE...",490,150,WIN,writeK(t,107.9,"WE'RE GONE...",30));}
    else{bigLine('OUR LIGHT',330,160,'#ffffff',writeK(t,108.7,'OUR LIGHT',24));bigLine('KEEPS TRAVELING',490,140,'#ffffff',writeK(t,109.07,'KEEPS TRAVELING',30));}
    if(t>110.2)bigLine('WE WERE HERE',y-90,160,WIN,writeK(t,110.23,'WE WERE HERE',22));return;}
  return vLight(t);}
function ctaBanner(u,q){const k=eOut(clamp(u/0.25));ctx.save();ctx.translate(0,-(1-k)*360);
  ctx.fillStyle='rgba(251,250,253,0.97)';ctx.fillRect(40,170,1000,250);rect(40,170,1000,250,9100,1,LW);
  bigLine(q,240,105,INK,1);const ps=1+0.06*Math.sin(u*10);bigLine('YES / NO? COMMENT!',350,100*ps,RED,clamp((u-0.3)/0.2));ctx.restore();}
function sceneFor(t){if(t<4.1)return vHook7;if(t<7.0)return vExitPre;if(t<26.85)return vPhone7;if(t<41.25)return vVac7;if(t<57.9)return vISS;if(t<86.9)return CFG.v8?vExit8:vExit7;return CFG.v8?vLight8:vLight;}
function shakeS(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0&&t-t0<2.5){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}return[x,y];}
const REEL_LEN=CFG.segs.reduce((a,[s,e])=>a+(e-s),0),CARD_T=CFG.cardT||0,LIKE_T=2.0;
function render(tr){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let acc=0,t=CFG.segs[CFG.segs.length-1][1]-0.001,segStart=0;for(const[s,e]of CFG.segs){if(tr<acc+(e-s)){t=s+(tr-acc);segStart=acc;break;}acc+=e-s;}
  const[sx,sy]=shakeS(t);ctx.save();ctx.translate(sx,sy);
  if(tr<0.5){const k=eOut(clamp(tr/0.5));ctx.translate(nz(tr*60,1)*16*(1-k),nz(tr*55,2)*16*(1-k));cam(lerp(1.06,1,k));} // punch-in: full frame from frame 0
  if(CFG.card&&tr<CARD_T){cam(1+0.02*clamp(tr/2));CARDS[CFG.card](tr);}else{cam(1+0.03*clamp((tr-segStart)/6));sceneFor(t)(t);}
  ctx.restore();
  if(tr>REEL_LEN-LIKE_T){ctx.setTransform(1,0,0,1,0,0);if(CFG.cta)ctaBanner(tr-(REEL_LEN-LIKE_T),CFG.cta);else likeBanner(tr-(REEL_LEN-LIKE_T));}
}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
