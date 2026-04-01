/**
 * filter.js — Client-side filter logic for the Clinical Trial Dashboard.
 *
 * @typedef {Object} FilterState
 * @property {string[]} phases       - e.g. ['PHASE1', 'PHASE2']. Empty = no filter.
 * @property {string[]} statuses     - e.g. ['RECRUITING']. Empty = no filter.
 * @property {string[]} sponsorTypes - e.g. ['NIH', 'INDUSTRY']. Empty = no filter.
 */

/**
 * Apply active filters to a study array. Pure function — no side effects.
 *
 * Logic:
 *   - OR within category: a study matches a category if its value matches ANY
 *     selected value in that category.
 *   - AND across categories: a study must match ALL active categories (those
 *     with at least one selected value).
 *   - An empty array for a category means no filter is applied for that category.
 *
 * @param {import('./api.js').Study[]} studies
 * @param {FilterState} filters
 * @returns {import('./api.js').Study[]} A subset of the input array.
 */
export function applyFilters(studies, filters) {
  const { phases, statuses, sponsorTypes } = filters;

  return studies.filter((study) => {
    // Phase filter (OR within category)
    if (phases.length > 0) {
      if (!phases.includes(study.phase)) return false;
    }

    // Status filter — case-insensitive (OR within category)
    if (statuses.length > 0) {
      const studyStatus = (study.status ?? '').toUpperCase();
      const match = statuses.some((s) => s.toUpperCase() === studyStatus);
      if (!match) return false;
    }

    // Sponsor type filter (OR within category)
    if (sponsorTypes.length > 0) {
      if (!sponsorTypes.includes(study.sponsorType)) return false;
    }

    return true;
  });
}
