import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SelfDiscoveryBanner } from "./SelfDiscoveryBanner";

describe("SelfDiscoveryBanner", () => {
  it("renders standard mode text", () => {
    const html = renderToStaticMarkup(<SelfDiscoveryBanner viewMode="standard_cv" />);
    expect(html).toContain("Self-Discovery Mode");
    expect(html).toContain("Mandalorian/Intel-Terminal");
  });

  it("renders demo mode classes", () => {
    const html = renderToStaticMarkup(<SelfDiscoveryBanner viewMode="prompt_injection_cv" />);
    expect(html).toContain("mando-panel");
  });
});
