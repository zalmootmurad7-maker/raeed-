const {chromium}=require('playwright');const path=require('path');const {spawn}=require('child_process');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+path.resolve(__dirname,'../ep7/ep7.html'));await p.evaluate(()=>window.ready);
await p.evaluate(()=>{for(const s of SC)if(s[1]===S20)s[2]='cut';});
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-i','-','-c:v','libx264','-crf','14','-pix_fmt','yuv420p',process.argv[2]]);
const t0=94.24,n=Math.round((98.75-t0)*30);for(let f=0;f<n;f++){await p.evaluate(([t,u])=>{render(Math.max(t,94.8));const c=document.getElementById('c');const k=Math.min(1,u/0.5),e=1-Math.pow(1-k,3),z=1.08-0.08*e,j=(1-e)*10;c.style.transformOrigin='50% 40%';c.style.transform=`translate(${(Math.sin(u*90)*j).toFixed(1)}px,${(Math.cos(u*77)*j).toFixed(1)}px) scale(${z})`;},[t0+f/30,f/30]);const buf=await p.screenshot({type:'png'});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();})();
