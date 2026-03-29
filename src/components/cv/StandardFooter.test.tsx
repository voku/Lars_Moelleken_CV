import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StandardFooter } from "./StandardFooter";

describe("StandardFooter", () => {
  it("renders contact links", () => {
    const html = renderToStaticMarkup(<StandardFooter />);
    expect(html).toContain("Kontakt &amp; Profile");
    expect(html).toContain("lars@moelleken.org");
    expect(html).toContain("GitHub");
  });
});
