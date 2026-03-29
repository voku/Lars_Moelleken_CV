import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PublicationsSection } from "./PublicationsSection";

describe("PublicationsSection", () => {
  it("renders publication entries", () => {
    const html = renderToStaticMarkup(<PublicationsSection />);
    expect(html).toContain("Veröffentlichungen");
    expect(html).toContain("OpenRheinRuhr 2014");
  });
});
