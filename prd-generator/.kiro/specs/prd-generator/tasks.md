# Implementation Plan: PRD Generator

## Overview

Build a fully static single-page web app in a single `index.html` file with an inline `<script>` tag exposing generator logic on `window.PRDGenerator`. A companion `index.test.js` covers unit and property-based tests via fast-check.

## Tasks

- [x] 1. Scaffold `index.html` with base structure and CSS reset
  - Create `index.html` with `<!DOCTYPE html>`, `<meta charset>`, `<meta name="viewport">`, and a `<main>` wrapper
  - Add a CSS reset (box-sizing, margin/padding zero, font inheritance) and CSS custom properties for the blue/white palette
  - Add a card container (`<div class="card">`) centred on a light-grey `<body>` background
  - _Requirements: 7.1, 7.2, 8.1, 8.3_

- [x] 2. Build UI components inside the card
  - [x] 2.1 Add `<textarea id="feature-input" maxlength="500" required>` with a character counter and `<span id="input-error">` for inline validation
    - _Requirements: 1.1, 1.2, 1.3_
  - [x] 2.2 Add `<select id="product-type">` with the 7 product-type options plus a default placeholder option
    - _Requirements: 2.1_
  - [x] 2.3 Add `<select id="audience">` with the 7 audience options plus a default placeholder option
    - _Requirements: 3.1_
  - [x] 2.4 Add `<button id="generate-btn">Generate PRD</button>` always visible and enabled
    - _Requirements: 4.1_
  - [x] 2.5 Add `<section id="output-panel" hidden>` containing `<div id="prd-output">`, `<button id="copy-btn">`, and `<button id="download-btn">`
    - _Requirements: 4.9, 5.1, 6.1_

- [x] 3. Implement responsive CSS (mobile-first, 320px–1440px)
  - Style the card with `max-width: 720px`, `box-shadow`, white background, and `border-radius`
  - Style textarea, selects, and button with consistent padding, border, and focus ring using the blue palette
  - Add `@media (min-width: 640px)` breakpoint to lay out the two selects side-by-side
  - Ensure body text `font-size >= 14px` and section headings `font-size >= 18px`
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 4. Implement the Generator module on `window.PRDGenerator`
  - [x] 4.1 Define `AUDIENCE_CONTEXTS` and `PRODUCT_TYPE_CONTEXTS` lookup tables exactly as specified in the design
    - _Requirements: 2.2, 2.3, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_
  - [x] 4.2 Implement `getAudienceContext(audience)` and `getProductTypeContext(productType)` — return the matching context object or the `""` default
    - _Requirements: 2.2, 2.3, 3.2–3.9_
  - [x] 4.3 Implement `buildProblemStatement(featureText, audienceCtx, typeCtx)` — returns a single string incorporating `problemEmphasis` and `framing`
    - _Requirements: 4.3_
  - [x] 4.4 Implement `buildUserStories(featureText, audienceCtx, typeCtx)` — returns array of ≥ 3 strings each matching `"As a … I want … so that …"`
    - _Requirements: 4.4_
  - [x] 4.5 Implement `buildAcceptanceCriteria(featureText, audienceCtx, typeCtx)` — returns array of ≥ 3 strings using `criteriaEmphasis`
    - _Requirements: 4.5_
  - [x] 4.6 Implement `buildSuccessMetrics(featureText, audienceCtx, typeCtx)` — returns array of 3–5 strings using `metricsEmphasis` and `metricsHint`
    - _Requirements: 4.6_
  - [x] 4.7 Implement `buildOutOfScope(featureText, audienceCtx, typeCtx)` — returns array of ≥ 2 strings using `scopeEmphasis` and `scopeHint`
    - _Requirements: 4.7_
  - [x] 4.8 Implement `buildOpenQuestions(featureText, audienceCtx, typeCtx)` — returns array of ≥ 2 strings using `risksEmphasis`
    - _Requirements: 4.8_
  - [x] 4.9 Implement `generatePRD(featureText, productType, audience)` — calls all six builders and returns a `PRDSections` object
    - _Requirements: 4.2_
  - [x] 4.10 Implement `slugify(text)` — first 40 chars, lowercase, spaces→hyphens, strip non-alphanumeric/hyphen, collapse hyphens, trim hyphens
    - _Requirements: 6.3_
  - [ ]* 4.11 Write property test for `validateInput` — Property 1: valid/invalid input lengths
    - **Property 1: Valid input length acceptance**
    - **Validates: Requirements 1.2**
  - [ ]* 4.12 Write property test for context injection — Property 2: audience and product-type framing appears in output
    - **Property 2: Context injection**
    - **Validates: Requirements 2.2, 2.3, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9**
  - [ ]* 4.13 Write property test for all six section keys — Property 3
    - **Property 3: All six sections present**
    - **Validates: Requirements 4.2, 4.3**
  - [ ]* 4.14 Write property test for section count invariants — Property 4
    - **Property 4: Section count minimums**
    - **Validates: Requirements 4.4, 4.5, 4.6, 4.7, 4.8**
  - [ ]* 4.15 Write property test for user story format — Property 5
    - **Property 5: User story format**
    - **Validates: Requirements 4.4**
  - [ ]* 4.16 Write property test for `slugify` — Property 9
    - **Property 9: Slug algorithm correctness**
    - **Validates: Requirements 6.3**

- [x] 5. Checkpoint — Ensure generator logic is correct
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement input validation and event handler
  - Add `validateInput(value)` — returns `true` for 1–500 chars, `false` otherwise; shows/hides `#input-error`
  - Wire `#generate-btn` click: read inputs → validate → call `generatePRD()` → call `renderOutput()`
  - _Requirements: 1.2, 1.3, 4.1, 4.2_

- [x] 7. Implement output rendering
  - Implement `renderOutput(sections)` — builds HTML with emoji headings (📌 👤 ✅ 📊 🚫 ⚠️), injects into `#prd-output`, removes `hidden` from `#output-panel`
  - Each section heading `font-size >= 18px`; list items rendered as `<ul>/<li>` or `<p>` elements
  - _Requirements: 4.9, 7.4, 7.5_
  - [ ]* 7.1 Write property test for emoji labels in rendered HTML — Property 6
    - **Property 6: Emoji section labels in rendered output**
    - **Validates: Requirements 4.9**

- [x] 8. Implement Copy to Clipboard
  - Implement `copyToClipboard(text)` — tries `navigator.clipboard.writeText(text)`, falls back to `execCommand('copy')` via hidden textarea, shows "Copied!" for 1500 ms on success, shows inline error on failure
  - Wire `#copy-btn` click to `copyToClipboard` with the plain-text PRD content
  - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ]* 8.1 Write property test for clipboard round-trip — Property 7
    - **Property 7: Clipboard round-trip**
    - **Validates: Requirements 5.2**

- [x] 9. Implement Download as .txt
  - Implement `downloadAsTxt(text, filename)` — creates `Blob` with `type: "text/plain"`, creates object URL, programmatically clicks a temporary `<a>`, revokes URL; hides `#download-btn` gracefully if `Blob`/`createObjectURL` unavailable
  - Wire `#download-btn` click: call `slugify(featureText)`, call `downloadAsTxt(prdText, 'prd-' + slug + '.txt')`
  - _Requirements: 6.1, 6.2, 6.3_
  - [ ]* 9.1 Write property test for download Blob — Property 8
    - **Property 8: Download content correctness**
    - **Validates: Requirements 6.2**

- [ ] 10. Write unit tests in `index.test.js`
  - [ ]* 10.1 DOM structure: textarea, both selects, generate button, output panel present on load
    - _Requirements: 1.1, 2.1, 3.1, 4.1_
  - [ ]* 10.2 Output panel hidden before first generation, visible after
    - _Requirements: 4.2_
  - [ ]* 10.3 Copy and Download buttons appear after generation
    - _Requirements: 5.1, 6.1_
  - [ ]* 10.4 Clipboard confirmation message appears after successful copy; error message on rejection
    - _Requirements: 5.3, 5.4_
  - [ ]* 10.5 No `fetch` / `XMLHttpRequest` calls during any user interaction
    - _Requirements: 8.2_
  - [ ]* 10.6 Empty input shows validation error and does not render output
    - _Requirements: 1.3_
  - [ ]* 10.7 Default (no audience, no product type) generates a complete PRD with all six sections
    - _Requirements: 4.2_

- [x] 11. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All property tests use fast-check with a minimum of 100 iterations per property
- Each property test is tagged with `// Feature: prd-generator, Property N: <text>`
- Generator functions are exposed on `window.PRDGenerator` for testability without DOM interaction
