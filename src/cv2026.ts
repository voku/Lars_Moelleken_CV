export type CvLocale = "de" | "en";

export interface LocalizedCvText {
  readonly de: string;
  readonly en: string;
}

export interface CvExperienceEntry {
  readonly period: string;
  readonly company: string;
  readonly title: LocalizedCvText;
  readonly context?: LocalizedCvText;
  readonly bullets: readonly LocalizedCvText[];
}

export interface CvEducationEntry {
  readonly period: string;
  readonly qualification: LocalizedCvText;
}

export interface CvTechnologyGroup {
  readonly label: LocalizedCvText;
  readonly technologies: readonly string[];
}

export interface CvProjectGroup {
  readonly label: LocalizedCvText;
  readonly description: LocalizedCvText;
  readonly links?: readonly string[];
}

export const CV_2026 = {
  person: {
    name: "Lars Moelleken",
    headline: "Senior PHP Developer & Software Architect",
    location: {
      de: "46562 Voerde, NRW, Deutschland",
      en: "46562 Voerde, NRW, Germany",
    },
    email: "lars@moelleken.org",
    website: "https://moelleken.org",
    github: "https://github.com/voku",
    x: "https://x.com/suckup_de",
    linkedin: "https://www.linkedin.com/in/larsmoelleken/",
    tagline: {
      de: "Typsichere Architekturen, automatisierte Qualitätssicherung & Agent-Engineering",
      en: "Type-safe architectures, automated quality gates & agent engineering",
    },
    summary: {
      de: "Senior PHP Developer und Software-Architekt mit rund 20 Jahren Erfahrung in der Entwicklung, Modernisierung und dem stabilen Betrieb geschäftskritischer Anwendungen. In den letzten Jahren mit Schwerpunkt auf strikt typisierten, maschinenlesbaren Architekturen: Value Objects statt loser Arrays, PHPStan auf Maximal-Level als Definition of Done, automatisierte Constraint- statt Prompt-getriebene Workflows. Entwickelt und pflegt eine eigene Open-Source-Toolchain für Coding-Agenten (agent-loop, agent-kanban, agent-session, agent-recall-compiler), mit dem Ziel, Codebasen so umzubauen, dass sie für Menschen wartbar und für autonome Agenten sicher veränderbar sind. Kombiniert das mit klassischer Backend-, Datenbank- und Linux-Erfahrung sowie sicheren Integrationen in Unternehmenssysteme.",
      en: "Senior PHP developer and software architect with around 20 years of experience building, modernizing, and reliably operating business-critical applications. In recent years, focused on strictly typed, machine-readable architectures: value objects instead of loose arrays, PHPStan at maximum level as the definition of done, automated constraint-driven workflows instead of prompt-driven ones. Builds and maintains an open-source toolchain for coding agents (agent-loop, agent-kanban, agent-session, agent-recall-compiler), aimed at restructuring codebases so they stay maintainable for humans and safely modifiable by autonomous agents. Combines this with classic backend, database, and Linux experience plus secure integrations into enterprise systems.",
    },
  },
  focus: [
    {
      label: { de: "Backend & Architektur", en: "Backend & Architecture" },
      value: "PHP 8.x, MariaDB/MySQL, REST, Value Objects & Enums, Legacy-Modernisierung",
    },
    {
      label: { de: "Typsicherheit & Qualität", en: "Type Safety & Quality" },
      value: "PHPStan max, PHPUnit/Codeception, Rector, CI/CD, projektspezifische Analyse-Regeln",
    },
    {
      label: { de: "Agent-Engineering", en: "Agent Engineering" },
      value: "Constraint-basierte Workflows, agent-loop-Ökosystem, deterministische Prompt-Contracts",
    },
    {
      label: { de: "Enterprise & Plattform", en: "Enterprise & Platform" },
      value: "Linux, LDAP/AD, M365/Exchange, PowerShell-Gateways",
    },
  ],
  experience: [
    {
      period: "08/2023 - heute",
      company: "REMONDIS IT Services GmbH",
      title: {
        de: "Senior PHP Developer / Software Architect",
        en: "Senior PHP Developer / Software Architect",
      },
      context: { de: "IT-Portal", en: "IT Portal" },
      bullets: [
        {
          de: "Technische Weiterentwicklung und Architektur eines zentralen IAM- und Berechtigungsportals für Benutzerrechte, Active Directory, Microsoft 365, Standorte, Inventar und weitere Infrastrukturprozesse.",
          en: "Technical development and architecture of a central IAM and authorization portal covering user permissions, Active Directory, Microsoft 365, locations, inventory, and additional infrastructure processes.",
        },
        {
          de: "Modernisierung einer gewachsenen PHP-8.x-Codebase mit typisierten APIs, klaren Verantwortlichkeiten, unveränderlichen Datenobjekten und schrittweiser Entkopplung von Legacy-Strukturen.",
          en: "Modernization of a mature PHP 8.x codebase using typed APIs, explicit responsibilities, immutable data objects, and incremental decoupling from legacy structures.",
        },
        {
          de: "Aufbau und Verschärfung der Qualitätskontrollen mit PHPStan auf maximalem Level, Codeception, projektspezifischen Regeln, CI/CD-Pipelines sowie nachvollziehbaren Release- und Rollback-Prozessen.",
          en: "Built and tightened quality controls with PHPStan at maximum level, Codeception, project-specific rules, CI/CD pipelines, and traceable release and rollback processes.",
        },
        {
          de: "Projektspezifische PHPStan-Regeln, die z. B. sichere Strict-Vergleiche auf ActiveRow-Properties erzwingen und für E-Mail-Spalten verbindliche Value-Object-Typen vorschreiben – maschinell prüfbare Guardrails statt Dokumentation, die auch von Coding-Agenten nicht unterlaufen werden können.",
          en: "Wrote project-specific PHPStan rules that, for example, enforce safe strict comparisons on ActiveRow properties and require value-object types for email columns – machine-checkable guardrails rather than documentation, ones a coding agent cannot silently bypass.",
        },
        {
          de: "Integration und Automatisierung von LDAP/Active Directory, Microsoft 365/Exchange, ScriptRunner/PowerShell sowie AS/400-Systemen.",
          en: "Integration and automation of LDAP/Active Directory, Microsoft 365/Exchange, ScriptRunner/PowerShell, and AS/400 systems.",
        },
        {
          de: "Verbesserung von Sicherheit und Zuverlässigkeit durch CSRF-Schutz, Prepared Statements, XSS-/SQLi-Erkennung, Upload-Prüfungen, zentrales Fehlerhandling und belastbare Smoke-Tests.",
          en: "Improved security and reliability through CSRF protection, prepared statements, XSS/SQLi detection, upload validation, centralized error handling, and robust smoke tests.",
        },
        {
          de: "Performance-Optimierung durch Slow-Query-Analyse, EXPLAIN-Auswertungen, gezielte Composite-Indizes und schnellere Export- und Hintergrundprozesse.",
          en: "Performance optimization through slow-query analysis, EXPLAIN evaluation, targeted composite indexes, and faster export and background processes.",
        },
      ],
    },
    {
      period: "02/2023 - 08/2023",
      company: "IONOS SE",
      title: { de: "PHP Developer", en: "PHP Developer" },
      bullets: [
        {
          de: "Modernisierung einer rund 20 Jahre alten Codebase durch verbessertes Autoloading, präzise PHPDocs, PHPStan und automatisierte CI-Prüfungen.",
          en: "Modernized an approximately 20-year-old codebase through improved autoloading, precise PHPDocs, PHPStan, and automated CI checks.",
        },
        {
          de: "Stabilisierung und zuverlässigere Gestaltung der Datenbankanbindung.",
          en: "Stabilized and improved the reliability of the database integration.",
        },
        {
          de: "Kleine, überprüfbare Änderungen mit Fokus auf Wartbarkeit und risikoarme Migration.",
          en: "Delivered small, verifiable changes focused on maintainability and low-risk migration.",
        },
      ],
    },
    {
      period: "06/2017 - 02/2023",
      company: "MEERX.de | VDMG connect GmbH",
      title: { de: "PHP Developer", en: "PHP Developer" },
      context: { de: "E-Commerce und CRM", en: "E-commerce and CRM" },
      bullets: [
        {
          de: "Modernisierung eines individuellen E-Commerce-Systems und einer rund 15 Jahre gewachsenen Codebase mit etwa 10.000 PHP-Klassen.",
          en: "Modernized a custom e-commerce system and an approximately 15-year-old codebase containing around 10,000 PHP classes.",
        },
        {
          de: "Aufbau einer Elasticsearch-basierten Suche für mehrere Millionen Artikeldatensätze.",
          en: "Built an Elasticsearch-based search for several million product records.",
        },
        {
          de: "Realisierung der Amazon-Anbindung an das interne CRM.",
          en: "Implemented the Amazon integration for the internal CRM.",
        },
        {
          de: "Einführung und Ausbau von PHPStan, automatisierten Tests, präzisen PHPDocs und CI-Checks.",
          en: "Introduced and expanded PHPStan, automated tests, precise PHPDocs, and CI checks.",
        },
      ],
    },
    {
      period: "08/2011 - 05/2017",
      company: "menadwork kommunikation GmbH",
      title: { de: "Full Stack Developer", en: "Full Stack Developer" },
      bullets: [
        {
          de: "Entwicklung eines internen CMS für die Anforderungen der Agentur.",
          en: "Developed an internal CMS for the agency's requirements.",
        },
        {
          de: "Umsetzung von Websites und E-Mail-Templates mit PHP, HTML, CSS und JavaScript.",
          en: "Implemented websites and email templates using PHP, HTML, CSS, and JavaScript.",
        },
        {
          de: "Einführung von Git sowie automatisierten Tests mit Jenkins.",
          en: "Introduced Git and automated tests with Jenkins.",
        },
      ],
    },
    {
      period: "08/2007 - 08/2010",
      company: "Global Village GmbH",
      title: { de: "Linux Systemadministrator", en: "Linux Systems Administrator" },
      bullets: [
        {
          de: "Automatisierung und Entwicklung mit Bash, PHP und Perl.",
          en: "Automation and development with Bash, PHP, and Perl.",
        },
        {
          de: "Installation, Aktualisierung, Monitoring und Fehleranalyse von Linux-Servern.",
          en: "Installed, updated, monitored, and troubleshot Linux servers.",
        },
        {
          de: "Technischer Kundensupport für Server, Websites, E-Mail und DSL.",
          en: "Provided technical customer support for servers, websites, email, and DSL.",
        },
        {
          de: "Betrieb des Serverraums einschließlich Hardwaretausch, Verkabelung und Monitoring.",
          en: "Operated the server room, including hardware replacement, cabling, and monitoring.",
        },
      ],
    },
  ] satisfies readonly CvExperienceEntry[],
  projects: [
    {
      label: { de: "PHP Open Source", en: "PHP Open Source" },
      description: {
        de: "voku/portable-utf8, portable-ascii, anti-xss und Arrayy: langjährig gepflegte PHP-Bibliotheken mit Fokus auf Unicode, Sicherheit, Typisierung, Abwärtskompatibilität und stabile APIs – sicherheitskritisch für jede automatisierte Text-Ein- und -Ausgabe, u. a. an LLM-Schnittstellen.",
        en: "voku/portable-utf8, portable-ascii, anti-xss, and Arrayy: long-maintained PHP libraries focused on Unicode handling, security, type safety, backward compatibility, and stable APIs – security-critical for any automated text input/output, including LLM interfaces.",
      },
      links: [
        "https://github.com/voku/portable-utf8",
        "https://github.com/voku/portable-ascii",
        "https://github.com/voku/anti-xss",
        "https://github.com/voku/Arrayy",
      ],
    },
    {
      label: { de: "Agent-Engineering-Ökosystem", en: "Agent Engineering Ecosystem" },
      description: {
        de: "agent-loop, agent-kanban, agent-session, agent-recall-compiler, agent-learning: Git-native CLI-Werkzeuge für Task-Scope, Sitzungszustand, selektiven Kontext-Recall, Verifikation und kontrolliertes, menschlich freigegebenes Lernen von Coding-Agenten.",
        en: "agent-loop, agent-kanban, agent-session, agent-recall-compiler, agent-learning: Git-native CLI tools for task scope, session state, selective context recall, verification, and controlled, human-approved learning for coding agents.",
      },
      links: ["https://github.com/voku/agent-loop"],
    },
    {
      label: { de: "PHPStan-Toolchain", en: "PHPStan Toolchain" },
      description: {
        de: "phpstan-agent-format, PHPStanConfigurator, itp-context: Kompakte, agentenlesbare PHPStan-Ausgabe, React/TypeScript-Tool zur Konfiguration von PHPStan-Presets, Architektur-Regeln über typisierte Enums und Attribute.",
        en: "phpstan-agent-format, PHPStanConfigurator, itp-context: Compact, agent-readable PHPStan output, a React/TypeScript tool for configuring PHPStan presets, and architecture rules expressed through typed enums and attributes.",
      },
      links: ["https://github.com/voku/phpstan-rules"],
    },
    {
      label: { de: "slop-scan", en: "slop-scan" },
      description: {
        de: "Deterministische, heuristische PHP-Analyse-CLI zur Erkennung typischer KI-generierter Code-Muster.",
        en: "Deterministic, heuristic PHP analysis CLI for detecting typical patterns in AI-generated code.",
      },
    },
    {
      label: { de: "vokuprompt", en: "vokuprompt" },
      description: {
        de: "Go-Tool, das Aufgabenbeschreibungen in deterministische, versionierbare Prompt-Contracts überführt.",
        en: "Go tool that converts task descriptions into deterministic, versionable prompt contracts.",
      },
    },
  ] satisfies readonly CvProjectGroup[],
  education: [
    {
      period: "2011 - 2013",
      qualification: {
        de: "Fachinformatiker Anwendungsentwicklung",
        en: "IT Specialist for Application Development",
      },
    },
    {
      period: "2010 - 2011",
      qualification: {
        de: "Hochschule Niederrhein - Informatik, ohne Abschluss",
        en: "Hochschule Niederrhein - Computer Science, without degree",
      },
    },
    {
      period: "2007 - 2010",
      qualification: {
        de: "Fachinformatiker Systemintegration",
        en: "IT Specialist for System Integration",
      },
    },
    {
      period: "2004 - 2007",
      qualification: {
        de: "Staatlich geprüfter Assistent für Betriebsinformatik",
        en: "State-certified Assistant for Business Information Technology",
      },
    },
  ] satisfies readonly CvEducationEntry[],
  technologyGroups: [
    {
      label: { de: "Backend", en: "Backend" },
      technologies: ["PHP 8.x", "MariaDB/MySQL", "SQL", "REST APIs", "Composer", "Bash", "Perl"],
    },
    {
      label: { de: "Qualität", en: "Quality" },
      technologies: ["PHPStan (max)", "PHPUnit", "Codeception", "php-cs-fixer", "Rector", "PHPDocs", "CI/CD"],
    },
    {
      label: { de: "Agent-Engineering", en: "Agent Engineering" },
      technologies: ["agent-loop", "agent-kanban", "agent-session", "agent-recall-compiler", "Prompt Contracts"],
    },
    {
      label: { de: "Plattform", en: "Platform" },
      technologies: ["Linux", "Apache", "Docker Compose", "GitLab CI", "Jenkins", "Sentry", "Syslog"],
    },
    {
      label: { de: "Frontend & Integration", en: "Frontend & Integration" },
      technologies: ["HTML5", "CSS/SASS", "JavaScript/TypeScript", "jQuery", "Bootstrap", "React", "LDAP/AD", "M365/Exchange", "PowerShell"],
    },
  ] satisfies readonly CvTechnologyGroup[],
  languages: [
    { label: { de: "Deutsch", en: "German" }, level: { de: "Muttersprache", en: "Native" } },
    { label: { de: "Englisch", en: "English" }, level: { de: "gut", en: "good" } },
  ],
  personal: {
    born: "27. November 1987",
    drivingLicense: "Klasse B",
  },
} as const;

export function localizeCv(text: LocalizedCvText, locale: CvLocale): string {
  return text[locale];
}
