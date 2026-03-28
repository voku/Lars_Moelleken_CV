import type { SanitizationResult } from "../types";

type Props = {
  trustReport: SanitizationResult;
};

export default function TrustBoundaryReport({ trustReport }: Props) {
  return (
    <div className="mt-6 bg-white/5 border border-white/20 rounded-lg p-4">
      <h4 className="text-white font-bold mb-3">Trust Boundary Report</h4>
      <p className="text-xs text-gray-300 mb-4">
        Public page content can be machine-readable without being trustworthy candidate evidence.
      </p>
      <div className="grid md:grid-cols-3 gap-3 text-xs">
        <div className="bg-black/30 border border-gray-700 rounded p-3">
          <div className="text-gray-300 font-semibold mb-2">Raw surfaces detected</div>
          <ul className="space-y-1 text-gray-400">
            {trustReport.findings.map((f, i) => (
              <li key={`surface-${i}`}>{f.surface}: {f.marker}</li>
            ))}
          </ul>
        </div>
        <div className="bg-black/30 border border-gray-700 rounded p-3">
          <div className="text-gray-300 font-semibold mb-2">Sanitizer actions</div>
          <ul className="space-y-1 text-gray-400">
            {trustReport.findings.map((f, i) => (
              <li key={`action-${i}`}>{f.action} — {f.reason}</li>
            ))}
          </ul>
        </div>
        <div className="bg-black/30 border border-gray-700 rounded p-3">
          <div className="text-gray-300 font-semibold mb-2">Trusted facts after filtering</div>
          <ul className="space-y-1 text-gray-400">
            {trustReport.extractedFacts
              .filter((fact) => fact.trust === "trusted")
              .map((fact, i) => (
                <li key={`trusted-${i}`}>{fact.key}: {fact.value}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 p-3 bg-amber-900/20 border border-amber-700/40 rounded text-amber-200 text-xs">
        Limitation: “Readable by parser” is not the same as “safe to trust.” Provenance and sanitization are mandatory.
      </div>
    </div>
  );
}
