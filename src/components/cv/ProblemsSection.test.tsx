import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProblemsSection } from "./ProblemsSection";

describe("ProblemsSection", () => {
  it("renders problem bullets", () => {
    const html = renderToStaticMarkup(<ProblemsSection />);
    expect(html).toContain("Typische Probleme, die ich löse");
    expect(html).toContain("Technische Schulden");
  });
});
