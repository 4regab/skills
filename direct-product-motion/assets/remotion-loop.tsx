import React from 'react';
import {AbsoluteFill,Composition,registerRoot,useCurrentFrame,useVideoConfig} from 'remotion';
// Supply the bundled .mjs next to this file; declare its exports for strict TS projects.
// @ts-ignore JavaScript starter module
import {loopState} from './motion-core.mjs';
// @ts-ignore JavaScript starter module
import {narrativeState} from './narrative-state.mjs';
const bg='#f2f7fc',ink='#14273e',accent='#0878e9';
const panel:React.CSSProperties={position:'absolute',left:150,top:310,width:1620,height:615,borderRadius:30,background:'white',padding:55,boxShadow:'0 16px 44px #1e3f5a20'};
const Loop:React.FC=()=>{
 const f=useCurrentFrame(),{fps,durationInFrames}=useVideoConfig();const s=loopState(f/fps,{fps,N:durationInFrames});
 return <AbsoluteFill style={{background:bg,color:ink,fontFamily:'Arial'}}>
  <div style={{position:'absolute',left:150,top:140,fontSize:64}}>From request to ready.</div>
  <div style={panel}><div style={{fontSize:34}}>Your workspace</div>
   <div style={{position:'absolute',left:55,top:180,width:860}}>{['Select a request','Review the details','Confirm the result'].map(x=><div key={x} style={{padding:24,marginBottom:25,borderRadius:13,background:'#f4f7fa',fontSize:27}}>{x}</div>)}</div>
   <div style={{position:'absolute',right:100,top:130,width:470,height:96,display:'grid',placeItems:'center',borderRadius:18,background:accent,color:'white',fontSize:32,transform:`scale(${s.buttonScale})`}}>Confirm request</div>
   <div style={{position:'absolute',right:100,top:275,width:470,padding:30,borderRadius:20,background:'#edf7f4',opacity:s.panelAlpha,transform:`translateY(${s.panelY}px) scale(${s.panelScale})`}}><div style={{fontSize:31}}>Ready to continue</div>{['Details checked','Result saved','Next step available'].map((x,i)=><div key={x} style={{fontSize:23,marginTop:22,opacity:s.rows[i]}}>{x}</div>)}</div>
  </div>
 </AbsoluteFill>;
};
// Narrative scaffold. Replace the stage placeholders with product-specific UI.
const Film:React.FC=()=>{
 const frame=useCurrentFrame(),{fps,durationInFrames}=useVideoConfig();const s=narrativeState(frame/fps,{fps,N:durationInFrames});
 return <AbsoluteFill style={{background:bg,color:ink,fontFamily:'Arial',padding:130}}>
  <div style={{opacity:s.mainAlpha,transform:`scale(${s.zoom})`}}>
   <div style={{fontSize:64,marginBottom:70}}>{s.copy}</div>
   <div style={{background:'white',borderRadius:24,padding:60,height:530,boxShadow:'0 16px 44px #1e3f5a20',transform:`translateY(${s.cardOffset}px) rotate(${s.tilt}deg)`}}>
    <div style={{fontSize:40}}>Product action: scene {s.scene+1}</div>
    <div style={{fontSize:30,marginTop:50,opacity:s.result}}>Visible product result</div>
    <div style={{display:'flex',gap:30,marginTop:60}}>{s.details.map((a:number,i:number)=><div key={i} style={{opacity:a,padding:30,background:'#edf7f4',borderRadius:15,fontSize:24}}>Detail {i+1}</div>)}</div>
   </div>
  </div>
 </AbsoluteFill>;
};
const Root:React.FC=()=> <><Composition id="FeatureLoop" component={Loop} durationInFrames={480} fps={60} width={1920} height={1080}/><Composition id="ProductFilm" component={Film} durationInFrames={1440} fps={60} width={1920} height={1080}/></>;
registerRoot(Root);
