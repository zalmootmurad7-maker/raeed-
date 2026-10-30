import wave, numpy as np, sys
w=wave.open('vo44.wav');sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)
gaps=[tuple(map(float,l.split())) for l in open('gaps.txt') if len(l.split())==2]
def target(s,e):
    d=e-s
    if s<0.3: return 0.03                    # no lead-in silence
    if s<15:                                  # hook: almost no air
        if 9.5<s<9.8: return 0.45             # before "And one…"
        if 11.7<s<11.9: return 0.30           # "And one… will never go out"
        return 0.18
    if d>1.15: return 0.50                    # intentional long pauses
    return min(d,0.28)
out=[];pos=0;fade=int(0.012*sr);kept=[]
for s,e in gaps:
    i0,i1=int(s*sr),int(e*sr);out.append(a[pos:i0]);t=target(s,e);n=int(t*sr)
    keep=a[i0:i0+n//2].copy() if n>0 else a[i0:i0]
    tail=a[i1-(n-n//2):i1].copy() if n>0 else a[i1:i1]
    seg=np.concatenate([keep,tail])
    if len(seg)>2*fade: seg[:fade]*=np.linspace(1,0.3,fade);seg[-fade:]*=np.linspace(0.3,1,fade)
    out.append(seg);pos=i1;kept.append((s,e,t))
out.append(a[pos:]);y=np.concatenate(out)
o=wave.open('vo_tight.wav','w');o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes(np.clip(y,-32768,32767).astype(np.int16).tobytes());o.close()
print('before %.1fs  after %.1fs  removed %.1fs'%(len(a)/sr,len(y)/sr,(len(a)-len(y))/sr))
print('hook gaps:',[(round(s,2),round(e-s,2),t) for s,e,t in kept if s<15])
