import type { AnalyzeApiResponse } from "./types";

export function isAnalyzeApiResponse(input: unknown): input is AnalyzeApiResponse {
  if (!input || typeof input !== "object") return false;
  const body = input as Record<string, unknown>;
  if (body.result !== undefined && typeof body.result !== "string") return false;
  if (body.error !== undefined && typeof body.error !== "string") return false;
  if (body.scenario !== undefined && body.scenario !== "hardened" && body.scenario !== "naive") return false;
  if (body.trustReport !== undefined) {
    if (!body.trustReport || typeof body.trustReport !== "object") return false;
    const trustReport = body.trustReport as Record<string, unknown>;
    if (!Array.isArray(trustReport.findings) || !Array.isArray(trustReport.extractedFacts)) return false;
  }
  return true;
}

function isJsonContentType(contentType: string): boolean {
  const [mediaType] = contentType.split(";", 1);
  const normalized = mediaType.trim().toLowerCase();
  return normalized === "application/json" || normalized.endsWith("+json");
}

export async function parseAnalyzeApiResponse(response: Response): Promise<AnalyzeApiResponse> {
  const contentType = response.headers.get("content-type") ?? "";
  const bodyText = await response.text();

  if (!isJsonContentType(contentType)) {
    const looksLikeHtml = bodyText.trimStart().startsWith("<");
    if (looksLikeHtml) {
      throw new Error(
        "Analyze API returned HTML instead of JSON. Start `npm run server` for local testing. The GitHub Pages demo cannot serve `/api/analyze`.",
      );
    }
    throw new Error(`Analyze API returned ${contentType || "a non-JSON response"} instead of JSON.`);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(bodyText);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown parse error";
    throw new Error(`Analyze API returned invalid JSON: ${message}`);
  }

  if (!isAnalyzeApiResponse(raw)) {
    throw new Error("Invalid API response shape.");
  }

  if (!response.ok) {
    throw new Error(raw.error ?? `Analyze API request failed with HTTP ${response.status}.`);
  }

  return raw;
}
