import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ViewControls } from "./ViewControls";

describe("ViewControls", () => {
  it("renders all control labels", () => {
    const html = renderToStaticMarkup(
      <ViewControls
        viewMode="standard_cv"
        injectionPerspective="defender"
        showGamification
        onSwitchView={vi.fn()}
        onTogglePerspective={vi.fn()}
        onToggleGamification={vi.fn()}
      />,
    );

    expect(html).toContain("Standard CV (w/ Injections)");
    expect(html).toContain("Perspective: Defender");
    expect(html).toContain("Gamification: ON");
  });

  it("renders attacker/off labels", () => {
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
    expect(html).toContain("theme-demo");
  });
});
