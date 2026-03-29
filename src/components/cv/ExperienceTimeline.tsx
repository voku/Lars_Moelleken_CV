import type { ComponentTheme } from "./types";

export interface ExperienceItem {
  title: string;
  companyPeriod: string;
  bullets?: string[];
}

export const DEFAULT_EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    title: "Senior PHP Developer",
    companyPeriod: "REMONDIS IT Services · seit 2020",
    bullets: [
      "PHP 8.x, Symfony, Docker, Kubernetes, CI/CD, GitHub Actions",
      "PHPStan Level 9, PHPUnit, TDD, Rector, php-cs-fixer",
      "REST API Design, MySQL, MariaDB, Redis, Performance Optimization",
      "Legacy Modernization, OOP / SOLID, Code Review, Mentoring",
      "Impact: Stabilisierung und Weiterentwicklung geschäftskritischer interner Plattformen",
    ],
  },
  {
    title: "Senior Developer",
    companyPeriod: "IONOS · 2018–2020",
    bullets: [
      "PHP 8.x, Symfony, Laravel, Microservices, Docker, CI/CD",
      "REST APIs, PostgreSQL, Redis, Scalable Architecture",
      "PHPUnit, Static Analysis, Team Lead, Agile/Scrum",
      "Impact: Ausbau wartbarer Service-Strukturen für skalierbare Hosting-nahe Workflows",
    ],
  },
  {
    title: "PHP Developer",
    companyPeriod: "MEERX · 2013–2018",
    bullets: [
      "PHP, Symfony, MySQL, REST API, Git, Composer",
      "OOP, Design Patterns, Clean Code, PHPUnit",
      "Impact: Aufbau solider Backend-Fundamente und API-first-Entwicklung in Kundenprojekten",
    ],
  },
  {
    title: "Web Developer",
    companyPeriod: "menadwork · 2010–2013",
    bullets: ["PHP, MySQL, Linux, Apache, Git"],
  },
  {
    title: "Systemadministrator",
    companyPeriod: "Global Village · 2005–2010",
  },
];

interface ExperienceTimelineProps {
  items?: ExperienceItem[];
  theme?: ComponentTheme;
}

export function ExperienceTimeline({ items = DEFAULT_EXPERIENCE_TIMELINE, theme = "standard" }: ExperienceTimelineProps) {
  const isMando = theme === "mandalorian";

  return (
    <div className={isMando ? "space-y-5" : "border-l-2 border-blue-200 pl-6 space-y-8"}>
      {items.map((item) => (
        <div key={`${item.title}-${item.companyPeriod}`}>
          <h3 className={isMando ? "text-lg font-bold text-[#f0e0a0]" : "text-xl font-bold text-gray-900"}>{item.title}</h3>
          <p className={isMando ? "font-medium mb-2 text-[#d3bd80]" : "text-blue-600 font-medium mb-2"}>{item.companyPeriod}</p>
          {item.bullets?.length ? (
            <ul className={isMando ? "space-y-1 text-sm text-[#d2c39a]" : "space-y-1 text-gray-600 text-sm"}>
              {item.bullets.map((bullet) => (
                <li key={`${item.title}-${bullet}`}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
