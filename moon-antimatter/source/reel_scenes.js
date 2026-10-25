// ================= vertical scenes for the reels (driven by SOURCE time t of video 2) =================
// content kept inside y ~230..1560 so it clears the reel UI
function ringV(x,y,r,k){if(k>=1)return;ctx.save();ctx.globalAlpha=1-k;circ(x,y,r,{seed:2140+Math.floor(x),w:2.4,dash:[8,8]});ctx.restore();}

// intro: "Let's build the Moon out of... antimatter"
function vB(t){
  txt('WHAT IF THE MOON',CX,300,96,{k:writeK(t,8.5,'WHAT IF THE MOON',34)});
  txt('WERE MADE OF...',CX,420,96,{k:writeK(t,9.05,'WERE MADE OF...',34)});
  const MX=CX,MY=860,R=290;
  circ(MX,MY,R,{dash:[14,12],k:eOut(P(t,8.6,9.4)),seed:801,w:3.4});
  if(t>9.4&&t<10.99)txt('?',MX,MY,200,{k:1,col:'#bbb'});
  if(t>10.99){antiBall(MX,MY,R,{s:pop(t,10.99,0.3),pr:15});circ(MX,MY,R+16,{col:RED,w:3.4,dash:[12,10],seed:806,k:eOut(P(t,11.2,11.6))});}
  txt('ANTIMATTER',CX,1330,150,{k:writeK(t,11.0,'ANTIMATTER',22),col:RED});
}
// the catch: annihilation
function vI(t){
  const ha=1-P(t,49.6,49.85);
  txt('BUT...',CX,300,120,{k:writeK(t,45.9,'BUT...',12),col:RED,a:ha});
  txt("THERE'S A CATCH",CX,430,86,{k:writeK(t,46.25,"THERE'S A CATCH",30),a:ha});
  const ap=eIn(P(t,48.2,50.85));const y=900;
  const lx=lerp(210,CX-92,ap),rx=lerp(870,CX+92,ap);const gone=P(t,50.95,51.15);
  if(t<51.15){proton(lx,y,92,{s:pop(t,47.7)*(1-gone),seed:2101});antiproton(rx,y,92,{s:pop(t,47.85)*(1-gone),seed:2102});}
  txt('MATTER',210,1070,64,{k:writeK(t,47.8,'MATTER'),a:1-P(t,48.2,48.5)});txt('ANTIMATTER',850,1070,64,{k:writeK(t,48.56,'ANTIMATTER'),col:RED,a:1-P(t,49.4,49.7)});
  if(t>48.3&&t<50.95){motionLines(lx-92,y,0,110,3,2110,1);motionLines(rx+92,y,Math.PI,110,3,2111,1);}
  if(t>49.85&&t<50.95){const k=eOut(P(t,49.9,50.2));ctx.save();ctx.setLineDash([10,10]);const pts=[];for(let i=0;i<=20;i++){const a=Math.PI+i/20*Math.PI;pts.push([CX+Math.cos(a)*300,760+Math.sin(a)*150]);}strokePts(pts,k,3);ctx.restore();
    txt('BOUNCE?',CX,520,90,{k:writeK(t,49.9,'BOUNCE?',30)});cross(CX,525,80,P(t,50.3,50.6));}
  if(t>=50.95){boom(CX,y,t-50.99,230,2120,{hold:0.5,fade:0.6});txt('ANNIHILATE!',CX,1260,124,{k:writeK(t,51.0,'ANNIHILATE!',24),col:RED,a:1-P(t,52.5,52.7)});}
  if(t>52.6){txt('BOTH VANISH',CX,1260,100,{k:writeK(t,52.65,'BOTH VANISH',30),a:1-P(t,53.2,53.3)});for(let i=0;i<2;i++)ringV(CX+(i?92:-92),y,92+P(t,52.6,53.2)*30,P(t,52.6,53.2));}
  if(t>53.27){const tl=t-53.27;greyFlash(CX,800,tl,0.9);boom(CX,800,tl,320,2130,{hold:1.6,fade:0.6});
    txt('PURE ENERGY',CX,1270,124,{k:writeK(t,53.9,'PURE ENERGY',24)});if(t>54.4){ctx.save();ctx.globalAlpha=P(t,54.4,54.6);sup('E = MC','2',CX,1410,84);ctx.restore();}}
}
// 1 g + 1 g = 3 Hiroshimas
function vJ(t){
  txt('THAT ENERGY IS',CX,300,86,{k:writeK(t,55.4,'THAT ENERGY IS',30)});
  if(t>56.42){ctx.save();const j=Math.max(0,1-(t-56.42)/1.2)*6;ctx.translate(nz(t*40,1)*j,nz(t*43,2)*j);txt('RIDICULOUS',CX,430,140,{k:writeK(t,56.42,'RIDICULOUS',22),col:RED});ctx.restore();}
  cube(290,680,pop(t,57.9)*2.6,false,{seed:2201});txt('1 GRAM',300,860,76,{k:writeK(t,58.2,'1 GRAM')});txt('MATTER',300,930,56,{k:writeK(t,58.5,'MATTER')});
  txt('+',CX,680,130,{k:writeK(t,58.98,'+',5)});
  cube(780,680,pop(t,59.4)*2.6,true,{seed:2202});txt('1 GRAM',790,860,76,{k:writeK(t,59.62,'1 GRAM'),col:RED});txt('ANTIMATTER',790,930,56,{k:writeK(t,59.95,'ANTIMATTER'),col:RED});
  txt('=',CX,1000,130,{k:writeK(t,60.99,'=',5)});
  for(let i=0;i<3;i++)mushroom(230+i*310,1400,pop(t,62.93+i*0.3,0.3)*1.3,2210+i*10);
  txt('3 HIROSHIMA BOMBS',CX,1490,84,{k:writeK(t,63.5,'3 HIROSHIMA BOMBS',30),col:RED});
}
// grapefruit rock > biggest bomb
function vM(t){
  const MX=CX,MY=640,MR=260;
  antiMoon(MX,MY,MR,{s:pop(t,88.14),seed:2602});txt('ANTI-MOON',CX,300,84,{k:writeK(t,88.4,'ANTI-MOON'),col:RED});
  const fa=1-P(t,90.9,91.0);const fly=eIn(P(t,91.0,91.16));
  if(t>89.3&&fly<1){const x=lerp(300,MX-60,fly),y=lerp(1230,MY+MR-20,fly);rockGlyph(x,y,72,2610);if(fly>0)motionLines(x,y,-Math.PI/2+0.25,160,3,2611,1);}
  if(t>89.3&&fa>0){ctx.save();ctx.globalAlpha=fa;txt('A ROCK',300,1100,70,{k:writeK(t,89.4,'A ROCK')});
    circ(780,1230,72,{fill:'#ffd9c2',seed:2620,s:pop(t,90.3)});if(t>90.4){for(let i=0;i<6;i++){const a=i/6*TAU;line(780,1230,780+Math.cos(a)*60,1230+Math.sin(a)*60,2621+i,1,2,'#c96');}}
    txt('GRAPEFRUIT',780,1100,70,{k:writeK(t,90.3,'GRAPEFRUIT',30)});txt('=',CX,1230,110,{k:writeK(t,90.3,'=',5)});txt('SAME SIZE',CX,1420,76,{k:writeK(t,90.5,'SAME SIZE',30)});ctx.restore();}
  if(t>91.16){const tl=t-91.16;greyFlash(MX-60,MY+MR-40,tl,0.7);boom(MX-60,MY+MR-40,tl,220,2630,{hold:4,fade:0.6});}
  if(t>91.76){txt('MORE ENERGY THAN THE',CX,1190,66,{k:writeK(t,91.76,'MORE ENERGY THAN THE',34)});
    const bs=pop(t,93.1);if(bs>0){ctx.save();ctx.translate(CX,1330);ctx.scale(bs,bs);ctx.beginPath();ctx.ellipse(0,0,170,56,0,0,TAU);ctx.fillStyle='#dcd9e2';ctx.fill();circ(0,0,170,{ry:56,seed:2641});for(const sd of[-1,1])strokePts(wob([[-150,0],[-225,sd*66],[-190,0]],2642+sd,0.5));ctx.restore();}
    txt('BIGGEST BOMB EVER BUILT',CX,1480,72,{k:writeK(t,92.93,'BIGGEST BOMB EVER BUILT',32),col:RED});}
}
// the anti-Moon falls into Earth -> 10^40 J
function vP(t){
  const EX=CX,EY=1260,ER=250;const hitT=116.3;
  if(t<hitT+0.05){earth(EX,EY,ER,{seed:2901});const k=eIn(P(t,113.5,hitT));const mx=lerp(-260,EX-70,k),my=lerp(560,EY-ER-95,k);antiMoon(mx,my,110,{seed:2902});const ang=Math.atan2(EY-ER-95-560,EX-70+260);motionLines(mx-Math.cos(ang)*110,my-Math.sin(ang)*110,ang,200,4,2903,1);
    txt('WHAT IF IT FELL',CX,300,92,{k:writeK(t,113.46,'WHAT IF IT FELL',34)});txt('INTO THE EARTH?',CX,415,92,{k:writeK(t,114.6,'INTO THE EARTH?',34)});}
  else{const tl=t-hitT;greyFlash(EX,EY-ER,tl,1.4);if(tl<1.3)boom(EX,EY-ER,tl,600,2910,{hold:0.8,fade:0.5});
    if(t>117.0)txt('IF ALL OF IT ANNIHILATED',CX,300,66,{k:writeK(t,117.0,'IF ALL OF IT ANNIHILATED',32)});
    const k=pop(t,118.76,0.3);if(k>0){ctx.save();ctx.translate(CX,540);ctx.scale(k,k);sup('10','40',0,0,240);ctx.restore();txt('JOULES',CX,730,110,{k:writeK(t,119.6,'JOULES',20)});}
    if(t>120.83){sunGlyph(290,1010,85,t,{seed:2920});txt('MORE THAN THE SUN',290,1190,52,{k:writeK(t,120.9,'MORE THAN THE SUN',30)});txt('IN 1,000,000 YEARS',290,1260,60,{k:writeK(t,122.6,'IN 1,000,000 YEARS',30),col:RED});}
    if(t>124.44){earth(800,1010,90,{s:pop(t,124.5),seed:2930});if(t>126.57)strokePts(wob([[760,930],[800,990],[780,1050],[820,1100]],2931,1),eOut(P(t,126.57,126.9)),4,RED);
      txt('60,000,000 x',800,1190,72,{k:writeK(t,124.72,'60,000,000 x',24),col:RED});txt('WHAT IT TAKES TO',800,1265,48,{k:writeK(t,126.1,'WHAT IT TAKES TO',40)});txt('BLOW EARTH APART',800,1325,48,{k:writeK(t,126.5,'BLOW EARTH APART',40)});}
  }
}
// sixty million times over
function vQ(t){
  if(t<129.7){earth(CX,820,270,{seed:3001});if(t>128.5)boom(CX,820,t-128.5,360,3002,{hold:0.6,fade:0.4});txt('NOT JUST ONCE...',CX,1300,104,{k:writeK(t,128.14,'NOT JUST ONCE...',22)});return;}
  const lv=Math.min(4,Math.floor((t-129.74)/0.55));const cols=[2,3,6,10,16][lv],rows=Math.round(cols*1.3);
  const gx=40,gy=240,gw=1000,gh=1130;const cw=gw/cols,ch=gh/rows;const r=Math.min(cw,ch)*0.36;
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=gx+cw*(i+0.5),y=gy+ch*(j+0.5);const ph=((i*7+j*13)%10)/10;const tl=((t*1.6+ph)%1)*0.6;
    if(cols<=6){earth(x,y,r,{seed:3010+(i*3+j)%7,simple:true,w:2.4});boom(x,y,tl,r*1.25,3100+i+j*40,{hold:0.25,fade:0.3});}
    else{ctx.fillStyle=SEA;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=1.8;ctx.stroke();if(tl<0.3){ctx.strokeStyle=RED;ctx.lineWidth=1.8;for(let q=0;q<6;q++){const a=q/6*TAU;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);ctx.lineTo(x+Math.cos(a)*r*1.6,y+Math.sin(a)*r*1.6);ctx.stroke();}}}}
  const cnt=Math.round(Math.pow(10,lerp(0,Math.log10(6e7),P(t,129.8,132.1))));
  ctx.save();ctx.fillStyle=PAPER;ctx.fillRect(140,1400,800,140);ctx.restore();rect(140,1400,800,140,3200,1,LW);
  txt('x '+cnt.toLocaleString('en-US'),CX,1470,100,{col:RED});
}
// keep the normal Moon
function vS(t){
  const hug={la:[1.1,1.9],ra:[1.5,1.25],ll:[-0.26,-0.2],rl:[0.26,0.2],paper:0};
  moon(640,880,250,{s:pop(t,140.15),seed:3401});figure(300,1290,lerpPose(POSES.rest,hug,eOut(P(t,141.3,141.7))),{s:1.2});
  txt('MAYBE...',CX,290,100,{k:writeK(t,140.21,'MAYBE...',14)});
  txt('THE NORMAL MOON',CX,410,92,{k:writeK(t,141.0,'THE NORMAL MOON',34)});txt('IS FINE',CX,515,92,{k:writeK(t,141.7,'IS FINE',20)});
  if(t>142.1){heart(870,640,2.8+0.2*Math.sin(t*8));heart(960,570,1.7+0.15*Math.sin(t*8+1));}
  const w=txt("LET'S KEEP IT",CX,1440,124,{k:writeK(t,143.18,"LET'S KEEP IT",22),col:RED});if(t>143.9)check(CX+(w||600)/2+60,1430,70,eOut(P(t,143.9,144.2)));
}
// end card (reel-local time u from 0)
function endCard(u){
  txt('WATCH THE',CX,700,110,{k:clamp(u*30/9)});txt('FULL VIDEO',CX,830,130,{k:clamp((u-0.25)*30/10),col:RED});
  const s=pop(u,0.5);if(s>0){ctx.save();ctx.translate(CX,1080);ctx.scale(s,s);circ(0,0,110,{fill:PAPER,seed:3501,w:4});const tri=[[-30,-48],[52,0],[-30,48],[-30,-48]];fillPts(tri,RED);strokePts(wob(tri,3502,0.6),1,4,RED);ctx.restore();}
  txt('ON THE CHANNEL',CX,1290,80,{k:clamp((u-0.6)*30/14)});
}
function sceneFor(t){
  if(t<12.4)return vB;if(t<55.3)return vI;if(t<65.05)return vJ;if(t<98.15)return vM;if(t<128.0)return vP;if(t<133.0)return vQ;return vS;}
const SHAKES=[[50.99,14,6],[53.27,22,4],[63.0,6,8],[91.16,26,4],[116.3,60,2],[128.5,16,4]];
function shakeV(t){let x=0,y=0;for(const[t0,a,d]of SHAKES){if(t>=t0&&t-t0<3){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}if(t>129.74&&t<132.2){x+=nz(t*60,1)*5;y+=nz(t*55,2)*5;}return[x,y];}
// REEL is set by the page: list of [srcStart, srcEnd]; an end card follows
let REEL=window.REEL_SEGS||[[8.45,11.95]];const ENDCARD=1.4;
const REEL_LEN=REEL.reduce((a,[s,e])=>a+(e-s),0)+ENDCARD;
function render(tr){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let acc=0,t=null,segStart=0;for(const[s,e]of REEL){if(tr<acc+(e-s)){t=s+(tr-acc);segStart=acc;break;}acc+=e-s;}
  if(t===null){endCard(tr-acc);return;}
  const[sx,sy]=shakeV(t);ctx.save();ctx.translate(sx,sy);const z=1+0.03*clamp((tr-segStart)/6);ctx.translate(CX,CY);ctx.scale(z,z);ctx.translate(-CX,-CY);sceneFor(t)(t);ctx.restore();
  const fi=1-clamp((tr)/0.25);if(fi>0){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(246,244,248,${fi})`;ctx.fillRect(0,0,W,H);}
}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
