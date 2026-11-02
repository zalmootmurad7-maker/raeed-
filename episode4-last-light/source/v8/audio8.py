import json, wave, numpy as np, subprocess
SH=json.load(open('shorts8.json'))
w=wave.open('mix4.wav');sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16).reshape(-1,2).astype(float)/32768*10**(-2.4/20)
def impact(d=1.0):
    t=np.arange(int(sr*d))/sr;ph=2*np.pi*np.cumsum(38+80*np.exp(-t*9))/sr
    x=np.sin(ph)*np.exp(-t*3.5)+np.random.default_rng(1).standard_normal(len(t))*np.exp(-t*40)*0.5;return x/np.abs(x).max()
def fade(x):
    n1,n2=int(0.015*sr),int(0.03*sr);x[:n1]*=np.linspace(0,1,n1)[:,None];x[-n2:]*=np.linspace(1,0,n2)[:,None];return x
def rms(x):v=x[:,0];v=v[np.abs(v)>0.02];return np.sqrt(np.mean(v**2))
for n,c in SH.items():
    parts=[]
    for i,(s,e) in enumerate(c['segs']):
        if i==0 and 'newvo' in c:
            s0,e0=c['newvo'];subprocess.run(['ffmpeg','-v','error','-y','-ss',str(s0),'-to',str(e0),'-i','../iss/newvo/raw.wav','-ar',str(sr),'-ac','2','nv.wav'])
            v=wave.open('nv.wav');x=np.frombuffer(v.readframes(v.getnframes()),np.int16).reshape(-1,2).astype(float)/32768
            ref=rms(a[int(4.12*sr):int(6.9*sr)]);x=x*ref/rms(x)*1.05
            need=int((e-s)*sr);x=np.pad(x,((0,max(0,need-len(x))),(0,0)))[:need]
            parts.append(fade(x))
        else: parts.append(fade(a[int(s*sr):int(e*sr)].copy()))
    y=np.concatenate(parts);L=len(y)/sr
    i=impact()*0.35;y[:len(i)]+=i[:,None]
    y=np.tanh(y*1.05)/np.tanh(1.05);y*=0.95/np.abs(y).max()
    o=wave.open(f'{n}_v8.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((y*32767).astype(np.int16).tobytes());o.close();print(n,round(L,2))
