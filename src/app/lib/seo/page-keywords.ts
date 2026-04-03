import { SITE } from "./site-config";

const base = [
  "NASQO Properties",
  "Ghana real estate",
  "property Ghana",
  "Kasoa property",
  "buy property Ghana",
] as const;

export const homeKeywords = [
  ...base,
  "residential property",
  "commercial property",
  "real estate services",
];

export const aboutKeywords = [...base, "about NASQO", "trusted realtor Ghana", "property company"];

export const contactKeywords = [...base, "contact real estate agent", "property inquiry Ghana"];

export const landsKeywords = [...base, "land for sale Ghana", "plots Ghana"];

export function propertyKeywords(slugTitle: string): string[] {
  return [...base, slugTitle, "property listing", "real estate listing"];
}

export function serviceKeywords(slugTitle: string): string[] {
  return [...base, slugTitle, "real estate services", SITE.name];
}
