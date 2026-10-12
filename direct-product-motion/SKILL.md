---
name: direct-product-motion
description: Direct and implement product launch films, SaaS explainers, UI animation, and seamless motion loops. Use for product motion, cinematic direction, senior studio art direction, an Opus 5.5 animation prompt, motion tokens, shot lists, beat grids, frame-exact sound, or deterministic Three.js, Remotion, Canvas, and fframes rendering. Interview the user, adapt the visual direction to the product, and produce a buildable motion package.
---

# Product Motion Director

## Purpose and activation

Turn a product benefit into a readable visual story and a deterministic render plan. Activate for the cases in the description. Begin with the product interview below, unless the brief already answers it. Use this skill to direct product-specific work with explicit visual and engineering choices.

Treat “Claude Opus 5.5” as the requested coding-agent target. This skill is a portable Markdown contract; do not invent model API parameters or assume a model can render video without tools. Confirm the installed engine and tool versions before invoking them.

Read [design-language.md](references/design-language.md) before choosing a look. Apply [studio-direction.md](references/studio-direction.md) for concept, type, motif, styleframe, and review standards. Distinguish user requirements from proposed numerical presets. Treat easing, spring, camera, and audio defaults as tunable design choices.

## Interactive creation flow

1. **Interview in small batches.** Ask at most three short questions per turn. Start with:
   - What is the product, who is it for, and what single message should viewers remember?
   - Which one to three features matter most? For each, what does the user do and what visible result follows?
   - What tone should it have, and do you have a logo, UI screenshots, brand colors, or a reference?
2. **Fill production gaps.** Ask only what is still missing: destination/aspect ratio, duration, fps, loop or linear film, CTA, voice/music/SFX, engine, and runtime constraints. Use labeled defaults when the user delegates: 1920×1080, 60 fps, 24 seconds, Template A, 120 BPM, restrained SFX, no voice. Do not invent features, measured benefits, product UI, or testimonials. Label placeholder UI and demo data.
3. **Offer a direction.** Give two or three concise, product-specific directions only when tone is undecided. Do not make the user choose again if they already gave a clear direction.
4. **Propose the custom shot list and beat grid.** Use [blueprints.md](references/blueprints.md). Include each shot's purpose, exact copy, range `[startFrame,endFrame)`, focal object, user action/result, camera, motion token, transition, and audio hit frames. Use integers for scene boundaries. Show what viewers can read after motion settles. State assumptions and ask for feedback without blocking already-authorized implementation.
5. **Generate the production package.** Fill [brief.example.json](assets/brief.example.json), then run `python scripts/build_brief.py brief.json --out <project>/motion-plan`. Produce `brief.json`, `motion-tokens.json`, `beat-grid.json`, `shot-list.md`, `opus-prompt.md`, and `sound-prompt.md`. This script validates range coverage and cue timing, not creative quality. Read every generated prompt and resolve remaining placeholder copy before production.
6. **Apply studio direction, then implement if requested.** Establish a concept sentence and motif ledger. Compose opening/action/payoff styleframes, then a 2–4 second motion slice. Choose clear product, cinematic, editorial collage, graphic kinetic, or hybrid direction from the actual brief. Inspect rendered frames before scoring them. Choose one main render engine. Copy only the required starter assets. Use [engine-adapters.md](references/engine-adapters.md) and [curve-translation.md](references/curve-translation.md). Build a hero still, then a short motion slice, then the complete sequence. Do not build four parallel renderers for a single film.
7. **Render, inspect, revise.** Use [qa.md](references/qa.md). Deliver editable sources, final media if actually rendered, prompts, tokens, cue sheet, and a short validation report. Name unavailable renders and checks clearly. A prompt or passing unit test alone is not a finished video.

## Opus 5.5 render contract

- Define the complete state as `evaluate(t, immutableBrief, seed)`. State must depend only on its inputs, never on render order. Define `t` in seconds; retain fractional times for motion-blur samples.
- Set `fps`, dimensions, seed, sample rate, and integer `N` explicitly. Duration is `T=N/fps`. Export exactly frames `0..N-1`, sampled at `f/fps`; do not append frame `N`.
- For loops, evaluate positive modulo time `((t % T)+T)%T`, including negative shutter samples. Prove continuity of position, orientation, opacity, masks, lighting, camera, and audio at the seam. Modulo alone does not create continuity. Prefer matching first derivatives as well as values. Frame `N-1` and frame `0` need not be identical; their step should be consistent with neighboring steps.
- For linear films, clamp time and hold the final state. Do not force an accidental wrap. Template A defaults to a designed loop but may become linear when the brief specifies it; Template B is a strict loop.
- Use seeded, stateless hashes keyed by stable element/sample IDs, or immutable noise tables generated once from a seed. Never consume a mutable global PRNG while rendering. Ban `Math.random()`, `Date.now()`, wall-clock reads, and accumulated physics in scene evaluation.
- Expose `window.renderAt(t)` in HTML/Canvas/Three.js. Calling it repeatedly or out of order must repaint a full identical frame. Expose `window.__ready=true` only after fonts, images, textures, shaders, and any bake are ready. In `?t=` or export mode, do not start `requestAnimationFrame`.
- Keep optional preview transport separate. A preview clock may select `t`; it must not change animation state. Do not fire or replay audio from `renderAt`.
- Clear framebuffer/canvas state and assign every animated property each frame. Set shader uniforms from absolute time; avoid temporal feedback, mutable simulations, and history-dependent post effects unless baked deterministically.
- Pin dependencies, fonts, media, shader precision, render size, device pixel ratio, color management, and export settings. Deterministic scene state does not guarantee byte-identical pixels across different GPUs, browsers, font stacks, or encoders. Test within a fixed render environment.
- Use an analytic spring. For mass `m`, natural frequency `f_n` in Hz, and damping ratio `zeta`, use `omega=2*pi*f_n`, `k=m*omega^2`, `c=2*zeta*m*omega`. Do not put a damping ratio directly in Remotion's `damping` coefficient.
- Schedule audio offline from the same frame list. Default tactile onset is `visualFrame+1`, or `(visualFrame+1)/fps` seconds. Treat this as the skill's selected creative rule. Define whether a cue targets onset or peak; the included synthesizer targets onset. Verify the decoded final mux because encoding can change peak level and timing.

## Studio creative standard

Use the concept and review gates in [studio-direction.md](references/studio-direction.md). Combine clear product action/result demonstrations with cinematic or tactile treatments when they serve the brief. Do not promise senior-studio quality from adjectives, presets, or a self-assigned score. Review actual images, motion, sound, and export. Mark uninspected dimensions as not evaluated.

## Curated tokens

Load [motion-tokens.json](assets/motion-tokens.json). Treat all values as proposed art-direction presets, not extracted project data. Values in frames are authored at 60 fps; rescale time intervals by seconds when changing fps. Preserve an explicitly requested one-frame audio offset as one output frame.

| Motion | Preset | Use |
|---|---|---|
| UI entrance | cubic-bezier(0.22,1,0.36,1), 24 frames | Panel/reveal, no spring |
| Fast focus | cubic-bezier(0.16,1,0.3,1), 18 frames | Short zoom or mask |
| Camera move | cubic-bezier(0.65,0,0.35,1), 48 frames | Deliberate reframing |
| Tactile control | zeta .65, natural frequency 4 Hz | Button, short snap |
| Hero card | zeta .70, natural frequency 2.8 Hz | Larger, quieter settle |
| Expressive accent | zeta .55, natural frequency 3.5 Hz | One small accent |
| Calm result | zeta .75, natural frequency 3 Hz | Information that must read |

Use 3–6 frames of anticipation, 3–5 frames of stagger, and 2–4 frames of impact compression as starting points. Hold a short headline at least 90 frames after settling. For longer copy, budget `max(1.5, wordCount/3+0.35)` seconds after it becomes fully readable. Show one primary action at a time. Do not spring body copy or force the user to read while the camera is moving rapidly.

The cubic-bezier presets named `quintLike` and `expoLike` approximate those curve families. Use the exact polynomial/exponential helpers in `assets/motion-core.mjs` if mathematical equality matters.

## Motion ban list

Forbid muddy glow that lowers text contrast; identical idle floating on unrelated objects; decorative particle clouds with no story role; default rotating product turntables; constant camera orbit; rubbery body text; unsupported product claims; tiny UI screenshots used as illegible decoration; every transition being a scale-up; a bass hit on every word; uncontrolled lens flares; random hue cycling; teleporting masks; and endless refinement without a concrete defect.

Do not ban all color, glows, geometric shapes, or particles. Permit each only when it communicates the selected product story. Require a one-sentence purpose for every major effect.

## Resource map

- [design-language.md](references/design-language.md): product, cinematic, tactile, and graphic design principles.
- [studio-direction.md](references/studio-direction.md): concept, motif, type, styleframes, energy curve, and review rubric.
- [blueprints.md](references/blueprints.md): A, 24-second narrative film; B, 8-second seamless feature loop.
- [engine-adapters.md](references/engine-adapters.md): Three.js scene graph, Remotion composition, Canvas, Web Audio, and native fframes integration.
- [curve-translation.md](references/curve-translation.md): AE/Lottie temporal and spatial curve mapping.
- [qa.md](references/qa.md): production checks and concrete repair loop.
- [prompt-template.md](references/prompt-template.md): exact coding-agent output shape.
- `assets/narrative-state.mjs`: timed Template A scene scaffold.
- `assets/motion-core.mjs`: analytic motion, cubic-bezier evaluator, seeded hash, shared loop state.
- `assets/canvas-loop.html`: runnable, seekable Template B starter; explicit placeholder UI.
- `assets/audio-offline.mjs`: deterministic offline click/pop/swell synthesis and WAV encoding.
- `assets/remotion-loop.tsx`, `assets/three-adapter.mjs`: engine adapters for the shared state.
- `scripts/build_brief.py`: schema checks and prompt/cue generation.
- `scripts/test-core.mjs`: numerical repeatability, curve, seam, and audio sample checks.

Use original or properly licensed images, music, logos, fonts, and footage for production.
