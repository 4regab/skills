import {hash01,cueSample} from './motion-core.mjs';
// Pure PCM cue generator; event order and sample ID fix every random value.
export function cuePcm(kind,sampleRate=48000,seed=1){
 if(!['click','pop','swell'].includes(kind))throw Error('Unknown cue kind');
 const seconds=kind==='swell'?.35:kind==='pop'?.12:.045;
 const pcm=new Float32Array(Math.ceil(seconds*sampleRate));
 for(let i=0;i<pcm.length;i++){
  const t=i/sampleRate,u=i/(pcm.length-1),attack=Math.min(1,t/.0005),fade=Math.min(1,(1-u)/.08);
  const noise=2*hash01(seed,i)-1;
  if(kind==='click')pcm[i]=.20*attack*fade*Math.exp(-t/.008)*(Math.cos(2*Math.PI*1900*t)+.20*noise);
  if(kind==='pop')pcm[i]=.23*attack*fade*Math.exp(-t/.028)*(Math.cos(2*Math.PI*520*t)+.18*Math.cos(2*Math.PI*1100*t));
  if(kind==='swell')pcm[i]=.07*Math.sin(Math.PI*u)**2*noise;
 }
 return pcm;
}
export async function renderSoundtrack({cues,fps=60,N=480,sampleRate=48000,seed=421337,loop=true}){
 const length=Math.round(N*sampleRate/fps),Ctor=globalThis.OfflineAudioContext||globalThis.webkitOfflineAudioContext;
 if(!Ctor)throw Error('OfflineAudioContext is required in this browser');
 const ctx=new Ctor(2,length,sampleRate);
 for(let n=0;n<cues.length;n++){
  const cue=cues[n],raw=cuePcm(cue.kind,sampleRate,seed+n),buffer=ctx.createBuffer(1,raw.length,sampleRate);buffer.copyToChannel(raw,0);
  const eventSample=cueSample(cue.frame,fps,sampleRate,1);
  const start=loop?((eventSample%length)+length)%length:eventSample;
  if(start<0||start>=length)throw Error('Cue outside linear timeline');
  const spawn=(at,offset=0)=>{const s=ctx.createBufferSource();s.buffer=buffer;s.connect(ctx.destination);s.start(at/sampleRate,offset/sampleRate);};
  spawn(start);
  // Copy the tail to the head if a loop cue crosses the seam.
  if(loop&&start+raw.length>length)spawn(0,length-start);
 }
 const audio=await ctx.startRendering();
 // Conservative sample-peak cap, not a LUFS or intersample true-peak measurement.
 let peak=0;for(let c=0;c<audio.numberOfChannels;c++)for(const v of audio.getChannelData(c))peak=Math.max(peak,Math.abs(v));
 const gain=peak>.6?.6/peak:1;for(let c=0;c<audio.numberOfChannels;c++){const data=audio.getChannelData(c);for(let i=0;i<data.length;i++)data[i]*=gain;}
 return audio;
}
export function toWav(audio){
 const ch=audio.numberOfChannels,n=audio.length,sr=audio.sampleRate,bytes=44+n*ch*2,buffer=new ArrayBuffer(bytes),v=new DataView(buffer);
 const str=(at,s)=>{for(let i=0;i<s.length;i++)v.setUint8(at+i,s.charCodeAt(i));};
 str(0,'RIFF');v.setUint32(4,bytes-8,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);v.setUint32(24,sr,true);v.setUint32(28,sr*ch*2,true);v.setUint16(32,ch*2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,n*ch*2,true);
 const tracks=Array.from({length:ch},(_,c)=>audio.getChannelData(c));let at=44;
 for(let i=0;i<n;i++)for(let c=0;c<ch;c++){const x=Math.max(-1,Math.min(1,tracks[c][i]));v.setInt16(at,Math.round(x*(x<0?32768:32767)),true);at+=2;}
 return new Blob([buffer],{type:'audio/wav'});
}
