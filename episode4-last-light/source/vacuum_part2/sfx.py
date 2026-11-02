import numpy as np, wave
sr=44100; L=19.0; N=int(sr*L); rng=np.random.default_rng(7)
mus=np.zeros(N); sfx=np.zeros(N)
def at(buf,t0,x,g=1.0):
    i=int(t0*sr); n=min(len(x),N-i)
    if n>0: buf[i:i+n]+=x[:n]*g
def tt(d): return np.arange(int(sr*d))/sr
def env(x,a=0.005,r=0.05):
    n=len(x);e=np.ones(n);na=max(1,int(a*sr));nr=max(1,int(r*sr));e[:na]=np.linspace(0,1,na);e[-nr:]*=np.linspace(1,0,nr);return x*e
def lp(x,a=0.05):
    y=np.zeros_like(x);s=0.0
    for i in range(len(x)): s+=a*(x[i]-s); y[i]=s
    return y
# S1: loud beep beep beep + breathing
for k in range(3):
    t=tt(0.11); b=np.sign(np.sin(2*np.pi*1950*t))*0.5+np.sin(2*np.pi*1950*t)*0.5; at(sfx,0.02+k*0.2,env(b,0.002,0.01),0.45)
br=lp(rng.standard_normal(int(sr*0.7)),0.08); e=np.sin(np.linspace(0,np.pi,len(br)))**2; at(sfx,0.0,br*e,0.9)
# hard cut thump at 0.7
t=tt(0.5); at(sfx,0.7,np.sin(2*np.pi*np.cumsum(55+60*np.exp(-t*12))/sr)*np.exp(-t*7),0.5)
# sad ambient pad (A minor -> F -> A minor), 0.7-19
def pad(freqs,d):
    t=tt(d); x=sum(np.sin(2*np.pi*f*t+0.3*np.sin(2*np.pi*0.25*t))+0.3*np.sin(2*np.pi*2*f*t) for f in freqs)/len(freqs)
    return env(x*(0.85+0.15*np.sin(2*np.pi*0.2*t)),0.8,0.8)
for t0,d,ch in [(0.7,4.6,[110,130.8,164.8]),(5.0,5.4,[87.3,110,130.8]),(10.0,5.2,[98,123.5,146.8]),(15.0,4.0,[110,130.8,164.8])]:
    at(mus,t0,pad(ch,d),0.5)
# motor/brush whirr (soft 0.7-10), struggling (10-13.2)
def motor(d,base,wob,g):
    t=tt(d); f=base*(1+wob*np.sin(2*np.pi*3.1*t)); ph=2*np.pi*np.cumsum(f)/sr
    return env((np.sin(ph)*0.6+np.sign(np.sin(ph))*0.2+lp(rng.standard_normal(len(t)),0.3)*0.4)*g,0.05,0.1)
at(sfx,0.7,motor(4.3,140,0.02,1),0.05); at(sfx,10.0,motor(3.2,190,0.12,1),0.14)
# typewriter clicks 2.1-2.9 (17 letters)
for k in range(17):
    t=tt(0.03); at(sfx,2.1+k*0.047,rng.standard_normal(len(t))*np.exp(-t*220),0.25)
# bumps
for t0 in (3.3,4.2):
    t=tt(0.25); at(sfx,t0,np.sin(2*np.pi*np.cumsum(180-100*t)/sr)*np.exp(-t*25)+rng.standard_normal(len(t))*np.exp(-t*80)*0.4,0.5)
# low-battery blips while 3% blinks (3.0-5.0)
for k in range(5):
    t=tt(0.08); at(sfx,3.0+k*0.4,env(np.sin(2*np.pi*1320*t),0.003,0.03),0.10)
# sad piano note at 5.0 (A4+E5, struck)
def piano(f,d=3.5):
    t=tt(d); x=sum((0.6**h)*np.sin(2*np.pi*f*(h+1)*t)*np.exp(-t*(1.2+h*0.9)) for h in range(6)); return env(x,0.002,0.3)
at(mus,5.0,piano(440)+0.6*piano(659.3),0.35); at(mus,7.5,piano(392)*0.8,0.25)
# phone vibration buzz at 5.05
t=tt(0.45); at(sfx,5.05,np.sin(2*np.pi*170*t)*(0.5+0.5*np.sign(np.sin(2*np.pi*14*t)))*np.exp(-t*2),0.12)
# button press click 13.0 + call tone 13.2-15
t=tt(0.04); at(sfx,13.0,rng.standard_normal(len(t))*np.exp(-t*150),0.4)
for k in range(2):
    t=tt(0.9); at(sfx,13.3+k*0.9,env(np.sin(2*np.pi*440*t)+np.sin(2*np.pi*480*t),0.01,0.05)*(t<0.6),0.08)
# beep off at 15.8
t=tt(0.6); at(sfx,15.8,env(np.sin(2*np.pi*np.cumsum(900*np.exp(-t*3.2))/sr),0.005,0.15),0.22)
# shake hit at 15.0
t=tt(0.6); at(sfx,15.0,np.sin(2*np.pi*np.cumsum(48+40*np.exp(-t*10))/sr)*np.exp(-t*5),0.45)
mix=mus*0.2/np.abs(mus).max()*3.0+sfx  # music bed ~20%
mix[int(18.3*sr):]*=np.linspace(1,0,N-int(18.3*sr))
mix=np.tanh(mix*1.1)/np.tanh(1.1); mix*=0.89/np.abs(mix).max()
st=np.stack([mix,mix],1)
o=wave.open('sfx_mix.wav','w');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((st*32767).astype(np.int16).tobytes());o.close()
print('ok',L)
