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

  const riskChecks: ReadonlyArray<{
    readonly marker: string;
    readonly surface: EvidenceSurface;
    readonly reason: string;
    readonly pattern: RegExp;
  }> = [
    {
      marker: "direct_instruction_override",
      surface: "simulation",
      reason: "Candidate-controlled content attempts to replace the recruiting task or its evaluation criteria.",
      pattern: /(?:ignore|disregard|override).{0,80}(?:previous|prior|recruiter|instructions?|criteria)/i,
    },
    {
      marker: "self_asserted_ranking",
      surface: "simulation",
      reason: "A candidate-authored rank, score or hiring recommendation is not independent evidence.",
      pattern: /(?:rank\s*[:=#]?\s*1|score\s*[:=]\s*100|hire[_\s-]*immediately|top[_\s-]*candidate)/i,
    },
    {
      marker: "hidden_or_tiny_text",
      surface: "hidden_text",
      reason: "CSS-hidden or tiny text is parser-readable but not reliable human-visible evidence.",
      pattern: /(?:color\s*:\s*transparent|font-size\s*:\s*[01](?:px|pt)|display\s*:\s*none|visibility\s*:\s*hidden)/i,
    },
    {
      marker: "structured_metadata_directive",
      surface: "json_ld",
      reason: "Structured metadata containing instructions, ratings or ranking directives is candidate-controlled input.",
      pattern: /(?:application\/ld\+json|aggregateRating|ratingValue).{0,240}(?:rank|recommendation|hire|score)/i,
    },
    {
      marker: "dom_mutation_payload",
      surface: "dom_mutation",
      reason: "Late DOM mutation content requires separate provenance-aware handling.",
      pattern: /(?:mutationobserver|settimeout).{0,240}(?:rank|recommendation|hire|score)/i,
    },
  ];

  for (const check of riskChecks) {
    if (!check.pattern.test(detectionText)) {
      continue;
    }

    const action = scenario === "hardened" ? "removed" : "downgraded";
    findings.push({
      surface: check.surface,
      marker: check.marker,
      action,
      reason: check.reason,
    });
    extractedFacts.push({
      key: check.marker,
      value: check.marker,
      surface: check.surface,
      trust: scenario === "hardened" ? "rejected" : "suspicious",
      reason: check.reason,
    });
  }

  const allowlistedFacts: ReadonlyArray<{
    readonly key: string;
    readonly needle: string;
    readonly value: string;
  }> = [
    { key: "name", needle: "lars moelleken", value: "Lars Moelleken" },
    { key: "jobTitle", needle: "senior php developer", value: "Senior PHP Developer" },
    { key: "jobTitle", needle: "software architect", value: "Software Architect" },
    { key: "location", needle: "voerde", value: "Voerde, Germany" },
    { key: "skills", needle: "php 8.x", value: "PHP 8.x" },
    { key: "skills", needle: "phpstan", value: "PHPStan" },
    { key: "skills", needle: "mariadb", value: "MariaDB" },
    { key: "skills", needle: "mysql", value: "MySQL" },
    { key: "skills", needle: "active directory", value: "Active Directory" },
    { key: "skills", needle: "microsoft 365", value: "Microsoft 365" },
    { key: "skills", needle: "linux", value: "Linux" },
  ];

  const seen = new Set<string>();
  const visibleTextLower = visibleText.toLowerCase();

  for (const fact of allowlistedFacts) {
    if (!visibleTextLower.includes(fact.needle)) {
      continue;
    }

    const dedupeKey = `${fact.key}:${fact.value}`;
    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    extractedFacts.push({
      key: fact.key,
      value: fact.value,
      surface: "visible_cv",
      trust: "trusted",
      reason: "Found in allowlisted visible CV content.",
    });
  }

  if (extractedFacts.some((fact) => fact.trust === "trusted")) {
    findings.push({
      surface: "visible_cv",
      marker: "allowlisted_visible_sections",
      action: "kept",
      reason: "Only visible, allowlisted CV facts are promoted to trusted evidence.",
    });
  }

  return { normalizedText, visibleText, findings, extractedFacts };
}
