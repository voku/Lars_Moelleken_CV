export type ProfileLocale = "de" | "en";
export type ProfileAudience = "recruiter" | "cto" | "engineering_manager" | "developer" | "generic";
export type ProjectTopic = "php" | "security" | "strings" | "arrays" | "utilities" | "all";
export type SkillGrouping = "domain" | "technology" | "seniority";
export type ContactIntent = "job_offer" | "consulting" | "open_source" | "speaking" | "general";
export type ProfileSectionKey =
  | "about"
  | "skills"
  | "open_source"
  | "publications"
  | "organizations"
  | "experience"
  | "problems"
  | "recruiter_profile"
  | "faq_contact"
  | "ai_demo";

export type SkillDomain =
  | "backend"
  | "architecture"
  | "legacy_modernization"
  | "static_analysis"
  | "security"
  | "database"
  | "frontend_web_basics"
  | "devops_linux";

export type SkillLevel = "strong" | "very_strong" | "expert";
export type ContactChannelKey = "email" | "linkedin" | "github" | "website" | "blog" | "packagist" | "twitter" | "mastodon" | "bluesky";

export interface LocalizedText {
  readonly de: string;
  readonly en: string;
}

export interface ProfileProject {
  readonly slug: string;
  readonly name: string;
  readonly url: string;
  readonly primaryLanguage: string;
  readonly topics: readonly ProjectTopic[];
  readonly shortDescription: LocalizedText;
  readonly whyItMatters: LocalizedText;
  readonly tags: readonly string[];
  readonly since?: string;
}

export interface ProfileSkill {
  readonly name: string;
  readonly domain: SkillDomain;
  readonly level: SkillLevel;
}

export interface ProfileSection {
  readonly id: ProfileSectionKey;
  readonly domId: string;
  readonly label: LocalizedText;
}

export interface ContactChannel {
  readonly key: ContactChannelKey;
  readonly label: string;
  readonly href: string;
  readonly visibleLabel: string;
}

export interface ContactGuidance {
  readonly preferredChannels: readonly ContactChannelKey[];
  readonly include: readonly LocalizedText[];
  readonly conversationTopics: readonly LocalizedText[];
}

export interface HiringProfileData {
  readonly person: {
    readonly name: string;
    readonly headline: string;
    readonly location: LocalizedText;
    readonly seniority: LocalizedText;
    readonly currentRole: LocalizedText;
    readonly currentCompany: string;
    readonly summaries: LocalizedText;
    readonly availability: LocalizedText;
  };
  readonly sections: readonly ProfileSection[];
  readonly audienceHighlights: Record<ProfileAudience, readonly LocalizedText[]>;
  readonly specialties: readonly LocalizedText[];
  readonly strongestProjects: readonly string[];
  readonly projects: readonly ProfileProject[];
  readonly skills: readonly ProfileSkill[];
  readonly experienceHighlights: readonly LocalizedText[];
  readonly faq: Record<ProfileLocale, readonly { readonly question: string; readonly answer: string }[]>;
  readonly contact: {
    readonly email: string;
    readonly channels: readonly ContactChannel[];
    readonly guidanceByIntent: Record<ContactIntent, ContactGuidance>;
  };
}

export const PROFILE_DATA: HiringProfileData = {
  person: {
    name: "Lars Moelleken",
    headline: "Senior PHP Developer & Software Architect",
    location: {
      de: "Voerde, NRW, Deutschland",
      en: "Voerde, NRW, Germany",
    },
    seniority: {
      de: "Rund 20 Jahre Erfahrung mit geschäftskritischen PHP- und Backend-Systemen",
      en: "Around 20 years of experience with business-critical PHP and backend systems",
    },
    currentRole: {
      de: "Senior PHP Developer / Software Architect bei REMONDIS IT Services seit August 2023",
      en: "Senior PHP Developer / Software Architect at REMONDIS IT Services since August 2023",
    },
    currentCompany: "REMONDIS IT Services GmbH",
    summaries: {
      de: "Senior PHP Developer und Software-Architekt mit Schwerpunkt auf großen Legacy-Codebases, klaren Typverträgen, statischer Analyse, automatisierten Tests, CI/CD sowie sicheren Integrationen in Unternehmenssysteme.",
      en: "Senior PHP Developer and Software Architect focused on large legacy codebases, explicit type contracts, static analysis, automated tests, CI/CD, and secure enterprise integrations.",
    },
    availability: {
      de: "Kontakt für Senior-PHP-, Software-Architektur-, Legacy-Modernisierungs- und Enterprise-Integrationsrollen.",
      en: "Contact for senior PHP, software architecture, legacy modernization, and enterprise integration roles.",
    },
  },
  sections: [
    { id: "about", domId: "about", label: { de: "Profil & Fokus", en: "Profile & Focus" } },
    { id: "skills", domId: "skills", label: { de: "Fachliche Schwerpunkte", en: "Core Skills" } },
    { id: "open_source", domId: "open_source", label: { de: "Open Source", en: "Open Source" } },
    { id: "experience", domId: "experience", label: { de: "Erfahrung", en: "Experience" } },
    { id: "recruiter_profile", domId: "recruiter_profile", label: { de: "Recruiter-Profil", en: "Recruiter Profile" } },
    { id: "ai_demo", domId: "ai_demo", label: { de: "AI-Demo", en: "AI Demo" } },
  ],
  audienceHighlights: {
    recruiter: [
      { de: "Rund 20 Jahre PHP- und Backend-Erfahrung", en: "Around 20 years of PHP and backend experience" },
      { de: "Seit 08/2023 Senior PHP Developer / Software Architect bei REMONDIS IT Services", en: "Senior PHP Developer / Software Architect at REMONDIS IT Services since 08/2023" },
      { de: "PHPStan auf maximalem Level, PHPUnit/Codeception und CI/CD", en: "PHPStan at maximum level, PHPUnit/Codeception, and CI/CD" },
      { de: "Enterprise-Integrationen mit LDAP/AD, M365/Exchange, PowerShell und AS/400", en: "Enterprise integrations with LDAP/AD, M365/Exchange, PowerShell, and AS/400" },
      { de: "Langjähriger Maintainer etablierter PHP-Bibliotheken", en: "Long-term maintainer of established PHP libraries" },
    ],
    cto: [
      { de: "Schrittweise Legacy-Modernisierung ohne riskanten Big-Bang-Rewrite", en: "Incremental legacy modernization without a risky big-bang rewrite" },
      { de: "Typisierte APIs, klare Verantwortlichkeiten und unveränderliche Datenobjekte", en: "Typed APIs, explicit responsibilities, and immutable data objects" },
      { de: "Sichere Integrationen in geschäftskritische Unternehmenssysteme", en: "Secure integrations with business-critical enterprise systems" },
      { de: "Nachvollziehbare Release-, Rollback- und Evidence-Prozesse", en: "Traceable release, rollback, and evidence processes" },
    ],
    engineering_manager: [
      { de: "Messbare Qualitätsverbesserung mit PHPStan, Tests und CI/CD", en: "Measurable quality improvement with PHPStan, tests, and CI/CD" },
      { de: "Kleine, überprüfbare Änderungen statt riskanter Komplettumbauten", en: "Small, verifiable changes instead of risky full rewrites" },
      { de: "Praxis in Architektur, Code-Review und produktionsnaher Fehleranalyse", en: "Hands-on architecture, code review, and production-oriented debugging" },
      { de: "Kontrollierte Coding-Agent-Workflows mit Scope und Evidence-Gates", en: "Governed coding-agent workflows with scope and evidence gates" },
    ],
    developer: [
      { de: "PHP 8.x, Composer, MariaDB/MySQL und REST APIs", en: "PHP 8.x, Composer, MariaDB/MySQL, and REST APIs" },
      { de: "PHPStan max, präzise PHPDocs, PHPUnit, Codeception und Rector", en: "PHPStan max, precise PHPDocs, PHPUnit, Codeception, and Rector" },
      { de: "Linux-, Apache-, Docker-Compose- und GitLab-CI-Praxis", en: "Hands-on Linux, Apache, Docker Compose, and GitLab CI experience" },
      { de: "Maintainer von portable-utf8, portable-ascii, anti-xss und Arrayy", en: "Maintainer of portable-utf8, portable-ascii, anti-xss, and Arrayy" },
    ],
    generic: [
      { de: "Senior PHP Developer und Software-Architekt", en: "Senior PHP Developer and Software Architect" },
      { de: "Fokus auf Legacy-Modernisierung, Softwarequalität und Enterprise-Integration", en: "Focused on legacy modernization, software quality, and enterprise integration" },
      { de: "Aktuell bei REMONDIS IT Services tätig", en: "Currently working at REMONDIS IT Services" },
      { de: "Langjährige öffentliche Open-Source-Arbeit", en: "Long-running public open-source work" },
    ],
  },
  specialties: [
    { de: "PHP 8.x, MariaDB/MySQL und REST APIs", en: "PHP 8.x, MariaDB/MySQL, and REST APIs" },
    { de: "Legacy-Modernisierung und Software-Architektur", en: "Legacy modernization and software architecture" },
    { de: "PHPStan, präzise PHPDocs und automatisierte Tests", en: "PHPStan, precise PHPDocs, and automated tests" },
    { de: "Linux, CI/CD und produktionsnahe Delivery", en: "Linux, CI/CD, and production-oriented delivery" },
    { de: "LDAP/AD-, M365/Exchange-, PowerShell- und AS/400-Integration", en: "LDAP/AD, M365/Exchange, PowerShell, and AS/400 integration" },
  ],
  strongestProjects: ["portable-utf8", "portable-ascii", "anti-xss", "Arrayy"],
  projects: [
    {
      slug: "portable-utf8",
      name: "portable-utf8",
      url: "https://github.com/voku/portable-utf8",
      primaryLanguage: "PHP",
      topics: ["php", "strings", "utilities"],
      shortDescription: {
        de: "UTF-8-String-Utilities für robuste, portable Textverarbeitung in PHP.",
        en: "UTF-8 string utilities for robust, portable text processing in PHP.",
      },
      whyItMatters: {
        de: "Belegt langjährige Wartung, Abwärtskompatibilität und stabile APIs.",
        en: "Demonstrates long-term maintenance, backward compatibility, and stable APIs.",
      },
      tags: ["utf8", "strings", "php"],
      since: "2014-05",
    },
    {
      slug: "portable-ascii",
      name: "portable-ascii",
      url: "https://github.com/voku/portable-ascii",
      primaryLanguage: "PHP",
      topics: ["php", "strings", "utilities"],
      shortDescription: {
        de: "Portable ASCII-Konvertierung und Normalisierung für String- und Such-Workflows.",
        en: "Portable ASCII conversion and normalization for string and search workflows.",
      },
      whyItMatters: {
        de: "Zeigt robuste Normalisierung und interoperable Textverarbeitung.",
        en: "Shows robust normalization and interoperable text processing.",
      },
      tags: ["ascii", "normalization", "php"],
    },
    {
      slug: "anti-xss",
      name: "anti-xss",
      url: "https://github.com/voku/anti-xss",
      primaryLanguage: "PHP",
      topics: ["php", "security", "utilities"],
      shortDescription: {
        de: "Sicherheitsbibliothek zur Reduktion von XSS-Risiken in PHP-Anwendungen.",
        en: "Security library for reducing XSS risks in PHP applications.",
      },
      whyItMatters: {
        de: "Unterstreicht den Fokus auf sichere Eingabeverarbeitung und Web-Anwendungen.",
        en: "Supports the profile focus on secure input handling and web applications.",
      },
      tags: ["security", "xss", "php"],
      since: "2015-05",
    },
    {
      slug: "Arrayy",
      name: "Arrayy",
      url: "https://github.com/voku/Arrayy",
      primaryLanguage: "PHP",
      topics: ["php", "arrays", "utilities"],
      shortDescription: {
        de: "Bibliothek für lesbarere und sicherere Array-Arbeit in PHP.",
        en: "Library for more readable and safer array handling in PHP.",
      },
      whyItMatters: {
        de: "Zeigt API-Design und Wartbarkeit in modernen und älteren PHP-Codebasen.",
        en: "Demonstrates API design and maintainability across modern and legacy PHP codebases.",
      },
      tags: ["arrays", "collections", "php"],
      since: "2016-05",
    },
  ],
  skills: [
    { name: "PHP 8.x", domain: "backend", level: "expert" },
    { name: "Composer", domain: "backend", level: "expert" },
    { name: "REST APIs", domain: "backend", level: "very_strong" },
    { name: "MariaDB", domain: "database", level: "expert" },
    { name: "MySQL", domain: "database", level: "expert" },
    { name: "SQL", domain: "database", level: "very_strong" },
    { name: "Software Architecture", domain: "architecture", level: "expert" },
    { name: "Typed APIs", domain: "architecture", level: "very_strong" },
    { name: "Immutable Data Objects", domain: "architecture", level: "very_strong" },
    { name: "Legacy Modernization", domain: "legacy_modernization", level: "expert" },
    { name: "PHPStan", domain: "static_analysis", level: "expert" },
    { name: "Precise PHPDocs", domain: "static_analysis", level: "expert" },
    { name: "PHPUnit", domain: "static_analysis", level: "very_strong" },
    { name: "Codeception", domain: "static_analysis", level: "very_strong" },
    { name: "php-cs-fixer", domain: "static_analysis", level: "very_strong" },
    { name: "Rector", domain: "static_analysis", level: "strong" },
    { name: "Secure Web Applications", domain: "security", level: "very_strong" },
    { name: "LDAP / Active Directory", domain: "security", level: "very_strong" },
    { name: "Microsoft 365 / Exchange", domain: "security", level: "strong" },
    { name: "PowerShell", domain: "devops_linux", level: "strong" },
    { name: "AS/400 Integration", domain: "devops_linux", level: "strong" },
    { name: "Linux", domain: "devops_linux", level: "expert" },
    { name: "Apache", domain: "devops_linux", level: "very_strong" },
    { name: "Docker Compose", domain: "devops_linux", level: "strong" },
    { name: "CI/CD", domain: "devops_linux", level: "very_strong" },
    { name: "GitLab CI", domain: "devops_linux", level: "strong" },
    { name: "Jenkins", domain: "devops_linux", level: "strong" },
    { name: "Bash", domain: "devops_linux", level: "very_strong" },
    { name: "HTML / CSS", domain: "frontend_web_basics", level: "strong" },
    { name: "JavaScript / TypeScript", domain: "frontend_web_basics", level: "strong" },
    { name: "jQuery", domain: "frontend_web_basics", level: "strong" },
    { name: "Bootstrap", domain: "frontend_web_basics", level: "strong" },
    { name: "React", domain: "frontend_web_basics", level: "strong" },
  ],
  experienceHighlights: [
    { de: "Seit 08/2023 Senior PHP Developer / Software Architect bei REMONDIS IT Services", en: "Senior PHP Developer / Software Architect at REMONDIS IT Services since 08/2023" },
    { de: "Zentrales IAM- und Berechtigungsportal für AD, M365, Standorte und Inventar", en: "Central IAM and authorization portal for AD, M365, locations, and inventory" },
    { de: "Modernisierung großer, geschäftskritischer Legacy-Codebases", en: "Modernization of large, business-critical legacy codebases" },
    { de: "PHPStan max, automatisierte Tests und nachvollziehbare CI/CD-Prozesse", en: "PHPStan max, automated tests, and traceable CI/CD processes" },
    { de: "Elasticsearch-Suche für mehrere Millionen Artikeldatensätze", en: "Elasticsearch search for several million product records" },
    { de: "Langjährige Open-Source-Wartung mit stabilen APIs", en: "Long-term open-source maintenance with stable APIs" },
  ],
  faq: {
    de: [
      {
        question: "Für welche Rollen sollte Lars Moelleken berücksichtigt werden?",
        answer: "Für Senior-PHP-, Software-Architektur-, Legacy-Modernisierungs-, Quality-Engineering- und Enterprise-Integrationsrollen.",
      },
      {
        question: "Welche Qualitätsschwerpunkte bringt Lars Moelleken mit?",
        answer: "PHPStan auf maximalem Level, präzise PHPDocs, PHPUnit, Codeception, php-cs-fixer, Rector und CI/CD.",
      },
      {
        question: "Welche Enterprise-Systeme integriert Lars Moelleken?",
        answer: "LDAP/Active Directory, Microsoft 365/Exchange, PowerShell-Gateways und AS/400-Systeme.",
      },
    ],
    en: [
      {
        question: "Which roles should Lars Moelleken be considered for?",
        answer: "Senior PHP, software architecture, legacy modernization, quality engineering, and enterprise integration roles.",
      },
      {
        question: "What software-quality strengths does Lars Moelleken bring?",
        answer: "PHPStan at maximum level, precise PHPDocs, PHPUnit, Codeception, php-cs-fixer, Rector, and CI/CD.",
      },
      {
        question: "Which enterprise systems does Lars Moelleken integrate?",
        answer: "LDAP/Active Directory, Microsoft 365/Exchange, PowerShell gateways, and AS/400 systems.",
      },
    ],
  },
  contact: {
    email: "lars@moelleken.org",
    channels: [
      { key: "email", label: "Email", href: "mailto:lars@moelleken.org", visibleLabel: "lars@moelleken.org" },
      { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/larsmoelleken/", visibleLabel: "LinkedIn" },
      { key: "github", label: "GitHub", href: "https://github.com/voku", visibleLabel: "github.com/voku" },
      { key: "website", label: "Website", href: "https://moelleken.org", visibleLabel: "moelleken.org" },
      { key: "blog", label: "Blog", href: "https://suckup.de", visibleLabel: "suckup.de" },
      { key: "packagist", label: "Packagist", href: "https://packagist.org/packages/voku/", visibleLabel: "packagist.org/packages/voku" },
      { key: "twitter", label: "X / Twitter", href: "https://twitter.com/suckup_de", visibleLabel: "@suckup_de" },
      { key: "mastodon", label: "Mastodon", href: "https://phpc.social/@voku", visibleLabel: "@voku@phpc.social" },
      { key: "bluesky", label: "Bluesky", href: "https://bsky.app/profile/voku.bsky.social", visibleLabel: "Bluesky" },
    ],
    guidanceByIntent: {
      job_offer: {
        preferredChannels: ["email", "linkedin"],
        include: [
          { de: "Rollenbezeichnung, Team- oder Produktkontext und gewünschter Startzeitpunkt", en: "Role title, team or product context, and expected start timeline" },
          { de: "Technologie-Stack, Modernisierungsgrad und Verantwortungsschwerpunkt", en: "Technology stack, modernization stage, and responsibility focus" },
        ],
        conversationTopics: [
          { de: "Architektur und Modernisierung", en: "Architecture and modernization" },
          { de: "PHP-Stack, Qualität und Team-Fit", en: "PHP stack, quality, and team fit" },
        ],
      },
      consulting: {
        preferredChannels: ["email", "website", "linkedin"],
        include: [
          { de: "Aktuelle Systemprobleme, technische Schulden und gewünschtes Zielbild", en: "Current system problems, technical debt, and desired target state" },
          { de: "Rahmen für Analyse, Refactoring, Testing oder Security", en: "Scope for analysis, refactoring, testing, or security work" },
        ],
        conversationTopics: [
          { de: "Legacy-Modernisierung und Risikoabbau", en: "Legacy modernization and risk reduction" },
          { de: "Statische Analyse, Tests und inkrementelle Verbesserungen", en: "Static analysis, tests, and incremental improvement" },
        ],
      },
      open_source: {
        preferredChannels: ["github", "packagist", "blog"],
        include: [
          { de: "Repository, Problemstellung und reproduzierbaren Kontext", en: "Repository, problem statement, and reproducible context" },
          { de: "Betroffene Library oder konkrete Maintainer-Frage", en: "Affected library or exact maintainer question" },
        ],
        conversationTopics: [
          { de: "Package-Nutzung, Wartung und Sicherheit", en: "Package usage, maintenance, and security" },
          { de: "PHP-Bibliotheken für Strings, Arrays und Security", en: "PHP libraries for strings, arrays, and security" },
        ],
      },
      speaking: {
        preferredChannels: ["email", "linkedin", "blog"],
        include: [
          { de: "Veranstaltung, Publikum, Format und gewünschte Themenrichtung", en: "Event, audience, format, and desired topic" },
        ],
        conversationTopics: [
          { de: "Open Source, PHP-Workflows und Engineering-Standards", en: "Open source, PHP workflows, and engineering standards" },
        ],
      },
      general: {
        preferredChannels: ["email", "linkedin", "github"],
        include: [
          { de: "Anlass und gewünschten Kontext kurz nennen", en: "Briefly describe the reason and desired context" },
        ],
        conversationTopics: [
          { de: "Senior PHP, Architektur, Open Source", en: "Senior PHP, architecture, and open source" },
        ],
      },
    },
  },
};

export function getContactChannel(key: ContactChannelKey): ContactChannel | undefined {
  return PROFILE_DATA.contact.channels.find((channel) => channel.key === key);
}

export function getSectionById(sectionId: ProfileSectionKey): ProfileSection | undefined {
  return PROFILE_DATA.sections.find((section) => section.id === sectionId);
}
