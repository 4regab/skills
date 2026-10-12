import * as THREE from 'three';
import {loopState} from './motion-core.mjs';
// Call with a canvas and a preloaded, high-resolution UI texture, or null for material study.
// Configure an exact package version/import map in the host project. No CDN is hardcoded here.
export function makeThreeAdapter(canvas,uiTexture=null){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});
 renderer.setSize(1920,1080,false);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#f2f7fc');
 const h=6.5,w=h*1920/1080,camera=new THREE.OrthographicCamera(-w/2,w/2,h/2,-h/2,.1,40);camera.position.set(0,0,10);camera.lookAt(0,0,0);
 const group=new THREE.Group();scene.add(group);
 const material=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.3,metalness:0});
 const surface=new THREE.Mesh(new THREE.BoxGeometry(5.4,3,.06),material);group.add(surface);
 // BoxGeometry is a starter slab, not a bevelled final asset. Replace geometry for a close-up.
 let ui=null;
 if(uiTexture){uiTexture.colorSpace=THREE.SRGBColorSpace;ui=new THREE.Mesh(new THREE.PlaneGeometry(5.25,2.85),new THREE.MeshBasicMaterial({map:uiTexture,transparent:true}));ui.position.z=.035;group.add(ui);}
 const key=new THREE.DirectionalLight('#fff5eb',2.5);key.position.set(-3,5,6);scene.add(key);
 const fill=new THREE.DirectionalLight('#e8eef6',.7);fill.position.set(4,1,3);scene.add(fill);
 const rim=new THREE.DirectionalLight('#ffffff',1.2);rim.position.set(2,4,-2);scene.add(rim);scene.add(new THREE.AmbientLight('#ffffff',.35));
 const glow=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.ShaderMaterial({depthWrite:false,uniforms:{uStrength:{value:.12}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec2 vUv;uniform float uStrength;void main(){float a=exp(-10.0*dot(vUv-vec2(.7,.75),vUv-vec2(.7,.75)))*uStrength;gl_FragColor=vec4(.03,.47,.91,a);}',transparent:true}));glow.position.z=-1;scene.add(glow);
 function renderAt(t){const s=loopState(t);group.visible=s.panelAlpha>0;group.position.set(0,-s.panelY/180,0);group.scale.setScalar(s.panelScale);group.rotation.set(0,0,0);material.transparent=true;material.opacity=s.panelAlpha;if(ui)ui.material.opacity=s.panelAlpha;camera.zoom=s.zoom;camera.updateProjectionMatrix();glow.material.uniforms.uStrength.value=.12;renderer.clear();renderer.render(scene,camera);return s;}
 const dispose=()=>{scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose();});renderer.dispose();};
 return {renderAt,dispose,scene,camera,renderer};
}
