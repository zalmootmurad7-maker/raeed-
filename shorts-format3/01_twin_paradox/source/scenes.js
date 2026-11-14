// ===== Ink & Atoms — Format 3 short: the twin paradox (9:16, calm, 2D ink on dark, red #d2382c only) =====
const R9='#d2382c',INKW='#EDEFF5',GREYW='#8d93a8';
function inkEarth(x,y,r,{a=1}={}){ctx.save();ctx.globalAlpha*=a;glow(x,y,r*1.4,'rgba(200,210,255,0.10)',1);ell(x,y,r,r,{w:6,col:INKW,fill:'#11152a',seed:301,amp:1.5});
  ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();for(const[u,v,aa,bb,rot]of[[-0.35,-0.25,0.35,0.22,0.5],[0.3,0.2,0.28,0.4,-0.3],[-0.1,0.55,0.25,0.12,0.2]])ell(x+u*r,y+v*r,aa*r,bb*r,{w:4,col:GREYW,seed:302+u*10,amp:1});ctx.restore();ctx.restore();}
function starX(x,y,r,t){glow(x,y,r*5,'rgba(255,255,255,0.35)',1);for(let i=0;i<4;i++){const a=i*Math.PI/2+t*0.1;line(x,y,x+Math.cos(a)*r*2.2,y+Math.sin(a)*r*2.2,{w:4,col:INKW,seed:310+i,amp:0.5});}ell(x,y,r,r,{w:4,col:INKW,fill:'#fff',seed:315});}
function rocketI(x,y,s,t,{ang=-Math.PI/2,flame=1,win=null}={}){ctx.save();ctx.translate(x,y);ctx.rotate(ang+Math.PI/2);ctx.scale(s,s);
  if(flame>0){const f=1+0.2*Math.sin(t*30);poly([[-22,92],[0,92+90*f*flame],[22,92]],{w:5,col:INKW,fill:'rgba(255,255,255,0.25)',close:true,seed:321});}
  poly([[-36,92],[-36,-60],[0,-140],[36,-60],[36,92]],{w:7,col:INKW,fill:'#151a30',close:true,seed:322});ctx.fillStyle=R9;ctx.fillRect(-34,40,68,16);
  for(const sx of[-1,1])poly([[sx*36,40],[sx*74,108],[sx*36,92]],{w:6,col:INKW,fill:'#151a30',close:true,seed:323+sx});ell(0,-30,20,20,{w:5,col:INKW,fill:'#0b0f1e',seed:326});ctx.restore();}
// twin: scarf red (traveller) or grey (Earth twin); age 0..1 adds beard, grey hair, hunch and a cane
function twin(x,y,s,t,{red=false,age=0,pose='relax',mood='happy',lean=0}={}){ctx.save();ctx.translate(x,y);ctx.rotate(lean*age*0.18);ctx.translate(-x,-y);
  stick(x,y,s,t,{pose:age>0.75&&pose==='relax'?'chin':pose,mood,col:INKW,head:'#F6F4F8'});ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const sc=red?R9:'#6f7488';poly([[-30,-228],[30,-228],[34,-212],[-34,-212]],{w:4,col:INKW,fill:sc,close:true,seed:330,amp:1});const wv=Math.sin(t*3)*4;poly([[20,-220],[66,-202+wv],[60,-186+wv],[16,-206]],{w:4,col:INKW,fill:sc,close:true,seed:331,amp:1});
  if(age>0.2){ctx.globalAlpha=clamp((age-0.2)/0.4);poly([[-26,-252],[0,-200-24*age],[26,-252]],{w:3,col:INKW,fill:'#c9ccd6',close:true,seed:332,amp:1});ctx.globalAlpha=1;}
  if(age>0.4){ctx.globalAlpha=clamp((age-0.4)/0.3);for(const sx of[-1,1])poly([[sx*30,-300],[sx*46,-292],[sx*42,-276]],{w:3,col:INKW,fill:'#c9ccd6',close:true,seed:333+sx,amp:1});ctx.globalAlpha=1;}
  if(age>0.7){ctx.globalAlpha=clamp((age-0.7)/0.2);line(70,-150,82,0,{w:7,col:INKW,seed:336});line(70,-150,50,-160,{w:7,col:INKW,seed:337});ctx.globalAlpha=1;}
  ctx.restore();ctx.restore();}
function clock(x,y,r,t,rate,{col=INKW,label=''}={}){ell(x,y,r,r,{w:6,col,fill:'rgba(10,12,25,0.9)',seed:340,amp:1});for(let i=0;i<12;i++){const a=i/12*TAU;line(x+Math.cos(a)*r*0.82,y+Math.sin(a)*r*0.82,x+Math.cos(a)*r*0.95,y+Math.sin(a)*r*0.95,{w:4,col,seed:341+i,amp:0.3});}
  const a1=-Math.PI/2+t*rate,a2=-Math.PI/2+t*rate/12;line(x,y,x+Math.cos(a1)*r*0.78,y+Math.sin(a1)*r*0.78,{w:6,col,seed:355,amp:0.3});line(x,y,x+Math.cos(a2)*r*0.5,y+Math.sin(a2)*r*0.5,{w:9,col,seed:356,amp:0.3});
  if(label)TX(label,x,y+r+62,58,col);}
function ground(t){ctx.fillStyle='#0d1020';ctx.beginPath();ctx.ellipse(CX,2150,1300,700,0,0,TAU);ctx.fill();ell(CX,2150,1300,700,{w:6,col:GREYW,seed:360,amp:2});}
function cake(x,y,s,t,t0){const k=pop(t,t0,0.3);if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(k*s,k*s);rrect(-70,-40,140,80,10,{w:5,col:INKW,fill:'#151a30',seed:370});for(const dx of[-35,0,35]){line(dx,-40,dx,-80,{w:5,col:INKW,seed:371+dx});glow(dx,-92,18,'rgba(255,200,120,0.9)',1);}ctx.restore();}
function bigNum(s,y,col,t,t0,size=150){if(t<t0)return;const k=eOut(P(t,t0,t0+0.4));TX(s,CX,y,size,col,{a:k,stroke:10,strokeCol:'#000'});}
function soft(t,t0,t1){return P(t,t0,t0+0.5)*(1-P(t,t1-0.5,t1));}
// S1 0–2.48 Two twins. Same birthday.  (frame 0: both twins, big; question line for the first seconds)
function S1(t){deep(t,{dim:0.9});ctx.save();cam(t,[[0,1.06,CX,1150],[2.48,1.0,CX,1150]]);ground(t);twin(340,1640,2.25,t,{red:true,mood:'happy'});twin(740,1640,2.25,t,{red:false,mood:'happy'});cake(CX+10,1600,1.5,t,wt('same'));ctx.restore();
  const a=1-P(t,2.2,2.6);TX('WHO COMES BACK',CX,330,112,INKW,{a});TX('OLDER?',CX,470,150,R9,{a,stroke:10,strokeCol:'#000'});vignette(0.5);}
// S2 2.48–3.84 One stays on Earth. (grey-scarf twin glows softly; a rocket waits)
function S2(t){deep(t,{dim:0.9});ctx.save();cam(t,[[2.48,1.0,CX,1100],[3.84,1.04,700,1150]]);ground(t);glow(740,1250,330,'rgba(200,210,255,0.18)',P(t,2.5,3.0));twin(340,1640,2.25,t,{red:true,mood:'curious'});twin(740,1640,2.25,t,{mood:'happy'});rocketI(110,1380,1.1,t,{flame:0});ctx.restore();vignette(0.5);}
// S3 3.84–11.22 the trip: 5 light-years out at 99% of light speed, turn around, come home (red path)
function S3(t){deep(t,{dim:0.9});const ex=300,ey=1600,sx=820,sy=420;ctx.save();cam(t,[[3.84,1.12,ex+150,ey-250],[6.0,1.0,CX,CY],[11.2,1.0,CX,CY]]);
  inkEarth(ex,ey,150);starX(sx,sy,26,t);const out=eInOut(P(t,4.2,wt('turns'))),back=eInOut(P(t,wt('turns'),10.6));
  ctx.save();ctx.setLineDash([18,16]);ctx.strokeStyle='rgba(210,56,44,0.55)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(ex+60,ey-140);ctx.quadraticCurveTo(250,700,sx-40,sy+40);ctx.stroke();ctx.restore();
  const q=(u)=>{const x0=ex+60,y0=ey-140,cx=250,cy=700,x1=sx-40,y1=sy+40;return[(1-u)*(1-u)*x0+2*(1-u)*u*cx+u*u*x1,(1-u)*(1-u)*y0+2*(1-u)*u*cy+u*u*y1];};
  const u=t<wt('turns')?out:1-back;const[px,py]=q(u),[qx,qy]=q(clamp(u+(t<wt('turns')?0.01:-0.01)));const ang=Math.atan2(qy-py,qx-px);
  ctx.save();ctx.strokeStyle=R9;ctx.lineWidth=8;ctx.beginPath();const u0=t<wt('turns')?0:u,u1=t<wt('turns')?u:1;for(let v=u0;v<=u1;v+=0.01){const[a1,b1]=q(v);ctx.lineTo(a1,b1);}ctx.stroke();ctx.restore();
  rocketI(px,py,0.55,t,{ang,flame:1});ctx.restore();
  if(t>wt('five'))TX('5 LIGHT-YEARS',CX,250,96,INKW,{a:P(t,wt('five'),wt('five')+0.4)*(1-P(t,8.4,8.8))});
  if(t>wt('ninety'))TX('99% OF LIGHT SPEED',CX,1780-430,84,R9,{a:P(t,wt('ninety'),wt('ninety')+0.4)*(1-P(t,10.4,10.9))});vignette(0.5);}
// S4 11.22–18.01 on Earth, a little over ten years go by: the twin waits and ages; the ship lands
function S4(t){deep(t,{dim:0.9});ctx.save();cam(t,[[11.22,1.0,CX,1050],[18.0,1.06,CX,1150]]);ground(t);const age=P(t,11.6,16.6);twin(560,1500,1.9,t,{age,lean:1,mood:age>0.7?'curious':'happy'});
  if(t>16.6){const k=eOut(P(t,16.6,17.6));rocketI(880,lerp(400,1360,k),1.0,t,{ang:Math.PI/2*0+Math.PI/2*-1,flame:1-k*0.7});}ctx.restore();
  const y=(lerp(0,10.1,P(t,11.6,16.6))).toFixed(1);TX(y+' YEARS',CX,330,150,INKW,{stroke:10,strokeCol:'#000'});TX('ON EARTH',CX,460,64,GREYW);vignette(0.5);}
// S5 18.01–22.96 the twin who flew: the ship clock barely moves -> 17 months; then the two numbers side by side
function S5(t){deep(t,{dim:0.9});const split=P(t,21.0,21.6);if(split<1){ctx.save();ctx.globalAlpha=1-split;ctx.save();cam(t,[[18.0,1.08,CX,900],[21.0,1.0,CX,900]]);
  ell(CX,900,300,300,{w:10,col:INKW,fill:'#0b0f1e',seed:380});ctx.save();ctx.beginPath();ctx.arc(CX,900,292,0,TAU);ctx.clip();twin(CX,1180,1.4,t,{red:true,mood:'curious'});ctx.restore();ctx.restore();
  clock(CX,1420,120,t,0.6,{col:R9});TX(Math.round(lerp(0,17,P(t,19.6,22.4)))+' MONTHS',CX,300,140,R9,{stroke:10,strokeCol:'#000'});ctx.restore();}
  if(split>0){ctx.save();ctx.globalAlpha=split;TX('10.1 YEARS',CX,620,150,INKW,{stroke:10,strokeCol:'#000'});TX('ON EARTH',CX,740,64,GREYW);TX('vs',CX,900,90,GREYW);TX('17 MONTHS',CX,1080,150,R9,{stroke:10,strokeCol:'#000'});TX('IN THE SHIP',CX,1200,64,R9);ctx.restore();}vignette(0.5);}
// S6 22.96–30.96 same birthday, ~9 years apart; nobody cheated; time ran slower for the one who moved (two clocks)
function S6(t){deep(t,{dim:0.9});const k2=P(t,27.8,28.4);ctx.save();cam(t,[[22.96,1.08,CX,1300],[27.8,1.0,CX,1250],[30.9,0.96,CX,1100]]);ground(t);
  twin(380,1500,1.75,t,{red:true,mood:'happy'});twin(720,1500,1.75,t,{age:1,lean:1,mood:'curious'});cake(CX-10,1520,1.2,t,22.97);ctx.restore();
  if(t>wt('nine')&&k2<1)TX('≈ 9 YEARS APART',CX,330,120,INKW,{a:P(t,wt('nine'),wt('nine')+0.4)*(1-k2),stroke:10,strokeCol:'#000'});
  if(k2>0){ctx.save();ctx.globalAlpha=k2;clock(330,420,140,t,2.4,{col:INKW,label:'EARTH'});clock(750,420,140,t,0.34,{col:R9,label:'MOVING'});ctx.restore();}vignette(0.5);}
// S7 30.96–34.85 not just a thought experiment: real twins (Earth + the space station orbit)
function S7(t){deep(t,{dim:0.9});ctx.save();cam(t,[[30.96,1.1,CX,1000],[34.85,1.0,CX,1000]]);inkEarth(CX,1050,300);ctx.save();ctx.setLineDash([14,12]);ctx.strokeStyle='rgba(237,239,245,0.5)';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(CX,1050,420,150,-0.2,0,TAU);ctx.stroke();ctx.restore();
  const a=t*0.6;ctx.save();ctx.translate(CX,1050);ctx.rotate(-0.2);const x=Math.cos(a)*420,y=Math.sin(a)*150;ctx.restore();iss(CX+x*Math.cos(-0.2)-y*Math.sin(-0.2),1050+x*Math.sin(-0.2)+y*Math.cos(-0.2),0.28,t);ctx.restore();
  if(t>wt('real'))TX('REAL TWINS',CX,330,140,INKW,{a:P(t,wt('real'),wt('real')+0.4),stroke:10,strokeCol:'#000'});vignette(0.5);}
// S8 34.85–40.59 Scott (340 days in orbit) vs Mark (Earth): a few milliseconds younger
function S8(t){deep(t,{dim:0.9});iss(CX,520,0.55,t);twin(CX,900,1.0,t,{red:true,mood:'happy'});TX('SCOTT',CX,360,90,R9);TX('340 DAYS IN ORBIT',CX,1000,56,INKW);
  line(80,1090,1000,1090,{w:4,col:'rgba(237,239,245,0.35)',seed:390});ground(t);twin(CX,1470,1.0,t,{mood:'happy'});TX('MARK',290,1300,90,INKW);TX('ON EARTH',290,1390,56,GREYW);
  if(t>wt('milliseconds'))TX('≈ 0.005 s YOUNGER',CX,240,100,R9,{a:P(t,wt('milliseconds'),wt('milliseconds')+0.4),stroke:10,strokeCol:'#000'});vignette(0.5);}
// S9 40.59–end: which twin would you rather be?  A (stayed, older) / B (flew, younger) — like banner over the last ~2 s
function S9(t){deep(t,{dim:0.9});ctx.save();cam(t,[[40.59,1.06,CX,1150],[44.4,1.0,CX,1150]]);ground(t);twin(330,1450,1.6,t,{age:1,lean:1,mood:'curious'});twin(750,1450,1.6,t,{red:true,mood:'happy'});ctx.restore();
  if(t>wt('which')){const k=P(t,wt('which'),wt('which')+0.4);TX('A',330,330,190,INKW,{a:k,stroke:10,strokeCol:'#000'});TX('B',750,330,190,R9,{a:k,stroke:10,strokeCol:'#000'});TX('STAYED',330,470,58,GREYW,{a:k});TX('FLEW',750,470,58,R9,{a:k});}
  if(t>TM.vend+0.2){const kk=pop(t,TM.vend+0.2,0.3);ctx.save();ctx.translate(CX,1420+0*kk);ctx.scale(kk,kk);rrect(-300,-70,600,140,30,{w:6,col:'#cfd6ea',fill:'rgba(10,10,25,0.92)',seed:395});likeBtn(-200,0,0.55,t>TM.vend+0.8);txt('HIT LIKE',70,4,80,{col:WHITE});ctx.restore();}vignette(0.5);}
const SCN=[[0,S1],[2.48,S2],[3.84,S3],[11.22,S4],[18.01,S5],[22.96,S6],[30.96,S7],[34.85,S8],[40.59,S9]];
function render(t){BOIL=Math.floor(t/0.25);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);
  let i=0;while(i+1<SCN.length&&t>=SCN[i+1][0])i++;ctx.save();SCN[i][1](t);ctx.restore();
  const u=t-SCN[i][0];if(i>0&&u<0.35){ctx.fillStyle=`rgba(5,6,15,${1-u/0.35})`;ctx.fillRect(0,0,W,H);}
  if(t>TM.tot-0.4){ctx.fillStyle=`rgba(0,0,0,${P(t,TM.tot-0.4,TM.tot)*0})`;}}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
