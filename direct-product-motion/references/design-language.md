# Product and cinematic design language

## Choose the visual system from the message

Use a coherent visual system across all shots. Select a main direction, then combine supporting treatments only when the product story needs them.

| Direction | Visual system | Motion purpose |
|---|---|---|
| Clear workflow | Bright surfaces, strong grouping, generous space, focused interface crops | Turn scattered tasks into one legible action and result. |
| Focused glass | Dark translucent surfaces, controlled edge light, crisp type, one accent field | Separate interface depth and highlight a command or result. |
| Calm research | Neutral fields, environmental context, restrained cards and typography | Move from a question through evidence to a readable answer. |
| Expressive graphic | Warm fields, saturated accents, vector shapes, ribbons and connected marks | Express distribution, relationships, and creative energy. |
| Corporate spatial | Pale atmosphere, stable data hierarchy, small depth offsets | Connect a tangible object or action to oversight and control. |
| Cinematic narrative | Purposeful silhouette, atmospheric depth, selective light, recurring motif | Build meaning through an opening, transformation, and payoff. |
| Editorial tactile | Layered paper, photographic fragments, coherent textures and drawn marks | Reveal information through layers and material relationships. |

## UI surfaces and space

Build a panel as background field, soft shadow, surface, edge, content, and focus accent. Let the shadow explain separation and the highlight explain the edge. Keep text contrast stronger than the glow treatment. Use glass for a specific depth relationship, not as the default for every product.

For a 1080p frame, begin with 24 px corner radius, 1 px edge, 16 px shadow displacement, 44 px blur, .14 shadow alpha, and a broad .12-alpha accent field. These are tunable presets. Inspect the actual frame and adjust them to the brand and viewing size.

Use 2.5D groups for panel overlap. Use true geometry when rotation exposes thickness, reflection, or changing occlusion. Orthographic projection can keep UI readable, but moving its camera along the viewing axis does not enlarge objects. Change zoom or frustum for an orthographic push. Use perspective when foreshortening contributes to the story.

## Motion and transitions

Alternate a compact idea, a deliberate action, and a visible result. Keep software interfaces tightly framed around the relevant behavior. Give larger elements quieter movement and let copy settle before its reading hold.

Connect adjacent scenes by shape, direction, position, color, or material. For a match cut, align outgoing and incoming screen-space bounds. For a shape morph, use compatible contours or a planned mask/SDF transition. Do not hide incompatible geometry behind a generic scale-up.

Choose springs for tactile actions and small accents. Choose deliberate easing, cuts, and stillness for reading and cinematic cadence. The zeta .55–.75 range and timing tokens are proposed defaults, not mandatory treatment for every shot.

## Cinematic materials and motifs

Define a recurring motif and give it a narrative job. A line can connect related information; an aperture can focus a workspace; layers can reveal provenance; a frame can resolve into a finished result. Show how that motif changes from opening to payoff.

Use silhouette and value contrast before adding detailed shading. Separate foreground, subject, and background for controlled parallax. Use one purposeful light focus. Keep product proof and instructions on a stable, readable plane.

For collage, use original or licensed alpha-cut imagery, consistent material treatment, and related vector marks. Transform type with the surface it belongs to. Keep grain fixed or intentionally periodic from a seed. Never let noise obscure exact interface text.

For a narrative line, animate path trim or a mask from absolute time. Use a stable spline/stroke mesh for 3D or vector paths for Canvas/SVG. Preserve meaningful continuity across cuts.

## Sound and finishing

Define every visual hit, its audio onset, and its sample index. The default tactile onset is one frame after the visual hit. Distinguish onset from acoustic peak and measure both after final encoding.

Use short clicks for selection, rounded pops for arrival, and swells for meaningful structural changes. Leave space and keep the mix audible on small speakers. Score visual, motion, and sound quality only from rendered and inspected output.
