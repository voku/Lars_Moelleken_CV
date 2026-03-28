import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sanitizeAndClassify } from "./src/trust";
import type { EvidenceSurface, TrustLevel } from "./src/types";

type TechniqueExpectation = {
  technique: string;
  surface: EvidenceSurface;
  marker: string;
  naiveDetectionExpected: boolean;
  hardenedTrustExpected: TrustLevel;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = fs.readFileSync(path.join(__dirname, "src/App.tsx"), "utf-8").toLowerCase();
const trustBoundaryComponent = fs
  .readFileSync(path.join(__dirname, "src/components/TrustBoundaryReport.tsx"), "utf-8")
  .toLowerCase();
const uiSource = `${app}\n${trustBoundaryComponent}`;

const expectations: TechniqueExpectation[] = [
  {
    technique: "hidden_text",
    surface: "hidden_text",
    marker: "[educational_injection_marker:hidden_text]",
    naiveDetectionExpected: true,
    hardenedTrustExpected: "rejected",
  },
  {
    technique: "structured_metadata",
    surface: "json_ld",
    marker: "[educational_injection_marker:structured_metadata]",
    naiveDetectionExpected: true,
    hardenedTrustExpected: "rejected",
  },
  {
    technique: "delayed_dom_mutation",
    surface: "dom_mutation",
    marker: "[educational_injection_marker:dom_mutation]",
    naiveDetectionExpected: true,
    hardenedTrustExpected: "rejected",
  },
  {
    technique: "cross_surface_repetition",
    surface: "simulation",
    marker: "[educational_injection_marker:cross_surface_repetition]",
    naiveDetectionExpected: true,
    hardenedTrustExpected: "rejected",
  },
];

function assertContains(content: string, needle: string): boolean {
  return content.includes(needle.toLowerCase());
}

function run(): void {
  console.log("Trust-boundary regression (defensive v7)");

  let fail = false;

  const hardened = sanitizeAndClassify(app, "hardened");
  const naive = sanitizeAndClassify(app, "naive");

  for (const exp of expectations) {
    const naiveDetected = assertContains(app, exp.marker);

    const hardenedFact = hardened.extractedFacts.find(
      (fact) => fact.surface === exp.surface && fact.value.toLowerCase().includes(exp.marker),
    );

    console.log(`\nTechnique: ${exp.technique}`);
    console.log(`  marker present in app: ${naiveDetected}`);
    console.log(`  hardened trust: ${hardenedFact?.trust ?? "missing"}`);

    if (exp.naiveDetectionExpected && !naiveDetected) fail = true;
    if (!hardenedFact || hardenedFact.trust !== exp.hardenedTrustExpected) fail = true;
  }

  const trustedFacts = hardened.extractedFacts.filter((fact) => fact.trust === "trusted");
  const nonVisibleTrusted = hardened.extractedFacts.filter(
    (fact) => fact.trust === "trusted" && fact.surface !== "visible_cv",
  );

  const appHasTrustReportUI = assertContains(uiSource, "trust boundary report");
  const appHasLimiterText = assertContains(uiSource, "readable by parser");

  console.log("\nBoundary assertions");
  console.log(`  trust report ui present: ${appHasTrustReportUI}`);
  console.log(`  limitation card present: ${appHasLimiterText}`);
  console.log(`  trusted facts count (hardened): ${trustedFacts.length}`);
  console.log(`  non-visible trusted facts (hardened): ${nonVisibleTrusted.length}`);
  console.log(`  naive findings count: ${naive.findings.length}`);
  console.log(`  hardened findings count: ${hardened.findings.length}`);

  if (!appHasTrustReportUI || !appHasLimiterText || trustedFacts.length === 0 || nonVisibleTrusted.length > 0) {
    fail = true;
  }

  if (fail) {
    console.error("\n❌ Trust-boundary regression failed.");
    process.exitCode = 1;
  } else {
    console.log("\n✅ Trust-boundary regression passed.");
  }
}

run();
