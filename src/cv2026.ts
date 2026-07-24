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
    summary: {
      de: "Senior PHP Developer und Software-Architekt mit rund 20 Jahren Erfahrung in Entwicklung, Modernisierung und stabilem Betrieb geschäftskritischer Anwendungen. Schwerpunkt auf großen Legacy-Codebases, klaren Typverträgen, statischer Analyse, automatisierten Tests, CI/CD und sicheren Integrationen in Unternehmenssysteme. Verbindet Backend-, Datenbank- und Linux-Erfahrung mit pragmatischer Architektur und überprüfbaren, KI-gestützten Entwicklungsprozessen.",
      en: "Senior PHP Developer and Software Architect with around 20 years of experience developing, modernizing, and reliably operating business-critical applications. Focused on large legacy codebases, explicit type contracts, static analysis, automated tests, CI/CD, and secure enterprise integrations. Combines backend, database, and Linux experience with pragmatic architecture and verifiable AI-assisted development processes.",
    },
  },
  focus: [
    {
      label: { de: "Backend & Architektur", en: "Backend & Architecture" },
      value: "PHP 8.x, MariaDB/MySQL, REST, Legacy-Modernisierung",
    },
    {
      label: { de: "Qualität & Delivery", en: "Quality & Delivery" },
      value: "PHPStan max, PHPUnit/Codeception, CI/CD, Git, Docker",
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
        {
          de: "Konzeption überprüfbarer Coding-Agent-Workflows mit explizitem Scope, selektivem Kontext, Evidence-Gates und menschlich freigegebenem Lernen.",
          en: "Designed verifiable coding-agent workflows with explicit scope, selective context, evidence gates, and human-approved learning.",
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
        de: "voku/portable-utf8, portable-ascii, anti-xss und Arrayy: langjährig gepflegte PHP-Bibliotheken mit Fokus auf Unicode, Sicherheit, Typisierung, Abwärtskompatibilität und stabile APIs.",
        en: "voku/portable-utf8, portable-ascii, anti-xss, and Arrayy: long-maintained PHP libraries focused on Unicode, security, typing, backward compatibility, and stable APIs.",
      },
      links: [
        "https://github.com/voku/portable-utf8",
        "https://github.com/voku/portable-ascii",
        "https://github.com/voku/anti-xss",
        "https://github.com/voku/Arrayy",
      ],
    },
    {
      label: { de: "Agent-Engineering-Toolchain", en: "Agent Engineering Toolchain" },
      description: {
        de: "Git-native Werkzeuge für Task-Steuerung, Sitzungszustand, selektiven Recall, Verifikation und kontrolliertes Lernen von Coding Agents.",
        en: "Git-native tools for task control, session state, selective recall, verification, and governed learning for coding agents.",
      },
      links: ["https://github.com/voku/agent-loop"],
    },
    {
      label: { de: "PHPStan-Werkzeuge", en: "PHPStan Tooling" },
      description: {
        de: "Projekte und Regeln für präzisere statische Analyse, verständlichere Fehlerausgaben und sichere Architekturgrenzen.",
        en: "Projects and rules for more precise static analysis, clearer diagnostics, and safer architecture boundaries.",
      },
      links: ["https://github.com/voku/phpstan-rules"],
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
