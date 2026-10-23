'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {choose,run,anchors}=require('./seleccionLexica');
test('varies an existing stylistic opener without editing the emitted phrase',()=>{
 run(()=>{assert.equal(choose(['Se observa','Se identifica'],0),'Se observa');assert.equal(choose(['Se observa','Se identifica'],0),'Se identifica')});
});
test('does not exchange uncertainty, negation, anatomy, grade, laterality, levels or measures',()=>{
 for(const [first,second] of [
  ['Probable litiasis renal derecha de 6 mm.','Litiasis renal derecha de 6 mm.'],
  ['Sin edema frontal derecho.','Con edema frontal derecho.'],
  ['Hernia C4-C5 moderada.','Hernia C5-C6 severa.'],
  ['Lesión T2 hiperintensa de 2 cm.','Lesión T2 hipointensa de 3 cm.']
 ])run(()=>{choose([first],0);assert.equal(choose([first,second],0),first);assert.notEqual(anchors(first),anchors(second))});
});
test('preserves clinically necessary repeated terms and literal manual details',()=>{
 const text='Sin fragmentación ósea ni retropulsión ósea. Observación: «texto literal; A-B».\nSegundo párrafo.';
 run(()=>assert.equal(choose([text],0),text));
});
test('does not mutate the bank and preserves native choice outside generation',()=>{
 const bank=Object.freeze(['Se observa','Se identifica']);assert.equal(choose(bank,1),bank[1]);run(()=>choose(bank,0));assert.equal(choose(bank,0),bank[0]);
});
test('keeps concurrent requests isolated',async()=>{
 const values=await Promise.all(Array.from({length:20},()=>run(async()=>{await Promise.resolve();return choose(['Se observa','Se identifica'],0)})));
 assert.ok(values.every(x=>x==='Se observa'));
});

test('varies complete assertive introductions while preserving their clinical clause',()=>{
 run(()=>{
  const a='Se observa hernia C4-C5 derecha de 3 mm.';
  const b='Se observa hernia C5-C6 izquierda de 4 mm.';
  assert.equal(choose([a],0),a);
  assert.equal(choose([b],0),'Se identifica hernia C5-C6 izquierda de 4 mm.');
 });
});
test('does not count fragments embedded in their own composed sentence twice',()=>{
 run(()=>{const opener=choose(['Se observa'],0);assert.equal(choose([opener+' hernia C4-C5.'],0),'Se observa hernia C4-C5.')});
});
