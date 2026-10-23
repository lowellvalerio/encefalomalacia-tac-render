"use strict";
// Request-local planning of existing paraphrases. Never edit emitted clinical text.
const {AsyncLocalStorage}=require('node:async_hooks');
const scope=new AsyncLocalStorage();
const LINKS=new Set('a al de del el la las los y en un una unos unas por con se que sin no para lo como o e su sus es ni entre desde hasta sobre hacia tras'.split(' '));
const FAMILIES={observa:'observar',observan:'observar',observado:'observar',observados:'observar',identifica:'identificar',identifican:'identificar',identificado:'identificar',identificados:'identificar',aprecia:'apreciar',aprecian:'apreciar',evidencia:'evidenciar',evidencian:'evidenciar',reconoce:'reconocer',reconocen:'reconocer',aspectos:'aspecto',distribuciones:'distribucion',morfologias:'morfologia',parenquima:'parenquima',parenquimatoso:'parenquima',parenquimatosa:'parenquima',parenquimatosos:'parenquima',parenquimatosas:'parenquima'};
const STYLE=new Set('observar identificar apreciar evidenciar reconocer aspecto'.split(' '));
const norm=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function terms(text){return(norm(text).match(/[a-z]+/g)||[]).filter(x=>x.length>2&&!LINKS.has(x)).map(x=>FAMILIES[x]||x)}
function anchors(text){
 const s=norm(text);const all=[];
 // Exact residual vocabulary protects every clinical qualifier, including uncertainty.
 all.push(...terms(text).filter(word=>!STYLE.has(word)));
 // Clinical quantities, vertebral levels, laterality, grades, signal and techniques
 // must agree with the native preferred paraphrase before another can be chosen.
 for(const pattern of [/\d+(?:[.,]\d+)?/g,/\b[cdlt]\d+(?:[-–][cdlt]?\d+)?\b/g,/\b(?:derech[oa]s?|izquierd[oa]s?|bilateral(?:es)?|ipsilateral(?:es)?|contralateral(?:es)?|central(?:es)?)\b/g,/\b(?:leve(?:s)?|moderad[oa]s?|sever[oa]s?|escas[oa]s?|extens[oa]s?)\b/g,/\b(?:hipointens[oa]s?|hiperintens[oa]s?|isointens[oa]s?|hipodens[oa]s?|hiperdens[oa]s?|isodens[oa]s?|flair|adc|stir|dwi|tof|pi[- ]?rads|birads)\b/g])all.push(...(s.match(pattern)||[]));
 all.push('negations:'+((s.match(/\b(?:sin|no|ausencia)\b/g)||[]).length));return all.sort().join('|');
}
// Controlled assertive openers: only the introductory verb changes; the complete
// clinical clause remains byte-for-byte identical. Never vary certainty/negation.
function stylisticVariants(text){
 const match=/^(Se )(identifica|observa|aprecia|evidencia|reconoce)(n?)(?=\s)/.exec(text);
 if(!match)return [text];
 const tail=text.slice(match[0].length),verbs=['identifica','observa','aprecia','evidencia','reconoce'];
 return [text,...verbs.filter(verb=>verb!==match[2]).map(verb=>'Se '+verb+match[3]+tail)];
}
function choose(options,index){
 const preferred=options?.[index],memory=scope.getStore();
 if(!memory||typeof preferred!=='string'||!preferred.trim()||!Array.isArray(options)||options.some(x=>typeof x!=='string'))return preferred;
 // A composed sentence contains its already-selected fragments. Consume those
 // fragments instead of mistaking them for a repetition in a previous finding.
 const previous=memory.chunks.filter(chunk=>!(preferred.length>chunk.length&&preferred.includes(chunk)));
 const used=new Set(previous.flatMap(terms));
 const invariant=anchors(preferred);let best=preferred,bestScore=Infinity;
 const candidates=[];for(let offset=0;offset<options.length;offset++)candidates.push(...stylisticVariants(options[(index+offset)%options.length]));
 for(const candidate of candidates){if(!candidate.trim()||anchors(candidate)!==invariant)continue;
  const words=terms(candidate),local=new Set();let score=0;
  for(const word of words){if(!STYLE.has(word))continue;if(local.has(word))score+=10;if(used.has(word))score+=1;local.add(word)}
  if(score<bestScore){best=candidate;bestScore=score;}
 }
 memory.chunks=[...previous,best];return best;
}
function run(fn){return scope.getStore()?fn():scope.run({chunks:[]},fn)}
function wrapExports(exports){
 const out={...exports};for(const [key,fn]of Object.entries(exports))if(typeof fn==='function'&&/^(generar|generate)/.test(key))out[key]=function(...args){return run(()=>fn.apply(this,args))};return out;
}
module.exports={choose,run,wrapExports,terms,anchors};
