import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ExperienceTimeline } from "./ExperienceTimeline";

describe("ExperienceTimeline", () => {
  it("renders timeline entries with years", () => {
    const html = renderToStaticMarkup(<ExperienceTimeline />);
    expect(html).toContain("REMONDIS IT Services");
    expect(html).toContain("2018–2020");
  });

  it("supports mandalorian theme classes", () => {
    const html = renderToStaticMarkup(<ExperienceTimeline theme="mandalorian" />);
    expect(html).toContain("text-[#f0e0a0]");
  });
});
