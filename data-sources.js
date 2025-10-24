// Data source for fixtures. By default this uses a local sample dataset under /data.
// Swap out the loader in loadFixtures() to use a real API (see README).

let FIXTURES = [];

// Fallback dataset so the app works without a server (file://).
const SAMPLE_FIXTURES = [
  {
    date: '2025-11-08T15:00:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Twickenham Stadium, London',
    teams: { home: 'England', away: 'New Zealand' },
  },
  {
    date: '2025-11-08T17:30:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Aviva Stadium, Dublin',
    teams: { home: 'Ireland', away: 'Australia' },
  },
  {
    date: '2025-11-09T14:00:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Principality Stadium, Cardiff',
    teams: { home: 'Wales', away: 'South Africa' },
  },
  {
    date: '2025-11-15T15:00:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Stade de France, Paris',
    teams: { home: 'France', away: 'Fiji' },
  },
  {
    date: '2025-11-15T17:30:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Murrayfield, Edinburgh',
    teams: { home: 'Scotland', away: 'Argentina' },
  },
  {
    date: '2025-11-22T15:00:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Twickenham Stadium, London',
    teams: { home: 'England', away: 'South Africa' },
  },
  {
    date: '2025-11-22T17:30:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Aviva Stadium, Dublin',
    teams: { home: 'Ireland', away: 'New Zealand' },
  },
  {
    date: '2025-11-29T15:00:00Z',
    competition: 'Autumn Nations Series',
    venue: 'Twickenham Stadium, London',
    teams: { home: 'England', away: 'Australia' },
  },
  {
    date: '2026-02-01T15:00:00Z',
    competition: 'Six Nations',
    venue: 'Stadio Olimpico, Rome',
    teams: { home: 'Italy', away: 'England' },
  },
  {
    date: '2026-02-07T16:45:00Z',
    competition: 'Six Nations',
    venue: 'Murrayfield, Edinburgh',
    teams: { home: 'Scotland', away: 'Wales' },
  },
  {
    date: '2026-02-08T15:00:00Z',
    competition: 'Six Nations',
    venue: 'Stade de France, Paris',
    teams: { home: 'France', away: 'Ireland' },
  },
  {
    date: '2026-07-11T07:35:00Z',
    competition: 'July Internationals',
    venue: 'Eden Park, Auckland',
    teams: { home: 'New Zealand', away: 'England' },
  },
];

export async function initDataSource() {
  FIXTURES = await loadFixtures();
}

export async function findNextFixtureBetween(teamA, teamB) {
  if (!FIXTURES || !Array.isArray(FIXTURES)) return null;
  const now = new Date();
  const candidates = FIXTURES.filter((f) => {
    const d = new Date(f.date);
    const teams = [f.teams.home.toLowerCase(), f.teams.away.toLowerCase()];
    const hasBoth = teams.includes(teamA.toLowerCase()) && teams.includes(teamB.toLowerCase());
    return hasBoth && d >= now;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
  return candidates[0] || null;
}

async function loadFixtures() {
  // If served over HTTP(S), try to fetch JSON. If opened via file://, or fetch fails, use embedded sample.
  try {
    if (typeof location !== 'undefined' && location.protocol.startsWith('http')) {
      const res = await fetch('./data/fixtures_sample.json', { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : SAMPLE_FIXTURES;
      }
    }
  } catch (e) {
    // ignore and fall back
  }
  return SAMPLE_FIXTURES;
}
