import { useMemo } from "react";
import type { ComponentTheme } from "./types";
import { UI_TEXT, useCvCopy } from "./copy";

export interface ImpactMetric {
  label: string;
  value: string;
  detail: string;
}

export const DEFAULT_IMPACT_METRICS: ImpactMetric[] = [
  { label: "OSS Libraries", value: "9+", detail: UI_TEXT.impactMetrics.ossDetail },
  { label: UI_TEXT.impactMetrics.experienceLabel, value: "20+ Jahre", detail: UI_TEXT.impactMetrics.experienceDetail },
  { label: "Fokus", value: "Legacy → Modern", detail: UI_TEXT.impactMetrics.focusDetail },
];

interface ImpactMetricsProps {
  metrics?: ImpactMetric[];
  theme?: ComponentTheme;
}

export function ImpactMetrics({ metrics, theme = "standard" }: ImpactMetricsProps) {
  const copy = useCvCopy();
  const isMando = theme === "mandalorian";

  const resolvedMetrics = useMemo<ImpactMetric[]>(() => {
    if (metrics) return metrics;
    return [
      { label: "OSS Libraries", value: "9+", detail: copy.impactMetrics.ossDetail },
      { label: copy.impactMetrics.experienceLabel, value: "20+ Jahre", detail: copy.impactMetrics.experienceDetail },
      { label: "Fokus", value: "Legacy → Modern", detail: copy.impactMetrics.focusDetail },
    ];
  }, [metrics, copy]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {resolvedMetrics.map((metric) => (
        <article
          key={metric.label}
          className={isMando
            ? "mando-panel p-5"
            : "bg-white border border-gray-200 rounded-xl p-5 shadow-sm"}
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
