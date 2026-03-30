import type { ViewMode } from "./types";
import { useCvCopy } from "./copy";

interface ViewJumpCardProps {
  viewMode: ViewMode;
  onSwitchView: (mode: ViewMode) => void;
}

export function ViewJumpCard({ viewMode, onSwitchView }: ViewJumpCardProps) {
  const copy = useCvCopy();
  const targetMode = viewMode === "standard_cv" ? "prompt_injection_cv" : "standard_cv";
  const isStandard = viewMode === "standard_cv";

  return (
    <section className={isStandard ? "bg-blue-50 border border-blue-200 rounded-xl p-4" : "mando-panel p-4"}>
      <p className={isStandard ? "text-sm text-blue-900" : "text-sm text-[#4a3b1a]"}>
        {isStandard
          ? copy.viewJumpCard.standardDescription
          : copy.viewJumpCard.demoDescription}
      </p>
      <button
        type="button"
        onClick={() => onSwitchView(targetMode)}
        className={isStandard ? "mt-3 inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700" : "mt-3 mando-tech-item text-xs"}
      >
        {isStandard ? copy.viewJumpCard.toIntel : copy.viewJumpCard.toCv}
      </button>
    </section>
  );
}
