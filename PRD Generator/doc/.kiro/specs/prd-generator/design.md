# Design Document: PRD Generator

## Overview

The PRD Generator is a fully static single-page web application that transforms a short feature description into a structured Product Requirements Document. All logic runs client-side in vanilla JavaScript with no build step, no framework, and no network requests — making it trivially deployable to GitHub Pages or served directly from the filesystem.

The user fills in a feature idea (required), optionally picks a product type and target audience, then clicks "Generate PRD". The Generator composes a six-section PRD using template string interpolation, driven by lookup tables that encode audience-specific and product-type-specific language. The result appears in an Output Panel with Copy and Download actions.

### Key Design Decisions

- **Single HTML file**: All HTML, CSS, and JS live in `index.html`. This eliminates asset-loading issues on `file://` URLs and simplifies GitHub Pages deployment to a single file drop.
- **Template interpolation over AI/network**: Content is generated deterministically from lookup tables and string templates. This keeps the app offline-capable and predictable.
- **No build tooling**: Plain ES6 in a `<script>` tag. No bundler, no transpiler, no `node_modules`.

---

## Architecture

The app is a single HTML file with three logical layers:

```
┌─────────────────────────────────────────┐
│               index.html                │
│                                         │
│  ┌─────────────┐   ┌─────────────────┐  │
│  │   UI Layer  │   │  Generator Layer│  │
│  │  (HTML/CSS) │◄──│  (JS templates) │  │
│  └──────┬──────┘   └────────┬────────┘  │
│         │                   │           │
│  ┌──────▼──────────────────▼────────┐  │
│  │         Event Handler Layer       │  │
│  │  (input validation, copy, download│  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Data Flow

```
User Input
  │
  ▼
validateInput()
  │  (empty → show error, stop)
  ▼
generatePRD(featureText, productType, audience)
  │
  ├── getAudienceContext(audience)   → emphasis strings
  ├── getProductTypeContext(type)    → framing strings
  └── buildSections(...)            → 6 section strings
        │
        ▼
      renderOutput(sections)        → inject into Output Panel
        │
        ├── showCopyButton()
        └── showDownloadButton()
```

---

## Components and Interfaces

### 1. Feature Input (`#feature-input`)

A `<textarea>` element. Attributes: `maxlength="500"`, `required`.

```
interface FeatureInput {
  value: string          // 1–500 chars
  validationMessage: string
}
```

Validation fires on Generate button click. An inline `<span id="input-error">` shows the message when empty.

### 2. Product Type Selector (`#product-type`)

A `<select>` with 8 options (placeholder + 7 types). Value is one of:

```
type ProductType =
  | ""                        // no selection
  | "saas"
  | "mobile"
  | "internal"
  | "data"
  | "api"
  | "ecommerce"
  | "consumer"
```

### 3. Audience Selector (`#audience`)

A `<select>` with 9 options (placeholder + 7 audiences + 1 default). Value is one of:

```
type Audience =
  | ""                  // no selection
  | "engineering"
  | "design"
  | "executive"
  | "qa"
  | "sales"
  | "compliance"
  | "customer-success"
```

### 4. Generate Button (`#generate-btn`)

Always visible and enabled. On click:
1. Reads `#feature-input`, `#product-type`, `#audience`
2. Validates input
3. Calls `generatePRD()`
4. Renders output

### 5. Output Panel (`#output-panel`)

Hidden until first generation. Contains:
- `#prd-output` — pre-formatted PRD text (rendered as structured HTML sections)
- `#copy-btn` — Copy to Clipboard
- `#download-btn` — Download as .txt

### 6. Generator Module (inline `<script>`)

Pure functions, no side effects except DOM writes:

```js
function generatePRD(featureText, productType, audience): PRDSections
function getAudienceContext(audience): AudienceContext
function getProductTypeContext(productType): ProductTypeContext
function buildProblemStatement(featureText, ctx): string
function buildUserStories(featureText, ctx): string[]
function buildAcceptanceCriteria(featureText, ctx): string[]
function buildSuccessMetrics(featureText, ctx): string[]
function buildOutOfScope(featureText, ctx): string[]
function buildOpenQuestions(featureText, ctx): string[]
function slugify(text): string
```

### 7. Clipboard Handler

```js
async function copyToClipboard(text): Promise<void>
// Uses navigator.clipboard.writeText()
// Fallback: document.execCommand('copy') via hidden textarea
```

### 8. Downloader

```js
function downloadAsTxt(text, filename): void
// Creates Blob, object URL, programmatic <a> click, revokes URL
```

---

## Data Models

### AudienceContext

Encodes the emphasis strings injected into each PRD section for a given audience.

```js
const AUDIENCE_CONTEXTS = {
  engineering: {
    label: "Engineering Team",
    problemEmphasis: "technical implementation constraints and system architecture",
    storiesEmphasis: "developers and system integrators",
    criteriaEmphasis: "technical acceptance criteria including API contracts, data schemas, and performance thresholds",
    metricsEmphasis: "system-level KPIs: latency, error rate, throughput",
    scopeEmphasis: "technical debt and out-of-scope integrations",
    risksEmphasis: "technical risks: scalability, security, data integrity"
  },
  executive: {
    label: "Executive Leadership",
    problemEmphasis: "business impact, revenue opportunity, and strategic alignment",
    storiesEmphasis: "business stakeholders and decision-makers",
    criteriaEmphasis: "business-level success criteria and milestone gates",
    metricsEmphasis: "revenue impact, market share, and ROI KPIs",
    scopeEmphasis: "strategic exclusions and phase boundaries",
    risksEmphasis: "business risks: market timing, competitive response, resource constraints"
  },
  design: {
    label: "Design & UX",
    problemEmphasis: "user experience pain points, interaction patterns, and accessibility gaps",
    storiesEmphasis: "end users and personas",
    criteriaEmphasis: "UX acceptance criteria including accessibility (WCAG), responsive behavior, and interaction states",
    metricsEmphasis: "UX KPIs: task completion rate, error rate, satisfaction score",
    scopeEmphasis: "out-of-scope UI states and edge-case flows",
    risksEmphasis: "UX risks: cognitive load, accessibility compliance, design system conflicts"
  },
  qa: {
    label: "QA & Testing",
    problemEmphasis: "testability requirements and edge case coverage",
    storiesEmphasis: "testers and QA engineers",
    criteriaEmphasis: "verifiable, measurable acceptance criteria with explicit pass/fail conditions",
    metricsEmphasis: "quality KPIs: defect escape rate, test coverage, regression rate",
    scopeEmphasis: "out-of-scope test scenarios and environments",
    risksEmphasis: "testing risks: flaky tests, environment parity, data dependencies"
  },
  sales: {
    label: "Sales & Marketing",
    problemEmphasis: "customer value proposition and competitive differentiation",
    storiesEmphasis: "customers and prospects",
    criteriaEmphasis: "customer-facing acceptance criteria and demo-ready milestones",
    metricsEmphasis: "go-to-market KPIs: conversion rate, deal velocity, feature adoption",
    scopeEmphasis: "out-of-scope marketing claims and unsupported use cases",
    risksEmphasis: "go-to-market risks: messaging clarity, competitive response, launch timing"
  },
  compliance: {
    label: "Compliance & Legal",
    problemEmphasis: "regulatory obligations, data handling requirements, and audit trail needs",
    storiesEmphasis: "compliance officers and legal reviewers",
    criteriaEmphasis: "compliance acceptance criteria: data retention, consent flows, audit logging",
    metricsEmphasis: "compliance KPIs: audit pass rate, data subject request SLA, incident response time",
    scopeEmphasis: "out-of-scope regulatory jurisdictions and data categories",
    risksEmphasis: "compliance risks: regulatory change, data breach exposure, consent gaps"
  },
  "customer-success": {
    label: "Customer Success",
    problemEmphasis: "customer onboarding friction and support burden",
    storiesEmphasis: "customers and customer success managers",
    criteriaEmphasis: "onboarding and support acceptance criteria",
    metricsEmphasis: "customer outcome KPIs: time-to-value, support ticket volume, NPS",
    scopeEmphasis: "out-of-scope support scenarios and self-service limitations",
    risksEmphasis: "customer success risks: adoption barriers, training gaps, churn triggers"
  },
  "": {
    label: "General",
    problemEmphasis: "the core problem and user need",
    storiesEmphasis: "users and stakeholders",
    criteriaEmphasis: "verifiable acceptance criteria",
    metricsEmphasis: "measurable KPIs",
    scopeEmphasis: "explicitly excluded items",
    risksEmphasis: "open questions and risks"
  }
}
```

### ProductTypeContext

Encodes product-type-specific framing injected into PRD sections.

```js
const PRODUCT_TYPE_CONTEXTS = {
  saas: {
    label: "SaaS / Web App",
    framing: "scalability, multi-tenancy, and subscription lifecycle",
    metricsHint: "MRR impact, churn reduction, activation rate",
    scopeHint: "mobile-native features, on-premise deployment"
  },
  mobile: {
    label: "Mobile App (iOS / Android)",
    framing: "platform-specific UX patterns, offline capability, and app store constraints",
    metricsHint: "DAU, session length, app store rating",
    scopeHint: "web-only features, desktop-specific interactions"
  },
  internal: {
    label: "Internal Tool",
    framing: "operational efficiency, internal workflow integration, and admin controls",
    metricsHint: "time saved per task, adoption rate, error reduction",
    scopeHint: "external customer-facing features, public API surface"
  },
  data: {
    label: "Data / Analytics Platform",
    framing: "data pipeline reliability, query performance, and schema governance",
    metricsHint: "query latency p95, data freshness SLA, dashboard adoption",
    scopeHint: "real-time streaming (if batch), ML model training"
  },
  api: {
    label: "API / Developer Tool",
    framing: "developer experience, API versioning, and platform extensibility",
    metricsHint: "API call volume, SDK adoption, time-to-first-call",
    scopeHint: "end-user UI, non-programmatic workflows"
  },
  ecommerce: {
    label: "E-commerce",
    framing: "conversion optimization, cart and checkout flows, and payment reliability",
    metricsHint: "conversion rate, average order value, cart abandonment rate",
    scopeHint: "B2B procurement flows, subscription billing (if one-time)"
  },
  consumer: {
    label: "Consumer App",
    framing: "engagement, retention, and viral growth mechanics",
    metricsHint: "DAU/MAU ratio, retention D7/D30, referral rate",
    scopeHint: "enterprise admin features, B2B integrations"
  },
  "": {
    label: "General",
    framing: "core functionality and user value",
    metricsHint: "adoption, engagement, and quality metrics",
    scopeHint: "adjacent features and future phases"
  }
}
```

### PRDSections

The output of `generatePRD()`:

```js
{
  problemStatement: string,
  userStories: string[],        // length >= 3
  acceptanceCriteria: string[], // length >= 3
  successMetrics: string[],     // length 3–5
  outOfScope: string[],         // length >= 2
  openQuestions: string[]       // length >= 2
}
```

### Slug

Derived from `Feature_Input` for the download filename:

```
slugify(text):
  1. Take first 40 characters
  2. Lowercase
  3. Replace spaces with hyphens
  4. Remove non-alphanumeric, non-hyphen characters
  5. Collapse consecutive hyphens
  6. Trim leading/trailing hyphens
→ filename: `prd-${slug}.txt`
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Valid input length acceptance

*For any* string of length between 1 and 500 characters (inclusive), the input validation function SHALL accept it; for any string of length 0 or greater than 500, it SHALL reject it.

**Validates: Requirements 1.2**

---

### Property 2: Context injection

*For any* non-empty feature text, audience selection, and product type selection, the generated PRD text SHALL contain the framing and emphasis strings associated with the selected audience context and product type context. When no audience or product type is selected, none of the audience-specific or product-type-specific framing strings from other contexts SHALL appear in the output.

**Validates: Requirements 2.2, 2.3, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9**

---

### Property 3: All six sections present

*For any* non-empty feature text, calling `generatePRD()` SHALL return an object containing all six required keys: `problemStatement`, `userStories`, `acceptanceCriteria`, `successMetrics`, `outOfScope`, and `openQuestions`, each with non-empty content.

**Validates: Requirements 4.2, 4.3**

---

### Property 4: Section count minimums

*For any* non-empty feature text, the generated PRD SHALL satisfy all of the following count invariants simultaneously: `userStories.length >= 3`, `acceptanceCriteria.length >= 3`, `3 <= successMetrics.length <= 5`, `outOfScope.length >= 2`, `openQuestions.length >= 2`.

**Validates: Requirements 4.4, 4.5, 4.6, 4.7, 4.8**

---

### Property 5: User story format

*For any* non-empty feature text, every string in the `userStories` array SHALL match the pattern `"As a [role], I want [action], so that [benefit]"` — specifically, each story SHALL contain the substrings `"As a"`, `"I want"`, and `"so that"`.

**Validates: Requirements 4.4**

---

### Property 6: Emoji section labels in rendered output

*For any* generated PRD, the HTML rendered into the Output Panel SHALL contain all six emoji labels: 📌, 👤, ✅, 📊, 🚫, and ⚠️, each appearing exactly once as a section heading prefix.

**Validates: Requirements 4.9**

---

### Property 7: Clipboard round-trip

*For any* generated PRD, the plain-text string passed to `navigator.clipboard.writeText()` SHALL equal the plain-text content of the Output Panel (i.e., the clipboard content is identical to what the user sees).

**Validates: Requirements 5.2**

---

### Property 8: Download content correctness

*For any* generated PRD, the `Blob` created by the Downloader SHALL have MIME type `"text/plain"` and its text content SHALL equal the plain-text PRD content displayed in the Output Panel.

**Validates: Requirements 6.2**

---

### Property 9: Slug algorithm correctness

*For any* string input to `slugify()`, the result SHALL: use only the first 40 characters of the input, be fully lowercase, contain only alphanumeric characters and hyphens, have no consecutive hyphens, and have no leading or trailing hyphens. The download filename SHALL be `prd-${slug}.txt`.

**Validates: Requirements 6.3**

---

## Error Handling

| Scenario | Handling |
|---|---|
| Empty `Feature_Input` on generate | Inline error message in `#input-error`; generation blocked |
| `navigator.clipboard` unavailable | Fall back to `document.execCommand('copy')` via hidden textarea |
| `execCommand` fallback also fails | Display inline error: "Copy failed — please select and copy manually" |
| `Blob` / `URL.createObjectURL` unavailable | Graceful degradation: hide Download button; log warning to console |
| Feature text produces very short output | Minimum counts enforced by section builders; padding items added if needed |

No network errors are possible by design (no network requests).

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:
- Unit tests catch concrete bugs at specific inputs and integration points.
- Property tests verify universal correctness across the full input space.

### Unit Tests (specific examples and edge cases)

- DOM structure: textarea, both selects, generate button, output panel present on load
- Output panel hidden before first generation, visible after
- Copy button and Download button appear after generation
- Clipboard confirmation message appears after successful copy
- Clipboard error message appears when clipboard API is mocked to reject
- No `fetch` / `XMLHttpRequest` calls are made during any user interaction
- Empty input shows validation error and does not render output
- Default (no audience, no product type) generates a complete PRD

### Property-Based Tests

Use a property-based testing library appropriate for vanilla JS (e.g., **fast-check**). Each test runs a minimum of **100 iterations**.

Each test is tagged with a comment in the format:
`// Feature: prd-generator, Property N: <property text>`

| Test | Property | Iterations |
|---|---|---|
| Valid/invalid input lengths accepted/rejected | Property 1 | 100 |
| Audience and product type framing appears in output | Property 2 | 100 |
| All six section keys present and non-empty | Property 3 | 100 |
| Section count invariants hold | Property 4 | 100 |
| Every user story matches "As a / I want / so that" | Property 5 | 100 |
| All six emoji labels present in rendered HTML | Property 6 | 100 |
| Clipboard text equals output panel text | Property 7 | 100 |
| Download Blob has correct MIME type and content | Property 8 | 100 |
| Slug output satisfies all format constraints | Property 9 | 100 |

### Test File Structure

```
index.html          ← app (no test code)
index.test.js       ← unit + property tests (fast-check)
```

The Generator functions should be exported or exposed on a testable namespace (e.g., `window.PRDGenerator` in non-test builds, or extracted to a `generator.js` module imported by both `index.html` and `index.test.js`) to allow direct unit and property testing without DOM interaction for pure logic tests.
