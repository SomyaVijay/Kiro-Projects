/**
 * render.js — DOM rendering: Study Cards, pagination, error/empty states.
 *
 * Targets:
 *   #cards-grid    — study cards container
 *   #pagination    — pagination nav
 *   #error-banner  — error display
 *   #results-meta  — result count text
 */

// ── Scorecard badge config ──────────────────────────────────────────────────

const BADGE_CONFIG = {
  GREEN:  { label: '● On Track',  cssClass: 'green'  },
  YELLOW: { label: '▲ At Risk',   cssClass: 'yellow' },
  RED:    { label: '■ Critical',  cssClass: 'red'    },
};

// ── Field definitions for study cards ──────────────────────────────────────

const STUDY_FIELDS = [
  { label: 'Phase',             key: 'phase'           },
  { label: 'Status',            key: 'status'          },
  { label: 'Sponsor',           key: 'sponsorName'     },
  { label: 'Enrollment Target', key: 'enrollmentTarget' },
  { label: 'Start Date',        key: 'startDate'       },
  { label: 'Est. Completion',   key: 'completionDate'  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Return a display string for a field value, or null if it should show N/A.
 * @param {*} value
 * @returns {string|null}
 */
function displayValue(value) {
  if (value === null || value === undefined || value === '') return null;
  return String(value);
}

/**
 * Build a single study card element.
 * @param {import('./api.js').Study} study
 * @returns {HTMLElement}
 */
function buildCard(study) {
  const card = document.createElement('div');
  card.className = 'study-card';

  // ── Header ──
  const header = document.createElement('div');
  header.className = 'study-card-header';

  const nctSpan = document.createElement('span');
  nctSpan.className = 'study-nct';
  nctSpan.textContent = study.nctId || 'N/A';

  const badgeCfg = BADGE_CONFIG[study.scorecard] ?? BADGE_CONFIG.YELLOW;
  const badge = document.createElement('span');
  badge.className = `scorecard-badge ${badgeCfg.cssClass}`;
  badge.textContent = badgeCfg.label;

  header.appendChild(nctSpan);
  header.appendChild(badge);

  // ── Title ──
  const titleEl = document.createElement('div');
  titleEl.className = 'study-title';
  titleEl.textContent = displayValue(study.title) ?? 'N/A';

  // ── Fields grid ──
  const fieldsGrid = document.createElement('div');
  fieldsGrid.className = 'study-fields';

  for (const { label, key } of STUDY_FIELDS) {
    const fieldEl = document.createElement('div');
    fieldEl.className = 'study-field';

    const labelEl = document.createElement('span');
    labelEl.className = 'field-label';
    labelEl.textContent = label;

    const val = displayValue(study[key]);
    const valueEl = document.createElement('span');
    if (val === null) {
      valueEl.className = 'field-value na';
      valueEl.textContent = 'N/A';
    } else {
      valueEl.className = 'field-value';
      valueEl.textContent = val;
    }

    fieldEl.appendChild(labelEl);
    fieldEl.appendChild(valueEl);
    fieldsGrid.appendChild(fieldEl);
  }

  card.appendChild(header);
  card.appendChild(titleEl);
  card.appendChild(fieldsGrid);

  return card;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Render a page of study cards into #cards-grid and update #results-meta.
 * @param {import('./api.js').Study[]} studies - Full (filtered) study array
 * @param {number} page - 1-indexed current page
 * @param {number} pageSize - Cards per page
 */
export function renderCards(studies, page, pageSize) {
  const grid = document.getElementById('cards-grid');
  const meta = document.getElementById('results-meta');
  if (!grid) return;

  const total = studies.length;
  const start = (page - 1) * pageSize;
  const end   = Math.min(start + pageSize, total);
  const pageStudies = studies.slice(start, end);

  // Clear and repopulate grid
  grid.innerHTML = '';
  for (const study of pageStudies) {
    grid.appendChild(buildCard(study));
  }

  // Update results meta
  if (meta) {
    if (total === 0) {
      meta.textContent = '';
    } else {
      meta.textContent = `Showing ${start + 1}–${end} of ${total} studies`;
    }
  }
}

/**
 * Render pagination controls into #pagination.
 * Dispatches a 'pagechange' CustomEvent with { page } on button click.
 * @param {number} totalCount
 * @param {number} currentPage - 1-indexed
 * @param {number} pageSize
 */
export function renderPagination(totalCount, currentPage, pageSize) {
  const nav = document.getElementById('pagination');
  if (!nav) return;

  nav.innerHTML = '';

  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return;

  /**
   * Create a pagination button.
   * @param {string|number} label
   * @param {number|null} page - null for ellipsis/disabled
   * @param {boolean} isActive
   * @param {boolean} isDisabled
   * @returns {HTMLButtonElement}
   */
  function makeBtn(label, page, isActive = false, isDisabled = false) {
    const btn = document.createElement('button');
    btn.className = 'pagination-btn';
    btn.textContent = String(label);
    if (isActive) btn.classList.add('active');
    if (isDisabled || page === null) btn.disabled = true;
    if (page !== null) btn.dataset.page = String(page);
    if (!isDisabled && page !== null) {
      btn.addEventListener('click', () => {
        nav.dispatchEvent(new CustomEvent('pagechange', { bubbles: true, detail: { page } }));
      });
    }
    return btn;
  }

  // Prev button
  nav.appendChild(makeBtn('‹ Prev', currentPage - 1, false, currentPage === 1));

  // Page number buttons — max 7 visible with ellipsis
  const pages = buildPageRange(currentPage, totalPages);
  for (const p of pages) {
    if (p === '…') {
      const ellipsis = document.createElement('button');
      ellipsis.className = 'pagination-btn';
      ellipsis.textContent = '…';
      ellipsis.disabled = true;
      nav.appendChild(ellipsis);
    } else {
      nav.appendChild(makeBtn(p, p, p === currentPage));
    }
  }

  // Next button
  nav.appendChild(makeBtn('Next ›', currentPage + 1, false, currentPage === totalPages));
}

/**
 * Build an array of page numbers (and '…' ellipsis markers) for the pagination bar.
 * Always shows at most 7 items.
 * @param {number} current
 * @param {number} total
 * @returns {(number|'…')[]}
 */
function buildPageRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Always show first, last, current, and neighbours
  const delta = 1; // pages on each side of current
  const range = new Set([1, total, current]);
  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= 1 && i <= total) range.add(i);
  }

  const sorted = Array.from(range).sort((a, b) => a - b);
  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push('…');
    result.push(p);
    prev = p;
  }
  return result;
}

/**
 * Show the error banner with a message, optionally with a retry button.
 * @param {string} message
 * @param {boolean} [showRetry=false]
 */
export function renderError(message, showRetry = false) {
  const banner = document.getElementById('error-banner');
  if (!banner) return;

  banner.removeAttribute('hidden');
  banner.innerHTML = '';

  const msgNode = document.createTextNode(message);
  banner.appendChild(msgNode);

  if (showRetry) {
    const retryBtn = document.createElement('button');
    retryBtn.className = 'retry-btn';
    retryBtn.id = 'retry-btn';
    retryBtn.textContent = 'Retry';
    banner.appendChild(retryBtn);
  }
}

/**
 * Render an empty-state message into #cards-grid and clear pagination/meta.
 */
export function renderEmpty() {
  const grid = document.getElementById('cards-grid');
  const nav  = document.getElementById('pagination');
  const meta = document.getElementById('results-meta');

  if (grid) {
    grid.innerHTML = '';
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No studies found. Try a different search term.';
    grid.appendChild(empty);
  }

  if (nav)  nav.innerHTML  = '';
  if (meta) meta.textContent = '';
}

/**
 * Clear all result areas and hide the error banner.
 */
export function clearResults() {
  const grid   = document.getElementById('cards-grid');
  const nav    = document.getElementById('pagination');
  const meta   = document.getElementById('results-meta');
  const banner = document.getElementById('error-banner');

  if (grid)   grid.innerHTML    = '';
  if (nav)    nav.innerHTML     = '';
  if (meta)   meta.textContent  = '';
  if (banner) banner.setAttribute('hidden', '');
}
