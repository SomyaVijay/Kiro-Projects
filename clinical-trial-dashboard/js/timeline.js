/**
 * timeline.js — SVG horizontal bar chart timeline.
 *
 * Renders a timeline of clinical trials into #timeline-container.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

const LAYOUT = {
  width: 900,
  leftMargin: 110,
  rightMargin: 20,
  topMargin: 30,
  rowHeight: 28,
  barHeight: 16,
  bottomMargin: 40,
};

const SCORECARD_COLORS = {
  GREEN: '#4caf50',
  YELLOW: '#ffc107',
  RED: '#f44336',
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const PAD_DAYS = 30;

/**
 * Render the SVG timeline into #timeline-container.
 * @param {import('./api.js').Study[]} studies
 */
export function renderTimeline(studies) {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  // Clear previous content
  container.innerHTML = '';

  // 1. Separate valid vs omitted
  const valid = studies.filter(s => s.startDate != null && s.completionDate != null);
  const omitted = studies.filter(s => s.startDate == null || s.completionDate == null);

  if (valid.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'empty-state';
    msg.textContent = 'No studies with complete date information to display.';
    container.appendChild(msg);
    return;
  }

  // 2. Take the 50 with the nearest (earliest) completionDate
  const sorted50 = valid
    .slice()
    .sort((a, b) => new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime())
    .slice(0, 50);

  // 3. Sort by startDate ascending for display
  const displayStudies = sorted50
    .slice()
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  // 4. Compute axis bounds
  const startTimes = displayStudies.map(s => new Date(s.startDate).getTime());
  const endTimes = displayStudies.map(s => new Date(s.completionDate).getTime());
  const minDate = Math.min(...startTimes) - PAD_DAYS * MS_PER_DAY;
  const maxDate = Math.max(...endTimes) + PAD_DAYS * MS_PER_DAY;
  const totalRange = maxDate - minDate;

  // 5. SVG dimensions
  const numStudies = displayStudies.length;
  const svgWidth = container.clientWidth > 0 ? container.clientWidth : LAYOUT.width;
  const chartWidth = svgWidth - LAYOUT.leftMargin - LAYOUT.rightMargin;
  const svgHeight = LAYOUT.topMargin + numStudies * LAYOUT.rowHeight + LAYOUT.bottomMargin;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', String(svgWidth));
  svg.setAttribute('height', String(svgHeight));
  svg.setAttribute('aria-label', 'Clinical trial timeline');

  // 6. Render bars and labels
  displayStudies.forEach((study, index) => {
    const startMs = new Date(study.startDate).getTime();
    const endMs = new Date(study.completionDate).getTime();

    const x = LAYOUT.leftMargin + ((startMs - minDate) / totalRange) * chartWidth;
    const barWidth = Math.max(1, ((endMs - startMs) / totalRange) * chartWidth);
    const y = LAYOUT.topMargin + index * LAYOUT.rowHeight + (LAYOUT.rowHeight - LAYOUT.barHeight) / 2;

    // Bar
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'timeline-bar');
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', String(y));
    rect.setAttribute('width', String(barWidth));
    rect.setAttribute('height', String(LAYOUT.barHeight));
    rect.setAttribute('rx', '3');
    rect.setAttribute('fill', SCORECARD_COLORS[study.scorecard] ?? SCORECARD_COLORS.YELLOW);
    svg.appendChild(rect);

    // Label
    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('class', 'timeline-label');
    text.setAttribute('x', String(LAYOUT.leftMargin - 5));
    text.setAttribute('y', String(y + LAYOUT.barHeight / 2 + 4));
    text.setAttribute('text-anchor', 'end');
    text.textContent = study.nctId;
    svg.appendChild(text);
  });

  // 7. Today marker
  const today = Date.now();
  if (today >= minDate && today <= maxDate) {
    const todayX = LAYOUT.leftMargin + ((today - minDate) / totalRange) * chartWidth;
    const lineTop = LAYOUT.topMargin;
    const lineBottom = LAYOUT.topMargin + numStudies * LAYOUT.rowHeight;

    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('class', 'timeline-today-marker');
    line.setAttribute('x1', String(todayX));
    line.setAttribute('y1', String(lineTop));
    line.setAttribute('x2', String(todayX));
    line.setAttribute('y2', String(lineBottom));
    svg.appendChild(line);

    const todayLabel = document.createElementNS(SVG_NS, 'text');
    todayLabel.setAttribute('class', 'timeline-today-label');
    todayLabel.setAttribute('x', String(todayX));
    todayLabel.setAttribute('y', String(lineTop - 4));
    todayLabel.setAttribute('text-anchor', 'middle');
    todayLabel.textContent = 'TODAY';
    svg.appendChild(todayLabel);
  }

  // 8. Axis
  const axisY = LAYOUT.topMargin + numStudies * LAYOUT.rowHeight;

  // Baseline
  const baseline = document.createElementNS(SVG_NS, 'line');
  baseline.setAttribute('class', 'timeline-axis-line');
  baseline.setAttribute('x1', String(LAYOUT.leftMargin));
  baseline.setAttribute('y1', String(axisY));
  baseline.setAttribute('x2', String(LAYOUT.leftMargin + chartWidth));
  baseline.setAttribute('y2', String(axisY));
  svg.appendChild(baseline);

  // Tick marks: 5–7 evenly spaced
  const numTicks = 6;
  for (let i = 0; i <= numTicks; i++) {
    const tickMs = minDate + (totalRange * i) / numTicks;
    const tickX = LAYOUT.leftMargin + ((tickMs - minDate) / totalRange) * chartWidth;
    const year = new Date(tickMs).getFullYear();

    const tick = document.createElementNS(SVG_NS, 'line');
    tick.setAttribute('class', 'timeline-axis-line');
    tick.setAttribute('x1', String(tickX));
    tick.setAttribute('y1', String(axisY));
    tick.setAttribute('x2', String(tickX));
    tick.setAttribute('y2', String(axisY + 6));
    svg.appendChild(tick);

    const tickLabel = document.createElementNS(SVG_NS, 'text');
    tickLabel.setAttribute('class', 'timeline-label');
    tickLabel.setAttribute('x', String(tickX));
    tickLabel.setAttribute('y', String(axisY + 20));
    tickLabel.setAttribute('text-anchor', 'middle');
    tickLabel.textContent = String(year);
    svg.appendChild(tickLabel);
  }

  container.appendChild(svg);

  // 9. Omission note
  if (omitted.length > 0) {
    const note = document.createElement('p');
    note.className = 'timeline-omission-note';
    note.textContent = `${omitted.length} ${omitted.length === 1 ? 'study' : 'studies'} omitted (missing start or completion date)`;
    container.appendChild(note);
  }
}
