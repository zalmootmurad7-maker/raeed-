// ===== Episode 4 shorts: vertical scenes (source time t) =====
function vNight(t,seed){nightPanel(30,180,1020,1560,t,seed);}
// hook (0-4.1)
function vHook(t){vNight(t,7101);
  ctx.save();cam(0.62,CX,1500);ctx.translate(0,0);city(t,(bi,k)=>t<2.0?Infinity:2.1+bi*0.13+(k%5)*0.05,1500,{street:true});ctx.restore();
  txt('EVERY HUMAN:',CX,330,110,{k:clamp(0.3+t/0.35),col:'#ffffff'});if(t>1.33)txt('GONE',CX,470,170,{k:writeK(t,1.33,'GONE',14),col:RED});}
// phone (22.75-26.85)
function vPhone(t){const pct=t<23.67?100:lerp(99,93,P(t,24.0,26.8));phone(CX,900,1.45,pct,t,{unplug:t<23.67?0:(t-23.67)/0.3});
  txt('YOUR PHONE',CX,300,110,{k:writeK(t,22.84,'YOUR PHONE',30)});txt('STOPPED CHARGING',CX,1580,84,{k:writeK(t,23.67,'STOPPED CHARGING',30),col:RED});}
// vacuum (33.0-41.25)
function vVac(t){ctx.fillStyle='#ece8df';ctx.fillRect(0,1150,W,770);line(0,1150,W,1150,8600,1,LW);
  circ(CX,520,130,{seed:8601,w:LW+1,fill:'#fff'});line(CX,520,CX,420,8602,1,8);line(CX,520,CX+70,520,8603,1,8);txt('9:00 AM',CX,720,84,{});
  const DX=880,DY=1320;ctx.save();cam(2.2,DX,DY);dock(DX,DY,t<40.6);ctx.restore();
  let vx,vy;if(t<38.6){const u=P(t,33.8,38.4);const z=[[DX-140,1300],[220,1250],[760,1450],[300,1520],[700,1260]];const seg=Math.min(3.999,u*4),i=Math.floor(seg),f=eInOut(seg-i);vx=lerp(z[i][0],z[i+1][0],f);vy=lerp(z[i][1],z[i+1][1],f);}
  else{const f=eInOut(P(t,38.6,39.5));vx=lerp(700,DX-150,f);vy=lerp(1260,DY-30,f);}
  vacuum(vx,vy,2.6,t);
  if(t>36.5&&t<38.6)txt('EMPTY HOUSE',CX,950,100,{k:writeK(t,36.52,'EMPTY HOUSE',30)});
  if(t>37.56&&t<38.8)txt('SPOTLESS',vx,vy-190,84,{k:writeK(t,37.56,'SPOTLESS',20)});
  if(t>40.12){txt('THE DOCK',CX,920,130,{k:writeK(t,40.12,'THE DOCK',22),col:RED});txt('IS DEAD.',CX,1060,130,{k:writeK(t,40.5,'IS DEAD.',22),col:RED});}}
// ISS (41.25-57.9)
function vISS(t){vNight(t,7108);ctx.save();ctx.beginPath();ctx.arc(CX,2900,1650,0,TAU);ctx.fillStyle='#14131a';ctx.fill();ctx.restore();circ(CX,2900,1650,{seed:8700,w:LW});
  const fall=P(t,53.65,56.0),sink=P(t,50.66,53.65);
  if(t<54.6){const x=lerp(CX,CX+60,sink+fall),y=lerp(860,1000,sink)+fall*200,s=lerp(1.2,0.85,sink+fall);iss(x,y,s,t,true);}
  if(t>54.4){const tl=t-54.4;const x=CX+80+tl*180,y=1150+tl*120;ctx.save();const g=ctx.createLinearGradient(x-300,y-200,x,y);g.addColorStop(0,'rgba(255,140,0,0)');g.addColorStop(1,'rgba(255,200,80,1)');ctx.strokeStyle=g;ctx.lineWidth=20;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-300,y-200);ctx.lineTo(x,y);ctx.stroke();ctx.restore();softGlow(x,y,100,'rgba(255,220,120,1)',1);}
  if(t<45.7){txt('THE BRIGHTEST LIGHT',CX,330,90,{k:writeK(t,41.27,'THE BRIGHTEST LIGHT',70),col:'#ffffff'});txt("ISN'T ON EARTH",CX,460,110,{k:writeK(t,41.5,"ISN'T ON EARTH",50),col:RED});}
  else if(t<50.6){txt('SPACE STATION',CX,330,110,{k:writeK(t,45.77,'SPACE STATION',30),col:'#ffffff'});txt('STILL LIT',CX,460,110,{k:writeK(t,46.6,'STILL LIT',22),col:WIN});if(t>49.58)txt('NOBODY HOME',CX,1350,100,{k:writeK(t,49.58,'NOBODY HOME',24),col:RED});}
  else if(t<56.0){txt('NO ONE',CX,330,110,{k:writeK(t,50.7,'NO ONE',20),col:'#ffffff'});txt('TO BOOST IT',CX,460,110,{k:writeK(t,51.1,'TO BOOST IT',24),col:'#ffffff'});}
  else{txt('OUR LAST',CX,330,120,{k:writeK(t,56.03,'OUR LAST',20),col:WIN});txt('SHOOTING STAR',CX,470,120,{k:writeK(t,56.4,'SHOOTING STAR',28),col:WIN});}}
// exit signs (70.65-86.9)
function vExit(t){vNight(t,7111);const corridor=t>80.6;
  if(corridor){ctx.strokeStyle='#4a4958';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(30,1740);ctx.lineTo(390,1150);ctx.moveTo(1050,1740);ctx.lineTo(690,1150);ctx.moveTo(30,180);ctx.lineTo(390,750);ctx.moveTo(1050,180);ctx.lineTo(690,750);ctx.stroke();ctx.strokeRect(390,750,300,400);}
  const glow=t<78.4?1:t<80.6?lerp(1,0.5,P(t,79.5,80.4)):lerp(0.5,0.12,P(t,80.6,82.6));exitSign(CX,corridor?950:900,corridor?0.75:1.4,glow,t);
  if(t<73.0){txt('ONE LIGHT',CX,330,110,{k:clamp(0.3+(t-70.65)/0.4),col:'#ffffff'});txt('NEEDS NO POWER',CX,460,100,{k:writeK(t,70.75,'NEEDS NO POWER',60),col:EXITG});}
  else if(t<78.3){txt('TRITIUM',CX,360,150,{k:writeK(t,74.87,'TRITIUM',20),col:EXITG});if(t>75.7){txt('RADIOACTIVE GAS',CX,1300,84,{k:writeK(t,75.74,'RADIOACTIVE GAS',30),col:'#ffffff'});txt('GLOWS ON ITS OWN',CX,1410,84,{k:writeK(t,76.98,'GLOWS ON ITS OWN',30),col:'#ffffff'});}}
  else if(!corridor){txt('EVERY 12 YEARS',CX,330,96,{k:writeK(t,78.39,'EVERY 12 YEARS',30),col:'#ffffff'});txt('HALF AS BRIGHT',CX,450,96,{k:writeK(t,79.55,'HALF AS BRIGHT',30),col:EXITG});
    [1,0.5,0.25,0.125,0.0625].forEach((b,i)=>{const k=eOut(P(t,78.6+i*0.25,78.9+i*0.25));const bx=170+i*170,bh=260*b*k;ctx.fillStyle=EXITG;ctx.fillRect(bx,1560-bh,100,bh);rect(bx,1300,100,260,8950+i,1,2.4,'#9a98a6');txt(String(i*12)+' YRS',bx+50,1270,46,{col:'#ffffff',a:k});});}
  else{txt('50 YEARS LATER',CX,330,110,{k:writeK(t,80.62,'50 YEARS LATER',26),col:'#ffffff'});if(t>84.4)txt('STILL POINTING',CX,1380,90,{k:writeK(t,84.4,'STILL POINTING',30),col:EXITG});if(t>85.97)txt('...FOR NOBODY.',CX,1500,100,{k:writeK(t,85.97,'...FOR NOBODY.',20),col:RED});}}
// light leaving Earth (91.4-104) + question (104-106) + maybe never/we were here (106.3-111.9)
function vLight(t){vNight(t,7113);
  if(t>=104&&t<106.3){for(let i=0;i<4;i++){const ph=((t-104)*0.4+i/4)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.8;ctx.strokeStyle=WIN;ctx.lineWidth=5;ctx.beginPath();ctx.arc(CX,980,60+ph*900,0,TAU);ctx.stroke();ctx.restore();}
    txt('WHEN DOES THE',CX,330,100,{k:clamp(0.3+(t-104)/0.35),col:'#ffffff'});txt('LAST LIGHT',CX,470,140,{k:clamp((t-104.15)/0.35),col:WIN});txt('GO OUT?',CX,610,120,{k:clamp((t-104.4)/0.3),col:'#ffffff'});return;}
  if(t>=106.3){for(let i=0;i<4;i++){const ph=((t-104)*0.35+i/4)%1;ctx.save();ctx.globalAlpha=(1-ph)*0.8;ctx.strokeStyle=WIN;ctx.lineWidth=4;ctx.beginPath();ctx.arc(CX,980,60+ph*900,0,TAU);ctx.stroke();ctx.restore();}
    if(t<107.3){const k=eBack(clamp((t-106.36)/0.3));ctx.save();ctx.translate(CX,960);ctx.scale(k,k);txt('MAYBE',0,-110,190,{col:WIN});txt('NEVER.',0,90,190,{col:WIN});ctx.restore();return;}
    earth(CX,1500,50,{seed:8530,simple:true,w:3});const y=lerp(1400,700,eOut(P(t,107.4,111.0)));
    for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=0.6-i*0.18;ctx.strokeStyle=WIN;ctx.lineWidth=5;ctx.beginPath();ctx.arc(CX,1500,1500-y-i*40,-Math.PI/2-0.4,-Math.PI/2+0.4);ctx.stroke();ctx.restore();}
    txt('OUR LIGHT',CX,330,110,{k:writeK(t,108.7,'OUR LIGHT',22),col:'#ffffff'});txt('KEEPS TRAVELING',CX,460,100,{k:writeK(t,109.07,'KEEPS TRAVELING',26),col:'#ffffff'});
    if(t>110.2)txt('WE WERE HERE',CX,y-60,120,{k:writeK(t,110.23,'WE WERE HERE',20),col:WIN});return;}
  if(t<96.9){const EX=CX,EY=1000,ER=230;earth(EX,EY,ER,{seed:8460});ctx.save();ctx.beginPath();ctx.arc(EX,EY,ER,0,TAU);ctx.clip();ctx.fillStyle='rgba(20,18,30,0.75)';ctx.fillRect(EX-ER,EY-ER,2*ER,2*ER);
      const R=rng(8470);for(let i=0;i<90;i++){const a=R()*TAU,d=Math.sqrt(R())*ER*0.9;ctx.fillStyle=WIN;ctx.fillRect(EX+Math.cos(a)*d,EY+Math.sin(a)*d,5,5);}ctx.restore();circ(EX,EY,ER,{seed:8471,w:LW,col:'#cfcfe0'});
    for(let i=0;i<5;i++){const ph=((t-91.4)*0.45+i/5)%1;ctx.save();ctx.globalAlpha=1-ph;ctx.strokeStyle=WIN;ctx.lineWidth=6;ctx.beginPath();ctx.arc(EX,EY,ER+20+ph*600,0,TAU);ctx.stroke();ctx.restore();}
    txt("TONIGHT'S LIGHT",CX,330,110,{k:writeK(t,91.5,"TONIGHT'S LIGHT",30),col:'#ffffff'});txt('ALREADY LEFT',CX,460,110,{k:writeK(t,92.97,'ALREADY LEFT',26),col:WIN});
    if(t>94.3)txt('300,000 KM/S',CX,1500,110,{k:writeK(t,94.32,'300,000 KM/S',24),col:WIN});return;}
  const X=CX;line(X,1560,X,330,8480,1,3,'#9a98a6');earth(X,1580,50,{seed:8481,simple:true,w:3});
  const stops=[[1250,'THE SUN','8 MIN',96.95],[870,'NEAREST STAR','4 YEARS',99.04],[470,'ANDROMEDA','2.5 MILLION YEARS',101.36]];
  const py=t<96.95?1580:t<99.04?lerp(1580,1250,eOut(P(t,96.95,97.9))):t<101.36?lerp(1250,870,eOut(P(t,99.04,100.6))):lerp(870,470,eOut(P(t,101.36,103.0)));
  stops.forEach(([y,n,d,t0],i)=>{if(t<t0-0.2)return;const k=pop(t,t0-0.2);if(i===0)sunGlyph(X,y,40*k+0.01,t,{seed:8490});else if(i===1){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(X,y,14*k,0,TAU);ctx.fill();}else{ctx.save();ctx.translate(X,y);ctx.scale(k,k);ctx.rotate(-0.4);ctx.fillStyle='rgba(220,220,255,0.6)';ctx.beginPath();ctx.ellipse(0,0,100,34,0,0,TAU);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,0,26,11,0,0,TAU);ctx.fill();ctx.restore();}
    txt(n,X-130,y-10,60,{k:writeK(t,t0,n,30),col:'#ffffff',align:'right'});txt(d,X+130,y-10,i===2?56:80,{k:writeK(t,t0+0.15,d,26),col:WIN,align:'left'});});
  softGlow(X,py,80,'rgba(255,230,120,1)',1);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(X,py,14,0,TAU);ctx.fill();}
function sceneFor(t){if(t<4.1)return vHook;if(t<26.85)return vPhone;if(t<41.25)return vVac;if(t<57.9)return vISS;if(t<86.9)return vExit;return vLight;}
const CARDS={
  vacQ:(tr)=>{ctx.fillStyle='#ece8df';ctx.fillRect(0,1150,W,770);line(0,1150,W,1150,8600,1,LW);vacuum(CX,1320,2.6,tr);
    txt('EVERY HUMAN',CX,330,110,{k:clamp(0.3+tr/0.3)});txt('VANISHED.',CX,460,110,{k:clamp((tr-0.1)/0.3),col:RED});txt('YOUR VACUUM:',CX,700,96,{k:clamp((tr-0.3)/0.35)});},
};
function shakeS(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0&&t-t0<2.5){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}return[x,y];}
const REEL_LEN=CFG.segs.reduce((a,[s,e])=>a+(e-s),0),CARD_T=CFG.card?1.0:0,LIKE_T=2.0;
function render(tr){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let acc=0,t=CFG.segs[CFG.segs.length-1][1]-0.001,segStart=0;for(const[s,e]of CFG.segs){if(tr<acc+(e-s)){t=s+(tr-acc);segStart=acc;break;}acc+=e-s;}
  const[sx,sy]=shakeS(t);ctx.save();ctx.translate(sx,sy);
  if(tr<0.45){const k=eBack(clamp(tr/0.45));ctx.translate(nz(tr*60,1)*14*(1-k),nz(tr*55,2)*14*(1-k));cam(lerp(0.8,1,k));}
  if(CFG.card&&tr<CARD_T){CARDS[CFG.card](tr);}else{cam(1+0.03*clamp((tr-segStart)/6));sceneFor(t)(t);}
  ctx.restore();
  if(tr>REEL_LEN-LIKE_T){ctx.setTransform(1,0,0,1,0,0);likeBanner(tr-(REEL_LEN-LIKE_T));}
}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
