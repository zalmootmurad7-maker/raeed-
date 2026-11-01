// ===== v7 hook cards: full drawing at frame 0, huge question written by ~0.6 s, big shocked figure =====
function bigLine(s,y,size,col,k){ctx.save();ctx.font=`${size}px "PH"`;const w=ctx.measureText(s).width;ctx.restore();const sz=Math.min(size,size*900/w);txt(s,CX,y,sz,{k,col});}
function hookText(tr,lines){lines.forEach(([s,y,size,col],i)=>bigLine(s,y,size,col,i===0?clamp(0.45+tr/0.3):clamp((tr-0.08-i*0.12)/0.32)));}
function shockFig(x,y,s,pose,tr,dark){ // big narrator with a shocked face; white ink + light head on night panels
  const k=eBack(clamp(tr/0.28)),sc=s*(0.85+0.15*k);
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
  vacQ:(tr)=>{ctx.fillStyle='#ece8df';ctx.fillRect(0,1020,W,900);line(0,1020,W,1020,8600,1,LW);dock(985,1150,false);
    vacuum(720,1200,3.4,tr);shockFig(240,2110,3.0,'up',tr,false);
    hookText(tr,[['EVERYONE VANISHED.',320,150,INK],['YOUR VACUUM',490,160,RED],["DIDN'T.",650,175,RED]]);},
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
  ctx.save();cam(0.62,CX,1500);city(t,(bi,k)=>2.1+bi*0.13+(k%5)*0.05,1500,{street:true});ctx.restore();
  txt('WITHIN HOURS',CX,330,120,{k:writeK(t,2.1,'WITHIN HOURS',30),col:'#ffffff'});txt('CITIES GO DARK',CX,470,120,{k:writeK(t,3.0,'CITIES GO DARK',30),col:RED});}
function vExit7(t){vExit(t);if(t>=72.9&&t<74.8)txt('EXIT SIGNS',CX,360,150,{k:writeK(t,73.05,'EXIT SIGNS',24),col:EXITG});}
function sceneFor(t){if(t<4.1)return vHook7;if(t<7.0)return vExitPre;if(t<26.85)return vPhone;if(t<41.25)return vVac;if(t<57.9)return vISS;if(t<86.9)return vExit7;return vLight;}
function shakeS(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0&&t-t0<2.5){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}return[x,y];}
const REEL_LEN=CFG.segs.reduce((a,[s,e])=>a+(e-s),0),CARD_T=CFG.cardT||0,LIKE_T=2.0;
function render(tr){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let acc=0,t=CFG.segs[CFG.segs.length-1][1]-0.001,segStart=0;for(const[s,e]of CFG.segs){if(tr<acc+(e-s)){t=s+(tr-acc);segStart=acc;break;}acc+=e-s;}
  const[sx,sy]=shakeS(t);ctx.save();ctx.translate(sx,sy);
  if(tr<0.5){const k=eOut(clamp(tr/0.5));ctx.translate(nz(tr*60,1)*16*(1-k),nz(tr*55,2)*16*(1-k));cam(lerp(1.06,1,k));} // punch-in: full frame from frame 0
  if(CFG.card&&tr<CARD_T){cam(1+0.02*clamp(tr/2));CARDS[CFG.card](tr);}else{cam(1+0.03*clamp((tr-segStart)/6));sceneFor(t)(t);}
  ctx.restore();
  if(tr>REEL_LEN-LIKE_T){ctx.setTransform(1,0,0,1,0,0);likeBanner(tr-(REEL_LEN-LIKE_T));}
}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
