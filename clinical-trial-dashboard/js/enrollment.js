/**
 * enrollment.js — Enrollment gap computation and rendering.
 */

/** @type {Record<string, number>} Typical phase durations in days */
const PHASE_DAYS = {
  PHASE1: 730,
  PHASE2: 1095,
  PHASE3: 1825,
  PHASE4: 1460,
};

const DEFAULT_PHASE_DAYS = 1095;

/**
 * Parse an ISO date string ('YYYY-MM-DD') to a Date at UTC midnight.
 * @param {string} dateStr
 * @returns {Date}
 */
function parseDate(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`);
}

/**
 * Compute enrollment gap for a study.
 * @param {import('./api.js').Study} study
 * @returns {{nctId: string, target: number, gap: number, elapsedDays: number}|null}
 */
export function computeEnrollmentGap(study) {
  if (study.enrollmentTarget === null || study.startDate === null) return null;
  // Without actual enrollment data we can't compute a real gap
  if (study.enrollmentActual === null) return null;

  const today = Date.now();
  const startMs = parseDate(study.startDate).getTime();
  const elapsedDays = (today - startMs) / 86_400_000;

  if (elapsedDays <= 0) return null;

  let totalExpectedDays;
  if (study.completionDate !== null) {
    totalExpectedDays = (parseDate(study.completionDate).getTime() - startMs) / 86_400_000;
  } else {
    totalExpectedDays = PHASE_DAYS[study.phase] ?? DEFAULT_PHASE_DAYS;
  }

  if (totalExpectedDays <= 0) return null;

  const expectedEnrollment = study.enrollmentTarget * (elapsedDays / totalExpectedDays);
  const gap = expectedEnrollment - study.enrollmentActual;

  if (gap <= 0) return null;

  return {
    nctId: study.nctId,
    target: study.enrollmentTarget,
    actual: study.enrollmentActual,
    gap: Math.round(gap),
    elapsedDays: Math.round(elapsedDays),
  };
}

/**
 * Render the enrollment gap section into #enrollment-gap-container.
 * @param {import('./api.js').Study[]} studies
 */
export function renderEnrollmentGap(studies) {
  const container = document.getElementById('enrollment-gap-container');
  if (!container) return;

  const excluded = studies.filter(
    (s) => s.enrollmentTarget === null || s.startDate === null || s.enrollmentActual === null
  );

  const eligible = studies
    .map((s) => {
      const result = computeEnrollmentGap(s);
      return result && result.gap > 0 ? result : null;
    })
    .filter(Boolean);

  eligible.sort((a, b) => b.gap - a.gap);

  container.innerHTML = '';

  if (eligible.length === 0) {
    const p = document.createElement('p');
    p.className = 'enrollment-on-track';
    p.textContent = '✓ All visible studies are on track with enrollment.';
    container.appendChild(p);
  } else {
    const table = document.createElement('table');
    table.className = 'enrollment-gap-table';

    const thead = document.createElement('thead');
    thead.innerHTML =
      '<tr><th>NCT Number</th><th>Target</th><th>Actual</th><th>Gap</th><th>Elapsed</th></tr>';
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const item of eligible) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.nctId}</td>
        <td>${item.target}</td>
        <td>${item.actual}</td>
        <td class="gap-value">-${item.gap}</td>
        <td>${item.elapsedDays} days</td>
      `;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container.appendChild(table);
  }

  if (excluded.length > 0) {
    const note = document.createElement('p');
    note.className = 'enrollment-excluded-note';
    note.textContent = `${excluded.length} studies excluded (missing enrollment target, start date, or actual enrollment count)`;
    container.appendChild(note);
  }
}
