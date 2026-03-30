import { useMemo } from "react";
import type { ComponentTheme } from "./types";
import { UI_TEXT, useCvCopy } from "./copy";

export interface ExperienceItem {
  title: string;
  companyPeriod: string;
  bullets?: string[];
}

export const DEFAULT_EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    title: "Senior PHP Developer",
    companyPeriod: UI_TEXT.experience.periodRemondis,
    bullets: [
      "PHP 8.x, Symfony, Docker, Kubernetes, CI/CD, GitHub Actions",
      "PHPStan Level 9, PHPUnit, TDD, Rector, php-cs-fixer",
      "REST API Design, MySQL, MariaDB, Redis, Performance Optimization",
      "Legacy Modernization, OOP / SOLID, Code Review, Mentoring",
      UI_TEXT.experience.impactRemondis,
    ],
  },
  {
    title: "Senior Developer",
    companyPeriod: "IONOS · 2018–2020",
    bullets: [
      "PHP 8.x, Symfony, Laravel, Microservices, Docker, CI/CD",
      "REST APIs, PostgreSQL, Redis, Scalable Architecture",
      "PHPUnit, Static Analysis, Team Lead, Agile/Scrum",
      UI_TEXT.experience.impactIonos,
    ],
  },
  {
    title: "PHP Developer",
    companyPeriod: "MEERX · 2013–2018",
    bullets: [
      "PHP, Symfony, MySQL, REST API, Git, Composer",
      "OOP, Design Patterns, Clean Code, PHPUnit",
      UI_TEXT.experience.impactMeerx,
    ],
  },
  {
    title: "Web Developer",
    companyPeriod: "menadwork · 2010–2013",
    bullets: ["PHP, MySQL, Linux, Apache, Git"],
  },
  {
    title: UI_TEXT.experience.sysadminTitle,
    companyPeriod: "Global Village · 2005–2010",
  },
];

interface ExperienceTimelineProps {
  items?: ExperienceItem[];
  theme?: ComponentTheme;
}

export function ExperienceTimeline({ items, theme = "standard" }: ExperienceTimelineProps) {
  const copy = useCvCopy();
  const isMando = theme === "mandalorian";

  const resolvedItems = useMemo<ExperienceItem[]>(() => {
    if (items) return items;
    return [
      {
        title: "Senior PHP Developer",
        companyPeriod: copy.experience.periodRemondis,
        bullets: [
          "PHP 8.x, Symfony, Docker, Kubernetes, CI/CD, GitHub Actions",
          "PHPStan Level 9, PHPUnit, TDD, Rector, php-cs-fixer",
          "REST API Design, MySQL, MariaDB, Redis, Performance Optimization",
          "Legacy Modernization, OOP / SOLID, Code Review, Mentoring",
          copy.experience.impactRemondis,
        ],
      },
      {
        title: "Senior Developer",
        companyPeriod: "IONOS · 2018–2020",
        bullets: [
          "PHP 8.x, Symfony, Laravel, Microservices, Docker, CI/CD",
          "REST APIs, PostgreSQL, Redis, Scalable Architecture",
          "PHPUnit, Static Analysis, Team Lead, Agile/Scrum",
          copy.experience.impactIonos,
        ],
      },
      {
        title: "PHP Developer",
        companyPeriod: "MEERX · 2013–2018",
        bullets: [
          "PHP, Symfony, MySQL, REST API, Git, Composer",
          "OOP, Design Patterns, Clean Code, PHPUnit",
          copy.experience.impactMeerx,
        ],
      },
      {
        title: "Web Developer",
        companyPeriod: "menadwork · 2010–2013",
        bullets: ["PHP, MySQL, Linux, Apache, Git"],
      },
      {
        title: copy.experience.sysadminTitle,
        companyPeriod: "Global Village · 2005–2010",
      },
    ];
  }, [items, copy]);

  return (
    <div className={isMando ? "space-y-5" : "border-l-2 border-blue-200 pl-6 space-y-8"}>
      {resolvedItems.map((item) => (
        <div key={`${item.title}-${item.companyPeriod}`}>
          <h3 className={isMando ? "text-lg font-bold text-mando-heading" : "text-xl font-bold text-gray-900"}>{item.title}</h3>
          <p className={isMando ? "font-medium mb-2 text-mando-label" : "text-blue-600 font-medium mb-2"}>{item.companyPeriod}</p>
          {item.bullets?.length ? (
            <ul className={isMando ? "space-y-1 text-sm text-mando-body" : "space-y-1 text-gray-600 text-sm"}>
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
