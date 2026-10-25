import wave, re, json
from pocketsphinx import Decoder
txt=open('script.txt').read().lower()
txt=txt.replace('antimatter','anti matter').replace('antiproton','anti proton').replace('anti-','anti ')
words=re.findall(r"[a-z']+",txt)
d=Decoder(samprate=16000)
dic=d.get_config()
missing=[w for w in sorted(set(words)) if d.lookup_word(w) is None]
print('missing:',missing)
w=wave.open('vo16.wav','rb');data=w.readframes(w.getnframes())
d.set_align_text(' '.join(words))
d.start_utt();d.process_raw(data,full_utt=True);d.end_utt()
segs=[(s.word,s.start_frame/100,s.end_frame/100) for s in d.seg()]
print(len(segs),'segs')
json.dump(segs,open('align.json','w'))
for s in segs[:30]:print(s)
