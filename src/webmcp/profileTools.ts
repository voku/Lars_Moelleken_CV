import {
  PROFILE_DATA,
  getContactChannel,
  type ContactIntent,
  type ContactChannelKey,
  type ProfileAudience,
  type ProfileLocale,
  type ProfileProject,
  type ProfileSectionKey,
  type ProjectTopic,
  type SkillGrouping,
  type SkillLevel,
  type SkillDomain,
} from "./profileData";

const SKILL_DOMAIN_LABELS: Record<SkillDomain, Record<ProfileLocale, string>> = {
  backend: { de: "Backend", en: "Backend" },
  architecture: { de: "Architektur", en: "Architecture" },
  legacy_modernization: { de: "Legacy-Modernisierung", en: "Legacy Modernization" },
  static_analysis: { de: "Statische Analyse & Qualität", en: "Static Analysis & Quality" },
  security: { de: "Sicherheit & Leadership", en: "Security & Leadership" },
  database: { de: "Datenbanken", en: "Databases" },
  frontend_web_basics: { de: "Frontend/Web-Basics", en: "Frontend/Web Basics" },
  devops_linux: { de: "DevOps & Linux", en: "DevOps & Linux" },
};

const DOMAIN_PRIORITY: SkillDomain[] = [
  "backend",
  "architecture",
  "legacy_modernization",
  "static_analysis",
  "security",
  "database",
  "frontend_web_basics",
  "devops_linux",
];

const LEVEL_ORDER: SkillLevel[] = ["expert", "very_strong", "strong"];

const SKILL_ALIASES: Record<string, string[]> = {
  "PHP 8.x": ["php 8.x", "php 8", "php"],
  "Symfony": ["symfony"],
  "Laravel": ["laravel"],
  "Legacy Modernization": ["legacy modernization", "legacy modernisierung", "legacy", "technical debt", "tech debt"],
  "PHPStan": ["phpstan", "static analysis", "statische analyse"],
  "PHPUnit": ["phpunit", "testing", "unit testing", "tdd"],
  "CI/CD": ["ci/cd", "continuous integration", "continuous deployment", "github actions", "gitlab ci"],
  "Docker": ["docker", "container", "containers"],
  "Architecture": ["architecture", "software architecture", "clean architecture", "design patterns"],
  "Mentoring": ["mentoring", "coaching", "team lead", "leadership", "technical coaching"],
  "Security": ["security", "owasp", "xss", "secure web"],
  "Backend": ["backend", "rest api", "graphql", "api"],
  "Databases": ["mysql", "mariadb", "postgresql", "redis", "database"],
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

export function normalizeLocale(language: unknown): ProfileLocale {
  return language === "de" ? "de" : "en";
}

function localize<T extends { de: string; en: string }>(value: T, locale: ProfileLocale): string {
  return value[locale];
}

function uniqueStrings(values: readonly string[]) {
  return Array.from(new Set(values));
}

function normalizeTerm(input: string): string {
  return input.trim().toLowerCase();
}

function catalogTerms(): Map<string, string> {
  const map = new Map<string, string>();
  for (const skill of PROFILE_DATA.skills) {
    map.set(normalizeTerm(skill.name), skill.name);
  }
  for (const project of PROFILE_DATA.projects) {
    map.set(normalizeTerm(project.name), project.name);
    for (const tag of project.tags) {
      map.set(normalizeTerm(tag), project.name);
    }
  }
  for (const [label, aliases] of Object.entries(SKILL_ALIASES)) {
    for (const alias of aliases) {
      map.set(normalizeTerm(alias), label);
    }
  }
  return map;
}

const TERM_CATALOG = catalogTerms();
const CONTACT_CHANNELS = Object.fromEntries(PROFILE_DATA.contact.channels.map((channel) => [channel.key, channel]));

export function buildProfileSummary(input: {
  audience: ProfileAudience;
  language: ProfileLocale;
  maxItems?: number;
}) {
  const maxItems = clamp(input.maxItems ?? 6, 3, 12);
  const highlights = PROFILE_DATA.audienceHighlights[input.audience]
    .slice(0, maxItems)
    .map((item) => localize(item, input.language));

  return {
    name: PROFILE_DATA.person.name,
    headline: PROFILE_DATA.person.headline,
    location: localize(PROFILE_DATA.person.location, input.language),
    seniority: localize(PROFILE_DATA.person.seniority, input.language),
    currentRole: localize(PROFILE_DATA.person.currentRole, input.language),
    summary: localize(PROFILE_DATA.person.summaries, input.language),
    specialties: PROFILE_DATA.specialties.map((item) => localize(item, input.language)),
    strongestOpenSourceProjects: PROFILE_DATA.projects
      .filter((project) => PROFILE_DATA.strongestProjects.includes(project.slug))
      .map((project) => ({
        name: project.name,
        link: project.url,
        whyItMatters: localize(project.whyItMatters, input.language),
      })),
    highlights,
    contactLinks: PROFILE_DATA.contact.channels.map((channel) => ({
      label: channel.label,
      href: channel.href,
      visibleLabel: channel.visibleLabel,
    })),
  };
}

function projectMatchesTopic(project: ProfileProject, topic: ProjectTopic) {
  return topic === "all" || project.topics.includes(topic);
}

export function buildProjectList(input: { topic: ProjectTopic; limit?: number; language: ProfileLocale }) {
  const limit = clamp(input.limit ?? 8, 1, 20);
  return PROFILE_DATA.projects
    .filter((project) => projectMatchesTopic(project, input.topic))
    .slice(0, limit)
    .map((project) => ({
      name: project.name,
      shortDescription: localize(project.shortDescription, input.language),
      primaryLanguage: project.primaryLanguage,
      whyItMatters: localize(project.whyItMatters, input.language),
      link: project.url,
      tags: project.tags,
      since: project.since ?? null,
    }));
}

export function buildSkillMatrix(input: { groupBy: SkillGrouping; language: ProfileLocale }) {
  if (input.groupBy === "technology") {
    return PROFILE_DATA.skills.map((skill) => ({
      technology: skill.name,
      domain: SKILL_DOMAIN_LABELS[skill.domain][input.language],
      seniority: skill.level,
    }));
  }

  if (input.groupBy === "seniority") {
    return LEVEL_ORDER.map((level) => ({
      seniority: level,
      skills: PROFILE_DATA.skills
        .filter((skill) => skill.level === level)
        .map((skill) => ({
          name: skill.name,
          domain: SKILL_DOMAIN_LABELS[skill.domain][input.language],
        })),
    }));
  }

  return DOMAIN_PRIORITY.map((domain) => ({
    domain: SKILL_DOMAIN_LABELS[domain][input.language],
    skills: PROFILE_DATA.skills
      .filter((skill) => skill.domain === domain)
      .map((skill) => ({ name: skill.name, seniority: skill.level })),
  })).filter((group) => group.skills.length > 0);
}

export function buildContactOptions(input: { intent: ContactIntent; language: ProfileLocale }) {
  const guidance = PROFILE_DATA.contact.guidanceByIntent[input.intent];
  return {
    intent: input.intent,
    preferredChannels: guidance.preferredChannels
      .map((key) => CONTACT_CHANNELS[key])
      .filter(Boolean)
      .map((channel) => ({
        label: channel.label,
        href: channel.href,
        visibleLabel: channel.visibleLabel,
      })),
    includeInOutreach: guidance.include.map((item) => localize(item, input.language)),
    conversationTopics: guidance.conversationTopics.map((item) => localize(item, input.language)),
    allPublicChannels: PROFILE_DATA.contact.channels.map((channel) => ({
      label: channel.label,
      href: channel.href,
      visibleLabel: channel.visibleLabel,
    })),
  };
}

function skillMatchLabel(rawSkill: string): string | null {
  const normalized = normalizeTerm(rawSkill);

  if (TERM_CATALOG.has(normalized)) {
    return TERM_CATALOG.get(normalized) ?? null;
  }

  for (const [term, label] of TERM_CATALOG.entries()) {
    if (normalized.includes(term) || term.includes(normalized)) {
      return label;
    }
  }

  return null;
}

function matchSkills(skills: readonly string[]) {
  const matches = uniqueStrings(skills.map((skill) => skillMatchLabel(skill)).filter((skill): skill is string => Boolean(skill)));
  const missing = skills.filter((skill) => !skillMatchLabel(skill));
  return { matches, missing };
}

function inferRoleBonus(roleTitle: string) {
  const normalized = normalizeTerm(roleTitle);
  const keywords = ["php", "backend", "architect", "architecture", "lead", "legacy", "platform"];
  return keywords.some((keyword) => normalized.includes(keyword)) ? 10 : 0;
}

function determineScoreRange(score: number) {
  if (score >= 80) return { label: "high", range: "80-95", proceed: true };
  if (score >= 60) return { label: "good", range: "60-79", proceed: true };
  if (score >= 40) return { label: "mixed", range: "40-59", proceed: false };
  return { label: "low", range: "15-39", proceed: false };
}

function recommendedTopics(matchedStrengths: readonly string[], language: ProfileLocale) {
  const topics = new Set<string>();

  if (matchedStrengths.some((strength) => /PHP|Symfony|Laravel|REST API|GraphQL/.test(strength))) {
    topics.add(language === "de" ? "Backend-Stack und Delivery in PHP" : "Backend stack and PHP delivery" );
  }
  if (matchedStrengths.some((strength) => /Legacy|Rector|PHPStan|PHPUnit|TDD|Psalm/.test(strength))) {
    topics.add(language === "de" ? "Legacy-Modernisierung und Qualitätshebel" : "Legacy modernization and quality levers");
  }
  if (matchedStrengths.some((strength) => /Docker|CI\/CD|GitHub Actions|GitLab CI|Linux/.test(strength))) {
    topics.add(language === "de" ? "Betrieb, CI/CD und inkrementelle Delivery" : "Operations, CI/CD, and incremental delivery");
  }
  if (matchedStrengths.some((strength) => /Mentoring|Technical Coaching|OOP|Design Patterns|Architecture/.test(strength))) {
    topics.add(language === "de" ? "Architekturentscheidungen und Team-Enabling" : "Architecture decisions and team enablement");
  }

  if (topics.size === 0) {
    topics.add(language === "de" ? "Rollenkontext und Kernprobleme des Teams" : "Role context and the team's core problems");
  }

  return Array.from(topics);
}

export function buildHiringFit(input: {
  roleTitle: string;
  mustHaveSkills?: readonly string[];
  niceToHaveSkills?: readonly string[];
  language: ProfileLocale;
}) {
  const mustHave = input.mustHaveSkills ?? [];
  const niceToHave = input.niceToHaveSkills ?? [];
  const must = matchSkills(mustHave);
  const nice = matchSkills(niceToHave);
  const roleBonus = inferRoleBonus(input.roleTitle);
  const mustScore = mustHave.length === 0 ? 60 : (must.matches.length / mustHave.length) * 70;
  const niceScore = niceToHave.length === 0 ? 10 : (nice.matches.length / niceToHave.length) * 20;
  const score = Math.round(mustScore + niceScore + roleBonus);
  const scoreRange = determineScoreRange(score);
  const matchingStrengths = uniqueStrings([
    ...must.matches,
    ...nice.matches,
    ...(scoreRange.proceed ? [PROFILE_DATA.person.headline, "Legacy Modernization", "PHPStan", "PHPUnit"] : []),
  ]).slice(0, 8);
  const likelyGaps = uniqueStrings([...must.missing, ...nice.missing]).slice(0, 6);

  return {
    roleTitle: input.roleTitle,
    fit: {
      label: scoreRange.label,
      scoreRange: scoreRange.range,
      proceed: scoreRange.proceed,
    },
    matchingStrengths,
    likelyGaps,
    recommendedConversationTopics: recommendedTopics(matchingStrengths, input.language),
    rationale: input.language === "de"
      ? `Bewertung basiert auf öffentlichen CV-Signalen, ${must.matches.length} erfüllten Muss-Kriterien und ${nice.matches.length} erfüllten Nice-to-have-Kriterien.`
      : `Assessment is based on public CV signals, ${must.matches.length} matched must-have criteria, and ${nice.matches.length} matched nice-to-have criteria.`,
  };
}

export function getPublicProfileExport() {
  return {
    person: PROFILE_DATA.person,
    sections: PROFILE_DATA.sections,
    specialties: PROFILE_DATA.specialties,
    strongestProjects: PROFILE_DATA.strongestProjects,
    projects: PROFILE_DATA.projects,
    skills: PROFILE_DATA.skills,
    experienceHighlights: PROFILE_DATA.experienceHighlights,
    faq: PROFILE_DATA.faq,
    contact: {
      email: PROFILE_DATA.contact.email,
      channels: PROFILE_DATA.contact.channels,
    },
  };
}

export function createPublicProfileDataUri() {
  return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(getPublicProfileExport(), null, 2))}`;
}

export function getSectionDomId(section: ProfileSectionKey) {
  return PROFILE_DATA.sections.find((entry) => entry.id === section)?.domId ?? section;
}

export function getContactChannels(keys: readonly ContactChannelKey[]) {
  return keys.map((key) => getContactChannel(key)).filter((channel): channel is NonNullable<ReturnType<typeof getContactChannel>> => Boolean(channel));
}
