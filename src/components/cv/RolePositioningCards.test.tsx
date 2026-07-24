import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RolePositioningCards } from "./RolePositioningCards";

describe("RolePositioningCards", () => {
  it("renders the CV-backed positioning", () => {
    const html = renderToStaticMarkup(<RolePositioningCards />);

    expect(html).toContain("Primäre Positionierung");
    expect(html).toContain("Senior PHP Developer / Software Architect");
    expect(html).toContain("LDAP/AD");
  });

  it("renders mandalorian styling in demo theme", () => {
    const html = renderToStaticMarkup(<RolePositioningCards theme="mandalorian" />);
    expect(html).toContain("mando-panel");
  });
});
