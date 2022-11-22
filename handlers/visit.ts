//const useragent = require("useragent");
const parser = require("ua-parser-js");
const geoip = require("fast-geoip");
import URL from "url";
import { CustomError, removeWww } from "../utils";
import * as Visit from "../queries/visit";

const browsersList = ["IE", "Firefox", "Chrome", "Opera", "Safari", "Edge"];
const osList = ["Windows", "Mac OS", "Linux", "Android", "iOS"];

const filterInBrowser = (agent: { browser: { name: string }; }) => (item: string) =>
  agent.browser?.name?.toLowerCase().includes(item.toLocaleLowerCase());

const filterInOs = (agent: { os: { name: string; }; }) => (item: string) =>
  agent.os?.name?.toLowerCase().includes(item.toLocaleLowerCase());

export const create = async (data: any) => {
  try {
    const agent = parser(data.headers["user-agent"]);
    const [browser = "Other"] = browsersList.filter(filterInBrowser(agent));
    const [os = "Other"] = osList.filter(filterInOs(agent));
    const referrer =
      data.referrer && removeWww(URL.parse(data.referrer).hostname);
    const location = data.realIP ? await geoip.lookup(data.realIP) : undefined;
    const country = location && location.country;
    await Visit.create({
      browser: browser.toLowerCase(),
      country: country || "Unknown",
      shortLinkId: data.shortLinkId,
      os: os.toLowerCase().replace(/\s/gi, ""),
      referrer: (referrer && referrer.replace(/\./gi, "[dot]")) || "Direct",
    });
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode || 500, e);
  }
};
