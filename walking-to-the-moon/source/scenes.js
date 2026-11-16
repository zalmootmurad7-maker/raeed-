// ===== Ink & Atoms — "The Race to the Moon" (16:9, white ink, smooth motion, red = the walk only, yellow = light) =====
const RC='#d2382c',YL='#F2C230';
function walker(x,y,s,t,{walk=true,mood='tired',arms='down'}={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=INK;ctx.lineWidth=7/s*0.9+3;
  const ph=walk?Math.sin(t*5):0;const L=(a,b,c)=>{ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);if(c)ctx.lineTo(...c);ctx.stroke();};
  L([0,-100],[18+ph*16,-50],[24+ph*30,0]);L([0,-100],[-14-ph*16,-48],[-22-ph*30,0]);L([4,-185],[0,-100]);
  if(arms==='up'){L([3,-170],[-40,-240]);L([3,-170],[46,-240]);}else{L([3,-170],[30-ph*14,-120],[36-ph*16,-92]);L([3,-170],[-26+ph*14,-124],[-32+ph*16,-96]);}
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(8,-215,30,0,TAU);ctx.fill();ctx.stroke();ctx.lineWidth*=0.7;
  if(mood==='tired'){for(const ex of[-3,19]){ctx.beginPath();ctx.arc(ex,-219,6,0,Math.PI);ctx.stroke();L([ex-7,-219],[ex+7,-219]);}L([0,-198],[16,-200]);}
  else if(mood==='shock'){ctx.fillStyle=INK;for(const ex of[-3,19]){ctx.beginPath();ctx.arc(ex,-222,5,0,TAU);ctx.fill();}ctx.beginPath();ctx.ellipse(8,-198,7,10,0,0,TAU);ctx.stroke();}
  else{ctx.fillStyle=INK;for(const ex of[-3,19]){ctx.beginPath();ctx.arc(ex,-222,5,0,TAU);ctx.fill();}ctx.beginPath();ctx.arc(8,-208,12,0.15*Math.PI,0.85*Math.PI);ctx.stroke();}
  ctx.restore();}
function earthI(x,y,r){ell(x,y,r,r,{w:6,fill:'#d6e9f8',seed:7001});ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();ctx.fillStyle='#bfe3b5';for(const[u,v,a,b]of[[-0.35,-0.3,0.35,0.25],[0.35,-0.2,0.2,0.18],[-0.3,0.35,0.22,0.15],[0.25,0.4,0.3,0.2]]){ctx.beginPath();ctx.ellipse(x+u*r,y+v*r,a*r,b*r,0.3,0,TAU);ctx.fill();ctx.lineWidth=3;ctx.strokeStyle=INK;ctx.stroke();}ctx.restore();ell(x,y,r,r,{w:6,seed:7001});}
function moonI(x,y,r){ell(x,y,r,r,{w:6,fill:'#e6e6e6',seed:7002});for(const[u,v,c]of[[-0.3,-0.2,0.2],[0.25,0.2,0.15],[0.1,-0.4,0.1]])ell(x+u*r,y+v*r,c*r,c*r,{w:3,seed:7003});}
function sunI(x,y,r){ell(x,y,r,r,{w:6,fill:'#fff3c4',seed:7004});for(let i=0;i<16;i++){const a=i/16*TAU;line(x+Math.cos(a)*r*1.1,y+Math.sin(a)*r*1.1,x+Math.cos(a)*r*1.3,y+Math.sin(a)*r*1.3,{w:5,seed:7005+i});}}
function probe(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rrect(-20,-14,40,28,4,{w:4,fill:'#fff',seed:7020});ctx.lineWidth=4;ctx.strokeStyle=INK;ctx.beginPath();ctx.arc(26,0,16,-1.3,1.3);ctx.stroke();line(-20,0,-40,0,{w:3,seed:7021});ctx.restore();}
function capsule(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-24,-16],[-24,16],[22,8],[34,0],[22,-8]],{w:4,fill:'#fff',close:true,seed:7030});ell(4,0,6,6,{w:3,seed:7031});ctx.restore();}
function plane(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-40,-4],[30,-6],[42,0],[30,6],[-40,4]],{w:4,fill:'#fff',close:true,seed:7040});poly([[-2,-4],[-18,-26],[-8,-26],[12,-4]],{w:4,fill:'#fff',close:true,seed:7041});poly([[-2,4],[-18,22],[-8,22],[12,4]],{w:4,fill:'#fff',close:true,seed:7042});poly([[-40,-4],[-46,-16],[-36,-16],[-30,-4]],{w:4,fill:'#fff',close:true,seed:7043});ctx.restore();}
function train(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);poly([[-44,12],[-44,-14],[20,-14],[44,6],[44,12]],{w:4,fill:'#fff',close:true,seed:7050});for(const dx of[-28,-8,12])rrect(dx,-8,14,10,2,{w:3,seed:7051+dx});for(const dx of[-30,22])ell(dx,16,6,6,{w:3,fill:'#fff',seed:7055});ctx.restore();}
function lightDot(x,y){glow(x,y,26,'rgba(242,194,48,0.9)',1);ell(x,y,9,9,{w:3,fill:YL,col:'#b8860b',seed:7060});}
// race data: elapsed time (s) of each arrival; video anchors so arrivals land on the words
const TR=[['LIGHT',1.282,'1.28 s'],['NEW HORIZONS',8.58*3600,'~9 hours'],['APOLLO 11',76*3600,'~3 days'],['AIRLINER',17.8*86400,'17.8 days'],['FAST TRAIN',53.4*86400,'53 days'],['CAR',160.2*86400,'~5 months'],['YOU (WALKING)',8.77*365.25*86400,'8 y 9 m']];
let ANC=null;
function anchors(){const go=wa('go',23);return[[go,0],[go+1.282,1.282],[wa('nine',35),TR[1][1]],[wa('days',39.5),TR[2][1]],[wa('seventeen',45.5),TR[3][1]],[wa('fifty',49.7),TR[4][1]],[wa('months',54.2),TR[5][1]],[wa('one',60.2),365.25*86400],[wa('four',62.9),4*365.25*86400],[wa('arrive',68),TR[6][1]]];}
function elapsed(t){if(!ANC)ANC=anchors();if(t<=ANC[0][0])return 0;if(t<=ANC[1][0])return t-ANC[0][0];for(let i=1;i+1<ANC.length;i++){const[a,ta]=ANC[i],[b,tb]=ANC[i+1];if(t<=b){const u=(t-a)/(b-a);return Math.pow(10,lerp(Math.log10(ta),Math.log10(tb),u));}}return ANC[ANC.length-1][1];}
function fmtE(s){if(s<60)return s.toFixed(2)+' s';if(s<3600)return Math.floor(s/60)+' min '+String(Math.floor(s%60)).padStart(2,'0')+' s';if(s<86400)return Math.floor(s/3600)+' h '+String(Math.floor(s%3600/60)).padStart(2,'0')+' min';
  if(s<365.25*86400){const d=Math.floor(s/86400);return d+(d===1?' day ':' days ')+String(Math.floor(s%86400/3600)).padStart(2,'0')+' h';}if(false)return ''+String(Math.floor(s%86400/3600)).padStart(2,'0')+' h';const y=s/(365.25*86400),fy=Math.floor(y);return fy+(fy===1?' year ':' years ')+Math.floor((y%1)*365.25)+' days';}
const X0=330,X1=1650,LY=[330,420,510,600,690,780,900];
function board(t,{T=0,show=7,hi=-1}={}){ctx.save();line(X0,LY[0]-50,X0,LY[6]+60,{w:5,seed:7100});ctx.setLineDash([14,10]);line(X1,LY[0]-50,X1,LY[6]+60,{w:5,seed:7101});ctx.setLineDash([]);ctx.restore();
  ink('EARTH',X0,LY[0]-90,44,INK);earthI(X0-110,LY[3]+20,80);ink('MOON',X1,LY[0]-90,44,INK);moonI(X1+110,LY[3]+20,40);ink('384,400 KM',(X0+X1)/2,LY[6]+110,46,'#777');
  for(let i=0;i<show;i++){const y=LY[i],[n,ti,lab]=TR[i];if(i===6)ink(n,X0+20,y-36,52,RC,{align:'left'});if(i<6)line(X0,y+40,X1,y+40,{w:2,col:'#cfcfcf',seed:7110+i});const f=clamp(T/ti),x=lerp(X0,X1,f);
    if(i===0){if(f>0)line(X0,y,x,y,{w:10,col:YL,seed:7120});lightDot(x,y);}
    else if(i===6){ctx.save();ctx.setLineDash([16,12]);if(f>0)line(X0,y,x,y,{w:6,col:RC,seed:7121});ctx.restore();walker(x,y+40,0.42,t,{walk:f>0&&f<1,mood:f>=1?'happy':'tired'});}
    else{if(f>0)line(X0,y,x,y,{w:3,col:'#999',seed:7122+i});[null,probe,capsule,plane,train,(xx,yy,s)=>car(xx,yy+14,120*s)][i](x,y,i===5?0.9:1.0);}
    if(i<6)ink(n,X0+20,y-36,52,INK,{align:'left'});if(f>=1){const ta=ANC?ANC[Math.min(i+1,ANC.length-1)]:null;ink(lab,X1-24,y-36,56,i===6?RC:INK,{align:'right'});}}}
// --- scenes ---
function SA(t){white();earthI(300,560,190);moonI(1640,560,52);const k=P(t,0.4,0.4+1.282);const x=lerp(490,1588,k);if(k>0)line(490,560,x,560,{w:12,col:YL,seed:7200});lightDot(x,560);
  ink('LIGHT:',840,250,90,INK);ink(((k*1.282)).toFixed(2)+' s',1180,250,120,INK);ink('THE RACE TO THE MOON',960,110,64,'#777');}
function SB(t){white();earthI(300,560,190);moonI(1640,560,52);line(490,560,1588,560,{w:12,col:YL,seed:7200});ink('LIGHT: 1.28 s',960,250,80,INK);ctx.save();ctx.setLineDash([16,12]);line(470,700,1600,600,{w:7,col:RC,seed:7201});ctx.restore();
  walker(620,700-(620-470)*0.088,0.9,t,{mood:'tired'});if(t>wa('nine',4))stamp10('WALKING: ≈ 9 YEARS',1180,860,80,t,wa('nine',4),RC);}
function SC(t){white();const st=wa('seven',8);const show=Math.min(7,Math.floor(clamp((t-st)/0.55)*7+ (t>st?1:0)));board(t,{show});ink('7 TRAVELERS. 1 FINISH LINE.',960,90,70,INK);
  if(t>wa('slow',16))stamp10('HOW SLOW ARE YOU?',1300,LY[6]-10,56,t,wa('slow',16),RC);}
function SD(t){white();earthI(140,560,64);moonI(1810,560,18);const n=Math.max(1,Math.floor(clamp((t-17.5)/3.3)*29.5));for(let i=0;i<n;i++)earthI(140+128+i*55,560,26);ink('≈ '+Math.min(30,n)+' EARTHS',960,280,100,INK);ink('FIT IN THE GAP',960,380,56,'#777');}
function SE(t){white();const T=elapsed(t);board(t,{T});ink('TIME: '+fmtE(T),960,110,92,INK);if(t>wa('go',23)&&t<wa('go',23)+1.2)stamp10('GO!',960,220,110,t,wa('go',23),INK);
  if(t>wa('barely',27)&&t<29.3)ink('EVERYONE ELSE: BARELY MOVED',960,210,52,'#777');
  if(t>wa('one',60.2)&&t<wa('four',62.9))ink('1 YEAR IN: 1/9 OF THE WAY',1000,LY[6]+60,48,RC);if(t>wa('four',62.9)&&t<wa('arrive',68))ink('4 YEARS IN: NOT EVEN HALFWAY',1000,LY[6]+60,48,RC);
  if(t>wa('arrive',68))stamp10('8 YEARS, 9 MONTHS',1150,240,64,t,wa('arrive',68),RC);}
function SF(t){white();const k=eOut(P(t,69.4,71.5));ink(Math.round(lerp(1,216000000,k)).toLocaleString('en-US')+'×',960,420,170,INK);ink('LIGHT WAS FASTER THAN YOU',960,580,64,'#777');
  line(400,760,lerp(400,1520,Math.min(1,k*3)),760,{w:14,col:YL,seed:7300});ctx.save();ctx.setLineDash([16,12]);line(400,860,402,860,{w:6,col:RC,seed:7301});ctx.restore();walker(410,890,0.28,t);}
function SG(t){white();const k=eOut(P(t,wa('drifting',74.5),82));const mx=1250+k*260;moonI(mx,520,330);walker(700,880,1.0,t,{walk:false,mood:t>wa('thirty',80.8)?'shock':'happy',arms:'up'});ink('THE MOON IS DRIFTING AWAY',820,110,72,INK);
  if(t>wa('four',76))ink('3.8 CM EVERY YEAR',820,190,56,'#777');if(t>wa('thirty',80.8)){arrowI(1250-330,940,mx-330,940,{col:RC,w:7});stamp10('+33 CM',1100,1010,70,t,wa('thirty',80.8),RC);}}
function SH(t){white();earthI(260,560,90);sunI(1600,560,260);ink('THE MOON IS THE CLOSE ONE',960,100,70,INK);if(t>wa('eight',86))ink('LIGHT: 8 MIN',760,820,80,INK);if(t>wa('three',89))stamp10('WALKING: 3,400 YEARS',760,950,72,t,wa('three',89),RC);}
function SI(t){white();earthI(300,600,140);moonI(1620,600,60);ctx.save();ctx.setLineDash([16,12]);line(450,700,1560,640,{w:6,col:RC,seed:7400});ctx.restore();line(450,600,1560,600,{w:10,col:YL,seed:7401});walker(760,690,0.8,t,{mood:'happy'});
  ink('WHICH TRIP WOULD YOU TAKE?',960,140,80,INK);if(t>wa('like',94.5)){likeBtn(1500,880,1.1,t>wa('like',94.5)+0.5);ink('HIT LIKE',1500,1010,56,RC);}}
const SCN=[[0,SA],[3.4,SB],[6.7,SC],[17.3,SD],[21.45,SE],[69.15,SF],[72.8,SG],[83.8,SH],[91.55,SI]];const DURM=96.1;
function render(t){TREAL=t;BOIL=0;ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);let i=0;while(i+1<SCN.length&&t>=SCN[i+1][0])i++;ctx.save();SCN[i][1](t);ctx.restore();
  if(t>DURM-0.4){ctx.fillStyle=`rgba(255,255,255,${clamp((t-(DURM-0.4))/0.4)})`;ctx.fillRect(0,0,W,H);}}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
