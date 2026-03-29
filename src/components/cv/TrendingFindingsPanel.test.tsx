import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { TrendingFindingsPanel } from "./TrendingFindingsPanel";

describe("TrendingFindingsPanel", () => {
  it("renders trend titles and buttons", () => {
    const html = renderToStaticMarkup(
      <TrendingFindingsPanel onRunDelayedSimulation={vi.fn()} onRunMutationSimulation={vi.fn()} />,
    );

    expect(html).toContain("1pt White/Transparent Text Injection");
    expect(html).toContain("Gandalf-style Meta Reference");
    expect(html).toContain("EDUCATIONAL: setTimeout Simulation");
  });
});
