# Requirements Document

## Introduction

A fully static, client-side Clinical Trial Dashboard web application deployable to GitHub Pages. The app queries the ClinicalTrials.gov v2 REST API to search, filter, and visualize clinical trial data. It targets clinical operations professionals who need a fast, data-dense view of trial health, enrollment status, and timelines — without a backend.

## Glossary

- **Dashboard**: The single-page web application described in this document
- **ClinicalTrials_API**: The ClinicalTrials.gov v2 REST API at `https://clinicaltrials.gov/api/v2/studies`
- **Study**: A single clinical trial record returned by the ClinicalTrials_API
- **NCT_Number**: The unique ClinicalTrials.gov identifier for a Study (e.g., NCT04567890)
- **Study_Card**: A visual card component displaying summary fields for one Study
- **Health_Scorecard**: A color-coded indicator (Green / Yellow / Red) computed per Study from enrollment pace, study age, and status flags
- **Timeline_View**: A horizontal bar chart showing each Study's start date, estimated completion date, and a "today" marker
- **Enrollment_Gap_Section**: A panel highlighting Studies whose actual enrollment is behind their target enrollment
- **Filter_Panel**: The UI component containing Phase, Status, and Sponsor Type filter controls
- **Search_Bar**: The text input used to query trials by condition, sponsor, or NCT number

---

## Requirements

### Requirement 1: Search Trials

**User Story:** As a clinical ops analyst, I want to search for trials by condition, sponsor, or NCT number, so that I can quickly locate relevant studies.

#### Acceptance Criteria

1. THE Search_Bar SHALL accept free-text input for condition names, sponsor names, and NCT numbers.
2. WHEN the user submits a search query, THE Dashboard SHALL send a request to the ClinicalTrials_API using the query as the search term.
3. WHEN the ClinicalTrials_API returns results, THE Dashboard SHALL render one Study_Card per Study in the results list.
4. WHEN the search query is empty and the user submits, THE Dashboard SHALL display a validation message prompting the user to enter a search term.
5. IF the ClinicalTrials_API returns an error response, THEN THE Dashboard SHALL display a human-readable error message and preserve the previous results.
6. IF the ClinicalTrials_API request times out after 15 seconds, THEN THE Dashboard SHALL display a timeout error message and allow the user to retry.

---

### Requirement 2: Filter Results

**User Story:** As a clinical ops analyst, I want to filter search results by phase, status, and sponsor type, so that I can narrow down trials to those relevant to my analysis.

#### Acceptance Criteria

1. THE Filter_Panel SHALL provide checkboxes for Study Phase values: Phase I, Phase II, Phase III, Phase IV.
2. THE Filter_Panel SHALL provide checkboxes for Status values: Recruiting, Active, Completed, Terminated.
3. THE Filter_Panel SHALL provide checkboxes for Sponsor Type values: NIH/NCI, Industry, Academic.
4. WHEN the user selects one or more filter values, THE Dashboard SHALL apply those filters to the current results list without issuing a new API request.
5. WHEN multiple filters within the same category are selected, THE Dashboard SHALL include Studies matching any of the selected values in that category (OR logic within category).
6. WHEN filters from multiple categories are active, THE Dashboard SHALL include only Studies matching at least one value in each active category (AND logic across categories).
7. WHEN all checkboxes in a category are deselected, THE Dashboard SHALL treat that category as unfiltered.
8. WHEN filters are applied, THE Dashboard SHALL update the visible Study_Card count to reflect the filtered result set.

---

### Requirement 3: Display Study Cards

**User Story:** As a clinical ops analyst, I want to see key study details in a card layout, so that I can scan multiple trials at a glance.

#### Acceptance Criteria

1. THE Study_Card SHALL display the NCT_Number, Study Title, Phase, Status, Sponsor name, Enrollment Target, Start Date, and Estimated Completion Date.
2. WHEN a field value is not available in the API response, THE Study_Card SHALL display "N/A" for that field.
3. THE Dashboard SHALL render Study_Cards in a responsive grid that adapts to viewport width.
4. WHEN the results list contains more than 20 studies, THE Dashboard SHALL paginate results showing 20 Study_Cards per page.
5. THE Study_Card SHALL display the Health_Scorecard indicator color prominently alongside the NCT_Number.

---

### Requirement 4: Compute Study Health Scorecard

**User Story:** As a clinical ops analyst, I want each study to show a color-coded health indicator, so that I can immediately identify studies that may be at risk.

#### Acceptance Criteria

1. THE Health_Scorecard SHALL assign a Green status to a Study when enrollment pace is on track, study age is appropriate for its phase, and no adverse status flags are present.
2. THE Health_Scorecard SHALL assign a Yellow status to a Study when enrollment is between 50% and 80% of the expected pace given elapsed time, or the study age exceeds the typical duration for its phase by up to 25%.
3. THE Health_Scorecard SHALL assign a Red status to a Study when enrollment is below 50% of the expected pace given elapsed time, or the study age exceeds the typical duration for its phase by more than 25%, or the Study status is Terminated.
4. WHEN enrollment target data is unavailable, THE Health_Scorecard SHALL base the score solely on study age vs. phase and status flags.
5. WHEN start date data is unavailable, THE Health_Scorecard SHALL assign a Yellow status by default.
6. THE Health_Scorecard color SHALL be visually distinguishable for users with red-green color deficiency by using distinct icons or labels in addition to color.

---

### Requirement 5: Timeline View

**User Story:** As a clinical ops analyst, I want to see study durations as horizontal bars on a shared timeline, so that I can understand the temporal spread of active trials.

#### Acceptance Criteria

1. THE Timeline_View SHALL render each Study as a horizontal bar spanning from the Study's Start Date to its Estimated Completion Date.
2. THE Timeline_View SHALL display a vertical "today" marker at the current date.
3. WHEN a Study's Start Date or Estimated Completion Date is unavailable, THE Timeline_View SHALL omit that Study from the timeline and note the omission count.
4. THE Timeline_View SHALL label each bar with the Study's NCT_Number.
5. WHEN the filtered result set contains more than 50 studies, THE Timeline_View SHALL display only the 50 studies with the nearest Estimated Completion Date.
6. THE Timeline_View SHALL scale the time axis to fit the earliest Start Date and latest Estimated Completion Date in the visible set.

---

### Requirement 6: Enrollment Gap Section

**User Story:** As a clinical ops analyst, I want to see which studies are behind their enrollment targets, so that I can prioritize outreach and intervention.

#### Acceptance Criteria

1. THE Enrollment_Gap_Section SHALL list Studies where actual enrollment is less than the expected enrollment given elapsed time and target enrollment.
2. THE Enrollment_Gap_Section SHALL display for each listed Study: NCT_Number, Enrollment Target, a calculated enrollment gap value, and elapsed time since Start Date.
3. THE Enrollment_Gap_Section SHALL sort listed Studies by enrollment gap in descending order (largest gap first).
4. WHEN no Studies have an enrollment gap, THE Enrollment_Gap_Section SHALL display a message indicating all visible studies are on track.
5. WHEN enrollment target or start date data is unavailable for a Study, THE Enrollment_Gap_Section SHALL exclude that Study and display a count of excluded studies.

---

### Requirement 7: Static Deployment

**User Story:** As a developer, I want the app to run as a fully static site, so that it can be deployed to GitHub Pages without a backend.

#### Acceptance Criteria

1. THE Dashboard SHALL consist only of HTML, CSS, and vanilla JavaScript files with no server-side runtime dependencies.
2. THE Dashboard SHALL fetch all data at runtime directly from the ClinicalTrials_API using the browser's Fetch API.
3. THE Dashboard SHALL function correctly when served from a GitHub Pages URL with a non-root base path.
4. WHEN the browser does not support the Fetch API, THE Dashboard SHALL display a browser compatibility warning.

---

### Requirement 8: Visual Design

**User Story:** As a clinical ops analyst, I want the dashboard to use a professional dark navy and white color scheme, so that it feels like an internal clinical ops tool.

#### Acceptance Criteria

1. THE Dashboard SHALL use a dark navy primary background color and white or light-gray text as the base color scheme.
2. THE Dashboard SHALL use a consistent typographic scale with no more than three font size levels for body, label, and heading text.
3. THE Dashboard SHALL render without horizontal scrollbars on viewport widths of 1024px and above.
4. THE Dashboard SHALL provide sufficient color contrast between text and background meeting a minimum contrast ratio of 4.5:1 for normal text.
