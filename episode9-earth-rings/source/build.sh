cd $(dirname $0) && python3 -c "
s=open('../ep7/ep7.html').read().split('\n');lib='\n'.join(s[:156])
open('ep9.html','w').write(lib+'\n'+'\n'.join(open(f).read() for f in ('lib9.js','scenes9a.js','scenes9b.js','scenes9c.js'))+'\n</script></body></html>\n')"
