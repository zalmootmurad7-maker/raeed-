import wave, json, numpy as np
w=wave.open('vo44.wav');sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
ws=json.load(open('align.json'))
def lvl(x):x=x[np.abs(x)>0.004];return 20*np.log10(np.sqrt(np.mean(x**2))+1e-9) if len(x) else -99
body=lvl(a[int(20*sr):int(130*sr)])
# phrase spans: group words separated by gaps > 0.35 s
spans=[];cur=[ws[0][1],ws[0][2]]
for _,s,e in ws[1:]:
    if s-cur[1]>0.35:spans.append(cur);cur=[s,e]
    else:cur[1]=e
spans.append(cur)
gain=np.ones(len(a))
for s,e in spans:
    L=lvl(a[int(s*sr):int(e*sr)]);d=body-L
    if d>3.0:
        g=10**((d-1.0)/20);i0,i1=int((s-0.08)*sr),int((e+0.12)*sr);r=int(0.06*sr)
        env=np.ones(i1-i0)*g;env[:r]=np.linspace(1,g,r);env[-r:]=np.linspace(g,1,r);gain[i0:i1]=np.maximum(gain[i0:i1],env)
        print(f"boost {s:6.2f}-{e:6.2f}  was {d:+.1f} dB below -> +{d-1:.1f} dB")
y=a*gain
# gentle peak control
y=np.tanh(y*1.2)/np.tanh(1.2)
o=wave.open('vo_fixed.wav','w');o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes((np.clip(y,-1,1)*32767).astype(np.int16).tobytes());o.close()
