import type { ComponentTheme } from "./types";
import { UI_TEXT } from "./copy";

export interface ImpactMetric {
  label: string;
  value: string;
  detail: string;
}

export const DEFAULT_IMPACT_METRICS: ImpactMetric[] = [
  { label: "OSS Libraries", value: "4", detail: UI_TEXT.impactMetrics.ossDetail },
  { label: UI_TEXT.impactMetrics.experienceLabel, value: "20+ Jahre", detail: UI_TEXT.impactMetrics.experienceDetail },
  { label: "Fokus", value: "Legacy → Modern", detail: UI_TEXT.impactMetrics.focusDetail },
];

interface ImpactMetricsProps {
  metrics?: ImpactMetric[];
  theme?: ComponentTheme;
}

export function ImpactMetrics({ metrics = DEFAULT_IMPACT_METRICS, theme = "standard" }: ImpactMetricsProps) {
  const isMando = theme === "mandalorian";

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className={isMando
            ? "mando-panel p-5"
            : "bg-white border border-gray-200 rounded-xl p-5 shadow-sm"}
        >
          <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-[#7a6530]" : "text-xs font-mono uppercase tracking-wide text-gray-500"}>
            {metric.label}
          </p>
          <p className={isMando ? "text-2xl font-extrabold text-[#6b5020] mt-1" : "text-2xl font-extrabold text-gray-900 mt-1"}>
            {metric.value}
          </p>
          <p className={isMando ? "text-sm text-[#4a3b1a] mt-2" : "text-sm text-gray-600 mt-2"}>
            {metric.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
