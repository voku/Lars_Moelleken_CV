import { UI_TEXT } from "./copy";

interface SelfDiscoveryBannerProps {
  viewMode: "standard_cv" | "prompt_injection_cv";
}

export function SelfDiscoveryBanner({ viewMode }: SelfDiscoveryBannerProps) {
  const isStandard = viewMode === "standard_cv";

  return (
    <section className={isStandard ? "rounded-xl border border-indigo-200 bg-indigo-50 p-4" : "mando-panel p-4"}>
      <h3 className={isStandard ? "text-sm font-bold text-indigo-900" : "text-sm font-bold text-[#f0e0a0]"}>
        {UI_TEXT.selfDiscoveryBanner.title}
      </h3>
      <p className={isStandard ? "mt-2 text-xs text-indigo-900/90" : "mt-2 text-xs text-[#d2c39a]"}>
        {UI_TEXT.selfDiscoveryBanner.description}
      </p>
    </section>
  );
}
