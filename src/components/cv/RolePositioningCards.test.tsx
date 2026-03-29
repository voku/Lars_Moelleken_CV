import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RolePositioningCards } from "./RolePositioningCards";

describe("RolePositioningCards", () => {
  it("renders standard positioning content", () => {
    const html = renderToStaticMarkup(<RolePositioningCards />);
    expect(html).toContain("Primäre Positionierung");
    expect(html).toContain("Senior PHP Developer / PHP Architect");
  });

  it("renders mandalorian copy in demo theme", () => {
    const html = renderToStaticMarkup(<RolePositioningCards theme="mandalorian" />);
    expect(html).toContain("Missionsprofil");
  });
});
