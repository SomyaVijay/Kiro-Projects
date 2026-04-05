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
 * Fetch studies from ClinicalTrials.gov v2 API.
 * @param {string} query - Free-text search term
 * @param {number} [pageSize=100] - Number of results (max 1000)
 * @param {string|null} [pageToken=null] - Pagination token for next page
 * @returns {Promise<{studies: Study[], nextPageToken: string|null}>}
 * @throws {ApiError}
 */
export async function fetchStudies(query, pageSize = 100, pageToken = null) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const params = new URLSearchParams({
    'query.term': query,
    pageSize: String(pageSize),
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

  const rawStudies = data.studies ?? [];
  const studies = rawStudies.map(normalizeStudy);
  const nextPageToken = data.nextPageToken ?? null;

  return { studies, nextPageToken };
}
