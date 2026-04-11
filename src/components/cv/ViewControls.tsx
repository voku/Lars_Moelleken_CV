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
      </div>
    </div>
  );
}
