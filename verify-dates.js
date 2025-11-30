// Verify the dates are correct Mondays
const correctDates = {
  'january': '2026-01-26',
  'february': '2026-02-23',
  'march': '2026-03-30',
  'april': '2026-04-27',
  'may': '2026-05-25',
  'june': '2026-06-29',
  'july': '2026-07-27',
  'august': '2026-08-31',
  'september': '2026-09-28',
  'october': '2026-10-26',
  'november': '2026-11-16',
};

console.log('\nVerifying dates are Mondays:\n');
for (const [month, dateStr] of Object.entries(correctDates)) {
  const date = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const isMonday = dayOfWeek === 'Monday';
  console.log(`${month}: ${formatted} - ${dayOfWeek} ${isMonday ? '✓' : '✗ NOT MONDAY!'}`);
}
