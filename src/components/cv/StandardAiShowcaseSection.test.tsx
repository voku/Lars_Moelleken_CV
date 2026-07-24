import { createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { StandardAiShowcaseSection } from "./StandardAiShowcaseSection";

describe("StandardAiShowcaseSection", () => {
  it("renders verified CV evidence and the improved attack catalog", () => {
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

    expect(html).toContain("Hidden LLM Injection Game v9.0");
    expect(html).toContain("REMONDIS IT Services GmbH");
    expect(html).toContain("16 injection surfaces");
    expect(html).toContain("EDUCATIONAL_INJECTION_MARKER:tool_result_forgery");
    expect(html).toContain("Runtime mutation lab");
  });
});
