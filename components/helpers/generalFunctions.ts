export function dateConverter(epoch: number | string) {
  return (
    epoch.toString().length === 13 ? new Date(Number.parseInt(`${epoch}`)) : new Date(Number.parseInt(`${epoch}`) * 1000)
  );
}

export function humanDate(date: number, locale: string = 'en') {
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
  const returning = d.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
  return `${returning}${compare.getFullYear !== d.getFullYear ? `, ${d.getFullYear}` : ''}`;
}

export const isObject = (item: any) => item !== null && typeof item === 'object';

export function areEquals(object1: any, object2: any) {
  if ((!Boolean(object1) && Boolean(object2)) || (Boolean(object1) && !Boolean(object2))) {
    return false;
  }
  if (!Boolean(object1) && !Boolean(object2)) {
    return true;
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !areEquals(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}
