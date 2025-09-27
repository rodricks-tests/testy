export default function timeAgo(timestamp: string | number | Date): string {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, 'second'],
    [3600, 'minute'],
    [86400, 'hour'],
    [604800, 'day'],
    [2592000, 'week'],
    [31536000, 'month'],
    [Infinity, 'year'],
  ];

  for (let i = 0; i < intervals.length; i++) {
    const [limit, unit] = intervals[i];
    if (seconds < limit) {
      const value = Math.floor(seconds / (i === 0 ? 1 : intervals[i - 1][0]));
      return value <= 1 ? `1 ${unit} ago` : `${value} ${unit}s ago`;
    }
  }

  return 'just now';
}