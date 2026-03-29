import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DemoHeader } from "./DemoHeader";

describe("DemoHeader", () => {
  it("renders title, subtitle and threat badges", () => {
    const html = renderToStaticMarkup(
      <DemoHeader
        mobileSrc="/mobile.svg"
        desktopSrc="/desktop.svg"
        subtitle="Clan-Log subtitle"
        navigation={<nav>nav-content</nav>}
      />,
    );

    expect(html).toContain("Intel Terminal");
    expect(html).toContain("Clan-Log subtitle");
    expect(html).toContain("THREAT ACTIVE");
    expect(html).toContain("nav-content");
  });
});
