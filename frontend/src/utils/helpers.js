export const formatDate = (d) => {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const daysSince = (d) => {
  if (!d) return Infinity;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = today - new Date(d + 'T00:00:00');
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const todayStr = () => new Date().toISOString().split('T')[0];

export const validateActiveStatus = (status, lastCleanedDate) => {
  if (status === 'Active') {
    if (!lastCleanedDate) return 'Cannot set Active: no last cleaned date recorded.';
    if (daysSince(lastCleanedDate) > 30)
      return `Cannot set Active: last cleaned ${daysSince(lastCleanedDate)} days ago (max 30 days).`;
  }
  return null;
};
