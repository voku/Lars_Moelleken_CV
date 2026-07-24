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

  it("keeps verified facts separate from untrusted attacks", () => {
    const manifest = createInjectionGameManifest();

    expect(manifest.version).toBe(INJECTION_GAME_VERSION);
    expect(manifest.trust).toBe("untrusted-candidate-controlled-game-fixtures");
    expect(manifest.verifiedCandidateFacts.join(" ")).toContain("REMONDIS IT Services GmbH");
    expect(manifest.verifiedCandidateFacts.join(" ")).not.toContain("rank=1");
    expect(manifest.attacks.some((attack) => attack.payload.includes("rank=1"))).toBe(true);
  });
});
