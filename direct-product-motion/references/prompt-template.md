# Exact coding-agent prompt output

Generate a complete prompt, not instructions asking the user to assemble fragments. `build_brief.py` creates an `opus-prompt.md` containing the actual brief, complete numeric tokens, shot list, and cue data. Its companion sound prompt contains every event time/sample. Use those as the starting handoff.

The final prompt must specify:

1. Role: motion director plus selected engine implementer; target Claude Opus 5.5.
2. Goal: audience, exact message, actual feature actions/results, CTA.
3. Constraints: engine/version plan, output size/fps/frame count/seed, loop or linear, approved assets and font, runtime limits.
4. Look: selected palette, surface settings, geometry, typography, lighting, camera ranges, effect purpose.
5. Shots: integer half-open ranges, exact copy, readable holds, focal object, action/result, transition, lighting/camera and cue IDs.
6. Contract: pure time evaluation, seeded noise, explicit frame sampling, fractional subframes, asset-ready gate, no live clocks in evaluation.
7. Sound: every visual hit mapped to onset at frame+1; 48 kHz; define loop tail strategy and mastering goals.
8. Ban list and QA: asset fidelity, no invented benefits, contrast/typography, seam checks, event-frame checks, decoded mux timing.
9. Deliverables: editable project, exact dependency pins, render commands, media if rendered, tokens/cues, validation report, known limits.

For a repair turn, use this structure:

“Shot [id], frame [f], element [name]: observed [specific defect]. Expected [measurable target]. Change [one controlling track or material]. Re-render [frames/range], compare to [approved still], then inspect both adjacent cuts and the seam if affected.”

Do not replace a precise repair with “make it more premium.” Stop when the acceptance checks pass and the brief is met.
