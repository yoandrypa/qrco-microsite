//const useragent = require("useragent");
// import {
  //filterInBrowser,
  //filterInOs,
  //filterInHeaders, browsersList, osList, deviceListHeaders
// } from "../helpers/visits/headersFilters/amazon_cloudfront";

//const parser = require("ua-parser-js");
// const geoip = require("fast-geoip");
// import geoip from "fast-geoip";

// @ts-ignore
import { getIPInfo } from 'ip-info-finder';

import URL from "url";
import { CustomError, removeWww } from "../utils";
import { prepare } from "../queries/visit";

export const handlePrepare = async (data: any) => {
  try {
    // if (data.headers?.["user-agent"] === "Amazon CloudFront") {
    //   const [browser = "Other"] = browsersList.filter(filterInHeaders(data.headers));
    //   const [os = "Other"] = osList.filter(filterInHeaders(data.headers));
    //   const [device = "Other"] = deviceListHeaders.filter(filterInHeaders(data.headers));

      const referrer = data.headers.referrer && removeWww(URL.parse(data.headers.referrer).hostname);
      let visit = {
        browser: '',
        country: data.headers["cloudfront-viewer-country"] || "Unknown",
        shortLinkId: data.shortLinkId,
        os: '',
        dv: '',
        referrer: (referrer && referrer.replace(/\./gi, "[dot]")) || "Direct",
        city: '',
        region: ''
      };

      let ip = data.headers["x-forwarded-for"] as string;

      if (ip !== undefined) {
        ip = ip.split(",")?.[0]?.trim();
        // "fast-geoip": "^1.1.88",
        // const location = await geoip.lookup(ip);

        const location = await getIPInfo(ip, {cors: false});

        if (location) {
          let country = location.country || location.Country || "Unknown" as string;

          if (country.endsWith(')') && country.indexOf('(') !== -1) {
            const index = country.lastIndexOf('(');
            if (index !== -1 && index < country.length -1) {
              country = country.slice(index + 1, -1);
            }
          }

          visit.city = location.city || location.City || "Unknown";
          visit.country = country;
          visit.region = location.region || location.RegionName || "Unknown";
        }
      } else {
        visit.city = "Unknown";
        visit.country = "Unknown";
        visit.region = "Unknown";
      }

      return await prepare(visit);

      // await Visit.create(visit);
    // }
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode || 500, e);
  }
};
