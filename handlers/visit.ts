//const useragent = require("useragent");
import {
  //filterInBrowser,
  //filterInOs,
  filterInHeaders, browsersList, osList, deviceListHeaders
} from "../helpers/visits/headersFilters/amazon_cloudfront";

//const parser = require("ua-parser-js");
const geoip = require("fast-geoip");

import URL from "url";
import { CustomError, removeWww } from "../utils";
import { prepare } from "../queries/visit";

export const handlePrepare = async (data: any) => {
  try {
    // if (data.headers?.["user-agent"] === "Amazon CloudFront") {
      const [browser = "Other"] = browsersList.filter(filterInHeaders(data.headers));
      const [os = "Other"] = osList.filter(filterInHeaders(data.headers));
      const [device = "Other"] = deviceListHeaders.filter(filterInHeaders(data.headers));

      const referrer = data.headers.referrer && removeWww(URL.parse(data.headers.referrer).hostname);
      let visit = {
        browser: browser.toLowerCase(),
        country: data.headers["cloudfront-viewer-country"] || "Unknown",
        shortLinkId: data.shortLinkId,
        os: os.split("-")[2],
        dv: device.split("-")[2],
        referrer: (referrer && referrer.replace(/\./gi, "[dot]")) || "Direct",
        city: ""
      };

      if (data.headers["x-forwarded-for"]) {
        const ip = data.headers["x-forwarded-for"].split(",")?.[0]?.trim();

        if (ip !== undefined) {
          const location = await geoip.lookup(ip);

          if (location) {
            visit.city = location.city || "Unknown";
            visit.country = location.country || "Unknown";
          }
        } else {
          visit.city = "Unknown";
          visit.country = "Unknown";
        }
      } else {
        visit.city = "Unknown";
        visit.country = "Unknown";
      }

      return await prepare(visit);

      // await Visit.create(visit);
    // }
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode || 500, e);
  }
};
