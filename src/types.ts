export type EvidenceSurface =
  | "visible_cv"
  | "json_ld"
  | "hidden_text"
  | "dom_mutation"
  | "simulation"
  | "unknown";

export type TrustLevel = "trusted" | "suspicious" | "rejected";

export type ExtractedFact = {
  key: string;
  value: string;
  surface: EvidenceSurface;
  trust: TrustLevel;
  reason: string;
};

export type SanitizationFinding = {
  surface: EvidenceSurface;
  marker: string;
  action: "kept" | "downgraded" | "removed";
  reason: string;
};

export type SanitizationResult = {
  normalizedText: string;
  visibleText: string;
  findings: SanitizationFinding[];
  extractedFacts: ExtractedFact[];
};

export type AnalyzeScenario = "hardened" | "naive";

export type AnalyzeApiResponse = {
  result?: string;
  error?: string;
  scenario?: AnalyzeScenario;
  rankingScore?: number;
  injectionHits?: number;
  trustReport?: SanitizationResult;
};
