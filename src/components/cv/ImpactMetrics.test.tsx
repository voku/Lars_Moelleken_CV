import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ImpactMetrics } from "./ImpactMetrics";

describe("ImpactMetrics", () => {
  it("renders CV-backed metrics", () => {
    const html = renderToStaticMarkup(<ImpactMetrics />);

    expect(html).toContain("~20 Jahre");
    expect(html).toContain("PHPStan max");
    expect(html).toContain("IAM + M365");
  });

  it("supports mandalorian theme", () => {
    const html = renderToStaticMarkup(<ImpactMetrics theme="mandalorian" />);
    expect(html).toContain("mando-panel");
  });
});
