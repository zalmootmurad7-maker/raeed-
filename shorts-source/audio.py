import json, wave, numpy as np
SH=json.load(open('shorts.json'))
def load(p):
    w=wave.open(p);sr=w.getframerate();return np.frombuffer(w.readframes(w.getnframes()),np.int16).reshape(-1,2).astype(float)/32768,sr
mixes={'v2':load('../v2/mix.wav'),'v3':load('../v3/mix3.wav')}
def impact(sr,d=1.0):
    t=np.arange(int(sr*d))/sr;ph=2*np.pi*np.cumsum(38+80*np.exp(-t*9))/sr
    x=np.sin(ph)*np.exp(-t*3.5)+np.random.default_rng(1).standard_normal(len(t))*np.exp(-t*40)*0.5;return x/np.abs(x).max()
def ding(sr,f=1760,d=0.7):
    t=np.arange(int(sr*d))/sr;return (np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*8))*np.exp(-t*6)*(1-np.exp(-t*800))
for name,cfg in SH.items():
    a,sr=mixes[cfg['src']];parts=[]
    for s,e in cfg['segs']:
        x=a[int(s*sr):int(e*sr)].copy();n1,n2=int(0.015*sr),int(0.05*sr);x[:n1]*=np.linspace(0,1,n1)[:,None];x[-n2:]*=np.linspace(1,0,n2)[:,None];parts.append(x)
    y=np.concatenate(parts);L=len(y)/sr
    imp=impact(sr)*0.45;y[:len(imp)]+=imp[:,None]
    d=ding(sr)*0.18;i=int((L-1.0)*sr);y[i:i+len(d)]+=d[:len(y)-i,None]
    y=np.tanh(y*1.05)/np.tanh(1.05);y*=0.97/np.abs(y).max()
    o=wave.open(f'{name}.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((y*32767).astype(np.int16).tobytes());o.close()
    print(name,round(L,2))
