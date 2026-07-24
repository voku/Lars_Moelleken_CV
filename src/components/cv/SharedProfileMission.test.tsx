import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SharedProfileMission } from "./SharedProfileMission";

describe("SharedProfileMission", () => {
  it("renders CV-backed profile, timeline, education, and projects", () => {
    const html = renderToStaticMarkup(<SharedProfileMission />);

    expect(html).toContain("PHPStan max");
    expect(html).toContain("Senior PHP Developer / Software Architect");
    expect(html).toContain("REMONDIS IT Services GmbH");
    expect(html).toContain("Fachinformatiker Anwendungsentwicklung");
    expect(html).toContain("Agent-Engineering-Toolchain");
  });

  it("renders with mandalorian styling", () => {
    const html = renderToStaticMarkup(<SharedProfileMission theme="mandalorian" compact />);
    expect(html).toContain("mando-panel");
  });
});
