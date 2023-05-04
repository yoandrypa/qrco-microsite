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
import * as Visit from "../queries/visit";

export const createNew = async (data: any) => {

}

export const create = async (data: any) => {
  try {
    if (data.headers?.["user-agent"] === "Amazon CloudFront") {
      const [browser = "Other"] = browsersList.filter(filterInHeaders(data.headers));
      const [os = "cloudfront-os-other-viewer"] = osList.filter(filterInHeaders(data.headers));
      const [device = "cloudfront-device-other-viewer"] = deviceListHeaders.filter(filterInHeaders(data.headers));

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
      const location = await geoip.lookup(realIp(data.headers));
      if (location) {
        visit.city = location.city || "Unknown";
      }

      return await Visit.prepare(visit);

      // await Visit.create(visit);
    }
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode || 500, e);
  }
};
