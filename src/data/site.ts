import type { SocialLink, Link, SocialPlatform } from "@/types";
import siteData from "./json/site.json";
import socialsData from "./json/socials.json";
import navData from "./json/nav.json";

export const site = siteData as typeof siteData;

export const socials: SocialLink[] = (socialsData.socials ?? []).map((s) => ({
  ...s,
  platform: s.platform as SocialPlatform,
}));

export const navLinks: Link[] = navData.links;
