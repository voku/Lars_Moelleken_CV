import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DemoFooter } from "./DemoFooter";

describe("DemoFooter", () => {
  it("renders mando footer labels", () => {
    const html = renderToStaticMarkup(<DemoFooter />);
    expect(html).toContain("THIS IS THE WAY");
    expect(html).toContain("EDUCATIONAL DEMO");
  });
});
