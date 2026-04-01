# Implementation Plan: Clinical Trial Dashboard

## Overview

Build a fully static, client-side SPA using vanilla JS ES modules deployable to GitHub Pages. Implementation proceeds module-by-module, wiring everything together in `main.js` at the end.

## Tasks

- [x] 1. Scaffold project structure and base HTML/CSS
  - Create `index.html` with semantic layout: search bar, filter panel, study cards grid, timeline container, enrollment gap container
  - Create `css/styles.css` with dark navy color scheme, typographic scale, responsive grid, and sufficient contrast (≥4.5:1)
  - Add `<script type="module" src="js/main.js">` and browser Fetch API compatibility check
  - _Requirements: 7.1, 7.3, 8.1, 8.2, 8.3, 8.4_

- [x] 2. Implement API module (`js/api.js`)
  - [x] 2.1 Implement `fetchStudies(query, pageSize, pageToken)` with AbortController 15s timeout, explicit `fields` parameter, and Study normalization from raw API response
    - Map raw API fields to the `Study` typedef (nctId, title, phase, status, sponsorName, sponsorType, enrollmentTarget, enrollmentActual, startDate, completionDate)
    - Throw typed `ApiError` (`timeout`, `http`, `network`) on failure
    - _Requirements: 1.2, 1.5, 1.6, 7.2_

  - [ ]* 2.2 Write property test for API query passthrough (Property 1)
    - **Property 1: API call passes query term**
    - **Validates: Requirements 1.2**

- [x] 3. Implement filter module (`js/filter.js`)
  - [x] 3.1 Implement `applyFilters(studies, filters)` as a pure function with OR-within-category and AND-across-categories logic; empty array means no filter for that category
    - _Requirements: 2.4, 2.5, 2.6, 2.7_

  - [ ]* 3.2 Write property test for filter correctness (Property 4)
    - **Property 4: Filter correctness — OR within category, AND across categories**
    - **Validates: Requirements 2.4, 2.5, 2.6, 2.7**

- [x] 4. Implement scorecard module (`js/scorecard.js`)
  - [x] 4.1 Implement `computeScorecard(study)` following the rules table: RED for Terminated/low pace/old age, YELLOW for missing startDate/moderate pace/moderate age, GREEN otherwise; use typical phase durations from design
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 4.2 Write property test for scorecard computation (Property 7)
    - **Property 7: Scorecard computation correctness**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.5**

- [x] 5. Implement render module (`js/render.js`)
  - [x] 5.1 Implement `renderCards(studies, page, pageSize)` — build Study_Card DOM elements with all required fields, "N/A" fallback for null fields, scorecard color indicator with icon/label for color-blind accessibility, and 20-per-page pagination
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.6_

  - [x] 5.2 Implement `renderPagination(totalCount, currentPage, pageSize)`, `renderError(message)`, `renderEmpty()`, and `clearResults()`
    - _Requirements: 3.4, 1.4, 1.5_

  - [ ]* 5.3 Write property test for card count equals study count (Property 2)
    - **Property 2: Card count equals study count**
    - **Validates: Requirements 1.3, 2.8**

  - [ ]* 5.4 Write property test for Study_Card required fields with N/A fallback (Property 5)
    - **Property 5: Study_Card renders all required fields with N/A fallback**
    - **Validates: Requirements 3.1, 3.2, 3.5**

  - [ ]* 5.5 Write property test for pagination 20 per page (Property 6)
    - **Property 6: Pagination shows exactly 20 cards per page**
    - **Validates: Requirements 3.4**

- [x] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement timeline module (`js/timeline.js`)
  - [x] 7.1 Implement `renderTimeline(studies)` — SVG bar chart capped at 50 nearest-completion studies, today marker, NCT_Number labels, axis scaled to data range, omission count for studies with missing dates
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 7.2 Write property test for timeline bar date range (Property 8)
    - **Property 8: Timeline bar spans correct date range**
    - **Validates: Requirements 5.1**

  - [ ]* 7.3 Write property test for timeline omits missing dates (Property 9)
    - **Property 9: Timeline omits studies with missing dates and counts omissions**
    - **Validates: Requirements 5.3**

  - [ ]* 7.4 Write property test for timeline capped at 50 (Property 10)
    - **Property 10: Timeline capped at 50 nearest completion**
    - **Validates: Requirements 5.5**

  - [ ]* 7.5 Write property test for timeline axis bounds (Property 11)
    - **Property 11: Timeline axis bounds match data range**
    - **Validates: Requirements 5.6**

- [x] 8. Implement enrollment gap module (`js/enrollment.js`)
  - [x] 8.1 Implement `computeEnrollmentGap(study)` returning gap data or null when data is insufficient
    - _Requirements: 6.1, 6.2, 6.5_

  - [x] 8.2 Implement `renderEnrollmentGap(studies)` — sort by gap descending, display excluded count for missing-data studies, show "all on track" message when gap list is empty
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 8.3 Write property test for gap list contains only under-enrolled studies (Property 12)
    - **Property 12: Enrollment gap list contains only under-enrolled studies**
    - **Validates: Requirements 6.1**

  - [ ]* 8.4 Write property test for gap sorted descending (Property 13)
    - **Property 13: Enrollment gap section sorted descending by gap**
    - **Validates: Requirements 6.3**

  - [ ]* 8.5 Write property test for gap excluded count (Property 14)
    - **Property 14: Enrollment gap excluded count matches missing-data studies**
    - **Validates: Requirements 6.5**

- [x] 9. Implement main entry point (`js/main.js`) and wire everything together
  - [x] 9.1 Initialize `AppState`, attach search form submit handler (empty query validation), filter checkbox change handlers, and pagination click handlers
    - _Requirements: 1.1, 1.4, 2.1, 2.2, 2.3_

  - [x] 9.2 Implement the search → filter → render pipeline: call `fetchStudies`, handle all `ApiError` types (preserve previous results on error, show retry button for timeout), run `applyFilters`, call `renderCards`, `renderTimeline`, `renderEnrollmentGap`
    - _Requirements: 1.2, 1.3, 1.5, 1.6, 2.4, 2.8_

  - [x] 9.3 Add Fetch API availability check on page load; display browser compatibility warning if unavailable
    - _Requirements: 7.4_

  - [ ]* 9.4 Write property test for error response preserves previous results (Property 3)
    - **Property 3: Error response preserves previous results**
    - **Validates: Requirements 1.5, 1.6**

- [ ] 10. Set up test infrastructure and unit tests
  - [ ] 10.1 Initialize Vitest and fast-check (`npm init`, `npm install --save-dev vitest fast-check`), create `tests/` directory with test files matching the design's test file structure
    - _Requirements: (testing infrastructure)_

  - [ ]* 10.2 Write unit tests covering: empty query validation, timeout error display and retry button, Filter_Panel DOM structure (phase/status/sponsor checkboxes), timeline today marker, enrollment gap "all on track" message, browser Fetch API compatibility warning
    - _Requirements: 1.4, 1.6, 2.1, 2.2, 2.3, 5.2, 6.4, 7.4_

- [x] 11. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with a minimum of 100 iterations each
- Property test files: `tests/api.test.js`, `tests/filter.test.js`, `tests/scorecard.test.js`, `tests/render.test.js`, `tests/timeline.test.js`, `tests/enrollment.test.js`
