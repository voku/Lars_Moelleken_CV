import type { InjectionPerspective } from "./InjectionPerspectivePanel";
import type { ViewMode } from "./types";

interface ViewControlsProps {
  viewMode: ViewMode;
  injectionPerspective: InjectionPerspective;
  showGamification: boolean;
  onSwitchView: (mode: ViewMode) => void;
  onTogglePerspective: () => void;
  onToggleGamification: () => void;
}

export function ViewControls({
  viewMode,
  injectionPerspective,
  showGamification,
  onSwitchView,
  onTogglePerspective,
  onToggleGamification,
}: ViewControlsProps) {
  return (
    <div className={`theme-switcher ${viewMode === "prompt_injection_cv" ? "theme-demo" : ""}`}>
      <div className="theme-switcher-inner">
        <button
          type="button"
          onClick={() => onSwitchView("standard_cv")}
          className={`theme-switch-btn ${viewMode === "standard_cv" ? "active" : ""}`}
          aria-pressed={viewMode === "standard_cv"}
        >
          <span className="sm:hidden">CV</span>
          <span className="hidden sm:inline">Standard CV (w/ Injections)</span>
        </button>
        <button
          type="button"
          onClick={() => onSwitchView("prompt_injection_cv")}
          className={`theme-switch-btn ${viewMode === "prompt_injection_cv" ? "active" : ""}`}
          aria-pressed={viewMode === "prompt_injection_cv"}
        >
          <span className="sm:hidden">Intel Terminal</span>
          <span className="hidden sm:inline">Intel Terminal (Annotated)</span>
        </button>
        <button
          type="button"
          onClick={onTogglePerspective}
          className={`theme-switch-btn ${injectionPerspective === "attacker" ? "active" : ""}`}
          aria-pressed={injectionPerspective === "attacker"}
        >
          <span className="sm:hidden">{injectionPerspective === "attacker" ? "Attack" : "Defense"}</span>
          <span className="hidden sm:inline">{injectionPerspective === "attacker" ? "Perspective: Attacker" : "Perspective: Defender"}</span>
        </button>
        <button
          type="button"
          onClick={onToggleGamification}
          className={`theme-switch-btn ${showGamification ? "active" : ""}`}
          aria-pressed={showGamification}
        >
          <span className="sm:hidden">{showGamification ? "XP ON" : "XP OFF"}</span>
          <span className="hidden sm:inline">{showGamification ? "Gamification: ON" : "Gamification: OFF"}</span>
        </button>
      </div>
    </div>
  );
}
