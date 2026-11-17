from PIL import Image, ImageDraw
import numpy as np, math
from scipy import ndimage as nd
im=Image.open('phobos.webp').convert('RGB');A=np.asarray(im).astype(float);H,W=A.shape[:2]
BG=np.array([76,79,81])
def compmask(x0,y0,x1,y1,thr=28):
    C=A[y0:y1,x0:x1];d=np.abs(C-BG).max(2)>thr
    lab,n=nd.label(nd.binary_dilation(d,iterations=3));sizes=nd.sum(d,lab,range(1,n+1));k=np.argmax(sizes)+1
    m=nd.binary_fill_holes(lab==k);M=np.zeros((H,W),bool);M[y0:y1,x0:x1]=m;return M
FM=compmask(440,30,760,400);fy,fx=np.where(FM);fb=(fx.min(),fy.min(),fx.max()+1,fy.max()+1)
fig=im.crop(fb);fa=Image.fromarray((FM[fb[1]:fb[3],fb[0]:fb[2]]*255).astype('uint8'))
TM=compmask(480,415,680,972);TM[972:1025,528:623]=True;TM[1025:1045,518:631]=True;TM[1045:1069,497:655]=True
ty,tx=np.where(TM);tb=(tx.min(),ty.min(),tx.max()+1,ty.max()+1)
tower=im.crop(tb);ta=Image.fromarray((TM[tb[1]:tb[3],tb[0]:tb[2]]*255).astype('uint8'))
out=A.copy();yy=np.arange(H)[:,None]
E=nd.binary_dilation(FM|(TM&(yy<990)),iterations=5)
red=(A[:,:,0]>150)&(A[:,:,1]<120)&(A[:,:,2]<120);E|=nd.binary_dilation(red&(yy<1000),iterations=4)
out[E]=BG
# ground under the old tower: sky above the horizon, then blend left/right ground columns (aligned on horizon)
XL,XR=470,694;HL,HR=989,970;TH=8
R=np.random.default_rng(3)
for x in range(XL,XR):
    t=(x-XL)/(XR-XL);h=HL+(HR-HL)*t;w=min(1,(x-XL+1)/10,(XR-x)/10)
    for y in range(930,1125):
        if y<h: c=BG
        elif y<h+TH: c=np.array([22.,22.,22.])
        else:
            k=y-h;yl=int(min(1124,HL+k));yr=int(min(1124,HR+k))
            c=A[yl,XL-1]*(1-t)+A[yr,XR]*t
            c=np.clip(c*0.5+np.array([226.,226.,226.])*0.5+R.normal(0,2),0,255) if c.mean()<120 else c
        out[y,x]=out[y,x]*(1-w)+c*w
O=Image.fromarray(out.astype('uint8'))
s=0.65;tw,th_=tower.size;nt=tower.resize((int(tw*s),int(th_*s)),Image.LANCZOS);na=ta.resize(nt.size,Image.LANCZOS)
cx=(tb[0]+tb[2])/2;O.paste(nt,(int(cx-nt.size[0]/2),tb[3]-nt.size[1]),na);tip=tb[3]-nt.size[1]
fs=1.8;fw,fh=fig.size;nf=fig.resize((int(fw*fs),int(fh*fs)),Image.LANCZOS);nfa=fa.resize(nf.size,Image.LANCZOS)
fbot=tip-18;fx0=int(575-nf.size[0]/2)+10;fy0=fbot-nf.size[1];foot=(fx0+int((505-fb[0])*fs),fbot-25)
d=ImageDraw.Draw(O);p0=(285,1040);c=(p0[0]-10,foot[1]+40);pts=[]
for i in range(201):
    t=i/200;pts.append(((1-t)**2*p0[0]+2*(1-t)*t*c[0]+t*t*foot[0],(1-t)**2*p0[1]+2*(1-t)*t*c[1]+t*t*foot[1]))
acc=[0]
for i in range(1,len(pts)):acc.append(acc[-1]+math.dist(pts[i-1],pts[i]))
for i in range(1,len(pts)):
    if acc[i]%58<34:d.line([pts[i-1],pts[i]],fill=(214,52,44),width=11)
O.paste(nf,(fx0,fy0),nfa);O.save('phobos_big.png');print('tip',tip,'fig',fx0,fy0,fx0+nf.size[0],fbot,'foot',foot)
