const{readFileSync:R,readdirSync:D,mkdirSync:M,writeFileSync:W}=require("node:fs")
const T={0:0,1:17,2:65,3:4,4:6,5:10,6:11,7:15,48:32,49:36,50:36,51:32,52:0,64:5,65:8,80:4,81:4,82:1,83:4}
for(let i=16;i<35;i++)if(i!=31)T[i]=9;T[23]=T[27]=5
const V={16:(a,b)=>a+b|0,17:(a,b)=>a-b|0,18:Math.imul,19:(a,b)=>b?a/b|0:null,20:(a,b)=>b?a%b|0:null,21:(a,b)=>b?(a>>>0)/(b>>>0)|0:null,22:(a,b)=>b?(a>>>0)%(b>>>0)|0:null,24:(a,b)=>a&b,25:(a,b)=>a|b,26:(a,b)=>a^b,28:(a,b)=>a<<(b&31),29:(a,b)=>a>>(b&31),30:(a,b)=>(a>>>(b&31))|0,32:(a,b)=>a===b?1:0,33:(a,b)=>a<b?1:0,34:(a,b)=>a>>>0<b>>>0?1:0}
function RN(p,i){
 let n=p.length,D=new Int32Array(256),sp=0,C=new Int32Array(64),cs=0,M=new Int32Array(256),o=new Uint8Array(65536),ol=0,ip=0,pc=0,s=0
 const r=e=>[o.slice(0,ol),e]
 for(;;){
  if(s===1e6)return r(10);if(pc<0||pc>=n)return r(9)
  const op=p[pc],t=T[op]
  if(t==null)return r(5)
  const m=t>>4,po=t>>2&3,pu=t&3
  if(pc+m>=n)return r(9)
  s++
  const nx=pc+1+m
  if(sp<po)return r(2);if(sp-po+pu>256)return r(3)
  pc=nx
  switch(op){
   case 0:return r(0);
   case 1:D[sp++]=(p[nx-1]<<24)>>24;break
   case 2:D[sp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break
   case 3:sp--;break
   case 4:D[sp]=D[sp-1];sp++;break
   case 5:{const x=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=x;break}
   case 6:D[sp]=D[sp-2];sp++;break
   case 7:{const x=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=x;break}
   case 23:D[sp-1]=-D[sp-1]|0;break
   case 27:D[sp-1]=~D[sp-1];break
   case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
    const b=D[sp-1],a=D[sp-2],v=V[op](a,b);if(v==null)return r(4);sp-=2;D[sp++]=v;break
   }
   case 48:case 49:case 50:{
    const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;let take=true
    if(op!==48){const v=D[--sp];take=op===49?v===0:v!==0}
    if(take)pc=nx+rel;break
   }
   case 51:
    if(cs===64)return r(7)
    C[cs++]=nx;pc=p[nx-2]|p[nx-1]<<8;break
   case 52:
    if(!cs)return r(8)
    pc=C[--cs];break
   case 64:{const a=D[sp-1];if(a<0||a>=256)return r(6);D[sp-1]=M[a];break}
   case 65:{const a=D[sp-1],v=D[sp-2];if(a<0||a>=256)return r(6);sp-=2;M[a]=v;break}
   case 80:{const b=new TextEncoder().encode(String(D[sp-1]));if(ol+b.length>65536)return r(11);sp--;o.set(b,ol);ol+=b.length;break}
   case 81:if(ol+1>65536)return r(11);o[ol++]=D[--sp]&255;break
   case 82:D[sp++]=ip<i.length?i[ip++]:-1;break
   case 83:return r(D[--sp]&255)
  }
 }
}
const din=process.env.MAKEFUN_INPUT_DIR||'/input',dout=process.env.MAKEFUN_OUTPUT_DIR||'/output'
M(dout,{recursive:true})
for(const id of D(din)){try{const [o,x]=RN(R(din+"/"+id+"/program.bin"),R(din+"/"+id+"/input.bin"));M(dout+"/"+id,{recursive:true});W(dout+"/"+id+"/stdout.bin",o);W(dout+"/"+id+"/exit.txt",String(x))}catch(_){}} 
