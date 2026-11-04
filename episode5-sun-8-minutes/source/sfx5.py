import numpy as np, wave
sr=44100
w=wave.open('vo_tight.wav');v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
L=158.0;N=int(sr*L);v=np.pad(v,(0,max(0,N-len(v))))[:N];v[int(150.25*sr):]=0  # FIX2: 'hit like' line removed
rng=np.random.default_rng(5);sfx=np.zeros(N);mus=np.zeros(N)
BUS={k:np.zeros(N) for k in ('bass','click','crickets','ding','counter')}
def at(b,t0,x,g=1.0):
    i=int(t0*sr);n=min(len(x),N-i)
    if n>0:b[i:i+n]+=x[:n]*g
def tt(d):return np.arange(int(sr*d))/sr
def env(x,a=0.005,r=0.05):
    n=len(x);e=np.ones(n);na=max(1,int(a*sr));nr=max(1,int(r*sr));e[:na]=np.linspace(0,1,na);e[-nr:]*=np.linspace(1,0,nr);return x*e
def lp(x,a):
    y=np.empty_like(x);s=0.0
    for i in range(len(x)):s+=a*(x[i]-s);y[i]=s
    return y
def boom(t0,g=0.6,f0=42,d=1.2):t=tt(d);at(sfx,t0,np.sin(2*np.pi*np.cumsum(f0+90*np.exp(-t*8))/sr)*np.exp(-t*3)+rng.standard_normal(len(t))*np.exp(-t*40)*0.3,g)
def hit(t0,g=0.35):t=tt(0.35);at(sfx,t0,np.sin(2*np.pi*np.cumsum(90+120*np.exp(-t*25))/sr)*np.exp(-t*12),g)
def pop_(t0,g=0.3,f=600):t=tt(0.15);at(sfx,t0,np.sin(2*np.pi*np.cumsum(f*np.exp(-t*12))/sr)*np.exp(-t*25),g)
def whoosh(t0,d=0.8,g=0.35):t=tt(d);at(sfx,t0,lp(rng.standard_normal(len(t)),0.12)*np.sin(np.linspace(0,np.pi,len(t)))**2*3,g)
def ding(t0,f=1568,g=0.2):t=tt(1.2);at(sfx,t0,(np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*6))*np.exp(-t*3),g)
def click(t0,g=0.5):t=tt(0.05);at(sfx,t0,rng.standard_normal(len(t))*np.exp(-t*150),g)
def piano(f,d=3.0):t=tt(d);return env(sum((0.6**h)*np.sin(2*np.pi*f*(h+1)*t)*np.exp(-t*(1.2+h*0.9)) for h in range(6)),0.002,0.3)
# 0: bass drop + power-down hum

_main=sfx;sfx=BUS['bass']
boom(0.0,1.0,38,1.8)
sfx=_main
t=tt(1.5);at(sfx,0.05,np.sin(2*np.pi*np.cumsum(220*np.exp(-t*1.6))/sr)*np.exp(-t*1.5),0.12)
[whoosh(c,0.35,0.35) for c in (0.7,1.5,2.2,3.0,4.0)];hit(3.0,0.35);ding(4.05,1046,0.12)  # FIX1 cut whooshes
pop_(7.37,0.5,500);whoosh(7.3,0.5,0.3);pop_(10.76,0.45,900);ding(10.8,1318,0.12)
hit(11.37,0.45);hit(12.24,0.3);hit(17.6,0.25)
click(20.3,0.4);hit(24.53,0.35)
hit(25.68,0.35);whoosh(26.3,1.2,0.15);hit(31.26,0.25)
whoosh(36.4,1.0,0.35);hit(37.77,0.55);hit(38.45,0.2)
boom(41.85,0.45,50,1.0);whoosh(46.0,3.7,0.18);whoosh(47.7,2.0,0.55);
_main=sfx;sfx=BUS['ding']
ding(49.71,1760,0.45);ding(49.75,2349,0.25)
sfx=_main
  # FIX3 race
hit(54.22,0.3);hit(55.19,0.3);hit(55.94,0.35)
click(60.68,0.4);
# blackout

_main=sfx;sfx=BUS['click']
click(65.32,1.0);t=tt(0.08);at(sfx,65.32,np.sign(np.sin(2*np.pi*60*t))*np.exp(-t*40),0.5)
sfx=_main
boom(65.32,0.6,36,1.6)
# FIX3 gasp: breathy inhale with a vowel formant
t=tt(0.55);n_=lp(rng.standard_normal(len(t)),0.35);form=np.sin(2*np.pi*np.cumsum(700+300*t)/sr);g=(n_*0.8+n_*form*0.6)*np.sin(np.linspace(0,np.pi,len(t)))**1.2;at(sfx,65.42,g/np.abs(g).max(),0.55)
hit(68.22,0.3);t=tt(0.6);at(sfx,72.42,np.sin(2*np.pi*np.cumsum(500*np.exp(-t*4))/sr)*np.exp(-t*3),0.2)
_main=sfx;sfx=BUS['crickets']
for k in range(28):
    t=tt(0.09);at(sfx,79.12+k*0.16,np.sin(2*np.pi*4300*t)*(0.5+0.5*np.sign(np.sin(2*np.pi*60*t)))*np.exp(-t*20),0.05)
sfx=_main
boom(84.25,0.35,48,0.9)
whoosh(86.1,1.2,0.25);hit(98.68,0.3);hit(110.43,0.35)
_main=sfx;sfx=BUS['counter']
for k in range(5): t=tt(0.05);at(sfx,96.68+k*0.5,np.sin(2*np.pi*2600*t)*np.exp(-t*90),0.25)  # FIX6 counter ticks
sfx=_main
whoosh(95.0,7.0,0.12)  # FIX6 soft whoosh under the zoom
click(111.7,0.3);whoosh(112.85,0.9,0.4);ding(112.95,1568,0.18)
whoosh(116.2,1.5,0.2)
boom(127.36,0.45,40,1.3);t=tt(2.0);x=np.sin(2*np.pi*np.cumsum(300*np.exp(-t*2))/sr)*np.exp(-t*2);xx=x.copy()
for dly,gg in[(0.18,0.5),(0.36,0.3),(0.54,0.18)]:
    d=int(dly*sr);xx[d:]+=x[:-d]*gg
at(sfx,130.67,xx,0.25);hit(131.11,0.2)
hit(144.75,0.3);hit(145.91,0.35);pop_(148.26,0.35);pop_(148.9,0.3,700);pop_(149.3,0.3,700);hit(150.3,0.4)
# music: soft plucked bed (A minor) — drops out at the blackout and comes back softer; mysterious piano at the end
bpm=96;beat=60/bpm;notes=[220,261.6,329.6,392,329.6,261.6,246.9,293.7]
def pluck(f,d=0.6):t=tt(d);return env((np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t))*np.exp(-t*5),0.003,0.1)
tb=0.2;i=0
while tb<134:
    lvl=0.0 if 65.0<tb<69.0 else (0.6 if 65.0<=tb<85 else 1.0)
    if lvl>0: at(mus,tb,pluck(notes[i%8]),0.22*lvl)
    if i%8==0 and lvl>0:
        t=tt(beat*8);pad=sum(np.sin(2*np.pi*f*t) for f in (110,164.8,220))/3;at(mus,tb,env(pad,0.4,0.8),0.10*lvl)
    tb+=beat/2;i+=1
for t0,f in[(134.3,440),(136.0,523.3),(138.0,392),(140.0,349.2),(142.3,329.6),(144.75,293.7),(146.0,440),(148.2,392),(150.3,329.6),(152.3,293.7),(154.3,261.6)]:
    at(mus,t0,piano(f)+0.5*piano(f*1.5),0.22)

# ================= MIX (CapCut-style %: voice = 100% reference) =================
def smooth(x,ms):n=max(1,int(sr*ms/1000));return np.convolve(x,np.ones(n)/n,'same')
VPK=0.5                                    # voice peak -6 dBFS (100%) -> speech sits around -12..-18 dBFS
vv=v/np.abs(v).max()*VPK                   # no echo / reverb on the voice
speech=smooth((np.abs(v)>0.02).astype(float),250)>0.08
vrms=np.sqrt(np.mean(vv[speech]**2))
# music: 100% = same RMS as the voice; 20% base, 10% under speech, 25% in silences
mref=np.sqrt(np.mean(mus[np.abs(mus)>1e-4]**2)) if np.any(np.abs(mus)>1e-4) else 1
mus_n=mus/mref*vrms
g=np.where(speech,0.10,0.25).astype(float)
def win(a,b,val):g[int(a*sr):int(b*sr)]=np.minimum(g[int(a*sr):int(b*sr)],val)
win(38.45,39.45,0.05)                      # "GRAVITY = SPEED OF LIGHT": 5% for 1 s
win(65.32,65.82,0.0)                       # DARKNESS hit: 0% for 0.5 s
g=smooth(g,120)
music=mus_n*g
# SFX: general bus 75%; named cues normalised to the voice peak x their %
def norm(x):p=np.abs(x).max();return x/p if p>0 else x
gen=sfx/ (np.abs(sfx).max() or 1)*VPK*0.75
named=VPK*(0.80*norm(BUS['bass'])+0.90*norm(BUS['click'])+0.40*norm(BUS['crickets'])+0.80*norm(BUS['ding'])+0.50*norm(BUS['counter']))
mix=vv+music+gen+named
mix[int(156.8*sr):]*=np.linspace(1,0,N-int(156.8*sr))
pk=np.abs(mix).max();mix=mix/pk*0.97 if pk>0.97 else mix
r=lambda x:20*np.log10(np.sqrt(np.mean(x**2))+1e-12)
print('speech: voice %.1f dB | music under voice %.1f dB | music in silences %.1f dB'%(r(vv[speech]),r(music[speech]),r(music[~speech&(np.arange(N)<134*sr)])))
st=np.stack([mix,mix],1)
o=wave.open('mix5.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((np.clip(st,-1,1)*32767).astype(np.int16).tobytes());o.close();print('ok')
