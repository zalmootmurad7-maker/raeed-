// ===== Ink & Atoms — Ep 10 "What If You Jumped on Every World in the Solar System?" =====
// Owner spec: white paper, 6px black ink, soft grey hatching, ONE red (#E53935) for the shirt, trajectories, counters, stamps.
// Motion posterized to 10 fps; counters (height / air time) update at the real 24 fps clock (TREAL).
const R10='#E53935';let TREAL=0;const V0=3.13;
function wa(word,after=0){for(const[x,s]of ALW)if(x===word&&s>=after-0.01)return s;return after;}
function shk(t,t0,amp=18,d=0.35){if(t<t0||t>t0+d)return;const k=amp*(1-(t-t0)/d);ctx.translate(nz(Math.floor(t*10)*3,3)*k,nz(Math.floor(t*10)*3,4)*k);}
function ink(s,x,y,size,col=INK,o={}){return txt(s,x,y,size,{col,maxW:1760,stroke:Math.max(8,size*0.22),strokeCol:'#fff',...o});}
function stamp10(s,x,y,size,t,t0,col=R10){if(t<t0)return;const k=(t-t0)<0.1?1.6:(t-t0)<0.2?1.12:1;ctx.save();ctx.translate(x,y);ctx.rotate(-0.04);ctx.scale(k,k);ctx.font=`${size}px "PH"`;const w=ctx.measureText(s).width;
  rrect(-w/2-30,-size*0.62,w+60,size*1.24,10,{w:8,col,fill:'#fff',seed:5001,amp:1.5});txt(s,0,4,size,{col});ctx.restore();}
function hatchRect(x,y,w,h,{dens=16,col='rgba(136,136,136,0.35)',lw=2}={}){ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.strokeStyle=col;ctx.lineWidth=lw;for(let i=-h;i<w;i+=dens){ctx.beginPath();ctx.moveTo(x+i,y+h);ctx.lineTo(x+i+h,y);ctx.stroke();}ctx.restore();}
function groundL(y,{x0=-60,x1=W+60,hatchH=60}={}){hatchRect(x0,y,x1-x0,hatchH);line(x0,y,x1,y,{w:6,col:INK,seed:5010,amp:1.5});}
// stick figure with the red t-shirt. pose: idle|crouch|air|land|wave|point|flap|swim ; mood: happy|shock|strain|deadpan
function fig(x,y,s,t,{pose='idle',mood='happy',lean=0,suit=false,scarf=false}={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(lean);const w=6/s*1.0;
  const sq=pose==='land'?0.82:pose==='crouch'?0.86:1;ctx.scale(pose==='land'?1.15:1,sq);
  const hip=-105,neck=-235,hy=-280,hr=42;
  const legs={idle:[[-34,0],[34,0]],crouch:[[-48,-40,-40,0],[48,-40,40,0]],air:[[-40,-70,-30,-20],[40,-60,30,-10]],land:[[-55,-35,-45,0],[55,-35,45,0]],wave:[[-34,0],[34,0]],point:[[-34,0],[34,0]],flap:[[-30,-30,-24,10],[30,-30,24,10]],swim:[[-50,-50,-80,-20],[40,-60,70,-30]]}[pose];
  for(const L of legs){if(L.length===2)line(0,hip,L[0],L[1],{w,col:INK,seed:5101});else{line(0,hip,L[0],L[1],{w,col:INK,seed:5102});line(L[0],L[1],L[2],L[3],{w,col:INK,seed:5103});}}
  const arms={idle:[[-60,-150],[60,-150]],crouch:[[-70,-120],[70,-120]],air:[[-80,-300],[80,-300]],land:[[-90,-160],[90,-160]],wave:[[-60,-150],[90,-320]],point:[[-60,-150],[120,-260]],flap:[[-150,-260+Math.sin(t*40)*50],[150,-260+Math.sin(t*40)*50]],swim:[[-140,-220],[140,-180]]}[pose];
  for(const[ax,ay]of arms)line(0,neck+20,ax,ay,{w,col:INK,seed:5104});
  if(suit){ell(0,-170,78,95,{w,col:INK,fill:'#f2f2f2',seed:5105,amp:1});rrect(-60,-250,120,40,10,{w,col:INK,fill:'#fff',seed:5106});}
  else poly([[-38,neck+5],[38,neck+5],[60,neck+40],[44,neck+52],[34,neck+40],[30,hip+10],[-30,hip+10],[-34,neck+40],[-44,neck+52],[-60,neck+40]],{w:w*0.8,col:INK,fill:R10,close:true,seed:5107,amp:1});
  if(scarf)poly([[-30,neck+2],[30,neck+2],[34,neck+16],[-34,neck+16]],{w:w*0.7,col:INK,fill:R10,close:true,seed:5108});
  ell(0,hy,hr,hr,{w,col:INK,fill:'#fff',seed:5109,amp:1});if(suit)ell(0,hy,hr+16,hr+16,{w:w*0.7,col:INK,seed:5110,amp:0.6});
  ctx.fillStyle=INK;if(mood==='happy'){for(const ex of[-14,14]){ctx.beginPath();ctx.arc(ex,hy-6,5,0,TAU);ctx.fill();}ctx.lineWidth=w*0.7;ctx.strokeStyle=INK;ctx.beginPath();ctx.arc(0,hy+6,16,0.15*Math.PI,0.85*Math.PI);ctx.stroke();}
  else if(mood==='deadpan'){for(const ex of[-14,14])line(ex-7,hy-6,ex+7,hy-6,{w:w*0.7,seed:5111,amp:0.3});line(-12,hy+18,12,hy+18,{w:w*0.7,seed:5112,amp:0.3});}
  else if(mood==='strain'){line(-24,hy-14,-6,hy-4,{w:w*0.7,seed:5113,amp:0.3});line(24,hy-14,6,hy-4,{w:w*0.7,seed:5114,amp:0.3});line(-14,hy+18,14,hy+18,{w:w*0.9,seed:5115,amp:0.3});
    for(const sd of[-1,1])for(let k=0;k<3;k++)line(sd*(hr+10),hy-20+k*14,sd*(hr+28),hy-26+k*14,{w:3/s*1.2,col:R10,seed:5116+k,amp:0.5});}
  else{for(const ex of[-14,14]){ctx.beginPath();ctx.arc(ex,hy-8,6.5,0,TAU);ctx.fill();}ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,hy+18,10,14,0,0,TAU);ctx.fill();ctx.lineWidth=w*0.7;ctx.strokeStyle=INK;ctx.stroke();}
  ctx.restore();}
// ballistic jump: height in metres at sim time tau
function hJ(g,tau){return Math.max(0,V0*tau-0.5*g*tau*tau);}
// one jump on one world: gx,gy = ground point; ppm = pixels per metre; tj = take-off time (video s); sp = sim speed-up
function jumpAt(t,{g,tj,gx,gy,ppm,s=1,sp=1,ruler=true,hud=true,hudX=null,hudY=150,label='',maxLabel=true,props=null,pose=null,mood=null,ticks=null}){
  const tr=TREAL,T=2*V0/g;const tauV=(t-tj)*sp,tauR=(tr-tj)*sp;const h=(tauV>0&&tauV<T)?hJ(g,tauV):0;const hmax=V0*V0/(2*g);
  if(props)props();
  const fy=gy-h*ppm;let p='idle',m='happy';if(tauV>-0.3/sp&&tauV<=0)p='crouch';else if(tauV>0&&tauV<T)p='air';else if(tauV>=T&&tauV<T+0.35*sp)p='land';if(g>15&&tauV>-0.4&&tauV<T+0.6)m='strain';
  if(ruler&&tauV>0){ctx.save();ctx.setLineDash([16,12]);ctx.strokeStyle=R10;ctx.lineWidth=6;const hh=tauV<T/2?h:hmax;ctx.beginPath();ctx.moveTo(gx+110*s,gy);ctx.lineTo(gx+110*s,gy-hh*ppm);ctx.stroke();ctx.restore();
    if(tauV>=T/2){line(gx+60*s,gy-hmax*ppm,gx+170*s,gy-hmax*ppm,{w:6,col:R10,seed:5201,amp:0.6});if(maxLabel)ink('*MAX: '+fmtM(hmax),gx+190*s,gy-hmax*ppm,Math.max(40,46*s),R10,{align:'left'});}}
  fig(gx,fy,s,t,{pose:pose||p,mood:mood||m});
  if(hud){const hx=hudX??gx;const hr=(tauR>0&&tauR<T)?hJ(g,tauR):0;const at=clamp(tauR,0,T);
    ink(tauR>=T/2&&tauR>0?'*MAX HEIGHT: '+fmtM(hmax):'HEIGHT: '+fmtM(tauR>0?hr:0),hx,hudY,52,R10);ink('AIR TIME: '+fmtT(tauR>0?at:0),hx,hudY+62,44,INK);}
  if(label)ink(label,gx,gy+110,64,INK);}
function fmtM(m){return m>=1000?(m/1000).toFixed(1)+' km':m>=100?Math.round(m)+' m':m.toFixed(2)+' m';}
function fmtT(s){if(s>=60){const mm=Math.floor(s/60),ss=Math.floor(s%60);return mm+' MIN '+String(ss).padStart(2,'0')+' S';}return s.toFixed(2)+' s';}
// props (black ink)
function crate(x,y,h){rrect(x-h/2,y-h,h,h,4,{w:6,col:INK,fill:'#fff',seed:5301});line(x-h/2,y-h,x+h/2,y,{w:4,seed:5302});line(x+h/2,y-h,x-h/2,y,{w:4,seed:5303});}
function can(x,y,h){rrect(x-h*0.28,y-h,h*0.56,h,6,{w:5,col:INK,fill:'#fff',seed:5311});line(x-h*0.28,y-h*0.85,x+h*0.28,y-h*0.85,{w:3,seed:5312});}
function car(x,y,L){const h=L*0.3;poly([[x-L/2,y-h*0.25],[x-L/2,y-h*0.6],[x-L*0.25,y-h*0.65],[x-L*0.12,y-h],[x+L*0.2,y-h],[x+L*0.32,y-h*0.62],[x+L/2,y-h*0.55],[x+L/2,y-h*0.25]],{w:6,col:INK,fill:'#fff',close:true,seed:5321});
  for(const dx of[-0.3,0.3])ell(x+dx*L,y-h*0.2,h*0.2,h*0.2,{w:6,col:INK,fill:'#fff',seed:5322});}
function hoop(x,y,ppm){const top=y-3.05*ppm;line(x,y,x,top-0.9*ppm,{w:8,seed:5331});rrect(x-0.05*ppm,top-1.0*ppm,0.12*ppm,1.05*ppm,4,{w:6,fill:'#fff',seed:5332});ell(x-0.35*ppm,top,0.25*ppm,0.06*ppm,{w:6,col:R10,seed:5333});}
function house(x,y,h){const w=h*0.9;rrect(x-w/2,y-h*0.72,w,h*0.72,4,{w:6,col:INK,fill:'#fff',seed:5341});poly([[x-w/2-20,y-h*0.72],[x,y-h],[x+w/2+20,y-h*0.72]],{w:6,col:INK,fill:'#fff',close:true,seed:5342});
  for(const[dx,dy]of[[-0.25,0.5],[0.25,0.5],[-0.25,0.22],[0.25,0.22]])rrect(x+dx*w-h*0.06,y-h*dy-h*0.06,h*0.12,h*0.12,2,{w:4,seed:5343});rrect(x+w*0.3,y-h*0.98,h*0.06,h*0.16,2,{w:4,fill:'#fff',seed:5344});}
function giraffe(x,y,h){const k=h/5.5;for(const dx of[-0.55,-0.25,0.25,0.55])line(x+dx*k,y,x+dx*k,y-1.7*k,{w:9,seed:5352});ell(x,y-2.05*k,0.85*k,0.42*k,{w:6,fill:'#fff',seed:5353});
  poly([[x+0.45*k,y-2.25*k],[x+0.95*k,y-4.6*k],[x+1.2*k,y-4.55*k],[x+0.75*k,y-2.0*k]],{w:6,fill:'#fff',close:true,seed:5354});ell(x+1.2*k,y-4.75*k,0.38*k,0.2*k,{w:6,fill:'#fff',seed:5355});
  for(const dx of[0.05,0.25])line(x+(1.05+dx)*k,y-4.9*k,x+(1.0+dx)*k,y-5.25*k,{w:5,seed:5357});line(x-0.85*k,y-2.1*k,x-1.05*k,y-1.5*k,{w:4,seed:5358});
  for(let i=0;i<7;i++)ell(x-0.5*k+i*0.17*k,y-2.05*k+((i%2)?0.12:-0.1)*k,0.08*k,0.07*k,{w:3,fill:'#888',seed:5360+i});for(let i=0;i<4;i++)ell(x+(0.7+i*0.11)*k,y-(2.6+i*0.55)*k,0.06*k,0.06*k,{w:3,fill:'#888',seed:5370+i});}
function burj(x,y,h){const w=h*0.12;poly([[x-w/2,y],[x-w*0.35,y-h*0.35],[x-w*0.2,y-h*0.6],[x-w*0.08,y-h*0.82],[x,y-h],[x+w*0.08,y-h*0.82],[x+w*0.2,y-h*0.6],[x+w*0.35,y-h*0.35],[x+w/2,y]],{w:5,col:INK,fill:'#fff',close:true,seed:5361});ink('BURJ KHALIFA 828 m',x,y-h-40,40,INK);}
function wadlow(x,y,h){ctx.save();ctx.translate(x,y);const s=h/300;ctx.scale(s,s);ctx.globalAlpha=0.9;line(0,-110,0,-235,{w:30,col:'#333',seed:5371});line(0,-110,-25,0,{w:22,col:'#333',seed:5372});line(0,-110,25,0,{w:22,col:'#333',seed:5373});
  line(0,-225,-45,-120,{w:16,col:'#333',seed:5374});line(0,-225,45,-120,{w:16,col:'#333',seed:5375});ell(0,-268,32,36,{w:6,col:'#333',fill:'#333',seed:5376});ctx.restore();}
function platform(x,y,w){rrect(x-w/2,y,w,26,4,{w:6,col:INK,fill:'#ddd',seed:5381});for(let i=0;i<6;i++)ell(x-w/2+20+i*(w-40)/5,y+13,5,5,{w:3,fill:INK,seed:5382+i});line(x-w*0.35,y+26,x-w*0.45,y+130,{w:5,seed:5390});line(x+w*0.35,y+26,x+w*0.45,y+130,{w:5,seed:5391});}
function clouds(y0,h,t,{dark=0.35}={}){for(let i=0;i<6;i++){const yy=y0+i*h/6,off=(t*40*(i%2?1:-1))%400;ctx.save();ctx.strokeStyle=`rgba(120,120,120,${dark})`;ctx.lineWidth=3;for(let x=-400+off;x<W+400;x+=26){ctx.beginPath();ctx.moveTo(x,yy+h/6);ctx.lineTo(x+40,yy);ctx.stroke();}ctx.restore();}}
function dial(x,y,r,val,max=200,label='KG'){ell(x,y,r,r,{w:7,fill:'#fff',seed:5401});for(let i=0;i<=10;i++){const a=Math.PI*0.75+i/10*Math.PI*1.5;line(x+Math.cos(a)*r*0.8,y+Math.sin(a)*r*0.8,x+Math.cos(a)*r*0.95,y+Math.sin(a)*r*0.95,{w:4,seed:5402+i});}
  const a=Math.PI*0.75+clamp(val/max)*Math.PI*1.5;line(x,y,x+Math.cos(a)*r*0.78,y+Math.sin(a)*r*0.78,{w:8,col:R10,seed:5420});ink(Math.round(val)+' '+label,x,y+r*0.45,r*0.32,R10);}
function arrowI(x1,y1,x2,y2,{col=INK,w=6,head=24,seed=5501}={}){line(x1,y1,x2,y2,{w,col,seed});const a=Math.atan2(y2-y1,x2-x1);poly([[x2-Math.cos(a-0.45)*head,y2-Math.sin(a-0.45)*head],[x2,y2],[x2-Math.cos(a+0.45)*head,y2-Math.sin(a+0.45)*head]],{w,col,seed:seed+1});}
function potato(x,y,rx,ry,seed=5601,{fill='#fff'}={}){const R=rng(seed),p=[];for(let i=0;i<28;i++){const a=i/28*TAU;const k=0.82+R()*0.3;p.push([x+Math.cos(a)*rx*k,y+Math.sin(a)*ry*k]);}poly(p,{w:6,col:INK,fill,close:true,seed,amp:1.5});craters(x,y,Math.min(rx,ry),5,seed%97);}
function duck(x,y,s){const E=[[x-60*s,y+20*s,110*s,80*s],[x+80*s,y-50*s,70*s,55*s]];for(const[a,b,c,d]of E)ell(a,b,c,d,{w:0,fill:'#fff',seed:5701});ctx.save();ctx.beginPath();for(const[a,b,c,d]of E){ctx.moveTo(a+c,b);ctx.ellipse(a,b,c,d,0,0,TAU);}ctx.clip();hatchRect(x-180*s,y-120*s,340*s,220*s,{dens:20});ctx.restore();for(const[a,b,c,d]of E)ell(a,b,c,d,{w:6,seed:5701});}
function clockFF(x,y,r,t,speed){ell(x,y,r,r,{w:6,fill:'#fff',seed:5801});const a=-Math.PI/2+t*speed;line(x,y,x+Math.cos(a)*r*0.8,y+Math.sin(a)*r*0.8,{w:6,col:R10,seed:5802});line(x,y,x+Math.cos(a/12)*r*0.5,y+Math.sin(a/12)*r*0.5,{w:8,seed:5803});ink('▶▶',x,y+r+40,40,R10);}
function speedBar(x,y,w,val,max,mark,label){rrect(x,y,w,40,10,{w:6,fill:'#fff',seed:5901});ctx.fillStyle=R10;ctx.fillRect(x+6,y+6,(w-12)*clamp(val/max),28);const mx=x+w*mark/max;ctx.save();ctx.setLineDash([10,8]);line(mx,y-40,mx,y+80,{w:5,col:INK,seed:5902});ctx.restore();ink(label,mx,y-70,40,INK);}
