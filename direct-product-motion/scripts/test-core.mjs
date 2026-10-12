import assert from 'node:assert/strict';
import {loopState,cubicBezier,spring,hash01,cueSample} from '../assets/motion-core.mjs';
import {narrativeState} from '../assets/narrative-state.mjs';
import {cuePcm,toWav} from '../assets/audio-offline.mjs';
const near=(a,b,e=1e-8)=>assert.ok(Math.abs(a-b)<e,`${a} != ${b}`);
for(const t of [0,.55,1,2.5,6,7.99,-.1,9]){
 const first=JSON.stringify(loopState(t));loopState(5.1);assert.equal(first,JSON.stringify(loopState(t)));
 const a=loopState(t),b=loopState(t+8);for(const k of ['buttonScale','panelAlpha','panelY','panelScale','focusAlpha','zoom'])near(a[k],b[k]);
}
assert.deepEqual(loopState(0),loopState(8));assert.deepEqual(loopState(7.99),loopState(0));
for(let f=0;f<480;f++){
 const s=loopState(f/60);assert.ok(s.panelAlpha>=0&&s.panelAlpha<=1);assert.ok(s.rows.every(v=>v>=0&&v<=1));assert.ok(Object.values(s).flat().every(Number.isFinite));
}
for(const t of [3.1,4,5.5])assert.deepEqual(loopState(t),loopState(3));
assert.equal(cubicBezier(.22,1,.36,1,0),0);assert.equal(cubicBezier(.22,1,.36,1,1),1);
near(cubicBezier(0,0,1,1,.37),.37);assert.ok(cubicBezier(.22,1,.36,1,.5)>.8);
assert.equal(spring(-1),0);assert.ok(spring(.22,.55,3.5)>1);near(spring(5),1);
assert.equal(hash01(42,7),hash01(42,7));assert.notEqual(hash01(42,7),hash01(42,8));
assert.equal(cueSample(36,60),29600);assert.equal(cueSample(120,60),96800);
assert.deepEqual(narrativeState(0),narrativeState(24));
for(const t of [0,3,6,10,14,18,23.9])assert.equal(JSON.stringify(narrativeState(t)),JSON.stringify(narrativeState(t)));
for(const kind of ['click','pop','swell']){
 const a=cuePcm(kind,48000,42),b=cuePcm(kind,48000,42);assert.deepEqual(a,b);near(a[0],0);assert.ok(a.every(Number.isFinite));assert.ok(Math.max(...a)<1);
}
const track=cuePcm('click',48000,42);const wav=toWav({length:track.length,numberOfChannels:1,sampleRate:48000,getChannelData:()=>track});assert.equal(wav.size,44+track.length*2);
console.log('PASS: repeatability, periodic state, scene bounds, read hold, easing, spring, cue samples, seeded PCM, WAV size');
