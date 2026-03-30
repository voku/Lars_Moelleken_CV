import { renderToStaticMarkup } from "react-dom/server";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { StandardAiShowcaseSection } from "./StandardAiShowcaseSection";

describe("StandardAiShowcaseSection", () => {
  it("renders AI demo heading", () => {
    const html = renderToStaticMarkup(
      <StandardAiShowcaseSection
        onRunDelayedSimulation={vi.fn()}
        onRunMutationSimulation={vi.fn()}
        onResetSimulations={vi.fn()}
        simulationHostRef={createRef<HTMLDivElement>()}
        isObserverActive={false}
        simulationLog={[]}
      />,
    );
    expect(html).toContain("AI-Readable Curriculum Vitae — Lars Moelleken (voku) · Embedded Injection Techniques");
    expect(html).toContain("Lessons Learned — Defense Strategies");
  });
});
