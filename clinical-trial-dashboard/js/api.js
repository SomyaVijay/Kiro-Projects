/**
 * api.js — ClinicalTrials.gov v2 fetch wrapper.
 *
 * @typedef {Object} ApiError
 * @property {'timeout'|'http'|'network'} type
 * @property {string} message
 * @property {number|null} status
 */

/**
 * @typedef {Object} Study
 * @property {string} nctId
 * @property {string} title
 * @property {'PHASE1'|'PHASE2'|'PHASE3'|'PHASE4'|null} phase
 * @property {string} status
 * @property {string|null} sponsorName
 * @property {'NIH'|'INDUSTRY'|'ACADEMIC'|null} sponsorType
 * @property {number|null} enrollmentTarget
 * @property {number|null} enrollmentActual
 * @property {string|null} startDate
 * @property {string|null} completionDate
 * @property {'GREEN'|'YELLOW'|'RED'} scorecard
 */

const API_BASE = 'https://clinicaltrials.gov/api/v2/studies';
const TIMEOUT_MS = 15_000;
const PAGE_SIZE = 500;
const MAX_PAGES = 2;

// Default status filter — only active/ongoing studies
const DEFAULT_STATUS_FILTER = 'RECRUITING,ACTIVE_NOT_RECRUITING,ENROLLING_BY_INVITATION';

// Statuses that require expanding beyond the default API filter
const EXPANDED_STATUSES = new Set(['COMPLETED', 'TERMINATED']);

/** @type {Record<string, 'NIH'|'INDUSTRY'|'ACADEMIC'>} */
const SPONSOR_CLASS_MAP = {
  NIH: 'NIH',
  INDUSTRY: 'INDUSTRY',
  OTHER: 'ACADEMIC',
};

/**
 * Normalize a raw API study object into a Study.
 * @param {Object} raw
 * @returns {Study}
 */
function normalizeStudy(raw) {
  const proto = raw.protocolSection ?? {};
  const id = proto.identificationModule ?? {};
  const status = proto.statusModule ?? {};
  const design = proto.designModule ?? {};
  const sponsor = proto.sponsorCollaboratorsModule ?? {};

  // Phase: take first entry from phases array
  const phases = design.phases ?? [];
  const rawPhase = phases[0] ?? null;
  const phaseMap = {
    PHASE1: 'PHASE1',
    PHASE2: 'PHASE2',
    PHASE3: 'PHASE3',
    PHASE4: 'PHASE4',
  };
  const phase = rawPhase ? (phaseMap[rawPhase] ?? null) : null;

  // Sponsor
  const leadSponsor = sponsor.leadSponsor ?? {};
  const sponsorName = leadSponsor.name ?? null;
  const rawClass = leadSponsor.class ?? null;
  const sponsorType = rawClass ? (SPONSOR_CLASS_MAP[rawClass] ?? null) : null;

  // Enrollment
  // The API returns one count with a type: 'ACTUAL' (real enrolled count) or 'ANTICIPATED' (target estimate).
  // enrollmentTarget is always the count value.
  // enrollmentActual is only set when type === 'ACTUAL'; otherwise we have no real enrollment data.
  const enrollmentInfo = design.enrollmentInfo ?? {};
  const enrollmentCount = enrollmentInfo.count ?? null;
  const enrollmentType = enrollmentInfo.type ?? null; // 'ACTUAL' | 'ANTICIPATED'
  const enrollmentTarget = enrollmentCount !== null ? Number(enrollmentCount) : null;
  const enrollmentActual = (enrollmentType === 'ACTUAL' && enrollmentCount !== null)
    ? Number(enrollmentCount)
    : null;

  // Dates — normalize 'YYYY-MM-DD' or 'YYYY-MM' → 'YYYY-MM-DD'
  const startRaw = status.startDateStruct?.date ?? null;
  const completionRaw = status.primaryCompletionDateStruct?.date ?? null;

  return {
    nctId: id.nctId ?? '',
    title: id.briefTitle ?? '',
    phase,
    status: status.overallStatus ?? '',
    sponsorName,
    sponsorType,
    enrollmentTarget,
    enrollmentActual,
    startDate: normalizeDate(startRaw),
    completionDate: normalizeDate(completionRaw),
    scorecard: 'YELLOW', // placeholder; computed by scorecard.js
  };
}

/**
 * Normalize a date string to 'YYYY-MM-DD' or return null.
 * @param {string|null} raw
 * @returns {string|null}
 */
function normalizeDate(raw) {
  if (!raw) return null;
  // Already full ISO date
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  // 'YYYY-MM' → append '-01'
  if (/^\d{4}-\d{2}$/.test(raw)) return `${raw}-01`;
  // 'Month DD, YYYY' format from API (e.g. "January 1, 2020")
  const parsed = Date.parse(raw);
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString().slice(0, 10);
  }
  return null;
}

/**
 * Fetch a single page from the API.
 * @param {string} query
 * @param {string} statusFilter - comma-separated overallStatus values
 * @param {string|null} pageToken
 * @returns {Promise<{studies: Study[], nextPageToken: string|null}>}
 * @throws {ApiError}
 */
async function fetchPage(query, statusFilter, pageToken) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const today = new Date().toISOString().slice(0, 10);
  const tenYearsAgo = new Date(Date.now() - 10 * 365.25 * 24 * 3600 * 1000).toISOString().slice(0, 10);

  const params = new URLSearchParams({
    'query.term': query,
    'filter.overallStatus': statusFilter,
    'filter.advanced': `AREA[StartDate]RANGE[${tenYearsAgo},${today}]`,
    'sort': 'StartDate:desc',
    pageSize: String(PAGE_SIZE),
    format: 'json',
  });
  if (pageToken) params.set('pageToken', pageToken);

  const url = `${API_BASE}?${params.toString()}`;

  let response;
  try {
    response = await fetch(url, { signal: controller.signal });
  } catch (err) {
    clearTimeout(timerId);
    if (err.name === 'AbortError') {
      /** @type {ApiError} */
      const apiError = { type: 'timeout', message: 'Request timed out after 15 seconds.', status: null };
      throw apiError;
    }
    /** @type {ApiError} */
    const apiError = { type: 'network', message: err.message || 'Network error.', status: null };
    throw apiError;
  }

  clearTimeout(timerId);

  if (!response.ok) {
    /** @type {ApiError} */
    const apiError = {
      type: 'http',
      message: `HTTP error ${response.status}: ${response.statusText}`,
      status: response.status,
    };
    throw apiError;
  }

  const data = await response.json();
  return {
    studies: (data.studies ?? []).map(normalizeStudy),
    nextPageToken: data.nextPageToken ?? null,
  };
}

/**
 * Fetch studies from ClinicalTrials.gov v2 API, paginating up to MAX_PAGES.
 * @param {string} query - Free-text search term
 * @param {string[]} [extraStatuses=[]] - Additional statuses beyond the default active filter
 * @returns {Promise<{studies: Study[]}>}
 * @throws {ApiError}
 */
export async function fetchStudies(query, extraStatuses = []) {
  // Build status filter: always include default active statuses; add extras if requested
  const expanded = extraStatuses.filter(s => EXPANDED_STATUSES.has(s));
  const statusFilter = expanded.length > 0
    ? `${DEFAULT_STATUS_FILTER},${expanded.join(',')}`
    : DEFAULT_STATUS_FILTER;

  let allStudies = [];
  let pageToken = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const { studies, nextPageToken } = await fetchPage(query, statusFilter, pageToken);
    allStudies = allStudies.concat(studies);
    if (!nextPageToken) break;
    pageToken = nextPageToken;
  }

  return { studies: allStudies };
}
