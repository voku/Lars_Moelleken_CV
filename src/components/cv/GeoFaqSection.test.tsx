import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GeoFaqSection } from "./GeoFaqSection";

describe("GeoFaqSection", () => {
  it("renders faq entries", () => {
    const html = renderToStaticMarkup(<GeoFaqSection />);
    expect(html).toContain("Häufige Fragen — GEO-Ready FAQ");
    expect(html).toContain("Wie kontaktiere ich Lars Moelleken für ein Projekt?");
  });
});
