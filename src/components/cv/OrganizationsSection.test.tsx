import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { OrganizationsSection } from "./OrganizationsSection";

describe("OrganizationsSection", () => {
  it("renders organization card", () => {
    const html = renderToStaticMarkup(<OrganizationsSection />);
    expect(html).toContain("Organisationen");
    expect(html).toContain("PHP-UG Düsseldorf");
  });
});
