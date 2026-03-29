export type ComponentTheme = "standard" | "mandalorian";

export interface ImpactMetric {
  label: string;
  value: string;
  detail: string;
}

export const DEFAULT_IMPACT_METRICS: ImpactMetric[] = [
  { label: "OSS Libraries", value: "4", detail: "Langfristig gepflegte PHP-Packages im aktiven Einsatz" },
  { label: "Berufserfahrung", value: "20+ Jahre", detail: "Entwicklung, Betrieb und Modernisierung von Web-Systemen" },
  { label: "Fokus", value: "Legacy → Modern", detail: "Schrittweise Modernisierung statt riskanter Big-Bang-Rewrites" },
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
          <p className={isMando ? "text-xs font-mono uppercase tracking-wide text-[#d3bd80]" : "text-xs font-mono uppercase tracking-wide text-gray-500"}>
            {metric.label}
          </p>
          <p className={isMando ? "text-2xl font-extrabold text-[#f0e0a0] mt-1" : "text-2xl font-extrabold text-gray-900 mt-1"}>
            {metric.value}
          </p>
          <p className={isMando ? "text-sm text-[#d2c39a] mt-2" : "text-sm text-gray-600 mt-2"}>
            {metric.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
