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
export type ContactChannelKey = "email" | "linkedin" | "github" | "website" | "blog" | "packagist";

export interface LocalizedText {
  de: string;
  en: string;
}

export interface ProfileProject {
  slug: string;
  name: string;
  url: string;
  primaryLanguage: string;
  topics: ProjectTopic[];
  shortDescription: LocalizedText;
  whyItMatters: LocalizedText;
  tags: string[];
  since?: string;
}

export interface ProfileSkill {
  name: string;
  domain: SkillDomain;
  level: SkillLevel;
}

export interface ProfileSection {
  id: ProfileSectionKey;
  domId: string;
  label: LocalizedText;
}

export interface ContactChannel {
  key: ContactChannelKey;
  label: string;
  href: string;
  visibleLabel: string;
}

export interface ContactGuidance {
  preferredChannels: ContactChannelKey[];
  include: LocalizedText[];
  conversationTopics: LocalizedText[];
}

export interface HiringProfileData {
  person: {
    name: string;
    headline: string;
    location: LocalizedText;
    seniority: LocalizedText;
    currentRole: LocalizedText;
    currentCompany: string;
    summaries: LocalizedText;
    availability: LocalizedText;
  };
  sections: readonly ProfileSection[];
  audienceHighlights: Record<ProfileAudience, readonly LocalizedText[]>;
  specialties: readonly LocalizedText[];
  strongestProjects: readonly string[];
  projects: readonly ProfileProject[];
  skills: readonly ProfileSkill[];
  experienceHighlights: readonly LocalizedText[];
  faq: Record<ProfileLocale, readonly { question: string; answer: string }[]>;
  contact: {
    email: string;
    channels: readonly ContactChannel[];
    guidanceByIntent: Record<ContactIntent, ContactGuidance>;
  };
}

export const PROFILE_DATA: HiringProfileData = {
  person: {
    name: "Lars Moelleken",
    headline: "Senior PHP Developer",
    location: {
      de: "Voerde, NRW, Deutschland",
      en: "Voerde, NRW, Germany",
    },
    seniority: {
      de: "20+ Jahre Erfahrung in geschäftskritischen PHP- und Backend-Systemen",
      en: "20+ years of experience in business-critical PHP and backend systems",
    },
    currentRole: {
      de: "Senior PHP Developer bei REMONDIS IT Services",
      en: "Senior PHP Developer at REMONDIS IT Services",
    },
    currentCompany: "REMONDIS IT Services",
    summaries: {
      de: "Senior PHP Developer und PHP Architect aus Deutschland mit Fokus auf Legacy-Modernisierung, statische Analyse, wartbare Systeme, Softwarequalität und langfristig gepflegte Open-Source-Arbeit.",
      en: "Senior PHP Developer and PHP Architect from Germany focused on legacy modernization, static analysis, maintainable systems, software quality, and long-term open-source maintenance.",
    },
    availability: {
      de: "Verfügbar für Senior-PHP-, Architektur-, Legacy-Modernisierungs- und Quality-Themen.",
      en: "Available for senior PHP, architecture, legacy modernization, and software quality topics.",
    },
  },
  sections: [
    { id: "about", domId: "about", label: { de: "Profil & Fokus", en: "Profile & Focus" } },
    { id: "skills", domId: "skills", label: { de: "Fachliche Schwerpunkte", en: "Core Skills" } },
    { id: "open_source", domId: "open_source", label: { de: "Open Source", en: "Open Source" } },
    { id: "publications", domId: "publications", label: { de: "Veröffentlichungen", en: "Publications" } },
    { id: "organizations", domId: "organizations", label: { de: "Organisationen", en: "Organizations" } },
    { id: "experience", domId: "experience", label: { de: "Erfahrung", en: "Experience" } },
    { id: "problems", domId: "problems", label: { de: "Typische Probleme", en: "Typical Problems" } },
    { id: "recruiter_profile", domId: "recruiter_profile", label: { de: "Recruiter-Profil", en: "Recruiter Profile" } },
    { id: "faq_contact", domId: "faq_contact", label: { de: "FAQ & Kontakt", en: "FAQ & Contact" } },
    { id: "ai_demo", domId: "ai_demo", label: { de: "AI-Demo", en: "AI Demo" } },
  ],
  audienceHighlights: {
    recruiter: [
      { de: "20+ Jahre PHP- und Backend-Erfahrung", en: "20+ years of PHP and backend experience" },
      { de: "Aktuell Senior PHP Developer bei REMONDIS IT Services", en: "Currently Senior PHP Developer at REMONDIS IT Services" },
      { de: "Geeignet für Senior-PHP-, Lead- und Architektur-Rollen", en: "Suitable for senior PHP, lead, and architecture roles" },
      { de: "Maintainer mehrerer PHP Open-Source-Libraries", en: "Maintainer of several PHP open-source libraries" },
      { de: "Standort in Deutschland mit öffentlichen Kontaktwegen", en: "Based in Germany with public contact paths" },
    ],
    cto: [
      { de: "Fokus auf Legacy-Modernisierung ohne Big-Bang-Rewrite", en: "Focused on legacy modernization without risky big-bang rewrites" },
      { de: "Architektur, Wartbarkeit und inkrementelle Qualitätsverbesserung", en: "Works on architecture, maintainability, and incremental quality improvement" },
      { de: "Erfahrung mit skalierbaren Backend-Systemen und CI/CD", en: "Experience with scalable backend systems and CI/CD" },
      { de: "Open Source mit Performance-, Sicherheits- und Stabilitätsfokus", en: "Open source work centered on performance, security, and stability" },
      { de: "Mentoring und technische Führung in bestehenden Teams", en: "Provides mentoring and technical leadership in existing teams" },
    ],
    engineering_manager: [
      { de: "Führt Teams über Refactoring, Testing und statische Analyse zu verlässlicheren Standards", en: "Helps teams improve reliability through refactoring, testing, and static analysis" },
      { de: "Praxisnah bei Code Reviews, Mentoring und Architekturentscheidungen", en: "Hands-on with code reviews, mentoring, and architecture decisions" },
      { de: "Stabilisiert gewachsene PHP-Landschaften schrittweise", en: "Stabilizes grown PHP landscapes incrementally" },
      { de: "Setzt Qualität mit PHPUnit, PHPStan, Psalm und CI/CD messbar um", en: "Makes quality measurable with PHPUnit, PHPStan, Psalm, and CI/CD" },
      { de: "Geeignet für Teams mit Modernisierungs- und Wartbarkeitsthemen", en: "Fits teams dealing with modernization and maintainability challenges" },
    ],
    developer: [
      { de: "Tief im PHP-Ökosystem mit Symfony, Laravel, Composer und Git", en: "Deep in the PHP ecosystem with Symfony, Laravel, Composer, and Git" },
      { de: "Starke Praxis in PHPUnit, TDD, PHPStan, Psalm und Rector", en: "Strong hands-on experience with PHPUnit, TDD, PHPStan, Psalm, and Rector" },
      { de: "Kenntnisse in Docker, Kubernetes, Redis, MySQL und API-Design", en: "Experienced with Docker, Kubernetes, Redis, MySQL, and API design" },
      { de: "Maintainer von portable-utf8, portable-ascii, Arrayy und anti-xss", en: "Maintainer of portable-utf8, portable-ascii, Arrayy, and anti-xss" },
      { de: "Fokus auf wartbaren, sicheren und messbar besseren Code", en: "Focused on maintainable, secure, and measurably better code" },
    ],
    generic: [
      { de: "Senior PHP Developer und PHP Architect mit 20+ Jahren Erfahrung", en: "Senior PHP Developer and PHP Architect with 20+ years of experience" },
      { de: "Fokus auf Legacy-Modernisierung, Softwarequalität und wartbare Systeme", en: "Focused on legacy modernization, software quality, and maintainable systems" },
      { de: "Aktuell bei REMONDIS IT Services tätig", en: "Currently working at REMONDIS IT Services" },
      { de: "Öffentliche Profile auf GitHub, LinkedIn, Website, Blog und Packagist", en: "Public profiles on GitHub, LinkedIn, website, blog, and Packagist" },
      { de: "Open-Source-Maintainer im PHP-Ökosystem", en: "Open-source maintainer in the PHP ecosystem" },
    ],
  },
  specialties: [
    { de: "PHP 8.x, Symfony, Laravel", en: "PHP 8.x, Symfony, Laravel" },
    { de: "Legacy-Modernisierung", en: "Legacy modernization" },
    { de: "Statische Analyse mit PHPStan und Psalm", en: "Static analysis with PHPStan and Psalm" },
    { de: "Softwarequalität mit PHPUnit, TDD und CI/CD", en: "Software quality with PHPUnit, TDD, and CI/CD" },
    { de: "Architektur, Mentoring und wartbare Backend-Systeme", en: "Architecture, mentoring, and maintainable backend systems" },
  ],
  strongestProjects: ["portable-utf8", "portable-ascii", "Arrayy", "anti-xss"],
  projects: [
    {
      slug: "portable-utf8",
      name: "portable-utf8",
      url: "https://github.com/voku/portable-utf8",
      primaryLanguage: "PHP",
      topics: ["php", "strings", "utilities"],
      shortDescription: {
        de: "UTF-8-String-Utilities für robustere, portable Textverarbeitung in PHP.",
        en: "UTF-8 string utilities for more robust, portable text processing in PHP.",
      },
      whyItMatters: {
        de: "Hilft bei korrekter Zeichenkettenverarbeitung in produktiven PHP-Systemen und vermeidet typische Multibyte-Fallen.",
        en: "Helps production PHP systems handle strings correctly and avoid common multibyte pitfalls.",
      },
      tags: ["utf8", "strings", "text processing", "php"],
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
        de: "Nützlich für saubere Normalisierung, Suchindizes und interoperable Textverarbeitung.",
        en: "Useful for clean normalization, search indexes, and interoperable text processing.",
      },
      tags: ["ascii", "normalization", "search", "php"],
    },
    {
      slug: "Arrayy",
      name: "Arrayy",
      url: "https://github.com/voku/Arrayy",
      primaryLanguage: "PHP",
      topics: ["php", "arrays", "utilities"],
      shortDescription: {
        de: "Hilfsbibliothek für lesbarere und sicherere Array-Arbeit in PHP.",
        en: "Helper library for more readable and safer array handling in PHP.",
      },
      whyItMatters: {
        de: "Reduziert Boilerplate in älteren und modernen PHP-Codebasen und macht Datenstrukturen leichter wartbar.",
        en: "Reduces boilerplate in both legacy and modern PHP codebases and makes data structures easier to maintain.",
      },
      tags: ["arrays", "collections", "php", "utilities"],
      since: "2016-05",
    },
    {
      slug: "anti-xss",
      name: "anti-xss",
      url: "https://github.com/voku/anti-xss",
      primaryLanguage: "PHP",
      topics: ["php", "security", "utilities"],
      shortDescription: {
        de: "Sicherheitsbibliothek für die Reduktion von XSS-Risiken in PHP-Anwendungen.",
        en: "Security library to reduce XSS risks in PHP applications.",
      },
      whyItMatters: {
        de: "Passt direkt zum öffentlichen Profilfokus auf sichere Web-Anwendungen und Input-Verarbeitung.",
        en: "Directly matches the public profile focus on secure web applications and input handling.",
      },
      tags: ["security", "xss", "sanitization", "php"],
      since: "2015-05",
    },
  ],
  skills: [
    { name: "PHP 8.x", domain: "backend", level: "expert" },
    { name: "Symfony", domain: "backend", level: "expert" },
    { name: "Laravel", domain: "backend", level: "very_strong" },
    { name: "REST API", domain: "backend", level: "very_strong" },
    { name: "GraphQL", domain: "backend", level: "strong" },
    { name: "MySQL", domain: "database", level: "very_strong" },
    { name: "MariaDB", domain: "database", level: "strong" },
    { name: "PostgreSQL", domain: "database", level: "strong" },
    { name: "Redis", domain: "database", level: "strong" },
    { name: "PHPUnit", domain: "static_analysis", level: "expert" },
    { name: "TDD", domain: "static_analysis", level: "very_strong" },
    { name: "PHPStan", domain: "static_analysis", level: "expert" },
    { name: "Psalm", domain: "static_analysis", level: "very_strong" },
    { name: "Rector", domain: "static_analysis", level: "strong" },
    { name: "php-cs-fixer", domain: "static_analysis", level: "strong" },
    { name: "OOP / SOLID", domain: "architecture", level: "expert" },
    { name: "Clean Code", domain: "architecture", level: "very_strong" },
    { name: "Design Patterns", domain: "architecture", level: "very_strong" },
    { name: "Microservices", domain: "architecture", level: "strong" },
    { name: "Event-Driven Architecture", domain: "architecture", level: "strong" },
    { name: "Legacy Modernization", domain: "legacy_modernization", level: "expert" },
    { name: "Technical Debt Reduction", domain: "legacy_modernization", level: "very_strong" },
    { name: "Docker", domain: "devops_linux", level: "very_strong" },
    { name: "Kubernetes", domain: "devops_linux", level: "strong" },
    { name: "CI/CD", domain: "devops_linux", level: "very_strong" },
    { name: "GitHub Actions", domain: "devops_linux", level: "strong" },
    { name: "GitLab CI", domain: "devops_linux", level: "strong" },
    { name: "Linux", domain: "devops_linux", level: "strong" },
    { name: "Nginx", domain: "frontend_web_basics", level: "strong" },
    { name: "Apache", domain: "frontend_web_basics", level: "strong" },
    { name: "Secure Web Applications", domain: "security", level: "very_strong" },
    { name: "XSS Prevention", domain: "security", level: "very_strong" },
    { name: "OWASP", domain: "security", level: "strong" },
    { name: "Mentoring", domain: "security", level: "very_strong" },
    { name: "Technical Coaching", domain: "security", level: "strong" },
  ],
  experienceHighlights: [
    { de: "Seit 2020 Senior PHP Developer bei REMONDIS IT Services", en: "Senior PHP Developer at REMONDIS IT Services since 2020" },
    { de: "Stabilisierung und Weiterentwicklung geschäftskritischer Plattformen", en: "Stabilization and further development of business-critical platforms" },
    { de: "Ausbau wartbarer Service-Strukturen und API-first-Entwicklung", en: "Expansion of maintainable service structures and API-first development" },
    { de: "Schrittweise Modernisierung statt riskanter Big-Bang-Rewrites", en: "Incremental modernization instead of risky big-bang rewrites" },
  ],
  faq: {
    de: [
      {
        question: "Was sind Lars Moellekens Schwerpunkte als PHP Entwickler?",
        answer: "Senior PHP Developer und PHP Architect mit 20+ Jahren Erfahrung. Fokus auf Symfony, Laravel, Legacy-Modernisierung, PHPStan Level 9, PHPUnit, Docker, CI/CD und wartbare Softwarearchitektur.",
      },
      {
        question: "Für welche PHP-Projekte ist Lars Moelleken geeignet?",
        answer: "Großskalige Legacy-Modernisierung, Backend-Architektur, statische Analyse, Performance-Optimierung, CI/CD-Aufbau und Mentoring für Entwicklungsteams in Deutschland.",
      },
      {
        question: "Wie kontaktiere ich Lars Moelleken für ein Projekt?",
        answer: "Per E-Mail, LinkedIn, GitHub, Website, Blog oder über Packagist.",
      },
    ],
    en: [
      {
        question: "What are Lars Moelleken's focus areas as a PHP developer?",
        answer: "Senior PHP Developer and PHP Architect with 20+ years of experience. Focus on Symfony, Laravel, legacy modernization, PHPStan Level 9, PHPUnit, Docker, CI/CD, and maintainable software architecture.",
      },
      {
        question: "What kind of PHP projects is Lars Moelleken suited for?",
        answer: "Large-scale legacy modernization, backend architecture, static analysis, performance optimization, CI/CD setup, and mentoring for development teams in Germany.",
      },
      {
        question: "How can I contact Lars Moelleken for a project?",
        answer: "Via email, LinkedIn, GitHub, website, blog, or Packagist.",
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
    ],
    guidanceByIntent: {
      job_offer: {
        preferredChannels: ["email", "linkedin"],
        include: [
          { de: "Rollenbezeichnung, Team- oder Produktkontext und gewünschter Startzeitpunkt", en: "Role title, team or product context, and expected start timeline" },
          { de: "Technologie-Stack, Modernisierungsgrad und Verantwortungsschwerpunkt", en: "Technology stack, modernization stage, and responsibility focus" },
          { de: "Ob es um Senior PHP, Lead, Architektur oder Legacy-Modernisierung geht", en: "Whether the role centers on senior PHP, lead, architecture, or legacy modernization work" },
        ],
        conversationTopics: [
          { de: "Architektur und Modernisierung", en: "Architecture and modernization" },
          { de: "PHP-Stack, Qualität und Team-Fit", en: "PHP stack, quality, and team fit" },
        ],
      },
      consulting: {
        preferredChannels: ["email", "website", "linkedin"],
        include: [
          { de: "Aktuelle Systemprobleme, technische Schulden und gewünschtes Zielbild", en: "Current system problems, technical debt, and the desired target state" },
          { de: "Rahmen für Analyse, Refactoring, Testing oder Security-Schwerpunkte", en: "Scope for analysis, refactoring, testing, or security-focused work" },
        ],
        conversationTopics: [
          { de: "Legacy-Modernisierung und Risikoabbau", en: "Legacy modernization and risk reduction" },
          { de: "Statische Analyse, Tests und inkrementelle Verbesserungen", en: "Static analysis, tests, and incremental improvements" },
        ],
      },
      open_source: {
        preferredChannels: ["github", "packagist", "blog"],
        include: [
          { de: "Repository, Problemstellung und reproduzierbaren Kontext", en: "Repository, problem statement, and reproducible context" },
          { de: "Betroffene Library oder konkrete Maintainer-Frage", en: "Affected library or the exact maintainer question" },
        ],
        conversationTopics: [
          { de: "Package-Nutzung, Wartung und Sicherheitsaspekte", en: "Package usage, maintenance, and security concerns" },
          { de: "PHP-Bibliotheken für Strings, Arrays und Security", en: "PHP libraries for strings, arrays, and security" },
        ],
      },
      speaking: {
        preferredChannels: ["email", "linkedin", "blog"],
        include: [
          { de: "Veranstaltung, Publikum, Format und gewünschte Themenrichtung", en: "Event, audience, format, and desired topic direction" },
          { de: "Ob der Schwerpunkt auf PHP, Architektur, Modernisierung oder Open Source liegt", en: "Whether the focus is PHP, architecture, modernization, or open source" },
        ],
        conversationTopics: [
          { de: "Open Source, PHP-Workflows und Engineering-Standards", en: "Open source, PHP workflows, and engineering standards" },
          { de: "Praktische Softwarequalität in produktiven Systemen", en: "Practical software quality in production systems" },
        ],
      },
      general: {
        preferredChannels: ["email", "linkedin", "github"],
        include: [
          { de: "Kurz den Anlass und den gewünschten Kontext nennen", en: "Briefly describe the reason for reaching out and the desired context" },
          { de: "Falls relevant: Projekt, Rolle oder Repository verlinken", en: "If relevant, include the project, role, or repository link" },
        ],
        conversationTopics: [
          { de: "Senior PHP, Architektur, Open Source", en: "Senior PHP, architecture, open source" },
          { de: "Wartbarkeit, Qualität und Modernisierung", en: "Maintainability, quality, and modernization" },
        ],
      },
    },
  },
};

export function getContactChannel(key: ContactChannelKey) {
  return PROFILE_DATA.contact.channels.find((channel) => channel.key === key);
}

export function getSectionById(sectionId: ProfileSectionKey) {
  return PROFILE_DATA.sections.find((section) => section.id === sectionId);
}
