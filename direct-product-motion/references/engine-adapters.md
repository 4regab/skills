# Engine adapters and production architecture

## Select one main engine

| Need | Main engine | Time entry point |
|---|---|---|
| UI, type, editorial scenes, React assets | Remotion | `useCurrentFrame()/fps` |
| Reflection, true depth, shaders, complex cameras | Three.js, optionally composed in Remotion | `renderAt(t)` |
| Small dependency-free UI proof/loop | Canvas or HTML | `window.renderAt(t)` |
| Native SVG/vector video and GPU rendering | fframes | Rust `render_frame` using `frame.index` or `frame.seconds()` |

Keep `brief → tracks → evaluated state → draw` separate from export. Audio uses its own offline pass from the same cue JSON. Keep high-level scene ranges identical across implementations, but do not promise pixel identity between SVG, Canvas, and WebGL.

## Starter status and launch

`canvas-loop.html`, `motion-core.mjs`, and `audio-offline.mjs` form a runnable eight-second starter. Copy them to one project directory. Serve with `python -m http.server 8000`, open the HTML, and use `?t=2.5` for a still. No package install is needed. For production, bundle a licensed local font and preload it; the starter uses Arial/system fallback and thus requires a fixed font environment for reproducible pixels.

The starter is intentionally a demonstration UI. A product film still requires product assets, copy, custom shots, and export QA. Do not sell the starter as a finished bespoke video.

`remotion-loop.tsx` registers both a working state-driven UI loop and a narrative scaffold. Add it as the entry to a pinned Remotion/React project. Include the `.mjs` files beside it; generate proper TS declarations or port them to TS if strict typing is required. After checking installed CLI help, render the chosen composition. `npx remotion render assets/remotion-loop.tsx FeatureLoop out.mp4` is an example for an existing configured project; do not run an unpinned package fetch merely to use the template. For custom sequences retain global time for shared objects; `useCurrentFrame` inside a Sequence is local to it.

`three-adapter.mjs` is a geometry/material adapter, not the full story or finished card model. Import it into a pinned Three.js project, preload the UI texture, call `makeThreeAdapter(canvas, texture)`, bind its `renderAt`, then set `window.__ready=true`. The plane-based glow is a controlled background field. Replace the slab with rounded/bevelled geometry for close-ups and add deliberate contact shadows. Keep texture color space separate from linear data maps. Capture stills before adding transmission or costly post effects.

For Canvas export, call `renderAt(f/fps)`, then capture the 1920×1080 canvas for each `f` in `[0,N)`. Await fonts/assets before the first capture. A browser recorder that follows wall time is not frame-exact export. Use an available supported browser/capture harness; never assume preview playback is the render. The skill includes no universal browser automation dependency.

## fframes native adapter

This is a Rust/SVG engine, not a JS/Remotion plugin. First inspect the installed version or pin a repository revision. Use the official project generator and retain its imports, media registration, lifetimes, and CLI wiring. Check `cargo fframes new --help` and the generated project's `--help` before adopting commands, since APIs can change.

A minimal analytic evaluator, independent of engine imports:

```rust
fn smooth(u: f64) -> f64 {
    let x = u.clamp(0.0, 1.0);
    x * x * (3.0 - 2.0 * x)
}
fn reveal(frame: usize) -> (f64, f64) {
    let f = (frame % 480) as f64;
    let enter = smooth((f - 60.0) / 24.0);
    let exit = smooth((f - 360.0) / 48.0);
    let alpha = enter * (1.0 - exit);
    (alpha, 36.0 * (1.0 - enter) + 24.0 * exit)
}
```

Inside the generated `render_frame`, replace only the SVG content and use its current frame index:

```rust
let (alpha, y) = reveal(frame.index as usize);
fframes::svgr!(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
        <rect width="1920" height="1080" fill="#f2f7fc" />
        <g opacity={alpha} transform={format!("translate(0,{y})")}>
            <rect x="420" y="290" width="1080" height="500" rx="28" fill="white" />
            <text x="500" y="400" font-family="Inter" font-size="52" fill="#14273e">
                "One clear action"
            </text>
        </g>
    </svg>
)
```

This small native illustration uses smooth easing. To match the Canvas spring exactly, port the analytic spring and all tracks in `motion-core.mjs`, including correction windows and hidden-state resets. Do not claim the small illustration is numerically identical. For Template A select one of six scene ranges from `frame.index`, convert its local time to seconds, and return that scene's SVG groups. Keep carried objects in a shared parent instead of recreating them with unrelated transforms at cuts.

Use generated native media loading for a licensed font and rendered WAV. Derive audio seconds from cue frames once. Use the project's timeline/inspection, still or strip, audio-analysis, and render facilities that its current help exposes. Compile and inspect the actual pinned project before calling the adapter production-validated. A code snippet alone does not prove version compatibility.


## Sound architecture

`audio-offline.mjs` constructs deterministic PCM clicks, pops, and short swells and schedules them in OfflineAudioContext. `cue.frame` is always the visual frame, and the renderer adds the one-frame delay once. It renders dual-mono stereo, wraps one-shot tails at the loop boundary, and exports PCM16 WAV. It does not supply music, speech, a LUFS meter, or a true-peak limiter. Its conservative sample cap is not proof of -14 LUFS or -1 dBTP.

For reverbs, filters, or a music bed that retain state, render enough repeated cycles to exceed the longest tail/warm-up, then retain a middle settled cycle. Two cycles are sufficient only if the chosen tail actually settles within the discarded cycle. Preserve phase/frequency continuity and periodic automation. Never call live audio playback from frame evaluation. Use offline buffers for deterministic deliverables; live audition may follow browser user-gesture rules.

Mux only after checking the silent video and WAV durations. Then decode the muxed file and measure actual onset timing, loudness, true peak, and seam. Distinguish scheduled onset from acoustic peak. If mastering moves peaks or adds latency, compensate explicitly and rerender. A perceptual offset rule is not a universal claim about hearing.
