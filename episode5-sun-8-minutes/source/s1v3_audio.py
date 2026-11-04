# Short 11 audio from stems: voice 100% (peak -6 dBFS before mastering), ambient hum music 18% / 5% under voice,
# 0.5 s ducks to 5% on GONE / WHY / NOTHING / BEAUTIFUL and on SFX hits; SFX at the owner's per-cue %.
import wave,numpy as np
w=wave.open('vo_tight.wav');sr=w.getframerate();v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
segs=[(0.0,4.6),(25.6,32.15),(51.85,57.5),(57.5,60.55)]
parts=[]
for s,e in segs:
    x=v[int(s*sr):int(e*sr)].copy();n1,n2=int(0.01*sr),int(0.03*sr);x[:n1]*=np.linspace(0,1,n1);x[-n2:]*=np.linspace(1,0,n2);parts.append(x)
voice=np.concatenate(parts);N=len(voice);L=N/sr
VP=0.5;voice=voice/np.abs(voice).max()*VP                         # 100% = peak -6 dBFS, dry
rng=np.random.default_rng(11)
def tt(d):return np.arange(int(sr*d))/sr
def smooth(x,ms):n=max(1,int(sr*ms/1000));return np.convolve(x,np.ones(n)/n,'same')
def lp(x,a):
    o=np.empty_like(x);s=0.0
    for i in range(len(x)):s+=a*(x[i]-s);o[i]=s
    return o
# ---- music: suspenseful ambient hum (A1 + E2 drone, slow swell, filtered air) ----
t=np.arange(N)/sr
hum=(np.sin(2*np.pi*55*t)+0.6*np.sin(2*np.pi*82.4*t+0.7)+0.35*np.sin(2*np.pi*110*t+1.3))*(0.75+0.25*np.sin(2*np.pi*0.18*t))
air=lp(rng.standard_normal(N),0.015)*8;music=hum+air*0.5
speechA=np.abs(voice)>0.02*VP/0.5*0.5;speech=smooth(speechA.astype(float),220)>0.06
vrms=np.sqrt(np.mean(voice[speech]**2));music=music/np.sqrt(np.mean(music**2))*vrms   # 100% = voice RMS
g=np.where(speech,0.05,0.18).astype(float)
g[:int(0.7*sr)]=np.minimum(g[:int(0.7*sr)],0.10)                 # cut 1: music 10%
def duck(t0,d=0.5):g[int(t0*sr):int((t0+d)*sr)]=0.05
# ---- SFX ----
fx=np.zeros(N);HITS=[]
def at(t0,x,pct,hit=False):
    x=x/np.abs(x).max()*VP*pct;i=int(t0*sr);n=min(len(x),N-i)
    if n>0:fx[i:i+n]+=x[:n]
    if hit:HITS.append(t0)
def bass(t0):tt_=tt(1.6);at(t0,np.sin(2*np.pi*np.cumsum(38+90*np.exp(-tt_*8))/sr)*np.exp(-tt_*2.6)+rng.standard_normal(len(tt_))*np.exp(-tt_*40)*0.25,0.80,True)
def hum_down(t0):tt_=tt(1.2);at(t0,np.sin(2*np.pi*np.cumsum(220*np.exp(-tt_*1.8))/sr)*np.exp(-tt_*1.6),0.40)
def tick(t0):tt_=tt(0.04);at(t0,np.sin(2*np.pi*2400*tt_)*np.exp(-tt_*120),0.50)
def whoosh(t0,d=0.45,p=0.70):tt_=tt(d);at(t0,lp(rng.standard_normal(len(tt_)),0.12)*np.sin(np.linspace(0,np.pi,len(tt_)))**2,p)
def gasp(t0):tt_=tt(0.5);n=lp(rng.standard_normal(len(tt_)),0.35);at(t0,(n*0.8+n*np.sin(2*np.pi*np.cumsum(700+300*tt_)/sr)*0.6)*np.sin(np.linspace(0,np.pi,len(tt_)))**1.2,0.60)
def pop(t0,f=650):tt_=tt(0.15);at(t0,np.sin(2*np.pi*np.cumsum(f*np.exp(-tt_*12))/sr)*np.exp(-tt_*25),0.75,True)
def ding(t0,f=1568):tt_=tt(1.0);at(t0,(np.sin(2*np.pi*f*tt_)+0.5*np.sin(2*np.pi*f*2.76*tt_)*np.exp(-tt_*6))*np.exp(-tt_*3.5),0.80,True)
def buzzer(t0):tt_=tt(0.35);at(t0,(np.sign(np.sin(2*np.pi*140*tt_))*0.6+np.sign(np.sin(2*np.pi*147*tt_))*0.4)*np.exp(-tt_*3),0.70,True)
def drop(t0):tt_=tt(0.9);at(t0,np.sin(2*np.pi*np.cumsum(40+70*np.exp(-tt_*9))/sr)*np.exp(-tt_*3.5),0.70,True)
def birds(t0,d):
    x=np.zeros(int(sr*d))
    for k in range(int(d*5)):
        tt_=tt(0.12);f=3200+1400*np.sin(np.linspace(0,np.pi,len(tt_)))+rng.random()*600;c=np.sin(2*np.pi*np.cumsum(f)/sr)*np.sin(np.linspace(0,np.pi,len(tt_)))
        i=int(rng.random()*(len(x)-len(tt_)));x[i:i+len(tt_)]+=c
    at(t0,x,0.40)
def twinkle(t0):
    for k in range(5):tt_=tt(0.25);at(t0+k*0.09,np.sin(2*np.pi*(2400+k*300)*tt_)*np.exp(-tt_*18),0.60)
bass(0.0);hum_down(0.05)
for c in (0.7,1.5,2.3,3.2):whoosh(c-0.05)
tick(0.8);tick(1.05);tick(1.3);whoosh(1.5,0.45,0.70);gasp(1.6);pop(2.3);tick(2.35)
whoosh(4.55,0.6,0.70);whoosh(5.3,1.2,0.60);ding(10.92)
pop(13.52);buzzer(13.56);pop(14.49);buzzer(14.53);drop(15.24)
birds(16.85,2.9);ding(17.0,1318);pop(17.85,800);twinkle(17.95)
for t0 in [2.06,4.68,15.24,18.22]+HITS:duck(t0)                    # GONE, WHY, NOTHING, BEAUTIFUL (+ SFX hits)
g=smooth(g,80);mix=voice+music*g+fx
mix[int((L-0.25)*sr):]*=np.linspace(1,0,N-int((L-0.25)*sr))
st=np.stack([mix,mix],1);o=wave.open('s1v3_pre.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((np.clip(st,-1,1)*32767).astype(np.int16).tobytes());o.close()
r=lambda x:20*np.log10(np.sqrt(np.mean(x**2))+1e-12)
print('len %.2f | voice %.1f dB | music under voice %.1f dB | music in gaps %.1f dB'%(L,r(voice[speech]),r((music*g)[speech]),r((music*g)[~speech])))
