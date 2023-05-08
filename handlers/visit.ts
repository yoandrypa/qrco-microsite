//const useragent = require("useragent");
// import {
  //filterInBrowser,
  //filterInOs,
  // filterInHeaders, browsersList, osList, deviceListHeaders
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

      if (data.headers["x-forwarded-for"]) {
        const ip = data.headers["x-forwarded-for"].split(",")?.[0]?.trim();

        if (ip !== undefined) {
          // const location = await geoip.lookup(ip);
          const location = await getIPInfo(ip, {cors: false});

          if (location) {
            visit.city = location.city || location.City || "Unknown";
            visit.country = location.country || location.Country || "Unknown";
            visit.region = location.region || location.RegionName || "Unknown";
          }
        } else {
          visit.city = "Unknown";
          visit.country = "Unknown";
          visit.region = "Unknown";
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
