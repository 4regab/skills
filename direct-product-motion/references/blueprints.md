# Two production blueprints

These are original templates. Replace the copy, actions, and proof with the actual product. Frame ranges are start-inclusive/end-exclusive. Timings below are 60 fps. Derive other frame rates from seconds and recheck every boundary and read hold.

## Template A: Narrative product film

24 seconds, 1440 frames, 120 BPM, beat interval 30 frames. Six scenes. Main message: replace one specific source of friction with one clear action and one visible result. Default loop uses a brand-neutral opening/closing layout; a linear version holds its CTA to the final frame instead.

### Storyboard and beat grid

| Frames / seconds | Purpose and exact sample copy | Action and choreography | Camera / lighting | Audio onset frames |
|---|---|---|---|---|
| 0–180 / 0–3 | Identify the problem. “Too many steps?” | Opening state holds 0–29. Three genuine task fragments enter at 30, 34, 38 over 24f. Settle by 90; copy is readable 90–179. Avoid fake counters. | Ortho view height 6.5. Small pan x=-.12→0 at 30–78. Neutral key/fill; no flicker. | 31, 35, 39, light ticks |
| 180–360 / 3–6 | Introduce the single action. “One clear action.” | Preserve the central fragment's bounds at cut. Mask the other fragments 180–204. Main panel lands at 210 using hero spring; finish by 264. Hold 264–359. | Frontal UI; zoom 1→1.04 at 180–228. Accent field shifts toward the panel. | 181 soft swish, 211 pop |
| 360–600 / 6–10 | Show the product working. “Choose. Confirm. Done.” | Move cursor to the real control 360–390. Press 390–396, release 396–414. Reveal true progress/result 420–468; hold to 599. | Zoom 1.04→1.08 at 360–408. Keep click target large and visible. Key remains stable. | 397 click, 421 restrained rise, 469 result click |
| 600–840 / 10–14 | Show one meaningful detail. “Everything in view.” | Match the selected result region to the next panel at 600. Reveal no more than three details at 630, 634, 638; fully stable by 690. Hold 690–839. | Tilt group from 0° to 8° only during 600–636, return to ≤4° by 690. World z gaps .12. | 631, 635, 639 small pops |
| 840–1080 / 14–18 | Make the benefit legible. “Ready for the next step.” | Collapse helper panels into one result, 840–888. Retain actual evidence instead of unsupported savings claims. No movement needed during 900–1079. | Ease zoom 1.08→1 at 840–888. Reduce accent glow while reading. | 889 soft confirmation |
| 1080–1440 / 18–24 | CTA and close. “Try [product].” | CTA enters 1080–1116 and holds 1116–1319. Loop version exits 1320–1380 and restores every opening property; hold 1380–1439. Linear version holds CTA 1116–1439. | Return camera to exact opening pose by 1380 for loop. Linear may remain at final framing. | 1117 click; loop-only soft swish 1321, tail ends before 1380 |

Words in brackets are replacement slots, not production text. The prompt generator uses the user's actual shot copy and requires intentional placeholder flags in the brief.

### Scene graph and lighting recipe

Use `Scene → Stage → Backdrop / HeroGroup / DetailGroup / Cursor`, with `HeroGroup → Shadow / Surface / Edge / Content / FocusRing`. Put text and UI assets on a crisp plane or overlay so their resolution does not depend on a tiny source screenshot. Use one stable key, one fill, one rim, and a broad environment, not per-card point lights.

Preset, in world units with UI width 5.4: camera `(0,0,10)`, target origin, near .1, far 40, ortho height 6.5. Key at `(-3,5,6)`, warm white, intensity 2.5; fill at `(4,1,3)`, cool neutral, intensity .7; rim at `(2,4,-2)`, white, intensity 1.2. These are relative artistic settings, not photometric guarantees. If using plane-based Canvas/SVG, approximate with one upper edge highlight, lower soft shadow, and a broad background gradient. Do not describe that approximation as physical lighting.

For a true card close-up use roughness .30, metalness 0, a small bevel .012, and a controlled reflection environment. Avoid making the card surface so transparent that UI behind it becomes hard to read. Keep all helpers out of the hero text area.

### Direct code implementation plan

- **Remotion:** register a 1440-frame composition. Select the scene using the half-open ranges. Pass absolute frame into a pure scene evaluator. Use per-property tracks for objects that continue across a cut. Place pre-rendered WAV at timeline zero; do not create Web Audio nodes inside React renders.
- **Three.js:** construct static geometry once; evaluate transforms/material uniforms from `t` on every render. Drive ortho zoom for shot scale, group rotation for oblique panels, and a stable target for camera position. A shader field may blend two branded colors from a deterministic scalar; it must not evolve from prior frames. See `assets/three-adapter.mjs` for the shared-state pattern.
- **Canvas:** use `window.renderAt(t)` with full-state reset. Clip masks before drawing content; save/restore per object. `assets/canvas-loop.html` demonstrates a complete small version.
- **Web Audio:** use the table's absolute onset frame numbers. If input stores visual events instead, add one frame exactly once. Synthesize/bake with OfflineAudioContext. Use separate click, pop, swell, and optional music stems. A generated text prompt is not audio.
- **fframes:** generate a native project, then map the same scene ranges and evaluator to Rust returning SVG. Share exported JSON tokens/cues, not JavaScript runtime objects. Read `references/engine-adapters.md`; use native rendering tools and the pinned crate API. Pre-render the sound bed to WAV and reference it through the generated project's media mechanism.

For motion blur sample `t + (j+.5-S/2)*(shutterAngle/360)/(fps*S)`, `j=0..S-1`. Wrap all subframe times for loops. Average in the agreed color space. Resolve crisp text separately if blur lowers readability. Export exactly 1440 frames, not 1441.

## Template B: Single-feature seamless loop

8 seconds, 480 frames, 60 fps, 120 BPM. Canvas starter implements an original neutral “One clear action” demonstration. It uses placeholder rows, not a real product screenshot. Adapt it only after the actual product action is known.

| Frames | Beat / viewer meaning | Exact motion | Audio |
|---|---|---|---|
| 0–30 | Idle starting state | Main shell and CTA are static. Result card hidden. | Silence |
| 30–60 | One deliberate press | Button compresses by f36, releases with tactile spring and smoothly returns exactly to rest at f60. | Click onset f37 |
| 60–120 | Information emerges | Result panel rises with hero spring. Opacity ease 60–84. | Pop onset f61 |
| 120–180 | Result details resolve | Three result rows appear at f120,124,128 with 24f reveals. Panel drift ends by f180 using a smooth residual correction. | Pops f121,125,129 |
| 180–360 | Read | Copy and all rows remain still. No idle floating. | Silence or a quiet sustained bed |
| 360–420 | Return | Mask result and ease it down. Fade panel by f408; restore hidden state by f420. | Swell onset f361; tail < f420 |
| 420–480 | Seam guard | Same scene values as f0. Hide all transient nodes and stop audio tails. | Silence |

The included core uses the 480-frame choreography as normalized reference time when duration changes. If fps changes, preserve seconds and re-quantize cues. Rewrite cue timing after changing duration; do not assume a copied cue table still aligns.

Use a front-facing camera, a mild fixed spatial card tilt only if needed, and the same neutral light rig. Choose this template for a focused feature, hover-like product loop, or paid-social insert. Choose A for a problem/solution story with more than one proof point.

## Customized output requirement

Never output only the generic tables above for a real product. Fill the product's actual action and result, nominate one hero feature, write final copy, choose a palette, specify assets, and place every shot/cue. If a late brief change affects duration or message, regenerate both the beat grid and prompt. Don't quietly keep old audio frame numbers.
