import re, json
def extract(src, name):
    i=src.index(f"function {name}(")
    j=src.find("\nfunction ",i+10)
    k=src.find("\nconst ",i+10)
    ends=[e for e in (j,k) if e!=-1]
    return src[i:min(ends)]+"\n"
v2=open('../v2/reel_scenes.js').read(); v3=open('../v3/reel3_scenes.js').read()
funcs="".join(extract(v2,n) for n in ['ringV','vB','vI'])
r=[extract(v3,n) for n in ['r1','r2','r5','r6','r7','r13','r14']]
# cold open for the black-hole hooks: everything fully drawn from frame 0
r[0]=r[0].replace("txt(s,CX,520+i*165,150,{k:writeK(t,0.16+i*0.55,s,20)})","txt(s,CX,520+i*165,150,{})").replace("txt('TONS',CX,1050,190,{k:writeK(t,1.95,'TONS',10),col:RED})","txt('TONS',CX,1050,190,{col:RED})").replace("if(t>2.2)txt('(THE ENTIRE MOON)',CX,1220,66,{a:P(t,2.2,2.9)});","txt('(THE ENTIRE MOON)',CX,1220,66,{});")
assert "writeK(t,0.16" not in r[0]
r[1]=r[1].replace("{s:pop(t,7.3),seed:5301}","{seed:5301}").replace("txt('TONIGHT:',CX,330,100,{k:writeK(t,7.35,'TONIGHT:',20),col:RED});","txt('TONIGHT:',CX,330,100,{col:RED});").replace("txt('THE MOON BECOMES',CX,1300,96,{k:writeK(t,8.6,'THE MOON BECOMES',34)});txt('A BLACK HOLE',CX,1420,120,{k:writeK(t,9.5,'A BLACK HOLE',24),col:RED});","txt('THE MOON BECOMES',CX,1300,96,{});txt('A BLACK HOLE',CX,1420,120,{col:RED});")
assert "writeK" not in r[1]
funcs+="".join(r)
head=open('../v2/reel_head.html').read()
g3=open('../v3/scenes3.js').read().split('// ---------- scenes ----------')[0]
new=open('shorts_new.js').read()
SHORTS={
 'bh1_nothing_changes':dict(src='v3',segs=[[0,10.45],[32.15,41.85],[51.85,56.45]],card=None),
 'bh2_spaghettification':dict(src='v3',segs=[[7.25,10.45],[100.45,102.05],[103.25,120.25]],card=None),
 'am_landing':dict(src='v2',segs=[[8.45,11.95],[98.15,111.4]],card='lander'),
 'am_evil_twin':dict(src='v2',segs=[[15.4,18.7],[19.0,23.95],[45.85,55.3]],card='twinQ'),
 'bh_no_eclipses':dict(src='v3',segs=[[75.95,79.5],[64.1,75.9],[79.5,82.8]],card='eclipseQ'),
 'bh_colder_than_space':dict(src='v3',segs=[[120.3,135.85]],card='colderQ'),
}
tail=r'''
function sceneFor(t){if(CFG.src==='v2'){if(t<12.4)return vB;if(t<19.0)return sCv;if(t<23.9)return sDv;if(t<55.3)return vI;return sNv;}
  if(t<7.2)return r1;if(t<16.4)return r2;if(t<40.0)return r5;if(t<41.8)return r6;if(t<56.8)return r7;if(t<66.4)return s9v1;if(t<75.9)return s9v2;if(t<82.8)return s10v;if(t<116.4)return r13;if(t<120.3)return r14;return s15v;}
const SH={v2:[[50.99,14,6],[53.27,22,4],[105.93,40,3]],v3:[[0.16,12,6],[3.35,18,5],[10.05,10,6],[40.33,8,6],[111.3,8,3]]};
function shakeS(t){let x=0,y=0;for(const[t0,a,d]of SH[CFG.src]){if(t>=t0&&t-t0<3){const k=a*Math.exp(-(t-t0)*d);x+=nz(t*50,t0)*k;y+=nz(t*47,t0+3)*k;}}if(CFG.src==='v3'&&t>111.3&&t<116.3){const k=P(t,111.3,116)*7;x+=nz(t*60,1)*k;y+=nz(t*55,2)*k;}return[x,y];}
const REEL_LEN=CFG.segs.reduce((a,[s,e])=>a+(e-s),0),CARD_T=({twinQ:1.4,eclipseQ:1.0,colderQ:1.25})[CFG.card]||1.2,LIKE_T=2.0;
function render(tr){
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.setLineDash([]);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let acc=0,t=CFG.segs[CFG.segs.length-1][1]-0.001,segStart=0;for(const[s,e]of CFG.segs){if(tr<acc+(e-s)){t=s+(tr-acc);segStart=acc;break;}acc+=e-s;}
  const[sx,sy]=shakeS(t);ctx.save();ctx.translate(sx,sy);
  if(CFG.intro&&tr<0.45){const k=eBack(clamp(tr/0.45));ctx.translate(nz(tr*60,1)*14*(1-k),nz(tr*55,2)*14*(1-k));cam(lerp(0.78,1,k));}
  if(CFG.card&&tr<CARD_T){cam(1+0.04*tr);CARDS[CFG.card](tr);}else{cam(1+0.03*clamp((tr-segStart)/6));sceneFor(t)(t);}
  ctx.restore();
  if(tr>REEL_LEN-LIKE_T){ctx.setTransform(1,0,0,1,0,0);likeBanner(tr-(REEL_LEN-LIKE_T));}
}
window.render=render;window.REEL_LEN=REEL_LEN;
window.ready=Promise.all([document.fonts.load('40px "PH"'),document.fonts.load('40px "PHL"')]).then(()=>document.fonts.ready);
</script></body></html>
'''
for n in ('am_evil_twin','bh_no_eclipses','bh_colder_than_space'): SHORTS[n]['intro']=True
for name,cfg in SHORTS.items():
    open(f'{name}.html','w').write(head+"\n"+g3+"\n"+f"const CFG={json.dumps(cfg)};\n"+funcs+new+tail)
    print(name, round(sum(e-s for s,e in cfg['segs']),2),'s')
json.dump(SHORTS,open('shorts.json','w'))
