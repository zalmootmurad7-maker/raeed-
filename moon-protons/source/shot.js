const {chromium}=require('playwright');const path=require('path');
(async()=>{const [,,page,w,h,out]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:+w,height:+h}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(__dirname,page));await p.evaluate(()=>window.ready);await p.screenshot({path:out});console.log(errs.join('\n')||'ok');await b.close();})();
