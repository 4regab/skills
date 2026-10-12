# Translate curves without losing intent

## AE to a portable track

Export keyframes or Lottie data when available. Otherwise mark the track as a visual fit. For every property record time, value, interpolation type, incoming/outgoing temporal handles, and any spatial path. Preserve anchor point, parenting, time remapping, masks, and transform order before comparing motion.

Do not claim that arbitrary AE expressions, effects, camera settings, or plugins convert directly to Lottie. Bake unsupported properties at a declared fps or recreate them explicitly. Store error tolerances and source samples for comparison.

## Lottie temporal interpolation

Keyframe `t` is in source composition frames. Convert to seconds with source `fr`, then sample at the destination fps. For the segment starting at keyframe `k`, use its `o` and `i` temporal handles: `cubicBezier(o.x, o.y, i.x, i.y)`. They may be arrays per dimension; use the matching component. Solve the curve's x coordinate for time, then evaluate y. Plugging time directly into the Bezier parameter produces the wrong easing.

Use `h=1` as a hold: keep the start value until the next keyframe. Handle exact boundaries consistently. Preserve linear tracks and per-axis easing. Keep y overshoot; clamp only bounded properties such as opacity, not position. Keep terminal values outside the active keyframe range. For exporter variants with segment `e`, validate against the next `s`; do not silently ignore conflicts.

## Spatial interpolation

Temporal ease controls progress along a path; it is not the path itself. For a spatial segment use control points `P0=start`, `P1=start+to`, `P2=end+ti`, `P3=end` under the format's tangent convention. Match the source player's distance parameterization using an arc-length lookup table when necessary. Do not treat temporal `i/o` and spatial `ti/to` as the same data.

Path morphs need the same contour count, vertex count, winding, and point correspondence. Resample/align compatible paths or use a purposeful mask transition. SDF morphs can support incompatible silhouettes, but interpolation of distance fields is a designed approximation, not an exact conversion of AE shape keyframes.

## Springs

Use `omega=2*pi*f_n` and `omega_d=omega*sqrt(1-zeta*zeta)`. For an underdamped unit step from rest:

`x(t)=1-exp(-zeta*omega*t)*(cos(omega_d*t)+zeta/sqrt(1-zeta*zeta)*sin(omega_d*t))`.

For `t<=0`, return 0. The bundled implementation supports `0<zeta<1`. Use other analytic branches for critical/overdamping instead of feeding unsupported ratios into it. Derive coefficients `k=m*omega²`, `c=2*zeta*m*omega`; for example zeta .65 and 4 Hz gives approximately `k=631.65`, `c=32.67`, `m=1`. Do not apply Remotion's duration-stretch option when matching physical frequency in seconds.

Overshoot fraction for the ideal step is `exp(-pi*zeta/sqrt(1-zeta²))`. The .55–.75 preset range yields roughly 12.6%–2.8%, not a universal 10%. Make the amplitude small enough for the element. Avoid snapping the remaining spring error abruptly to zero while visible; use a smooth correction window once the residual is tiny.

## Validation

Compare source and destination at endpoints, peak displacement, fastest motion, holds, and cut boundaries. Sample every frame around a mismatch. Record maximum pixel error or property error. If source assets are absent, call the result “inspired” or “fitted,” never “exactly recovered.”
