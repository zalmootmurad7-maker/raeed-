// Minimal "one absurd situation" thumbnails (test concept) — 640x360 virtual x3, thick ink, one red accent
function drawMin(k){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#fbfbfd';ctx.fillRect(0,0,W,H);ctx.scale(3,3);
  if(k==='A4'){ // high five with your antimatter twin
    txt('HIGH FIVE?',170,52,72,{});
    const S=1.25,G=492;
    const reachR={la:[-0.2,-0.1],ra:[1.62,1.57],ll:[-0.28,-0.22],rl:[0.28,0.22],paper:0};
    const reachL={la:[-1.62,-1.57],ra:[0.2,0.1],ll:[-0.28,-0.22],rl:[0.28,0.22],paper:0};
    figure(190,G,reachR,{s:S,seed:9900});shockFace(190,G-264*S,38*S);
    figure(430,G,reachL,{s:S,seed:9910});horns(430,G,S,1);evilFace(430,G-264*S,38*S);
    // spark between the hands
    const hx=310,hy=G-212*S+2;for(let i=0;i<10;i++){const a=i/10*TAU;line(hx+Math.cos(a)*7,hy+Math.sin(a)*7,hx+Math.cos(a)*(18+(i%2)*8),hy+Math.sin(a)*(18+(i%2)*8),9920+i,1,3,RED);}
    txt('ANTI-YOU',560,92,38,{col:RED});arrow(540,110,488,150,{seed:9930,col:RED,w:3,head:10});
  }else{ // B4: stretched toward the black hole
    const HX=520,HY=205;
    ctx.fillStyle='#000';ctx.beginPath();ctx.arc(HX,HY,22,0,TAU);ctx.fill();circ(HX,HY,34,{seed:9940,w:2.4,dash:[6,6]});
    const Hx=120,Hy=205,r=52;
    for(const[dy,sd]of[[-18,1],[18,2],[-38,3],[38,4]]){const pts=[];for(let i=0;i<=24;i++){const u=i/24;pts.push([lerp(Hx+r,HX-26,u),Hy+dy*(1-u)*(1-u)+Math.sin(u*10+sd)*2*(1-u)]);}strokePts(wob(pts,9950+sd,0.5),1,LW+0.6);}
    circ(Hx,Hy,r+11,{seed:9960,w:3.4});ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(Hx,Hy,r,0,TAU);ctx.fill();circ(Hx,Hy,r,{seed:9961,w:LW+0.6});shockFace(Hx,Hy,r);
    // dimension line + label (the only red)
    arrow(Hx+r+20,112,HX-10,112,{seed:9970,col:RED,w:3.4,head:12,both:true});
    txt('6 KM',(Hx+HX)/2+20,62,96,{col:RED});
  }
}
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready).then(()=>drawMin(window.KIND));
</script></body></html>
