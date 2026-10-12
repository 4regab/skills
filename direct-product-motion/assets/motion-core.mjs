export const clamp = (v, a=0, b=1) => Math.max(a, Math.min(b, v));
export const mix = (a,b,u) => a+(b-a)*u;
export const mod = (v,n) => ((v%n)+n)%n;
export const progress = (f,a,b) => clamp((f-a)/(b-a));
export const smooth = u => { u=clamp(u); return u*u*(3-2*u); };
export const outQuint = u => 1-(1-clamp(u))**5;
export const outExpo = u => u<=0 ? 0 : u>=1 ? 1 : 1-2**(-10*u);
export function cubicBezier(x1,y1,x2,y2,u) {
  if (![x1,y1,x2,y2,u].every(Number.isFinite) || x1<0 || x1>1 || x2<0 || x2>1) throw Error('Invalid Bezier');
  if (u<=0) return 0; if (u>=1) return 1;
  const b=(s,a,c)=>3*(1-s)**2*s*a+3*(1-s)*s*s*c+s**3;
  let lo=0,hi=1;
  for(let i=0;i<40;i++){const mid=(lo+hi)/2;if(b(mid,x1,x2)<u)lo=mid;else hi=mid;}
  return b((lo+hi)/2,y1,y2);
}
export function spring(t,zeta=.7,hz=2.8){
  if (!(zeta>0 && zeta<1 && hz>0)) throw Error('Underdamped spring requires 0<zeta<1, hz>0');
  if(t<=0)return 0;
  const w=2*Math.PI*hz,d=Math.sqrt(1-zeta*zeta);
  return 1-Math.exp(-zeta*w*t)*(Math.cos(w*d*t)+zeta/d*Math.sin(w*d*t));
}
// Stateless hash. No mutable random sequence to invalidate out-of-order seeks.
export function hash01(seed,id){
  let x=(seed ^ Math.imul(id+1,0x9e3779b1))>>>0;
  x=Math.imul(x^(x>>>16),0x85ebca6b);x=Math.imul(x^(x>>>13),0xc2b2ae35);
  return ((x^(x>>>16))>>>0)/4294967296;
}
export function frameTime(frame,fps){return frame/fps;}
export function cueSample(visualFrame,fps,sampleRate=48000,offsetFrames=1){return Math.round((visualFrame+offsetFrames)*sampleRate/fps);}
export function loopState(t,{fps=60,N=480,seed=421337,loop=true}={}){
  if(!Number.isFinite(t)||!Number.isInteger(N)||N<=0||fps<=0)throw Error('Invalid time/config');
  const T=N/fps,local=loop?mod(t,T):clamp(t,0,T),q=local/T*480;
  const entry=outQuint(progress(q,60,84)),exit=smooth(progress(q,360,408));
  const visible=entry*(1-exit);
  const settle=smooth(progress(q,150,180));
  const hero=mix(spring((q-60)/60,.7,2.8),1,settle);
  let press=0;
  if(q>=30&&q<36)press=smooth(progress(q,30,36));
  else if(q>=36&&q<60)press=(1-spring((q-36)/60,.65,4))*(1-smooth(progress(q,54,60)));
  // Hidden states are reset explicitly. A seek never depends on the last draw.
  const active=q>=60&&q<420;
  return {
    buttonScale:1-.035*press,
    panelAlpha:active?visible:0,
    panelY:active?36*(1-hero)+24*exit:36,
    panelScale:active?.97+.03*hero:.97,
    rows:[0,1,2].map(i=>active?outQuint(progress(q,120+i*4,144+i*4))*(1-exit):0),
    focusAlpha:(1-smooth(progress(q,54,72)))*smooth(progress(q,24,30)),
    accent:hash01(seed,0),
    zoom:1,
  };
}
export const LOOP_VISUAL_CUES=[{frame:36,kind:'click'},{frame:60,kind:'pop'},{frame:120,kind:'pop'},{frame:124,kind:'pop'},{frame:128,kind:'pop'},{frame:360,kind:'swell'}];
