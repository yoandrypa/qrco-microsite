import getConfig from "next/config";

export enum API {
  BAN_LINK = "/api/url/admin/ban",
  STATS = "/api/url/stats"
}

export enum APIv2 {
  Users = "/api/users",
  Domains = "/api/domains",
  Links = "/api/links"
}

export const LANGUAGES = ["en", "es"];
export const THEMES_VARIANTS = { light: "light", dark: "dark" };
export const HEADER_HEIGHT = 60;
export const PRIMARY_LIGHT_COLOR = "#3f51b5";
export const PRIMARY_DARK_COLOR = "#272727";
export const MAIN_CONFIG = {
  locale: LANGUAGES[0],
  theme: THEMES_VARIANTS.light
};
