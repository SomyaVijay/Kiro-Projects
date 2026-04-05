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
const TIMEOUT_MS = 30_000; // Increased from 15s to 30s to handle larger result sets

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
  // FIX: NCI is a division of NIH — check both leadSponsor name and class
  // to correctly identify NCI-sponsored studies as NIH type
  const leadSponsor = sponsor.leadSponsor ?? {};
  const sponsorName = leadSponsor.name ?? null;
  const rawClass = leadSponsor.class ?? null;

  // If sponsor name contains NCI or National Cancer Institute, always map to NIH
  const isNCI = sponsorName && (
    sponsorName.toUpperCase().includes('NATIONAL CANCER INSTITUTE') ||
    sponsorName.toUpperCase().includes('NCI')
  );
  const sponsorType = isNCI ? 'NIH' : (rawClass ? (SPONSOR_CLASS_MAP[rawClass] ?? 'ACADEMIC') : null);

  // Enrollment
  const enrollmentInfo = design.enrollmentInfo ?? {};
  const enrollmentCount = enrollmentInfo.count ?? null;
  const enrollmentType = enrollmentInfo.type ?? null;
  const enrollmentTarget = enrollmentCount !== null ? Number(enrollmentCount) : null;
  const enrollmentActual = (enrollmentType === 'ACTUAL' && enrollmentCount !== null)
    ? Number(enrollmentCount)
    : null;

  // Dates
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
    scorecard: 'YELLOW',
  };
}

/**
 * Normalize a date string to 'YYYY-MM-DD' or return null.
 * @param {string|null} raw
 * @returns {string|null}
 */
function normalizeDate(raw) {
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  if (/^\d{4}-\d{2}$/.test(raw)) return `${raw}-01`;
  const parsed = Date.parse(raw);
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString().slice(0, 10);
  }
  return null;
}

/**
 * Fetch studies from ClinicalTrials.gov v2 API.
 *
 * FIX 1: Increased default pageSize from 100 to 500 so recent studies
 *         are not cut off in large result sets.
 * FIX 2: Added sort by startDate descending so newest studies (2024/2025)
 *         always appear first instead of being buried by relevance ranking.
 * FIX 3: Timeout increased to 30s to accommodate larger fetches.
 *
 * @param {string} query - Free-text search term
 * @param {number} [pageSize=500] - Number of results (max 1000)
 * @param {string|null} [pageToken=null] - Pagination token for next page
 * @returns {Promise<{studies: Study[], nextPageToken: string|null}>}
 * @throws {ApiError}
 */
export async function fetchStudies(query, pageSize = 500, pageToken = null) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const params = new URLSearchParams({
    'query.term': query,
    pageSize: String(pageSize),
    format: 'json',
    // FIX: Sort by start date descending so 2024/2025 studies appear first
    'sort': 'StartDate:desc',
  });

  if (pageToken) params.set('pageToken', pageToken);

  const url = `${API_BASE}?${params.toString()}`;

  let response;
  try {
    response = await fetch(url, { signal: controller.signal });
  } catch (err) {
    clearTimeout(timerId);
    if (err.name === 'AbortError') {
      const apiError = { type: 'timeout', message: 'Request timed out. Try a more specific search term.', status: null };
      throw apiError;
    }
    const apiError = { type: 'network', message: err.message || 'Network error.', status: null };
    throw apiError;
  }

  clearTimeout(timerId);

  if (!response.ok) {
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
