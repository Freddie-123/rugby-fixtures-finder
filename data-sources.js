// --- simple find-next-fixture using sample data ---
// Replace `sampleFixtures` with the name of the array in your project if different.
// Example sample data format we expect:
// sampleFixtures = [
//   { home: "Team A", away: "Team B", date: "2025-11-10T15:00:00Z", venue: "Stadium" },
//   ...
// ];

const sampleFixtures = window.SAMPLE_FIXTURES || [
  // fallback sample fixtures if project doesn't already define them
  { home: "England", away: "France", date: "2025-11-10T15:00:00Z", venue: "Stadium A" },
  { home: "France", away: "England", date: "2026-03-20T18:30:00Z", venue: "Stadium B" },
  { home: "Scotland", away: "Wales", date: "2025-12-05T13:00:00Z", venue: "Stadium C" }
];

// normalize text: lowercases and trims spaces
function norm(s) {
  return (s || "").toLowerCase().trim();
}

// Returns the next fixture object or null if none found
function findNextFixtureBetween(teamAName, teamBName) {
  const a = norm(teamAName);
  const b = norm(teamBName);
  if (!a || !b) return null;

  // filter fixtures where teams match (either order) and date is in the future
  const now = new Date();
  const matches = sampleFixtures
    .filter(f => {
      const fHome = norm(f.home);
      const fAway = norm(f.away);
      // check if fixture is between the two teams
      const isTeamsMatch = (fHome === a && fAway === b) || (fHome === b && fAway === a);
      if (!isTeamsMatch) return false;
      // check date is in future (or today)
      const d = new Date(f.date);
      return d >= now;
    })
    .sort((x, y) => new Date(x.date) - new Date(y.date)); // soonest first

  return matches.length ? matches[0] : null;
}

