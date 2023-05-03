export const browsersList = [
  "IE",
  "Firefox",
  "Chrome",
  "Chromium",
  "Opera",
  "Safari",
  "Edge"
];

export const osList = [
  "cloudfront-is-ios-viewer",
  "cloudfront-is-android-viewer"
];

export const deviceListHeaders = [
  "cloudfront-is-mobile-viewer",
  "cloudfront-is-tablet-viewer",
  "cloudfront-is-smarttv-viewer",
  "cloudfront-is-desktop-viewer"
];

export const filterInHeaders = (headers: any) => (item: string) => {
  return headers[item] === "true";
}

export const realIp = (headers: any) => {
  return headers["x-forwarded-for"].split(", ")[0];
};
