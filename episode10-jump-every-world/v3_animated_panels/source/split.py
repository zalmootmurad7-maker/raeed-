# Split each Gemini panel into: base (static), pop layers (red stamps/labels), arc slices (red dashed paths), floating figures.
import json,os,numpy as np
from PIL import Image
from scipy import ndimage as ndi
SRC='../bundle_in/panels';OUT='layers';os.makedirs(OUT,exist_ok=True)
PN=json.load(open('../ep10g/panels.json'));DUR=506.07
FIXR={'53':[[946,48,100,52],[978,116,165,44]],'33':[[1133,423,210,142]],'42':[[783,702,318,58]],'45':[[783,702,318,58]],'48':[[1238,22,120,48]],'71':[[232,640,100,48],[1250,640,96,48]],'38':[[666,551,88,42]]}
FLOAT={'02':(1.3,1.2,1.6),'28':(1.3,1.2,1.6),'08':(1.0,1.0,2.4),'42':(1.95,0.9,1.7),'45':(1.95,0.9,1.7),'48':(2.6,1.3,1.6),'49':(1.6,1.3,1.6),'50':(1.8,1.3,1.6),'56':(1.4,1.2,1.4),'59':(1.6,1.3,1.6),'64':(1.4,1.2,1.4),'68':(1.5,1.2,1.6),'70':(1.5,1.2,1.5),'outro_b':(1.5,1.4,1.7),'06':(1.4,1.2,1.4)}
def disk(r):y,x=np.ogrid[-r:r+1,-r:r+1];return x*x+y*y<=r*r
man={}
for i,(p,t0,mode) in enumerate(PN):
    t1=PN[i+1][1] if i+1<len(PN) else DUR;d=t1-t0
    fn=os.path.join(SRC,(p if p.startswith('outro') else 'panel_'+p)+'.jpg')
    a=np.asarray(Image.open(fn).convert('RGB')).astype(int);H,W=a.shape[:2];r,g,b=a[...,0],a[...,1],a[...,2]
    red=(r>140)&(r-g>55)&(r-b>45)
    pink=(r>150)&(r-g>28)&(r-b>20)
    full=red|pink
    solid=ndi.binary_opening(red,structure=disk(6));slab,sn=ndi.label(solid);sobj=ndi.find_objects(slab)
    grp=ndi.binary_dilation(full,structure=disk(9));lab,n=ndi.label(grp);objs=ndi.find_objects(lab)
    fixmask=np.zeros((H,W),bool)
    for x,y,w,h in FIXR.get(p,[]):fixmask[max(0,y-6):y+h+6,max(0,x-6):x+w+6]=True
    base=a.copy();pops=[];arcs=[];shirts=[]
    for k,sl in enumerate(objs):
        gm=(lab[sl]==k+1);m=gm&full[sl];cnt=m.sum()
        if cnt<15:continue
        ys,xs=sl;y0,x0=ys.start,xs.start;h,w=m.shape
        ids=[v for v in np.unique(slab[sl][gm]) if v>0]
        sizes=[(sobj[v-1][0].stop-sobj[v-1][0].start,sobj[v-1][1].stop-sobj[v-1][1].start,(slab[sobj[v-1]]==v).sum()) for v in ids]
        solid_px=sum(z[2] for z in sizes)
        if len(ids)in(1,2) and max(max(z[0],z[1]) for z in sizes)<=200 and solid_px>0.4*cnt:
            shirts.append((sl,ids));continue
        if fixmask[sl][m].any():continue
        keep=np.zeros_like(m)
        if len(ids)<=2:
            for v in ids:
                bh,bw,_=sizes[ids.index(v)]
                if max(bh,bw)<=200:keep|=ndi.binary_dilation(slab[sl]==v,structure=disk(3))&gm
        m=m&~keep;cnt=m.sum()
        if cnt<15:continue
        fill=cnt/(h*w)
        sub=a[sl];alpha=np.clip((sub[...,0]-np.minimum(sub[...,1],sub[...,2])-15)/90,0,1)*m
        rgba=np.dstack([sub,(alpha*255).astype(np.uint8)]).astype(np.uint8)
        wipe=ndi.binary_dilation(m,structure=disk(2))&~((sub.mean(2)<90)&~full[sl])&~keep
        bsub=base[sl];bsub[wipe]=255;base[sl]=bsub
        if max(w,h)>220 and fill<0.09:
            yy,xx=np.nonzero(m);prm=(xx-xx.min())/max(1,xx.max()-xx.min()) if w>=h else (yy.max()-yy)/max(1,yy.max()-yy.min())
            sl_list=[]
            for q in range(12):
                sel=np.zeros_like(m);ii=(prm>=q/12)&(prm<=(q+1)/12+1e-6);sel[yy[ii],xx[ii]]=True
                if not sel.any():continue
                sy,sx=np.nonzero(sel);c=rgba[sy.min():sy.max()+1,sx.min():sx.max()+1].copy();c[...,3]=c[...,3]*sel[sy.min():sy.max()+1,sx.min():sx.max()+1]
                f='%s_a%d_%d.png'%(p,k,q);Image.fromarray(c).save(os.path.join(OUT,f));sl_list.append([f,int(x0+sx.min()),int(y0+sy.min())])
            arcs.append({'x':int(x0),'slices':sl_list})
        else:
            f='%s_p%d.png'%(p,k);Image.fromarray(rgba).save(os.path.join(OUT,f));pops.append({'f':f,'x':int(x0),'y':int(y0),'w':int(w),'h':int(h)})
    # floating figures (whitelisted panels): the largest shirt blob, box isolated on white
    figs=[]
    if p in FLOAT and shirts:
        best=None
        for sl,ids in shirts:
            for v in ids:
                o=sobj[v-1];ar=(slab[o]==v).sum()
                if best is None or ar>best[0]:best=(ar,o)
        o=best[1];ys,xs=o;hs,ws=ys.stop-ys.start,xs.stop-xs.start;cx=(xs.start+xs.stop)/2
        fx0=int(max(0,cx-FLOAT[p][0]*ws));fx1=int(min(W,cx+FLOAT[p][0]*ws));fy0=int(max(0,ys.start-FLOAT[p][1]*hs));fy1=int(min(H,ys.stop+FLOAT[p][2]*hs))
        box=base[fy0:fy1,fx0:fx1].copy();lum=box.mean(2);alpha=np.clip((250-lum)/40,0,1)
        rgba=np.dstack([box,(alpha*255)]).astype(np.uint8);f='%s_fig.png'%p;Image.fromarray(rgba).save(os.path.join(OUT,f))
        base[fy0:fy1,fx0:fx1]=255;figs.append({'f':f,'x':fx0,'y':fy0,'w':fx1-fx0,'h':fy1-fy0})
    Image.fromarray(base.astype(np.uint8)).save(os.path.join(OUT,'%s_base.jpg'%p),quality=93)
    # schedule (absolute seconds)
    els=sorted([('arc',e['x'],e) for e in arcs]+[('pop',e['x'],e) for e in pops],key=lambda z:z[1])
    n=max(1,len(els));gap=min(0.55,max(0.18,(d*0.45)/n));t=t0+0.35
    for kind,_,e in els:
        e['t']=round(t,3)
        if kind=='arc':e['dur']=round(min(1.3,max(0.6,d*0.25)),3);t+=gap*1.4
        else:t+=gap
    man[p]={'base':'%s_base.jpg'%p,'pops':pops,'arcs':arcs,'figs':figs}
    print(p,'pops',len(pops),'arcs',len(arcs),'figs',len(figs))
json.dump(man,open('manifest.json','w'))
