import numpy as np,wave,sys,json
name,segs,hold=sys.argv[1],json.loads(sys.argv[2]),float(sys.argv[3])
w=wave.open('longmix.wav');sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float).reshape(-1,2)/32768
parts=[]
for s,e in segs:
    y=x[int(s*sr):int(e*sr)].copy();a,b=int(0.012*sr),int(0.035*sr);y[:a]*=np.linspace(0,1,a)[:,None];y[-b:]*=np.linspace(1,0,b)[:,None];parts.append(y)
v=np.concatenate(parts);rms=np.sqrt((v**2).mean());pk=np.abs(v).max()
out=v
if hold>0:
    t=np.arange(int(hold*sr))/sr;rng=np.random.default_rng(3)
    hum=(np.sin(2*np.pi*55*t)+0.6*np.sin(2*np.pi*82.4*t)+0.35*np.sin(2*np.pi*110*t))*np.minimum(1,t/0.1)*np.linspace(1,0,len(t))
    hum=hum/np.sqrt((hum**2).mean()+1e-12)*rms*0.3;out=np.concatenate([v,np.stack([hum,hum],1)])
tt=np.arange(int(1.2*sr))/sr;imp=np.sin(2*np.pi*np.cumsum(38+90*np.exp(-tt*8))/sr)*np.exp(-tt*2.6);imp=imp/np.abs(imp).max()*pk*0.30
out[:len(imp)]+=imp[:,None]
o=wave.open(name+'_pre.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((np.clip(out,-1,1)*32767).astype(np.int16).tobytes());o.close()
print(name,'len',round(len(out)/sr,3))
