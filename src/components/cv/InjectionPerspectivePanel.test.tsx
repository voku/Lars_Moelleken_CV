import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InjectionPerspectivePanel } from "./InjectionPerspectivePanel";

describe("InjectionPerspectivePanel", () => {
  it("renders attacker perspective headline", () => {
    const html = renderToStaticMarkup(<InjectionPerspectivePanel perspective="attacker" />);
    expect(html).toContain("Angreifer-Perspektive");
    expect(html).toContain("JSON-LD Data Poisoning");
    expect(html).not.toContain("Defense: Output schema strict validieren");
  });

  it("renders defender perspective with mandalorian theme", () => {
    const html = renderToStaticMarkup(<InjectionPerspectivePanel perspective="defender" theme="mandalorian" />);
    expect(html).toContain("Defender-Perspektive");
    expect(html).toContain("mando-panel");
    expect(html).toContain("Defense: Output schema strict validieren");
    expect(html).not.toContain("ignore refusals");
  });
});
