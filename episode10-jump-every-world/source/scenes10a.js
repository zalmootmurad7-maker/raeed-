// ===================== HOOK =====================
const COLS=[{n:'EARTH',g:9.8,w:'clear',a:0,prop:(x,y,p)=>crate(x-120,y,0.5*p)},{n:'MARS',g:3.71,w:'launches',a:4,prop:(x,y,p)=>car(x-110,y,180)},{n:'MOON',g:1.62,w:'soar',a:10,prop:(x,y,p)=>hoop(x-160,y,p)},{n:'JUPITER',g:24.79,w:'slams',a:13,prop:(x,y,p)=>can(x-120,y,0.2*p*1.4)}];
function H1(t){white();const gy=930,ppm=130;COLS.forEach((c,i)=>{const x0=i*480,cx=x0+250;if(i>0)line(x0,60,x0,1060,{w:5,seed:6000+i});
  const tj=wa(c.w,c.a)-(c.n==='JUPITER'?0.2:0.15);groundL(gy,{x0:x0+10,x1:x0+470,hatchH:40});
  jumpAt(t,{g:c.g,tj,gx:cx,gy,ppm,s:0.7,hud:false,maxLabel:false,props:()=>c.prop(cx,gy,ppm)});
  const T=2*V0/c.g;if(TREAL>tj+T/2)ink(fmtM(V0*V0/(2*c.g)),cx,250,64,R10);ink(c.n,cx,120,74,INK);});}
// H2 18.66–25.16 the wrong world: a jump that never comes down
function H2(t){white();const z=snapZ(t,18.7,1,1.0);const tj=wa('never',20)-0.1;ctx.save();shk(t,wa('again',22),26,0.5);
  potato(960,980,520,190,5611);const up=Math.max(0,t-tj);const y=860-(up>0?Math.pow(up,1.6)*700:0);
  if(up>0){ctx.save();ctx.setLineDash([18,14]);line(960,860,960,Math.max(-50,y),{w:7,col:R10,seed:6010});ctx.restore();}
  fig(960,y,0.95,t,{pose:up>0?'air':t>tj-0.4?'crouch':'idle',mood:up>0?'shock':'happy'});ctx.restore();
  if(t>wa('wrong',18))ink('THE WRONG WORLD',960,120,90,INK);stamp10('WARNING: HUMAN NOW ORBITING THE SUN',960,520,62,t,wa('again',22));}
// H3 25.16–35.90 how high can legs take you? where is the borderline?
const WL=[['JUPITER',0.20],['NEPTUNE',0.44],['EARTH',0.5],['SATURN',0.55],['URANUS',0.56],['MARS',1.32],['MOON',3.02],['TITAN',3.63],['ERIS',6.0],['PLUTO',7.9]];
function H3(t){white();const by=900;line(120,by,1800,by,{w:6,seed:6020});WL.forEach(([n,h],i)=>{const x=200+i*165;const k=P(t,25.4+i*0.25,26.0+i*0.25);const bh=Math.log10(1+h*10)/Math.log10(80)*520*k;
  ctx.fillStyle='rgba(136,136,136,0.35)';ctx.fillRect(x-40,by-bh,80,bh);poly([[x-40,by],[x-40,by-bh],[x+40,by-bh],[x+40,by]],{w:5,seed:6021+i});ink(n,x,by+50,30,INK);if(k>=1)ink('?',x,by-bh-40,50,R10);});
  if(t>wa('borderline',27)){ctx.save();ctx.setLineDash([20,14]);line(120,260,1800,260,{w:8,col:R10,seed:6040});ctx.restore();ink('ESCAPE: NEVER COME BACK',960,210,56,R10);
    const u=(t-wa('borderline',27));const y=by-Math.abs(Math.sin(u*3))*400;fig(1700,Math.min(by,y),0.55,t,{pose:'air'});}
  ink('HOW HIGH CAN YOU JUMP?',960,90,80,INK);}
// ===================== THE SPRING =====================
function S1(t){white();const k1=wa('person',36),k2=wa('legs',37),k3=wa('jump',38);[['SAME PERSON',k1],['SAME LEGS',k2],['SAME JUMP',k3]].forEach(([s,tt],i)=>{if(t>tt&&t<43.2)stamp10(s,420+i*540,180,84,t,tt,INK);});
  if(t>wa('three',39)&&t<43.2)ink('PUSH-OFF: 3.13 m/s',960,380,110,R10);
  const gy=900;groundL(gy);if(t<43.2){fig(960,gy,1.4,t,{pose:'idle'});return;}
  jumpAt(t,{g:9.8,tj:wa('half',43.3)-0.1,gx:960,gy,ppm:520,s:1.0,hudX:1500,hudY:200,label:'EARTH',props:()=>{}});ink('g = 9.8 m/s²',380,200,70,INK);}
// S2 48.16–53.24 your legs are a spring
function S2(t){white();const gy=920;groundL(gy);const c=0.5+0.5*Math.sin(t*6);ctx.save();ctx.translate(760,gy);
  ctx.strokeStyle=R10;ctx.lineWidth=8;ctx.beginPath();for(let i=0;i<=60;i++){const y=-i*(180+80*c)/60;ctx.lineTo(Math.sin(i*0.9)*40,y);}ctx.stroke();ctx.restore();fig(760,gy-260-80*c,1.15,t,{pose:'idle',mood:'happy'});
  rrect(620,gy-300-80*c,280,310+80*c,20,{w:5,col:'#888',seed:6050});ink('LEGS = SPRING',760,140,80,INK);
  if(t>wa('heaviest',50)){const k=eOut(P(t,wa('heaviest',50),wa('heaviest',50)+0.5));P_jupiter(1500,lerp(1300,560,k),300);ink('THE HEAVIEST NEIGHBORHOOD',1450,140,56,R10);}}
// ===================== JUPITER =====================
function J1(t){white();const tp=wa('platform',57);if(t<tp){const z=snapZ(t,53.3,0.6,1);ctx.save();camAt(z,960,560);P_jupiter(960,560,400);ctx.restore();ink('JUPITER',960,120,100,INK);if(t>wa('solid',55))stamp10('NO SOLID SURFACE',960,980,64,t,wa('solid',55));return;}
  clouds(380,700,t);platform(960,700,520);fig(960,700,1.0,t,{pose:'idle',mood:'deadpan'});ink('1-BAR CLOUD LAYER',960,140,80,INK);if(t>wa('matches',60))ink('= EARTH SEA-LEVEL PRESSURE',960,240,52,R10);}
function J2(t){white();clouds(380,700,t);platform(960,760,560);rrect(880,720,160,40,8,{w:6,fill:'#fff',seed:6060});fig(960,720,1.0,t,{pose:'idle',mood:'shock'});
  const v=lerp(70,177,eOut(P(t,wa('seventy',68),wa('seven',70)+0.6)));dial(1450,450,180,v,200);if(t>wa('two',64))ink('2.5× GRAVITY',480,200,90,R10);}
function J3(t){white();const th=wa('thud',76);ctx.save();shk(t,th,22,0.4);clouds(300,560,t,{dark:0.25});const gy=900;platform(960,gy,640);
  jumpAt(t,{g:24.79,tj:th-0.25,gx:900,gy,ppm:900,s:0.9,hudX:1500,hudY:200,props:()=>can(1150,gy,0.2*900),pose:t>wa('bend',74)&&t<th-0.25?'crouch':null,mood:'strain'});ctx.restore();
  stamp10('THUD.',420,300,110,t,th);if(t>wa('soda',80))ink('= A SODA CAN',1150,gy-260,56,INK);}
function J4(t){white();const xs=[[480,'SATURN',P_saturn,150],[960,'URANUS',P_uranus,170],[1440,'NEPTUNE',P_neptune,170]];xs.forEach(([x,n,f,r])=>{f(x,520,r);ink('?',x,250,110,R10);});
  ink('THE OTHER GIANTS?',960,110,84,INK);if(t>wa('higher',90))stamp10('ONE JUMPS HIGHER THAN EARTH?!',960,900,64,t,wa('higher',90));}
// ===================== NEPTUNE / URANUS / SATURN / VENUS =====================
function N1(t){white();const tj=wa('manage',97)-0.1,T=2*V0/11.15;for(let i=0;i<14;i++){const y=150+i*55,x=((t*1400+i*347)%2400)-240;line(x,y,x+220,y,{w:5,col:'#555',seed:6070+i});}
  const gy=900;groundL(gy);const drift=t>tj?Math.min(1,(t-tj)/T)*260:0;ctx.save();ctx.translate(drift,0);jumpAt(t,{g:11.15,tj,gx:760,gy,ppm:700,s:0.9,hudX:1400,hudY:330,mood:'shock'});ctx.restore();
  ink('NEPTUNE',960,110,96,INK);if(t>wa('winds',100))ink('WINDS ~2,000 KM/H →',1300,200,56,R10);}
function N2(t){white();P_uranus(960,560,330);ink('URANUS',960,110,96,INK);stamp10('BREAKS THE RULE',960,950,70,t,wa('breaks',105));}
function U1(t){white();const ty=wa('yet',113);if(t<ty){P_uranus(820,560,330);P_earth(1450,640,85);ink('URANUS',820,140,80,INK);ink('EARTH',1450,780,52,INK);if(t>wa('fourteen',110))stamp10('14.5× EARTH\'S MASS',1300,300,64,t,wa('fourteen',110));return;}
  const gy=920,ppm=900,tj=wa('reach',115)-0.15;groundL(gy);jumpAt(t,{g:9.8,tj,gx:560,gy,ppm,s:0.8,hud:false,maxLabel:false,label:'EARTH'});jumpAt(t,{g:8.69,tj,gx:1300,gy,ppm,s:0.8,hud:false,maxLabel:false,label:'URANUS'});
  if(TREAL>tj+0.36){ctx.save();ctx.setLineDash([14,10]);line(400,gy-0.5*ppm,1700,gy-0.5*ppm,{w:5,col:'#777',seed:6080});ctx.restore();line(1150,gy-0.564*ppm,1700,gy-0.564*ppm,{w:6,col:R10,seed:6081});ink('0.50 m',300,gy-0.5*ppm,52,'#666');ink('0.56 m',1790,gy-0.564*ppm-40,52,R10);}
  if(t>wa('six',118))stamp10('+6 cm HIGHER',960,180,80,t,wa('six',118));}
function U2(t){white();const cx=760,cy=560,r=380;ell(cx,cy,r,r,{w:7,fill:'#fff',seed:6090});ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.clip();hatchRect(cx-r,cy-r,2*r,2*r,{dens:14});ctx.restore();ell(cx,cy,r*0.2,r*0.2,{w:6,fill:INK,seed:6091});
  ink('SLUSHY ICE + GAS',cx,cy+r*0.5,52,INK);if(t>wa('twenty',129)){arrowI(cx,cy,cx+r,cy,{col:R10,w:7});arrowI(cx+r,cy,cx,cy,{col:R10,w:7});ink('25,000 KM',cx+r/2,cy-50,60,R10);fig(cx+r*0.7,cy-r*0.72+10,0.5,t,{pose:'idle'});}
  if(t>wa('eleven',134))stamp10('GRAVITY 11% WEAKER',1450,560,64,t,wa('eleven',134));ink('WHY?',1450,200,110,INK);}
function V1(t){white();const gy=920;groundL(gy);jumpAt(t,{g:8.96,tj:wa('letting',140)+0.2,gx:700,gy,ppm:900,s:0.8,hudX:1400,hudY:300});P_saturn(1500,640,90);ink('SATURN',960,110,96,INK);if(t>wa('venus',143))ink('= VENUS: 0.55 m',1400,840,60,R10);}
function V2(t){white();for(let i=0;i<40;i++){const R=rng(6100+i);const x=R()*W,y=R()*900;line(x,y,x+40,y-40,{w:3,col:'rgba(120,120,120,0.5)',seed:6100+i});}hatchRect(0,0,W,920,{dens:12,col:'rgba(136,136,136,0.25)'});
  const gy=920;groundL(gy);const tj=wa('jumping',146),T=2*V0/8.87*3;const u=clamp((t-tj)/T);const h=t>tj&&u<1?Math.sin(u*Math.PI)*0.55:0;fig(760,gy-h*900,0.9,t,{pose:t>tj&&u<1?'swim':'idle',mood:'shock'});
  rrect(1500,250,70,560,30,{w:6,fill:'#fff',seed:6140});const th=lerp(100,520,P(t,146,150));ctx.fillStyle=R10;ctx.fillRect(1516,800-th,38,th);ink('464 °C',1680,300,60,R10);
  ink('VENUS',960,110,96,INK);if(t>wa('ninety',148))ink('AIR 92× DENSER',760,230,64,R10);if(t>wa('boiling',152))stamp10('A BOILING POOL',760,380,60,t,wa('boiling',152));}
function V3(t){white();const tf=wa('fly',160);const up=Math.max(0,t-tf);groundL(960);fig(960,900-Math.pow(up,1.5)*500,1.1,t,{pose:up>0?'air':'crouch',mood:'shock'});
  if(up>0)for(let i=0;i<4;i++)line(900+i*40,960-up*200,900+i*40,1060-up*200,{w:4,col:'#999',seed:6150+i});ink('JUST WARMING UP',960,140,80,INK);if(up>0)stamp10('YOU START TO FLY',960,320,80,t,tf);}
