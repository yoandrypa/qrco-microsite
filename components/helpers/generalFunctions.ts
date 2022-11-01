export function dateConverter(epoch: number | string) {
  return (
    epoch.toString().length === 13 ? new Date(Number.parseInt(`${epoch}`)) : new Date(Number.parseInt(`${epoch}`) * 1000)
  );
}

export function humanDate(date: number | string, locale: string = 'en', long?: boolean) {
  const d = dateConverter(date);
  const compare = new Date();
  if (d.toDateString() === compare.toDateString()) {
    return "Today";
  }
  compare.setDate(compare.getDate() - 1);
  if (d.toDateString() === compare.toDateString()) {
    return "Yesterday";
  }
  compare.setDate(compare.getDate() + 1);

  const returning = d.toLocaleDateString(locale, {
    weekday: !long ? undefined : 'long',
    month: !long ? 'short' : 'long',
    day: 'numeric'
  });

  return `${returning}${compare.getFullYear() !== d.getFullYear() || long ? `, ${d.getFullYear()}` : ''}`;
}
