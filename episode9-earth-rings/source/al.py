import wave, re, json, sys
from pocketsphinx import Decoder
def align(txt,wav):
    words=re.findall(r"[a-z']+",open(txt).read().lower().replace('-',' '))
    d=Decoder(samprate=16000)
    for w,p in [('rosh','R OW SH'),('svalbard','S V AA L B AA R D'),('cassini','K AH S IY N IY'),('phobos','F OW B AA S'),('everests','EH V ER AH S T S'),("saturn's",'S AE T ER N Z'),("earth's",'ER TH S'),("moon's",'M UW N Z'),('midwinter','M IH D W IH N T ER')]:
        try: d.add_word(w,p,True)
        except RuntimeError: pass
    w=wave.open(wav,'rb');data=w.readframes(w.getnframes())
    d.set_align_text(' '.join(words));d.start_utt();d.process_raw(data,full_utt=True);d.end_utt()
    ws=[(re.sub(r'\(\d\)','',s.word),s.start_frame/100,s.end_frame/100) for s in d.seg() if not s.word.startswith('<') and not s.word.startswith('[')]
    return ws,words
if __name__=='__main__':
    ws,words=align(sys.argv[1],sys.argv[2]);json.dump(ws,open(sys.argv[3],'w'));print(sys.argv[2],len(ws),'of',len(words))
