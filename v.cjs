let{readFileSync:R,readdirSync:D,mkdirSync:M,writeFileSync:W}=require("node:fs")
let I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output"
Z={0:0,1:17,2:65,3:4,4:6,5:10,6:11,7:15,23:5,27:5,48:32,49:36,50:36,51:32,52:0,64:5,65:8,80:4,81:4,82:1,83:4}
for(k=16;k<35;k++)Z[k]??=9
c=y=>p[y-2]|p[y-1]<<8,g=y=>y+(c(y)<<16>>16)
E=f=>b?(P(f()),void 0):4
Q="return 0$P(p[y-1]<<24>>24)$P(p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24)$$P(b,b)$P(b,a)$P(a,b,a)$P(a,b,S.pop())$$$$$$$$$P(a+b|0)$P(a-b|0)$P(Math.imul(a,b))$return E(()=>Math.trunc(a/b)|0)$return E(()=>a%b|0)$return E(()=>(a>>>0)/(b>>>0)|0)$return E(()=>(a>>>0)%(b>>>0)|0)$P(-b|0)$P(a&b)$P(a|b)$P(a^b)$P(~b)$P(a<<(b&31))$P(a>>(b&31))$P(a>>>(b&31)|0)$$P(+(a==b))$P(+(a<b))$P(+((a>>>0)<(b>>>0)))$$$$$$$$$$$$$$x=g(y)$b||(x=g(y))$b&&(x=g(y))$if(C.length>63)return 7;C.push(y);x=c(y)$if(!C.length)return 8;x=C.pop()$$$$$$$$$$$$if(b<0|b>255)return 6;P(m[b]|0)$if(b<0|b>255)return 6;m[b]=a$$$$$$$$$$$$$$$u=\"\"+b;if(o.length+u.length>65536)return 11;o.push(...Buffer.from(u))$if(o.length>65535)return 11;o.push(b&255)$P(j<n.length?n[j++]:-1)$return b&255"
H=Q.split("$").map(s=>new Function("u",s))
function V(A,B){p=A;n=B;S=[];C=[];m=[];o=[];x=j=0;P=S.push.bind(S)
for(k=0;;){if(++k>1e6)return[o,10]
if(x<0|x>=p.length)return[o,9]
z=Z[op=p[x]]
if(z==null)return[o,5]
l=z>>4
if(x+1+l>p.length)return[o,9]
t=z>>2&3
if(S.length<t)return[o,2]
if(S.length-t+(z&3)>256)return[o,3]
y=x+1+l;x=y
if(t)b=S.pop(),t>1&&(a=S.pop())
if((r=H[op]())!=null)return[o,r]}}
f=s=>R(I+"/"+id+"/"+s);for(id of D(I))try{[o,e]=V(f("program.bin"),f("input.bin"));M(O+"/"+id);W(O+"/"+id+"/stdout.bin",Buffer.from(o));W(O+"/"+id+"/exit.txt",e+"")}catch{}
