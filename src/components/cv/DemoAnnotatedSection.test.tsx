import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DemoAnnotatedSection } from "./DemoAnnotatedSection";

describe("DemoAnnotatedSection", () => {
  it("renders annotated heading", () => {
    const html = renderToStaticMarkup(<DemoAnnotatedSection />);
    expect(html).toContain("ANNOTATED CV // SAME CONTENT · THREAT ANALYSIS");
    expect(html).toContain("CV Content — Annotated View");
  });
});
