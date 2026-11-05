# Episode 6 mix — owner rule: voice 100% (dry), music 20% base / 10% under speech / 25% in gaps,
# ducks 5% (1 s) on key lines and 0% (0.5 s) on big hits; SFX 75% with per-cue levels; then static gain to -14.5 LUFS.
import numpy as np, wave, json
w=wave.open('vo_tight.wav');sr=w.getframerate();v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
L=176.0;N=int(sr*L);v=np.pad(v,(0,N-len(v)))[:N]
rng=np.random.default_rng(6)
def tt(d):return np.arange(int(sr*d))/sr
def env(x,a=0.005,r=0.05):
    n=len(x);e=np.ones(n);na=max(1,int(a*sr));nr=max(1,int(r*sr));e[:na]=np.linspace(0,1,na);e[-nr:]*=np.linspace(1,0,nr);return x*e
def lp(x,a):
    y=np.empty_like(x);s=0.0
    for i in range(len(x)):s+=a*(x[i]-s);y[i]=s
    return y
def smooth(x,ms):n=max(1,int(sr*ms/1000));return np.convolve(x,np.ones(n)/n,'same')
BUS={k:np.zeros(N) for k in ('gen','bass','click','ding','tick','whoosh','wave','birds')}
def at(bus,t0,x,g=1.0):
    i=int(t0*sr);n=min(len(x),N-i)
    if n>0:BUS[bus][i:i+n]+=x[:n]*g
def boom(t0,g=1.0):t=tt(1.6);at('bass',t0,np.sin(2*np.pi*np.cumsum(38+90*np.exp(-t*8))/sr)*np.exp(-t*2.6)+rng.standard_normal(len(t))*np.exp(-t*40)*0.25,g)
def hit(t0,g=0.5):t=tt(0.35);at('gen',t0,np.sin(2*np.pi*np.cumsum(90+120*np.exp(-t*25))/sr)*np.exp(-t*12),g)
def pop(t0,g=0.45,f=650):t=tt(0.15);at('gen',t0,np.sin(2*np.pi*np.cumsum(f*np.exp(-t*12))/sr)*np.exp(-t*25),g)
def whoosh(t0,d=0.5,g=1.0):t=tt(d);at('whoosh',t0,lp(rng.standard_normal(len(t)),0.12)*np.sin(np.linspace(0,np.pi,len(t)))**2*3,g)
def ding(t0,f=1568,g=1.0):t=tt(1.2);at('ding',t0,(np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*6))*np.exp(-t*3),g)
def click(t0,g=1.0):t=tt(0.06);at('click',t0,rng.standard_normal(len(t))*np.exp(-t*140),g)
def tick(t0,g=1.0):t=tt(0.04);at('tick',t0,np.sin(2*np.pi*2400*t)*np.exp(-t*120),g)
def buzzer(t0,g=0.5):t=tt(0.35);at('gen',t0,(np.sign(np.sin(2*np.pi*140*t))*0.6+np.sign(np.sin(2*np.pi*147*t))*0.4)*np.exp(-t*3),g)
def crash(t0,g=1.0):t=tt(1.4);n=rng.standard_normal(len(t));at('wave',t0,lp(n,0.25)*np.exp(-t*2.2)*2+np.sin(2*np.pi*np.cumsum(60+40*np.exp(-t*6))/sr)*np.exp(-t*3),g)
def sea(t0,d,g=1.0):t=tt(d);n=lp(rng.standard_normal(len(t)),0.03)*6*(0.6+0.4*np.sin(2*np.pi*0.25*t));at('wave',t0,env(n,0.5,0.6),g)
def horn(t0,g=0.4):t=tt(1.2);at('gen',t0,env((np.sin(2*np.pi*98*t)+0.5*np.sin(2*np.pi*147*t)+0.3*np.sin(2*np.pi*196*t)),0.08,0.3),g)
def cash(t0,g=0.6):
    for k in range(3):t=tt(0.25);at('gen',t0+k*0.07,np.sin(2*np.pi*(2600+k*400)*t)*np.exp(-t*18),g*0.6)
    t=tt(0.6);at('gen',t0+0.2,(np.sin(2*np.pi*1046*t)+np.sin(2*np.pi*1318*t))*np.exp(-t*5),g)
def engine(t0,d,g=0.25):t=tt(d);f=55+8*np.sin(2*np.pi*0.7*t);at('gen',t0,env(np.sign(np.sin(2*np.pi*np.cumsum(f)/sr))*0.4+lp(rng.standard_normal(len(t)),0.2)*0.6,0.2,0.3),g)
def creak(t0,g=0.35):t=tt(0.9);f=180+60*np.sin(2*np.pi*2.5*t);at('gen',t0,np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t*2)*(0.6+0.4*rng.standard_normal(len(t))*0.2),g)
def gasp(t0,g=0.5):t=tt(0.5);n=lp(rng.standard_normal(len(t)),0.35);at('gen',t0,(n*0.8+n*np.sin(2*np.pi*np.cumsum(700+300*t)/sr)*0.6)*np.sin(np.linspace(0,np.pi,len(t)))**1.2/0.5,g*0.4)
# ---- cues (timed to align.json) ----
boom(0.0);t=tt(1.2);at('gen',0.05,np.sin(2*np.pi*np.cumsum(220*np.exp(-t*1.8))/sr)*np.exp(-t*1.6),0.3)
for c in (0.7,2.2,4.1,7.2):whoosh(c-0.08,0.45)
engine(1.0,1.2);whoosh(2.2,1.1,0.8);hit(4.1,0.5)
hit(10.68,0.45);engine(12.7,3.0);ding(14.21,1046);buzzer(16.11,0.4);hit(19.3,0.5);hit(22.74,0.45)
whoosh(24.0,0.5);hit(27.88,0.4);whoosh(29.5,0.5);sea(29.5,10,0.5);whoosh(36.9,1.1,0.9);boom(37.86,0.7);gasp(37.9)
whoosh(39.6,0.5)
for k in range(10):pop(49.87+k*0.07,0.3,500+k*40)
buzzer(51.74,0.45);ding(52.85,1318);whoosh(54.2,0.5);sea(54.2,8.8,0.4)
whoosh(63.0,1.2,0.9);hit(63.84,0.45)
for k in range(10):tick(66.6+k*0.3,0.8)
hit(70.26,0.3);ding(75.7,880,0.6)
boom(76.43,0.8);sea(76.4,15,0.8);crash(81.3,0.9);creak(85.5);creak(87.5);creak(89.7,0.5);click(91.38);boom(91.38,0.9);crash(91.4,1.0)
pop(92.17,0.4)
for k in range(12):pop(93.6+k*0.37,0.25,700+k*20)
ding(98.2,1568,0.8);sea(100,5,0.4);hit(105.06,0.5);horn(105.9);horn(108.6,0.3);boom(110.32,0.6);creak(114.4,0.4);ding(116.45,1318,0.8)
hit(118.29,0.4);cash(122.48);hit(125.55,0.3)
for k in range(12):tick(127.95+k*0.15,0.7)
cash(129.91,0.8);boom(129.91,0.5);hit(133.12,0.4)
hit(134.46,0.45);ding(136.4,1568,0.6);ding(138.4,1760,0.6);ding(141.0,2093,0.6)
for k in range(10):pop(142.6+k*0.18,0.2,600)
boom(148.42,0.7);click(149.9,0.6);boom(150.89,0.9)
whoosh(151.7,0.5);hit(154.16,0.5);creak(155.1,0.4);whoosh(159.3,1.2,0.8);hit(163.45,0.45)
pop(165.1,0.4);pop(167.38,0.4);pop(167.96,0.4);pop(171.45,0.5,800);ding(171.5,2093,0.7);ding(173.0,1046,0.5)
# ---- music: plucked bed + pad (A minor), dropped in the typhoon hit and the snap ----
bpm=96;beat=60/bpm;notes=[220,261.6,329.6,392,329.6,261.6,246.9,293.7]
def pluck(f,d=0.6):t=tt(d);return env((np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t))*np.exp(-t*5),0.003,0.1)
mus=np.zeros(N);tb=0.7;i=0
while tb<175:
    mus[int(tb*sr):int(tb*sr)+int(0.6*sr)]+=pluck(notes[i%8])[:max(0,min(int(0.6*sr),N-int(tb*sr)))]*0.22
    if i%8==0:
        t=tt(beat*8);pad=sum(np.sin(2*np.pi*f*t) for f in (110,164.8,220))/3;seg=env(pad,0.4,0.8)*0.10;j=int(tb*sr);n=min(len(seg),N-j);mus[j:j+n]+=seg[:n]
    tb+=beat/2;i+=1
# ---- mixer ----
VPK=0.5;vv=v/np.abs(v).max()*VPK
speech=smooth((np.abs(v)>0.02).astype(float),250)>0.08
vrms=np.sqrt(np.mean(vv[speech]**2));mref=np.sqrt(np.mean(mus[np.abs(mus)>1e-4]**2));mus_n=mus/mref*vrms
g=np.where(speech,0.10,0.25).astype(float);g[:int(0.7*sr)]=0.0
def win(a,b,val):g[int(a*sr):int(b*sr)]=np.minimum(g[int(a*sr):int(b*sr)],val)
for a in (2.28,19.17,37.86,63.84,81.28,110.32,129.91,148.42,154.16):win(a,a+1.0,0.05)   # key lines: 5% for 1 s
for a in (0.0,76.43,91.38,150.89):win(a,a+0.5,0.0)                                       # big hits: 0% for 0.5 s
g=smooth(g,120);music=mus_n*g
def norm(x):p=np.abs(x).max();return x/p if p>0 else x
pct={'gen':0.75,'bass':0.80,'click':0.90,'ding':0.80,'tick':0.50,'whoosh':0.70,'wave':0.60,'birds':0.40}
fx=sum(VPK*pct[k]*norm(BUS[k]) for k in BUS if np.abs(BUS[k]).max()>0)
mix=vv+music+fx;mix[int(175.4*sr):]*=np.linspace(1,0,N-int(175.4*sr))
pk=np.abs(mix).max();mix=mix/pk*0.97 if pk>0.97 else mix
st=np.stack([mix,mix],1);o=wave.open('mix6_pre.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((np.clip(st,-1,1)*32767).astype(np.int16).tobytes());o.close()
r=lambda x:20*np.log10(np.sqrt(np.mean(x**2))+1e-12)
print('voice %.1f | music under voice %.1f | music in gaps %.1f'%(r(vv[speech]),r(music[speech]),r(music[~speech])))
