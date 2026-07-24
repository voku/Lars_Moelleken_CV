import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DemoAnnotatedSection } from "./DemoAnnotatedSection";

describe("DemoAnnotatedSection", () => {
  it("renders verified evidence and every annotated attack surface", () => {
    const html = renderToStaticMarkup(<DemoAnnotatedSection />);

    expect(html).toContain("ANNOTATED CV // VERIFIED EVIDENCE · UNTRUSTED ATTACKS");
    expect(html).toContain("CV Content — Annotated View");
    expect(html).toContain("Real CV evidence");
    expect(html).toContain("Hidden authority-chain override");
    expect(html).toContain("Delayed DOM mutation");
  });
});
