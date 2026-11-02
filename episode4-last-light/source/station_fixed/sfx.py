import numpy as np, wave, json
sr=44100; L=18.0; N=int(sr*L); rng=np.random.default_rng(3)
mus=np.zeros(N); sfx=np.zeros(N)
def at(buf,t0,x,g=1.0):
    i=int(t0*sr); n=min(len(x),N-i)
    if n>0: buf[i:i+n]+=x[:n]*g
def tt(d): return np.arange(int(sr*d))/sr
def env(x,a=0.005,r=0.05):
    n=len(x);e=np.ones(n);na=max(1,int(a*sr));nr=max(1,int(r*sr));e[:na]=np.linspace(0,1,na);e[-nr:]*=np.linspace(1,0,nr);return x*e
def lp(x,a):
    y=np.empty_like(x);s=0.0
    for i in range(len(x)): s+=a*(x[i]-s); y[i]=s
    return y
B=[1.92,4.26,8.70,11.47,14.60]
# space hum under everything (deep, rises in S2)
t=tt(L); hum=np.sin(2*np.pi*55*t)+0.5*np.sin(2*np.pi*82.5*t+0.4)+0.3*lp(rng.standard_normal(N),0.02)*6
lvl=np.interp(t,[0,B[0],B[1],B[2],B[3],B[4],L],[0.5,0.6,1.0,0.7,0.9,0.6,0.0]); sfx+=env(hum*lvl,0.05,0.6)*0.07
# 0.0 impact + shocked gasp
t=tt(0.6); at(sfx,0.0,np.sin(2*np.pi*np.cumsum(45+70*np.exp(-t*10))/sr)*np.exp(-t*6),0.5)
g=lp(rng.standard_normal(int(sr*0.45)),0.25); e=np.sin(np.linspace(0,np.pi,len(g)))**1.5; at(sfx,0.1,g*e,0.55)
# light glow shimmer at 0.35 (text shake)
t=tt(0.8); at(sfx,0.3,sum(np.sin(2*np.pi*f*t) for f in (1568,2093,2637))*np.exp(-t*4)/3,0.08)
# S2 whoosh-in + red pulse thump
t=tt(0.5); at(sfx,B[0]-0.25,lp(rng.standard_normal(len(t)),0.15)*np.sin(np.linspace(0,np.pi,len(t)))**2,0.35)
t=tt(0.4); at(sfx,2.45,np.sin(2*np.pi*70*t)*np.exp(-t*9),0.35)
# S3 solar panel hum + empty-station creaks + typewriter
t=tt(B[2]-B[1]); at(sfx,B[1],env(np.sin(2*np.pi*240*t)*0.4+np.sin(2*np.pi*360*t)*0.2,0.3,0.3)*(0.6+0.4*np.sin(2*np.pi*0.7*t)),0.04)
for t0 in (5.2,7.5):
    t=tt(0.7); f=90+30*np.sin(2*np.pi*1.3*t); at(sfx,t0,np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t*3)*(1+0.5*rng.standard_normal(len(t))*0.2),0.12)
for k in range(23):
    t=tt(0.03); at(sfx,6.94+k*0.05,rng.standard_normal(len(t))*np.exp(-t*220),0.18)
# S4 alarm beeps (two-tone) + rising air friction + counter ticks
for k in range(6):
    t=tt(0.18); at(sfx,8.8+k*0.45,env(np.sign(np.sin(2*np.pi*(880 if k%2==0 else 660)*t))*0.5,0.004,0.02),0.07)
t=tt(B[3]-B[2]); fr=lp(rng.standard_normal(len(t)),0.08)*np.linspace(0,1,len(t))**2; at(sfx,B[2],fr,0.5)
for k in range(12):
    t=tt(0.02); at(sfx,8.75+k*0.23,np.sin(2*np.pi*3000*t)*np.exp(-t*200),0.06)
t=tt(0.4); at(sfx,10.35,np.sin(2*np.pi*np.cumsum(60+50*np.exp(-t*12))/sr)*np.exp(-t*7),0.4)
# S5 WHOOSH fireball + crackle
t=tt(1.6); wh=lp(rng.standard_normal(len(t)),0.2)*np.sin(np.linspace(0,np.pi,len(t)))**0.7; at(sfx,B[3]-0.1,wh,0.7)
cr=np.zeros(int(sr*3.5));
for k in range(160):
    i=int(rng.random()*(len(cr)-400));cr[i:i+300]+=rng.standard_normal(300)*np.exp(-np.arange(300)/40)*rng.random()
at(sfx,B[3]+0.2,cr*np.linspace(1,0.2,len(cr)),0.35)
t=tt(2.5); at(sfx,12.0,lp(rng.standard_normal(len(t)),0.04)*np.exp(-t*0.8)*3,0.25)  # burning roar
# S6 soft sad piano + shooting star twinkle
def piano(f,d=2.8):
    t=tt(d); return env(sum((0.6**h)*np.sin(2*np.pi*f*(h+1)*t)*np.exp(-t*(1.3+h)) for h in range(6)),0.002,0.3)
at(mus,14.65,piano(440)+0.6*piano(554.4)+0.5*piano(659.3),0.4); at(mus,16.3,piano(392)*0.8,0.3)
for k in range(6):
    t=tt(0.25); at(sfx,14.75+k*0.11,np.sin(2*np.pi*(2400+k*260)*t)*np.exp(-t*18),0.07)
t=tt(0.3); at(sfx,17.39,np.sin(2*np.pi*90*t)*np.exp(-t*12),0.25)  # shake hit on YES/NO
# voice
w=wave.open('voice.wav');v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
v=v[:N];v=np.pad(v,(0,N-len(v)))
# duck sfx under voice
venv=np.convolve(np.abs(v),np.ones(2000)/2000,'same');duck=1-0.45*np.clip(venv/0.05,0,1)
mix=v*1.0/np.abs(v).max()*0.85+sfx*duck+mus*duck*0.8
mix[int(17.9*sr):]*=np.linspace(1,0,N-int(17.9*sr))
mix=np.tanh(mix*1.05)/np.tanh(1.05); mix*=0.9/np.abs(mix).max()
st=np.stack([mix,mix],1)
o=wave.open('mix.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((st*32767).astype(np.int16).tobytes());o.close()
print('ok')
