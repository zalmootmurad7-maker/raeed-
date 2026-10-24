const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+path.resolve(__dirname,'anim.html'));await p.evaluate(()=>window.ready);
const dir=process.argv[2];const ts=process.argv.slice(3).map(Number);
for(const t of ts){await p.evaluate(t=>render(t),t);await p.screenshot({path:`${dir}/s_${t.toFixed(2).padStart(5,'0')}.png`});}
console.log(errs.join('\n')||'no errors');await b.close();})();
