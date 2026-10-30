import json, wave, numpy as np
SH=json.load(open('shorts4.json'))
w=wave.open('mix4.wav');sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16).reshape(-1,2).astype(float)/32768*10**(-2.4/20)
def impact(d=1.0):
    t=np.arange(int(sr*d))/sr;ph=2*np.pi*np.cumsum(38+80*np.exp(-t*9))/sr
    x=np.sin(ph)*np.exp(-t*3.5)+np.random.default_rng(1).standard_normal(len(t))*np.exp(-t*40)*0.5;return x/np.abs(x).max()
def ding(f=1760,d=0.7):
    t=np.arange(int(sr*d))/sr;return (np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*8))*np.exp(-t*6)*(1-np.exp(-t*800))
for n,c in SH.items():
    parts=[]
    for s,e in c['segs']:
        x=a[int(s*sr):int(e*sr)].copy();n1,n2=int(0.015*sr),int(0.05*sr);x[:n1]*=np.linspace(0,1,n1)[:,None];x[-n2:]*=np.linspace(1,0,n2)[:,None];parts.append(x)
    y=np.concatenate(parts);L=len(y)/sr
    i=impact()*0.35;y[:len(i)]+=i[:,None];d=ding()*0.15;k=int((L-1.0)*sr);y[k:k+len(d)]+=d[:len(y)-k,None]
    y=np.tanh(y*1.05)/np.tanh(1.05);y*=0.95/np.abs(y).max()
    o=wave.open(f'{n}.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((y*32767).astype(np.int16).tobytes());o.close();print(n,round(L,2))
