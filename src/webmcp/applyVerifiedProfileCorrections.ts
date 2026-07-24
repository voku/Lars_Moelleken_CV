import { CV_2026 } from "../../src/cv2026";
import { UI_TEXT } from "../components/cv/copy";
import { PROFILE_DATA } from "./profileData";

const X_PROFILE_URL = "https://x.com/suckup_de";

if (PROFILE_DATA.experienceHighlights.length === 0) {
  throw new Error("Cannot apply CV 2026 data: experience highlights are missing.");
}

if (!PROFILE_DATA.contact.channels.some((channel) => channel.key === "twitter")) {
  throw new Error("Cannot apply CV 2026 data: X contact channel is missing.");
}

Object.assign(PROFILE_DATA.person, {
  headline: CV_2026.person.headline,
  location: {
    de: "Voerde, NRW, Deutschland",
    en: "Voerde, NRW, Germany",
  },
  seniority: {
    de: "Rund 20 Jahre Erfahrung mit geschäftskritischen PHP-, Backend- und Linux-Systemen",
    en: "Around 20 years of experience with business-critical PHP, backend, and Linux systems",
  },
  currentRole: {
    de: "Senior PHP Developer / Software Architect bei REMONDIS IT Services seit August 2023",
    en: "Senior PHP Developer / Software Architect at REMONDIS IT Services since August 2023",
  },
  currentCompany: "REMONDIS IT Services GmbH",
  summaries: CV_2026.person.summary,
  availability: {
    de: "Kontakt für Senior-PHP-, Software-Architektur-, Legacy-Modernisierungs- und Enterprise-Integrationsrollen.",
    en: "Contact for senior PHP, software architecture, legacy modernization, and enterprise integration roles.",
  },
});

PROFILE_DATA.audienceHighlights = {
  recruiter: [
    { de: "Rund 20 Jahre PHP-, Backend- und Linux-Erfahrung", en: "Around 20 years of PHP, backend, and Linux experience" },
    { de: "Seit 08/2023 Senior PHP Developer / Software Architect bei REMONDIS IT Services", en: "Senior PHP Developer / Software Architect at REMONDIS IT Services since 08/2023" },
    { de: "PHPStan auf maximalem Level, PHPUnit, Codeception und CI/CD", en: "PHPStan at maximum level, PHPUnit, Codeception, and CI/CD" },
    { de: "Enterprise-Integrationen mit LDAP/AD, M365/Exchange, PowerShell und AS/400", en: "Enterprise integrations with LDAP/AD, M365/Exchange, PowerShell, and AS/400" },
    { de: "Langjähriger Maintainer etablierter PHP-Bibliotheken und einer eigenen Agent-Engineering-Toolchain", en: "Long-term maintainer of established PHP libraries and an in-house agent-engineering toolchain" },
  ],
  cto: [
    { de: "Schrittweise Legacy-Modernisierung ohne riskanten Big-Bang-Rewrite", en: "Incremental legacy modernization without a risky big-bang rewrite" },
    { de: "Value Objects statt loser Arrays, PHPStan max als Definition of Done", en: "Value objects instead of loose arrays, PHPStan at maximum level as the definition of done" },
    { de: "Sichere Integrationen in geschäftskritische Unternehmenssysteme", en: "Secure integrations with business-critical enterprise systems" },
    { de: "Constraint- statt Prompt-getriebene Workflows für Coding-Agenten", en: "Constraint-driven rather than prompt-driven workflows for coding agents" },
  ],
  engineering_manager: [
    { de: "Messbare Qualitätsverbesserung mit PHPStan, Tests und CI/CD", en: "Measurable quality improvement with PHPStan, tests, and CI/CD" },
    { de: "Kleine, überprüfbare Änderungen statt riskanter Komplettumbauten", en: "Small, verifiable changes instead of risky full rewrites" },
    { de: "Praxis in Architektur, Code-Review und produktionsnaher Fehleranalyse", en: "Hands-on architecture, code review, and production-oriented debugging" },
    { de: "Eigene Agent-Engineering-Toolchain für Scope, Sitzungszustand und Evidence-Gates", en: "In-house agent-engineering toolchain for scope, session state, and evidence gates" },
  ],
  developer: [
    { de: "PHP 8.x, Composer, MariaDB/MySQL und REST APIs", en: "PHP 8.x, Composer, MariaDB/MySQL, and REST APIs" },
    { de: "PHPStan max, Value Objects & Enums, PHPUnit, Codeception und Rector", en: "PHPStan max, value objects & enums, PHPUnit, Codeception, and Rector" },
    { de: "Linux-, Apache-, Docker-Compose- und GitLab-CI-Praxis", en: "Hands-on Linux, Apache, Docker Compose, and GitLab CI experience" },
    { de: "Maintainer von portable-utf8, portable-ascii, anti-xss, Arrayy und des agent-loop-Ökosystems", en: "Maintainer of portable-utf8, portable-ascii, anti-xss, Arrayy, and the agent-loop ecosystem" },
  ],
  generic: [
    { de: "Senior PHP Developer und Software-Architekt", en: "Senior PHP Developer and Software Architect" },
    { de: "Fokus auf Typsicherheit, Legacy-Modernisierung und Agent-Engineering", en: "Focused on type safety, legacy modernization, and agent engineering" },
    { de: "Aktuell bei REMONDIS IT Services tätig", en: "Currently working at REMONDIS IT Services" },
    { de: "Langjährige öffentliche Open-Source-Arbeit", en: "Long-running public open-source work" },
  ],
};

PROFILE_DATA.specialties = [
  { de: "PHP 8.x, MariaDB/MySQL und REST APIs", en: "PHP 8.x, MariaDB/MySQL, and REST APIs" },
  { de: "Legacy-Modernisierung und typsichere Architekturen", en: "Legacy modernization and type-safe architectures" },
  { de: "PHPStan max, projektspezifische Regeln und automatisierte Tests", en: "PHPStan max, project-specific rules, and automated tests" },
  { de: "Agent-Engineering: constraint-basierte Workflows für Coding-Agenten", en: "Agent engineering: constraint-based workflows for coding agents" },
  { de: "LDAP/AD-, M365/Exchange-, PowerShell- und AS/400-Integration", en: "LDAP/AD, M365/Exchange, PowerShell, and AS/400 integration" },
];

PROFILE_DATA.skills = [
  { name: "PHP 8.x", domain: "backend", level: "expert" },
  { name: "Composer", domain: "backend", level: "expert" },
  { name: "REST APIs", domain: "backend", level: "very_strong" },
  { name: "MariaDB", domain: "database", level: "expert" },
  { name: "MySQL", domain: "database", level: "expert" },
  { name: "SQL", domain: "database", level: "very_strong" },
  { name: "Software Architecture", domain: "architecture", level: "expert" },
  { name: "Typed APIs", domain: "architecture", level: "expert" },
  { name: "Value Objects & Enums", domain: "architecture", level: "expert" },
  { name: "Immutable Data Objects", domain: "architecture", level: "very_strong" },
  { name: "Agent Engineering (agent-loop ecosystem)", domain: "architecture", level: "expert" },
  { name: "Constraint-Driven Coding-Agent Workflows", domain: "architecture", level: "very_strong" },
  { name: "Legacy Modernization", domain: "legacy_modernization", level: "expert" },
  { name: "PHPStan", domain: "static_analysis", level: "expert" },
  { name: "PHPDocs", domain: "static_analysis", level: "expert" },
  { name: "PHPUnit", domain: "static_analysis", level: "very_strong" },
  { name: "Codeception", domain: "static_analysis", level: "very_strong" },
  { name: "Rector", domain: "static_analysis", level: "very_strong" },
  { name: "php-cs-fixer", domain: "static_analysis", level: "very_strong" },
  { name: "CI/CD", domain: "devops_linux", level: "expert" },
  { name: "Linux", domain: "devops_linux", level: "expert" },
  { name: "Apache", domain: "devops_linux", level: "very_strong" },
  { name: "Docker Compose", domain: "devops_linux", level: "very_strong" },
  { name: "GitLab CI", domain: "devops_linux", level: "very_strong" },
  { name: "Jenkins", domain: "devops_linux", level: "strong" },
  { name: "Sentry", domain: "devops_linux", level: "strong" },
  { name: "Syslog", domain: "devops_linux", level: "strong" },
  { name: "Bash", domain: "devops_linux", level: "very_strong" },
  { name: "Perl", domain: "devops_linux", level: "strong" },
  { name: "LDAP / Active Directory", domain: "devops_linux", level: "very_strong" },
  { name: "Microsoft 365 / Exchange", domain: "devops_linux", level: "very_strong" },
  { name: "PowerShell Gateways", domain: "devops_linux", level: "very_strong" },
  { name: "AS/400 Integration", domain: "devops_linux", level: "strong" },
  { name: "CSRF Protection", domain: "security", level: "very_strong" },
  { name: "Prepared Statements", domain: "security", level: "expert" },
  { name: "XSS / SQLi Detection", domain: "security", level: "very_strong" },
  { name: "Upload Validation", domain: "security", level: "very_strong" },
  { name: "HTML5", domain: "frontend_web_basics", level: "very_strong" },
  { name: "CSS / SASS", domain: "frontend_web_basics", level: "very_strong" },
  { name: "JavaScript / TypeScript", domain: "frontend_web_basics", level: "very_strong" },
  { name: "jQuery", domain: "frontend_web_basics", level: "very_strong" },
  { name: "Bootstrap", domain: "frontend_web_basics", level: "very_strong" },
  { name: "React", domain: "frontend_web_basics", level: "strong" },
];

PROFILE_DATA.experienceHighlights = CV_2026.experience.map((entry) => ({
  de: `${entry.period}: ${entry.title.de} bei ${entry.company}`,
  en: `${entry.period}: ${entry.title.en} at ${entry.company}`,
}));

PROFILE_DATA.faq = {
  de: [
    {
      question: "Was sind Lars Moellekens Schwerpunkte?",
      answer: "PHP 8.x, typsichere Architekturen (Value Objects, Enums, PHPStan auf maximalem Level als Definition of Done), Legacy-Modernisierung, Agent-Engineering für Coding-Agenten sowie sichere Integrationen in LDAP/AD, Microsoft 365/Exchange, PowerShell und AS/400.",
    },
    {
      question: "Welche Systeme hat Lars Moelleken modernisiert?",
      answer: "Unter anderem ein zentrales IAM- und Berechtigungsportal, eine rund 20 Jahre alte Codebase bei IONOS sowie ein E-Commerce- und CRM-System mit etwa 10.000 PHP-Klassen und mehreren Millionen Artikeldatensätzen.",
    },
    {
      question: "Wie kann ich Lars Moelleken kontaktieren?",
      answer: "Über lars@moelleken.org, LinkedIn, GitHub, moelleken.org oder X unter @suckup_de.",
    },
  ],
  en: [
    {
      question: "What are Lars Moelleken's focus areas?",
      answer: "PHP 8.x, type-safe architectures (value objects, enums, PHPStan at maximum level as the definition of done), legacy modernization, agent engineering for coding agents, and secure integrations with LDAP/AD, Microsoft 365/Exchange, PowerShell, and AS/400.",
    },
    {
      question: "Which systems has Lars Moelleken modernized?",
      answer: "Examples include a central IAM and authorization portal, an approximately 20-year-old codebase at IONOS, and an e-commerce and CRM system with around 10,000 PHP classes and several million product records.",
    },
    {
      question: "How can I contact Lars Moelleken?",
      answer: "Via lars@moelleken.org, LinkedIn, GitHub, moelleken.org, or X at @suckup_de.",
    },
  ],
};

PROFILE_DATA.contact.channels = PROFILE_DATA.contact.channels.map((channel) =>
  channel.key === "twitter"
    ? { ...channel, label: "X", href: X_PROFILE_URL, visibleLabel: "@suckup_de" }
    : channel,
);

Object.assign(UI_TEXT.sharedProfileMission, {
  defaultIntro: CV_2026.person.summary.de,
});
Object.assign(UI_TEXT.rolePositioning, {
  focusDescription: "Fokus auf große Legacy-Codebases, strikte Typverträge (Value Objects statt loser Arrays), PHPStan max als Definition of Done und constraint-basierte Agent-Engineering-Workflows.",
  bullet1: "• Geschäftskritische PHP-Systeme stabilisieren und modernisieren",
  bullet2: "• Maschinell prüfbare Guardrails statt Dokumentation: PHPStan-Regeln, Value Objects, CI/CD",
  bullet3: "• Codebasen für Coding-Agenten sicher veränderbar machen (agent-loop-Ökosystem)",
});
Object.assign(UI_TEXT.experience, {
  periodRemondis: "REMONDIS IT Services GmbH · 08/2023 - heute",
  impactRemondis: "Impact: Architektur und Weiterentwicklung eines zentralen IAM- und Berechtigungsportals",
  impactIonos: "Impact: Risikoarme Modernisierung einer rund 20 Jahre alten PHP-Codebase",
  impactMeerx: "Impact: Modernisierung eines E-Commerce-/CRM-Systems mit etwa 10.000 PHP-Klassen",
  sysadminTitle: "Linux Systemadministrator",
});
Object.assign(UI_TEXT.pageHeader, {
  titleAccent: "Software-Architekt · Agent-Engineering",
  subtitle: CV_2026.person.summary.de,
  availability: "Senior PHP Developer / Software Architect mit Schwerpunkt typsichere Architekturen, Agent-Engineering und Enterprise-Integration.",
  bullet1: "Rund 20 Jahre Erfahrung mit geschäftskritischen Anwendungen",
  bullet2: "Seit 08/2023 Senior PHP Developer / Software Architect bei REMONDIS IT Services",
  bullet3: "Maintainer etablierter PHP-Bibliotheken und einer eigenen Agent-Engineering-Toolchain",
  bullet4: "PHPStan max, Value Objects & Enums, automatisierte Tests und sichere Integrationen",
});
Object.assign(UI_TEXT.aboutSection, {
  description: CV_2026.person.summary.de,
  bullet1: "PHP 8.x, MariaDB/MySQL, REST APIs und Composer",
  bullet2: "Linux, Apache, Docker Compose, GitLab CI, Jenkins, Sentry und Syslog",
  bullet3: "PHPStan max, projektspezifische Analyse-Regeln, PHPUnit, Codeception und Rector",
  bullet4: "Value Objects, Enums, typisierte APIs und schrittweise Legacy-Entkopplung",
  bullet5: "Agent-Engineering-Ökosystem (agent-loop, agent-kanban, agent-session, agent-recall-compiler)",
});
Object.assign(UI_TEXT.recruiterProfile, {
  recruiterHintBody: "Lars Moelleken verbindet rund 20 Jahre PHP-, Backend- und Linux-Erfahrung mit strikt typisierten Architekturen, PHPStan auf maximalem Level als Definition of Done und einer eigenen Open-Source-Toolchain für constraint-basiertes Agent-Engineering.",
});
Object.assign(UI_TEXT.demoAnnotated, {
  cleanCvSample: "Senior PHP Developer / Software Architect • rund 20 Jahre Erfahrung • PHP 8.x · PHPStan max · Value Objects · Agent-Engineering · LDAP/AD · M365/Exchange",
});
Object.assign(UI_TEXT.standardAiShowcase, {
  impactRemondis: "Impact: Architektur und Weiterentwicklung eines zentralen IAM- und Berechtigungsportals seit 08/2023",
  impactIonos: "Impact: Modernisierung einer rund 20 Jahre alten Codebase von 02/2023 bis 08/2023",
});
Object.assign(UI_TEXT.mandoProfile, {
  bullet1: "Senior PHP Developer / Software Architect · rund 20 Jahre Erfahrung",
  bullet2: "REMONDIS IT Services GmbH · IT-Portal · seit 08/2023",
  bullet3: "PHPStan max · PHPUnit/Codeception · CI/CD · sichere Integrationen",
  bullet4: "Open Source · Agent-Engineering · PHPStan-Werkzeuge",
  introText: CV_2026.person.summary.de,
});
