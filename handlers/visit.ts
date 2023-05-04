//const useragent = require("useragent");
import {
  //filterInBrowser,
  //filterInOs,
  filterInHeaders, browsersList, osList, deviceListHeaders, realIp
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

      const referrer = data.referrer && removeWww(URL.parse(data.referrer).hostname);
      let visit = {
        browser: browser.toLowerCase(),
        country: data.headers["cloudfront-viewer-country"] || "Unknown",
        shortLinkId: data.shortLinkId,
        os: os.split("-")[2],
        dv: device.split("-")[2],
        referrer: (referrer && referrer.replace(/\./gi, "[dot]")) || "Direct",
        city: ""
      };

      const ip = realIp(data.headers);

      if (ip) {
        const location = await geoip.lookup(ip);
        if (location) {
          visit.city = location.city || "Unknown";
        }
      } else {
        visit.city = "Unknown";
      }

      return await prepare(visit);

      // await Visit.create(visit);
    // }
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode || 500, e);
  }
};
