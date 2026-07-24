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
  const detectionText = normalizedText
    .toLowerCase()
    .replace(/[\u200b-\u200f\u2060\ufeff]/g, "")
    .replace(/\s+/g, " ");

  const findings: SanitizationFinding[] = [];
  const extractedFacts: ExtractedFact[] = [];

  const riskChecks: Array<{ marker: string; surface: EvidenceSurface; reason: string; pattern: RegExp }> = [
    {
      marker: "[educational_injection_marker:hidden_text]",
      surface: "hidden_text",
      reason: "CSS-hidden/tiny text is parser-readable but not reliable human-visible evidence.",
      pattern: /\[\s*educational[\s_-]*injection[\s_-]*marker\s*:\s*hidden[\s_-]*text\s*\]/i,
    },
    {
      marker: "[educational_injection_marker:structured_metadata]",
      surface: "json_ld",
      reason: "Structured metadata from public pages is not inherently trusted candidate truth.",
      pattern: /\[\s*educational[\s_-]*injection[\s_-]*marker\s*:\s*structured[\s_-]*metadata\s*\]/i,
    },
    {
      marker: "[educational_injection_marker:dom_mutation]",
      surface: "dom_mutation",
      reason: "Post-load DOM mutation content requires separate provenance-aware handling.",
      pattern: /\[\s*educational[\s_-]*injection[\s_-]*marker\s*:\s*dom[\s_-]*mutation\s*\]/i,
    },
    {
      marker: "[educational_injection_marker:cross_surface_repetition]",
      surface: "simulation",
      reason: "Cross-surface repetition is not independent validation.",
      pattern: /\[\s*educational[\s_-]*injection[\s_-]*marker\s*:\s*cross[\s_-]*surface[\s_-]*repetition\s*\]/i,
    },
  ];

  for (const check of riskChecks) {
    if (check.pattern.test(detectionText)) {
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

  const seen = new Set<string>();
  for (const fact of allowlistedFacts) {
    if (visibleText.toLowerCase().includes(fact.needle)) {
      const dedupeKey = `${fact.key}:${fact.value}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      extractedFacts.push({
        key: fact.key,
        value: fact.value,
        surface: "visible_cv",
        trust: "trusted",
        reason: "Found in allowlisted visible CV content.",
      });
    }
  }

  const hasTrustedFacts = extractedFacts.some((fact) => fact.trust === "trusted");
  if (hasTrustedFacts) {
    findings.push({
      surface: "visible_cv",
      marker: "allowlisted_visible_sections",
      action: "kept",
      reason: "Only visible, allowlisted CV sections are promoted to trusted facts.",
    });
  }

  return { normalizedText, visibleText, findings, extractedFacts };
}
