# Baseline Test

> Test any URL for usage of baseline features.

```js
import { testUrl } from "baseline-test";

const features = await testUrl("https://treo.sh/");
console.table(
  features.map((f) => ({ ...f, desc: f.desc.slice(0, 50) })),
  ["id", "status", "usage", "dxId", "desc"]
);

┌─────────┬────────────────────────────┬───────────┬───────┬──────┬──────────────────────────────────────────────────────┐
│ (index) │ id                         │ status    │ usage │ dxId │ desc                                                 │
├─────────┼────────────────────────────┼───────────┼───────┼──────┼──────────────────────────────────────────────────────┤
│ 0       │ 'nullish-coalescing'       │ 'high'    │ 30.1  │ 379  │ 'The nullish coalescing (??) and nullish coalescing' │
│ 1       │ 'not'                      │ 'high'    │ 83.7  │ 343  │ 'The :not() functional pseudo-class matches element' │
│ 2       │ 'ua-client-hints'          │ 'limited' │ 73.7  │ 341  │ 'The Sec-CH-UA HTTP request header and the navigato' │
│ 3       │ 'request-animation-frame'  │ 'high'    │ 61    │ 323  │ 'The requestAnimationFrame() method schedules a fun' │
│ 4       │ 'beforeinstallprompt'      │ 'limited' │ 12.9  │ 303  │ 'The beforeinstallprompt event fires when a Progres' │
│ 5       │ 'manifest'                 │ 'limited' │ 21.6  │ 302  │ 'A web app manifest file provides metadata about th' │
│ 6       │ 'layout-instability'       │ 'limited' │ 38    │ 277  │ 'The layout-shift performance entry and LayoutShift' │
│ 7       │ 'bfcache-blocking-reasons' │ 'limited' │ 10.2  │ 276  │ 'The notRestoredReasons property of a PerformanceNa' │
│ 8       │ 'fetch-priority'           │ 'low'     │ 30.1  │ 268  │ 'The fetch() priority option and the fetchpriority ' │
│ 9       │ 'referrer-policy'          │ 'high'    │ 34.6  │ 260  │ 'The Referrer-Policy HTTP header and referrerpolicy' │
│ 10      │ 'outline'                  │ 'low'     │ 78    │ 189  │ 'The outline CSS shorthand sets the color, style, a' │
│ 11      │ 'background-clip-text'     │ 'limited' │ 43.9  │ 131  │ 'The background-clip: text CSS declaration draws th' │
│ 12      │ 'masks'                    │ 'low'     │ 34.6  │ 101  │ 'The mask CSS property (and several longhand proper' │
│ 13      │ 'webp'                     │ 'high'    │ 38.6  │ 79   │ 'The WebP image format is a raster graphics file fo' │
│ 14      │ 'js-modules'               │ 'high'    │ 28.3  │ 47   │ 'JavaScript modules allow code to be organized into' │
│ 15      │ 'flexbox'                  │ 'high'    │ 82.3  │ 28   │ 'Flexbox is a one-dimensional layout system, which ' │
│ 16      │ 'accent-color'             │ 'limited' │ 1.9   │ 6    │ 'The accent-color CSS property sets a color for che' │
└─────────┴────────────────────────────┴───────────┴───────┴──────┴──────────────────────────────────────────────────────┘
```
