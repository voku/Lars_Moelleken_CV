import {
  PROFILE_DATA,
  getContactChannel,
  type ContactChannel,
  type ContactChannelKey,
  type ContactIntent,
  type LocalizedText,
  type ProfileAudience,
  type ProfileLocale,
  type ProfileProject,
  type ProfileSectionKey,
  type ProjectTopic,
  type SkillDomain,
  type SkillGrouping,
  type SkillLevel,
} from "./profileData";

const SKILL_DOMAIN_LABELS: Record<SkillDomain, Record<ProfileLocale, string>> = {
  backend: { de: "Backend", en: "Backend" },
  architecture: { de: "Architektur", en: "Architecture" },
  legacy_modernization: { de: "Legacy-Modernisierung", en: "Legacy Modernization" },
  static_analysis: { de: "Statische Analyse & Qualität", en: "Static Analysis & Quality" },
  security: { de: "Sicherheit & Enterprise-Integration", en: "Security & Enterprise Integration" },
  database: { de: "Datenbanken", en: "Databases" },
  frontend_web_basics: { de: "Frontend/Web-Basics", en: "Frontend/Web Basics" },
  devops_linux: { de: "DevOps & Linux", en: "DevOps & Linux" },
};

const DOMAIN_PRIORITY: readonly SkillDomain[] = [
  "backend",
  "architecture",
  "legacy_modernization",
  "static_analysis",
  "security",
  "database",
  "devops_linux",
  "frontend_web_basics",
];

const LEVEL_ORDER: readonly SkillLevel[] = ["expert", "very_strong", "strong"];

const SKILL_ALIASES: Readonly<Record<string, readonly string[]>> = {
  "PHP 8.x": ["php 8.x", "php 8", "php"],
  Composer: ["composer", "dependency management"],
  "REST APIs": ["rest api", "rest apis", "restful api", "backend api"],
  MariaDB: ["mariadb"],
  MySQL: ["mysql"],
  SQL: ["sql", "database queries"],
  "Software Architecture": ["software architecture", "php architect", "architecture"],
  "Typed APIs": ["typed api", "typed apis", "type contracts"],
  "Immutable Data Objects": ["immutable data", "immutable objects", "readonly objects"],
  "Legacy Modernization": ["legacy modernization", "legacy modernisierung", "legacy", "technical debt", "tech debt"],
  PHPStan: ["phpstan", "static analysis", "statische analyse"],
  "Precise PHPDocs": ["phpdoc", "phpdocs", "precise phpdocs", "array shapes", "generics"],
  PHPUnit: ["phpunit", "unit testing"],
  Codeception: ["codeception", "acceptance testing"],
  "php-cs-fixer": ["php-cs-fixer", "code style"],
  Rector: ["rector", "automated refactoring"],
  "Secure Web Applications": ["secure web", "web security", "owasp", "xss", "csrf", "sqli"],
  "LDAP / Active Directory": ["ldap", "active directory", "ldap/ad"],
  "Microsoft 365 / Exchange": ["microsoft 365", "m365", "exchange"],
  PowerShell: ["powershell", "powershell gateway"],
  "AS/400 Integration": ["as/400", "as400", "ibm i"],
  Linux: ["linux", "system administration", "sysadmin"],
  Apache: ["apache", "apache httpd"],
  "Docker Compose": ["docker compose", "docker"],
  "CI/CD": ["ci/cd", "continuous integration", "continuous deployment", "gitlab ci", "jenkins"],
  Bash: ["bash", "shell scripting"],
  "JavaScript / TypeScript": ["javascript", "typescript"],
  React: ["react", "reactjs"],
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value));
}

export function normalizeLocale(language: unknown): ProfileLocale {
  return language === "de" ? "de" : "en";
}

function localize(value: LocalizedText, locale: ProfileLocale): string {
  return value[locale];
}

function uniqueStrings(values: readonly string[]): string[] {
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
const CONTACT_CHANNELS: ReadonlyMap<ContactChannelKey, ContactChannel> = new Map(
  PROFILE_DATA.contact.channels.map((channel) => [channel.key, channel]),
);

export function buildProfileSummary(input: {
  readonly audience: ProfileAudience;
  readonly language: ProfileLocale;
  readonly maxItems?: number;
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

function projectMatchesTopic(project: ProfileProject, topic: ProjectTopic): boolean {
  return topic === "all" || project.topics.includes(topic);
}

export function buildProjectList(input: {
  readonly topic: ProjectTopic;
  readonly limit?: number;
  readonly language: ProfileLocale;
}) {
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

export function buildSkillMatrix(input: {
  readonly groupBy: SkillGrouping;
  readonly language: ProfileLocale;
}) {
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

export function buildContactOptions(input: {
  readonly intent: ContactIntent;
  readonly language: ProfileLocale;
}) {
  const guidance = PROFILE_DATA.contact.guidanceByIntent[input.intent];

  return {
    intent: input.intent,
    preferredChannels: guidance.preferredChannels
      .map((key) => CONTACT_CHANNELS.get(key))
      .filter((channel): channel is ContactChannel => channel !== undefined)
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
  const exactMatch = TERM_CATALOG.get(normalized);

  if (exactMatch !== undefined) {
    return exactMatch;
  }

  for (const [term, label] of TERM_CATALOG.entries()) {
    const allowPartialMatch = term.length >= 4 || term === "php";
    if (allowPartialMatch && (normalized.includes(term) || term.includes(normalized))) {
      return label;
    }
  }

  return null;
}

function matchSkills(skills: readonly string[]) {
  const resolved = skills.map((skill) => ({ raw: skill, match: skillMatchLabel(skill) }));

  return {
    matches: uniqueStrings(resolved.flatMap((entry) => (entry.match === null ? [] : [entry.match]))),
    missing: resolved.filter((entry) => entry.match === null).map((entry) => entry.raw),
  };
}

function inferRoleBonus(roleTitle: string): number {
  const normalized = normalizeTerm(roleTitle);
  const keywords = ["php", "backend", "architect", "architecture", "legacy", "platform", "integration"];

  return keywords.some((keyword) => normalized.includes(keyword)) ? 10 : 0;
}

function determineScoreRange(score: number) {
  if (score >= 80) return { label: "high", range: "80-95", proceed: true } as const;
  if (score >= 60) return { label: "good", range: "60-79", proceed: true } as const;
  if (score >= 40) return { label: "mixed", range: "40-59", proceed: false } as const;

  return { label: "low", range: "15-39", proceed: false } as const;
}

function recommendedTopics(matchedStrengths: readonly string[], language: ProfileLocale): string[] {
  const topics = new Set<string>();

  if (matchedStrengths.some((strength) => /PHP|Composer|REST API/.test(strength))) {
    topics.add(language === "de" ? "Backend-Stack und Delivery in PHP" : "Backend stack and PHP delivery");
  }
  if (matchedStrengths.some((strength) => /Legacy|Rector|PHPStan|PHPUnit|Codeception|PHPDocs/.test(strength))) {
    topics.add(language === "de" ? "Legacy-Modernisierung und Qualitätshebel" : "Legacy modernization and quality levers");
  }
  if (matchedStrengths.some((strength) => /Docker|CI\/CD|GitLab CI|Jenkins|Linux|Apache/.test(strength))) {
    topics.add(language === "de" ? "Betrieb, CI/CD und inkrementelle Delivery" : "Operations, CI/CD, and incremental delivery");
  }
  if (matchedStrengths.some((strength) => /LDAP|Active Directory|Microsoft 365|Exchange|PowerShell|AS\/400/.test(strength))) {
    topics.add(language === "de" ? "Enterprise-Integration und sichere Automatisierung" : "Enterprise integration and secure automation");
  }
  if (matchedStrengths.some((strength) => /Architecture|Typed APIs|Immutable/.test(strength))) {
    topics.add(language === "de" ? "Architekturentscheidungen und Wartbarkeit" : "Architecture decisions and maintainability");
  }

  if (topics.size === 0) {
    topics.add(language === "de" ? "Rollenkontext und Kernprobleme des Teams" : "Role context and the team's core problems");
  }

  return Array.from(topics);
}

export function buildHiringFit(input: {
  readonly roleTitle: string;
  readonly mustHaveSkills?: readonly string[];
  readonly niceToHaveSkills?: readonly string[];
  readonly language: ProfileLocale;
}) {
  const mustHave = input.mustHaveSkills ?? [];
  const niceToHave = input.niceToHaveSkills ?? [];
  const must = matchSkills(mustHave);
  const nice = matchSkills(niceToHave);
  const mustScore = mustHave.length === 0 ? 60 : (must.matches.length / mustHave.length) * 70;
  const niceScore = niceToHave.length === 0 ? 10 : (nice.matches.length / niceToHave.length) * 20;
  const score = clamp(Math.round(mustScore + niceScore + inferRoleBonus(input.roleTitle)), 15, 95);
  const scoreRange = determineScoreRange(score);
  const matchingStrengths = uniqueStrings([
    ...must.matches,
    ...nice.matches,
    ...(scoreRange.proceed
      ? [PROFILE_DATA.person.headline, "Legacy Modernization", "PHPStan", "Secure Web Applications"]
      : []),
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
    rationale:
      input.language === "de"
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

export function createPublicProfileDataUri(): string {
  return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(getPublicProfileExport(), null, 2))}`;
}

export function getSectionDomId(section: ProfileSectionKey): string {
  return PROFILE_DATA.sections.find((entry) => entry.id === section)?.domId ?? section;
}

export function getContactChannels(keys: readonly ContactChannelKey[]): ContactChannel[] {
  return keys
    .map((key) => getContactChannel(key))
    .filter((channel): channel is ContactChannel => channel !== undefined);
}
