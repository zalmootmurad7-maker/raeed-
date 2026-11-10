// ===== Short: "You could see the back of your own head" (ep. 7 door) — 9:16 ink motion comic, 12 fps, boil 8 fps =====
function T9(s,y,size,col=INK){return txt(s,CX,y,size,{col,maxW:1000,stroke:Math.max(10,size*0.2),strokeCol:'#fff'});}
function S9(s,y,size,col,t,t0){if(t<t0)return;const k=(t-t0)<1/12?1.2:1;ctx.save();ctx.translate(CX,y);ctx.scale(k,k);txt(s,0,0,size,{col,maxW:1000,stroke:Math.max(10,size*0.2),strokeCol:'#fff'});ctx.restore();}
function wt(word,n=0){let c=0;for(const[x,s]of TM.words){if(x===word){if(c===n)return s;c++;}}return 0;}
// stick figure seen from behind (no face) — same proportions as stick()
function back(x,y,s,t,{pose='relax'}={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const w=LW/s*1.1;line(0,-110,0,-230,{w,seed:9501});line(0,-110,-42,0,{w,seed:9502});line(0,-110,42,0,{w,seed:9503});
  const arms={relax:[[-55,-120],[55,-120]],up:[[-80,-300],[80,-300]]}[pose];for(const[ax,ay]of arms)line(0,-200,ax,ay,{w,seed:9504});ell(0,-270,40,40,{w,fill:'#fff',seed:9505,amp:1.2});
  line(-30,-292,-10,-300,{w:w*0.6,seed:9506,amp:0.6});line(8,-302,26,-296,{w:w*0.6,seed:9507,amp:0.6});ctx.restore();} // a few hair strokes = back of the head
// a big looping path (the closed universe) and red light dots running on it (stepped)
function loopPath(cx,cy,rx,ry,{dash=true,col=G3,w=6}={}){ctx.save();if(dash)ctx.setLineDash([22,16]);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,TAU);ctx.stroke();ctx.restore();}
function photonR(x,y,r=12){ctx.fillStyle=RED8;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();ctx.strokeStyle=INK;ctx.lineWidth=3;ctx.stroke();}
// A 0–4.53  "If space loops, light loops too. Including the light bouncing off you."
function A(t){white();const cx=CX,cy=1000,rx=420,ry=300;loopPath(cx,cy,rx,ry);
  const n=t<wt('light')?0:t<wt('including')?6:10;for(let i=0;i<n;i++){const a=i/n*TAU+Math.floor(t*12)/12*1.4;photonR(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,11);}
  stick(cx,cy+ry+10,1.15,t,{pose:t<wt('including')?'relax':'up',mood:t<wt('including')?'curious':'shock'});
  if(t>=wt('bouncing')){for(let i=0;i<3;i++){const u=((Math.floor(t*12)/12-wt('bouncing'))*1.5+i/3)%1;photonR(cx-80-u*300,cy+ry-200-u*120,10);}}
  T9('IF SPACE',300,150);T9('LOOPS…',460,170,RED8);if(t>=wt('light'))S9('LIGHT LOOPS TOO',620,96,INK,t,wt('light'));badge();}
// B 4.58–10.07  "So imagine the universe was small. You look out of the window, straight ahead... and someone is out there."
function B(t){white();if(t<wt('you',1)){const z=snapZ(t,wt('small'),1,0.55);ctx.save();camAt(z,CX,1000);loopPath(CX,1000,420,300);stick(CX,1310,1.15,t,{pose:'relax',mood:'curious'});ctx.restore();
    T9('IMAGINE THE',330,120);T9('UNIVERSE',470,150);if(t>=wt('small'))S9('WAS SMALL',630,150,RED8,t,wt('small'));badge();return;}
  // POV through a round window: someone far away (stepped zoom)
  ell(CX,980,440,440,{w:14,fill:'#fff',seed:9601,amp:2});ell(CX,980,470,470,{w:6,seed:9602,amp:2});
  const z=t<wt('someone')?0.25:t<wt('there')?0.45:0.65;ctx.save();ctx.beginPath();ctx.arc(CX,980,436,0,TAU);ctx.clip();const R=rng(4);ctx.fillStyle=G3;for(let i=0;i<40;i++){ctx.beginPath();ctx.arc(CX-430+R()*860,550+R()*860,3,0,TAU);ctx.fill();}
  if(t>=wt('and',0))back(CX,980+300*z,z*1.8,t);ctx.restore();
  T9('YOU LOOK OUT',300,120);T9('THE WINDOW…',440,120);if(t>=wt('someone'))S9('SOMEONE IS OUT THERE',1530-250,84,RED8,t,wt('someone'));badge();}
// C 10.17–14.72  "It's you. Not a copy. Not a twin. You. From behind."
function C(t){white();const z=t<wt('behind')?snapZ(t,wt('it\'s'),0.7,1):snapZ(t,wt('behind'),1,1.35);ctx.save();camAt(z,CX,966,CX,1070);back(CX,1560,2.2,t);ctx.restore();
  S9("IT'S YOU.",300,190,RED8,t,wt("it's"));
  const strike=(y,t0)=>{if(t>=t0+0.25){line(250,y+6,830,y-2,{w:14,col:RED8,seed:9700+y});}};
  if(t>=wt('not')){T9('NOT A COPY.',500,96);strike(500,wt('copy'));}if(t>=wt('not',1)){T9('NOT A TWIN.',630,96);strike(630,wt('twin'));}
  if(t>=wt('you',3))S9('YOU.',770,150,INK,t,wt('you',3));if(t>=wt('behind'))S9('FROM BEHIND',1290,104,RED8,t,wt('behind'));badge();}
// D 14.82–19.77  "Light from your own back went all the way around the universe... and came back into your eyes."
function D(t){white();const cx=CX,cy=980,rx=430,ry=330;loopPath(cx,cy,rx,ry);
  const px=cx-rx,py=cy;stick(px+30,py+150,0.9,t,{pose:'relax',mood:t>=wt('eyes')?'shock':'curious'});
  const u=clamp((Math.floor(t*12)/12-wt('went'))/(wt('eyes')-wt('went')));if(t>=wt('light')){ctx.save();ctx.strokeStyle=RED8;ctx.lineWidth=10;ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,Math.PI,Math.PI+u*TAU*0.995,false);ctx.stroke();ctx.restore();
    const a=Math.PI+u*TAU*0.995;photonR(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,16);}
  T9('LIGHT FROM',300,120);T9('YOUR OWN BACK',440,130,RED8);if(t>=wt('around'))S9('ALL THE WAY AROUND',560,80,INK,t,wt('around'));if(t>=wt('eyes'))S9('…INTO YOUR EYES',1270,100,RED8,t,wt('eyes'));badge();}
// E 19.77–end  silence → the puzzle card (answered only in the long video)
function E(t){white();const cx=CX,cy=980,rx=430,ry=330;loopPath(cx,cy,rx,ry,{col:G2});stick(cx-rx+30,cy+150,0.9,t,{pose:'up',mood:'shock'});
  if(t>=TM.vend+0.35){rrect(60,250,960,420,30,{w:9,col:RED8,fill:'#fff',seed:9800});txt('SO… DOES SPACE',CX,380,104,{col:INK});txt('REALLY LOOP?',CX,540,130,{col:RED8,maxW:900});}badge();}
// captions (white style): black words, current word red, y 1395
const CAPS=(()=>{const c=[];let cur=[];TM.words.forEach(w=>{if(cur.length&&(w[1]-cur[cur.length-1][2]>0.15||cur.map(x=>x[0]).join(' ').length+w[0].length>17)){c.push(cur);cur=[];}cur.push(w);});if(cur.length)c.push(cur);return c;})();
function caps(t){for(let i=CAPS.length-1;i>=0;i--){const c=CAPS[i],s=c[0][1],e=c[c.length-1][2]+0.3;if(t>=s-0.05&&t<e){const str=c.map(x=>x[0]).join(' ').toUpperCase();let size=84;ctx.save();ctx.font=size+'px "PH"';let w=ctx.measureText(str).width;if(w>940){size*=940/w;ctx.font=size+'px "PH"';w=940;}
  rrect(CX-w/2-26,1395,w+52,size+28,18,{w:5,fill:'#fff',seed:9900});let x=CX-w/2;ctx.textBaseline='middle';for(const[wd,ws]of c){const s2=wd.toUpperCase()+' ';ctx.fillStyle=t>=ws?RED8:INK;ctx.fillText(s2,x,1395+(size+28)/2+2);x+=ctx.measureText(s2).width;}ctx.restore();return;}}}
function render(t){t=Math.floor(t*12+1e-6)/12;BOIL=Math.floor(t*8);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);
  ctx.save();if(t<0.25){const k=t<1/12?1.06:t<2/12?1.03:1;ctx.translate(CX,CY);ctx.scale(k,k);ctx.translate(-CX,-CY);}
  (t<4.55?A:t<10.12?B:t<14.77?C:t<TM.vend?D:E)(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);if(t<TM.vend)caps(t);}
window.render=render;window.ready=document.fonts.load('40px "PH"').then(()=>document.fonts.ready);
</script></body></html>
