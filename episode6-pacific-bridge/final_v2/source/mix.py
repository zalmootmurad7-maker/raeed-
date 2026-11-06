# Pacific bridge FINAL mix. Voice = locked master (untouched timing, no compression). Owner levels:
# music 15% (0-98) / 20% (98-158) / 0% (158-170.6, snap) / 0->5% (170.6-185.7) / 8% / 10% twist with 0% drop before THE BILL / 8% tunnel / 10% end;
# music x0.6 under speech, 5% while big SFX play. SFX bus 75% x0.4 + ducked under speech (owner ep.6 rule); crack.mp3 90% = loudest, not ducked.
import numpy as np, wave
w=wave.open('vo.wav');sr=w.getframerate();v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
N=len(v);L=N/sr;rng=np.random.default_rng(11)
def tt(d):return np.arange(int(sr*d))/sr
def env(x,a=0.005,r=0.05):
    n=len(x);e=np.ones(n);na=max(1,min(n,int(a*sr)));nr=max(1,min(n,int(r*sr)));e[:na]=np.linspace(0,1,na);e[-nr:]*=np.linspace(1,0,nr);return x*e
def lp(x,a):
    y=np.empty_like(x);s=0.0
    for i in range(len(x)):s+=a*(x[i]-s);y[i]=s
    return y
def smooth(x,ms):n=max(1,int(sr*ms/1000));return np.convolve(x,np.ones(n)/n,'same')
BUS={};HITS=[]
def at(bus,t0,x,pct,hit=False):
    if bus not in BUS:BUS[bus]=[np.zeros(N),pct]
    x=x/(np.abs(x).max() or 1);i=int(t0*sr);n=min(len(x),N-i)
    if n>0:BUS[bus][0][i:i+n]+=x[:n]
    if hit:HITS.append(t0)
noise=lambda d:rng.standard_normal(int(sr*d))
# --- library (synthesized versions of the spec's SFX files) ---
def rain(t0,d):x=lp(noise(d),0.5)-lp(noise(d),0.05);at('rain',t0,env(x,0.4,0.6),0.70)
def wipers(t0,d):
    x=np.zeros(int(sr*d))
    for k in range(int(d/0.5)):s=lp(noise(0.35),0.2)*np.sin(np.linspace(0,np.pi,int(sr*0.35)))**2;i=int(k*0.5*sr);x[i:i+len(s)]+=s[:len(x)-i]
    at('wipers',t0,x,0.60)
def gps(t0):x=np.concatenate([np.sin(2*np.pi*f*tt(0.12))*np.exp(-tt(0.12)*10) for f in (1320,1760)]);at('gps',t0,x,0.6)
def wind(t0,d):at('wind',t0,env(lp(noise(d),0.01)*(0.6+0.4*np.sin(2*np.pi*0.3*tt(d))),0.5,0.8),0.5)
def whoosh(t0,d=0.8,p=0.75,big=False):x=lp(noise(d),0.12)*np.sin(np.linspace(0,np.pi,int(sr*d)))**2;at('whoosh',t0,x,p,big)
def boom(t0,p=0.8):t=tt(1.6);at('boom',t0,np.sin(2*np.pi*np.cumsum(38+90*np.exp(-t*8))/sr)*np.exp(-t*2.6)+noise(1.6)*np.exp(-t*40)*0.25,p,True)
def splash(t0,p=0.75):t=tt(1.2);x=lp(noise(1.2),0.3)*np.exp(-t*3)+np.sin(2*np.pi*np.cumsum(80*np.exp(-t*4))/sr)*np.exp(-t*5)*0.6;at('splash',t0,x,p,True)
def rumble(t0,d,p=0.6):t=tt(d);at('rumble',t0,env(lp(noise(d),0.01)*3+np.sin(2*np.pi*35*t)*0.5,0.3,0.5),p)
def quake(t0,d,p=0.75):t=tt(d);at('quake',t0,env(lp(noise(d),0.02)*(1+0.5*np.sin(2*np.pi*7*t))+np.sin(2*np.pi*28*t),0.1,0.4),p,True)
def stretch(t0,d=3,p=0.6):t=tt(d);f=120+80*t/d+15*np.sin(2*np.pi*3*t);at('stretch',t0,env(np.sin(2*np.pi*np.cumsum(f)/sr)*(0.7+0.3*noise(d)*0.2),0.2,0.4),p)
def tick(t0,p=0.5):t=tt(0.04);at('tick',t0,np.sin(2*np.pi*2400*t)*np.exp(-t*120),p)
def ding(t0,f=1568,p=0.8):t=tt(1.0);at('ding',t0,(np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*6))*np.exp(-t*3.5),p,True)
def crash(t0,p=0.85):t=tt(2.2);at('crash',t0,lp(noise(2.2),0.25)*np.exp(-t*1.6)*2+np.sin(2*np.pi*np.cumsum(55+40*np.exp(-t*6))/sr)*np.exp(-t*2.5),p,True)
def crack(t0):t=tt(1.0);x=noise(1.0)*np.exp(-t*7)*1.4+np.sin(2*np.pi*np.cumsum(70+300*np.exp(-t*30))/sr)*np.exp(-t*4)+lp(noise(1.0),0.05)*np.exp(-t*2)*3;at('crack',t0,x,0.90,True)
def cash(t0,p=0.8):
    x=np.zeros(int(sr*1.0))
    for k in range(3):t=tt(0.2);s=np.sin(2*np.pi*(2600+k*400)*t)*np.exp(-t*20);i=int(k*0.06*sr);x[i:i+len(s)]+=s
    t=tt(0.7);s=(np.sin(2*np.pi*1046*t)+np.sin(2*np.pi*1318*t))*np.exp(-t*5);i=int(0.22*sr);x[i:i+len(s)]+=s[:len(x)-i];at('cash',t0,x,p,True)
def hiss(t0,d,p=0.6):at('hiss',t0,env(noise(d)-lp(noise(d),0.3),0.05,0.2),p)
def blast(t0,p=0.85):t=tt(2.0);at('blast',t0,lp(noise(2.0),0.35)*np.minimum(1,t*8)*np.exp(-t*0.9)*2+np.sin(2*np.pi*45*t)*np.exp(-t*2),p,True)
def pop(t0,p=0.75,f=800):t=tt(0.15);at('pop',t0,np.sin(2*np.pi*np.cumsum(f*np.exp(-t*12))/sr)*np.exp(-t*25),p,True)
def horn(t0,p=0.5):t=tt(1.6);at('horn',t0,env(np.sin(2*np.pi*98*t)+0.5*np.sin(2*np.pi*147*t)+0.3*np.sin(2*np.pi*196*t),0.1,0.4),p)
def engine(t0,d,p=0.35):t=tt(d);f=55+8*np.sin(2*np.pi*0.7*t);at('engine',t0,env(np.sign(np.sin(2*np.pi*np.cumsum(f)/sr))*0.4+lp(noise(d),0.2)*0.6,0.3,0.3),p)
def drum(t0,n=4,gap=0.5,p=0.6):
    for k in range(n):t=tt(0.4);at('drum',t0+k*gap,np.sin(2*np.pi*np.cumsum(70+60*np.exp(-t*20))/sr)*np.exp(-t*8),p)
def rocketw(t0,p=0.6):t=tt(2.5);at('rocket',t0,env(lp(noise(2.5),0.15)*(0.4+0.6*np.minimum(1,t)),0.3,0.8),p)
# --- cues on the voice timeline ---
rain(0,11.45);wipers(0,11.45);gps(3.24);wind(8.25,3.3)
whoosh(12.05,2.0,0.85,True);boom(16.91)
engine(19.9,8.9);ding(25.41,1046)
drum(30.5,4,0.55)
rumble(43.0,5.5,0.5)
whoosh(49.06,1.0,0.6);rumble(51.08,1.2,0.7);splash(52.0)
for t0 in (54.24,58.3,62.64):tick(t0)
quake(76.48,1.0);quake(78.21,0.9,0.8)
crack_t=79.95;at('fxcrack',79.95,noise(0.3)*np.exp(-tt(0.3)*20),0.7,True);splash(82.3,0.45)
stretch(91.7,3.0);rumble(94.98,2.6,0.6)
for k in range(30):tick(121.25+k*0.058,0.45)
horn(132.22);horn(134.6,0.4)
for k in range(12):tick(143.63+k*0.08,0.4)
rumble(145.5,3.5,0.5)
crash(154.07)
crack(169.9)                                   # loudest, right after "snaps"
cash(183.6)
rocketw(194.9)
for t0 in (200.4,202.8,205.6):ding(t0,1568,0.7)
hiss(227.95,1.6);blast(229.6)
ding(242.11,1318);pop(262.37,0.75);whoosh(263.2,0.8,0.75)
# --- music: plucked bed + low tense drone ---
t=np.arange(N)/sr;bpm=92;beat=60/bpm;notes=[220,261.6,329.6,392,329.6,261.6,246.9,293.7]
mus=np.zeros(N);tb=0.0;i=0
def pluck(f,d=0.6):tq=tt(d);return env((np.sin(2*np.pi*f*tq)+0.3*np.sin(2*np.pi*2*f*tq))*np.exp(-tq*5),0.003,0.1)
while tb<L-0.6:
    p=pluck(notes[i%8]);j=int(tb*sr);n=min(len(p),N-j);mus[j:j+n]+=p[:n]*0.22
    if i%8==0:
        pd=tt(beat*8);pad=sum(np.sin(2*np.pi*f*pd) for f in (110,164.8,220))/3;s=env(pad,0.4,0.8)*0.10;n=min(len(s),N-j);mus[j:j+n]+=s[:n]
    tb+=beat/2;i+=1
mus+=np.sin(2*np.pi*55*t)*0.05*(0.7+0.3*np.sin(2*np.pi*0.2*t))
# --- levels ---
VPK=0.5;vv=v/np.abs(v).max()*VPK
speech=smooth((np.abs(v)>0.02).astype(float),250)>0.08
vrms=np.sqrt(np.mean(vv[speech]**2));mus=mus/np.sqrt(np.mean(mus**2))*vrms
def seg(a,b,val):g[int(a*sr):int(min(L,b)*sr)]=val
g=np.zeros(N);seg(0,98.2,0.15);seg(98.2,157.9,0.20);seg(157.9,170.6,0.0);seg(170.6,185.7,0.05);g[int(170.6*sr):int(172.0*sr)]=0.0
seg(185.7,198.6,0.08);seg(198.6,216.4,0.10);seg(216.4,242.0,0.08);seg(242.0,L,0.10)
seg(153.07,154.07,0.0);seg(214.7,215.9,0.0)                              # silence drops (wave, THE BILL)
g=np.where(speech,g*0.6,g)
for h in HITS:g[int(h*sr):int((h+0.6)*sr)]=np.minimum(g[int(h*sr):int((h+0.6)*sr)],0.05)
g=smooth(g,90);music=mus*g
def norm(x):p=np.abs(x).max();return x/p if p>0 else x
fxduck=smooth(np.where(speech,0.45,1.0),60)
fx=np.zeros(N)
for k,(x,pct) in BUS.items():
    if k=='crack':continue
    fx+=VPK*pct*norm(x)
fx=fx*0.40*fxduck
# silence drop before the wave also mutes SFX
fx[int(153.07*sr):int(154.07*sr)]*=0.0
crk=VPK*0.90*norm(BUS['crack'][0])*1.9                                  # loudest moment of the video
mix=vv+music+fx+crk
r=lambda x:20*np.log10(np.sqrt(np.mean(x**2))+1e-12)
print('len %.2f | voice %.1f | music u/voice %.1f | sfx u/voice %.1f | crack peak %.2f vs voice peak %.2f'%(L,r(vv[speech]),r(music[speech]),r(fx[speech]),np.abs(crk).max(),VPK))
st=np.stack([mix,mix],1);o=wave.open('mix_pre.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((np.clip(st,-1,1)*32767).astype(np.int16).tobytes());o.close()
