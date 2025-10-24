import { initDataSource, findNextFixtureBetween } from './data-source.js';
import { normalizeCountryName, formatDateTime } from './utils.js';

const form = document.getElementById('query-form');
const resultEl = document.getElementById('result');

async function main() {
  await initDataSource();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const teamAInput = document.getElementById('teamA');
    const teamBInput = document.getElementById('teamB');

    const rawA = teamAInput.value.trim();
    const rawB = teamBInput.value.trim();

    if (!rawA || !rawB) return;
    if (rawA.toLowerCase() === rawB.toLowerCase()) {
      showError('Please enter two different teams.');
      return;
    }

    const teamA = normalizeCountryName(rawA);
    const teamB = normalizeCountryName(rawB);

    showLoading(`Searching for next match between ${teamA} and ${teamB}...`);

    try {
      const fixture = await findNextFixtureBetween(teamA, teamB);
      if (!fixture) {
        showEmpty(`No upcoming fixture found between ${teamA} and ${teamB} in the sample data.`);
        return;
      }

      const when = formatDateTime(fixture.date);
      resultEl.classList.remove('hidden');
      resultEl.innerHTML = `
        <div class="time">${when}</div>
        <div>
          ${fixture.teams.home} vs ${fixture.teams.away}
        </div>
        <div class="meta">
          ${fixture.competition || 'International Test'}
          ${fixture.venue ? ' • ' + fixture.venue : ''}
        </div>
      `;
    } catch (err) {
      console.error(err);
      showError('There was an error looking up fixtures.');
    }
  });
}

function showLoading(msg) {
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<span class="muted">${msg}</span>`;
}

function showEmpty(msg) {
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<span class="muted">${msg}</span>`;
}

function showError(msg) {
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<span class="error">${msg}</span>`;
}

main();
