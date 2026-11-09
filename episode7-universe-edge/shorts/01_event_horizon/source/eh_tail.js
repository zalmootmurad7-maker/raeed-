const AL=__AL__;
const CAPS=(()=>{const c=[];let cur=[];AL.forEach((w,i)=>{if(cur.length&&(w[1]-cur[cur.length-1][2]>0.15||cur.map(x=>x[0]).join(' ').length+w[0].length>17)){c.push(cur);cur=[];}cur.push(w);});if(cur.length)c.push(cur);return c;})();
function caps(t){for(let i=CAPS.length-1;i>=0;i--){const c=CAPS[i],s=c[0][1],e=c[c.length-1][2]+0.35;if(t>=s-0.05&&t<e){const str=c.map(x=>x[0]).join(' ').toUpperCase();let size=92;ctx.save();ctx.font=size+'px "PH"';let w=ctx.measureText(str).width;if(w>960){size*=960/w;ctx.font=size+'px "PH"';w=960;}
  ctx.fillStyle='rgba(10,10,20,0.85)';ctx.fillRect(CX-w/2-28,1395,w+56,size+30);let x=CX-w/2;ctx.textBaseline='middle';for(const[wd,ws]of c){const s2=wd.toUpperCase()+' ';ctx.fillStyle=t>=ws?GOLD:'#FFFFFF';ctx.fillText(s2,x,1395+(size+30)/2+2);x+=ctx.measureText(s2).width;}ctx.restore();return;}}}
function T2(s,y,size,col,o={}){return TX(s,CX,y,size,col,{maxW:980,...o});}
const EY=1180,ER=150;
function beam(x0,y0,y1){ctx.save();ctx.strokeStyle='rgba(255,215,0,0.85)';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0,y1);ctx.stroke();ctx.restore();photon(x0,y1,16);}
function A(t){deep(t,{speed:500,dirx:0,diry:-1});glow(CX,EY,ER*2.2,'rgba(127,178,229,0.55)',1);earth(CX,EY,ER);
  const by=lerp(EY-ER-20,620,eOut(P(t,0,3.9)));beam(CX+110,EY-ER+30,by);ship(CX-120,lerp(900,640,P(t,0,3.9)),1.15,t,{tilt:-Math.PI/2,mood:t>1.95?'shock':'happy'});
  if(t<1.95){T2('EVEN AT',300,150,WHITE);T2('LIGHT SPEED…',460,165,GOLD);}
  else{ST("YOU'LL NEVER REACH",CX,300,112,WHITE,t,1.95);ST('MOST OF THE UNIVERSE',CX,450,112,RED,t,2.64,{stroke:8,strokeCol:'#000'});}}
function B(t){deep(t,{dim:0.9});const z=lerp(1.6,1.0,eOut(P(t,3.95,4.7)));ctx.save();ctx.translate(CX,900);ctx.scale(z,z);ctx.translate(-CX,-900);
  earth(CX,900,40);const R=330;ctx.save();ctx.setLineDash([26,18]);ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.beginPath();ctx.arc(CX,900,R,0,TAU*eOut(P(t,4.2,5.0)));ctx.stroke();ctx.restore();
  for(let i=0;i<8;i++){const a=i/8*TAU+0.2,u=(t-4.0)*0.35,rr=Math.min(R-20,60+u*300);photon(CX+Math.cos(a)*rr,900+Math.sin(a)*rr,8);}ctx.restore();
  T2("THERE'S A LINE…",330,130,WHITE);if(t>4.76)ST('16 BILLION',CX,1300,140,RED,t,4.76,{stroke:9,strokeCol:'#000'});if(t>5.9)T2('LIGHT-YEARS AWAY',460,84,WHITE);vignette(0.5);}
const GAL=[[200,640],[880,640],[200,1170],[880,1170]];
function C(t){deep(t,{dim:0.9});const R=330;earth(CX,900,40);ctx.save();ctx.setLineDash([26,18]);ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.beginPath();ctx.arc(CX,900,R,0,TAU);ctx.stroke();ctx.restore();
  GAL.forEach(([x,y],i)=>{const dx=x-CX,dy=y-900,s=1+P(t,6.9,10.2)*0.12;galaxy(CX+dx*s,900+dy*s,95,i,{a:t>8.36?0.5:1});if(t>7.26+i*0.15)bigX(CX+dx*s,900+dy*s,80,t,7.26+i*0.15);});
  T2('ANYTHING PAST IT TODAY…',330,96,WHITE);if(t>8.36&&t<9.25)ST('OUT OF REACH.',CX,1300,130,WHITE,t,8.36);if(t>=9.25){ctx.save();shake(t,9.25,16,0.35);ST('FOREVER.',CX,1290,170,RED,t,9.25,{stroke:10,strokeCol:'#000'});ctx.restore();}vignette(0.5);}
function D(t){deep(t,{dim:0.9});const k=P(t,10.3,13.4),R=lerp(330,520,k),bx=lerp(60,R-40,1-Math.exp(-k*2.2));earth(CX,1050,40);
  ctx.save();ctx.setLineDash([26,18]);ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.beginPath();ctx.arc(CX,1050,R,-Math.PI*0.95,-Math.PI*0.05);ctx.stroke();ctx.restore();
  ctx.save();ctx.strokeStyle='rgba(255,215,0,0.85)';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(CX,1050-45);ctx.lineTo(CX,1050-bx);ctx.stroke();ctx.restore();photon(CX,1050-bx,16);
  T2('A BEAM OF LIGHT',300,120,GOLD);T2('LEAVING EARTH TONIGHT…',430,92,WHITE);if(t>12.3)ST('WILL NEVER CROSS IT',CX,1300,104,RED,t,12.3,{stroke:8,strokeCol:'#000'});vignette(0.5);}
function E(t){deep(t,{dim:0.8});const R=430,r=R*16/46.5,cy=920;ctx.save();ctx.fillStyle='rgba(210,56,44,0.38)';ctx.beginPath();ctx.arc(CX,cy,R,0,TAU);ctx.fill();ctx.beginPath();ctx.arc(CX,cy,R,0,TAU);ctx.clip();
  ctx.strokeStyle='rgba(255,90,80,0.55)';ctx.lineWidth=6;for(let i=-25;i<25;i++){ctx.beginPath();ctx.moveTo(CX-R+i*44,cy-R);ctx.lineTo(CX+R+i*44,cy+R);ctx.stroke();}ctx.restore();
  bubble(CX,cy,R,{fill:'rgba(0,0,0,0)',col:'rgba(255,120,110,0.95)',w:8});bubble(CX,cy,r,{fill:'rgba(127,178,229,0.6)',col:'#cfe3f2',w:6});earth(CX,cy,22);
  const v=counter(t,13.99,14.9,0,95);T2(v+'%',330,230,RED,{stroke:14,strokeCol:'#000'});T2('OF WHAT WE CAN SEE',1380,72,WHITE);T2('REACHABLE',cy+r+50,46,'#cfe3f2');vignette(0.5);}
function F(t){deep(t,{dim:0.8});ctx.save();ctx.translate(CX,640);brickWall(0,0,420,420,1);ctx.restore();bigX(CX,640,250,t,16.65);ST('NO WALL.',CX,1000,150,WHITE,t,16.47);if(t>17.27)ST('NO EDGE.',CX,1180,150,RED,t,17.27,{stroke:9,strokeCol:'#000'});vignette(0.5);}
function G(t){deep(t,{speed:300,dirx:0,diry:-1});ship(CX,1050,1.4,t,{tilt:-Math.PI/2,mood:'shock'});
  const k=eOut(clamp((t-18.0)/0.3));ctx.save();ctx.translate(0,-(1-k)*500);glow(CX,470,620,'rgba(255,68,68,0.22)',0.7);rrect(40,260,1000,420,34,{w:9,col:RED,fill:'#FBFAFD',seed:9300});
  txt("WHAT'S",CX,380,130,{col:INK});txt('STOPPING YOU?',CX,540,140,{col:RED,stroke:6,strokeCol:'#000',maxW:920});ctx.restore();}
function render(t){BOIL=Math.floor(t/0.15);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.filter='none';
  ctx.save();if(t<0.5){const k=eOut(clamp(t/0.5));ctx.translate(nz(t*60,1)*14*(1-k),nz(t*55,2)*14*(1-k));ctx.translate(CX,CY);ctx.scale(lerp(1.06,1,k),lerp(1.06,1,k));ctx.translate(-CX,-CY);}
  (t<3.95?A:t<6.85?B:t<10.2?C:t<13.45?D:t<16.3?E:t<17.95?F:G)(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);if(t<17.95)caps(t);}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
