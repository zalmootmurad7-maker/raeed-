import wave, re, json
from pocketsphinx import Decoder
words=re.findall(r"[a-z']+",open('script.txt').read().lower())
d=Decoder(samprate=16000)
d.add_word('drawbridges','D R AO B R IH JH IH Z',True)
d.add_word('atmospheres','AE T M AH S F IH R Z',True)
w=wave.open('vo16.wav','rb');data=w.readframes(w.getnframes())
d.set_align_text(' '.join(words));d.start_utt();d.process_raw(data,full_utt=True);d.end_utt()
ws=[(re.sub(r'\(\d\)','',s.word),s.start_frame/100,s.end_frame/100) for s in d.seg() if not s.word.startswith('<') and not s.word.startswith('[')]
json.dump(ws,open('align.json','w'));print(len(ws),'of',len(words))
