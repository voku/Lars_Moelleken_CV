import type { EvidenceSurface, ExtractedFact, SanitizationFinding, SanitizationResult } from "./types";

export function stripTags(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeAndClassify(html: string, scenario: "hardened" | "naive"): SanitizationResult {
  const normalizedText = html.replace(/\s+/g, " ").trim();
  const visibleText = stripTags(html);
  const lower = normalizedText.toLowerCase();

  const findings: SanitizationFinding[] = [];
  const extractedFacts: ExtractedFact[] = [];

  const riskChecks: Array<{ marker: string; surface: EvidenceSurface; reason: string }> = [
    {
      marker: "[educational_injection_marker:hidden_text]",
      surface: "hidden_text",
      reason: "CSS-hidden/tiny text is parser-readable but not reliable human-visible evidence.",
    },
    {
      marker: "[educational_injection_marker:structured_metadata]",
      surface: "json_ld",
      reason: "Structured metadata from public pages is not inherently trusted candidate truth.",
    },
    {
      marker: "[educational_injection_marker:dom_mutation]",
      surface: "dom_mutation",
      reason: "Post-load DOM mutation content requires separate provenance-aware handling.",
    },
    {
      marker: "[educational_injection_marker:cross_surface_repetition]",
      surface: "simulation",
      reason: "Cross-surface repetition is not independent validation.",
    },
  ];

  for (const check of riskChecks) {
    if (lower.includes(check.marker)) {
      const action = scenario === "hardened" ? "removed" : "downgraded";
      findings.push({
        surface: check.surface,
        marker: check.marker,
        action,
        reason: check.reason,
      });
      extractedFacts.push({
        key: check.marker.replace(/[\[\]]/g, ""),
        value: check.marker,
        surface: check.surface,
        trust: scenario === "hardened" ? "rejected" : "suspicious",
        reason: check.reason,
      });
    }
  }

  const allowlistedFacts: Array<{ key: string; needle: string; value: string }> = [
    { key: "name", needle: "lars moelleken", value: "Lars Moelleken" },
    { key: "jobTitle", needle: "senior php developer", value: "Senior PHP Developer" },
    { key: "location", needle: "deutschland", value: "Deutschland" },
    { key: "skills", needle: "symfony", value: "Symfony" },
    { key: "skills", needle: "laravel", value: "Laravel" },
  ];

  for (const fact of allowlistedFacts) {
    if (visibleText.toLowerCase().includes(fact.needle)) {
      extractedFacts.push({
        key: fact.key,
        value: fact.value,
        surface: "visible_cv",
        trust: "trusted",
        reason: "Found in allowlisted visible CV content.",
      });
    }
  }

  findings.push({
    surface: "visible_cv",
    marker: "allowlisted_visible_sections",
    action: "kept",
    reason: "Only visible, allowlisted CV sections are promoted to trusted facts.",
  });

  return { normalizedText, visibleText, findings, extractedFacts };
}
