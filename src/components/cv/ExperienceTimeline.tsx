import { useMemo } from "react";
import { CV_2026, localizeCv } from "../../cv2026";
import { useCvLocale } from "./copy";
import type { ComponentTheme } from "./types";

export interface ExperienceItem {
  readonly title: string;
  readonly companyPeriod: string;
  readonly context?: string;
  readonly bullets?: readonly string[];
}

export const DEFAULT_EXPERIENCE_TIMELINE: readonly ExperienceItem[] = CV_2026.experience.map((entry) => ({
  title: entry.title.de,
  companyPeriod: `${entry.company} · ${entry.period}`,
  context: entry.context?.de,
  bullets: entry.bullets.map((bullet) => bullet.de),
}));

interface ExperienceTimelineProps {
  readonly items?: readonly ExperienceItem[];
  readonly theme?: ComponentTheme;
}

export function ExperienceTimeline({ items, theme = "standard" }: ExperienceTimelineProps) {
  const { locale } = useCvLocale();
  const isMando = theme === "mandalorian";

  const resolvedItems = useMemo<readonly ExperienceItem[]>(() => {
    if (items) {
      return items;
    }

    return CV_2026.experience.map((entry) => ({
      title: localizeCv(entry.title, locale),
      companyPeriod: `${entry.company} · ${entry.period}`,
      context: entry.context ? localizeCv(entry.context, locale) : undefined,
      bullets: entry.bullets.map((bullet) => localizeCv(bullet, locale)),
    }));
  }, [items, locale]);

  return (
    <div className={isMando ? "space-y-5" : "border-l-2 border-blue-200 pl-6 space-y-8"}>
      {resolvedItems.map((item) => (
        <article key={`${item.title}-${item.companyPeriod}`}>
          <h3 className={isMando ? "text-lg font-bold text-mando-heading" : "text-xl font-bold text-gray-900"}>
            {item.title}
          </h3>
          <p className={isMando ? "font-medium text-mando-label" : "text-blue-600 font-medium"}>
            {item.companyPeriod}
          </p>
          {item.context ? (
            <p className={isMando ? "mb-2 text-sm italic text-mando-subtitle" : "mb-2 text-sm italic text-gray-500"}>
              {item.context}
            </p>
          ) : null}
          {item.bullets?.length ? (
            <ul className={isMando ? "space-y-1 text-sm text-mando-body" : "space-y-1 text-gray-600 text-sm list-disc pl-5"}>
              {item.bullets.map((bullet) => (
                <li key={`${item.companyPeriod}-${bullet}`}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
