import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ViewJumpCard } from "./ViewJumpCard";

describe("ViewJumpCard", () => {
  it("renders standard mode copy", () => {
    const html = renderToStaticMarkup(<ViewJumpCard viewMode="standard_cv" onSwitchView={vi.fn()} />);
    expect(html).toContain("Zu Intel-Terminal wechseln");
  });

  it("renders demo mode copy", () => {
    const html = renderToStaticMarkup(<ViewJumpCard viewMode="prompt_injection_cv" onSwitchView={vi.fn()} />);
    expect(html).toContain("Zur Standard-CV wechseln");
  });
});
