export type CvLink = {
  readonly label: string;
  readonly href: string;
};

export type CvExperience = {
  readonly period: string;
  readonly company: string;
  readonly role: string;
  readonly context?: string;
  readonly bullets: readonly string[];
};

export type CvSkillGroup = {
  readonly title: string;
  readonly items: readonly string[];
};

export type CvProjectGroup = {
  readonly title: string;
  readonly description: string;
  readonly links?: readonly CvLink[];
};

export const CV_PROFILE = {
  name: "Lars Moelleken",
  title: "Senior PHP Developer & Software Architect",
  location: "46562 Voerde, Deutschland",
  summary:
    "Senior PHP Developer und Software-Architekt mit rund 20 Jahren Erfahrung in der Entwicklung, Modernisierung und dem stabilen Betrieb geschäftskritischer Anwendungen. Schwerpunkt auf großen Legacy-Codebases, klaren Typverträgen, statischer Analyse, automatisierten Tests, CI/CD sowie sicheren Integrationen in Unternehmenssysteme.",
  links: [
    { label: "lars@moelleken.org", href: "mailto:lars@moelleken.org" },
    { label: "moelleken.org", href: "https://moelleken.org" },
    { label: "github.com/voku", href: "https://github.com/voku" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/larsmoelleken/" },
  ],
  focus: [
    "PHP 8.x",
    "Legacy-Modernisierung",
    "Software-Architektur",
    "PHPStan auf maximalem Level",
    "Automatisierte Tests",
    "CI/CD",
    "MariaDB / MySQL",
    "Linux",
    "LDAP / Active Directory",
    "Microsoft 365 / Exchange",
  ],
  highlights: [
    {
      title: "Backend & Architektur",
      text: "PHP 8.x, MariaDB/MySQL, SQL, REST APIs und schrittweise Modernisierung großer Legacy-Systeme.",
    },
    {
      title: "Qualität & Delivery",
      text: "PHPStan auf maximalem Level, PHPUnit, Codeception, php-cs-fixer, Rector, präzise PHPDocs und CI/CD.",
    },
    {
      title: "Enterprise & Plattform",
      text: "Linux, Apache, Docker Compose, LDAP/AD, M365/Exchange, PowerShell-Gateways, GitLab CI, Sentry und Syslog.",
    },
  ],
  experience: [
    {
      period: "08/2023 - heute",
      company: "REMONDIS IT Services GmbH",
      role: "Senior PHP Developer / Software Architect",
      context: "IT-Portal",
      bullets: [
        "Technische Weiterentwicklung und Architektur eines zentralen IAM- und Berechtigungsportals für Benutzerrechte, Active Directory, Microsoft 365, Standorte, Inventar und weitere Infrastrukturprozesse.",
        "Modernisierung einer gewachsenen PHP-8.x-Codebase mit typisierten APIs, klaren Verantwortlichkeiten, unveränderlichen Datenobjekten und schrittweiser Entkopplung von Legacy-Strukturen.",
        "Aufbau und Verschärfung der Qualitätskontrollen mit PHPStan auf maximalem Level, Codeception, projektspezifischen Regeln, CI/CD sowie nachvollziehbaren Release- und Rollback-Prozessen.",
        "Integration und Automatisierung von LDAP/Active Directory, Microsoft 365/Exchange, ScriptRunner/PowerShell und AS/400-Systemen.",
        "Verbesserung von Sicherheit, Zuverlässigkeit und Performance durch CSRF-Schutz, Prepared Statements, XSS-/SQLi-Erkennung, Upload-Prüfungen, zentrales Fehlerhandling, Smoke-Tests, Slow-Query-Analysen und gezielte Composite-Indizes.",
        "Konzeption überprüfbarer Coding-Agent-Workflows mit explizitem Scope, selektivem Kontext, Evidence-Gates und menschlich freigegebenem Lernen.",
      ],
    },
    {
      period: "02/2023 - 08/2023",
      company: "IONOS SE",
      role: "PHP Developer",
      context: undefined,
      bullets: [
        "Modernisierung einer rund 20 Jahre alten Codebase durch verbessertes Autoloading, präzise PHPDocs, PHPStan und automatisierte CI-Prüfungen.",
        "Stabilisierung und zuverlässigere Gestaltung der Datenbankanbindung.",
        "Kleine, überprüfbare Änderungen mit Fokus auf Wartbarkeit und risikoarme Migration.",
      ],
    },
    {
      period: "06/2017 - 02/2023",
      company: "MEERX.de | VDMG connect GmbH",
      role: "PHP Developer",
      context: "E-Commerce und CRM",
      bullets: [
        "Modernisierung eines individuellen E-Commerce-Systems und einer rund 15 Jahre gewachsenen Codebase mit etwa 10.000 PHP-Klassen.",
        "Aufbau einer Elasticsearch-basierten Suche für mehrere Millionen Artikeldatensätze.",
        "Realisierung der Amazon-Anbindung an das interne CRM.",
        "Einführung und Ausbau von PHPStan, automatisierten Tests, präzisen PHPDocs und CI-Checks.",
      ],
    },
    {
      period: "08/2011 - 05/2017",
      company: "menadwork kommunikation GmbH",
      role: "Full Stack Developer",
      context: undefined,
      bullets: [
        "Entwicklung eines internen CMS für die Anforderungen der Agentur.",
        "Umsetzung von Websites und E-Mail-Templates mit PHP, HTML, CSS und JavaScript.",
        "Einführung von Git sowie automatisierten Tests mit Jenkins.",
      ],
    },
    {
      period: "08/2007 - 08/2010",
      company: "Global Village GmbH",
      role: "Linux Systemadministrator",
      context: undefined,
      bullets: [
        "Automatisierung und Entwicklung mit Bash, PHP und Perl.",
        "Installation, Aktualisierung, Monitoring und Fehleranalyse von Linux-Servern.",
        "Technischer Kundensupport für Server, Websites, E-Mail und DSL.",
        "Betrieb des Serverraums einschließlich Hardwaretausch, Verkabelung und Monitoring.",
      ],
    },
  ] satisfies readonly CvExperience[],
  projects: [
    {
      title: "Open-Source-Bibliotheken",
      description:
        "Langjährig gepflegte PHP-Bibliotheken mit Fokus auf Unicode, Sicherheit, Typisierung, Abwärtskompatibilität und stabile APIs.",
      links: [
        { label: "portable-utf8", href: "https://github.com/voku/portable-utf8" },
        { label: "portable-ascii", href: "https://github.com/voku/portable-ascii" },
        { label: "anti-xss", href: "https://github.com/voku/anti-xss" },
        { label: "Arrayy", href: "https://github.com/voku/Arrayy" },
      ],
    },
    {
      title: "Agent-Engineering-Toolchain",
      description:
        "Git-native Werkzeuge für Task-Steuerung, Sitzungszustand, selektiven Recall, Verifikation und kontrolliertes Lernen von Coding Agents.",
      links: [{ label: "GitHub-Profil", href: "https://github.com/voku" }],
    },
    {
      title: "PHPStan-Werkzeuge",
      description:
        "Projekte und Regeln für präzisere statische Analyse, verständlichere Fehlerausgaben und sichere Architekturgrenzen.",
      links: [{ label: "PHPStan-Projekte", href: "https://github.com/voku?tab=repositories&q=phpstan" }],
    },
  ] satisfies readonly CvProjectGroup[],
  skillGroups: [
    {
      title: "Backend",
      items: ["PHP 8.x", "MariaDB / MySQL", "SQL", "REST APIs", "Composer", "Bash", "Perl"],
    },
    {
      title: "Qualität",
      items: ["PHPStan (max)", "PHPUnit", "Codeception", "php-cs-fixer", "Rector", "PHPDocs", "CI/CD"],
    },
    {
      title: "Plattform",
      items: ["Linux", "Apache", "Docker Compose", "GitLab CI", "Jenkins", "Sentry", "Syslog"],
    },
    {
      title: "Frontend & Integration",
      items: [
        "HTML5",
        "CSS / SASS",
        "JavaScript / TypeScript",
        "jQuery",
        "Bootstrap",
        "React",
        "LDAP / AD",
        "M365 / Exchange",
        "PowerShell",
      ],
    },
  ] satisfies readonly CvSkillGroup[],
  education: [
    "2011 - 2013: Fachinformatiker Anwendungsentwicklung",
    "2010 - 2011: Hochschule Niederrhein - Informatik, ohne Abschluss",
    "2007 - 2010: Fachinformatiker Systemintegration",
    "2004 - 2007: Staatlich geprüfter Assistent für Betriebsinformatik",
  ],
  languages: ["Deutsch: Muttersprache", "Englisch: gut"],
} as const;

export const PUBLIC_PROFILE_EXPORT = {
  name: CV_PROFILE.name,
  title: CV_PROFILE.title,
  location: CV_PROFILE.location,
  summary: CV_PROFILE.summary,
  focus: CV_PROFILE.focus,
  experience: CV_PROFILE.experience,
  projects: CV_PROFILE.projects,
  skills: CV_PROFILE.skillGroups,
  links: CV_PROFILE.links,
} as const;
