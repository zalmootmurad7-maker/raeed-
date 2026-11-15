import wave, re, json, sys
from pocketsphinx import Decoder
EXTRA={'burj':'B ER JH','deimos':'D AY M OW S','dunking':'D AH NG K IH NG','eris':'IH R IH S','philae':'F IY L EY','slushball':'S L AH SH B AO L','stickman':'S T IH K M AE N',"titan's":'T AY T AH N Z','phobos':'F OW B AA S','svalbard':'S V AA L B AA R D'}
def align(txt,wav):
    words=re.findall(r"[a-z']+",open(txt).read().lower().replace('-',' '))
    d=Decoder(samprate=16000)
    for w,p in EXTRA.items():
        if d.lookup_word(w) is None:d.add_word(w,p,True)
    w=wave.open(wav,'rb');data=w.readframes(w.getnframes())
    d.set_align_text(' '.join(words));d.start_utt();d.process_raw(data,full_utt=True);d.end_utt()
    ws=[(re.sub(r'\(\d\)','',s.word),s.start_frame/100,s.end_frame/100) for s in d.seg() if not s.word.startswith('<') and not s.word.startswith('[')]
    return ws,words
if __name__=='__main__':
    ws,words=align(sys.argv[1],sys.argv[2]);json.dump(ws,open(sys.argv[3],'w'));print(sys.argv[2],len(ws),'of',len(words))
