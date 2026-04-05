/**
 * main.js — Entry point: event wiring and search/filter/render pipeline.
 */

import { fetchStudies } from './api.js';
import { applyFilters } from './filter.js';
import { computeScorecard } from './scorecard.js';
import { renderCards, renderPagination, renderError, renderEmpty, clearResults } from './render.js';
import { renderTimeline } from './timeline.js';
import { renderEnrollmentGap } from './enrollment.js';

const PAGE_SIZE = 20;

/** @type {import('./api.js').Study[]} */
const AppState = {
  allStudies: [],
  filteredStudies: [],
  filters: { phases: [], statuses: [], sponsorTypes: [] },
  sort: null, // null | { field: 'startDate', dir: 'asc' | 'desc' }
  currentPage: 1,
  loading: false,
  lastQuery: null,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function readFilters() {
  return {
    phases: [...document.querySelectorAll('input[name="phase"]:checked')].map(el => el.value),
    statuses: [...document.querySelectorAll('input[name="status"]:checked')].map(el => el.value),
    sponsorTypes: [...document.querySelectorAll('input[name="sponsorType"]:checked')].map(el => el.value),
  };
}

function showLoading() {
  const banner = document.getElementById('error-banner');
  if (banner) banner.setAttribute('hidden', '');
  clearResults();
  const grid = document.getElementById('cards-grid');
  if (grid) {
    const p = document.createElement('p');
    p.className = 'loading-state';
    p.id = 'loading-indicator';
    p.textContent = 'Searching…';
    grid.appendChild(p);
  }
}

function sortStudies(studies) {
  if (!AppState.sort) return studies;
  return [...studies].sort((a, b) => {
    const aVal = a.startDate ?? '';
    const bVal = b.startDate ?? '';
    // nulls last regardless of direction
    if (!aVal && !bVal) return 0;
    if (!aVal) return 1;
    if (!bVal) return -1;
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return AppState.sort.dir === 'asc' ? cmp : -cmp;
  });
}

function runFilterAndRender() {
  const filtered = applyFilters(AppState.allStudies, AppState.filters);
  AppState.filteredStudies = sortStudies(filtered);
  AppState.currentPage = 1;

  if (AppState.filteredStudies.length === 0) {
    renderEmpty();
  } else {
    renderCards(AppState.filteredStudies, AppState.currentPage, PAGE_SIZE);
    renderPagination(AppState.filteredStudies.length, AppState.currentPage, PAGE_SIZE);
  }

  renderTimeline(AppState.filteredStudies);
  renderEnrollmentGap(AppState.filteredStudies);
}

// ── Search handler ────────────────────────────────────────────────────────────

async function handleSearch(query) {
  const validationEl = document.getElementById('search-validation');

  if (!query.trim()) {
    if (validationEl) {
      validationEl.textContent = 'Please enter a search term.';
      validationEl.removeAttribute('hidden');
    }
    return;
  }

  if (validationEl) {
    validationEl.textContent = '';
    validationEl.setAttribute('hidden', '');
  }

  AppState.loading = true;
  showLoading();

  try {
    const { studies } = await fetchStudies(query, 100);

    for (const study of studies) {
      study.scorecard = computeScorecard(study);
    }

    AppState.allStudies = studies;
    AppState.lastQuery = query;
    AppState.filters = readFilters();
    const filtered = applyFilters(AppState.allStudies, AppState.filters);
    AppState.filteredStudies = sortStudies(filtered);
    AppState.currentPage = 1;

    if (AppState.filteredStudies.length === 0) {
      renderEmpty();
    } else {
      renderCards(AppState.filteredStudies, AppState.currentPage, PAGE_SIZE);
      renderPagination(AppState.filteredStudies.length, AppState.currentPage, PAGE_SIZE);
    }

    renderTimeline(AppState.filteredStudies);
    renderEnrollmentGap(AppState.filteredStudies);

  } catch (err) {
    // Preserve existing results — do NOT mutate allStudies / filteredStudies
    if (err && err.type === 'timeout') {
      renderError('Request timed out. Please try again.', true);
    } else if (err && err.type === 'http') {
      renderError(`Server error (${err.status}): ${err.message}`);
    } else if (err && err.type === 'network') {
      renderError('Network error. Check your connection and try again.');
    } else {
      renderError('An unexpected error occurred. Please try again.');
    }
  } finally {
    AppState.loading = false;
  }
}

// ── DOMContentLoaded ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // 9.3 — Fetch API check
  if (typeof fetch === 'undefined') {
    const warning = document.getElementById('fetch-warning');
    if (warning) warning.removeAttribute('hidden');
    return;
  }

  // 9.1 — Search form submit
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('search-input');
      handleSearch(input ? input.value : '');
    });
  }

  // 9.1 — Filter checkboxes
  document.querySelectorAll('input[name="phase"], input[name="status"], input[name="sponsorType"]')
    .forEach(cb => {
      cb.addEventListener('change', () => {
        AppState.filters = readFilters();
        runFilterAndRender();
      });
    });

  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.dir;
      const isActive = btn.getAttribute('aria-pressed') === 'true';

      // Toggle off if already active — clicking same button again clears sort
      if (isActive) {
        AppState.sort = null;
        document.querySelectorAll('.sort-btn').forEach(b => {
          b.setAttribute('aria-pressed', 'false');
          b.classList.remove('active');
        });
      } else {
        AppState.sort = { field: 'startDate', dir };
        document.querySelectorAll('.sort-btn').forEach(b => {
          b.setAttribute('aria-pressed', 'false');
          b.classList.remove('active');
        });
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('active');
      }

      runFilterAndRender();
    });
  });

  // 9.1 — Clear filters button
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('input[name="phase"], input[name="status"], input[name="sponsorType"]')
        .forEach(cb => { cb.checked = false; });
      document.querySelectorAll('.sort-btn').forEach(b => {
        b.setAttribute('aria-pressed', 'false');
        b.classList.remove('active');
      });
      AppState.filters = { phases: [], statuses: [], sponsorTypes: [] };
      AppState.sort = null;
      runFilterAndRender();
    });
  }

  // 9.1 — Pagination pagechange (bubbles from #pagination)
  document.addEventListener('pagechange', (e) => {
    AppState.currentPage = e.detail.page;
    renderCards(AppState.filteredStudies, AppState.currentPage, PAGE_SIZE);
    renderPagination(AppState.filteredStudies.length, AppState.currentPage, PAGE_SIZE);
  });

  // 9.2 — Retry button (delegated on #error-banner)
  const errorBanner = document.getElementById('error-banner');
  if (errorBanner) {
    errorBanner.addEventListener('click', (e) => {
      if (e.target.id === 'retry-btn' && AppState.lastQuery) {
        handleSearch(AppState.lastQuery);
      }
    });
  }
});
