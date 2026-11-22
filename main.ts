import {readFileSync,readdirSync,mkdirSync,writeFileSync} from "node:fs";
const inp=process.env.MAKEFUN_INPUT_DIR??"/input";
const outDir=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const V=new Set([0,1,2,3,4,5,6,7,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,33,34,48,49,50,51,52,53,64,65,80,81,82,83]);
const L:Record<number,number>={1:1,2:4,48:2,49:2,50:2,51:2};
const P:Record<number,number>={3:1,4:1,5:2,6:2,7:3,16:2,17:2,18:2,19:2,20:2,21:2,22:2,23:1,24:2,25:2,26:2,27:1,28:2,29:2,30:2,32:2,33:2,34:2,49:1,50:1,64:1,65:2,80:1,81:1,83:1};
const Q:Record<number,number>={1:1,2:1,4:2,5:2,6:3,7:3,16:1,17:1,18:1,19:1,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:1,28:1,29:1,30:1,32:1,33:1,34:1,49:1,50:1,64:1};
function run(p:Uint8Array,input:Uint8Array):[number[],number]{
 const st:number[]=[],cs:number[]=[],mem:number[]=Array(256).fill(0),out:number[]=[];
 let pc=0,steps=0,ii=0;
 for(;;){
  if(steps>=1000000)return[out,10];
  if(pc<0||pc>=p.length)return[out,9];
  const op=p[pc];
  if(!V.has(op))return[out,5];
  const im=L[op]??0;
  if(pc+1+im>p.length)return[out,9];
  steps++;
  const pops=P[op]??0,pushes=Q[op]??0;
  if(st.length<pops)return[out,2];
  if(st.length-pops+pushes>256)return[out,3];
  const next=pc+1+im;
  pc=next;
  switch(op){
   case 0:return[out,0];
   case 1:st.push((p[next-1]<<24)>>24);break;
   case 2:st.push(p[next-4]|p[next-3]<<8|p[next-2]<<16|p[next-1]<<24);break;
   case 3:st.pop();break;
   case 4:{const a=st.pop()!;st.push(a,a);break;}
   case 5:{const b=st.pop()!,a=st.pop()!;st.push(b,a);break;}
   case 6:{const b=st.pop()!,a=st.pop()!;st.push(a,b,a);break;}
   case 7:{const c=st.pop()!,b=st.pop()!,a=st.pop()!;st.push(b,c,a);break;}
   case 16:{const b=st.pop()!,a=st.pop()!;st.push((a+b)|0);break;}
   case 17:{const b=st.pop()!,a=st.pop()!;st.push((a-b)|0);break;}
   case 18:{const b=st.pop()!,a=st.pop()!;st.push(Math.imul(a,b));break;}
   case 19:{const b=st.pop()!,a=st.pop()!;if(b===0)return[out,4];st.push(Math.trunc(a/b)|0);break;}
   case 20:{const b=st.pop()!,a=st.pop()!;if(b===0)return[out,4];st.push((a%b)|0);break;}
   case 21:{const b=st.pop()!,a=st.pop()!;if(b===0)return[out,4];st.push(((a>>>0)/(b>>>0))|0);break;}
   case 22:{const b=st.pop()!,a=st.pop()!;if(b===0)return[out,4];st.push(((a>>>0)%(b>>>0))|0);break;}
   case 23:{const a=st.pop()!;st.push((-a)|0);break;}
   case 24:{const b=st.pop()!,a=st.pop()!;st.push(a&b);break;}
   case 25:{const b=st.pop()!,a=st.pop()!;st.push(a|b);break;}
   case 26:{const b=st.pop()!,a=st.pop()!;st.push(a^b);break;}
   case 27:{const a=st.pop()!;st.push(~a);break;}
   case 28:{const b=st.pop()!,a=st.pop()!;st.push(a<<(b&31));break;}
   case 29:{const b=st.pop()!,a=st.pop()!;st.push(a>>(b&31));break;}
   case 30:{const b=st.pop()!,a=st.pop()!;st.push((a>>>(b&31))|0);break;}
   case 32:{const b=st.pop()!,a=st.pop()!;st.push(a===b?1:0);break;}
   case 33:{const b=st.pop()!,a=st.pop()!;st.push(a<b?1:0);break;}
   case 34:{const b=st.pop()!,a=st.pop()!;st.push((a>>>0)<(b>>>0)?1:0);break;}
   case 48:{const off=((p[next-2]|p[next-1]<<8)<<16)>>16;pc=next+off;break;}
   case 49:{const v=st.pop()!;if(v===0){const off=((p[next-2]|p[next-1]<<8)<<16)>>16;pc=next+off;}break;}
   case 50:{const v=st.pop()!;if(v!==0){const off=((p[next-2]|p[next-1]<<8)<<16)>>16;pc=next+off;}break;}
   case 51:{if(cs.length>=64)return[out,7];cs.push(next);pc=p[next-2]|p[next-1]<<8;break;}
   case 52:{if(!cs.length)return[out,8];pc=cs.pop()!;break;}
   case 64:{const a=st.pop()!;if(a<0||a>255)return[out,6];st.push(mem[a]);break;}
   case 65:{const a=st.pop()!,v=st.pop()!;if(a<0||a>255)return[out,6];mem[a]=v;break;}
   case 80:{const v=st.pop()!,s=String(v);if(out.length+s.length>65536)return[out,11];for(const c of s)out.push(c.charCodeAt(0));break;}
   case 81:{const v=st.pop()!;if(out.length>=65536)return[out,11];out.push(v&255);break;}
   case 82:st.push(ii<input.length?input[ii++]:-1);break;
   case 83:{const v=st.pop()!;return[out,v&255];}
  }
 }
}
for(const d of readdirSync(inp,{withFileTypes:true})){
 if(!d.isDirectory())continue;
 const id=d.name;
 const p=new Uint8Array(readFileSync(`${inp}/${id}/program.bin`));
 const input=new Uint8Array(readFileSync(`${inp}/${id}/input.bin`));
 const [o,e]=run(p,input);
 const od=`${outDir}/${id}`;
 mkdirSync(od,{recursive:true});
 writeFileSync(`${od}/stdout.bin`,Buffer.from(o));
 writeFileSync(`${od}/exit.txt`,String(e));
}
