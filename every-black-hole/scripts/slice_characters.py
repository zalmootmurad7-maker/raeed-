from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage as nd
NAMES=['explaining','shocked','the_catch','thinking']
X0=[94,402,710,1018]
for mode in ['light','space']:
    im=Image.open(f'public/assets/character_sheet_{mode}.jpg').convert('RGB');A=np.asarray(im).astype(int)
    for k,n in enumerate(NAMES):
        x0,x1,y0,y1=X0[k],X0[k]+262,238,642
        C=A[y0:y1,x0:x1]
        border=np.concatenate([C[0],C[-1],C[:,0],C[:,-1]]);bg=np.median(border,0)
        near=np.abs(C-bg).max(2)<=26
        lab,_=nd.label(near)
        edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
        bgm=np.isin(lab,list(edge))
        if mode=='space':
            blobs=nd.binary_opening(near&~bgm,iterations=3)
            blobs=nd.binary_dilation(blobs,iterations=2)&near
            bgm|=blobs
        fg=~bgm
        fg=nd.binary_opening(fg,iterations=1)
        lab2,n2=nd.label(fg);sizes=nd.sum(fg,lab2,range(1,n2+1))
        keep=np.isin(lab2,[i+1 for i,s in enumerate(sizes) if s>=40])
        ys,xs=np.where(keep);bb=(xs.min(),ys.min(),xs.max()+1,ys.max()+1)
        alpha=Image.fromarray((keep*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.6))
        rgba=Image.fromarray(C.astype('uint8')).convert('RGBA');rgba.putalpha(alpha)
        pad=4;crop=rgba.crop((max(0,bb[0]-pad),max(0,bb[1]-pad),min(C.shape[1],bb[2]+pad),min(C.shape[0],bb[3]+pad)))
        big=crop.resize((crop.width*3,crop.height*3),Image.LANCZOS)
        r,g,b,a=big.split();rgb=Image.merge('RGB',(r,g,b)).filter(ImageFilter.UnsharpMask(2,60,2));big=Image.merge('RGBA',(*rgb.split(),a))
        big.save(f'public/assets/character/{mode}/{n}.png')
        print(mode,n,'bbox',bb,'->',big.size,'touches bottom' if bb[3]>=C.shape[0]-1 else '')
