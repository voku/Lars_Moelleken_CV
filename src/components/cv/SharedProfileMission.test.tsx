import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SharedProfileMission } from "./SharedProfileMission";

describe("SharedProfileMission", () => {
  it("renders shared stack blocks for standard theme", () => {
    const html = renderToStaticMarkup(<SharedProfileMission />);
    expect(html).toContain("OSS Libraries");
    expect(html).toContain("Primäre Positionierung");
    expect(html).toContain("REMONDIS IT Services");
  });

  it("renders with mandalorian styling", () => {
    const html = renderToStaticMarkup(<SharedProfileMission theme="mandalorian" compact />);
    expect(html).toContain("mando-panel");
  });
});
