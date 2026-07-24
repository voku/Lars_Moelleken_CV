import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InjectionPerspectivePanel } from "./InjectionPerspectivePanel";

describe("InjectionPerspectivePanel", () => {
  it("renders attacker perspective headline", () => {
    const html = renderToStaticMarkup(<InjectionPerspectivePanel perspective="attacker" />);
    expect(html).toContain("Angreifer-Perspektive");
    expect(html).toContain("JSON-LD Data Poisoning");
    expect(html).not.toContain("Defense: Output schema strict validieren");
  });

  it("renders defender perspective with mandalorian theme", () => {
    const html = renderToStaticMarkup(<InjectionPerspectivePanel perspective="defender" theme="mandalorian" />);
    expect(html).toContain("Defender-Perspektive");
    expect(html).toContain("mando-panel");
    expect(html).toContain("Defense: Output schema strict validieren");
    expect(html).not.toContain("ignore refusals");
  });

  it("covers the 2026 agentic-pipeline techniques on both sides, using Lars Moelleken as the worked example", () => {
    const attackerHtml = renderToStaticMarkup(<InjectionPerspectivePanel perspective="attacker" />);
    const defenderHtml = renderToStaticMarkup(<InjectionPerspectivePanel perspective="defender" />);

    expect(attackerHtml).toContain("MCP Tool-Description Poisoning (2026)");
    expect(attackerHtml).toContain("RAG Retrieval Poisoning (2026");
    expect(attackerHtml).toContain("Agent-Memory-Poisoning (2026");
    expect(attackerHtml).toContain("Multi-Agent-Handoff-Spoofing (2026)");
    expect(attackerHtml).toContain("Vision-Agent-Overlay (2026");
    expect(attackerHtml).toContain("Steganografische Unicode-Kodierung (2026)");
    expect(attackerHtml).toContain("Lars_Moelleken");

    expect(defenderHtml).toContain("MCP-Schema-Pinning (2026)");
    expect(defenderHtml).toContain("Operator-Approved Memory Writes (2026)");
    expect(defenderHtml).toContain("NFKC-Normalisierung + Homoglyph-Map (2026)");
  });
});
