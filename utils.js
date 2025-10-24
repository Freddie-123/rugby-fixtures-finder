const ALIASES = new Map([
  ['all blacks', 'New Zealand'],
  ['springboks', 'South Africa'],
  ['wallabies', 'Australia'],
  ['pumas', 'Argentina'],
  ['les bleus', 'France'],
  ['azurri', 'Italy'],
  ['men in green', 'Ireland'],
  ['los teros', 'Uruguay'],
  ['eagles', 'USA'],
]);

export function normalizeCountryName(input) {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();
  if (ALIASES.has(lower)) return ALIASES.get(lower);
  // Title-case common names
  return trimmed
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
