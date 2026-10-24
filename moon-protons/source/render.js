const {chromium}=require('playwright');const path=require('path');const {spawn}=require('child_process');
const [,,startF,endF,fps,out]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+path.resolve(__dirname,process.env.PAGE||'anim.html'));await p.evaluate(()=>window.ready);
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',fps,'-i','-','-c:v','libx264','-preset','medium','-crf','14','-pix_fmt','yuv420p',out]);
for(let f=+startF;f<+endF;f++){await p.evaluate(t=>render(t),f/ +fps);const buf=await p.screenshot({type:'png'});
  if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(f%120===0)console.log(out,f);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();})();
