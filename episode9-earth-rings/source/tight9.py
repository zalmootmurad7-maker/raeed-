import json,wave,numpy as np
def rd(f):
    w=wave.open(f);sr=w.getframerate();return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float),sr
def target(part,e,s,w0,w1,g):
    if part==1:
        if (w0,w1)==('part','snap'):return 0.35
        if e<27.5:return 0.18
        return 0.24
    if part==2:
        if (w0,w1)==('part','now'):return 0.42
        return 0.27
    if part==3:
        if (w0,w1)==('ago','now'):return 0.62
        return 0.27
rep={}
for part in (1,2,3):
    a,sr=rd('p%d.wav'%part);al=json.load(open('a%d.json'%part))
    cuts=[]
    first=al[0][1]
    if first>0.05:cuts.append((0,first-0.03))
    for k in range(len(al)-1):
        w0,_,e=al[k];w1,s,_=al[k+1];g=s-e;t=target(part,e,s,w0,w1,g)
        if g>t+0.03:
            kl=max(0.07,t/2);kr=max(0.07,t-kl)
            cuts.append((e+kl,s-kr))
    out=[];pos=0;f=int(0.01*sr)
    for c0,c1 in cuts:
        i0,i1=int(c0*sr),int(c1*sr)
        if i1-i0<=2*f:continue
        seg=a[pos:i0].copy()
        if len(seg)>f:seg[-f:]*=np.linspace(1,0,f)
        out.append(seg);pos=i1
        nxt=a[pos:pos+f].copy();a[pos:pos+f]=nxt*np.linspace(0,1,f)
    out.append(a[pos:]);y=np.concatenate(out)
    o=wave.open('t%d.wav'%part,'w');o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes(np.clip(y,-32768,32767).astype(np.int16).tobytes());o.close()
    print(part,'%.1f -> %.1f'%(len(a)/sr,len(y)/sr),'cuts',len(cuts))
