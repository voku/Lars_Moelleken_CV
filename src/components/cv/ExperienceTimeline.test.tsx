import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ExperienceTimeline } from "./ExperienceTimeline";

describe("ExperienceTimeline", () => {
  it("renders the verified 2026 timeline", () => {
    const html = renderToStaticMarkup(<ExperienceTimeline />);

    expect(html).toContain("REMONDIS IT Services GmbH");
    expect(html).toContain("08/2023 - heute");
    expect(html).toContain("IONOS SE");
    expect(html).toContain("02/2023 - 08/2023");
    expect(html).toContain("MEERX.de | VDMG connect GmbH");
  });

  it("supports mandalorian theme classes", () => {
    const html = renderToStaticMarkup(<ExperienceTimeline theme="mandalorian" />);
    expect(html).toContain("text-mando-heading");
  });
});
