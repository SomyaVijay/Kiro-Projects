/**
 * scorecard.js — Health scorecard computation for a single study.
 *
 * Returns 'GREEN' | 'YELLOW' | 'RED' based on study status, enrollment pace,
 * and study age relative to typical phase duration.
 */

/** @type {Record<string, number>} Typical phase durations in days */
const TYPICAL_DAYS = {
  PHASE1: 730,   // 2 years
  PHASE2: 1095,  // 3 years
  PHASE3: 1825,  // 5 years
  PHASE4: 1460,  // 4 years
};

const DEFAULT_TYPICAL_DAYS = 1095; // 3 years for unknown/null phase

/**
 * Return the typical duration in days for a given phase.
 * @param {string|null} phase
 * @returns {number}
 */
function typicalDaysForPhase(phase) {
  return (phase && TYPICAL_DAYS[phase]) ?? DEFAULT_TYPICAL_DAYS;
}

/**
 * Parse an ISO date string ('YYYY-MM-DD') to a Date at UTC midnight.
 * @param {string} dateStr
 * @returns {Date}
 */
function parseDate(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`);
}

/**
 * Compute health scorecard for a single study.
 * @param {import('./api.js').Study} study
 * @returns {'GREEN'|'YELLOW'|'RED'}
 */
export function computeScorecard(study) {
  // Rule 1: TERMINATED → RED
  if (study.status === 'TERMINATED') return 'RED';

  // Rule 2: no start date → YELLOW
  if (study.startDate === null) return 'YELLOW';

  const today = Date.now();
  const startMs = parseDate(study.startDate).getTime();
  const elapsedDays = (today - startMs) / 86_400_000;
  const typicalDays = typicalDaysForPhase(study.phase);

  let enrollmentScore = 'GREEN'; // default when check is skipped
  let ageScore = 'GREEN';

  // Rule 3: Enrollment pace score
  if (
    study.enrollmentTarget !== null &&
    elapsedDays > 0
  ) {
    let totalExpectedDays;
    if (study.completionDate !== null) {
      totalExpectedDays = (parseDate(study.completionDate).getTime() - startMs) / 86_400_000;
    } else {
      totalExpectedDays = typicalDays;
    }

    if (totalExpectedDays > 0) {
      const expectedEnrollment = study.enrollmentTarget * (elapsedDays / totalExpectedDays);
      if (expectedEnrollment > 0) {
        const enrollmentRatio = (study.enrollmentActual ?? 0) / expectedEnrollment;
        if (enrollmentRatio < 0.5) {
          enrollmentScore = 'RED';
        } else if (enrollmentRatio < 0.8) {
          enrollmentScore = 'YELLOW';
        }
      }
    }
  }

  // Rule 4: Study age score
  const ageRatio = elapsedDays / typicalDays;
  if (ageRatio > 1.25) {
    ageScore = 'RED';
  } else if (ageRatio > 1.0) {
    ageScore = 'YELLOW';
  }

  // Rules 5–7: aggregate
  if (enrollmentScore === 'RED' || ageScore === 'RED') return 'RED';
  if (enrollmentScore === 'YELLOW' || ageScore === 'YELLOW') return 'YELLOW';
  return 'GREEN';
}
