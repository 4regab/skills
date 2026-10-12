# Validation gates

## Before rendering

- Confirm one message, real feature behavior, final copy, asset provenance, and chosen engine. Label all placeholder assets.
- Validate integer N, fps, dimensions, frame-range coverage, no accidental gaps/overlaps, and stable cue IDs.
- Ensure readable holds begin after entry motion, remain unclipped, and satisfy the word-count budget.
- Check media and fonts loaded; no render-time network calls. Lock runtime versions, font files, color settings, and capture size.

## Deterministic sampling

Run `node scripts/test-core.mjs`. Then perform pixel checks in the selected render engine. Capture the same frame twice, seek backward, and capture again. Within one fixed environment, compare hashes for identical captures. If GPU nondeterminism prevents bit equality, declare and measure a pixel tolerance instead of silently accepting it. Never confuse equal scene state with equal captured output.

Capture every cut and hit at `f-2,f-1,f,f+1,f+2`. Inspect leading and trailing bounds, mask edges, cursor targets, spring peaks, and text settling. Use fractional-time samples around fast movement when motion blur is enabled.

## Loop

Render only `0..N-1`. For test purposes sample `t=0` and `t=T` and check periodic state. Sample both sides of the seam and compare motion derivatives for visible objects. Inspect the actual `N-2,N-1,0,1` images in sequence. A static seam guard may deliberately repeat a visual state but do not append an extra encoded end frame.

For Template A, hidden fields such as scene index may differ at either side of a seam; check the full visible output, camera, lighting, opacity and masks. Do not mistake a hidden property mismatch for a visible seam, or ignore a visible mismatch because modulo time is correct.

## Picture

Inspect a contact sheet for pace, then full-resolution frames for type, edges, shadows, aliasing, and product fidelity. Verify contrast after glow and transparency. Test the final target crop and a phone-sized preview. Check that real input leads to the promised result. Do not label every example metric as an actual user benefit.

## Sound

Check each cue's visual frame, audio frame, sample index, onset, peak, and tail. At 60 fps/48 kHz, one frame is 800 samples; for other rates round absolute cue times independently to avoid cumulative drift. Inspect separate hit/bed stems before mixing. Measure loudness and decoded true peak; -14 LUFS and ≤-1 dBTP are selected distribution targets, not an automatic result of synthesis.

Check mono playback, small-speaker audibility, no DC offset, clipping, duplicated seam cues, or cut reverb tails. Decode the final encoded media before accepting AV timing. AAC priming, codec delay, filters, and mastering can all invalidate an earlier scheduled-time check.

## Completion report

Report exactly what ran: core tests, schema generation, engine build, frame captures, visual inspection, offline sound render, loudness/true peak, mux decode, seam playback. Mark unrun checks as unrun. Deliver a video only when it exists. Make a narrow repair plan for remaining defects; do not claim every renderer was tested when only the shared core was tested.
