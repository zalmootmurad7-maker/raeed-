import wave, re, json
from pocketsphinx import Decoder
txt=open('script.txt').read().lower()
words=re.findall(r"[a-z']+",txt)
d=Decoder(samprate=16000)
for w,ph in [('creepier','K R IY P IY ER'),('moonless','M UW N L AH S'),('quintillion','K W IH N T IH L Y AH N'),
             ('spaghettification','S P AH G EH T AH F AH K EY SH AH N'),('unimaginably','AH N IH M AE JH AH N AH B L IY')]:
    d.add_word(w,ph,True)
w=wave.open('C.wav','rb');data=w.readframes(w.getnframes())
d.set_align_text(' '.join(words))
d.start_utt();d.process_raw(data,full_utt=True);d.end_utt()
segs=[(s.word,s.start_frame/100,s.end_frame/100) for s in d.seg()]
ws=[(re.sub(r'\(\d\)','',a),b,c) for a,b,c in segs if not a.startswith('<') and not a.startswith('[')]
json.dump(ws,open('align.json','w'))
print(len(ws),'of',len(words),'words')
line=[]
for w_,a,b in ws:
    line.append(f"{w_}@{a:.2f}")
    if len(line)==11: print(' '.join(line)); line=[]
print(' '.join(line))
