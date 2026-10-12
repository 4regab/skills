# Studio-level creative direction standard

Use this working standard to plan and review product-specific films. It does not guarantee professional quality merely by passing a score. Use judgment, visual evidence, and the user's brief.

## Concept before effects

Write one sentence: “We show [product benefit] by transforming [specific visual state] into [specific result].” Name what changes and why the audience cares. Establish one recurring motif, one governing material language, and one type hierarchy. Give every shot a role in that transformation. Avoid collecting unrelated attractive scenes.

Choose a direction suited to the brief:

| Direction | Use | Governing design rule |
|---|---|---|
| Clear product | Feature, workflow, explanation | Real action leads to a legible result. |
| Cinematic brand | Launch, identity, emotional story | Motif and atmosphere reveal the product's meaning. |
| Editorial collage | Sources, creative tools, layered information | Layer treatment and marks share one coherent material system. |
| Graphic kinetic | Music, community, expressive brand | Shape and rhythm express real relationships or actions. |
| Hybrid | Brand opening plus functional proof | Use cinematic framing to introduce meaning, then show the actual interface. |

Do not default every brief to glass panels. Do not transplant a thriller's distressing textures into a calm finance dashboard without a reason. Label the difference between a cinematic metaphor and a literal feature claim.

## Three styleframes and a short motion slice

Before full animation, compose opening, hero action, and payoff styleframes. Use the same type family, palette, material treatment, and motif across them. Judge actual images, not a prose promise. If rendering is unavailable, deliver an explicit layout/spec and mark visual approval as pending.

Select a hero frame and set its composition first: one dominant focal region, intentional negative space, text contrast, useful depth, and clear crop. Then build a 2–4 second motion slice covering an entrance, an action, and a result. Resolve type, scale, material, and motion defects there before repeating them through the film.

A default production grid at 1920×1080 uses 120 px safe margins, 12 columns, 24 px gutters, and 8 px spacing increments. Use this as a proposed starting grid. Use a different grid if the concept warrants it. Verify portrait crops separately; a landscape frame squeezed into 9:16 is not an adapted composition.

## Typography

Use one main family and at most one purposeful supporting family. Set a clear title/body/metadata hierarchy. At 1080p, starting sizes are 88–120 px hero, 48–64 px secondary, 28–36 px body, 20–24 px metadata. Treat these as starting points and inspect the final viewing size. Fix tracking, optical centering, line breaks, and line length before adding movement.

Limit the hero phrase to the message it needs. Preserve text as readable geometry/vector/type; never ask an image model to draw exact interface labels. Type can be a spatial object or material layer, but product instruction and proof must remain legible. Keep settled copy within the safe region, including after motion blur and masking.

## Motif and continuity

Define a motif ledger with columns: shot, motif state, story meaning, transition, implementation. Require the motif to evolve, not simply recur unchanged. Carry at least one meaningful visual relationship across adjacent scenes: position, shape, movement direction, material, or palette. Let the payoff resolve the opening state.

Examples for adaptation, not mandatory tropes:

- A fragmented frame becomes one focused workspace.
- A path connects a question to its verified evidence.
- A stack of layers separates to reveal provenance, then returns as a clear answer.
- A loose rhythm resolves into a stable distribution network.

Use real product screenshots/behavior for the proof shot. A metaphor must not become the only evidence that the product works.

## Camera, light, and texture

Choose camera movement by shot meaning: reveal, follow, compare, focus, or release. State which action it serves. Use intentional stillness during reading. Specify framing in screen-space bounds, not just a lens name. An orthographic dolly along its view axis does not change apparent scale; animate zoom/frustum when the shot needs enlargement.

For cinematic treatments, design value contrast and silhouette before detailed shading. Restrict the palette to a main field, a supporting tone, and an accent unless the expressive concept needs more. Use grain, roughness, paper, or collage as a coherent material system, not an overlay applied after the fact. Keep texture below the threshold that damages type and UI proof. For loops all texture/noise and lighting tracks must be periodic or fixed.

## Rhythm and sound

Draw an energy curve for the whole film: hook, tension/setup, action, proof, release. Alternate motion and rest; do not make every shot equally loud, fast, large, or bouncy. Align beats when helpful, but permit an off-beat cut when narrative timing calls for it. Use the beat grid as coordination, not a rule that forces every scene to start on a downbeat.

Sound should reinforce a physical/semantic event. Leave space. Keep signature hits distinct from routine UI clicks. Schedule the requested one-frame onset offset exactly, then audition and measure the encoded result. Do not claim that a source studio used that offset without audio evidence.

## Creative review rubric

Rate each dimension 0–5 using inspected frames and playback; weight its score by `rating/5 × weight`. The target total is 90/100, but the score is a diagnostic aid, not proof of studio quality.

| Dimension | Weight | Evidence required |
|---|---:|---|
| Message and product truth | 20 | Viewer can identify benefit; real action/result; no invented claims. |
| Concept and motif | 15 | Specific concept; motif develops and resolves. |
| Composition and typography | 20 | Clear focal hierarchy, optical spacing, readable holds, strong crop. |
| Motion and edit | 20 | Purposeful timing, varied energy, clean cuts, controlled settle, seam. |
| Materials, light, and palette | 10 | Coherent surfaces and depth; no accidental muddy contrast. |
| Sound and AV sync | 10 | Measured cues, clear mix, meaningful restraint, no seam/timing defects. |
| Delivery and reproducibility | 5 | Editable source, exact pins, verified export, clear validation report. |

Require at least 4/5 in message, composition, and motion. Regardless of total, fail a film with fabricated claims, broken behavior, unreadable primary copy, missing assets, a visible loop seam, clipping, or an export that was never generated. Mark uninspected dimensions “not evaluated”; never give them invented passing scores.

Run three review passes without requiring extra agents: creative director checks meaning/visual identity; motion lead checks trajectories/cuts/camera; finishing lead checks type, edge detail, sound, encode, and deliverables. A separate reviewer can be used when explicitly authorized. Each note must name a frame/shot and a specific defect. Fix high-impact defects first and stop optional polishing once acceptance criteria are met.
