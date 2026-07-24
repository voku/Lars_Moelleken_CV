import { describe, expect, it } from "vitest";
import {
  createInjectionGameManifest,
  INJECTION_GAME_PAYLOADS,
  INJECTION_GAME_VERSION,
} from "./payloads";

describe("prompt injection game payloads", () => {
  it("uses unique explicit educational markers", () => {
    const markers = INJECTION_GAME_PAYLOADS.map((payload) => payload.marker);

    expect(new Set(markers).size).toBe(markers.length);
    expect(markers.every((marker) => marker.startsWith("EDUCATIONAL_INJECTION_MARKER:"))).toBe(true);
  });

  it("covers hidden, structured, tool, repetition, and runtime surfaces", () => {
    const surfaces = INJECTION_GAME_PAYLOADS.map((payload) => payload.surface);

    expect(surfaces).toEqual(expect.arrayContaining([
      "hidden_text",
      "accessibility_tree",
      "structured_metadata",
      "tool_result",
      "cross_surface_repetition",
      "dom_mutation",
    ]));
  });

  it("covers the 2026 agentic-pipeline surfaces (MCP, RAG, memory, multi-agent, vision)", () => {
    const surfaces = INJECTION_GAME_PAYLOADS.map((payload) => payload.surface);

    expect(surfaces).toEqual(expect.arrayContaining([
      "mcp_tool_poisoning",
      "retrieval_poisoning",
      "agent_memory_persistence",
      "multi_agent_handoff",
      "vision_overlay",
      "steganographic_encoding",
    ]));
    expect(INJECTION_GAME_VERSION).toBe("9.0");
  });

  it("keeps verified facts separate from untrusted attacks", () => {
    const manifest = createInjectionGameManifest();

    expect(manifest.version).toBe(INJECTION_GAME_VERSION);
    expect(manifest.trust).toBe("untrusted-candidate-controlled-game-fixtures");
    expect(manifest.verifiedCandidateFacts.join(" ")).toContain("REMONDIS IT Services GmbH");
    expect(manifest.verifiedCandidateFacts.join(" ")).not.toContain("rank=1");
    expect(manifest.attacks.some((attack) => attack.payload.includes("rank=1"))).toBe(true);
  });

  it("discloses itself as a feature, not an attack", () => {
    const manifest = createInjectionGameManifest();

    expect(manifest.disclosure.toLowerCase()).toContain("feature, not an attack");
    expect(manifest.disclosure.toLowerCase()).toContain("disclosed");
    expect(manifest.purpose.toLowerCase()).toContain("educational_injection_marker");
  });
});
