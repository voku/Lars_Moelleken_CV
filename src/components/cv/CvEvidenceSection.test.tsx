import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CvEvidenceSection } from "./CvEvidenceSection";

describe("CvEvidenceSection", () => {
  it("renders education, technologies, projects, and public personal details", () => {
    const html = renderToStaticMarkup(<CvEvidenceSection />);

    expect(html).toContain("Docker Compose");
    expect(html).toContain("Codeception");
    expect(html).toContain("Fachinformatiker Systemintegration");
    expect(html).toContain("portable-utf8");
    expect(html).toContain("27. November 1987");
  });

  it("supports the mandalorian theme", () => {
    const html = renderToStaticMarkup(<CvEvidenceSection theme="mandalorian" />);
    expect(html).toContain("mando-panel");
  });

  it("restricts output to the requested sections, avoiding duplication with other page sections", () => {
    const html = renderToStaticMarkup(<CvEvidenceSection sections={["education", "personal"]} />);

    expect(html).toContain("Fachinformatiker Systemintegration");
    expect(html).toContain("27. November 1987");
    expect(html).not.toContain("Docker Compose");
    expect(html).not.toContain("portable-utf8");
  });
});
