import { useCvCopy } from "./copy";

interface SelfDiscoveryBannerProps {
  viewMode: "standard_cv" | "prompt_injection_cv";
}

export function SelfDiscoveryBanner({ viewMode }: SelfDiscoveryBannerProps) {
  const copy = useCvCopy();
  const isStandard = viewMode === "standard_cv";

  return (
    <section className={isStandard ? "rounded-xl border border-indigo-200 bg-indigo-50 p-4" : "mando-panel p-4"}>
      <h3 className={isStandard ? "text-sm font-bold text-indigo-900" : "text-sm font-bold text-mando-heading"}>
        {copy.selfDiscoveryBanner.title}
      </h3>
      <p className={isStandard ? "mt-2 text-xs text-indigo-900/90" : "mt-2 text-xs text-mando-body"}>
        {copy.selfDiscoveryBanner.description}
      </p>
    </section>
  );
}
