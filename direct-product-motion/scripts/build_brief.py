#!/usr/bin/env python3
# Validate a product-motion brief and emit a complete handoff.
import argparse, json, math, re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
KINDS={'click','pop','swell'}
def required(d,key):
    if key not in d: raise ValueError(f'Missing {key}')
    return d[key]
def textval(d,key,allow_empty=False):
    v=required(d,key)
    if not isinstance(v,str) or (not allow_empty and not v.strip()): raise ValueError(f'{key} must be a nonempty string')
    return v
def integer(v,label,minimum=0):
    if isinstance(v,bool) or not isinstance(v,int) or v<minimum: raise ValueError(f'{label} must be an integer >= {minimum}')
    return v
def validate(b):
    for k in ['product','audience','message','engine','palette','tone']: textval(b,k)
    textval(b,'cta',allow_empty=True)
    for k in ['fps','N','width','height']: integer(required(b,k),k,1)
    integer(required(b,'seed'),'seed')
    if not isinstance(required(b,'loop'),bool): raise ValueError('loop must be boolean')
    if not isinstance(required(b,'placeholderUi'),bool): raise ValueError('placeholderUi must be boolean')
    features=required(b,'features')
    if not isinstance(features,list) or not 1<=len(features)<=3: raise ValueError('Specify 1 to 3 features')
    for feat in features:
        for k in ['name','action','result']:textval(feat,k)
    shots=required(b,'shots')
    if not isinstance(shots,list) or not shots:raise ValueError('shots must be a nonempty list')
    cursor=0;ids=set();cues=[]
    for n,s in enumerate(shots):
        sid=textval(s,'id')
        if sid in ids:raise ValueError('Duplicate shot id')
        ids.add(sid)
        a=integer(required(s,'startFrame'),'startFrame');z=integer(required(s,'endFrame'),'endFrame',1)
        if a!=cursor or z<=a or z>b['N']:raise ValueError(f'Shot {sid} has a gap, overlap, or invalid range')
        cursor=z
        for k in ['purpose','focalObject','action','camera','lighting','transition','motion']:textval(s,k)
        copy=textval(s,'copy',allow_empty=True)
        if copy:
            hs=integer(required(s,'holdStartFrame'),'holdStartFrame');he=integer(required(s,'holdEndFrame'),'holdEndFrame')
            minimum=math.ceil(max(1.5,len(copy.split())/3+.35)*b['fps'])
            if not a<=hs<he<=z or he-hs<minimum:raise ValueError(f'Shot {sid} needs a readable hold of at least {minimum} frames')
        for j,hit in enumerate(s.get('visualHits',[])):
            f=integer(required(hit,'frame'),'visual hit frame')
            if not a<=f<z:raise ValueError(f'Hit outside shot {sid}')
            kind=required(hit,'kind')
            if kind not in KINDS:raise ValueError(f'Unsupported cue kind: {kind}')
            af=f+1
            if af>=b['N'] and not b['loop']:raise ValueError('Audio cue falls outside linear timeline')
            af=af%b['N'] if b['loop'] else af
            cues.append({'id':f'{sid}-{j+1}','visualFrame':f,'audioFrame':af,'seconds':af/b['fps'],'sample':round(af*48000/b['fps']),'kind':kind,'anchor':'onset'})
    if cursor!=b['N']:raise ValueError('Shots do not cover N frames')
    return cues

def table(shots):
    esc=lambda s:str(s).replace('|','/').replace('\n',' ')
    lines=['| Shot | Frames [start,end) | Purpose | Copy | Readable hold | Visual / audio hit frames |','|---|---|---|---|---|---|']
    for shot in shots:
        hold=f"{shot['holdStartFrame']}–{shot['holdEndFrame']}" if shot['copy'] else 'No copy'
        hits=', '.join(f"{h['kind']}: {h['frame']} / {h['frame']+1}" for h in shot.get('visualHits',[])) or 'None'
        values=[shot['id'],f"{shot['startFrame']}–{shot['endFrame']}",shot['purpose'],shot['copy'],hold,hits]
        lines.append('| '+' | '.join(map(esc,values))+' |')
    for shot in shots:
        lines.extend(['',f"### {shot['id']}",'',f"Focal object: {shot['focalObject']}.",f"Action/result: {shot['action']}",f"Camera: {shot['camera']}",f"Lighting: {shot['lighting']}",f"Motion: {shot['motion']}",f"Transition: {shot['transition']}"])
    return '\n'.join(lines)

def generate(b,out):
    cues=validate(b);base=json.loads((ROOT/'assets/motion-tokens.json').read_text())
    if b['palette'] not in base['palettes']:raise ValueError('Unknown palette; add an explicit custom palette to tokens first')
    base['render'].update({k:b[k] for k in ['fps','width','height','seed','loop']});base['render']['N']=b['N']
    if isinstance(b.get('bpm',120),bool) or not isinstance(b.get('bpm',120),(int,float)) or b.get('bpm',120)<=0:raise ValueError('bpm must be positive')
    bpm=b.get('bpm',120); beats=[];i=0
    while (f:=round(i*60*b['fps']/bpm))<b['N']:
        beats.append({'beat':i,'frame':f,'seconds':f/b['fps']});i+=1
    grid={'fps':b['fps'],'N':b['N'],'durationSeconds':b['N']/b['fps'],'bpm':bpm,'beats':beats,'cues':cues}
    shots=table(b['shots']);brief=json.dumps(b,indent=2,ensure_ascii=False);tokens=json.dumps(base,indent=2);gridtext=json.dumps(grid,indent=2)
    studio=(ROOT/'references/studio-direction.md').read_text() if (ROOT/'references/studio-direction.md').exists() else ''
    prompt=f'''# Claude Opus 5.5 production prompt

Act as a senior motion director and {b['engine']} implementer. Build an original film for {b['product']}. Audience: {b['audience']}. The one message is: {b['message']}. Tone: {b['tone']}. CTA: {b['cta']}.

Produce {b['width']}x{b['height']} at {b['fps']} fps, exactly {b['N']} frames ({b['N']/b['fps']:.6g} seconds). Loop={b['loop']}; seed={b['seed']}. Use {b['palette']} palette. Placeholder UI={b['placeholderUi']}. Resolve approved assets and dependency pins from the brief; never invent product claims or show template demo data as real results.

## Exact brief
```json
{brief}
```

## Numeric tokens
```json
{tokens}
```

## Shot list
{shots}

## Beat grid and cue sheet
```json
{gridtext}
```

## Render contract
Implement state as a pure function of absolute seconds t and immutable inputs. Render exactly frames 0..N-1 at f/fps. For a loop wrap negative/fractional subframe time with positive modulo and design matching visible state and derivatives at the seam; do not append N. For a linear film clamp time. Use analytic springs and stable keyed seeded noise. No unseeded random, wall clocks, accumulated physics, or history-dependent post effects in evaluation. Assign every animated property on every render. HTML/Canvas/Three.js must expose renderAt(t), an asset-ready gate __ready, and disable requestAnimationFrame in ?t= capture mode. Preload exact local fonts/assets. Pin the toolchain, color management, resolution, pixel ratio, and export options. Cross-GPU pixel identity is not assumed.

Schedule sound in a separate offline pass. Each cue is a visual hit; onset is one output frame later. Use the provided audioFrame/sample directly when importing the generated grid; do not add the delay twice. Define onset separately from peak. Check decoded final media, not only scheduled times.

## Creative standards
{studio}

## Banned shortcuts
No muddy neon, unrelated floaters or particles, generic turntables, constant camera orbit, unreadable miniature UI, springing body copy, invented savings, or one identical transition for every shot. Every major effect needs a story purpose. Do not add color or atmosphere that fights the product's brand.

## Build and review
Start with three styleframes, choose a coherent direction from the brief, and implement one short motion slice. Use the bundled blueprint as structure, but substitute actual product behavior. Inspect every event and cut at f-2..f+2, spring peaks, full-size type, scene contact sheets, phone crop, out-of-order seeks, and N-2,N-1,0,1. Measure audio onset and peak, clipping, loudness, true peak, mono and loop tails. Repair concrete defects and recheck affected neighbors.

Deliver editable project sources, exact dependency versions, verified render commands, final media if actually rendered, tokens, cue data, stills, and a validation report. State which engines/checks were not run. A scaffold or prompt is not a finished film.
'''
    cue_table='\n'.join(f"- {c['id']}: {c['kind']}, visual f{c['visualFrame']}, onset f{c['audioFrame']}, {c['seconds']:.9f}s, sample {c['sample']} at 48 kHz." for c in cues)
    sound=f'''# Web Audio sound prompt

Create the sound for {b['product']}: {b['tone']}. Use OfflineAudioContext and seeded synthesis or approved licensed sounds. No live scheduling as the export source. Render stereo PCM WAV at 48000 Hz for exactly {round(b['N']*48000/b['fps'])} samples per channel. Video fps={b['fps']}; N={b['N']}; loop={b['loop']}; seed={b['seed']}; BPM={bpm}.

Cue list, already shifted one frame after the visual hit. These times target ONSET, not peak. Do not shift again:
{cue_table or '- No tactile hits requested.'}

Click: short 1.5–3 kHz body, 0.5 ms attack, ~18 ms decay. Pop: rounded 450–900 Hz body, ~65 ms tail; moderate upper partials for phone playback. Swell: restrained seeded filtered noise, ~350 ms, only for the specified structural transition. Use cue IDs as stable seeds. Keep all output deterministic. Do not add an impact to every word. If a music bed is authorized, build a restrained {bpm}-BPM bed with deliberate rests, keeping hits about 3–6 dB over the local bed. Music and voice require approval in the brief.

Target about -14 integrated LUFS and decoded true peak <= -1 dBTP after measuring; a sample cap is not a true-peak limiter. Measure separate stems, phone-band balance, mono playback, DC, and clipping. For loop reverbs/filters render enough repeated cycles to settle and retain a middle cycle. Wrap cue tails without duplicating the event at the seam. Keep loop head/tail waveform and slope continuous. Decode the final mux and measure onset error, peak level, and duration; compensate codec/filter latency explicitly. Deliver WAV, cue sheet, stems when applicable, and measurements. State any checks that could not be performed.
'''
    out.mkdir(parents=True,exist_ok=True)
    outputs={'brief.json':brief,'motion-tokens.json':tokens,'beat-grid.json':gridtext,'shot-list.md':shots,'opus-prompt.md':prompt,'sound-prompt.md':sound}
    for name,value in outputs.items():(out/name).write_text(value+'\n')
    return list(outputs)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('brief',type=Path);ap.add_argument('--out',type=Path,required=True);args=ap.parse_args()
    try:
        b=json.loads(args.brief.read_text());names=generate(b,args.out)
    except (ValueError,KeyError,TypeError,json.JSONDecodeError) as e:ap.error(str(e))
    print('Generated '+', '.join(names))
if __name__=='__main__':main()
