import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ImpactMetrics } from "./ImpactMetrics";

describe("ImpactMetrics", () => {
  it("renders default metrics", () => {
    const html = renderToStaticMarkup(<ImpactMetrics />);
    expect(html).toContain("OSS Libraries");
    expect(html).toContain("20+ Jahre");
  });

  it("supports mandalorian theme", () => {
    const html = renderToStaticMarkup(<ImpactMetrics theme="mandalorian" />);
    expect(html).toContain("mando-panel");
  });
});
