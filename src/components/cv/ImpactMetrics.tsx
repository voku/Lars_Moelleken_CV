import { useMemo } from "react";
import { useCvLocale } from "./copy";
import type { ComponentTheme } from "./types";

export interface ImpactMetric {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}

export const DEFAULT_IMPACT_METRICS: readonly ImpactMetric[] = [
  { label: "Erfahrung", value: "~20 Jahre", detail: "PHP-, Backend-, Datenbank- und Linux-Systeme" },
  { label: "Qualität", value: "PHPStan max", detail: "PHPUnit, Codeception, CI/CD, präzise PHPDocs" },
  { label: "Enterprise", value: "IAM + M365", detail: "LDAP/AD, Exchange, PowerShell und AS/400" },
];

interface ImpactMetricsProps {
  readonly metrics?: readonly ImpactMetric[];
  readonly theme?: ComponentTheme;
}

export function ImpactMetrics({ metrics, theme = "standard" }: ImpactMetricsProps) {
  const { locale } = useCvLocale();
  const isMando = theme === "mandalorian";

  const resolvedMetrics = useMemo<readonly ImpactMetric[]>(() => {
    if (metrics) {
      return metrics;
    }

    return locale === "de"
      ? DEFAULT_IMPACT_METRICS
      : [
          { label: "Experience", value: "~20 years", detail: "PHP, backend, database, and Linux systems" },
          { label: "Quality", value: "PHPStan max", detail: "PHPUnit, Codeception, CI/CD, precise PHPDocs" },
          { label: "Enterprise", value: "IAM + M365", detail: "LDAP/AD, Exchange, PowerShell, and AS/400" },
        ];
  }, [metrics, locale]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {resolvedMetrics.map((metric) => (
        <article
          key={metric.label}
          className={isMando ? "mando-panel p-5" : "bg-white border border-gray-200 rounded-xl p-5 shadow-sm"}
        >
          <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-mando-label" : "text-xs font-mono uppercase tracking-wide text-gray-500"}>
            {metric.label}
          </p>
          <p className={isMando ? "text-2xl font-extrabold text-mando-heading mt-1" : "text-2xl font-extrabold text-gray-900 mt-1"}>
            {metric.value}
          </p>
          <p className={isMando ? "text-sm text-mando-body mt-2" : "text-sm text-gray-600 mt-2"}>
            {metric.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
