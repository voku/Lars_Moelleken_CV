import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ViewControls } from "./ViewControls";

describe("ViewControls", () => {
  it("renders CV and Intel Terminal labels; no XP toggle in standard_cv", () => {
    const html = renderToStaticMarkup(
      <ViewControls
        viewMode="standard_cv"
        injectionPerspective="attacker"
        showGamification
        onSwitchView={vi.fn()}
        onTogglePerspective={vi.fn()}
        onToggleGamification={vi.fn()}
      />,
    );

    expect(html).toContain("CV View");
    expect(html).toContain("Intel View");
    expect(html).not.toContain("Perspective: Attacker");
    // XP toggle should NOT appear in standard CV mode
    expect(html).not.toContain("Gamification: ON");
    expect(html).not.toContain("Gamification: OFF");
  });

  it("renders XP toggle and attacker/off labels in intel mode", () => {
    const html = renderToStaticMarkup(
      <ViewControls
        viewMode="prompt_injection_cv"
        injectionPerspective="attacker"
        showGamification={false}
        onSwitchView={vi.fn()}
        onTogglePerspective={vi.fn()}
        onToggleGamification={vi.fn()}
      />,
    );

    expect(html).toContain("Perspective: Attacker");
    expect(html).toContain("Gamification: OFF");
    expect(html).toContain("data-view-mode=\"prompt_injection_cv\"");
  });

  it("shows Gamification ON when showGamification true in demo mode", () => {
    const html = renderToStaticMarkup(
      <ViewControls
        viewMode="prompt_injection_cv"
        injectionPerspective="defender"
        showGamification
        onSwitchView={vi.fn()}
        onTogglePerspective={vi.fn()}
        onToggleGamification={vi.fn()}
      />,
    );

    expect(html).toContain("Gamification: ON");
    expect(html).toContain("Perspective: Defender");
  });
});
