import json
s=open('../ep8/ep8.html').read().split('\n')
lib='\n'.join(s[:151]).replace('#D32F2F','#E53935')
al=json.load(open('align.json'))
body='const ALW='+json.dumps([[w,round(a,2)] for w,a,b in al])+';\n'+'\n'.join(open(f).read() for f in ('lib10.js','scenes10a.js','scenes10b.js','scenes10c.js'))
open('ep10.html','w').write(lib+'\n'+body+'\n</script></body></html>\n')
