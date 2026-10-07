# Vizag Chamber website — QA audit

**Audit date:** 7 October 2026  
**Scope:** Local preview at `http://127.0.0.1:5173`, all data-backed public routes, navigation/link integrity, visual readability, responsive interaction risks, and browser-console/runtime behaviour.

## Executive summary

The server-side route set is healthy: **238/238 known routes returned HTTP 200**. This means the catch-all route and its data manifest are correctly wired. The primary release risk is not a conventional 404; it is the homepage's amount of continuously animated, scroll-bound work. The local preview became unresponsive to browser navigation/inspection after the home view loaded, which is consistent with the expensive animation architecture found in the source.

There is one confirmed dead control and several high-confidence usability and performance issues. Address the P0/P1 items first, then re-test in a normal desktop browser and on a lower-powered mobile device.

## What was checked

| Check | Result | Evidence |
|---|---:|---|
| Public/content/utility routes | Pass — 238/238 returned 200 | `outputs/route-http-audit.json` |
| Sample unknown route | Pass — returns 404 | `/no-such-route` returned 404 |
| Referenced local assets | Pass with one false-positive source pattern | 32/33 concrete paths returned 200; `/assets/images` comes from legacy absolute source URLs, not a rendered file path |
| Lint | Pass | Direct local ESLint invocation exited successfully. `npm run lint` itself cannot run because the machine-wide npm launcher points to a missing file. |
| Browser runtime inspection | Blocked by responsiveness problem | Local home page rendered, then browser automation timed out while navigating/inspecting another page. |

## Confirmed defects

### P1 — “Forgot password?” is a dead link

**Affected page:** `/login`  
**Evidence:** [`components/ui/login-form.tsx`](components/ui/login-form.tsx) links to `#forgot-password`, but there is no element with `id="forgot-password"` anywhere in `app/` or `components/`.

**User impact:** Clicking the recovery link produces no recovery UI, no navigation, and no explanation.

**Fix:** Either implement the recovery view/dialog and give it `id="forgot-password"`, or replace the link with a disabled, clearly labelled “Password recovery is not yet available” control. Do not leave it interactive until it works.

**Verification:** Click the control with mouse and keyboard; confirm a visible recovery form/dialog opens, focus moves into it, Escape closes it, and the URL fragment (if retained) points to a real target.

### P1 — Homepage can freeze or become unresponsive during navigation/scrolling

**Affected page:** `/` (particularly the glyph portal, Connected Vizag experience, animated rails, and cursor/scroll effects)  
**Evidence:**

- The local preview loaded the home page but subsequent browser navigation/inspection timed out twice.
- [`components/connected-vizag.tsx`](components/connected-vizag.tsx) updates React state on every smoothed scroll-motion change (`setScrollProgress`) while rendering a large, sticky visual sequence.
- [`components/ui/works-wheel.tsx`](components/ui/works-wheel.tsx) installs a non-passive wheel handler and calls `preventDefault()` while the wheel is within its own range. This can make the page appear trapped while the 3D control has focus/hover.
- The home accessibility tree exposed repeated pillar content four times, meaning the animation/marquee also creates a very large live DOM.

**User impact:** Scroll can stutter, navigation can feel frozen, and lower-end mobile devices are at risk of long main-thread stalls. A user may also believe the page cannot scroll past an interactive 3D section.

**Fix:**

1. Profile the homepage in Chrome Performance on a throttled mobile CPU before changing visuals.
2. Do not call React state setters for each scroll frame. Store visual progress in motion values/CSS variables; only commit state when the stage index changes.
3. Pause or simplify off-screen animations with `IntersectionObserver`; honour reduced motion before creating springs, requestAnimationFrame loops, and marquee copies.
4. Keep only one semantic copy of repeated marquee/pillar content; mark visual duplicates `aria-hidden="true"`.
5. For `WorksWheel`, only intercept wheel input when the pointer is clearly inside the active control, offer visible previous/next controls, and permit page scrolling immediately at both ends.

**Verification:** Use 4× CPU throttling and test 60 seconds of scrolling, browser Back/Forward, and route navigation from the header. Record long tasks, dropped frames, and whether every section can be exited with mouse wheel, touch, keyboard, and Escape.

### P1 — Keyboard access is incomplete for the 3D media wheel

**Affected page:** `/media`  
**Evidence:** [`components/ui/works-wheel.tsx`](components/ui/works-wheel.tsx) presents a `role="listbox"` with `aria-activedescendant`, but the source handles wheel and drag input; its UI copy says “Scroll or Drag • Arrow Keys”, while there is no confirmed Arrow-key event handler in that component.

**User impact:** Keyboard and switch users can focus the widget but may not be able to change its active item. This is especially confusing because the widget advertises arrow-key support.

**Fix:** Add `onKeyDown` for ArrowUp/ArrowDown, Home, and End; update `active`, prevent default only for handled keys, and ensure the active option has the proper `role="option"`, `aria-selected`, and visible focus indication.

**Verification:** Tab to the wheel, use arrows/Home/End, ensure the active card and announced selection change, then Tab away without being trapped.

## Text visibility and accessibility defects

### P2 — Repeated decorative text is exposed to screen readers

**Affected page:** `/`  
**Evidence:** The rendered home-page accessibility tree contains the eight “Pillars of enterprise…” cards **four times** (nodes 46–109). This is likely visual repetition for the moving strip, but it is not hidden from assistive technology.

**User impact:** Screen-reader users must listen to the same content repeatedly before reaching the next area. It also increases the layout/paint work on the busiest page.

**Fix:** Render one semantic list and make repeated visual copies `aria-hidden="true"` (and non-focusable), or produce the animation with pseudo-elements/canvas rather than duplicate text DOM.

### P2 — Hero heading is exposed as a run-together sentence

**Affected page:** `/`  
**Evidence:** The accessible heading reads `A legacy of enterprise.A limitless future.` while the visually intended message has a sentence break/space.

**User impact:** The phrase is announced without a natural pause and can look cramped if the visual line-break styling fails.

**Fix:** Put a literal space or `{" "}` between inline fragments, or use a visually styled block/span structure while preserving a clean text alternative such as `aria-label="A legacy of enterprise. A limitless future."`.

### P2 — Icon-only social links use text glyphs instead of consistent icon assets

**Affected area:** global footer  
**Evidence:** [`components/site-shell.tsx`](components/site-shell.tsx) renders `f` and `𝕏` text glyphs for Facebook and X while Instagram uses an SVG icon.

**User impact:** Appearance varies by font/platform and the controls are visually inconsistent. The existing `aria-label`s prevent an accessible-name failure, but the presentation still degrades.

**Fix:** Use one SVG icon family for all social icons and retain the accessible labels.

## Link audit notes

No broken internal content links were confirmed in the generated route set. All 238 known content, event, city-network, gallery, dashboard, demo, and login routes responded with 200 from the local server.

External news, social, job-board, phone, email, and third-party links were intentionally not treated as failures in this local audit because their availability depends on external services and may change. Before launch, run a separate production link checker that records redirect chains, 4xx/5xx statuses, and final domains.

## Delivery blockers / environment notes

- `npm run lint` cannot start on this machine because its global npm launcher is missing: `C:\Users\LAVANYA\AppData\Roaming\npm\node_modules\npm\bin\npm-cli.js`. Running the repository's ESLint binary directly succeeded, so this is an environment/tooling defect rather than a project lint error.
- Browser UI automation became unresponsive after the home page was loaded. This should be treated as a performance-warning reproduction, not as proof that every route freezes; static HTTP checks continued to pass.

## Recommended fix order

1. Fix password recovery link or remove it.
2. Profile and reduce homepage scroll/animation work; fix wheel input trapping.
3. Implement keyboard controls for the media wheel.
4. Remove duplicate semantic marquee content and fix the hero text alternative.
5. Re-test desktop, 375 px mobile, reduced-motion, keyboard-only, and 4× CPU throttling.

## Test artifacts

- `outputs/route-http-audit.json` — exact local-route HTTP results.
- `outputs/asset-http-audit.json` — local asset-path HTTP results.

