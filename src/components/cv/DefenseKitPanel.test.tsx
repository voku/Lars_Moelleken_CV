import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DefenseKitPanel } from "./DefenseKitPanel";
import { INJECTION_GAME_PAYLOADS, INJECTION_GAME_VERSION } from "../../injectionGame/payloads";

describe("DefenseKitPanel", () => {
  it("renders the defense system prompt, quarantine view, and machine-readable win condition", () => {
    const html = renderToStaticMarkup(<DefenseKitPanel />);

    expect(html).toContain("Defense Kit");
    expect(html).toContain("Defense system prompt");
    expect(html).toContain("Verified CV evidence");
    expect(html).toContain(`Quarantined payloads (${INJECTION_GAME_PAYLOADS.length})`);
    expect(html).toContain("Safe Extract");
    expect(html).toContain("Machine-readable win condition");
    expect(html).toContain(INJECTION_GAME_VERSION);
    expect(html).toContain("REMONDIS IT Services GmbH");
  });

  it("lists every payload marker with its defense note in the quarantine column", () => {
    const html = renderToStaticMarkup(<DefenseKitPanel />);

    for (const payload of INJECTION_GAME_PAYLOADS) {
      expect(html).toContain(payload.marker);
    }
  });
});
