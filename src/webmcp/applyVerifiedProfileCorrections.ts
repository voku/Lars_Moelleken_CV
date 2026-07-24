import { PROFILE_DATA } from "./profileData";

const X_PROFILE_URL = "https://x.com/suckup_de";

if (PROFILE_DATA.experienceHighlights.length === 0) {
  throw new Error("Cannot apply verified profile corrections: experience highlights are missing.");
}

if (!PROFILE_DATA.contact.channels.some((channel) => channel.key === "twitter")) {
  throw new Error("Cannot apply verified profile corrections: X/Twitter contact channel is missing.");
}

PROFILE_DATA.person.headline = "Senior PHP Developer & Software Architect";
PROFILE_DATA.person.currentRole = {
  de: "Senior PHP Developer / Software Architect bei REMONDIS IT Services seit August 2023",
  en: "Senior PHP Developer / Software Architect at REMONDIS IT Services since August 2023",
};
PROFILE_DATA.person.currentCompany = "REMONDIS IT Services GmbH";

PROFILE_DATA.experienceHighlights = PROFILE_DATA.experienceHighlights.map((highlight, index) =>
  index === 0
    ? {
        de: "Seit 08/2023 Senior PHP Developer / Software Architect bei REMONDIS IT Services",
        en: "Senior PHP Developer / Software Architect at REMONDIS IT Services since 08/2023",
      }
    : highlight,
);

PROFILE_DATA.contact.channels = PROFILE_DATA.contact.channels.map((channel) =>
  channel.key === "twitter"
    ? {
        ...channel,
        label: "X",
        href: X_PROFILE_URL,
        visibleLabel: "@suckup_de",
      }
    : channel,
);
