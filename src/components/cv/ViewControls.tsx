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
  const isDemo = viewMode === "prompt_injection_cv";
  return (
    <div className={`theme-switcher ${isDemo ? "theme-demo" : ""}`}>
      <div className="theme-switcher-inner">
        <button
          type="button"
          onClick={() => onSwitchView("standard_cv")}
          className={`theme-switch-btn ${viewMode === "standard_cv" ? "active" : ""}`}
          aria-pressed={viewMode === "standard_cv"}
        >
          <span className="sm:hidden">CV</span>
          <span className="hidden sm:inline">CV (w/ Attacks)</span>
        </button>
        <button
          type="button"
          onClick={() => onSwitchView("prompt_injection_cv")}
          className={`theme-switch-btn ${isDemo ? "active" : ""}`}
          aria-pressed={isDemo}
        >
          <span className="sm:hidden">Intel Terminal</span>
          <span className="hidden sm:inline">Intel Terminal (Explanations)</span>
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
        {isDemo && (
          <button
            type="button"
            onClick={onToggleGamification}
            className={`theme-switch-btn ${showGamification ? "active" : ""}`}
            aria-pressed={showGamification}
          >
            <span className="sm:hidden">{showGamification ? "XP ON" : "XP OFF"}</span>
            <span className="hidden sm:inline">{showGamification ? "Gamification: ON" : "Gamification: OFF"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
