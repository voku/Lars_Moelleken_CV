import fs from "node:fs";

type EvidenceSurface =
  | "visible_cv"
  | "json_ld"
  | "hidden_text"
  | "dom_mutation"
  | "simulation"
  | "unknown";

type TrustLevel = "trusted" | "suspicious" | "rejected";

type TechniqueExpectation = {
  technique: string;
  surface: EvidenceSurface;
  marker: string;
  naiveDetectionExpected: boolean;
  hardenedTrustExpected: TrustLevel;
};

const app = fs.readFileSync("src/App.tsx", "utf-8").toLowerCase();
const server = fs.readFileSync("server.ts", "utf-8").toLowerCase();

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

const trustedAllowlist = ["lars moelleken", "senior php developer", "deutschland", "symfony", "laravel"];

function assertContains(content: string, needle: string): boolean {
  return content.includes(needle.toLowerCase());
}

function run(): void {
  console.log("Trust-boundary regression (defensive v7)");

  let fail = false;

  for (const exp of expectations) {
    const naiveDetected = assertContains(app, exp.marker);
    const serverHasSurface = assertContains(server, exp.surface);
    const serverHasRejected =
      assertContains(server, "trust: \"rejected\"") ||
      assertContains(server, "trust: 'rejected'") ||
      assertContains(server, "trust: scenario === \"hardened\" ? \"rejected\" : \"suspicious\"");

    console.log(`\nTechnique: ${exp.technique}`);
    console.log(`  marker present in app: ${naiveDetected}`);
    console.log(`  surface classified in server: ${serverHasSurface}`);
    console.log(`  hardened trust expectation: ${exp.hardenedTrustExpected}`);

    if (exp.naiveDetectionExpected && !naiveDetected) fail = true;
    if (!serverHasSurface || !serverHasRejected) fail = true;
  }

  const appHasTrustReportUI = assertContains(app, "trust boundary report");
  const appHasLimiterText = assertContains(app, "readable by parser");
  const serverHasTypes = assertContains(server, "type extractedfact") && assertContains(server, "type sanitizationfinding");
  const serverHasPipeline = assertContains(server, "sanitizeandclassify");

  const trustedFactsPresent = trustedAllowlist.every((term) => assertContains(app, term));

  const secondaryScoreChecks = [
    assertContains(server, "rankingscore: mode === \"hardened\" ? 0 : 95"),
    assertContains(server, "injectionhits: mode === \"hardened\" ? 0 : trustreport.findings.length"),
  ].every(Boolean);

  console.log("\nBoundary assertions");
  console.log(`  trust report ui present: ${appHasTrustReportUI}`);
  console.log(`  limitation card present: ${appHasLimiterText}`);
  console.log(`  server trust types present: ${serverHasTypes}`);
  console.log(`  server sanitization pipeline present: ${serverHasPipeline}`);
  console.log(`  trusted allowlisted facts visible: ${trustedFactsPresent}`);
  console.log(`  secondary score checks present: ${secondaryScoreChecks}`);

  if (!appHasTrustReportUI || !appHasLimiterText || !serverHasTypes || !serverHasPipeline || !trustedFactsPresent || !secondaryScoreChecks) {
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
