import {clamp,progress,smooth,outQuint,spring,mix,mod} from './motion-core.mjs';
export const A_RANGES=[[0,180],[180,360],[360,600],[600,840],[840,1080],[1080,1440]];
export const A_COPY=['Too many steps?','One clear action.','Choose. Confirm. Done.','Everything in view.','Ready for the next step.','Try your product.'];
export function narrativeState(t,{fps=60,N=1440,loop=true}={}){
 const T=N/fps,f=(loop?mod(t,T):clamp(t,0,T-1/fps))/T*1440;
 let scene=A_RANGES.findIndex(([a,b])=>f>=a&&f<b);if(scene<0)scene=5;
 const local=f-A_RANGES[scene][0],intro=scene===0?outQuint(progress(f,30,54)):1;
 const close=loop?smooth(progress(f,1320,1380)):0;
 const emptySeam=loop&&f>=1380;
 // Stage opening/closing are identical. All transient visibility ends before seam guard.
 const mainAlpha=emptySeam?0:(scene===0?intro:1)*(1-close);
 const zoom=scene===0?1:scene===1?mix(1,1.04,smooth(progress(f,180,228))):scene===2?mix(1.04,1.08,smooth(progress(f,360,408))):scene===3?1.08:scene===4?mix(1.08,1,smooth(progress(f,840,888))):1;
 return {scene,local,copy:mainAlpha?A_COPY[scene]:'',mainAlpha,zoom,
  cardOffset:scene===1?30*(1-mix(spring((f-210)/60,.7,2.8),1,smooth(progress(f,252,264)))):0,
  details:[0,1,2].map(i=>scene===3?outQuint(progress(f,630+4*i,654+4*i)):scene>=4?1:0),
  result:scene===2?outQuint(progress(f,420,468)):scene>2?1:0,
  tilt:scene===3?8*Math.sin(Math.PI*progress(f,600,690)):0,
  // Consumers must mask all children by mainAlpha at the loop seam.
 };
}
