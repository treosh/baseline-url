# Baseline URL

> Test a URL to see which [`baseline`](https://web-platform-dx.github.io/web-features/) features are used.

Need to know what are the new web features used by a page?

This library lists all modern features used by a URL, along with their [Baseline status](https://web-platform-dx.github.io/web-features/).
It loads a page with Headless Chrome, requests an internal [`UseCounter API`](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/use_counter_wiki.md), and maps WebDX ids to Baseline features.

## Usage

```bash
# format output as text (useful for quick test)
npx baseline-url 'https://treo.sh/'

 # returns a json with all detected baseline features
npx baseline-url --output=json 'https://web.dev/' > features.json
```

Example text output:

```text
Found 17 WebDX Features used on https://treo.sh:
• nullish-coalescing - high/30.1 - The nullish coalescing (??) and nullish coalescing assignment (??=) operators return (or assign) its (379)
• not - high/83.7 - The :not() functional pseudo-class matches elements that do not match the selectors in its argument. (343)
• ua-client-hints - limited/73.7 - The Sec-CH-UA HTTP request header and the navigator.userAgentData API expose browser and platform in (341)
• request-animation-frame - high/61 - The requestAnimationFrame() method schedules a function that runs before the next repaint. You can u (323)
• beforeinstallprompt - limited/12.9 - The beforeinstallprompt event fires when a Progressive Web App (PWA) is installable. You can cancel  (303)
• manifest - limited/21.6 - A web app manifest file provides metadata about the site. The browser can use the metadata to instal (302)
• layout-instability - limited/38 - The layout-shift performance entry and LayoutShift API measures the layout stability of web pages ba (277)
• bfcache-blocking-reasons - limited/10.2 - The notRestoredReasons property of a PerformanceNavigationTiming object explains why the current doc (276)
• fetch-priority - low/30.1 - The fetch() priority option and the fetchpriority HTML attribute give hints to the browser about whi (268)
• referrer-policy - high/34.6 - The Referrer-Policy HTTP header and referrerpolicy HTML attributes control whether requests have the (260)
• outline - low/78 - The outline CSS shorthand sets the color, style, and width of a line around an element, outside of t (189)
• background-clip-text - limited/43.9 - The background-clip: text CSS declaration draws the background underneath only the text in the eleme (131)
• masks - low/34.6 - The mask CSS property (and several longhand properties) partially or completely hides an element acc (101)
• webp - high/38.6 - The WebP image format is a raster graphics file format that supports animation, alpha transparency,  (79)
• js-modules - high/28.3 - JavaScript modules allow code to be organized into reusable units. Modules use import to load other  (47)
• flexbox - high/82.3 - Flexbox is a one-dimensional layout system, which places content either horizontally or vertically,  (28)
• accent-color - limited/1.9 - The accent-color CSS property sets a color for checkboxes, radio buttons, and other form controls. (6)
```

## Usage with Node

```js
import { testUrl } from 'baseline-url'

const features = await testUrl('https://treo.sh/')
console.table(
  features.map((f) => ({ ...f, usage: f.chromeUsage, desc: f.desc.slice(0, 50) })),
  ['id', 'status', 'chromeUsage', 'dxId', 'desc'],
)
// output:
┌─────────┬──────────────────────────┬─────────┬───────┬──────┬────────────────────────────────────────────────────┐
│ (index) │ id                       │ status  │ usage │ dxId │ desc                                               │
├─────────┼──────────────────────────┼─────────┼───────┼──────┼────────────────────────────────────────────────────┤
│ 0       │ nullish-coalescing       │ high    │ 30.1  │ 379  │ The nullish coalescing (??) and nullish coalescing │
│ 1       │ not                      │ high    │ 83.7  │ 343  │ The :not() functional pseudo-class matches element │
│ 2       │ ua-client-hints          │ limited │ 73.7  │ 341  │ The Sec-CH-UA HTTP request header and the navigato │
│ 3       │ request-animation-frame  │ high    │ 61    │ 323  │ The requestAnimationFrame() method schedules a fun │
│ 4       │ beforeinstallprompt      │ limited │ 12.9  │ 303  │ The beforeinstallprompt event fires when a Progres │
│ 5       │ manifest                 │ limited │ 21.6  │ 302  │ A web app manifest file provides metadata about th │
│ 6       │ layout-instability       │ limited │ 38    │ 277  │ The layout-shift performance entry and LayoutShift │
│ 7       │ bfcache-blocking-reasons │ limited │ 10.2  │ 276  │ The notRestoredReasons property of a PerformanceNa │
│ 8       │ fetch-priority           │ low     │ 30.1  │ 268  │ The fetch() priority option and the fetchpriority  │
│ 9       │ referrer-policy          │ high    │ 34.6  │ 260  │ The Referrer-Policy HTTP header and referrerpolicy │
│ 10      │ outline                  │ low     │ 78    │ 189  │ The outline CSS shorthand sets the color, style, a │
│ 11      │ background-clip-text     │ limited │ 43.9  │ 131  │ The background-clip: text CSS declaration draws th │
│ 12      │ masks                    │ low     │ 34.6  │ 101  │ The mask CSS property (and several longhand proper │
│ 13      │ webp                     │ high    │ 38.6  │ 79   │ The WebP image format is a raster graphics file fo │
│ 14      │ js-modules               │ high    │ 28.3  │ 47   │ JavaScript modules allow code to be organized into │
│ 15      │ flexbox                  │ high    │ 82.3  │ 28   │ Flexbox is a one-dimensional layout system, which  │
│ 16      │ accent-color             │ limited │ 1.9   │ 6    │ The accent-color CSS property sets a color for che │
└─────────┴──────────────────────────┴─────────┴───────┴──────┴────────────────────────────────────────────────────┘
```

Example of features structure:

```json
[
  {
    "id": "http3",
    "dxId": 316,
    "name": "HTTP/3",
    "status": "low",
    "desc": "HTTP/3 is a major revision of the HTTP network protocol, providing improved performance and efficiency by using QUIC as the underlying transport protocol.",
    "chromeUsage": 42.1
  },
  {
    "id": "zstd",
    "dxId": 291,
    "name": "Zstandard compression",
    "status": "limited",
    "desc": "Zstandard or zstd is fast lossless compression algorithm. When used as a content encoding, it is often faster and offers better compression than brotli.",
    "chromeUsage": 34.9
  }
]
```

## Credits

Sponsored by [Treo.sh - Site speed monitoring made simple](https://treo.sh).

[![](https://github.com/treosh/baseline-url/workflows/CI/badge.svg)](https://github.com/treosh/baseline-url/actions?workflow=CI)
[![](https://img.shields.io/npm/v/baseline-url.svg)](https://npmjs.org/package/baseline-url)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
