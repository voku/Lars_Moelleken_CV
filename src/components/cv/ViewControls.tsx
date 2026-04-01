import type { InjectionPerspective } from "./InjectionPerspectivePanel";
import { useCvCopy, useCvLocale } from "./copy";
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
  const copy = useCvCopy();
  const { locale, setLocale } = useCvLocale();
  const isDemo = viewMode === "prompt_injection_cv";
  return (
    <div className="view-controls" data-view-mode={viewMode} data-gamification={isDemo && showGamification ? "true" : undefined}>
      <div className="view-controls-inner">
        <div className="view-controls-group" aria-label={copy.viewControls.viewModeAria}>
        <button
          type="button"
          onClick={() => onSwitchView("standard_cv")}
          className={`view-switch-btn ${viewMode === "standard_cv" ? "active" : ""}`}
          aria-pressed={viewMode === "standard_cv"}
        >
          <span className="sm:hidden">{copy.viewControls.cvShort}</span>
          <span className="hidden sm:inline">{copy.viewControls.cvLabel}</span>
        </button>
        <button
          type="button"
          onClick={() => onSwitchView("prompt_injection_cv")}
          className={`view-switch-btn ${isDemo ? "active" : ""}`}
          aria-pressed={isDemo}
        >
          <span className="sm:hidden">{copy.viewControls.intelShort}</span>
          <span className="hidden sm:inline">{copy.viewControls.intelLabel}</span>
        </button>
        </div>
        <div className="view-controls-group" aria-label={copy.viewControls.localeSwitchAria}>
          <button type="button" onClick={() => setLocale("de")} className={`view-switch-btn ${locale === "de" ? "active" : ""}`}>{copy.viewControls.localeDe}</button>
          <button type="button" onClick={() => setLocale("en")} className={`view-switch-btn ${locale === "en" ? "active" : ""}`}>{copy.viewControls.localeEn}</button>
        </div>
        {isDemo && (
          <div className="view-controls-group" aria-label={copy.viewControls.intelOptionsAria}>
        <button
          type="button"
          onClick={onTogglePerspective}
          className={`view-switch-btn ${injectionPerspective === "attacker" ? "active" : ""}`}
          aria-pressed={injectionPerspective === "attacker"}
        >
          <span className="sm:hidden">{injectionPerspective === "attacker" ? copy.viewControls.attackShort : copy.viewControls.defenseShort}</span>
          <span className="hidden sm:inline">{injectionPerspective === "attacker" ? copy.viewControls.perspectiveAttacker : copy.viewControls.perspectiveDefender}</span>
        </button>
          <button
            type="button"
            onClick={onToggleGamification}
            className={`view-switch-btn ${showGamification ? "active" : ""}`}
            aria-pressed={showGamification}
          >
            <span className="sm:hidden">{showGamification ? copy.viewControls.xpOnShort : copy.viewControls.xpOffShort}</span>
            <span className="hidden sm:inline">{showGamification ? copy.viewControls.xpOn : copy.viewControls.xpOff}</span>
          </button>
          </div>
        )}
      </div>
    </div>
  );
}
