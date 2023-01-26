function padTo2Digits(num: number | string): string {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('/');
}

export const ensureDate = (date: number | string) => new Date(typeof date === 'string' ? Number.parseInt(date) : date);

export function humanDate(date: number | string, locale: string = 'en', long?: boolean) {
  const d = ensureDate(date);
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

export function getExtension(mimeType: string): string {
  const types = {
    'audio': 'mp3',
    'pdf': 'pdf',
    'video': 'mpg',
    'image/gif': 'gif',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/tiff': 'tiff',
    'image/vnd.wap.wbmp': 'wbmp',
    'image/x-icon': 'ico',
    'image/x-jng': 'jng',
    'image/x-ms-bmp': 'bmp',
    'image/svg+xml': 'svg',
    'image/webp': 'webp',
    'application/pdf': 'pdf',
    'audio/midi': 'midi',
    'audio/mpeg': 'mp3',
    'audio/ogg': 'ogg',
    'audio/x-realaudio': 'ra',
    'video/3gpp': '3gp',
    'video/mpeg': 'mpg',
    'video/quicktime': 'mov',
    'video/x-flv': 'flv',
    'video/x-mng': 'mng',
    'video/x-ms-asf': 'asf',
    'video/x-ms-wmv': 'wmv',
    'video/x-msvideo': 'avi',
    'video/mp4': 'mp4'
  }
  // @ts-ignore
  return types[mimeType.toLowerCase()] || mimeType;
}

export const GALLERY = ["gallery", "image"];
export const ASSETS = ["pdf", "audio", "video"];
